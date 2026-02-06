<script lang="ts">
	import { page } from '$app/stores';
	
	export let name: string;
	export let sport: string;
	export let description: string;
	export let image: string;
	export let startDate: Date;
	export let endDate: Date;
	export let location: string | null = null;
	export let prizePool: string | null = null;
	export let status: 'upcoming' | 'live' | 'completed' = 'upcoming';
	
	const SITE_NAME = 'Tournaments.com';
	const SITE_URL = 'https://www.tournaments.com';
	const TWITTER_HANDLE = '@tournamentscom';
	
	$: canonicalUrl = `${SITE_URL}${$page.url.pathname}`;
	$: title = `${name} - ${sport} Tournament`;
	$: metaDescription = `${description}${prizePool ? ` Prize pool: ${prizePool}.` : ''}${location ? ` Location: ${location}.` : ''} Follow live scores, results, and news on ${SITE_NAME}.`;
	
	$: eventJsonLd = {
		"@context": "https://schema.org",
		"@type": "SportsEvent",
		"name": name,
		"description": description,
		"image": image,
		"url": canonicalUrl,
		"startDate": startDate.toISOString(),
		"endDate": endDate.toISOString(),
		"eventStatus": status === 'live' ? "https://schema.org/EventScheduled" : 
		               status === 'completed' ? "https://schema.org/EventEnded" : 
		               "https://schema.org/EventScheduled",
		"eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
		"location": location ? {
			"@type": "Place",
			"name": location
		} : undefined,
		"organizer": {
			"@type": "Organization",
			"name": SITE_NAME,
			"url": SITE_URL
		},
		"offers": prizePool ? {
			"@type": "Offer",
			"name": "Prize Pool",
			"price": prizePool.replace(/[^0-9]/g, ''),
			"priceCurrency": "USD"
		} : undefined,
		"sport": sport
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
				"name": "Tournaments",
				"item": `${SITE_URL}/tournaments`
			},
			{
				"@type": "ListItem",
				"position": 3,
				"name": name,
				"item": canonicalUrl
			}
		]
	};
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title} - {SITE_NAME}</title>
	<meta name="title" content="{title} - {SITE_NAME}" />
	<meta name="description" content={metaDescription} />
	<link rel="canonical" href={canonicalUrl} />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={metaDescription} />
	<meta property="og:image" content={image} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:locale" content="en_US" />
	
	<!-- Event-specific -->
	<meta property="event:start_time" content={startDate.toISOString()} />
	<meta property="event:end_time" content={endDate.toISOString()} />
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={TWITTER_HANDLE} />
	<meta name="twitter:url" content={canonicalUrl} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={metaDescription} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:label1" content="Sport" />
	<meta name="twitter:data1" content={sport} />
	{#if prizePool}
		<meta name="twitter:label2" content="Prize Pool" />
		<meta name="twitter:data2" content={prizePool} />
	{/if}
	
	<!-- Robots -->
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
	
	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(eventJsonLd)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(breadcrumbJsonLd)}</script>`}
</svelte:head>

