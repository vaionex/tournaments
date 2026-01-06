<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { theme } from '$lib/stores/theme';
	import { getCurrentUser, getUserProfile } from '$lib/services/user.service';
	
	let searchQuery = '';
	let mobileMenuOpen = false;
	let mobileSearchOpen = false;
	let user = null;
	let userProfile = null;
	let loadingAuth = true;
	
	onMount(async () => {
		user = await getCurrentUser();
		if (user) {
			userProfile = await getUserProfile(user.id);
		}
		loadingAuth = false;
	});
	
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
	
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
		if (mobileMenuOpen) mobileSearchOpen = false;
	}
	
	function toggleMobileSearch() {
		mobileSearchOpen = !mobileSearchOpen;
		if (mobileSearchOpen) mobileMenuOpen = false;
	}
	
	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<nav class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-10 z-40">
	<div class="container mx-auto px-3 sm:px-4 lg:px-8 max-w-7xl">
		<div class="flex items-center justify-between h-12 gap-2 sm:gap-4">
			<!-- Logo -->
			<a href="/" class="flex-shrink-0">
				<div class="relative inline-block">
					<div class="bg-red-600 dark:bg-red-600 px-2 sm:px-3 py-1 sm:py-1.5 transform -skew-x-12 shadow-md">
						<span class="text-base sm:text-xl font-black text-white inline-block transform skew-x-12 tracking-tight" style="letter-spacing: -0.02em; font-style: italic;">
							Tournaments
						</span>
					</div>
				</div>
			</a>
			
			<!-- Search Bar - Desktop -->
			<div class="hidden sm:flex flex-1 max-w-2xl">
				<div class="relative w-full">
					<input
						type="text"
						bind:value={searchQuery}
						on:keydown={handleKeydown}
						placeholder="Search tournaments, players..."
						class="w-full px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
					/>
					<button
						on:click={handleSearch}
						class="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
						title="Search"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</button>
				</div>
			</div>
			
			<!-- Desktop Navigation Links -->
			<div class="hidden md:flex items-center gap-4">
				<a href="/tournaments" class="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors whitespace-nowrap">
					Tournaments
				</a>
				<a href="/players" class="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors whitespace-nowrap">
					Players
				</a>
				<a href="/dashboard" class="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors whitespace-nowrap">
					Dashboard
				</a>
				
				<!-- Theme Toggle -->
				<button
					on:click={() => theme.toggle()}
					class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
				
				{#if !loadingAuth}
					{#if user}
						<!-- Profile Icon for Logged In Users -->
						<a 
							href="/dashboard"
							class="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
							title="Dashboard"
						>
							<div class="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
								{userProfile?.display_name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'U'}
							</div>
						</a>
					{:else}
						<a 
							href="/login"
							class="btn-primary text-sm py-1.5 px-3 whitespace-nowrap"
						>
							Sign In
						</a>
					{/if}
				{/if}
			</div>
			
			<!-- Mobile Actions -->
			<div class="flex items-center gap-1 md:hidden">
				<!-- Mobile Search Toggle -->
				<button
					on:click={toggleMobileSearch}
					class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
					aria-label="Search"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</button>
				
				<!-- Theme Toggle Mobile -->
				<button
					on:click={() => theme.toggle()}
					class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
				
				<!-- Hamburger Menu -->
				<button
					on:click={toggleMobileMenu}
					class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
					aria-label="Menu"
				>
					{#if mobileMenuOpen}
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{:else}
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					{/if}
				</button>
			</div>
		</div>
		
		<!-- Mobile Search Bar -->
		{#if mobileSearchOpen}
			<div class="md:hidden py-3 border-t border-gray-200 dark:border-gray-700">
				<div class="relative">
					<input
						type="text"
						bind:value={searchQuery}
						on:keydown={handleKeydown}
						placeholder="Search tournaments, players..."
						class="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
						autofocus
					/>
					<button
						on:click={handleSearch}
						class="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
						title="Search"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</button>
				</div>
			</div>
		{/if}
		
		<!-- Mobile Menu -->
		{#if mobileMenuOpen}
			<div class="md:hidden py-3 border-t border-gray-200 dark:border-gray-700">
				<div class="flex flex-col gap-1">
					<a 
						href="/tournaments" 
						on:click={closeMobileMenu}
						class="px-3 py-2.5 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium rounded-lg transition-colors"
					>
						Tournaments
					</a>
					<a 
						href="/players" 
						on:click={closeMobileMenu}
						class="px-3 py-2.5 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium rounded-lg transition-colors"
					>
						Players
					</a>
					<a 
						href="/news" 
						on:click={closeMobileMenu}
						class="px-3 py-2.5 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium rounded-lg transition-colors"
					>
						News
					</a>
					<a 
						href="/fantasy" 
						on:click={closeMobileMenu}
						class="px-3 py-2.5 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium rounded-lg transition-colors"
					>
						Fantasy
					</a>
					<a 
						href="/dashboard" 
						on:click={closeMobileMenu}
						class="px-3 py-2.5 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium rounded-lg transition-colors"
					>
						Dashboard
					</a>
					<div class="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700">
						{#if !loadingAuth}
							{#if user}
								<a 
									href="/dashboard" 
									on:click={closeMobileMenu}
									class="flex items-center gap-3 px-3 py-2.5 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium rounded-lg transition-colors"
								>
									<div class="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
										{userProfile?.display_name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'U'}
									</div>
									<span>Dashboard</span>
								</a>
							{:else}
								<a 
									href="/login" 
									on:click={closeMobileMenu}
									class="block px-3 py-2.5 text-base text-white bg-red-600 hover:bg-red-700 font-bold rounded-lg text-center transition-colors"
								>
									Sign In
								</a>
							{/if}
						{/if}
					</div>
				</div>
			</div>
		{/if}
	</div>
</nav>
