<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	
	export let searchQuery: string = '';
	export let gameFilter: string = '';
	export let locationFilter: string = '';
	export let games: string[] = [];
	export let locations: string[] = [];
	export let totalCount: number = 0;
	
	const dispatch = createEventDispatcher<{
		search: string;
		gameChange: string;
		locationChange: string;
	}>();
	
	function handleSearch(query: string) {
		dispatch('search', query);
	}
	
	function handleGameChange() {
		dispatch('gameChange', gameFilter);
	}
	
	function handleLocationChange() {
		dispatch('locationChange', locationFilter);
	}
</script>

<div class="mb-8 space-y-5">
	<SearchBar onSearch={handleSearch} />
	
	<div class="flex flex-wrap gap-3">
		<select 
			bind:value={gameFilter}
			on:change={handleGameChange}
			class="filter-select"
		>
			<option value="">All Games</option>
			{#each games as game}
				<option value={game}>{game}</option>
			{/each}
		</select>
		
		<select 
			bind:value={locationFilter}
			on:change={handleLocationChange}
			class="filter-select"
		>
			<option value="">All Locations</option>
			{#each locations as location}
				<option value={location}>{location}</option>
			{/each}
		</select>
	</div>
	
	<div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
		<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
		</svg>
		<span class="font-medium">
			Showing {totalCount} tournament{totalCount !== 1 ? 's' : ''}
		</span>
	</div>
</div>

