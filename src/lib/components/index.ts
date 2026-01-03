/**
 * Components Index
 * Re-export all components for convenient imports
 */

// UI Components
export * from './ui';

// Tournament Components
export * from './tournaments';

// Player Components
export * from './players';

// Home Page Components
export * from './home';

// Individual Components
export { default as Navbar } from './Navbar.svelte';
export { default as Footer } from './Footer.svelte';
export { default as SearchBar } from './SearchBar.svelte';
export { default as ClaimButton } from './ClaimButton.svelte';
export { default as ResultsTicker } from './ResultsTicker.svelte';
export { default as SportsLeagueBar } from './SportsLeagueBar.svelte';
export { default as FilterChips } from './FilterChips.svelte';
export { default as CommandPalette } from './CommandPalette.svelte';
export { default as TournamentFeedCard } from './TournamentFeedCard.svelte';

// Keep EventCard for backwards compatibility (deprecated, use TournamentCard instead)
export { default as EventCard } from './EventCard.svelte';

