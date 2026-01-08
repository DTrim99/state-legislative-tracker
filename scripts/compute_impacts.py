#!/usr/bin/env python3
"""
Compute aggregate impacts for reforms using PolicyEngine API.

This script creates policies and fetches economy-wide impacts including:
- Budgetary impact (cost to state)
- Poverty rate change
- Child poverty rate change

Results are saved to a JSON file for use in the frontend.
"""

import json
import time
import requests
from pathlib import Path

API_BASE = "https://api.policyengine.org"

# Define reforms to compute
REFORMS = [
    {
        "id": "ut-sb0060-rate-cut",
        "state": "ut",
        "label": "Utah Income Tax Rate Cut (SB0060)",
        "reform": {
            "gov.states.ut.tax.income.rate": {
                "2026-01-01.2100-12-31": 0.0445
            }
        }
    }
]


def create_policy(reform_data: dict) -> int:
    """Create a policy in PolicyEngine and return the policy ID."""
    response = requests.post(
        f"{API_BASE}/us/policy",
        json={"data": reform_data},
        headers={"Content-Type": "application/json"}
    )
    response.raise_for_status()
    result = response.json()
    return result["result"]["policy_id"]


def get_economy_impact(policy_id: int, region: str, baseline_id: int = 2, time_period: int = 2026, max_retries: int = 60):
    """
    Fetch economy-wide impact for a policy.

    Polls the API until computation is complete.
    """
    url = f"{API_BASE}/us/economy/{policy_id}/over/{baseline_id}"
    params = {"region": region, "time_period": time_period}

    for attempt in range(max_retries):
        response = requests.get(url, params=params)
        response.raise_for_status()
        result = response.json()

        if result["status"] == "ok":
            return result["result"]
        elif result["status"] == "computing":
            print(f"  Computing... (attempt {attempt + 1}/{max_retries})")
            time.sleep(10)
        else:
            raise Exception(f"API error: {result.get('message', 'Unknown error')}")

    raise TimeoutError(f"Economy computation did not complete after {max_retries} attempts")


def extract_impacts(economy_data: dict) -> dict:
    """Extract key impact metrics from economy API response."""
    impacts = {
        "computed": True,
        "computedAt": time.strftime("%Y-%m-%d %H:%M:%S"),
    }

    # Budget impact - budgetary_impact is a float (negative = revenue loss)
    if "budget" in economy_data:
        budget = economy_data["budget"]
        budgetary_impact = budget.get("budgetary_impact", 0)
        impacts["budgetaryImpact"] = {
            "netCost": budgetary_impact,  # Negative = state loses revenue
            "stateRevenueImpact": budget.get("state_tax_revenue_impact", 0),
            "households": budget.get("households", 0),
        }

    # Poverty impact
    if "poverty" in economy_data:
        poverty_data = economy_data["poverty"].get("poverty", {})

        # Overall poverty
        if "all" in poverty_data:
            all_pov = poverty_data["all"]
            baseline = all_pov.get("baseline", 0)
            reform = all_pov.get("reform", 0)
            impacts["povertyImpact"] = {
                "baselineRate": baseline,
                "reformRate": reform,
                "change": reform - baseline,
                "percentChange": ((reform - baseline) / baseline * 100) if baseline > 0 else 0,
            }

        # Child poverty
        if "child" in poverty_data:
            child_pov = poverty_data["child"]
            baseline = child_pov.get("baseline", 0)
            reform = child_pov.get("reform", 0)
            impacts["childPovertyImpact"] = {
                "baselineRate": baseline,
                "reformRate": reform,
                "change": reform - baseline,
                "percentChange": ((reform - baseline) / baseline * 100) if baseline > 0 else 0,
            }

    # Winners/Losers from intra_decile
    if "intra_decile" in economy_data:
        intra = economy_data["intra_decile"].get("all", {})
        impacts["winnersLosers"] = {
            "gainMore5": intra.get("Gain more than 5%", 0),
            "gainLess5": intra.get("Gain less than 5%", 0),
            "loseLess5": intra.get("Lose less than 5%", 0),
            "loseMore5": intra.get("Lose more than 5%", 0),
            "noChange": intra.get("No change", 0),
        }

    # Inequality metrics
    if "inequality" in economy_data:
        ineq = economy_data["inequality"]
        gini = ineq.get("gini", {})
        impacts["inequality"] = {
            "giniBaseline": gini.get("baseline", 0),
            "giniReform": gini.get("reform", 0),
        }

    return impacts


def main():
    output_path = Path(__file__).parent.parent / "src" / "data" / "reformImpacts.json"

    # Load existing impacts if any
    impacts = {}
    if output_path.exists():
        with open(output_path) as f:
            impacts = json.load(f)

    print("Computing aggregate impacts for reforms...")
    print("=" * 50)

    for reform_config in REFORMS:
        reform_id = reform_config["id"]
        state = reform_config["state"]

        print(f"\nProcessing: {reform_config['label']}")
        print(f"  State: {state.upper()}")

        # Skip if already computed
        if reform_id in impacts and impacts[reform_id].get("computed"):
            print("  Already computed, skipping...")
            continue

        try:
            # Create policy
            print("  Creating policy...")
            policy_id = create_policy(reform_config["reform"])
            print(f"  Policy ID: {policy_id}")

            # Get economy impact
            print("  Fetching economy impact (this may take a few minutes)...")
            economy_data = get_economy_impact(policy_id, state)

            # Extract and save impacts
            impacts[reform_id] = extract_impacts(economy_data)
            impacts[reform_id]["policyId"] = policy_id
            impacts[reform_id]["state"] = state.upper()

            print(f"  Done! Impacts computed.")

        except Exception as e:
            print(f"  Error: {e}")
            impacts[reform_id] = {
                "computed": False,
                "error": str(e),
                "state": state.upper(),
            }

    # Save results
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(impacts, f, indent=2)

    print(f"\nResults saved to: {output_path}")
    print("\nSummary:")
    for reform_id, data in impacts.items():
        status = "Computed" if data.get("computed") else "Failed"
        print(f"  {reform_id}: {status}")


if __name__ == "__main__":
    main()
