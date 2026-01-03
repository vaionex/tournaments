<script lang="ts">
	import type { Tournament } from '$lib/types';
	import TournamentCard from './TournamentCard.svelte';
	import { EmptyState, LoadingState, Pagination } from '$lib/components/ui';
	
	export let tournaments: Tournament[];
	export let loading: boolean = false;
	export let currentPage: number = 1;
	export let totalPages: number = 1;
	export let emptyTitle: string = 'No tournaments found';
	export let emptyDescription: string = 'Try adjusting your filters or search terms.';
	
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{ pageChange: number }>();
	
	function handlePageChange(event: CustomEvent<number>) {
		dispatch('pageChange', event.detail);
	}
</script>

{#if loading}
	<LoadingState variant="grid" count={6} columns={3} />
{:else if tournaments.length > 0}
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
		{#each tournaments as tournament (tournament.id)}
			<TournamentCard {tournament} />
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
		icon="search"
	/>
{/if}

