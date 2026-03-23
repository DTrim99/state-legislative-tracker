#!/usr/bin/env python3
"""
Refresh Bill Status from OpenStates API

Updates legislative stage, last action, and status for tracked bills
in the processed_bills table.

Usage:
    export $(grep -v '^#' .env | xargs)

    # Refresh all scored, non-skipped bills (highest score first)
    python scripts/refresh_bill_status.py

    # Refresh specific state
    python scripts/refresh_bill_status.py --state NY

    # Limit number of API calls (respect 250/day limit)
    python scripts/refresh_bill_status.py --limit 50

    # Dry run — show what would be updated
    python scripts/refresh_bill_status.py --dry-run

    # Include all bills (not just scored ones)
    python scripts/refresh_bill_status.py --all
"""

import os
import sys
import json
import argparse
import time
import requests

# ============== Configuration ==============

OPENSTATES_API_KEY = os.environ.get("OPENSTATES_API_KEY")
OPENSTATES_BASE_URL = "https://v3.openstates.org"

# Legislative stage classification based on action classifications
# Order matters — later stages override earlier ones
STAGE_CLASSIFICATIONS = {
    "introduction": "introduced",
    "filing": "introduced",
    "referral-committee": "in_committee",
    "committee-passage": "passed_committee",
    "reading-1": "first_reading",
    "reading-2": "second_reading",
    "reading-3": "third_reading",
    "passage": "passed_chamber",
    "executive-receipt": "sent_to_governor",
    "executive-signature": "signed",
    "became-law": "signed",
    "executive-veto": "vetoed",
    "executive-veto-line-item": "vetoed",
    "failure": "dead",
    "withdrawal": "dead",
}

# Numeric ordering for stages (higher = further along)
STAGE_ORDER = {
    "prefiled": 0,
    "introduced": 1,
    "in_committee": 2,
    "passed_committee": 3,
    "first_reading": 4,
    "second_reading": 5,
    "third_reading": 6,
    "passed_chamber": 7,
    "passed_both": 8,
    "sent_to_governor": 9,
    "signed": 10,
    "vetoed": 11,
    "dead": -1,
}

# Stage display labels
STAGE_LABELS = {
    "prefiled": "Pre-filed",
    "introduced": "Introduced",
    "in_committee": "In Committee",
    "passed_committee": "Passed Committee",
    "first_reading": "First Reading",
    "second_reading": "Second Reading",
    "third_reading": "Third Reading",
    "passed_chamber": "Passed One Chamber",
    "passed_both": "Passed Both Chambers",
    "sent_to_governor": "Sent to Governor",
    "signed": "Signed into Law",
    "vetoed": "Vetoed",
    "dead": "Dead/Withdrawn",
}


def openstates_request(endpoint, params=None, max_retries=3):
    """Make a request to the OpenStates API v3 with retry on rate limit."""
    if not OPENSTATES_API_KEY:
        raise ValueError("OPENSTATES_API_KEY environment variable not set")

    headers = {"X-API-KEY": OPENSTATES_API_KEY}
    url = f"{OPENSTATES_BASE_URL}{endpoint}"

    for attempt in range(max_retries):
        response = requests.get(url, headers=headers, params=params or {})

        if response.status_code == 429:
            wait = 15 * (attempt + 1)
            print(f"  Rate limited, waiting {wait}s...")
            time.sleep(wait)
            continue

        if response.status_code == 404:
            return None

        response.raise_for_status()
        return response.json()

    response = requests.get(url, headers=headers, params=params or {})
    if response.status_code == 429:
        print(f"  Still rate limited after {max_retries} retries, skipping")
        return None
    response.raise_for_status()
    return response.json()


def classify_stage(actions):
    """
    Determine legislative stage from a list of actions.

    Tracks both chambers — if a bill passes in both, it's "passed_both".
    """
    stage = "introduced"
    chambers_passed = set()

    for action in actions:
        classifications = action.get("classification", [])
        org = action.get("organization", {})
        chamber = org.get("classification", "")  # "upper" or "lower"

        for cls in classifications:
            mapped = STAGE_CLASSIFICATIONS.get(cls)
            if not mapped:
                continue

            if mapped == "passed_chamber":
                chambers_passed.add(chamber)
                if len(chambers_passed) >= 2:
                    stage = "passed_both"
                elif STAGE_ORDER.get(mapped, 0) > STAGE_ORDER.get(stage, 0):
                    stage = mapped
            elif mapped == "dead":
                stage = "dead"
            elif STAGE_ORDER.get(mapped, 0) > STAGE_ORDER.get(stage, 0):
                stage = mapped

    return stage


def search_bill_on_openstates(state_name, bill_number):
    """
    Search for a bill by state + identifier on OpenStates.
    Returns the bill detail with actions, or None.
    """
    # Clean bill number for search (e.g., "HB05133" -> "HB 5133", "SB0032" -> "SB 32")
    clean_num = bill_number.strip()

    params = {
        "jurisdiction": state_name,
        "q": clean_num,
        "per_page": 5,
        "include": "actions",
    }

    data = openstates_request("/bills", params)
    if not data or not data.get("results"):
        return None

    # Find best match by identifier
    for result in data["results"]:
        result_id = result.get("identifier", "").replace(" ", "").upper()
        search_id = clean_num.replace(" ", "").upper()
        # Strip leading zeros for comparison
        import re
        result_norm = re.sub(r'([A-Z]+)0*(\d+)', r'\1\2', result_id)
        search_norm = re.sub(r'([A-Z]+)0*(\d+)', r'\1\2', search_id)

        if result_norm == search_norm:
            return result

    # If no exact match, return first result as fallback
    return data["results"][0] if data["results"] else None


def get_bill_detail(openstates_id):
    """Fetch full bill detail with actions."""
    return openstates_request(f"/bills/{openstates_id}", {"include": "actions"})


# State abbreviation -> name mapping
ABBR_TO_STATE = {
    "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas",
    "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware",
    "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho",
    "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas",
    "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland",
    "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi",
    "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada",
    "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York",
    "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma",
    "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina",
    "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah",
    "VT": "Vermont", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia",
    "WI": "Wisconsin", "WY": "Wyoming", "DC": "District of Columbia",
}


def main():
    parser = argparse.ArgumentParser(description="Refresh bill status from OpenStates")
    parser.add_argument("--state", help="Filter to specific state (e.g., NY)")
    parser.add_argument("--limit", type=int, default=100, help="Max bills to refresh (default: 100)")
    parser.add_argument("--dry-run", action="store_true", help="Show changes without writing")
    parser.add_argument("--all", action="store_true", help="Include all bills, not just scored ones")
    args = parser.parse_args()

    if not OPENSTATES_API_KEY:
        print("Error: OPENSTATES_API_KEY environment variable not set")
        return 1

    try:
        from supabase import create_client
    except ImportError:
        print("Error: supabase package not installed")
        return 1

    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_KEY")
    if not url or not key:
        print("Error: SUPABASE_URL and SUPABASE_KEY required")
        return 1

    supabase = create_client(url, key)

    # Fetch bills to refresh
    query = supabase.table("processed_bills") \
        .select("id, bill_id, state, bill_number, title, status, last_action, last_action_date, confidence_score, legiscan_url")

    if not args.all:
        query = query.gt("confidence_score", 0)

    query = query.is_("skipped_reason", "null")

    if args.state:
        query = query.eq("state", args.state)

    query = query.order("confidence_score", desc=True)

    result = query.execute()
    bills = result.data[:args.limit]

    print(f"Bill Status Refresh")
    print(f"===================")
    print(f"Bills to refresh: {len(bills)} (of {len(result.data)} total)")
    if args.state:
        print(f"State filter: {args.state}")
    print(f"Dry run: {args.dry_run}")
    print()

    updated = 0
    skipped = 0
    errors = 0

    for i, bill in enumerate(bills):
        state = bill["state"]
        bn = bill["bill_number"]
        state_name = ABBR_TO_STATE.get(state, state)

        print(f"[{i+1}/{len(bills)}] {state} {bn}...", end=" ", flush=True)

        try:
            # Search for the bill on OpenStates by state + bill number
            detail = search_bill_on_openstates(state_name, bn)

            if not detail:
                print("not found on OpenStates")
                skipped += 1
                continue

            # Extract actions and classify stage
            actions = detail.get("actions", [])
            stage = classify_stage(actions) if actions else "introduced"

            # Get latest action info
            latest_action = detail.get("latest_action_description", "")
            latest_action_date = detail.get("latest_action_date", "") or None

            # Determine if anything changed
            old_action = bill.get("last_action", "")
            old_date = bill.get("last_action_date", "")

            stage_label = STAGE_LABELS.get(stage, stage)

            if latest_action == old_action and latest_action_date == old_date:
                print(f"{stage_label} (no change)")
                skipped += 1
            else:
                print(f"{stage_label} | {latest_action[:50]} ({latest_action_date})")

                if not args.dry_run:
                    update_data = {
                        "last_action": latest_action,
                        "last_action_date": latest_action_date,
                        "status": stage_label,
                    }

                    supabase.table("processed_bills") \
                        .update(update_data) \
                        .eq("id", bill["id"]) \
                        .execute()

                updated += 1

        except Exception as e:
            print(f"ERROR: {e}")
            errors += 1

        # Rate limiting: 10 req/min on free tier
        if i < len(bills) - 1:
            time.sleep(7)

    print()
    print(f"Done!")
    print(f"  Updated: {updated}")
    print(f"  No change: {skipped}")
    print(f"  Errors: {errors}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
