import React from "react";
import PropTypes from "prop-types";
import "../App.css";

/**
 * PUBLIC_INTERFACE
 * Map
 * Displays a static map or embedded public map (OpenStreetMap by default) for a given location.
 * Props:
 *   location: string (city/town name)
 *   height/width: optional dimensions (defaults: 210px/w100%)
 *   style/className: for rounding, mobile-first UI, etc.
 */
export function getMapEmbedUrl(location) {
  if (!location) return null;
  // Use OpenStreetMap search to embed. Fallback: San Jose
  const q = encodeURIComponent(location || "San Jose");
  // Lightweight public embedding; for full APIs use Google Maps/Supabase Maps SDK
  return `https://www.openstreetmap.org/export/embed.html?bbox=-122.11,37.32,-121.75,37.42&layer=mapnik&marker=37.36,-121.89&q=${q}`;
}

function Map({ location, height = 210, width = "100%", style = {}, className = "" }) {
  // Fallback map center for demo (San Jose coords)
  let mapSrc;
  let showPlaceholder = false;
  if (location) {
    // Use static embed with search parameter
    mapSrc = `https://www.openstreetmap.org/export/embed.html?search=${encodeURIComponent(location)}&zoom=12`;
  } else {
    showPlaceholder = true;
  }
  return (
    <div
      className={`pawsconnect-map-container ${className}`}
      style={{
        borderRadius: "var(--radius)",
        overflow: "hidden",
        width,
        background: "#ececec",
        boxShadow: "0 2px 8px 0 rgba(90,120,145,0.07)",
        ...style
      }}
      aria-label={location ? `Map showing ${location}` : "Map"}
    >
      {showPlaceholder ? (
        <div style={{ height, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "var(--text-secondary)", fontSize: "1.08em" }}>
            Map unavailable
          </span>
        </div>
      ) : (
        <iframe
          title={`Map of ${location}`}
          src={mapSrc}
          width="100%"
          height={height}
          style={{
            border: 0,
            borderRadius: "var(--radius)",
            pointerEvents: "none"
          }}
          loading="lazy"
        ></iframe>
      )}
    </div>
  );
}

Map.propTypes = {
  location: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  className: PropTypes.string
};

export default Map;
