import { createClient } from '@supabase/supabase-js';

const SITE_URL = 'https://www.tournaments.com';
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function GET() {
	const supabase = createClient(SUPABASE_URL || '', SUPABASE_KEY || '');

	// Fetch all published articles
	const { data: articles } = await supabase
		.from('news_articles')
		.select('id, slug, published_at, updated_at')
		.eq('is_published', true)
		.order('published_at', { ascending: false });

	// Fetch all tournaments
	const { data: tournaments } = await supabase
		.from('tournaments')
		.select('id, slug, updated_at')
		.order('date', { ascending: false });

	const sports = ['nfl', 'nba', 'mlb', 'nhl', 'soccer', 'ncaf', 'wnba', 'tennis', 'golf', 'mma', 'boxing', 'racing', 'olympics', 'esports', 'cricket', 'rugby'];

	const today = new Date().toISOString().split('T')[0];

	// Static guide slugs
	const howToWatchGuides = [
		'super-bowl', 'nba-finals', 'world-series', 'stanley-cup-finals', 'nfl-playoffs', 
		'march-madness', 'wimbledon', 'us-open-tennis', 'french-open', 'australian-open',
		'masters-golf', 'pga-championship', 'ufc-pay-per-view', 'boxing-ppv', 'fifa-world-cup',
		'champions-league', 'premier-league', 'la-liga', 'serie-a', 'formula-1', 'nascar',
		'olympics', 'commonwealth-games', 'cricket-world-cup', 'rugby-world-cup'
	];

	// Sports overview slugs
	const sportsPages = [
		'nfl', 'nba', 'mlb', 'nhl', 'soccer', 'tennis', 'golf', 'mma', 'boxing', 
		'racing', 'olympics', 'esports', 'cricket', 'rugby'
	];

	// Historical results slugs
	const resultsPages = [
		'super-bowl-2025', 'super-bowl-2024', 'nba-finals-2025', 'nba-finals-2024',
		'world-series-2025', 'world-series-2024', 'wimbledon-2025', 'wimbledon-2024',
		'us-open-2025', 'us-open-2024', 'masters-2025', 'masters-2024', 'ufc-300',
		'olympics-2024', 'formula-1-2024', 'champions-league-2024', 'premier-league-2024',
		'nfl-playoffs-2024', 'stanley-cup-2024', 'french-open-2024', 'australian-open-2024',
		'pga-championship-2024', 'march-madness-2024', 'boxing-heavyweight-2024',
		'cricket-world-cup-2023', 'rugby-world-cup-2023', 'commonwealth-games-2022',
		'la-liga-2024', 'serie-a-2024', 'nascar-cup-2024'
	];

	let urls = `
		<url><loc>${SITE_URL}/</loc><lastmod>${today}</lastmod><changefreq>hourly</changefreq><priority>1.0</priority></url>
		<url><loc>${SITE_URL}/news</loc><lastmod>${today}</lastmod><changefreq>hourly</changefreq><priority>0.9</priority></url>
		<url><loc>${SITE_URL}/tournaments</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>
		<url><loc>${SITE_URL}/whats-on</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>
		<url><loc>${SITE_URL}/guides</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>
		<url><loc>${SITE_URL}/guides/how-to-watch</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
		<url><loc>${SITE_URL}/sports</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>
		<url><loc>${SITE_URL}/results</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>
	`;

	// Add How to Watch guide pages
	for (const guide of howToWatchGuides) {
		urls += `<url><loc>${SITE_URL}/guides/how-to-watch/${guide}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n`;
	}

	// Add sports overview pages
	for (const sport of sportsPages) {
		urls += `<url><loc>${SITE_URL}/sports/${sport}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>\n`;
	}

	// Add historical results pages
	for (const result of resultsPages) {
		urls += `<url><loc>${SITE_URL}/results/${result}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>\n`;
	}

	// Sport pages
	for (const sport of sports) {
		urls += `<url><loc>${SITE_URL}/${sport}/home</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>\n`;
	}

	// Article pages
	if (articles) {
		for (const article of articles) {
			const lastmod = (article.updated_at || article.published_at || today).split('T')[0];
			urls += `<url><loc>${SITE_URL}/news/${article.id}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>\n`;
		}
	}

	// Tournament pages
	if (tournaments) {
		for (const t of tournaments) {
			const lastmod = (t.updated_at || today).split('T')[0];
			urls += `<url><loc>${SITE_URL}/tournaments/${t.id}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>\n`;
		}
	}

	// Athlete profile pages
	const { data: athletes } = await supabase
		.from('players')
		.select('slug, sport, updated_at')
		.eq('is_published', true)
		.order('updated_at', { ascending: false });

	// Sport athlete listing pages
	const athleteSports = ['tennis', 'golf', 'soccer', 'nba', 'mlb', 'racing', 'mma', 'boxing', 'esports', 'cricket', 'rugby', 'nhl', 'olympics', 'nfl'];
	for (const s of athleteSports) {
		urls += `<url><loc>${SITE_URL}/athletes/${s}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>\n`;
	}

	if (athletes) {
		for (const a of athletes) {
			const lastmod = (a.updated_at || today).split('T')[0];
			urls += `<url><loc>${SITE_URL}/athletes/${a.sport}/${a.slug}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>\n`;
		}

		// Generate comparison pages for top athletes per sport (top 10 vs each other)
		const sportGroups: Record<string, typeof athletes> = {};
		for (const a of athletes) {
			if (!sportGroups[a.sport]) sportGroups[a.sport] = [];
			if (sportGroups[a.sport].length < 10) sportGroups[a.sport].push(a);
		}
		for (const sport of Object.keys(sportGroups)) {
			const group = sportGroups[sport];
			for (let i = 0; i < group.length; i++) {
				for (let j = i + 1; j < group.length; j++) {
					urls += `<url><loc>${SITE_URL}/athletes/compare/${group[i].slug}-vs-${group[j].slug}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>\n`;
				}
			}
		}
	}

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(sitemap.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
}
