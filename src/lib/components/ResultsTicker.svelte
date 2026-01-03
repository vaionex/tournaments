<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	
	let selectedSport = 'NFL';
	let showSportDropdown = false;
	let results = [];
	
	const sports = ['NFL', 'NBA', 'MLB', 'NHL', 'NCAAF', 'Soccer', 'Tennis', 'Golf', 'Esports'];
	
	onMount(() => {
		// Simulated recent results - NFL style
		results = [
			{ id: '1', sport: 'nfl', team1: 'Steelers', team1Abbr: 'PIT', team1Slug: 'steelers', team2: 'Browns', team2Abbr: 'CLE', team2Slug: 'browns', score1: '13', score2: '10', status: 'Final' },
			{ id: '2', sport: 'nfl', team1: 'Patriots', team1Abbr: 'NE', team1Slug: 'patriots', team2: 'Jets', team2Abbr: 'NYJ', team2Slug: 'jets', score1: '42', score2: '13', status: 'Final' },
			{ id: '3', sport: 'nfl', team1: 'Saints', team1Abbr: 'NO', team1Slug: 'saints', team2: 'Titans', team2Abbr: 'TEN', team2Slug: 'titans', score1: '34', score2: '28', status: 'Final' },
			{ id: '4', sport: 'nfl', team1: 'Jaguars', team1Abbr: 'JAX', team1Slug: 'jaguars', team2: 'Colts', team2Abbr: 'IND', team2Slug: 'colts', score1: '23', score2: '17', status: 'Final' },
			{ id: '5', sport: 'nfl', team1: 'Buccaneers', team1Abbr: 'TB', team1Slug: 'buccaneers', team2: 'Dolphins', team2Abbr: 'MIA', team2Slug: 'dolphins', score1: '31', score2: '20', status: 'Final' },
			{ id: '6', sport: 'nfl', team1: 'Seahawks', team1Abbr: 'SEA', team1Slug: 'seahawks', team2: 'Panthers', team2Abbr: 'CAR', team2Slug: 'panthers', score1: '27', score2: '21', status: 'Final' },
			{ id: '7', sport: 'nfl', team1: 'Cardinals', team1Abbr: 'ARI', team1Slug: 'cardinals', team2: 'Bengals', team2Abbr: 'CIN', team2Slug: 'bengals', score1: '24', score2: '37', status: 'Final' },
			{ id: '8', sport: 'nfl', team1: 'Giants', team1Abbr: 'NYG', team1Slug: 'giants', team2: 'Raiders', team2Abbr: 'LV', team2Slug: 'raiders', score1: '34', score2: '30', status: 'Final' }
		];
		
		// Close dropdown when clicking outside
		const handleClickOutside = (e) => {
			if (!e.target.closest('.sport-dropdown')) {
				showSportDropdown = false;
			}
		};
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});
</script>

<div class="bg-white dark:bg-gray-50 border-b border-gray-200 dark:border-gray-300 sticky top-0 z-50 h-10">
	<div class="container mx-auto px-2 sm:px-4 lg:px-8 max-w-7xl h-full">
		<div class="flex items-center gap-2 sm:gap-4 h-full">
			<!-- Mobile Home Link -->
			<a 
				href="/" 
				class="sm:hidden flex-shrink-0"
			>
				<div class="relative inline-block">
					<div class="bg-red-600 px-2 py-0.5 transform -skew-x-12 shadow-sm">
						<span class="text-xs font-black text-white inline-block transform skew-x-12 tracking-tight" style="letter-spacing: -0.02em; font-style: italic;">
							T
						</span>
					</div>
				</div>
			</a>
			
			<!-- Top Events Dropdown - Hidden on mobile -->
			<div class="relative flex-shrink-0 sport-dropdown hidden sm:block">
				<button
					on:click|stopPropagation={() => showSportDropdown = !showSportDropdown}
					class="flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-900 hover:text-blue-600 dark:hover:text-blue-600 transition-colors"
				>
					<span class="hidden xs:inline">Top Events</span>
					<span class="xs:hidden">Events</span>
					<svg class="w-3 h-3 sm:w-4 sm:h-4 transition-transform {showSportDropdown ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
					</svg>
				</button>
				
				{#if showSportDropdown}
					<div class="absolute top-full left-0 mt-1 w-40 sm:w-48 bg-white dark:bg-gray-50 border border-gray-200 dark:border-gray-300 rounded shadow-lg z-50">
						{#each sports as sport}
							<button
								on:click={() => { selectedSport = sport; showSportDropdown = false; }}
								class="w-full text-left px-3 sm:px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors {
									selectedSport === sport ? 'bg-blue-50 dark:bg-blue-50 text-blue-600 dark:text-blue-600 font-semibold' : 'text-gray-900 dark:text-gray-900'
								}"
							>
								{sport}
							</button>
						{/each}
					</div>
				{/if}
			</div>
			
			<!-- Active Sport Badge -->
			<div class="px-2 sm:px-3 py-0.5 sm:py-1 bg-red-600 text-white text-[10px] sm:text-xs font-bold uppercase rounded flex-shrink-0">
				{selectedSport}
			</div>
			
			<!-- Scores Ticker -->
			<div class="flex-1 overflow-hidden relative min-w-0">
				<div class="flex gap-2 sm:gap-4 animate-scroll">
					{#each results as result}
						<button
							on:click={() => goto(`/${result.sport}/game/${result.id}`)}
							class="group flex items-center gap-1 sm:gap-2 whitespace-nowrap flex-shrink-0 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors border-r border-gray-200 dark:border-gray-300 last:border-r-0"
						>
							<span class="font-semibold text-gray-900 dark:text-gray-900 group-hover:text-blue-600 dark:group-hover:text-blue-600 transition-colors">{result.team1Abbr}</span>
							<span class="text-gray-600 dark:text-gray-600 font-bold">{result.score1}</span>
							<span class="text-gray-400 dark:text-gray-400 text-[10px] sm:text-xs">-</span>
							<span class="text-gray-600 dark:text-gray-600 font-bold">{result.score2}</span>
							<span class="font-semibold text-gray-900 dark:text-gray-900 group-hover:text-blue-600 dark:group-hover:text-blue-600 transition-colors">{result.team2Abbr}</span>
							<span class="hidden sm:inline text-xs text-gray-500 dark:text-gray-500 ml-1">{result.status}</span>
						</button>
					{/each}
					<!-- Duplicate for seamless loop -->
					{#each results as result}
						<button
							on:click={() => goto(`/${result.sport}/game/${result.id}`)}
							class="group flex items-center gap-1 sm:gap-2 whitespace-nowrap flex-shrink-0 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors border-r border-gray-200 dark:border-gray-300 last:border-r-0"
						>
							<span class="font-semibold text-gray-900 dark:text-gray-900 group-hover:text-blue-600 dark:group-hover:text-blue-600 transition-colors">{result.team1Abbr}</span>
							<span class="text-gray-600 dark:text-gray-600 font-bold">{result.score1}</span>
							<span class="text-gray-400 dark:text-gray-400 text-[10px] sm:text-xs">-</span>
							<span class="text-gray-600 dark:text-gray-600 font-bold">{result.score2}</span>
							<span class="font-semibold text-gray-900 dark:text-gray-900 group-hover:text-blue-600 dark:group-hover:text-blue-600 transition-colors">{result.team2Abbr}</span>
							<span class="hidden sm:inline text-xs text-gray-500 dark:text-gray-500 ml-1">{result.status}</span>
						</button>
					{/each}
				</div>
				
				<!-- Navigation Arrows - Hidden on very small screens -->
				<button class="hidden sm:block absolute left-0 top-0 bottom-0 px-2 bg-white dark:bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors z-10">
					<svg class="w-4 h-4 text-gray-600 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
					</svg>
				</button>
				<button class="hidden sm:block absolute right-0 top-0 bottom-0 px-2 bg-white dark:bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors z-10">
					<svg class="w-4 h-4 text-gray-600 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	@keyframes scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}
	
	.animate-scroll {
		animation: scroll 60s linear infinite;
	}
	
	.animate-scroll:hover {
		animation-play-state: paused;
	}
</style>
