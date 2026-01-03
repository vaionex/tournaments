<script lang="ts">
	import { page } from '$app/stores';
	
	export let name: string;
	export let sport: string;
	export let team: string | null = null;
	export let position: string | null = null;
	export let country: string | null = null;
	export let image: string;
	export let stats: Record<string, string | number> = {};
	export let ranking: number | null = null;
	
	const SITE_NAME = 'Tournaments.com';
	const SITE_URL = 'https://tournaments.com';
	const TWITTER_HANDLE = '@tournamentscom';
	
	$: canonicalUrl = `${SITE_URL}${$page.url.pathname}`;
	$: title = `${name} Stats, News & Profile`;
	$: description = `Get the latest stats, news, and profile information for ${name}${team ? ` of ${team}` : ''}${position ? `, ${position}` : ''}. ${sport} player${ranking ? ` ranked #${ranking}` : ''} on ${SITE_NAME}.`;
	
	$: jsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		"name": name,
		"image": image,
		"url": canonicalUrl,
		"jobTitle": position || `${sport} Player`,
		"affiliation": team ? {
			"@type": "SportsTeam",
			"name": team
		} : undefined,
		"nationality": country ? {
			"@type": "Country",
			"name": country
		} : undefined,
		"sameAs": []
	};
	
	$: sportsPersonJsonLd = {
		"@context": "https://schema.org",
		"@type": "SportsPlayer",
		"name": name,
		"image": image,
		"url": canonicalUrl,
		"sport": sport,
		"memberOf": team ? {
			"@type": "SportsTeam",
			"name": team
		} : undefined
	};
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title} - {SITE_NAME}</title>
	<meta name="title" content="{title} - {SITE_NAME}" />
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="profile" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="profile:first_name" content={name.split(' ')[0]} />
	<meta property="profile:last_name" content={name.split(' ').slice(1).join(' ')} />
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={TWITTER_HANDLE} />
	<meta name="twitter:url" content={canonicalUrl} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	
	<!-- Robots -->
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
	
	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(sportsPersonJsonLd)}</script>`}
</svelte:head>

