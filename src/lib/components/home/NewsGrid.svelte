<script lang="ts">
	import { format } from 'date-fns';
	import type { NewsArticle } from '$lib/types';
	
	export let articles: NewsArticle[];
</script>

{#if articles.length > 0}
	<div class="space-y-4">
		{#each articles as article (article.id)}
			<a 
				href="/news/{article.id}"
				class="group block border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0"
			>
				<article class="flex items-start gap-4">
					<div class="flex-1 min-w-0">
						<div class="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
							<span class="px-2 py-0.5 text-[10px] font-bold uppercase bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400 rounded">
								{article.category}
							</span>
							<span>{format(new Date(article.date), 'MMM d, yyyy')}</span>
							<span>•</span>
							<span>By {article.author}</span>
						</div>
						<h3 class="text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-1">
							{article.title}
						</h3>
						<p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
							{article.excerpt}
						</p>
					</div>
				</article>
			</a>
		{/each}
	</div>
{:else}
	<div class="text-center py-12">
		<p class="text-gray-500 dark:text-gray-400">No articles found in this category.</p>
	</div>
{/if}
