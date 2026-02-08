import { createClient } from '@supabase/supabase-js';
import { getAuthorForArticle } from '$lib/data/authors';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

function transformArticle(row: Record<string, unknown>) {
	const author = getAuthorForArticle(row.id as string, row.sport as string | undefined);
	return {
		id: row.id as string,
		title: row.title as string,
		excerpt: row.excerpt as string,
		content: row.content as string | undefined,
		date: row.published_at ? new Date(row.published_at as string) : new Date(),
		category: row.category as string || 'Top Stories',
		image: row.image_url as string || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200',
		author: author.name,
		authorRole: author.role,
		authorId: author.id,
		authorInitials: author.initials,
		authorAvatar: author.avatar,
		sport: row.sport as string | undefined,
		slug: row.slug as string | undefined
	};
}

export async function load() {
	const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

	const { data: articles } = await supabase
		.from('news_articles')
		.select('id, title, excerpt, content, slug, sport, image_url, published_at, category')
		.eq('is_published', true)
		.order('published_at', { ascending: false })
		.limit(7);

	const today = new Date().toISOString();
	const { data: tournaments } = await supabase
		.from('tournaments')
		.select('id, name, slug, date, end_date, location, prize_pool, image_url, status, game')
		.gte('end_date', today)
		.order('date', { ascending: true })
		.limit(5);

	// Fetch top athletes for sidebar — top earners across diverse sports
	let topAthletes: Array<{id: string; displayName: string; slug: string; sport: string; image: string; country: string}> = [];
	try {
		const { data: athletes } = await supabase
			.from('players')
			.select('id, display_name, slug, sport, avatar_url, country, total_winnings')
			.eq('is_published', true)
			.eq('is_active', true)
			.order('total_winnings', { ascending: false })
			.limit(50);

		// Diversify: pick top earner per sport
		const seenSports = new Set<string>();
		const diverse: any[] = [];
		for (const a of (athletes || [])) {
			if (!seenSports.has(a.sport)) {
				seenSports.add(a.sport);
				diverse.push(a);
			}
		}
		diverse.sort((a: any, b: any) => (b.total_winnings || 0) - (a.total_winnings || 0));

		topAthletes = diverse.slice(0, 10).map((a: any) => ({
			id: a.id,
			displayName: a.display_name,
			slug: a.slug,
			sport: a.sport,
			country: a.country,
			totalWinnings: a.total_winnings || 0
		}));
	} catch (e) {
		console.error('Failed to fetch athletes:', e);
	}

	return {
		ssrArticles: (articles || []).map(transformArticle),
		ssrTournaments: tournaments || [],
		ssrTopAthletes: topAthletes
	};
}
