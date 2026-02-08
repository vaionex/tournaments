import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function load({ params }) {
	const { id } = params;
	const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

	// Try fetching by ID first, then by slug
	let tournament = null;
	
	// UUID pattern check
	const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
	
	if (isUuid) {
		const { data } = await supabase
			.from('tournaments')
			.select('*')
			.eq('id', id)
			.single();
		tournament = data;
	}
	
	// If not found by ID, try slug
	if (!tournament) {
		const { data } = await supabase
			.from('tournaments')
			.select('*')
			.eq('slug', id)
			.single();
		tournament = data;
	}

	// Fetch related news articles for this tournament's sport
	let relatedNews: any[] = [];
	if (tournament?.game) {
		// Map game names to sport codes
		const gameToSport: Record<string, string> = {
			'NFL': 'nfl', 'Basketball': 'nba', 'Baseball': 'mlb', 'Hockey': 'nhl',
			'Soccer': 'soccer', 'Football': 'soccer', 'Tennis': 'tennis', 'Golf': 'golf',
			'MMA': 'mma', 'Boxing': 'boxing', 'Cricket': 'cricket', 'Rugby': 'rugby',
			'Racing': 'racing', 'Formula 1': 'racing', 'Esports': 'esports',
			'Olympics': 'olympics', 'Counter-Strike 2': 'esports', 'League of Legends': 'esports',
			'Valorant': 'esports', 'Dota 2': 'esports',
		};
		const sportCode = gameToSport[tournament.game] || tournament.game.toLowerCase();
		
		const { data: news } = await supabase
			.from('news_articles')
			.select('id, title, excerpt, image_url, published_at, sport, category')
			.eq('is_published', true)
			.eq('sport', sportCode)
			.order('published_at', { ascending: false })
			.limit(5);
		relatedNews = news || [];
	}

	// Fetch other upcoming tournaments for sidebar
	let upcomingTournaments: any[] = [];
	const today = new Date().toISOString();
	const { data: upcoming } = await supabase
		.from('tournaments')
		.select('id, name, slug, date, end_date, game, location, prize_pool, status')
		.gte('end_date', today)
		.neq('id', tournament?.id || '')
		.order('date', { ascending: true })
		.limit(5);
	upcomingTournaments = upcoming || [];

	return {
		ssrTournament: tournament,
		ssrRelatedNews: relatedNews,
		ssrUpcomingTournaments: upcomingTournaments
	};
}
