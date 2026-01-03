<script lang="ts">
	export let rank: number;
	export let size: 'sm' | 'md' | 'lg' = 'md';
	
	const sizeClasses = {
		sm: 'w-6 h-6 text-xs',
		md: 'w-7 h-7 text-xs',
		lg: 'w-8 h-8 text-sm'
	};
</script>

<div class="{sizeClasses[size]} rounded-full bg-yellow-400 border-2 border-white dark:border-gray-800 shadow-lg flex items-center justify-center">
	<span class="font-black text-gray-900">#{rank}</span>
</div>

