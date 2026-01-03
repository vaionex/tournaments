<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Player } from '$lib/types';
	import { VerifiedBadge, RankBadge } from '$lib/components/ui';
	
	export let player: Player;
	
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
	class="cursor-pointer group"
>
	<!-- Profile Picture -->
	<div class="relative mb-3">
		{#if player.image && !imageError}
			<img
				src={player.image}
				alt={player.displayName}
				on:error={handleImageError}
				class="w-full aspect-square rounded-lg object-cover shadow-md group-hover:shadow-xl transition-all group-hover:scale-105"
			/>
		{:else}
			<div class="w-full aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
				<div class="w-full h-full flex items-center justify-center text-white text-3xl sm:text-4xl font-black">
					{player.displayName.charAt(0).toUpperCase()}
				</div>
			</div>
		{/if}
		
		<!-- Rank Badge -->
		<div class="absolute -top-2 -right-2 z-10">
			<RankBadge rank={player.rank} />
		</div>
		
		<!-- Verified Badge -->
		{#if player.verified}
			<div class="absolute bottom-2 right-2 z-10">
				<VerifiedBadge size="md" />
			</div>
		{/if}
	</div>
	
	<!-- Player Info -->
	<div class="text-center">
		<div class="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm leading-tight mb-1 truncate">
			{player.displayName}
		</div>
		<div class="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium uppercase tracking-wide">
			{player.game}
		</div>
		<div class="space-y-1.5">
			<div class="flex items-center justify-center gap-2 text-xs">
				<span class="text-gray-500 dark:text-gray-400">Wins:</span>
				<span class="font-semibold text-green-600 dark:text-green-400">{player.wins}</span>
			</div>
			<div class="flex items-center justify-center gap-2 text-xs">
				<span class="text-gray-500 dark:text-gray-400">Win Rate:</span>
				<span class="font-semibold text-blue-600 dark:text-blue-400">{player.winRate}%</span>
			</div>
			{#if player.totalWinnings}
				<div class="text-xs font-semibold text-green-600 dark:text-green-400 pt-1">
					${(player.totalWinnings / 1000).toFixed(0)}K
				</div>
			{/if}
		</div>
	</div>
</div>
