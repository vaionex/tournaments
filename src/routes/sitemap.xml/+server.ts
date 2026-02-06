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

	let urls = `
		<url><loc>${SITE_URL}/</loc><lastmod>${today}</lastmod><changefreq>hourly</changefreq><priority>1.0</priority></url>
		<url><loc>${SITE_URL}/news</loc><lastmod>${today}</lastmod><changefreq>hourly</changefreq><priority>0.9</priority></url>
		<url><loc>${SITE_URL}/tournaments</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>
	`;

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
