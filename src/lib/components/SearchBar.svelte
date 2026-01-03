<script>
	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();
	
	let searchQuery = '';
	let gameQuery = '';
	let locationQuery = '';
	let dateQuery = '';
	
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

<div class="w-full">
	<div class="flex flex-col md:flex-row gap-4">
		<!-- Main Search -->
		<div class="flex-1 relative">
			<input
				type="text"
				bind:value={searchQuery}
				on:keydown={handleKeydown}
				placeholder="Search tournaments, players, or news..."
				class="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
			/>
		</div>
		
		<!-- Game Filter -->
		<select
			bind:value={gameQuery}
			class="px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400"
		>
			<option value="">All Sports & Games</option>
			<optgroup label="Traditional Sports">
				<option value="Tennis">Tennis</option>
				<option value="Golf">Golf</option>
				<option value="Football">Football (Soccer)</option>
				<option value="Basketball">Basketball</option>
				<option value="Baseball">Baseball</option>
				<option value="Volleyball">Volleyball</option>
				<option value="Table Tennis">Table Tennis</option>
			</optgroup>
			<optgroup label="Esports">
				<option value="League of Legends">League of Legends</option>
				<option value="Chess">Chess</option>
				<option value="Fortnite">Fortnite</option>
				<option value="Valorant">Valorant</option>
				<option value="CS:GO">CS:GO</option>
				<option value="Rocket League">Rocket League</option>
			</optgroup>
		</select>
		
		<!-- Location Filter -->
		<select
			bind:value={locationQuery}
			class="px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400"
		>
			<option value="">All Locations</option>
			<option value="Online">Online</option>
			<option value="New York">New York</option>
			<option value="Los Angeles">Los Angeles</option>
			<option value="Chicago">Chicago</option>
			<option value="London">London</option>
		</select>
		
		<!-- Search Button -->
		<button
			on:click={handleSubmit}
			class="btn-primary px-8 whitespace-nowrap"
		>
			Search
		</button>
	</div>
</div>

