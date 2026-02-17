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
| NC | NC Fiscal Research Division: `sites.ncleg.gov/frd/fiscal-notes/` |
| CT | OFA fiscal notes: `cga.ct.gov/ofa/` |
| KS | `kslegislature.gov` → Bill page → Fiscal Note PDF |
| ND | `ndlegis.gov` → Bill page → "Fiscal Notes" tab |
| IL | `ilga.gov` → Bill page → "Fiscal Note" |
| RI | `rilegislature.gov` → Bill page → Fiscal Note |
| WV | `wvlegislature.gov` → Bill page → Fiscal Note |
| GA | `legis.ga.gov` → Bill page → Fiscal Note |

### Step 2: Search Think Tanks

Search for external analyses:

```
"{bill_number}" "{state}" fiscal analysis site:taxfoundation.org
"{bill_number}" "{state}" site:itep.org
"{bill_number}" "{state}" site:cbpp.org
"{state}" "{bill_title}" tax analysis
```

State-specific policy centers (see expanded list in "When no fiscal note exists" section below):
- Georgia: Georgia Budget and Policy Institute (GBPI)
- Utah: Utah Foundation, Kem C. Gardner Policy Institute
- South Carolina: SC Policy Council
- Oklahoma: Oklahoma Policy Institute
- Virginia: The Commonwealth Institute
- Oregon: Oregon Center for Public Policy
- New York: Fiscal Policy Institute
- California: California Budget & Policy Center
- Connecticut: Connecticut Voices for Children, OLR (cga.ct.gov/olr)
- North Carolina: NC Budget & Tax Center (ncbudget.org)
- Kansas: Kansas Policy Institute, Kansas Center for Economic Growth
- Illinois: Center for Tax and Budget Accountability
- Wisconsin: Wisconsin Policy Forum
- Rhode Island: Economic Progress Institute
- West Virginia: WV Center on Budget & Policy

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

### When no fiscal note exists — deeper search strategies

Many bills (especially concept bills, early-session filings, and bills that stall in committee) never receive an official fiscal note. When this happens, you MUST pursue ALL of the following fallback strategies before concluding no external estimate exists.

#### Strategy 1: State Tax Expenditure Reports

Most states publish annual Tax Expenditure Reports showing the revenue cost of existing deductions, credits, and exemptions. These provide **upper bounds** for bills that modify those provisions.

- Search: `"{state}" tax expenditure report {current_year} site:{state_leg_domain}`
- Example: CT's Tax Expenditure Report showed the total SS benefit deduction costs $223M/year — a bill eliminating the income threshold for that deduction would cost a fraction of $223M
- **Critical**: The bill's incremental cost ≠ the total tax expenditure. Reason about what fraction the bill affects. E.g., "PE's -$56M = 25% of $223M, consistent with eliminating the 25% taxable portion for above-threshold filers"

#### Strategy 2: Companion and predecessor bills

Bills are frequently re-introduced across sessions. A predecessor from a prior year may have advanced further and received a fiscal note.

- Search the state legislature for identical or similar bill titles from the previous 2-3 sessions
- Search for omnibus tax bills that included the same provision as a line item (e.g., KS HB 2457 was a $641.7M omnibus bill whose "Standard Deduction COLA" line item provided a reference point for KS HB2629)
- Even if not directly comparable (different base year, different amounts, fiscal year blending), these provide calibration points

#### Strategy 3: State policy center analyses

State-level policy organizations often publish analyses of tax bills even when no official fiscal note exists. Search aggressively:

| State | Policy Centers |
|-------|---------------|
| GA | Georgia Budget and Policy Institute (GBPI), Georgia Center for Opportunity |
| UT | Utah Foundation, Kem C. Gardner Policy Institute |
| SC | SC Policy Council |
| OK | Oklahoma Policy Institute |
| VA | The Commonwealth Institute |
| OR | Oregon Center for Public Policy |
| NY | Fiscal Policy Institute |
| CA | California Budget & Policy Center |
| CT | Connecticut Voices for Children, OLR reports (cga.ct.gov/olr) |
| NC | NC Budget & Tax Center (ncbudget.org), NC Justice Center |
| KS | Kansas Policy Institute, Kansas Center for Economic Growth |
| IL | Center for Tax and Budget Accountability |
| WI | Wisconsin Policy Forum |
| RI | Rhode Island Policy Reporter, Economic Progress Institute |
| ND | ND Policy Institute |
| WV | WV Center on Budget & Policy |

These organizations often publish blog posts, issue briefs, or revenue analyses within days of a bill being filed.

#### Strategy 4: Revenue-base reasoning (most reliable back-of-envelope)

For rate changes, derive the implied taxable income base from known revenue and rate, then apply the change:

```
State PIT revenue / current rate = taxable income base
Taxable income base × rate change = revenue impact
```

Example (NC H459):
> NC PIT revenue (~$17.0B) / 4.25% = $400B taxable base
> $400B × 0.26pp = ~$1.04B/year
> PE estimate: $930M — within 10%

This approach is especially robust because it uses the state's own revenue data as the anchor.

#### Strategy 5: Tax expenditure ratio reasoning

For bills modifying thresholds or exemptions, compute what fraction of the total tax expenditure the bill affects:

```
Total tax expenditure for this provision: $X
Bill modifies Y% of the provision's scope
Expected impact: $X × Y%
```

Example (CT SB00078):
> Total SS deduction expenditure: $223M (covers all filers)
> Bill eliminates the 25% taxable cap for above-threshold filers
> PE estimate ($56M) = 25% of $223M ✓ — internally consistent

#### Output when no fiscal note exists

```json
{
  "fiscal_note": null,
  "fiscal_note_search_notes": "Bill referred to committee 2/4/2026; no OFA fiscal note published. Checked companion bills HB05022 and HB05097 (same session) and predecessor HB05408 (2025 session) — none received fiscal notes.",
  "external_analyses": [...],
  "back_of_envelope": { ... },
  "consensus_range": { ... }
}
```

Always document what you searched and why no fiscal note was found, so PR reviewers know the search was thorough.

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
