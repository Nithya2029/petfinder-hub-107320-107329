//
// Supabase client initialization for PawsConnect frontend
// Usage: Import this client to interact with Supabase backend for pet data
//
// You must define SUPABASE_URL and SUPABASE_KEY in a .env file or inject via environment vars.
//
import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, fallback to hardcoded for initial demo/test
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || "https://ptitxkaianbzpqlzxhzg.supabase.co";
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0aXR4a2FpYW5ienBxbHp4aHpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NTAwNTgsImV4cCI6MjA2NzIyNjA1OH0.MemFtYpwKqfVfMVvIiJy-ilR9-wItZXNVRQxPe9XL1Q";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Example: Fetch all pet listings from the "pets" table (edit table name/schema as needed)
 * 
 * Usage in a component:
 *   import { fetchPets } from "./utils/supabaseClient";
 *   useEffect(() => { fetchPets().then(data => setPets(data)); }, []);
 */
export async function fetchPets() {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .order('id', { ascending: true });
  if (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching pets from Supabase:", error);
    return [];
  }
  return data || [];
}
