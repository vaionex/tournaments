<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { Player } from '$lib/types';
	import { 
		getPlayers, 
		getStatLeaders,
		getUniquePlayerGames,
		getUniqueCountries,
		getPlayerNews,
		getTotalPlayerCount,
		getTotalPrizePool
	} from '$lib/services/players.service';
	import { PlayerGrid } from '$lib/components/players';
	import { LoadingState, VerifiedBadge, CountryFlag } from '$lib/components/ui';
	import { PageSEO } from '$lib/components/seo';
	
	// Data
	let winsLeaders: Player[] = [];
	let earningsLeaders: Player[] = [];
	let winrateLeaders: Player[] = [];
	let trendingLeaders: Player[] = [];
	let allPlayers: Player[] = [];
	let playerNews: Array<{id: string, title: string, excerpt: string, image: string, date: string, player?: string}> = [];
	
	import { cache } from '$lib/services/cache.service';
	
	// UI State
	let loading = true;
	let currentPage = 1;
	let totalPages = 1;
	let totalCount = 0;
	let searchQuery = '';
	let gameFilter = '';
	let countryFilter = '';
	let sortBy = 'rank';
	let selectedLetter = '';
	let viewMode: 'grid' | 'table' = 'table';
	let games: string[] = [];
	let countries: string[] = [];
	let totalPlayers = 0;
	let totalPrizePool = 0;
	let hasCachedData = false;
	
	// Tabs
	let activeTab: 'all' | 'leaderboards' = 'all';
	
	const itemsPerPage = 24;
	const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	
	// Image error tracking
	let imageErrors: Record<string, boolean> = {};
	
	function handleImageError(playerId: string) {
		imageErrors[playerId] = true;
		imageErrors = imageErrors;
	}
	
	onMount(async () => {
		await loadInitialData();
	});
	
	async function loadInitialData(useCache: boolean = true) {
		// Check cache first
		if (useCache) {
			const cacheKey = 'players-initial';
			const cached = cache.get<{
				winsLeaders: any[];
				earningsLeaders: any[];
				winrateLeaders: any[];
				trendingLeaders: any[];
				games: string[];
				countries: string[];
				news: any[];
				playerCount: number;
				prizePool: number;
			}>(cacheKey);
			
			if (cached) {
				// Use cached data immediately (no skeleton)
				winsLeaders = cached.winsLeaders;
				earningsLeaders = cached.earningsLeaders;
				winrateLeaders = cached.winrateLeaders;
				trendingLeaders = cached.trendingLeaders;
				games = cached.games;
				countries = cached.countries;
				playerNews = cached.news;
				totalPlayers = cached.playerCount;
				totalPrizePool = cached.prizePool;
				hasCachedData = true;
				loading = false;
				
				// Load players list
				await loadPlayers();
				
				// Fetch fresh data in background
				loadInitialData(false);
				return;
			}
		}
		
		if (!hasCachedData) {
			loading = true;
		}
		
		try {
			const [wins, earnings, winrate, trending, gamesData, countriesData, news, playerCount, prizePool] = await Promise.all([
				getStatLeaders('wins', 5),
				getStatLeaders('winnings', 5),
				getStatLeaders('winrate', 5),
				getStatLeaders('trending', 5),
				getUniquePlayerGames(),
				getUniqueCountries(),
				getPlayerNews(5),
				getTotalPlayerCount(),
				getTotalPrizePool()
			]);
			
			winsLeaders = wins;
			earningsLeaders = earnings;
			winrateLeaders = winrate;
			trendingLeaders = trending;
			games = gamesData;
			countries = countriesData;
			playerNews = news;
			totalPlayers = playerCount;
			totalPrizePool = prizePool;
			
			// Cache the results
			const cacheKey = 'players-initial';
			cache.set(cacheKey, {
				winsLeaders: wins,
				earningsLeaders: earnings,
				winrateLeaders: winrate,
				trendingLeaders: trending,
				games: gamesData,
				countries: countriesData,
				news: news,
				playerCount: playerCount,
				prizePool: prizePool
			}, 5 * 60 * 1000); // 5 minutes TTL
			
			await loadPlayers();
		} catch (error) {
			console.error('Failed to load data:', error);
		} finally {
			loading = false;
			hasCachedData = false;
		}
	}
	
	async function loadPlayers() {
		const result = await getPlayers(
			{ 
				search: searchQuery, 
				game: gameFilter, 
				country: countryFilter,
				letter: selectedLetter,
				sortBy: sortBy as any 
			},
			currentPage,
			itemsPerPage
		);
		
		allPlayers = result.data;
		totalPages = result.pagination.totalPages;
		totalCount = result.pagination.totalItems;
	}
	
	async function handleSearch() {
		currentPage = 1;
		await loadPlayers();
	}
	
	async function handleFilterChange() {
		currentPage = 1;
		await loadPlayers();
	}
	
	async function handleLetterClick(letter: string) {
		selectedLetter = selectedLetter === letter ? '' : letter;
		currentPage = 1;
		await loadPlayers();
	}
	
	async function handlePageChange(event: CustomEvent<number>) {
		currentPage = event.detail;
		await loadPlayers();
	}
	
	function formatCurrency(amount: number): string {
		if (amount >= 1000000000) return `$${(amount / 1000000000).toFixed(1)}B`;
		if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
		if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
		return `$${amount}`;
	}
	
</script>

<PageSEO
	title="Player Rankings & Stats"
	description="Browse player rankings, stats, and profiles across all sports. Find NBA, NFL, MLB, NHL, Soccer, Tennis, Golf, and Esports players with detailed statistics, career history, and latest news."
	image="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=630&fit=crop"
/>

<div class="bg-gray-100 dark:bg-gray-900 min-h-screen">
	<div class="container mx-auto px-4 py-6 max-w-7xl">
		<!-- Header -->
		<div class="mb-6">
			<h1 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">Player Stats & Rankings</h1>
			<p class="text-gray-600 dark:text-gray-400">Track top performers across all sports and esports</p>
		</div>
		
		<!-- Tab Navigation -->
		<div class="flex items-center gap-1 mb-6 border-b-2 border-gray-200 dark:border-gray-700">
			<button
				on:click={() => activeTab = 'leaderboards'}
				class="px-6 py-3 font-bold text-sm uppercase tracking-wide transition-colors relative {activeTab === 'leaderboards' ? 'text-red-600 dark:text-red-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}"
			>
				Leaderboards
				{#if activeTab === 'leaderboards'}
					<div class="absolute bottom-0 left-0 right-0 h-1 bg-red-600"></div>
				{/if}
			</button>
			<button
				on:click={() => activeTab = 'all'}
				class="px-6 py-3 font-bold text-sm uppercase tracking-wide transition-colors relative {activeTab === 'all' ? 'text-red-600 dark:text-red-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}"
			>
				All Players
				{#if activeTab === 'all'}
					<div class="absolute bottom-0 left-0 right-0 h-1 bg-red-600"></div>
				{/if}
			</button>
		</div>
		
		<div class="flex flex-col lg:flex-row gap-6">
			<!-- Main Content -->
			<div class="flex-1">
				{#if activeTab === 'leaderboards'}
					<!-- Stat Leaders Grid (ESPN Style) -->
					{#if loading}
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							{#each Array(4) as _}
								<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden animate-pulse">
									<!-- Dark header matching actual -->
									<div class="bg-gray-900 dark:bg-gray-950 px-4 py-3">
										<div class="h-4 bg-gray-700 rounded w-32"></div>
									</div>
									<!-- 5 Player rows matching actual structure -->
									<div class="divide-y divide-gray-100 dark:divide-gray-700">
										{#each Array(5) as __, i}
											<div class="flex items-center gap-3 px-4 py-3">
												<div class="w-5 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
												<div class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
												<div class="flex-1 min-w-0">
													<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-1.5"></div>
													<div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
												</div>
												<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
											</div>
										{/each}
									</div>
									<!-- Footer link placeholder -->
									<div class="border-t border-gray-100 dark:border-gray-700 px-4 py-3">
										<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto"></div>
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							<!-- Tournament Wins Leaders -->
							<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
								<div class="bg-gray-900 dark:bg-gray-950 px-4 py-3">
									<h3 class="font-bold text-white text-sm uppercase tracking-wide">Tournament Wins</h3>
								</div>
								<div class="divide-y divide-gray-100 dark:divide-gray-700">
									{#each winsLeaders as player, i (player.id)}
										<button
											on:click={() => goto(`/profile/${player.username}`)}
											class="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
										>
											<span class="w-5 text-sm font-bold text-gray-400">{i + 1}</span>
											{#if player.image && !imageErrors[player.id]}
												<img 
													src={player.image} 
													alt={player.displayName}
													on:error={() => handleImageError(player.id)}
													class="w-8 h-8 rounded-full object-cover"
												/>
											{:else}
												<div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
													{player.displayName.charAt(0)}
												</div>
											{/if}
											<div class="flex-1 min-w-0">
												<div class="font-semibold text-gray-900 dark:text-white text-sm truncate flex items-center gap-1.5">
													{player.displayName}
													{#if player.verified}<VerifiedBadge size="xs" />{/if}
												</div>
												<div class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
													<CountryFlag country={player.country} size="sm" />
													<span class="truncate">{player.team || player.game}</span>
												</div>
											</div>
											<span class="font-bold text-gray-900 dark:text-white">{player.wins}</span>
										</button>
									{/each}
								</div>
								<a href="/players?sort=wins" class="block text-center py-3 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
									Complete Leaders →
								</a>
							</div>
							
							<!-- Earnings Leaders -->
							<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
								<div class="bg-gray-900 dark:bg-gray-950 px-4 py-3">
									<h3 class="font-bold text-white text-sm uppercase tracking-wide">Career Earnings</h3>
								</div>
								<div class="divide-y divide-gray-100 dark:divide-gray-700">
									{#each earningsLeaders as player, i (player.id)}
										<button
											on:click={() => goto(`/profile/${player.username}`)}
											class="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
										>
											<span class="w-5 text-sm font-bold text-gray-400">{i + 1}</span>
											{#if player.image && !imageErrors[player.id]}
												<img 
													src={player.image} 
													alt={player.displayName}
													on:error={() => handleImageError(player.id)}
													class="w-8 h-8 rounded-full object-cover"
												/>
											{:else}
												<div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
													{player.displayName.charAt(0)}
												</div>
											{/if}
											<div class="flex-1 min-w-0">
												<div class="font-semibold text-gray-900 dark:text-white text-sm truncate flex items-center gap-1.5">
													{player.displayName}
													{#if player.verified}<VerifiedBadge size="xs" />{/if}
												</div>
												<div class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
													<CountryFlag country={player.country} size="sm" />
													<span class="truncate">{player.team || player.game}</span>
												</div>
											</div>
											<span class="font-bold text-green-600 dark:text-green-400">{formatCurrency(player.totalWinnings)}</span>
										</button>
									{/each}
								</div>
								<a href="/players?sort=winnings" class="block text-center py-3 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
									Complete Leaders →
								</a>
							</div>
							
							<!-- Win Rate Leaders -->
							<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
								<div class="bg-gray-900 dark:bg-gray-950 px-4 py-3">
									<h3 class="font-bold text-white text-sm uppercase tracking-wide">Win Rate</h3>
								</div>
								<div class="divide-y divide-gray-100 dark:divide-gray-700">
									{#each winrateLeaders as player, i (player.id)}
										<button
											on:click={() => goto(`/profile/${player.username}`)}
											class="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
										>
											<span class="w-5 text-sm font-bold text-gray-400">{i + 1}</span>
											{#if player.image && !imageErrors[player.id]}
												<img 
													src={player.image} 
													alt={player.displayName}
													on:error={() => handleImageError(player.id)}
													class="w-8 h-8 rounded-full object-cover"
												/>
											{:else}
												<div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
													{player.displayName.charAt(0)}
												</div>
											{/if}
											<div class="flex-1 min-w-0">
												<div class="font-semibold text-gray-900 dark:text-white text-sm truncate flex items-center gap-1.5">
													{player.displayName}
													{#if player.verified}<VerifiedBadge size="xs" />{/if}
												</div>
												<div class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
													<CountryFlag country={player.country} size="sm" />
													<span class="truncate">{player.team || player.game}</span>
												</div>
											</div>
											<span class="font-bold text-blue-600 dark:text-blue-400">{player.winRate}%</span>
										</button>
									{/each}
								</div>
								<a href="/players?sort=winrate" class="block text-center py-3 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
									Complete Leaders →
								</a>
							</div>
							
							<!-- Trending / Hot Streak -->
							<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
								<div class="bg-gray-900 dark:bg-gray-950 px-4 py-3">
									<h3 class="font-bold text-white text-sm uppercase tracking-wide">🔥 Hot Streak</h3>
								</div>
								<div class="divide-y divide-gray-100 dark:divide-gray-700">
									{#each trendingLeaders as player, i (player.id)}
										<button
											on:click={() => goto(`/profile/${player.username}`)}
											class="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
										>
											<span class="w-5 text-sm font-bold text-gray-400">{i + 1}</span>
											{#if player.image && !imageErrors[player.id]}
												<img 
													src={player.image} 
													alt={player.displayName}
													on:error={() => handleImageError(player.id)}
													class="w-8 h-8 rounded-full object-cover"
												/>
											{:else}
												<div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
													{player.displayName.charAt(0)}
												</div>
											{/if}
											<div class="flex-1 min-w-0">
												<div class="font-semibold text-gray-900 dark:text-white text-sm truncate flex items-center gap-1.5">
													{player.displayName}
													{#if player.verified}<VerifiedBadge size="xs" />{/if}
												</div>
												<div class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
													<CountryFlag country={player.country} size="sm" />
													<span class="truncate">{player.team || player.game}</span>
												</div>
											</div>
											<span class="font-bold text-orange-500">+{player.recentWins} wins</span>
										</button>
									{/each}
								</div>
								<a href="/players?sort=trending" class="block text-center py-3 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
									Complete Leaders →
								</a>
							</div>
						</div>
					{/if}
				{:else}
					<!-- All Players Tab -->
					<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
						<!-- Search & Filters Bar -->
						<div class="p-4 border-b border-gray-200 dark:border-gray-700">
							<div class="flex flex-col lg:flex-row gap-4">
								<!-- Search -->
								<div class="flex-1 relative">
									<input
										type="text"
										bind:value={searchQuery}
										on:input={handleSearch}
										placeholder="Search players, teams..."
										class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
									<svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
									</svg>
								</div>
								
								<!-- Filters -->
								<div class="flex flex-wrap gap-2">
									<select
										bind:value={gameFilter}
										on:change={handleFilterChange}
										class="px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium"
									>
										{#each games as game}
											<option value={game === 'All Games' ? '' : game}>{game}</option>
										{/each}
									</select>
									
									<select
										bind:value={countryFilter}
										on:change={handleFilterChange}
										class="px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium"
									>
										{#each countries as country}
											<option value={country === 'All Countries' ? '' : country}>
												{country}
											</option>
										{/each}
									</select>
									
									<select
										bind:value={sortBy}
										on:change={handleFilterChange}
										class="px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium"
									>
										<option value="rank">Sort by Rank</option>
										<option value="wins">Sort by Wins</option>
										<option value="winnings">Sort by Earnings</option>
										<option value="winrate">Sort by Win Rate</option>
										<option value="name">Sort by Name</option>
									</select>
									
									<!-- View Toggle -->
									<div class="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
										<button
											on:click={() => viewMode = 'grid'}
											class="px-3 py-2 {viewMode === 'grid' ? 'bg-gray-900 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400'}"
											title="Grid View"
										>
											<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
												<path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
											</svg>
										</button>
										<button
											on:click={() => viewMode = 'table'}
											class="px-3 py-2 {viewMode === 'table' ? 'bg-gray-900 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400'}"
											title="Table View"
										>
											<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
												<path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
											</svg>
										</button>
									</div>
								</div>
							</div>
							
							<!-- Alphabetical Quick Nav -->
							<div class="flex flex-wrap gap-1 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
								<button
									on:click={() => handleLetterClick('')}
									class="w-8 h-8 text-xs font-bold rounded transition-colors {selectedLetter === '' ? 'bg-red-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'}"
								>
									ALL
								</button>
								{#each ALPHABET as letter}
									<button
										on:click={() => handleLetterClick(letter)}
										class="w-8 h-8 text-xs font-bold rounded transition-colors {selectedLetter === letter ? 'bg-red-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'}"
									>
										{letter}
									</button>
								{/each}
							</div>
							
							<div class="mt-3 text-sm text-gray-500 dark:text-gray-400">
								Showing {totalCount} players
								{#if selectedLetter}starting with "{selectedLetter}"{/if}
								{#if gameFilter}in {gameFilter}{/if}
								{#if countryFilter}from {countryFilter}{/if}
							</div>
						</div>
						
						<!-- Players Display -->
						{#if loading}
							<!-- Table skeleton matching the table view (default) -->
							<div class="overflow-x-auto">
								<table class="w-full">
									<thead class="bg-gray-50 dark:bg-gray-900">
										<tr>
											<th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rank</th>
											<th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Player</th>
											<th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Team</th>
											<th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sport</th>
											<th class="px-4 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Wins</th>
											<th class="px-4 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Win %</th>
											<th class="px-4 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Earnings</th>
										</tr>
									</thead>
									<tbody class="divide-y divide-gray-100 dark:divide-gray-700">
										{#each Array(12) as _, i}
											<tr class="animate-pulse">
												<td class="px-4 py-3 whitespace-nowrap">
													<div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-8"></div>
												</td>
												<td class="px-4 py-3 whitespace-nowrap">
													<div class="flex items-center gap-3">
														<div class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
														<div>
															<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-1.5"></div>
															<div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
														</div>
													</div>
												</td>
												<td class="px-4 py-3 whitespace-nowrap">
													<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
												</td>
												<td class="px-4 py-3 whitespace-nowrap">
													<div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
												</td>
												<td class="px-4 py-3 whitespace-nowrap text-right">
													<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8 ml-auto"></div>
												</td>
												<td class="px-4 py-3 whitespace-nowrap text-right">
													<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-10 ml-auto"></div>
												</td>
												<td class="px-4 py-3 whitespace-nowrap text-right">
													<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 ml-auto"></div>
												</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						{:else if viewMode === 'table'}
							<!-- Table View -->
							<div class="overflow-x-auto">
								<table class="w-full">
									<thead class="bg-gray-50 dark:bg-gray-900">
										<tr>
											<th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rank</th>
											<th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Player</th>
											<th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Team</th>
											<th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sport</th>
											<th class="px-4 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Wins</th>
											<th class="px-4 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Win %</th>
											<th class="px-4 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Earnings</th>
										</tr>
									</thead>
									<tbody class="divide-y divide-gray-100 dark:divide-gray-700">
										{#each allPlayers as player (player.id)}
											<tr 
												on:click={() => goto(`/profile/${player.username}`)}
												class="hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
											>
												<td class="px-4 py-3 whitespace-nowrap">
													<span class="font-bold text-gray-900 dark:text-white">#{player.rank}</span>
												</td>
												<td class="px-4 py-3 whitespace-nowrap">
													<div class="flex items-center gap-3">
														{#if player.image && !imageErrors[player.id]}
															<img 
																src={player.image} 
																alt={player.displayName}
																on:error={() => handleImageError(player.id)}
																class="w-10 h-10 rounded-full object-cover"
															/>
														{:else}
															<div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
																{player.displayName.charAt(0)}
															</div>
														{/if}
														<div>
															<div class="font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
																{player.displayName}
																{#if player.verified}<VerifiedBadge size="xs" />{/if}
															</div>
															<div class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
																<CountryFlag country={player.country} size="sm" />
																<span>{player.country || 'Unknown'}</span>
															</div>
														</div>
													</div>
												</td>
												<td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
													{player.team || '-'}
												</td>
												<td class="px-4 py-3 whitespace-nowrap">
													<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
														{player.game}
													</span>
												</td>
												<td class="px-4 py-3 whitespace-nowrap text-right font-semibold text-gray-900 dark:text-white">
													{player.wins}
												</td>
												<td class="px-4 py-3 whitespace-nowrap text-right font-semibold text-blue-600 dark:text-blue-400">
													{player.winRate}%
												</td>
												<td class="px-4 py-3 whitespace-nowrap text-right font-bold text-green-600 dark:text-green-400">
													{formatCurrency(player.totalWinnings)}
												</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						{:else}
							<!-- Grid View -->
							<div class="p-4">
								<PlayerGrid 
									players={allPlayers}
									loading={false}
									{currentPage}
									{totalPages}
									emptyTitle="No players found"
									emptyDescription="Try adjusting your filters or search query."
									on:pageChange={handlePageChange}
								/>
							</div>
						{/if}
					</div>
				{/if}
			</div>
			
			<!-- Sidebar -->
			<aside class="lg:w-80 space-y-4">
				{#if loading}
					<!-- Sidebar Skeletons -->
					<!-- Player News Skeleton -->
					<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden animate-pulse">
						<div class="bg-gray-900 dark:bg-gray-950 px-4 py-3">
							<div class="h-4 bg-gray-700 rounded w-24"></div>
						</div>
						<div class="divide-y divide-gray-100 dark:divide-gray-700">
							{#each Array(5) as _}
								<div class="p-4">
									<div class="flex gap-3">
										<div class="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded flex-shrink-0"></div>
										<div class="flex-1 min-w-0">
											<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
											<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
											<div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
										</div>
									</div>
								</div>
							{/each}
						</div>
						<div class="border-t border-gray-100 dark:border-gray-700 px-4 py-3">
							<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28 mx-auto"></div>
						</div>
					</div>
					
					<!-- Quick Stats Skeleton -->
					<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse">
						<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-4"></div>
						<div class="space-y-3">
							{#each Array(4) as _}
								<div class="flex justify-between items-center">
									<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
									<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8"></div>
								</div>
							{/each}
						</div>
					</div>
					
					<!-- Browse by Sport Skeleton -->
					<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden animate-pulse">
						<div class="bg-gray-900 dark:bg-gray-950 px-4 py-3">
							<div class="h-4 bg-gray-700 rounded w-28"></div>
						</div>
						<div class="p-2 space-y-1">
							{#each Array(9) as _}
								<div class="h-9 bg-gray-100 dark:bg-gray-700 rounded"></div>
							{/each}
						</div>
					</div>
				{:else}
					<!-- Player News -->
					<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
						<div class="bg-gray-900 dark:bg-gray-950 px-4 py-3">
							<h3 class="font-bold text-white text-sm uppercase tracking-wide">Player News</h3>
						</div>
						<div class="divide-y divide-gray-100 dark:divide-gray-700">
							{#each playerNews as news (news.id)}
								<a href="/news/{news.id}" class="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
									<div class="flex gap-3">
										<img 
											src={news.image} 
											alt={news.title}
											class="w-16 h-16 rounded object-cover flex-shrink-0"
										/>
										<div class="flex-1 min-w-0">
											<h4 class="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">
												{news.title}
											</h4>
											<p class="text-xs text-gray-500 dark:text-gray-400">{news.date}</p>
										</div>
									</div>
								</a>
							{/each}
						</div>
						<a href="/news?category=players" class="block text-center py-3 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
							All Player News →
						</a>
					</div>
					
					<!-- Quick Stats -->
					<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
						<h3 class="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wide mb-4">Quick Stats</h3>
						<div class="space-y-3">
							<div class="flex justify-between items-center">
								<span class="text-sm text-gray-600 dark:text-gray-400">Total Players</span>
								<span class="font-bold text-gray-900 dark:text-white">{totalPlayers.toLocaleString()}</span>
							</div>
							<div class="flex justify-between items-center">
								<span class="text-sm text-gray-600 dark:text-gray-400">Sports Categories</span>
								<span class="font-bold text-gray-900 dark:text-white">{games.length - 1}</span>
							</div>
							<div class="flex justify-between items-center">
								<span class="text-sm text-gray-600 dark:text-gray-400">Countries</span>
								<span class="font-bold text-gray-900 dark:text-white">{countries.length - 1}</span>
							</div>
							<div class="flex justify-between items-center">
								<span class="text-sm text-gray-600 dark:text-gray-400">Total Prize Pool</span>
								<span class="font-bold text-green-600 dark:text-green-400">{formatCurrency(totalPrizePool)}</span>
							</div>
						</div>
					</div>
					
					<!-- Browse by Sport -->
					<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
						<div class="bg-gray-900 dark:bg-gray-950 px-4 py-3">
							<h3 class="font-bold text-white text-sm uppercase tracking-wide">Browse by Sport</h3>
						</div>
						<div class="p-2">
							{#each games.slice(1, 10) as game}
								<button
									on:click={() => { gameFilter = game; activeTab = 'all'; handleFilterChange(); }}
									class="w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
								>
									{game}
								</button>
							{/each}
						</div>
					</div>
				{/if}
			</aside>
		</div>
	</div>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
