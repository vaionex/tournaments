# Authentication Layout Rules
description: Rules for layout files that handle authentication and protected routes
pattern: src/app/**/layout.{js,jsx,ts,tsx}

## Authentication Layout Pattern

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({ children }) {
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

  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user || error) {
    redirect("/login");
  }

  const { data: userData, error: userError } = await supabase
    .from("User")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!userData || userError) {
    redirect("/login");
  }

  // Role-based access control
  if (userData.role === "admin" && !pathname.startsWith("/admin")) {
    redirect("/admin");
  }

  return children;
}
```

## Role-Based Access Requirements

- Check user role before rendering protected routes
- Implement proper redirects for unauthorized access
- Handle session expiration gracefully
- Add proper error boundaries for auth failures

## Error Handling

- Always check for null user data
- Handle database query errors
- Implement proper error messages
- Add fallback UI components

@file ../docs/cursor/rules.md 