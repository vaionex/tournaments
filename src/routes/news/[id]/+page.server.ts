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
		content: row.content as string || '',
		date: row.published_at ? new Date(row.published_at as string) : new Date(),
		category: row.category as string || 'Top Stories',
		image: row.image_url as string || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200',
		author: author.name,
		authorRole: author.role,
		authorId: author.id,
		authorInitials: author.initials,
		authorAvatar: author.avatar,
		sport: row.sport as string | undefined,
		slug: row.slug as string | undefined,
		readTime: row.read_time as number | undefined,
		tags: row.tags as string[] | undefined
	};
}

export async function load({ params }) {
	const { id } = params;
	const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

	const { data: article } = await supabase
		.from('news_articles')
		.select('*')
		.eq('id', id)
		.eq('is_published', true)
		.single();

	let related: any[] = [];
	if (article?.sport) {
		const { data } = await supabase
			.from('news_articles')
			.select('id, title, excerpt, sport, image_url, published_at, category, slug')
			.eq('is_published', true)
			.eq('sport', article.sport)
			.neq('id', id)
			.order('published_at', { ascending: false })
			.limit(4);
		related = (data || []).map(transformArticle);
	}

	// Get related athletes if article has sport
	let relatedAthletes: any[] = [];
	if (article?.sport) {
		const { data: athletes } = await supabase
			.from('players')
			.select('display_name, slug, sport, country, total_winnings')
			.eq('sport', article.sport)
			.eq('is_published', true)
			.order('total_winnings', { ascending: false })
			.limit(6);
		relatedAthletes = athletes || [];
	}

	return {
		ssrArticle: article ? transformArticle(article) : null,
		ssrRelated: related,
		ssrRelatedAthletes: relatedAthletes
	};
}
