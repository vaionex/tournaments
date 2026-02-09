<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { format } from 'date-fns';
	import { goto } from '$app/navigation';
	
	let game = null;
	let loading = true;
	
	const sportLogos = {
		'NFL': '🏈',
		'NBA': '🏀',
		'MLB': '⚾',
		'SOCCER': '⚽',
		'NHL': '🏒',
		'NCAAF': '🏈',
		'WNBA': '🏀',
		'OLYMPICS': '🏅'
	};
	
	const sportNames = {
		'nfl': 'NFL',
		'nba': 'NBA',
		'mlb': 'MLB',
		'soccer': 'Soccer',
		'nhl': 'NHL',
		'ncaaf': 'NCAAF',
		'wnba': 'WNBA',
		'olympics': 'Olympics'
	};
	
	// Mock game data - in real app, this would come from an API
	const gameData = {
		'1': { 
			sport: 'nfl', 
			team1: 'Steelers', team1Abbr: 'PIT', team1Slug: 'steelers', 
			team2: 'Browns', team2Abbr: 'CLE', team2Slug: 'browns', 
			score1: '13', score2: '10', 
			status: 'Final',
			date: new Date(),
			venue: 'Heinz Field',
			attendance: 65400,
			quarter: 'Final',
			time: null,
			scoringByQuarter: {
				team1: [0, 7, 3, 3],
				team2: [3, 0, 7, 0]
			},
			teamStats: {
				team1: { totalYards: 312, passingYards: 198, rushingYards: 114, turnovers: 1, timeOfPossession: '32:15' },
				team2: { totalYards: 278, passingYards: 189, rushingYards: 89, turnovers: 2, timeOfPossession: '27:45' }
			},
			topPerformers: {
				team1: [
					{ name: 'QB Smith', stat: '198 passing yards', value: '198' },
					{ name: 'RB Johnson', stat: '89 rushing yards', value: '89' },
					{ name: 'WR Brown', stat: '5 receptions', value: '5' }
				],
				team2: [
					{ name: 'QB Williams', stat: '189 passing yards', value: '189' },
					{ name: 'RB Davis', stat: '67 rushing yards', value: '67' },
					{ name: 'WR Jones', stat: '4 receptions', value: '4' }
				]
			},
			teamRecords: {
				team1: { wins: 10, losses: 6 },
				team2: { wins: 8, losses: 8 }
			}
		},
		'2': { 
			sport: 'nfl', 
			team1: 'Patriots', team1Abbr: 'NE', team1Slug: 'patriots', 
			team2: 'Jets', team2Abbr: 'NYJ', team2Slug: 'jets', 
			score1: '42', score2: '13', 
			status: 'Final',
			date: new Date(Date.now() - 86400000),
			venue: 'Gillette Stadium',
			attendance: 65878,
			quarter: 'Final',
			time: null,
			scoringByQuarter: {
				team1: [14, 14, 7, 7],
				team2: [3, 3, 0, 7]
			},
			teamStats: {
				team1: { totalYards: 445, passingYards: 312, rushingYards: 133, turnovers: 0, timeOfPossession: '35:20' },
				team2: { totalYards: 234, passingYards: 178, rushingYards: 56, turnovers: 3, timeOfPossession: '24:40' }
			},
			topPerformers: {
				team1: [
					{ name: 'QB Brady', stat: '312 passing yards', value: '312' },
					{ name: 'RB White', stat: '98 rushing yards', value: '98' },
					{ name: 'WR Edelman', stat: '8 receptions', value: '8' }
				],
				team2: [
					{ name: 'QB Darnold', stat: '178 passing yards', value: '178' },
					{ name: 'RB Bell', stat: '45 rushing yards', value: '45' },
					{ name: 'WR Anderson', stat: '3 receptions', value: '3' }
				]
			},
			teamRecords: {
				team1: { wins: 12, losses: 4 },
				team2: { wins: 5, losses: 11 }
			}
		},
		'3': { 
			sport: 'nfl', 
			team1: 'Saints', team1Abbr: 'NO', team1Slug: 'saints', 
			team2: 'Titans', team2Abbr: 'TEN', team2Slug: 'titans', 
			score1: '34', score2: '28', 
			status: 'Final',
			date: new Date(Date.now() - 172800000),
			venue: 'Mercedes-Benz Superdome',
			attendance: 73000,
			quarter: 'Final',
			time: null,
			scoringByQuarter: {
				team1: [7, 10, 10, 7],
				team2: [7, 7, 7, 7]
			},
			teamStats: {
				team1: { totalYards: 398, passingYards: 287, rushingYards: 111, turnovers: 1, timeOfPossession: '33:10' },
				team2: { totalYards: 365, passingYards: 245, rushingYards: 120, turnovers: 2, timeOfPossession: '26:50' }
			},
			topPerformers: {
				team1: [
					{ name: 'QB Brees', stat: '287 passing yards', value: '287' },
					{ name: 'RB Kamara', stat: '87 rushing yards', value: '87' },
					{ name: 'WR Thomas', stat: '9 receptions', value: '9' }
				],
				team2: [
					{ name: 'QB Tannehill', stat: '245 passing yards', value: '245' },
					{ name: 'RB Henry', stat: '98 rushing yards', value: '98' },
					{ name: 'WR Brown', stat: '6 receptions', value: '6' }
				]
			},
			teamRecords: {
				team1: { wins: 11, losses: 5 },
				team2: { wins: 9, losses: 7 }
			}
		}
	};
	
	onMount(async () => {
		const sport = $page.params.sport;
		const id = $page.params.id;
		
		await new Promise(resolve => setTimeout(resolve, 300));
		
		// Get game data (in real app, fetch from API)
		const gameInfo = gameData[id] || {
			sport: sport,
			team1: 'Team 1', team1Abbr: 'T1', team1Slug: 'team-1',
			team2: 'Team 2', team2Abbr: 'T2', team2Slug: 'team-2',
			score1: '0', score2: '0',
			status: 'Final',
			date: new Date(),
			venue: 'Stadium',
			attendance: 50000,
			quarter: 'Final',
			time: null,
			scoringByQuarter: {
				team1: [0, 0, 0, 0],
				team2: [0, 0, 0, 0]
			},
			teamStats: {
				team1: { totalYards: 0, passingYards: 0, rushingYards: 0, turnovers: 0, timeOfPossession: '0:00' },
				team2: { totalYards: 0, passingYards: 0, rushingYards: 0, turnovers: 0, timeOfPossession: '0:00' }
			},
			topPerformers: {
				team1: [],
				team2: []
			},
			teamRecords: {
				team1: { wins: 0, losses: 0 },
				team2: { wins: 0, losses: 0 }
			}
		};
		
		game = {
			...gameInfo,
			sportName: sportNames[sport.toLowerCase()] || sport.toUpperCase(),
			sportLogo: sportLogos[sportNames[sport.toLowerCase()]] || '🏆'
		};
		
		loading = false;
	});
</script>

<svelte:head>
	<title>{game?.team1 || 'Team 1'} vs {game?.team2 || 'Team 2'} - {game?.sportName || 'Game'} - Tournaments.com</title>
	<meta name="description" content="Game details: {game?.team1 || 'Team 1'} {game?.score1 || '0'} - {game?.score2 || '0'} {game?.team2 || 'Team 2'}" />
</svelte:head>

{#if loading}
	<!-- Professional Skeleton Loader -->
	<div class="bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
		<!-- Skeleton Hero/Scoreboard -->
		<div class="bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900">
			<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
				<div class="flex items-center justify-center gap-8 py-8">
					<!-- Team 1 -->
					<div class="flex flex-col items-center gap-3">
						<div class="w-20 h-20 bg-white/20 rounded-full animate-pulse"></div>
						<div class="h-6 w-24 bg-white/20 rounded animate-pulse"></div>
						<div class="h-4 w-16 bg-white/20 rounded animate-pulse"></div>
					</div>
					
					<!-- Score -->
					<div class="flex items-center gap-4">
						<div class="h-16 w-16 bg-white/20 rounded-lg animate-pulse"></div>
						<div class="h-8 w-4 bg-white/20 rounded animate-pulse"></div>
						<div class="h-16 w-16 bg-white/20 rounded-lg animate-pulse"></div>
					</div>
					
					<!-- Team 2 -->
					<div class="flex flex-col items-center gap-3">
						<div class="w-20 h-20 bg-white/20 rounded-full animate-pulse"></div>
						<div class="h-6 w-24 bg-white/20 rounded animate-pulse"></div>
						<div class="h-4 w-16 bg-white/20 rounded animate-pulse"></div>
					</div>
				</div>
				
				<!-- Game Info -->
				<div class="flex justify-center gap-4">
					<div class="h-6 w-24 bg-white/20 rounded animate-pulse"></div>
					<div class="h-6 w-32 bg-white/20 rounded animate-pulse"></div>
				</div>
			</div>
		</div>
		
		<!-- Skeleton Content -->
		<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
			<!-- Tabs -->
			<div class="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
				{#each Array(4) as _}
					<div class="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
				{/each}
			</div>
			
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<!-- Main Content -->
				<div class="lg:col-span-2 space-y-6">
					<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
						<div class="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
						<div class="space-y-4">
							{#each Array(5) as _}
								<div class="flex items-center gap-4 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
									<div class="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full animate-pulse"></div>
									<div class="flex-1 space-y-2">
										<div class="h-4 w-48 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
										<div class="h-3 w-24 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
									</div>
									<div class="h-4 w-12 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
								</div>
							{/each}
						</div>
					</div>
				</div>
				
				<!-- Sidebar -->
				<div class="space-y-6">
					<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
						<div class="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
						<div class="space-y-3">
							{#each Array(4) as _}
								<div class="flex justify-between">
									<div class="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
									<div class="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{:else if game}
	<div class="bg-white dark:bg-gray-900 min-h-screen">
		<!-- Hero Section -->
		<div class="relative overflow-hidden !bg-gradient-to-br !from-blue-600 !via-blue-700 !to-indigo-800 dark:!from-blue-800 dark:!via-blue-900 dark:!to-indigo-900" style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #3730a3 100%);">
			<div class="absolute inset-0 overflow-hidden">
				<div class="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
				<div class="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
			</div>
			
			<div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
				<!-- Game Status -->
				<div class="flex items-center justify-center gap-3 mb-8">
					<span class="px-5 py-2.5 bg-red-600 text-white text-sm font-black uppercase tracking-wider rounded-lg shadow-lg border-2 border-white">
						{game.sportName}
					</span>
					<span class="px-5 py-2.5 bg-gray-800/80 text-white text-sm font-bold rounded-lg border-2 border-white">
						{format(game.date, 'MMM d, yyyy')}
					</span>
					<span class="px-5 py-2.5 bg-green-600 text-white text-sm font-bold rounded-lg border-2 border-white">
						{game.status}
					</span>
				</div>
				
				<!-- Teams and Score -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center">
					<!-- Team 1 -->
					<div class="text-center md:text-right">
						<button
							on:click={() => goto(`/${game.sport}/team/${game.team1Slug}`)}
							class="group w-full"
						>
							<div class="mb-4">
								<div class="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-white transform group-hover:scale-110 transition-transform duration-300 mb-4">
									<span class="text-5xl sm:text-6xl">{game.sportLogo}</span>
								</div>
							</div>
							<h2 class="headline-hero text-white mb-2 group-hover:text-red-400 transition-colors drop-shadow-lg">
								{game.team1}
							</h2>
							<p class="text-xl text-white font-bold mb-2">{game.team1Abbr}</p>
							<p class="text-sm text-white/70 font-semibold">({game.teamRecords?.team1?.wins || 0}-{game.teamRecords?.team1?.losses || 0})</p>
						</button>
					</div>
					
					<!-- Score -->
					<div class="text-center">
						<div class="flex items-center justify-center gap-6 mb-4">
							<div class="text-center">
								<div class="text-7xl sm:text-8xl lg:text-9xl font-black text-white leading-none mb-2 drop-shadow-2xl {
									parseInt(game.score1) > parseInt(game.score2) ? 'text-green-400' : ''
								}">
									{game.score1}
								</div>
							</div>
							<div class="text-5xl sm:text-6xl text-white font-black">-</div>
							<div class="text-center">
								<div class="text-7xl sm:text-8xl lg:text-9xl font-black text-white leading-none mb-2 drop-shadow-2xl {
									parseInt(game.score2) > parseInt(game.score1) ? 'text-green-400' : ''
								}">
									{game.score2}
								</div>
							</div>
						</div>
						{#if game.quarter}
							<p class="text-xl text-white font-bold uppercase tracking-wider">{game.quarter}</p>
						{/if}
					</div>
					
					<!-- Team 2 -->
					<div class="text-center md:text-left">
						<button
							on:click={() => goto(`/${game.sport}/team/${game.team2Slug}`)}
							class="group w-full"
						>
							<div class="mb-4">
								<div class="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-white transform group-hover:scale-110 transition-transform duration-300 mb-4">
									<span class="text-5xl sm:text-6xl">{game.sportLogo}</span>
								</div>
							</div>
							<h2 class="headline-hero text-white mb-2 group-hover:text-red-400 transition-colors drop-shadow-lg">
								{game.team2}
							</h2>
							<p class="text-xl text-white font-bold mb-2">{game.team2Abbr}</p>
							<p class="text-sm text-white/70 font-semibold">({game.teamRecords?.team2?.wins || 0}-{game.teamRecords?.team2?.losses || 0})</p>
						</button>
					</div>
				</div>
				
				<!-- Game Info Cards -->
				<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-10">
					<div class="group relative bg-white/15 backdrop-blur-xl rounded-xl p-6 border-2 border-white shadow-2xl transform hover:scale-105 hover:bg-white/20 transition-all duration-300">
						<div class="text-white/90 text-xs font-bold uppercase tracking-wider mb-2">Venue</div>
						<div class="text-base font-bold text-white leading-tight">{game.venue}</div>
					</div>
					<div class="group relative bg-white/15 backdrop-blur-xl rounded-xl p-6 border-2 border-white shadow-2xl transform hover:scale-105 hover:bg-white/20 transition-all duration-300">
						<div class="text-white/90 text-xs font-bold uppercase tracking-wider mb-2">Attendance</div>
						<div class="text-2xl font-black text-white leading-none">{game.attendance?.toLocaleString() || 'N/A'}</div>
					</div>
					<div class="group relative bg-white/15 backdrop-blur-xl rounded-xl p-6 border-2 border-white shadow-2xl transform hover:scale-105 hover:bg-white/20 transition-all duration-300">
						<div class="text-white/90 text-xs font-bold uppercase tracking-wider mb-2">Date</div>
						<div class="text-base font-bold text-white leading-tight">{format(game.date, 'MMM d')}</div>
					</div>
					<div class="group relative bg-white/15 backdrop-blur-xl rounded-xl p-6 border-2 border-white shadow-2xl transform hover:scale-105 hover:bg-white/20 transition-all duration-300">
						<div class="text-white/90 text-xs font-bold uppercase tracking-wider mb-2">Time</div>
						<div class="text-base font-bold text-white leading-tight">{format(game.date, 'h:mm a')}</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Game Details Section -->
		<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-7xl">
			<!-- Scoring by Quarter -->
			{#if game.scoringByQuarter}
				<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 p-8 mb-8">
					<h3 class="headline-small text-gray-900 dark:text-white mb-6">Scoring by Quarter</h3>
					<div class="overflow-x-auto">
						<table class="w-full">
							<thead>
								<tr class="border-b-2 border-gray-300 dark:border-gray-600">
									<th class="text-left py-3 px-4 text-sm font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">Quarter</th>
									<th class="text-center py-3 px-4 text-sm font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">{game.team1Abbr}</th>
									<th class="text-center py-3 px-4 text-sm font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">{game.team2Abbr}</th>
								</tr>
							</thead>
							<tbody>
								{#each ['1st', '2nd', '3rd', '4th'] as quarter, i}
									<tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">
										<td class="py-4 px-4 font-bold text-gray-900 dark:text-white">{quarter}</td>
										<td class="py-4 px-4 text-center text-2xl font-black text-gray-900 dark:text-white">{game.scoringByQuarter.team1[i] || 0}</td>
										<td class="py-4 px-4 text-center text-2xl font-black text-gray-900 dark:text-white">{game.scoringByQuarter.team2[i] || 0}</td>
									</tr>
								{/each}
								<tr class="bg-gray-100 dark:bg-gray-900 border-t-2 border-gray-300 dark:border-gray-600">
									<td class="py-4 px-4 font-black text-gray-900 dark:text-white">Total</td>
									<td class="py-4 px-4 text-center text-3xl font-black text-gray-900 dark:text-white">{game.score1}</td>
									<td class="py-4 px-4 text-center text-3xl font-black text-gray-900 dark:text-white">{game.score2}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			{/if}

			<!-- Team Stats Comparison -->
			{#if game.teamStats}
				<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 p-8 mb-8">
					<h3 class="headline-small text-gray-900 dark:text-white mb-6">Team Statistics</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div class="space-y-4">
							<h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">{game.team1}</h4>
							<div class="space-y-3">
								<div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700">
									<span class="text-gray-700 dark:text-gray-300 font-semibold">Total Yards</span>
									<span class="text-2xl font-black text-gray-900 dark:text-white">{game.teamStats.team1.totalYards}</span>
								</div>
								<div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700">
									<span class="text-gray-700 dark:text-gray-300 font-semibold">Passing Yards</span>
									<span class="text-xl font-bold text-gray-900 dark:text-white">{game.teamStats.team1.passingYards}</span>
								</div>
								<div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700">
									<span class="text-gray-700 dark:text-gray-300 font-semibold">Rushing Yards</span>
									<span class="text-xl font-bold text-gray-900 dark:text-white">{game.teamStats.team1.rushingYards}</span>
								</div>
								<div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700">
									<span class="text-gray-700 dark:text-gray-300 font-semibold">Turnovers</span>
									<span class="text-xl font-bold text-red-600 dark:text-red-400">{game.teamStats.team1.turnovers}</span>
								</div>
								<div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700">
									<span class="text-gray-700 dark:text-gray-300 font-semibold">Time of Possession</span>
									<span class="text-xl font-bold text-gray-900 dark:text-white">{game.teamStats.team1.timeOfPossession}</span>
								</div>
							</div>
						</div>
						<div class="space-y-4">
							<h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">{game.team2}</h4>
							<div class="space-y-3">
								<div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700">
									<span class="text-gray-700 dark:text-gray-300 font-semibold">Total Yards</span>
									<span class="text-2xl font-black text-gray-900 dark:text-white">{game.teamStats.team2.totalYards}</span>
								</div>
								<div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700">
									<span class="text-gray-700 dark:text-gray-300 font-semibold">Passing Yards</span>
									<span class="text-xl font-bold text-gray-900 dark:text-white">{game.teamStats.team2.passingYards}</span>
								</div>
								<div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700">
									<span class="text-gray-700 dark:text-gray-300 font-semibold">Rushing Yards</span>
									<span class="text-xl font-bold text-gray-900 dark:text-white">{game.teamStats.team2.rushingYards}</span>
								</div>
								<div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700">
									<span class="text-gray-700 dark:text-gray-300 font-semibold">Turnovers</span>
									<span class="text-xl font-bold text-red-600 dark:text-red-400">{game.teamStats.team2.turnovers}</span>
								</div>
								<div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700">
									<span class="text-gray-700 dark:text-gray-300 font-semibold">Time of Possession</span>
									<span class="text-xl font-bold text-gray-900 dark:text-white">{game.teamStats.team2.timeOfPossession}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if}

			<!-- Top Performers -->
			{#if game.topPerformers}
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
					<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 p-8">
						<div class="flex items-center justify-between mb-6">
							<h3 class="headline-small text-gray-900 dark:text-white">{game.team1} Top Performers</h3>
							<button
								on:click={() => goto(`/${game.sport}/team/${game.team1Slug}`)}
								class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors"
							>
								View Team →
							</button>
						</div>
						<div class="space-y-4">
							{#each game.topPerformers.team1 as performer}
								<div class="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700">
									<div>
										<div class="font-bold text-gray-900 dark:text-white mb-1">{performer.name}</div>
										<div class="text-sm text-gray-600 dark:text-gray-400">{performer.stat}</div>
									</div>
									<div class="text-2xl font-black text-gray-900 dark:text-white">{performer.value}</div>
								</div>
							{/each}
						</div>
					</div>
					
					<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 p-8">
						<div class="flex items-center justify-between mb-6">
							<h3 class="headline-small text-gray-900 dark:text-white">{game.team2} Top Performers</h3>
							<button
								on:click={() => goto(`/${game.sport}/team/${game.team2Slug}`)}
								class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors"
							>
								View Team →
							</button>
						</div>
						<div class="space-y-4">
							{#each game.topPerformers.team2 as performer}
								<div class="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700">
									<div>
										<div class="font-bold text-gray-900 dark:text-white mb-1">{performer.name}</div>
										<div class="text-sm text-gray-600 dark:text-gray-400">{performer.stat}</div>
									</div>
									<div class="text-2xl font-black text-gray-900 dark:text-white">{performer.value}</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

