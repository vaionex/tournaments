# Server Component Rules
description: Rules for server components in the Next.js application
pattern: src/app/**/*.{js,jsx,ts,tsx}
exclude: src/app/**/*client*

## Server Component Guidelines

1. Default to Server Components unless client-side functionality is required
2. Implement proper error boundaries and fallback states
3. Use Supabase server client for data fetching
4. Handle authentication in layout files

## Authentication Requirements

- Always check user existence before accessing protected routes
- Implement role-based access control (admin, sponsor)
- Add proper null checks for user data
- Handle authentication errors gracefully

## Data Fetching Pattern

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export default async function ServerComponent() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

  // Always handle potential errors
  const { data, error } = await supabase.from("table").select("*");
  if (error) {
    // Handle error appropriately
  }

  return <div>{/* Component JSX */}</div>;
}
```

@file ../docs/cursor/rules.md 