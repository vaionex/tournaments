<script>
	import { format } from 'date-fns';
	import { goto } from '$app/navigation';
	
	export let tournament;
	
	function handleClick() {
		goto(`/tournaments/${tournament.id}`);
	}
</script>

<div
	on:click={handleClick}
	on:keydown={(e) => e.key === 'Enter' && handleClick()}
	role="button"
	tabindex="0"
	class="card cursor-pointer group hover:scale-[1.02] transition-transform duration-300"
>
	<div class="flex justify-between items-start mb-4 gap-3">
		<h3 class="text-xl font-bold text-gray-900 dark:text-white flex-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
			{tournament.name}
		</h3>
		<span class="status-badge flex-shrink-0 {
			tournament.status === 'live' ? 'status-live' :
			tournament.status === 'upcoming' ? 'status-upcoming' :
			'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
		}">
			{tournament.status}
		</span>
	</div>
	
	<div class="flex items-center gap-2 mb-5">
		<svg class="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
		</svg>
		<p class="text-sm font-medium text-gray-600 dark:text-gray-400">{tournament.game}</p>
	</div>
	
	<div class="grid grid-cols-2 gap-4 mb-5">
		<div class="space-y-1">
			<div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">Date</div>
			<div class="font-semibold text-gray-900 dark:text-white text-sm flex items-center gap-1">
				<svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
				{format(new Date(tournament.date), 'MMM d, yyyy')}
			</div>
		</div>
		<div class="space-y-1">
			<div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">Location</div>
			<div class="font-semibold text-gray-900 dark:text-white text-sm flex items-center gap-1">
				<svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
				</svg>
				{tournament.location}
			</div>
		</div>
		<div class="space-y-1">
			<div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">Prize Pool</div>
			<div class="font-bold text-green-600 dark:text-green-400 text-base flex items-center gap-1">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				{tournament.prizePool}
			</div>
		</div>
		<div class="space-y-1">
			<div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">Entry Fee</div>
			<div class="font-semibold text-gray-900 dark:text-white text-sm">
				{tournament.entryFee}
			</div>
		</div>
	</div>
	
	<div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
		<div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
			</svg>
			<span class="font-medium">{tournament.platform}</span>
		</div>
		<span class="text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors flex items-center gap-1">
			View Details
			<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</span>
	</div>
</div>

