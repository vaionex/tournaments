import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

function transformArticle(row: Record<string, unknown>) {
	return {
		id: row.id as string,
		title: row.title as string,
		excerpt: row.excerpt as string,
		content: row.content as string | undefined,
		date: row.published_at ? new Date(row.published_at as string) : new Date(),
		category: row.category as string || 'Top Stories',
		image: row.image_url as string || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200',
		author: 'Staff',
		sport: row.sport as string | undefined,
		slug: row.slug as string | undefined
	};
}

export async function load({ params }) {
	const { sport } = params;
	const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

	const { data: articles } = await supabase
		.from('news_articles')
		.select('id, title, excerpt, content, slug, sport, image_url, published_at, category')
		.eq('is_published', true)
		.eq('sport', sport)
		.order('published_at', { ascending: false })
		.limit(10);

	const mapped = (articles || []).map(transformArticle);
	const featured = mapped.length > 0 ? mapped[0] : null;
	const rest = mapped.slice(1);

	const { data: athletes } = await supabase
		.from('players')
		.select('display_name, slug, sport, country, total_wins')
		.eq('sport', sport)
		.eq('is_published', true)
		.order('total_winnings', { ascending: false })
		.limit(10);

	// Fetch upcoming/ongoing tournaments for this sport
	const today = new Date().toISOString();
	const { data: tournaments } = await supabase
		.from('tournaments')
		.select('id, name, slug, game, date, end_date, location, prize_pool, status, image_url')
		.or(`game.ilike.%${sport}%`)
		.gte('end_date', today)
		.order('date', { ascending: true })
		.limit(5);

	return {
		ssrArticles: rest,
		ssrFeatured: featured,
		ssrAthletes: athletes || [],
		ssrTournaments: (tournaments || []).map(t => ({
			id: t.id,
			name: t.name,
			date: t.date,
			end_date: t.end_date,
			location: t.location,
			prize_pool: t.prize_pool,
			status: t.status
		})),
		sport
	};
}
