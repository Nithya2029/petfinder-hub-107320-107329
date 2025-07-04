# Supabase Client Integration – PawsConnect Frontend

## Overview

This project uses Supabase as a backend to fetch, store, and manage pet listings. This document describes how the Supabase client is configured for the React app, required environment variables, and example usage.

---

## Supabase Project Credentials

- **SUPABASE_URL:** https://ptitxkaianbzpqlzxhzg.supabase.co
- **SUPABASE_KEY:** (anon public)
  ```
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0aXR4a2FpYW5ienBxbHp4aHpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NTAwNTgsImV4cCI6MjA2NzIyNjA1OH0.MemFtYpwKqfVfMVvIiJy-ilR9-wItZXNVRQxPe9XL1Q
  ```

> Store these in a `.env` file at the project root for local/dev:
>
> ```
> REACT_APP_SUPABASE_URL=https://ptitxkaianbzpqlzxhzg.supabase.co
> REACT_APP_SUPABASE_KEY=eyJh...Pe9XL1Q
> ```

---

## Client Setup

Supabase client is initialized in  
`src/utils/supabaseClient.js`:

```js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || "<hardcoded fallback>";
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY || "<anon public key>";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
```

---

## Example: Fetching Pet Listings

To fetch data (e.g. from a "pets" table):

```js
import { fetchPets } from "../utils/supabaseClient";
useEffect(() => { fetchPets().then(setPets); }, []);
```

Sample function:

```js
export async function fetchPets() {
  const { data, error } = await supabase.from('pets').select('*');
  if (error) { ... }
  return data || [];
}
```

---

## Notes

- By default, use the environment variables for credentials.
- The Supabase table name for pet listings is assumed to be `pets` (can be changed as needed).
- You may extend the utility as needed (insert/update/list/fetch by ID).

---

## Security

- Only safe public keys (anon) are to be exposed in the frontend; **do not include service_role keys**.
- Restrict RLS/auth rules on your Supabase project as appropriate for production!

---

## See Also

- [Supabase JavaScript Client Docs](https://supabase.com/docs/guides/reference/javascript)
