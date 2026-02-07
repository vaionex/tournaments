<script lang="ts">
	const guideCategories = [
		{
			title: "How to Watch",
			description: "Complete viewing guides for major sporting events",
			icon: "📺",
			guides: [
				{ name: "Super Bowl", slug: "super-bowl", type: "NFL Championship" },
				{ name: "NBA Finals", slug: "nba-finals", type: "Basketball Championship" },
				{ name: "World Series", slug: "world-series", type: "MLB Championship" },
				{ name: "March Madness", slug: "march-madness", type: "NCAA Basketball" },
				{ name: "Wimbledon", slug: "wimbledon", type: "Tennis Grand Slam" },
				{ name: "FIFA World Cup", slug: "fifa-world-cup", type: "International Soccer" },
				{ name: "Olympics", slug: "olympics", type: "Multi-Sport Event" },
				{ name: "Formula 1", slug: "formula-1", type: "Motorsport Championship" }
			]
		}
	];
</script>

<svelte:head>
	<title>Sports Viewing Guides | Tournaments.com</title>
	<meta name="description" content="Complete guides for watching major sporting events, tournaments, and championships. Find TV channels, streaming options, and everything you need to know." />
</svelte:head>

<div class="min-h-screen bg-white dark:bg-gray-900">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
		<!-- Header -->
		<header class="text-center mb-16">
			<h1 class="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-tight mb-6">
				Sports Viewing Guides
			</h1>
			<p class="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
				Never miss a game again. Our comprehensive viewing guides cover every major sporting event, 
				from TV networks and streaming services to schedules and what you need to know.
			</p>
		</header>

		<!-- Guide Categories -->
		{#each guideCategories as category}
			<section class="mb-16">
				<div class="flex items-center gap-4 mb-8">
					<span class="text-4xl">{category.icon}</span>
					<div>
						<h2 class="text-3xl font-black text-gray-900 dark:text-white">{category.title}</h2>
						<p class="text-gray-600 dark:text-gray-400">{category.description}</p>
					</div>
				</div>

				<div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{#each category.guides as guide}
						<a 
							href="/guides/how-to-watch/{guide.slug}"
							class="group bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-red-400 dark:hover:border-red-500 transition-all duration-300 hover:shadow-lg"
						>
							<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
								{guide.name}
							</h3>
							<p class="text-gray-600 dark:text-gray-400 text-sm mb-4">{guide.type}</p>
							<div class="text-red-600 dark:text-red-400 text-sm font-medium group-hover:underline">
								View Guide →
							</div>
						</a>
					{/each}
				</div>
			</section>
		{/each}

		<!-- Coming Soon -->
		<section class="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-12 text-center border border-blue-200 dark:border-blue-800">
			<h2 class="text-3xl font-black text-blue-900 dark:text-blue-100 mb-4">More Guides Coming Soon</h2>
			<p class="text-blue-700 dark:text-blue-300 mb-6 max-w-2xl mx-auto">
				We're constantly adding new viewing guides for upcoming events, tournaments, and championships. 
				Check back regularly for the latest guides.
			</p>
			<a 
				href="/news" 
				class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
			>
				Get Updates →
			</a>
		</section>
	</div>
</div>