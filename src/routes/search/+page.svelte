<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { searchPlayersAndTeams } from '$lib/services/search.service';
	import type { Player } from '$lib/types';
	import { CountryFlag } from '$lib/components/ui';
	import { LoadingState } from '$lib/components/ui';

	let query = '';
	let players: Player[] = [];
	let teams: Array<{ name: string; playerCount: number; game?: string }> = [];
	let loading = true;
	let hasResults = false;

	$: searchQuery = $page.url.searchParams.get('q') || '';

	onMount(async () => {
		if (searchQuery) {
			query = searchQuery;
			await performSearch(searchQuery);
		} else {
			loading = false;
		}
	});

	$: if (searchQuery && searchQuery !== query) {
		query = searchQuery;
		performSearch(searchQuery);
	}

	async function performSearch(searchTerm: string) {
		if (!searchTerm.trim()) {
			loading = false;
			hasResults = false;
			return;
		}

		loading = true;
		try {
			const results = await searchPlayersAndTeams(searchTerm, 20);
			players = results.players;
			teams = results.teams;
			hasResults = results.total > 0;
		} catch (error) {
			console.error('Search error:', error);
			hasResults = false;
		} finally {
			loading = false;
		}
	}

	function formatCurrency(amount: number): string {
		if (amount >= 1000000) {
			return `$${(amount / 1000000).toFixed(2)}M`;
		} else if (amount >= 1000) {
			return `$${(amount / 1000).toFixed(0)}K`;
		}
		return `$${amount.toFixed(0)}`;
	}
</script>

<svelte:head>
	<title>Search Results{query ? ` for "${query}"` : ''} - Tournaments.com</title>
</svelte:head>

<div class="bg-white dark:bg-gray-900 min-h-screen">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
				Search Results
			</h1>
			{#if query}
				<p class="text-gray-600 dark:text-gray-400">
					Searching for: <span class="font-semibold text-gray-900 dark:text-white">"{query}"</span>
				</p>
			{:else}
				<p class="text-gray-600 dark:text-gray-400">
					Enter a search query to find players and teams
				</p>
			{/if}
		</div>

		{#if loading}
			<LoadingState variant="list" count={5} />
		{:else if !query}
			<div class="text-center py-12">
				<svg class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
				<p class="text-gray-500 dark:text-gray-400 text-lg">Enter a search query to get started</p>
			</div>
		{:else if !hasResults}
			<div class="text-center py-12">
				<svg class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<p class="text-gray-500 dark:text-gray-400 text-lg mb-2">No results found</p>
				<p class="text-gray-400 dark:text-gray-500 text-sm">Try searching for a different term</p>
			</div>
		{:else}
			<div class="space-y-8">
				<!-- Players Section -->
				{#if players.length > 0}
					<section>
						<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
							Players ({players.length})
						</h2>
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{#each players as player}
								{@const profileUrl = player.slug || player.username.replace(/\s+/g, '-').toLowerCase()}
								<a
									href="/profile/{profileUrl}"
									class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow group"
								>
									<div class="flex items-center gap-3">
										{#if player.image || player.avatar}
											<img
												src={player.image || player.avatar}
												alt={player.displayName}
												class="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
												on:error={(e) => {
													e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.displayName)}&background=random&size=80`;
												}}
											/>
										{:else}
											<div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold border-2 border-gray-200 dark:border-gray-600">
												{player.displayName.charAt(0)}
											</div>
										{/if}
										<div class="flex-1 min-w-0">
											<div class="flex items-center gap-2 mb-1">
												<h3 class="font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
													{player.displayName}
												</h3>
												{#if player.verified}
													<svg class="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
														<path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
													</svg>
												{/if}
											</div>
											<div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
												{#if player.country}
													<CountryFlag country={player.country} size="sm" />
												{/if}
												<span class="truncate">{player.game}</span>
												{#if player.team}
													<span>•</span>
													<span class="truncate">{player.team}</span>
												{/if}
											</div>
											<div class="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-500">
												<span>#{player.rank}</span>
												<span>•</span>
												<span>{formatCurrency(player.totalWinnings)}</span>
											</div>
										</div>
									</div>
								</a>
							{/each}
						</div>
					</section>
				{/if}

				<!-- Teams Section -->
				{#if teams.length > 0}
					<section>
						<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
							Teams ({teams.length})
						</h2>
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{#each teams as team}
								<div
									class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
								>
									<div class="flex items-center justify-between">
										<div class="flex-1 min-w-0">
											<h3 class="font-semibold text-gray-900 dark:text-white mb-1 truncate">
												{team.name}
											</h3>
											<div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
												{#if team.game}
													<span>{team.game}</span>
												{/if}
												<span>•</span>
												<span>{team.playerCount} {team.playerCount === 1 ? 'player' : 'players'}</span>
											</div>
										</div>
										<div class="ml-4 flex-shrink-0">
											<div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
												{team.name.charAt(0)}
											</div>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</section>
				{/if}
			</div>
		{/if}
	</div>
</div>

