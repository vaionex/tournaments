<script>
	import { format } from 'date-fns';
	import { TournamentSEO } from '$lib/components/seo';
	import { getAuthorForArticle } from '$lib/data/authors';

	export let data;
	
	$: tournament = data?.ssrTournament || null;
	$: relatedNews = data?.ssrRelatedNews || [];
	$: upcomingTournaments = data?.ssrUpcomingTournaments || [];

	function formatPrize(amount) {
		if (!amount || amount === 0) return null;
		if (amount >= 1000000000) return `$${(amount / 1000000000).toFixed(1)}B`;
		if (amount >= 1000000) return `$${(amount / 1000000).toFixed(0)}M`;
		if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
		return `$${amount.toLocaleString()}`;
	}

	function getStatusColor(status) {
		switch (status) {
			case 'live': return 'bg-red-500 text-white';
			case 'upcoming': return 'bg-blue-500 text-white';
			case 'completed': return 'bg-gray-500 text-white';
			default: return 'bg-gray-500 text-white';
		}
	}

	function getDaysUntil(dateStr) {
		const date = new Date(dateStr);
		const now = new Date();
		const diff = date.getTime() - now.getTime();
		const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
		if (days < 0) return null;
		if (days === 0) return 'Today';
		if (days === 1) return 'Tomorrow';
		return `${days} days`;
	}

	function timeAgo(date) {
		const d = date instanceof Date ? date : new Date(date);
		const now = new Date();
		const diffMs = now.getTime() - d.getTime();
		const diffMin = Math.floor(diffMs / 60000);
		if (diffMin < 1) return 'just now';
		if (diffMin < 60) return `${diffMin}m ago`;
		const diffHrs = Math.floor(diffMin / 60);
		if (diffHrs < 24) return `${diffHrs}h ago`;
		const diffDays = Math.floor(diffHrs / 24);
		if (diffDays < 7) return `${diffDays}d ago`;
		return format(d, 'MMM d');
	}
</script>

{#if tournament}
<TournamentSEO 
	name={tournament.name}
	description={tournament.description || `${tournament.name} - ${tournament.game} tournament at ${tournament.location}`}
	startDate={tournament.date}
	endDate={tournament.end_date}
	location={tournament.location || 'TBD'}
	image={tournament.image_url || 'https://www.tournaments.com/og-image.jpg'}
	prizePool={formatPrize(tournament.prize_pool)}
	game={tournament.game}
/>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<!-- Hero Banner -->
	<div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
			<div class="flex flex-wrap items-center gap-3 mb-4">
				<span class="px-3 py-1 text-xs font-bold uppercase rounded {getStatusColor(tournament.status)}">
					{tournament.status}
				</span>
				<span class="text-sm text-gray-400">{tournament.game}</span>
				{#if tournament.is_featured}
					<span class="px-2 py-0.5 text-xs font-semibold bg-yellow-500/20 text-yellow-300 rounded">⭐ Featured</span>
				{/if}
			</div>
			
			<h1 class="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-tight">
				{tournament.name}
			</h1>
			
			<div class="flex flex-wrap gap-6 text-sm text-gray-300">
				{#if tournament.location}
					<div class="flex items-center gap-2">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
						{tournament.location}
					</div>
				{/if}
				<div class="flex items-center gap-2">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
					{format(new Date(tournament.date), 'MMM d, yyyy')}
					{#if tournament.end_date && tournament.end_date !== tournament.date}
						— {format(new Date(tournament.end_date), 'MMM d, yyyy')}
					{/if}
				</div>
				{#if formatPrize(tournament.prize_pool)}
					<div class="flex items-center gap-2 text-green-400 font-semibold">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						{formatPrize(tournament.prize_pool)} Prize Pool
					</div>
				{/if}
			</div>

			{#if getDaysUntil(tournament.date) && tournament.status === 'upcoming'}
				<div class="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-sm">
					<svg class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span>Starts in <strong class="text-yellow-400">{getDaysUntil(tournament.date)}</strong></span>
				</div>
			{/if}
		</div>
	</div>

	<!-- Content -->
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<!-- Main Content -->
			<div class="lg:col-span-2 space-y-8">
				<!-- About -->
				{#if tournament.description}
					<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
						<h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">About This Tournament</h2>
						<div class="prose prose-gray dark:prose-invert max-w-none">
							{#each tournament.description.split('\n') as paragraph}
								{#if paragraph.trim()}
									<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">{paragraph}</p>
								{/if}
							{/each}
						</div>
					</div>
				{/if}

				<!-- Key Details -->
				<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
					<h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Tournament Details</h2>
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div class="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
							<p class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">Sport</p>
							<p class="text-lg font-bold text-gray-900 dark:text-white">{tournament.game}</p>
						</div>
						<div class="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
							<p class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">Venue</p>
							<p class="text-lg font-bold text-gray-900 dark:text-white">{tournament.location || 'TBD'}</p>
						</div>
						<div class="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
							<p class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">Start Date</p>
							<p class="text-lg font-bold text-gray-900 dark:text-white">{format(new Date(tournament.date), 'MMMM d, yyyy')}</p>
						</div>
						<div class="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
							<p class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">End Date</p>
							<p class="text-lg font-bold text-gray-900 dark:text-white">{tournament.end_date ? format(new Date(tournament.end_date), 'MMMM d, yyyy') : 'TBD'}</p>
						</div>
						{#if tournament.prize_pool && tournament.prize_pool > 0}
							<div class="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
								<p class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">Prize Pool</p>
								<p class="text-lg font-bold text-green-600 dark:text-green-400">${tournament.prize_pool.toLocaleString()}</p>
							</div>
						{/if}
						{#if tournament.max_players}
							<div class="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
								<p class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">Participants</p>
								<p class="text-lg font-bold text-gray-900 dark:text-white">{tournament.max_players} {tournament.max_players > 100 ? 'athletes' : 'teams/fighters'}</p>
							</div>
						{/if}
						<div class="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
							<p class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">Format</p>
							<p class="text-lg font-bold text-gray-900 dark:text-white">{tournament.is_online ? 'Online' : 'In-Person'}</p>
						</div>
						<div class="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
							<p class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">Organizer</p>
							<p class="text-lg font-bold text-gray-900 dark:text-white">{tournament.platform || 'TBD'}</p>
						</div>
					</div>
				</div>

				<!-- Tags -->
				{#if tournament.tags && tournament.tags.length > 0}
					<div class="flex flex-wrap gap-2">
						{#each tournament.tags as tag}
							<span class="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 font-medium">
								{tag}
							</span>
						{/each}
					</div>
				{/if}

				<!-- Related News -->
				{#if relatedNews.length > 0}
					<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
						<h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Related News</h2>
						<div class="space-y-4">
							{#each relatedNews as article}
								<a href="/news/{article.id}" class="group block border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
									<div class="flex items-center gap-2 text-xs text-gray-500 mb-1">
										<span class="px-2 py-0.5 text-[10px] font-bold uppercase bg-blue-600/10 text-blue-600 rounded">{article.category}</span>
										<span>{timeAgo(article.published_at)}</span>
									</div>
									<h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">
										{article.title}
									</h3>
									<p class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">{article.excerpt}</p>
								</a>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<!-- Sidebar -->
			<aside class="space-y-6">
				<!-- Countdown / Status Card -->
				{#if tournament.status === 'upcoming'}
					<div class="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white text-center">
						<p class="text-sm uppercase tracking-wider mb-2 opacity-80">Starts In</p>
						<p class="text-4xl font-black mb-1">{getDaysUntil(tournament.date) || '—'}</p>
						<p class="text-sm opacity-80">{format(new Date(tournament.date), 'EEEE, MMMM d, yyyy')}</p>
					</div>
				{:else if tournament.status === 'completed'}
					<div class="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-6 text-white text-center">
						<p class="text-sm uppercase tracking-wider mb-2 opacity-80">Tournament</p>
						<p class="text-2xl font-black mb-1">Completed</p>
						<p class="text-sm opacity-80">{format(new Date(tournament.end_date || tournament.date), 'MMMM d, yyyy')}</p>
					</div>
				{/if}

				<!-- Other Upcoming Tournaments -->
				{#if upcomingTournaments.length > 0}
					<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
						<div class="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-blue-700">
							<h3 class="text-base font-bold text-white">More Tournaments</h3>
						</div>
						<div class="p-4 space-y-3">
							{#each upcomingTournaments as t}
								<a href="/tournaments/{t.id}" class="block p-3 border-l-4 border-blue-500 bg-gray-50 dark:bg-gray-900/50 rounded-r-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group">
									<h4 class="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-1">{t.name}</h4>
									<p class="text-xs text-gray-500 mt-1">{t.game} • {format(new Date(t.date), 'MMM d, yyyy')}</p>
								</a>
							{/each}
						</div>
						<div class="p-4 pt-0">
							<a href="/tournaments" class="block w-full py-2.5 text-center text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
								View All Tournaments →
							</a>
						</div>
					</div>
				{/if}

				<!-- Share -->
				<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
					<h3 class="text-sm font-bold text-gray-900 dark:text-white mb-3">Share</h3>
					<div class="flex gap-2">
						<button class="flex-1 py-2 bg-black hover:bg-gray-800 text-white rounded-lg text-sm font-semibold transition-colors">
							<svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
							Post
						</button>
						<button class="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors">
							<svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.953 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
							Share
						</button>
					</div>
				</div>
			</aside>
		</div>
	</div>
</div>

{:else}
	<div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
		<div class="text-center">
			<h1 class="text-3xl font-black text-gray-900 dark:text-white mb-4">Tournament Not Found</h1>
			<p class="text-gray-600 dark:text-gray-400 mb-6">The tournament you're looking for doesn't exist or has been removed.</p>
			<a href="/tournaments" class="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
				Browse All Tournaments
			</a>
		</div>
	</div>
{/if}
