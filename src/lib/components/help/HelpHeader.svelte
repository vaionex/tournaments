<script>
	export let searchQuery;
</script>

<!-- Header Section with Enhanced Gradient -->
<div class="relative overflow-hidden !bg-gradient-to-br !from-blue-600 !via-blue-700 !to-indigo-800 dark:!from-blue-800 dark:!via-blue-900 dark:!to-indigo-900" style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #3730a3 100%);">
	<!-- Animated background elements -->
	<div class="absolute inset-0 overflow-hidden">
		<div class="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
		<div class="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
	</div>
	
	<div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 max-w-7xl">
		<div class="text-center max-w-4xl mx-auto">
			<!-- Icon with enhanced animation -->
			<div class="inline-flex items-center justify-center w-24 h-24 bg-white/15 backdrop-blur-md rounded-3xl mb-8 shadow-2xl transform hover:scale-110 transition-transform duration-300 border border-white/20">
				<svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			
			<h1 class="headline-hero text-white mb-6 drop-shadow-lg">
				Help Center
			</h1>
			<p class="text-xl sm:text-2xl text-white/95 max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
				Find instant answers to your questions or get in touch with our support team
			</p>

			<!-- Enhanced Search Bar with better styling -->
			<div class="max-w-2xl mx-auto">
				<div class="relative group">
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Search for help, questions, or topics..."
						class="w-full px-6 py-5 pl-16 pr-14 bg-white dark:bg-gray-900 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-white/30 focus:outline-none transition-all duration-300 shadow-2xl hover:shadow-2xl hover:scale-[1.02] transform hover:-translate-y-0.5 text-lg"
					/>
					<svg class="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
					{#if searchQuery}
						<button
							on:click={() => searchQuery = ''}
							class="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
							aria-label="Clear search"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					{/if}
				</div>
				<p class="text-white/80 text-sm mt-4 font-medium">
					Type to search across all help articles and FAQs
				</p>
			</div>
		</div>
	</div>
</div>

