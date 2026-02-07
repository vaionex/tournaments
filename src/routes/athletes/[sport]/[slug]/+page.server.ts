import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function load({ params }) {
	const { sport, slug } = params;
	const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

	const { data: player } = await supabase
		.from('players')
		.select('*')
		.eq('slug', slug)
		.eq('is_published', true)
		.single();

	const { data: related } = await supabase
		.from('players')
		.select('id, display_name, slug, sport, country, current_rank, primary_game, total_winnings')
		.eq('sport', sport)
		.eq('is_published', true)
		.neq('id', player?.id || '')
		.order('current_rank', { ascending: true, nullsFirst: false })
		.limit(6);

	// Get latest news articles for this sport
	const { data: latestNews } = await supabase
		.from('news_articles')
		.select('id, title, excerpt, sport, image_url, published_at, category, slug')
		.eq('sport', sport)
		.eq('is_published', true)
		.order('published_at', { ascending: false })
		.limit(4);

	function transformArticle(row: Record<string, unknown>) {
		return {
			id: row.id as string,
			title: row.title as string,
			excerpt: row.excerpt as string,
			date: row.published_at ? new Date(row.published_at as string) : new Date(),
			category: row.category as string || 'News',
			image: row.image_url as string || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200',
			sport: row.sport as string | undefined,
			slug: row.slug as string | undefined
		};
	}

	return {
		player: player || null,
		related: related || [],
		latestNews: (latestNews || []).map(transformArticle),
		sport
	};
}
