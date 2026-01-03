<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	
	export let currentPage: number;
	export let totalPages: number;
	export let maxVisiblePages: number = 7;
	
	const dispatch = createEventDispatcher<{ pageChange: number }>();
	
	function goToPage(page: number) {
		if (page >= 1 && page <= totalPages && page !== currentPage) {
			dispatch('pageChange', page);
		}
	}
	
	$: visiblePages = (() => {
		const pages: number[] = [];
		const half = Math.floor(maxVisiblePages / 2);
		
		let start = currentPage - half;
		let end = currentPage + half;
		
		if (start < 1) {
			start = 1;
			end = Math.min(maxVisiblePages, totalPages);
		}
		
		if (end > totalPages) {
			end = totalPages;
			start = Math.max(1, totalPages - maxVisiblePages + 1);
		}
		
		for (let i = start; i <= end; i++) {
			pages.push(i);
		}
		
		return pages;
	})();
</script>

{#if totalPages > 1}
	<div class="flex justify-center items-center gap-2 mt-8">
		<button
			on:click={() => goToPage(currentPage - 1)}
			disabled={currentPage === 1}
			class="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md transition-all duration-200 font-medium"
		>
			Previous
		</button>
		
		<div class="flex gap-2">
			{#each visiblePages as pageNum}
				<button
					on:click={() => goToPage(pageNum)}
					class="px-4 py-2.5 rounded-lg transition-all duration-200 font-medium min-w-[44px] {
						currentPage === pageNum 
							? 'bg-blue-600 text-white shadow-md hover:bg-blue-700' 
							: 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md'
					}"
				>
					{pageNum}
				</button>
			{/each}
		</div>
		
		<button
			on:click={() => goToPage(currentPage + 1)}
			disabled={currentPage === totalPages}
			class="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md transition-all duration-200 font-medium"
		>
			Next
		</button>
	</div>
{/if}

