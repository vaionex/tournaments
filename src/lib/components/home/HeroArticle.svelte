<script lang="ts">
	import { format } from 'date-fns';
	import type { NewsArticle } from '$lib/types';
	
	export let article: NewsArticle;
</script>

<div class="mb-10">
	<a 
		href="/news/{article.id}"
		class="news-card-featured block group"
	>
		<article>
			<div class="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden">
				<img 
					src={article.image} 
					alt={article.title} 
					class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
				<div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12 text-white z-10">
					<div class="flex items-center gap-3 mb-3">
						<span class="category-tag bg-red-600 text-white">
							{article.category}
						</span>
						<span class="text-sm font-medium opacity-90">
							{format(new Date(article.date), 'MMMM d, yyyy')}
						</span>
					</div>
					<h1 class="headline-hero text-white mb-4 group-hover:text-blue-300 transition-colors">
						{article.title}
					</h1>
					<p class="text-lg sm:text-xl text-gray-200 mb-4 max-w-3xl leading-relaxed">
						{article.excerpt}
					</p>
					<div class="flex items-center gap-2 text-sm font-medium text-gray-300">
						<span>By {article.author}</span>
						<span>•</span>
						<span class="flex items-center gap-1">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
							</svg>
							Read More
						</span>
					</div>
				</div>
			</div>
		</article>
	</a>
</div>
