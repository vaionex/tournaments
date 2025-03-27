# Client Component Rules
description: Rules for client-side components that require interactivity or browser APIs
pattern: src/app/**/*client*.{js,jsx,ts,tsx}

## Client Component Requirements

1. Mark with "use client" directive at the top of the file
2. Use client components only when needed for:
   - Interactive features (onClick, onChange)
   - Browser APIs
   - React hooks
   - Client-side state management

## State Management Pattern

```typescript
"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function ClientComponent() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );
        const { data, error } = await supabase.from("table").select("*");
        if (error) throw error;
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return <div>{/* Component JSX */}</div>;
}
```

## Loading States

- Always implement loading indicators for async operations
- Use Suspense boundaries where appropriate
- Handle error states with proper UI feedback

## Event Handling

- Use proper TypeScript event types
- Implement debouncing for frequent events
- Handle cleanup in useEffect hooks

@file ../docs/cursor/rules.md 