<script lang="ts">
	import { PageSEO } from '$lib/components/seo';

	export let data: any;

	$: player1 = data?.player1;
	$: player2 = data?.player2;
	$: otherAthletes = data?.otherAthletes || [];
	$: sport = data?.sport;

	function formatMoney(amount: number | null): string {
		if (!amount) return 'N/A';
		if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
		if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
		return `$${amount}`;
	}

	function getWinner(val1: number | null, val2: number | null, lowerIsBetter = false): string {
		if (val1 == null && val2 == null) return 'tie';
		if (val1 == null) return 'p2';
		if (val2 == null) return 'p1';
		if (val1 === val2) return 'tie';
		if (lowerIsBetter) return val1 < val2 ? 'p1' : 'p2';
		return val1 > val2 ? 'p1' : 'p2';
	}

	function countryFlag(country: string | null): string {
		if (!country) return '🌍';
		const flags: Record<string, string> = {
			'Argentina': '🇦🇷', 'Australia': '🇦🇺', 'Belgium': '🇧🇪', 'Brazil': '🇧🇷',
			'Canada': '🇨🇦', 'China': '🇨🇳', 'Croatia': '🇭🇷', 'Denmark': '🇩🇰',
			'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'France': '🇫🇷', 'Germany': '🇩🇪', 'India': '🇮🇳',
			'Ireland': '🇮🇪', 'Italy': '🇮🇹', 'Japan': '🇯🇵', 'Mexico': '🇲🇽',
			'Netherlands': '🇳🇱', 'New Zealand': '🇳🇿', 'Norway': '🇳🇴', 'Philippines': '🇵🇭',
			'Poland': '🇵🇱', 'Portugal': '🇵🇹', 'Russia': '🇷🇺', 'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
			'Serbia': '🇷🇸', 'South Africa': '🇿🇦', 'South Korea': '🇰🇷', 'Spain': '🇪🇸',
			'Sweden': '🇸🇪', 'Switzerland': '🇨🇭', 'Thailand': '🇹🇭', 'Turkey': '🇹🇷',
			'Ukraine': '🇺🇦', 'United Kingdom': '🇬🇧', 'United States': '🇺🇸', 'USA': '🇺🇸',
			'Wales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿'
		};
		return flags[country] || '🌍';
	}

	$: comparisons = player1 && player2 ? [
		{ label: 'World Ranking', val1: player1.current_rank, val2: player2.current_rank, format: (v: any) => v ? `#${v}` : 'Unranked', lowerIsBetter: true },
		{ label: 'Career Wins', val1: player1.total_wins, val2: player2.total_wins, format: (v: any) => v ?? 'N/A' },
		{ label: 'Career Earnings', val1: player1.total_winnings, val2: player2.total_winnings, format: formatMoney },
		{ label: 'Tournaments Played', val1: player1.tournaments_played, val2: player2.tournaments_played, format: (v: any) => v ?? 'N/A' },
	] : [];

	$: title = player1 && player2
		? `${player1.display_name} vs ${player2.display_name} — Head to Head Comparison`
		: 'Athlete Comparison';

	$: description = player1 && player2
		? `Compare ${player1.display_name} and ${player2.display_name} stats, rankings, career earnings, and achievements. Head-to-head breakdown on Tournaments.com.`
		: 'Compare athletes head to head on Tournaments.com.';
</script>

<PageSEO
	{title}
	{description}
/>

<div class="bg-white dark:bg-gray-900 min-h-screen">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">

		{#if !player1 || !player2}
			<div class="text-center py-20">
				<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Athletes Not Found</h1>
				<p class="text-gray-500">One or both athletes could not be found.</p>
				<a href="/athletes" class="mt-4 inline-block text-blue-600 hover:underline">← Browse Athletes</a>
			</div>
		{:else}

			<!-- Breadcrumb -->
			<nav class="mb-6 text-sm text-gray-500 dark:text-gray-400">
				<a href="/" class="hover:text-blue-600">Home</a>
				<span class="mx-1">/</span>
				<a href="/athletes" class="hover:text-blue-600">Athletes</a>
				{#if sport}
					<span class="mx-1">/</span>
					<a href="/athletes/{sport}" class="hover:text-blue-600">{sport.toUpperCase()}</a>
				{/if}
				<span class="mx-1">/</span>
				<span class="text-gray-700 dark:text-gray-300">{player1.display_name} vs {player2.display_name}</span>
			</nav>

			<!-- Hero Header -->
			<div class="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 rounded-2xl p-6 sm:p-10 mb-8 text-white">
				<h1 class="text-center text-lg sm:text-xl font-bold uppercase tracking-wider mb-6 opacity-80">Head to Head</h1>

				<div class="grid grid-cols-3 gap-4 items-center">
					<!-- Player 1 -->
					<div class="text-center">
						<a href="/athletes/{player1.sport}/{player1.slug}" class="group">
							<div class="w-20 h-20 sm:w-28 sm:h-28 mx-auto rounded-full bg-white/20 flex items-center justify-center text-3xl sm:text-5xl font-black mb-3">
								{player1.display_name.charAt(0)}
							</div>
							<h2 class="text-lg sm:text-2xl font-bold group-hover:underline">{player1.display_name}</h2>
							<p class="text-sm opacity-80 mt-1">{countryFlag(player1.country)} {player1.country || 'Unknown'}</p>
							{#if player1.current_rank}
								<p class="text-sm font-semibold mt-1">Rank #{player1.current_rank}</p>
							{/if}
						</a>
					</div>

					<!-- VS -->
					<div class="text-center">
						<div class="text-4xl sm:text-6xl font-black opacity-80">VS</div>
					</div>

					<!-- Player 2 -->
					<div class="text-center">
						<a href="/athletes/{player2.sport}/{player2.slug}" class="group">
							<div class="w-20 h-20 sm:w-28 sm:h-28 mx-auto rounded-full bg-white/20 flex items-center justify-center text-3xl sm:text-5xl font-black mb-3">
								{player2.display_name.charAt(0)}
							</div>
							<h2 class="text-lg sm:text-2xl font-bold group-hover:underline">{player2.display_name}</h2>
							<p class="text-sm opacity-80 mt-1">{countryFlag(player2.country)} {player2.country || 'Unknown'}</p>
							{#if player2.current_rank}
								<p class="text-sm font-semibold mt-1">Rank #{player2.current_rank}</p>
							{/if}
						</a>
					</div>
				</div>
			</div>

			<!-- Stats Comparison -->
			<div class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
				<div class="p-5 border-b border-gray-200 dark:border-gray-700">
					<h2 class="text-xl font-bold text-gray-900 dark:text-white">📊 Stats Comparison</h2>
				</div>
				<div class="divide-y divide-gray-200 dark:divide-gray-700">
					{#each comparisons as comp}
						{@const winner = getWinner(comp.val1, comp.val2, comp.lowerIsBetter)}
						<div class="grid grid-cols-3 items-center p-4 sm:p-5">
							<div class="text-right pr-4">
								<span class="text-lg sm:text-xl font-bold {winner === 'p1' ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}">
									{comp.format(comp.val1)}
								</span>
								{#if winner === 'p1'}
									<span class="ml-1 text-green-500">✓</span>
								{/if}
							</div>
							<div class="text-center">
								<span class="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
									{comp.label}
								</span>
							</div>
							<div class="text-left pl-4">
								{#if winner === 'p2'}
									<span class="mr-1 text-green-500">✓</span>
								{/if}
								<span class="text-lg sm:text-xl font-bold {winner === 'p2' ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}">
									{comp.format(comp.val2)}
								</span>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Player Bios -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
				{#each [player1, player2] as player}
					<div class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
						<h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">
							<a href="/athletes/{player.sport}/{player.slug}" class="hover:text-blue-600 transition-colors">
								{player.display_name}
							</a>
						</h3>
						{#if player.biography}
							<p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-6">
								{player.biography.split('\n\n')[0]}
							</p>
						{:else}
							<p class="text-sm text-gray-500 dark:text-gray-400">
								Professional {player.primary_game || player.sport?.toUpperCase()} player from {player.country || 'unknown origin'}.
							</p>
						{/if}
						<a href="/athletes/{player.sport}/{player.slug}" class="inline-block mt-3 text-sm text-blue-600 hover:underline">
							Full profile →
						</a>
					</div>
				{/each}
			</div>

			<!-- More Comparisons -->
			{#if otherAthletes.length >= 2}
				<div class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-8">
					<h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔄 More {sport?.toUpperCase()} Comparisons</h2>
					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
						{#each otherAthletes.slice(0, 9) as athlete, i}
							{#if i < otherAthletes.length - 1}
								{@const opponent = otherAthletes[i + 1]}
								<a
									href="/athletes/compare/{athlete.slug}-vs-{opponent.slug}"
									class="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-sm"
								>
									<span class="font-semibold text-gray-900 dark:text-white truncate">{athlete.display_name}</span>
									<span class="text-xs text-gray-400 mx-2 flex-shrink-0">vs</span>
									<span class="font-semibold text-gray-900 dark:text-white truncate text-right">{opponent.display_name}</span>
								</a>
							{/if}
						{/each}
					</div>
				</div>
			{/if}

			<!-- Compare Other Athletes CTA -->
			<div class="text-center py-6">
				<a href="/athletes" class="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
					Browse All Athletes
				</a>
			</div>

			<!-- Structured Data -->
			{@html `<script type="application/ld+json">${JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebPage",
				"name": title,
				"description": description,
				"url": `https://www.tournaments.com/athletes/compare/${player1.slug}-vs-${player2.slug}`,
				"mainEntity": [
					{
						"@type": "Person",
						"name": player1.display_name,
						"nationality": player1.country,
						"url": `https://www.tournaments.com/athletes/${player1.sport}/${player1.slug}`
					},
					{
						"@type": "Person",
						"name": player2.display_name,
						"nationality": player2.country,
						"url": `https://www.tournaments.com/athletes/${player2.sport}/${player2.slug}`
					}
				]
			})}</script>`}

		{/if}
	</div>
</div>
