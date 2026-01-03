<script lang="ts">
	import { format } from 'date-fns';
	import type { NewsArticle } from '$lib/types';
	
	export let article: NewsArticle;
</script>

<div class="mb-6 sm:mb-10">
	<a 
		href="/news/{article.id}"
		class="news-card-featured block group rounded-lg sm:rounded-xl overflow-hidden"
	>
		<article>
			<div class="relative h-[280px] xs:h-[320px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
				<img 
					src={article.image} 
					alt={article.title} 
					class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
				/>
				<!-- Stronger gradient on mobile to ensure text readability -->
				<div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent sm:from-black/80 sm:via-black/40"></div>
				
				<!-- Content positioned at bottom with constrained height -->
				<div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-12 text-white z-10">
					<!-- Category and Date -->
					<div class="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
						<span class="px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold uppercase bg-red-600 text-white rounded">
							{article.category}
						</span>
						<span class="text-xs sm:text-sm font-medium opacity-90">
							{format(new Date(article.date), 'MMM d, yyyy')}
						</span>
					</div>
					
					<!-- Title - Smaller on mobile, line clamped -->
					<h1 class="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 sm:mb-3 group-hover:text-blue-300 transition-colors leading-tight line-clamp-3 sm:line-clamp-none">
						{article.title}
					</h1>
					
					<!-- Excerpt - Hidden on very small screens, truncated on mobile -->
					<p class="hidden xs:block text-sm sm:text-base md:text-lg text-gray-200 mb-2 sm:mb-4 max-w-3xl leading-relaxed line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
						{article.excerpt}
					</p>
					
					<!-- Author and Read More -->
					<div class="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-300">
						<span class="truncate max-w-[120px] sm:max-w-none">By {article.author}</span>
						<span>•</span>
						<span class="flex items-center gap-1 flex-shrink-0">
							<svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
							</svg>
							<span class="hidden xs:inline">Read More</span>
							<span class="xs:hidden">Read</span>
						</span>
					</div>
				</div>
			</div>
		</article>
	</a>
</div>
