<script>
  import { format, formatDistanceToNow, parseISO, isSameDay, startOfWeek, endOfWeek } from 'date-fns';
  import PageSEO from '$lib/components/seo/PageSEO.svelte';
  
  export let data;
  
  function timeAgo(date) {
    const d = new Date(date);
    return formatDistanceToNow(d, { addSuffix: true });
  }
  
  function groupTournamentsByDate(tournaments) {
    const groups = {};
    tournaments.forEach(tournament => {
      const date = tournament.start_date.split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(tournament);
    });
    return groups;
  }
  
  function getSportIcon(sport) {
    const icons = {
      'nfl': '🏈',
      'nba': '🏀',
      'mlb': '⚾',
      'nhl': '🏒',
      'soccer': '⚽',
      'tennis': '🎾',
      'golf': '⛳',
      'mma': '🥊',
      'boxing': '🥊',
      'racing': '🏎️',
      'olympics': '🏅',
      'esports': '🎮',
      'cricket': '🏏',
      'rugby': '🏉'
    };
    return icons[sport] || '🏆';
  }
  
  function getSportColor(sport) {
    const colors = {
      'nfl': 'bg-orange-600',
      'nba': 'bg-orange-500',
      'mlb': 'bg-blue-600',
      'nhl': 'bg-blue-700',
      'soccer': 'bg-green-600',
      'tennis': 'bg-green-600',
      'golf': 'bg-green-700',
      'mma': 'bg-red-700',
      'boxing': 'bg-yellow-600',
      'racing': 'bg-red-600',
      'olympics': 'bg-blue-600',
      'esports': 'bg-purple-600',
      'cricket': 'bg-green-600',
      'rugby': 'bg-green-700'
    };
    return colors[sport] || 'bg-blue-600';
  }
  
  $: weekStart = parseISO(data.weekStart);
  $: weekEnd = parseISO(data.weekEnd);
  $: tournamentsByDate = groupTournamentsByDate(data.upcomingTournaments);
</script>

<PageSEO 
  title="Sports Schedule This Week — What to Watch | Tournaments.com"
  description="Discover the most exciting sports events and tournaments happening this week. From major championships to must-see games, find out what to watch in sports."
  keywords="sports schedule, tournaments this week, sports events, what to watch sports, upcoming games"
/>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
  <!-- Hero Section -->
  <div class="relative h-64 bg-gradient-to-br from-blue-700 via-purple-700 to-blue-900 overflow-hidden">
    <div class="absolute inset-0 bg-black/20"></div>
    <div class="absolute inset-0" style="background-image: url('https://images.unsplash.com/photo-1461896836934-47e5c98aebe1?w=1920&h=300&fit=crop'); background-size: cover; background-position: center; opacity: 0.2;"></div>
    
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-full flex items-center relative z-10">
      <div class="text-white">
        <div class="flex items-center gap-3 mb-3">
          <span class="text-4xl">📅</span>
          <h1 class="text-3xl md:text-4xl font-black">What's On This Week</h1>
        </div>
        <p class="text-lg opacity-90 mb-4 max-w-2xl">
          Your complete guide to the week's most exciting sports tournaments and events
        </p>
        <div class="flex items-center gap-6 text-sm">
          <span class="flex items-center gap-2">
            <span class="text-blue-300">📅</span>
            {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
          </span>
          <span class="flex items-center gap-2">
            <span class="text-green-300">🏆</span>
            {data.upcomingTournaments.length} Tournaments
          </span>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Column -->
      <div class="lg:col-span-2 space-y-8">
        
        <!-- Featured Tournament -->
        {#if data.featuredTournament}
        <section class="card overflow-hidden">
          <div class="p-1 bg-gradient-to-r from-blue-600 to-purple-600">
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg">
              <div class="flex items-center gap-2 mb-4">
                <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-full uppercase">
                  Featured Event
                </span>
                <span class="text-2xl">{getSportIcon(data.featuredTournament.sport)}</span>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {data.featuredTournament.name}
                  </h2>
                  <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {data.featuredTournament.description || 'Major tournament featuring top competitors from around the world.'}
                  </p>
                  
                  <div class="space-y-2">
                    <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span class="text-green-600">📅</span>
                      <span class="font-semibold">Starts:</span>
                      {format(parseISO(data.featuredTournament.start_date), 'EEEE, MMM d, yyyy')}
                    </div>
                    {#if data.featuredTournament.location}
                    <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span class="text-red-600">📍</span>
                      <span class="font-semibold">Location:</span>
                      {data.featuredTournament.location}
                    </div>
                    {/if}
                    {#if data.featuredTournament.prize_money}
                    <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span class="text-yellow-600">💰</span>
                      <span class="font-semibold">Prize:</span>
                      {data.featuredTournament.prize_money}
                    </div>
                    {/if}
                  </div>
                  
                  <a href="/tournaments/{data.featuredTournament.id}" 
                     class="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                    View Tournament
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
                
                {#if data.featuredTournament.image}
                <div class="hidden md:block">
                  <img 
                    src={data.featuredTournament.image} 
                    alt={data.featuredTournament.name}
                    class="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                {/if}
              </div>
            </div>
          </div>
        </section>
        {/if}

        <!-- Weekly Schedule -->
        <section class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span class="text-3xl">🗓️</span>
              Weekly Schedule
            </h2>
            <a href="/tournaments" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm">
              All Tournaments →
            </a>
          </div>
          
          {#if Object.keys(tournamentsByDate).length === 0}
            <div class="card p-8 text-center">
              <div class="text-6xl mb-4">🏆</div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Major Tournaments This Week
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                Check back soon for upcoming tournaments and events.
              </p>
              <a href="/tournaments" class="inline-block mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                View All Tournaments
              </a>
            </div>
          {:else}
            {#each Object.entries(tournamentsByDate) as [date, tournaments]}
              <div class="card p-6">
                <div class="border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                    {format(parseISO(date), 'EEEE, MMMM d')}
                  </h3>
                  <p class="text-sm text-gray-500">
                    {tournaments.length} event{tournaments.length !== 1 ? 's' : ''}
                  </p>
                </div>
                
                <div class="space-y-4">
                  {#each tournaments as tournament}
                    <div class="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-all">
                      <div class="flex-shrink-0">
                        <div class="w-12 h-12 {getSportColor(tournament.sport)} rounded-lg flex items-center justify-center text-white text-xl">
                          {getSportIcon(tournament.sport)}
                        </div>
                      </div>
                      
                      <div class="flex-1 min-w-0">
                        <h4 class="font-bold text-gray-900 dark:text-white mb-1">
                          {tournament.name}
                        </h4>
                        <p class="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                          {tournament.description || `${tournament.sport.toUpperCase()} tournament featuring top competitors.`}
                        </p>
                        
                        <div class="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                          <span class="flex items-center gap-1">
                            <span class="uppercase font-semibold text-blue-600">{tournament.sport}</span>
                          </span>
                          {#if tournament.location}
                            <span class="flex items-center gap-1">
                              📍 {tournament.location}
                            </span>
                          {/if}
                          <span class="flex items-center gap-1">
                            📅 {format(parseISO(tournament.start_date), 'h:mm a')}
                          </span>
                        </div>
                      </div>
                      
                      <div class="flex-shrink-0">
                        <a href="/tournaments/{tournament.id}" 
                           class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors">
                          Details
                        </a>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            {/each}
          {/if}
        </section>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Hot Articles -->
        <section class="card p-6">
          <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span class="text-2xl">🔥</span>
            Hot This Week
          </h3>
          
          {#if data.recentArticles.length === 0}
            <p class="text-gray-500 text-sm">No recent articles available.</p>
          {:else}
            <div class="space-y-4">
              {#each data.recentArticles as article}
                <a href="/news/{article.id}" class="group block">
                  <article class="flex gap-3">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      class="w-16 h-16 object-cover rounded-lg flex-shrink-0 group-hover:opacity-80 transition-opacity"
                    />
                    <div class="flex-1 min-w-0">
                      <h4 class="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h4>
                      <div class="flex items-center gap-2 mt-1">
                        <span class="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold uppercase rounded">
                          {article.sport || article.category}
                        </span>
                        <span class="text-xs text-gray-500">
                          {timeAgo(article.date)}
                        </span>
                      </div>
                    </div>
                  </article>
                </a>
              {/each}
            </div>
            
            <a href="/news" class="inline-flex items-center gap-1 mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm">
              All News
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          {/if}
        </section>

        <!-- Sports Quick Links -->
        <section class="card p-6">
          <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-4">Sports</h3>
          <div class="grid grid-cols-2 gap-2">
            {#each ['nfl', 'nba', 'mlb', 'nhl', 'soccer', 'tennis'] as sport}
              <a href="/{sport}/home" class="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group">
                <span class="text-lg">{getSportIcon(sport)}</span>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 capitalize">
                  {sport === 'nfl' ? 'NFL' : sport === 'nba' ? 'NBA' : sport === 'mlb' ? 'MLB' : sport === 'nhl' ? 'NHL' : sport}
                </span>
              </a>
            {/each}
          </div>
        </section>

        <!-- Weekend Highlights -->
        <section class="card p-6">
          <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-4">This Weekend</h3>
          <div class="space-y-3">
            <div class="p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-lg">🏈</span>
                <span class="font-semibold text-sm text-gray-900 dark:text-white">NFL Games</span>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-300">Check out this weekend's biggest matchups</p>
            </div>
            
            <div class="p-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-lg">⚽</span>
                <span class="font-semibold text-sm text-gray-900 dark:text-white">Soccer Matches</span>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-300">Premier League and international fixtures</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</div>

<style>
  .card {
    @apply bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700;
  }
</style>