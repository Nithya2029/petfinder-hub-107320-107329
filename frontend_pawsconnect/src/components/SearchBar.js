import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "../App.css";

/**
 * PUBLIC_INTERFACE
 * SearchBar
 * A reusable search bar component styled for mobile-first, modern UIs.
 * Accepts a value, onChange handler, placeholder, and optional onSearch callback.
 */
function SearchBar({
  value,
  onChange,
  placeholder = "Search for pets, breeds, or locations...",
  onSearch,
  showButton = false,
  className = "",
  style = {}
}) {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(inputValue);
    }
  };

  const handleButtonClick = () => {
    if (onSearch) {
      onSearch(inputValue);
    }
  };

  return (
    <form className={`pawsconnect-searchbar ${className}`}
      role="search"
      style={style}
      onSubmit={e => { e.preventDefault(); if (onSearch) onSearch(inputValue); }}>
      <input
        type="text"
        className="pawsconnect-search-input"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label={placeholder}
        autoComplete="off"
      />
      {showButton && (
        <button
          type="button"
          className="btn pawsconnect-search-btn"
          onClick={handleButtonClick}
          aria-label="Search"
        >
          🔍
        </button>
      )}
    </form>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  showButton: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
};

export default SearchBar;
