<script>
	import { format, formatDistanceToNow } from 'date-fns';
	import { goto } from '$app/navigation';
	
	export let tournament;
	
	function handleClick() {
		goto(`/tournaments/${tournament.id}`);
	}
	
	$: timeUntil = tournament.date ? formatDistanceToNow(new Date(tournament.date), { addSuffix: true }) : '';
</script>

<div
	on:click={handleClick}
	on:keydown={(e) => e.key === 'Enter' && handleClick()}
	role="button"
	tabindex="0"
	class="bento-card cursor-pointer group"
>
	<div class="flex items-start justify-between mb-4">
		<div class="flex items-center gap-3">
			<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
				{tournament.game.charAt(0)}
			</div>
			<div>
				<h3 class="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
					{tournament.name}
				</h3>
				<p class="text-gray-400 text-sm">{tournament.game}</p>
			</div>
		</div>
		<span class="px-3 py-1 rounded-full text-xs font-bold {
			tournament.status === 'live' ? 'bg-red-500/20 text-red-400 border border-red-500/50' :
			tournament.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' :
			'bg-gray-500/20 text-gray-400 border border-gray-500/50'
		}">
			{tournament.status === 'live' ? '🔴 LIVE' : tournament.status === 'upcoming' ? 'Registration Open' : 'Completed'}
		</span>
	</div>
	
	<div class="grid grid-cols-3 gap-4 mb-4">
		<div>
			<div class="text-xs text-gray-500 mb-1">Prize Pool</div>
			<div class="text-lg font-bold text-green-400">{tournament.prizePool}</div>
		</div>
		<div>
			<div class="text-xs text-gray-500 mb-1">Entry Fee</div>
			<div class="text-lg font-bold text-white">{tournament.entryFee}</div>
		</div>
		<div>
			<div class="text-xs text-gray-500 mb-1">Players</div>
			<div class="text-lg font-bold text-white">{tournament.registeredPlayers || '0'}</div>
		</div>
	</div>
	
	<div class="flex items-center justify-between pt-4 border-t border-white/10">
		<div class="text-sm text-gray-400">
			{tournament.date ? format(new Date(tournament.date), 'MMM d, yyyy') : 'TBD'}
			{#if tournament.status === 'upcoming' && timeUntil}
				<span class="ml-2">• {timeUntil}</span>
			{/if}
		</div>
		<span class="text-blue-400 font-semibold text-sm group-hover:text-blue-300 transition-colors">
			View →
		</span>
	</div>
</div>

