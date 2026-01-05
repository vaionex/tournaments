<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { format } from 'date-fns';
	import { goto } from '$app/navigation';
	import { getPlayerByUsername, getPlayerKnownFor } from '$lib/services/players.service';
	import { CountryFlag } from '$lib/components/ui';
	import type { Player } from '$lib/types';
	
	let player: Player | null = null;
	let profile = null;
	let tournamentHistory = [];
	let knownFor = [];
	let stats = {};
	let loading = true;
	let notFound = false;
	
	async function loadPlayer() {
		// Decode the username parameter (handles URL encoding)
		const username = decodeURIComponent($page.params.username);
		loading = true;
		
		// Try to load real player data
		const playerData = await getPlayerByUsername(username);
		if (playerData) {
			player = playerData;
			notFound = false;
			profile = {
				username: player.username,
				displayName: player.displayName,
				verified: player.verified,
				joinedDate: '2024-01-15', // TODO: Get from player data
				bio: `Professional ${player.game} player. Ranked #${player.rank} globally.`,
				location: player.country || 'Unknown',
				country: player.country,
				age: 28
			};
			
			// Load "Known For" data from database
			if (player.id) {
				const knownForData = await getPlayerKnownFor(player.id);
				knownFor = knownForData;
			}
		} else {
			notFound = true;
			player = null;
			profile = null;
		}
		
		tournamentHistory = [
			{
				id: '1',
				year: '2025',
				tournamentName: 'Tennis Open Championship 2025',
				game: 'Tennis',
				role: 'Singles',
				rank: 1,
				prize: '$125,000',
				verified: true
			},
			{
				id: '2',
				year: '2024',
				tournamentName: 'Golf Masters Tournament',
				game: 'Golf',
				role: 'Player',
				rank: 2,
				prize: '$45,000',
				verified: true
			},
			{
				id: '3',
				year: '2024',
				tournamentName: 'Football Youth League',
				game: 'Football',
				role: 'Forward',
				rank: 3,
				prize: '$12,000',
				verified: true
			},
			{
				id: '4',
				year: '2024',
				tournamentName: 'League of Legends Championship',
				game: 'League of Legends',
				role: 'Team Captain',
				rank: 1,
				prize: '$25,000',
				verified: true
			},
			{
				id: '5',
				year: '2024',
				tournamentName: 'Basketball 3v3 Championship',
				game: 'Basketball',
				role: 'Point Guard',
				rank: 2,
				prize: '$8,000',
				verified: true
			}
		];
		
		stats = {
			totalTournaments: 26,
			totalWins: 16,
			top3Finishes: 22,
			totalWinnings: 47000,
			winRate: 61.5,
			globalRank: 42
		};
		
		loading = false;
	}
	
	// Reactive statement to reload when route parameter changes
	$: if ($page.params.username) {
		loadPlayer();
	}
	
	onMount(() => {
		loadPlayer();
	});
</script>

<svelte:head>
	<title>{profile?.displayName || 'Profile'} - Tournaments.com</title>
</svelte:head>

{#if loading}
	<div class="bg-gray-50 dark:bg-gray-900 min-h-screen">
		<div class="container mx-auto px-4 py-8 max-w-7xl">
			<div class="card animate-pulse">
				<div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
			</div>
		</div>
	</div>
{:else if profile}
	<div class="bg-gray-50 dark:bg-gray-900 min-h-screen">
		<div class="container mx-auto px-4 py-8 max-w-7xl">
			<!-- IMDB-style Header -->
			<div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 mb-6">
				<div class="flex gap-6 pb-6">
					<!-- Avatar -->
					<div class="flex-shrink-0">
						<div class="w-48 h-72 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-6xl font-black shadow-lg">
							{profile.displayName.charAt(0).toUpperCase()}
						</div>
					</div>
					
					<!-- Name and Info -->
					<div class="flex-1 pt-4">
						<div class="flex items-center gap-3 mb-2">
							<h1 class="text-4xl font-bold text-gray-900 dark:text-white">{profile.displayName}</h1>
							{#if profile.verified}
								<span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-bold">
									✓ Verified
								</span>
							{/if}
						</div>
						<p class="text-gray-600 dark:text-gray-400 mb-4">@{profile.username}</p>
						
						<!-- Stats Row -->
						<div class="grid grid-cols-4 gap-4 mb-4">
							<div>
								<div class="text-sm text-gray-500 dark:text-gray-400">Global Rank</div>
								<div class="text-2xl font-bold text-gray-900 dark:text-white">#{stats.globalRank}</div>
							</div>
							<div>
								<div class="text-sm text-gray-500 dark:text-gray-400">Tournaments</div>
								<div class="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalTournaments}</div>
							</div>
							<div>
								<div class="text-sm text-gray-500 dark:text-gray-400">Wins</div>
								<div class="text-2xl font-bold text-green-600 dark:text-green-400">{stats.totalWins}</div>
							</div>
							<div>
								<div class="text-sm text-gray-500 dark:text-gray-400">Win Rate</div>
								<div class="text-2xl font-bold text-gray-900 dark:text-white">{stats.winRate}%</div>
							</div>
						</div>
						
						<!-- Quick Info -->
						<div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
							<div class="flex items-center gap-2">
								<span>Location:</span>
								<div class="flex items-center gap-1.5">
									{#if profile.country}
										<CountryFlag country={profile.country} size="sm" />
									{/if}
									<span class="font-semibold text-gray-900 dark:text-white">{profile.location}</span>
								</div>
							</div>
							<div>Member since: <span class="font-semibold text-gray-900 dark:text-white">{format(new Date(profile.joinedDate), 'MMMM yyyy')}</span></div>
							<div>Total Winnings: <span class="font-semibold text-green-600 dark:text-green-400">${stats.totalWinnings.toLocaleString()}</span></div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<!-- Main Content -->
				<div class="lg:col-span-2 space-y-6">
				<!-- Known For -->
				<div class="card">
					<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Known For</h2>
					<div class="space-y-3">
						{#each knownFor as game}
							<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
								<div>
									<div class="font-bold text-gray-900 dark:text-white">{game.game}</div>
									<div class="text-sm text-gray-600 dark:text-gray-400">{game.tournaments} tournaments, {game.wins} wins</div>
								</div>
								<button 
									on:click={() => goto(`/tournaments?game=${encodeURIComponent(game.game)}`)}
									class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-semibold"
								>
									View Tournaments →
								</button>
							</div>
						{/each}
					</div>
				</div>
				
				<!-- Tournament History (Filmography-style) -->
				<div class="card">
					<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tournament History</h2>
					<div class="overflow-x-auto">
						<table class="w-full">
							<thead>
								<tr class="border-b border-gray-200 dark:border-gray-700">
									<th class="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Year</th>
									<th class="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Tournament</th>
									<th class="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Game</th>
									<th class="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Role</th>
									<th class="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Rank</th>
									<th class="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Prize</th>
								</tr>
							</thead>
							<tbody>
								{#each tournamentHistory as tournament}
									<tr 
										class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
										on:click={() => goto(`/tournaments/${tournament.id}`)}
									>
										<td class="py-3 px-4 text-gray-600 dark:text-gray-400">{tournament.year}</td>
										<td class="py-3 px-4">
											<div class="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
												{tournament.tournamentName}
											</div>
										</td>
										<td class="py-3 px-4 text-gray-600 dark:text-gray-400">{tournament.game}</td>
										<td class="py-3 px-4 text-gray-600 dark:text-gray-400">{tournament.role}</td>
										<td class="py-3 px-4 text-center">
											<span class="font-bold {
												tournament.rank === 1 ? 'text-yellow-600 dark:text-yellow-400' :
												tournament.rank === 2 ? 'text-gray-500 dark:text-gray-400' :
												tournament.rank === 3 ? 'text-orange-600 dark:text-orange-400' :
												'text-gray-600 dark:text-gray-400'
											}">
												#{tournament.rank}
											</span>
											{#if tournament.verified}
												<span class="ml-2 text-green-600 dark:text-green-400 text-xs">✓</span>
											{/if}
										</td>
										<td class="py-3 px-4 text-right font-semibold text-green-600 dark:text-green-400">
											{tournament.prize}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
				
				<!-- Biography -->
				<div class="card">
					<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Biography</h2>
					<p class="text-gray-700 dark:text-gray-300 leading-relaxed">{profile.bio}</p>
				</div>
				</div>
				
				<!-- Sidebar -->
				<aside class="lg:col-span-1">
				<!-- Awards & Achievements -->
				<div class="card mb-6">
					<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Awards & Achievements</h3>
					<div class="space-y-3">
						<div class="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
							<span class="text-2xl">🥇</span>
							<div>
								<div class="font-semibold text-gray-900 dark:text-white">First Place</div>
								<div class="text-sm text-gray-600 dark:text-gray-400">8 tournaments</div>
							</div>
						</div>
						<div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
							<span class="text-2xl">🥈</span>
							<div>
								<div class="font-semibold text-gray-900 dark:text-white">Second Place</div>
								<div class="text-sm text-gray-600 dark:text-gray-400">6 tournaments</div>
							</div>
						</div>
						<div class="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
							<span class="text-2xl">🥉</span>
							<div>
								<div class="font-semibold text-gray-900 dark:text-white">Third Place</div>
								<div class="text-sm text-gray-600 dark:text-gray-400">8 tournaments</div>
							</div>
						</div>
					</div>
				</div>
				
				<!-- Quick Stats -->
				<div class="card">
					<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
					<div class="space-y-3 text-sm">
						<div class="flex justify-between">
							<span class="text-gray-600 dark:text-gray-400">Top 3 Finishes</span>
							<span class="font-semibold text-gray-900 dark:text-white">{stats.top3Finishes}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-gray-600 dark:text-gray-400">Total Winnings</span>
							<span class="font-semibold text-green-600 dark:text-green-400">${stats.totalWinnings.toLocaleString()}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-gray-600 dark:text-gray-400">Win Rate</span>
							<span class="font-semibold text-gray-900 dark:text-white">{stats.winRate}%</span>
						</div>
						<div class="flex justify-between">
							<span class="text-gray-600 dark:text-gray-400">Best Finish</span>
							<span class="font-semibold text-yellow-600 dark:text-yellow-400">1st Place</span>
						</div>
					</div>
				</div>
				</aside>
			</div>
		</div>
	</div>
{:else if notFound}
	<div class="bg-gray-50 dark:bg-gray-900 min-h-screen">
		<div class="container mx-auto px-4 py-8 max-w-7xl">
			<div class="card text-center">
				<h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Profile Not Found</h2>
				<p class="text-gray-600 dark:text-gray-400 mb-4">The player profile you're looking for doesn't exist.</p>
				<a href="/players" class="btn-primary inline-block">Browse All Players</a>
			</div>
		</div>
	</div>
{:else}
	<div class="bg-gray-50 dark:bg-gray-900 min-h-screen">
		<div class="container mx-auto px-4 py-8 max-w-7xl">
			<div class="card text-center">
				<h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Loading...</h2>
			</div>
		</div>
	</div>
{/if}
