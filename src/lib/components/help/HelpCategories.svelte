<script>
	import { categories } from '$lib/data/helpData.js';
	
	export let activeCategory;
</script>

<!-- Categories Navigation with Enhanced Design -->
<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-8 sm:p-10 mb-8 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
	<div class="mb-6">
		<h2 class="headline-small text-gray-900 dark:text-white mb-2">Browse by Category</h2>
		<p class="text-base text-gray-600 dark:text-gray-400 font-medium">Select a category to view related questions</p>
	</div>
	<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
		{#each categories as category}
			<button
				on:click={() => activeCategory = category.id}
				class="group relative px-6 py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-sm sm:text-base {
					activeCategory === category.id
						? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-105 font-bold'
						: 'bg-gray-100 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md hover:scale-105 border border-transparent hover:border-gray-300 dark:hover:border-gray-600'
				}"
			>
				<span class="text-xl sm:text-2xl transform transition-transform duration-300 {activeCategory === category.id ? 'scale-110' : 'group-hover:scale-110'}">
					{category.icon}
				</span>
				<span class="relative z-10">{category.label}</span>
				{#if activeCategory === category.id}
					<div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"></div>
				{/if}
			</button>
		{/each}
	</div>
</div>

