<script lang="ts">
	import { format } from 'date-fns';
	import { goto } from '$app/navigation';
	import type { Tournament } from '$lib/types';
	
	export let tournaments: Tournament[];
	export let title: string = 'Upcoming Tournaments';
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
	<div class="mb-6 pb-4 border-b-2 border-gray-200 dark:border-gray-700">
		<h2 class="headline-small text-gray-900 dark:text-white">{title}</h2>
	</div>
	<div class="space-y-4">
		{#each tournaments as tournament}
			<div 
				on:click={() => goto(`/tournaments/${tournament.id}`)}
				on:keydown={(e) => e.key === 'Enter' && goto(`/tournaments/${tournament.id}`)}
				role="button"
				tabindex="0"
				class="p-4 border-l-4 border-blue-600 dark:border-blue-400 bg-gray-50 dark:bg-gray-900/50 rounded-r-lg hover:bg-gray-100 dark:hover:bg-gray-900 hover:shadow-md transition-all cursor-pointer group"
			>
				<div class="flex items-start justify-between mb-2 gap-2">
					<h3 class="font-bold text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-1">
						{tournament.name}
					</h3>
					<span class="px-2 py-1 text-xs font-bold uppercase rounded flex-shrink-0 {
						tournament.status === 'live' ? 'bg-red-600 text-white' :
						'bg-blue-600 text-white'
					}">
						{tournament.status}
					</span>
				</div>
				<p class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wide">{tournament.game}</p>
				<div class="flex items-center justify-between mb-2">
					<div class="flex items-center gap-1 text-xs font-medium text-gray-700 dark:text-gray-300">
						<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
						{format(new Date(tournament.date), 'MMM d, yyyy')}
					</div>
					<div class="font-bold text-green-600 dark:text-green-400 text-sm">
						{tournament.prizePool}
					</div>
				</div>
				{#if tournament.registeredPlayers}
					<div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
						<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>
						<span class="font-semibold">{tournament.registeredPlayers} registered</span>
					</div>
				{/if}
			</div>
		{/each}
	</div>
	<div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
		<a href="/tournaments" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold text-sm uppercase tracking-wide inline-flex items-center gap-1">
			View All Tournaments
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</a>
	</div>
</div>

