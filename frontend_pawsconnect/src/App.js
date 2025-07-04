import React, { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import PetGrid from './components/PetGrid';
import Filters from './components/Filters';
import PetModal from './components/PetModal';
import { usePetFilters } from './hooks/usePetFilters';

/**
 * PUBLIC_INTERFACE
 * Main App
 * Integrates LandingPage and PetGrid. After simulated search, shows grid of pet cards.
 */
function App() {
  const [theme, setTheme] = useState('light');
  const [showGrid, setShowGrid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pets, setPets] = useState([]);
  // Pet modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Simulate "search": Show grid when user triggers "Adopt Now" CTA, or after auto delay for demo
  useEffect(() => {
    if (showGrid) {
      setLoading(true);
      // Simulate async fetch
      setTimeout(() => {
        setPets([
          {
            id: 1,
            name: "Ollie",
            breed: "Golden Retriever",
            image: "https://images.pexels.com/photos/1559091/pexels-photo-1559091.jpeg?h=500&q=80",
            age: "2 yrs",
            status: "Available",
            location: "San Jose",
            tags: ["Playful", "Vaccinated"],
            contactEmail: "shelter@pawsconnect.org",
            contactWhatsapp: "+11235551234",
            description: "Friendly, loves fetch, ready to find a forever home!"
          },
          {
            id: 2,
            name: "Luna",
            breed: "Tabby Cat",
            image: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?h=500&q=80",
            age: "8 mo",
            status: "Adopted",
            location: "Fremont",
            tags: ["Calm", "Litter Trained"],
            contactEmail: "adoptions@catrescue.net",
            contactWhatsapp: "",
            description: "Sweet tabby, indoor cat, gets along with kids and other cats."
          },
          {
            id: 3,
            name: "Max",
            breed: "Beagle",
            image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?h=500&q=80",
            age: "1 yr",
            status: "Under Treatment",
            location: "Mountain View",
            tags: ["Energetic"],
            contactEmail: "",
            contactWhatsapp: "+11235554321",
            description: "Recently rescued, in recovery, reserved for special adoption."
          },
          {
            id: 4,
            name: "Milo",
            breed: "Mixed Breed",
            image: "",
            age: "3 yrs",
            status: "Available",
            location: "Santa Clara",
            tags: ["Microchipped"],
            contactEmail: "localrescue@santaclara.gov"
          }
        ]);
        setLoading(false);
      }, 1200);
    }
  }, [showGrid]);

  // Integrate the usePetFilters hook (when pets loaded)
  const {
    filters,
    setFilter,
    clearFilters,
    filteredPets,
    uniqueOptions
  } = usePetFilters(pets);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Handler for CTA: scroll & show grid
  const handleAdoptNow = () => {
    setShowGrid(true);
    // Scroll to grid
    setTimeout(() => {
      const gridElem = document.getElementById('paws-pet-list-section');
      gridElem && gridElem.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  // Handler for opening modal from PetCard/PetGrid
  const handlePetClick = (pet) => {
    setSelectedPet(pet);
    setModalOpen(true);
  };
  // Handler to close modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPet(null);
  };

  return (
    <div className="App">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <main>
        {/* Pet detail modal */}
        <PetModal open={modalOpen} pet={selectedPet} onClose={handleCloseModal} />
        {/* Show landing page until grid "mode" */}
        {!showGrid ? (
          <LandingPage onAdoptNow={handleAdoptNow} />
        ) : (
          <section id="paws-pet-list-section">
            <h2 style={{textAlign: "left", fontWeight: 800, marginTop: "1.5rem", marginBottom: ".66rem", color: "var(--text-primary)"}}>
              Adoptable Pets Near You
            </h2>
            {/* Filters and grid */}
            <Filters
              filters={filters}
              options={uniqueOptions}
              onFilterChange={setFilter}
              onClear={clearFilters}
              style={{marginBottom:"1rem"}}
            />
            <PetGrid pets={filteredPets} loading={loading} onPetClick={handlePetClick} />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
