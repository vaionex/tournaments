<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { format } from 'date-fns';
	import type { Tournament, TournamentResult, TournamentParticipant } from '$lib/types';
	import { 
		getTournamentById, 
		getTournamentParticipants, 
		getTournamentResults,
		getGameImage,
		getTournamentNews,
		getBroadcastInfo,
		getTournamentSponsors,
		getTournamentSchedule,
		type TournamentNews,
		type BroadcastInfo,
		type TournamentSponsor,
		type TournamentSchedule
	} from '$lib/services/tournaments.service';
	import { StatusBadge } from '$lib/components/ui';
	import ClaimButton from '$lib/components/ClaimButton.svelte';
	import { TournamentSEO } from '$lib/components/seo';
	
	let tournament: Tournament | null = null;
	let results: TournamentResult[] = [];
	let participants: TournamentParticipant[] = [];
	let news: TournamentNews[] = [];
	let broadcasts: BroadcastInfo[] = [];
	let sponsors: TournamentSponsor[] = [];
	let schedule: TournamentSchedule[] = [];
	let loading = true;
	let activeTab = 'overview';
	
	const tabs = [
		{ id: 'overview', label: 'Overview' },
		{ id: 'schedule', label: 'Schedule' },
		{ id: 'brackets', label: 'Brackets' },
		{ id: 'participants', label: 'Participants' },
		{ id: 'rules', label: 'Rules' },
		{ id: 'news', label: 'News' }
	];
	
	onMount(async () => {
		const id = $page.params.id;
		await loadTournament(id);
	});
	
	async function loadTournament(id: string) {
		loading = true;
		try {
			const [tournamentData, participantsData] = await Promise.all([
				getTournamentById(id),
				getTournamentParticipants(id)
			]);
			
			tournament = tournamentData;
			participants = participantsData;
			
			if (tournament) {
				// Load additional data
				const [newsData, broadcastData, sponsorData, scheduleData] = await Promise.all([
					getTournamentNews(id, tournament.game),
					getBroadcastInfo(tournament.game),
					getTournamentSponsors(),
					getTournamentSchedule(id)
				]);
				
				news = newsData;
				broadcasts = broadcastData;
				sponsors = sponsorData;
				schedule = scheduleData;
			}
			
			if (tournament?.status === 'completed') {
				results = await getTournamentResults(id);
			}
		} catch (error) {
			console.error('Failed to load tournament:', error);
		} finally {
			loading = false;
		}
	}
</script>

<TournamentSEO
	name={tournament?.name || 'Tournament'}
	sport={tournament?.game || 'Sports'}
	description={tournament?.description || (tournament ? `${tournament.name} - ${tournament.game} tournament with ${tournament.prizePool} prize pool. ${tournament.participants} participants competing.` : 'View tournament details, brackets, schedule, and results on Tournaments.com')}
	image={tournament ? getGameImage(tournament.game) : 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&h=630&fit=crop'}
	startDate={tournament?.date ? new Date(tournament.date) : new Date()}
	endDate={tournament?.date ? new Date(new Date(tournament.date).getTime() + 7 * 24 * 60 * 60 * 1000) : new Date()}
	location={tournament?.location || null}
	prizePool={tournament?.prizePool || null}
	status={tournament?.status || 'upcoming'}
/>

{#if loading}
	<!-- Professional Skeleton Loader -->
	<div class="bg-white dark:bg-gray-900 min-h-screen">
		<!-- Skeleton Hero -->
		<div class="relative h-96 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900">
			<div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
			<div class="relative container mx-auto px-4 h-full flex flex-col justify-end pb-8 max-w-7xl">
				<div class="space-y-4">
					<div class="h-12 w-2/3 bg-white/20 rounded animate-pulse"></div>
					<div class="h-6 w-1/3 bg-white/20 rounded animate-pulse"></div>
					<div class="flex gap-6">
						<div class="space-y-2">
							<div class="h-3 w-16 bg-white/20 rounded animate-pulse"></div>
							<div class="h-8 w-24 bg-white/20 rounded animate-pulse"></div>
						</div>
						<div class="space-y-2">
							<div class="h-3 w-16 bg-white/20 rounded animate-pulse"></div>
							<div class="h-8 w-20 bg-white/20 rounded animate-pulse"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="container mx-auto px-4 pb-12 max-w-7xl">
			<!-- Skeleton Tabs -->
			<div class="flex gap-2 border-b border-gray-200 dark:border-gray-700 mb-8 pt-6">
				{#each Array(6) as _}
					<div class="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
				{/each}
			</div>
			
			<div class="grid md:grid-cols-3 gap-6">
				<!-- Main Content -->
				<div class="md:col-span-2 space-y-6">
					<div class="bento-card">
						<div class="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
						<div class="space-y-3">
							<div class="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
							<div class="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
							<div class="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
						</div>
						<div class="grid grid-cols-2 gap-4 mt-6">
							{#each Array(4) as _}
								<div class="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-xl">
									<div class="h-3 w-12 bg-gray-200 dark:bg-gray-600 rounded animate-pulse mb-2"></div>
									<div class="h-5 w-20 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
								</div>
							{/each}
						</div>
					</div>
				</div>
				
				<!-- Sidebar -->
				<div class="space-y-6">
					<div class="bento-card">
						<div class="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
						<div class="space-y-3">
							{#each Array(3) as _}
								<div class="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
									<div class="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
									<div class="flex-1 space-y-2">
										<div class="h-4 w-24 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
										<div class="h-3 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
									</div>
								</div>
							{/each}
						</div>
					</div>
					
					<div class="bento-card">
						<div class="h-6 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
						<div class="space-y-3">
							{#each Array(4) as _}
								<div class="flex justify-between p-3 bg-gray-100 dark:bg-gray-700/50 rounded-xl">
									<div class="h-4 w-20 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
									<div class="h-4 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{:else if tournament}
	<!-- Hero Section -->
	<div class="relative h-96 mb-8 overflow-hidden">
		<div 
			class="absolute inset-0 bg-cover bg-center"
			style="background-image: url('{getGameImage(tournament.game)}'); filter: brightness(0.4);"
		></div>
		<div class="absolute inset-0 bg-gradient-to-t from-gray-900 dark:from-slate-deep via-gray-900/80 dark:via-slate-deep/80 to-transparent"></div>
		
		<div class="relative container mx-auto px-4 h-full flex flex-col justify-end pb-8 max-w-7xl">
			<div class="flex items-start justify-between">
				<div>
					<h1 class="text-5xl font-black text-white mb-3">{tournament.name}</h1>
					<p class="text-2xl text-gray-200 dark:text-gray-300 mb-4">{tournament.game}</p>
					<div class="flex items-center gap-6">
						<div>
							<div class="text-sm text-gray-300 dark:text-gray-400 mb-1">Prize Pool</div>
							<div class="text-3xl font-black text-green-300 dark:text-green-400">{tournament.prizePool}</div>
						</div>
						{#if tournament.joinable && tournament.entryFee}
							<div>
								<div class="text-sm text-gray-300 dark:text-gray-400 mb-1">Entry Fee</div>
								<div class="text-2xl font-bold text-white">{tournament.entryFee}</div>
							</div>
						{/if}
						<div>
							<div class="text-sm text-gray-300 dark:text-gray-400 mb-1">Players</div>
							<div class="text-2xl font-bold text-white">{tournament.registeredPlayers || 'TBD'}/{tournament.maxPlayers || 'TBD'}</div>
						</div>
					</div>
				</div>
				<span class="px-6 py-3 rounded-full text-sm font-bold {
					tournament.status === 'live' ? 'bg-red-500/20 dark:bg-red-500/20 text-red-300 dark:text-red-400 border-2 border-red-500/50 dark:border-red-500/50' :
					tournament.status === 'upcoming' ? 'bg-blue-500/20 dark:bg-blue-500/20 text-blue-300 dark:text-blue-400 border-2 border-blue-500/50 dark:border-blue-500/50' :
					'bg-gray-500/20 dark:bg-gray-500/20 text-gray-300 dark:text-gray-400 border-2 border-gray-500/50 dark:border-gray-500/50'
				}">
					{tournament.status === 'live' ? '🔴 LIVE' : tournament.status.toUpperCase()}
				</span>
			</div>
		</div>
	</div>
	
	<div class="bg-white dark:bg-gray-900 min-h-screen">
		<div class="container mx-auto px-4 pb-12 max-w-7xl">
			<!-- Tabbed Navigation -->
			<div class="mb-8">
				<div class="flex gap-2 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
					{#each tabs as tab}
						<button
							on:click={() => activeTab = tab.id}
							class="px-6 py-4 font-semibold transition-colors relative whitespace-nowrap {
								activeTab === tab.id
									? 'text-blue-600 dark:text-blue-400'
									: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
							}"
						>
							{tab.label}
							{#if tab.id === 'news'}
								<span class="ml-1.5 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">{news.length}</span>
							{/if}
							{#if activeTab === tab.id}
								<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400"></div>
							{/if}
						</button>
					{/each}
				</div>
			</div>
		
		<div class="grid md:grid-cols-3 gap-6">
			<!-- Main Content -->
			<div class="md:col-span-2 space-y-6">
				<!-- Overview Tab -->
				{#if activeTab === 'overview'}
					<div class="bento-card">
						<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">About</h2>
						<p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">{tournament.description}</p>
						
						<div class="grid grid-cols-2 gap-4 mt-6">
							<div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
								<div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Date</div>
								<div class="text-xl font-bold text-gray-900 dark:text-white">{format(new Date(tournament.date), 'MMM d, yyyy')}</div>
							</div>
							<div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
								<div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Location</div>
								<div class="text-xl font-bold text-gray-900 dark:text-white">{tournament.location}</div>
							</div>
							<div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
								<div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Platform</div>
								<div class="text-xl font-bold text-gray-900 dark:text-white">{tournament.platform}</div>
							</div>
							<div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
								<div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Format</div>
								<div class="text-xl font-bold text-gray-900 dark:text-white">Double Elimination</div>
							</div>
						</div>
					</div>
					
					<!-- Latest News Preview -->
					{#if news.length > 0}
						<div class="bento-card">
							<div class="flex items-center justify-between mb-4">
								<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Latest News</h2>
								<button 
									on:click={() => activeTab = 'news'}
									class="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline"
								>
									View All →
								</button>
							</div>
							<div class="space-y-4">
								{#each news.slice(0, 2) as article}
									<a href="/news/{article.id}" class="flex gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
										<img src={article.image} alt={article.title} class="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
										<div class="flex-1 min-w-0">
											<span class="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase">{article.category}</span>
											<h3 class="font-semibold text-gray-900 dark:text-white line-clamp-2">{article.title}</h3>
											<p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{article.date}</p>
										</div>
									</a>
								{/each}
							</div>
						</div>
					{/if}
					
					{#if tournament.status === 'completed' && results.length > 0}
						<div class="bento-card">
							<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Final Standings</h2>
							<div class="overflow-x-auto">
								<table class="w-full">
									<thead>
										<tr class="border-b border-gray-200 dark:border-gray-700">
											<th class="text-left py-4 px-4 text-gray-600 dark:text-gray-400 font-semibold">Rank</th>
											<th class="text-left py-4 px-4 text-gray-600 dark:text-gray-400 font-semibold">Player/Team</th>
											<th class="text-right py-4 px-4 text-gray-600 dark:text-gray-400 font-semibold">Prize</th>
											<th class="text-center py-4 px-4 text-gray-600 dark:text-gray-400 font-semibold">Verified</th>
											<th class="text-center py-4 px-4 text-gray-600 dark:text-gray-400 font-semibold">Action</th>
										</tr>
									</thead>
									<tbody>
										{#each results as result}
											<tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
												<td class="py-4 px-4 font-bold text-gray-900 dark:text-white">#{result.rank}</td>
												<td class="py-4 px-4 text-gray-900 dark:text-white">{result.player}</td>
												<td class="py-4 px-4 text-right font-bold text-green-600 dark:text-green-400">
													{result.prize}
												</td>
												<td class="py-4 px-4 text-center">
													{#if result.verified}
														<span class="text-green-600 dark:text-green-400">✓</span>
													{:else}
														<span class="text-gray-500 dark:text-gray-500">-</span>
													{/if}
												</td>
												<td class="py-4 px-4 text-center">
													<ClaimButton 
														tournamentId={tournament.id}
														rank={result.rank}
														playerName={result.player}
													/>
												</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						</div>
					{/if}
				{/if}
				
				<!-- Schedule Tab -->
				{#if activeTab === 'schedule'}
					<div class="bento-card">
						<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Tournament Schedule</h2>
						<div class="space-y-3">
							{#each schedule as round}
								<div class="flex items-center gap-4 p-4 rounded-xl {
									round.status === 'live' ? 'bg-red-50 dark:bg-red-900/20 border-2 border-red-500' :
									round.status === 'completed' ? 'bg-gray-50 dark:bg-gray-700/50' :
									'bg-blue-50 dark:bg-blue-900/20'
								}">
									<div class="w-12 h-12 rounded-full flex items-center justify-center {
										round.status === 'live' ? 'bg-red-500 text-white' :
										round.status === 'completed' ? 'bg-green-500 text-white' :
										'bg-blue-500 text-white'
									}">
										{#if round.status === 'completed'}
											<span>✓</span>
										{:else if round.status === 'live'}
											<span class="animate-pulse">●</span>
										{:else}
											<span>○</span>
										{/if}
									</div>
									<div class="flex-1">
										<div class="font-bold text-gray-900 dark:text-white flex items-center gap-2">
											{round.round}
											{#if round.status === 'live'}
												<span class="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full animate-pulse">LIVE</span>
											{/if}
										</div>
										<div class="text-sm text-gray-500 dark:text-gray-400">
											{round.date} • {round.time}
										</div>
									</div>
									{#if round.status === 'live' || round.status === 'upcoming'}
										<a 
											href="#watch"
											class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
										>
											{round.status === 'live' ? 'Watch Now' : 'Set Reminder'}
										</a>
									{/if}
								</div>
							{/each}
						</div>
					</div>
				{/if}
				
				<!-- Brackets Tab -->
				{#if activeTab === 'brackets'}
					<div class="bento-card">
						<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Tournament Brackets</h2>
						<p class="text-gray-600 dark:text-gray-400 mb-6">Brackets will be available once registration closes.</p>
						<div class="p-8 bg-gray-50 dark:bg-gray-700/50 rounded-xl text-center">
							<div class="text-4xl mb-4">🏆</div>
							<p class="text-gray-600 dark:text-gray-400">Bracket view coming soon</p>
						</div>
					</div>
				{/if}
				
				<!-- Participants Tab -->
				{#if activeTab === 'participants'}
					<div class="bento-card">
						<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Participants ({participants.length})</h2>
						<div class="space-y-3">
							{#each participants as participant}
								<div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between">
									<div>
										<div class="font-bold text-gray-900 dark:text-white">{participant.name}</div>
										<div class="text-sm text-gray-600 dark:text-gray-400">{participant.rank}</div>
									</div>
									<a href={`/profile/${participant.name.toLowerCase().replace(/\s+/g, '')}`} class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-semibold">
										View Profile →
									</a>
								</div>
							{/each}
						</div>
					</div>
				{/if}
				
				<!-- Rules Tab -->
				{#if activeTab === 'rules'}
					<div class="bento-card">
						<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Tournament Rules</h2>
						{#if tournament.rules}
							<ul class="space-y-4">
								{#each tournament.rules as rule}
									<li class="flex items-start gap-3 text-gray-600 dark:text-gray-300">
										<span class="text-blue-600 dark:text-blue-400 mt-1">•</span>
										<span class="text-lg">{rule}</span>
									</li>
								{/each}
							</ul>
						{:else}
							<p class="text-gray-600 dark:text-gray-400">No rules specified for this tournament.</p>
						{/if}
					</div>
				{/if}
				
				<!-- News Tab -->
				{#if activeTab === 'news'}
					<div class="bento-card">
						<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Tournament News</h2>
						<div class="space-y-6">
							{#each news as article}
								<a href="/news/{article.id}" class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border border-gray-200 dark:border-gray-700">
									<img src={article.image} alt={article.title} class="w-32 h-24 rounded-lg object-cover flex-shrink-0" />
									<div class="flex-1 min-w-0">
										<span class="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-semibold rounded mb-2">{article.category}</span>
										<h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">{article.title}</h3>
										<p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{article.excerpt}</p>
										<p class="text-sm text-gray-500 dark:text-gray-500 mt-2">{article.date}</p>
									</div>
								</a>
							{/each}
						</div>
						<!-- More News Link -->
						<div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
							<a 
								href="/news?game={tournament.game}" 
								class="flex items-center justify-center gap-2 w-full py-3 bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
							>
								More {tournament.game} News
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
								</svg>
							</a>
						</div>
					</div>
				{/if}
			</div>
			
			<!-- Sidebar -->
			<div class="space-y-6">
				<!-- Where to Watch -->
				<div class="bento-card" id="watch">
					<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
						📺 Where to Watch
					</h3>
					<div class="space-y-3">
						{#each broadcasts as broadcast}
							<a 
								href={broadcast.url}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-3 p-3 rounded-lg {
									broadcast.isLive 
										? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30' 
										: 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
								} transition-colors"
							>
								<span class="text-2xl">{broadcast.icon}</span>
								<div class="flex-1">
									<div class="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
										{broadcast.platform}
										{#if broadcast.isLive}
											<span class="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full animate-pulse">LIVE</span>
										{/if}
									</div>
									{#if broadcast.language}
										<div class="text-xs text-gray-500 dark:text-gray-400">{broadcast.language}</div>
									{/if}
								</div>
								<span class="text-gray-400">→</span>
							</a>
						{/each}
					</div>
				</div>
				
				<!-- CTA Button -->
				<div class="bento-card">
					{#if tournament.joinable}
						<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Join Tournament</h3>
						<a 
							href={`https://${tournament.platform.toLowerCase()}.com/tournament/${tournament.id}`}
							target="_blank"
							rel="noopener noreferrer"
							class="btn-primary w-full text-center block mb-3"
						>
							Join Now →
						</a>
						<p class="text-xs text-gray-500 dark:text-gray-400 text-center">
							You are now being redirected to our partner platform.
						</p>
					{:else}
						<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Tournament Info</h3>
						<div class="space-y-3">
							<div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
								<p class="text-sm text-blue-800 dark:text-blue-300 font-medium mb-2">
									🌍 International Tournament
								</p>
								<p class="text-xs text-blue-700 dark:text-blue-400">
									This is a professional international tournament. View details and follow the action.
								</p>
							</div>
							<a 
								href={`https://${tournament.platform.toLowerCase()}.com/tournament/${tournament.id}`}
								target="_blank"
								rel="noopener noreferrer"
								class="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg text-center block transition-colors"
							>
								View on {tournament.platform} →
							</a>
						</div>
					{/if}
				</div>
				
				<!-- Prize Breakdown -->
				{#if tournament.prizeBreakdown}
					<div class="bento-card">
						<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">💰 Prize Breakdown</h3>
						<div class="space-y-4">
							{#each tournament.prizeBreakdown as prize}
								<div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
									<span class="text-gray-900 dark:text-white font-semibold">
										{prize.place === 1 ? '🥇' : prize.place === 2 ? '🥈' : prize.place === 3 ? '🥉' : '#'}
										{prize.place} Place
									</span>
									<span class="font-bold text-green-600 dark:text-green-400">{prize.prize}</span>
								</div>
							{/each}
						</div>
					</div>
				{/if}
				
				<!-- Sponsors -->
				{#if sponsors.length > 0}
					<div class="bento-card">
						<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🤝 Sponsors</h3>
						<div class="space-y-3">
							{#each sponsors.filter(s => s.tier === 'title') as sponsor}
								<div class="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800 text-center">
									<span class="text-sm text-yellow-700 dark:text-yellow-400 uppercase font-bold">Title Sponsor</span>
									<div class="text-3xl mt-2">{sponsor.logo}</div>
									<div class="font-bold text-gray-900 dark:text-white mt-1">{sponsor.name}</div>
								</div>
							{/each}
							<div class="grid grid-cols-2 gap-2">
								{#each sponsors.filter(s => s.tier !== 'title') as sponsor}
									<div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
										<span class="text-xl">{sponsor.logo}</span>
										<div class="text-xs text-gray-600 dark:text-gray-400 mt-1">{sponsor.name}</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				{/if}
				
				<!-- Tournament Details -->
				<div class="bento-card">
					<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📋 Details</h3>
					<div class="space-y-4 text-sm">
						<div>
							<div class="text-gray-500 dark:text-gray-400 mb-1">Location</div>
							<div class="font-semibold text-gray-900 dark:text-white">{tournament.location}</div>
						</div>
						<div>
							<div class="text-gray-500 dark:text-gray-400 mb-1">Hosted On</div>
							<div class="font-semibold text-gray-900 dark:text-white">{tournament.platform}</div>
						</div>
						<div>
							<div class="text-gray-500 dark:text-gray-400 mb-1">Registration</div>
							<div class="font-semibold text-gray-900 dark:text-white">
								{tournament.registeredPlayers}/{tournament.maxPlayers} players
							</div>
						</div>
						<div>
							<div class="text-gray-500 dark:text-gray-400 mb-1">Format</div>
							<div class="font-semibold text-gray-900 dark:text-white">Double Elimination</div>
						</div>
					</div>
				</div>
				
				<!-- Social Share -->
				<div class="bento-card">
					<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📢 Share</h3>
					<div class="flex gap-2">
						<button class="flex-1 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors text-sm">
							Twitter
						</button>
						<button class="flex-1 p-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold transition-colors text-sm">
							Facebook
						</button>
						<button class="flex-1 p-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold transition-colors text-sm">
							Copy Link
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
{:else}
	<div class="bg-white dark:bg-gray-900 min-h-screen">
		<div class="container mx-auto px-4 py-8 max-w-7xl">
			<div class="bento-card text-center">
				<h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Tournament Not Found</h2>
				<p class="text-gray-600 dark:text-gray-400">The tournament you're looking for doesn't exist.</p>
			</div>
		</div>
	</div>
{/if}

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
