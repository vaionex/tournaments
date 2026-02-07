<script lang="ts">
	const sports = [
		{ 
			name: "American Football", 
			slug: "nfl", 
			icon: "🏈", 
			description: "America's most popular sport featuring the NFL and college football",
			leagues: ["NFL", "NCAA Football"]
		},
		{ 
			name: "Basketball", 
			slug: "nba", 
			icon: "🏀", 
			description: "Fast-paced action from the NBA, WNBA, and college basketball",
			leagues: ["NBA", "WNBA", "NCAA Basketball"]
		},
		{ 
			name: "Soccer", 
			slug: "soccer", 
			icon: "⚽", 
			description: "The world's most popular sport with leagues on every continent",
			leagues: ["Premier League", "MLS", "La Liga", "Champions League"]
		},
		{ 
			name: "Baseball", 
			slug: "mlb", 
			icon: "⚾", 
			description: "America's pastime featuring Major League Baseball",
			leagues: ["MLB", "Minor League Baseball"]
		},
		{ 
			name: "Ice Hockey", 
			slug: "nhl", 
			icon: "🏒", 
			description: "High-speed action from the NHL and international competition",
			leagues: ["NHL", "IIHF", "NCAA Hockey"]
		},
		{ 
			name: "Tennis", 
			slug: "tennis", 
			icon: "🎾", 
			description: "Individual excellence showcased in Grand Slams and ATP/WTA tours",
			leagues: ["ATP Tour", "WTA Tour", "Grand Slams"]
		},
		{ 
			name: "Golf", 
			slug: "golf", 
			icon: "⛳", 
			description: "Precision and strategy in professional tours worldwide",
			leagues: ["PGA Tour", "European Tour", "Major Championships"]
		},
		{ 
			name: "Mixed Martial Arts", 
			slug: "mma", 
			icon: "🥊", 
			description: "Ultimate combat sport combining multiple fighting disciplines",
			leagues: ["UFC", "Bellator", "ONE Championship"]
		},
		{ 
			name: "Boxing", 
			slug: "boxing", 
			icon: "🥊", 
			description: "The sweet science of professional boxing",
			leagues: ["Professional Boxing", "Olympic Boxing"]
		},
		{ 
			name: "Motorsports", 
			slug: "racing", 
			icon: "🏎️", 
			description: "High-speed competition from Formula 1 to NASCAR",
			leagues: ["Formula 1", "NASCAR", "IndyCar"]
		},
		{ 
			name: "Olympics", 
			slug: "olympics", 
			icon: "🏅", 
			description: "The pinnacle of international multi-sport competition",
			leagues: ["Summer Olympics", "Winter Olympics", "Paralympics"]
		},
		{ 
			name: "Esports", 
			slug: "esports", 
			icon: "🎮", 
			description: "Competitive video gaming across multiple titles and genres",
			leagues: ["League of Legends", "CS2", "Dota 2", "Valorant"]
		},
		{ 
			name: "Cricket", 
			slug: "cricket", 
			icon: "🏏", 
			description: "Traditional sport popular in Commonwealth nations",
			leagues: ["ICC", "IPL", "County Cricket"]
		},
		{ 
			name: "Rugby", 
			slug: "rugby", 
			icon: "🏉", 
			description: "Physical team sport with international appeal",
			leagues: ["Rugby World Cup", "Six Nations", "Rugby League"]
		}
	];
</script>

<svelte:head>
	<title>Sports Guide - Learn About Every Sport | Tournaments.com</title>
	<meta name="description" content="Comprehensive guides to every major sport including history, rules, leagues, famous players, and current standings. Your complete sports education resource." />
</svelte:head>

<div class="min-h-screen bg-white dark:bg-gray-900">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
		<!-- Header -->
		<header class="text-center mb-16">
			<h1 class="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-tight mb-6">
				Sports Guide
			</h1>
			<p class="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
				Discover the history, rules, leagues, and legends of every major sport. From traditional favorites 
				to emerging competitions, learn everything you need to know about the sports you love.
			</p>
		</header>

		<!-- Sports Grid -->
		<div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
			{#each sports as sport}
				<a 
					href="/sports/{sport.slug}"
					class="group bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
				>
					<div class="text-5xl mb-4">{sport.icon}</div>
					<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
						{sport.name}
					</h3>
					<p class="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
						{sport.description}
					</p>
					<div class="space-y-1">
						<div class="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wide font-semibold mb-2">
							Major Leagues
						</div>
						{#each sport.leagues.slice(0, 2) as league}
							<div class="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md inline-block mr-2 mb-1">
								{league}
							</div>
						{/each}
						{#if sport.leagues.length > 2}
							<div class="text-xs text-gray-500 dark:text-gray-400">
								+{sport.leagues.length - 2} more
							</div>
						{/if}
					</div>
					<div class="mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:underline">
						Learn More →
					</div>
				</a>
			{/each}
		</div>

		<!-- Features Section -->
		<section class="grid md:grid-cols-3 gap-8 mb-16">
			<div class="text-center">
				<div class="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
					<svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
					</svg>
				</div>
				<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Complete History</h3>
				<p class="text-gray-600 dark:text-gray-400 text-sm">
					Learn how each sport developed, from ancient origins to modern professional leagues.
				</p>
			</div>
			<div class="text-center">
				<div class="bg-green-100 dark:bg-green-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
					<svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
					</svg>
				</div>
				<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Rules & Scoring</h3>
				<p class="text-gray-600 dark:text-gray-400 text-sm">
					Understand how each sport works, from basic rules to advanced strategies and scoring systems.
				</p>
			</div>
			<div class="text-center">
				<div class="bg-purple-100 dark:bg-purple-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
					<svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
				</div>
				<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Famous Moments</h3>
				<p class="text-gray-600 dark:text-gray-400 text-sm">
					Relive the greatest moments, legendary performances, and historic achievements in each sport.
				</p>
			</div>
		</section>

		<!-- CTA Section -->
		<section class="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-12 text-center text-white">
			<h2 class="text-3xl font-black mb-4">Stay Updated on Every Sport</h2>
			<p class="text-red-100 mb-6 max-w-2xl mx-auto">
				Get the latest news, results, and analysis from all your favorite sports and discover new ones to follow.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a 
					href="/news" 
					class="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
				>
					Latest Sports News
				</a>
				<a 
					href="/tournaments" 
					class="bg-red-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-800 transition-colors border-2 border-red-500"
				>
					Browse Tournaments
				</a>
			</div>
		</section>
	</div>
</div>