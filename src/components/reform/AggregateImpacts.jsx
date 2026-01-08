import { colors, typography, spacing } from "../../designTokens";

const formatCurrency = (value) => {
  if (value === null || value === undefined) return "N/A";
  const absValue = Math.abs(value);
  const sign = value < 0 ? "-" : "+";

  if (absValue >= 1e9) {
    return `${sign}$${(absValue / 1e9).toFixed(1)}B`;
  } else if (absValue >= 1e6) {
    return `${sign}$${(absValue / 1e6).toFixed(0)}M`;
  } else if (absValue >= 1e3) {
    return `${sign}$${(absValue / 1e3).toFixed(0)}K`;
  }
  return `${sign}$${absValue.toFixed(0)}`;
};

const formatPercent = (value, decimals = 1) => {
  if (value === null || value === undefined) return "N/A";
  return `${(value * 100).toFixed(decimals)}%`;
};

const formatChange = (value, decimals = 2) => {
  if (value === null || value === undefined) return "N/A";
  const sign = value > 0 ? "+" : "";
  return `${sign}${(value * 100).toFixed(decimals)} pp`;
};

const TrendDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
);

const DollarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);

export default function AggregateImpacts({ impacts }) {
  if (!impacts || !impacts.computed) {
    return (
      <div style={{
        padding: spacing.lg,
        backgroundColor: colors.background.secondary,
        borderRadius: spacing.radius.lg,
        border: `1px dashed ${colors.border.medium}`,
        textAlign: "center",
      }}>
        <p style={{
          margin: 0,
          color: colors.text.tertiary,
          fontSize: typography.fontSize.sm,
          fontFamily: typography.fontFamily.body,
        }}>
          Aggregate impacts not yet computed
        </p>
      </div>
    );
  }

  const { budgetaryImpact, povertyImpact, childPovertyImpact, winnersLosers } = impacts;

  // Determine if this is a tax cut (revenue loss) or tax increase
  const isRevenueLoss = budgetaryImpact?.netCost < 0;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.xl, height: "100%" }}>
      {/* Left Column - Budgetary Impact */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: spacing.lg,
      }}>
        {/* Budgetary Impact - Main Card */}
        <div style={{
          padding: spacing.xl,
          backgroundColor: isRevenueLoss ? colors.red[50] : colors.green[50],
          borderRadius: spacing.radius.xl,
          border: `1px solid ${isRevenueLoss ? colors.red[100] : colors.green[100]}`,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: spacing.sm,
            marginBottom: spacing.md,
          }}>
            <span style={{ color: isRevenueLoss ? colors.red[600] : colors.green[600] }}>
              <DollarIcon />
            </span>
            <span style={{
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.semibold,
              fontFamily: typography.fontFamily.body,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: isRevenueLoss ? colors.red[700] : colors.green[700],
            }}>
              Budgetary Impact
            </span>
          </div>
          <p style={{
            margin: 0,
            fontSize: typography.fontSize["4xl"],
            fontWeight: typography.fontWeight.bold,
            fontFamily: typography.fontFamily.primary,
            color: isRevenueLoss ? colors.red[700] : colors.green[700],
          }}>
            {formatCurrency(budgetaryImpact?.netCost)}
            <span style={{
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.normal,
              color: isRevenueLoss ? colors.red[600] : colors.green[600],
              marginLeft: spacing.sm,
            }}>/year</span>
          </p>
          <p style={{
            margin: `${spacing.md} 0 0`,
            fontSize: typography.fontSize.sm,
            fontFamily: typography.fontFamily.body,
            color: colors.text.secondary,
          }}>
            {isRevenueLoss ? "State revenue decrease" : "State revenue increase"}
          </p>
        </div>

        {/* Winners/Losers Bar */}
        {winnersLosers && (
          <div style={{
            padding: spacing.lg,
            backgroundColor: colors.background.secondary,
            borderRadius: spacing.radius.xl,
            border: `1px solid ${colors.border.light}`,
          }}>
            <p style={{
              margin: `0 0 ${spacing.md}`,
              fontSize: typography.fontSize.xs,
              fontWeight: typography.fontWeight.semibold,
              fontFamily: typography.fontFamily.body,
              color: colors.text.tertiary,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}>
              Household Impact Distribution
            </p>
            <div style={{
              display: "flex",
              height: "12px",
              borderRadius: "6px",
              overflow: "hidden",
              marginBottom: spacing.md,
            }}>
              {winnersLosers.gainMore5Pct > 0 && (
                <div style={{
                  width: `${winnersLosers.gainMore5Pct * 100}%`,
                  backgroundColor: colors.green[500],
                }} />
              )}
              {winnersLosers.gainLess5Pct > 0 && (
                <div style={{
                  width: `${winnersLosers.gainLess5Pct * 100}%`,
                  backgroundColor: colors.green[300],
                }} />
              )}
              {winnersLosers.noChange > 0 && (
                <div style={{
                  width: `${winnersLosers.noChange * 100}%`,
                  backgroundColor: colors.gray[300],
                }} />
              )}
              {winnersLosers.loseLess5Pct > 0 && (
                <div style={{
                  width: `${winnersLosers.loseLess5Pct * 100}%`,
                  backgroundColor: colors.red[300],
                }} />
              )}
              {winnersLosers.loseMore5Pct > 0 && (
                <div style={{
                  width: `${winnersLosers.loseMore5Pct * 100}%`,
                  backgroundColor: colors.red[500],
                }} />
              )}
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: typography.fontSize.sm,
              fontFamily: typography.fontFamily.body,
              color: colors.text.secondary,
            }}>
              <span>
                <span style={{ color: colors.green[600], fontWeight: typography.fontWeight.semibold }}>
                  {formatPercent(winnersLosers.gainMore5Pct + winnersLosers.gainLess5Pct, 0)}
                </span> gain
              </span>
              <span>
                <span style={{ color: colors.gray[600], fontWeight: typography.fontWeight.semibold }}>
                  {formatPercent(winnersLosers.noChange, 0)}
                </span> no change
              </span>
              <span>
                <span style={{ color: colors.red[600], fontWeight: typography.fontWeight.semibold }}>
                  {formatPercent(winnersLosers.loseLess5Pct + winnersLosers.loseMore5Pct, 0)}
                </span> lose
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Right Column - Poverty Metrics */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: spacing.lg,
      }}>
        {/* Poverty Impact */}
        <MetricCard
          icon={<TrendDownIcon />}
          label="Poverty Rate"
          value={formatPercent(povertyImpact?.reformRate)}
          change={povertyImpact?.change !== 0 ? formatChange(povertyImpact?.change) : "No change"}
          changeColor={povertyImpact?.change < 0 ? colors.green[600] : (povertyImpact?.change > 0 ? colors.red[600] : colors.gray[500])}
          large
        />

        {/* Child Poverty Impact */}
        <MetricCard
          icon={<UsersIcon />}
          label="Child Poverty Rate"
          value={formatPercent(childPovertyImpact?.reformRate)}
          change={childPovertyImpact?.change !== 0 ? formatChange(childPovertyImpact?.change) : "No change"}
          changeColor={childPovertyImpact?.change < 0 ? colors.green[600] : (childPovertyImpact?.change > 0 ? colors.red[600] : colors.gray[500])}
          large
        />
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, change, changeColor, large }) {
  return (
    <div style={{
      padding: large ? spacing.xl : spacing.md,
      backgroundColor: colors.background.secondary,
      borderRadius: spacing.radius.xl,
      border: `1px solid ${colors.border.light}`,
      flex: large ? 1 : undefined,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: spacing.sm,
        marginBottom: large ? spacing.md : spacing.sm,
        color: colors.text.tertiary,
      }}>
        {icon}
        <span style={{
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.semibold,
          fontFamily: typography.fontFamily.body,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}>
          {label}
        </span>
      </div>
      <p style={{
        margin: 0,
        fontSize: large ? typography.fontSize["3xl"] : typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
        fontFamily: typography.fontFamily.primary,
        color: colors.secondary[900],
      }}>
        {value}
      </p>
      <p style={{
        margin: `${spacing.sm} 0 0`,
        fontSize: large ? typography.fontSize.base : typography.fontSize.xs,
        fontFamily: typography.fontFamily.body,
        color: changeColor,
        fontWeight: typography.fontWeight.medium,
      }}>
        {change}
      </p>
    </div>
  );
}
