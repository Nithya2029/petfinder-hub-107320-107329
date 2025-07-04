import { useMemo, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * usePetFilters
 * Custom React hook for managing and applying filters for pet listings.
 * Handles breed, age, and location filters and returns filtered pets and filter control functions.
 *
 * @param {Array} allPets - The full, unfiltered list of pets
 * @param {Object} initialFilters - Optionally provide initial filter values
 * @returns {{
 *   filters: { breed: string, age: string, location: string },
 *   setFilter: (name: string, value: string) => void,
 *   clearFilters: () => void,
 *   filteredPets: Array,
 *   uniqueOptions: { breeds: string[], ages: string[], locations: string[] }
 * }}
 */
export function usePetFilters(allPets, initialFilters = {}) {
  // Base filter state
  const [filters, setFilters] = useState({
    breed: initialFilters.breed || "",
    age: initialFilters.age || "",
    location: initialFilters.location || ""
  });

  // Efficiently extract unique filter options from the full data set
  const uniqueOptions = useMemo(() => {
    const breeds = new Set();
    const ages = new Set();
    const locations = new Set();
    (allPets || []).forEach(p => {
      if (p.breed) breeds.add(p.breed);
      if (p.age) ages.add(p.age);
      if (p.location) locations.add(p.location);
    });
    // Sort breeds A-Z, locations A-Z, ages in logical order
    const orderedAges = Array.from(ages).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    return {
      breeds: Array.from(breeds).sort(),
      ages: orderedAges,
      locations: Array.from(locations).sort()
    };
  }, [allPets]);

  // Handler for updating a filter
  // PUBLIC_INTERFACE
  const setFilter = (filterName, value) => {
    setFilters(f => ({ ...f, [filterName]: value }));
  };

  // PUBLIC_INTERFACE
  const clearFilters = () => {
    setFilters({ breed: "", age: "", location: "" });
  };

  // Filtering logic: apply all active filters to the data
  // - if a filter is blank, does not filter by that field (i.e., "All")
  const filteredPets = useMemo(() => {
    return (allPets || []).filter(pet => {
      // breed
      if (filters.breed && pet.breed !== filters.breed) return false;
      // age (string match for demo, could be enhanced for age range)
      if (filters.age && pet.age !== filters.age) return false;
      // location
      if (filters.location && pet.location !== filters.location) return false;
      return true;
    });
  }, [allPets, filters]);

  return {
    filters,
    setFilter,
    clearFilters,
    filteredPets,
    uniqueOptions
  };
}

export default usePetFilters;
