-- ============================================================================
-- State Research Tracker - Database Schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/ffgngqlgfsvqartilful/sql
-- ============================================================================

-- ============================================================================
-- TABLE: research
-- Stores metadata about bills/research items (blog posts, dashboards, tools)
-- ============================================================================
CREATE TABLE IF NOT EXISTS research (
  id                  TEXT PRIMARY KEY,        -- "ut-sb60", "la-flat-tax"
  legiscan_bill_id    INTEGER REFERENCES processed_bills(bill_id),
  state               TEXT NOT NULL,
  type                TEXT NOT NULL,           -- "blog", "dashboard", "tool"
  status              TEXT NOT NULL,           -- "published", "in_progress", "planned"
  title               TEXT NOT NULL,
  url                 TEXT,
  description         TEXT,
  date                DATE,
  author              TEXT,
  key_findings        TEXT[],
  tags                TEXT[],
  relevant_states     TEXT[],                  -- for federal tools
  federal_tool_order  INTEGER,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Add comments for documentation
COMMENT ON TABLE research IS 'Metadata about PolicyEngine research items (blog posts, dashboards, tools, bill analyses)';
COMMENT ON COLUMN research.id IS 'URL-friendly identifier, e.g., ut-sb60, la-flat-tax';
COMMENT ON COLUMN research.legiscan_bill_id IS 'Optional FK to processed_bills for bills discovered via LegiScan';
COMMENT ON COLUMN research.type IS 'One of: blog, dashboard, tool';
COMMENT ON COLUMN research.status IS 'One of: published, in_progress, planned';
COMMENT ON COLUMN research.relevant_states IS 'For federal tools that are relevant to specific states';

-- ============================================================================
-- TABLE: reform_impacts
-- Stores computed PolicyEngine impacts for research items
-- ============================================================================
CREATE TABLE IF NOT EXISTS reform_impacts (
  id                      TEXT PRIMARY KEY REFERENCES research(id) ON DELETE CASCADE,
  policy_id               INTEGER,             -- PolicyEngine API policy ID
  computed                BOOLEAN DEFAULT false,
  computed_at             TIMESTAMPTZ,

  -- Version tracking for reproducibility
  policyengine_us_version TEXT,
  dataset_name            TEXT,                -- "enhanced_cps_2024"
  dataset_version         TEXT,

  -- Impact data as JSONB
  budgetary_impact        JSONB,
  poverty_impact          JSONB,
  child_poverty_impact    JSONB,
  winners_losers          JSONB,
  decile_impact           JSONB,
  inequality              JSONB,
  district_impacts        JSONB
);

-- Add comments for documentation
COMMENT ON TABLE reform_impacts IS 'Computed PolicyEngine microsimulation results for research items';
COMMENT ON COLUMN reform_impacts.policy_id IS 'PolicyEngine API policy ID used for the reform';
COMMENT ON COLUMN reform_impacts.policyengine_us_version IS 'Version of policyengine-us package used for computation';
COMMENT ON COLUMN reform_impacts.dataset_name IS 'Dataset used, e.g., enhanced_cps_2024';
COMMENT ON COLUMN reform_impacts.dataset_version IS 'Version of the dataset package';
COMMENT ON COLUMN reform_impacts.budgetary_impact IS 'JSON: {netCost, stateRevenueImpact, households}';
COMMENT ON COLUMN reform_impacts.poverty_impact IS 'JSON: {baselineRate, reformRate, change, percentChange}';
COMMENT ON COLUMN reform_impacts.winners_losers IS 'JSON: {gainMore5Pct, gainLess5Pct, loseLess5Pct, loseMore5Pct, noChange}';
COMMENT ON COLUMN reform_impacts.decile_impact IS 'JSON: {relative: {1: value, 2: value, ...}}';
COMMENT ON COLUMN reform_impacts.district_impacts IS 'JSON: {district_id: {districtName, avgBenefit, householdsAffected, ...}}';

-- ============================================================================
-- TABLE: validation_metadata
-- Stores external validation data and comparison results
-- ============================================================================
CREATE TABLE IF NOT EXISTS validation_metadata (
  id                              TEXT PRIMARY KEY REFERENCES research(id) ON DELETE CASCADE,

  -- Official fiscal note
  fiscal_note_source              TEXT,
  fiscal_note_url                 TEXT,
  fiscal_note_estimate            NUMERIC,
  fiscal_note_methodology         TEXT,

  -- External analyses (think tanks, news)
  external_analyses               JSONB,      -- Array of {source, estimate, url}

  -- Similar bills we've analyzed
  similar_bills                   JSONB,      -- Array of {id, estimate, description}

  -- Back-of-envelope calculation
  envelope_estimate               NUMERIC,
  envelope_methodology            TEXT,
  envelope_assumptions            TEXT[],

  -- Validation results
  target_range_low                NUMERIC,
  target_range_high               NUMERIC,
  pe_estimate                     NUMERIC,
  within_range                    BOOLEAN,
  difference_from_fiscal_note_pct NUMERIC,
  discrepancy_explanation         TEXT,

  -- Iteration tracking
  iterations                      INTEGER DEFAULT 1,
  iteration_log                   JSONB       -- Array of {attempt, issue, resolution}
);

-- Add comments for documentation
COMMENT ON TABLE validation_metadata IS 'External validation data and comparison results for transparency';
COMMENT ON COLUMN validation_metadata.fiscal_note_estimate IS 'Official fiscal note revenue estimate in dollars';
COMMENT ON COLUMN validation_metadata.external_analyses IS 'Array of {source, estimate, url} from think tanks, news';
COMMENT ON COLUMN validation_metadata.similar_bills IS 'Array of {id, estimate, description} for comparable bills we analyzed';
COMMENT ON COLUMN validation_metadata.envelope_estimate IS 'Back-of-envelope calculation estimate';
COMMENT ON COLUMN validation_metadata.pe_estimate IS 'PolicyEngine estimate (should match reform_impacts.budgetary_impact.netCost)';
COMMENT ON COLUMN validation_metadata.within_range IS 'Whether PE estimate is within target_range_low to target_range_high';
COMMENT ON COLUMN validation_metadata.iteration_log IS 'Array of {attempt, pe_estimate, issue, resolution}';

-- ============================================================================
-- INDEXES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_research_state ON research(state);
CREATE INDEX IF NOT EXISTS idx_research_status ON research(status);
CREATE INDEX IF NOT EXISTS idx_research_type ON research(type);
CREATE INDEX IF NOT EXISTS idx_reform_impacts_version ON reform_impacts(policyengine_us_version);
CREATE INDEX IF NOT EXISTS idx_reform_impacts_computed ON reform_impacts(computed);
CREATE INDEX IF NOT EXISTS idx_validation_within_range ON validation_metadata(within_range);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- Enable public read access, restrict writes to authenticated users
-- ============================================================================
ALTER TABLE research ENABLE ROW LEVEL SECURITY;
ALTER TABLE reform_impacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE validation_metadata ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Public read research" ON research
  FOR SELECT USING (true);

CREATE POLICY "Public read impacts" ON reform_impacts
  FOR SELECT USING (true);

CREATE POLICY "Public read validation" ON validation_metadata
  FOR SELECT USING (true);

-- Write access for authenticated users (service role key)
CREATE POLICY "Service write research" ON research
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service write impacts" ON reform_impacts
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service write validation" ON validation_metadata
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- TRIGGER: Auto-update updated_at timestamp
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_research_updated_at
  BEFORE UPDATE ON research
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VIEWS (optional convenience views)
-- ============================================================================

-- View: Research items with their computed status
CREATE OR REPLACE VIEW research_with_status AS
SELECT
  r.*,
  ri.computed,
  ri.computed_at,
  ri.policyengine_us_version,
  ri.policy_id,
  vm.fiscal_note_estimate,
  vm.pe_estimate,
  vm.within_range,
  vm.difference_from_fiscal_note_pct
FROM research r
LEFT JOIN reform_impacts ri ON r.id = ri.id
LEFT JOIN validation_metadata vm ON r.id = vm.id;

-- View: Stale computations (for recompute detection)
CREATE OR REPLACE VIEW stale_computations AS
SELECT
  r.id,
  r.title,
  r.state,
  ri.policyengine_us_version,
  ri.computed_at,
  ri.dataset_version
FROM research r
JOIN reform_impacts ri ON r.id = ri.id
WHERE ri.computed = true
ORDER BY ri.computed_at ASC;

-- View: Bills pending analysis
CREATE OR REPLACE VIEW pending_analysis AS
SELECT
  pb.bill_id,
  pb.state,
  pb.bill_number,
  pb.title,
  pb.status,
  pb.last_action,
  pb.last_action_date,
  pb.legiscan_url
FROM processed_bills pb
LEFT JOIN research r ON pb.bill_id = r.legiscan_bill_id
WHERE r.id IS NULL
  AND pb.skipped_reason IS NULL
ORDER BY pb.state, pb.bill_number;
