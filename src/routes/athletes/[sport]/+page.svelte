<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabase';
	import { PageSEO } from '$lib/components/seo';
	
	let players: any[] = [];
	let loading = true;
	
	$: sport = $page.params.sport;
	
	const sportNames: Record<string, string> = {
		tennis: 'Tennis', golf: 'Golf', soccer: 'Soccer', nfl: 'Football',
		nba: 'Basketball', mlb: 'Baseball', racing: 'Racing', mma: 'MMA',
		boxing: 'Boxing', esports: 'Esports', cricket: 'Cricket', rugby: 'Rugby',
		nhl: 'Ice Hockey', olympics: 'Olympics', ncaf: 'College Football', wnba: 'WNBA'
	};
	
	$: sportName = sportNames[sport] || sport;
	
	function formatMoney(amount: number): string {
		if (!amount) return '$0';
		if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
		if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
		return `$${amount}`;
	}

	onMount(async () => {
		const { data } = await supabase
			.from('players')
			.select('id, display_name, player_name, slug, sport, country, current_rank, primary_game, total_winnings, total_wins, total_tournaments, bio, team_name, position, win_rate')
			.eq('sport', sport)
			.eq('is_published', true)
			.order('current_rank', { ascending: true, nullsFirst: false })
			.limit(200);

		players = data || [];
		loading = false;
	});
</script>

<PageSEO 
	title="{sportName} Athletes & Player Profiles"
	description="Browse professional {sportName} athletes. View stats, career records, biographies and rankings on Tournaments.com."
/>

<div class="min-h-screen bg-gray-950 text-white">
	<div class="container mx-auto px-3 sm:px-6 lg:px-8 max-w-7xl py-8">
		<nav class="text-sm text-gray-400 mb-6">
			<a href="/" class="hover:text-white">Home</a>
			<span class="mx-2">/</span>
			<span class="text-white">{sportName} Athletes</span>
		</nav>

		<h1 class="text-4xl font-bold mb-2">{sportName} Athletes</h1>
		<p class="text-gray-400 mb-8">Professional {sportName} players with stats, records and biographies</p>

		{#if loading}
		<div class="text-center py-16 text-gray-500">Loading athletes...</div>
		{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each players as player}
			<a href="/athletes/{sport}/{player.slug}"
				class="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-gray-600 transition-colors group">
				<div class="flex items-start gap-4">
					<div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center text-xl font-bold flex-shrink-0">
						{(player.display_name || player.player_name || '?').charAt(0)}
					</div>
					<div class="flex-1 min-w-0">
						<h2 class="font-semibold text-lg group-hover:text-blue-400 transition-colors truncate">
							{player.display_name || player.player_name}
						</h2>
						<div class="text-sm text-gray-400 flex flex-wrap gap-x-3 gap-y-1 mt-1">
							{#if player.current_rank}
								<span class="text-yellow-400">#{player.current_rank}</span>
							{/if}
							{#if player.country}
								<span>{player.country}</span>
							{/if}
							{#if player.team_name}
								<span>{player.team_name}</span>
							{/if}
						</div>
						<div class="text-sm text-gray-500 mt-2 flex gap-4">
							<span>{player.total_wins || 0} wins</span>
							<span>{formatMoney(player.total_winnings || 0)}</span>
						</div>
					</div>
				</div>
			</a>
			{/each}
		</div>

		{#if players.length === 0}
		<div class="text-center py-16 text-gray-500">
			<p class="text-lg">No {sportName} athletes found yet.</p>
			<p class="mt-2">Check back soon — we're adding new profiles regularly.</p>
		</div>
		{/if}
		{/if}
	</div>
</div>
