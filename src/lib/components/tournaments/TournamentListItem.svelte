<script lang="ts">
	import { format } from 'date-fns';
	import { goto } from '$app/navigation';
	import type { Tournament } from '$lib/types';
	import { StatusBadge } from '$lib/components/ui';
	
	export let tournament: Tournament;
	export let showDivider: boolean = true;
	export let variant: 'top' | 'popular' | 'trending' = 'top';
	
	function handleClick() {
		goto(`/tournaments/${tournament.id}`);
	}
	
	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') handleClick();
	}
</script>

<div
	on:click={handleClick}
	on:keydown={handleKeydown}
	role="button"
	tabindex="0"
	class="tournament-item group {showDivider ? 'border-b-2 border-gray-200 dark:border-gray-700 pb-5' : ''}"
>
	<div class="flex items-start justify-between gap-3">
		<div class="flex-1 min-w-0">
			<h3 class="font-bold text-base text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate mb-1">
				{tournament.name}
			</h3>
			<p class="text-sm text-gray-600 dark:text-gray-400 truncate mb-2">{tournament.game}</p>
		</div>
		<StatusBadge status={tournament.status} size="sm" />
	</div>
	
	<div class="flex items-center gap-2">
		{#if variant === 'top'}
			<span class="text-lg font-bold text-green-600 dark:text-green-400">
				{tournament.prizePool}
			</span>
		{:else if variant === 'popular' && tournament.participants}
			<svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
			</svg>
			<span class="text-sm font-semibold text-blue-600 dark:text-blue-400">
				{tournament.participants.toLocaleString()} participants
			</span>
		{:else if variant === 'trending' && tournament.recentGrowth}
			<svg class="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
			</svg>
			<span class="text-sm font-semibold text-orange-600 dark:text-orange-400">
				{tournament.recentGrowth} growth
			</span>
		{/if}
	</div>
	
	<div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
		<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
		</svg>
		<span>{format(new Date(tournament.date), 'MMM d, yyyy')}</span>
		<span>•</span>
		<span>{tournament.location}</span>
	</div>
</div>

