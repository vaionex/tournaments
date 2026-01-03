<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { format } from 'date-fns';
	import LeagueNavbar from '$lib/components/league/LeagueNavbar.svelte';
	
	let league = null;
	let standings = [];
	let teams = [];
	let recentMatches = [];
	let upcomingMatches = [];
	let stats = null;
	let loading = true;
	let activeTab = 'home';
	let newsArticles = [];
	let featuredNews = [];
	let transactions = [];
	let topPlayers = [];
	
	const tabs = [
		{ id: 'overview', label: 'Overview' },
		{ id: 'standings', label: 'Standings' },
		{ id: 'teams', label: 'Teams' },
		{ id: 'schedule', label: 'Schedule' },
		{ id: 'stats', label: 'Stats' }
	];
	
	const sportLogos = {
		'NFL': '🏈',
		'NBA': '🏀',
		'MLB': '⚾',
		'SOCCER': '⚽',
		'NHL': '🏒',
		'NCAAF': '🏈',
		'WNBA': '🏀'
	};
	
	const sportNames = {
		'nfl': 'NFL',
		'nba': 'NBA',
		'mlb': 'MLB',
		'soccer': 'Soccer',
		'nhl': 'NHL',
		'ncaaf': 'NCAAF',
		'wnba': 'WNBA'
	};
	
	onMount(async () => {
		const sport = $page.params.sport;
		const name = $page.params.name;
		
		await new Promise(resolve => setTimeout(resolve, 500));
		
		// Get sport name from code
		const sportName = sportNames[sport.toLowerCase()] || sport.toUpperCase();
		const sportLogo = sportLogos[sportName] || '🏆';
		
		// Format league name from URL
		const leagueName = name.split('-').map(word => 
			word.charAt(0).toUpperCase() + word.slice(1)
		).join(' ');
		
		league = {
			id: `${sport}-${name}`,
			name: leagueName,
			sport: sportName,
			sportCode: sport.toUpperCase(),
			logo: sportLogo,
			season: '2024-2025',
			country: sportName === 'SOCCER' ? getCountryForLeague(leagueName) : 'USA',
			description: `The ${leagueName} is one of the premier ${sportName} competitions, featuring top teams and players competing for the championship title.`,
			founded: getFoundedYear(leagueName),
			teamsCount: getTeamsCount(leagueName, sportName),
			currentChampion: getCurrentChampion(leagueName, sportName),
			format: getLeagueFormat(leagueName, sportName)
		};
		
		// Generate standings
		standings = generateStandings(leagueName, sportName);
		
		// Generate teams
		teams = generateTeams(leagueName, sportName);
		
		// Generate matches
		recentMatches = generateRecentMatches(leagueName, sportName);
		upcomingMatches = generateUpcomingMatches(leagueName, sportName);
		
		// Generate stats
		stats = generateStats(leagueName, sportName);
		
		// Generate news articles
		newsArticles = generateNewsArticles(leagueName, sportName);
		featuredNews = newsArticles.slice(0, 3);
		
		// Generate transactions
		transactions = generateTransactions(leagueName, sportName);
		
		// Generate top players
		topPlayers = generateTopPlayers(leagueName, sportName);
		
		loading = false;
	});
	
	function getCountryForLeague(leagueName) {
		if (leagueName.includes('Premier League') || leagueName.includes('Champions League')) return 'International';
		if (leagueName.includes('LALIGA')) return 'Spain';
		if (leagueName.includes('Bundesliga')) return 'Germany';
		if (leagueName.includes('MLS')) return 'USA';
		if (leagueName.includes('Liga MX')) return 'Mexico';
		return 'International';
	}
	
	function getFoundedYear(leagueName) {
		if (leagueName.includes('Premier League')) return 1992;
		if (leagueName.includes('Champions League')) return 1955;
		if (leagueName.includes('LALIGA')) return 1929;
		if (leagueName.includes('Bundesliga')) return 1963;
		if (leagueName.includes('MLS')) return 1996;
		return 1950;
	}
	
	function getTeamsCount(leagueName, sport) {
		if (sport === 'NFL') return 32;
		if (sport === 'NBA') return 30;
		if (sport === 'MLB') return 30;
		if (sport === 'NHL') return 32;
		if (sport === 'SOCCER') {
			if (leagueName.includes('Premier League')) return 20;
			if (leagueName.includes('Champions League')) return 32;
			if (leagueName.includes('MLS')) return 29;
			return 20;
		}
		return 30;
	}
	
	function getCurrentChampion(leagueName, sport) {
		const champions = {
			'NFL': 'Kansas City Chiefs',
			'NBA': 'Denver Nuggets',
			'MLB': 'Texas Rangers',
			'NHL': 'Vegas Golden Knights',
			'SOCCER': {
				'Premier League': 'Manchester City',
				'Champions League': 'Manchester City',
				'LALIGA': 'Barcelona',
				'Bundesliga': 'Bayern Munich',
				'MLS': 'Columbus Crew'
			}
		};
		
		if (sport === 'SOCCER' && champions.SOCCER[leagueName]) {
			return champions.SOCCER[leagueName];
		}
		return champions[sport] || 'TBD';
	}
	
	function getLeagueFormat(leagueName, sport) {
		if (sport === 'NFL' || sport === 'NBA' || sport === 'NHL') {
			return 'Conference-based with playoffs';
		}
		if (sport === 'MLB') {
			return 'Two leagues with playoffs';
		}
		if (sport === 'SOCCER') {
			if (leagueName.includes('Champions League')) {
				return 'Group stage + knockout';
			}
			return 'Round-robin league';
		}
		return 'League format';
	}
	
	function generateStandings(leagueName, sport) {
		const count = getTeamsCount(leagueName, sport);
		const standings = [];
		
		for (let i = 1; i <= Math.min(count, 20); i++) {
			standings.push({
				rank: i,
				team: `Team ${i}`,
				played: 20 + Math.floor(Math.random() * 10),
				won: 10 + Math.floor(Math.random() * 8),
				drawn: sport === 'SOCCER' ? Math.floor(Math.random() * 5) : 0,
				lost: 5 + Math.floor(Math.random() * 5),
				points: sport === 'SOCCER' ? (standings[standings.length - 1]?.points || 30) + Math.floor(Math.random() * 3) : null,
				goalDiff: sport === 'SOCCER' ? Math.floor(Math.random() * 30) - 10 : null,
				winPct: sport !== 'SOCCER' ? (50 + Math.floor(Math.random() * 40)).toFixed(1) : null
			});
		}
		
		return standings;
	}
	
	function generateTeams(leagueName, sport) {
		const count = getTeamsCount(leagueName, sport);
		const teams = [];
		const teamNames = getTeamNamesForSport(sport);
		
		for (let i = 0; i < Math.min(count, 12); i++) {
			teams.push({
				id: `team-${i + 1}`,
				name: teamNames[i] || `Team ${i + 1}`,
				city: getCityForTeam(teamNames[i] || `Team ${i + 1}`, sport),
				logo: sportLogos[sport] || '🏆',
				founded: 1950 + Math.floor(Math.random() * 70),
				stadium: `${getCityForTeam(teamNames[i] || `Team ${i + 1}`, sport)} Stadium`,
				capacity: 30000 + Math.floor(Math.random() * 50000)
			});
		}
		
		return teams;
	}
	
	function getTeamNamesForSport(sport) {
		const teams = {
			'NFL': ['Chiefs', 'Bills', 'Bengals', 'Ravens', 'Dolphins', 'Steelers', '49ers', 'Cowboys', 'Eagles', 'Packers', 'Lions', 'Rams'],
			'NBA': ['Lakers', 'Celtics', 'Warriors', 'Bucks', 'Nuggets', 'Heat', 'Suns', '76ers', 'Mavericks', 'Clippers', 'Knicks', 'Cavaliers'],
			'MLB': ['Yankees', 'Dodgers', 'Astros', 'Braves', 'Rangers', 'Phillies', 'Orioles', 'Rays', 'Blue Jays', 'Red Sox', 'Guardians', 'Twins'],
			'SOCCER': ['Arsenal', 'Chelsea', 'Liverpool', 'Man City', 'Man United', 'Barcelona', 'Real Madrid', 'Atlético Madrid', 'Bayern Munich', 'Bayer Leverkusen', 'Borussia Dortmund', 'Inter Milan'],
			'NHL': ['Avalanche', 'Bruins', 'Lightning', 'Maple Leafs', 'Rangers', 'Oilers', 'Golden Knights', 'Panthers', 'Stars', 'Canucks', 'Kings', 'Islanders']
		};
		return teams[sport] || [];
	}
	
	function getCityForTeam(teamName, sport) {
		const cities = {
			'Chiefs': 'Kansas City',
			'Bills': 'Buffalo',
			'Lakers': 'Los Angeles',
			'Celtics': 'Boston',
			'Yankees': 'New York',
			'Dodgers': 'Los Angeles',
			'Arsenal': 'London',
			'Chelsea': 'London',
			'Liverpool': 'Liverpool',
			'Man City': 'Manchester',
			'Barcelona': 'Barcelona',
			'Real Madrid': 'Madrid'
		};
		return cities[teamName] || 'City';
	}
	
	function generateRecentMatches(leagueName, sport) {
		const matches = [];
		for (let i = 0; i < 5; i++) {
			const date = new Date();
			date.setDate(date.getDate() - (i + 1));
			matches.push({
				id: `match-${i}`,
				date: date,
				homeTeam: `Team ${i + 1}`,
				awayTeam: `Team ${i + 2}`,
				homeScore: Math.floor(Math.random() * 5),
				awayScore: Math.floor(Math.random() * 5),
				status: 'completed'
			});
		}
		return matches;
	}
	
	function generateUpcomingMatches(leagueName, sport) {
		const matches = [];
		for (let i = 0; i < 5; i++) {
			const date = new Date();
			date.setDate(date.getDate() + (i + 1));
			matches.push({
				id: `upcoming-${i}`,
				date: date,
				homeTeam: `Team ${i + 1}`,
				awayTeam: `Team ${i + 2}`,
				time: `${19 + i}:00`,
				venue: 'Stadium',
				status: 'upcoming'
			});
		}
		return matches;
	}
	
	function generateStats(leagueName, sport) {
		return {
			totalMatches: 380 + Math.floor(Math.random() * 100),
			totalGoals: sport === 'SOCCER' ? 950 + Math.floor(Math.random() * 200) : null,
			totalPoints: sport !== 'SOCCER' ? 45000 + Math.floor(Math.random() * 10000) : null,
			averageAttendance: 35000 + Math.floor(Math.random() * 20000),
			topScorer: 'Player Name',
			topScorerGoals: 25 + Math.floor(Math.random() * 15),
			mostAssists: 'Player Name',
			mostAssistsCount: 15 + Math.floor(Math.random() * 10)
		};
	}
	
	function generateNewsArticles(leagueName, sport) {
		const articles = [
			{
				id: '1',
				title: `${leagueName} Trade Deadline: Major Moves Expected`,
				excerpt: 'With the trade deadline approaching, teams are making strategic moves to strengthen their rosters for the playoff push.',
				date: new Date(),
				category: 'Transactions',
				image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
				author: 'League Reporter'
			},
			{
				id: '2',
				title: `Top ${leagueName} Teams Battle for Playoff Position`,
				excerpt: 'The race for playoff seeding heats up as top teams compete in crucial matchups this week.',
				date: new Date(Date.now() - 86400000),
				category: 'Standings',
				image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
				author: 'Sports Analyst'
			},
			{
				id: '3',
				title: `Star Player Sets New ${leagueName} Record`,
				excerpt: 'A historic performance this week as a star player breaks a long-standing league record.',
				date: new Date(Date.now() - 172800000),
				category: 'Stats',
				image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
				author: 'Sports Writer'
			},
			{
				id: '4',
				title: `${leagueName} Free Agency: Key Signings Announced`,
				excerpt: 'Several high-profile free agent signings have been announced, reshaping team rosters across the league.',
				date: new Date(Date.now() - 259200000),
				category: 'Free Agency',
				image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800',
				author: 'League Insider'
			},
			{
				id: '5',
				title: `Injury Report: ${leagueName} Week Update`,
				excerpt: 'Latest injury updates from around the league as teams prepare for upcoming matchups.',
				date: new Date(Date.now() - 345600000),
				category: 'News',
				image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
				author: 'Medical Reporter'
			},
			{
				id: '6',
				title: `${leagueName} Rookie of the Year Race Heats Up`,
				excerpt: 'Several standout rookies are making their case for the prestigious Rookie of the Year award.',
				date: new Date(Date.now() - 432000000),
				category: 'Players',
				image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
				author: 'Draft Analyst'
			}
		];
		return articles;
	}
	
	function generateTransactions(leagueName, sport) {
		const transactions = [];
		const types = ['Trade', 'Signing', 'Release', 'Waiver Claim', 'Contract Extension'];
		const teams = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'];
		
		for (let i = 0; i < 8; i++) {
			const date = new Date();
			date.setDate(date.getDate() - i);
			transactions.push({
				id: `trans-${i}`,
				type: types[Math.floor(Math.random() * types.length)],
				team: teams[Math.floor(Math.random() * teams.length)],
				player: `Player ${i + 1}`,
				details: `${types[Math.floor(Math.random() * types.length)]} completed`,
				date: date
			});
		}
		return transactions;
	}
	
	function generateTopPlayers(leagueName, sport) {
		const players = [];
		const positions = sport === 'SOCCER' ? ['Forward', 'Midfielder', 'Defender', 'Goalkeeper'] : 
			sport === 'NFL' ? ['QB', 'RB', 'WR', 'TE'] :
			sport === 'NBA' ? ['PG', 'SG', 'SF', 'PF', 'C'] : ['Player'];
		
		for (let i = 0; i < 10; i++) {
			players.push({
				id: `player-${i}`,
				name: `Player ${i + 1}`,
				position: positions[Math.floor(Math.random() * positions.length)],
				team: `Team ${i + 1}`,
				stats: {
					goals: sport === 'SOCCER' ? Math.floor(Math.random() * 20) : null,
					points: sport !== 'SOCCER' ? Math.floor(Math.random() * 30) : null,
					assists: Math.floor(Math.random() * 15)
				},
				rating: (85 + Math.random() * 15).toFixed(1)
			});
		}
		return players.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
	}
</script>

<svelte:head>
	<title>{league?.name || 'League'} - {league?.sport || 'Tournaments.com'}</title>
	<meta name="description" content="View {league?.name || 'league'} standings, teams, schedule, and statistics on Tournaments.com" />
</svelte:head>

{#if loading}
	<!-- Professional Skeleton Loader -->
	<div class="bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
		<!-- Skeleton Navbar -->
		<div class="bg-gray-800 dark:bg-gray-900 border-b border-gray-700 h-10">
			<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-full flex items-center gap-4">
				<div class="h-4 w-20 bg-gray-700 rounded animate-pulse"></div>
				<div class="flex gap-3">
					{#each Array(5) as _}
						<div class="h-3 w-16 bg-gray-700 rounded animate-pulse"></div>
					{/each}
				</div>
			</div>
		</div>
		
		<!-- Skeleton Hero Section -->
		<div class="relative overflow-hidden" style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #3730a3 100%);">
			<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
				<div class="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 mb-6">
					<!-- Skeleton Logo -->
					<div class="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-white/20 rounded-2xl animate-pulse"></div>
					
					<!-- Skeleton League Info -->
					<div class="flex-1 space-y-3">
						<div class="flex gap-2">
							<div class="h-6 w-16 bg-white/20 rounded-lg animate-pulse"></div>
							<div class="h-6 w-20 bg-white/20 rounded-lg animate-pulse"></div>
							<div class="h-6 w-14 bg-white/20 rounded-lg animate-pulse"></div>
						</div>
						<div class="h-10 w-3/4 bg-white/20 rounded animate-pulse"></div>
						<div class="h-4 w-full max-w-2xl bg-white/20 rounded animate-pulse"></div>
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
		
		<!-- Skeleton Content -->
		<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
				<!-- Main Content -->
				<div class="lg:col-span-2 space-y-6">
					<!-- Skeleton Featured Article -->
					<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
						<div class="h-[300px] bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
						<div class="p-6 space-y-3">
							<div class="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
							<div class="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
							<div class="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
						</div>
					</div>
					
					<!-- Skeleton News Grid -->
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						{#each Array(4) as _}
							<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
								<div class="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
								<div class="p-4 space-y-2">
									<div class="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
									<div class="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
									<div class="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
								</div>
							</div>
						{/each}
					</div>
				</div>
				
				<!-- Skeleton Sidebar -->
				<div class="space-y-6">
					<!-- Skeleton Top Players -->
					<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
						<div class="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
						<div class="space-y-4">
							{#each Array(5) as _}
								<div class="flex items-center gap-3">
									<div class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
									<div class="flex-1 space-y-2">
										<div class="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
										<div class="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
									</div>
								</div>
							{/each}
						</div>
					</div>
					
					<!-- Skeleton Standings -->
					<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
						<div class="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
						<div class="space-y-3">
							{#each Array(5) as _}
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-2">
										<div class="w-6 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
										<div class="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
									</div>
									<div class="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
								</div>
							{/each}
						</div>
					</div>
					
					<!-- Skeleton Quick Links -->
					<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
						<div class="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
						<div class="grid grid-cols-2 gap-3">
							{#each Array(4) as _}
								<div class="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{:else if league}
	<!-- League Navbar - Directly under header -->
	{@const sportCode = $page.params.sport.toUpperCase()}
	{@const sportIcon = league.logo}
	<LeagueNavbar bind:activeTab {sportCode} {sportIcon} />
	
	<div class="bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">

		<!-- Enhanced Hero Section -->
		<div class="relative overflow-hidden !bg-gradient-to-br !from-blue-600 !via-blue-700 !to-indigo-800 dark:!from-blue-800 dark:!via-blue-900 dark:!to-indigo-900" style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #3730a3 100%);">
			<!-- Enhanced animated background elements -->
			<div class="absolute inset-0 overflow-hidden">
				<div class="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
				<div class="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
				<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
			</div>
			
			<div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
				<!-- Main Hero Content -->
				<div class="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 mb-6">
					<!-- League Logo/Icon -->
					<div class="relative group">
						<div class="absolute inset-0 bg-white/20 rounded-2xl blur-xl transform group-hover:scale-110 transition-transform duration-300"></div>
						<div class="relative inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-white/30 transform group-hover:scale-105 transition-transform duration-300">
							<span class="text-4xl sm:text-5xl lg:text-6xl">{league.logo}</span>
						</div>
					</div>
					
					<!-- League Info -->
					<div class="flex-1">
						<div class="flex flex-wrap items-center gap-2 mb-2">
							<span class="px-3 py-1 bg-white/25 backdrop-blur-md rounded-lg text-white text-xs font-black uppercase tracking-wider border border-white/30 shadow-lg">
								{league.sport}
							</span>
							<span class="px-3 py-1 bg-white/15 backdrop-blur-sm rounded-lg text-white/90 text-xs font-bold border border-white/20">
								{league.season}
							</span>
							<span class="px-3 py-1 bg-white/15 backdrop-blur-sm rounded-lg text-white/90 text-xs font-bold border border-white/20">
								{league.country}
							</span>
						</div>
						<h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2 drop-shadow-2xl leading-tight">
							{league.name}
						</h1>
						<p class="text-sm sm:text-base text-white/95 max-w-3xl leading-relaxed font-medium mb-2">
							{league.description}
						</p>
						<div class="flex items-center gap-2 text-white/80">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
							</svg>
							<span class="text-xs font-semibold">Established {league.founded} • {league.teamsCount} Teams</span>
						</div>
					</div>
				</div>
				
				<!-- Enhanced League Info Cards -->
				<div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
					<div class="group relative bg-white/15 backdrop-blur-xl rounded-xl p-4 sm:p-5 border-2 border-white/25 shadow-2xl transform hover:scale-105 hover:bg-white/20 transition-all duration-300 overflow-hidden">
						<div class="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-2xl"></div>
						<div class="relative">
							<div class="text-white/90 text-xs font-bold uppercase tracking-wider mb-2">Teams</div>
							<div class="text-2xl sm:text-3xl font-black text-white leading-none">{league.teamsCount}</div>
						</div>
					</div>
					<div class="group relative bg-white/15 backdrop-blur-xl rounded-xl p-4 sm:p-5 border-2 border-white/25 shadow-2xl transform hover:scale-105 hover:bg-white/20 transition-all duration-300 overflow-hidden">
						<div class="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-2xl"></div>
						<div class="relative">
							<div class="text-white/90 text-xs font-bold uppercase tracking-wider mb-2">Founded</div>
							<div class="text-2xl sm:text-3xl font-black text-white leading-none">{league.founded}</div>
						</div>
					</div>
					<div class="group relative bg-white/15 backdrop-blur-xl rounded-xl p-4 sm:p-5 border-2 border-white/25 shadow-2xl transform hover:scale-105 hover:bg-white/20 transition-all duration-300 overflow-hidden">
						<div class="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-2xl"></div>
						<div class="relative">
							<div class="text-white/90 text-xs font-bold uppercase tracking-wider mb-2">Format</div>
							<div class="text-sm sm:text-base font-bold text-white leading-tight">{league.format.split(' ')[0]}</div>
						</div>
					</div>
					<div class="group relative bg-gradient-to-br from-yellow-400/30 to-orange-500/30 backdrop-blur-xl rounded-xl p-4 sm:p-5 border-2 border-yellow-300/40 shadow-2xl transform hover:scale-105 hover:from-yellow-400/40 hover:to-orange-500/40 transition-all duration-300 overflow-hidden">
						<div class="absolute top-0 right-0 w-16 h-16 bg-yellow-300/20 rounded-full blur-2xl"></div>
						<div class="relative">
							<div class="text-white/90 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
								<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
								</svg>
								Champion
							</div>
							<div class="text-sm sm:text-base font-black text-white leading-tight">{league.currentChampion}</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
			<!-- Home Tab - News and Content -->
			{#if activeTab === 'home'}
				<div class="space-y-6 sm:space-y-8">
					<!-- Hero Featured Article (Frontpage Style) -->
					{#if featuredNews.length > 0}
						{@const heroArticle = featuredNews[0]}
						<div class="mb-6">
							<a 
								href="/news/{heroArticle.id}"
								class="news-card-featured block group"
							>
								<div class="relative h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden">
									<img 
										src={heroArticle.image} 
										alt={heroArticle.title} 
										class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									/>
									<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
									<div class="absolute bottom-0 left-0 right-0 p-5 sm:p-6 lg:p-8 text-white z-10">
										<div class="flex items-center gap-2 mb-2">
											<span class="category-tag bg-red-600 text-white text-xs">
												{heroArticle.category}
											</span>
											<span class="text-xs font-medium opacity-90">
												{format(heroArticle.date, 'MMM d, yyyy')}
											</span>
										</div>
										<h1 class="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 group-hover:text-blue-300 transition-colors leading-tight">
											{heroArticle.title}
										</h1>
										<p class="text-sm sm:text-base text-gray-200 mb-3 max-w-3xl leading-relaxed line-clamp-2">
											{heroArticle.excerpt}
										</p>
										<div class="flex items-center gap-2 text-sm font-medium text-gray-300">
											<span>By {heroArticle.author}</span>
											<span>•</span>
											<span class="flex items-center gap-1">
												<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
												</svg>
												Read More
											</span>
										</div>
									</div>
								</div>
							</a>
						</div>
					{/if}
					
					<!-- Main Content Grid (Frontpage Style) -->
					<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
						<!-- Main News Column -->
						<div class="lg:col-span-2">
							<!-- News Grid -->
							<div class="mb-10">
								{#if featuredNews.length > 1}
									<div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
										{#each featuredNews.slice(1) as article}
											<a 
												href="/news/{article.id}"
												class="group block"
											>
												<div class="relative h-48 sm:h-56 lg:h-64 rounded-lg overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-shadow duration-300">
													<img 
														src={article.image} 
														alt={article.title} 
														class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
													/>
													<div class="absolute top-4 left-4">
														<span class="category-tag bg-blue-600 text-white">
															{article.category}
														</span>
													</div>
												</div>
												<div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
													<span>{format(article.date, 'MMM d, yyyy')}</span>
													<span>•</span>
													<span>By {article.author}</span>
												</div>
												<h3 class="news-headline text-gray-900 dark:text-white mb-2">
													{article.title}
												</h3>
												<p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
													{article.excerpt}
												</p>
											</a>
										{/each}
									</div>
								{/if}
								
								<!-- More News Articles -->
								{#if newsArticles.length > 3}
									<div class="mt-10">
										<div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
											{#each newsArticles.slice(3) as article}
												<a 
													href="/news/{article.id}"
													class="group block"
												>
													<div class="relative h-48 sm:h-56 lg:h-64 rounded-lg overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-shadow duration-300">
														<img 
															src={article.image} 
															alt={article.title} 
															class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
														/>
														<div class="absolute top-4 left-4">
															<span class="category-tag bg-blue-600 text-white">
																{article.category}
															</span>
														</div>
													</div>
													<div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
														<span>{format(article.date, 'MMM d, yyyy')}</span>
														<span>•</span>
														<span>By {article.author}</span>
													</div>
													<h3 class="news-headline text-gray-900 dark:text-white mb-2">
														{article.title}
													</h3>
													<p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
														{article.excerpt}
													</p>
												</a>
											{/each}
										</div>
									</div>
								{/if}
								
								<!-- View All News Link -->
								<div class="mt-10 text-center">
									<a 
										href="/news?league={league.name}" 
										class="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
									>
										View All {league.name} News
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
										</svg>
									</a>
								</div>
							</div>
						</div>
						
						<!-- Sidebar -->
						<div class="space-y-8">
							<!-- Top Players -->
							<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6">
								<div class="flex items-center justify-between mb-6">
									<h3 class="headline-small text-gray-900 dark:text-white">Top Players</h3>
									<a href="#players" class="text-blue-600 dark:text-blue-400 text-sm font-bold hover:underline">View All</a>
								</div>
								<div class="space-y-4">
									{#each topPlayers.slice(0, 5) as player, index}
										<a 
											href="#player-{player.id}"
											class="group flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
										>
											<div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg">
												{index + 1}
											</div>
											<div class="flex-1 min-w-0">
												<div class="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
													{player.name}
												</div>
												<div class="text-sm text-gray-600 dark:text-gray-400">
													{player.team} • {player.position}
												</div>
											</div>
											<div class="text-right">
												<div class="text-lg font-black text-gray-900 dark:text-white">{player.rating}</div>
												<div class="text-xs text-gray-500 dark:text-gray-400">Rating</div>
											</div>
										</a>
									{/each}
								</div>
							</div>

							<!-- Recent Transactions -->
							<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6">
								<div class="flex items-center justify-between mb-6">
									<h3 class="headline-small text-gray-900 dark:text-white">Transactions</h3>
									<a href="#transactions" class="text-blue-600 dark:text-blue-400 text-sm font-bold hover:underline">View All</a>
								</div>
								<div class="space-y-4">
									{#each transactions.slice(0, 5) as transaction}
										<a 
											href="#transaction-{transaction.id}"
											class="group block p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
										>
											<div class="flex items-start justify-between mb-2">
												<span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded">
													{transaction.type}
												</span>
												<span class="text-xs text-gray-500 dark:text-gray-400">
													{format(transaction.date, 'MMM d')}
												</span>
											</div>
											<div class="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
												{transaction.team}
											</div>
											<div class="text-sm text-gray-600 dark:text-gray-400 mt-1">
												{transaction.player} • {transaction.details}
											</div>
										</a>
									{/each}
								</div>
							</div>

							<!-- Quick Links -->
							<div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl shadow-lg border-2 border-blue-200 dark:border-blue-800 p-6">
								<h3 class="headline-small text-gray-900 dark:text-white mb-4">Quick Links</h3>
								<div class="space-y-3">
									<a href="#scores" class="block p-3 bg-white dark:bg-gray-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-semibold text-gray-900 dark:text-white">
										📊 View Live Scores
									</a>
									<a href="#schedule" class="block p-3 bg-white dark:bg-gray-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-semibold text-gray-900 dark:text-white">
										📅 Upcoming Schedule
									</a>
									<a href="#standings" class="block p-3 bg-white dark:bg-gray-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-semibold text-gray-900 dark:text-white">
										🏆 League Standings
									</a>
									<a href="#stats" class="block p-3 bg-white dark:bg-gray-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-semibold text-gray-900 dark:text-white">
										📈 Player Statistics
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if}

			<!-- Overview Tab (Legacy) -->
			{#if activeTab === 'overview'}
				<div class="space-y-8 sm:space-y-10">
					<!-- Enhanced Quick Stats -->
					<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div class="group relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 rounded-3xl shadow-xl border-2 border-blue-200 dark:border-blue-800/50 p-8 transform hover:scale-105 hover:shadow-2xl transition-all duration-300 overflow-hidden">
							<div class="absolute top-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl"></div>
							<div class="relative">
								<div class="flex items-center gap-3 mb-4">
									<div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
										<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
										</svg>
									</div>
									<div class="text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-wider">Total Matches</div>
								</div>
								<div class="text-5xl font-black text-gray-900 dark:text-white leading-none">{stats.totalMatches}</div>
							</div>
						</div>
						{#if stats.totalGoals}
							<div class="group relative bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 rounded-3xl shadow-xl border-2 border-green-200 dark:border-green-800/50 p-8 transform hover:scale-105 hover:shadow-2xl transition-all duration-300 overflow-hidden">
								<div class="absolute top-0 right-0 w-32 h-32 bg-green-400/20 rounded-full blur-3xl"></div>
								<div class="relative">
									<div class="flex items-center gap-3 mb-4">
										<div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
											<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
											</svg>
										</div>
										<div class="text-green-600 dark:text-green-400 text-sm font-bold uppercase tracking-wider">Total Goals</div>
									</div>
									<div class="text-5xl font-black text-gray-900 dark:text-white leading-none">{stats.totalGoals}</div>
								</div>
							</div>
						{/if}
						<div class="group relative bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 rounded-3xl shadow-xl border-2 border-purple-200 dark:border-purple-800/50 p-8 transform hover:scale-105 hover:shadow-2xl transition-all duration-300 overflow-hidden">
							<div class="absolute top-0 right-0 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl"></div>
							<div class="relative">
								<div class="flex items-center gap-3 mb-4">
									<div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
										<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
										</svg>
									</div>
									<div class="text-purple-600 dark:text-purple-400 text-sm font-bold uppercase tracking-wider">Avg. Attendance</div>
								</div>
								<div class="text-5xl font-black text-gray-900 dark:text-white leading-none">{stats.averageAttendance.toLocaleString()}</div>
							</div>
						</div>
					</div>

					<!-- Enhanced Recent Matches -->
					<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-8 lg:p-10 overflow-hidden">
						<div class="flex items-center justify-between mb-8">
							<div>
								<h2 class="headline-medium text-gray-900 dark:text-white mb-2">Recent Results</h2>
								<p class="text-gray-600 dark:text-gray-400">Latest match outcomes and scores</p>
							</div>
							<div class="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
								<div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
								<span class="text-sm font-semibold text-blue-700 dark:text-blue-400">Live Updates</span>
							</div>
						</div>
						<div class="space-y-3">
							{#each recentMatches as match}
								<div class="group relative flex items-center justify-between p-5 sm:p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300">
									<div class="flex-1 min-w-0">
										<div class="flex items-center gap-2 mb-3">
											<span class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{format(match.date, 'MMM d, yyyy')}</span>
											<span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded">FT</span>
										</div>
										<div class="flex flex-wrap items-center gap-3 sm:gap-6">
											<div class="flex-1 min-w-[120px]">
												<div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Home</div>
												<div class="font-bold text-lg text-gray-900 dark:text-white">{match.homeTeam}</div>
											</div>
											<div class="flex items-center gap-3">
												<span class="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white min-w-[2ch] text-center">{match.homeScore}</span>
												<span class="text-gray-400 text-xl">-</span>
												<span class="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white min-w-[2ch] text-center">{match.awayScore}</span>
											</div>
											<div class="flex-1 min-w-[120px] text-right">
												<div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Away</div>
												<div class="font-bold text-lg text-gray-900 dark:text-white">{match.awayTeam}</div>
											</div>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>

					<!-- Enhanced Top Performers -->
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div class="group relative bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-950/20 dark:via-gray-800 dark:to-blue-950/20 rounded-3xl shadow-2xl border-2 border-blue-200 dark:border-blue-800/50 p-8 transform hover:scale-105 hover:shadow-3xl transition-all duration-300 overflow-hidden">
							<div class="absolute top-0 right-0 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"></div>
							<div class="relative">
								<div class="flex items-center gap-3 mb-6">
									<div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
										<svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
										</svg>
									</div>
									<div>
										<h3 class="headline-small text-gray-900 dark:text-white">Top Scorer</h3>
										<p class="text-sm text-gray-600 dark:text-gray-400">Leading goal scorer</p>
									</div>
								</div>
								<div class="flex items-center gap-6">
									<div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-xl">
										{stats.topScorerGoals}
									</div>
									<div>
										<div class="text-2xl font-black text-gray-900 dark:text-white mb-1">{stats.topScorer}</div>
										<div class="text-gray-600 dark:text-gray-400 font-semibold">Goals Scored</div>
									</div>
								</div>
							</div>
						</div>
						<div class="group relative bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-green-950/20 dark:via-gray-800 dark:to-green-950/20 rounded-3xl shadow-2xl border-2 border-green-200 dark:border-green-800/50 p-8 transform hover:scale-105 hover:shadow-3xl transition-all duration-300 overflow-hidden">
							<div class="absolute top-0 right-0 w-40 h-40 bg-green-400/20 rounded-full blur-3xl"></div>
							<div class="relative">
								<div class="flex items-center gap-3 mb-6">
									<div class="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
										<svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
										</svg>
									</div>
									<div>
										<h3 class="headline-small text-gray-900 dark:text-white">Most Assists</h3>
										<p class="text-sm text-gray-600 dark:text-gray-400">Playmaker leader</p>
									</div>
								</div>
								<div class="flex items-center gap-6">
									<div class="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-xl">
										{stats.mostAssistsCount}
									</div>
									<div>
										<div class="text-2xl font-black text-gray-900 dark:text-white mb-1">{stats.mostAssists}</div>
										<div class="text-gray-600 dark:text-gray-400 font-semibold">Assists Provided</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if}

			<!-- Standings Tab -->
			{#if activeTab === 'standings'}
				<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-8 overflow-x-auto">
					<h2 class="headline-small text-gray-900 dark:text-white mb-6">League Standings</h2>
					<table class="w-full">
						<thead>
							<tr class="border-b-2 border-gray-200 dark:border-gray-700">
								<th class="text-left py-3 px-4 text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-400">Rank</th>
								<th class="text-left py-3 px-4 text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-400">Team</th>
								<th class="text-center py-3 px-4 text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-400">Played</th>
								<th class="text-center py-3 px-4 text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-400">Won</th>
								{#if league.sport === 'SOCCER'}
									<th class="text-center py-3 px-4 text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-400">Drawn</th>
								{/if}
								<th class="text-center py-3 px-4 text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-400">Lost</th>
								{#if league.sport === 'SOCCER'}
									<th class="text-center py-3 px-4 text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-400">GD</th>
									<th class="text-center py-3 px-4 text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-400">Points</th>
								{:else}
									<th class="text-center py-3 px-4 text-xs font-black uppercase tracking-wider text-gray-600 dark:text-gray-400">Win %</th>
								{/if}
							</tr>
						</thead>
						<tbody>
							{#each standings as team}
								<tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
									<td class="py-4 px-4">
										<span class="font-black text-gray-900 dark:text-white">{team.rank}</span>
									</td>
									<td class="py-4 px-4">
										<span class="font-bold text-gray-900 dark:text-white">{team.team}</span>
									</td>
									<td class="py-4 px-4 text-center">
										<span class="text-gray-700 dark:text-gray-300 font-semibold">{team.played}</span>
									</td>
									<td class="py-4 px-4 text-center">
										<span class="text-green-600 dark:text-green-400 font-bold">{team.won}</span>
									</td>
									{#if league.sport === 'SOCCER'}
										<td class="py-4 px-4 text-center">
											<span class="text-gray-600 dark:text-gray-400 font-semibold">{team.drawn}</span>
										</td>
									{/if}
									<td class="py-4 px-4 text-center">
										<span class="text-red-600 dark:text-red-400 font-bold">{team.lost}</span>
									</td>
									{#if league.sport === 'SOCCER'}
										<td class="py-4 px-4 text-center">
											<span class="text-gray-700 dark:text-gray-300 font-semibold">{team.goalDiff > 0 ? '+' : ''}{team.goalDiff}</span>
										</td>
										<td class="py-4 px-4 text-center">
											<span class="font-black text-gray-900 dark:text-white">{team.points}</span>
										</td>
									{:else}
										<td class="py-4 px-4 text-center">
											<span class="text-gray-700 dark:text-gray-300 font-semibold">{team.winPct}%</span>
										</td>
									{/if}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}

			<!-- Teams Tab -->
			{#if activeTab === 'teams'}
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each teams as team}
						<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/80 dark:border-gray-700/80 p-6 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
							<div class="flex items-center gap-4 mb-4">
								<div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-3xl">
									{team.logo}
								</div>
								<div>
									<h3 class="headline-small text-gray-900 dark:text-white">{team.name}</h3>
									<p class="text-gray-600 dark:text-gray-400 text-sm">{team.city}</p>
								</div>
							</div>
							<div class="space-y-2 text-sm">
								<div class="flex justify-between">
									<span class="text-gray-600 dark:text-gray-400">Founded:</span>
									<span class="font-semibold text-gray-900 dark:text-white">{team.founded}</span>
								</div>
								<div class="flex justify-between">
									<span class="text-gray-600 dark:text-gray-400">Stadium:</span>
									<span class="font-semibold text-gray-900 dark:text-white">{team.stadium}</span>
								</div>
								<div class="flex justify-between">
									<span class="text-gray-600 dark:text-gray-400">Capacity:</span>
									<span class="font-semibold text-gray-900 dark:text-white">{team.capacity.toLocaleString()}</span>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}

			<!-- Schedule Tab -->
			{#if activeTab === 'schedule'}
				<div class="space-y-6">
					<!-- Upcoming Matches -->
					<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-8">
						<h2 class="headline-small text-gray-900 dark:text-white mb-6">Upcoming Matches</h2>
						<div class="space-y-4">
							{#each upcomingMatches as match}
								<div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
									<div class="flex-1">
										<div class="text-sm text-gray-500 dark:text-gray-400 mb-2">{format(match.date, 'MMM d, yyyy')} at {match.time}</div>
										<div class="flex items-center gap-4">
											<span class="font-bold text-gray-900 dark:text-white">{match.homeTeam}</span>
											<span class="text-gray-400">vs</span>
											<span class="font-bold text-gray-900 dark:text-white">{match.awayTeam}</span>
										</div>
										<div class="text-sm text-gray-600 dark:text-gray-400 mt-1">{match.venue}</div>
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
					<h2 class="headline-small text-gray-900 dark:text-white mb-6">League Statistics</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
							<div class="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-2">Total Matches</div>
							<div class="text-4xl font-black text-gray-900 dark:text-white">{stats.totalMatches}</div>
						</div>
						{#if stats.totalGoals}
							<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
								<div class="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-2">Total Goals</div>
								<div class="text-4xl font-black text-gray-900 dark:text-white">{stats.totalGoals}</div>
							</div>
						{/if}
						<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
							<div class="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-2">Average Attendance</div>
							<div class="text-4xl font-black text-gray-900 dark:text-white">{stats.averageAttendance.toLocaleString()}</div>
						</div>
						<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
							<div class="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-2">Format</div>
							<div class="text-xl font-bold text-gray-900 dark:text-white">{league.format}</div>
						</div>
					</div>
				</div>
			{/if}

			<!-- Scores Tab -->
			{#if activeTab === 'scores'}
				<div class="space-y-6">
					<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-8">
						<h2 class="headline-small text-gray-900 dark:text-white mb-6">Live Scores</h2>
						<div class="space-y-4">
							{#each recentMatches as match}
								<div class="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700">
									<div class="flex-1">
										<div class="text-sm text-gray-500 dark:text-gray-400 mb-2">{format(match.date, 'MMM d, yyyy')}</div>
										<div class="flex items-center gap-4">
											<span class="font-bold text-lg text-gray-900 dark:text-white">{match.homeTeam}</span>
											<span class="text-3xl font-black text-gray-900 dark:text-white">{match.homeScore}</span>
											<span class="text-gray-400 text-xl">-</span>
											<span class="text-3xl font-black text-gray-900 dark:text-white">{match.awayScore}</span>
											<span class="font-bold text-lg text-gray-900 dark:text-white">{match.awayTeam}</span>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/if}

			<!-- Free Agency Tab -->
			{#if activeTab === 'free-agency'}
				<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-8">
					<h2 class="headline-small text-gray-900 dark:text-white mb-6">Free Agency</h2>
					<div class="space-y-4">
						{#each transactions.filter(t => t.type === 'Signing' || t.type === 'Release') as transaction}
							<div class="p-5 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700">
								<div class="flex items-start justify-between mb-3">
									<span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-bold rounded-full">
										{transaction.type}
									</span>
									<span class="text-sm text-gray-500 dark:text-gray-400">{format(transaction.date, 'MMM d, yyyy')}</span>
								</div>
								<div class="font-bold text-lg text-gray-900 dark:text-white mb-1">{transaction.team}</div>
								<div class="text-gray-600 dark:text-gray-400">{transaction.player} • {transaction.details}</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Transactions Tab -->
			{#if activeTab === 'transactions'}
				<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-8">
					<h2 class="headline-small text-gray-900 dark:text-white mb-6">Recent Transactions</h2>
					<div class="space-y-4">
						{#each transactions as transaction}
							<div class="p-5 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
								<div class="flex items-start justify-between mb-3">
									<span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-bold rounded-full">
										{transaction.type}
									</span>
									<span class="text-sm text-gray-500 dark:text-gray-400">{format(transaction.date, 'MMM d, yyyy')}</span>
								</div>
								<div class="font-bold text-lg text-gray-900 dark:text-white mb-1">{transaction.team}</div>
								<div class="text-gray-600 dark:text-gray-400">{transaction.player} • {transaction.details}</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Players Tab -->
			{#if activeTab === 'players'}
				<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-8">
					<h2 class="headline-small text-gray-900 dark:text-white mb-6">Top Players</h2>
					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each topPlayers as player, index}
							<div class="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6 transform hover:scale-105 hover:shadow-xl transition-all duration-300">
								<div class="flex items-center gap-4 mb-4">
									<div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl">
										{index + 1}
									</div>
									<div class="flex-1">
										<div class="font-bold text-xl text-gray-900 dark:text-white">{player.name}</div>
										<div class="text-sm text-gray-600 dark:text-gray-400">{player.team} • {player.position}</div>
									</div>
								</div>
								<div class="flex items-center justify-between">
									<div>
										<div class="text-2xl font-black text-gray-900 dark:text-white">{player.rating}</div>
										<div class="text-xs text-gray-500 dark:text-gray-400">Rating</div>
									</div>
									{#if player.stats.goals}
										<div class="text-right">
											<div class="text-xl font-bold text-gray-900 dark:text-white">{player.stats.goals}</div>
											<div class="text-xs text-gray-500 dark:text-gray-400">Goals</div>
										</div>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- More Tab -->
			{#if activeTab === 'more'}
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-8">
						<h3 class="headline-small text-gray-900 dark:text-white mb-4">League Information</h3>
						<div class="space-y-3 text-gray-600 dark:text-gray-400">
							<p><strong class="text-gray-900 dark:text-white">Format:</strong> {league.format}</p>
							<p><strong class="text-gray-900 dark:text-white">Founded:</strong> {league.founded}</p>
							<p><strong class="text-gray-900 dark:text-white">Teams:</strong> {league.teamsCount}</p>
							<p><strong class="text-gray-900 dark:text-white">Current Champion:</strong> {league.currentChampion}</p>
						</div>
					</div>
					<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-8">
						<h3 class="headline-small text-gray-900 dark:text-white mb-4">Quick Links</h3>
						<div class="space-y-3">
							<a href="#scores" class="block p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-semibold text-gray-900 dark:text-white">
								📊 Live Scores
							</a>
							<a href="#schedule" class="block p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-semibold text-gray-900 dark:text-white">
								📅 Full Schedule
							</a>
							<a href="#standings" class="block p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-semibold text-gray-900 dark:text-white">
								🏆 Complete Standings
							</a>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

