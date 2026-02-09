-- Migration: Add provisions and model_notes to reform_impacts table
-- These fields store human-readable descriptions of what the reform models

-- Add provisions column (array of parameter changes with descriptions)
ALTER TABLE reform_impacts
ADD COLUMN IF NOT EXISTS provisions jsonb DEFAULT '[]'::jsonb;

-- Add model_notes column (methodology notes, caveats)
ALTER TABLE reform_impacts
ADD COLUMN IF NOT EXISTS model_notes text;

-- Example provisions structure:
-- [
--   {
--     "parameter": "gov.states.ut.tax.income.rate",
--     "label": "Utah Income Tax Rate",
--     "baseline": "4.85%",
--     "reform": "4.45%",
--     "explanation": "Reduces Utah's flat income tax rate from 4.85% to 4.45%"
--   }
-- ]

COMMENT ON COLUMN reform_impacts.provisions IS 'Array of parameter changes with human-readable descriptions';
COMMENT ON COLUMN reform_impacts.model_notes IS 'Methodology notes and caveats for the analysis';
