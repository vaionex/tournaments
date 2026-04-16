<script lang="ts">
	import { onMount, onDestroy, tick } from 'svelte';
	import type { NewsArticle, NewsCategory, Player, Tournament } from '$lib/types';
	import { getNewsArticlesPaginated, getNewsArticlesPaginatedWithOffset, getNewsCategories } from '$lib/services/news.service';
	import { formatSportName } from '$lib/utils/sport-name';
	// Mock services removed — using SSR data from +page.server.ts
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
	let topAthletes: any[] = data?.ssrTopAthletes || [];
	let trendingArticles: any[] = data?.ssrTrending || [];
	let recentResults: any[] = data?.ssrRecentResults || [];
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
	let homepagePersonalizationEnabled = false;
	
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
			homepagePersonalizationEnabled = prefs.homepagePersonalizationEnabled || false;
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
		if (!homepagePersonalizationEnabled || !hasPreferences || favoriteSports.length === 0) {
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
				hasMoreNews: boolean;
			}>(cacheKey);
			
			if (cached) {
				// Use cached data immediately (no skeleton)
				newsArticles = cached.newsArticles;
				upcomingTournaments = cached.upcomingTournaments;
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
			const newsResult = await getNewsArticlesPaginated(selectedCategory, 1, INITIAL_ARTICLES);
			
			newsArticles = filterByPreferences(newsResult.articles);
			hasMoreNews = newsResult.hasMore;
			// Tournaments and athletes come from SSR data (no mock services)
			
			// Cache the results
			const cacheKey = `homepage-${selectedCategory}`;
			cache.set(cacheKey, {
				newsArticles,
				upcomingTournaments,
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
			const filteredArticles = filterByPreferences(result.articles);
			
			if (filteredArticles.length > 0) {
				newsArticles = [...newsArticles, ...filteredArticles];
			}
			currentPage++;
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
			newsArticles = filterByPreferences(result.articles);
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
	image="https://www.tournaments.com/og-image.jpg"
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

				{#if homepagePersonalizationEnabled && hasPreferences && favoriteSports.length > 0}
					<div class="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
						<p class="text-sm text-blue-800 dark:text-blue-300">
							<strong>Personalized feed:</strong> showing homepage stories from your selected sports.
							<a href="/dashboard" class="underline font-semibold hover:text-blue-900 dark:hover:text-blue-200">Change this in Dashboard</a>
						</p>
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
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
									</svg>
									Tournaments
								</h2>
							</div>
							<div class="p-4 space-y-2">
								{#each upcomingTournaments.slice(0, 5) as tournament}
									{@const isLive = new Date(tournament.date) <= new Date() && tournament.end_date && new Date(tournament.end_date) >= new Date()}
									<a 
										href="/tournaments/{tournament.id}"
										class="block p-3 border-l-4 {isLive ? 'border-red-500 bg-red-50/50 dark:bg-red-900/10' : 'border-blue-500 bg-gray-50 dark:bg-gray-900/50'} rounded-r-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
									>
										<div class="flex items-start justify-between gap-2 mb-1">
											<h3 class="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
												{tournament.name}
											</h3>
											{#if isLive}
												<span class="flex-shrink-0 px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-red-500 text-white flex items-center gap-1">
													<span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
													LIVE
												</span>
											{/if}
										</div>
										<div class="flex items-center justify-between text-xs">
											<span class="text-gray-500 dark:text-gray-400 flex items-center gap-1">
												<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
												{#if isLive}
													Ends {new Date(tournament.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
												{:else}
													{new Date(tournament.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
												{/if}
											</span>
											<span class="px-2 py-0.5 text-[10px] font-semibold uppercase rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
												{tournament.game}
											</span>
										</div>
									</a>
								{/each}
							</div>
							<div class="p-4 pt-2">
								<a 
									href="/tournaments" 
									class="block w-full py-2.5 text-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
								>
									View All Tournaments →
								</a>
							</div>
						</div>
					{/if}

					<!-- Trending Stories -->
					{#if trendingArticles.length > 0}
						<div class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
							<div class="p-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-500 to-red-500">
								<h2 class="text-lg font-bold text-white flex items-center gap-2">
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
									</svg>
									Trending
								</h2>
							</div>
							<div class="p-4 space-y-3">
								{#each trendingArticles.slice(0, 5) as article, i}
									<a 
										href="/news/{article.slug || article.id}"
										class="flex items-start gap-3 group"
									>
										<span class="flex-shrink-0 w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center text-sm font-bold">
											{i + 1}
										</span>
										<div class="flex-1 min-w-0">
											<h3 class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2 leading-snug">
												{article.title}
											</h3>
											<p class="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
												<span class="uppercase font-semibold text-[10px] text-orange-600 dark:text-orange-400">{article.sport || 'sports'}</span>
												<span>·</span>
												<span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
											</p>
										</div>
									</a>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Recent Results -->
					{#if recentResults.length > 0}
						<div class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
							<div class="p-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-600 to-emerald-600">
								<h2 class="text-lg font-bold text-white flex items-center gap-2">
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									Recent Results
								</h2>
							</div>
							<div class="p-4 space-y-2">
								{#each recentResults.slice(0, 5) as result}
									<a 
										href="/tournaments/{result.id}"
										class="block p-3 border-l-4 border-green-500 bg-gray-50 dark:bg-gray-900/50 rounded-r-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors group"
									>
										<h3 class="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-1 mb-1">
											{result.name}
										</h3>
										<div class="flex items-center justify-between text-xs">
											<span class="text-gray-500 dark:text-gray-400">
												{new Date(result.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
											</span>
											<span class="px-2 py-0.5 text-[10px] font-semibold uppercase rounded bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300">
												{result.game}
											</span>
										</div>
									</a>
								{/each}
							</div>
						</div>
					{/if}
					
					<!-- Top Athletes -->
					{#if topAthletes.length > 0}
						<div class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
							<div class="p-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-red-600 to-red-700">
								<h2 class="text-lg font-bold text-white flex items-center gap-2">
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
									</svg>
									Top Athletes
								</h2>
							</div>
							<div class="p-4 space-y-1">
								{#each topAthletes.slice(0, 8) as athlete, i}
									<a 
										href="/athletes/{athlete.sport}/{athlete.slug}" 
										class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
									>
										<span class="flex-shrink-0 w-6 text-center font-bold text-sm {i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-amber-600' : 'text-gray-400'}">
											{i + 1}
										</span>
										<div class="flex-1 min-w-0">
											<p class="font-semibold text-sm text-gray-900 dark:text-white truncate group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
												{athlete.displayName}
											</p>
											<p class="text-xs text-gray-500 dark:text-gray-400 truncate">
												{formatSportName(athlete.sport)} {athlete.country ? `• ${athlete.country}` : ''}
											</p>
										</div>
										<span class="flex-shrink-0 text-xs font-semibold text-green-600 dark:text-green-400">
											{athlete.totalWinnings >= 1000000000
												? `$${(athlete.totalWinnings / 1000000000).toFixed(1)}B`
												: athlete.totalWinnings >= 1000000
													? `$${(athlete.totalWinnings / 1000000).toFixed(0)}M`
													: `$${(athlete.totalWinnings / 1000).toFixed(0)}K`}
										</span>
									</a>
								{/each}
							</div>
							<div class="p-4 pt-0">
								<a 
									href="/athletes" 
									class="block w-full py-2.5 text-center text-sm font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
								>
									View All Athletes →
								</a>
							</div>
						</div>
					{/if}
				</div>
			</aside>
		</div>
	</div>
</div>
