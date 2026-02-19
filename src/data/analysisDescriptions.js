/**
 * Analysis descriptions for reforms in the state legislative tracker.
 *
 * Edit descriptions and provisions here — changes are version-controlled.
 * Computed data (impacts, district results) stays in Supabase.
 */

const analysisDescriptions = {
  // Arizona
  "az-hb2636": {
    description: "Replaces Arizona's 2.5% flat individual income tax with a two-bracket progressive structure: 2.5% on the first $1M of taxable income, 8% on income above $1M. Same threshold for all filing statuses. Effective TY2027.",
    analysisYear: 2027,
    provisions: [
      {
        label: "8% millionaire surcharge",
        baseline: "2.5% flat rate on all taxable income",
        reform: "2.5% on first $1M, 8% on income above $1M",
        explanation: "Creates a two-bracket progressive income tax replacing Arizona's current 2.5% flat rate. The first $1,000,000 of taxable income remains at 2.5%, while income above $1,000,000 is taxed at 8% \u2014 a 5.5 percentage point surcharge. The same $1M threshold applies to all filing statuses (single, joint, head of household, married filing separately).",
      },
    ],
  },

  // Colorado
  "co-hb1062": {
    description: "Eliminates the $20,000 (age 55-64) and $24,000 (age 65+) caps on Colorado's pension and annuity income subtraction, allowing taxpayers age 55+ to deduct all qualifying retirement income (pensions, annuities, IRA distributions, Social Security) from state taxable income, effective tax year 2027.",
    analysisYear: 2027,
    provisions: [
      {
        label: "Pension/annuity subtraction cap (age 55-64)",
        baseline: "$20,000",
        reform: "Unlimited",
        explanation: "Eliminates the $20,000 cap on pension and annuity income subtraction for taxpayers age 55-64, allowing full deduction of all qualifying retirement income.",
      },
      {
        label: "Pension/annuity subtraction cap (age 65+)",
        baseline: "$24,000",
        reform: "Unlimited",
        explanation: "Eliminates the $24,000 cap on pension and annuity income subtraction for taxpayers age 65+, allowing full deduction of all qualifying retirement income.",
      },
    ],
  },

  // Connecticut
  "ct-sb00078": {
    description: "Eliminates the qualifying income thresholds for the personal income tax deductions for Social Security benefits. Currently, filers above $75K (single) / $100K (joint) can only deduct 75% of SS benefits; this bill makes 100% deductible for all.",
    analysisYear: 2026,
    provisions: [
      {
        label: "SS Deduction Threshold (Single/Separate)",
        baseline: "$75,000 AGI threshold",
        reform: "No threshold (full deduction for all)",
        explanation: "Eliminates the $75,000 AGI qualifying income threshold for single and married filing separately filers, making Social Security benefits fully deductible regardless of income.",
      },
      {
        label: "SS Deduction Threshold (Joint/HoH/Surviving)",
        baseline: "$100,000 AGI threshold",
        reform: "No threshold (full deduction for all)",
        explanation: "Eliminates the $100,000 AGI qualifying income threshold for joint, head of household, and surviving spouse filers, making Social Security benefits fully deductible regardless of income.",
      },
    ],
  },

  // Washington DC
  "dc-hjr142": {
    description: "Congressional resolution disapproving the D.C. Income and Franchise Tax Conformity and Revision Emergency Amendment Act of 2025, which would eliminate the $1,000 Child Tax Credit and revert the EITC match for households with children from 100% to 85%.",
    analysisYear: 2025,
    provisions: [
      {
        label: "DC EITC Match Rate",
        baseline: "100% of federal EITC",
        reform: "85% of federal EITC",
        explanation: "Reverts DC's Earned Income Tax Credit match rate from 100% to 85% of the federal credit for filers with qualifying children, effective tax year 2025.",
      },
      {
        label: "DC Child Tax Credit",
        baseline: "$1,000 per child",
        reform: "Eliminated ($0)",
        explanation: "Eliminates the $1,000 refundable DC Child Tax Credit for qualifying children under age 18, effective tax year 2026.",
      },
    ],
  },

  // Georgia
  "ga-sb168": {
    description: "Reduces Georgia's flat income tax rate from 5.09% to 4.19% for 2026, with 1.0pp annual cuts to eliminate the tax by 2031. Removes revenue trigger conditions and rate floor.",
    analysisYear: 2031,
    provisions: [
      {
        label: "Georgia Income Tax Rate",
        baseline: "5.09%",
        reform: "4.19%",
        explanation: "Reduces Georgia's flat income tax rate from 5.09% to 4.19% for tax year 2026, as part of an accelerated plan to eliminate the state income tax entirely by 2031.",
      },
    ],
  },

  "ga-sb476": {
    description: "Reduces Georgia income tax rate to 4.99% and increases standard deductions to $50,000 for single filers and $100,000 for joint filers, effective January 1, 2026.",
    analysisYear: 2026,
    provisions: [
      {
        label: "Georgia Income Tax Rate",
        baseline: "5.09%",
        reform: "4.99%",
        explanation: "Reduces Georgia's flat income tax rate from 5.09% to 4.99% for all filers, accelerating the rate reduction schedule by one year.",
      },
      {
        label: "Standard Deduction (Single)",
        baseline: "$12,000",
        reform: "$50,000",
        explanation: "Increases the standard deduction for single filers from $12,000 to $50,000, effectively eliminating state income tax for individuals earning under $50,000.",
      },
      {
        label: "Standard Deduction (Joint)",
        baseline: "$24,000",
        reform: "$100,000",
        explanation: "Increases the standard deduction for joint filers from $24,000 to $100,000, effectively eliminating state income tax for married couples earning under $100,000.",
      },
      {
        label: "Standard Deduction (Head of Household)",
        baseline: "$12,000",
        reform: "$50,000",
        explanation: "Increases the standard deduction for head of household filers from $12,000 to $50,000.",
      },
      {
        label: "Standard Deduction (Married Filing Separately)",
        baseline: "$12,000",
        reform: "$50,000",
        explanation: "Increases the standard deduction for married filing separately from $12,000 to $50,000.",
      },
      {
        label: "Standard Deduction (Surviving Spouse)",
        baseline: "$12,000",
        reform: "$50,000",
        explanation: "Increases the standard deduction for surviving spouses from $12,000 to $50,000.",
      },
    ],
  },

  // Iowa
  "ia-hf1020": {
    description: "Modifies the Iowa child and dependent care credit by removing the $90,000 income cap and simplifying from 7 brackets to 4. Taxpayers with Iowa net income of $25,000 or more receive 50% of the federal credit (up from 30-40% for middle-income and 0% for high-income). Retroactive to January 1, 2025.",
    analysisYear: 2025,
    provisions: [
      {
        label: "CDCC fraction ($35K-$40K income)",
        baseline: "40% of federal credit",
        reform: "50% of federal credit",
        explanation: "Increases the Iowa child and dependent care credit from 40% to 50% of the federal credit for taxpayers with Iowa net income between $35,000 and $40,000.",
      },
      {
        label: "CDCC fraction ($40K-$90K income)",
        baseline: "30% of federal credit",
        reform: "50% of federal credit",
        explanation: "Increases the Iowa child and dependent care credit from 30% to 50% of the federal credit for taxpayers with Iowa net income between $40,000 and $90,000.",
      },
      {
        label: "CDCC fraction ($90K+ income)",
        baseline: "0% (ineligible)",
        reform: "50% of federal credit",
        explanation: "Removes the $90,000 income cap, allowing taxpayers with net income of $90,000 or more to claim 50% of the federal child and dependent care credit.",
      },
    ],
  },

  // Illinois
  "il-hb4680": {
    description: "Increases the Illinois Earned Income Tax Credit match from 20% to 30% of the federal EITC, effective January 1, 2026.",
    analysisYear: 2026,
    provisions: [
      {
        label: "Illinois EITC Match",
        baseline: "20%",
        reform: "30%",
        explanation: "Increases Illinois's state Earned Income Tax Credit from 20% to 30% of the federal EITC, applying to filers within the federal EITC eligibility range.",
      },
    ],
  },

  // Kansas
  "ks-hb2629": {
    description: "Kansas HB2629 increases the standard deduction base amounts for all filing statuses effective tax year 2026: single from $3,605 to $3,805, joint from $8,240 to $8,640, head of household from $6,180 to $6,480.",
    analysisYear: 2026,
    provisions: [
      {
        label: "Kansas Standard Deduction",
        baseline: "$3,605 / $8,240 / $6,180 (single / joint / HoH)",
        reform: "$3,805 / $8,640 / $6,480 (single / joint / HoH)",
        explanation: "Increases the Kansas standard deduction base amounts for tax year 2026 and thereafter. Single filers increase from $3,605 to $3,805 (+$200). Married filing jointly and surviving spouse increase from $8,240 to $8,640 (+$400). Head of household increases from $6,180 to $6,480 (+$300). Married filing separately increases from $4,120 to $4,320 (+$200, equal to half the joint amount).",
      },
    ],
  },

  // Massachusetts
  "ma-h5007": {
    description: "Initiative petition to reduce Massachusetts' personal income tax rate from 5% to 4% through a three-year phase-in: 4.67% in 2027, 4.33% in 2028, and 4.00% starting in 2029. Applies to both Part A (interest/dividends) and Part B (regular income). Does not affect the 4% surtax on income over $1M.",
    analysisYear: 2029,
    provisions: [
      {
        label: "Interest and Dividends Tax Rate",
        baseline: "5.00%",
        reform: "4.67% (2027), 4.33% (2028), 4.00% (2029+)",
        explanation: "The tax rate on interest and dividend income (Part A) is reduced from 5.00% to 4.00% over a three-year phase-in period.",
      },
      {
        label: "Regular Income Tax Rate",
        baseline: "5.00%",
        reform: "4.67% (2027), 4.33% (2028), 4.00% (2029+)",
        explanation: "The tax rate on regular income (Part B) is reduced from 5.00% to 4.00% over a three-year phase-in period.",
      },
    ],
  },

  // Maryland
  "md-hb411": {
    description: "Increases the Maryland standard deduction from $3,350 to $4,100 for single filers and from $6,700 to $8,200 for joint filers, heads of household, and surviving spouses, effective tax year 2026. Also updates the COLA base amounts.",
    analysisYear: 2030,
    provisions: [
      {
        label: "Standard Deduction (Single/MFS)",
        baseline: "$3,350 (COLA-adjusted to ~$3,400 for 2026)",
        reform: "$4,100",
        explanation: "Increases the flat standard deduction for single filers and married filing separately from $3,350 to $4,100.",
      },
      {
        label: "Standard Deduction (Joint/HoH/Surviving Spouse)",
        baseline: "$6,700 (COLA-adjusted to ~$6,850 for 2026)",
        reform: "$8,200",
        explanation: "Increases the flat standard deduction for joint filers, heads of household, and surviving spouses from $6,700 to $8,200.",
      },
    ],
  },

  // Michigan
  "mi-hb4170": {
    description: "Amends the Income Tax Act to reduce Michigan's flat individual income tax rate from 4.25% to 4.05%, effective for tax years beginning after December 31, 2024 (retroactive to TY 2025).",
    analysisYear: 2025,
    provisions: [
      {
        label: "Michigan Income Tax Rate",
        baseline: "4.25%",
        reform: "4.05%",
        explanation: "Reduces Michigan's flat individual income tax rate from 4.25% to 4.05%, restoring the rate that briefly applied in TY 2023.",
      },
    ],
  },

  "mi-invest-in-kids": {
    description: "Constitutional amendment imposing a 5% income tax surcharge on income above $500,000 (single) or $1 million (joint) to fund K-12 education.",
    analysisYear: 2027,
    provisions: [
      {
        label: "Michigan High-Income Surtax",
        baseline: "Not in effect",
        reform: "5% on income above threshold",
        explanation: "Imposes a 5% income tax surcharge on taxable income exceeding $500,000 for single filers or $1,000,000 for joint filers, in addition to Michigan's flat 4.25% income tax rate.",
      },
    ],
  },

  // Minnesota
  "mn-hf154": {
    description: "Reduces Minnesota's first-tier individual income tax rate from 5.35% to 2.8%, a 2.55 percentage point cut affecting all filing statuses. Also rebases statutory bracket thresholds to 2025 inflation-adjusted values (no real-world threshold change). Effective for tax years beginning after December 31, 2024.",
    analysisYear: 2025,
    provisions: [
      {
        label: "First-tier income tax rate",
        baseline: "5.35%",
        reform: "2.80%",
        explanation: "Reduces Minnesota's lowest marginal income tax rate from 5.35% to 2.8%, a 2.55 percentage point cut. This applies to all taxable income in the first bracket across all filing statuses (e.g., first $32,570 for single, $47,620 for MFJ in 2025).",
      },
    ],
  },

  // Missouri
  "mo-sb458": {
    description: "Replaces Missouri's graduated income tax brackets (0%-4.7%) with a flat 4.0% rate on all taxable income, effective January 1, 2026. Also eliminates Missouri's federal income tax deduction (\u00a7143.171), which currently allows filers to deduct 5-35% of federal taxes paid. Includes a trigger mechanism for further rate reductions toward zero contingent on a constitutional amendment (not modeled).",
    analysisYear: 2026,
    provisions: [
      {
        label: "Flat 4.0% income tax rate",
        baseline: "Graduated 0%-4.7% (8 brackets)",
        reform: "Flat 4.0% on all taxable income",
        explanation: "Replaces Missouri's graduated income tax structure (rates from 0% to 4.7% across 8 brackets) with a flat 4.0% rate on all taxable income. Most taxpayers above the standard deduction see a net tax cut on income above ~$6,565 (the current 4.0% bracket threshold), while paying slightly more on the first ~$6,565 of taxable income.",
      },
      {
        label: "Federal income tax deduction elimination",
        baseline: "5-35% of federal tax paid (sliding scale by AGI)",
        reform: "Eliminated",
        explanation: "Eliminates Missouri's deduction allowing filers to deduct a portion of federal income taxes paid from their state taxable income. Currently filers with AGI under $25,000 can deduct 35% (capped at $10,000), scaling down to 5% for AGI $100,000-$125,000 and 0% above $125,000. This broadens the state tax base and partially offsets the rate cut.",
      },
    ],
  },

  // Mississippi
  "ms-sb2869": {
    description: "Freezes the Mississippi income tax rate at 4% permanently, reversing the HB1 (Build Up Mississippi Act) phase-out schedule that would reduce the rate to 3% by 2030 and eventually eliminate it.",
    analysisYear: 2030,
    provisions: [
      {
        label: "Mississippi Income Tax Rate Freeze",
        baseline: "3.75% (2027) \u2192 3.5% (2028) \u2192 3.25% (2029) \u2192 3.0% (2030+)",
        reform: "4.0% permanently",
        explanation: "Freezes the MS income tax rate at 4% by reversing the HB1 phase-out schedule, preventing scheduled annual reductions.",
      },
    ],
  },

  // North Carolina
  "nc-h459": {
    description: "Freezes the North Carolina flat individual income tax rate at 4.25% for tax years 2026 through 2028, preventing the scheduled reduction to 3.99%. Suspends the rate reduction trigger mechanism and reinstates it for 2029+ with a shortened trigger table. Motivated by Hurricane Helene recovery costs.",
    analysisYear: 2028,
    provisions: [
      {
        label: "NC Individual Income Tax Rate Freeze",
        baseline: "3.99% (scheduled reduction from 4.25%)",
        reform: "4.25% (rate frozen through 2028)",
        explanation: "Freezes the North Carolina flat individual income tax rate at 4.25% for tax years 2026 through 2028, preventing the scheduled reduction to 3.99%. The rate reduction trigger mechanism is suspended during this period and reinstated for 2029+.",
      },
    ],
  },

  // North Dakota
  "nd-hb1388": {
    description: "North Dakota HB1388 eliminates the marriage penalty by restructuring income tax bracket thresholds so MFJ equals 2x single, HoH equals 1.5x single, and MFS uses the single schedule. It also repeals the existing marriage penalty credit (capped at ~$312). The bill passed the House 91-0 but failed in the Senate 13-33.",
    analysisYear: 2025,
    provisions: [
      {
        label: "MFJ/Surviving Spouse Bracket Thresholds (2x Single)",
        baseline: "$78,775 / $289,975",
        reform: "$96,950 / $489,650",
        explanation: "Widens married-filing-jointly and surviving spouse bracket thresholds to exactly double the single filer thresholds, eliminating the structural marriage penalty. The 1.95% bracket starts at $96,950 (was $78,775) and the 2.50% bracket starts at $489,650 (was $289,975).",
      },
      {
        label: "Single Filer Bracket Thresholds",
        baseline: "$47,150 / $238,200",
        reform: "$48,475 / $244,825",
        explanation: "Updates single filer bracket thresholds to 2025 inflation-adjusted statutory values. The 1.95% bracket starts at $48,475 (was $47,150) and the 2.50% bracket starts at $244,825 (was $238,200).",
      },
      {
        label: "MFS Bracket Thresholds (Merged with Single)",
        baseline: "$39,375 / $144,975",
        reform: "$48,475 / $244,825",
        explanation: "Merges the married-filing-separately schedule into the single filer schedule. MFS thresholds widen from $39,375/$144,975 to $48,475/$244,825 (equal to single filer thresholds).",
      },
      {
        label: "Head of Household Bracket Thresholds (1.5x Single)",
        baseline: "$63,175 / $264,100",
        reform: "$72,713 / $367,238",
        explanation: "Widens head-of-household bracket thresholds to exactly 1.5x the single filer thresholds. The 1.95% bracket starts at $72,713 (was $63,175) and the 2.50% bracket starts at $367,238 (was $264,100).",
      },
      {
        label: "Marriage Penalty Credit Repeal",
        baseline: "$312 maximum",
        reform: "$0 (repealed)",
        explanation: "Repeals the marriage penalty tax credit (NDCC 57-38-01.28). The credit, capped at $312 (2025 inflation-adjusted), partially offset the marriage penalty for joint filers. With the bracket restructuring eliminating the structural penalty, the credit is no longer needed.",
      },
    ],
  },

  // New York
  "ny-a05435": {
    description: "Increases the personal income tax rate on taxable income between $5M and $25M from 10.30% to 10.80%, and on income over $25M from 10.90% to 11.40%. Also updates the supplemental tax incremental benefit to reflect the higher rates.",
    analysisYear: 2026,
    provisions: [
      {
        label: "NY Income Tax Rate ($5M-$25M bracket)",
        baseline: "10.30%",
        reform: "10.80%",
        explanation: "Increases the marginal income tax rate for taxable income between $5 million and $25 million from 10.30% to 10.80% (+0.50 percentage points). Applies to all filing statuses.",
      },
      {
        label: "NY Income Tax Rate ($25M+ bracket)",
        baseline: "10.90%",
        reform: "11.40%",
        explanation: "Increases the marginal income tax rate for taxable income over $25 million from 10.90% to 11.40% (+0.50 percentage points). Applies to all filing statuses.",
      },
      {
        label: "NY Supplemental Tax Incremental Benefit ($5M bracket)",
        baseline: "$32,500",
        reform: "$57,500",
        explanation: "Updates the supplemental tax incremental benefit at the $5M threshold to reflect the higher rate. Formula: (new_rate - rate_below) \u00d7 $5M = (10.80% - 9.65%) \u00d7 $5M = $57,500.",
      },
    ],
  },

  "ny-a06774": {
    description: "Increases the NY child and dependent care credit to 110% of the federal credit for taxpayers with NY AGI up to $50,000.",
    analysisYear: 2025,
    provisions: [
      {
        label: "NY Enhanced Child and Dependent Care Credit",
        baseline: "Not in effect (standard NY CDCC applies)",
        reform: "110% of federal CDCC for NY AGI \u2264 $50,000",
        explanation: "Creates an enhanced NY child and dependent care credit equal to 110% of the federal credit for taxpayers with NY AGI up to $50,000. Currently, NY provides 110% only for AGI \u2264 $25,000; this extends the enhanced rate to AGI \u2264 $50,000.",
      },
    ],
  },

  "ny-a5661": {
    description: "Increases New York's Earned Income Tax Credit match rate from 30% to 45% of the federal EITC.",
    analysisYear: 2026,
    provisions: [
      {
        label: "NY EITC Match Rate",
        baseline: "30%",
        reform: "45%",
        explanation: "Increases New York's Earned Income Tax Credit from 30% to 45% of the federal EITC, providing a 50% increase in benefits for eligible working families.",
      },
    ],
  },

  "ny-s4487": {
    description: "Creates a $1,000 refundable supplemental credit for each qualifying newborn (child born in current or previous tax year, ages 0-1). This is in addition to the existing Empire State Child Credit. Effective April 1, 2026.",
    analysisYear: 2026,
    provisions: [
      {
        label: "NY S04487 Newborn Credit",
        baseline: "Not in effect",
        reform: "$1,000 per newborn (ages 0-1)",
        explanation: "Creates a new $1,000 refundable supplemental credit for each qualifying newborn (child born in current or previous tax year, ages 0-1). This is in addition to the existing Empire State Child Credit.",
      },
    ],
  },

  "ny-s9077": {
    description: "Extends and expands the Empire State Child Credit through 2030+. Increases credit amounts annually and raises age eligibility to include 17-year-olds. Effective: January 1, 2027.",
    analysisYear: 2031,
    provisions: [
      {
        label: "Extend Enhanced ESCC Structure",
        baseline: "Expires 2027",
        reform: "Extends permanently",
        explanation: "Extends the post-2024 Empire State Child Credit structure beyond 2027.",
      },
      {
        label: "Credit for Young Children (Ages 0-3)",
        baseline: "$1,000",
        reform: "$1,500",
        explanation: "Increases from $1,000 (2026) to $1,150 (2027), $1,300 (2028), $1,500 (2029+).",
      },
      {
        label: "Credit for Older Children (Ages 4-16)",
        baseline: "$500",
        reform: "$1,500",
        explanation: "Increases from $500 (2026) to $750 (2027), $1,000 (2028), $1,250 (2029), $1,500 (2030+).",
      },
      {
        label: "Age Eligibility",
        baseline: "Under 17",
        reform: "Under 18",
        explanation: "Raises the age cap to include 17-year-olds in the credit.",
      },
    ],
  },

  // Oklahoma
  "ok-hb2229": {
    description: "Oklahoma HB2229 would double the state EITC match rate from 5% to 10% of the federal credit, effective for tax year 2026.",
    analysisYear: 2026,
    provisions: [
      {
        label: "Oklahoma State EITC",
        baseline: "5% of federal EITC",
        reform: "10% of federal EITC",
        explanation: "Doubles Oklahoma's state Earned Income Tax Credit from 5% to 10% of the federal EITC.",
      },
    ],
  },

  // Oregon
  "or-sb1507": {
    description: "One provision of Oregon state budget bill SB1507 raises the EITC match rate effective for tax year 2026. The match rate increases to 17% for families with young children (under 3) and 14% for others.",
    analysisYear: 2026,
    provisions: [
      {
        label: "Oregon EITC Match Rate",
        baseline: "9%\u201312%",
        reform: "14%\u201317%",
        explanation: "Increases Oregon's EITC match rate as a percentage of the federal Earned Income Tax Credit.",
      },
    ],
  },

  // Rhode Island
  "ri-s2364": {
    description: "Rhode Island S2364 increases the state earned-income tax credit from 16% to 30% of the federal earned-income credit, effective for tax years beginning on or after January 1, 2027.",
    analysisYear: 2027,
    provisions: [
      {
        label: "Rhode Island EITC Match Rate",
        baseline: "16% of federal EITC",
        reform: "30% of federal EITC",
        explanation: "Changes the Rhode Island earned-income credit from 16% to 30% of the federal earned-income credit for tax years beginning on or after January 1, 2027. The credit continues to be nonrefundable up to RI income tax liability, with 100% of the excess refundable.",
      },
    ],
  },

  // South Carolina
  "sc-h3492": {
    description: "South Carolina H.3492 makes the state EITC partially refundable (50% of the nonrefundable amount), effective for tax year 2026.",
    analysisYear: 2026,
    provisions: [
      {
        label: "SC EITC Refundability",
        baseline: "Non-refundable",
        reform: "Fully refundable",
        explanation: "Changes the South Carolina EITC from non-refundable to fully refundable. Filers whose credit exceeds their tax liability would receive the difference as a refund.",
      },
    ],
  },

  "sc-h4216": {
    description: "South Carolina H.4216 would replace the graduated income tax structure with a flat 3.99% rate across all income levels, effective for tax year 2026.",
    analysisYear: 2026,
    provisions: [
      {
        label: "SC Income Tax Rate (Bracket 2)",
        baseline: "3%",
        reform: "3.99%",
        explanation: "Changes the second income tax bracket rate from 3% to 3.99%.",
      },
      {
        label: "SC Income Tax Rate (Top Bracket)",
        baseline: "6.2%",
        reform: "3.99%",
        explanation: "Changes the top income tax bracket rate from 6.2% to 3.99%, creating a single rate across brackets.",
      },
    ],
  },

  // Utah
  "ut-sb60": {
    description: "Utah Senate Bill 60 would reduce the state flat income tax rate from 4.5% to 4.45%.",
    analysisYear: 2026,
    provisions: [
      {
        label: "Utah Income Tax Rate",
        baseline: "4.5%",
        reform: "4.45%",
        explanation: "Changes Utah's flat income tax rate from 4.5% to 4.45%.",
      },
    ],
  },

  "ut-hb210": {
    description: "Removes marriage penalties in Utah tax credits by equalizing phase-out thresholds for single and head-of-household filers, and creates a new marriage tax credit. Effective January 1, 2026.",
    analysisYear: 2026,
    provisions: [
      {
        label: "Marriage Tax Credit",
        baseline: "None",
        reform: "$79\u2013$158",
        explanation: "Creates a new nonrefundable marriage tax credit for married filers. Income limit of $90,000 (joint) or $45,000 (MFS).",
      },
      {
        label: "Child Tax Credit Phase-out",
        baseline: "$43,000",
        reform: "$27,000",
        explanation: "Changes the CTC phase-out start to equal half the $54,000 joint threshold.",
      },
      {
        label: "Taxpayer Credit Phase-out",
        baseline: "$27,320",
        reform: "$18,626",
        explanation: "Changes the taxpayer credit phase-out threshold for head-of-household filers to match single filers.",
      },
      {
        label: "Retirement Credit Phase-out",
        baseline: "$25,000\u2013$32,000",
        reform: "$16,000",
        explanation: "Changes the retirement credit phase-out threshold to equal half the $32,000 joint threshold.",
      },
      {
        label: "Social Security Benefits Credit Phase-out",
        baseline: "$54,000\u2013$90,000",
        reform: "$45,000",
        explanation: "Changes the SS benefits credit phase-out threshold to equal half the $90,000 joint threshold.",
      },
    ],
  },

  "ut-hb290": {
    description: "Utah HB290 raises child tax credit phaseout thresholds effective for tax year 2026. Single/HOH increases to $49k, Joint to $61k, and MFS to $30.5k, benefiting more middle-income families.",
    analysisYear: 2026,
    provisions: [
      {
        label: "Child Tax Credit Phase-out Thresholds",
        baseline: "$43,000\u2013$54,000",
        reform: "$49,000\u2013$61,000",
        explanation: "Increases the income thresholds at which Utah's Child Tax Credit begins to phase out for all filing statuses.",
      },
    ],
  },

  // Virginia
  "va-hb12": {
    description: "Removes the sunset provision on Virginia's enhanced standard deduction amounts of $8,750 (single) / $17,500 (married filing jointly). Without this bill, these amounts revert to $3,000 / $6,000 after tax year 2026.",
    analysisYear: 2027,
    provisions: [
      {
        label: "Standard Deduction (Single)",
        baseline: "$3,000 (after TY2026 sunset)",
        reform: "$8,750 (made permanent)",
        explanation: "Prevents the standard deduction for single filers from reverting to $3,000 after tax year 2026 by removing the sunset provision.",
      },
      {
        label: "Standard Deduction (Married Filing Jointly)",
        baseline: "$6,000 (after TY2026 sunset)",
        reform: "$17,500 (made permanent)",
        explanation: "Prevents the standard deduction for married filing jointly from reverting to $6,000 after tax year 2026 by removing the sunset provision.",
      },
      {
        label: "Standard Deduction (Married Filing Separately)",
        baseline: "$3,000 (after TY2026 sunset)",
        reform: "$8,750 (made permanent)",
        explanation: "Prevents the standard deduction for married filing separately from reverting to $3,000 after tax year 2026.",
      },
      {
        label: "Standard Deduction (Head of Household)",
        baseline: "$3,000 (after TY2026 sunset)",
        reform: "$8,750 (made permanent)",
        explanation: "Prevents the standard deduction for head of household filers from reverting to $3,000 after tax year 2026.",
      },
      {
        label: "Standard Deduction (Surviving Spouse)",
        baseline: "$3,000 (after TY2026 sunset)",
        reform: "$8,750 (made permanent)",
        explanation: "Prevents the standard deduction for surviving spouses from reverting to $3,000 after tax year 2026.",
      },
    ],
  },

  "va-hb979": {
    description: "Virginia HB979 proposes comprehensive income tax reform effective January 1, 2027. The bill increases standard deductions (single: $3k to $10k, joint: $6k to $20k) and adds new tax brackets for high earners (8% on income $600k-$1M, 10% on income over $1M).",
    analysisYear: 2027,
    provisions: [
      {
        label: "Standard Deduction Increase",
        baseline: "$3,000-$6,000",
        reform: "$10,000-$20,000",
        explanation: "Triples Virginia standard deduction amounts, primarily benefiting lower and middle income households.",
      },
      {
        label: "High-Earner Tax Brackets",
        baseline: "5.75% top rate",
        reform: "8% / 10% top rates",
        explanation: "Adds new tax brackets for high earners: 8% on income between $600,000 and $1 million, and 10% on income over $1 million.",
      },
    ],
  },

  // Wisconsin
  "wi-ab1030": {
    description: "Increases Wisconsin's Earned Income Tax Credit to 34% of the federal credit for all filers with children (up from 4%/11%/34%) and creates a new 15% credit for childless filers.",
    analysisYear: 2026,
    provisions: [
      {
        label: "WI EITC (0 children)",
        baseline: "0%",
        reform: "15%",
        explanation: "Creates a new Wisconsin EITC for childless filers equal to 15% of the federal credit.",
      },
      {
        label: "WI EITC (1 child)",
        baseline: "4%",
        reform: "34%",
        explanation: "Increases the Wisconsin EITC for filers with one child from 4% to 34% of the federal credit.",
      },
      {
        label: "WI EITC (2 children)",
        baseline: "11%",
        reform: "34%",
        explanation: "Increases the Wisconsin EITC for filers with two children from 11% to 34% of the federal credit.",
      },
    ],
  },

  // West Virginia
  "wv-hb4927": {
    description: "West Virginia HB4927 abolishes the personal income tax by setting all bracket rates to 0% for tax years beginning after December 31, 2026.",
    analysisYear: 2027,
    provisions: [
      {
        label: "West Virginia Personal Income Tax",
        baseline: "2.22%\u20134.82% (5 brackets)",
        reform: "0% (abolished)",
        explanation: "Sets all personal income tax bracket rates to 0% for all filing statuses, abolishing the WV personal income tax for tax years beginning after December 31, 2026.",
      },
    ],
  },

  "wv-sb392": {
    description: "Reduces West Virginia personal income tax rates across all five brackets by approximately 10%, effective January 1, 2026. The bill lowers rates from 2.22%-4.82% to 2.00%-4.34%.",
    analysisYear: 2026,
    provisions: [
      {
        label: "Income Tax Bracket 1 ($0-$10,000)",
        baseline: "2.22%",
        reform: "2.00%",
        explanation: "Reduces the tax rate for the first income bracket from 2.22% to 2.00% across all filing statuses.",
      },
      {
        label: "Income Tax Bracket 2 ($10,001-$25,000)",
        baseline: "2.96%",
        reform: "2.66%",
        explanation: "Reduces the tax rate for the second income bracket from 2.96% to 2.66% across all filing statuses.",
      },
      {
        label: "Income Tax Bracket 3 ($25,001-$40,000)",
        baseline: "3.33%",
        reform: "3.00%",
        explanation: "Reduces the tax rate for the third income bracket from 3.33% to 3.00% across all filing statuses.",
      },
      {
        label: "Income Tax Bracket 4 ($40,001-$60,000)",
        baseline: "4.44%",
        reform: "4.00%",
        explanation: "Reduces the tax rate for the fourth income bracket from 4.44% to 4.00% across all filing statuses.",
      },
      {
        label: "Income Tax Bracket 5 (Over $60,000)",
        baseline: "4.82%",
        reform: "4.34%",
        explanation: "Reduces the tax rate for the top income bracket from 4.82% to 4.34% across all filing statuses.",
      },
    ],
  },
};

export default analysisDescriptions;

export function getDescriptions(reformId) {
  return analysisDescriptions[reformId] || null;
}

export function hasDescriptions(reformId) {
  return reformId in analysisDescriptions;
}
