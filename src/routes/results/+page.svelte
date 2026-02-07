<script lang="ts">
	const recentResults = [
		{
			title: "Super Bowl LIX 2025",
			slug: "super-bowl-2025",
			date: "February 9, 2025",
			winner: "Kansas City Chiefs",
			score: "31-24",
			sport: "NFL",
			type: "Championship"
		},
		{
			title: "NBA Finals 2024",
			slug: "nba-finals-2024", 
			date: "June 17, 2024",
			winner: "Boston Celtics",
			score: "4-1 series",
			sport: "Basketball",
			type: "Championship"
		},
		{
			title: "Wimbledon 2024",
			slug: "wimbledon-2024",
			date: "July 14, 2024", 
			winner: "Carlos Alcaraz / Barbora Krejčíková",
			score: "Singles Champions",
			sport: "Tennis",
			type: "Grand Slam"
		}
	];

	const resultCategories = [
		{
			name: "NFL",
			icon: "🏈",
			results: ["Super Bowl 2025", "Super Bowl 2024", "NFL Playoffs 2024"]
		},
		{
			name: "NBA", 
			icon: "🏀",
			results: ["NBA Finals 2024", "NBA Finals 2023", "March Madness 2024"]
		},
		{
			name: "MLB",
			icon: "⚾",
			results: ["World Series 2024", "World Series 2023", "All-Star Game 2024"]
		},
		{
			name: "Tennis",
			icon: "🎾", 
			results: ["Wimbledon 2024", "US Open 2024", "French Open 2024"]
		},
		{
			name: "Soccer",
			icon: "⚽",
			results: ["Champions League 2024", "Premier League 2024", "FIFA World Cup 2022"]
		},
		{
			name: "Olympics",
			icon: "🏅",
			results: ["Paris 2024", "Tokyo 2020", "Medal Standings"]
		}
	];
</script>

<svelte:head>
	<title>Sports Results - Championship & Tournament Results | Tournaments.com</title>
	<meta name="description" content="Complete results from major sporting events, championships, and tournaments. Find scores, winners, and detailed analysis from every major sport." />
</svelte:head>

<div class="min-h-screen bg-white dark:bg-gray-900">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
		<!-- Header -->
		<header class="text-center mb-16">
			<h1 class="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-tight mb-6">
				Sports Results
			</h1>
			<p class="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
				Complete results and analysis from major sporting events, championships, and tournaments. 
				Get detailed coverage of winners, scores, and memorable moments.
			</p>
		</header>

		<!-- Recent Results -->
		<section class="mb-16">
			<h2 class="text-3xl font-black text-gray-900 dark:text-white mb-8">Latest Results</h2>
			<div class="grid lg:grid-cols-3 gap-8">
				{#each recentResults as result}
					<a 
						href="/results/{result.slug}"
						class="group bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-500 transition-all duration-300 hover:shadow-xl"
					>
						<div class="flex justify-between items-start mb-4">
							<span class="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded-lg text-sm font-bold">
								{result.type}
							</span>
							<span class="text-gray-500 dark:text-gray-400 text-sm">
								{result.date}
							</span>
						</div>
						
						<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
							{result.title}
						</h3>
						
						<div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-4">
							<div class="text-center">
								<div class="text-lg font-bold text-gray-900 dark:text-white mb-1">
									🏆 {result.winner}
								</div>
								<div class="text-green-600 dark:text-green-400 font-semibold">
									{result.score}
								</div>
							</div>
						</div>

						<div class="flex justify-between items-center">
							<span class="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
								{result.sport}
							</span>
							<span class="text-green-600 dark:text-green-400 text-sm font-medium group-hover:underline">
								View Details →
							</span>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<!-- Results by Sport -->
		<section class="mb-16">
			<h2 class="text-3xl font-black text-gray-900 dark:text-white mb-8">Browse by Sport</h2>
			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each resultCategories as category}
					<div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300">
						<div class="flex items-center gap-3 mb-4">
							<span class="text-3xl">{category.icon}</span>
							<h3 class="text-xl font-bold text-gray-900 dark:text-white">{category.name}</h3>
						</div>
						
						<div class="space-y-2">
							{#each category.results as result}
								<a 
									href="/results/{result.toLowerCase().replace(/\s+/g, '-')}"
									class="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1 text-sm"
								>
									• {result}
								</a>
							{/each}
						</div>
						
						<a 
							href="/sports/{category.name.toLowerCase()}"
							class="inline-block mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
						>
							View All {category.name} Results →
						</a>
					</div>
				{/each}
			</div>
		</section>

		<!-- Search & Filter -->
		<section class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-12 mb-16 border border-gray-200 dark:border-gray-700">
			<div class="max-w-4xl mx-auto text-center">
				<h2 class="text-3xl font-black text-gray-900 dark:text-white mb-6">Find Specific Results</h2>
				<p class="text-gray-600 dark:text-gray-400 mb-8">
					Search for results from specific events, years, or sports to find exactly what you're looking for.
				</p>
				
				<div class="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
					<input 
						type="text" 
						placeholder="Search events, teams, or years..."
						class="flex-1 px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<button class="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
						Search
					</button>
				</div>
				
				<div class="flex flex-wrap justify-center gap-2 mt-6">
					<span class="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-4 py-2 rounded-lg text-sm border border-gray-200 dark:border-gray-600">
						2024
					</span>
					<span class="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-4 py-2 rounded-lg text-sm border border-gray-200 dark:border-gray-600">
						Championship
					</span>
					<span class="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-4 py-2 rounded-lg text-sm border border-gray-200 dark:border-gray-600">
						Finals
					</span>
					<span class="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-4 py-2 rounded-lg text-sm border border-gray-200 dark:border-gray-600">
						Olympics
					</span>
				</div>
			</div>
		</section>

		<!-- Historical Highlights -->
		<section class="text-center">
			<h2 class="text-3xl font-black text-gray-900 dark:text-white mb-6">Historic Moments</h2>
			<p class="text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
				Relive the greatest moments in sports history with our comprehensive database of championship results and legendary performances.
			</p>
			
			<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
				<div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
					<div class="font-bold text-gray-900 dark:text-white mb-1">15,000+</div>
					<div class="text-gray-600 dark:text-gray-400">Event Results</div>
				</div>
				<div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
					<div class="font-bold text-gray-900 dark:text-white mb-1">50+ Years</div>
					<div class="text-gray-600 dark:text-gray-400">Sports History</div>
				</div>
				<div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
					<div class="font-bold text-gray-900 dark:text-white mb-1">100+ Sports</div>
					<div class="text-gray-600 dark:text-gray-400">Covered</div>
				</div>
				<div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
					<div class="font-bold text-gray-900 dark:text-white mb-1">Daily</div>
					<div class="text-gray-600 dark:text-gray-400">Updates</div>
				</div>
			</div>
		</section>
	</div>
</div>