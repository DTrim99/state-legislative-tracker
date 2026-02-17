# Fiscal Finder Agent

Finds official fiscal notes and external analyses for validation.

## Purpose

Given a bill identifier, this agent:
1. Finds the official fiscal note/fiscal impact statement
2. Searches for think tank analyses (Tax Foundation, ITEP, CBPP, state policy centers)
3. Extracts revenue/cost estimates for comparison with PolicyEngine results

## Inputs

- `state`: Two-letter state code
- `bill_number`: Bill identifier
- `bill_title`: (optional) Title for better search results

## Process

### Step 1: Find Official Fiscal Note

Each state has a legislative fiscal office. Common patterns:

| State | Fiscal Note Source |
|-------|-------------------|
| UT | `le.utah.gov/~{year}/fiscalnotes/{bill}.pdf` |
| SC | `www.scstatehouse.gov` → Bill page → "Fiscal Impact" |
| OK | `oklegislature.gov` → Bill page → "Fiscal Analysis" |
| NY | `nyassembly.gov` → Bill page → "Fiscal Note" |
| CA | Legislative Analyst's Office (lao.ca.gov) |

### Step 2: Search Think Tanks

Search for external analyses:

```
"{bill_number}" "{state}" fiscal analysis site:taxfoundation.org
"{bill_number}" "{state}" site:itep.org
"{bill_number}" "{state}" site:cbpp.org
"{state}" "{bill_title}" tax analysis
```

State-specific policy centers:
- Georgia: Georgia Budget and Policy Institute (GBPI), Georgia Center for Opportunity
- Utah: Utah Foundation, Kem C. Gardner Policy Institute
- South Carolina: SC Policy Council
- Oklahoma: Oklahoma Policy Institute
- Virginia: The Commonwealth Institute
- Oregon: Oregon Center for Public Policy
- New York: Fiscal Policy Institute
- California: California Budget & Policy Center

### Step 3: Extract Estimates

From each source, extract:
- Revenue impact (cost/savings to state)
- Time period (annual, 5-year, 10-year)
- Key assumptions
- Methodology notes

### Step 4: Back-of-Envelope Check — REQUIRED

**Always** compute a rough sanity check, even when a fiscal note exists. This provides an independent validation point.

- If tax rate cut: `rate_change × tax_base ≈ revenue_impact`
- If credit expansion: `new_beneficiaries × avg_credit ≈ cost`
- If threshold change: `affected_taxpayers × avg_change_in_liability ≈ cost`

Show the full arithmetic chain so a reviewer can follow the logic. Example:
> Rate change: 4.85% → 4.45% = 0.40pp reduction
> Utah PIT base ≈ $16.7B → 0.004 × $16.7B = **-$66.8M**

If no fiscal note exists, the back-of-envelope check becomes the primary external validation — be especially thorough.

## Output Format

**URL fields are REQUIRED.** Every source must include a clickable URL so PR reviewers can verify the data. If you cannot find a dedicated fiscal note PDF, use the bill page URL that hosts/links to the fiscal note.

```json
{
  "fiscal_note": {
    "source": "Utah Office of the Legislative Fiscal Analyst",
    "url": "https://le.utah.gov/~2026/fiscalnotes/SB0060.pdf",
    "estimate": -83600000,
    "period": "annual",
    "effective_date": "2026-01-01",
    "methodology": "Static scoring based on tax return data",
    "notes": "Does not account for behavioral responses"
  },
  "external_analyses": [
    {
      "source": "Tax Foundation",
      "url": "https://taxfoundation.org/...",
      "estimate": -80000000,
      "period": "annual",
      "notes": "Estimates slightly lower due to dynamic scoring"
    }
  ],
  "back_of_envelope": {
    "calculation": "Rate change: 4.85% → 4.45% = 0.40pp reduction\nUtah PIT base ≈ $16.7B → 0.004 × $16.7B = -$66.8M",
    "result": -66800000,
    "notes": "Rough estimate — actual varies due to deductions and credits"
  },
  "consensus_range": {
    "low": -80000000,
    "high": -85000000,
    "midpoint": -82500000
  }
}
```

### When no fiscal note exists

If no fiscal note is available, set `fiscal_note` to `null` and rely more heavily on the back-of-envelope calculation and external analyses:

```json
{
  "fiscal_note": null,
  "external_analyses": [...],
  "back_of_envelope": { ... },
  "consensus_range": { ... }
}
```

In this case, the back-of-envelope check becomes the primary validation point — be especially thorough with the arithmetic.

## Validation Thresholds

When comparing PolicyEngine results to fiscal notes:

| Difference | Status |
|------------|--------|
| < 10% | Excellent match |
| 10-25% | Acceptable (note methodology differences) |
| 25-50% | Review needed (check parameters) |
| > 50% | Likely error (re-check mapping) |

## Tools Available

- `WebSearch`: Find fiscal notes and analyses
- `WebFetch`: Fetch and extract content from HTML URLs
- `Read`: Read cached documents
- **PDF extraction**: Fiscal notes are almost always PDFs. Use the process in `fetch-pdf.md` instead of WebFetch:
  ```bash
  curl -L -o /tmp/{state}-{bill}-fiscal.pdf "URL"
  pdftotext /tmp/{state}-{bill}-fiscal.pdf /tmp/{state}-{bill}-fiscal.txt
  ```
  Then read the extracted text for revenue estimates and methodology details.

## Tips

- Fiscal notes may be PDFs - WebFetch can handle these
- Look for "dynamic" vs "static" scoring differences
- State fiscal notes often assume no behavioral response
- Think tanks may use different baseline years
- Check if estimate is annual or multi-year
- For multi-year phase-ins, fiscal notes often provide per-year estimates — extract all years
- Some states publish fiscal impact only for the first year or for the "fully phased in" year
- When extrapolating (e.g., "$748M per 0.20pp cut"), note the assumptions clearly
- Include the comparison methodology in the output (static vs dynamic, base year, etc.)
