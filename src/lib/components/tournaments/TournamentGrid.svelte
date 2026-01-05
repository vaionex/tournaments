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
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
		{#each Array(12) as _}
			<div class="card animate-pulse">
				<!-- Title and Status -->
				<div class="flex justify-between items-start mb-4 gap-3">
					<div class="h-6 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
					<div class="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
				</div>
				
				<!-- Game -->
				<div class="flex items-center gap-2 mb-5">
					<svg class="w-4 h-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
					</svg>
					<div class="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
				</div>
				
				<!-- Grid: Date, Location, Prize Pool, Entry Fee -->
				<div class="grid grid-cols-2 gap-4 mb-5">
					<div class="space-y-1">
						<div class="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
						<div class="flex items-center gap-1">
							<svg class="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
							<div class="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
						</div>
					</div>
					<div class="space-y-1">
						<div class="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
						<div class="flex items-center gap-1">
							<svg class="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
							<div class="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
						</div>
					</div>
					<div class="space-y-1">
						<div class="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
						<div class="flex items-center gap-1">
							<svg class="w-4 h-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<div class="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
						</div>
					</div>
					<div class="space-y-1">
						<div class="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
						<div class="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
					</div>
				</div>
				
				<!-- Footer: Platform and View Details -->
				<div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
					<div class="flex items-center gap-2">
						<svg class="w-4 h-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
						</svg>
						<div class="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
					</div>
					<div class="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
				</div>
			</div>
		{/each}
	</div>
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

