import { colors, typography, spacing } from "../../designTokens";

const filingStatusOptions = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married Filing Jointly" },
  { value: "head_of_household", label: "Head of Household" },
];

const childrenOptions = [
  { value: 0, label: "No children" },
  { value: 1, label: "1 child" },
  { value: 2, label: "2 children" },
  { value: 3, label: "3 children" },
  { value: 4, label: "4+ children" },
];

const inputStyle = {
  width: "100%",
  padding: `${spacing.sm} ${spacing.md}`,
  border: `1px solid ${colors.border.light}`,
  borderRadius: spacing.radius.lg,
  fontSize: typography.fontSize.sm,
  fontFamily: typography.fontFamily.body,
  color: colors.secondary[900],
  backgroundColor: colors.white,
  outline: "none",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
};

const labelStyle = {
  display: "block",
  marginBottom: spacing.xs,
  color: colors.text.secondary,
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.medium,
  fontFamily: typography.fontFamily.body,
};

export default function HouseholdForm({
  values,
  onChange,
  onSubmit,
  loading,
  stateAbbr
}) {
  const handleChange = (field) => (e) => {
    const value = field === "income" || field === "numChildren"
      ? parseInt(e.target.value, 10) || 0
      : e.target.value;
    onChange({ ...values, [field]: value });
  };

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
      style={{ display: "flex", flexDirection: "column", gap: spacing.lg }}
    >
      {/* Filing Status */}
      <div>
        <label style={labelStyle}>Filing Status</label>
        <select
          value={values.filingStatus}
          onChange={handleChange("filingStatus")}
          style={{ ...inputStyle, cursor: "pointer" }}
        >
          {filingStatusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Income */}
      <div>
        <label style={labelStyle}>Annual Employment Income</label>
        <div style={{ position: "relative" }}>
          <span style={{
            position: "absolute",
            left: spacing.md,
            top: "50%",
            transform: "translateY(-50%)",
            color: colors.text.tertiary,
            fontSize: typography.fontSize.sm,
          }}>$</span>
          <input
            type="number"
            value={values.income}
            onChange={handleChange("income")}
            min={0}
            max={10000000}
            step={1000}
            style={{ ...inputStyle, paddingLeft: spacing["2xl"] }}
            placeholder="50000"
          />
        </div>
      </div>

      {/* Number of Children */}
      <div>
        <label style={labelStyle}>Children (under 18)</label>
        <select
          value={values.numChildren}
          onChange={handleChange("numChildren")}
          style={{ ...inputStyle, cursor: "pointer" }}
        >
          {childrenOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* State (fixed for state-specific reforms) */}
      <div>
        <label style={labelStyle}>State</label>
        <input
          type="text"
          value={stateAbbr}
          disabled
          style={{
            ...inputStyle,
            backgroundColor: colors.background.tertiary,
            color: colors.text.secondary,
            cursor: "not-allowed"
          }}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: `${spacing.md} ${spacing.lg}`,
          border: "none",
          borderRadius: spacing.radius.lg,
          backgroundColor: loading ? colors.gray[400] : colors.primary[600],
          color: colors.white,
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.semibold,
          fontFamily: typography.fontFamily.primary,
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background-color 0.15s ease",
        }}
        onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = colors.primary[700])}
        onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = colors.primary[600])}
      >
        {loading ? "Calculating..." : "Calculate Impact"}
      </button>
    </form>
  );
}
