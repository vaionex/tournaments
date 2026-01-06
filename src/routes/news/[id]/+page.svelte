<script>
	import { page } from '$app/stores';
	import { format } from 'date-fns';
	import { CommentSection } from '$lib/components/comments';
	import { ArticleSEO } from '$lib/components/seo';
	import { getNewsArticleById, getRecentNews, getArticleComments } from '$lib/services/news.service';
	import { cache } from '$lib/services/cache.service';
	
	let article = null;
	let relatedArticles = [];
	let popularArticles = [];
	let recentArticles = [];
	let comments = [];
	let loading = true;
	let hasCachedData = false;
	
	// Load article data reactively when route parameter changes
	$: if ($page.params.id) {
		loadArticle($page.params.id);
	}
	
	async function loadArticle(id, useCache = true) {
		// Check cache first
		if (useCache) {
			const cacheKey = `article-${id}`;
			const cached = cache.get(cacheKey);
			
			if (cached) {
				// Use cached data immediately (no skeleton)
				article = cached.article;
				relatedArticles = cached.relatedArticles;
				popularArticles = cached.popularArticles;
				recentArticles = cached.recentArticles;
				comments = [];
				hasCachedData = true;
				loading = false;
				
				// Fetch fresh data in background
				loadArticle(id, false);
				return;
			}
		}
		
		if (!hasCachedData) {
			loading = true;
		}
		
		try {
			// Fetch article from database
			article = await getNewsArticleById(id);
			
			if (!article) {
				// Fallback if article not found
				article = {
					id: id,
					title: 'Article Not Found',
					excerpt: 'The article you are looking for could not be found.',
					content: 'Please check the URL and try again.',
					date: new Date(),
					category: 'News',
					image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200',
					author: 'Staff',
					tags: []
				};
			} else {
				// Comments will be loaded by CommentSection component
				comments = [];
				
				// Fetch related articles
				const recent = await getRecentNews(10);
				recentArticles = recent
					.filter(a => a.id !== id)
					.slice(0, 8);
				popularArticles = recent
					.filter(a => a.id !== id)
					.slice(0, 8);
				relatedArticles = recent
					.filter(a => a.id !== id && a.category === article.category)
					.slice(0, 3);
				
				// Cache the results
				const cacheKey = `article-${id}`;
				cache.set(cacheKey, {
					article,
					relatedArticles,
					popularArticles,
					recentArticles
				}, 10 * 60 * 1000); // 10 minutes TTL for articles
			}
		} catch (error) {
			console.error('Error loading article:', error);
			article = {
				id: id,
				title: 'Error Loading Article',
				excerpt: 'There was an error loading this article.',
				content: 'Please try again later.',
				date: new Date(),
				category: 'News',
				image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200',
				author: 'Staff',
				tags: []
			};
		}
		
		loading = false;
		hasCachedData = false;
	}
	
	// Mock article data - kept as fallback (now using database)
	/* const articleData = {
		'1': {
			id: '1',
			title: 'Tennis Open Championship 2025: Record Prize Pool Announced',
			excerpt: 'The biggest tennis tournament of the year begins this weekend with over $250,000 in prizes across multiple divisions.',
			content: `The Tennis Open Championship 2025 has officially announced its record-breaking prize pool, setting a new standard for competitive tennis tournaments. With over $250,000 in total prizes across multiple divisions, this year's event promises to be the most lucrative in the tournament's history.

The championship, which begins this weekend, will feature top players from around the world competing in singles, doubles, and mixed doubles categories. Tournament director Sarah Martinez expressed excitement about the unprecedented prize structure.

"This year's prize pool represents a 40% increase from last year," Martinez said in a press conference. "We're committed to supporting competitive tennis at all levels, and this investment reflects that commitment."

The main singles division will award $100,000 to the winner, with $50,000 for the runner-up. Doubles teams will compete for a $60,000 prize pool, while the mixed doubles category offers $40,000 in total prizes.

Several top-ranked players have already confirmed their participation, including defending champion James Thompson and former world number one Maria Rodriguez. The tournament will be held at the prestigious Riverside Tennis Center, which recently underwent a $5 million renovation to accommodate the growing event.

Spectators can expect world-class facilities, including newly installed LED lighting for evening matches and expanded seating capacity for over 10,000 fans. The tournament will also feature live streaming of all matches on the official tournament website.

Registration for amateur divisions remains open until Friday, with organizers expecting over 500 participants across all categories. The tournament format includes round-robin group stages followed by knockout rounds, ensuring maximum competitive play for all participants.`,
			date: new Date('2025-01-10'),
			category: 'Tournament News',
			image: 'https://images.unsplash.com/photo-1622163642998-8ea1c757b33e?w=1200',
			author: 'Tournament Staff',
			authorAvatar: null,
			tags: ['Tennis', 'Tournament', 'Prize Pool', 'Championship']
		},
		'2': {
			id: '2',
			title: 'Golf Masters Tournament Announces Free Entry for Amateurs',
			excerpt: 'In an effort to grow the competitive golf community, organizers have removed entry fees for amateur divisions this month.',
			content: `The Golf Masters Tournament has made a groundbreaking announcement that will remove financial barriers for amateur players. Starting this month, all entry fees for amateur divisions have been eliminated, marking a significant shift in how competitive golf tournaments are structured.

Tournament organizers believe this move will encourage more players to participate and help grow the competitive golf community. "We want to make competitive golf accessible to everyone," said tournament director Michael Chen. "By removing entry fees, we're opening doors for players who might not have been able to participate otherwise."

The decision comes after extensive research showing that entry fees were a primary barrier for many potential participants. The tournament will now rely on sponsorship revenue and spectator ticket sales to cover operational costs.

Professional divisions will continue with their standard entry fees, but amateur players can now compete without any financial commitment. This includes all age groups and skill levels within the amateur category.

The tournament expects a significant increase in participation, with early registration numbers already showing a 200% increase compared to last year. Organizers have expanded the tournament schedule to accommodate the anticipated influx of players.

Several major sponsors have stepped forward to support the initiative, including leading golf equipment manufacturers and local businesses. The tournament will also feature expanded prize pools for professional divisions, funded in part by the increased sponsorship support.`,
			date: new Date('2025-01-08'),
			category: 'Announcements',
			image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200',
			author: 'Tournament Staff',
			authorAvatar: null,
			tags: ['Golf', 'Amateur', 'Free Entry', 'Tournament']
		},
		'3': {
			id: '3',
			title: 'Top Players to Watch in 2025: Tennis, Golf, and Esports',
			excerpt: 'We break down the rising stars and established champions across traditional sports and esports competing this season.',
			content: `As we dive into 2025, the competitive sports landscape is more exciting than ever. From traditional sports like tennis and golf to the rapidly growing esports scene, there are standout players making waves across all disciplines.

In tennis, keep an eye on 18-year-old prodigy Emma Chen, who has been climbing the rankings at an unprecedented pace. Her aggressive baseline play and mental toughness have drawn comparisons to Serena Williams. Meanwhile, veteran champion James Thompson continues to dominate, showing no signs of slowing down at age 32.

The golf world is witnessing the rise of several young talents, particularly 22-year-old Alex Martinez, whose precision putting has earned him three tournament wins in the past six months. On the women's side, veteran player Sarah Johnson is making a remarkable comeback after a two-year hiatus, already securing two top-five finishes this season.

Esports continues to explode in popularity, with several players becoming household names. In League of Legends, "ProGamer123" has maintained the number one ranking for eight consecutive months, while the Valorant scene has been dominated by the dynamic duo of "AceShooter" and "SniperElite."

What makes 2025 particularly interesting is the crossover between traditional sports and esports. Several professional athletes have invested in esports teams, and esports players are increasingly training with traditional sports performance coaches.

The integration of technology in training and competition is also creating new opportunities. Virtual reality training, AI-powered performance analysis, and advanced biomechanics are becoming standard tools for top competitors across all sports.`,
			date: new Date('2025-01-05'),
			category: 'Player Spotlight',
			image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200',
			author: 'Editorial Team',
			authorAvatar: null,
			tags: ['Players', 'Tennis', 'Golf', 'Esports', '2025']
		}
	}; */
	
	// Old mock comments structure (kept for reference, but now using database)
	/*
		comments = [
			{
				id: '1',
				author: 'SportsFan2024',
				avatar: null,
				content: 'This is fantastic news! Can\'t wait to see how this impacts the competitive scene. The prize pool increase is a huge step forward for the sport.',
				date: new Date(Date.now() - 3600000),
				likes: 24,
				dislikes: 2,
				isVerified: false,
				isPinned: true,
				replies: [
					{
						id: '1-1',
						author: 'TennisPro',
						avatar: null,
						content: 'I agree! This will definitely bring more talent to the sport. Already seeing more amateurs signing up for local tournaments.',
						date: new Date(Date.now() - 1800000),
						likes: 8,
						dislikes: 0,
						isVerified: true
					},
					{
						id: '1-2',
						author: 'CasualViewer',
						avatar: null,
						content: 'Does anyone know if tickets are still available? Would love to watch the finals live!',
						date: new Date(Date.now() - 900000),
						likes: 3,
						dislikes: 0,
						isVerified: false
					}
				]
			},
			{
				id: '2',
				author: 'TournamentWatcher',
				avatar: null,
				content: 'Great coverage! Would love to see more details about the schedule. When do the group stages start?',
				date: new Date(Date.now() - 7200000),
				likes: 12,
				dislikes: 1,
				isVerified: false,
				isPinned: false,
				replies: [
					{
						id: '2-1',
						author: 'TournamentsOfficial',
						avatar: null,
						content: 'Hi! The group stages begin January 15th. Full schedule available on our website. Hope to see you there!',
						date: new Date(Date.now() - 5400000),
						likes: 15,
						dislikes: 0,
						isVerified: true
					}
				]
			},
			{
				id: '3',
				author: 'CompetitivePlayer',
				avatar: null,
				content: 'As a player, I really appreciate the transparency in reporting. Keep it up! This kind of coverage helps grow our community.',
				date: new Date(Date.now() - 10800000),
				likes: 18,
				dislikes: 0,
				isVerified: true,
				isPinned: false,
				replies: []
			},
			{
				id: '4',
				author: 'NewToTennis',
				avatar: null,
				content: 'Just started playing tennis last year and articles like this make me want to compete! Are there any beginner-friendly divisions?',
				date: new Date(Date.now() - 14400000),
				likes: 9,
				dislikes: 0,
				isVerified: false,
				isPinned: false,
				replies: [
					{
						id: '4-1',
						author: 'Coach_Mike',
						avatar: null,
						content: 'Absolutely! Check out the Amateur Open division - it\'s perfect for newer players. Good luck on your tennis journey!',
						date: new Date(Date.now() - 12600000),
						likes: 6,
						dislikes: 0,
						isVerified: true
					}
				]
			},
			{
				id: '5',
				author: 'SportsAnalyst',
				avatar: null,
				content: 'The 40% increase in prize money is significant. This puts the tournament among the top-tier events. Looking forward to seeing how this affects player attendance.',
				date: new Date(Date.now() - 21600000),
				likes: 14,
				dislikes: 1,
				isVerified: false,
				isPinned: false,
				replies: []
			},
			{
				id: '6',
				author: 'LocalFan',
				avatar: null,
				content: 'So proud to have this event in our city! The renovations at Riverside Tennis Center look amazing. See you all there! 🎾',
				date: new Date(Date.now() - 28800000),
				likes: 22,
				dislikes: 0,
				isVerified: false,
				isPinned: false,
				replies: []
			}
		];
		*/
	
</script>

<ArticleSEO
	title={article?.title || 'News Article'}
	description={article?.excerpt || 'Read the latest sports news on Tournaments.com'}
	image={article?.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=630&fit=crop'}
	author={article?.author || 'Tournaments.com'}
	publishedDate={article?.date || new Date()}
	category={article?.category || 'News'}
	tags={article?.tags || []}
	wordCount={article?.content?.split(/\s+/).length || 0}
/>

{#if loading}
	<!-- Professional Skeleton Loader -->
	<div class="bg-white dark:bg-gray-900 min-h-screen">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<!-- Main Content -->
				<div class="lg:col-span-2">
					<!-- Breadcrumb -->
					<div class="flex gap-2 mb-6">
						<div class="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
						<div class="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
						<div class="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
					</div>
					
					<!-- Article Header -->
					<div class="mb-6">
						<div class="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
						<div class="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
						<div class="h-10 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
						<div class="flex gap-4">
							<div class="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
							<div class="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
						</div>
					</div>
					
					<!-- Featured Image -->
					<div class="h-[400px] bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse mb-8"></div>
					
					<!-- Article Content -->
					<div class="space-y-4">
						{#each Array(6) as _}
							<div class="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
						{/each}
						<div class="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
					</div>
				</div>
				
				<!-- Sidebar -->
				<div class="space-y-6">
					<div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
						<div class="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
						<div class="space-y-4">
							{#each Array(4) as _}
								<div class="flex gap-3">
									<div class="w-20 h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse flex-shrink-0"></div>
									<div class="flex-1 space-y-2">
										<div class="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
										<div class="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{:else if article}
	<div class="bg-white dark:bg-gray-900 min-h-screen">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 py-8">
				<!-- Main Article Content -->
				<article class="lg:col-span-2">
					<!-- Breadcrumb -->
					<nav class="pb-4" aria-label="Breadcrumb">
				<ol class="flex items-center space-x-2 text-sm">
					<li>
						<a href="/" class="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">Home</a>
					</li>
					<li class="text-gray-400 dark:text-gray-600">/</li>
					<li>
						<a href="/" class="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">News</a>
					</li>
					<li class="text-gray-400 dark:text-gray-600">/</li>
					<li class="text-gray-900 dark:text-gray-100 font-semibold truncate max-w-xs">{article.title}</li>
				</ol>
			</nav>

					<!-- Article Header Section -->
					<header class="mb-8">
				<div class="mb-4">
					<span class="category-tag bg-red-600 text-white text-sm">
						{article.category}
					</span>
				</div>
				
				<h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight mb-6">
					{article.title}
				</h1>
				
				<div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6 pb-6 border-b-2 border-gray-200 dark:border-gray-700">
					<div class="flex items-center gap-2">
						<div class="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold">
							{article.author.charAt(0).toUpperCase()}
						</div>
						<div>
							<div class="font-semibold text-gray-900 dark:text-white">{article.author}</div>
							<div class="text-xs">{format(article.date, 'MMMM d, yyyy')}</div>
						</div>
					</div>
					<div class="flex items-center gap-1">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<span>{format(article.date, 'h:mm a')}</span>
					</div>
					<div class="flex items-center gap-1">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
						</svg>
						<span>{Math.floor(Math.random() * 5000) + 1000} views</span>
					</div>
				</div>
			</header>

					<!-- Featured Image -->
					{#if article.image}
					<div class="mb-8">
				<img 
					src={article.image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200'} 
					alt={article.title}
					class="w-full h-auto rounded-2xl shadow-2xl"
					on:error={(e) => {
						e.currentTarget.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200';
					}}
				/>
					<p class="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">Photo: Tournament Staff</p>
			</div>
			{/if}

					<!-- Article Content -->
					<div class="prose prose-lg dark:prose-invert max-w-none mb-12">
				<div class="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium mb-8 border-l-4 border-red-600 pl-6 italic">
					{article.excerpt}
				</div>
				
				<div class="space-y-6 text-gray-800 dark:text-gray-200 leading-relaxed">
					{#each article.content.split('\n\n') as paragraph}
						{#if paragraph.trim()}
							<p class="text-lg leading-8">{paragraph}</p>
						{/if}
					{/each}
				</div>
			</div>

					<!-- Tags -->
					{#if article.tags && article.tags.length > 0}
				<div class="flex flex-wrap gap-2 mb-12 pb-8 border-b-2 border-gray-200 dark:border-gray-700">
					{#each article.tags as tag}
						<a 
							href="/tournaments?tag={tag.toLowerCase()}" 
							class="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-400 transition-colors"
						>
							#{tag}
						</a>
					{/each}
				</div>
			{/if}

					<!-- Share Section -->
					<div class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-12">
				<h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Share this article</h3>
				<div class="flex gap-3">
					<button class="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.953 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
						</svg>
						Share
					</button>
					<button class="flex items-center gap-2 px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors">
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
						</svg>
						Tweet
					</button>
					<button class="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg font-semibold transition-colors">
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
						</svg>
						Share
					</button>
				</div>
			</div>

					<!-- Comments Section -->
					<div class="mb-12">
						<CommentSection 
							articleId={article.id} 
							bind:comments 
							on:commentAdded={async () => {
								// Reload comments after new comment is added
								comments = await getArticleComments(article.id);
							}}
							on:replyAdded={async () => {
								// Reload comments after new reply is added
								comments = await getArticleComments(article.id);
							}}
						/>
					</div>
			</article>

			<!-- Sidebar -->
			<aside class="lg:col-span-1 space-y-8">
				<!-- Popular Articles -->
				<div class="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6">
					<h3 class="text-xl font-black text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
						Popular Articles
					</h3>
					<div class="space-y-4">
						{#each popularArticles as popular}
							<a
								href="/news/{popular.id}"
								data-sveltekit-preload-data="hover"
								class="group block"
							>
								<div class="flex gap-3">
									<div class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
										<img 
											src={popular.image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200'} 
											alt={popular.title}
											class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
											on:error={(e) => {
												e.currentTarget.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200';
											}}
										/>
									</div>
									<div class="flex-1 min-w-0">
										<h4 class="font-bold text-sm text-gray-900 dark:text-white mb-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2">
											{popular.title}
										</h4>
										<div class="text-xs text-gray-500 dark:text-gray-400">
											{format(popular.date, 'MMM d')}
										</div>
									</div>
								</div>
							</a>
						{/each}
					</div>
				</div>

				<!-- Recent Articles -->
				<div class="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6">
					<h3 class="text-xl font-black text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
						Recent Articles
					</h3>
					<div class="space-y-3">
						{#each recentArticles as recent}
							<a
								href="/news/{recent.id}"
								data-sveltekit-preload-data="hover"
								class="group block"
							>
								<h4 class="font-semibold text-sm text-gray-900 dark:text-white mb-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2">
									{recent.title}
								</h4>
								<div class="text-xs text-gray-500 dark:text-gray-400">
									{format(recent.date, 'MMM d, yyyy')}
								</div>
							</a>
						{/each}
					</div>
				</div>

				<!-- Categories -->
				<div class="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6">
					<h3 class="text-xl font-black text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
						Categories
					</h3>
					<div class="flex flex-wrap gap-2">
						<a href="/?category=Tournament News" class="px-3 py-1.5 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-400 transition-colors">
							Tournament News
						</a>
						<a href="/?category=Results" class="px-3 py-1.5 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-400 transition-colors">
							Results
						</a>
						<a href="/?category=Player Spotlight" class="px-3 py-1.5 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-400 transition-colors">
							Player Spotlight
						</a>
						<a href="/?category=Interviews" class="px-3 py-1.5 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-400 transition-colors">
							Interviews
						</a>
						<a href="/?category=Announcements" class="px-3 py-1.5 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-400 transition-colors">
							Announcements
						</a>
						<a href="/?category=Community" class="px-3 py-1.5 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-400 transition-colors">
							Community
						</a>
					</div>
				</div>

				<!-- Social Media -->
				<div class="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6">
					<h3 class="text-xl font-black text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
						Follow Us
					</h3>
					<div class="flex gap-3">
						<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors" aria-label="Follow us on Facebook">
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.953 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
							</svg>
						</a>
						<a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-10 h-10 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition-colors" aria-label="Follow us on Twitter">
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
							</svg>
						</a>
						<a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-10 h-10 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors" aria-label="Follow us on Instagram">
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
							</svg>
						</a>
						<a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors" aria-label="Subscribe on YouTube">
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
							</svg>
						</a>
					</div>
				</div>

				<!-- Related Articles -->
				{#if relatedArticles.length > 0}
					<div class="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6">
						<h3 class="text-xl font-black text-gray-900 dark:text-white mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
							Related Articles
						</h3>
						<div class="space-y-4">
							{#each relatedArticles as related}
								<a
									href="/news/{related.id}"
									data-sveltekit-preload-data="hover"
									class="group block"
								>
									<div class="flex gap-3">
										<div class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
											<img 
												src={related.image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200'} 
												alt={related.title}
												class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
												on:error={(e) => {
													e.currentTarget.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200';
												}}
											/>
										</div>
										<div class="flex-1 min-w-0">
											<h4 class="font-bold text-sm text-gray-900 dark:text-white mb-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2">
												{related.title}
											</h4>
											<div class="text-xs text-gray-500 dark:text-gray-400">
												{format(related.date, 'MMM d')}
											</div>
										</div>
									</div>
								</a>
							{/each}
						</div>
					</div>
				{/if}
			</aside>
		</div>
	</div>
	</div>
{/if}

<style>
	:global(.prose) {
		color: inherit;
	}
	
	:global(.prose p) {
		margin-top: 1.5em;
		margin-bottom: 1.5em;
	}
	
	:global(.prose strong) {
		font-weight: 700;
		color: inherit;
	}
</style>

