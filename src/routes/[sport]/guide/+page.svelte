<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { formatCurrency, formatNumber } from '$lib/utils';
	
	export let data: PageData;
	
	$: sport = data.sport;
	$: athletes = data.athletes;
	$: articles = data.articles;
	$: tournaments = data.tournaments;
	$: sportName = sport.title.split(' - ')[0];
	
	// Generate FAQ content for each sport
	const faqs = [
		{
			question: `What are the major ${sportName.toLowerCase()} tournaments?`,
			answer: `The major ${sportName.toLowerCase()} tournaments include world championships, national competitions, and professional league events that attract the best athletes from around the globe. These tournaments offer significant prize pools and prestige for winners.`
		},
		{
			question: `How do ${sportName.toLowerCase()} tournaments work?`,
			answer: `${sportName} tournaments typically feature multiple rounds of competition, starting with qualifying rounds and progressing through elimination brackets or round-robin formats. The specific format depends on the tournament structure and number of participants.`
		},
		{
			question: `Who are the top ${sportName.toLowerCase()} athletes?`,
			answer: `The top ${sportName.toLowerCase()} athletes are determined by rankings, tournament wins, prize money earned, and overall competitive achievements. These athletes compete at the highest levels and represent the pinnacle of their sport.`
		},
		{
			question: `When is the ${sportName.toLowerCase()} season?`,
			answer: `The ${sportName.toLowerCase()} season varies depending on the specific competitions and governing bodies. Most professional tournaments run year-round with peak seasons featuring major championships and qualifying events.`
		},
		{
			question: `How can I watch ${sportName.toLowerCase()} tournaments?`,
			answer: `${sportName} tournaments are broadcast on various sports networks, streaming platforms, and official tournament websites. Many events offer both free and premium viewing options for fans worldwide.`
		},
		{
			question: `What makes ${sportName.toLowerCase()} competitive?`,
			answer: `${sportName} competition requires exceptional skill, training, mental fortitude, and strategic thinking. Athletes dedicate years to perfecting their techniques and competing at increasingly higher levels of competition.`
		}
	];
</script>

<svelte:head>
	<title>Complete Guide to {sportName} Tournaments | Tournaments.com</title>
	<meta name="description" content="Comprehensive guide to {sportName.toLowerCase()} tournaments, athletes, history, and how competitions work. Everything you need to know about professional {sportName.toLowerCase()}.">
	<meta name="keywords" content="{sportName.toLowerCase()}, tournaments, {sportName.toLowerCase()} guide, athletes, competitions, professional {sportName.toLowerCase()}">
	
	<!-- Structured Data - FAQPage Schema -->
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "FAQPage",
			"mainEntity": faqs.map(faq => ({
				"@type": "Question",
				"name": faq.question,
				"acceptedAnswer": {
					"@type": "Answer",
					"text": faq.answer
				}
			}))
		})}
	</script>
	
	<!-- Sport-specific structured data -->
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "Article",
			"headline": `Complete Guide to ${sportName} Tournaments`,
			"description": sport.intro.substring(0, 200) + "...",
			"author": {
				"@type": "Organization",
				"name": "Tournaments.com"
			},
			"publisher": {
				"@type": "Organization",
				"name": "Tournaments.com"
			},
			"datePublished": "2025-02-08",
			"dateModified": "2025-02-08",
			"mainEntityOfPage": {
				"@type": "WebPage",
				"@id": `https://tournaments.com/${sport.sport}/guide`
			}
		})}
	</script>
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
	<div class="absolute inset-0 bg-black/20"></div>
	<div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 max-w-7xl">
		<div class="max-w-4xl">
			<nav class="mb-6">
				<ol class="flex items-center space-x-2 text-sm text-red-200">
					<li><a href="/" class="hover:text-white">Home</a></li>
					<li><span>›</span></li>
					<li><a href="/guides" class="hover:text-white">Guides</a></li>
					<li><span>›</span></li>
					<li class="text-white">{sportName}</li>
				</ol>
			</nav>
			
			<h1 class="text-4xl lg:text-6xl font-black mb-6 leading-tight">
				Complete Guide to <br>
				<span class="text-yellow-300">{sportName} Tournaments</span>
			</h1>
			
			<p class="text-xl lg:text-2xl text-red-100 mb-8 leading-relaxed max-w-3xl">
				{sport.title.split(' - ')[1] || `Professional ${sportName} competition at its finest`}
			</p>
			
			<div class="flex flex-wrap gap-4">
				<a 
					href="/{sport.sport}/tournaments" 
					class="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
				>
					View Tournaments
				</a>
				<a 
					href="/athletes?game={sportName}" 
					class="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
				>
					Top Athletes
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Quick Stats -->
{#if athletes.length > 0}
<section class="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
			<div class="text-center">
				<div class="text-3xl lg:text-4xl font-black text-red-600 dark:text-red-500">
					{formatNumber(athletes.length)}+
				</div>
				<div class="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">Top Athletes</div>
			</div>
			<div class="text-center">
				<div class="text-3xl lg:text-4xl font-black text-red-600 dark:text-red-500">
					{formatNumber(tournaments.length)}+
				</div>
				<div class="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">Active Tournaments</div>
			</div>
			<div class="text-center">
				<div class="text-3xl lg:text-4xl font-black text-red-600 dark:text-red-500">
					{formatCurrency(athletes.reduce((sum, a) => sum + (a.total_winnings || 0), 0))}
				</div>
				<div class="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">Total Prize Money</div>
			</div>
			<div class="text-center">
				<div class="text-3xl lg:text-4xl font-black text-red-600 dark:text-red-500">
					{new Date().getFullYear()}
				</div>
				<div class="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">Current Season</div>
			</div>
		</div>
	</div>
</section>
{/if}

<!-- Main Content -->
<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
	<div class="lg:grid lg:grid-cols-12 lg:gap-12">
		
		<!-- Main Article Content -->
		<article class="lg:col-span-8">
			
			<!-- Introduction -->
			<section class="prose prose-lg dark:prose-invert max-w-none mb-12">
				<div class="text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
					{#each sport.intro.split('\n\n') as paragraph}
						<p>{paragraph}</p>
					{/each}
				</div>
			</section>

			<!-- How Tournaments Work -->
			<section class="mb-12">
				<h2 class="text-3xl font-black text-gray-900 dark:text-white mb-6">
					How {sportName} Tournaments Work
				</h2>
				
				<div class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
					<div class="grid md:grid-cols-2 gap-8">
						<div>
							<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Tournament Format</h3>
							<ul class="space-y-3 text-gray-700 dark:text-gray-300">
								<li class="flex items-start">
									<span class="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
									Qualification rounds determine entry to main events
								</li>
								<li class="flex items-start">
									<span class="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
									Elimination brackets or round-robin group stages
								</li>
								<li class="flex items-start">
									<span class="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
									Championship finals determine ultimate winners
								</li>
								<li class="flex items-start">
									<span class="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
									Prize money distributed based on final placement
								</li>
							</ul>
						</div>
						
						<div>
							<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Competition Structure</h3>
							<ul class="space-y-3 text-gray-700 dark:text-gray-300">
								<li class="flex items-start">
									<span class="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
									Professional leagues and sanctioned events
								</li>
								<li class="flex items-start">
									<span class="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
									National and international championships
								</li>
								<li class="flex items-start">
									<span class="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
									Ranking points system for athlete standings
								</li>
								<li class="flex items-start">
									<span class="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
									Seasonal and year-long competitive circuits
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			<!-- Top Athletes Section -->
			{#if athletes.length > 0}
			<section class="mb-12">
				<div class="flex items-center justify-between mb-6">
					<h2 class="text-3xl font-black text-gray-900 dark:text-white">
						Top {sportName} Athletes
					</h2>
					<a 
						href="/athletes?game={sportName}" 
						class="text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 font-semibold"
					>
						View All →
					</a>
				</div>
				
				<div class="grid md:grid-cols-2 gap-6">
					{#each athletes.slice(0, 6) as athlete}
						<a 
							href="/athletes/{athlete.slug || athlete.id}" 
							class="block bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow group"
						>
							<div class="flex items-start space-x-4">
								{#if athlete.avatar_url}
									<img 
										src={athlete.avatar_url} 
										alt={athlete.display_name || athlete.player_name}
										class="w-16 h-16 rounded-full object-cover bg-gray-200 dark:bg-gray-700"
									/>
								{:else}
									<div class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
										<span class="text-xl font-bold text-red-600 dark:text-red-500">
											{(athlete.display_name || athlete.player_name || '').charAt(0)}
										</span>
									</div>
								{/if}
								
								<div class="flex-1">
									<h3 class="font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
										{athlete.display_name || athlete.player_name}
									</h3>
									<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
										{athlete.team_name || 'Professional Athlete'}
									</p>
									
									<div class="grid grid-cols-2 gap-4 text-sm">
										<div>
											<span class="text-gray-500 dark:text-gray-400">Winnings:</span>
											<span class="font-semibold text-gray-900 dark:text-white block">
												{formatCurrency(athlete.total_winnings || 0)}
											</span>
										</div>
										<div>
											<span class="text-gray-500 dark:text-gray-400">Wins:</span>
											<span class="font-semibold text-gray-900 dark:text-white block">
												{athlete.total_wins || 0}
											</span>
										</div>
									</div>
								</div>
							</div>
						</a>
					{/each}
				</div>
			</section>
			{/if}

			<!-- Current Season Overview -->
			<section class="mb-12">
				<h2 class="text-3xl font-black text-gray-900 dark:text-white mb-6">
					Current Season Overview
				</h2>
				
				<div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
					<div class="grid lg:grid-cols-2 gap-8">
						<div>
							<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
								{new Date().getFullYear()} Season Highlights
							</h3>
							<ul class="space-y-3 text-gray-700 dark:text-gray-300">
								<li class="flex items-start">
									<span class="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
									Record-breaking prize pools across major tournaments
								</li>
								<li class="flex items-start">
									<span class="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
									Increased global participation and viewership
								</li>
								<li class="flex items-start">
									<span class="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
									New competitive formats and tournament structures
								</li>
								<li class="flex items-start">
									<span class="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
									Emerging talent challenging established champions
								</li>
							</ul>
						</div>
						
						<div>
							<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
								Upcoming Events
							</h3>
							{#if tournaments.length > 0}
								<div class="space-y-3">
									{#each tournaments.slice(0, 3) as tournament}
										<div class="flex justify-between items-center py-2 border-b border-blue-200 dark:border-blue-700">
											<div>
												<span class="font-medium text-gray-900 dark:text-white">{tournament.name}</span>
												<span class="block text-sm text-gray-600 dark:text-gray-400">
													{new Date(tournament.date).toLocaleDateString()}
												</span>
											</div>
											<span class="text-sm font-semibold text-blue-600 dark:text-blue-400">
												{tournament.status}
											</span>
										</div>
									{/each}
								</div>
							{:else}
								<p class="text-gray-600 dark:text-gray-400">Check back for upcoming tournament announcements.</p>
							{/if}
						</div>
					</div>
				</div>
			</section>

			<!-- History of Major Tournaments -->
			<section class="mb-12">
				<h2 class="text-3xl font-black text-gray-900 dark:text-white mb-6">
					History of Major {sportName} Tournaments
				</h2>
				
				<div class="prose prose-lg dark:prose-invert max-w-none">
					<p class="text-gray-700 dark:text-gray-300 mb-6">
						{sportName} has a rich competitive history spanning decades of professional tournament play. 
						The sport's major tournaments have evolved from small local competitions to global spectacles 
						that attract millions of viewers and feature substantial prize pools.
					</p>
					
					<div class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
						<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Tournament Evolution</h3>
						<div class="space-y-4 text-gray-700 dark:text-gray-300">
							<p>
								Early {sportName.toLowerCase()} competitions were primarily local and regional events. 
								As the sport gained popularity, national governing bodies established standardized rules 
								and organized larger-scale tournaments that brought together the best competitors.
							</p>
							<p>
								The modern era of {sportName.toLowerCase()} tournaments began with the introduction of 
								professional circuits, television coverage, and significant sponsorship deals. This 
								transformation elevated the sport's profile and created opportunities for athletes 
								to pursue competitive careers.
							</p>
							<p>
								Today's {sportName.toLowerCase()} tournament landscape features a diverse array of 
								competitions, from grassroots events that provide entry points for newcomers to 
								elite championships that determine world rankings and distribute life-changing prize money.
							</p>
						</div>
					</div>
				</div>
			</section>

			<!-- FAQ Section -->
			<section class="mb-12">
				<h2 class="text-3xl font-black text-gray-900 dark:text-white mb-8">
					Frequently Asked Questions
				</h2>
				
				<div class="space-y-4">
					{#each faqs as faq, index}
						<details class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 group">
							<summary class="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 rounded-lg transition-colors">
								<div class="flex items-center justify-between">
									<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
										{faq.question}
									</h3>
									<svg class="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
									</svg>
								</div>
							</summary>
							<div class="px-6 pb-6">
								<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
									{faq.answer}
								</p>
							</div>
						</details>
					{/each}
				</div>
			</section>
		</article>

		<!-- Sidebar -->
		<aside class="lg:col-span-4">
			
			<!-- Related Links -->
			<div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
				<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
					{sportName} Resources
				</h3>
				<nav class="space-y-3">
					<a 
						href="/{sport.sport}/tournaments" 
						class="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
					>
						<div class="flex items-center">
							<span class="text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-500 font-medium">
								{sportName} Tournaments
							</span>
							<svg class="w-4 h-4 ml-auto text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
							</svg>
						</div>
					</a>
					<a 
						href="/athletes?game={sportName}" 
						class="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
					>
						<div class="flex items-center">
							<span class="text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-500 font-medium">
								Top {sportName} Athletes
							</span>
							<svg class="w-4 h-4 ml-auto text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
							</svg>
						</div>
					</a>
					<a 
						href="/{sport.sport}/schedule" 
						class="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
					>
						<div class="flex items-center">
							<span class="text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-500 font-medium">
								{sportName} Schedule
							</span>
							<svg class="w-4 h-4 ml-auto text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
							</svg>
						</div>
					</a>
					<a 
						href="/whats-on" 
						class="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
					>
						<div class="flex items-center">
							<span class="text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-500 font-medium">
								What's On Today
							</span>
							<svg class="w-4 h-4 ml-auto text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
							</svg>
						</div>
					</a>
				</nav>
			</div>

			<!-- Recent Articles -->
			{#if articles.length > 0}
			<div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-xl font-bold text-gray-900 dark:text-white">
						Latest {sportName} News
					</h3>
					<a 
						href="/articles?category={sport.sport}" 
						class="text-sm text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 font-medium"
					>
						View All
					</a>
				</div>
				<div class="space-y-4">
					{#each articles.slice(0, 3) as article}
						<article class="group">
							<a href="/articles/{article.slug}" class="block">
								<h4 class="font-medium text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors text-sm mb-2">
									{article.title}
								</h4>
								<p class="text-xs text-gray-600 dark:text-gray-400">
									{new Date(article.published_at).toLocaleDateString()}
								</p>
							</a>
						</article>
					{/each}
				</div>
			</div>
			{/if}
		</aside>
	</div>
</div>