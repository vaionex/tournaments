<script>
	import '../app.css';
	import ResultsTicker from '$lib/components/ResultsTicker.svelte';
	import SportsLeagueBar from '$lib/components/SportsLeagueBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	
	onMount(() => {
		theme.init();
	});
</script>

<div class="min-h-screen flex flex-col">
	<ResultsTicker />
	<SportsLeagueBar />
	
	<main class="flex-1">
		<slot />
	</main>
	
	<Footer />
</div>
