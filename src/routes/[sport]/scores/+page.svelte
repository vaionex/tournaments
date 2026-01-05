<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { format, subDays, addDays } from 'date-fns';
	import PageSEO from '$lib/components/seo/PageSEO.svelte';
	
	let sport = '';
	let sportConfig = null;
	let loading = true;
	let selectedDate = new Date();
	let games = [];
	let dateRange = [];
	
	const sportsConfig = {
		'nfl': { name: 'NFL', icon: '🏈', color: 'bg-green-700', textColor: 'text-green-700' },
		'nba': { name: 'NBA', icon: '🏀', color: 'bg-orange-600', textColor: 'text-orange-600' },
		'mlb': { name: 'MLB', icon: '⚾', color: 'bg-red-600', textColor: 'text-red-600' },
		'nhl': { name: 'NHL', icon: '🏒', color: 'bg-blue-700', textColor: 'text-blue-700' },
		'soccer': { name: 'Soccer', icon: '⚽', color: 'bg-green-600', textColor: 'text-green-600' },
		'ncaaf': { name: 'NCAAF', icon: '🏈', color: 'bg-orange-600', textColor: 'text-orange-600' },
		'wnba': { name: 'WNBA', icon: '🏀', color: 'bg-orange-500', textColor: 'text-orange-500' },
		'tennis': { name: 'Tennis', icon: '🎾', color: 'bg-green-600', textColor: 'text-green-600' },
		'golf': { name: 'Golf', icon: '⛳', color: 'bg-green-700', textColor: 'text-green-700' },
		'mma': { name: 'MMA/UFC', icon: '🥊', color: 'bg-red-700', textColor: 'text-red-700' },
		'boxing': { name: 'Boxing', icon: '🥊', color: 'bg-yellow-600', textColor: 'text-yellow-600' },
		'racing': { name: 'Racing', icon: '🏎️', color: 'bg-red-600', textColor: 'text-red-600' },
		'esports': { name: 'Esports', icon: '🎮', color: 'bg-purple-600', textColor: 'text-purple-600' }
	};
	
	const teamsByLeague = {
		'nfl': {
			teams: ['Chiefs', 'Bills', '49ers', 'Cowboys', 'Eagles', 'Ravens', 'Dolphins', 'Lions', 'Bengals', 'Packers', 'Jets', 'Steelers', 'Browns', 'Patriots', 'Saints', 'Buccaneers'],
			cities: ['Kansas City', 'Buffalo', 'San Francisco', 'Dallas', 'Philadelphia', 'Baltimore', 'Miami', 'Detroit', 'Cincinnati', 'Green Bay', 'New York', 'Pittsburgh', 'Cleveland', 'New England', 'New Orleans', 'Tampa Bay']
		},
		'nba': {
			teams: ['Lakers', 'Celtics', 'Warriors', 'Bucks', 'Nuggets', 'Heat', 'Suns', 'Mavericks', 'Clippers', '76ers', 'Nets', 'Knicks', 'Bulls', 'Cavaliers', 'Thunder', 'Timberwolves'],
			cities: ['Los Angeles', 'Boston', 'Golden State', 'Milwaukee', 'Denver', 'Miami', 'Phoenix', 'Dallas', 'Los Angeles', 'Philadelphia', 'Brooklyn', 'New York', 'Chicago', 'Cleveland', 'Oklahoma City', 'Minnesota']
		},
		'mlb': {
			teams: ['Yankees', 'Dodgers', 'Astros', 'Braves', 'Rangers', 'Phillies', 'Orioles', 'Twins', 'Rays', 'Mariners', 'Red Sox', 'Cubs', 'Padres', 'Mets', 'Cardinals', 'Guardians'],
			cities: ['New York', 'Los Angeles', 'Houston', 'Atlanta', 'Texas', 'Philadelphia', 'Baltimore', 'Minnesota', 'Tampa Bay', 'Seattle', 'Boston', 'Chicago', 'San Diego', 'New York', 'St. Louis', 'Cleveland']
		},
		'nhl': {
			teams: ['Avalanche', 'Bruins', 'Lightning', 'Rangers', 'Oilers', 'Panthers', 'Maple Leafs', 'Stars', 'Hurricanes', 'Devils', 'Kings', 'Wild', 'Penguins', 'Capitals', 'Golden Knights', 'Flames'],
			cities: ['Colorado', 'Boston', 'Tampa Bay', 'New York', 'Edmonton', 'Florida', 'Toronto', 'Dallas', 'Carolina', 'New Jersey', 'Los Angeles', 'Minnesota', 'Pittsburgh', 'Washington', 'Vegas', 'Calgary']
		},
		'soccer': {
			teams: ['Arsenal', 'Man City', 'Liverpool', 'Chelsea', 'Man United', 'Tottenham', 'Newcastle', 'Brighton', 'Aston Villa', 'West Ham', 'Real Madrid', 'Barcelona', 'Bayern Munich', 'PSG', 'Juventus', 'Inter Milan'],
			cities: ['London', 'Manchester', 'Liverpool', 'London', 'Manchester', 'London', 'Newcastle', 'Brighton', 'Birmingham', 'London', 'Madrid', 'Barcelona', 'Munich', 'Paris', 'Turin', 'Milan']
		}
	};
	
	function generateGames(sportCode, date) {
		const config = teamsByLeague[sportCode] || teamsByLeague['nfl'];
		const teams = config.teams;
		const cities = config.cities;
		const numGames = Math.floor(Math.random() * 4) + 4; // 4-7 games
		const generatedGames = [];
		
		const usedTeams = new Set();
		
		for (let i = 0; i < numGames; i++) {
			let homeIdx, awayIdx;
			do {
				homeIdx = Math.floor(Math.random() * teams.length);
				awayIdx = Math.floor(Math.random() * teams.length);
			} while (homeIdx === awayIdx || usedTeams.has(homeIdx) || usedTeams.has(awayIdx));
			
			usedTeams.add(homeIdx);
			usedTeams.add(awayIdx);
			
			const isLive = Math.random() > 0.6 && format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
			const isFinal = !isLive && (Math.random() > 0.3 || format(date, 'yyyy-MM-dd') < format(new Date(), 'yyyy-MM-dd'));
			const isUpcoming = !isLive && !isFinal;
			
			const homeScore = isFinal || isLive ? Math.floor(Math.random() * 40) + 70 : null;
			const awayScore = isFinal || isLive ? Math.floor(Math.random() * 40) + 70 : null;
			
			const hours = Math.floor(Math.random() * 8) + 12; // 12 PM - 8 PM
			const minutes = Math.random() > 0.5 ? '00' : '30';
			
			generatedGames.push({
				id: `game-${i}-${date.getTime()}`,
				homeTeam: { name: teams[homeIdx], city: cities[homeIdx], logo: `https://ui-avatars.com/api/?name=${teams[homeIdx]}&background=random&size=64` },
				awayTeam: { name: teams[awayIdx], city: cities[awayIdx], logo: `https://ui-avatars.com/api/?name=${teams[awayIdx]}&background=random&size=64` },
				homeScore,
				awayScore,
				status: isLive ? 'LIVE' : isFinal ? 'FINAL' : 'SCHEDULED',
				time: isUpcoming ? `${hours}:${minutes} ET` : null,
				quarter: isLive ? `Q${Math.floor(Math.random() * 4) + 1}` : null,
				gameTime: isLive ? `${Math.floor(Math.random() * 12)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}` : null,
				venue: `${cities[homeIdx]} Arena`,
				broadcast: ['ESPN', 'TNT', 'ABC', 'FOX', 'NBC'][Math.floor(Math.random() * 5)]
			});
		}
		
		return generatedGames.sort((a, b) => {
			if (a.status === 'LIVE' && b.status !== 'LIVE') return -1;
			if (a.status !== 'LIVE' && b.status === 'LIVE') return 1;
			if (a.status === 'SCHEDULED' && b.status === 'FINAL') return 1;
			if (a.status === 'FINAL' && b.status === 'SCHEDULED') return -1;
			return 0;
		});
	}
	
	function generateDateRange() {
		const range = [];
		for (let i = -3; i <= 7; i++) {
			const date = i === 0 ? new Date() : (i < 0 ? subDays(new Date(), Math.abs(i)) : addDays(new Date(), i));
			range.push(date);
		}
		return range;
	}
	
	function selectDate(date) {
		selectedDate = date;
		games = generateGames(sport, date);
	}
	
	onMount(async () => {
		sport = $page.params.sport.toLowerCase();
		sportConfig = sportsConfig[sport] || sportsConfig['nfl'];
		dateRange = generateDateRange();
		
		await new Promise(resolve => setTimeout(resolve, 500));
		games = generateGames(sport, selectedDate);
		loading = false;
	});
</script>

<PageSEO 
	title="{sportConfig?.name || 'Sports'} Scores - Live Games & Results"
	description="Get live {sportConfig?.name || 'sports'} scores, game results, and upcoming matchups. Real-time updates on all {sportConfig?.name || 'sports'} games."
/>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<!-- Header -->
	<div class="{sportConfig?.color || 'bg-blue-700'} text-white py-6 sm:py-8">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
			<div class="flex items-center gap-3">
				<span class="text-3xl sm:text-4xl">{sportConfig?.icon || '🏆'}</span>
				<div>
					<h1 class="text-2xl sm:text-3xl font-bold">{sportConfig?.name || 'Sports'} Scores</h1>
					<p class="text-sm sm:text-base opacity-90">Live scores, results & upcoming games</p>
				</div>
			</div>
		</div>
	</div>
	
	<!-- Date Selector -->
	<div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-[88px] z-20">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
			<div class="flex items-center gap-1 sm:gap-2 py-3 overflow-x-auto horizontal-gallery">
				{#each dateRange as date}
					{@const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')}
					{@const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')}
					<button
						on:click={() => selectDate(date)}
						class="flex-shrink-0 px-3 sm:px-4 py-2 rounded-lg text-center transition-all {isSelected 
							? `${sportConfig?.color || 'bg-blue-700'} text-white` 
							: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}"
					>
						<div class="text-[10px] sm:text-xs font-medium uppercase">
							{isToday ? 'Today' : format(date, 'EEE')}
						</div>
						<div class="text-sm sm:text-base font-bold">
							{format(date, 'MMM d')}
						</div>
					</button>
				{/each}
			</div>
		</div>
	</div>
	
	<!-- Games List -->
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6">
		{#if loading}
			<div class="space-y-4">
				{#each Array(5) as _}
					<div class="bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-4 flex-1">
								<div class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
								<div class="space-y-2">
									<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
									<div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
								</div>
							</div>
							<div class="w-16 h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
							<div class="flex items-center gap-4 flex-1 justify-end">
								<div class="space-y-2 text-right">
									<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 ml-auto"></div>
									<div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 ml-auto"></div>
								</div>
								<div class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{:else if games.length === 0}
			<div class="text-center py-16">
				<span class="text-6xl mb-4 block">{sportConfig?.icon || '🏆'}</span>
				<h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">No Games Scheduled</h2>
				<p class="text-gray-600 dark:text-gray-400">There are no {sportConfig?.name} games on this date.</p>
			</div>
		{:else}
			<div class="space-y-4">
				{#each games as game}
					<a 
						href="/{sport}/game/{game.id}"
						class="block bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100 dark:border-gray-700"
					>
						<!-- Status Bar -->
						<div class="px-4 py-2 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
							<div class="flex items-center gap-2">
								{#if game.status === 'LIVE'}
									<span class="flex items-center gap-1.5">
										<span class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
										<span class="text-xs font-bold text-red-600 dark:text-red-400">LIVE</span>
									</span>
									<span class="text-xs text-gray-500 dark:text-gray-400">{game.quarter} • {game.gameTime}</span>
								{:else if game.status === 'FINAL'}
									<span class="text-xs font-semibold text-gray-600 dark:text-gray-400">FINAL</span>
								{:else}
									<span class="text-xs font-semibold text-gray-600 dark:text-gray-400">{game.time}</span>
								{/if}
							</div>
							<div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
								<span>{game.venue}</span>
								<span>•</span>
								<span class="font-medium">{game.broadcast}</span>
							</div>
						</div>
						
						<!-- Game Content -->
						<div class="p-4 sm:p-6">
							<div class="flex items-center justify-between gap-4">
								<!-- Away Team -->
								<div class="flex items-center gap-3 sm:gap-4 flex-1">
									<img 
										src={game.awayTeam.logo} 
										alt={game.awayTeam.name}
										class="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-gray-100 dark:border-gray-700"
									/>
									<div>
										<div class="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">{game.awayTeam.city}</div>
										<div class="font-bold text-gray-900 dark:text-white text-sm sm:text-lg">{game.awayTeam.name}</div>
									</div>
								</div>
								
								<!-- Score -->
								<div class="flex items-center gap-3 sm:gap-6 px-4 sm:px-8">
									{#if game.status === 'SCHEDULED'}
										<div class="text-center">
											<div class="text-xs text-gray-500 dark:text-gray-400 mb-1">VS</div>
											<div class="text-lg sm:text-xl font-bold text-gray-400">-</div>
										</div>
									{:else}
										<div class="text-2xl sm:text-4xl font-black {game.awayScore > game.homeScore ? `${sportConfig?.textColor || 'text-blue-600'}` : 'text-gray-900 dark:text-white'}">
											{game.awayScore}
										</div>
										<div class="text-gray-400 text-lg">-</div>
										<div class="text-2xl sm:text-4xl font-black {game.homeScore > game.awayScore ? `${sportConfig?.textColor || 'text-blue-600'}` : 'text-gray-900 dark:text-white'}">
											{game.homeScore}
										</div>
									{/if}
								</div>
								
								<!-- Home Team -->
								<div class="flex items-center gap-3 sm:gap-4 flex-1 justify-end">
									<div class="text-right">
										<div class="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">{game.homeTeam.city}</div>
										<div class="font-bold text-gray-900 dark:text-white text-sm sm:text-lg">{game.homeTeam.name}</div>
									</div>
									<img 
										src={game.homeTeam.logo} 
										alt={game.homeTeam.name}
										class="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-gray-100 dark:border-gray-700"
									/>
								</div>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.horizontal-gallery {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.horizontal-gallery::-webkit-scrollbar {
		display: none;
	}
</style>






