<script lang="ts">
	import { page } from '$app/stores';
	
	export let title: string;
	export let description: string;
	export let image: string = 'https://tournaments.com/og-image.png';
	export let type: 'website' | 'profile' | 'article' = 'website';
	export let noindex: boolean = false;
	
	const SITE_NAME = 'Tournaments.com';
	const SITE_URL = 'https://tournaments.com';
	const TWITTER_HANDLE = '@tournamentscom';
	
	$: canonicalUrl = `${SITE_URL}${$page.url.pathname}`;
	$: fullTitle = title ? `${title} - ${SITE_NAME}` : SITE_NAME;
	
	$: jsonLd = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		"name": title,
		"description": description,
		"url": canonicalUrl,
		"isPartOf": {
			"@type": "WebSite",
			"name": SITE_NAME,
			"url": SITE_URL
		}
	};
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{fullTitle}</title>
	<meta name="title" content={fullTitle} />
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />
	
	<!-- Robots -->
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
	{/if}
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:locale" content="en_US" />
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={TWITTER_HANDLE} />
	<meta name="twitter:url" content={canonicalUrl} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	
	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

