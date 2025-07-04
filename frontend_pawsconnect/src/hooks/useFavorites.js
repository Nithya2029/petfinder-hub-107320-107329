import { useCallback, useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * useFavorites
 * Custom React hook to manage user's favorite pets, with localStorage persistence.
 * Provides utilities for checking, toggling, adding, and removing favorites by pet ID.
 * The favorites are globally synced across the app.
 *
 * @returns {{
 *   favorites: number[] | string[],
 *   isFavorite: (petId: number|string) => boolean,
 *   toggleFavorite: (petId: number|string) => void,
 *   addFavorite: (petId: number|string) => void,
 *   removeFavorite: (petId: number|string) => void,
 * }}
 */
function useFavorites() {
  // Persistent favorites key
  const LOCALSTORAGE_KEY = "pawsconnect-favorites";
  const [favorites, setFavorites] = useState(() => {
    try {
      const data = localStorage.getItem(LOCALSTORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  // Update localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn("Failed to write to localStorage for favorites", e);
    }
  }, [favorites]);

  // Helper: check if favorite
  // PUBLIC_INTERFACE
  const isFavorite = useCallback(
    (petId) => favorites.includes(petId),
    [favorites]
  );

  // PUBLIC_INTERFACE
  const addFavorite = useCallback(
    (petId) => {
      setFavorites((prev) => {
        if (!prev.includes(petId)) return [...prev, petId];
        return prev;
      });
    },
    [setFavorites]
  );

  // PUBLIC_INTERFACE
  const removeFavorite = useCallback(
    (petId) => {
      setFavorites((prev) => prev.filter((id) => id !== petId));
    },
    [setFavorites]
  );

  // PUBLIC_INTERFACE
  const toggleFavorite = useCallback(
    (petId) => {
      if (isFavorite(petId)) removeFavorite(petId);
      else addFavorite(petId);
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  return { favorites, isFavorite, toggleFavorite, addFavorite, removeFavorite };
}

export default useFavorites;
