<script>
	import { categories } from '$lib/data/helpData.js';
	
	export let filteredFAQs;
	export let activeCategory;
	export let searchQuery;
</script>

<!-- FAQ Content with Enhanced Design -->
<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-8 sm:p-10 lg:p-12 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
	<div class="mb-10 pb-8 border-b-2 border-gray-200/60 dark:border-gray-700/60">
		<h2 class="headline-medium text-gray-900 dark:text-white mb-3">
			{categories.find(c => c.id === activeCategory)?.label || 'Help'} Questions
		</h2>
		<div class="flex items-center gap-3">
			<div class="h-1 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
			<p class="text-gray-600 dark:text-gray-400 font-medium text-base">
				{filteredFAQs.length} {filteredFAQs.length === 1 ? 'article' : 'articles'} available
			</p>
		</div>
	</div>

	{#if filteredFAQs.length === 0}
		<div class="text-center py-16 sm:py-20">
			<div class="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg transform hover:scale-110 transition-transform duration-300">
				<svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			</div>
			<h3 class="headline-small text-gray-900 dark:text-white mb-4">
				No results found
			</h3>
			<p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto text-lg leading-relaxed">
				We couldn't find any questions matching your search. Try different keywords or browse categories.
			</p>
			<button
				on:click={() => { searchQuery = ''; activeCategory = 'general'; }}
				class="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-base"
			>
				View All Questions
			</button>
		</div>
	{:else}
		<div class="space-y-6 sm:space-y-8">
			{#each filteredFAQs as faq, index}
				<article class="group relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800/50 rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-200/60 dark:border-gray-700/60 hover:border-blue-300 dark:hover:border-blue-700/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
					<div class="flex items-start gap-5 sm:gap-6">
						<div class="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
							<span class="text-white font-black text-base sm:text-lg">{index + 1}</span>
						</div>
						<div class="flex-1 min-w-0">
							<h3 class="headline-small text-gray-900 dark:text-white mb-5 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
								{faq.question}
							</h3>
							<div class="prose prose-lg dark:prose-invert max-w-none">
								<p class="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg font-medium">
									{faq.answer}
								</p>
							</div>
						</div>
					</div>
					<!-- Decorative corner accent -->
					<div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-3xl pointer-events-none"></div>
				</article>
			{/each}
		</div>
	{/if}
</div>

