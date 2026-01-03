<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import PageSEO from '$lib/components/seo/PageSEO.svelte';
	
	let sport = '';
	let sportConfig = null;
	let loading = true;
	let searchQuery = '';
	let activeConference = 'all';
	let viewMode = 'grid'; // 'grid' or 'list'
	let teams = [];
	
	const sportsConfig = {
		'nfl': {
			name: 'NFL', icon: '🏈', color: 'bg-green-700',
			conferences: ['AFC', 'NFC'],
			divisions: ['East', 'North', 'South', 'West'],
			teams: [
				{ name: 'Chiefs', city: 'Kansas City', conference: 'AFC', division: 'West', record: '14-3', stadium: 'GEHA Field at Arrowhead Stadium', founded: 1960 },
				{ name: 'Bills', city: 'Buffalo', conference: 'AFC', division: 'East', record: '11-6', stadium: 'Highmark Stadium', founded: 1960 },
				{ name: 'Ravens', city: 'Baltimore', conference: 'AFC', division: 'North', record: '13-4', stadium: 'M&T Bank Stadium', founded: 1996 },
				{ name: '49ers', city: 'San Francisco', conference: 'NFC', division: 'West', record: '12-5', stadium: 'Levi\'s Stadium', founded: 1946 },
				{ name: 'Cowboys', city: 'Dallas', conference: 'NFC', division: 'East', record: '12-5', stadium: 'AT&T Stadium', founded: 1960 },
				{ name: 'Lions', city: 'Detroit', conference: 'NFC', division: 'North', record: '12-5', stadium: 'Ford Field', founded: 1930 },
				{ name: 'Eagles', city: 'Philadelphia', conference: 'NFC', division: 'East', record: '11-6', stadium: 'Lincoln Financial Field', founded: 1933 },
				{ name: 'Dolphins', city: 'Miami', conference: 'AFC', division: 'East', record: '11-6', stadium: 'Hard Rock Stadium', founded: 1966 },
				{ name: 'Bengals', city: 'Cincinnati', conference: 'AFC', division: 'North', record: '9-8', stadium: 'Paycor Stadium', founded: 1968 },
				{ name: 'Packers', city: 'Green Bay', conference: 'NFC', division: 'North', record: '9-8', stadium: 'Lambeau Field', founded: 1919 },
				{ name: 'Jets', city: 'New York', conference: 'AFC', division: 'East', record: '7-10', stadium: 'MetLife Stadium', founded: 1960 },
				{ name: 'Steelers', city: 'Pittsburgh', conference: 'AFC', division: 'North', record: '10-7', stadium: 'Acrisure Stadium', founded: 1933 }
			]
		},
		'nba': {
			name: 'NBA', icon: '🏀', color: 'bg-orange-600',
			conferences: ['Eastern', 'Western'],
			divisions: ['Atlantic', 'Central', 'Southeast', 'Northwest', 'Pacific', 'Southwest'],
			teams: [
				{ name: 'Lakers', city: 'Los Angeles', conference: 'Western', division: 'Pacific', record: '47-35', stadium: 'Crypto.com Arena', founded: 1947 },
				{ name: 'Celtics', city: 'Boston', conference: 'Eastern', division: 'Atlantic', record: '64-18', stadium: 'TD Garden', founded: 1946 },
				{ name: 'Warriors', city: 'Golden State', conference: 'Western', division: 'Pacific', record: '46-36', stadium: 'Chase Center', founded: 1946 },
				{ name: 'Bucks', city: 'Milwaukee', conference: 'Eastern', division: 'Central', record: '49-33', stadium: 'Fiserv Forum', founded: 1968 },
				{ name: 'Nuggets', city: 'Denver', conference: 'Western', division: 'Northwest', record: '57-25', stadium: 'Ball Arena', founded: 1967 },
				{ name: 'Heat', city: 'Miami', conference: 'Eastern', division: 'Southeast', record: '46-36', stadium: 'Kaseya Center', founded: 1988 },
				{ name: 'Suns', city: 'Phoenix', conference: 'Western', division: 'Pacific', record: '49-33', stadium: 'Footprint Center', founded: 1968 },
				{ name: 'Mavericks', city: 'Dallas', conference: 'Western', division: 'Southwest', record: '50-32', stadium: 'American Airlines Center', founded: 1980 },
				{ name: 'Clippers', city: 'Los Angeles', conference: 'Western', division: 'Pacific', record: '51-31', stadium: 'Crypto.com Arena', founded: 1970 },
				{ name: '76ers', city: 'Philadelphia', conference: 'Eastern', division: 'Atlantic', record: '47-35', stadium: 'Wells Fargo Center', founded: 1946 },
				{ name: 'Knicks', city: 'New York', conference: 'Eastern', division: 'Atlantic', record: '50-32', stadium: 'Madison Square Garden', founded: 1946 },
				{ name: 'Cavaliers', city: 'Cleveland', conference: 'Eastern', division: 'Central', record: '48-34', stadium: 'Rocket Mortgage FieldHouse', founded: 1970 }
			]
		},
		'mlb': {
			name: 'MLB', icon: '⚾', color: 'bg-red-600',
			conferences: ['American League', 'National League'],
			divisions: ['East', 'Central', 'West'],
			teams: [
				{ name: 'Yankees', city: 'New York', conference: 'American League', division: 'East', record: '95-67', stadium: 'Yankee Stadium', founded: 1903 },
				{ name: 'Dodgers', city: 'Los Angeles', conference: 'National League', division: 'West', record: '100-62', stadium: 'Dodger Stadium', founded: 1883 },
				{ name: 'Astros', city: 'Houston', conference: 'American League', division: 'West', record: '90-72', stadium: 'Minute Maid Park', founded: 1962 },
				{ name: 'Braves', city: 'Atlanta', conference: 'National League', division: 'East', record: '104-58', stadium: 'Truist Park', founded: 1871 },
				{ name: 'Rangers', city: 'Texas', conference: 'American League', division: 'West', record: '90-72', stadium: 'Globe Life Field', founded: 1961 },
				{ name: 'Phillies', city: 'Philadelphia', conference: 'National League', division: 'East', record: '90-72', stadium: 'Citizens Bank Park', founded: 1883 },
				{ name: 'Orioles', city: 'Baltimore', conference: 'American League', division: 'East', record: '101-61', stadium: 'Oriole Park', founded: 1894 },
				{ name: 'Twins', city: 'Minnesota', conference: 'American League', division: 'Central', record: '87-75', stadium: 'Target Field', founded: 1901 },
				{ name: 'Rays', city: 'Tampa Bay', conference: 'American League', division: 'East', record: '99-63', stadium: 'Tropicana Field', founded: 1998 },
				{ name: 'Mariners', city: 'Seattle', conference: 'American League', division: 'West', record: '88-74', stadium: 'T-Mobile Park', founded: 1977 }
			]
		},
		'nhl': {
			name: 'NHL', icon: '🏒', color: 'bg-blue-700',
			conferences: ['Eastern', 'Western'],
			divisions: ['Atlantic', 'Metropolitan', 'Central', 'Pacific'],
			teams: [
				{ name: 'Avalanche', city: 'Colorado', conference: 'Western', division: 'Central', record: '51-24', stadium: 'Ball Arena', founded: 1972 },
				{ name: 'Bruins', city: 'Boston', conference: 'Eastern', division: 'Atlantic', record: '65-12', stadium: 'TD Garden', founded: 1924 },
				{ name: 'Lightning', city: 'Tampa Bay', conference: 'Eastern', division: 'Atlantic', record: '46-30', stadium: 'Amalie Arena', founded: 1992 },
				{ name: 'Rangers', city: 'New York', conference: 'Eastern', division: 'Metropolitan', record: '55-23', stadium: 'Madison Square Garden', founded: 1926 },
				{ name: 'Oilers', city: 'Edmonton', conference: 'Western', division: 'Pacific', record: '49-27', stadium: 'Rogers Place', founded: 1972 },
				{ name: 'Panthers', city: 'Florida', conference: 'Eastern', division: 'Atlantic', record: '58-18', stadium: 'Amerant Bank Arena', founded: 1993 },
				{ name: 'Maple Leafs', city: 'Toronto', conference: 'Eastern', division: 'Atlantic', record: '46-26', stadium: 'Scotiabank Arena', founded: 1917 },
				{ name: 'Stars', city: 'Dallas', conference: 'Western', division: 'Central', record: '52-21', stadium: 'American Airlines Center', founded: 1967 },
				{ name: 'Hurricanes', city: 'Carolina', conference: 'Eastern', division: 'Metropolitan', record: '52-23', stadium: 'PNC Arena', founded: 1972 },
				{ name: 'Devils', city: 'New Jersey', conference: 'Eastern', division: 'Metropolitan', record: '52-22', stadium: 'Prudential Center', founded: 1974 }
			]
		},
		'soccer': {
			name: 'Premier League', icon: '⚽', color: 'bg-purple-700',
			conferences: [],
			divisions: [],
			teams: [
				{ name: 'Arsenal', city: 'London', record: '28-5-5', stadium: 'Emirates Stadium', founded: 1886 },
				{ name: 'Man City', city: 'Manchester', record: '27-7-4', stadium: 'Etihad Stadium', founded: 1880 },
				{ name: 'Liverpool', city: 'Liverpool', record: '24-8-6', stadium: 'Anfield', founded: 1892 },
				{ name: 'Aston Villa', city: 'Birmingham', record: '20-8-10', stadium: 'Villa Park', founded: 1874 },
				{ name: 'Tottenham', city: 'London', record: '20-6-12', stadium: 'Tottenham Hotspur Stadium', founded: 1882 },
				{ name: 'Chelsea', city: 'London', record: '18-9-11', stadium: 'Stamford Bridge', founded: 1905 },
				{ name: 'Newcastle', city: 'Newcastle', record: '18-6-14', stadium: 'St. James\' Park', founded: 1892 },
				{ name: 'Man United', city: 'Manchester', record: '18-6-14', stadium: 'Old Trafford', founded: 1878 },
				{ name: 'West Ham', city: 'London', record: '14-10-14', stadium: 'London Stadium', founded: 1895 },
				{ name: 'Brighton', city: 'Brighton', record: '12-12-14', stadium: 'Amex Stadium', founded: 1901 }
			]
		}
	};
	
	function getFilteredTeams() {
		let filtered = teams;
		
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(t => 
				t.name.toLowerCase().includes(query) || 
				t.city.toLowerCase().includes(query)
			);
		}
		
		if (activeConference !== 'all') {
			filtered = filtered.filter(t => t.conference === activeConference);
		}
		
		return filtered;
	}
	
	$: filteredTeams = getFilteredTeams();
	
	onMount(async () => {
		sport = $page.params.sport.toLowerCase();
		sportConfig = sportsConfig[sport] || sportsConfig['nfl'];
		
		await new Promise(resolve => setTimeout(resolve, 500));
		teams = sportConfig.teams.map(t => ({
			...t,
			logo: `https://ui-avatars.com/api/?name=${t.name}&background=random&size=100`
		}));
		loading = false;
	});
</script>

<PageSEO 
	title="{sportConfig?.name || 'Sports'} Teams - All Teams Directory"
	description="Browse all {sportConfig?.name || 'sports'} teams. Complete directory with team information, stadiums, and current season records."
/>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<!-- Header -->
	<div class="{sportConfig?.color || 'bg-blue-700'} text-white py-6 sm:py-8">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
			<div class="flex items-center gap-3">
				<span class="text-3xl sm:text-4xl">{sportConfig?.icon || '🏆'}</span>
				<div>
					<h1 class="text-2xl sm:text-3xl font-bold">{sportConfig?.name || 'Sports'} Teams</h1>
					<p class="text-sm sm:text-base opacity-90">All teams directory</p>
				</div>
			</div>
		</div>
	</div>
	
	<!-- Filters -->
	<div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-[88px] z-20">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
			<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
				<!-- Search -->
				<div class="relative flex-1 max-w-md">
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Search teams..."
						class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
					/>
					<svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</div>
				
				<div class="flex items-center gap-3">
					<!-- Conference Filter -->
					{#if sportConfig?.conferences?.length > 0}
						<select
							bind:value={activeConference}
							class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
						>
							<option value="all">All Conferences</option>
							{#each sportConfig.conferences as conf}
								<option value={conf}>{conf}</option>
							{/each}
						</select>
					{/if}
					
					<!-- View Toggle -->
					<div class="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
						<button
							on:click={() => viewMode = 'grid'}
							class="p-2 {viewMode === 'grid' ? `${sportConfig?.color || 'bg-blue-700'} text-white` : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'}"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
							</svg>
						</button>
						<button
							on:click={() => viewMode = 'list'}
							class="p-2 {viewMode === 'list' ? `${sportConfig?.color || 'bg-blue-700'} text-white` : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'}"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- Teams Content -->
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6">
		{#if loading}
			{#if viewMode === 'grid'}
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{#each Array(12) as _}
						<div class="bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse">
							<div class="flex flex-col items-center">
								<div class="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
								<div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
								<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="space-y-3">
					{#each Array(12) as _}
						<div class="bg-white dark:bg-gray-800 rounded-xl p-4 animate-pulse flex items-center gap-4">
							<div class="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
							<div class="flex-1 space-y-2">
								<div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
								<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
							</div>
							<div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
						</div>
					{/each}
				</div>
			{/if}
		{:else if filteredTeams.length === 0}
			<div class="text-center py-16">
				<span class="text-6xl mb-4 block">{sportConfig?.icon || '🏆'}</span>
				<h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">No Teams Found</h2>
				<p class="text-gray-600 dark:text-gray-400">Try adjusting your search or filters.</p>
			</div>
		{:else if viewMode === 'grid'}
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{#each filteredTeams as team}
					<a 
						href="/{sport}/team/{team.name.toLowerCase().replace(/\s/g, '-')}"
						class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group"
					>
						<div class="p-6">
							<div class="flex flex-col items-center text-center">
								<img 
									src={team.logo} 
									alt={team.name}
									class="w-20 h-20 rounded-full mb-4 group-hover:scale-110 transition-transform duration-200"
								/>
								<h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1">{team.city} {team.name}</h3>
								{#if team.conference}
									<p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
										{team.conference} {team.division ? `• ${team.division}` : ''}
									</p>
								{/if}
								<div class="flex items-center gap-2 mt-2">
									<span class="px-3 py-1 text-sm font-semibold rounded-full {sportConfig?.color || 'bg-blue-700'} text-white">
										{team.record}
									</span>
								</div>
							</div>
						</div>
						<div class="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
							<div class="flex items-center justify-between text-sm">
								<span class="text-gray-500 dark:text-gray-400">{team.stadium}</span>
								<span class="text-gray-400 dark:text-gray-500">Est. {team.founded}</span>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
				<div class="divide-y divide-gray-100 dark:divide-gray-700">
					{#each filteredTeams as team}
						<a 
							href="/{sport}/team/{team.name.toLowerCase().replace(/\s/g, '-')}"
							class="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
						>
							<div class="flex items-center gap-4">
								<img 
									src={team.logo} 
									alt={team.name}
									class="w-14 h-14 rounded-full"
								/>
								<div>
									<h3 class="font-bold text-gray-900 dark:text-white">{team.city} {team.name}</h3>
									<p class="text-sm text-gray-500 dark:text-gray-400">
										{#if team.conference}
											{team.conference} {team.division ? `• ${team.division}` : ''} • 
										{/if}
										{team.stadium}
									</p>
								</div>
							</div>
							<div class="flex items-center gap-4">
								<span class="px-3 py-1 text-sm font-semibold rounded-full {sportConfig?.color || 'bg-blue-700'} text-white">
									{team.record}
								</span>
								<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
								</svg>
							</div>
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

