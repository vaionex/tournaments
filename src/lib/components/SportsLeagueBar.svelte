<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { theme } from '$lib/stores/theme';
	
	let activeSport = 'NFL';
	
	// Set active sport based on current route
	$: {
		const sportParam = $page.params.sport;
		if (sportParam) {
			activeSport = sportParam.toUpperCase();
		}
	}
	let hoveredSport = null;
	let searchQuery = '';
	let closeTimeout = null;
	let mobileMenuOpen = false;
	let mobileSearchOpen = false;
	
	const sports = [
		{ code: 'NFL', name: 'NFL' },
		{ code: 'NBA', name: 'NBA' },
		{ code: 'MLB', name: 'MLB' },
		{ code: 'NHL', name: 'NHL' },
		{ code: 'SOCCER', name: 'Soccer' },
		{ code: 'MORE', name: '...' }
	];
	
	const moreSports = [
		{ code: 'NCAAF', name: 'NCAAF', icon: '🏈' },
		{ code: 'WNBA', name: 'WNBA', icon: '🏀' },
		{ code: 'TENNIS', name: 'Tennis', icon: '🎾' },
		{ code: 'GOLF', name: 'Golf', icon: '⛳' },
		{ code: 'MMA', name: 'MMA/UFC', icon: '🥊' },
		{ code: 'BOXING', name: 'Boxing', icon: '🥊' },
		{ code: 'RACING', name: 'Racing', icon: '🏎️' },
		{ code: 'OLYMPICS', name: 'Olympics', icon: '🏅' },
		{ code: 'ESPORTS', name: 'Esports', icon: '🎮' },
		{ code: 'CRICKET', name: 'Cricket', icon: '🏏' },
		{ code: 'RUGBY', name: 'Rugby', icon: '🏉' }
	];
	
	function getSportLinks(code) {
		const links = {
			'NFL': ['Home', 'Scores', 'Standings', 'Schedule', 'Stats', 'Teams'],
			'NBA': ['Home', 'Scores', 'Standings', 'Schedule', 'Stats', 'Teams'],
			'MLB': ['Home', 'Scores', 'Standings', 'Schedule', 'Stats', 'Teams'],
			'NCAAF': ['Home', 'Scores', 'Rankings', 'Schedule', 'Stats', 'Teams'],
			'NHL': ['Home', 'Scores', 'Standings', 'Schedule', 'Stats', 'Teams'],
			'SOCCER': ['Home', 'Scores', 'Tables', 'Schedule', 'Transfers', 'Teams'],
			'WNBA': ['Home', 'Scores', 'Standings', 'Schedule', 'Stats', 'Teams']
		};
		return links[code] || [];
	}
	
	function getTopTeams(code) {
		const teams = {
			'NFL': ['Chiefs', 'Bills', '49ers', 'Cowboys', 'Eagles', 'Ravens'],
			'NBA': ['Lakers', 'Celtics', 'Warriors', 'Bucks', 'Nuggets', 'Heat'],
			'MLB': ['Yankees', 'Dodgers', 'Astros', 'Braves', 'Rangers', 'Phillies'],
			'SOCCER': ['Arsenal', 'Man City', 'Liverpool', 'Real Madrid', 'Barcelona', 'Bayern'],
			'NHL': ['Avalanche', 'Bruins', 'Lightning', 'Rangers', 'Oilers', 'Panthers'],
			'NCAAF': ['Alabama', 'Georgia', 'Michigan', 'Ohio State', 'Texas', 'Oregon'],
			'WNBA': ['Aces', 'Liberty', 'Sun', 'Storm', 'Wings', 'Mercury']
		};
		return teams[code] || [];
	}
	
	function setActiveSport(code) {
		if (code === 'MORE') {
			// On mobile, toggle the mobile menu to show more sports
			if (window.innerWidth < 640) {
				mobileMenuOpen = !mobileMenuOpen;
			}
			// On desktop, hover handles the dropdown
			return;
		}
		activeSport = code;
		hoveredSport = null;
		mobileMenuOpen = false;
	}
	
	function handleSearch() {
		if (searchQuery.trim()) {
			goto(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
			mobileSearchOpen = false;
		}
	}
	
	/** @param {KeyboardEvent} event */
	function handleKeydown(event) {
		if (event.key === 'Enter') {
			handleSearch();
		}
	}
	
	function handleMouseEnter(sportCode) {
		if (window.innerWidth < 640) return; // Disable hover on mobile (below sm breakpoint)
		if (closeTimeout) {
			clearTimeout(closeTimeout);
			closeTimeout = null;
		}
		hoveredSport = sportCode;
	}
	
	function handleMouseLeave() {
		closeTimeout = setTimeout(() => {
			hoveredSport = null;
		}, 150);
	}
	
	function handleDropdownLeave() {
		if (closeTimeout) {
			clearTimeout(closeTimeout);
			closeTimeout = null;
		}
		hoveredSport = null;
	}
	
	function keepDropdownOpen() {
		if (hoveredSport && closeTimeout) {
			clearTimeout(closeTimeout);
			closeTimeout = null;
		}
	}
	
	onMount(() => {
		const handleClickOutside = (e) => {
			if (!e.target.closest('.sport-dropdown') && !e.target.closest('.mega-dropdown') && !e.target.closest('.more-dropdown')) {
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

<div class="bg-gray-800 dark:bg-gray-900 border-b border-gray-700 dark:border-gray-800 sticky top-10 z-40 relative">
	<div class="container mx-auto px-2 sm:px-4 lg:px-8 max-w-7xl relative">
		<div class="flex items-center h-11 sm:h-12 gap-1 sm:gap-2">
			<!-- Logo - Hidden on mobile, shown in Navbar -->
			<a 
				href="/" 
				class="hidden md:flex flex-shrink-0 mr-4"
				on:mouseenter={keepDropdownOpen}
			>
				<div class="relative inline-block">
					<div class="bg-red-600 dark:bg-red-600 px-3 py-1.5 transform -skew-x-12 shadow-lg">
						<span class="text-lg font-black text-white inline-block transform skew-x-12 tracking-tight" style="letter-spacing: -0.02em; font-style: italic;">
							Tournaments
						</span>
					</div>
				</div>
			</a>
			
			<!-- Sports Links - Scrollable on mobile -->
			<div 
				class="flex items-center gap-0.5 sm:gap-1 overflow-x-auto horizontal-gallery min-w-0"
				on:mouseenter={keepDropdownOpen}
			>
				{#each sports as sport}
					{#if sport.code !== 'MORE'}
						<div 
							class="sport-dropdown relative flex-shrink-0"
							on:mouseenter={() => handleMouseEnter(sport.code)}
							on:mouseleave={handleMouseLeave}
						>
							<button
								on:click={() => {
									setActiveSport(sport.code);
									goto(`/${sport.code.toLowerCase()}/home`);
								}}
								class="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white dark:text-gray-200 hover:text-red-400 dark:hover:text-red-400 transition-colors whitespace-nowrap relative {
									activeSport === sport.code ? 'text-red-400 dark:text-red-400' : ''
								}"
							>
								{sport.name}
								{#if activeSport === sport.code}
									<span class="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 dark:bg-red-500"></span>
								{/if}
							</button>
						</div>
					{/if}
				{/each}
				
				<!-- More Sports Button - Inside sports container, next to Soccer -->
				<div 
					class="more-dropdown relative flex-shrink-0"
					on:mouseenter={() => handleMouseEnter('MORE')}
					on:mouseleave={handleMouseLeave}
				>
					<button
						on:click={() => setActiveSport('MORE')}
						class="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white dark:text-gray-200 hover:text-red-400 dark:hover:text-red-400 transition-colors whitespace-nowrap"
					>
						...
					</button>
				</div>
			</div>
			
			<!-- Spacer to push right side actions to the right -->
			<div class="flex-1"></div>
			
			<!-- Right Side Actions -->
			<div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
				<!-- Search Toggle - Mobile -->
				<button
					on:click={() => { mobileSearchOpen = !mobileSearchOpen; mobileMenuOpen = false; }}
					class="sm:hidden p-1.5 text-white dark:text-gray-200 hover:text-red-400 transition-colors"
					aria-label="Search"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</button>
				
				<!-- Search Bar - Desktop -->
				<div class="hidden sm:block w-32 md:w-40 lg:w-48">
					<div class="relative">
						<input
							type="text"
							bind:value={searchQuery}
							on:keydown={handleKeydown}
							placeholder="Search..."
							class="w-full px-2.5 py-1 text-xs bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded text-white placeholder-gray-400 focus:border-red-500 dark:focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
						/>
						<button
							on:click={handleSearch}
							class="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
						>
							<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						</button>
					</div>
				</div>
				
				<!-- Desktop Navigation Links -->
				<div class="hidden sm:flex items-center gap-1 border-l border-gray-600 pl-2 ml-1">
					<a href="/tournaments" class="flex items-center gap-1.5 text-white dark:text-gray-200 hover:text-red-400 transition-colors text-xs font-semibold px-2 py-1.5 rounded hover:bg-gray-700">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
						</svg>
						<span class="hidden md:inline">Tournaments</span>
					</a>
					
					<a href="/players" class="flex items-center gap-1.5 text-white dark:text-gray-200 hover:text-red-400 transition-colors text-xs font-semibold px-2 py-1.5 rounded hover:bg-gray-700">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
						<span class="hidden md:inline">Players</span>
					</a>
					
					<a href="/fantasy" class="flex items-center gap-1.5 text-white dark:text-gray-200 hover:text-red-400 transition-colors text-xs font-semibold px-2 py-1.5 rounded hover:bg-gray-700">
						<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
						</svg>
						<span class="hidden lg:inline">Fantasy</span>
					</a>
				</div>
				
				<!-- Theme Toggle -->
				<button
					on:click={() => theme.toggle()}
					class="hidden sm:block text-white dark:text-gray-200 hover:text-red-400 transition-colors p-1.5"
					title="Toggle theme"
				>
					{#key $theme}
						{#if $theme === 'dark'}
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
							</svg>
						{:else}
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
							</svg>
						{/if}
					{/key}
				</button>
				
				<!-- Profile -->
				<a href="/login" class="text-white dark:text-gray-200 hover:text-red-400 transition-colors p-1.5">
					<svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
					</svg>
				</a>
			</div>
		</div>
		
		<!-- Mobile Search Bar -->
		{#if mobileSearchOpen}
			<div class="sm:hidden py-2 border-t border-gray-700">
				<div class="relative">
					<input
						type="text"
						bind:value={searchQuery}
						on:keydown={handleKeydown}
						placeholder="Search tournaments, players..."
						class="w-full px-3 py-2 text-sm bg-gray-700 dark:bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-red-500 focus:outline-none"
						autofocus
					/>
					<button
						on:click={handleSearch}
						class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</button>
				</div>
			</div>
		{/if}
		
		<!-- Mobile More Sports Menu -->
		{#if mobileMenuOpen}
			<div class="sm:hidden py-2 border-t border-gray-700">
				<div class="grid grid-cols-3 gap-1 px-1">
					{#each moreSports as sport}
						<a
							href="/{sport.code.toLowerCase()}/home"
							class="px-2 py-2 text-xs font-semibold text-white hover:text-red-400 hover:bg-gray-700 rounded text-center transition-colors"
							on:click={() => mobileMenuOpen = false}
						>
							{sport.name}
						</a>
					{/each}
				</div>
			</div>
		{/if}
		
		<!-- Desktop Mega Dropdown Menu -->
		{#if hoveredSport && hoveredSport !== 'MORE'}
			{@const links = getSportLinks(hoveredSport)}
			{@const topTeams = getTopTeams(hoveredSport)}
			<div 
				class="mega-dropdown hidden md:block absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border-t-2 border-red-600 dark:border-red-500 shadow-2xl z-50"
				on:mouseenter={() => handleMouseEnter(hoveredSport)}
				on:mouseleave={handleDropdownLeave}
			>
				<div class="container mx-auto px-4 lg:px-8 max-w-7xl">
					<div class="flex gap-6 py-4">
						<!-- Navigation Links -->
						<div class="w-32 flex-shrink-0 border-r border-gray-200 dark:border-gray-700 pr-4">
							<div class="space-y-1">
								{#each links as link}
									<a
										href="/{hoveredSport.toLowerCase()}/{link.toLowerCase().replace(/\s+/g, '-')}"
										class="block px-2 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
									>
										{link}
									</a>
								{/each}
							</div>
						</div>
						
						<!-- Top Teams -->
						<div class="flex-1">
							<h3 class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Top Teams</h3>
							<div class="grid grid-cols-3 lg:grid-cols-6 gap-2">
								{#each topTeams as team}
									<a
										href="/{hoveredSport.toLowerCase()}/team/{team.toLowerCase().replace(/\s+/g, '-')}"
										class="px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors text-center"
									>
										{team}
									</a>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
		
		<!-- More Sports Mega Dropdown - Same style as other sports -->
		{#if hoveredSport === 'MORE'}
			<div 
				class="mega-dropdown hidden md:block absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border-t-2 border-red-600 dark:border-red-500 shadow-2xl z-50"
				on:mouseenter={() => handleMouseEnter('MORE')}
				on:mouseleave={handleDropdownLeave}
			>
				<div class="container mx-auto px-4 lg:px-8 max-w-7xl">
					<div class="py-4">
						<h3 class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">More Sports</h3>
						<div class="grid grid-cols-4 lg:grid-cols-6 gap-2">
							{#each moreSports as sport}
								<a
									href="/{sport.code.toLowerCase()}/home"
									class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
								>
									<span class="text-lg">{sport.icon}</span>
									<span>{sport.name}</span>
								</a>
							{/each}
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
	
	.mega-dropdown,
	.animate-fadeIn {
		animation: fadeIn 0.15s ease-out;
	}
	
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-5px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
