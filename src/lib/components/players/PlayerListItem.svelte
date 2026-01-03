<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Player } from '$lib/types';
	import { VerifiedBadge } from '$lib/components/ui';
	
	export let player: Player;
	export let variant: 'earnings' | 'popular' | 'trending' = 'earnings';
	
	let imageError = false;
	
	function handleClick() {
		goto(`/profile/${player.username}`);
	}
	
	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') handleClick();
	}
	
	function handleImageError() {
		imageError = true;
	}
</script>

<div
	on:click={handleClick}
	on:keydown={handleKeydown}
	role="button"
	tabindex="0"
	class="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors group"
>
	<div class="relative flex-shrink-0">
		{#if player.image && !imageError}
			<img
				src={player.image}
				alt={player.displayName}
				on:error={handleImageError}
				class="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-colors"
			/>
		{:else}
			<div class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-gray-200 dark:border-gray-700 group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-colors flex items-center justify-center text-white text-xl font-bold">
				{player.displayName.charAt(0).toUpperCase()}
			</div>
		{/if}
		{#if player.verified}
			<div class="absolute -bottom-1 -right-1">
				<VerifiedBadge size="sm" />
			</div>
		{/if}
	</div>
	
	<div class="flex-1 min-w-0">
		<div class="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
			{player.displayName}
		</div>
		<div class="text-sm text-gray-600 dark:text-gray-400 truncate">{player.game}</div>
		
		{#if variant === 'earnings' && player.totalWinnings}
			<div class="text-lg font-bold text-green-600 dark:text-green-400 mt-1">
				${(player.totalWinnings / 1000).toFixed(0)}K
			</div>
		{:else if variant === 'popular' && player.followers}
			<div class="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
				{(player.followers / 1000).toFixed(0)}K followers
			</div>
		{:else if variant === 'trending' && player.recentWins}
			<div class="text-sm font-semibold text-orange-600 dark:text-orange-400 mt-1">
				+{player.recentWins} wins this month
			</div>
		{/if}
	</div>
	
	<div class="text-right flex-shrink-0">
		<div class="text-xs text-gray-500 dark:text-gray-500">Rank</div>
		<div class="text-lg font-bold text-gray-900 dark:text-white">#{player.rank}</div>
	</div>
</div>
