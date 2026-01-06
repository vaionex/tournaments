<script lang="ts">
	import { onMount } from 'svelte';
	import type { Tournament } from '$lib/types';
	import { 
		getTournaments, 
		getTopTournaments, 
		getMostPopularTournaments, 
		getTrendingTournaments,
		getUniqueGames,
		getUniqueLocations
	} from '$lib/services/tournaments.service';
	import { TournamentFeaturedSection, TournamentFilters, TournamentGrid } from '$lib/components/tournaments';
	import { LoadingState } from '$lib/components/ui';
	import { PageSEO } from '$lib/components/seo';
	
	import { cache } from '$lib/services/cache.service';
	
	let topTournaments: Tournament[] = [];
	let mostPopular: Tournament[] = [];
	let trending: Tournament[] = [];
	let tournaments: Tournament[] = [];
	let loading = true;
	let currentPage = 1;
	let totalPages = 1;
	let totalCount = 0;
	let searchQuery = '';
	let gameFilter = '';
	let locationFilter = '';
	let games: string[] = [];
	let locations: string[] = [];
	let hasCachedData = false;
	
	const itemsPerPage = 12;
	
	onMount(async () => {
		await loadInitialData();
	});
	
	async function loadInitialData(useCache: boolean = true) {
		// Check cache first
		if (useCache) {
			const cacheKey = 'tournaments-initial';
			const cached = cache.get<{
				topTournaments: Tournament[];
				mostPopular: Tournament[];
				trending: Tournament[];
				games: string[];
				locations: string[];
			}>(cacheKey);
			
			if (cached) {
				// Use cached data immediately (no skeleton)
				topTournaments = cached.topTournaments;
				mostPopular = cached.mostPopular;
				trending = cached.trending;
				games = cached.games;
				locations = cached.locations;
				hasCachedData = true;
				loading = false;
				
				// Load tournaments list
				await loadTournaments();
				
				// Fetch fresh data in background
				loadInitialData(false);
				return;
			}
		}
		
		if (!hasCachedData) {
			loading = true;
		}
		
		try {
			const [top, popular, trend, gamesData, locationsData] = await Promise.all([
				getTopTournaments(3),
				getMostPopularTournaments(3),
				getTrendingTournaments(3),
				getUniqueGames(),
				getUniqueLocations()
			]);
			
			topTournaments = top;
			mostPopular = popular;
			trending = trend;
			games = gamesData;
			locations = locationsData;
			
			// Cache the results
			const cacheKey = 'tournaments-initial';
			cache.set(cacheKey, {
				topTournaments: top,
				mostPopular: popular,
				trending: trend,
				games: gamesData,
				locations: locationsData
			}, 5 * 60 * 1000); // 5 minutes TTL
			
			await loadTournaments();
		} catch (error) {
			console.error('Failed to load data:', error);
		} finally {
			loading = false;
			hasCachedData = false;
		}
	}
	
	async function loadTournaments() {
		const result = await getTournaments(
			{ search: searchQuery, game: gameFilter, location: locationFilter },
			currentPage,
			itemsPerPage
		);
		
		tournaments = result.data;
		totalPages = result.pagination.totalPages;
		totalCount = result.pagination.totalItems;
	}
	
	async function handleSearch(event: CustomEvent<string>) {
		searchQuery = event.detail;
		currentPage = 1;
		await loadTournaments();
	}
	
	async function handleGameChange(event: CustomEvent<string>) {
		gameFilter = event.detail;
		currentPage = 1;
		await loadTournaments();
	}
	
	async function handleLocationChange(event: CustomEvent<string>) {
		locationFilter = event.detail;
		currentPage = 1;
		await loadTournaments();
	}
	
	async function handlePageChange(event: CustomEvent<number>) {
		currentPage = event.detail;
		await loadTournaments();
	}
</script>

<PageSEO
	title="Tournament Directory"
	description="Browse and discover upcoming sports tournaments across NFL, NBA, MLB, NHL, Soccer, Tennis, Golf, Esports, and more. Find tournament dates, locations, prize pools, and registration information."
	image="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&h=630&fit=crop"
/>

<div class="bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 min-h-screen">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl">
		<!-- Header -->
		<div class="mb-10 sm:mb-12">
			<h1 class="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
				Tournament Directory
			</h1>
			<p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
				Discover top tournaments, popular events, and trending competitions
			</p>
		</div>
		
		<!-- Featured Sections - 3 Columns -->
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
			{#if loading}
				{#each ['Top Tournaments', 'Most Popular', 'Trending'] as title, sectionIndex}
					<div class="tournament-featured-card">
						<!-- Section Header - static, always shown -->
						<div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
							<h2 class="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
							<div class="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center shadow-md">
								<span class="text-xl">{sectionIndex === 0 ? '🏆' : sectionIndex === 1 ? '⭐' : '🔥'}</span>
							</div>
						</div>
						<!-- 3 Tournament Items Skeleton -->
						<div class="space-y-5">
							{#each Array(3) as _, itemIndex}
								<div class="tournament-item {itemIndex < 2 ? 'border-b-2 border-gray-200 dark:border-gray-700 pb-5' : ''} animate-pulse">
									<!-- Title row - matches TournamentListItem structure exactly (gap-3 handles spacing, no mb) -->
									<div class="flex items-start justify-between gap-3">
										<div class="flex-1 min-w-0">
											<div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-1"></div>
											<div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
										</div>
										<div class="h-[18px] w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
									</div>
									<!-- Prize/stat row (gap-3 handles spacing, no mb) -->
									<div class="flex items-center gap-2">
										<div class="h-7 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
									</div>
									<!-- Date/location row - matches exact structure with correct icon color -->
									<div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
										<svg class="w-4 h-4 text-gray-500 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
										</svg>
										<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			{:else}
				<TournamentFeaturedSection 
					title="Top Tournaments"
					tournaments={topTournaments}
					icon="🏆"
					iconGradient="from-yellow-400 to-yellow-600"
					variant="top"
				/>
				
				<TournamentFeaturedSection 
					title="Most Popular"
					tournaments={mostPopular}
					icon="⭐"
					iconGradient="from-blue-400 to-blue-600"
					variant="popular"
				/>
				
				<TournamentFeaturedSection 
					title="Trending"
					tournaments={trending}
					icon="🔥"
					iconGradient="from-orange-400 to-orange-600"
					variant="trending"
				/>
			{/if}
		</div>
		
		<!-- All Tournaments Section -->
		<div class="mb-8">
			<!-- Header - static, always shown -->
			<div class="flex items-center justify-between mb-6">
				<h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">All Tournaments</h2>
			</div>
			
			<!-- Search and Filters - static, always shown -->
			{#if loading}
				<div class="mb-8 space-y-5">
					<!-- SearchBar skeleton -->
					<div class="w-full">
						<div class="flex flex-col md:flex-row gap-4">
							<div class="flex-1 relative">
								<div class="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
							</div>
							<div class="h-12 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
							<div class="h-12 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
							<div class="h-12 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
						</div>
					</div>
					
					<!-- Filter selects skeleton -->
					<div class="flex flex-wrap gap-3">
						<div class="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
						<div class="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
					</div>
					
					<!-- Count skeleton -->
					<div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
						<div class="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
					</div>
				</div>
			{:else}
				<TournamentFilters
					{searchQuery}
					{gameFilter}
					{locationFilter}
					{games}
					{locations}
					{totalCount}
					on:search={handleSearch}
					on:gameChange={handleGameChange}
					on:locationChange={handleLocationChange}
				/>
			{/if}
		</div>
	
		<!-- Tournament Grid -->
		<TournamentGrid 
			{tournaments}
			{loading}
			{currentPage}
			{totalPages}
			emptyTitle="No tournaments found matching your criteria."
			emptyDescription="Try adjusting your filters or search terms."
			on:pageChange={handlePageChange}
		/>
	</div>
</div>
