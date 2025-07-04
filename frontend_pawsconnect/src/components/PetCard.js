import React from "react";
import PropTypes from "prop-types";
import "../App.css";

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

// PUBLIC_INTERFACE
function PetCard({
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
        ...rest.style
      }}
      {...rest}
    >
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
