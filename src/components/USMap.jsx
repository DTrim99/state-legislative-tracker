import { useState, useRef, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { stateData } from "../data/states";
import { colors, mapColors } from "../designTokens";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// FIPS to state abbreviation mapping
const fipsToAbbr = {
  "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA",
  "08": "CO", "09": "CT", "10": "DE", "11": "DC", "12": "FL",
  "13": "GA", "15": "HI", "16": "ID", "17": "IL", "18": "IN",
  "19": "IA", "20": "KS", "21": "KY", "22": "LA", "23": "ME",
  "24": "MD", "25": "MA", "26": "MI", "27": "MN", "28": "MS",
  "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH",
  "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND",
  "39": "OH", "40": "OK", "41": "OR", "42": "PA", "44": "RI",
  "45": "SC", "46": "SD", "47": "TN", "48": "TX", "49": "UT",
  "50": "VT", "51": "VA", "53": "WA", "54": "WV", "55": "WI",
  "56": "WY", "72": "PR",
};

// Get color based on whether state has specific research
const getStateColor = (stateAbbr, research) => {
  const stateResearch = research.filter(
    (r) => r.state === stateAbbr && r.state !== "all" && r.status === "published"
  );
  return stateResearch.length > 0 ? mapColors.hasResearch : mapColors.default;
};

const USMap = memo(({ selectedState, onStateSelect, research }) => {
  const [position, setPosition] = useState({ coordinates: [-96, 38], zoom: 1 });
  const containerRef = useRef(null);

  const handleMoveEnd = (position) => {
    setPosition(position);
  };

  const handleWheel = (evt) => {
    evt.preventDefault();
    const delta = evt.deltaY > 0 ? -0.2 : 0.2;
    const newZoom = Math.min(Math.max(position.zoom + delta, 1), 5);
    setPosition((pos) => ({ ...pos, zoom: newZoom }));
  };

  const handleClick = (geo) => {
    const fips = geo.id;
    const abbr = fipsToAbbr[fips];
    if (abbr && stateData[abbr]) {
      onStateSelect(abbr);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%" }}
      onWheel={handleWheel}
    >
      <ComposableMap
        projection="geoAlbersUsa"
        style={{ width: "100%", height: "auto", maxHeight: "500px" }}
      >
        <ZoomableGroup
          center={position.coordinates}
          zoom={position.zoom}
          onMoveEnd={handleMoveEnd}
          minZoom={1}
          maxZoom={5}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const fips = geo.id;
                const abbr = fipsToAbbr[fips];
                const state = stateData[abbr];

                if (!state) return null;

                const isSelected = selectedState === abbr;

                // Get color based on research coverage
                const fillColor = getStateColor(abbr, research);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleClick(geo)}
                    className="state-path"
                    style={{
                      default: {
                        fill: fillColor,
                        stroke: isSelected ? colors.primary[700] : colors.white,
                        strokeWidth: isSelected ? 2 : 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: fillColor,
                        stroke: colors.primary[600],
                        strokeWidth: 1.5,
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: fillColor,
                        stroke: colors.primary[700],
                        strokeWidth: 2,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
});

USMap.displayName = "USMap";

export default USMap;
