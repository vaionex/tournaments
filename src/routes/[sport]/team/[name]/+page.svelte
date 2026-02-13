<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { format } from 'date-fns';
	import { getSportFallbackImage } from '$lib/data/sport-images';
	import TeamNavbar from '$lib/components/team/TeamNavbar.svelte';
	
	let team = null;
	let roster = [];
	let recentGames = [];
	let upcomingGames = [];
	let teamStats = null;
	let newsArticles = [];
	let transactions = [];
	let topPlayers = [];
	let loading = true;
	let activeTab = 'overview';
	
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
	
	const teamData = {
		'nfl': {
			'49ers': { city: 'San Francisco', fullName: 'San Francisco 49ers', founded: 1946, stadium: 'Levi\'s Stadium', capacity: 68500, colors: ['#AA0000', '#B3995D'], conference: 'NFC', division: 'NFC West' },
			'chiefs': { city: 'Kansas City', fullName: 'Kansas City Chiefs', founded: 1960, stadium: 'Arrowhead Stadium', capacity: 76416, colors: ['#E31837', '#FFB612'], conference: 'AFC', division: 'AFC West' },
			'bills': { city: 'Buffalo', fullName: 'Buffalo Bills', founded: 1960, stadium: 'Highmark Stadium', capacity: 71608, colors: ['#00338D', '#C60C30'], conference: 'AFC', division: 'AFC East' }
		},
		'nba': {
			'lakers': { city: 'Los Angeles', fullName: 'Los Angeles Lakers', founded: 1947, stadium: 'Crypto.com Arena', capacity: 19068, colors: ['#552583', '#FDB927'], conference: 'Western', division: 'Pacific' },
			'celtics': { city: 'Boston', fullName: 'Boston Celtics', founded: 1946, stadium: 'TD Garden', capacity: 18624, colors: ['#007A33', '#BA9653'], conference: 'Eastern', division: 'Atlantic' },
			'warriors': { city: 'Golden State', fullName: 'Golden State Warriors', founded: 1946, stadium: 'Chase Center', capacity: 18064, colors: ['#1D428A', '#FFC72C'], conference: 'Western', division: 'Pacific' }
		},
		'mlb': {
			'yankees': { city: 'New York', fullName: 'New York Yankees', founded: 1903, stadium: 'Yankee Stadium', capacity: 47309, colors: ['#132448', '#FFFFFF'], league: 'American', division: 'AL East' },
			'dodgers': { city: 'Los Angeles', fullName: 'Los Angeles Dodgers', founded: 1883, stadium: 'Dodger Stadium', capacity: 56000, colors: ['#005A9C', '#EF3E42'], league: 'National', division: 'NL West' }
		},
		'soccer': {
			'arsenal': { city: 'London', fullName: 'Arsenal FC', founded: 1886, stadium: 'Emirates Stadium', capacity: 60704, colors: ['#EF0107', '#023474'], league: 'Premier League', country: 'England' },
			'chelsea': { city: 'London', fullName: 'Chelsea FC', founded: 1905, stadium: 'Stamford Bridge', capacity: 40341, colors: ['#034694', '#FFFFFF'], league: 'Premier League', country: 'England' },
			'liverpool': { city: 'Liverpool', fullName: 'Liverpool FC', founded: 1892, stadium: 'Anfield', capacity: 53394, colors: ['#C8102E', '#FFFFFF'], league: 'Premier League', country: 'England' }
		}
	};
	
	onMount(async () => {
		const sport = $page.params.sport;
		const name = $page.params.name;
		
		await new Promise(resolve => setTimeout(resolve, 500));
		
		const sportName = sportNames[sport.toLowerCase()] || sport.toUpperCase();
		const sportLogo = sportLogos[sportName] || '🏆';
		
		// Format team name from URL
		const teamNameKey = name.toLowerCase();
		const teamInfo = teamData[sport.toLowerCase()]?.[teamNameKey] || {};
		
		// Format display name
		const displayName = teamInfo.fullName || name.split('-').map(word => 
			word.charAt(0).toUpperCase() + word.slice(1)
		).join(' ');
		
		team = {
			id: `${sport}-${name}`,
			name: displayName,
			shortName: name.toUpperCase(),
			sport: sportName,
			sportCode: sport.toUpperCase(),
			logo: sportLogo,
			city: teamInfo.city || 'City',
			founded: teamInfo.founded || 1950,
			stadium: teamInfo.stadium || `${teamInfo.city || 'City'} Stadium`,
			capacity: teamInfo.capacity || 50000,
			colors: teamInfo.colors || ['#000000', '#FFFFFF'],
			conference: teamInfo.conference || teamInfo.league || 'N/A',
			division: teamInfo.division || 'N/A',
			record: {
				wins: 12 + Math.floor(Math.random() * 5),
				losses: 4 + Math.floor(Math.random() * 3),
				ties: sportName === 'NFL' ? Math.floor(Math.random() * 2) : 0
			},
			coach: `Coach ${name.charAt(0).toUpperCase() + name.slice(1)}`,
			owner: `${teamInfo.city || 'City'} Sports Group`
		};
		
		// Generate roster
		roster = generateRoster(sportName, team.name);
		
		// Generate games
		recentGames = generateRecentGames(team.name, sportName);
		upcomingGames = generateUpcomingGames(team.name, sportName);
		
		// Generate stats
		teamStats = generateTeamStats(team.name, sportName);
		
		// Generate news
		newsArticles = generateTeamNews(team.name, sportName);
		
		// Generate transactions
		transactions = generateTransactions(team.name, sportName);
		
		// Generate top players
		topPlayers = generateTopPlayers(team.name, sportName, roster);
		
		loading = false;
	});
	
	function generateRoster(sport, teamName) {
		const positions = {
			'NFL': ['QB', 'RB', 'WR', 'TE', 'OL', 'DL', 'LB', 'CB', 'S', 'K'],
			'NBA': ['PG', 'SG', 'SF', 'PF', 'C'],
			'MLB': ['P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF'],
			'SOCCER': ['GK', 'DF', 'MF', 'FW'],
			'NHL': ['G', 'D', 'LW', 'C', 'RW']
		};
		
		const teamPositions = positions[sport] || ['Player'];
		const roster = [];
		
		for (let i = 0; i < 25; i++) {
			roster.push({
				id: `player-${i}`,
				number: i < 10 ? `0${i}` : `${i}`,
				name: `Player ${i + 1}`,
				position: teamPositions[Math.floor(Math.random() * teamPositions.length)],
				age: 22 + Math.floor(Math.random() * 12),
				height: sport === 'NBA' ? `${6 + Math.floor(Math.random() * 4)}'${Math.floor(Math.random() * 12)}"` : null,
				weight: sport === 'NFL' || sport === 'NBA' ? `${180 + Math.floor(Math.random() * 100)} lbs` : null,
				stats: {
					goals: sport === 'SOCCER' || sport === 'NHL' ? Math.floor(Math.random() * 20) : null,
					points: sport === 'NBA' ? Math.floor(Math.random() * 25) : null,
					touchdowns: sport === 'NFL' ? Math.floor(Math.random() * 10) : null,
					homeRuns: sport === 'MLB' ? Math.floor(Math.random() * 30) : null
				}
			});
		}
		
		return roster;
	}
	
	function generateRecentGames(teamName, sport) {
		const games = [];
		for (let i = 0; i < 5; i++) {
			const date = new Date();
			date.setDate(date.getDate() - (i + 1));
			const isHome = i % 2 === 0;
			games.push({
				id: `game-${i}`,
				date: date,
				opponent: `Team ${i + 1}`,
				isHome: isHome,
				teamScore: Math.floor(Math.random() * 40) + 10,
				opponentScore: Math.floor(Math.random() * 40) + 10,
				result: 'W',
				venue: isHome ? 'Home' : 'Away'
			});
		}
		return games;
	}
	
	function generateUpcomingGames(teamName, sport) {
		const games = [];
		for (let i = 0; i < 5; i++) {
			const date = new Date();
			date.setDate(date.getDate() + (i + 1));
			const isHome = i % 2 === 1;
			games.push({
				id: `upcoming-${i}`,
				date: date,
				opponent: `Team ${i + 1}`,
				isHome: isHome,
				time: `${19 + i}:00`,
				venue: isHome ? 'Home' : 'Away',
				tv: 'ESPN'
			});
		}
		return games;
	}
	
	function generateTeamStats(teamName, sport) {
		return {
			pointsFor: sport === 'NFL' ? 380 + Math.floor(Math.random() * 100) : null,
			pointsAgainst: sport === 'NFL' ? 280 + Math.floor(Math.random() * 80) : null,
			totalGoals: sport === 'SOCCER' || sport === 'NHL' ? 45 + Math.floor(Math.random() * 20) : null,
			goalsAllowed: sport === 'SOCCER' || sport === 'NHL' ? 25 + Math.floor(Math.random() * 15) : null,
			pointsPerGame: sport === 'NBA' ? (105 + Math.floor(Math.random() * 15)).toFixed(1) : null,
			rebounds: sport === 'NBA' ? 42 + Math.floor(Math.random() * 8) : null,
			homeRuns: sport === 'MLB' ? 180 + Math.floor(Math.random() * 50) : null,
			battingAvg: sport === 'MLB' ? (0.250 + Math.random() * 0.030).toFixed(3) : null
		};
	}
	
	function generateTeamNews(teamName, sport) {
		return [
			{
				id: '1',
				title: `${teamName} Win Crucial Match Against Rivals`,
				excerpt: `The ${teamName} secured an important victory in their latest matchup, improving their playoff chances.`,
				date: new Date(),
				category: 'Game Recap',
				image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800'
			},
			{
				id: '2',
				title: `Star Player Returns from Injury for ${teamName}`,
				excerpt: `After weeks of recovery, a key player is set to return to the lineup this weekend.`,
				date: new Date(Date.now() - 86400000),
				category: 'Injury Report',
				image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800'
			},
			{
				id: '3',
				title: `${teamName} Trade Deadline Moves`,
				excerpt: `The team made strategic moves before the trade deadline to strengthen their roster.`,
				date: new Date(Date.now() - 172800000),
				category: 'Transactions',
				image: getSportFallbackImage($page.params.sport, '3')
			}
		];
	}
	
	function generateTransactions(teamName, sport) {
		const transactionTypes = ['Trade', 'Signing', 'Release', 'Waiver', 'Extension'];
		const transactions = [];
		for (let i = 0; i < 10; i++) {
			const date = new Date();
			date.setDate(date.getDate() - i);
			transactions.push({
				id: `trans-${i}`,
				type: transactionTypes[Math.floor(Math.random() * transactionTypes.length)],
				player: `Player ${i + 1}`,
				details: `${teamName} ${transactionTypes[Math.floor(Math.random() * transactionTypes.length)].toLowerCase()}d Player ${i + 1}`,
				date: date
			});
		}
		return transactions;
	}
	
	function generateTopPlayers(teamName, sport, roster) {
		// Sort roster by stats and return top 10
		return roster
			.map(player => ({
				...player,
				totalStats: (player.stats.goals || 0) + (player.stats.points || 0) + (player.stats.touchdowns || 0) + (player.stats.homeRuns || 0)
			}))
			.sort((a, b) => b.totalStats - a.totalStats)
			.slice(0, 10);
	}
</script>

<svelte:head>
	<title>{team?.name || 'Team'} - {team?.sport || 'Tournaments.com'}</title>
	<meta name="description" content="View {team?.name || 'team'} roster, schedule, stats, and news on Tournaments.com" />
</svelte:head>

{#if loading}
	<!-- Professional Skeleton Loader -->
	<div class="bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
		<!-- Skeleton Hero Section -->
		<div class="relative overflow-hidden bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900">
			<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
				<div class="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 mb-6">
					<!-- Skeleton Team Logo -->
					<div class="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-white/20 rounded-2xl animate-pulse"></div>
					
					<!-- Skeleton Team Info -->
					<div class="flex-1 space-y-3">
						<div class="flex gap-2">
							<div class="h-6 w-16 bg-white/20 rounded-lg animate-pulse"></div>
							<div class="h-6 w-20 bg-white/20 rounded-lg animate-pulse"></div>
						</div>
						<div class="h-10 w-2/3 bg-white/20 rounded animate-pulse"></div>
						<div class="h-4 w-1/2 bg-white/20 rounded animate-pulse"></div>
					</div>
				</div>
				
				<!-- Skeleton Stats Cards -->
				<div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
					{#each Array(4) as _}
						<div class="bg-white/15 backdrop-blur-xl rounded-xl p-4 sm:p-5 border-2 border-white/25">
							<div class="h-3 w-12 bg-white/20 rounded animate-pulse mb-2"></div>
							<div class="h-8 w-16 bg-white/20 rounded animate-pulse"></div>
						</div>
					{/each}
				</div>
			</div>
		</div>
		
		<!-- Skeleton Tabs -->
		<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-7xl border-b border-gray-200 dark:border-gray-700">
			<div class="flex gap-4">
				{#each Array(5) as _}
					<div class="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
				{/each}
			</div>
		</div>
		
		<!-- Skeleton Content -->
		<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
				<!-- Main Content -->
				<div class="lg:col-span-2 space-y-6">
					<!-- Skeleton Roster Table -->
					<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
						<div class="p-4 border-b border-gray-200 dark:border-gray-700">
							<div class="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
						</div>
						<div class="divide-y divide-gray-200 dark:divide-gray-700">
							{#each Array(8) as _}
								<div class="p-4 flex items-center gap-4">
									<div class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
									<div class="flex-1 space-y-2">
										<div class="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
										<div class="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
									</div>
									<div class="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
								</div>
							{/each}
						</div>
					</div>
				</div>
				
				<!-- Skeleton Sidebar -->
				<div class="space-y-6">
					<!-- Skeleton Team Stats -->
					<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
						<div class="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
						<div class="space-y-3">
							{#each Array(4) as _}
								<div class="flex justify-between items-center">
									<div class="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
									<div class="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
								</div>
							{/each}
						</div>
					</div>
					
					<!-- Skeleton Upcoming Games -->
					<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
						<div class="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
						<div class="space-y-4">
							{#each Array(3) as _}
								<div class="p-3 bg-gray-100 dark:bg-gray-900 rounded-lg">
									<div class="flex justify-between items-center mb-2">
										<div class="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
										<div class="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
									</div>
									<div class="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{:else if team}
	<div class="bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
		<!-- Hero Section -->
		<div class="relative overflow-hidden !bg-gradient-to-br !from-blue-600 !via-blue-700 !to-indigo-800 dark:!from-blue-800 dark:!via-blue-900 dark:!to-indigo-900" style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #3730a3 100%);">
			<div class="absolute inset-0 overflow-hidden">
				<div class="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
				<div class="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
			</div>
			
			<div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
				<div class="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
					<!-- Team Logo/Icon -->
					<div class="relative group">
						<div class="absolute inset-0 bg-white/20 rounded-2xl blur-xl transform group-hover:scale-110 transition-transform duration-300"></div>
						<div class="relative inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-white/30 transform group-hover:scale-105 transition-transform duration-300">
							<span class="text-4xl sm:text-5xl lg:text-6xl">{team.logo}</span>
						</div>
					</div>
					
					<!-- Team Info -->
					<div class="flex-1">
						<div class="flex flex-wrap items-center gap-2 mb-2">
							<span class="px-3 py-1 bg-white/25 backdrop-blur-md rounded-lg text-white text-xs font-black uppercase tracking-wider border border-white/30 shadow-lg">
								{team.sport}
							</span>
							<span class="px-3 py-1 bg-white/15 backdrop-blur-sm rounded-lg text-white/90 text-xs font-bold border border-white/20">
								{team.conference}
							</span>
							<span class="px-3 py-1 bg-white/15 backdrop-blur-sm rounded-lg text-white/90 text-xs font-bold border border-white/20">
								{team.division}
							</span>
						</div>
						<h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2 drop-shadow-2xl leading-tight">
							{team.name}
						</h1>
						<p class="text-sm sm:text-base text-white/95 max-w-3xl leading-relaxed font-medium mb-2">
							{team.city} • Founded {team.founded} • {team.stadium}
						</p>
						<div class="flex items-center gap-2 text-white/80">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
							</svg>
							<span class="text-xs font-semibold">Record: {team.record.wins}-{team.record.losses}{team.record.ties > 0 ? `-${team.record.ties}` : ''}</span>
						</div>
					</div>
				</div>
				
				<!-- Team Info Cards -->
				<div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
					<div class="group relative bg-white/15 backdrop-blur-xl rounded-xl p-4 sm:p-5 border-2 border-white/25 shadow-2xl transform hover:scale-105 hover:bg-white/20 transition-all duration-300 overflow-hidden">
						<div class="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-2xl"></div>
						<div class="relative">
							<div class="text-white/90 text-xs font-bold uppercase tracking-wider mb-2">Record</div>
							<div class="text-2xl sm:text-3xl font-black text-white leading-none">{team.record.wins}-{team.record.losses}</div>
						</div>
					</div>
					<div class="group relative bg-white/15 backdrop-blur-xl rounded-xl p-4 sm:p-5 border-2 border-white/25 shadow-2xl transform hover:scale-105 hover:bg-white/20 transition-all duration-300 overflow-hidden">
						<div class="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-2xl"></div>
						<div class="relative">
							<div class="text-white/90 text-xs font-bold uppercase tracking-wider mb-2">Founded</div>
							<div class="text-2xl sm:text-3xl font-black text-white leading-none">{team.founded}</div>
						</div>
					</div>
					<div class="group relative bg-white/15 backdrop-blur-xl rounded-xl p-4 sm:p-5 border-2 border-white/25 shadow-2xl transform hover:scale-105 hover:bg-white/20 transition-all duration-300 overflow-hidden">
						<div class="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-2xl"></div>
						<div class="relative">
							<div class="text-white/90 text-xs font-bold uppercase tracking-wider mb-2">Stadium</div>
							<div class="text-sm sm:text-base font-bold text-white leading-tight">{team.stadium.split(' ')[0]}</div>
						</div>
					</div>
					<div class="group relative bg-white/15 backdrop-blur-xl rounded-xl p-4 sm:p-5 border-2 border-white/25 shadow-2xl transform hover:scale-105 hover:bg-white/20 transition-all duration-300 overflow-hidden">
						<div class="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-2xl"></div>
						<div class="relative">
							<div class="text-white/90 text-xs font-bold uppercase tracking-wider mb-2">Capacity</div>
							<div class="text-2xl sm:text-3xl font-black text-white leading-none">{team.capacity.toLocaleString()}</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Team Navbar -->
		<TeamNavbar bind:activeTab teamShortName={team.shortName} teamIcon={team.logo} />

		<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">

			<!-- Overview Tab -->
			{#if activeTab === 'overview'}
				<div class="space-y-6 sm:space-y-8">
					<!-- Quick Stats -->
					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
						{#if teamStats.pointsFor}
							<div class="group relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 rounded-2xl shadow-xl border-2 border-blue-200 dark:border-blue-800/50 p-5 transform hover:scale-105 hover:shadow-2xl transition-all duration-300 overflow-hidden">
								<div class="absolute top-0 right-0 w-24 h-24 bg-blue-400/20 rounded-full blur-3xl"></div>
								<div class="relative">
									<div class="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">Points For</div>
									<div class="text-3xl font-black text-gray-900 dark:text-white leading-none">{teamStats.pointsFor}</div>
								</div>
							</div>
							<div class="group relative bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 rounded-2xl shadow-xl border-2 border-red-200 dark:border-red-800/50 p-5 transform hover:scale-105 hover:shadow-2xl transition-all duration-300 overflow-hidden">
								<div class="absolute top-0 right-0 w-24 h-24 bg-red-400/20 rounded-full blur-3xl"></div>
								<div class="relative">
									<div class="text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-2">Points Against</div>
									<div class="text-3xl font-black text-gray-900 dark:text-white leading-none">{teamStats.pointsAgainst}</div>
								</div>
							</div>
						{/if}
						{#if teamStats.totalGoals}
							<div class="group relative bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 rounded-2xl shadow-xl border-2 border-green-200 dark:border-green-800/50 p-5 transform hover:scale-105 hover:shadow-2xl transition-all duration-300 overflow-hidden">
								<div class="absolute top-0 right-0 w-24 h-24 bg-green-400/20 rounded-full blur-3xl"></div>
								<div class="relative">
									<div class="text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider mb-2">Goals Scored</div>
									<div class="text-3xl font-black text-gray-900 dark:text-white leading-none">{teamStats.totalGoals}</div>
								</div>
							</div>
						{/if}
						{#if teamStats.pointsPerGame}
							<div class="group relative bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 rounded-2xl shadow-xl border-2 border-purple-200 dark:border-purple-800/50 p-5 transform hover:scale-105 hover:shadow-2xl transition-all duration-300 overflow-hidden">
								<div class="absolute top-0 right-0 w-24 h-24 bg-purple-400/20 rounded-full blur-3xl"></div>
								<div class="relative">
									<div class="text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">PPG</div>
									<div class="text-3xl font-black text-gray-900 dark:text-white leading-none">{teamStats.pointsPerGame}</div>
								</div>
							</div>
						{/if}
					</div>

					<!-- Recent Games -->
					<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-5 sm:p-6">
						<h2 class="text-xl font-black text-gray-900 dark:text-white mb-4">Recent Games</h2>
						<div class="space-y-2">
							{#each recentGames as game}
								<div class="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transform hover:scale-[1.01] transition-all duration-300">
									<div class="flex-1 min-w-0">
										<div class="flex items-center gap-2 mb-2">
											<span class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{format(game.date, 'MMM d, yyyy')}</span>
											<span class="px-2 py-0.5 text-xs font-bold rounded {
												game.result === 'W' 
													? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
													: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
											}">
												{game.result}
											</span>
											<span class="text-xs text-gray-500 dark:text-gray-400">{game.venue}</span>
										</div>
										<div class="flex flex-wrap items-center gap-3 sm:gap-4">
											<div class="flex-1 min-w-[120px]">
												<div class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{game.isHome ? 'vs' : '@'}</div>
												<div class="font-bold text-base text-gray-900 dark:text-white">{game.opponent}</div>
											</div>
											<div class="flex items-center gap-2">
												<span class="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white min-w-[2ch] text-center">{game.teamScore}</span>
												<span class="text-gray-400 text-lg">-</span>
												<span class="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white min-w-[2ch] text-center">{game.opponentScore}</span>
											</div>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>

					<!-- Team Info -->
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-5">
							<h3 class="text-lg font-black text-gray-900 dark:text-white mb-3">Team Information</h3>
							<div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
								<div class="flex justify-between">
									<span><strong class="text-gray-900 dark:text-white">Head Coach:</strong></span>
									<span class="font-semibold">{team.coach}</span>
								</div>
								<div class="flex justify-between">
									<span><strong class="text-gray-900 dark:text-white">Owner:</strong></span>
									<span class="font-semibold">{team.owner}</span>
								</div>
								<div class="flex justify-between">
									<span><strong class="text-gray-900 dark:text-white">Stadium:</strong></span>
									<span class="font-semibold">{team.stadium}</span>
								</div>
								<div class="flex justify-between">
									<span><strong class="text-gray-900 dark:text-white">Capacity:</strong></span>
									<span class="font-semibold">{team.capacity.toLocaleString()}</span>
								</div>
							</div>
						</div>
						<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-5">
							<h3 class="text-lg font-black text-gray-900 dark:text-white mb-3">Season Record</h3>
							<div class="space-y-2">
								<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
									<span class="text-gray-600 dark:text-gray-400 font-semibold text-sm">Wins</span>
									<span class="text-2xl font-black text-green-600 dark:text-green-400">{team.record.wins}</span>
								</div>
								<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
									<span class="text-gray-600 dark:text-gray-400 font-semibold text-sm">Losses</span>
									<span class="text-2xl font-black text-red-600 dark:text-red-400">{team.record.losses}</span>
								</div>
								{#if team.record.ties > 0}
									<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
										<span class="text-gray-600 dark:text-gray-400 font-semibold text-sm">Ties</span>
										<span class="text-2xl font-black text-gray-600 dark:text-gray-400">{team.record.ties}</span>
									</div>
								{/if}
							</div>
						</div>
					</div>
				</div>
			{/if}

			<!-- Roster Tab -->
			{#if activeTab === 'roster'}
				<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-8 overflow-x-auto">
					<h2 class="headline-small text-gray-900 dark:text-white mb-6">Team Roster</h2>
					<table class="w-full">
						<thead>
							<tr class="border-b-2 border-gray-200 dark:border-gray-700">
								<th class="text-left py-3 px-4 text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-400">#</th>
								<th class="text-left py-3 px-4 text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-400">Name</th>
								<th class="text-left py-3 px-4 text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-400">Position</th>
								<th class="text-center py-3 px-4 text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-400">Age</th>
								{#if team.sport === 'NBA' || team.sport === 'NFL'}
									<th class="text-center py-3 px-4 text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-400">Height</th>
									<th class="text-center py-3 px-4 text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-400">Weight</th>
								{/if}
								<th class="text-center py-3 px-4 text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-400">Stats</th>
							</tr>
						</thead>
						<tbody>
							{#each roster as player}
								<tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
									<td class="py-4 px-4">
										<span class="font-black text-gray-900 dark:text-white">{player.number}</span>
									</td>
									<td class="py-4 px-4">
										<span class="font-bold text-gray-900 dark:text-white">{player.name}</span>
									</td>
									<td class="py-4 px-4">
										<span class="text-gray-700 dark:text-gray-300 font-semibold">{player.position}</span>
									</td>
									<td class="py-4 px-4 text-center">
										<span class="text-gray-700 dark:text-gray-300">{player.age}</span>
									</td>
									{#if team.sport === 'NBA' || team.sport === 'NFL'}
										<td class="py-4 px-4 text-center">
											<span class="text-gray-700 dark:text-gray-300">{player.height || 'N/A'}</span>
										</td>
										<td class="py-4 px-4 text-center">
											<span class="text-gray-700 dark:text-gray-300">{player.weight || 'N/A'}</span>
										</td>
									{/if}
									<td class="py-4 px-4 text-center">
										<span class="text-gray-700 dark:text-gray-300 font-semibold">
											{#if player.stats.goals}{player.stats.goals}G{/if}
											{#if player.stats.points}{player.stats.points} PTS{/if}
											{#if player.stats.touchdowns}{player.stats.touchdowns} TD{/if}
											{#if player.stats.homeRuns}{player.stats.homeRuns} HR{/if}
										</span>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}

			<!-- Schedule Tab -->
			{#if activeTab === 'schedule'}
				<div class="space-y-6">
					<!-- Upcoming Games -->
					<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-8">
						<h2 class="headline-small text-gray-900 dark:text-white mb-6">Upcoming Games</h2>
						<div class="space-y-4">
							{#each upcomingGames as game}
								<div class="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700">
									<div class="flex-1">
										<div class="text-sm text-gray-500 dark:text-gray-400 mb-2">{format(game.date, 'MMM d, yyyy')} at {game.time}</div>
										<div class="flex items-center gap-4">
											<span class="font-bold text-gray-900 dark:text-white">{game.isHome ? 'vs' : '@'} {game.opponent}</span>
										</div>
										<div class="text-sm text-gray-600 dark:text-gray-400 mt-1">{game.venue} • {game.tv}</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/if}

			<!-- Stats Tab -->
			{#if activeTab === 'stats'}
				<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-8">
					<h2 class="headline-small text-gray-900 dark:text-white mb-6">Team Statistics</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						{#if teamStats.pointsFor}
							<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
								<div class="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-2">Points For</div>
								<div class="text-4xl font-black text-gray-900 dark:text-white">{teamStats.pointsFor}</div>
							</div>
							<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
								<div class="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-2">Points Against</div>
								<div class="text-4xl font-black text-gray-900 dark:text-white">{teamStats.pointsAgainst}</div>
							</div>
						{/if}
						{#if teamStats.totalGoals}
							<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
								<div class="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-2">Goals Scored</div>
								<div class="text-4xl font-black text-gray-900 dark:text-white">{teamStats.totalGoals}</div>
							</div>
							<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
								<div class="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-2">Goals Allowed</div>
								<div class="text-4xl font-black text-gray-900 dark:text-white">{teamStats.goalsAllowed}</div>
							</div>
						{/if}
						{#if teamStats.pointsPerGame}
							<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
								<div class="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-2">Points Per Game</div>
								<div class="text-4xl font-black text-gray-900 dark:text-white">{teamStats.pointsPerGame}</div>
							</div>
							<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
								<div class="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-2">Rebounds Per Game</div>
								<div class="text-4xl font-black text-gray-900 dark:text-white">{teamStats.rebounds}</div>
							</div>
						{/if}
						{#if teamStats.homeRuns}
							<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
								<div class="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-2">Home Runs</div>
								<div class="text-4xl font-black text-gray-900 dark:text-white">{teamStats.homeRuns}</div>
							</div>
							<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
								<div class="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-2">Batting Average</div>
								<div class="text-4xl font-black text-gray-900 dark:text-white">{teamStats.battingAvg}</div>
							</div>
						{/if}
					</div>
				</div>
			{/if}

			<!-- Players Tab -->
			{#if activeTab === 'players'}
				<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-8">
					<h2 class="headline-small text-gray-900 dark:text-white mb-6">Top Players</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each topPlayers as player}
							<div class="group bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 p-6 transform hover:scale-105 hover:shadow-xl transition-all duration-300">
								<div class="flex items-center gap-4 mb-4">
									<div class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-black">
										{player.number}
									</div>
									<div class="flex-1 min-w-0">
										<h3 class="font-bold text-lg text-gray-900 dark:text-white truncate">{player.name}</h3>
										<p class="text-sm text-gray-600 dark:text-gray-400">{player.position}</p>
									</div>
								</div>
								<div class="space-y-2">
									<div class="flex justify-between text-sm">
										<span class="text-gray-600 dark:text-gray-400">Age:</span>
										<span class="font-semibold text-gray-900 dark:text-white">{player.age}</span>
									</div>
									{#if player.height}
										<div class="flex justify-between text-sm">
											<span class="text-gray-600 dark:text-gray-400">Height:</span>
											<span class="font-semibold text-gray-900 dark:text-white">{player.height}</span>
										</div>
									{/if}
									{#if player.weight}
										<div class="flex justify-between text-sm">
											<span class="text-gray-600 dark:text-gray-400">Weight:</span>
											<span class="font-semibold text-gray-900 dark:text-white">{player.weight}</span>
										</div>
									{/if}
									<div class="pt-2 border-t border-gray-200 dark:border-gray-700">
										<div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Stats</div>
										<div class="flex flex-wrap gap-2">
											{#if player.stats.goals}
												<span class="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold rounded">
													{player.stats.goals}G
												</span>
											{/if}
											{#if player.stats.points}
												<span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded">
													{player.stats.points} PTS
												</span>
											{/if}
											{#if player.stats.touchdowns}
												<span class="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-bold rounded">
													{player.stats.touchdowns} TD
												</span>
											{/if}
											{#if player.stats.homeRuns}
												<span class="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-bold rounded">
													{player.stats.homeRuns} HR
												</span>
											{/if}
										</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- News Tab -->
			{#if activeTab === 'news'}
				<div class="space-y-6">
					{#each newsArticles as article}
						<a 
							href="#news-{article.id}"
							class="group block bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 p-6 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
						>
							<div class="flex gap-6">
								<div class="flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden">
									<img 
										src={article.image} 
										alt={article.title}
										class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
									/>
								</div>
								<div class="flex-1 min-w-0">
									<div class="flex items-center gap-3 mb-2">
										<span class="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold rounded">
											{article.category}
										</span>
										<span class="text-xs text-gray-500 dark:text-gray-400">
											{format(article.date, 'MMM d')}
										</span>
									</div>
									<h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
										{article.title}
									</h3>
									<p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
										{article.excerpt}
									</p>
								</div>
							</div>
						</a>
					{/each}
					
					<!-- View All Team News Link -->
					<div class="mt-6 text-center">
						<a 
							href="/news?team={team?.name}" 
							class="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
						>
							More {team?.name} News
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</a>
					</div>
				</div>
			{/if}

			<!-- Transactions Tab -->
			{#if activeTab === 'transactions'}
				<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-8">
					<h2 class="headline-small text-gray-900 dark:text-white mb-6">Recent Transactions</h2>
					<div class="space-y-4">
						{#each transactions as transaction}
							<div class="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300">
								<div class="flex-1">
									<div class="flex items-center gap-3 mb-2">
										<span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-full">
											{transaction.type}
										</span>
										<span class="text-xs text-gray-500 dark:text-gray-400">
											{format(transaction.date, 'MMM d, yyyy')}
										</span>
									</div>
									<h3 class="font-bold text-gray-900 dark:text-white mb-1">{transaction.player}</h3>
									<p class="text-sm text-gray-600 dark:text-gray-400">{transaction.details}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- More Tab -->
			{#if activeTab === 'more'}
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-8">
						<h3 class="headline-small text-gray-900 dark:text-white mb-4">Team History</h3>
						<div class="space-y-3 text-gray-600 dark:text-gray-400">
							<p>Founded in {team.founded}, the {team.name} have established themselves as a competitive force in the {team.sport}.</p>
							<p>Based in {team.city}, the team plays their home games at {team.stadium}, which has a capacity of {team.capacity.toLocaleString()}.</p>
						</div>
					</div>
					<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-8">
						<h3 class="headline-small text-gray-900 dark:text-white mb-4">Contact Information</h3>
						<div class="space-y-3 text-gray-600 dark:text-gray-400">
							<div>
								<strong class="text-gray-900 dark:text-white">Stadium:</strong> {team.stadium}
							</div>
							<div>
								<strong class="text-gray-900 dark:text-white">Location:</strong> {team.city}
							</div>
							<div>
								<strong class="text-gray-900 dark:text-white">Conference:</strong> {team.conference}
							</div>
							<div>
								<strong class="text-gray-900 dark:text-white">Division:</strong> {team.division}
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

