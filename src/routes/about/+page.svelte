<script>
	import { onMount } from 'svelte';
	
	onMount(() => {
		window.scrollTo(0, 0);
	});
	
	const stats = [
		{ value: '10,000+', label: 'Tournaments Listed' },
		{ value: '500K+', label: 'Active Users' },
		{ value: '50+', label: 'Sports & Games' },
		{ value: '24/7', label: 'Support Available' }
	];
	
	const values = [
		{
			icon: '🎯',
			title: 'Transparency',
			description: 'We believe in providing clear, accurate information about tournaments and maintaining open communication with our community.'
		},
		{
			icon: '🤝',
			title: 'Community First',
			description: 'Our users are at the heart of everything we do. We build features and services that serve the competitive sports community.'
		},
		{
			icon: '🚀',
			title: 'Innovation',
			description: 'We continuously improve our platform with new features, better data, and enhanced user experiences.'
		},
		{
			icon: '✨',
			title: 'Accessibility',
			description: 'We make tournament information accessible to everyone, regardless of skill level or background.'
		}
	];
	
	const features = [
		{
			icon: '🏆',
			title: 'Comprehensive Tournament Database',
			description: 'Access thousands of tournaments across multiple sports and games, all in one place.'
		},
		{
			icon: '📊',
			title: 'Real-Time Updates',
			description: 'Stay informed with live tournament results, standings, and schedule updates.'
		},
		{
			icon: '🎮',
			title: 'Fantasy Sports',
			description: 'Join free fantasy leagues and compete with friends based on real player performance.'
		},
		{
			icon: '👥',
			title: 'Player Profiles',
			description: 'Track your favorite players, view their tournament history, and follow their progress.'
		},
		{
			icon: '📰',
			title: 'Latest News',
			description: 'Get the latest tournament news, player spotlights, and community updates.'
		},
		{
			icon: '🔔',
			title: 'Personalized Alerts',
			description: 'Set up notifications for tournaments, players, and events you care about.'
		}
	];
</script>

<svelte:head>
	<title>About Us - Tournaments.com</title>
	<meta name="description" content="Learn about Tournaments.com - Your comprehensive platform for discovering tournaments, tracking players, and engaging with the competitive sports community." />
</svelte:head>

<div class="bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
	<!-- Hero Section -->
	<div class="relative overflow-hidden !bg-gradient-to-br !from-blue-600 !via-blue-700 !to-indigo-800 dark:!from-blue-800 dark:!via-blue-900 dark:!to-indigo-900" style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #3730a3 100%);">
		<!-- Animated background elements -->
		<div class="absolute inset-0 overflow-hidden">
			<div class="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
			<div class="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
		</div>
		
		<div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 max-w-7xl">
			<div class="text-center max-w-4xl mx-auto">
				<div class="inline-flex items-center justify-center w-24 h-24 bg-white/15 backdrop-blur-md rounded-3xl mb-8 shadow-2xl transform hover:scale-110 transition-transform duration-300 border border-white/20">
					<svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>
				
				<h1 class="headline-hero text-white mb-6 drop-shadow-lg">
					About Tournaments.com
				</h1>
				<p class="text-xl sm:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed font-medium">
					Your comprehensive platform for discovering tournaments, tracking players, and engaging with the competitive sports community.
				</p>
			</div>
		</div>
	</div>

	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl space-y-16 sm:space-y-20">
		<!-- Stats Section -->
		<div class="max-w-5xl mx-auto">
			<div class="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
				{#each stats as stat}
					<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-8 text-center transform hover:scale-105 transition-transform duration-300">
						<div class="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-600 dark:text-blue-400 mb-2">
							{stat.value}
						</div>
						<div class="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-semibold">
							{stat.label}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Mission Section -->
		<div class="max-w-5xl mx-auto">
			<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-8 sm:p-10 lg:p-12 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
				<div class="text-center mb-10">
					<h2 class="headline-medium text-gray-900 dark:text-white mb-4">
						Our Mission
					</h2>
					<div class="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-6"></div>
				</div>
				<p class="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-3xl mx-auto font-medium">
					At Tournaments.com, we're dedicated to making competitive sports and gaming more accessible and engaging. We aggregate tournament information from across the web, providing a single platform where players, fans, and organizers can discover, track, and participate in competitive events. Our goal is to connect the competitive sports community and help everyone find their next challenge.
				</p>
			</div>
		</div>

		<!-- What We Do Section -->
		<div class="max-w-5xl mx-auto">
			<div class="text-center mb-12">
				<h2 class="headline-medium text-gray-900 dark:text-white mb-4">
					What We Do
				</h2>
				<p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
					We provide a comprehensive platform that brings together everything you need for competitive sports and gaming.
				</p>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
				{#each features as feature}
					<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/80 dark:border-gray-700/80 p-6 sm:p-8 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
						<div class="text-4xl sm:text-5xl mb-4">{feature.icon}</div>
						<h3 class="headline-small text-gray-900 dark:text-white mb-3">
							{feature.title}
						</h3>
						<p class="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
							{feature.description}
						</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- Values Section -->
		<div class="max-w-5xl mx-auto">
			<div class="text-center mb-12">
				<h2 class="headline-medium text-gray-900 dark:text-white mb-4">
					Our Values
				</h2>
				<p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
					The principles that guide everything we do.
				</p>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
				{#each values as value}
					<div class="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800/50 rounded-2xl shadow-lg border border-gray-200/60 dark:border-gray-700/60 p-6 sm:p-8 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
						<div class="text-4xl sm:text-5xl mb-4">{value.icon}</div>
						<h3 class="headline-small text-gray-900 dark:text-white mb-3">
							{value.title}
						</h3>
						<p class="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
							{value.description}
						</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- How It Works Section -->
		<div class="max-w-5xl mx-auto">
			<div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 p-8 sm:p-10 lg:p-12 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
				<div class="text-center mb-10">
					<h2 class="headline-medium text-gray-900 dark:text-white mb-4">
						How It Works
					</h2>
					<div class="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-6"></div>
				</div>
				
				<div class="space-y-8">
					<div class="flex gap-6">
						<div class="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
							<span class="text-white font-black text-lg sm:text-xl">1</span>
						</div>
						<div class="flex-1">
							<h3 class="headline-small text-gray-900 dark:text-white mb-2">
								Discover Tournaments
							</h3>
							<p class="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
								Browse our comprehensive database of tournaments across multiple sports and games. Filter by date, location, prize pool, and more to find exactly what you're looking for.
							</p>
						</div>
					</div>
					
					<div class="flex gap-6">
						<div class="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
							<span class="text-white font-black text-lg sm:text-xl">2</span>
						</div>
						<div class="flex-1">
							<h3 class="headline-small text-gray-900 dark:text-white mb-2">
								Track & Follow
							</h3>
							<p class="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
								Create an account to save favorite tournaments, follow players, and set up personalized notifications. Stay updated on everything that matters to you.
							</p>
						</div>
					</div>
					
					<div class="flex gap-6">
						<div class="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
							<span class="text-white font-black text-lg sm:text-xl">3</span>
						</div>
						<div class="flex-1">
							<h3 class="headline-small text-gray-900 dark:text-white mb-2">
								Engage & Compete
							</h3>
							<p class="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
								Join fantasy sports leagues, participate in discussions, and connect with the competitive sports community. All features are completely free to use.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- CTA Section -->
		<div class="max-w-5xl mx-auto">
			<div class="relative overflow-hidden rounded-3xl shadow-2xl border border-gray-200/80 dark:border-gray-700/80">
				<!-- Gradient Background -->
				<div class="!bg-gradient-to-br !from-blue-600 !via-blue-700 !to-indigo-800 dark:!from-blue-800 dark:!via-blue-900 dark:!to-indigo-900 p-10 sm:p-14 lg:p-16" style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #3730a3 100%);">
					<!-- Animated background elements -->
					<div class="absolute inset-0 overflow-hidden rounded-3xl">
						<div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
						<div class="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
					</div>
					
					<div class="relative text-center max-w-3xl mx-auto">
						<h2 class="headline-large text-white mb-6 drop-shadow-lg">
							Join Our Community
						</h2>
						<p class="text-white/95 mb-10 leading-relaxed text-lg sm:text-xl font-medium max-w-2xl mx-auto">
							Start discovering tournaments, tracking players, and engaging with the competitive sports community today. It's completely free!
						</p>
						
						<div class="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center">
							<a
								href="/tournaments"
								class="group relative px-8 py-4 sm:px-10 sm:py-5 bg-white hover:bg-gray-50 text-blue-700 dark:text-blue-600 font-bold rounded-xl shadow-2xl hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center gap-3 transform hover:-translate-y-1 hover:scale-105 text-base sm:text-lg overflow-hidden"
							>
								<div class="absolute inset-0 bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								<span class="relative z-10">Browse Tournaments</span>
							</a>
							<a
								href="/contact"
								class="group px-8 py-4 sm:px-10 sm:py-5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold rounded-xl border-2 border-white/40 hover:border-white/60 transition-all duration-300 inline-flex items-center justify-center gap-3 transform hover:-translate-y-1 hover:scale-105 text-base sm:text-lg shadow-xl"
							>
								Contact Us
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

