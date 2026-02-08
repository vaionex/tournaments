<script lang="ts">
	import { PageSEO } from '$lib/components/seo';
	import { formatSportName } from '$lib/utils/sport-name';
	
	export let data: any;
	
	$: sportCounts = data?.sportCounts || {};
	$: sportGroups = data?.sportGroups || {};

	const sportIcons: Record<string, string> = {
		tennis: '🎾', golf: '⛳', soccer: '⚽', nfl: '🏈',
		nba: '🏀', mlb: '⚾', racing: '🏎️', mma: '🥊',
		boxing: '🥊', esports: '🎮', cricket: '🏏', rugby: '🏉',
		nhl: '🏒', olympics: '🏅'
	};

	$: sortedSports = Object.entries(sportCounts)
		.sort(([,a], [,b]) => (b as number) - (a as number));
	
	$: totalAthletes = Object.values(sportCounts).reduce((a: number, b: any) => a + b, 0);
</script>

<PageSEO 
	title="Athletes — Professional Player Profiles & Stats"
	description="Browse {totalAthletes}+ professional athlete profiles with stats, career records, and biographies across {sortedSports.length} sports on Tournaments.com."
/>

<div class="min-h-screen bg-gray-950 text-white">
	<div class="container mx-auto px-3 sm:px-6 lg:px-8 max-w-7xl py-8">
		<nav class="text-sm text-gray-400 mb-6">
			<a href="/" class="hover:text-white">Home</a>
			<span class="mx-2">/</span>
			<span class="text-white">Athletes</span>
		</nav>

		<h1 class="text-4xl font-bold mb-2">Professional Athletes</h1>
		<p class="text-gray-400 mb-10">{totalAthletes} athlete profiles across {sortedSports.length} sports — stats, records, and biographies</p>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each sortedSports as [sport, count]}
			<a href="/athletes/{sport}" class="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-colors group">
				<div class="flex items-center justify-between mb-4">
					<div class="flex items-center gap-3">
						<span class="text-2xl">{sportIcons[sport] || '🏆'}</span>
						<h2 class="text-xl font-bold group-hover:text-blue-400 transition-colors">{formatSportName(sport)}</h2>
					</div>
					<span class="text-sm text-gray-500">{count} athletes</span>
				</div>
				{#if sportGroups[sport]}
				<div class="space-y-2">
					{#each sportGroups[sport] as athlete}
					<div class="text-sm text-gray-400 flex justify-between">
						<span class="truncate">{athlete.display_name}</span>
						<span class="text-gray-600 ml-2 flex-shrink-0">{athlete.country}</span>
					</div>
					{/each}
				</div>
				{/if}
			</a>
			{/each}
		</div>
	</div>
</div>
