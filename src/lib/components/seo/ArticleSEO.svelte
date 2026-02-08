<script lang="ts">
	import { page } from '$app/stores';
	
	export let title: string;
	export let description: string;
	export let image: string;
	export let author: string;
	export let authorId: string = '';
	export let publishedDate: Date | string;
	export let modifiedDate: Date | string | null = null;
	export let category: string;
	export let tags: string[] = [];
	export let wordCount: number = 0;
	
	// Convert date to Date object if it's a string
	$: publishedDateObj = publishedDate instanceof Date ? publishedDate : new Date(publishedDate);
	$: modifiedDateObj = modifiedDate ? (modifiedDate instanceof Date ? modifiedDate : new Date(modifiedDate)) : null;
	
	const SITE_NAME = 'Tournaments.com';
	const SITE_URL = 'https://www.tournaments.com';
	const TWITTER_HANDLE = '@tournamentscom';
	const LOGO_URL = `${SITE_URL}/logo.png`;
	
	$: canonicalUrl = `${SITE_URL}${$page.url.pathname}`;
	$: readingTime = wordCount > 0 ? Math.ceil(wordCount / 200) : 5; // Assuming 200 words per minute
	
	$: jsonLd = {
		"@context": "https://schema.org",
		"@type": "NewsArticle",
		"mainEntityOfPage": {
			"@type": "WebPage",
			"@id": canonicalUrl
		},
		"headline": title,
		"description": description,
		"image": {
			"@type": "ImageObject",
			"url": image,
			"width": 1200,
			"height": 630
		},
		"author": {
			"@type": "Person",
			"name": author,
			"url": authorId ? `${SITE_URL}/about/team` : `${SITE_URL}/about/team`
		},
		"publisher": {
			"@type": "Organization",
			"name": SITE_NAME,
			"logo": {
				"@type": "ImageObject",
				"url": LOGO_URL,
				"width": 600,
				"height": 60
			}
		},
		"datePublished": publishedDateObj.toISOString(),
		"dateModified": (modifiedDateObj || publishedDateObj).toISOString(),
		"articleSection": category,
		"keywords": tags.join(', '),
		"wordCount": wordCount || undefined,
		"timeRequired": `PT${readingTime}M`
	};
	
	$: breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{
				"@type": "ListItem",
				"position": 1,
				"name": "Home",
				"item": SITE_URL
			},
			{
				"@type": "ListItem",
				"position": 2,
				"name": "News",
				"item": `${SITE_URL}/news`
			},
			{
				"@type": "ListItem",
				"position": 3,
				"name": title,
				"item": canonicalUrl
			}
		]
	};
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title} - {SITE_NAME}</title>
	<meta name="title" content="{title} - {SITE_NAME}" />
	<meta name="description" content={description} />
	<meta name="author" content={author} />
	<meta name="keywords" content={tags.join(', ')} />
	<meta name="news_keywords" content={tags.join(', ')} />
	<link rel="canonical" href={canonicalUrl} />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="article" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={title} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:locale" content="en_US" />
	
	<!-- Article-specific Open Graph -->
	<meta property="article:published_time" content={publishedDateObj.toISOString()} />
	{#if modifiedDateObj}
		<meta property="article:modified_time" content={modifiedDateObj.toISOString()} />
	{/if}
	<meta property="article:author" content={author} />
	<meta property="article:section" content={category} />
	{#each tags as tag}
		<meta property="article:tag" content={tag} />
	{/each}
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={TWITTER_HANDLE} />
	<meta name="twitter:creator" content={TWITTER_HANDLE} />
	<meta name="twitter:url" content={canonicalUrl} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:image:alt" content={title} />
	<meta name="twitter:label1" content="Written by" />
	<meta name="twitter:data1" content={author} />
	<meta name="twitter:label2" content="Est. reading time" />
	<meta name="twitter:data2" content="{readingTime} min read" />
	
	<!-- Additional SEO -->
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
	<meta name="googlebot" content="index, follow" />
	<meta name="bingbot" content="index, follow" />
	
	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(breadcrumbJsonLd)}</script>`}
</svelte:head>

