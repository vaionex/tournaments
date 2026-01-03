/**
 * News Service
 * Handles all news-related data operations using Supabase
 */

import type { NewsArticle, NewsCategory } from '$lib/types';
import { supabase } from '$lib/supabase';
import { simulateDelay } from './api';

// Toggle this to switch between mock and real data
const USE_MOCK_DATA = true;

// ============================================
// MOCK DATA
// ============================================

const mockFeaturedNews: NewsArticle[] = [
	// ========== TOURNAMENT NEWS ==========
	{
		id: '1',
		title: 'Tennis Open Championship 2025: Record Prize Pool Announced',
		excerpt: 'The biggest tennis tournament of the year begins this weekend with over $250,000 in prizes across multiple divisions.',
		date: '2025-01-10',
		category: 'Tournament News',
		image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&h=800&fit=crop',
		author: 'Tournament Staff'
	},
	{
		id: '21',
		title: 'World Chess Championship 2025: Magnus Carlsen Returns',
		excerpt: 'The former world champion announces his return to compete for the title in what promises to be a historic event.',
		date: '2025-01-09',
		category: 'Tournament News',
		image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=1200&h=800&fit=crop',
		author: 'Tournament Staff'
	},
	{
		id: '22',
		title: 'FIFA Club World Cup 2025: Schedule Released',
		excerpt: 'The expanded 32-team tournament will feature the biggest clubs from around the world competing for glory.',
		date: '2025-01-07',
		category: 'Tournament News',
		image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=800&fit=crop',
		author: 'Sports Desk'
	},
	{
		id: '23',
		title: 'US Open Tennis: Wild Card Selections Announced',
		excerpt: 'Tournament organizers reveal the wild card entries for this year\'s grand slam event.',
		date: '2025-01-04',
		category: 'Tournament News',
		image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=1200&h=800&fit=crop',
		author: 'Tournament Staff'
	},
	{
		id: '24',
		title: 'PGA Championship 2025: Course Redesign Complete',
		excerpt: 'The iconic course has undergone significant changes ahead of this year\'s major championship.',
		date: '2024-12-30',
		category: 'Tournament News',
		image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&h=800&fit=crop',
		author: 'Golf Desk'
	},
	{
		id: '25',
		title: 'Olympic Esports Games 2025: Full Game List Revealed',
		excerpt: 'The IOC confirms the complete lineup of competitive titles for the inaugural Olympic Esports event.',
		date: '2024-12-28',
		category: 'Tournament News',
		image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=800&fit=crop',
		author: 'Esports Desk'
	},

	// ========== ANNOUNCEMENTS ==========
	{
		id: '2',
		title: 'Golf Masters Tournament Announces Free Entry for Amateurs',
		excerpt: 'In a historic move, the Golf Masters Tournament will allow amateur players to compete alongside professionals.',
		date: '2025-01-08',
		category: 'Announcements',
		image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&h=800&fit=crop',
		author: 'Tournament Staff'
	},
	{
		id: '14',
		title: 'Dota 2 The International 2025 Location Revealed',
		excerpt: 'Valve announces the host city for next year\'s biggest Dota 2 tournament.',
		date: '2024-12-08',
		category: 'Announcements',
		image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop',
		author: 'Esports Desk'
	},
	{
		id: '15',
		title: 'Table Tennis: New Ranking System Explained',
		excerpt: 'The ITTF introduces a revamped world ranking system for 2025.',
		date: '2024-12-05',
		category: 'Announcements',
		image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=1200&h=800&fit=crop',
		author: 'Tournament Staff'
	},
	{
		id: '26',
		title: 'NBA Announces New In-Season Tournament Format',
		excerpt: 'Major changes coming to the popular mid-season competition with increased prize money.',
		date: '2024-12-02',
		category: 'Announcements',
		image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=800&fit=crop',
		author: 'Sports Desk'
	},
	{
		id: '27',
		title: 'Riot Games Reveals New Competitive Game Mode',
		excerpt: 'A brand new ranked experience is coming to League of Legends in the next major update.',
		date: '2024-11-28',
		category: 'Announcements',
		image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=800&fit=crop',
		author: 'Esports Desk'
	},
	{
		id: '28',
		title: 'ATP Tennis: Rule Changes for 2025 Season',
		excerpt: 'New regulations on coaching, time violations, and instant replay to be implemented.',
		date: '2024-11-20',
		category: 'Announcements',
		image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&h=800&fit=crop',
		author: 'Tournament Staff'
	},

	// ========== PLAYER SPOTLIGHT ==========
	{
		id: '3',
		title: 'Top Players to Watch in 2025: Tennis, Golf, and Esports',
		excerpt: 'Our experts break down the rising stars and veterans who could dominate this year\'s competitive scene.',
		date: '2025-01-05',
		category: 'Player Spotlight',
		image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=800&fit=crop',
		author: 'Editorial Team'
	},
	{
		id: '29',
		title: 'Coco Gauff: The Next Generation of Tennis Excellence',
		excerpt: 'At just 20 years old, Gauff has already established herself as a force to be reckoned with.',
		date: '2025-01-02',
		category: 'Player Spotlight',
		image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=1200&h=800&fit=crop',
		author: 'Features Team'
	},
	{
		id: '30',
		title: 'Faker: The Undisputed King of Esports',
		excerpt: 'After another world championship, we examine the legacy of League of Legends\' greatest player.',
		date: '2024-12-25',
		category: 'Player Spotlight',
		image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=800&fit=crop',
		author: 'Esports Desk'
	},
	{
		id: '31',
		title: 'Victor Wembanyama: The Future of Basketball',
		excerpt: 'The rookie phenom is breaking records and changing how we think about the center position.',
		date: '2024-12-18',
		category: 'Player Spotlight',
		image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=800&fit=crop',
		author: 'Sports Desk'
	},
	{
		id: '32',
		title: 'Scottie Scheffler: Golf\'s New World Number One',
		excerpt: 'How the Texas native rose to dominate professional golf in just two seasons.',
		date: '2024-12-10',
		category: 'Player Spotlight',
		image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&h=800&fit=crop',
		author: 'Golf Desk'
	},
	{
		id: '33',
		title: 'S1mple Returns: Counter-Strike Legend Comes Back',
		excerpt: 'The Ukrainian superstar announces his return to competitive Counter-Strike 2.',
		date: '2024-11-30',
		category: 'Player Spotlight',
		image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1200&h=800&fit=crop',
		author: 'Esports Desk'
	},

	// ========== RESULTS ==========
	{
		id: '4',
		title: 'League of Legends Winter Championship Results',
		excerpt: 'Team Alpha takes home the trophy and $50,000 in a thrilling 3-2 grand finals victory.',
		date: '2025-01-03',
		category: 'Results',
		image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=800&fit=crop',
		author: 'Esports Desk'
	},
	{
		id: '17',
		title: 'Counter-Strike 2 Major: Group Stage Recap',
		excerpt: 'All the highlights and upsets from the first week of the CS2 Major.',
		date: '2024-12-01',
		category: 'Results',
		image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1200&h=800&fit=crop',
		author: 'Esports Desk'
	},
	{
		id: '19',
		title: 'Badminton World Tour Finals Results',
		excerpt: 'Denmark\'s Viktor Axelsen claims his third consecutive World Tour Finals title.',
		date: '2024-11-25',
		category: 'Results',
		image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1200&h=800&fit=crop',
		author: 'Sports Desk'
	},
	{
		id: '34',
		title: 'Australian Open 2025: Sinner Defends Title',
		excerpt: 'Jannik Sinner dominates in straight sets to win his second consecutive Australian Open.',
		date: '2025-01-06',
		category: 'Results',
		image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&h=800&fit=crop',
		author: 'Tournament Staff'
	},
	{
		id: '35',
		title: 'NFL Playoffs: Wild Card Weekend Recap',
		excerpt: 'Surprising upsets shake up the playoff bracket as underdogs dominate.',
		date: '2025-01-05',
		category: 'Results',
		image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=1200&h=800&fit=crop',
		author: 'Sports Desk'
	},
	{
		id: '36',
		title: 'World Poker Tour Championship: Record Prize Pool',
		excerpt: 'Professional poker player claims $3.5 million in the largest WPT event ever.',
		date: '2024-12-20',
		category: 'Results',
		image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=1200&h=800&fit=crop',
		author: 'Gaming Desk'
	},

	// ========== INTERVIEWS ==========
	{
		id: '5',
		title: 'Interview: Inside the Mind of a Chess Grandmaster',
		excerpt: 'We sit down with the reigning chess champion to discuss strategy, preparation, and the mental game.',
		date: '2025-01-01',
		category: 'Interviews',
		image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=1200&h=800&fit=crop',
		author: 'Features Team'
	},
	{
		id: '16',
		title: 'Interview: Rising Star in Women\'s Basketball',
		excerpt: 'We talk to the WNBA\'s most promising rookie about her journey to the pros.',
		date: '2024-12-03',
		category: 'Interviews',
		image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=800&fit=crop',
		author: 'Features Team'
	},
	{
		id: '37',
		title: 'Interview: Serena Williams on Life After Tennis',
		excerpt: 'The tennis legend opens up about retirement, motherhood, and her business ventures.',
		date: '2024-12-28',
		category: 'Interviews',
		image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=1200&h=800&fit=crop',
		author: 'Features Team'
	},
	{
		id: '38',
		title: 'Interview: Tom Brady\'s New Career in Broadcasting',
		excerpt: 'The NFL legend discusses his transition to the commentary booth.',
		date: '2024-12-15',
		category: 'Interviews',
		image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=1200&h=800&fit=crop',
		author: 'Sports Desk'
	},
	{
		id: '39',
		title: 'Interview: Cloud9 CEO on Building an Esports Empire',
		excerpt: 'Jack Etienne shares insights on running one of the most successful esports organizations.',
		date: '2024-12-05',
		category: 'Interviews',
		image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=800&fit=crop',
		author: 'Esports Desk'
	},
	{
		id: '40',
		title: 'Interview: Olympic Gold Medalist\'s Training Secrets',
		excerpt: 'An exclusive look at the daily routine of a world-class swimmer.',
		date: '2024-11-22',
		category: 'Interviews',
		image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&h=800&fit=crop',
		author: 'Features Team'
	},

	// ========== STRATEGY ==========
	{
		id: '8',
		title: 'How to Improve Your Competitive Mindset',
		excerpt: 'Sports psychologists share tips on building mental resilience for tournament play.',
		date: '2024-12-22',
		category: 'Strategy',
		image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=800&fit=crop',
		author: 'Editorial Team'
	},
	{
		id: '13',
		title: 'Marathon Training: Pro Tips for Your First Race',
		excerpt: 'Elite runners share their secrets for preparing for your first competitive marathon.',
		date: '2024-12-10',
		category: 'Strategy',
		image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&h=800&fit=crop',
		author: 'Fitness Team'
	},
	{
		id: '41',
		title: 'Chess Opening Theory: Modern Sicilian Defense',
		excerpt: 'A comprehensive guide to one of the most popular and aggressive chess openings.',
		date: '2025-01-08',
		category: 'Strategy',
		image: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=1200&h=800&fit=crop',
		author: 'Chess Team'
	},
	{
		id: '42',
		title: 'Golf: Mastering the Mental Game on the Course',
		excerpt: 'Tour professionals share their pre-shot routines and focus techniques.',
		date: '2024-12-30',
		category: 'Strategy',
		image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&h=800&fit=crop',
		author: 'Golf Desk'
	},
	{
		id: '43',
		title: 'Valorant: Agent Composition Meta Analysis',
		excerpt: 'Breaking down the most effective team compositions in competitive Valorant.',
		date: '2024-12-18',
		category: 'Strategy',
		image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=800&fit=crop',
		author: 'Esports Desk'
	},
	{
		id: '44',
		title: 'Basketball: The Evolution of the Three-Point Shot',
		excerpt: 'How analytics have transformed offensive strategy in modern basketball.',
		date: '2024-12-01',
		category: 'Strategy',
		image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=800&fit=crop',
		author: 'Sports Desk'
	},

	// ========== COMMUNITY ==========
	{
		id: '9',
		title: 'Community Spotlight: Local Chess Club Goes National',
		excerpt: 'A small-town chess club\'s journey from local meetups to national recognition.',
		date: '2024-12-20',
		category: 'Community',
		image: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=1200&h=800&fit=crop',
		author: 'Community Team'
	},
	{
		id: '18',
		title: 'Youth Sports: Building Tomorrow\'s Champions',
		excerpt: 'How youth development programs are creating the next generation of competitive athletes.',
		date: '2024-11-28',
		category: 'Community',
		image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=1200&h=800&fit=crop',
		author: 'Community Team'
	},
	{
		id: '45',
		title: 'Gaming for Good: Esports Charity Events Raise Millions',
		excerpt: 'How the gaming community is coming together to support important causes worldwide.',
		date: '2025-01-06',
		category: 'Community',
		image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=800&fit=crop',
		author: 'Community Team'
	},
	{
		id: '46',
		title: 'Inclusive Sports: Adaptive Competitions Growing',
		excerpt: 'Paralympic and adaptive sports programs are seeing record participation numbers.',
		date: '2024-12-28',
		category: 'Community',
		image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=800&fit=crop',
		author: 'Sports Desk'
	},
	{
		id: '47',
		title: 'Women in Esports: Breaking Barriers',
		excerpt: 'Female players and organizers are changing the face of competitive gaming.',
		date: '2024-12-15',
		category: 'Community',
		image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=800&fit=crop',
		author: 'Esports Desk'
	},
	{
		id: '48',
		title: 'Community Tournament Organizers: Unsung Heroes',
		excerpt: 'The dedicated volunteers who keep local competitive scenes alive and thriving.',
		date: '2024-11-20',
		category: 'Community',
		image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=1200&h=800&fit=crop',
		author: 'Community Team'
	},

	// ========== TRADITIONAL SPORTS ==========
	{
		id: '6',
		title: 'NBA All-Star Weekend: Behind the Scenes',
		excerpt: 'An exclusive look at what goes into organizing one of basketball\'s biggest events of the year.',
		date: '2024-12-28',
		category: 'Traditional Sports',
		image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=800&fit=crop',
		author: 'Sports Desk'
	},
	{
		id: '11',
		title: 'Swimming World Championships Preview',
		excerpt: 'What to expect from the upcoming World Aquatics Championships in Singapore.',
		date: '2024-12-15',
		category: 'Traditional Sports',
		image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&h=800&fit=crop',
		author: 'Sports Desk'
	},
	{
		id: '49',
		title: 'Premier League: Title Race Heats Up',
		excerpt: 'Three teams separated by just two points as the season enters its decisive phase.',
		date: '2025-01-09',
		category: 'Traditional Sports',
		image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=800&fit=crop',
		author: 'Football Desk'
	},
	{
		id: '50',
		title: 'MLB: Spring Training Preview Guide',
		excerpt: 'Everything you need to know about the upcoming baseball season and key storylines.',
		date: '2025-01-04',
		category: 'Traditional Sports',
		image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=1200&h=800&fit=crop',
		author: 'Sports Desk'
	},
	{
		id: '51',
		title: 'UFC 300: Historic Card Announced',
		excerpt: 'The landmark event features three title fights and the return of legendary fighters.',
		date: '2024-12-22',
		category: 'Traditional Sports',
		image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&h=800&fit=crop',
		author: 'Combat Sports Desk'
	},
	{
		id: '52',
		title: 'NHL: All-Star Game Format Shakeup',
		excerpt: 'New 3-on-3 tournament style brings excitement back to the midseason showcase.',
		date: '2024-12-08',
		category: 'Traditional Sports',
		image: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=1200&h=800&fit=crop',
		author: 'Hockey Desk'
	},

	// ========== ESPORTS ==========
	{
		id: '7',
		title: 'Valorant Champions Tour 2025 Format Changes',
		excerpt: 'Riot Games announces major changes to the competitive Valorant circuit for the upcoming season.',
		date: '2024-12-25',
		category: 'Esports',
		image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=800&fit=crop',
		author: 'Esports Desk'
	},
	{
		id: '10',
		title: 'FIFA eWorld Cup: Regional Qualifiers Begin',
		excerpt: 'The road to the FIFA eWorld Cup kicks off with regional qualifiers across six continents.',
		date: '2024-12-18',
		category: 'Esports',
		image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=1200&h=800&fit=crop',
		author: 'Esports Desk'
	},
	{
		id: '12',
		title: 'The Rise of Mobile Esports in Asia',
		excerpt: 'How mobile gaming tournaments are reshaping the competitive landscape in Asian markets.',
		date: '2024-12-12',
		category: 'Esports',
		image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=1200&h=800&fit=crop',
		author: 'International Desk'
	},
	{
		id: '20',
		title: 'The Economics of Esports: 2024 Industry Report',
		excerpt: 'A deep dive into the financial state of competitive gaming and what it means for 2025.',
		date: '2024-11-22',
		category: 'Esports',
		image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=1200&h=800&fit=crop',
		author: 'Business Desk'
	},
	{
		id: '53',
		title: 'League of Legends Worlds 2025: Group Draw Analysis',
		excerpt: 'Breaking down the group stage matchups and predictions for the biggest esports event.',
		date: '2025-01-08',
		category: 'Esports',
		image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=800&fit=crop',
		author: 'Esports Desk'
	},
	{
		id: '54',
		title: 'Overwatch League: Season 8 Preview',
		excerpt: 'New teams, roster changes, and format updates heading into the new OWL season.',
		date: '2025-01-02',
		category: 'Esports',
		image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=800&fit=crop',
		author: 'Esports Desk'
	},
	{
		id: '55',
		title: 'Fighting Game Community: EVO 2025 Games Revealed',
		excerpt: 'The world\'s largest fighting game tournament announces its official game lineup.',
		date: '2024-12-30',
		category: 'Esports',
		image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop',
		author: 'Esports Desk'
	},
	{
		id: '56',
		title: 'Rocket League: RLCS World Championship Format',
		excerpt: 'Psyonix reveals the format and locations for the 2025 Rocket League Championship Series.',
		date: '2024-12-20',
		category: 'Esports',
		image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=1200&h=800&fit=crop',
		author: 'Esports Desk'
	}
];

// ============================================
// DATABASE QUERY HELPERS
// ============================================

function transformNewsArticle(row: Record<string, unknown>): NewsArticle {
	return {
		id: row.id as string,
		title: row.title as string,
		excerpt: row.excerpt as string,
		content: row.content as string | undefined,
		date: row.published_at as string || row.created_at as string,
		category: row.category as NewsCategory,
		image: row.image_url as string || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200',
		author: (row.author_profile as Record<string, unknown>)?.display_name as string || 'Staff',
		readTime: row.read_time as number | undefined
	};
}

// ============================================
// SERVICE METHODS
// ============================================

/**
 * Get available news categories
 */
export function getNewsCategories(): NewsCategory[] {
	return [
		'All',
		'Tournament News',
		'Results',
		'Announcements',
		'Player Spotlight',
		'Interviews',
		'Strategy',
		'Community',
		'Traditional Sports',
		'Esports'
	];
}

/**
 * Fetch news articles with optional category filter
 */
export async function getNewsArticles(category: NewsCategory = 'All'): Promise<NewsArticle[]> {
	if (USE_MOCK_DATA) {
		await simulateDelay(300);
		if (category === 'All') {
			return mockFeaturedNews;
		}
		return mockFeaturedNews.filter(article => article.category === category);
	}

	let query = supabase
		.from('news_articles')
		.select(`
			*,
			author_profile:author_id (
				display_name
			)
		`)
		.eq('is_published', true)
		.order('published_at', { ascending: false });

	if (category !== 'All') {
		query = query.eq('category', category);
	}

	const { data, error } = await query.limit(20);

	if (error) {
		console.error('Error fetching news articles:', error);
		return [];
	}

	return (data || []).map(transformNewsArticle);
}

/**
 * Fetch paginated news articles for infinite scroll
 */
export async function getNewsArticlesPaginated(
	category: NewsCategory = 'All',
	page: number = 1,
	limit: number = 6
): Promise<{ articles: NewsArticle[]; hasMore: boolean }> {
	if (USE_MOCK_DATA) {
		// Shorter delay for category changes and subsequent pages
		await simulateDelay(page === 1 ? 200 : 100);
		let filtered = category === 'All' 
			? mockFeaturedNews 
			: mockFeaturedNews.filter(article => article.category === category);
		
		const start = (page - 1) * limit;
		const end = start + limit;
		const articles = filtered.slice(start, end);
		const hasMore = end < filtered.length;
		
		return { articles, hasMore };
	}

	const offset = (page - 1) * limit;
	
	let query = supabase
		.from('news_articles')
		.select(`
			*,
			author_profile:author_id (
				display_name
			)
		`, { count: 'exact' })
		.eq('is_published', true)
		.order('published_at', { ascending: false })
		.range(offset, offset + limit - 1);

	if (category !== 'All') {
		query = query.eq('category', category);
	}

	const { data, error, count } = await query;

	if (error) {
		console.error('Error fetching paginated news:', error);
		return { articles: [], hasMore: false };
	}

	const articles = (data || []).map(transformNewsArticle);
	const hasMore = count ? offset + limit < count : false;
	
	return { articles, hasMore };
}

/**
 * Fetch paginated news articles using direct offset for infinite scroll
 */
export async function getNewsArticlesPaginatedWithOffset(
	category: NewsCategory = 'All',
	offset: number = 0,
	limit: number = 6
): Promise<{ articles: NewsArticle[]; hasMore: boolean }> {
	if (USE_MOCK_DATA) {
		await simulateDelay(150); // Quick load for subsequent pages
		let filtered = category === 'All' 
			? mockFeaturedNews 
			: mockFeaturedNews.filter(article => article.category === category);
		
		const end = offset + limit;
		const articles = filtered.slice(offset, end);
		const hasMore = end < filtered.length;
		
		return { articles, hasMore };
	}

	let query = supabase
		.from('news_articles')
		.select(`
			*,
			author_profile:author_id (
				display_name
			)
		`, { count: 'exact' })
		.eq('is_published', true)
		.order('published_at', { ascending: false })
		.range(offset, offset + limit - 1);

	if (category !== 'All') {
		query = query.eq('category', category);
	}

	const { data, error, count } = await query;

	if (error) {
		console.error('Error fetching paginated news with offset:', error);
		return { articles: [], hasMore: false };
	}

	const articles = (data || []).map(transformNewsArticle);
	const hasMore = count ? offset + limit < count : false;
	
	return { articles, hasMore };
}

/**
 * Fetch featured article (most recent featured or first article)
 */
export async function getFeaturedArticle(): Promise<NewsArticle | null> {
	if (USE_MOCK_DATA) {
		await simulateDelay(200);
		return mockFeaturedNews[0] || null;
	}

	const { data, error } = await supabase
		.from('news_articles')
		.select(`
			*,
			author_profile:author_id (
				display_name
			)
		`)
		.eq('is_published', true)
		.eq('is_featured', true)
		.order('published_at', { ascending: false })
		.limit(1)
		.single();

	if (error) {
		console.error('Error fetching featured article:', error);
		return mockFeaturedNews[0] || null;
	}

	return data ? transformNewsArticle(data) : null;
}

/**
 * Fetch a single news article by ID
 */
export async function getNewsArticleById(id: string): Promise<NewsArticle | null> {
	if (USE_MOCK_DATA) {
		await simulateDelay();
		const article = mockFeaturedNews.find(a => a.id === id);
		if (article) {
			return {
				...article,
				content: `<p>${article.excerpt}</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`
			};
		}
		return null;
	}

	const { data, error } = await supabase
		.from('news_articles')
		.select(`
			*,
			author_profile:author_id (
				display_name,
				avatar_url
			)
		`)
		.eq('id', id)
		.single();

	if (error) {
		console.error('Error fetching article:', error);
		return null;
	}

	return data ? transformNewsArticle(data) : null;
}

/**
 * Fetch recent news for sidebar or widgets
 */
export async function getRecentNews(limit: number = 5): Promise<NewsArticle[]> {
	if (USE_MOCK_DATA) {
		await simulateDelay(200);
		return mockFeaturedNews.slice(0, limit);
	}

	const { data, error } = await supabase
		.from('news_articles')
		.select(`
			id,
			title,
			excerpt,
			published_at,
			category,
			image_url
		`)
		.eq('is_published', true)
		.order('published_at', { ascending: false })
		.limit(limit);

	if (error) {
		console.error('Error fetching recent news:', error);
		return [];
	}

	return (data || []).map((row: Record<string, unknown>) => ({
		id: row.id as string,
		title: row.title as string,
		excerpt: row.excerpt as string,
		date: row.published_at as string,
		category: row.category as NewsCategory,
		image: row.image_url as string || '',
		author: 'Staff'
	}));
}

/**
 * Search news articles
 */
export async function searchNews(query: string): Promise<NewsArticle[]> {
	if (USE_MOCK_DATA) {
		await simulateDelay(300);
		const lowerQuery = query.toLowerCase();
		return mockFeaturedNews.filter(
			article =>
				article.title.toLowerCase().includes(lowerQuery) ||
				article.excerpt.toLowerCase().includes(lowerQuery)
		);
	}

	const { data, error } = await supabase
		.from('news_articles')
		.select(`
			*,
			author_profile:author_id (
				display_name
			)
		`)
		.eq('is_published', true)
		.or(`title.ilike.%${query}%,excerpt.ilike.%${query}%`)
		.order('published_at', { ascending: false })
		.limit(20);

	if (error) {
		console.error('Error searching news:', error);
		return [];
	}

	return (data || []).map(transformNewsArticle);
}
