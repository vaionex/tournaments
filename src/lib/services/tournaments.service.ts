/**
 * Tournament Service
 * Handles all tournament-related data operations using Supabase
 * 
 * Currently uses mock data - to switch to real Supabase:
 * 1. Ensure supabase client is configured with real credentials
 * 2. Remove USE_MOCK_DATA flag or set to false
 * 3. Ensure database tables are created and seeded
 */

import type { Tournament, TournamentResult, TournamentParticipant, TournamentFilters, PaginatedResponse } from '$lib/types';
import { supabase } from '$lib/supabase';
import { simulateDelay } from './api';

// Toggle this to switch between mock and real data
const USE_MOCK_DATA = false;

// ============================================
// MOCK DATA GENERATORS
// ============================================

const GAMES = [
	'Tennis', 'Golf', 'Football', 'Basketball', 'Baseball', 'Volleyball', 'Table Tennis',
	'League of Legends', 'Chess', 'Fortnite', 'Valorant', 'CS:GO', 'Rocket League'
];

const PLATFORMS = ['Battlefy', 'Start.gg', 'Challonge', 'Chess.com', 'USTA', 'PGA', 'Local'];
const LOCATIONS = ['Online', 'New York', 'Los Angeles', 'Chicago', 'London', 'Berlin', 'Miami', 'Austin'];

function generateMockTournaments(count: number): Tournament[] {
	return Array.from({ length: count }, (_, i) => ({
		id: String(i + 1),
		name: `${GAMES[i % GAMES.length]} Tournament #${i + 1}`,
		game: GAMES[i % GAMES.length],
		date: new Date(2025, 0, 15 + i).toISOString().split('T')[0],
		prizePool: `$${(Math.random() * 200000 + 5000).toFixed(0)}`,
		entryFee: i % 3 === 0 ? 'Free' : `$${(Math.random() * 75 + 10).toFixed(0)}`,
		platform: PLATFORMS[i % PLATFORMS.length],
		location: LOCATIONS[i % LOCATIONS.length],
		status: i % 4 === 0 ? 'live' : 'upcoming' as const
	}));
}

// ============================================
// DATABASE QUERY HELPERS
// ============================================

/**
 * Transform database row to application Tournament type
 */
function transformTournament(row: Record<string, unknown>): Tournament {
	return {
		id: row.id as string,
		name: row.name as string,
		game: row.game as string,
		date: (row.date as string)?.split('T')[0] || (row.date as string),
		prizePool: `$${(row.prize_pool as number || 0).toLocaleString()}`,
		entryFee: row.entry_fee ? `$${row.entry_fee}` : 'Free',
		platform: row.platform as string,
		location: row.location as string,
		status: (() => {
			const now = new Date();
			const startDate = new Date(row.date as string);
			const endDate = row.end_date ? new Date(row.end_date as string) : null;
			if (endDate && now >= startDate && now <= endDate) return 'live' as const;
			if (now > (endDate || startDate)) return 'completed' as const;
			return 'upcoming' as const;
		})(),
		description: row.description as string | undefined,
		rules: row.rules as string[] | undefined,
		prizeBreakdown: row.prize_breakdown as Tournament['prizeBreakdown'],
		registeredPlayers: row.registered_players as number | undefined,
		maxPlayers: row.max_players as number | undefined,
		participants: row.registered_players as number | undefined,
		joinable: !(row.is_verified as boolean),
		recentGrowth: row.recent_growth as string | undefined,
		image: row.image_url as string | undefined
	};
}

// ============================================
// SERVICE METHODS
// ============================================

/**
 * Fetch all tournaments with optional filtering and pagination
 */
export async function getTournaments(
	filters: TournamentFilters = {},
	page: number = 1,
	itemsPerPage: number = 12
): Promise<PaginatedResponse<Tournament>> {
	if (USE_MOCK_DATA) {
		await simulateDelay();
		let tournaments = generateMockTournaments(50);

		if (filters.search) {
			const query = filters.search.toLowerCase();
			tournaments = tournaments.filter(t =>
				t.name.toLowerCase().includes(query) ||
				t.game.toLowerCase().includes(query)
			);
		}
		if (filters.game) tournaments = tournaments.filter(t => t.game === filters.game);
		if (filters.location) tournaments = tournaments.filter(t => t.location === filters.location);
		if (filters.status) tournaments = tournaments.filter(t => t.status === filters.status);

		const totalItems = tournaments.length;
		const totalPages = Math.ceil(totalItems / itemsPerPage);
		const startIndex = (page - 1) * itemsPerPage;
		const paginatedData = tournaments.slice(startIndex, startIndex + itemsPerPage);

		return { data: paginatedData, pagination: { currentPage: page, totalPages, totalItems, itemsPerPage } };
	}

	// Real Supabase query
	let query = supabase
		.from('tournaments')
		.select('*', { count: 'exact' });

	if (filters.search) {
		query = query.ilike('name', `%${filters.search}%`);
	}
	if (filters.game) {
		query = query.eq('game', filters.game);
	}
	if (filters.location) {
		query = query.eq('location', filters.location);
	}
	if (filters.status) {
		query = query.eq('status', filters.status);
	}

	const from = (page - 1) * itemsPerPage;
	const to = from + itemsPerPage - 1;

	const { data, error, count } = await query
		.order('date', { ascending: true })
		.range(from, to);

	if (error) {
		console.error('Error fetching tournaments:', error);
		return { data: [], pagination: { currentPage: page, totalPages: 0, totalItems: 0, itemsPerPage } };
	}

	const totalItems = count || 0;
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	return {
		data: (data || []).map(transformTournament),
		pagination: { currentPage: page, totalPages, totalItems, itemsPerPage }
	};
}

/**
 * Fetch top tournaments by prize pool
 */
export async function getTopTournaments(limit: number = 3): Promise<Tournament[]> {
	if (USE_MOCK_DATA) {
		await simulateDelay(300);
		return [
			{ id: '1', name: 'Grand Slam Tennis Championship', game: 'Tennis', date: new Date(2025, 2, 15).toISOString().split('T')[0], prizePool: '$250,000', entryFee: '$50', platform: 'USTA', location: 'New York', status: 'upcoming', participants: 512 },
			{ id: '2', name: 'World Golf Masters', game: 'Golf', date: new Date(2025, 2, 20).toISOString().split('T')[0], prizePool: '$180,000', entryFee: '$75', platform: 'PGA', location: 'Los Angeles', status: 'upcoming', participants: 256 },
			{ id: '3', name: 'League of Legends Championship', game: 'League of Legends', date: new Date(2025, 2, 25).toISOString().split('T')[0], prizePool: '$150,000', entryFee: 'Free', platform: 'Battlefy', location: 'Online', status: 'live', participants: 1024 }
		].slice(0, limit);
	}

	const { data, error } = await supabase
		.from('tournaments')
		.select('*')
		.gte('date', new Date().toISOString().split('T')[0])
		.order('prize_pool', { ascending: false })
		.limit(limit);

	if (error) {
		console.error('Error fetching top tournaments:', error);
		return [];
	}

	return (data || []).map(transformTournament);
}

/**
 * Fetch most popular tournaments by participants
 */
export async function getMostPopularTournaments(limit: number = 3): Promise<Tournament[]> {
	if (USE_MOCK_DATA) {
		await simulateDelay(300);
		return [
			{ id: '4', name: 'Fortnite Battle Royale', game: 'Fortnite', date: new Date(2025, 1, 28).toISOString().split('T')[0], prizePool: '$75,000', entryFee: 'Free', platform: 'Battlefy', location: 'Online', status: 'live', participants: 2048 },
			{ id: '5', name: 'Valorant Open Tournament', game: 'Valorant', date: new Date(2025, 2, 5).toISOString().split('T')[0], prizePool: '$60,000', entryFee: '$25', platform: 'Start.gg', location: 'Online', status: 'upcoming', participants: 1536 },
			{ id: '6', name: 'CS:GO Pro League', game: 'CS:GO', date: new Date(2025, 2, 10).toISOString().split('T')[0], prizePool: '$90,000', entryFee: '$30', platform: 'Battlefy', location: 'Berlin', status: 'upcoming', participants: 1280 }
		].slice(0, limit);
	}

	const { data, error } = await supabase
		.from('tournaments')
		.select('*')
		.gte('date', new Date().toISOString().split('T')[0])
		.order('registered_players', { ascending: false })
		.limit(limit);

	if (error) {
		console.error('Error fetching popular tournaments:', error);
		return [];
	}

	return (data || []).map(transformTournament);
}

/**
 * Fetch trending tournaments
 */
export async function getTrendingTournaments(limit: number = 3): Promise<Tournament[]> {
	if (USE_MOCK_DATA) {
		await simulateDelay(300);
		return [
			{ id: '7', name: 'Rocket League Spring Cup', game: 'Rocket League', date: new Date(2025, 1, 20).toISOString().split('T')[0], prizePool: '$45,000', entryFee: 'Free', platform: 'Challonge', location: 'Online', status: 'live', recentGrowth: '+45%' },
			{ id: '8', name: 'Chess Grandmaster Challenge', game: 'Chess', date: new Date(2025, 2, 1).toISOString().split('T')[0], prizePool: '$30,000', entryFee: '$20', platform: 'Chess.com', location: 'Online', status: 'upcoming', recentGrowth: '+38%' },
			{ id: '9', name: 'Table Tennis Championship', game: 'Table Tennis', date: new Date(2025, 2, 8).toISOString().split('T')[0], prizePool: '$25,000', entryFee: '$15', platform: 'Local', location: 'Chicago', status: 'upcoming', recentGrowth: '+32%' }
		].slice(0, limit);
	}

	const { data, error } = await supabase
		.from('tournaments')
		.select('*')
		.eq('is_featured', true)
		.order('created_at', { ascending: false })
		.limit(limit);

	if (error) {
		console.error('Error fetching trending tournaments:', error);
		return [];
	}

	return (data || []).map(transformTournament);
}

/**
 * Fetch upcoming tournaments for homepage sidebar
 */
export async function getUpcomingTournaments(limit: number = 5): Promise<Tournament[]> {
	if (USE_MOCK_DATA) {
		await simulateDelay(300);
		return [
			{ id: '1', name: 'Tennis Open Championship 2025', game: 'Tennis', date: '2025-01-15', prizePool: '$250,000', entryFee: '$50', platform: 'USTA', location: 'New York', status: 'upcoming', registeredPlayers: 128 },
			{ id: '2', name: 'Golf Masters Tournament', game: 'Golf', date: '2025-01-20', prizePool: '$150,000', entryFee: '$75', platform: 'PGA', location: 'Augusta', status: 'upcoming', registeredPlayers: 96 },
			{ id: '3', name: 'Football Youth League', game: 'Football', date: '2025-02-01', prizePool: '$25,000', entryFee: 'Free', platform: 'Local', location: 'Chicago', status: 'upcoming', registeredPlayers: 256 },
			{ id: '4', name: 'Basketball 3v3 Championship', game: 'Basketball', date: '2025-01-12', prizePool: '$15,000', entryFee: '$20', platform: 'Local', location: 'Los Angeles', status: 'upcoming', registeredPlayers: 64 },
			{ id: '5', name: 'League of Legends Winter Championship', game: 'League of Legends', date: '2025-01-18', prizePool: '$50,000', entryFee: '$25', platform: 'Battlefy', location: 'Online', status: 'upcoming', registeredPlayers: 128 }
		].slice(0, limit);
	}

	// Date-based logic: upcoming = date >= today, live = date <= today && end_date >= today
	const now = new Date().toISOString();
	const todayStr = new Date().toISOString().split('T')[0];

	// Fetch all future tournaments (date >= today), regardless of status field
	const { data, error } = await supabase
		.from('tournaments')
		.select('*')
		.gte('date', todayStr)
		.order('date', { ascending: true })
		.limit(limit);

	if (error) {
		console.error('Error fetching upcoming tournaments:', error);
		return [];
	}

	return (data || []).map(transformTournament);
}

/**
 * Fetch a single tournament by ID
 */
export async function getTournamentById(id: string): Promise<Tournament | null> {
	if (USE_MOCK_DATA) {
		await simulateDelay();
		return {
			id,
			name: 'Tennis Open Championship 2025',
			game: 'Tennis',
			date: '2025-01-15',
			prizePool: '$250,000',
			entryFee: '$50',
			platform: 'USTA',
			location: 'New York',
			status: 'upcoming',
			joinable: false,
			description: 'The premier tennis tournament featuring top players from around the world. Compete for glory and a share of the $250,000 prize pool.',
			rules: [
				'Best of 3 format for all matches',
				'Double elimination bracket',
				'No account sharing allowed',
				'Must be ranked Diamond or above',
				'All matches will be streamed live',
				'Check-in required 30 minutes before start'
			],
			prizeBreakdown: [
				{ place: 1, prize: '$25,000' },
				{ place: 2, prize: '$15,000' },
				{ place: 3, prize: '$7,500' },
				{ place: 4, prize: '$2,500' }
			],
			registeredPlayers: 128,
			maxPlayers: 256
		};
	}

	const { data, error } = await supabase
		.from('tournaments')
		.select('*')
		.eq('id', id)
		.single();

	if (error) {
		console.error('Error fetching tournament:', error);
		return null;
	}

	return data ? transformTournament(data) : null;
}

/**
 * Fetch tournament participants
 */
export async function getTournamentParticipants(tournamentId: string): Promise<TournamentParticipant[]> {
	if (USE_MOCK_DATA) {
		await simulateDelay(300);
		return [
			{ id: '1', name: 'Team Alpha', rank: 'Diamond I' },
			{ id: '2', name: 'Team Beta', rank: 'Master' },
			{ id: '3', name: 'Team Gamma', rank: 'Diamond II' },
			{ id: '4', name: 'Team Delta', rank: 'Grandmaster' }
		];
	}

	const { data, error } = await supabase
		.from('tournament_participants')
		.select(`
			id,
			team_name,
			profiles:player_id (
				username,
				display_name,
				current_rank
			)
		`)
		.eq('tournament_id', tournamentId);

	if (error) {
		console.error('Error fetching participants:', error);
		return [];
	}

	return (data || []).map((p: Record<string, unknown>) => ({
		id: p.id as string,
		name: (p.team_name as string) || ((p.profiles as Record<string, unknown>)?.display_name as string) || 'Unknown',
		rank: String((p.profiles as Record<string, unknown>)?.current_rank || 'Unranked')
	}));
}

/**
 * Fetch tournament results (for completed tournaments)
 */
export async function getTournamentResults(tournamentId: string): Promise<TournamentResult[]> {
	if (USE_MOCK_DATA) {
		await simulateDelay(300);
		return [
			{ rank: 1, player: 'Team Alpha', prize: '$25,000', verified: true },
			{ rank: 2, player: 'Team Beta', prize: '$15,000', verified: true },
			{ rank: 3, player: 'Team Gamma', prize: '$7,500', verified: true },
			{ rank: 4, player: 'Team Delta', prize: '$2,500', verified: false }
		];
	}

	const { data, error } = await supabase
		.from('tournament_results')
		.select(`
			rank,
			prize_amount,
			prize_currency,
			is_verified,
			team_name,
			profiles:player_id (
				display_name
			)
		`)
		.eq('tournament_id', tournamentId)
		.order('rank', { ascending: true });

	if (error) {
		console.error('Error fetching results:', error);
		return [];
	}

	return (data || []).map((r: Record<string, unknown>) => ({
		rank: r.rank as number,
		player: (r.team_name as string) || ((r.profiles as Record<string, unknown>)?.display_name as string) || 'Unknown',
		prize: `${r.prize_currency || '$'}${(r.prize_amount as number || 0).toLocaleString()}`,
		verified: r.is_verified as boolean
	}));
}

/**
 * Get unique games from tournaments (for filters)
 */
export async function getUniqueGames(): Promise<string[]> {
	if (USE_MOCK_DATA) {
		return GAMES;
	}

	const { data, error } = await supabase
		.from('games')
		.select('name')
		.eq('is_active', true)
		.order('name');

	if (error) {
		console.error('Error fetching games:', error);
		return GAMES;
	}

	return (data || []).map((g: Record<string, unknown>) => g.name as string);
}

/**
 * Get unique locations from tournaments (for filters)
 */
export async function getUniqueLocations(): Promise<string[]> {
	if (USE_MOCK_DATA) {
		return LOCATIONS;
	}

	const { data, error } = await supabase
		.from('tournaments')
		.select('location');

	if (error) {
		console.error('Error fetching locations:', error);
		return LOCATIONS;
	}

	const locations = [...new Set((data || []).map((t: Record<string, unknown>) => t.location as string))];
	return locations.sort();
}

/**
 * Get game image URL
 */
export function getGameImage(game: string): string {
	const gameImages: Record<string, string> = {
		'Tennis': 'https://images.unsplash.com/photo-1622163642998-8ea1c757b33e?w=1200',
		'Golf': 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200',
		'Football': 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200',
		'Basketball': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200',
		'Baseball': 'https://images.unsplash.com/photo-1566577739112-5180d4f9390a?w=1200',
		'Volleyball': 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=1200',
		'Table Tennis': 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200',
		'League of Legends': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200',
		'Chess': 'https://images.unsplash.com/photo-1528819624765-c8f2e989bf35?w=1200',
		'Fortnite': 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200',
		'Valorant': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200'
	};
	return gameImages[game] || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200';
}

// ============================================
// TOURNAMENT NEWS & BROADCAST INFO
// ============================================

export interface TournamentNews {
	id: string;
	title: string;
	excerpt: string;
	image: string;
	date: string;
	category: string;
}

export interface BroadcastInfo {
	platform: string;
	url: string;
	icon: string;
	isLive: boolean;
	language?: string;
}

export interface TournamentSponsor {
	name: string;
	logo: string;
	tier: 'title' | 'main' | 'partner';
}

export interface TournamentSchedule {
	round: string;
	date: string;
	time: string;
	status: 'completed' | 'live' | 'upcoming';
}

/**
 * Get tournament-specific news
 */
export async function getTournamentNews(tournamentId: string, game: string): Promise<TournamentNews[]> {
	await simulateDelay(200);
	
	const newsTemplates: Record<string, TournamentNews[]> = {
		'Tennis': [
			{ id: '1', title: 'Top Seeds Confirmed for Championship Draw', excerpt: 'The tournament committee has released the official seeding with Djokovic and Alcaraz leading the pack.', image: 'https://images.unsplash.com/photo-1622163642998-8ea1c757b33e?w=400', date: '2 hours ago', category: 'Draw' },
			{ id: '2', title: 'Weather Forecast Looks Favorable', excerpt: 'Clear skies expected throughout the tournament week with temperatures around 75°F.', image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=400', date: '5 hours ago', category: 'Updates' },
			{ id: '3', title: 'Prize Money Breakdown Revealed', excerpt: 'Champions will take home a record-breaking purse this year.', image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400', date: '1 day ago', category: 'Announcement' }
		],
		'Golf': [
			{ id: '1', title: 'Course Conditions Report Released', excerpt: 'The greens are running fast at 12 on the stimpmeter with firm fairways expected.', image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400', date: '3 hours ago', category: 'Course' },
			{ id: '2', title: 'Defending Champion Returns', excerpt: 'Last year\'s winner confirms participation despite recent injury concerns.', image: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=400', date: '6 hours ago', category: 'Players' },
			{ id: '3', title: 'New Pin Positions Revealed', excerpt: 'Tournament officials have set challenging pin placements for the opening round.', image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=400', date: '1 day ago', category: 'Course' }
		],
		'Football': [
			{ id: '1', title: 'Match Schedule Finalized', excerpt: 'All group stage fixtures have been confirmed with prime time slots for marquee matchups.', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400', date: '1 hour ago', category: 'Schedule' },
			{ id: '2', title: 'Star Players Set to Feature', excerpt: 'Top international talent confirmed for this year\'s tournament.', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400', date: '4 hours ago', category: 'Players' },
			{ id: '3', title: 'VAR Technology Upgraded', excerpt: 'Latest video assistant referee technology will be used for all matches.', image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400', date: '1 day ago', category: 'Technology' }
		],
		'League of Legends': [
			{ id: '1', title: 'New Patch Notes for Tournament', excerpt: 'Riot Games releases special tournament patch with champion balancing changes.', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400', date: '30 mins ago', category: 'Patch' },
			{ id: '2', title: 'Team Rosters Locked In', excerpt: 'All participating teams have submitted their final 6-man rosters.', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400', date: '2 hours ago', category: 'Teams' },
			{ id: '3', title: 'Draft Analysis: Meta Predictions', excerpt: 'Analysts predict which champions will dominate the tournament meta.', image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=400', date: '8 hours ago', category: 'Analysis' }
		]
	};
	
	return newsTemplates[game] || [
		{ id: '1', title: 'Tournament Preview', excerpt: 'Everything you need to know about the upcoming competition.', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400', date: '2 hours ago', category: 'Preview' },
		{ id: '2', title: 'Favorites to Watch', excerpt: 'Top contenders and dark horses in this year\'s field.', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400', date: '1 day ago', category: 'Analysis' }
	];
}

/**
 * Get broadcast/streaming information
 */
export async function getBroadcastInfo(game: string): Promise<BroadcastInfo[]> {
	await simulateDelay(100);
	
	const broadcastTemplates: Record<string, BroadcastInfo[]> = {
		'Tennis': [
			{ platform: 'ESPN', url: 'https://www.espn.com/watch/', icon: '📺', isLive: true, language: 'English' },
			{ platform: 'Tennis Channel', url: 'https://www.tennischannel.com/', icon: '🎾', isLive: true, language: 'English' },
			{ platform: 'Eurosport', url: 'https://www.eurosport.com/', icon: '🌍', isLive: false, language: 'Multi' }
		],
		'Golf': [
			{ platform: 'Golf Channel', url: 'https://www.golfchannel.com/', icon: '⛳', isLive: true, language: 'English' },
			{ platform: 'CBS Sports', url: 'https://www.cbssports.com/', icon: '📺', isLive: true, language: 'English' },
			{ platform: 'Sky Sports', url: 'https://www.skysports.com/golf', icon: '☁️', isLive: false, language: 'English' }
		],
		'Football': [
			{ platform: 'ESPN+', url: 'https://plus.espn.com/', icon: '📺', isLive: true, language: 'English' },
			{ platform: 'Fox Sports', url: 'https://www.foxsports.com/', icon: '🦊', isLive: true, language: 'English' },
			{ platform: 'DAZN', url: 'https://www.dazn.com/', icon: '🎬', isLive: false, language: 'Multi' },
			{ platform: 'beIN Sports', url: 'https://www.beinsports.com/', icon: '🌐', isLive: false, language: 'Multi' }
		],
		'Basketball': [
			{ platform: 'NBA TV', url: 'https://www.nba.com/watch/', icon: '🏀', isLive: true, language: 'English' },
			{ platform: 'ESPN', url: 'https://www.espn.com/watch/', icon: '📺', isLive: true, language: 'English' },
			{ platform: 'TNT', url: 'https://www.tntdrama.com/', icon: '💥', isLive: false, language: 'English' }
		],
		'League of Legends': [
			{ platform: 'Twitch', url: 'https://www.twitch.tv/riotgames', icon: '🟣', isLive: true, language: 'English' },
			{ platform: 'YouTube Gaming', url: 'https://www.youtube.com/lolesports', icon: '🔴', isLive: true, language: 'English' },
			{ platform: 'LoL Esports', url: 'https://lolesports.com/', icon: '🎮', isLive: true, language: 'Multi' },
			{ platform: 'Bilibili', url: 'https://www.bilibili.com/', icon: '🇨🇳', isLive: false, language: 'Chinese' }
		],
		'Chess': [
			{ platform: 'Chess.com', url: 'https://www.chess.com/tv', icon: '♟️', isLive: true, language: 'English' },
			{ platform: 'Lichess', url: 'https://lichess.org/broadcast', icon: '🏰', isLive: true, language: 'Multi' },
			{ platform: 'YouTube', url: 'https://www.youtube.com/', icon: '🔴', isLive: false, language: 'English' }
		],
		'CS:GO': [
			{ platform: 'Twitch', url: 'https://www.twitch.tv/', icon: '🟣', isLive: true, language: 'English' },
			{ platform: 'HLTV', url: 'https://www.hltv.org/', icon: '🎯', isLive: true, language: 'English' },
			{ platform: 'YouTube Gaming', url: 'https://www.youtube.com/', icon: '🔴', isLive: false, language: 'Multi' }
		]
	};
	
	return broadcastTemplates[game] || [
		{ platform: 'Twitch', url: 'https://www.twitch.tv/', icon: '🟣', isLive: true, language: 'English' },
		{ platform: 'YouTube', url: 'https://www.youtube.com/', icon: '🔴', isLive: false, language: 'English' }
	];
}

/**
 * Get tournament sponsors
 */
export async function getTournamentSponsors(): Promise<TournamentSponsor[]> {
	await simulateDelay(100);
	return [
		{ name: 'Nike', logo: '✓', tier: 'title' },
		{ name: 'Red Bull', logo: '🐂', tier: 'main' },
		{ name: 'Logitech', logo: '🖱️', tier: 'main' },
		{ name: 'Intel', logo: '💻', tier: 'partner' },
		{ name: 'Monster Energy', logo: '⚡', tier: 'partner' }
	];
}

/**
 * Get tournament schedule
 */
export async function getTournamentSchedule(tournamentId: string): Promise<TournamentSchedule[]> {
	await simulateDelay(150);
	return [
		{ round: 'Qualifiers', date: 'Jan 15', time: '10:00 AM EST', status: 'completed' },
		{ round: 'Round of 64', date: 'Jan 16', time: '12:00 PM EST', status: 'completed' },
		{ round: 'Round of 32', date: 'Jan 17', time: '2:00 PM EST', status: 'live' },
		{ round: 'Round of 16', date: 'Jan 18', time: '3:00 PM EST', status: 'upcoming' },
		{ round: 'Quarterfinals', date: 'Jan 19', time: '4:00 PM EST', status: 'upcoming' },
		{ round: 'Semifinals', date: 'Jan 20', time: '5:00 PM EST', status: 'upcoming' },
		{ round: 'Finals', date: 'Jan 21', time: '7:00 PM EST', status: 'upcoming' }
	];
}
