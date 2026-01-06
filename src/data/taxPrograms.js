// Tax programs available in PolicyEngine-US by state
// Extracted from policyengine_us/parameters/gov/states/*/tax/income/

export const stateTaxPrograms = {
  AL: {
    credits: [],
    deductions: ["Federal Tax", "Itemized", "Standard"],
    exemptions: true,
  },
  AK: { credits: [], deductions: [], exemptions: false, noIncomeTax: true },
  AZ: {
    credits: ["EITC", "Increased Excise Tax", "Property Tax"],
    deductions: ["Itemized", "Standard"],
    exemptions: true,
  },
  AR: {
    credits: ["CTC", "EITC", "Disability"],
    deductions: ["Itemized", "Standard"],
    exemptions: true,
  },
  CA: {
    credits: ["EITC (CalEITC)", "Young Child", "Renter", "CDCC", "Foster Youth"],
    deductions: ["Itemized", "Standard"],
    exemptions: true,
  },
  CO: {
    credits: ["EITC", "CTC", "CDCC", "TABOR Refund", "Sales Tax Refund", "Care Worker", "Family Affordability"],
    deductions: [],
    exemptions: false,
  },
  CT: {
    credits: ["EITC", "Property Tax"],
    deductions: [],
    exemptions: true,
  },
  DC: {
    credits: ["EITC", "CTC", "Low Income", "Property Tax"],
    deductions: ["Itemized", "Standard"],
    exemptions: true,
  },
  DE: {
    credits: ["CTC", "EITC", "Volunteer Firefighter"],
    deductions: ["Itemized", "Standard"],
    exemptions: true,
  },
  FL: { credits: [], deductions: [], exemptions: false, noIncomeTax: true },
  GA: {
    credits: ["CTC", "CDCC", "Low Income", "Surplus Rebate"],
    deductions: ["Standard"],
    exemptions: true,
  },
  HI: {
    credits: ["EITC", "CTC", "Food Excise", "Low Income", "CDCC"],
    deductions: ["Itemized", "Standard"],
    exemptions: true,
  },
  ID: {
    credits: ["CTC", "Grocery", "Aged/Disabled"],
    deductions: ["Capital Gains", "Dependent Care", "Retirement Benefits"],
    exemptions: false,
  },
  IL: {
    credits: ["EITC", "CTC", "K-12 Education", "Property Tax"],
    deductions: [],
    exemptions: false,
  },
  IN: {
    credits: ["EITC", "Unified Tax"],
    deductions: ["Rent", "Homeowner"],
    exemptions: true,
  },
  IA: {
    credits: ["EITC", "CDCC", "Tuition", "S-Corp Apportionment"],
    deductions: ["Federal Tax", "Standard"],
    exemptions: false,
  },
  KS: {
    credits: ["EITC", "Food Sales Tax"],
    deductions: ["Standard"],
    exemptions: true,
  },
  KY: {
    credits: ["Family Size", "Personal", "CDCC", "Tuition"],
    deductions: [],
    exemptions: false,
  },
  LA: {
    credits: ["EITC", "CDCC", "School Readiness"],
    deductions: ["Federal Tax", "Itemized", "Standard"],
    exemptions: true,
  },
  ME: {
    credits: ["EITC", "CTC", "CDCC", "Property Tax Fairness", "Sales Tax Fairness"],
    deductions: ["Itemized", "Standard"],
    exemptions: true,
  },
  MD: {
    credits: ["EITC", "CTC", "CDCC", "Poverty Line", "Senior Tax"],
    deductions: ["Itemized", "Standard"],
    exemptions: true,
  },
  MA: {
    credits: ["EITC", "Child & Family", "CDCC", "Senior Circuit Breaker", "Limited Income"],
    deductions: ["Rent"],
    exemptions: true,
  },
  MI: {
    credits: ["EITC", "Home Heating", "Homestead Property Tax"],
    deductions: ["Standard", "Retirement Benefits"],
    exemptions: true,
  },
  MN: {
    credits: ["Working Family (EITC)", "CTC", "CDCC", "K-12 Education", "Marriage"],
    deductions: ["Itemized", "Standard"],
    exemptions: true,
  },
  MS: {
    credits: [],
    deductions: ["Standard"],
    exemptions: true,
  },
  MO: {
    credits: ["EITC (WFTC)", "Property Tax"],
    deductions: ["Federal Tax", "Social Security/Pension"],
    exemptions: false,
  },
  MT: {
    credits: ["EITC", "Capital Gain", "Elderly Homeowner/Renter"],
    deductions: ["Itemized", "Standard", "CDCC Expense"],
    exemptions: true,
  },
  NE: {
    credits: ["EITC", "CTC", "CDCC", "School Readiness"],
    deductions: ["Standard"],
    exemptions: true,
  },
  NV: { credits: [], deductions: [], exemptions: false, noIncomeTax: true },
  NH: { credits: [], deductions: [], exemptions: false, noIncomeTax: true },
  NJ: {
    credits: ["EITC", "CTC", "CDCC", "Property Tax"],
    deductions: ["Medical Expenses", "Property Tax"],
    exemptions: true,
  },
  NM: {
    credits: ["EITC", "CTC", "CDCC", "Medical Care"],
    deductions: ["Medical Expense", "Net Capital Gains"],
    exemptions: true,
  },
  NY: {
    credits: ["EITC", "CTC (Empire State)", "CDCC", "Household", "Real Property Tax", "College Tuition"],
    deductions: ["Itemized", "Standard"],
    exemptions: true,
  },
  NC: {
    credits: ["CTC"],
    deductions: ["Itemized", "Standard", "Child", "Military Retirement"],
    exemptions: false,
  },
  ND: {
    credits: ["Marriage Penalty"],
    deductions: [],
    exemptions: false,
  },
  OH: {
    credits: ["EITC", "CDCC", "Joint Filing", "Retirement", "Senior Citizen", "Exemption"],
    deductions: ["529 Plans", "Medical Care"],
    exemptions: true,
  },
  OK: {
    credits: ["EITC", "CTC", "Property Tax", "Sales Tax"],
    deductions: ["Itemized", "Standard"],
    exemptions: true,
  },
  OR: {
    credits: ["EITC", "CTC", "Kicker", "Retirement Income", "Working Family Household"],
    deductions: ["Standard"],
    exemptions: false,
  },
  PA: {
    credits: ["EITC", "CDCC"],
    deductions: [],
    exemptions: false,
  },
  RI: {
    credits: ["EITC", "CTC", "Property Tax"],
    deductions: ["Standard"],
    exemptions: true,
  },
  SC: {
    credits: ["EITC", "CDCC", "Two Wage Earner"],
    deductions: ["Net Capital Gain", "Young Child"],
    exemptions: true,
  },
  SD: { credits: [], deductions: [], exemptions: false, noIncomeTax: true },
  TN: { credits: [], deductions: [], exemptions: false, noIncomeTax: true },
  TX: { credits: [], deductions: [], exemptions: false, noIncomeTax: true },
  UT: {
    credits: ["EITC", "CTC", "At-Home Parent", "Retirement", "SS Benefits", "Military Retirement"],
    deductions: [],
    exemptions: false,
  },
  VT: {
    credits: ["EITC", "CTC", "CDCC"],
    deductions: ["Standard"],
    exemptions: true,
  },
  VA: {
    credits: ["EITC"],
    deductions: ["Itemized"],
    exemptions: true,
  },
  WA: { credits: ["Working Families Tax Credit"], deductions: [], exemptions: false, noIncomeTax: true },
  WV: {
    credits: ["Low Income Family", "Senior Citizen"],
    deductions: [],
    exemptions: true,
  },
  WI: {
    credits: ["EITC", "Homestead", "Married Couple"],
    deductions: ["Itemized", "Standard"],
    exemptions: false,
  },
  WY: { credits: [], deductions: [], exemptions: false, noIncomeTax: true },
};

// Get formatted programs for display
export const getFormattedPrograms = (stateAbbr) => {
  const programs = stateTaxPrograms[stateAbbr];
  if (!programs) return null;

  if (programs.noIncomeTax) {
    return { noIncomeTax: true };
  }

  return {
    credits: programs.credits || [],
    deductions: programs.deductions || [],
    exemptions: programs.exemptions || false,
  };
};
