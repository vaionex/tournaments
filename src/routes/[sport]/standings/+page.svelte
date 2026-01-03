<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import PageSEO from '$lib/components/seo/PageSEO.svelte';
	
	let sport = '';
	let sportConfig = null;
	let loading = true;
	let activeConference = 'all';
	let standings = [];
	
	const sportsConfig = {
		'nfl': { name: 'NFL', icon: '🏈', color: 'bg-green-700', conferences: ['AFC', 'NFC'], divisions: true },
		'nba': { name: 'NBA', icon: '🏀', color: 'bg-orange-600', conferences: ['Eastern', 'Western'], divisions: false },
		'mlb': { name: 'MLB', icon: '⚾', color: 'bg-red-600', conferences: ['American League', 'National League'], divisions: true },
		'nhl': { name: 'NHL', icon: '🏒', color: 'bg-blue-700', conferences: ['Eastern', 'Western'], divisions: true },
		'soccer': { name: 'Premier League', icon: '⚽', color: 'bg-purple-700', conferences: [], divisions: false },
		'ncaaf': { name: 'NCAAF', icon: '🏈', color: 'bg-orange-600', conferences: ['SEC', 'Big Ten', 'ACC', 'Big 12', 'Pac-12'], divisions: false },
		'wnba': { name: 'WNBA', icon: '🏀', color: 'bg-orange-500', conferences: ['Eastern', 'Western'], divisions: false }
	};
	
	const teamsData = {
		'nfl': {
			'AFC': {
				'East': ['Bills', 'Dolphins', 'Jets', 'Patriots'],
				'North': ['Ravens', 'Steelers', 'Browns', 'Bengals'],
				'South': ['Texans', 'Colts', 'Jaguars', 'Titans'],
				'West': ['Chiefs', 'Broncos', 'Raiders', 'Chargers']
			},
			'NFC': {
				'East': ['Eagles', 'Cowboys', 'Giants', 'Commanders'],
				'North': ['Lions', 'Packers', 'Vikings', 'Bears'],
				'South': ['Saints', 'Buccaneers', 'Falcons', 'Panthers'],
				'West': ['49ers', 'Rams', 'Seahawks', 'Cardinals']
			}
		},
		'nba': {
			'Eastern': ['Celtics', '76ers', 'Knicks', 'Cavaliers', 'Bucks', 'Heat', 'Pacers', 'Magic', 'Bulls', 'Nets', 'Hawks', 'Raptors', 'Hornets', 'Wizards', 'Pistons'],
			'Western': ['Nuggets', 'Thunder', 'Timberwolves', 'Clippers', 'Lakers', 'Suns', 'Kings', 'Warriors', 'Mavericks', 'Pelicans', 'Rockets', 'Jazz', 'Grizzlies', 'Spurs', 'Trail Blazers']
		},
		'mlb': {
			'American League': {
				'East': ['Yankees', 'Orioles', 'Rays', 'Blue Jays', 'Red Sox'],
				'Central': ['Twins', 'Guardians', 'Tigers', 'Royals', 'White Sox'],
				'West': ['Astros', 'Rangers', 'Mariners', 'Angels', 'Athletics']
			},
			'National League': {
				'East': ['Braves', 'Phillies', 'Marlins', 'Mets', 'Nationals'],
				'Central': ['Brewers', 'Cubs', 'Reds', 'Cardinals', 'Pirates'],
				'West': ['Dodgers', 'Diamondbacks', 'Padres', 'Giants', 'Rockies']
			}
		},
		'nhl': {
			'Eastern': {
				'Atlantic': ['Panthers', 'Lightning', 'Maple Leafs', 'Bruins', 'Sabres', 'Red Wings', 'Senators', 'Canadiens'],
				'Metropolitan': ['Rangers', 'Hurricanes', 'Devils', 'Islanders', 'Capitals', 'Flyers', 'Penguins', 'Blue Jackets']
			},
			'Western': {
				'Central': ['Stars', 'Avalanche', 'Jets', 'Wild', 'Blues', 'Predators', 'Blackhawks', 'Coyotes'],
				'Pacific': ['Canucks', 'Oilers', 'Golden Knights', 'Kings', 'Kraken', 'Flames', 'Ducks', 'Sharks']
			}
		},
		'soccer': ['Arsenal', 'Liverpool', 'Man City', 'Chelsea', 'Tottenham', 'Newcastle', 'Brighton', 'Aston Villa', 'Man United', 'West Ham', 'Fulham', 'Brentford', 'Crystal Palace', 'Wolves', 'Bournemouth', 'Nottm Forest', 'Everton', 'Luton', 'Burnley', 'Sheffield Utd']
	};
	
	function generateStandings(sportCode) {
		const config = sportsConfig[sportCode];
		const teams = teamsData[sportCode];
		
		if (!teams) return [];
		
		const generateTeamStats = (team, rank) => {
			const games = sportCode === 'mlb' ? 162 : sportCode === 'nba' || sportCode === 'nhl' ? 82 : sportCode === 'soccer' ? 38 : 17;
			const played = Math.floor(games * (0.3 + Math.random() * 0.4));
			const wins = Math.floor(played * (0.3 + Math.random() * 0.5));
			const losses = sportCode === 'soccer' || sportCode === 'nhl' ? Math.floor((played - wins) * 0.7) : played - wins;
			const draws = sportCode === 'soccer' ? played - wins - losses : 0;
			const otLosses = sportCode === 'nhl' ? played - wins - losses : 0;
			
			return {
				rank,
				team,
				logo: `https://ui-avatars.com/api/?name=${team}&background=random&size=40`,
				wins,
				losses,
				draws,
				otLosses,
				pct: wins / played,
				gamesBack: rank === 1 ? '-' : (rank - 1) * 1.5,
				streak: `${Math.random() > 0.5 ? 'W' : 'L'}${Math.floor(Math.random() * 6) + 1}`,
				last10: `${Math.floor(Math.random() * 4) + 5}-${Math.floor(Math.random() * 4) + 1}`,
				home: `${Math.floor(wins * 0.55)}-${Math.floor(losses * 0.45)}`,
				away: `${Math.floor(wins * 0.45)}-${Math.floor(losses * 0.55)}`,
				pointsFor: Math.floor(Math.random() * 150) + 250,
				pointsAgainst: Math.floor(Math.random() * 150) + 230,
				goalDiff: 0,
				points: wins * 3 + draws
			};
		};
		
		const result = { conferences: [] };
		
		if (sportCode === 'soccer') {
			// Simple table for soccer
			const sortedTeams = [...teams].map((team, i) => generateTeamStats(team, i + 1));
			sortedTeams.sort((a, b) => b.points - a.points || (b.pointsFor - b.pointsAgainst) - (a.pointsFor - a.pointsAgainst));
			sortedTeams.forEach((team, i) => {
				team.rank = i + 1;
				team.goalDiff = team.pointsFor - team.pointsAgainst;
			});
			result.conferences.push({ name: 'Premier League Table', teams: sortedTeams });
		} else if (config.divisions && typeof teams === 'object') {
			// Conference/Division structure
			Object.entries(teams).forEach(([confName, divisions]) => {
				const conference = { name: confName, divisions: [] };
				if (typeof divisions === 'object' && !Array.isArray(divisions)) {
					Object.entries(divisions).forEach(([divName, divTeams]) => {
						const sortedTeams = divTeams.map((team, i) => generateTeamStats(team, i + 1));
						sortedTeams.sort((a, b) => b.pct - a.pct);
						sortedTeams.forEach((team, i) => team.rank = i + 1);
						conference.divisions.push({ name: divName, teams: sortedTeams });
					});
				}
				result.conferences.push(conference);
			});
		} else if (typeof teams === 'object') {
			// Just conferences, no divisions
			Object.entries(teams).forEach(([confName, confTeams]) => {
				if (Array.isArray(confTeams)) {
					const sortedTeams = confTeams.map((team, i) => generateTeamStats(team, i + 1));
					sortedTeams.sort((a, b) => b.pct - a.pct);
					sortedTeams.forEach((team, i) => team.rank = i + 1);
					result.conferences.push({ name: confName, teams: sortedTeams });
				}
			});
		}
		
		return result;
	}
	
	onMount(async () => {
		sport = $page.params.sport.toLowerCase();
		sportConfig = sportsConfig[sport] || sportsConfig['nfl'];
		
		await new Promise(resolve => setTimeout(resolve, 500));
		standings = generateStandings(sport);
		loading = false;
	});
</script>

<PageSEO 
	title="{sportConfig?.name || 'Sports'} Standings - League Tables & Rankings"
	description="View current {sportConfig?.name || 'sports'} standings, conference rankings, and division leaders. Complete league tables with win-loss records."
/>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<!-- Header -->
	<div class="{sportConfig?.color || 'bg-blue-700'} text-white py-6 sm:py-8">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
			<div class="flex items-center gap-3">
				<span class="text-3xl sm:text-4xl">{sportConfig?.icon || '🏆'}</span>
				<div>
					<h1 class="text-2xl sm:text-3xl font-bold">{sportConfig?.name || 'Sports'} Standings</h1>
					<p class="text-sm sm:text-base opacity-90">Current season standings & rankings</p>
				</div>
			</div>
		</div>
	</div>
	
	<!-- Conference Filter -->
	{#if sportConfig?.conferences?.length > 0}
		<div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-[88px] z-20">
			<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
				<div class="flex items-center gap-2 py-3 overflow-x-auto">
					<button
						on:click={() => activeConference = 'all'}
						class="px-4 py-2 rounded-lg text-sm font-medium transition-all {activeConference === 'all' 
							? `${sportConfig?.color || 'bg-blue-700'} text-white` 
							: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'}"
					>
						All
					</button>
					{#each sportConfig.conferences as conf}
						<button
							on:click={() => activeConference = conf}
							class="px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap {activeConference === conf 
								? `${sportConfig?.color || 'bg-blue-700'} text-white` 
								: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'}"
						>
							{conf}
						</button>
					{/each}
				</div>
			</div>
		</div>
	{/if}
	
	<!-- Standings Tables -->
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6">
		{#if loading}
			<div class="space-y-6">
				{#each Array(2) as _}
					<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
						<div class="p-4 border-b border-gray-200 dark:border-gray-700">
							<div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
						</div>
						<div class="p-4 space-y-3">
							{#each Array(8) as _}
								<div class="flex items-center gap-4 animate-pulse">
									<div class="w-8 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
									<div class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
									<div class="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
									<div class="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
									<div class="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
									<div class="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="space-y-6">
				{#each standings.conferences as conference}
					{#if activeConference === 'all' || activeConference === conference.name}
						{#if conference.divisions}
							<!-- With Divisions -->
							{#each conference.divisions as division}
								<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
									<div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 {sportConfig?.color || 'bg-blue-700'}">
										<h2 class="text-lg font-bold text-white">{conference.name} {division.name}</h2>
									</div>
									<div class="overflow-x-auto">
										<table class="w-full">
											<thead class="bg-gray-50 dark:bg-gray-700/50">
												<tr class="text-xs text-gray-500 dark:text-gray-400 uppercase">
													<th class="px-4 py-3 text-left">#</th>
													<th class="px-4 py-3 text-left">Team</th>
													<th class="px-4 py-3 text-center">W</th>
													<th class="px-4 py-3 text-center">L</th>
													{#if sport === 'nhl'}
														<th class="px-4 py-3 text-center">OTL</th>
													{/if}
													{#if sport === 'soccer'}
														<th class="px-4 py-3 text-center">D</th>
													{/if}
													<th class="px-4 py-3 text-center">PCT</th>
													<th class="px-4 py-3 text-center hidden sm:table-cell">GB</th>
													<th class="px-4 py-3 text-center hidden md:table-cell">STRK</th>
													<th class="px-4 py-3 text-center hidden lg:table-cell">L10</th>
												</tr>
											</thead>
											<tbody class="divide-y divide-gray-100 dark:divide-gray-700">
												{#each division.teams as team}
													<tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
														<td class="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">{team.rank}</td>
														<td class="px-4 py-3">
															<a href="/{sport}/team/{team.team.toLowerCase().replace(/\s/g, '-')}" class="flex items-center gap-3 hover:text-blue-600 transition-colors">
																<img src={team.logo} alt={team.team} class="w-8 h-8 rounded-full" />
																<span class="font-semibold text-gray-900 dark:text-white">{team.team}</span>
															</a>
														</td>
														<td class="px-4 py-3 text-center font-medium text-gray-900 dark:text-white">{team.wins}</td>
														<td class="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{team.losses}</td>
														{#if sport === 'nhl'}
															<td class="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{team.otLosses}</td>
														{/if}
														{#if sport === 'soccer'}
															<td class="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{team.draws}</td>
														{/if}
														<td class="px-4 py-3 text-center font-mono text-sm text-gray-900 dark:text-white">{team.pct.toFixed(3)}</td>
														<td class="px-4 py-3 text-center text-gray-600 dark:text-gray-400 hidden sm:table-cell">{team.gamesBack}</td>
														<td class="px-4 py-3 text-center hidden md:table-cell">
															<span class="px-2 py-1 text-xs font-medium rounded {team.streak.startsWith('W') ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}">
																{team.streak}
															</span>
														</td>
														<td class="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-400 hidden lg:table-cell">{team.last10}</td>
													</tr>
												{/each}
											</tbody>
										</table>
									</div>
								</div>
							{/each}
						{:else if conference.teams}
							<!-- Without Divisions -->
							<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
								<div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 {sportConfig?.color || 'bg-blue-700'}">
									<h2 class="text-lg font-bold text-white">{conference.name}</h2>
								</div>
								<div class="overflow-x-auto">
									<table class="w-full">
										<thead class="bg-gray-50 dark:bg-gray-700/50">
											<tr class="text-xs text-gray-500 dark:text-gray-400 uppercase">
												<th class="px-4 py-3 text-left">#</th>
												<th class="px-4 py-3 text-left">Team</th>
												<th class="px-4 py-3 text-center">W</th>
												<th class="px-4 py-3 text-center">L</th>
												{#if sport === 'soccer'}
													<th class="px-4 py-3 text-center">D</th>
													<th class="px-4 py-3 text-center">GD</th>
													<th class="px-4 py-3 text-center">PTS</th>
												{:else}
													<th class="px-4 py-3 text-center">PCT</th>
													<th class="px-4 py-3 text-center hidden sm:table-cell">GB</th>
													<th class="px-4 py-3 text-center hidden md:table-cell">STRK</th>
												{/if}
											</tr>
										</thead>
										<tbody class="divide-y divide-gray-100 dark:divide-gray-700">
											{#each conference.teams as team, i}
												<tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors {i < 4 && sport === 'soccer' ? 'border-l-4 border-l-green-500' : i >= 17 && sport === 'soccer' ? 'border-l-4 border-l-red-500' : ''}">
													<td class="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">{team.rank}</td>
													<td class="px-4 py-3">
														<a href="/{sport}/team/{team.team.toLowerCase().replace(/\s/g, '-')}" class="flex items-center gap-3 hover:text-blue-600 transition-colors">
															<img src={team.logo} alt={team.team} class="w-8 h-8 rounded-full" />
															<span class="font-semibold text-gray-900 dark:text-white">{team.team}</span>
														</a>
													</td>
													<td class="px-4 py-3 text-center font-medium text-gray-900 dark:text-white">{team.wins}</td>
													<td class="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{team.losses}</td>
													{#if sport === 'soccer'}
														<td class="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{team.draws}</td>
														<td class="px-4 py-3 text-center font-medium {team.goalDiff > 0 ? 'text-green-600' : team.goalDiff < 0 ? 'text-red-600' : 'text-gray-600'}">{team.goalDiff > 0 ? '+' : ''}{team.goalDiff}</td>
														<td class="px-4 py-3 text-center font-bold text-gray-900 dark:text-white">{team.points}</td>
													{:else}
														<td class="px-4 py-3 text-center font-mono text-sm text-gray-900 dark:text-white">{team.pct.toFixed(3)}</td>
														<td class="px-4 py-3 text-center text-gray-600 dark:text-gray-400 hidden sm:table-cell">{team.gamesBack}</td>
														<td class="px-4 py-3 text-center hidden md:table-cell">
															<span class="px-2 py-1 text-xs font-medium rounded {team.streak.startsWith('W') ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}">
																{team.streak}
															</span>
														</td>
													{/if}
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
								{#if sport === 'soccer'}
									<div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center gap-6 text-xs text-gray-500 dark:text-gray-400">
										<div class="flex items-center gap-2">
											<span class="w-3 h-3 bg-green-500 rounded"></span>
											<span>Champions League</span>
										</div>
										<div class="flex items-center gap-2">
											<span class="w-3 h-3 bg-red-500 rounded"></span>
											<span>Relegation</span>
										</div>
									</div>
								{/if}
							</div>
						{/if}
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</div>

