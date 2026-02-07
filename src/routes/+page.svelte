<script lang="ts">
	import { onMount, onDestroy, tick } from 'svelte';
	import type { NewsArticle, NewsCategory, Player, Tournament } from '$lib/types';
	import { getNewsArticlesPaginated, getNewsArticlesPaginatedWithOffset, getNewsCategories } from '$lib/services/news.service';
	import { getTopPlayers } from '$lib/services/players.service';
	import { getUpcomingTournaments } from '$lib/services/tournaments.service';
	import { getUserPreferences } from '$lib/services/user.service';
	import { cache } from '$lib/services/cache.service';
	import { HeroArticle, NewsGrid, CategoryNav } from '$lib/components/home';
	import { LoadingState } from '$lib/components/ui';
	import { PageSEO } from '$lib/components/seo';
	
	// SSR data from +page.server.ts (visible to Google crawler)
	export let data: any;
	
	let newsArticles: NewsArticle[] = data?.ssrArticles || [];
	let upcomingTournaments: Tournament[] = data?.ssrTournaments || [];
	let topPlayers: Player[] = [];
	let loading = false; // Start false, will be set true if no cache found
	let changingCategory = false; // Category switch (doesn't hide content)
	let loadingMore = false;
	let hasMoreNews = true;
	let currentPage = 1;
	let selectedCategory: NewsCategory = 'All';
	let loadMoreTrigger: HTMLDivElement;
	let observer: IntersectionObserver | null = null;
	let hasCachedData = false;
	
	// User preferences
	let favoriteSports: string[] = [];
	let hasPreferences = false;
	
	const categories = getNewsCategories();
	const INITIAL_ARTICLES = 7; // 1 for hero + 6 for grid (even number)
	const ARTICLES_PER_PAGE = 6; // Subsequent loads (all go to grid, should be even)
	
	// Sport code mapping for filtering
	const sportCodeMap: Record<string, string> = {
		'NFL': 'nfl',
		'NBA': 'nba',
		'MLB': 'mlb',
		'NHL': 'nhl',
		'SOCCER': 'soccer',
		'NCAAF': 'ncaf',
		'WNBA': 'wnba',
		'TENNIS': 'tennis',
		'GOLF': 'golf',
		'MMA': 'mma',
		'BOXING': 'boxing',
		'RACING': 'racing',
		'OLYMPICS': 'olympics',
		'ESPORTS': 'esports',
		'CRICKET': 'cricket',
		'RUGBY': 'rugby'
	};
	
	onMount(async () => {
		// Load user preferences first
		try {
			const prefs = await getUserPreferences();
			if (prefs.favoriteSports && prefs.favoriteSports.length > 0) {
				favoriteSports = prefs.favoriteSports.map(s => sportCodeMap[s] || s.toLowerCase());
				hasPreferences = true;
			}
		} catch (error) {
			console.error('Failed to load preferences:', error);
		}
		
		await loadData();
	});
	
	onDestroy(() => {
		if (observer) {
			observer.disconnect();
		}
	});
	
	// Reactive statement to set up observer when trigger element becomes available
	$: if (loadMoreTrigger && !loading) {
		setupInfiniteScroll();
	}
	
	function setupInfiniteScroll() {
		// Disconnect existing observer if any
		if (observer) {
			observer.disconnect();
		}
		
		observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMoreNews && !loadingMore && !loading && !changingCategory) {
					loadMoreNews();
				}
			},
			{ rootMargin: '300px', threshold: 0 }
		);
		
		if (loadMoreTrigger) {
			observer.observe(loadMoreTrigger);
		}
	}
	
	function filterByPreferences<T extends { sport?: string }>(items: T[]): T[] {
		if (!hasPreferences || favoriteSports.length === 0) {
			return items;
		}
		
		return items.filter(item => {
			if (!item.sport) return true; // Include items without sport if no preferences
			const itemSport = item.sport.toLowerCase();
			return favoriteSports.some(fav => itemSport === fav || itemSport.includes(fav) || fav.includes(itemSport));
		});
	}
	
	async function loadData(useCache: boolean = true) {
		// Check cache first
		if (useCache) {
			const cacheKey = `homepage-${selectedCategory}`;
			const cached = cache.get<{
				newsArticles: NewsArticle[];
				upcomingTournaments: Tournament[];
				topPlayers: Player[];
				hasMoreNews: boolean;
			}>(cacheKey);
			
			if (cached) {
				// Use cached data immediately (no skeleton)
				newsArticles = cached.newsArticles;
				upcomingTournaments = cached.upcomingTournaments;
				topPlayers = cached.topPlayers;
				hasMoreNews = cached.hasMoreNews;
				hasCachedData = true;
				loading = false;
				
				// Setup observer immediately
				await tick();
				if (loadMoreTrigger) {
					setupInfiniteScroll();
				}
				
				// Fetch fresh data in background
				loadData(false);
				return;
			} else {
				// No cache found, show loading
				loading = true;
			}
		}
		
		if (!hasCachedData && !useCache) {
			// Background refresh of cached data, don't show loading
			loading = false;
		} else if (!hasCachedData) {
			loading = true;
		}
		currentPage = 1;
		
		try {
			const [newsResult, tournaments, players] = await Promise.all([
				getNewsArticlesPaginated(selectedCategory, 1, INITIAL_ARTICLES),
				getUpcomingTournaments(2),
				getTopPlayers(8)
			]);
			
			// Filter news articles by preferences
			let filteredArticles = newsResult.articles;
			if (hasPreferences && favoriteSports.length > 0) {
				filteredArticles = filterByPreferences(newsResult.articles);
				// If filtering removed all articles, show a message or fallback
				if (filteredArticles.length === 0 && newsResult.articles.length > 0) {
					// Show a subset or message - for now, show first few articles with a note
					filteredArticles = newsResult.articles.slice(0, 3);
				}
			}
			
			newsArticles = filteredArticles;
			hasMoreNews = newsResult.hasMore;
			upcomingTournaments = filterByPreferences(tournaments);
			topPlayers = players; // Players don't have sport filter yet
			
			// Cache the results
			const cacheKey = `homepage-${selectedCategory}`;
			cache.set(cacheKey, {
				newsArticles: filteredArticles,
				upcomingTournaments: filterByPreferences(tournaments),
				topPlayers: players,
				hasMoreNews: newsResult.hasMore
			}, 5 * 60 * 1000); // 5 minutes TTL
		} catch (error) {
			console.error('Failed to load data:', error);
		} finally {
			loading = false;
			hasCachedData = false;
			// Re-setup observer after loading completes
			await tick();
			if (loadMoreTrigger) {
				setupInfiniteScroll();
			}
		}
	}
	
	async function loadMoreNews() {
		if (loadingMore || !hasMoreNews) return;
		
		loadingMore = true;
		
		try {
			// Calculate correct offset: first page has INITIAL_ARTICLES, subsequent pages have ARTICLES_PER_PAGE
			const offset = INITIAL_ARTICLES + (currentPage - 1) * ARTICLES_PER_PAGE;
			const result = await getNewsArticlesPaginatedWithOffset(selectedCategory, offset, ARTICLES_PER_PAGE);
			
			if (result.articles.length > 0) {
				let newArticles = result.articles;
				// Filter by preferences
				if (hasPreferences && favoriteSports.length > 0) {
					newArticles = filterByPreferences(result.articles);
				}
				newsArticles = [...newsArticles, ...newArticles];
				currentPage++;
			}
			hasMoreNews = result.hasMore;
		} catch (error) {
			console.error('Failed to load more news:', error);
		} finally {
			loadingMore = false;
		}
	}
	
	async function handleCategorySelect(event: CustomEvent<NewsCategory>) {
		selectedCategory = event.detail;
		currentPage = 1;
		changingCategory = true; // Use changingCategory instead of loading
		
		try {
			const result = await getNewsArticlesPaginated(selectedCategory, 1, INITIAL_ARTICLES);
			let filteredArticles = result.articles;
			// Filter by preferences
			if (hasPreferences && favoriteSports.length > 0) {
				filteredArticles = filterByPreferences(result.articles);
			}
			newsArticles = filteredArticles;
			hasMoreNews = result.hasMore;
		} catch (error) {
			console.error('Failed to load category:', error);
		} finally {
			changingCategory = false;
			// Re-setup observer after category change
			await tick();
			if (loadMoreTrigger) {
				setupInfiniteScroll();
			}
		}
	}
	
	$: heroArticle = newsArticles[0] || null;
	$: gridArticles = newsArticles.slice(1);
</script>

<PageSEO
	title="Tournaments — Sports Tournaments, News & Player Rankings"
	description="Find sports tournaments, breaking news, scores, and player rankings across NFL, NBA, MLB, NHL, Soccer, Tennis, Golf, MMA, Esports and more. Browse 600+ athlete profiles with stats and biographies."
	image="https://images.unsplash.com/photo-1461896836934-47e5c98aebe1?w=1200&h=630&fit=crop"
/>

<div class="bg-white dark:bg-gray-900 min-h-screen">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-4 sm:pt-3 sm:pb-6 max-w-7xl">
		<!-- Hero Featured Article -->
		{#if heroArticle}
			<HeroArticle article={heroArticle} />
		{/if}
		
		<!-- Main Content Grid -->
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
			<!-- Main News Column -->
			<div class="lg:col-span-2">
				<h2 class="sr-only">Latest Sports News</h2>
				<!-- Preferences Notice -->
				{#if hasPreferences && favoriteSports.length > 0}
					<div class="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
						<div class="flex items-start gap-3">
							<div class="flex-shrink-0">
								<svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
								</svg>
							</div>
							<div class="flex-1">
								<p class="text-sm text-blue-800 dark:text-blue-300">
									<strong>Personalized feed:</strong> Showing content from your selected sports ({favoriteSports.length} {favoriteSports.length === 1 ? 'sport' : 'sports'}). 
									<a href="/dashboard" class="underline font-semibold hover:text-blue-900 dark:hover:text-blue-200">Change preferences</a>
								</p>
							</div>
						</div>
					</div>
				{/if}
				
				<!-- Category Navigation - Always show, not skeleton -->
				<CategoryNav 
					{categories} 
					{selectedCategory} 
					on:select={handleCategorySelect}
				/>
				
				<!-- News Grid -->
				<div class="min-h-[600px]">
						<div class="relative">
							<!-- Loading overlay during category change -->
							{#if changingCategory}
								<div class="absolute inset-0 bg-white/70 dark:bg-gray-900/70 z-10 flex items-center justify-center rounded-lg backdrop-blur-sm transition-opacity duration-200">
									<div class="flex items-center gap-3 text-gray-600 dark:text-gray-400">
										<svg class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
											<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
											<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										<span class="font-medium">Loading {selectedCategory}...</span>
									</div>
								</div>
							{/if}
							<NewsGrid articles={gridArticles} />
						</div>
						
						<!-- Infinite Scroll Trigger & Loading Indicator -->
						<div bind:this={loadMoreTrigger} class="mt-8">
							{#if loadingMore}
								<div class="flex justify-center py-6">
									<div class="flex items-center gap-2 text-gray-400 dark:text-gray-500">
										<svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
											<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
											<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										<span class="text-sm">Loading more...</span>
									</div>
								</div>
							{:else if hasMoreNews}
								<!-- Invisible trigger for infinite scroll - shows loading spinner briefly -->
								<div class="flex justify-center py-8">
									<div class="flex items-center gap-2 text-gray-400 dark:text-gray-500">
										<svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
											<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
											<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										<span class="text-sm">Loading more...</span>
									</div>
								</div>
							{:else if gridArticles.length > 0}
								<div class="text-center py-8 text-gray-500 dark:text-gray-400">
									<p class="font-medium">You've reached the end</p>
									<p class="text-sm mt-1">No more articles to load</p>
								</div>
							{/if}
						</div>
				</div>
			</div>
			
			<!-- Sidebar -->
			<aside class="lg:col-span-1">
				<div class="space-y-6">
					<!-- Upcoming Tournaments -->
					{#if upcomingTournaments.length > 0}
						<div class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
							<div class="p-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-blue-700">
								<h2 class="text-lg font-bold text-white flex items-center gap-2">
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
									</svg>
									Upcoming Tournaments
								</h2>
							</div>
							<div class="p-4 space-y-3">
								{#each upcomingTournaments.slice(0, 2) as tournament}
									<a 
										href="/tournaments/{tournament.id}"
										class="block p-3 border-l-4 border-blue-500 bg-gray-50 dark:bg-gray-900/50 rounded-r-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
									>
										<div class="flex items-start justify-between gap-2 mb-1">
											<h3 class="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
												{tournament.name}
											</h3>
											<span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded {
												tournament.status === 'live' ? 'bg-red-500 text-white' : 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
											}">
												{tournament.status}
											</span>
										</div>
										<p class="text-xs text-gray-500 dark:text-gray-400 mb-2">{tournament.game}</p>
										<div class="flex items-center justify-between text-xs">
											<span class="text-gray-600 dark:text-gray-400">
												{new Date(tournament.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
											</span>
											{#if tournament.prizePool && tournament.prizePool !== '$0'}
												<span class="font-bold text-green-600 dark:text-green-400">{tournament.prizePool}</span>
											{/if}
										</div>
									</a>
								{/each}
							</div>
							<div class="p-4 pt-0">
								<a 
									href="/tournaments" 
									class="block w-full py-2.5 text-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
								>
									View All Tournaments →
								</a>
							</div>
						</div>
					{:else if loading}
						<div class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
							<!-- Header - static, always shown -->
							<div class="p-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-blue-700">
								<h2 class="text-lg font-bold text-white flex items-center gap-2">
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
									</svg>
									Upcoming Tournaments
								</h2>
							</div>
							<!-- Content Skeleton - matches actual tournament items (exactly 2) -->
							<div class="p-4 space-y-3">
								{#each Array(2) as _}
									<div class="p-3 border-l-4 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 rounded-r-lg animate-pulse">
										<div class="flex items-start justify-between gap-2 mb-1">
											<div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
											<div class="h-5 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
										</div>
										<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
										<div class="flex items-center justify-between">
											<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
											<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
										</div>
									</div>
								{/each}
							</div>
							<!-- Footer button - static, always shown -->
							<div class="p-4 pt-0">
								<a 
									href="/tournaments" 
									class="block w-full py-2.5 text-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
								>
									View All Tournaments →
								</a>
							</div>
						</div>
					{/if}
					
					<!-- Top Players -->
					{#if !loading && topPlayers.length > 0}
						<div class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
							<div class="p-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-red-600 to-red-700">
								<h2 class="text-lg font-bold text-white flex items-center gap-2">
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
									</svg>
									Top Players
								</h2>
							</div>
							<div class="p-4 space-y-2">
								{#each topPlayers.slice(0, 5) as player, i}
									<a 
										href="/players/{player.username}" 
										class="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
									>
										<div class="relative flex-shrink-0">
											<span class="absolute -top-1 -left-1 w-5 h-5 bg-gradient-to-br {i === 0 ? 'from-yellow-400 to-yellow-600' : i === 1 ? 'from-gray-300 to-gray-500' : i === 2 ? 'from-amber-600 to-amber-800' : 'from-gray-400 to-gray-600'} text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm z-10">
												{i + 1}
											</span>
											{#if player.avatar || player.image}
												<img 
													src={player.avatar || player.image} 
													alt={player.displayName}
													class="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
													on:error={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.displayName)}&background=random&size=80`; }}
												/>
											{:else}
												<div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm border-2 border-gray-200 dark:border-gray-600">
													{player.displayName.charAt(0)}
												</div>
											{/if}
										</div>
										<div class="flex-1 min-w-0">
											<p class="font-semibold text-sm text-gray-900 dark:text-white truncate group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
												{player.displayName}
											</p>
											<p class="text-xs text-gray-500 dark:text-gray-400 truncate">
												{player.game} • {player.winRate}% WR
											</p>
										</div>
										<div class="text-right flex-shrink-0">
											<p class="text-xs font-bold text-green-600 dark:text-green-400">
												${(player.totalWinnings / 1000).toFixed(0)}K
											</p>
										</div>
									</a>
								{/each}
							</div>
							<div class="p-4 pt-0">
								<a 
									href="/players" 
									class="block w-full py-2.5 text-center text-sm font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
								>
									View All Players →
								</a>
							</div>
						</div>
					{:else if loading}
						<div class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
							<!-- Header - static, always shown -->
							<div class="p-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-red-600 to-red-700">
								<h2 class="text-lg font-bold text-white flex items-center gap-2">
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
									</svg>
									Top Players
								</h2>
							</div>
							<!-- Content Skeleton - matches actual player items with ranking badges -->
							<div class="p-4 space-y-2">
								{#each Array(5) as _, i}
									<div class="flex items-center gap-3 p-2.5 animate-pulse" style="animation-delay: {i * 100}ms;">
										<div class="relative flex-shrink-0">
											<div class="absolute -top-1 -left-1 w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
											<div class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
										</div>
										<div class="flex-1 min-w-0">
											<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-1"></div>
											<div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
										</div>
										<div class="text-right flex-shrink-0">
											<div class="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
										</div>
									</div>
								{/each}
							</div>
							<!-- Footer button - static, always shown -->
							<div class="p-4 pt-0">
								<a 
									href="/players" 
									class="block w-full py-2.5 text-center text-sm font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
								>
									View All Players →
								</a>
							</div>
						</div>
					{/if}
				</div>
			</aside>
		</div>
	</div>
</div>
