import React from "react";
import PropTypes from "prop-types";
import "../App.css";

/**
 * PUBLIC_INTERFACE
 * Filters Component
 * UI for selecting breed, age, and location filters for pets. Calls `onChange` with updated filters.
 * Props:
 *   filters - { breed, age, location }
 *   options - { breeds: [], ages: [], locations: [] }
 *   onFilterChange(filterName, value): handler for filter update
 *   onClear(): clear filters
 */
function Filters({ filters, options, onFilterChange, onClear, style = {}, className = "" }) {
  // Accessible filter label helper
  const makeId = (name) => `filter-${name}`;

  return (
    <form
      className={`pawsconnect-filters-row ${className}`}
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        alignItems: "center",
        background: "var(--bg-secondary)",
        borderRadius: "var(--radius)",
        boxShadow: "0 1px 7px 0 rgba(110,198,246,.04)",
        padding: "0.9em 1em 0.9em 1em",
        margin: "0 0 0.7rem 0",
        ...style
      }}
      aria-label="Filters for pets"
      onSubmit={e => e.preventDefault()} // prevent accidental form submit
    >
      {/* Breed filter */}
      <div>
        <label htmlFor={makeId("breed")} style={{ fontWeight: 500, color: "var(--text-secondary)", fontSize: ".98em", marginRight: 6 }}>
          Breed
        </label>
        <select
          id={makeId("breed")}
          value={filters.breed}
          onChange={e => onFilterChange("breed", e.target.value)}
          style={{
            borderRadius: "var(--radius)",
            padding: "0.42em 1.2em 0.42em 0.9em",
            border: "1px solid var(--border-color)",
            fontSize: "1em",
            background: "var(--bg-primary)",
            color: "var(--text-primary)",
            minWidth: 118,
          }}
          aria-label="Filter by breed"
        >
          <option value="">All</option>
          {options.breeds.map(breed => (
            <option value={breed} key={breed}>{breed}</option>
          ))}
        </select>
      </div>
      {/* Age filter */}
      <div>
        <label htmlFor={makeId("age")} style={{ fontWeight: 500, color: "var(--text-secondary)", fontSize: ".98em", marginRight: 6 }}>
          Age
        </label>
        <select
          id={makeId("age")}
          value={filters.age}
          onChange={e => onFilterChange("age", e.target.value)}
          style={{
            borderRadius: "var(--radius)",
            padding: "0.42em 1.2em 0.42em 0.9em",
            border: "1px solid var(--border-color)",
            fontSize: "1em",
            background: "var(--bg-primary)",
            color: "var(--text-primary)",
            minWidth: 98,
          }}
          aria-label="Filter by age"
        >
          <option value="">All</option>
          {options.ages.map(age => (
            <option value={age} key={age}>{age}</option>
          ))}
        </select>
      </div>
      {/* Location filter */}
      <div>
        <label htmlFor={makeId("location")} style={{ fontWeight: 500, color: "var(--text-secondary)", fontSize: ".98em", marginRight: 6 }}>
          Location
        </label>
        <select
          id={makeId("location")}
          value={filters.location}
          onChange={e => onFilterChange("location", e.target.value)}
          style={{
            borderRadius: "var(--radius)",
            padding: "0.42em 1.2em 0.42em 0.9em",
            border: "1px solid var(--border-color)",
            fontSize: "1em",
            background: "var(--bg-primary)",
            color: "var(--text-primary)",
            minWidth: 140,
          }}
          aria-label="Filter by location"
        >
          <option value="">All</option>
          {options.locations.map(loc => (
            <option value={loc} key={loc}>{loc}</option>
          ))}
        </select>
      </div>
      {/* Clear Filters Button */}
      <button
        type="button"
        onClick={onClear}
        style={{
          background: "var(--secondary)",
          color: "#fff",
          marginLeft: "0.8em",
          borderRadius: "999px",
          padding: "0.5em 1.2em",
          fontWeight: 600,
          fontSize: ".97em",
          border: "none",
          boxShadow: "none",
        }}
        aria-label="Clear all filters"
      >
        Clear
      </button>
    </form>
  );
}

Filters.propTypes = {
  filters: PropTypes.shape({
    breed: PropTypes.string,
    age: PropTypes.string,
    location: PropTypes.string
  }),
  options: PropTypes.shape({
    breeds: PropTypes.array,
    ages: PropTypes.array,
    locations: PropTypes.array
  }),
  onFilterChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  style: PropTypes.object,
  className: PropTypes.string
};

export default Filters;
