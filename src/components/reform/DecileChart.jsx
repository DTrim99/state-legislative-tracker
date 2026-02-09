import { useState } from "react";
import { colors, typography, spacing } from "../../designTokens";

const DECILE_LABELS = [
  "1st", "2nd", "3rd", "4th", "5th",
  "6th", "7th", "8th", "9th", "10th"
];

export default function DecileChart({ decileData }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!decileData) return null;

  // Use relative (which contains absolute $ values from API) or absolute if available
  const data = decileData.relative || decileData.absolute;
  if (!data) return null;

  // Get values as array
  const values = DECILE_LABELS.map((_, i) => data[String(i + 1)] || 0);

  // Calculate max positive and negative values
  const maxPositive = Math.max(0, ...values);
  const maxNegative = Math.min(0, ...values);
  const hasNegative = maxNegative < 0;
  const hasPositive = maxPositive > 0;

  // Calculate total range and proportions
  const totalRange = maxPositive - maxNegative;
  const positiveRatio = totalRange > 0 ? maxPositive / totalRange : 0.5;
  const negativeRatio = totalRange > 0 ? Math.abs(maxNegative) / totalRange : 0.5;

  const formatValue = (val) => {
    const sign = val >= 0 ? "+" : "-";
    return `${sign}$${Math.round(Math.abs(val)).toLocaleString()}`;
  };

  // If all values are positive or all negative, use simpler layout
  const allPositive = !hasNegative;
  const allNegative = !hasPositive;

  // Generate y-axis ticks that extend one increment beyond the data
  const generateTicks = () => {
    const absMax = Math.max(Math.abs(maxPositive), Math.abs(maxNegative));
    if (absMax === 0) return { ticks: [0], tickMax: 1, tickMin: 0 };

    // Pick a nice round step
    const rawStep = absMax / 3;
    const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
    const niceSteps = [1, 2, 5, 10];
    const step = niceSteps.find(s => s * magnitude >= rawStep) * magnitude;

    const ticks = [];
    let tickMax = 0;
    let tickMin = 0;

    if (hasPositive) {
      // Go one step beyond the max value
      for (let v = step; v <= maxPositive + step; v += step) {
        ticks.push(Math.round(v));
      }
      tickMax = ticks[ticks.length - 1];
    }
    ticks.push(0);
    if (hasNegative) {
      const negTicks = [];
      for (let v = -step; v >= maxNegative - step; v -= step) {
        negTicks.push(Math.round(v));
      }
      ticks.push(...negTicks);
      tickMin = negTicks[negTicks.length - 1];
    }
    return { ticks: ticks.sort((a, b) => b - a), tickMax, tickMin };
  };

  const { ticks: yTicks, tickMax, tickMin } = generateTicks();

  // Use tick range for positioning (not data range)
  const tickRange = tickMax - tickMin;
  const tickPositiveRatio = tickRange > 0 ? tickMax / tickRange : 0.5;
  const tickNegativeRatio = tickRange > 0 ? Math.abs(tickMin) / tickRange : 0.5;

  const tickPosition = (val) => {
    if (tickMin === 0) return ((tickMax - val) / tickMax) * 100;
    if (tickMax === 0) return ((val - tickMin) / Math.abs(tickMin)) * 100;
    if (val >= 0) {
      return tickMax > 0 ? ((tickMax - val) / tickMax) * tickPositiveRatio * 100 : 0;
    }
    return tickPositiveRatio * 100 + (Math.abs(val) / Math.abs(tickMin)) * tickNegativeRatio * 100;
  };

  const formatTick = (val) => {
    const sign = val > 0 ? "+" : val < 0 ? "-" : "";
    const abs = Math.abs(val);
    if (abs >= 1000) return `${sign}$${(abs / 1000).toFixed(abs % 1000 === 0 ? 0 : 1)}K`;
    return `${sign}$${abs}`;
  };

  return (
    <div>
      {/* Chart with y-axis */}
      <div style={{ display: "flex", height: "120px" }}>
        {/* Y-axis labels */}
        <div style={{
          width: "48px",
          position: "relative",
          flexShrink: 0,
          marginRight: spacing.xs,
        }}>
          {yTicks.map((tick) => (
            <span
              key={tick}
              style={{
                position: "absolute",
                top: `${tickPosition(tick)}%`,
                right: 0,
                transform: "translateY(-50%)",
                fontSize: "10px",
                fontFamily: typography.fontFamily.body,
                color: colors.text.tertiary,
                whiteSpace: "nowrap",
              }}
            >
              {formatTick(tick)}
            </span>
          ))}
        </div>

        {/* Bars */}
        <div style={{
          display: "flex",
          gap: "2px",
          flex: 1,
          position: "relative",
        }}>
        {values.map((value, index) => {
          const isPositive = value >= 0;
          const isHovered = hoveredIndex === index;

          // Calculate bar height as percentage of total tick range
          let barHeightPercent;
          if (tickRange > 0) {
            barHeightPercent = (Math.abs(value) / tickRange) * 100;
          } else {
            barHeightPercent = 0;
          }

          return (
            <div
              key={index}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                position: "relative",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div style={{
                  position: "absolute",
                  top: tickMin === 0 ? "auto" : (isPositive ? `calc(${(1 - tickPositiveRatio) * 100}% - ${barHeightPercent / tickPositiveRatio}% - 40px)` : "auto"),
                  bottom: tickMax === 0 ? `calc(${barHeightPercent}% + 8px)` : (!isPositive && tickMin < 0 ? `calc(${tickNegativeRatio * 100}% - ${barHeightPercent / tickNegativeRatio}% - 40px)` : "auto"),
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: colors.secondary[900],
                  color: colors.white,
                  padding: `${spacing.xs} ${spacing.sm}`,
                  borderRadius: spacing.radius.md,
                  fontSize: typography.fontSize.xs,
                  fontWeight: typography.fontWeight.semibold,
                  fontFamily: typography.fontFamily.primary,
                  whiteSpace: "nowrap",
                  zIndex: 10,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ color: colors.gray[400], marginBottom: "2px" }}>
                      {DECILE_LABELS[index]} decile
                    </div>
                    <div style={{ color: isPositive ? colors.primary[300] : colors.red[300] }}>
                      {formatValue(value)}
                    </div>
                  </div>
                </div>
              )}

              {/* Positive section (top) */}
              {tickMax > 0 && (
                <div style={{
                  flex: tickPositiveRatio,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "stretch",
                }}>
                  {isPositive && (
                    <div
                      style={{
                        width: "100%",
                        height: `${Math.max(barHeightPercent / tickPositiveRatio, 2)}%`,
                        backgroundColor: isHovered ? colors.primary[600] : colors.primary[500],
                        borderRadius: "2px 2px 0 0",
                        transition: "background-color 0.15s ease",
                        minHeight: "2px",
                        cursor: "pointer",
                      }}
                    />
                  )}
                </div>
              )}

              {/* Zero line */}
              {tickMax > 0 && tickMin < 0 && (
                <div style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: colors.gray[400],
                  flexShrink: 0,
                }} />
              )}

              {/* Negative section (bottom) */}
              {tickMin < 0 && (
                <div style={{
                  flex: tickNegativeRatio,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "stretch",
                }}>
                  {!isPositive && (
                    <div
                      style={{
                        width: "100%",
                        height: `${Math.max(barHeightPercent / tickNegativeRatio, 2)}%`,
                        backgroundColor: isHovered ? colors.red[600] : colors.red[500],
                        borderRadius: "0 0 2px 2px",
                        transition: "background-color 0.15s ease",
                        minHeight: "2px",
                        cursor: "pointer",
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
        </div>
      </div>

      {/* X-axis labels */}
      <div style={{
        display: "flex",
        gap: "2px",
        marginLeft: "52px",
        padding: `${spacing.xs} 0 0`,
        marginTop: spacing.sm,
        borderTop: `1px solid ${colors.border.light}`,
      }}>
        {DECILE_LABELS.map((label, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: typography.fontSize.xs,
              fontFamily: typography.fontFamily.body,
              color: colors.text.tertiary,
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>

    </div>
  );
}
