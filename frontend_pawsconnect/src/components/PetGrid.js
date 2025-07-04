import React from "react";
import PropTypes from "prop-types";
import PetCard from "./PetCard";
import SkeletonLoader from "./SkeletonLoader";
import "../App.css";

/**
 * PUBLIC_INTERFACE
 * PetGrid Component
 * Displays a responsive grid of PetCards. Shows SkeletonLoader if loading.
 */
function PetGrid({ pets, loading, onPetClick }) {
  if (loading) {
    return <SkeletonLoader />;
  }

  if (!pets || pets.length === 0) {
    return (
      <div className="pet-grid-empty">
        <p>No pets found. Try adjusting your search or filters!</p>
      </div>
    );
  }

  // Animate entrance: staggered with index-based delay
  return (
    <div className="pet-grid" style={{ width: "100%" }}>
      {pets.map((pet, i) => (
        <PetCard
          id={pet.id}
          key={pet.id || i}
          name={pet.name}
          breed={pet.breed}
          image={pet.image}
          age={pet.age}
          location={pet.location}
          status={pet.status}
          tags={pet.tags}
          onClick={() => onPetClick?.(pet)}
          className="entrance"
          style={{
            // Stagger entrance animation (max 0.65s)
            animationDelay: `${Math.min(i * 0.07, 0.65)}s`,
            ...((pet && pet.style) || {}),
          }}
        />
      ))}
    </div>
  );
}

PetGrid.propTypes = {
  pets: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    breed: PropTypes.string,
    image: PropTypes.string,
    age: PropTypes.string,
    location: PropTypes.string,
    status: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })),
  loading: PropTypes.bool,
  onPetClick: PropTypes.func
};

export default PetGrid;
