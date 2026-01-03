<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	
	export let searchQuery: string = '';
	export let gameFilter: string = '';
	export let sortBy: string = 'rank';
	export let games: string[] = [];
	export let totalCount: number = 0;
	
	const dispatch = createEventDispatcher<{
		search: string;
		gameChange: string;
		sortChange: string;
	}>();
	
	function handleSearch() {
		dispatch('search', searchQuery);
	}
	
	function handleGameChange() {
		dispatch('gameChange', gameFilter);
	}
	
	function handleSortChange() {
		dispatch('sortChange', sortBy);
	}
</script>

<div class="mb-6 space-y-4">
	<div class="flex flex-col sm:flex-row gap-4">
		<div class="flex-1 min-w-0 relative">
			<input
				type="text"
				bind:value={searchQuery}
				on:input={handleSearch}
				placeholder="Search players..."
				class="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
			/>
			<svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
			</svg>
		</div>
		
		<select
			bind:value={gameFilter}
			on:change={handleGameChange}
			class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full sm:w-auto"
		>
			{#each games as game}
				<option value={game === 'All Games' ? '' : game}>{game}</option>
			{/each}
		</select>
		
		<select
			bind:value={sortBy}
			on:change={handleSortChange}
			class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full sm:w-auto"
		>
			<option value="rank">Sort by Rank</option>
			<option value="wins">Sort by Wins</option>
			<option value="winnings">Sort by Winnings</option>
			<option value="winrate">Sort by Win Rate</option>
			<option value="name">Sort by Name</option>
		</select>
	</div>
	
	<div class="text-sm text-gray-600 dark:text-gray-400">
		Showing {totalCount} player{totalCount !== 1 ? 's' : ''}
	</div>
</div>

