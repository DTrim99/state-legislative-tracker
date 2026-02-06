#!/usr/bin/env python3
"""
Sync data from Supabase to static JSON files for the React app.

Run this before building/deploying to get the latest data from Supabase
without exposing any API keys in the client bundle.

Usage:
    source .env && export SUPABASE_URL SUPABASE_KEY
    python scripts/sync_from_supabase.py

Or with the Makefile:
    make sync
"""

import os
import sys
import json
from datetime import datetime

try:
    from supabase import create_client
except ImportError:
    print("Error: supabase-py not installed. Run: pip install supabase")
    sys.exit(1)

# Configuration
SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://ffgngqlgfsvqartilful.supabase.co")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")  # Can use either key for reads

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(SCRIPT_DIR)
OUTPUT_DIR = os.path.join(REPO_ROOT, "src/data")


def sync_research(supabase) -> list:
    """Fetch research items and write to research.json."""
    print("Fetching research items...")

    result = supabase.table("research").select("*").execute()
    items = result.data

    print(f"  Found {len(items)} research items")

    # Write as JSON (simpler than JS export for sync purposes)
    output_path = os.path.join(OUTPUT_DIR, "research.json")
    with open(output_path, "w") as f:
        json.dump(items, f, indent=2)

    print(f"  Wrote to {output_path}")
    return items


def sync_reform_impacts(supabase) -> dict:
    """Fetch reform impacts and write to reformImpacts.json."""
    print("Fetching reform impacts...")

    result = supabase.table("reform_impacts").select("*").execute()
    items = result.data

    print(f"  Found {len(items)} reform impacts")

    # Convert to dict keyed by id (matching existing format)
    impacts_dict = {}
    for item in items:
        item_id = item.pop("id")
        # Convert snake_case back to camelCase for frontend compatibility
        impacts_dict[item_id] = {
            "computed": item.get("computed"),
            "computedAt": item.get("computed_at"),
            "policyId": item.get("policy_id"),
            "policyengineUsVersion": item.get("policyengine_us_version"),
            "datasetName": item.get("dataset_name"),
            "datasetVersion": item.get("dataset_version"),
            "budgetaryImpact": item.get("budgetary_impact"),
            "povertyImpact": item.get("poverty_impact"),
            "childPovertyImpact": item.get("child_poverty_impact"),
            "winnersLosers": item.get("winners_losers"),
            "decileImpact": item.get("decile_impact"),
            "inequality": item.get("inequality"),
            "districtImpacts": item.get("district_impacts"),
        }
        # Remove None values
        impacts_dict[item_id] = {k: v for k, v in impacts_dict[item_id].items() if v is not None}

    output_path = os.path.join(OUTPUT_DIR, "reformImpacts.json")
    with open(output_path, "w") as f:
        json.dump(impacts_dict, f, indent=2)

    print(f"  Wrote to {output_path}")
    return impacts_dict


def sync_validation_metadata(supabase) -> dict:
    """Fetch validation metadata and write to validationMetadata.json."""
    print("Fetching validation metadata...")

    result = supabase.table("validation_metadata").select("*").execute()
    items = result.data

    print(f"  Found {len(items)} validation records")

    if not items:
        print("  Skipping write (no data)")
        return {}

    # Convert to dict keyed by id
    metadata_dict = {item.pop("id"): item for item in items}

    output_path = os.path.join(OUTPUT_DIR, "validationMetadata.json")
    with open(output_path, "w") as f:
        json.dump(metadata_dict, f, indent=2)

    print(f"  Wrote to {output_path}")
    return metadata_dict


def main():
    print("=" * 60)
    print("Supabase → Static JSON Sync")
    print("=" * 60)
    print(f"Supabase URL: {SUPABASE_URL}")
    print(f"Output dir: {OUTPUT_DIR}")
    print()

    if not SUPABASE_KEY:
        print("Error: SUPABASE_KEY environment variable not set")
        print("Run: source .env && export SUPABASE_URL SUPABASE_KEY")
        sys.exit(1)

    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

    # Sync all tables
    research = sync_research(supabase)
    impacts = sync_reform_impacts(supabase)
    validation = sync_validation_metadata(supabase)

    print()
    print("=" * 60)
    print("Sync complete!")
    print(f"  Research items: {len(research)}")
    print(f"  Reform impacts: {len(impacts)}")
    print(f"  Validation records: {len(validation)}")
    print()
    print("Static files updated. Ready to build/deploy.")
    print("=" * 60)


if __name__ == "__main__":
    main()
