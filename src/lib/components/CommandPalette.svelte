<script>
	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();
	
	let searchQuery = '';
	let isFocused = false;
	
	/** @type {((query: string) => void) | null} */
	export let onSearch = null;
	
	function handleSubmit() {
		const query = searchQuery.trim();
		if (query) {
			if (onSearch) {
				onSearch(query);
			} else {
				dispatch('search', query);
			}
		}
	}
	
	/** @param {KeyboardEvent} event */
	function handleKeydown(event) {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	}
</script>

<div class="w-full max-w-4xl mx-auto">
	<div class="relative">
		<div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
			</svg>
		</div>
		<input
			type="text"
			bind:value={searchQuery}
			on:keydown={handleKeydown}
			on:focus={() => isFocused = true}
			on:blur={() => setTimeout(() => isFocused = false, 200)}
			placeholder="Try: 'Tennis in New York this weekend' or 'Free Golf tournaments'"
			class="w-full pl-14 pr-6 py-5 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 text-lg font-medium"
		/>
		{#if isFocused}
			<div class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
				Press <kbd class="px-2 py-1 bg-white/10 rounded">Enter</kbd> to search
			</div>
		{/if}
	</div>
</div>

