# Data Fetching Rules
description: Rules for data fetching patterns using Supabase
pattern: src/**/*.{js,jsx,ts,tsx}

## Server-Side Fetching Pattern

```typescript
// Good - Server Component
const { data, error } = await supabase
  .from("Table")
  .select("*, related_table(*)")
  .eq("column", value)
  .single();

if (error) {
  // Handle error appropriately
  console.error("Database error:", error);
  return <ErrorComponent message="Failed to load data" />;
}

if (!data) {
  return <NotFoundComponent />;
}
```

## Client-Side Fetching Pattern

```typescript
// Good - Client Component with proper loading and error states
const [data, setData] = useState(null);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("Table")
        .select("*");
      
      if (error) throw error;
      setData(data);
    } catch (err) {
      setError(err);
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, []);
```

## Error Handling Requirements

1. Always handle potential errors:
   - Database errors
   - Network failures
   - Validation errors
   - Authentication errors

2. Implement proper loading states:
   - Skeleton loaders
   - Loading spinners
   - Placeholder content

3. Handle edge cases:
   - Empty states
   - Not found states
   - Permission denied states

## Caching Strategy

1. Server Components:
   - Use proper cache headers
   - Implement revalidation
   - Handle stale data

2. Client Components:
   - Implement SWR patterns
   - Handle cache invalidation
   - Manage optimistic updates

@file ../docs/cursor/rules.md 