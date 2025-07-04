import React from "react";
import PropTypes from "prop-types";
import "../App.css";
import useFavorites from "../hooks/useFavorites";

/**
 * PUBLIC_INTERFACE
 * PetCard Component
 * Displays a pet's info in a card layout, including image, name, breed, status badge, and location.
 * Responsive and uses theme variables for styles.
 */
function getStatusBadge(status) {
  let label = "";
  let style = {};
  switch (status?.toLowerCase()) {
    case "adopted":
      label = "Adopted";
      style = {
        background: "var(--secondary)",
        color: "#fff"
      };
      break;
    case "available":
      label = "Available";
      style = {
        background: "var(--primary)",
        color: "#22262a"
      };
      break;
    case "under treatment":
      label = "Under Treatment";
      style = {
        background: "var(--accent)",
        color: "#22262a"
      };
      break;
    default:
      label = status || "Unknown";
      style = {
        background: "#e0e0e0",
        color: "#22262a"
      };
  }
  return (
    <span className="pet-status-badge" style={style}>
      {label}
    </span>
  );
}

/**
 * Adds a favorites heart icon on card corner, which can be toggled.
 * Icon only handles favorite toggle (not opening modal!).
 */
function PetCard({
  id,
  name,
  breed,
  image,
  age,
  location,
  status,
  onClick,
  tags = [],
  ...rest
}) {
  const { isFavorite, toggleFavorite } = useFavorites();

  // Handler for heart click (should not trigger parent card click/modal)
  function handleFavoriteClick(e) {
    e.stopPropagation();
    toggleFavorite(id);
  }

  // Simple heart SVG, visually filled if favorited.
  const HeartIcon = ({ filled = false }) => (
    <svg
      width="26"
      height="26"
      viewBox="0 0 28 28"
      fill={filled ? "var(--secondary, #6ec6f6)" : "none"}
      stroke={filled ? "var(--secondary, #6ec6f6)" : "#bbb"}
      strokeWidth="2.1"
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        filter: filled ? "drop-shadow(0 1px 6px #99e4fc44)" : "none"
      }}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M14 25C13.49 25 13.02 24.85 12.61 24.58C8.36 21.69 5 18.82 5 15.41C5 12.91 7.01 11 9.5 11C11.12 11 12.58 11.91 13.33 13.18C13.56 13.56 14.44 13.56 14.67 13.18C15.42 11.91 16.88 11 18.5 11C20.99 11 23 12.91 23 15.41C23 18.82 19.64 21.69 15.39 24.58C14.98 24.85 14.51 25 14 25Z"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill={filled ? "var(--secondary, #6ec6f6)" : "none"}
      />
    </svg>
  );

  return (
    <div
      className="pet-card"
      tabIndex={0}
      onClick={onClick}
      role="button"
      aria-label={`See details for ${name}`}
      style={{
        minWidth: 0,
        touchAction: "manipulation",
        position: "relative", // for absolute favorite icon
        ...rest.style
      }}
      {...rest}
    >
      {/* Favorite icon on top-right: visible always, filled if favorite */}
      <button
        className="favorite-btn"
        aria-label={isFavorite?.(id) ? "Remove from favorites" : "Add to favorites"}
        title={isFavorite?.(id) ? "Remove from favorites" : "Add to favorites"}
        onClick={handleFavoriteClick}
        tabIndex={0}
        style={{
          position: "absolute",
          right: 10,
          top: 10,
          background: "rgba(255,255,255,0.90)",
          border: "none",
          borderRadius: "50%",
          width: 34,
          height: 34,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3,
          padding: 0,
          boxShadow: "0 2px 9px 0 rgba(110,198,246,0.08)"
        }}
        onMouseDown={e => e.stopPropagation()}
      >
        <HeartIcon filled={isFavorite?.(id)} />
      </button>
      <div className="pet-img-container">
        {image ? (
          <img
            className="pet-img"
            src={image}
            alt={name || "Adoptable Pet"}
            loading="lazy"
            draggable={false}
            style={{ userSelect: "none" }}
          />
        ) : (
          <div className="pet-img-skeleton" />
        )}
        <div className="pet-card-badge-ct">{getStatusBadge(status)}</div>
      </div>
      <div className="pet-card-body">
        <div className="pet-card-title-row">
          <h3 className="pet-card-name" style={{ wordBreak: "break-word" }}>
            {name}
          </h3>
          {breed && <span className="pet-card-breed">{breed}</span>}
        </div>
        <div className="pet-card-meta-row">
          {age && <span className="pet-card-age">{age}</span>}
          {location && <span className="pet-card-location">{location}</span>}
        </div>
        {tags?.length > 0 && (
          <div className="pet-card-tags-row">
            {tags.map((tag) => (
              <span className="pet-card-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

PetCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string,
  breed: PropTypes.string,
  image: PropTypes.string,
  age: PropTypes.string,
  location: PropTypes.string,
  status: PropTypes.string,
  onClick: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.string)
};

export default PetCard;
