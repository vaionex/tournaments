/**
 * Player Service
 * Handles all player-related data operations using Supabase
 * 
 * Currently uses mock data with REAL professional players and stats
 */

import type { Player, PlayerFilters, PaginatedResponse } from '$lib/types';
import { supabase } from '$lib/supabase';
import { simulateDelay } from './api';

// Toggle this to switch between mock and real data
const USE_MOCK_DATA = false;

// ============================================
// REAL PROFESSIONAL PLAYERS DATA
// ============================================

const REAL_PLAYERS: Player[] = [
	// TENNIS
	{
		id: '1',
		username: 'djaboris',
		displayName: 'Novak Djokovic',
		rank: 1,
		wins: 98,
		game: 'Tennis',
		totalWinnings: 182076113,
		winRate: 83,
		verified: true,
		image: 'https://images.unsplash.com/photo-1622163642998-8ea1c757b33e?w=400&h=400&fit=crop',
		followers: 12500000,
		recentWins: 4,
		country: 'Serbia',
		countryCode: 'RS',
		team: 'Independent',
		position: 'Singles'
	},
	{
		id: '2',
		username: 'carlitosalcaraz',
		displayName: 'Carlos Alcaraz',
		rank: 2,
		wins: 15,
		game: 'Tennis',
		totalWinnings: 34127892,
		winRate: 78,
		verified: true,
		image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=400&h=400&fit=crop',
		followers: 8200000,
		recentWins: 3,
		country: 'Spain',
		countryCode: 'ES',
		team: 'Independent',
		position: 'Singles'
	},
	{
		id: '3',
		username: 'janniksinner',
		displayName: 'Jannik Sinner',
		rank: 3,
		wins: 18,
		game: 'Tennis',
		totalWinnings: 25890234,
		winRate: 76,
		verified: true,
		image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=400&fit=crop',
		followers: 4100000,
		recentWins: 5,
		country: 'Italy',
		countryCode: 'IT',
		team: 'Independent',
		position: 'Singles'
	},
	
	// GOLF
	{
		id: '4',
		username: 'scottie_scheffler',
		displayName: 'Scottie Scheffler',
		rank: 1,
		wins: 12,
		game: 'Golf',
		totalWinnings: 62345890,
		winRate: 72,
		verified: true,
		image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&h=400&fit=crop',
		followers: 2800000,
		recentWins: 6,
		country: 'United States',
		countryCode: 'US',
		team: 'PGA Tour',
		position: 'Professional'
	},
	{
		id: '5',
		username: 'raborymcilroy',
		displayName: 'Rory McIlroy',
		rank: 2,
		wins: 25,
		game: 'Golf',
		totalWinnings: 87234567,
		winRate: 68,
		verified: true,
		image: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=400&h=400&fit=crop',
		followers: 5600000,
		recentWins: 2,
		country: 'Northern Ireland',
		countryCode: 'GB',
		team: 'PGA Tour',
		position: 'Professional'
	},
	{
		id: '6',
		username: 'jon_rahm',
		displayName: 'Jon Rahm',
		rank: 3,
		wins: 14,
		game: 'Golf',
		totalWinnings: 54890123,
		winRate: 70,
		verified: true,
		image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=400&h=400&fit=crop',
		followers: 3200000,
		recentWins: 3,
		country: 'Spain',
		countryCode: 'ES',
		team: 'LIV Golf',
		position: 'Professional'
	},

	// FOOTBALL (Soccer)
	{
		id: '7',
		username: 'leomessi',
		displayName: 'Lionel Messi',
		rank: 1,
		wins: 45,
		game: 'Football',
		totalWinnings: 130000000,
		winRate: 85,
		verified: true,
		image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop',
		followers: 503000000,
		recentWins: 8,
		country: 'Argentina',
		countryCode: 'AR',
		team: 'Inter Miami',
		position: 'Forward'
	},
	{
		id: '8',
		username: 'cristiano',
		displayName: 'Cristiano Ronaldo',
		rank: 2,
		wins: 35,
		game: 'Football',
		totalWinnings: 115000000,
		winRate: 82,
		verified: true,
		image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=400&fit=crop',
		followers: 617000000,
		recentWins: 5,
		country: 'Portugal',
		countryCode: 'PT',
		team: 'Al-Nassr',
		position: 'Forward'
	},
	{
		id: '9',
		username: 'erikienhaaland',
		displayName: 'Erling Haaland',
		rank: 3,
		wins: 12,
		game: 'Football',
		totalWinnings: 45000000,
		winRate: 79,
		verified: true,
		image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=400&fit=crop',
		followers: 38500000,
		recentWins: 4,
		country: 'Norway',
		countryCode: 'NO',
		team: 'Manchester City',
		position: 'Striker'
	},

	// BASKETBALL
	{
		id: '10',
		username: 'kingjames',
		displayName: 'LeBron James',
		rank: 1,
		wins: 4,
		game: 'Basketball',
		totalWinnings: 480000000,
		winRate: 76,
		verified: true,
		image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop',
		followers: 159000000,
		recentWins: 1,
		country: 'United States',
		countryCode: 'US',
		team: 'LA Lakers',
		position: 'Small Forward'
	},
	{
		id: '11',
		username: 'stephcurry30',
		displayName: 'Stephen Curry',
		rank: 2,
		wins: 4,
		game: 'Basketball',
		totalWinnings: 350000000,
		winRate: 78,
		verified: true,
		image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=400&h=400&fit=crop',
		followers: 52000000,
		recentWins: 1,
		country: 'United States',
		countryCode: 'US',
		team: 'Golden State Warriors',
		position: 'Point Guard'
	},
	{
		id: '12',
		username: 'giannisantetokounmpo',
		displayName: 'Giannis Antetokounmpo',
		rank: 3,
		wins: 1,
		game: 'Basketball',
		totalWinnings: 285000000,
		winRate: 74,
		verified: true,
		image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400&h=400&fit=crop',
		followers: 16500000,
		recentWins: 0,
		country: 'Greece',
		countryCode: 'GR',
		team: 'Milwaukee Bucks',
		position: 'Power Forward'
	},

	// LEAGUE OF LEGENDS
	{
		id: '13',
		username: 'faker',
		displayName: 'Faker (Lee Sang-hyeok)',
		rank: 1,
		wins: 4,
		game: 'League of Legends',
		totalWinnings: 1523982,
		winRate: 71,
		verified: true,
		image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop',
		followers: 8900000,
		recentWins: 1,
		country: 'South Korea',
		countryCode: 'KR',
		team: 'T1',
		position: 'Mid Laner'
	},
	{
		id: '14',
		username: 'caps',
		displayName: 'Caps (Rasmus Winther)',
		rank: 2,
		wins: 2,
		game: 'League of Legends',
		totalWinnings: 892345,
		winRate: 68,
		verified: true,
		image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=400&fit=crop',
		followers: 2100000,
		recentWins: 0,
		country: 'Denmark',
		countryCode: 'DK',
		team: 'G2 Esports',
		position: 'Mid Laner'
	},
	{
		id: '15',
		username: 'chovy',
		displayName: 'Chovy (Jeong Ji-hoon)',
		rank: 3,
		wins: 1,
		game: 'League of Legends',
		totalWinnings: 756890,
		winRate: 69,
		verified: true,
		image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=400&h=400&fit=crop',
		followers: 1800000,
		recentWins: 1,
		country: 'South Korea',
		countryCode: 'KR',
		team: 'Gen.G',
		position: 'Mid Laner'
	},

	// CHESS
	{
		id: '16',
		username: 'magnuscarlsen',
		displayName: 'Magnus Carlsen',
		rank: 1,
		wins: 125,
		game: 'Chess',
		totalWinnings: 8500000,
		winRate: 89,
		verified: true,
		image: 'https://images.unsplash.com/photo-1528819624765-c8f2e989bf35?w=400&h=400&fit=crop',
		followers: 4200000,
		recentWins: 8,
		country: 'Norway',
		countryCode: 'NO',
		team: 'Independent',
		position: 'Grandmaster'
	},
	{
		id: '17',
		username: 'dingliwren',
		displayName: 'Ding Liren',
		rank: 2,
		wins: 45,
		game: 'Chess',
		totalWinnings: 2890000,
		winRate: 72,
		verified: true,
		image: 'https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=400&h=400&fit=crop',
		followers: 890000,
		recentWins: 3,
		country: 'China',
		countryCode: 'CN',
		team: 'Independent',
		position: 'Grandmaster'
	},
	{
		id: '18',
		username: 'hikarunakamura',
		displayName: 'Hikaru Nakamura',
		rank: 3,
		wins: 68,
		game: 'Chess',
		totalWinnings: 3450000,
		winRate: 75,
		verified: true,
		image: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=400&h=400&fit=crop',
		followers: 3800000,
		recentWins: 5,
		country: 'United States',
		countryCode: 'US',
		team: 'Independent',
		position: 'Grandmaster'
	},

	// FORTNITE
	{
		id: '19',
		username: 'bugha',
		displayName: 'Bugha (Kyle Giersdorf)',
		rank: 1,
		wins: 12,
		game: 'Fortnite',
		totalWinnings: 3500000,
		winRate: 65,
		verified: true,
		image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=400&fit=crop',
		followers: 5600000,
		recentWins: 2,
		country: 'United States',
		countryCode: 'US',
		team: 'Sentinels',
		position: 'Battle Royale'
	},
	{
		id: '20',
		username: 'clix',
		displayName: 'Clix (Cody Conrod)',
		rank: 2,
		wins: 8,
		game: 'Fortnite',
		totalWinnings: 1890000,
		winRate: 62,
		verified: true,
		image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400&h=400&fit=crop',
		followers: 7200000,
		recentWins: 1,
		country: 'United States',
		countryCode: 'US',
		team: 'NRG',
		position: 'Battle Royale'
	},

	// VALORANT
	{
		id: '21',
		username: 'tenz',
		displayName: 'TenZ (Tyson Ngo)',
		rank: 1,
		wins: 3,
		game: 'Valorant',
		totalWinnings: 456000,
		winRate: 68,
		verified: true,
		image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop',
		followers: 3400000,
		recentWins: 1,
		country: 'Canada',
		countryCode: 'CA',
		team: 'Sentinels',
		position: 'Duelist'
	},
	{
		id: '22',
		username: 'yay',
		displayName: 'yay (Jaccob Whiteaker)',
		rank: 2,
		wins: 4,
		game: 'Valorant',
		totalWinnings: 523000,
		winRate: 71,
		verified: true,
		image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&h=400&fit=crop',
		followers: 1200000,
		recentWins: 0,
		country: 'United States',
		countryCode: 'US',
		team: 'Cloud9',
		position: 'Duelist'
	},

	// CS2 (Counter-Strike)
	{
		id: '23',
		username: 's1mple',
		displayName: 's1mple (Oleksandr Kostyliev)',
		rank: 1,
		wins: 28,
		game: 'CS:GO',
		totalWinnings: 1892345,
		winRate: 73,
		verified: true,
		image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=400&fit=crop',
		followers: 4500000,
		recentWins: 2,
		country: 'Ukraine',
		countryCode: 'UA',
		team: 'NAVI',
		position: 'AWPer'
	},
	{
		id: '24',
		username: 'zywoo',
		displayName: 'ZywOo (Mathieu Herbaut)',
		rank: 2,
		wins: 22,
		game: 'CS:GO',
		totalWinnings: 1456789,
		winRate: 70,
		verified: true,
		image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=400&h=400&fit=crop',
		followers: 2100000,
		recentWins: 3,
		country: 'France',
		countryCode: 'FR',
		team: 'Vitality',
		position: 'AWPer'
	},
	{
		id: '25',
		username: 'niko',
		displayName: 'NiKo (Nikola Kovač)',
		rank: 3,
		wins: 18,
		game: 'CS:GO',
		totalWinnings: 1234567,
		winRate: 68,
		verified: true,
		image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=400&fit=crop',
		followers: 1800000,
		recentWins: 1,
		country: 'Bosnia',
		countryCode: 'BA',
		team: 'G2 Esports',
		position: 'Rifler'
	},

	// TABLE TENNIS
	{
		id: '26',
		username: 'fanzhendong',
		displayName: 'Fan Zhendong',
		rank: 1,
		wins: 28,
		game: 'Table Tennis',
		totalWinnings: 890000,
		winRate: 85,
		verified: true,
		image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
		followers: 2300000,
		recentWins: 4,
		country: 'China',
		countryCode: 'CN',
		team: 'China National Team',
		position: 'Singles/Doubles'
	},
	{
		id: '27',
		username: 'wangchuqin',
		displayName: 'Wang Chuqin',
		rank: 2,
		wins: 18,
		game: 'Table Tennis',
		totalWinnings: 567000,
		winRate: 79,
		verified: true,
		image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
		followers: 1200000,
		recentWins: 3,
		country: 'China',
		countryCode: 'CN',
		team: 'China National Team',
		position: 'Singles'
	},

	// VOLLEYBALL
	{
		id: '28',
		username: 'earvinngapeth',
		displayName: 'Earvin N\'Gapeth',
		rank: 1,
		wins: 15,
		game: 'Volleyball',
		totalWinnings: 450000,
		winRate: 76,
		verified: true,
		image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400&h=400&fit=crop',
		followers: 890000,
		recentWins: 2,
		country: 'France',
		countryCode: 'FR',
		team: 'France National Team',
		position: 'Outside Hitter'
	},
	{
		id: '29',
		username: 'wilfredoleon',
		displayName: 'Wilfredo León',
		rank: 2,
		wins: 12,
		game: 'Volleyball',
		totalWinnings: 380000,
		winRate: 74,
		verified: true,
		image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=400&h=400&fit=crop',
		followers: 1500000,
		recentWins: 1,
		country: 'Poland',
		countryCode: 'PL',
		team: 'Poland National Team',
		position: 'Outside Hitter'
	},

	// ROCKET LEAGUE
	{
		id: '30',
		username: 'jstn',
		displayName: 'jstn. (Justin Morales)',
		rank: 1,
		wins: 8,
		game: 'Rocket League',
		totalWinnings: 1234000,
		winRate: 72,
		verified: true,
		image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=400&h=400&fit=crop',
		followers: 890000,
		recentWins: 2,
		country: 'United States',
		countryCode: 'US',
		team: 'Spacestation Gaming',
		position: 'Striker'
	},
	{
		id: '31',
		username: 'firstkiller',
		displayName: 'Firstkiller (Jason Corral)',
		rank: 2,
		wins: 6,
		game: 'Rocket League',
		totalWinnings: 856000,
		winRate: 70,
		verified: true,
		image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=400&fit=crop',
		followers: 560000,
		recentWins: 1,
		country: 'United States',
		countryCode: 'US',
		team: 'FaZe Clan',
		position: 'Striker'
	},

	// BASEBALL
	{
		id: '32',
		username: 'shikiohei',
		displayName: 'Shohei Ohtani',
		rank: 1,
		wins: 2,
		game: 'Baseball',
		totalWinnings: 700000000,
		winRate: 82,
		verified: true,
		image: 'https://images.unsplash.com/photo-1566577739112-5180d4f9390a?w=400&h=400&fit=crop',
		followers: 8500000,
		recentWins: 1,
		country: 'Japan',
		countryCode: 'JP',
		team: 'LA Dodgers',
		position: 'DH / Pitcher'
	},
	{
		id: '33',
		username: 'miketrout',
		displayName: 'Mike Trout',
		rank: 2,
		wins: 0,
		game: 'Baseball',
		totalWinnings: 426500000,
		winRate: 78,
		verified: true,
		image: 'https://images.unsplash.com/photo-1516731415730-0c607149933a?w=400&h=400&fit=crop',
		followers: 4200000,
		recentWins: 0,
		country: 'United States',
		countryCode: 'US',
		team: 'LA Angels',
		position: 'Center Field'
	},

	// DOTA 2
	{
		id: '34',
		username: 'puppey',
		displayName: 'Puppey (Clement Ivanov)',
		rank: 1,
		wins: 5,
		game: 'Dota 2',
		totalWinnings: 7845000,
		winRate: 67,
		verified: true,
		image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop',
		followers: 1200000,
		recentWins: 0,
		country: 'Estonia',
		countryCode: 'EE',
		team: 'Team Secret',
		position: 'Support'
	},
	{
		id: '35',
		username: 'n0tail',
		displayName: 'N0tail (Johan Sundstein)',
		rank: 2,
		wins: 2,
		game: 'Dota 2',
		totalWinnings: 7184411,
		winRate: 65,
		verified: true,
		image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=400&fit=crop',
		followers: 890000,
		recentWins: 0,
		country: 'Denmark',
		countryCode: 'DK',
		team: 'OG',
		position: 'Support'
	}
];

// Games list derived from players
const GAMES = [...new Set(REAL_PLAYERS.map(p => p.game))];

// Countries list derived from players
const COUNTRIES = [...new Set(REAL_PLAYERS.map(p => p.country).filter(Boolean))].sort() as string[];

// ============================================
// DATABASE QUERY HELPERS
// ============================================

function transformPlayer(row: Record<string, unknown>): Player {
	return {
		id: row.id as string,
		username: (row.player_name as string) || (row.slug as string) || '',
		displayName: (row.display_name as string) || (row.player_name as string) || '',
		rank: row.current_rank as number || 0,
		wins: row.total_wins as number || 0,
		game: row.primary_game as string || 'Unknown',
		totalWinnings: Number(row.total_winnings) || 0,
		winRate: Number(row.win_rate) || 0,
		verified: row.is_verified as boolean || false,
		avatar: row.avatar_url as string | null,
		image: row.avatar_url as string | undefined,
		followers: undefined, // Not in players table
		recentWins: undefined, // Not in players table
		country: row.country as string | undefined,
		countryCode: undefined, // Not in players table
		team: row.team_name as string | undefined,
		position: undefined // Not in players table
	};
}

// ============================================
// SERVICE METHODS
// ============================================

/**
 * Fetch all players with optional filtering and pagination
 */
export async function getPlayers(
	filters: PlayerFilters = {},
	page: number = 1,
	itemsPerPage: number = 24
): Promise<PaginatedResponse<Player>> {
	if (USE_MOCK_DATA) {
		await simulateDelay();
		let players = [...REAL_PLAYERS];

		// Assign global ranks based on total winnings
		players.sort((a, b) => b.totalWinnings - a.totalWinnings);
		players = players.map((p, i) => ({ ...p, rank: i + 1 }));

		if (filters.search) {
			const query = filters.search.toLowerCase();
			players = players.filter(p =>
				p.displayName.toLowerCase().includes(query) ||
				p.username.toLowerCase().includes(query) ||
				p.game.toLowerCase().includes(query) ||
				(p.team && p.team.toLowerCase().includes(query)) ||
				(p.country && p.country.toLowerCase().includes(query))
			);
		}
		if (filters.game) players = players.filter(p => p.game === filters.game);
		if (filters.country) players = players.filter(p => p.country === filters.country);
		if (filters.letter) {
			const letter = filters.letter.toUpperCase();
			players = players.filter(p => p.displayName.toUpperCase().startsWith(letter));
		}

		if (filters.sortBy) {
			players.sort((a, b) => {
				switch (filters.sortBy) {
					case 'rank': return a.rank - b.rank;
					case 'wins': return b.wins - a.wins;
					case 'winnings': return b.totalWinnings - a.totalWinnings;
					case 'winrate': return b.winRate - a.winRate;
					case 'name': return a.displayName.localeCompare(b.displayName);
					default: return a.rank - b.rank;
				}
			});
		}

		const totalItems = players.length;
		const totalPages = Math.ceil(totalItems / itemsPerPage);
		const startIndex = (page - 1) * itemsPerPage;
		const paginatedData = players.slice(startIndex, startIndex + itemsPerPage);

		return { data: paginatedData, pagination: { currentPage: page, totalPages, totalItems, itemsPerPage } };
	}

	// Real Supabase query - use players table for more complete data
	let query = supabase
		.from('players')
		.select('*', { count: 'exact' })
		.eq('is_active', true);

	if (filters.search) {
		query = query.or(`player_name.ilike.%${filters.search}%,display_name.ilike.%${filters.search}%`);
	}
	if (filters.game) {
		query = query.eq('primary_game', filters.game);
	}

	const sortColumn = {
		rank: 'current_rank',
		wins: 'total_wins',
		winnings: 'total_winnings',
		winrate: 'win_rate',
		name: 'player_name'
	}[filters.sortBy || 'rank'] || 'current_rank';

	const ascending = filters.sortBy === 'rank' || filters.sortBy === 'name';

	const from = (page - 1) * itemsPerPage;
	const to = from + itemsPerPage - 1;

	const { data, error, count } = await query
		.order(sortColumn, { ascending, nullsFirst: false })
		.range(from, to);

	if (error) {
		console.error('Error fetching players:', error);
		return { data: [], pagination: { currentPage: page, totalPages: 0, totalItems: 0, itemsPerPage } };
	}

	const totalItems = count || 0;
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	return {
		data: (data || []).map(transformPlayer),
		pagination: { currentPage: page, totalPages, totalItems, itemsPerPage }
	};
}

/**
 * Get stat leaders by category
 */
export async function getStatLeaders(category: 'wins' | 'winnings' | 'winrate' | 'trending', limit: number = 5): Promise<Player[]> {
	if (USE_MOCK_DATA) {
		await simulateDelay(200);
		let sorted: Player[];
		
		switch (category) {
			case 'wins':
				sorted = [...REAL_PLAYERS].sort((a, b) => b.wins - a.wins);
				break;
			case 'winnings':
				sorted = [...REAL_PLAYERS].sort((a, b) => b.totalWinnings - a.totalWinnings);
				break;
			case 'winrate':
				sorted = [...REAL_PLAYERS].sort((a, b) => b.winRate - a.winRate);
				break;
			case 'trending':
				sorted = [...REAL_PLAYERS]
					.filter(p => p.recentWins && p.recentWins > 0)
					.sort((a, b) => (b.recentWins || 0) - (a.recentWins || 0));
				break;
			default:
				sorted = [...REAL_PLAYERS].sort((a, b) => b.totalWinnings - a.totalWinnings);
		}
		
		return sorted.slice(0, limit).map((p, i) => ({ ...p, rank: i + 1 }));
	}

	const { data, error } = await supabase
		.from('players')
		.select('*')
		.eq('is_active', true)
		.order(category === 'winnings' ? 'total_winnings' : category === 'wins' ? 'total_wins' : 'win_rate', { ascending: false })
		.limit(limit);

	if (error) {
		console.error('Error fetching stat leaders:', error);
		return [];
	}

	return (data || []).map(transformPlayer);
}

/**
 * Fetch highest earning players
 */
export async function getHighestEarningPlayers(limit: number = 3): Promise<Player[]> {
	if (USE_MOCK_DATA) {
		await simulateDelay(300);
		const sorted = [...REAL_PLAYERS].sort((a, b) => b.totalWinnings - a.totalWinnings);
		return sorted.slice(0, limit).map((p, i) => ({ ...p, rank: i + 1 }));
	}

	const { data, error } = await supabase
		.from('players')
		.select('*')
		.eq('is_active', true)
		.order('total_winnings', { ascending: false })
		.limit(limit);

	if (error) {
		console.error('Error fetching highest earning players:', error);
		return [];
	}

	return (data || []).map(transformPlayer);
}

/**
 * Fetch most popular players by followers
 */
export async function getMostPopularPlayers(limit: number = 3): Promise<Player[]> {
	if (USE_MOCK_DATA) {
		await simulateDelay(300);
		const sorted = [...REAL_PLAYERS]
			.filter(p => p.followers)
			.sort((a, b) => (b.followers || 0) - (a.followers || 0));
		return sorted.slice(0, limit).map((p, i) => ({ ...p, rank: i + 1 }));
	}

	const { data, error } = await supabase
		.from('players')
		.select('*')
		.eq('is_active', true)
		.eq('is_verified', true)
		.order('total_tournaments', { ascending: false })
		.limit(limit);

	if (error) {
		console.error('Error fetching popular players:', error);
		return [];
	}

	return (data || []).map(transformPlayer);
}

/**
 * Fetch trending/rising players (most recent wins)
 */
export async function getTrendingPlayers(limit: number = 3): Promise<Player[]> {
	if (USE_MOCK_DATA) {
		await simulateDelay(300);
		const sorted = [...REAL_PLAYERS]
			.filter(p => p.recentWins && p.recentWins > 0)
			.sort((a, b) => (b.recentWins || 0) - (a.recentWins || 0));
		return sorted.slice(0, limit).map((p, i) => ({ ...p, rank: i + 1 }));
	}

	const { data, error } = await supabase
		.from('players')
		.select('*')
		.eq('is_active', true)
		.order('updated_at', { ascending: false })
		.limit(limit);

	if (error) {
		console.error('Error fetching trending players:', error);
		return [];
	}

	return (data || []).map(transformPlayer);
}

/**
 * Fetch top players for homepage (by total winnings across all sports)
 */
export async function getTopPlayers(limit: number = 8): Promise<Player[]> {
	if (USE_MOCK_DATA) {
		await simulateDelay(300);
		const sorted = [...REAL_PLAYERS].sort((a, b) => b.totalWinnings - a.totalWinnings);
		return sorted.slice(0, limit).map((p, i) => ({ ...p, rank: i + 1 }));
	}

	const { data, error } = await supabase
		.from('players')
		.select('*')
		.eq('is_active', true)
		.order('current_rank', { ascending: true, nullsFirst: false })
		.limit(limit);

	if (error) {
		console.error('Error fetching top players:', error);
		return [];
	}

	return (data || []).map(transformPlayer);
}

/**
 * Fetch a single player by username
 */
export async function getPlayerByUsername(username: string): Promise<Player | null> {
	if (USE_MOCK_DATA) {
		await simulateDelay();
		const player = REAL_PLAYERS.find(p => 
			p.username.toLowerCase() === username.toLowerCase() ||
			p.displayName.toLowerCase().includes(username.toLowerCase())
		);
		return player || null;
	}

	const { data, error } = await supabase
		.from('players')
		.select('*')
		.or(`player_name.eq.${username},slug.eq.${username}`)
		.single();

	if (error) {
		console.error('Error fetching player:', error);
		return null;
	}

	return data ? transformPlayer(data) : null;
}

/**
 * Get unique games from players (for filters)
 */
export async function getUniquePlayerGames(): Promise<string[]> {
	if (USE_MOCK_DATA) {
		return ['All Games', ...GAMES.sort()];
	}

	const { data, error } = await supabase
		.from('games')
		.select('name')
		.eq('is_active', true)
		.order('name');

	if (error) {
		console.error('Error fetching games:', error);
		return ['All Games', ...GAMES.sort()];
	}

	return ['All Games', ...(data || []).map((g: Record<string, unknown>) => g.name as string)];
}

/**
 * Get unique countries from players (for filters)
 */
export async function getUniqueCountries(): Promise<string[]> {
	if (USE_MOCK_DATA) {
		return ['All Countries', ...COUNTRIES];
	}

	return ['All Countries', ...COUNTRIES];
}

/**
 * Get players by game
 */
export async function getPlayersByGame(game: string, limit: number = 10): Promise<Player[]> {
	if (USE_MOCK_DATA) {
		await simulateDelay(300);
		const filtered = REAL_PLAYERS
			.filter(p => p.game === game)
			.sort((a, b) => b.totalWinnings - a.totalWinnings);
		return filtered.slice(0, limit).map((p, i) => ({ ...p, rank: i + 1 }));
	}

	const { data, error } = await supabase
		.from('players')
		.select('*')
		.eq('is_active', true)
		.eq('primary_game', game)
		.order('total_winnings', { ascending: false })
		.limit(limit);

	if (error) {
		console.error('Error fetching players by game:', error);
		return [];
	}

	return (data || []).map(transformPlayer);
}

/**
 * Get player news (mock for now)
 */
export async function getPlayerNews(limit: number = 5): Promise<Array<{id: string, title: string, excerpt: string, image: string, date: string, player?: string}>> {
	await simulateDelay(200);
	return [
		{
			id: '1',
			title: 'Faker Leads T1 to Worlds 2025 Victory',
			excerpt: 'The legendary mid-laner secures his 5th World Championship title.',
			image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop',
			date: '2 hours ago',
			player: 'Faker'
		},
		{
			id: '2',
			title: 'Ohtani Signs Record-Breaking Extension',
			excerpt: 'Shohei Ohtani agrees to historic 12-year contract worth $700M with the Dodgers.',
			image: 'https://images.unsplash.com/photo-1566577739112-5180d4f9390a?w=400&h=200&fit=crop',
			date: '5 hours ago',
			player: 'Shohei Ohtani'
		},
		{
			id: '3',
			title: 'Messi Announces MLS Cup Final Appearance',
			excerpt: 'Inter Miami qualifies for the championship match with Messi in stellar form.',
			image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=200&fit=crop',
			date: '1 day ago',
			player: 'Lionel Messi'
		},
		{
			id: '4',
			title: 'Magnus Carlsen Wins Rapid Chess Championship',
			excerpt: 'The Norwegian grandmaster dominates the rapid format once again.',
			image: 'https://images.unsplash.com/photo-1528819624765-c8f2e989bf35?w=400&h=200&fit=crop',
			date: '2 days ago',
			player: 'Magnus Carlsen'
		},
		{
			id: '5',
			title: 's1mple Announces Return to Competitive CS2',
			excerpt: 'After a brief hiatus, the Ukrainian AWPer rejoins NAVI roster.',
			image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop',
			date: '3 days ago',
			player: 's1mple'
		}
	].slice(0, limit);
}
