#!/usr/bin/env python3
"""
Migrate existing research.js and reformImpacts.json data to Supabase.

Usage:
    export SUPABASE_URL="https://ffgngqlgfsvqartilful.supabase.co"
    export SUPABASE_KEY="your_service_role_key"

    python scripts/migrate_to_supabase.py --dry-run  # Preview what will be migrated
    python scripts/migrate_to_supabase.py            # Run the migration
"""

import os
import sys
import json
import re
import argparse
from datetime import datetime

# Try to import supabase, provide helpful error if not installed
try:
    from supabase import create_client, Client
except ImportError:
    print("Error: supabase-py not installed. Run: pip install supabase")
    sys.exit(1)

# Configuration
SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://ffgngqlgfsvqartilful.supabase.co")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

# Path to data files (relative to repo root)
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(SCRIPT_DIR)
RESEARCH_JS_PATH = os.path.join(REPO_ROOT, "src/data/research.js")
REFORM_IMPACTS_PATH = os.path.join(REPO_ROOT, "src/data/reformImpacts.json")


def parse_research_js_manual(filepath: str) -> list[dict]:
    """
    Manually parse research.js by extracting key fields with targeted regexes.
    More robust than trying to convert JS to JSON.
    """
    with open(filepath, 'r') as f:
        content = f.read()

    items = []

    # Split by object boundaries - find each { ... } block at the top level of the array
    # We'll use a state machine approach

    # Find the array content - stop at the first ];
    # Use a more specific pattern to avoid capturing other arrays
    match = re.search(r'export const research = \[(.*?)\n\];', content, re.DOTALL)
    if not match:
        raise ValueError("Could not find research array")

    array_content = match.group(1)

    # Track brace depth to find object boundaries
    objects = []
    current_obj = ""
    brace_depth = 0
    in_string = False
    string_char = None

    for i, char in enumerate(array_content):
        # Track string state
        if char in ['"', "'"] and (i == 0 or array_content[i-1] != '\\'):
            if not in_string:
                in_string = True
                string_char = char
            elif char == string_char:
                in_string = False
                string_char = None

        if not in_string:
            if char == '{':
                if brace_depth == 0:
                    current_obj = ""
                brace_depth += 1
            elif char == '}':
                brace_depth -= 1
                if brace_depth == 0:
                    current_obj += char
                    objects.append(current_obj)
                    current_obj = ""
                    continue

        if brace_depth > 0:
            current_obj += char

    # Now parse each object
    for obj_str in objects:
        item = parse_js_object(obj_str)
        # Validate it's a real research item (must have id, state, type, and title)
        if (item and
            item.get('id') and
            item.get('state') and
            item.get('type') and
            item.get('title')):
            items.append(item)

    return items


def parse_js_object(obj_str: str) -> dict:
    """Parse a single JS object string into a dict."""
    item = {}

    # Extract simple string fields
    simple_fields = ['id', 'state', 'type', 'status', 'title', 'url', 'description',
                     'date', 'expectedDate', 'author', 'sourceUrl', 'thumbnail']

    for field in simple_fields:
        # Match: field: "value" or field: 'value'
        pattern = rf'{field}:\s*["\']([^"\']*)["\']'
        match = re.search(pattern, obj_str)
        if match:
            item[field] = match.group(1)

    # Extract numeric fields
    numeric_fields = ['federalToolOrder']
    for field in numeric_fields:
        pattern = rf'{field}:\s*(\d+)'
        match = re.search(pattern, obj_str)
        if match:
            item[field] = int(match.group(1))

    # Extract array fields
    array_fields = ['keyFindings', 'tags', 'relevantStates']
    for field in array_fields:
        pattern = rf'{field}:\s*\[(.*?)\]'
        match = re.search(pattern, obj_str, re.DOTALL)
        if match:
            array_content = match.group(1)
            # Extract strings from the array
            strings = re.findall(r'["\']([^"\']+)["\']', array_content)
            if strings:
                item[field] = strings

    # Handle null thumbnail
    if 'thumbnail' in item and item['thumbnail'] == 'null':
        item['thumbnail'] = None

    return item


def load_reform_impacts(filepath: str) -> dict:
    """Load the reformImpacts.json file."""
    with open(filepath, 'r') as f:
        return json.load(f)


def transform_research_item(item: dict) -> dict:
    """Transform a research item from JS format to Supabase format."""
    # Map fields (handle camelCase to snake_case)
    transformed = {
        "id": item.get("id"),
        "state": item.get("state"),
        "type": item.get("type"),
        "status": item.get("status", "published"),
        "title": item.get("title"),
        "url": item.get("url"),
        "description": item.get("description"),
        "author": item.get("author"),
        "key_findings": item.get("keyFindings", []),
        "tags": item.get("tags", []),
        "relevant_states": item.get("relevantStates"),
        "federal_tool_order": item.get("federalToolOrder"),
    }

    # Handle date field
    date_str = item.get("date") or item.get("expectedDate")
    if date_str:
        # Handle various date formats: "2024-12", "2025-01", "2025", "2026-Q1"
        if re.match(r'^\d{4}-\d{2}$', str(date_str)):
            # YYYY-MM format -> first of month
            transformed["date"] = f"{date_str}-01"
        elif re.match(r'^\d{4}$', str(date_str)):
            # YYYY format -> Jan 1
            transformed["date"] = f"{date_str}-01-01"
        elif re.match(r'^\d{4}-Q\d$', str(date_str)):
            # YYYY-Q# format -> approximate
            year = date_str[:4]
            quarter = int(date_str[-1])
            month = (quarter - 1) * 3 + 1
            transformed["date"] = f"{year}-{month:02d}-01"
        elif re.match(r'^\d{4}-\d{2}-\d{2}$', str(date_str)):
            # Already YYYY-MM-DD
            transformed["date"] = date_str
        else:
            # Unknown format, skip
            transformed["date"] = None

    # Remove None values for cleaner inserts
    return {k: v for k, v in transformed.items() if v is not None}


def transform_reform_impact(research_id: str, impact: dict) -> dict:
    """Transform a reform impact from JSON format to Supabase format."""
    return {
        "id": research_id,
        "policy_id": impact.get("policyId"),
        "computed": impact.get("computed", True),
        "computed_at": impact.get("computedAt"),
        "policyengine_us_version": impact.get("policyengineUsVersion"),
        "dataset_name": impact.get("datasetName"),
        "dataset_version": impact.get("datasetVersion"),
        "budgetary_impact": impact.get("budgetaryImpact"),
        "poverty_impact": impact.get("povertyImpact"),
        "child_poverty_impact": impact.get("childPovertyImpact"),
        "winners_losers": impact.get("winnersLosers"),
        "decile_impact": impact.get("decileImpact"),
        "inequality": impact.get("inequality"),
        "district_impacts": impact.get("districtImpacts"),
    }


def migrate(dry_run: bool = False):
    """Run the migration."""
    print("=" * 60)
    print("Supabase Migration")
    print("=" * 60)
    print(f"Dry run: {dry_run}")
    print(f"Supabase URL: {SUPABASE_URL}")
    print()

    if not SUPABASE_KEY and not dry_run:
        print("Error: SUPABASE_KEY environment variable not set")
        print("Set it with: export SUPABASE_KEY='your_service_role_key'")
        sys.exit(1)

    # Initialize Supabase client
    supabase: Client = None
    if not dry_run:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

    # Load data
    print("Loading data files...")

    try:
        research_items = parse_research_js_manual(RESEARCH_JS_PATH)
        print(f"  Loaded {len(research_items)} research items from research.js")
    except Exception as e:
        print(f"  Error loading research.js: {e}")
        import traceback
        traceback.print_exc()
        research_items = []

    try:
        reform_impacts = load_reform_impacts(REFORM_IMPACTS_PATH)
        print(f"  Loaded {len(reform_impacts)} reform impacts from reformImpacts.json")
    except Exception as e:
        print(f"  Error loading reformImpacts.json: {e}")
        reform_impacts = {}

    print()

    # Transform and insert research items
    print("Migrating research items...")
    research_records = []
    for item in research_items:
        try:
            record = transform_research_item(item)
            research_records.append(record)
            status_icon = "✓" if record.get("status") == "published" else "○"
            if dry_run:
                print(f"  {status_icon} [DRY RUN] {record['id']} ({record.get('state', '?')}) - {record.get('title', 'No title')[:50]}")
        except Exception as e:
            print(f"  ✗ Error transforming item {item.get('id', 'unknown')}: {e}")

    if not dry_run and research_records:
        try:
            # Use upsert to handle existing records
            result = supabase.table("research").upsert(research_records).execute()
            print(f"  Inserted/updated {len(research_records)} research records")
        except Exception as e:
            print(f"  Error inserting research records: {e}")

    print()

    # Transform and insert reform impacts
    print("Migrating reform impacts...")
    impact_records = []
    for research_id, impact in reform_impacts.items():
        try:
            record = transform_reform_impact(research_id, impact)
            impact_records.append(record)
            if dry_run:
                budget = impact.get("budgetaryImpact", {})
                net_cost = budget.get("netCost", 0)
                cost_str = f"${net_cost/1e6:,.1f}M" if net_cost else "N/A"
                print(f"  ○ [DRY RUN] {research_id} - policy_id: {record.get('policy_id')} - revenue: {cost_str}")
        except Exception as e:
            print(f"  ✗ Error transforming impact {research_id}: {e}")

    if not dry_run and impact_records:
        try:
            # Check which research IDs exist
            existing_research = supabase.table("research").select("id").execute()
            existing_ids = {r["id"] for r in existing_research.data}

            # Filter to only impacts that have corresponding research records
            valid_impacts = [i for i in impact_records if i["id"] in existing_ids]
            orphan_impacts = [i for i in impact_records if i["id"] not in existing_ids]

            if valid_impacts:
                result = supabase.table("reform_impacts").upsert(valid_impacts).execute()
                print(f"  Inserted/updated {len(valid_impacts)} impact records")

            if orphan_impacts:
                print(f"  ⚠ Skipped {len(orphan_impacts)} impacts without matching research records:")
                for imp in orphan_impacts:
                    print(f"    - {imp['id']}")
                print()
                print("  These impacts have IDs that don't match any research.id")
                print("  You may need to create research entries for them or update the IDs")

        except Exception as e:
            print(f"  Error inserting impact records: {e}")
            import traceback
            traceback.print_exc()

    print()
    print("=" * 60)
    print("Migration complete!")
    if dry_run:
        print("This was a dry run. No data was modified.")
        print("Run without --dry-run to perform the actual migration.")


def main():
    parser = argparse.ArgumentParser(description="Migrate data to Supabase")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Preview migration without making changes"
    )
    args = parser.parse_args()

    migrate(dry_run=args.dry_run)


if __name__ == "__main__":
    main()
