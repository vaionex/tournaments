<script lang="ts">
	export let size: 'sm' | 'md' | 'lg' = 'md';
	
	const sizeClasses = {
		sm: 'w-4 h-4',
		md: 'w-5 h-5',
		lg: 'w-6 h-6'
	};
	
	const iconSizes = {
		sm: 'w-2.5 h-2.5',
		md: 'w-3 h-3',
		lg: 'w-4 h-4'
	};
</script>

<div class="{sizeClasses[size]} rounded-full bg-blue-600 border-2 border-white dark:border-gray-800 flex items-center justify-center">
	<svg class="{iconSizes[size]} text-white" fill="currentColor" viewBox="0 0 20 20">
		<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
	</svg>
</div>

