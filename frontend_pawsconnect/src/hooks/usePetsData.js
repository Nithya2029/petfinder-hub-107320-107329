import { useCallback, useEffect, useRef, useState } from "react";
import { fetchPets } from "../utils/supabaseClient";

/**
 * PUBLIC_INTERFACE
 * usePetsData
 * Fetches pet data from Supabase, provides caching, error/loading state, and refetch capabilities.
 * Handles client-side in-memory cache, suitable for app-wide usage.
 *
 * @returns {{
 *   pets: Array, 
 *   loading: boolean,
 *   error: string | null,
 *   refetch: () => void,
 * }}
 */
function usePetsData() {
  const cacheRef = useRef(null);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAndCachePets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data = null;
      // If cached, return immediately for perf, but still refetch in the background
      if (cacheRef.current) {
        data = cacheRef.current;
        setPets(data);
      }
      // Always fetch on first load or explicit refetch
      const fresh = await fetchPets();
      cacheRef.current = fresh;
      setPets(Array.isArray(fresh) ? fresh : []);
    } catch (err) {
      setError("Failed to load pets.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load on mount
  useEffect(() => {
    fetchAndCachePets();
    // eslint-disable-next-line
  }, []);

  // PUBLIC_INTERFACE
  const refetch = useCallback(() => {
    // Clears cache and forces a Supabase query
    cacheRef.current = null;
    fetchAndCachePets();
  }, [fetchAndCachePets]);

  return {
    pets,
    loading,
    error,
    refetch,
  };
}

export default usePetsData;
