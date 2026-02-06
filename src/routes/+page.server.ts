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

export async function load() {
	const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

	const { data: articles } = await supabase
		.from('news_articles')
		.select('id, title, excerpt, content, slug, sport, image_url, published_at, category')
		.eq('is_published', true)
		.order('published_at', { ascending: false })
		.limit(7);

	const { data: tournaments } = await supabase
		.from('tournaments')
		.select('id, name, slug, date, end_date, location, prize_pool, image_url, status')
		.order('date', { ascending: true })
		.limit(5);

	return {
		ssrArticles: (articles || []).map(transformArticle),
		ssrTournaments: tournaments || []
	};
}
