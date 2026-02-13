import { createClient } from '@supabase/supabase-js';
import { getSportFallbackImage } from '$lib/data/sport-images';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

function transformArticle(row: Record<string, unknown>) {
	return {
		id: row.id as string,
		title: row.title as string,
		excerpt: row.excerpt as string,
		date: row.published_at ? new Date(row.published_at as string) : new Date(),
		category: row.category as string || 'Top Stories',
		image: row.image_url as string || getSportFallbackImage(row.sport as string, row.id as string),
		author: 'Staff',
		sport: row.sport as string | undefined,
		slug: row.slug as string | undefined
	};
}

export async function load() {
	const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

	const { data: articles } = await supabase
		.from('news_articles')
		.select('id, title, excerpt, slug, sport, image_url, published_at, category')
		.eq('is_published', true)
		.order('published_at', { ascending: false })
		.limit(30);

	return {
		ssrArticles: (articles || []).map(transformArticle)
	};
}
