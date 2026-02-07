<script lang="ts">
	import { page } from '$app/stores';
	
	export let data;
	
	$: result = data?.result;
	$: notFound = !result;
	
	function formatContent(content: string) {
		return content.split('\n\n').filter(p => p.trim());
	}

	function formatNumber(num: number) {
		return num?.toLocaleString() || 'N/A';
	}
</script>

<svelte:head>
	{#if result}
		<title>{result.title} | Tournaments.com</title>
		<meta name="description" content={result.description} />
		<meta property="og:title" content={result.title} />
		<meta property="og:description" content={result.description} />
		<meta property="og:type" content="article" />
		<meta property="og:url" content="https://www.tournaments.com/results/{result.slug}" />
		
		<!-- Structured Data -->
		{@html `<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "SportsEvent",
			"name": "${result.event}",
			"description": "${result.description}",
			"startDate": "${result.date}",
			"location": {
				"@type": "Place",
				"name": "${result.location}"
			},
			"competitor": [
				{
					"@type": "SportsTeam",
					"name": "${result.winner.name}"
				},
				{
					"@type": "SportsTeam", 
					"name": "${result.runnerUp.name}"
				}
			],
			"winner": {
				"@type": "SportsTeam",
				"name": "${result.winner.name}"
			}
		}
		</script>`}
	{/if}
</svelte:head>

<div class="min-h-screen bg-white dark:bg-gray-900">
	{#if notFound}
		<div class="container mx-auto px-4 py-20 text-center max-w-4xl">
			<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Results Not Found</h1>
			<p class="text-gray-600 dark:text-gray-400 mb-8">The event results you're looking for don't exist yet.</p>
			<a href="/results" class="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
				← Browse All Results
			</a>
		</div>
	{:else if result}
		<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
			<!-- Breadcrumb -->
			<nav class="mb-8" aria-label="Breadcrumb">
				<ol class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
					<li><a href="/" class="hover:text-red-600 dark:hover:text-red-400 transition-colors">Home</a></li>
					<li class="text-gray-400">/</li>
					<li><a href="/results" class="hover:text-red-600 dark:hover:text-red-400 transition-colors">Results</a></li>
					<li class="text-gray-400">/</li>
					<li class="text-gray-900 dark:text-white font-medium">{result.event}</li>
				</ol>
			</nav>

			<div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
				<!-- Main Content -->
				<main class="lg:col-span-3">
					<!-- Header -->
					<header class="mb-12">
						<div class="flex items-center gap-3 mb-6">
							<span class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide">
								Results
							</span>
							<span class="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-lg text-sm font-medium">
								{result.year}
							</span>
						</div>
						
						<h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight mb-6">
							{result.title}
						</h1>
						
						<p class="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
							{result.description}
						</p>

						<!-- Event Details -->
						<div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
							<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
								<div>
									<h3 class="font-semibold text-gray-900 dark:text-white mb-2">Date</h3>
									<p class="text-gray-600 dark:text-gray-400">{result.date}</p>
								</div>
								<div>
									<h3 class="font-semibold text-gray-900 dark:text-white mb-2">Location</h3>
									<p class="text-gray-600 dark:text-gray-400 text-sm">{result.location}</p>
								</div>
								<div>
									<h3 class="font-semibold text-gray-900 dark:text-white mb-2">Format</h3>
									<p class="text-gray-600 dark:text-gray-400 text-sm">{result.format}</p>
								</div>
								{#if result.attendance}
									<div>
										<h3 class="font-semibold text-gray-900 dark:text-white mb-2">Attendance</h3>
										<p class="text-gray-600 dark:text-gray-400">{formatNumber(result.attendance)}</p>
									</div>
								{/if}
							</div>
						</div>
					</header>

					<!-- Final Score/Result -->
					<section class="mb-12">
						<h2 class="text-3xl font-black text-gray-900 dark:text-white mb-8">Final Result</h2>
						<div class="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-8 border-2 border-green-200 dark:border-green-800">
							<!-- Winner -->
							<div class="text-center mb-8">
								<div class="inline-flex items-center gap-3 bg-green-600 text-white px-6 py-3 rounded-full font-bold text-lg mb-4">
									<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
									</svg>
									Champion
								</div>
								<h3 class="text-4xl font-black text-green-900 dark:text-green-100 mb-2">{result.winner.name}</h3>
								{#if result.winner.country}
									<p class="text-green-700 dark:text-green-300 font-medium">{result.winner.country}</p>
								{/if}
							</div>

							<!-- Score -->
							<div class="text-center mb-8">
								<div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-green-200 dark:border-green-700">
									<h4 class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">Final Score</h4>
									<p class="text-2xl font-bold text-gray-900 dark:text-white">{result.score}</p>
								</div>
							</div>

							<!-- Runner-up -->
							<div class="text-center">
								<div class="inline-flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-full font-bold text-sm mb-3">
									Runner-up
								</div>
								<h3 class="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-1">{result.runnerUp.name}</h3>
								{#if result.runnerUp.country}
									<p class="text-gray-600 dark:text-gray-400">{result.runnerUp.country}</p>
								{/if}
							</div>
						</div>
					</section>

					<!-- Key Moments -->
					<section class="mb-12">
						<h2 class="text-3xl font-black text-gray-900 dark:text-white mb-8">Key Moments</h2>
						<div class="space-y-4">
							{#each result.keyMoments as moment, index}
								<div class="flex gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
									<div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm flex-shrink-0">
										{index + 1}
									</div>
									<div>
										<h3 class="font-bold text-gray-900 dark:text-white mb-2">{moment.time}</h3>
										<p class="text-gray-700 dark:text-gray-300">{moment.description}</p>
									</div>
								</div>
							{/each}
						</div>
					</section>

					<!-- Key Participants -->
					<section class="mb-12">
						<h2 class="text-3xl font-black text-gray-900 dark:text-white mb-8">Key Participants</h2>
						<div class="grid md:grid-cols-2 gap-6">
							{#each result.participants as participant}
								<div class="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
									<h3 class="text-xl font-bold text-blue-900 dark:text-blue-100 mb-2">{participant.name}</h3>
									<p class="text-blue-700 dark:text-blue-300 font-medium mb-3">{participant.role}</p>
									{#if participant.stats}
										<p class="text-sm text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg">
											{participant.stats}
										</p>
									{/if}
								</div>
							{/each}
						</div>
					</section>

					<!-- Prize Information -->
					{#if result.prize}
						<section class="mb-12">
							<h2 class="text-3xl font-black text-gray-900 dark:text-white mb-6">Prize Information</h2>
							<div class="bg-gradient-to-r from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800">
								<div class="flex items-center gap-3">
									<svg class="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
									</svg>
									<div>
										<h3 class="font-bold text-yellow-900 dark:text-yellow-100 text-lg">Prize Money</h3>
										<p class="text-yellow-700 dark:text-yellow-300">{result.prize}</p>
									</div>
								</div>
							</div>
						</section>
					{/if}

					<!-- Main Article -->
					<article class="prose prose-lg dark:prose-invert max-w-none mb-12">
						<h2 class="text-3xl font-black text-gray-900 dark:text-white mb-8">Complete Analysis</h2>
						{#each formatContent(result.content) as paragraph}
							{#if paragraph.startsWith('**') && paragraph.endsWith('**')}
								<h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-6">
									{paragraph.replace(/\*\*/g, '')}
								</h3>
							{:else}
								<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{@html paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
							{/if}
						{/each}
					</article>

					<!-- Significance -->
					<section class="mb-12">
						<h2 class="text-3xl font-black text-gray-900 dark:text-white mb-6">Historical Significance</h2>
						<div class="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
							<p class="text-lg text-red-900 dark:text-red-100 leading-relaxed">{result.significance}</p>
						</div>
					</section>
				</main>

				<!-- Sidebar -->
				<aside class="lg:col-span-1 space-y-8">
					<!-- Event Summary -->
					<div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 sticky top-8">
						<h3 class="font-bold text-gray-900 dark:text-white mb-6 text-lg pb-3 border-b-2 border-gray-200 dark:border-gray-700">
							Event Summary
						</h3>
						<div class="space-y-4 text-sm">
							<div>
								<h4 class="font-semibold text-gray-900 dark:text-white mb-1">Event</h4>
								<p class="text-gray-600 dark:text-gray-400">{result.event}</p>
							</div>
							<div>
								<h4 class="font-semibold text-gray-900 dark:text-white mb-1">Winner</h4>
								<p class="text-gray-600 dark:text-gray-400">{result.winner.name}</p>
							</div>
							<div>
								<h4 class="font-semibold text-gray-900 dark:text-white mb-1">Score</h4>
								<p class="text-gray-600 dark:text-gray-400 text-xs">{result.score}</p>
							</div>
							<div>
								<h4 class="font-semibold text-gray-900 dark:text-white mb-1">Date</h4>
								<p class="text-gray-600 dark:text-gray-400">{result.date}</p>
							</div>
							{#if result.attendance}
								<div>
									<h4 class="font-semibold text-gray-900 dark:text-white mb-1">Attendance</h4>
									<p class="text-gray-600 dark:text-gray-400">{formatNumber(result.attendance)}</p>
								</div>
							{/if}
						</div>
					</div>

					<!-- Related Results -->
					<div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700">
						<h3 class="font-bold text-gray-900 dark:text-white mb-6 text-lg pb-3 border-b-2 border-gray-200 dark:border-gray-700">
							Related Results
						</h3>
						<div class="space-y-4">
							<a href="/results/super-bowl-2024" class="block group">
								<h4 class="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
									Super Bowl 2024
								</h4>
								<p class="text-sm text-gray-600 dark:text-gray-400">NFL Championship</p>
							</a>
							<a href="/results/nba-finals-2024" class="block group">
								<h4 class="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
									NBA Finals 2024
								</h4>
								<p class="text-sm text-gray-600 dark:text-gray-400">Basketball Championship</p>
							</a>
							<a href="/results/world-series-2024" class="block group">
								<h4 class="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
									World Series 2024
								</h4>
								<p class="text-sm text-gray-600 dark:text-gray-400">MLB Championship</p>
							</a>
						</div>
					</div>

					<!-- Share Results -->
					<div class="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-6 text-white">
						<h3 class="font-bold mb-4 text-lg">Share These Results</h3>
						<div class="flex gap-3">
							<button class="flex-1 bg-white/20 hover:bg-white/30 rounded-lg py-2 px-3 text-sm font-medium transition-colors">
								Twitter
							</button>
							<button class="flex-1 bg-white/20 hover:bg-white/30 rounded-lg py-2 px-3 text-sm font-medium transition-colors">
								Facebook
							</button>
						</div>
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