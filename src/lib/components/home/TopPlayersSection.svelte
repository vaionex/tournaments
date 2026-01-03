<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Player } from '$lib/types';
	import { VerifiedBadge, RankBadge } from '$lib/components/ui';
	
	export let players: Player[];
	
	// Track image errors for each player
	let imageErrors: Record<string, boolean> = {};
	
	function handleImageError(playerId: string) {
		imageErrors[playerId] = true;
		imageErrors = imageErrors; // trigger reactivity
	}
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 lg:p-8">
	<div class="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-200 dark:border-gray-700">
		<h2 class="headline-small text-gray-900 dark:text-white">Top Players</h2>
		<a href="/players" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold text-sm uppercase tracking-wide transition-colors">
			View All →
		</a>
	</div>
	
	<!-- Professional Grid Layout -->
	<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-6">
		{#each players.slice(0, 8) as player (player.id || player.username)}
			{@const hasImageError = imageErrors[player.id || player.username]}
			<div 
				on:click={() => goto(`/profile/${player.username}`)}
				on:keydown={(e) => e.key === 'Enter' && goto(`/profile/${player.username}`)}
				role="button"
				tabindex="0"
				class="cursor-pointer group"
			>
				<!-- Profile Picture with Rank Badge -->
				<div class="relative mb-3">
					{#if (player.avatar || player.image) && !hasImageError}
						<img 
							src={player.avatar || player.image} 
							alt={player.displayName}
							on:error={() => handleImageError(player.id || player.username)}
							class="w-full aspect-square rounded-lg object-cover shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
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
					
					<!-- Verified Badge for Top 3 -->
					{#if player.rank <= 3}
						<div class="absolute bottom-2 right-2 z-10">
							<VerifiedBadge size="sm" />
						</div>
					{/if}
				</div>
				
				<!-- Player Info -->
				<div class="text-center">
					<div class="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm leading-tight mb-1 truncate">
						{player.displayName}
					</div>
					<div class="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium uppercase tracking-wide">
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
						<div class="text-xs font-semibold text-green-600 dark:text-green-400 pt-1">
							${(player.totalWinnings / 1000).toFixed(0)}K
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
