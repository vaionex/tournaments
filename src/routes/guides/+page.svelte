<script lang="ts">
	import { goto } from '$app/navigation';
	
	// All 14 sports with their data
	const sports = [
		{
			code: 'nfl',
			name: 'NFL',
			title: 'NFL - America\'s Premier Football League',
			icon: '🏈',
			description: 'Comprehensive guide to NFL tournaments, teams, players, and season structure.',
			image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=200&fit=crop'
		},
		{
			code: 'nba',
			name: 'NBA',
			title: 'NBA - Basketball Excellence at the Highest Level',
			icon: '🏀',
			description: 'Everything about NBA competition, championships, and the world\'s best basketball players.',
			image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=200&fit=crop'
		},
		{
			code: 'mlb',
			name: 'MLB',
			title: 'MLB - America\'s Pastime and Baseball Tradition',
			icon: '⚾',
			description: 'Complete guide to Major League Baseball, World Series, and baseball tournaments.',
			image: 'https://images.unsplash.com/photo-1566577739112-5180d4f9390a?w=400&h=200&fit=crop'
		},
		{
			code: 'nhl',
			name: 'NHL',
			title: 'NHL - Hockey\'s Speed, Skill, and Intensity',
			icon: '🏒',
			description: 'Discover NHL playoffs, Stanley Cup, and professional hockey competition.',
			image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop'
		},
		{
			code: 'soccer',
			name: 'Soccer',
			title: 'Soccer - The World\'s Most Beautiful Game',
			icon: '⚽',
			description: 'Global football tournaments, World Cup, league competitions, and top players.',
			image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=200&fit=crop'
		},
		{
			code: 'tennis',
			name: 'Tennis',
			title: 'Tennis - Individual Excellence and Grand Slam Glory',
			icon: '🎾',
			description: 'Grand Slam tournaments, ATP, WTA tours, and tennis championship guides.',
			image: 'https://images.unsplash.com/photo-1622163642998-8ea1c757b33e?w=400&h=200&fit=crop'
		},
		{
			code: 'golf',
			name: 'Golf',
			title: 'Golf - Precision, Strategy, and Championship Excellence',
			icon: '⛳',
			description: 'Major championships, PGA Tour, golf tournaments, and professional competition.',
			image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&h=200&fit=crop'
		},
		{
			code: 'mma',
			name: 'MMA/UFC',
			title: 'MMA/UFC - Mixed Martial Arts Combat Excellence',
			icon: '🥊',
			description: 'Ultimate Fighting Championship, MMA tournaments, and combat sports competition.',
			image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=200&fit=crop'
		},
		{
			code: 'boxing',
			name: 'Boxing',
			title: 'Boxing - The Sweet Science and Championship Glory',
			icon: '🥊',
			description: 'Professional boxing championships, weight divisions, and title fights.',
			image: 'https://images.unsplash.com/photo-1544717684-6ee3adf39d44?w=400&h=200&fit=crop'
		},
		{
			code: 'racing',
			name: 'Racing',
			title: 'Racing - Speed, Technology, and Motorsport Excellence',
			icon: '🏎️',
			description: 'Formula 1, NASCAR, IndyCar, and motorsport championship guides.',
			image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop'
		},
		{
			code: 'olympics',
			name: 'Olympics',
			title: 'Olympics - Global Athletic Excellence and Unity',
			icon: '🏅',
			description: 'Olympic Games, Paralympic competition, and international sporting events.',
			image: 'https://images.unsplash.com/photo-1578325716991-70ee0b71e9f9?w=400&h=200&fit=crop'
		},
		{
			code: 'esports',
			name: 'Esports',
			title: 'Esports - Competitive Gaming and Digital Athletics',
			icon: '🎮',
			description: 'Professional gaming tournaments, esports leagues, and competitive gaming.',
			image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop'
		},
		{
			code: 'cricket',
			name: 'Cricket',
			title: 'Cricket - Tradition, Strategy, and Global Passion',
			icon: '🏏',
			description: 'Cricket World Cup, Test matches, T20 leagues, and international cricket.',
			image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=200&fit=crop'
		},
		{
			code: 'rugby',
			name: 'Rugby',
			title: 'Rugby - Power, Passion, and Global Competition',
			icon: '🏉',
			description: 'Rugby World Cup, Six Nations, rugby league, and international rugby union.',
			image: 'https://images.unsplash.com/photo-1594736797933-d0b22eb48b1d?w=400&h=200&fit=crop'
		}
	];
	
	// Additional guide categories
	const otherGuides = [
		{
			title: 'How to Watch',
			description: 'Complete guides on how to watch your favorite sports and tournaments.',
			href: '/how-to-watch',
			icon: '📺'
		},
		{
			title: 'Athletes Directory',
			description: 'Comprehensive directory of professional athletes across all sports.',
			href: '/athletes',
			icon: '👤'
		},
		{
			title: 'What\'s On Today',
			description: 'Live tournaments, matches, and sporting events happening now.',
			href: '/whats-on',
			icon: '📅'
		},
		{
			title: 'Tournament History',
			description: 'Historical data and results from major sporting tournaments.',
			href: '/history',
			icon: '📚'
		}
	];
	
	function navigateToSportGuide(sportCode: string) {
		goto(`/${sportCode}/guide`);
	}
</script>

<svelte:head>
	<title>Sports Tournament Guides | Tournaments.com</title>
	<meta name="description" content="Comprehensive guides to all major sports tournaments, championships, and competitions. Learn about athletes, rules, history, and how tournaments work.">
	<meta name="keywords" content="sports guides, tournament guides, sports rules, championships, competitions, athletes">
	
	<!-- Structured Data -->
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "WebPage",
			"name": "Sports Tournament Guides",
			"description": "Comprehensive guides to all major sports tournaments and competitions",
			"url": "https://tournaments.com/guides",
			"mainEntity": {
				"@type": "ItemList",
				"numberOfItems": sports.length,
				"itemListElement": sports.map((sport, index) => ({
					"@type": "ListItem",
					"position": index + 1,
					"item": {
						"@type": "WebPage",
						"name": `${sport.name} Tournament Guide`,
						"description": sport.description,
						"url": `https://tournaments.com/${sport.code}/guide`
					}
				}))
			}
		})}
	</script>
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
	<div class="absolute inset-0 bg-black/20"></div>
	<div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 max-w-7xl">
		<div class="text-center max-w-4xl mx-auto">
			<nav class="mb-6">
				<ol class="flex items-center justify-center space-x-2 text-sm text-red-200">
					<li><a href="/" class="hover:text-white">Home</a></li>
					<li><span>›</span></li>
					<li class="text-white">Guides</li>
				</ol>
			</nav>
			
			<h1 class="text-4xl lg:text-6xl font-black mb-6 leading-tight">
				Sports Tournament <br>
				<span class="text-yellow-300">Guides</span>
			</h1>
			
			<p class="text-xl lg:text-2xl text-red-100 mb-8 leading-relaxed max-w-3xl mx-auto">
				Complete guides to every major sport, tournament format, championship history, 
				and the athletes who make it all possible.
			</p>
			
			<div class="flex flex-wrap gap-4 justify-center">
				<a 
					href="/athletes" 
					class="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
				>
					Browse Athletes
				</a>
				<a 
					href="/whats-on" 
					class="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
				>
					What's On Today
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Quick Stats -->
<section class="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
			<div class="text-center">
				<div class="text-3xl lg:text-4xl font-black text-red-600 dark:text-red-500">
					{sports.length}
				</div>
				<div class="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">Sports Covered</div>
			</div>
			<div class="text-center">
				<div class="text-3xl lg:text-4xl font-black text-red-600 dark:text-red-500">
					100+
				</div>
				<div class="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">Tournament Formats</div>
			</div>
			<div class="text-center">
				<div class="text-3xl lg:text-4xl font-black text-red-600 dark:text-red-500">
					1000+
				</div>
				<div class="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">Professional Athletes</div>
			</div>
			<div class="text-center">
				<div class="text-3xl lg:text-4xl font-black text-red-600 dark:text-red-500">
					24/7
				</div>
				<div class="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">Tournament Coverage</div>
			</div>
		</div>
	</div>
</section>

<!-- Main Content -->
<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
	
	<!-- Sports Guides Grid -->
	<section class="mb-16">
		<div class="text-center mb-12">
			<h2 class="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-4">
				Complete Sport Guides
			</h2>
			<p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
				Deep-dive into every major sport with comprehensive tournament guides, 
				athlete profiles, and competition formats.
			</p>
		</div>
		
		<div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{#each sports as sport}
				<button
					on:click={() => navigateToSportGuide(sport.code)}
					class="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
				>
					<div class="relative h-32 overflow-hidden">
						<img 
							src={sport.image} 
							alt={sport.name}
							class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
							loading="lazy"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
						<div class="absolute top-3 right-3 text-2xl">
							{sport.icon}
						</div>
					</div>
					
					<div class="p-6">
						<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
							{sport.name}
						</h3>
						<p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
							{sport.description}
						</p>
						<div class="flex items-center text-red-600 dark:text-red-500 font-semibold text-sm">
							Read Guide
							<svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
							</svg>
						</div>
					</div>
				</button>
			{/each}
		</div>
	</section>

	<!-- Other Guides Section -->
	<section>
		<div class="text-center mb-12">
			<h2 class="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-4">
				Additional Resources
			</h2>
			<p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
				Explore more ways to discover tournaments, athletes, and sporting events.
			</p>
		</div>
		
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each otherGuides as guide}
				<a
					href={guide.href}
					class="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
				>
					<div class="text-4xl mb-4">{guide.icon}</div>
					<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
						{guide.title}
					</h3>
					<p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
						{guide.description}
					</p>
					<div class="flex items-center text-red-600 dark:text-red-500 font-semibold text-sm">
						Explore
						<svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
						</svg>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Call to Action -->
	<section class="mt-16">
		<div class="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 lg:p-12 text-center text-white">
			<h2 class="text-3xl lg:text-4xl font-black mb-4">
				Start Your Journey
			</h2>
			<p class="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
				Whether you're a fan, athlete, or organizer, find everything you need to 
				understand and participate in competitive sports.
			</p>
			<div class="flex flex-wrap gap-4 justify-center">
				<a 
					href="/tournaments" 
					class="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
				>
					Browse Tournaments
				</a>
				<a 
					href="/athletes" 
					class="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
				>
					Discover Athletes
				</a>
			</div>
		</div>
	</section>
</div>