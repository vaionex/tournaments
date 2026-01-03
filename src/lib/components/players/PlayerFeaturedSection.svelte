<script lang="ts">
	import type { Player } from '$lib/types';
	import PlayerListItem from './PlayerListItem.svelte';
	
	export let title: string;
	export let players: Player[];
	export let icon: string = '💰';
	export let variant: 'earnings' | 'popular' | 'trending' = 'earnings';
</script>

<div class="card">
	<div class="flex items-center justify-between mb-4">
		<h2 class="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
		<span class="text-2xl">{icon}</span>
	</div>
	<div class="space-y-4">
		{#each players as player (player.id)}
			<PlayerListItem {player} {variant} />
		{/each}
	</div>
</div>

