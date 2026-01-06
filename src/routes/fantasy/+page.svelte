<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { format } from 'date-fns';
	
	let activeTab = 'leagues';
	let loading = true;
	let myLeagues = [];
	let publicLeagues = [];
	let featuredLeagues = [];
	let upcomingDrafts = [];
	let leaderboard = [];
	let showComingSoonModal = false;
	
	onMount(async () => {
		await new Promise(resolve => setTimeout(resolve, 500));
		
		// My Leagues
		myLeagues = [
			{
				id: '1',
				name: 'NFL Fantasy League 2025',
				sport: 'NFL',
				participants: 12,
				myRank: 3,
				nextMatchup: 'Week 15',
				status: 'active',
				leagueType: 'Standard',
				image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400'
			},
			{
				id: '2',
				name: 'NBA Championship League',
				sport: 'NBA',
				participants: 10,
				myRank: 1,
				nextMatchup: 'Week 12',
				status: 'active',
				leagueType: 'Head-to-Head',
				image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400'
			},
			{
				id: '3',
				name: 'MLB Spring League',
				sport: 'MLB',
				participants: 14,
				myRank: 5,
				nextMatchup: 'Week 8',
				status: 'active',
				leagueType: 'Rotisserie',
				image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400'
			}
		];
		
		// Featured Public Leagues
		featuredLeagues = [
			{
				id: '4',
				name: 'Mega League',
				sport: 'NFL',
				participants: 1000,
				maxParticipants: 1000,
				draftDate: new Date(2025, 0, 20, 19, 0),
				leagueType: 'Standard',
				image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400'
			},
			{
				id: '5',
				name: 'Elite NBA League',
				sport: 'NBA',
				participants: 500,
				maxParticipants: 500,
				draftDate: new Date(2025, 0, 18, 20, 0),
				leagueType: 'Head-to-Head',
				image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400'
			},
			{
				id: '6',
				name: 'Championship League',
				sport: 'MLB',
				participants: 750,
				maxParticipants: 1000,
				draftDate: new Date(2025, 1, 5, 18, 0),
				leagueType: 'Rotisserie',
				image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400'
			}
		];
		
		// Upcoming Drafts
		upcomingDrafts = [
			{
				id: '7',
				leagueName: 'NFL Week 16 Draft',
				sport: 'NFL',
				draftDate: new Date(2025, 0, 22, 19, 0),
				participants: 8,
				maxParticipants: 12,
				format: 'Snake Draft'
			},
			{
				id: '8',
				leagueName: 'NBA Daily League',
				sport: 'NBA',
				draftDate: new Date(2025, 0, 19, 20, 0),
				participants: 6,
				maxParticipants: 10,
				format: 'Salary Cap'
			},
			{
				id: '9',
				leagueName: 'MLB Spring Training',
				sport: 'MLB',
				draftDate: new Date(2025, 1, 1, 18, 0),
				participants: 10,
				maxParticipants: 12,
				format: 'Auction'
			}
		];
		
		// Global Leaderboard
		leaderboard = [
			{
				rank: 1,
				username: 'FantasyMaster',
				totalPoints: 12500,
				leaguesWon: 8,
				winRate: 72,
				avatar: null
			},
			{
				rank: 2,
				username: 'DraftKing',
				totalPoints: 9800,
				leaguesWon: 6,
				winRate: 68,
				avatar: null
			},
			{
				rank: 3,
				username: 'Champion2025',
				totalPoints: 8500,
				leaguesWon: 5,
				winRate: 65,
				avatar: null
			},
			{
				rank: 4,
				username: 'ProDraft',
				totalPoints: 7200,
				leaguesWon: 4,
				winRate: 62,
				avatar: null
			},
			{
				rank: 5,
				username: 'ElitePlayer',
				totalPoints: 6500,
				leaguesWon: 4,
				winRate: 60,
				avatar: null
			}
		];
		
		loading = false;
	});
	
	function handleJoinLeague(leagueId) {
		showComingSoonModal = true;
	}
	
	function handleCreateLeague() {
		showComingSoonModal = true;
	}
</script>

<svelte:head>
	<title>Fantasy Sports - Tournaments.com</title>
	<meta name="description" content="Join fantasy sports leagues, compete for free, and manage your teams across NFL, NBA, MLB and more. 100% free to play." />
</svelte:head>

<div class="bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 min-h-screen">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl">
		<!-- Hero Section -->
		<div class="mb-16 sm:mb-20 pb-16 sm:pb-20">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
				<div>
					<div class="inline-block mb-4">
						<span class="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-full uppercase tracking-wide">
							100% Free to Play
						</span>
					</div>
					<h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
						Fantasy Sports.<br/>
						<span class="text-red-600 dark:text-red-500">Real Competition.</span>
					</h1>
					<p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
						Draft your dream team, compete against thousands, and climb the leaderboards. Join the most exciting fantasy sports platform - completely free.
					</p>
					<div class="flex flex-col sm:flex-row gap-4 mb-8">
						<button
							on:click={() => showComingSoonModal = true}
							class="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
						>
							Join a League Now
						</button>
						<button
							on:click={() => showComingSoonModal = true}
							class="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 hover:border-red-600 dark:hover:border-red-500 text-gray-900 dark:text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-lg"
						>
							Create Your League
						</button>
					</div>
					<div class="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
						<div class="flex items-center gap-2">
							<svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
							</svg>
							<span class="font-semibold">100% Free</span>
						</div>
						<div class="flex items-center gap-2">
							<svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
							</svg>
							<span class="font-semibold">No Entry Fees</span>
						</div>
						<div class="flex items-center gap-2">
							<svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
							</svg>
							<span class="font-semibold">50K+ Players</span>
						</div>
					</div>
				</div>
				<div class="relative">
					<div class="relative rounded-2xl overflow-hidden shadow-2xl">
						<img 
							src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800" 
							alt="Fantasy Sports"
							class="w-full h-[400px] sm:h-[500px] object-cover"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
						<div class="absolute bottom-0 left-0 right-0 p-8 text-white">
							<div class="flex items-center gap-4 mb-4">
								<div class="bg-red-600 px-4 py-2 rounded-lg">
									<span class="text-3xl font-black">50K+</span>
									<div class="text-xs uppercase tracking-wide opacity-90">Active Players</div>
								</div>
								<div class="bg-white/20 backdrop-blur px-4 py-2 rounded-lg">
									<span class="text-3xl font-black">10K+</span>
									<div class="text-xs uppercase tracking-wide opacity-90">Leagues Created</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- How It Works -->
		<div class="mb-16 sm:mb-20 pb-16 sm:pb-20">
			<div class="text-center mb-12">
				<h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
					How Fantasy Sports Works
				</h2>
				<p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
					It's simple: Draft players, compete weekly, and climb the leaderboards based on real-world performance
				</p>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
				<div class="bg-white dark:bg-gray-800 rounded-xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700 shadow-md text-center">
					<div class="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
						<span class="text-4xl font-black text-white">1</span>
					</div>
					<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Join or Create a League</h3>
					<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
						Choose from thousands of public leagues or create your own private league with friends. All completely free to join.
					</p>
				</div>
				
				<div class="bg-white dark:bg-gray-800 rounded-xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700 shadow-md text-center">
					<div class="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
						<span class="text-4xl font-black text-white">2</span>
					</div>
					<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Draft Your Team</h3>
					<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
						Select real players from your favorite sport. Build the ultimate roster through live drafts or salary cap formats.
					</p>
				</div>
				
				<div class="bg-white dark:bg-gray-800 rounded-xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700 shadow-md text-center">
					<div class="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
						<span class="text-4xl font-black text-white">3</span>
					</div>
					<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Compete & Climb</h3>
					<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
						Your team earns points based on real player performance. Compete for the top spot on the leaderboard and bragging rights.
					</p>
				</div>
			</div>
		</div>
		
		<!-- Why Play Section -->
		<div class="mb-16 sm:mb-20 pb-16 sm:pb-20">
			<div class="bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 sm:p-12 border border-gray-200 dark:border-gray-700 shadow-lg">
			<div class="text-center mb-12">
				<h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
					Why Play Fantasy Sports?
				</h2>
				<p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
					More than just a game - it's a way to engage with sports like never before
				</p>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
					<div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
						<svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">Compete for Glory</h3>
					<p class="text-sm text-gray-600 dark:text-gray-400">
						Climb the leaderboards and compete for the top spot. Show off your fantasy skills and earn bragging rights.
					</p>
				</div>
				
				<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
					<div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
						<svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>
					</div>
					<h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">Play with Friends</h3>
					<p class="text-sm text-gray-600 dark:text-gray-400">
						Create private leagues and compete against friends, family, or coworkers. Make it personal.
					</p>
				</div>
				
				<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
					<div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
						<svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
						</svg>
					</div>
					<h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">Multiple Formats</h3>
					<p class="text-sm text-gray-600 dark:text-gray-400">
						Choose from Standard, Head-to-Head, Rotisserie, or Daily formats. Find your perfect style.
					</p>
				</div>
				
				<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
					<div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
						<svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
						</svg>
					</div>
					<h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">All Major Sports</h3>
					<p class="text-sm text-gray-600 dark:text-gray-400">
						NFL, NBA, MLB, NHL, and more. Play your favorite sport or try something new.
					</p>
				</div>
			</div>
			</div>
		</div>
		
		<!-- Featured Leagues Preview -->
		<div class="mb-12 pb-12">
			<div class="flex items-center justify-between mb-6">
				<div>
					<h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
						Featured Leagues
					</h2>
					<p class="text-gray-600 dark:text-gray-400">
						Join thousands of players competing for massive prize pools
					</p>
				</div>
				<button
					on:click={() => activeTab = 'public'}
					class="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-bold text-sm uppercase tracking-wide"
				>
					View All →
				</button>
			</div>
			
			{#if !loading && featuredLeagues.length > 0}
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					{#each featuredLeagues.slice(0, 3) as league}
						<button 
							type="button"
							class="card group hover:shadow-xl transition-all duration-300 cursor-pointer text-left w-full"
							on:click={() => showComingSoonModal = true}
						>
							<div class="relative h-32 rounded-t-lg overflow-hidden mb-4">
								<img 
									src={league.image} 
									alt={league.name}
									class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								/>
								<div class="absolute top-3 right-3">
									<span class="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full shadow-lg">
										Hot
									</span>
								</div>
								<div class="absolute bottom-3 left-3">
									<span class="px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white text-xs font-bold rounded">
										{league.sport}
									</span>
								</div>
							</div>
							
							<div class="p-4">
								<h3 class="font-bold text-lg text-gray-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
									{league.name}
								</h3>
								
								<div class="space-y-2 mb-4">
									<div class="flex items-center justify-between text-sm">
										<span class="text-gray-600 dark:text-gray-400">Participants</span>
										<span class="font-semibold text-gray-900 dark:text-white">
											{league.participants} / {league.maxParticipants}
										</span>
									</div>
									<div class="flex items-center justify-between text-sm">
										<span class="text-gray-600 dark:text-gray-400">Spots Left</span>
										<span class="font-semibold text-red-600 dark:text-red-400">
											{league.maxParticipants - league.participants}
										</span>
									</div>
									<div class="flex items-center justify-between text-sm">
										<span class="text-gray-600 dark:text-gray-400">Status</span>
										<span class="font-semibold text-green-600 dark:text-green-400">Free to Join</span>
									</div>
								</div>
								
								<button
									on:click={() => showComingSoonModal = true}
									class="block w-full px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-center"
								>
									Join Now
								</button>
							</div>
						</button>
					{/each}
				</div>
			{/if}
		</div>
		
		<!-- Tabs Section -->
		<div class="mb-12 pb-12">
			<div class="mb-8 border-b-2 border-gray-200 dark:border-gray-700">
			<div class="flex gap-1">
				<button
					on:click={() => activeTab = 'leagues'}
					class="px-6 py-3 text-sm font-bold transition-all duration-200 border-b-4 {
						activeTab === 'leagues'
							? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
							: 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-gray-200'
					}"
				>
					My Leagues
				</button>
				<button
					on:click={() => activeTab = 'public'}
					class="px-6 py-3 text-sm font-bold transition-all duration-200 border-b-4 {
						activeTab === 'public'
							? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
							: 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-gray-200'
					}"
				>
					Public Leagues
				</button>
				<button
					on:click={() => activeTab = 'drafts'}
					class="px-6 py-3 text-sm font-bold transition-all duration-200 border-b-4 {
						activeTab === 'drafts'
							? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
							: 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-gray-200'
					}"
				>
					Upcoming Drafts
				</button>
				<button
					on:click={() => activeTab = 'leaderboard'}
					class="px-6 py-3 text-sm font-bold transition-all duration-200 border-b-4 {
						activeTab === 'leaderboard'
							? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
							: 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-gray-200'
					}"
				>
					Leaderboard
				</button>
			</div>
		</div>
		
		<!-- Tab Content Container -->
		<div class="mt-8">
		<!-- My Leagues Tab -->
		{#if activeTab === 'leagues'}
			<div class="bg-white dark:bg-gray-800 rounded-xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700 shadow-md">
				<div class="flex items-center justify-between mb-6">
					<div>
						<h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">My Leagues</h2>
						<p class="text-gray-600 dark:text-gray-400">
							Manage your active fantasy leagues and track your standings
						</p>
					</div>
					<button
						on:click={() => showComingSoonModal = true}
						class="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
					>
						+ Create League
					</button>
				</div>
				
				{#if loading}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each Array(3) as _}
							<div class="card animate-pulse">
								<div class="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
								<div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
							</div>
						{/each}
					</div>
				{:else if myLeagues.length > 0}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each myLeagues as league}
							<button
								type="button"
								on:click={() => showComingSoonModal = true}
								class="card block group hover:shadow-xl transition-all duration-300 text-left w-full"
							>
								<div class="relative h-40 rounded-t-lg overflow-hidden mb-4">
									<img 
										src={league.image} 
										alt={league.name}
										class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									/>
									<div class="absolute top-4 right-4">
										<span class="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
											Active
										</span>
									</div>
									<div class="absolute bottom-4 left-4">
										<span class="px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white text-xs font-bold rounded">
											{league.sport}
										</span>
									</div>
								</div>
								
								<div class="p-4">
									<h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
										{league.name}
									</h3>
									
									<div class="space-y-2 mb-4">
										<div class="flex items-center justify-between text-sm">
											<span class="text-gray-600 dark:text-gray-400">My Rank:</span>
											<span class="font-bold text-gray-900 dark:text-white">#{league.myRank}</span>
										</div>
										<div class="flex items-center justify-between text-sm">
											<span class="text-gray-600 dark:text-gray-400">Participants:</span>
											<span class="font-semibold text-gray-900 dark:text-white">{league.participants}</span>
										</div>
										<div class="flex items-center justify-between text-sm">
											<span class="text-gray-600 dark:text-gray-400">Next Matchup:</span>
											<span class="font-semibold text-blue-600 dark:text-blue-400">{league.nextMatchup}</span>
										</div>
									</div>
									
									<div class="pt-4 border-t border-gray-200 dark:border-gray-700">
										<span class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
											{league.leagueType}
										</span>
									</div>
								</div>
							</button>
						{/each}
					</div>
				{:else}
					<div class="text-center py-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
						<svg class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>
						<p class="text-gray-600 dark:text-gray-400 text-lg font-medium mb-2">No leagues yet</p>
						<p class="text-gray-500 dark:text-gray-500 text-sm mb-6">Create or join a league to get started</p>
						<button
							on:click={() => showComingSoonModal = true}
							class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
						>
							Create Your First League
						</button>
					</div>
				{/if}
			</div>
		{/if}
		
		<!-- Public Leagues Tab -->
		{#if activeTab === 'public'}
			<div class="bg-white dark:bg-gray-800 rounded-xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700 shadow-md">
				<div class="mb-6">
					<h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Featured Public Leagues</h2>
					<p class="text-gray-600 dark:text-gray-400">
						Join thousands of players in these popular leagues. All leagues are completely free to join and play.
					</p>
				</div>
				
				{#if loading}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each Array(3) as _}
							<div class="card animate-pulse">
								<div class="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
								<div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each featuredLeagues as league}
							<div class="card group hover:shadow-xl transition-all duration-300">
								<div class="relative h-40 rounded-t-lg overflow-hidden mb-4">
									<img 
										src={league.image} 
										alt={league.name}
										class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									/>
									<div class="absolute top-4 right-4">
										<span class="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
											Public
										</span>
									</div>
									<div class="absolute bottom-4 left-4">
										<span class="px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white text-xs font-bold rounded">
											{league.sport}
										</span>
									</div>
								</div>
								
								<div class="p-4">
									<h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">
										{league.name}
									</h3>
									
									<div class="space-y-2 mb-4">
										<div class="flex items-center justify-between text-sm">
											<span class="text-gray-600 dark:text-gray-400">Participants:</span>
											<span class="font-semibold text-gray-900 dark:text-white">
												{league.participants} / {league.maxParticipants}
											</span>
										</div>
										<div class="flex items-center justify-between text-sm">
											<span class="text-gray-600 dark:text-gray-400">Draft Date:</span>
											<span class="font-semibold text-blue-600 dark:text-blue-400">
												{format(league.draftDate, 'MMM d, h:mm a')}
											</span>
										</div>
										<div class="flex items-center justify-between text-sm">
											<span class="text-gray-600 dark:text-gray-400">Status:</span>
											<span class="font-semibold text-green-600 dark:text-green-400">Free to Join</span>
										</div>
									</div>
									
									<button
										on:click={() => showComingSoonModal = true}
										class="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
									>
										Join League
									</button>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
		
		<!-- Upcoming Drafts Tab -->
		{#if activeTab === 'drafts'}
			<div class="bg-white dark:bg-gray-800 rounded-xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700 shadow-md">
				<div class="mb-6">
					<h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Upcoming Drafts</h2>
					<p class="text-gray-600 dark:text-gray-400">
						Join live drafts happening soon. Choose from Snake Draft, Salary Cap, or Auction formats.
					</p>
				</div>
				
				{#if loading}
					<div class="space-y-4">
						{#each Array(3) as _}
							<div class="card animate-pulse">
								<div class="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="space-y-4">
						{#each upcomingDrafts as draft}
							<div class="card hover:shadow-lg transition-all duration-200">
								<div class="flex items-center justify-between p-6">
									<div class="flex-1">
										<div class="flex items-center gap-4 mb-3">
											<h3 class="font-bold text-xl text-gray-900 dark:text-white">
												{draft.leagueName}
											</h3>
											<span class="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold rounded uppercase">
												{draft.sport}
											</span>
										</div>
										
										<div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
											<div>
												<span class="text-gray-600 dark:text-gray-400 block mb-1">Draft Date</span>
												<span class="font-semibold text-gray-900 dark:text-white">
													{format(draft.draftDate, 'MMM d, yyyy')}
												</span>
												<span class="text-gray-500 dark:text-gray-500 block">
													{format(draft.draftDate, 'h:mm a')}
												</span>
											</div>
											<div>
												<span class="text-gray-600 dark:text-gray-400 block mb-1">Participants</span>
												<span class="font-semibold text-gray-900 dark:text-white">
													{draft.participants} / {draft.maxParticipants}
												</span>
											</div>
											<div>
												<span class="text-gray-600 dark:text-gray-400 block mb-1">Format</span>
												<span class="font-semibold text-gray-900 dark:text-white">{draft.format}</span>
											</div>
											<div>
												<span class="text-gray-600 dark:text-gray-400 block mb-1">Status</span>
												<span class="font-bold text-green-600 dark:text-green-400">Free</span>
											</div>
										</div>
										
									</div>
									
									<div class="ml-6">
										<button
											on:click={() => showComingSoonModal = true}
											class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap"
										>
											Join Draft
										</button>
									</div>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
		
		<!-- Leaderboard Tab -->
		{#if activeTab === 'leaderboard'}
			<div class="bg-white dark:bg-gray-800 rounded-xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700 shadow-md">
				<div class="mb-6">
					<h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Global Leaderboard</h2>
					<p class="text-gray-600 dark:text-gray-400">
						See the top fantasy players ranked by total winnings, leagues won, and win rate. Climb the ranks and become a legend!
					</p>
				</div>
				
				{#if loading}
					<div class="card animate-pulse">
						<div class="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
					</div>
				{:else}
					<div class="card overflow-hidden">
						<div class="overflow-x-auto">
							<table class="w-full">
								<thead class="bg-gray-50 dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700">
									<tr>
										<th class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Rank</th>
										<th class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Player</th>
										<th class="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Total Points</th>
										<th class="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Leagues Won</th>
										<th class="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Win Rate</th>
									</tr>
								</thead>
								<tbody class="divide-y divide-gray-200 dark:divide-gray-700">
									{#each leaderboard as player}
										<tr class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
											on:click={() => goto(`/profile/${player.username}`)}
										>
											<td class="px-6 py-4 whitespace-nowrap">
												<div class="flex items-center">
													{#if player.rank <= 3}
														<span class="w-8 h-8 rounded-full bg-yellow-400 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-black text-gray-900">
															#{player.rank}
														</span>
													{:else}
														<span class="text-sm font-bold text-gray-600 dark:text-gray-400">#{player.rank}</span>
													{/if}
												</div>
											</td>
											<td class="px-6 py-4 whitespace-nowrap">
												<div class="flex items-center gap-3">
													<div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-black">
														{player.username.charAt(0).toUpperCase()}
													</div>
													<div>
														<div class="font-bold text-gray-900 dark:text-white">{player.username}</div>
													</div>
												</div>
											</td>
											<td class="px-6 py-4 whitespace-nowrap text-right">
												<span class="font-bold text-green-600 dark:text-green-400">
													{player.totalPoints.toLocaleString()}
												</span>
											</td>
											<td class="px-6 py-4 whitespace-nowrap text-right">
												<span class="font-semibold text-gray-900 dark:text-white">{player.leaguesWon}</span>
											</td>
											<td class="px-6 py-4 whitespace-nowrap text-right">
												<span class="font-semibold text-blue-600 dark:text-blue-400">{player.winRate}%</span>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				{/if}
			</div>
		{/if}
		</div>
		</div>
		
		<!-- Stats Section -->
		<div class="mb-16 sm:mb-20 pb-16 sm:pb-20">
			<div class="bg-gray-900 dark:bg-black rounded-2xl p-8 sm:p-12 text-white shadow-2xl border border-gray-800">
			<div class="text-center mb-12">
				<h2 class="text-3xl sm:text-4xl font-extrabold mb-4">
					Join the Fantasy Sports Revolution
				</h2>
				<p class="text-lg text-gray-300 max-w-2xl mx-auto">
					Thousands of players. Millions in prizes. Endless excitement.
				</p>
			</div>
			
			<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
				<div class="text-center">
					<div class="text-4xl sm:text-5xl font-black text-red-500 mb-2">1M+</div>
					<div class="text-sm text-gray-300 uppercase tracking-wide">Games Played</div>
				</div>
				<div class="text-center">
					<div class="text-4xl sm:text-5xl font-black text-red-500 mb-2">50K+</div>
					<div class="text-sm text-gray-300 uppercase tracking-wide">Active Players</div>
				</div>
				<div class="text-center">
					<div class="text-4xl sm:text-5xl font-black text-red-500 mb-2">10K+</div>
					<div class="text-sm text-gray-300 uppercase tracking-wide">Leagues Created</div>
				</div>
				<div class="text-center">
					<div class="text-4xl sm:text-5xl font-black text-red-500 mb-2">24/7</div>
					<div class="text-sm text-gray-300 uppercase tracking-wide">Support Available</div>
				</div>
			</div>
			</div>
		</div>
		
		<!-- Testimonials -->
		<div class="mb-16 sm:mb-20 pb-16 sm:pb-20">
			<div class="text-center mb-12">
				<h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
					What Players Are Saying
				</h2>
				<p class="text-lg text-gray-600 dark:text-gray-400">
					Join thousands of satisfied fantasy sports enthusiasts
				</p>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div class="card">
					<div class="flex items-center gap-3 mb-4">
						<div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-black">
							JD
						</div>
						<div>
							<div class="font-bold text-gray-900 dark:text-white">John D.</div>
							<div class="text-sm text-gray-500 dark:text-gray-400">NFL Player</div>
						</div>
					</div>
					<div class="flex mb-2">
						{#each Array(5) as _}
							<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
						{/each}
					</div>
					<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
						"Finished #1 in my first league! The platform is easy to use and the competition is fierce. Highly recommend!"
					</p>
				</div>
				
				<div class="card">
					<div class="flex items-center gap-3 mb-4">
						<div class="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-black">
							SM
						</div>
						<div>
							<div class="font-bold text-gray-900 dark:text-white">Sarah M.</div>
							<div class="text-sm text-gray-500 dark:text-gray-400">NBA Player</div>
						</div>
					</div>
					<div class="flex mb-2">
						{#each Array(5) as _}
							<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
						{/each}
					</div>
					<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
						"Created a private league with my coworkers. It's been so much fun and the competition is fierce!"
					</p>
				</div>
				
				<div class="card">
					<div class="flex items-center gap-3 mb-4">
						<div class="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-black">
							MR
						</div>
						<div>
							<div class="font-bold text-gray-900 dark:text-white">Mike R.</div>
							<div class="text-sm text-gray-500 dark:text-gray-400">MLB Player</div>
						</div>
					</div>
					<div class="flex mb-2">
						{#each Array(5) as _}
							<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
						{/each}
					</div>
					<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
						"Best fantasy platform I've used. The draft experience is smooth and the live scoring is amazing."
					</p>
				</div>
			</div>
		</div>
		
		<!-- FAQ Section -->
		<div class="mb-16 sm:mb-20 pb-16 sm:pb-20">
			<div class="text-center mb-12">
				<h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
					Frequently Asked Questions
				</h2>
				<p class="text-lg text-gray-600 dark:text-gray-400">
					Everything you need to know about fantasy sports
				</p>
			</div>
			
			<div class="max-w-3xl mx-auto space-y-4">
				<div class="card">
					<h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">
						What is fantasy sports?
					</h3>
					<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
						Fantasy sports is a game where you draft real players from professional sports leagues to create your own virtual team. Your team earns points based on how those players perform in real games. Compete against other fantasy managers to win cash prizes!
					</p>
				</div>
				
				<div class="card">
					<h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">
						How do I compete?
					</h3>
					<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
						Simply join a league - it's completely free! Draft your team and compete against other players. Your team earns points based on real player performance. Climb the leaderboard and compete for the top spot.
					</p>
				</div>
				
				<div class="card">
					<h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">
						Is it legal?
					</h3>
					<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
						Yes! Fantasy sports is legal in most states. We operate in full compliance with all applicable laws and regulations. All transactions are secure and protected.
					</p>
				</div>
				
				<div class="card">
					<h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">
						How much does it cost to play?
					</h3>
					<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
						It's completely free! All leagues are free to join and play. No entry fees, no hidden costs. Just pure fantasy sports competition.
					</p>
				</div>
				
				<div class="card">
					<h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">
						Do I need to be a sports expert?
					</h3>
					<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
						Not at all! While knowledge helps, many successful players are casual fans. Our platform provides player stats, projections, and expert advice to help you make informed decisions. It's fun for everyone!
					</p>
				</div>
			</div>
		</div>
		
		<!-- Final CTA -->
		<div class="!bg-gradient-to-r !from-red-600 !to-orange-600 rounded-2xl p-8 sm:p-12 text-center shadow-2xl border-4 border-red-700 dark:border-red-800" style="background: linear-gradient(to right, #dc2626, #ea580c);">
			<h2 class="text-3xl sm:text-4xl font-extrabold mb-4 text-white">
				Ready to Start Winning?
			</h2>
			<p class="text-xl mb-8 text-white max-w-2xl mx-auto opacity-95">
				Join thousands of players competing for the top spot. Create your account and join your first league in minutes - completely free.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<button
					on:click={() => showComingSoonModal = true}
					class="px-8 py-4 bg-white text-red-600 hover:bg-gray-100 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
				>
					Browse Leagues
				</button>
				<button
					on:click={() => showComingSoonModal = true}
					class="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/20 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
				>
					Create League
				</button>
			</div>
		</div>
	</div>
</div>

<!-- Coming Soon Modal -->
{#if showComingSoonModal}
	<div 
		class="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4"
		on:click={() => showComingSoonModal = false}
		on:keydown={(e) => e.key === 'Escape' && (showComingSoonModal = false)}
		role="dialog"
		aria-modal="true"
	>
		<div 
			class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full"
			on:click|stopPropagation
		>
			<div class="p-6 text-center">
				<div class="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
					<span class="text-3xl">🏆</span>
				</div>
				<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
					Fantasy Sports
				</h2>
				<p class="text-gray-600 dark:text-gray-400 mb-6">
					Coming Soon! We're building an amazing fantasy sports platform where you can draft teams, compete in leagues, and climb the leaderboards. Stay tuned for updates!
				</p>
				<button
					on:click={() => showComingSoonModal = false}
					class="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
				>
					Got it
				</button>
			</div>
		</div>
	</div>
{/if}


