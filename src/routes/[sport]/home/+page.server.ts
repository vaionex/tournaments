import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function load({ params }) {
	const { sport } = params;
	const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

	// Get news articles for this sport
	const { data: articles } = await supabase
		.from('news_articles')
		.select('id, title, excerpt, content, slug, sport, image_url, author_name, published_at')
		.eq('is_published', true)
		.eq('sport', sport)
		.order('published_at', { ascending: false })
		.limit(10);

	// Get featured article
	const featured = articles && articles.length > 0 ? articles[0] : null;
	const rest = articles ? articles.slice(1) : [];

	// Get athletes for this sport (for internal linking)
	const { data: athletes } = await supabase
		.from('players')
		.select('display_name, slug, sport, country, total_wins')
		.eq('sport', sport)
		.eq('is_published', true)
		.order('total_winnings', { ascending: false })
		.limit(10);

	return {
		ssrArticles: rest,
		ssrFeatured: featured,
		ssrAthletes: athletes || [],
		sport
	};
}
