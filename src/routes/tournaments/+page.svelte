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
	
	const itemsPerPage = 12;
	
	onMount(async () => {
		await loadInitialData();
	});
	
	async function loadInitialData() {
		loading = true;
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
			
			await loadTournaments();
		} catch (error) {
			console.error('Failed to load data:', error);
		} finally {
			loading = false;
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
		{#if loading}
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
				{#each Array(3) as _, sectionIndex}
					<div class="tournament-featured-card animate-pulse">
						<!-- Section Header -->
						<div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
							<div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
							<div class="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
						</div>
						<!-- 3 Tournament Items -->
						<div class="space-y-5">
							{#each Array(3) as _, itemIndex}
								<div class="{itemIndex < 2 ? 'border-b-2 border-gray-200 dark:border-gray-700 pb-5' : ''}">
									<!-- Title row -->
									<div class="flex items-start justify-between gap-3 mb-2">
										<div class="flex-1 min-w-0">
											<div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
											<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
										</div>
										<div class="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
									</div>
									<!-- Prize/stat row -->
									<div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
									<!-- Date/location row -->
									<div class="flex items-center gap-2">
										<div class="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
										<div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
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
			</div>
		{/if}
		
		<!-- All Tournaments Section -->
		<div class="mb-8">
			<div class="flex items-center justify-between mb-6">
				<h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">All Tournaments</h2>
			</div>
			
			<!-- Search and Filters -->
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
