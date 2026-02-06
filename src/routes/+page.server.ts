import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function load() {
	const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

	// Pre-load articles for SSR (Google sees content)
	const { data: articles } = await supabase
		.from('news_articles')
		.select('id, title, excerpt, content, slug, sport, image_url, author_name, published_at, source_url')
		.eq('is_published', true)
		.order('published_at', { ascending: false })
		.limit(7);

	// Pre-load upcoming tournaments
	const { data: tournaments } = await supabase
		.from('tournaments')
		.select('id, name, slug, date, end_date, location, prize_pool, image_url, status')
		.order('date', { ascending: true })
		.limit(5);

	return {
		ssrArticles: articles || [],
		ssrTournaments: tournaments || []
	};
}
