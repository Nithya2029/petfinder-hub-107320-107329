import React, { useState } from 'react';
import SearchBar from './SearchBar';
import logo from '../logo.svg';
import "../App.css";

/**
 * PUBLIC_INTERFACE
 * LandingPage
 * Main landing page component for PawsConnect, including intro, branding, sticky filter/search, SearchBar, and CTA.
 * Accepts optional onAdoptNow callback.
 */
function LandingPage({ onAdoptNow }) {
  // Local search state - to be integrated with actual search/filtering in future steps
  const [searchValue, setSearchValue] = useState("");

  // Handler (no-op for now, could invoke parent search/filter)
  const handleSearch = (query) => {
    // Could trigger backend search or set props
    // For now, just log
    console.log('Searching for:', query);
  };

  return (
    <div className="landing-root">
      {/* Project Branding & Intro */}
      <section className="landing-intro" tabIndex={-1}>
        <img src={logo} className="landing-logo" alt="PawsConnect logo" />
        <h1 className="landing-title">PawsConnect</h1>
        <p className="landing-subtitle">
          Find your perfect companion.<br />Search adoptable pets & registered strays in your area, easily.
        </p>
      </section>

      {/* Sticky Filter/Search Bar Section */}
      <section className="sticky-searchbar-outer">
        <div className="sticky-searchbar-inner" role="region" aria-label="search pets">
          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            onSearch={handleSearch}
            placeholder="Search by breed, age, or location..."
            showButton={true}
            className="landingpage-searchbar"
          />
          {/* Minimal filter stub, leave placeholder for filter components */}
          <div className="filter-row-placeholder" aria-hidden>
            {/* Filters UI renders only after CTA (with grid), this preserves sticky layout & responsive spacing. */}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <button
          className="btn btn-large adopt-now-cta"
          onClick={onAdoptNow || (() => window.scrollTo(0, document.body.scrollHeight))}
        >
          Adopt Now
        </button>
      </section>
    </div>
  );
}

export default LandingPage;
