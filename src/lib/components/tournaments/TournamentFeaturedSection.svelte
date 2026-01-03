<script lang="ts">
	import type { Tournament } from '$lib/types';
	import TournamentListItem from './TournamentListItem.svelte';
	
	export let title: string;
	export let tournaments: Tournament[];
	export let icon: string = '🏆';
	export let iconGradient: string = 'from-yellow-400 to-yellow-600';
	export let variant: 'top' | 'popular' | 'trending' = 'top';
</script>

<div class="tournament-featured-card">
	<div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
		<h2 class="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
		<div class="w-10 h-10 rounded-lg bg-gradient-to-br {iconGradient} flex items-center justify-center shadow-md">
			<span class="text-xl">{icon}</span>
		</div>
	</div>
	<div class="space-y-5">
		{#each tournaments as tournament, index}
			<TournamentListItem 
				{tournament} 
				{variant}
				showDivider={index < tournaments.length - 1}
			/>
		{/each}
	</div>
</div>

