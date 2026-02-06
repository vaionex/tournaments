import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function load() {
	const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

	const { data: articles } = await supabase
		.from('news_articles')
		.select('id, title, excerpt, slug, sport, image_url, author_name, published_at, category')
		.eq('is_published', true)
		.order('published_at', { ascending: false })
		.limit(30);

	return {
		ssrArticles: articles || []
	};
}
