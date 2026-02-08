import { supabase } from '$lib/supabase';
import { getSportIntro } from '$lib/data/sportIntros';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Player, Tournament, NewsArticle } from '$lib/types';

export const load: PageServerLoad = async ({ params }) => {
	const sport = params.sport?.toLowerCase();
	
	if (!sport) {
		throw error(404, 'Sport not found');
	}

	// Get sport intro data
	const sportIntro = getSportIntro(sport);
	if (!sportIntro) {
		throw error(404, 'Sport not found');
	}

	try {
		// Get athletes/players for this sport
		const { data: athletes, error: athletesError } = await supabase
			.from('players')
			.select('*')
			.eq('is_active', true)
			.eq('primary_game', sportIntro.title.split(' - ')[0] || sportIntro.sport) // Use the sport name from title
			.order('total_winnings', { ascending: false })
			.limit(10);

		// Get recent articles about this sport
		const { data: articles, error: articlesError } = await supabase
			.from('news_articles')
			.select('*')
			.eq('is_published', true)
			.ilike('category', `%${sportIntro.sport}%`)
			.order('published_at', { ascending: false })
			.limit(6);

		// Get tournaments for this sport
		const { data: tournaments, error: tournamentsError } = await supabase
			.from('tournaments')
			.select('*')
			.eq('game', sportIntro.title.split(' - ')[0] || sportIntro.sport)
			.in('status', ['upcoming', 'live'])
			.order('date', { ascending: true })
			.limit(8);

		// Handle errors gracefully - don't fail the page if one query fails
		if (athletesError) console.warn('Athletes query failed:', athletesError);
		if (articlesError) console.warn('Articles query failed:', articlesError);
		if (tournamentsError) console.warn('Tournaments query failed:', tournamentsError);

		return {
			sport: sportIntro,
			athletes: athletes || [],
			articles: articles || [],
			tournaments: tournaments || []
		};
	} catch (err) {
		console.error('Error loading sport guide data:', err);
		
		// Return sport info even if database queries fail
		return {
			sport: sportIntro,
			athletes: [],
			articles: [],
			tournaments: []
		};
	}
};