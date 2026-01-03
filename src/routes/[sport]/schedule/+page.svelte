<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
	import PageSEO from '$lib/components/seo/PageSEO.svelte';
	
	let sport = '';
	let sportConfig = null;
	let loading = true;
	let viewMode = 'week'; // 'week' or 'list'
	let currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
	let schedule = [];
	let selectedTeam = 'all';
	
	const sportsConfig = {
		'nfl': { name: 'NFL', icon: '🏈', color: 'bg-green-700', teams: ['Chiefs', 'Bills', '49ers', 'Cowboys', 'Eagles', 'Ravens', 'Dolphins', 'Lions', 'Bengals', 'Packers'] },
		'nba': { name: 'NBA', icon: '🏀', color: 'bg-orange-600', teams: ['Lakers', 'Celtics', 'Warriors', 'Bucks', 'Nuggets', 'Heat', 'Suns', 'Mavericks', 'Clippers', '76ers'] },
		'mlb': { name: 'MLB', icon: '⚾', color: 'bg-red-600', teams: ['Yankees', 'Dodgers', 'Astros', 'Braves', 'Rangers', 'Phillies', 'Orioles', 'Twins', 'Rays', 'Mariners'] },
		'nhl': { name: 'NHL', icon: '🏒', color: 'bg-blue-700', teams: ['Avalanche', 'Bruins', 'Lightning', 'Rangers', 'Oilers', 'Panthers', 'Maple Leafs', 'Stars', 'Hurricanes', 'Devils'] },
		'soccer': { name: 'Soccer', icon: '⚽', color: 'bg-purple-700', teams: ['Arsenal', 'Man City', 'Liverpool', 'Chelsea', 'Man United', 'Tottenham', 'Newcastle', 'Brighton', 'Aston Villa', 'West Ham'] },
		'ncaaf': { name: 'NCAAF', icon: '🏈', color: 'bg-orange-600', teams: ['Alabama', 'Georgia', 'Michigan', 'Ohio State', 'Texas', 'Oregon', 'Penn State', 'USC', 'Clemson', 'Notre Dame'] },
		'wnba': { name: 'WNBA', icon: '🏀', color: 'bg-orange-500', teams: ['Aces', 'Liberty', 'Sun', 'Storm', 'Wings', 'Mercury', 'Lynx', 'Sky', 'Fever', 'Sparks'] }
	};
	
	function generateSchedule(sportCode, weekStart) {
		const config = sportsConfig[sportCode];
		if (!config) return [];
		
		const teams = config.teams;
		const days = eachDayOfInterval({ 
			start: weekStart, 
			end: endOfWeek(weekStart, { weekStartsOn: 0 }) 
		});
		
		const scheduleByDay = [];
		
		days.forEach(day => {
			const numGames = Math.floor(Math.random() * 4) + 2;
			const games = [];
			const usedTeams = new Set();
			
			for (let i = 0; i < numGames; i++) {
				let homeIdx, awayIdx;
				do {
					homeIdx = Math.floor(Math.random() * teams.length);
					awayIdx = Math.floor(Math.random() * teams.length);
				} while (homeIdx === awayIdx || usedTeams.has(homeIdx) || usedTeams.has(awayIdx));
				
				usedTeams.add(homeIdx);
				usedTeams.add(awayIdx);
				
				const hours = Math.floor(Math.random() * 8) + 12;
				const minutes = Math.random() > 0.5 ? '00' : '30';
				
				games.push({
					id: `game-${day.getTime()}-${i}`,
					homeTeam: teams[homeIdx],
					awayTeam: teams[awayIdx],
					homeLogo: `https://ui-avatars.com/api/?name=${teams[homeIdx]}&background=random&size=40`,
					awayLogo: `https://ui-avatars.com/api/?name=${teams[awayIdx]}&background=random&size=40`,
					time: `${hours}:${minutes} ET`,
					venue: `${teams[homeIdx]} Stadium`,
					broadcast: ['ESPN', 'TNT', 'ABC', 'FOX', 'NBC', 'ESPN2', 'FS1'][Math.floor(Math.random() * 7)],
					tickets: Math.random() > 0.3
				});
			}
			
			scheduleByDay.push({ date: day, games });
		});
		
		return scheduleByDay;
	}
	
	function previousWeek() {
		currentWeekStart = addDays(currentWeekStart, -7);
		schedule = generateSchedule(sport, currentWeekStart);
	}
	
	function nextWeek() {
		currentWeekStart = addDays(currentWeekStart, 7);
		schedule = generateSchedule(sport, currentWeekStart);
	}
	
	function goToToday() {
		currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
		schedule = generateSchedule(sport, currentWeekStart);
	}
	
	function getFilteredSchedule() {
		if (selectedTeam === 'all') return schedule;
		return schedule.map(day => ({
			...day,
			games: day.games.filter(game => 
				game.homeTeam === selectedTeam || game.awayTeam === selectedTeam
			)
		})).filter(day => day.games.length > 0);
	}
	
	$: filteredSchedule = selectedTeam ? getFilteredSchedule() : schedule;
	
	onMount(async () => {
		sport = $page.params.sport.toLowerCase();
		sportConfig = sportsConfig[sport] || sportsConfig['nfl'];
		
		await new Promise(resolve => setTimeout(resolve, 500));
		schedule = generateSchedule(sport, currentWeekStart);
		loading = false;
	});
</script>

<PageSEO 
	title="{sportConfig?.name || 'Sports'} Schedule - Upcoming Games & Fixtures"
	description="View the complete {sportConfig?.name || 'sports'} schedule. Upcoming games, times, venues, and TV broadcasts for all {sportConfig?.name || 'sports'} matchups."
/>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<!-- Header -->
	<div class="{sportConfig?.color || 'bg-blue-700'} text-white py-6 sm:py-8">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
			<div class="flex items-center gap-3">
				<span class="text-3xl sm:text-4xl">{sportConfig?.icon || '🏆'}</span>
				<div>
					<h1 class="text-2xl sm:text-3xl font-bold">{sportConfig?.name || 'Sports'} Schedule</h1>
					<p class="text-sm sm:text-base opacity-90">Upcoming games & fixtures</p>
				</div>
			</div>
		</div>
	</div>
	
	<!-- Controls -->
	<div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-[88px] z-20">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
			<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
				<!-- Week Navigation -->
				<div class="flex items-center gap-2">
					<button
						on:click={previousWeek}
						class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
						</svg>
					</button>
					<div class="text-center min-w-[200px]">
						<div class="font-bold text-gray-900 dark:text-white">
							{format(currentWeekStart, 'MMM d')} - {format(endOfWeek(currentWeekStart, { weekStartsOn: 0 }), 'MMM d, yyyy')}
						</div>
					</div>
					<button
						on:click={nextWeek}
						class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</button>
					<button
						on:click={goToToday}
						class="px-3 py-2 text-sm font-medium rounded-lg {sportConfig?.color || 'bg-blue-700'} text-white hover:opacity-90 transition-opacity"
					>
						Today
					</button>
				</div>
				
				<!-- Filters -->
				<div class="flex items-center gap-3">
					<select
						bind:value={selectedTeam}
						class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
					>
						<option value="all">All Teams</option>
						{#each sportConfig?.teams || [] as team}
							<option value={team}>{team}</option>
						{/each}
					</select>
					
					<div class="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
						<button
							on:click={() => viewMode = 'week'}
							class="px-3 py-2 text-sm {viewMode === 'week' ? `${sportConfig?.color || 'bg-blue-700'} text-white` : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'}"
						>
							Week
						</button>
						<button
							on:click={() => viewMode = 'list'}
							class="px-3 py-2 text-sm {viewMode === 'list' ? `${sportConfig?.color || 'bg-blue-700'} text-white` : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'}"
						>
							List
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- Schedule Content -->
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6">
		{#if loading}
			<div class="grid grid-cols-1 md:grid-cols-7 gap-4">
				{#each Array(7) as _}
					<div class="bg-white dark:bg-gray-800 rounded-xl p-4 animate-pulse">
						<div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-4"></div>
						<div class="space-y-3">
							{#each Array(3) as _}
								<div class="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{:else if viewMode === 'week'}
			<!-- Week View -->
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
				{#each filteredSchedule as day}
					<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
						<div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 {isToday(day.date) ? sportConfig?.color + ' text-white' : 'bg-gray-50 dark:bg-gray-700/50'}">
							<div class="text-xs uppercase tracking-wide {isToday(day.date) ? 'opacity-80' : 'text-gray-500 dark:text-gray-400'}">
								{format(day.date, 'EEEE')}
							</div>
							<div class="text-lg font-bold {isToday(day.date) ? '' : 'text-gray-900 dark:text-white'}">
								{format(day.date, 'MMM d')}
							</div>
						</div>
						<div class="p-3 space-y-2 min-h-[200px]">
							{#if day.games.length === 0}
								<div class="text-center py-8 text-gray-400 dark:text-gray-500 text-sm">
									No games
								</div>
							{:else}
								{#each day.games as game}
									<a 
										href="/{sport}/game/{game.id}"
										class="block p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
									>
										<div class="flex items-center justify-between mb-2">
											<div class="flex items-center gap-2">
												<img src={game.awayLogo} alt={game.awayTeam} class="w-6 h-6 rounded-full" />
												<span class="text-sm font-medium text-gray-900 dark:text-white">{game.awayTeam}</span>
											</div>
										</div>
										<div class="flex items-center justify-between mb-2">
											<div class="flex items-center gap-2">
												<img src={game.homeLogo} alt={game.homeTeam} class="w-6 h-6 rounded-full" />
												<span class="text-sm font-medium text-gray-900 dark:text-white">{game.homeTeam}</span>
											</div>
										</div>
										<div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
											<span>{game.time}</span>
											<span class="font-medium">{game.broadcast}</span>
										</div>
									</a>
								{/each}
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<!-- List View -->
			<div class="space-y-6">
				{#each filteredSchedule as day}
					{#if day.games.length > 0}
						<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
							<div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 {isToday(day.date) ? sportConfig?.color + ' text-white' : 'bg-gray-50 dark:bg-gray-700/50'}">
								<div class="flex items-center justify-between">
									<div>
										<span class="font-bold {isToday(day.date) ? '' : 'text-gray-900 dark:text-white'}">{format(day.date, 'EEEE, MMMM d')}</span>
										{#if isToday(day.date)}
											<span class="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded">TODAY</span>
										{/if}
									</div>
									<span class="text-sm {isToday(day.date) ? 'opacity-80' : 'text-gray-500 dark:text-gray-400'}">{day.games.length} games</span>
								</div>
							</div>
							<div class="divide-y divide-gray-100 dark:divide-gray-700">
								{#each day.games as game}
									<a 
										href="/{sport}/game/{game.id}"
										class="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
									>
										<div class="flex items-center gap-4 flex-1">
											<div class="flex items-center gap-3 min-w-[140px]">
												<img src={game.awayLogo} alt={game.awayTeam} class="w-8 h-8 rounded-full" />
												<span class="font-semibold text-gray-900 dark:text-white">{game.awayTeam}</span>
											</div>
											<span class="text-gray-400">@</span>
											<div class="flex items-center gap-3 min-w-[140px]">
												<img src={game.homeLogo} alt={game.homeTeam} class="w-8 h-8 rounded-full" />
												<span class="font-semibold text-gray-900 dark:text-white">{game.homeTeam}</span>
											</div>
										</div>
										<div class="flex items-center gap-6 text-sm">
											<div class="text-right hidden sm:block">
												<div class="text-gray-600 dark:text-gray-400">{game.venue}</div>
											</div>
											<div class="text-right min-w-[80px]">
												<div class="font-medium text-gray-900 dark:text-white">{game.time}</div>
												<div class="text-xs text-gray-500 dark:text-gray-400">{game.broadcast}</div>
											</div>
											{#if game.tickets}
												<button class="px-3 py-1.5 text-xs font-medium rounded bg-green-600 text-white hover:bg-green-700 transition-colors hidden md:block">
													Tickets
												</button>
											{/if}
										</div>
									</a>
								{/each}
							</div>
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</div>

