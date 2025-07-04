import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "../App.css";

/**
 * PUBLIC_INTERFACE
 * LocationAutocomplete
 * An accessible, mobile-first autocomplete dropdown/input for locations with minimal, rounded PawsConnect theme.
 * Props:
 *   value: string (current selected value)
 *   onChange: (newValue: string) => void
 *   options: array of possible locations (string[])
 *   placeholder: optional input placeholder
 *   disabled: optional
 *   className/style: pass-through for styling
 */
const sampleLocations = [
  "San Jose", "Fremont", "Mountain View", "Santa Clara",
  "Sunnyvale", "Milpitas", "Palo Alto", "Oakland", "San Francisco",
  "Santa Cruz", "Redwood City", "Berkeley", "Los Gatos", "Cupertino"
];

function filterLocations(input, locations) {
  if (!input) return locations;
  const q = input.trim().toLowerCase();
  return locations.filter(loc =>
    loc.toLowerCase().includes(q)
  );
}

function LocationAutocomplete({
  value = "",
  onChange,
  options = sampleLocations,
  placeholder = "Select location...",
  disabled = false,
  style = {},
  className = ""
}) {
  const [inputVal, setInputVal] = useState(value || "");
  const [showList, setShowList] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const containerRef = useRef(null);

  const filtered = filterLocations(inputVal, options);

  useEffect(() => {
    setInputVal(value || "");
  }, [value]);

  // Handle outside click to close dropdown
  useEffect(() => {
    if (!showList) return;
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowList(false);
        setActiveIdx(-1);
      }
    }
    document.addEventListener("mousedown", handleClick, { capture: true });
    return () =>
      document.removeEventListener("mousedown", handleClick, { capture: true });
  }, [showList]);

  // PUBLIC_INTERFACE
  function handleInput(e) {
    setInputVal(e.target.value);
    setShowList(true);
    setActiveIdx(-1);
    if (onChange) onChange(""); // clear filter until value explicitly selected/blurred
  }
  function handleFocus() {
    setShowList(true);
  }
  function handleSelect(idx) {
    const pick = filtered[idx >= 0 ? idx : 0] || "";
    setInputVal(pick);
    setShowList(false);
    setActiveIdx(-1);
    onChange && onChange(pick);
  }
  function handleBlur(e) {
    // On input blur, only confirm value if it's an exact match
    if (!filtered.includes(inputVal)) {
      setInputVal("");
      onChange && onChange("");
    } else {
      onChange && onChange(inputVal);
    }
    setShowList(false);
  }
  // PUBLIC_INTERFACE
  function handleKeyDown(e) {
    if (!showList) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx(idx => Math.min(filtered.length - 1, idx + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx(idx => Math.max(0, idx - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIdx >= 0) handleSelect(activeIdx);
      else if (filtered.length > 0) handleSelect(0);
    } else if (e.key === "Escape") {
      setShowList(false);
      setActiveIdx(-1);
    }
  }

  return (
    <div
      ref={containerRef}
      className={`autocomplete-container ${className}`}
      style={{
        position: "relative",
        minWidth: 160,
        maxWidth: 240,
        ...style
      }}
    >
      <input
        type="text"
        className="autocomplete-input"
        autoComplete="off"
        value={inputVal}
        onFocus={handleFocus}
        onChange={handleInput}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        style={{
          width: "100%",
          borderRadius: "var(--radius)",
          padding: "0.42em 1.2em 0.42em 0.8em",
          border: "1px solid var(--border-color)",
          fontSize: "1em",
          background: "var(--bg-primary)",
          color: "var(--text-primary)",
          outline: "none",
          boxShadow: "0 2px 10px 0 rgba(255,214,165,.03)",
          transition: "box-shadow var(--transition)",
          opacity: disabled ? 0.7 : 1
        }}
        disabled={disabled}
        aria-label={placeholder}
      />
      {showList && filtered.length > 0 && (
        <ul
          className="autocomplete-list"
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            position: "absolute",
            top: "110%",
            left: 0,
            right: 0,
            zIndex: 10,
            background: "var(--bg-secondary, #f8fafb)",
            borderRadius: "var(--radius)",
            boxShadow: "0 4px 24px 0 rgba(110,198,246,.06), 0 1.5px 6px 0 rgba(255,214,165,.13)",
            border: "1px solid var(--border-color)",
            maxHeight: 162,
            overflowY: "auto"
          }}
          role="listbox"
        >
          {filtered.map((loc, idx) => (
            <li
              key={loc}
              className="autocomplete-item"
              role="option"
              aria-selected={activeIdx === idx}
              tabIndex={-1}
              style={{
                padding: "0.55em 1em",
                cursor: "pointer",
                borderBottom: idx === filtered.length - 1 ? "none" : "1px solid var(--border-color)",
                background: activeIdx === idx ? "var(--primary, #ffe066)" : "transparent",
                color: activeIdx === idx ? "#1a1a1a" : "var(--text-primary)",
                fontWeight: activeIdx === idx ? 600 : 400,
                borderRadius: activeIdx === idx ? "var(--radius)" : "0"
              }}
              onMouseDown={e => {
                e.preventDefault();
                handleSelect(idx);
              }}
            >
              {loc}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

LocationAutocomplete.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string
};

export default LocationAutocomplete;
