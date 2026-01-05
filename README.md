# Tournaments.com

The LinkedIn of Competitive Gaming - A unified platform for discovering tournaments and building your competitive resume.

## Features

- **Discovery Hub**: Search and filter tournaments across all platforms
- **Player Resume**: Claim tournament results and build your competitive profile
- **Unified Directory**: Aggregated tournament data from multiple platforms
- **One-Click Join**: Direct links to tournament hosts

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

## Project Structure

- `/src/routes` - Page routes (homepage, tournaments, profiles, dashboard)
- `/src/lib/components` - Reusable components (EventCard, SearchBar, etc.)
- `/src/app.css` - Global styles with Tailwind CSS

## Pages

- `/` - Homepage with search and trending tournaments
- `/tournaments` - Tournament directory with filters
- `/tournaments/[id]` - Tournament detail page with results
- `/profile/[username]` - Public player profile/resume
- `/dashboard` - User dashboard for managing claims and linked accounts

## Tech Stack

- SvelteKit - Framework
- Tailwind CSS - Styling
- TypeScript - Type safety
- date-fns - Date formatting
- Supabase - Database & Authentication

## Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)

2. Copy your project credentials from **Settings > API**:
   - Project URL
   - anon/public key

3. Create a `.env` file in the project root:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. Run the SQL migration to create tables:
   - Open the **SQL Editor** in your Supabase dashboard
   - Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
   - Click **Run**

5. (Optional) Seed the database with sample data:
   - Run `supabase/seed.sql` in the SQL Editor

