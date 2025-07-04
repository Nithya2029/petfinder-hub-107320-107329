import React from "react";
import PropTypes from "prop-types";
import "../App.css";

/**
 * PUBLIC_INTERFACE
 * SkeletonLoader Component
 * Shows rectangular loading skeleton cards in a grid, mimicking PetCard layout.
 */
function SkeletonLoader({ count = 8 }) {
  return (
    <div className="pet-grid skeleton-grid">
      {Array(count).fill().map((_, idx) => (
        <div className="pet-card pet-card-skeleton" key={idx}>
          <div className="pet-img-container">
            <div className="pet-img-skeleton skeleton-animate" />
            <div className="pet-card-badge-ct">
              <span className="pet-status-badge skeleton-animate skeleton-badge" />
            </div>
          </div>
          <div className="pet-card-body">
            <div className="pet-card-title-row">
              <span className="skeleton-text skeleton-animate" style={{width: "60%"}} />
              <span className="skeleton-text skeleton-animate" style={{width: "30%"}} />
            </div>
            <div className="pet-card-meta-row">
              <span className="skeleton-text skeleton-animate" style={{width: "35%"}} />
              <span className="skeleton-text skeleton-animate" style={{width: "35%"}} />
            </div>
            <div className="pet-card-tags-row">
              <span className="skeleton-tag skeleton-animate" />
              <span className="skeleton-tag skeleton-animate" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

SkeletonLoader.propTypes = {
  count: PropTypes.number
};

export default SkeletonLoader;
