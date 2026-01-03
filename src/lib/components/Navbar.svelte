<script>
	import { goto } from '$app/navigation';
	import { theme } from '$lib/stores/theme';
	
	let searchQuery = '';
	
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
</script>

<nav class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-[88px] z-20">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
		<div class="flex items-center justify-between h-12 gap-4">
			<!-- Logo -->
			<a href="/" class="whitespace-nowrap">
				<div class="relative inline-block">
					<div class="bg-red-600 dark:bg-red-600 px-3 py-1.5 transform -skew-x-12 shadow-md">
						<span class="text-xl font-black text-white inline-block transform skew-x-12 tracking-tight" style="letter-spacing: -0.02em; font-style: italic;">
							Tournaments
						</span>
					</div>
				</div>
			</a>
			
			<!-- Search Bar (IMDB style) -->
			<div class="flex-1 max-w-2xl">
				<div class="relative">
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
			
			<!-- Navigation Links -->
			<div class="flex items-center gap-4">
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
							<!-- Sun icon for light mode -->
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
							</svg>
						{:else}
							<!-- Moon icon for dark mode -->
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
							</svg>
						{/if}
					{/key}
				</button>
				
				<button class="btn-primary text-sm py-1.5 px-3 whitespace-nowrap">
					Sign In
				</button>
			</div>
		</div>
	</div>
</nav>

