<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	
	export let data;
	
	$: guide = data?.guide;
	$: notFound = !guide;
	
	function formatContent(content: string) {
		return content.split('\n\n').filter(p => p.trim());
	}
</script>

<svelte:head>
	{#if guide}
		<title>{guide.title} | Tournaments.com</title>
		<meta name="description" content={guide.description} />
		<meta property="og:title" content={guide.title} />
		<meta property="og:description" content={guide.description} />
		<meta property="og:type" content="article" />
		<meta property="og:url" content="https://www.tournaments.com/guides/how-to-watch/{guide.slug}" />
		
		<!-- Structured Data -->
		{@html `<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "HowTo",
			"name": "${guide.title}",
			"description": "${guide.description}",
			"image": "https://www.tournaments.com/og-image.png",
			"totalTime": "PT5M",
			"estimatedCost": {
				"@type": "MonetaryAmount",
				"currency": "USD",
				"value": "0"
			},
			"step": [
				{
					"@type": "HowToStep",
					"name": "Choose Your Network",
					"text": "Find the right TV network or streaming service for ${guide.event}",
					"url": "https://www.tournaments.com/guides/how-to-watch/${guide.slug}#networks"
				},
				{
					"@type": "HowToStep", 
					"name": "Check the Schedule",
					"text": "Verify game times and dates for ${guide.event}",
					"url": "https://www.tournaments.com/guides/how-to-watch/${guide.slug}#schedule"
				},
				{
					"@type": "HowToStep",
					"name": "Set Up Streaming",
					"text": "Configure your preferred streaming service to watch ${guide.event}",
					"url": "https://www.tournaments.com/guides/how-to-watch/${guide.slug}#streaming"
				}
			]
		}
		</script>`}
	{/if}
</svelte:head>

<div class="min-h-screen bg-white dark:bg-gray-900">
	{#if notFound}
		<div class="container mx-auto px-4 py-20 text-center max-w-4xl">
			<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Guide Not Found</h1>
			<p class="text-gray-600 dark:text-gray-400 mb-8">The viewing guide you're looking for doesn't exist yet.</p>
			<a href="/guides" class="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
				← Browse All Guides
			</a>
		</div>
	{:else if guide}
		<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
			<!-- Breadcrumb -->
			<nav class="mb-8" aria-label="Breadcrumb">
				<ol class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
					<li><a href="/" class="hover:text-red-600 dark:hover:text-red-400 transition-colors">Home</a></li>
					<li class="text-gray-400">/</li>
					<li><a href="/guides" class="hover:text-red-600 dark:hover:text-red-400 transition-colors">Guides</a></li>
					<li class="text-gray-400">/</li>
					<li><a href="/guides/how-to-watch" class="hover:text-red-600 dark:hover:text-red-400 transition-colors">How to Watch</a></li>
					<li class="text-gray-400">/</li>
					<li class="text-gray-900 dark:text-white font-medium">{guide.event}</li>
				</ol>
			</nav>

			<div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
				<!-- Main Content -->
				<main class="lg:col-span-2">
					<!-- Header -->
					<header class="mb-8">
						<div class="flex items-center gap-3 mb-4">
							<span class="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold uppercase tracking-wide">
								Viewing Guide
							</span>
							<span class="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-lg text-sm font-medium capitalize">
								{guide.type}
							</span>
						</div>
						
						<h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight mb-4">
							{guide.title}
						</h1>
						
						<p class="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
							{guide.description}
						</p>
					</header>

					<!-- Quick Info Cards -->
					<div class="grid md:grid-cols-2 gap-6 mb-12">
						<!-- Networks Card -->
						<div class="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
							<h3 class="font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
								</svg>
								TV Networks
							</h3>
							<div class="space-y-2">
								{#each guide.networks as network}
									<div class="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 text-gray-900 dark:text-white font-medium border border-blue-200 dark:border-gray-700">
										{network}
									</div>
								{/each}
							</div>
						</div>

						<!-- Streaming Card -->
						<div class="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
							<h3 class="font-bold text-purple-900 dark:text-purple-100 mb-4 flex items-center gap-2">
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
								</svg>
								Streaming Services
							</h3>
							<div class="space-y-2">
								{#each guide.streaming as service}
									<div class="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 text-gray-900 dark:text-white font-medium border border-purple-200 dark:border-gray-700">
										{service}
									</div>
								{/each}
							</div>
						</div>
					</div>

					<!-- Schedule Info -->
					<div class="bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 mb-12 border border-green-200 dark:border-green-800">
						<h3 class="font-bold text-green-900 dark:text-green-100 mb-6 text-xl flex items-center gap-2">
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							Schedule Information
						</h3>
						<div class="grid md:grid-cols-3 gap-6">
							<div>
								<h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">Dates</h4>
								<p class="text-green-700 dark:text-green-300">{guide.schedule.dates}</p>
							</div>
							<div>
								<h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">Times</h4>
								<p class="text-green-700 dark:text-green-300">{guide.schedule.times}</p>
							</div>
							<div>
								<h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">Time Zone</h4>
								<p class="text-green-700 dark:text-green-300">{guide.schedule.timezone}</p>
							</div>
						</div>
					</div>

					<!-- What You Need to Know -->
					<section class="mb-12">
						<h2 class="text-3xl font-black text-gray-900 dark:text-white mb-6">What You Need to Know</h2>
						<div class="space-y-4">
							{#each guide.whatToKnow as fact, index}
								<div class="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border-l-4 border-red-600">
									<div class="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
										{index + 1}
									</div>
									<p class="text-gray-700 dark:text-gray-300 leading-relaxed">{fact}</p>
								</div>
							{/each}
						</div>
					</section>

					<!-- Main Content -->
					<article class="prose prose-lg dark:prose-invert max-w-none mb-12">
						{#each formatContent(guide.content) as paragraph}
							{#if paragraph.startsWith('**') && paragraph.endsWith('**')}
								<h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
									{paragraph.replace(/\*\*/g, '')}
								</h3>
							{:else}
								<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{@html paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
							{/if}
						{/each}
					</article>

					<!-- FAQ Section -->
					<section class="mb-12">
						<h2 class="text-3xl font-black text-gray-900 dark:text-white mb-8">Frequently Asked Questions</h2>
						<div class="space-y-6">
							{#each guide.faq as faqItem, index}
								<div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700 transition-colors">
									<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-start gap-3">
										<span class="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
											Q
										</span>
										{faqItem.question}
									</h3>
									<div class="ml-11">
										<p class="text-gray-700 dark:text-gray-300 leading-relaxed">{faqItem.answer}</p>
									</div>
								</div>
							{/each}
						</div>
					</section>
				</main>

				<!-- Sidebar -->
				<aside class="lg:col-span-1 space-y-8">
					<!-- Quick Access Card -->
					<div class="bg-gradient-to-br from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800 sticky top-8">
						<h3 class="font-bold text-red-900 dark:text-red-100 mb-4 text-lg">Quick Access</h3>
						<div class="space-y-3">
							<a href="#networks" class="block w-full text-left bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-900 dark:text-white px-4 py-3 rounded-lg font-medium transition-colors border border-red-200 dark:border-gray-700">
								📺 TV Networks
							</a>
							<a href="#streaming" class="block w-full text-left bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-900 dark:text-white px-4 py-3 rounded-lg font-medium transition-colors border border-red-200 dark:border-gray-700">
								📱 Streaming Options
							</a>
							<a href="#schedule" class="block w-full text-left bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-900 dark:text-white px-4 py-3 rounded-lg font-medium transition-colors border border-red-200 dark:border-gray-700">
								⏰ Schedule Info
							</a>
							<a href="#faq" class="block w-full text-left bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-900 dark:text-white px-4 py-3 rounded-lg font-medium transition-colors border border-red-200 dark:border-gray-700">
								❓ FAQ
							</a>
						</div>
					</div>

					<!-- Related Guides -->
					<div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700">
						<h3 class="font-bold text-gray-900 dark:text-white mb-6 text-lg pb-3 border-b-2 border-gray-200 dark:border-gray-700">
							More Viewing Guides
						</h3>
						<div class="space-y-4">
							<a href="/guides/how-to-watch/super-bowl" class="block group">
								<h4 class="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
									How to Watch Super Bowl
								</h4>
								<p class="text-sm text-gray-600 dark:text-gray-400">NFL Championship Game</p>
							</a>
							<a href="/guides/how-to-watch/march-madness" class="block group">
								<h4 class="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
									How to Watch March Madness
								</h4>
								<p class="text-sm text-gray-600 dark:text-gray-400">NCAA Basketball Tournament</p>
							</a>
							<a href="/guides/how-to-watch/world-series" class="block group">
								<h4 class="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
									How to Watch World Series
								</h4>
								<p class="text-sm text-gray-600 dark:text-gray-400">MLB Championship</p>
							</a>
						</div>
					</div>

					<!-- Newsletter Signup -->
					<div class="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-6 text-white">
						<h3 class="font-bold mb-4 text-lg">Never Miss a Game</h3>
						<p class="text-blue-100 mb-4 text-sm">Get viewing schedules and streaming updates delivered to your inbox.</p>
						<form class="space-y-3">
							<input 
								type="email" 
								placeholder="Enter your email"
								class="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
							/>
							<button 
								type="submit"
								class="w-full bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
							>
								Subscribe
							</button>
						</form>
					</div>
				</aside>
			</div>
		</div>
	{/if}
</div>

<style>
	:global(.prose h3) {
		@apply text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4;
	}
	
	:global(.prose p) {
		@apply text-gray-700 dark:text-gray-300 leading-relaxed mb-6;
	}
	
	:global(.prose strong) {
		@apply font-bold text-gray-900 dark:text-white;
	}
</style>