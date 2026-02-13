import { createClient } from '@supabase/supabase-js';
import { getUpcomingFixtures, getRecentResults, getStandings, getLeagueName, SPORT_LEAGUES } from '$lib/services/sportsdb';
import { getAuthorForArticle } from '$lib/data/authors';
import { getSportFallbackImage } from '$lib/data/sport-images';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

function transformArticle(row: Record<string, unknown>) {
	const author = getAuthorForArticle(row.id as string, row.sport as string | undefined);
	return {
		id: row.id as string,
		title: row.title as string,
		excerpt: row.excerpt as string,
		content: row.content as string | undefined,
		date: row.published_at ? new Date(row.published_at as string) : new Date(),
		category: row.category as string || 'Top Stories',
		image: row.image_url as string || getSportFallbackImage(row.sport as string, row.id as string),
		author: author.name,
		authorRole: author.role,
		authorId: author.id,
		authorInitials: author.initials,
		authorAvatar: author.avatar,
		sport: row.sport as string | undefined,
		slug: row.slug as string | undefined
	};
}

export async function load({ params }) {
	const { sport } = params;
	const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

	const { data: articles } = await supabase
		.from('news_articles')
		.select('id, title, excerpt, content, slug, sport, image_url, published_at, category')
		.eq('is_published', true)
		.eq('sport', sport)
		.order('published_at', { ascending: false })
		.limit(10);

	const mapped = (articles || []).map(transformArticle);
	const featured = mapped.length > 0 ? mapped[0] : null;
	const rest = mapped.slice(1);

	const { data: athletes } = await supabase
		.from('players')
		.select('display_name, slug, sport, country, total_wins')
		.eq('sport', sport)
		.eq('is_active', true)
		.order('total_winnings', { ascending: false })
		.limit(10);

	// Fetch upcoming/ongoing tournaments from our DB
	const today = new Date().toISOString();
	const { data: tournaments } = await supabase
		.from('tournaments')
		.select('id, name, slug, game, date, end_date, location, prize_pool, status, image_url')
		.or(`game.ilike.%${sport}%`)
		.gte('end_date', today)
		.order('date', { ascending: true })
		.limit(5);

	// Fetch live data from TheSportsDB (scores, standings, fixtures)
	const hasLeague = !!SPORT_LEAGUES[sport]?.length;
	const [fixtures, results, standings] = hasLeague
		? await Promise.all([
			getUpcomingFixtures(sport),
			getRecentResults(sport),
			getStandings(sport)
		])
		: [[], [], []];

	return {
		ssrArticles: rest,
		ssrFeatured: featured,
		ssrAthletes: athletes || [],
		ssrTournaments: (tournaments || []).map(t => ({
			id: t.id,
			name: t.name,
			date: t.date,
			end_date: t.end_date,
			location: t.location,
			prize_pool: t.prize_pool,
			status: t.status
		})),
		ssrFixtures: fixtures.map(e => ({
			id: e.idEvent,
			event: e.strEvent,
			homeTeam: e.strHomeTeam,
			awayTeam: e.strAwayTeam,
			date: e.strTimestamp || e.dateEvent,
			time: e.strTime,
			venue: e.strVenue,
			league: e.strLeague,
			homeBadge: e.strHomeTeamBadge,
			awayBadge: e.strAwayTeamBadge,
			status: e.strStatus
		})),
		ssrResults: results.map(e => ({
			id: e.idEvent,
			event: e.strEvent,
			homeTeam: e.strHomeTeam,
			awayTeam: e.strAwayTeam,
			homeScore: e.intHomeScore,
			awayScore: e.intAwayScore,
			date: e.dateEvent,
			league: e.strLeague,
			homeBadge: e.strHomeTeamBadge,
			awayBadge: e.strAwayTeamBadge
		})),
		ssrStandings: standings.map(s => ({
			rank: parseInt(s.intRank),
			team: s.strTeam,
			badge: s.strBadge,
			played: parseInt(s.intPlayed),
			won: parseInt(s.intWin),
			lost: parseInt(s.intLoss),
			drawn: parseInt(s.intDraw),
			gf: parseInt(s.intGoalsFor),
			ga: parseInt(s.intGoalsAgainst),
			gd: parseInt(s.intGoalDifference),
			points: parseInt(s.intPoints),
			form: s.strForm
		})),
		ssrLeagueName: getLeagueName(sport),
		sport
	};
}
