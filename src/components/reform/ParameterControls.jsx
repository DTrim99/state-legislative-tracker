import { colors, typography, spacing } from "../../designTokens";

const formatValue = (value, type) => {
  if (type === "percent") {
    return `${(value * 100).toFixed(2)}%`;
  }
  if (type === "currency") {
    return `$${value.toLocaleString("en-US")}`;
  }
  return value.toString();
};

export default function ParameterControls({ parameters, values, onChange }) {
  const handleChange = (path, newValue) => {
    onChange({ ...values, [path]: parseFloat(newValue) });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.lg }}>
      {parameters.map((param) => {
        const currentValue = values[param.path] ?? param.reform;
        const isAtReform = currentValue === param.reform;
        const isAtBaseline = currentValue === param.baseline;

        return (
          <div key={param.path}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: spacing.xs,
            }}>
              <label style={{
                color: colors.text.secondary,
                fontSize: typography.fontSize.xs,
                fontWeight: typography.fontWeight.medium,
                fontFamily: typography.fontFamily.body,
              }}>
                {param.label}
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
                <span style={{
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.semibold,
                  fontFamily: typography.fontFamily.primary,
                  color: colors.primary[700],
                }}>
                  {formatValue(currentValue, param.type)}
                </span>
                {isAtReform && (
                  <span style={{
                    fontSize: typography.fontSize.xs,
                    padding: `1px ${spacing.xs}`,
                    backgroundColor: colors.primary[100],
                    color: colors.primary[700],
                    borderRadius: spacing.radius.sm,
                  }}>
                    Bill
                  </span>
                )}
                {isAtBaseline && !isAtReform && (
                  <span style={{
                    fontSize: typography.fontSize.xs,
                    padding: `1px ${spacing.xs}`,
                    backgroundColor: colors.gray[200],
                    color: colors.gray[600],
                    borderRadius: spacing.radius.sm,
                  }}>
                    Current
                  </span>
                )}
              </div>
            </div>

            {/* Slider */}
            <div style={{ position: "relative" }}>
              <input
                type="range"
                min={param.min}
                max={param.max}
                step={param.step}
                value={currentValue}
                onChange={(e) => handleChange(param.path, e.target.value)}
                style={{
                  width: "100%",
                  height: "6px",
                  appearance: "none",
                  backgroundColor: colors.gray[200],
                  borderRadius: "3px",
                  cursor: "pointer",
                  outline: "none",
                }}
              />
              {/* Baseline marker */}
              <div
                style={{
                  position: "absolute",
                  left: `${((param.baseline - param.min) / (param.max - param.min)) * 100}%`,
                  top: "-4px",
                  width: "2px",
                  height: "14px",
                  backgroundColor: colors.gray[500],
                  transform: "translateX(-50%)",
                  pointerEvents: "none",
                }}
                title={`Current law: ${formatValue(param.baseline, param.type)}`}
              />
              {/* Reform marker */}
              <div
                style={{
                  position: "absolute",
                  left: `${((param.reform - param.min) / (param.max - param.min)) * 100}%`,
                  top: "-4px",
                  width: "2px",
                  height: "14px",
                  backgroundColor: colors.primary[600],
                  transform: "translateX(-50%)",
                  pointerEvents: "none",
                }}
                title={`Bill proposes: ${formatValue(param.reform, param.type)}`}
              />
            </div>

            {/* Labels */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: spacing.xs,
            }}>
              <span style={{
                fontSize: typography.fontSize.xs,
                color: colors.text.tertiary,
                fontFamily: typography.fontFamily.body,
              }}>
                {formatValue(param.min, param.type)}
              </span>
              <span style={{
                fontSize: typography.fontSize.xs,
                color: colors.text.tertiary,
                fontFamily: typography.fontFamily.body,
              }}>
                {formatValue(param.max, param.type)}
              </span>
            </div>

            {/* Quick actions */}
            <div style={{
              display: "flex",
              gap: spacing.sm,
              marginTop: spacing.sm,
            }}>
              <button
                onClick={() => handleChange(param.path, param.baseline)}
                disabled={isAtBaseline}
                style={{
                  flex: 1,
                  padding: `${spacing.xs} ${spacing.sm}`,
                  border: `1px solid ${colors.border.light}`,
                  borderRadius: spacing.radius.sm,
                  backgroundColor: isAtBaseline ? colors.gray[100] : colors.white,
                  color: isAtBaseline ? colors.text.tertiary : colors.text.secondary,
                  fontSize: typography.fontSize.xs,
                  fontFamily: typography.fontFamily.body,
                  cursor: isAtBaseline ? "default" : "pointer",
                }}
              >
                Current Law ({formatValue(param.baseline, param.type)})
              </button>
              <button
                onClick={() => handleChange(param.path, param.reform)}
                disabled={isAtReform}
                style={{
                  flex: 1,
                  padding: `${spacing.xs} ${spacing.sm}`,
                  border: `1px solid ${isAtReform ? colors.primary[200] : colors.primary[600]}`,
                  borderRadius: spacing.radius.sm,
                  backgroundColor: isAtReform ? colors.primary[50] : colors.white,
                  color: isAtReform ? colors.primary[400] : colors.primary[600],
                  fontSize: typography.fontSize.xs,
                  fontFamily: typography.fontFamily.body,
                  cursor: isAtReform ? "default" : "pointer",
                }}
              >
                Bill ({formatValue(param.reform, param.type)})
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
