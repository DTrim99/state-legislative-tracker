// Research entries for the state tracker
// Types: dashboard, blog, tool, in_progress, planned
//
// Data is synced from Supabase via: make sync
// See scripts/sync_from_supabase.py for details

import researchData from "./research.json";

// Transform database format (snake_case) to frontend format (camelCase)
export const research = researchData.map((item) => ({
  id: item.id,
  state: item.state,
  type: item.type,
  status: item.status,
  title: item.title,
  url: item.url,
  description: item.description,
  date: item.date,
  expectedDate: item.expected_date,
  author: item.author,
  sourceUrl: item.source_url,
  thumbnail: item.thumbnail,
  keyFindings: item.key_findings || [],
  tags: item.tags || [],
  relevantStates: item.relevant_states,
  federalToolOrder: item.federal_tool_order,
}));

// Get research for a specific state
export const getStateResearch = (stateAbbr) => {
  return research.filter(
    (r) =>
      r.state === stateAbbr ||
      r.state === "all" ||
      (r.relevantStates && r.relevantStates.includes(stateAbbr))
  );
};

// Get all federal/national tools
export const getFederalTools = () => {
  return research.filter((r) => r.state === "all");
};

// Research categories for filtering
export const researchCategories = [
  { id: "all", label: "All Research" },
  { id: "dashboard", label: "Interactive Dashboards" },
  { id: "blog", label: "Blog Posts" },
  { id: "tool", label: "Tools" },
  { id: "in_progress", label: "In Progress" },
  { id: "planned", label: "Coming Soon" },
];

// Tags for filtering
export const researchTags = [
  { id: "flat-tax", label: "Flat Tax" },
  { id: "tax-cuts", label: "Tax Cuts" },
  { id: "eitc", label: "EITC" },
  { id: "ctc", label: "Child Tax Credit" },
  { id: "interactive", label: "Interactive" },
  { id: "federal", label: "Federal Policy" },
  { id: "obbba", label: "OBBBA" },
  { id: "salt", label: "SALT" },
  { id: "healthcare", label: "Healthcare" },
];
