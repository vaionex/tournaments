<script lang="ts">
	import type { TournamentStatus } from '$lib/types';
	
	export let status: TournamentStatus;
	export let size: 'sm' | 'md' | 'lg' = 'md';
	
	const sizeClasses = {
		sm: 'px-2 py-0.5 text-xs',
		md: 'px-3 py-1 text-xs',
		lg: 'px-4 py-1.5 text-sm'
	};
	
	$: statusClass = (() => {
		switch (status) {
			case 'live':
				return 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/50';
			case 'upcoming':
				return 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50';
			case 'completed':
				return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700';
			case 'cancelled':
				return 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-500 border border-gray-200 dark:border-gray-700';
			default:
				return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300';
		}
	})();
	
	$: displayText = status === 'live' ? '🔴 LIVE' : status.toUpperCase();
</script>

<span class="status-badge rounded-full font-semibold uppercase tracking-wide {sizeClasses[size]} {statusClass}">
	{displayText}
</span>

