<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	
	export let value: string = '';
	export let options: string[];
	export let placeholder: string = 'Select...';
	export let allLabel: string = 'All';
	
	const dispatch = createEventDispatcher<{ change: string }>();
	
	function handleChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		dispatch('change', target.value);
	}
</script>

<select 
	{value}
	on:change={handleChange}
	class="filter-select"
>
	<option value="">{allLabel}</option>
	{#each options as option}
		<option value={option}>{option}</option>
	{/each}
</select>

