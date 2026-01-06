// State data focused on 2026 legislative session
// Tax changes, active bills, and research coverage

export const stateData = {
  AL: {
    name: "Alabama",
    abbr: "AL",
    session: { status: "active", dates: "Jan-May 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "5%", brackets: 3 },
      stateEITC: { available: false },
      stateCTC: { available: false },
    },
    legislativeActivity: "low",
    activeBills: [],
  },
  AK: {
    name: "Alaska",
    abbr: "AK",
    session: { status: "active", dates: "Jan-Apr 2026" },
    policyLevers: {
      incomeTax: { available: false, note: "No state income tax" },
      stateEITC: { available: false },
      stateCTC: { available: false },
    },
    legislativeActivity: "low",
    activeBills: [],
  },
  AZ: {
    name: "Arizona",
    abbr: "AZ",
    session: { status: "active", dates: "Jan-Apr 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "flat", topRate: "2.5%" },
      stateEITC: { available: false },
      stateCTC: { available: false },
    },
    legislativeActivity: "moderate",
    activeBills: [],
  },
  AR: {
    name: "Arkansas",
    abbr: "AR",
    session: { status: "active", dates: "Jan-Apr 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "4.4%", brackets: 3 },
      stateEITC: { available: false },
      stateCTC: { available: false },
    },
    legislativeActivity: "moderate",
    activeBills: [],
  },
  CA: {
    name: "California",
    abbr: "CA",
    session: { status: "active", dates: "Year-round" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "13.3%", brackets: 9 },
      stateEITC: { available: true, name: "CalEITC", type: "custom" },
      stateCTC: { available: true, name: "Young Child Tax Credit" },
    },
    legislativeActivity: "high",
    activeBills: [
      { bill: "ACA 3 (Billionaire Tax)", status: "proposed", description: "5% wealth tax on $1B+", url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260ACA3" }
    ],
    taxChanges: [],
  },
  CO: {
    name: "Colorado",
    abbr: "CO",
    session: { status: "active", dates: "Jan-May 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "flat", topRate: "4.4%" },
      stateEITC: { available: true, name: "Colorado EITC", match: "25%" },
      stateCTC: { available: true, name: "Colorado CTC" },
    },
    legislativeActivity: "moderate",
    activeBills: [],
  },
  CT: {
    name: "Connecticut",
    abbr: "CT",
    session: { status: "active", dates: "Jan-Jun 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "6.99%", brackets: 7 },
      stateEITC: { available: true, match: "30.5%" },
      stateCTC: { available: false },
    },
    legislativeActivity: "moderate",
    activeBills: [],
  },
  DE: {
    name: "Delaware",
    abbr: "DE",
    session: { status: "active", dates: "Jan-Jun 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "6.6%", brackets: 7 },
      stateEITC: { available: false },
      stateCTC: { available: false },
    },
    legislativeActivity: "low",
    activeBills: [],
  },
  FL: {
    name: "Florida",
    abbr: "FL",
    session: { status: "active", dates: "Mar-May 2026" },
    policyLevers: {
      incomeTax: { available: false, note: "No state income tax" },
      stateEITC: { available: false },
      stateCTC: { available: false },
    },
    legislativeActivity: "low",
    activeBills: [],
  },
  GA: {
    name: "Georgia",
    abbr: "GA",
    session: { status: "active", dates: "Jan-Mar 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "flat", topRate: "5.19%" },
      stateEITC: { available: false },
      stateCTC: { available: false },
    },
    legislativeActivity: "high",
    activeBills: [],
    pastLegislation: [
      { bill: "HB 111", year: 2024, description: "Accelerated flat tax to 5.19% (effective Jan 2025)", url: "https://www.legis.ga.gov/legislation/66053" }
    ],
  },
  HI: {
    name: "Hawaii",
    abbr: "HI",
    session: { status: "active", dates: "Jan-May 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "11%", brackets: 12 },
      stateEITC: { available: true, match: "20%" },
      stateCTC: { available: false },
    },
    legislativeActivity: "low",
    activeBills: [],
  },
  ID: {
    name: "Idaho",
    abbr: "ID",
    session: { status: "active", dates: "Jan-Mar 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "flat", topRate: "5.8%" },
      stateEITC: { available: false },
      stateCTC: { available: true, name: "Grocery Tax Credit" },
    },
    legislativeActivity: "moderate",
    activeBills: [],
    pastLegislation: [
      { bill: "H0001", year: 2025, description: "Rate cut to 5.8% + grocery credit expansion (-$225M)", url: "https://legislature.idaho.gov/sessioninfo/2025/legislation/H0001/" }
    ],
  },
  IL: {
    name: "Illinois",
    abbr: "IL",
    session: { status: "active", dates: "Jan-May 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "flat", topRate: "4.95%" },
      stateEITC: { available: true, match: "20%" },
      stateCTC: { available: false },
    },
    legislativeActivity: "moderate",
    activeBills: [],
  },
  IN: {
    name: "Indiana",
    abbr: "IN",
    session: { status: "active", dates: "Jan-Apr 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "flat", topRate: "3.05%" },
      stateEITC: { available: true, match: "10%" },
      stateCTC: { available: false },
    },
    legislativeActivity: "moderate",
    activeBills: [],
  },
  IA: {
    name: "Iowa",
    abbr: "IA",
    session: { status: "active", dates: "Jan-Apr 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "flat", topRate: "3.8%" },
      stateEITC: { available: true, match: "15%" },
      stateCTC: { available: false },
    },
    legislativeActivity: "moderate",
    activeBills: [],
  },
  KS: {
    name: "Kansas",
    abbr: "KS",
    session: { status: "active", dates: "Jan-May 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "5.7%", brackets: 3 },
      stateEITC: { available: true, match: "17%" },
      stateCTC: { available: false },
    },
    legislativeActivity: "high",
    activeBills: [],
    pastLegislation: [
      { bill: "SB 269", year: 2024, description: "Path to 4% flat tax (veto override)", url: "http://www.kslegislature.org/li/b2023_24/measures/sb269/" }
    ],
    taxChanges: [
      { change: "Path to 4% flat tax", effective: "Phased", impact: "Gradual rate reduction", url: "http://www.kslegislature.org/li/b2023_24/measures/sb269/" }
    ],
  },
  KY: {
    name: "Kentucky",
    abbr: "KY",
    session: { status: "active", dates: "Jan-Mar 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "flat", topRate: "3.5%" },
      stateEITC: { available: false },
      stateCTC: { available: false },
    },
    legislativeActivity: "high",
    activeBills: [],
    taxChanges: [
      { change: "Flat 3.5%", effective: "Jan 2026", impact: "Path toward elimination", url: "https://apps.legislature.ky.gov/record/24rs/hb1.html" }
    ],
  },
  LA: {
    name: "Louisiana",
    abbr: "LA",
    session: { status: "active", dates: "Apr-Jun 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "flat", topRate: "3%" },
      stateEITC: { available: true, match: "5%" },
      stateCTC: { available: false },
    },
    legislativeActivity: "moderate",
    activeBills: [],
    pastLegislation: [
      { bill: "HB 1 (2024 Special Session)", year: 2024, description: "Flat 3% tax effective Jan 2025 (-$1.3B revenue)", url: "https://legis.la.gov/legis/BillInfo.aspx?s=241ES&b=HB1&sbi=y" }
    ],
  },
  ME: {
    name: "Maine",
    abbr: "ME",
    session: { status: "active", dates: "Jan-Apr 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "7.15%", brackets: 3 },
      stateEITC: { available: true, match: "25%" },
      stateCTC: { available: true, name: "Child Tax Credit" },
    },
    legislativeActivity: "low",
    activeBills: [],
  },
  MD: {
    name: "Maryland",
    abbr: "MD",
    session: { status: "active", dates: "Jan-Apr 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "5.75%", brackets: 8 },
      stateEITC: { available: true, match: "45%" },
      stateCTC: { available: true, name: "Child Tax Credit" },
    },
    legislativeActivity: "moderate",
    activeBills: [],
  },
  MA: {
    name: "Massachusetts",
    abbr: "MA",
    session: { status: "active", dates: "Jan-Jul 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "flat", topRate: "5%", note: "+ 4% millionaire surtax" },
      stateEITC: { available: true, match: "40%" },
      stateCTC: { available: true, name: "Child and Family Tax Credit" },
    },
    legislativeActivity: "moderate",
    activeBills: [],
  },
  MI: {
    name: "Michigan",
    abbr: "MI",
    session: { status: "active", dates: "Year-round" },
    policyLevers: {
      incomeTax: { available: true, type: "flat", topRate: "4.25%" },
      stateEITC: { available: true, match: "30%" },
      stateCTC: { available: false },
    },
    legislativeActivity: "high",
    activeBills: [
      { bill: "HB 4170", status: "proposed", description: "Cut rate from 4.25% to 4.05%", url: "https://www.legislature.mi.gov/Bills/Bill?ObjectName=2025-HB-4170" }
    ],
  },
  MN: {
    name: "Minnesota",
    abbr: "MN",
    session: { status: "active", dates: "Jan-May 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "9.85%", brackets: 4 },
      stateEITC: { available: true, name: "Working Family Credit", type: "custom" },
      stateCTC: { available: true, name: "Child Tax Credit" },
    },
    legislativeActivity: "high",
    activeBills: [],
  },
  MS: {
    name: "Mississippi",
    abbr: "MS",
    session: { status: "active", dates: "Jan-Apr 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "flat", topRate: "4.7%" },
      stateEITC: { available: false },
      stateCTC: { available: false },
    },
    legislativeActivity: "moderate",
    activeBills: [],
    pastLegislation: [
      { bill: "HB 1733", year: 2024, description: "Path to 0% income tax by 2030 (phased elimination)", url: "http://billstatus.ls.state.ms.us/2024/pdf/history/HB/HB1733.xml" }
    ],
  },
  MO: {
    name: "Missouri",
    abbr: "MO",
    session: { status: "active", dates: "Jan-May 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "4.8%", brackets: 10 },
      stateEITC: { available: false },
      stateCTC: { available: false },
    },
    legislativeActivity: "moderate",
    activeBills: [],
  },
  MT: {
    name: "Montana",
    abbr: "MT",
    session: { status: "interim", dates: "Odd years only" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "5.4%", brackets: 2 },
      stateEITC: { available: true, match: "20%" },
      stateCTC: { available: false },
    },
    legislativeActivity: "moderate",
    activeBills: [],
    pastLegislation: [
      { bill: "HB 337", year: 2025, description: "Rate cuts to 5.4% + EITC doubled to 20% (2025-2027, -$245M)", url: "https://laws.leg.mt.gov/legprd/LAW0210W$BSIV.ActionQuery?P_BILL_NO1=337&P_BLTP_BILL_TYP_CD=HB&Z_ACTION=Find&P_SESS=20251" }
    ],
  },
  NE: {
    name: "Nebraska",
    abbr: "NE",
    session: { status: "active", dates: "Jan-Jun 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "5.84%", brackets: 4 },
      stateEITC: { available: true, match: "10%" },
      stateCTC: { available: true, name: "Child Tax Credit" },
    },
    legislativeActivity: "moderate",
    activeBills: [],
  },
  NV: {
    name: "Nevada",
    abbr: "NV",
    session: { status: "interim", dates: "Odd years only" },
    policyLevers: {
      incomeTax: { available: false, note: "No state income tax" },
      stateEITC: { available: false },
      stateCTC: { available: false },
    },
    legislativeActivity: "low",
    activeBills: [],
  },
  NH: {
    name: "New Hampshire",
    abbr: "NH",
    session: { status: "active", dates: "Jan-Jun 2026" },
    policyLevers: {
      incomeTax: { available: false, note: "No wage income tax (I&D tax phasing out)" },
      stateEITC: { available: false },
      stateCTC: { available: false },
    },
    legislativeActivity: "low",
    activeBills: [],
  },
  NJ: {
    name: "New Jersey",
    abbr: "NJ",
    session: { status: "active", dates: "Year-round" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "10.75%", brackets: 7 },
      stateEITC: { available: true, match: "40%" },
      stateCTC: { available: true, name: "Child Tax Credit" },
    },
    legislativeActivity: "moderate",
    activeBills: [],
  },
  NM: {
    name: "New Mexico",
    abbr: "NM",
    session: { status: "active", dates: "Jan-Mar 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "5.9%", brackets: 5 },
      stateEITC: { available: true, match: "25%" },
      stateCTC: { available: true, name: "Child Tax Credit" },
    },
    legislativeActivity: "moderate",
    activeBills: [],
  },
  NY: {
    name: "New York",
    abbr: "NY",
    session: { status: "active", dates: "Jan-Jun 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "10.9%", brackets: 9 },
      stateEITC: { available: true, match: "30%" },
      stateCTC: { available: true, name: "Empire State Child Credit" },
    },
    legislativeActivity: "high",
    activeBills: [
      { bill: "S.2162 (Working Families Tax Credit)", status: "proposed", description: "New refundable credit for working families", url: "https://www.nysenate.gov/legislation/bills/2025/S2162" }
    ],
    pastLegislation: [
      { bill: "FY2026 Budget", year: 2025, description: "Multiple income tax changes", url: "https://www.budget.ny.gov/pubs/archive/fy26/ex/fy26fp-ex.pdf" }
    ],
  },
  NC: {
    name: "North Carolina",
    abbr: "NC",
    session: { status: "active", dates: "Jan-Jul 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "flat", topRate: "3.99%" },
      stateEITC: { available: false },
      stateCTC: { available: false },
    },
    legislativeActivity: "high",
    activeBills: [],
    taxChanges: [
      { change: "Flat 3.99%", effective: "Jan 2026", impact: "Continued rate reduction", url: "https://www.ncleg.gov/BillLookUp/2023/H259" }
    ],
  },
  ND: {
    name: "North Dakota",
    abbr: "ND",
    session: { status: "interim", dates: "Odd years only" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "2.5%", brackets: 4 },
      stateEITC: { available: false },
      stateCTC: { available: false },
    },
    legislativeActivity: "low",
    activeBills: [],
  },
  OH: {
    name: "Ohio",
    abbr: "OH",
    session: { status: "active", dates: "Year-round" },
    policyLevers: {
      incomeTax: { available: true, type: "flat", topRate: "2.75%" },
      stateEITC: { available: true, match: "30%" },
      stateCTC: { available: false },
    },
    legislativeActivity: "high",
    activeBills: [],
    taxChanges: [
      { change: "Flat 2.75%", effective: "Jan 2026", impact: "-$1.1B revenue", url: "https://www.legislature.ohio.gov/legislation/135/hb1" }
    ],
  },
  OK: {
    name: "Oklahoma",
    abbr: "OK",
    session: { status: "active", dates: "Feb-May 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "4.5%", brackets: 6 },
      stateEITC: { available: true, match: "5%" },
      stateCTC: { available: false },
    },
    legislativeActivity: "high",
    activeBills: [],
    pastLegislation: [
      { bill: "HB 2764", year: 2024, description: "4.5% rate with triggered path to elimination", url: "http://www.oklegislature.gov/BillInfo.aspx?Bill=HB2764&Session=2400" }
    ],
  },
  OR: {
    name: "Oregon",
    abbr: "OR",
    session: { status: "active", dates: "Feb-Jun 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "9.9%", brackets: 4 },
      stateEITC: { available: true, match: "12%" },
      stateCTC: { available: false },
    },
    legislativeActivity: "moderate",
    activeBills: [],
  },
  PA: {
    name: "Pennsylvania",
    abbr: "PA",
    session: { status: "active", dates: "Year-round" },
    policyLevers: {
      incomeTax: { available: true, type: "flat", topRate: "3.07%" },
      stateEITC: { available: false },
      stateCTC: { available: false },
    },
    legislativeActivity: "moderate",
    activeBills: [],
  },
  RI: {
    name: "Rhode Island",
    abbr: "RI",
    session: { status: "active", dates: "Jan-Jun 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "5.99%", brackets: 3 },
      stateEITC: { available: true, match: "15%" },
      stateCTC: { available: true, name: "Child Tax Credit" },
    },
    legislativeActivity: "low",
    activeBills: [],
  },
  SC: {
    name: "South Carolina",
    abbr: "SC",
    session: { status: "active", dates: "Jan-May 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "6.4%", brackets: 3 },
      stateEITC: { available: false },
      stateCTC: { available: false },
    },
    legislativeActivity: "high",
    activeBills: [
      { bill: "H.4216", status: "proposed", description: "Flat 3.99% tax proposal", url: "https://www.scstatehouse.gov/billsearch.php?billnumbers=4216&session=126" }
    ],
  },
  SD: {
    name: "South Dakota",
    abbr: "SD",
    session: { status: "active", dates: "Jan-Mar 2026" },
    policyLevers: {
      incomeTax: { available: false, note: "No state income tax" },
      stateEITC: { available: false },
      stateCTC: { available: false },
    },
    legislativeActivity: "low",
    activeBills: [],
  },
  TN: {
    name: "Tennessee",
    abbr: "TN",
    session: { status: "active", dates: "Jan-Apr 2026" },
    policyLevers: {
      incomeTax: { available: false, note: "No state income tax" },
      stateEITC: { available: false },
      stateCTC: { available: false },
    },
    legislativeActivity: "low",
    activeBills: [],
  },
  TX: {
    name: "Texas",
    abbr: "TX",
    session: { status: "interim", dates: "Odd years only" },
    policyLevers: {
      incomeTax: { available: false, note: "No state income tax" },
      stateEITC: { available: false },
      stateCTC: { available: false },
    },
    legislativeActivity: "low",
    activeBills: [],
  },
  UT: {
    name: "Utah",
    abbr: "UT",
    session: { status: "active", dates: "Jan-Mar 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "flat", topRate: "4.65%" },
      stateEITC: { available: true, match: "15%" },
      stateCTC: { available: false },
    },
    legislativeActivity: "moderate",
    activeBills: [],
    pastLegislation: [
      { bill: "HB 0001", year: 2025, description: "Income tax changes (-$96M revenue)", url: "https://le.utah.gov/~2025/bills/static/HB0001.html" }
    ],
  },
  VT: {
    name: "Vermont",
    abbr: "VT",
    session: { status: "active", dates: "Jan-May 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "8.75%", brackets: 4 },
      stateEITC: { available: true, match: "38%" },
      stateCTC: { available: true, name: "Child Tax Credit" },
    },
    legislativeActivity: "low",
    activeBills: [],
  },
  VA: {
    name: "Virginia",
    abbr: "VA",
    session: { status: "active", dates: "Jan-Mar 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "5.75%", brackets: 4 },
      stateEITC: { available: true, match: "20%" },
      stateCTC: { available: false },
    },
    legislativeActivity: "moderate",
    activeBills: [],
  },
  WA: {
    name: "Washington",
    abbr: "WA",
    session: { status: "active", dates: "Jan-Apr 2026" },
    policyLevers: {
      incomeTax: { available: false, note: "No wage income tax (7% capital gains)" },
      stateEITC: { available: true, name: "Working Families Tax Credit", type: "custom" },
      stateCTC: { available: false },
    },
    legislativeActivity: "moderate",
    activeBills: [],
  },
  WV: {
    name: "West Virginia",
    abbr: "WV",
    session: { status: "active", dates: "Jan-Mar 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "5.12%", brackets: 5 },
      stateEITC: { available: false },
      stateCTC: { available: false },
    },
    legislativeActivity: "moderate",
    activeBills: [],
  },
  WI: {
    name: "Wisconsin",
    abbr: "WI",
    session: { status: "active", dates: "Jan-Mar 2026" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "7.65%", brackets: 4 },
      stateEITC: { available: true, match: "11%" },
      stateCTC: { available: false },
    },
    legislativeActivity: "moderate",
    activeBills: [],
  },
  WY: {
    name: "Wyoming",
    abbr: "WY",
    session: { status: "active", dates: "Jan-Mar 2026" },
    policyLevers: {
      incomeTax: { available: false, note: "No state income tax" },
      stateEITC: { available: false },
      stateCTC: { available: false },
    },
    legislativeActivity: "low",
    activeBills: [],
  },
  DC: {
    name: "District of Columbia",
    abbr: "DC",
    session: { status: "active", dates: "Year-round" },
    policyLevers: {
      incomeTax: { available: true, type: "graduated", topRate: "10.75%", brackets: 7 },
      stateEITC: { available: true, match: "70%", note: "Highest in nation" },
      stateCTC: { available: false },
    },
    legislativeActivity: "moderate",
    activeBills: [],
  },
};

// Legislative activity determines map color - focused on what's happening NOW
export const activityLabels = {
  high: {
    label: "High Activity",
    color: "#dc2626",
    description: "Major tax changes or active bills"
  },
  moderate: {
    label: "Moderate",
    color: "#f59e0b",
    description: "Some legislative activity"
  },
  low: {
    label: "Low Activity",
    color: "#9ca3af",
    description: "No major tax legislation"
  },
};

// Research coverage status - what we have analyzed
export const researchLabels = {
  published: { label: "Published", color: "#22c55e" },
  in_progress: { label: "In Progress", color: "#3b82f6" },
  planned: { label: "Planned", color: "#8b5cf6" },
  none: { label: "Not Yet", color: "#e5e7eb" },
};

// Get color for map based on legislative activity
export const getStateColor = (activity) => {
  const colors = {
    high: "#dc2626",
    moderate: "#f59e0b",
    low: "#d1d5db",
  };
  return colors[activity] || "#e5e7eb";
};

// Count states by activity level
export const getActivityCounts = () => {
  const counts = { high: 0, moderate: 0, low: 0 };
  Object.values(stateData).forEach(state => {
    counts[state.legislativeActivity]++;
  });
  return counts;
};
