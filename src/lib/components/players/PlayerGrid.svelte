<script lang="ts">
	import type { Player } from '$lib/types';
	import PlayerCard from './PlayerCard.svelte';
	import { EmptyState, Pagination } from '$lib/components/ui';
	import { createEventDispatcher } from 'svelte';
	
	export let players: Player[];
	export let loading: boolean = false;
	export let currentPage: number = 1;
	export let totalPages: number = 1;
	export let emptyTitle: string = 'No players found';
	export let emptyDescription: string = 'Try adjusting your filters.';
	
	const dispatch = createEventDispatcher<{ pageChange: number }>();
	
	function handlePageChange(event: CustomEvent<number>) {
		dispatch('pageChange', event.detail);
	}
</script>

{#if loading}
	<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 lg:gap-6">
		{#each Array(12) as _}
			<div class="animate-pulse">
				<div class="w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg mb-2"></div>
				<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
				<div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
			</div>
		{/each}
	</div>
{:else if players.length > 0}
	<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 lg:gap-6 mb-8">
		{#each players as player (player.id)}
			<PlayerCard {player} />
		{/each}
	</div>
	
	<Pagination 
		{currentPage} 
		{totalPages} 
		on:pageChange={handlePageChange}
	/>
{:else}
	<EmptyState 
		title={emptyTitle}
		description={emptyDescription}
		icon="player"
	/>
{/if}

