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

