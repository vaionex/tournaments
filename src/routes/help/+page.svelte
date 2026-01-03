<script>
	import { onMount } from 'svelte';
	import { faqs } from '$lib/data/helpData.js';
	import HelpHeader from '$lib/components/help/HelpHeader.svelte';
	import HelpCategories from '$lib/components/help/HelpCategories.svelte';
	import HelpFAQList from '$lib/components/help/HelpFAQList.svelte';
	import HelpCTA from '$lib/components/help/HelpCTA.svelte';
	
	let activeCategory = 'general';
	let searchQuery = '';
	
	$: filteredFAQs = (() => {
		const categoryFAQs = faqs[activeCategory] || [];
		if (!searchQuery.trim()) {
			return categoryFAQs;
		}
		const query = searchQuery.toLowerCase();
		return categoryFAQs.filter(faq => 
			faq.question.toLowerCase().includes(query) || 
			faq.answer.toLowerCase().includes(query)
		);
	})();
	
	onMount(() => {
		window.scrollTo(0, 0);
	});
</script>

<svelte:head>
	<title>Help Center - Tournaments.com</title>
	<meta name="description" content="Get help with Tournaments.com - Find answers to common questions about tournaments, accounts, fantasy sports, and more." />
</svelte:head>

<div class="bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
	<HelpHeader bind:searchQuery />

	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl space-y-10 sm:space-y-12">
		<div class="max-w-5xl mx-auto">
			<HelpCategories bind:activeCategory />
		</div>

		<div class="max-w-5xl mx-auto">
			<HelpFAQList {filteredFAQs} {activeCategory} bind:searchQuery />
		</div>

		<div class="max-w-5xl mx-auto">
			<HelpCTA />
		</div>
	</div>
</div>

