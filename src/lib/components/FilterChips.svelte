<script>
	export let filters = [];
	export let selectedFilters = [];
	export let onToggle = null;
	
	function toggleFilter(filter) {
		if (onToggle) {
			onToggle(filter);
		}
	}
</script>

<div class="flex flex-wrap gap-3">
	{#each filters as filter}
		<button
			on:click={() => toggleFilter(filter)}
			class="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 {
				selectedFilters.includes(filter.value)
					? 'bg-blue-600 text-white border-2 border-blue-500'
					: 'bg-white/10 backdrop-blur-md text-gray-300 border-2 border-white/20 hover:border-white/40 hover:bg-white/15'
			}"
		>
			{filter.label}
		</button>
	{/each}
</div>

