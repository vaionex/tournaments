<script lang="ts">
	import { page } from '$app/stores';
	
	export let data;
	
	$: sport = data?.sport;
	$: notFound = !sport;
	
	function formatContent(content: string) {
		return content.split('\n\n').filter(p => p.trim());
	}
</script>

<svelte:head>
	{#if sport}
		<title>{sport.name} - Complete Sport Guide | Tournaments.com</title>
		<meta name="description" content="{sport.description} Learn about {sport.name} history, leagues, scoring, and famous moments." />
		<meta property="og:title" content="{sport.name} - Complete Sport Guide | Tournaments.com" />
		<meta property="og:description" content={sport.description} />
		<meta property="og:type" content="article" />
		<meta property="og:url" content="https://www.tournaments.com/sports/{sport.slug}" />
		
		<!-- Structured Data -->
		{@html `<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Article",
			"headline": "${sport.name} - Complete Sport Guide",
			"description": "${sport.description}",
			"author": {
				"@type": "Organization",
				"name": "Tournaments.com"
			},
			"publisher": {
				"@type": "Organization", 
				"name": "Tournaments.com",
				"logo": {
					"@type": "ImageObject",
					"url": "https://www.tournaments.com/logo.png"
				}
			},
			"datePublished": "2025-01-01",
			"dateModified": "2025-01-01",
			"mainEntityOfPage": {
				"@type": "WebPage",
				"@id": "https://www.tournaments.com/sports/${sport.slug}"
			},
			"about": {
				"@type": "Sport",
				"name": "${sport.name}",
				"description": "${sport.description}"
			}
		}
		</script>`}
	{/if}
</svelte:head>

<div class="min-h-screen bg-white dark:bg-gray-900">
	{#if notFound}
		<div class="container mx-auto px-4 py-20 text-center max-w-4xl">
			<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Sport Not Found</h1>
			<p class="text-gray-600 dark:text-gray-400 mb-8">The sport guide you're looking for doesn't exist yet.</p>
			<a href="/sports" class="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
				← Browse All Sports
			</a>
		</div>
	{:else if sport}
		<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
			<!-- Breadcrumb -->
			<nav class="mb-8" aria-label="Breadcrumb">
				<ol class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
					<li><a href="/" class="hover:text-red-600 dark:hover:text-red-400 transition-colors">Home</a></li>
					<li class="text-gray-400">/</li>
					<li><a href="/sports" class="hover:text-red-600 dark:hover:text-red-400 transition-colors">Sports</a></li>
					<li class="text-gray-400">/</li>
					<li class="text-gray-900 dark:text-white font-medium">{sport.name}</li>
				</ol>
			</nav>

			<div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
				<!-- Main Content -->
				<main class="lg:col-span-3">
					<!-- Header -->
					<header class="mb-12">
						<div class="mb-6">
							<span class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide">
								Sport Guide
							</span>
						</div>
						
						<h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight mb-6">
							{sport.name}
						</h1>
						
						<p class="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
							{sport.description}
						</p>

						<div class="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
							<p class="text-lg text-blue-900 dark:text-blue-100 leading-relaxed">
								{sport.overview}
							</p>
						</div>
					</header>

					<!-- Quick Facts Grid -->
					<section class="mb-12">
						<h2 class="text-3xl font-black text-gray-900 dark:text-white mb-8">Quick Facts</h2>
						<div class="grid md:grid-cols-2 gap-6">
							<!-- Scoring System -->
							<div class="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
								<h3 class="font-bold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
									<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
									</svg>
									Scoring System
								</h3>
								<p class="text-green-700 dark:text-green-300">{sport.scoring}</p>
							</div>

							<!-- Equipment -->
							<div class="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
								<h3 class="font-bold text-purple-900 dark:text-purple-100 mb-4 flex items-center gap-2">
									<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
									</svg>
									Essential Equipment
								</h3>
								<ul class="space-y-1">
									{#each sport.equipment as item}
										<li class="text-purple-700 dark:text-purple-300">• {item}</li>
									{/each}
								</ul>
							</div>
						</div>
					</section>

					<!-- Main Content -->
					<article class="prose prose-lg dark:prose-invert max-w-none mb-12">
						{#each formatContent(sport.content) as paragraph}
							{#if paragraph.startsWith('**') && paragraph.endsWith('**')}
								<h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-6">
									{paragraph.replace(/\*\*/g, '')}
								</h3>
							{:else}
								<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{@html paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
							{/if}
						{/each}
					</article>

					<!-- Major Leagues -->
					<section class="mb-12">
						<h2 class="text-3xl font-black text-gray-900 dark:text-white mb-8">Major Leagues & Competitions</h2>
						<div class="grid gap-4">
							{#each sport.leagues as league}
								<div class="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
									<div class="flex justify-between items-start mb-3">
										<h3 class="text-xl font-bold text-gray-900 dark:text-white">{league.name}</h3>
										{#if league.country}
											<span class="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-lg text-sm font-medium">
												{league.country}
											</span>
										{/if}
									</div>
									<p class="text-gray-600 dark:text-gray-400">{league.description}</p>
								</div>
							{/each}
						</div>
					</section>

					<!-- Famous Moments -->
					<section class="mb-12">
						<h2 class="text-3xl font-black text-gray-900 dark:text-white mb-8">Legendary Moments</h2>
						<div class="space-y-6">
							{#each sport.famousMoments as moment}
								<div class="bg-gradient-to-r from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
									<div class="flex items-start gap-4">
										<div class="bg-red-600 text-white rounded-full px-4 py-2 font-bold text-sm flex-shrink-0">
											{moment.year}
										</div>
										<div>
											<h3 class="text-xl font-bold text-red-900 dark:text-red-100 mb-2">{moment.title}</h3>
											<p class="text-red-700 dark:text-red-300">{moment.description}</p>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</section>

					<!-- Current State -->
					<section class="mb-12">
						<h2 class="text-3xl font-black text-gray-900 dark:text-white mb-6">The Sport Today</h2>
						<div class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700">
							<p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{sport.currentState}</p>
						</div>
					</section>
				</main>

				<!-- Sidebar -->
				<aside class="lg:col-span-1 space-y-8">
					<!-- Navigation -->
					<div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 sticky top-8">
						<h3 class="font-bold text-gray-900 dark:text-white mb-4 text-lg">Quick Navigation</h3>
						<div class="space-y-2">
							<a href="#leagues" class="block text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors py-2 border-b border-gray-200 dark:border-gray-700">
								🏆 Major Leagues
							</a>
							<a href="#history" class="block text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors py-2 border-b border-gray-200 dark:border-gray-700">
								📚 History
							</a>
							<a href="#moments" class="block text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors py-2 border-b border-gray-200 dark:border-gray-700">
								⭐ Famous Moments
							</a>
							<a href="#current" class="block text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors py-2">
								🔄 Current State
							</a>
						</div>
					</div>

					<!-- Related Athletes -->
					{#if sport.relatedAthletes.length > 0}
						<div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700">
							<h3 class="font-bold text-gray-900 dark:text-white mb-4 text-lg pb-3 border-b-2 border-gray-200 dark:border-gray-700">
								Legendary Athletes
							</h3>
							<div class="space-y-3">
								{#each sport.relatedAthletes as athlete}
									<a href="/athletes/{sport.slug}/{athlete.toLowerCase().replace(/\s+/g, '-')}" class="block group">
										<div class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
											<div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center text-white font-bold text-sm">
												{athlete.charAt(0)}
											</div>
											<div>
												<h4 class="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
													{athlete}
												</h4>
											</div>
										</div>
									</a>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Related Tournaments -->
					{#if sport.relatedTournaments.length > 0}
						<div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700">
							<h3 class="font-bold text-gray-900 dark:text-white mb-4 text-lg pb-3 border-b-2 border-gray-200 dark:border-gray-700">
								Major Tournaments
							</h3>
							<div class="space-y-3">
								{#each sport.relatedTournaments as tournament}
									<a href="/tournaments/{tournament.toLowerCase().replace(/\s+/g, '-')}" class="block group">
										<div class="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
											<h4 class="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
												{tournament}
											</h4>
										</div>
									</a>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Other Sports -->
					<div class="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-6 text-white">
						<h3 class="font-bold mb-4 text-lg">Explore Other Sports</h3>
						<div class="space-y-2 text-sm">
							<a href="/sports/nfl" class="block hover:underline">🏈 American Football</a>
							<a href="/sports/nba" class="block hover:underline">🏀 Basketball</a>
							<a href="/sports/soccer" class="block hover:underline">⚽ Soccer</a>
							<a href="/sports/tennis" class="block hover:underline">🎾 Tennis</a>
							<a href="/sports/golf" class="block hover:underline">⛳ Golf</a>
						</div>
						<a href="/sports" class="inline-block mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors">
							View All Sports →
						</a>
					</div>
				</aside>
			</div>
		</div>
	{/if}
</div>

<style>
	:global(.prose h3) {
		@apply text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-6;
	}
	
	:global(.prose p) {
		@apply text-gray-700 dark:text-gray-300 leading-relaxed mb-6;
	}
	
	:global(.prose strong) {
		@apply font-bold text-gray-900 dark:text-white;
	}
</style>