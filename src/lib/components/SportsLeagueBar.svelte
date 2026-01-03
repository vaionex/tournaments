<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { theme } from '$lib/stores/theme';
	
	let activeSport = 'NFL';
	let hoveredSport = null;
	let searchQuery = '';
	let closeTimeout = null;
	
	const sports = [
		{ code: 'NFL', name: 'NFL' },
		{ code: 'NBA', name: 'NBA' },
		{ code: 'MLB', name: 'MLB' },
		{ code: 'NCAAF', name: 'NCAAF' },
		{ code: 'NHL', name: 'NHL' },
		{ code: 'SOCCER', name: 'Soccer' },
		{ code: 'WNBA', name: 'WNBA' },
		{ code: 'MORE', name: 'More Sports' }
	];
	
	function getSportLinks(code) {
		const links = {
			'NFL': ['Home', 'Scores', 'Standings', 'Schedule', 'Stats', 'Teams', 'Draft', 'Fantasy'],
			'NBA': ['Home', 'Scores', 'Standings', 'Schedule', 'Stats', 'Teams', 'Draft', 'Fantasy'],
			'MLB': ['Home', 'Scores', 'Standings', 'Schedule', 'Stats', 'Teams', 'Transactions', 'Fantasy'],
			'NCAAF': ['Home', 'Scores', 'Rankings', 'Schedule', 'Stats', 'Teams', 'Recruiting', 'Bowl Games'],
			'NHL': ['Home', 'Scores', 'Standings', 'Schedule', 'Stats', 'Teams', 'Draft', 'Fantasy'],
			'SOCCER': ['Home', 'Scores', 'Tables', 'Schedule', 'Transfers', 'USMNT', 'USWNT', 'Leagues & Cups', 'Teams'],
			'WNBA': ['Home', 'Scores', 'Standings', 'Schedule', 'Stats', 'Teams', 'Draft', 'Fantasy'],
			'MORE': ['Tennis', 'Golf', 'Boxing', 'MMA', 'Racing', 'Olympics', 'Esports', 'All Sports']
		};
		return links[code] || [];
	}
	
	function getTopLeagues(code) {
		const leagues = {
			'NFL': [
				{ name: 'AFC', logo: '🏈' },
				{ name: 'NFC', logo: '🏈' },
				{ name: 'AFC East', logo: '🏈' },
				{ name: 'AFC West', logo: '🏈' },
				{ name: 'NFC East', logo: '🏈' },
				{ name: 'NFC West', logo: '🏈' }
			],
			'NBA': [
				{ name: 'Eastern Conference', logo: '🏀' },
				{ name: 'Western Conference', logo: '🏀' },
				{ name: 'Atlantic Division', logo: '🏀' },
				{ name: 'Pacific Division', logo: '🏀' }
			],
			'MLB': [
				{ name: 'American League', logo: '⚾' },
				{ name: 'National League', logo: '⚾' },
				{ name: 'AL East', logo: '⚾' },
				{ name: 'NL West', logo: '⚾' }
			],
			'SOCCER': [
				{ name: 'Premier League', logo: '⚽' },
				{ name: 'Champions League', logo: '⚽' },
				{ name: 'LALIGA', logo: '⚽' },
				{ name: 'Bundesliga', logo: '⚽' },
				{ name: 'MLS', logo: '⚽' },
				{ name: 'NWSL', logo: '⚽' },
				{ name: 'Liga MX', logo: '⚽' }
			],
			'NHL': [
				{ name: 'Eastern Conference', logo: '🏒' },
				{ name: 'Western Conference', logo: '🏒' },
				{ name: 'Atlantic Division', logo: '🏒' },
				{ name: 'Pacific Division', logo: '🏒' }
			],
			'NCAAF': [
				{ name: 'SEC', logo: '🏈' },
				{ name: 'Big Ten', logo: '🏈' },
				{ name: 'ACC', logo: '🏈' },
				{ name: 'Big 12', logo: '🏈' },
				{ name: 'Pac-12', logo: '🏈' }
			],
			'WNBA': [
				{ name: 'Eastern Conference', logo: '🏀' },
				{ name: 'Western Conference', logo: '🏀' }
			]
		};
		return leagues[code] || [];
	}
	
	function getTopTeams(code) {
		const teams = {
			'NFL': [
				{ name: 'Chiefs', logo: '🏈' },
				{ name: 'Bills', logo: '🏈' },
				{ name: 'Bengals', logo: '🏈' },
				{ name: 'Ravens', logo: '🏈' },
				{ name: 'Dolphins', logo: '🏈' },
				{ name: 'Steelers', logo: '🏈' },
				{ name: '49ers', logo: '🏈' },
				{ name: 'Cowboys', logo: '🏈' },
				{ name: 'Eagles', logo: '🏈' },
				{ name: 'Packers', logo: '🏈' },
				{ name: 'Lions', logo: '🏈' },
				{ name: 'Rams', logo: '🏈' },
				{ name: 'Buccaneers', logo: '🏈' },
				{ name: 'Seahawks', logo: '🏈' },
				{ name: 'Jaguars', logo: '🏈' },
				{ name: 'Browns', logo: '🏈' },
				{ name: 'Texans', logo: '🏈' },
				{ name: 'Colts', logo: '🏈' },
				{ name: 'Saints', logo: '🏈' },
				{ name: 'Falcons', logo: '🏈' },
				{ name: 'Vikings', logo: '🏈' }
			],
			'NBA': [
				{ name: 'Lakers', logo: '🏀' },
				{ name: 'Celtics', logo: '🏀' },
				{ name: 'Warriors', logo: '🏀' },
				{ name: 'Bucks', logo: '🏀' },
				{ name: 'Nuggets', logo: '🏀' },
				{ name: 'Heat', logo: '🏀' },
				{ name: 'Suns', logo: '🏀' },
				{ name: '76ers', logo: '🏀' },
				{ name: 'Mavericks', logo: '🏀' },
				{ name: 'Clippers', logo: '🏀' },
				{ name: 'Knicks', logo: '🏀' },
				{ name: 'Cavaliers', logo: '🏀' },
				{ name: 'Timberwolves', logo: '🏀' },
				{ name: 'Thunder', logo: '🏀' },
				{ name: 'Pelicans', logo: '🏀' },
				{ name: 'Kings', logo: '🏀' },
				{ name: 'Magic', logo: '🏀' },
				{ name: 'Pacers', logo: '🏀' },
				{ name: 'Bulls', logo: '🏀' },
				{ name: 'Rockets', logo: '🏀' },
				{ name: 'Hawks', logo: '🏀' }
			],
			'MLB': [
				{ name: 'Yankees', logo: '⚾' },
				{ name: 'Dodgers', logo: '⚾' },
				{ name: 'Astros', logo: '⚾' },
				{ name: 'Braves', logo: '⚾' },
				{ name: 'Rangers', logo: '⚾' },
				{ name: 'Phillies', logo: '⚾' },
				{ name: 'Orioles', logo: '⚾' },
				{ name: 'Rays', logo: '⚾' },
				{ name: 'Blue Jays', logo: '⚾' },
				{ name: 'Red Sox', logo: '⚾' },
				{ name: 'Guardians', logo: '⚾' },
				{ name: 'Twins', logo: '⚾' },
				{ name: 'Mariners', logo: '⚾' },
				{ name: 'Angels', logo: '⚾' },
				{ name: 'Mets', logo: '⚾' },
				{ name: 'Cardinals', logo: '⚾' },
				{ name: 'Cubs', logo: '⚾' },
				{ name: 'Giants', logo: '⚾' },
				{ name: 'Padres', logo: '⚾' },
				{ name: 'Diamondbacks', logo: '⚾' },
				{ name: 'Marlins', logo: '⚾' }
			],
			'SOCCER': [
				{ name: 'USMNT', logo: '🇺🇸' },
				{ name: 'USWNT', logo: '🇺🇸' },
				{ name: 'Arsenal', logo: '🔴' },
				{ name: 'Chelsea', logo: '🔵' },
				{ name: 'Liverpool', logo: '🔴' },
				{ name: 'Man City', logo: '🔵' },
				{ name: 'Man United', logo: '🔴' },
				{ name: 'Barcelona', logo: '🔵' },
				{ name: 'Real Madrid', logo: '⚪' },
				{ name: 'Atlético Madrid', logo: '🔴' },
				{ name: 'Bayern Munich', logo: '🔴' },
				{ name: 'Bayer Leverkusen', logo: '🔴' },
				{ name: 'Borussia Dortmund', logo: '🟡' },
				{ name: 'Inter Milan', logo: '🔵' },
				{ name: 'AC Milan', logo: '🔴' },
				{ name: 'Juventus', logo: '⚫' },
				{ name: 'PSG', logo: '🔵' },
				{ name: 'Inter Miami', logo: '⚫' },
				{ name: 'LA Galaxy', logo: '🔵' },
				{ name: 'América', logo: '🟡' },
				{ name: 'Guadalajara', logo: '🔴' }
			],
			'NHL': [
				{ name: 'Avalanche', logo: '🏒' },
				{ name: 'Bruins', logo: '🏒' },
				{ name: 'Lightning', logo: '🏒' },
				{ name: 'Maple Leafs', logo: '🏒' },
				{ name: 'Rangers', logo: '🏒' },
				{ name: 'Oilers', logo: '🏒' },
				{ name: 'Golden Knights', logo: '🏒' },
				{ name: 'Panthers', logo: '🏒' },
				{ name: 'Stars', logo: '🏒' },
				{ name: 'Canucks', logo: '🏒' },
				{ name: 'Kings', logo: '🏒' },
				{ name: 'Islanders', logo: '🏒' },
				{ name: 'Capitals', logo: '🏒' },
				{ name: 'Penguins', logo: '🏒' },
				{ name: 'Red Wings', logo: '🏒' },
				{ name: 'Blackhawks', logo: '🏒' },
				{ name: 'Canadiens', logo: '🏒' },
				{ name: 'Flyers', logo: '🏒' },
				{ name: 'Devils', logo: '🏒' },
				{ name: 'Sabres', logo: '🏒' },
				{ name: 'Sharks', logo: '🏒' }
			],
			'NCAAF': [
				{ name: 'Alabama', logo: '🏈' },
				{ name: 'Georgia', logo: '🏈' },
				{ name: 'Michigan', logo: '🏈' },
				{ name: 'Ohio State', logo: '🏈' },
				{ name: 'Texas', logo: '🏈' },
				{ name: 'Oregon', logo: '🏈' },
				{ name: 'LSU', logo: '🏈' },
				{ name: 'Florida State', logo: '🏈' },
				{ name: 'Notre Dame', logo: '🏈' },
				{ name: 'Penn State', logo: '🏈' },
				{ name: 'Oklahoma', logo: '🏈' },
				{ name: 'USC', logo: '🏈' },
				{ name: 'Clemson', logo: '🏈' },
				{ name: 'Tennessee', logo: '🏈' },
				{ name: 'Auburn', logo: '🏈' },
				{ name: 'Miami', logo: '🏈' },
				{ name: 'Florida', logo: '🏈' },
				{ name: 'Washington', logo: '🏈' },
				{ name: 'Oregon State', logo: '🏈' },
				{ name: 'Utah', logo: '🏈' },
				{ name: 'Wisconsin', logo: '🏈' }
			],
			'WNBA': [
				{ name: 'Aces', logo: '🏀' },
				{ name: 'Liberty', logo: '🏀' },
				{ name: 'Sun', logo: '🏀' },
				{ name: 'Storm', logo: '🏀' },
				{ name: 'Wings', logo: '🏀' },
				{ name: 'Mercury', logo: '🏀' },
				{ name: 'Dream', logo: '🏀' },
				{ name: 'Fever', logo: '🏀' },
				{ name: 'Sky', logo: '🏀' },
				{ name: 'Mystics', logo: '🏀' },
				{ name: 'Lynx', logo: '🏀' },
				{ name: 'Sparks', logo: '🏀' }
			]
		};
		return teams[code] || [];
	}
	
	function setActiveSport(code) {
		activeSport = code;
		if (code !== 'MORE') {
			const topLeagues = getTopLeagues(code);
			if (topLeagues.length > 0) {
				// Navigate to the first league in the list
				const firstLeague = topLeagues[0];
				const leagueUrl = `/${code.toLowerCase()}/league/${firstLeague.name.toLowerCase().replace(/\s+/g, '-')}`;
				goto(leagueUrl);
			} else {
				// Fallback to tournaments page if no leagues found
				goto(`/tournaments?league=${code}`);
			}
		}
	}
	
	function handleSearch() {
		if (searchQuery.trim()) {
			goto(`/tournaments?search=${encodeURIComponent(searchQuery)}`);
		}
	}
	
	/** @param {KeyboardEvent} event */
	function handleKeydown(event) {
		if (event.key === 'Enter') {
			handleSearch();
		}
	}
	
	function handleMouseEnter(sportCode) {
		if (closeTimeout) {
			clearTimeout(closeTimeout);
			closeTimeout = null;
		}
		hoveredSport = sportCode;
	}
	
	function handleMouseLeave() {
		// Delay when switching between sport links
		closeTimeout = setTimeout(() => {
			hoveredSport = null;
		}, 150);
	}
	
	function handleDropdownLeave() {
		// Immediate close when leaving dropdown area
		if (closeTimeout) {
			clearTimeout(closeTimeout);
			closeTimeout = null;
		}
		hoveredSport = null;
	}
	
	function keepDropdownOpen() {
		// Keep dropdown open when hovering over navbar areas
		if (hoveredSport && closeTimeout) {
			clearTimeout(closeTimeout);
			closeTimeout = null;
		}
	}
	
	onMount(() => {
		const handleClickOutside = (e) => {
			if (!e.target.closest('.sport-dropdown') && !e.target.closest('.mega-dropdown')) {
				if (closeTimeout) {
					clearTimeout(closeTimeout);
				}
				hoveredSport = null;
			}
		};
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
			if (closeTimeout) {
				clearTimeout(closeTimeout);
			}
		};
	});
</script>

<div 
	class="bg-gray-800 dark:bg-gray-900 border-b border-gray-700 dark:border-gray-800 sticky top-[40px] z-30 relative"
	on:mouseenter={keepDropdownOpen}
>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
		<div class="flex items-center justify-between h-12">
			<!-- Logo -->
			<a 
				href="/" 
				class="flex-shrink-0 mr-8"
				on:mouseenter={keepDropdownOpen}
			>
				<div class="relative inline-block">
					<div class="bg-red-600 dark:bg-red-600 px-4 py-2 transform -skew-x-12 shadow-lg">
						<span class="text-2xl font-black text-white inline-block transform skew-x-12 tracking-tight" style="letter-spacing: -0.02em; font-style: italic;">
							Tournaments
						</span>
					</div>
				</div>
			</a>
			
			<!-- Sports Links -->
			<div 
				class="flex items-center gap-1 flex-1 overflow-x-auto horizontal-gallery"
				on:mouseenter={keepDropdownOpen}
			>
				{#each sports as sport}
					<div 
						class="sport-dropdown relative"
						on:mouseenter={() => handleMouseEnter(sport.code)}
						on:mouseleave={handleMouseLeave}
					>
						<button
							on:click={() => setActiveSport(sport.code)}
							class="px-3 py-2 text-sm font-semibold text-white dark:text-gray-200 hover:text-red-400 dark:hover:text-red-400 transition-colors whitespace-nowrap flex-shrink-0 relative {
								activeSport === sport.code ? 'text-red-400 dark:text-red-400' : ''
							}"
						>
							{sport.name}
							{#if activeSport === sport.code}
								<span class="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 dark:bg-red-500"></span>
							{/if}
						</button>
					</div>
				{/each}
			</div>
			
			<!-- Search Bar -->
			<div class="flex-1 max-w-md ml-4">
				<div class="relative">
					<input
						type="text"
						bind:value={searchQuery}
						on:keydown={handleKeydown}
						placeholder="Search tournaments, players..."
						class="w-full px-3 py-1.5 text-sm bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded text-white placeholder-gray-400 focus:border-red-500 dark:focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
					/>
				</div>
			</div>
			
			<!-- Right Side Icons -->
			<div class="flex items-center gap-3 ml-4 flex-shrink-0">
				<!-- Fantasy -->
				<a href="/fantasy" class="flex items-center gap-1.5 text-white dark:text-gray-200 hover:text-red-400 dark:hover:text-red-400 transition-colors text-xs font-semibold">
					<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
					</svg>
					<span class="hidden sm:inline">Fantasy</span>
				</a>
				
				<!-- Players -->
				<a href="/players" class="flex items-center gap-1.5 text-white dark:text-gray-200 hover:text-red-400 dark:hover:text-red-400 transition-colors text-xs font-semibold">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
					</svg>
					<span class="hidden lg:inline">Players</span>
				</a>
				
				<!-- Theme Toggle -->
				<button
					on:click={() => theme.toggle()}
					class="text-white dark:text-gray-200 hover:text-red-400 dark:hover:text-red-400 transition-colors p-1.5"
					title="Toggle theme"
				>
					{#key $theme}
						{#if $theme === 'dark'}
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
							</svg>
						{:else}
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
							</svg>
						{/if}
					{/key}
				</button>
				
				<!-- Profile -->
				<a href="/login" class="text-white dark:text-gray-200 hover:text-red-400 dark:hover:text-red-400 transition-colors p-1.5">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
					</svg>
				</a>
			</div>
		</div>
		
		<!-- Bridge area to prevent gaps between navbar and dropdown -->
		{#if hoveredSport && hoveredSport !== 'MORE'}
			<div 
				class="absolute top-full left-0 right-0 h-1 bg-transparent z-40"
				on:mouseenter={keepDropdownOpen}
			></div>
		{/if}
		
		<!-- Mega Dropdown Menu -->
		{#if hoveredSport && hoveredSport !== 'MORE'}
			{@const links = getSportLinks(hoveredSport)}
			{@const topLeagues = getTopLeagues(hoveredSport)}
			{@const topTeams = getTopTeams(hoveredSport)}
			<div 
				class="mega-dropdown absolute top-full left-0 mt-0 bg-white dark:bg-gray-800 border-t-2 border-red-600 dark:border-red-500 shadow-2xl z-50 transition-opacity duration-200"
				on:mouseenter={() => handleMouseEnter(hoveredSport)}
				on:mouseleave={handleDropdownLeave}
			>
				<div class="px-4 sm:px-6 lg:px-8 max-w-5xl">
				<div class="flex gap-0 py-3">
					<!-- Left Sidebar - Navigation Links -->
					<div class="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-2.5 border-r-2 border-gray-200 dark:border-gray-700 w-32 flex-shrink-0" on:mouseenter={keepDropdownOpen}>
						<div class="space-y-0.5">
							{#each links as link}
								<a
									href="/{hoveredSport.toLowerCase()}/{link.toLowerCase().replace(/\s+/g, '-')}"
									class="block px-2 py-1 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-white dark:hover:bg-gray-800 transition-all duration-150 rounded border-l-2 border-transparent hover:border-red-600 dark:hover:border-red-400"
									on:mouseenter={keepDropdownOpen}
								>
									{link}
								</a>
							{/each}
						</div>
					</div>
					
					<!-- Top Leagues Section -->
					<div class="p-2.5 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 w-40 flex-shrink-0" on:mouseenter={keepDropdownOpen}>
						<h3 class="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 pb-1 border-b border-gray-200 dark:border-gray-700">Top Leagues</h3>
						<div class="space-y-0">
							{#each topLeagues as league}
								<a
									href="/{hoveredSport.toLowerCase()}/league/{league.name.toLowerCase().replace(/\s+/g, '-')}"
									class="flex items-center gap-1.5 py-1.5 px-1 rounded hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-150 group"
									on:mouseenter={keepDropdownOpen}
								>
									<span class="text-lg flex-shrink-0">{league.logo}</span>
									<span class="text-xs font-semibold text-gray-900 dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
										{league.name}
									</span>
								</a>
							{/each}
						</div>
					</div>
					
					<!-- Top Teams Section -->
					<div class="flex-1 p-2.5 bg-white dark:bg-gray-800 min-w-0" on:mouseenter={keepDropdownOpen}>
						<h3 class="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 pb-1 border-b border-gray-200 dark:border-gray-700">Top Teams</h3>
						<div class="grid grid-cols-3 gap-x-1.5 gap-y-1">
							{#each topTeams as team}
								<a
									href="/{hoveredSport.toLowerCase()}/team/{team.name.toLowerCase().replace(/\s+/g, '-')}"
									class="flex items-center gap-1.5 py-1 px-1 rounded hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-150 group"
									on:mouseenter={keepDropdownOpen}
								>
									<span class="text-base flex-shrink-0">{team.logo}</span>
									<span class="text-xs font-semibold text-gray-900 dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors truncate">
										{team.name}
									</span>
								</a>
							{/each}
						</div>
					</div>
				</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.horizontal-gallery {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	
	.horizontal-gallery::-webkit-scrollbar {
		display: none;
	}
	
	.mega-dropdown {
		animation: fadeIn 0.2s ease-in-out;
	}
	
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	.sport-dropdown {
		position: relative;
	}
</style>
