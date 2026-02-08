<script lang="ts">
	import { authors } from '$lib/data/authors';
	import PageSEO from '$lib/components/seo/PageSEO.svelte';

	const sportLabels: Record<string, string> = {
		tennis: 'Tennis', golf: 'Golf', soccer: 'Soccer', nfl: 'NFL',
		nba: 'NBA', mma: 'MMA', boxing: 'Boxing', mlb: 'MLB',
		nhl: 'NHL', cricket: 'Cricket', rugby: 'Rugby', esports: 'Esports',
		racing: 'Motorsport', olympics: 'Olympics'
	};
</script>

<PageSEO
	title="Our Editorial Team"
	description="Meet the sports journalists and editors behind Tournaments.com. Our team of experienced writers covers every major sport worldwide."
/>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<!-- Hero -->
	<div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
			<h1 class="text-4xl sm:text-5xl font-black mb-4">Our Editorial Team</h1>
			<p class="text-xl text-gray-300 max-w-3xl">
				Experienced sports journalists covering every major league and tournament worldwide. 
				Our team brings decades of combined experience from sidelines, press boxes, and arenas across the globe.
			</p>
		</div>
	</div>

	<!-- Team Grid -->
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
			{#each authors as author}
				<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300">
					<div class="bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-center">
						<img 
							src={author.avatar} 
							alt={author.name} 
							class="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-white/20"
						/>
						<h2 class="text-lg font-bold text-white">{author.name}</h2>
						<p class="text-sm text-red-400 font-medium">{author.role}</p>
					</div>
					<div class="p-5">
						<p class="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{author.bio}</p>
						<div class="flex flex-wrap gap-1.5">
							{#each author.sports as sport}
								<span class="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2.5 py-1 rounded-full font-medium">
									{sportLabels[sport] || sport}
								</span>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Editorial Standards -->
		<div class="mt-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 sm:p-12">
			<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Editorial Standards</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div>
					<div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mb-4">
						<svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h3 class="font-semibold text-gray-900 dark:text-white mb-2">Accuracy First</h3>
					<p class="text-sm text-gray-600 dark:text-gray-400">Every article is fact-checked against official sources. We correct errors promptly and transparently.</p>
				</div>
				<div>
					<div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
						<svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h3 class="font-semibold text-gray-900 dark:text-white mb-2">Timely Coverage</h3>
					<p class="text-sm text-gray-600 dark:text-gray-400">Breaking news, live results, and in-depth analysis delivered when it matters most.</p>
				</div>
				<div>
					<div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
						<svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
						</svg>
					</div>
					<h3 class="font-semibold text-gray-900 dark:text-white mb-2">Global Perspective</h3>
					<p class="text-sm text-gray-600 dark:text-gray-400">Our team covers sports across continents, bringing diverse viewpoints to every story.</p>
				</div>
			</div>
		</div>
	</div>
</div>
