<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { format } from 'date-fns';
	import { PageSEO } from '$lib/components/seo';
	import { getNewsArticles } from '$lib/services/news.service';
	
	// SSR data
	export let data;
	
	let articles = data?.ssrArticles || [];
	let loading = !articles.length;
	let selectedCategory = 'All';
	
	const categories = [
		'All',
		'Tournament News',
		'Announcements',
		'Player Spotlight',
		'Results',
		'Interviews',
		'Analysis',
		'Esports'
	];
	
	$: filteredArticles = selectedCategory === 'All' 
		? articles 
		: articles.filter(a => a.category === selectedCategory);
	
	onMount(async () => {
		// Check for category filter from URL
		const urlCategory = $page.url.searchParams.get('category');
		if (urlCategory && categories.includes(urlCategory)) {
			selectedCategory = urlCategory;
		}
		
		const result = await getNewsArticles();
		articles = result;
		loading = false;
	});
	
	function selectCategory(category: string) {
		selectedCategory = category;
		// Update URL without navigation
		const url = new URL(window.location.href);
		if (category === 'All') {
			url.searchParams.delete('category');
		} else {
			url.searchParams.set('category', category);
		}
		window.history.replaceState({}, '', url.toString());
	}
</script>

<PageSEO
	title="Sports News"
	description="Get the latest sports news, tournament updates, player spotlights, match results, and exclusive interviews. Stay informed with breaking news from NFL, NBA, MLB, NHL, Soccer, Esports, and more."
	image="https://images.unsplash.com/photo-1461896836934- voices-podcast?w=1200&h=630&fit=crop"
/>

<div class="bg-white dark:bg-gray-900 min-h-screen">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<!-- Page Header -->
		<div class="mb-8">
			<h1 class="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">
				Sports News
			</h1>
			<p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
				Stay up to date with the latest sports news, tournament coverage, player spotlights, and exclusive interviews from around the world.
			</p>
		</div>
		
		<!-- Category Filters -->
		<div class="mb-8 overflow-x-auto pb-2">
			<div class="flex gap-2 min-w-max">
				{#each categories as category}
					<button
						on:click={() => selectCategory(category)}
						class="px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap
							{selectedCategory === category 
								? 'bg-red-600 text-white' 
								: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}"
					>
						{category}
					</button>
				{/each}
			</div>
		</div>
		
		{#if loading}
			<!-- Skeleton Loader -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each Array(9) as _}
					<div class="bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden animate-pulse">
						<div class="h-48 bg-gray-200 dark:bg-gray-700"></div>
						<div class="p-5">
							<div class="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
							<div class="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
							<div class="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
							<div class="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
							<div class="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
						</div>
					</div>
				{/each}
			</div>
		{:else if filteredArticles.length === 0}
			<div class="text-center py-16">
				<svg class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
				</svg>
				<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">No articles found</h3>
				<p class="text-gray-600 dark:text-gray-400">No news articles found for "{selectedCategory}". Try a different category.</p>
			</div>
		{:else}
			<!-- Featured Article -->
			{#if selectedCategory === 'All' && filteredArticles.length > 0}
				<a href="/news/{filteredArticles[0].id}" class="group block mb-8">
					<div class="relative bg-gray-900 rounded-2xl overflow-hidden">
						<img 
							src={filteredArticles[0].image} 
							alt={filteredArticles[0].title}
							class="w-full h-[400px] sm:h-[500px] object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
						<div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
							<span class="inline-block px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-full mb-4">
								{filteredArticles[0].category}
							</span>
							<h2 class="text-2xl sm:text-4xl font-black text-white mb-3 group-hover:text-red-400 transition-colors">
								{filteredArticles[0].title}
							</h2>
							<p class="text-gray-300 text-lg mb-4 line-clamp-2 max-w-3xl">
								{filteredArticles[0].excerpt}
							</p>
							<div class="flex items-center gap-4 text-sm text-gray-400">
								<span>{filteredArticles[0].author}</span>
								<span>•</span>
								<span>{format(new Date(filteredArticles[0].date), 'MMMM d, yyyy')}</span>
							</div>
						</div>
					</div>
				</a>
			{/if}
			
			<!-- Articles Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each (selectedCategory === 'All' ? filteredArticles.slice(1) : filteredArticles) as article}
					<a href="/news/{article.id}" class="group">
						<article class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
							<div class="relative h-48 overflow-hidden">
								<img 
									src={article.image} 
									alt={article.title}
									class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
								/>
								<div class="absolute top-3 left-3">
									<span class="px-2.5 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">
										{article.category}
									</span>
								</div>
							</div>
							<div class="p-5 flex flex-col flex-1">
								<h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2">
									{article.title}
								</h3>
								<p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
									{article.excerpt}
								</p>
								<div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
									<span class="font-medium">{article.author}</span>
									<span>{format(new Date(article.date), 'MMM d, yyyy')}</span>
								</div>
							</div>
						</article>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>

