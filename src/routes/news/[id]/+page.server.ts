import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function load({ params }) {
	const { id } = params;
	const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

	const { data: article } = await supabase
		.from('news_articles')
		.select('*')
		.eq('id', id)
		.eq('is_published', true)
		.single();

	// Get related articles from same sport
	let related: any[] = [];
	if (article?.sport) {
		const { data } = await supabase
			.from('news_articles')
			.select('id, title, excerpt, sport, image_url, published_at')
			.eq('is_published', true)
			.eq('sport', article.sport)
			.neq('id', id)
			.order('published_at', { ascending: false })
			.limit(4);
		related = data || [];
	}

	return {
		ssrArticle: article || null,
		ssrRelated: related
	};
}
