import { useState } from "react";
import { colors, typography, spacing } from "../../designTokens";
import reformImpactsData from "../../data/reformImpacts.json";

// Simplified SVG paths for Utah congressional districts (118th Congress)
// Utah shape: rectangular with notch in NE corner
// Districts are arranged roughly as:
// - District 1: Northern strip (Cache Valley, Weber, Davis, Box Elder)
// - District 2: Large western/rural area (majority of land area)
// - District 3: Eastern/Provo area (Utah County, Carbon, Emery)
// - District 4: Salt Lake suburbs (Salt Lake County south + west)
const UTAH_DISTRICT_PATHS = {
  "1": {
    // Northern Utah - horizontal strip across top
    path: "M0,0 L140,0 L140,50 L0,50 Z",
    center: { x: 70, y: 25 },
    name: "District 1",
    region: "Northern Utah",
  },
  "2": {
    // Western & Rural - large western region
    path: "M0,50 L50,50 L50,90 L80,90 L80,180 L0,180 Z",
    center: { x: 35, y: 120 },
    name: "District 2",
    region: "Western & Rural Utah",
  },
  "3": {
    // Central & Eastern - Provo and eastern Utah
    path: "M80,90 L140,90 L140,180 L80,180 Z",
    center: { x: 110, y: 135 },
    name: "District 3",
    region: "Central & Eastern Utah",
  },
  "4": {
    // Salt Lake area - compact urban region
    path: "M50,50 L140,50 L140,90 L50,90 Z",
    center: { x: 95, y: 70 },
    name: "District 4",
    region: "Salt Lake Suburbs",
  },
};

// Generic district visualization for other states (card-based grid)
const STATE_DISTRICTS = {
  AL: [
    { id: "1", name: "District 1", region: "Mobile & Southwest" },
    { id: "2", name: "District 2", region: "Dothan & Southeast" },
    { id: "3", name: "District 3", region: "East Alabama" },
    { id: "4", name: "District 4", region: "North Central" },
    { id: "5", name: "District 5", region: "Huntsville & North" },
    { id: "6", name: "District 6", region: "Birmingham Suburbs" },
    { id: "7", name: "District 7", region: "Birmingham & Black Belt" },
  ],
  AK: [{ id: "AL", name: "At-Large", region: "Statewide" }],
  AZ: [
    { id: "1", name: "District 1", region: "Northeast & Rural" },
    { id: "2", name: "District 2", region: "Southern Arizona" },
    { id: "3", name: "District 3", region: "West Phoenix" },
    { id: "4", name: "District 4", region: "North & West Phoenix" },
    { id: "5", name: "District 5", region: "East Valley" },
    { id: "6", name: "District 6", region: "Scottsdale & East" },
    { id: "7", name: "District 7", region: "South Phoenix" },
    { id: "8", name: "District 8", region: "Northwest Phoenix" },
    { id: "9", name: "District 9", region: "Central Phoenix" },
  ],
  UT: [
    { id: "1", name: "District 1", region: "Northern Utah" },
    { id: "2", name: "District 2", region: "Western & Rural Utah" },
    { id: "3", name: "District 3", region: "Central & Eastern Utah" },
    { id: "4", name: "District 4", region: "Salt Lake Suburbs" },
  ],
  // Add more states as needed...
};

const ArrowUpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17l9.2-9.2M17 17V7H7" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-9.2 9.2M7 7v10h10" />
  </svg>
);

function getImpactColor(avgBenefit, maxBenefit) {
  if (avgBenefit === 0) return colors.gray[200];
  const intensity = Math.min(Math.abs(avgBenefit) / maxBenefit, 1);
  if (avgBenefit > 0) {
    // Green scale for positive benefits
    if (intensity > 0.7) return colors.green[500];
    if (intensity > 0.4) return colors.green[400];
    return colors.green[300];
  } else {
    // Red scale for negative benefits
    if (intensity > 0.7) return colors.red[500];
    if (intensity > 0.4) return colors.red[400];
    return colors.red[300];
  }
}

function getImpactHoverColor(avgBenefit, maxBenefit) {
  if (avgBenefit === 0) return colors.gray[300];
  const intensity = Math.min(Math.abs(avgBenefit) / maxBenefit, 1);
  if (avgBenefit > 0) {
    if (intensity > 0.7) return colors.green[600];
    if (intensity > 0.4) return colors.green[500];
    return colors.green[400];
  } else {
    if (intensity > 0.7) return colors.red[600];
    if (intensity > 0.4) return colors.red[500];
    return colors.red[400];
  }
}

function UtahDistrictMap({ reformId }) {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const reformImpacts = reformImpactsData[reformId];
  const hasDistrictData = reformImpacts?.districtImpacts;

  // Calculate max benefit for color scaling
  const maxBenefit = hasDistrictData
    ? Math.max(...Object.values(UTAH_DISTRICT_PATHS).map((_, idx) =>
        Math.abs(reformImpacts.districtImpacts[`UT-${idx + 1}`]?.avgBenefit || 0)
      ))
    : 150;

  const activeDistrict = selectedDistrict;
  const activeImpact = activeDistrict && hasDistrictData
    ? reformImpacts.districtImpacts[`UT-${activeDistrict}`]
    : null;

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: spacing["2xl"],
      height: "100%",
    }}>
      {/* Map Container */}
      <div style={{
        backgroundColor: colors.background.secondary,
        borderRadius: spacing.radius.xl,
        border: `1px solid ${colors.border.light}`,
        padding: spacing.xl,
        display: "flex",
        flexDirection: "column",
      }}>
        <h4 style={{
          margin: `0 0 ${spacing.md}`,
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.semibold,
          fontFamily: typography.fontFamily.body,
          color: colors.text.secondary,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}>
          Utah Congressional Districts
        </h4>

        <div style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "300px",
        }}>
          <svg
            viewBox="0 0 140 180"
            style={{
              width: "100%",
              maxWidth: "280px",
              height: "auto",
            }}
          >
            {/* State outline - Utah's rectangular shape */}
            <rect
              x="0" y="0"
              width="140" height="180"
              fill={colors.background.tertiary}
              stroke={colors.border.medium}
              strokeWidth="1.5"
              rx="2"
            />

            {/* District shapes */}
            {Object.entries(UTAH_DISTRICT_PATHS).map(([districtId, data]) => {
              const impact = hasDistrictData
                ? reformImpacts.districtImpacts[`UT-${districtId}`]
                : null;
              const avgBenefit = impact?.avgBenefit || 0;
              const isSelected = selectedDistrict === districtId;

              const fillColor = isSelected
                ? getImpactHoverColor(avgBenefit, maxBenefit)
                : getImpactColor(avgBenefit, maxBenefit);

              return (
                <g key={districtId}>
                  <path
                    d={data.path}
                    fill={fillColor}
                    stroke={isSelected ? colors.primary[600] : colors.white}
                    strokeWidth={isSelected ? "3" : "2"}
                    style={{
                      cursor: "pointer",
                      transition: "fill 0.2s ease, stroke-width 0.2s ease",
                    }}
                    onClick={() => setSelectedDistrict(selectedDistrict === districtId ? null : districtId)}
                  />
                  {/* District label */}
                  <text
                    x={data.center.x}
                    y={data.center.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={colors.secondary[900]}
                    fontSize="14"
                    fontWeight="700"
                    fontFamily={typography.fontFamily.primary}
                    style={{ pointerEvents: "none" }}
                  >
                    {districtId}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: spacing.lg,
          marginTop: spacing.lg,
          paddingTop: spacing.md,
          borderTop: `1px solid ${colors.border.light}`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: spacing.xs }}>
            <div style={{
              width: "12px",
              height: "12px",
              borderRadius: "2px",
              backgroundColor: colors.green[400],
            }} />
            <span style={{
              fontSize: typography.fontSize.xs,
              fontFamily: typography.fontFamily.body,
              color: colors.text.secondary,
            }}>Gains</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: spacing.xs }}>
            <div style={{
              width: "12px",
              height: "12px",
              borderRadius: "2px",
              backgroundColor: colors.red[400],
            }} />
            <span style={{
              fontSize: typography.fontSize.xs,
              fontFamily: typography.fontFamily.body,
              color: colors.text.secondary,
            }}>Loses</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: spacing.xs }}>
            <div style={{
              width: "12px",
              height: "12px",
              borderRadius: "2px",
              backgroundColor: colors.gray[200],
            }} />
            <span style={{
              fontSize: typography.fontSize.xs,
              fontFamily: typography.fontFamily.body,
              color: colors.text.secondary,
            }}>No Change</span>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: spacing.lg,
      }}>
        {activeDistrict && activeImpact ? (
          <DistrictDetailCard
            districtId={activeDistrict}
            districtInfo={UTAH_DISTRICT_PATHS[activeDistrict]}
            impact={activeImpact}
            maxBenefit={maxBenefit}
          />
        ) : (
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: spacing["2xl"],
            backgroundColor: colors.background.secondary,
            borderRadius: spacing.radius.xl,
            border: `1px dashed ${colors.border.medium}`,
          }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: spacing.radius.full,
              backgroundColor: colors.primary[50],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: spacing.md,
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.primary[400]} strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
            <p style={{
              margin: 0,
              color: colors.text.tertiary,
              fontSize: typography.fontSize.sm,
              fontFamily: typography.fontFamily.body,
              textAlign: "center",
            }}>
              Click on a district<br />to see detailed impact data
            </p>
          </div>
        )}

        {/* District Summary Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: spacing.md,
        }}>
          {Object.entries(UTAH_DISTRICT_PATHS).map(([districtId, data]) => {
            const impact = hasDistrictData
              ? reformImpacts.districtImpacts[`UT-${districtId}`]
              : null;
            const avgBenefit = impact?.avgBenefit || 0;
            const isActive = activeDistrict === districtId;

            return (
              <button
                key={districtId}
                onClick={() => setSelectedDistrict(selectedDistrict === districtId ? null : districtId)}
                style={{
                  padding: spacing.md,
                  backgroundColor: isActive ? colors.primary[50] : colors.white,
                  borderRadius: spacing.radius.lg,
                  border: `1px solid ${isActive ? colors.primary[300] : colors.border.light}`,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s ease",
                }}
              >
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: spacing.sm,
                  }}>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "24px",
                      height: "24px",
                      borderRadius: spacing.radius.md,
                      backgroundColor: getImpactColor(avgBenefit, maxBenefit),
                      color: colors.secondary[900],
                      fontSize: typography.fontSize.xs,
                      fontWeight: typography.fontWeight.bold,
                      fontFamily: typography.fontFamily.primary,
                    }}>
                      {districtId}
                    </span>
                    <span style={{
                      fontSize: typography.fontSize.sm,
                      fontWeight: typography.fontWeight.medium,
                      fontFamily: typography.fontFamily.body,
                      color: colors.secondary[800],
                    }}>
                      {data.region}
                    </span>
                  </div>
                  <span style={{
                    fontSize: typography.fontSize.sm,
                    fontWeight: typography.fontWeight.bold,
                    fontFamily: typography.fontFamily.primary,
                    color: avgBenefit > 0 ? colors.green[600] : (avgBenefit < 0 ? colors.red[600] : colors.gray[500]),
                  }}>
                    {avgBenefit > 0 ? "+" : ""}{avgBenefit === 0 ? "$0" : `$${Math.abs(avgBenefit)}`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DistrictDetailCard({ districtId, districtInfo, impact, maxBenefit }) {
  const avgBenefit = impact?.avgBenefit || 0;
  const isPositive = avgBenefit > 0;
  const isNeutral = avgBenefit === 0;

  return (
    <div style={{
      padding: spacing.xl,
      backgroundColor: colors.white,
      borderRadius: spacing.radius.xl,
      border: `1px solid ${colors.border.light}`,
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: spacing.md,
        marginBottom: spacing.lg,
        paddingBottom: spacing.lg,
        borderBottom: `1px solid ${colors.border.light}`,
      }}>
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          borderRadius: spacing.radius.lg,
          backgroundColor: getImpactColor(avgBenefit, maxBenefit),
          color: colors.secondary[900],
          fontSize: typography.fontSize.lg,
          fontWeight: typography.fontWeight.bold,
          fontFamily: typography.fontFamily.primary,
        }}>
          {districtId}
        </span>
        <div>
          <h4 style={{
            margin: 0,
            fontSize: typography.fontSize.lg,
            fontWeight: typography.fontWeight.semibold,
            fontFamily: typography.fontFamily.primary,
            color: colors.secondary[900],
          }}>
            {districtInfo.name}
          </h4>
          <p style={{
            margin: `${spacing.xs} 0 0`,
            fontSize: typography.fontSize.sm,
            fontFamily: typography.fontFamily.body,
            color: colors.text.secondary,
          }}>
            {districtInfo.region}
          </p>
        </div>
      </div>

      {/* Impact Value */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: spacing.sm,
        marginBottom: spacing.lg,
      }}>
        <span style={{
          color: isNeutral ? colors.gray[500] : (isPositive ? colors.green[600] : colors.red[600]),
        }}>
          {isNeutral ? null : (isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />)}
        </span>
        <span style={{
          fontSize: typography.fontSize["3xl"],
          fontWeight: typography.fontWeight.bold,
          fontFamily: typography.fontFamily.primary,
          color: isNeutral ? colors.gray[600] : (isPositive ? colors.green[700] : colors.red[700]),
        }}>
          {isPositive ? "+" : ""}{avgBenefit === 0 ? "$0" : `$${Math.abs(avgBenefit).toLocaleString()}`}
        </span>
        <span style={{
          fontSize: typography.fontSize.base,
          fontFamily: typography.fontFamily.body,
          color: colors.text.tertiary,
        }}>
          /household avg
        </span>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: spacing.md,
      }}>
        <StatBox
          label="Households"
          value={impact.householdsAffected?.toLocaleString() || "—"}
        />
        <StatBox
          label="Winners"
          value={impact.winnersShare ? `${(impact.winnersShare * 100).toFixed(0)}%` : "—"}
          color={colors.green[600]}
        />
        <StatBox
          label="Poverty Δ"
          value={impact.povertyChange === 0
            ? "None"
            : `${impact.povertyChange > 0 ? "+" : ""}${(impact.povertyChange * 100).toFixed(2)}pp`}
          color={impact.povertyChange < 0 ? colors.green[600] : (impact.povertyChange > 0 ? colors.red[600] : colors.gray[500])}
        />
      </div>
    </div>
  );
}

function StatBox({ label, value, color }) {
  return (
    <div style={{
      padding: spacing.md,
      backgroundColor: colors.background.secondary,
      borderRadius: spacing.radius.lg,
      textAlign: "center",
    }}>
      <p style={{
        margin: 0,
        fontSize: typography.fontSize.xs,
        fontFamily: typography.fontFamily.body,
        color: colors.text.tertiary,
        textTransform: "uppercase",
        letterSpacing: "0.3px",
      }}>
        {label}
      </p>
      <p style={{
        margin: `${spacing.sm} 0 0`,
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.bold,
        fontFamily: typography.fontFamily.primary,
        color: color || colors.secondary[800],
      }}>
        {value}
      </p>
    </div>
  );
}

// Fallback card-based view for states without SVG maps
function CardBasedDistrictView({ stateAbbr, reformId }) {
  const districts = STATE_DISTRICTS[stateAbbr];
  const reformImpacts = reformImpactsData[reformId];
  const hasDistrictData = reformImpacts?.districtImpacts;

  if (!districts) {
    return (
      <div style={{
        padding: spacing["2xl"],
        textAlign: "center",
        backgroundColor: colors.background.secondary,
        borderRadius: spacing.radius.xl,
        border: `1px dashed ${colors.border.medium}`,
      }}>
        <p style={{
          margin: 0,
          color: colors.text.tertiary,
          fontSize: typography.fontSize.sm,
          fontFamily: typography.fontFamily.body,
        }}>
          District data not available for this state
        </p>
      </div>
    );
  }

  const maxBenefit = hasDistrictData
    ? Math.max(...districts.map(d => Math.abs(reformImpacts.districtImpacts[`${stateAbbr}-${d.id}`]?.avgBenefit || 0)))
    : 100;

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: spacing.lg,
    }}>
      {districts.map((district) => {
        const impact = hasDistrictData
          ? reformImpacts.districtImpacts[`${stateAbbr}-${district.id}`]
          : null;
        const avgBenefit = impact?.avgBenefit || 0;
        const isPositive = avgBenefit > 0;
        const barWidth = maxBenefit > 0 ? (Math.abs(avgBenefit) / maxBenefit) * 100 : 0;

        return (
          <div
            key={district.id}
            style={{
              padding: spacing.lg,
              backgroundColor: colors.white,
              borderRadius: spacing.radius.xl,
              border: `1px solid ${colors.border.light}`,
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: spacing.sm,
              marginBottom: spacing.md,
            }}>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                borderRadius: spacing.radius.lg,
                backgroundColor: getImpactColor(avgBenefit, maxBenefit),
                color: colors.secondary[900],
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.bold,
                fontFamily: typography.fontFamily.primary,
              }}>
                {district.id}
              </span>
              <div>
                <span style={{
                  fontSize: typography.fontSize.base,
                  fontWeight: typography.fontWeight.semibold,
                  fontFamily: typography.fontFamily.primary,
                  color: colors.secondary[900],
                }}>
                  {district.name}
                </span>
                <p style={{
                  margin: 0,
                  fontSize: typography.fontSize.xs,
                  fontFamily: typography.fontFamily.body,
                  color: colors.text.tertiary,
                }}>
                  {district.region}
                </p>
              </div>
            </div>

            {impact ? (
              <>
                <div style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: spacing.xs,
                  marginBottom: spacing.sm,
                }}>
                  <span style={{
                    fontSize: typography.fontSize["2xl"],
                    fontWeight: typography.fontWeight.bold,
                    fontFamily: typography.fontFamily.primary,
                    color: avgBenefit === 0 ? colors.gray[600] : (isPositive ? colors.green[700] : colors.red[700]),
                  }}>
                    {isPositive ? "+" : ""}{avgBenefit === 0 ? "$0" : `$${Math.abs(avgBenefit)}`}
                  </span>
                  <span style={{
                    fontSize: typography.fontSize.sm,
                    fontFamily: typography.fontFamily.body,
                    color: colors.text.tertiary,
                  }}>
                    /household
                  </span>
                </div>

                <div style={{
                  height: "6px",
                  backgroundColor: colors.gray[100],
                  borderRadius: "3px",
                  overflow: "hidden",
                }}>
                  <div style={{
                    width: `${barWidth}%`,
                    height: "100%",
                    backgroundColor: avgBenefit === 0 ? colors.gray[400] : (isPositive ? colors.green[500] : colors.red[500]),
                    borderRadius: "3px",
                  }} />
                </div>
              </>
            ) : (
              <p style={{
                margin: 0,
                color: colors.text.tertiary,
                fontSize: typography.fontSize.sm,
                fontFamily: typography.fontFamily.body,
              }}>
                Data not yet computed
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function DistrictMap({ stateAbbr, reformId }) {
  // Use SVG map for Utah, fall back to cards for other states
  if (stateAbbr === "UT") {
    return (
      <div style={{ height: "100%" }}>
        <div style={{
          marginBottom: spacing.lg,
        }}>
          <h3 style={{
            margin: 0,
            fontSize: typography.fontSize.lg,
            fontWeight: typography.fontWeight.semibold,
            fontFamily: typography.fontFamily.primary,
            color: colors.secondary[900],
          }}>
            Impact by Congressional District
          </h3>
          <p style={{
            margin: `${spacing.xs} 0 0`,
            fontSize: typography.fontSize.sm,
            fontFamily: typography.fontFamily.body,
            color: colors.text.secondary,
          }}>
            Click on a district to see detailed impact analysis
          </p>
        </div>
        <UtahDistrictMap reformId={reformId} />
      </div>
    );
  }

  // For other states, use card-based view with header
  return (
    <div style={{ height: "100%" }}>
      <div style={{
        marginBottom: spacing.lg,
      }}>
        <h3 style={{
          margin: 0,
          fontSize: typography.fontSize.lg,
          fontWeight: typography.fontWeight.semibold,
          fontFamily: typography.fontFamily.primary,
          color: colors.secondary[900],
        }}>
          Impact by Congressional District
        </h3>
        <p style={{
          margin: `${spacing.xs} 0 0`,
          fontSize: typography.fontSize.sm,
          fontFamily: typography.fontFamily.body,
          color: colors.text.secondary,
        }}>
          Average household benefit under this reform
        </p>
      </div>
      <CardBasedDistrictView stateAbbr={stateAbbr} reformId={reformId} />
    </div>
  );
}
