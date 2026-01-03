<script>
	import { page } from '$app/stores';
	
	export let activeTab = 'home';
	export let sportCode = '';
	export let sportIcon = '';
	
	const sportLogos = {
		'NFL': '🏈',
		'NBA': '🏀',
		'MLB': '⚾',
		'SOCCER': '⚽',
		'NHL': '🏒',
		'NCAAF': '🏈',
		'WNBA': '🏀'
	};
	
	$: leagueIcon = sportIcon || sportLogos[sportCode] || '🏆';
	
	$: tabs = [
		{ id: 'home', label: sportCode || 'Home', icon: leagueIcon },
		{ id: 'free-agency', label: 'Free Agency', icon: '📝' },
		{ id: 'scores', label: 'Scores', icon: leagueIcon },
		{ id: 'schedule', label: 'Schedule', icon: '📅' },
		{ id: 'standings', label: 'Standings', icon: '📊' },
		{ id: 'stats', label: 'Stats', icon: '📈' },
		{ id: 'teams', label: 'Teams', icon: '👥' },
		{ id: 'transactions', label: 'Transactions', icon: '🔄' },
		{ id: 'players', label: 'Players', icon: '⭐' },
		{ id: 'more', label: 'More', icon: '⋯' }
	];
	
	function handleTabClick(tabId) {
		activeTab = tabId;
		// Scroll to top when switching tabs
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<nav class="bg-gray-800 dark:bg-gray-900 border-b border-gray-700 dark:border-gray-800 sticky top-[88px] z-20">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
		<div class="flex items-center gap-0.5 overflow-x-auto horizontal-gallery py-1">
			{#each tabs as tab}
				<button
					on:click={() => handleTabClick(tab.id)}
					class="group relative px-2.5 sm:px-3 py-1.5 font-semibold text-xs whitespace-nowrap transition-colors {
						activeTab === tab.id
							? 'text-red-400 dark:text-red-400'
							: 'text-white dark:text-gray-200 hover:text-red-400 dark:hover:text-red-400'
					}"
				>
					<span class="flex items-center gap-1">
						<span class="text-xs">{tab.icon}</span>
						<span>{tab.label}</span>
					</span>
					{#if activeTab === tab.id}
						<span class="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 dark:bg-red-500"></span>
					{/if}
				</button>
			{/each}
		</div>
	</div>
</nav>

<style>
	.horizontal-gallery {
		scrollbar-width: thin;
		scrollbar-color: #cbd5e1 transparent;
	}
	
	.horizontal-gallery::-webkit-scrollbar {
		height: 6px;
	}
	
	.horizontal-gallery::-webkit-scrollbar-track {
		background: transparent;
	}
	
	.horizontal-gallery::-webkit-scrollbar-thumb {
		background-color: #cbd5e1;
		border-radius: 3px;
	}
	
	.horizontal-gallery::-webkit-scrollbar-thumb:hover {
		background-color: #94a3b8;
	}
</style>

