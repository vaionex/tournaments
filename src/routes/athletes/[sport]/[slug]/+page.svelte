<script lang="ts">
	import { page } from '$app/stores';
	import { PlayerSEO } from '$lib/components/seo';
	
	// SSR data from +page.server.ts
	export let data: any;
	
	$: player = data?.player || null;
	$: related = data?.related || [];
	$: sport = data?.sport || $page.params.sport;
	$: notFound = !player;
	$: loading = false;
	
	const sportNames: Record<string, string> = {
		tennis: 'Tennis', golf: 'Golf', soccer: 'Soccer', nfl: 'Football',
		nba: 'Basketball', mlb: 'Baseball', racing: 'Racing', mma: 'MMA',
		boxing: 'Boxing', esports: 'Esports', cricket: 'Cricket', rugby: 'Rugby',
		nhl: 'Ice Hockey', olympics: 'Olympics', ncaf: 'College Football', wnba: 'WNBA'
	};
	
	$: sportName = sportNames[sport] || sport;
	$: bioParagraphs = player?.biography ? player.biography.split('\n\n').filter((p: string) => p.trim()) : [];
	
	function formatMoney(amount: number): string {
		if (!amount) return '$0';
		if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
		if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
		return `$${amount}`;
	}
</script>

{#if player}
<PlayerSEO 
	name={player.display_name || player.player_name}
	sport={sportName}
	team={player.team_name}
	position={player.position}
	country={player.country}
	image={player.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(player.display_name || player.player_name)}&size=400&background=1a1a2e&color=fff`}
	stats={{
		wins: player.total_wins,
		winnings: player.total_winnings,
		tournaments: player.total_tournaments
	}}
	ranking={player.current_rank}
/>
{/if}

<svelte:head>
	{#if player?.meta_title}
	<title>{player.meta_title}</title>
	{/if}
	{#if player?.meta_description}
	<meta name="description" content={player.meta_description} />
	{/if}
</svelte:head>

<div class="min-h-screen bg-gray-950 text-white">
	{#if loading}
	<div class="container mx-auto px-3 sm:px-6 lg:px-8 max-w-7xl py-20 text-center">
		<div class="text-gray-400">Loading athlete profile...</div>
	</div>
	{:else if notFound}
	<div class="container mx-auto px-3 sm:px-6 lg:px-8 max-w-7xl py-20 text-center">
		<h1 class="text-3xl font-bold mb-4">Athlete Not Found</h1>
		<p class="text-gray-400">The athlete you're looking for doesn't exist or hasn't been published yet.</p>
		<a href="/" class="mt-6 inline-block text-blue-400 hover:text-blue-300">← Back to Home</a>
	</div>
	{:else if player}
	<!-- Breadcrumb -->
	<div class="container mx-auto px-3 sm:px-6 lg:px-8 max-w-7xl pt-6">
		<nav class="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
			<ol class="flex items-center gap-2" itemscope itemtype="https://schema.org/BreadcrumbList">
				<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
					<a href="/" itemprop="item" class="hover:text-white transition-colors"><span itemprop="name">Home</span></a>
					<meta itemprop="position" content="1" />
				</li>
				<li class="text-gray-600">/</li>
				<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
					<a href="/athletes/{sport}" itemprop="item" class="hover:text-white transition-colors"><span itemprop="name">{sportName}</span></a>
					<meta itemprop="position" content="2" />
				</li>
				<li class="text-gray-600">/</li>
				<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
					<span itemprop="name" class="text-white">{player.display_name || player.player_name}</span>
					<meta itemprop="position" content="3" />
				</li>
			</ol>
		</nav>
	</div>

	<!-- Hero Section -->
	<div class="container mx-auto px-3 sm:px-6 lg:px-8 max-w-7xl">
		<div class="flex flex-col md:flex-row gap-8 mb-12">
			<div class="flex-shrink-0">
				<div class="w-48 h-48 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center text-6xl font-bold overflow-hidden">
					{#if player.avatar_url}
						<img src={player.avatar_url} alt={player.display_name} class="w-full h-full object-cover" />
					{:else}
						{(player.display_name || player.player_name).charAt(0)}
					{/if}
				</div>
			</div>

			<div class="flex-1">
				<div class="flex items-center gap-3 mb-2">
					<h1 class="text-4xl md:text-5xl font-bold">{player.display_name || player.player_name}</h1>
					{#if player.is_verified}
						<svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
						</svg>
					{/if}
				</div>

				<div class="flex flex-wrap items-center gap-4 text-gray-400 mb-4">
					<span class="inline-flex items-center gap-1.5 bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
						{sportName}
					</span>
					{#if player.country}
						<span>📍 {player.country}</span>
					{/if}
					{#if player.team_name}
						<span>🏟️ {player.team_name}</span>
					{/if}
					{#if player.position}
						<span>🎯 {player.position}</span>
					{/if}
				</div>

				{#if player.bio}
					<p class="text-gray-300 text-lg leading-relaxed">{player.bio}</p>
				{/if}
			</div>
		</div>

		<!-- Stats Grid -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
			{#if player.current_rank}
			<div class="bg-gray-900/50 border border-gray-800 rounded-xl p-5 text-center">
				<div class="text-3xl font-bold text-yellow-400">#{player.current_rank}</div>
				<div class="text-sm text-gray-400 mt-1">World Ranking</div>
			</div>
			{/if}
			<div class="bg-gray-900/50 border border-gray-800 rounded-xl p-5 text-center">
				<div class="text-3xl font-bold text-green-400">{formatMoney(player.total_winnings || 0)}</div>
				<div class="text-sm text-gray-400 mt-1">Career Earnings</div>
			</div>
			<div class="bg-gray-900/50 border border-gray-800 rounded-xl p-5 text-center">
				<div class="text-3xl font-bold text-blue-400">{player.total_wins || 0}</div>
				<div class="text-sm text-gray-400 mt-1">Career Wins</div>
			</div>
			<div class="bg-gray-900/50 border border-gray-800 rounded-xl p-5 text-center">
				<div class="text-3xl font-bold text-purple-400">{player.total_tournaments || 0}</div>
				<div class="text-sm text-gray-400 mt-1">Tournaments</div>
			</div>
			{#if player.win_rate}
			<div class="bg-gray-900/50 border border-gray-800 rounded-xl p-5 text-center">
				<div class="text-3xl font-bold text-orange-400">{player.win_rate}%</div>
				<div class="text-sm text-gray-400 mt-1">Win Rate</div>
			</div>
			{/if}
		</div>

		<!-- Biography -->
		{#if bioParagraphs.length > 0}
		<article class="mb-12">
			<h2 class="text-2xl font-bold mb-6 pb-3 border-b border-gray-800">
				About {player.display_name || player.player_name}
			</h2>
			<div class="prose prose-invert prose-lg max-w-none">
				{#each bioParagraphs as paragraph}
					<p class="text-gray-300 leading-relaxed mb-4">{paragraph}</p>
				{/each}
			</div>
		</article>
		{/if}

		<!-- Social Links -->
		{#if player.twitter_url || player.twitch_url || player.youtube_url || player.website_url}
		<div class="mb-12">
			<h2 class="text-xl font-bold mb-4">Follow {player.display_name || player.player_name}</h2>
			<div class="flex flex-wrap gap-3">
				{#if player.twitter_url}
				<a href={player.twitter_url} target="_blank" rel="noopener noreferrer" 
					class="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm transition-colors">
					𝕏 Twitter
				</a>
				{/if}
				{#if player.twitch_url}
				<a href={player.twitch_url} target="_blank" rel="noopener noreferrer"
					class="inline-flex items-center gap-2 bg-purple-900/30 hover:bg-purple-900/50 border border-purple-700 rounded-lg px-4 py-2 text-sm transition-colors">
					📺 Twitch
				</a>
				{/if}
				{#if player.youtube_url}
				<a href={player.youtube_url} target="_blank" rel="noopener noreferrer"
					class="inline-flex items-center gap-2 bg-red-900/30 hover:bg-red-900/50 border border-red-700 rounded-lg px-4 py-2 text-sm transition-colors">
					▶️ YouTube
				</a>
				{/if}
				{#if player.website_url}
				<a href={player.website_url} target="_blank" rel="noopener noreferrer"
					class="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm transition-colors">
					🌐 Website
				</a>
				{/if}
			</div>
		</div>
		{/if}

		<!-- Related Athletes -->
		{#if related.length > 0}
		<div class="mb-12">
			<h2 class="text-xl font-bold mb-6">More {sportName} Athletes</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each related as rel}
				<a href="/athletes/{sport}/{rel.slug}" 
					class="bg-gray-900/50 border border-gray-800 rounded-xl p-4 hover:border-gray-600 transition-colors group">
					<div class="flex items-center gap-3">
						<div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center text-lg font-bold flex-shrink-0">
							{(rel.display_name || '?').charAt(0)}
						</div>
						<div>
							<h3 class="font-semibold group-hover:text-blue-400 transition-colors">{rel.display_name}</h3>
							<p class="text-sm text-gray-400">
								{#if rel.current_rank}#{rel.current_rank} · {/if}
								{rel.country || ''}
							</p>
						</div>
					</div>
				</a>
				{/each}
			</div>
		</div>
		{/if}

		<!-- FAQ Schema for SEO -->
		<div class="mb-16">
			<h2 class="text-xl font-bold mb-4">Frequently Asked Questions</h2>
			<div class="space-y-4" itemscope itemtype="https://schema.org/FAQPage">
				<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question" class="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
					<h3 itemprop="name" class="font-semibold mb-2">What is {player.display_name || player.player_name}'s career record?</h3>
					<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
						<p itemprop="text" class="text-gray-400">
							{player.display_name || player.player_name} has {player.total_wins || 0} career wins across {player.total_tournaments || 0} tournaments, with career earnings of {formatMoney(player.total_winnings || 0)}{player.win_rate ? ` and a ${player.win_rate}% win rate` : ''}.
						</p>
					</div>
				</div>
				<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question" class="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
					<h3 itemprop="name" class="font-semibold mb-2">What sport does {player.display_name || player.player_name} play?</h3>
					<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
						<p itemprop="text" class="text-gray-400">
							{player.display_name || player.player_name} is a professional {sportName} {player.position ? player.position : 'player'}{player.team_name ? ` currently with ${player.team_name}` : ''}{player.country ? ` from ${player.country}` : ''}.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	{/if}
</div>
