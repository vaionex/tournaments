<script lang="ts">
	import { format } from 'date-fns';
	import type { NewsArticle } from '$lib/types';
	
	export let articles: NewsArticle[];
</script>

{#if articles.length > 0}
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
		{#each articles as article (article.id)}
			<a 
				href="/news/{article.id}"
				class="group block"
			>
				<article>
					<div class="relative h-48 sm:h-56 lg:h-64 rounded-lg overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-shadow duration-300">
						<img 
							src={article.image} 
							alt={article.title} 
							class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
						/>
						<div class="absolute top-4 left-4">
							<span class="category-tag bg-blue-600 text-white">
								{article.category}
							</span>
						</div>
					</div>
					<div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
						<span>{format(new Date(article.date), 'MMM d, yyyy')}</span>
						<span>•</span>
						<span>By {article.author}</span>
					</div>
					<h3 class="news-headline text-gray-900 dark:text-white mb-2">
						{article.title}
					</h3>
					<p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
						{article.excerpt}
					</p>
				</article>
			</a>
		{/each}
	</div>
{:else}
	<div class="text-center py-12">
		<p class="text-gray-500 dark:text-gray-400">No articles found in this category.</p>
	</div>
{/if}
