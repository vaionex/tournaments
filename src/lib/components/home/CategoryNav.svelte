<script lang="ts">
	import type { NewsCategory } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	
	export let categories: NewsCategory[];
	export let selectedCategory: NewsCategory = 'All';
	
	const dispatch = createEventDispatcher<{ select: NewsCategory }>();
	
	function handleSelect(category: NewsCategory) {
		dispatch('select', category);
	}
</script>

<div class="mb-8 border-b-2 border-gray-200 dark:border-gray-700">
	<div class="flex gap-1 pb-4 overflow-hidden">
		{#each categories as category}
			<button
				on:click={() => handleSelect(category)}
				class="px-3 py-2.5 text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 border-b-4 flex-shrink-0 {
					selectedCategory === category
						? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
						: 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-gray-200'
				}"
			>
				{category}
			</button>
		{/each}
	</div>
</div>

