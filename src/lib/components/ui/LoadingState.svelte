<script lang="ts">
	export let variant: 'card' | 'grid' | 'list' | 'inline' = 'card';
	export let count: number = 1;
	export let columns: number = 3;
</script>

{#if variant === 'card'}
	<div class="card animate-pulse">
		<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
		<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
	</div>
{:else if variant === 'grid'}
	<div class="grid gap-6" style="grid-template-columns: repeat({columns}, minmax(0, 1fr));">
		{#each Array(count) as _}
			<div class="card animate-pulse">
				<div class="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
				<div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
				<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
			</div>
		{/each}
	</div>
{:else if variant === 'list'}
	<div class="space-y-4">
		{#each Array(count) as _}
			<div class="animate-pulse flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
				<div class="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
				<div class="flex-1">
					<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
					<div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
				</div>
			</div>
		{/each}
	</div>
{:else if variant === 'inline'}
	<div class="animate-pulse flex items-center gap-2">
		<div class="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
		<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
	</div>
{/if}

