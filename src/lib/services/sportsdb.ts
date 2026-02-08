/**
 * TheSportsDB API integration
 * Free tier: key "3", no auth needed
 * Docs: https://www.thesportsdb.com/free_sports_api
 */

const API_BASE = 'https://www.thesportsdb.com/api/v1/json/3';

// Map our sport codes to TheSportsDB league IDs
// Primary league per sport (most popular/relevant)
export const SPORT_LEAGUES: Record<string, { id: string; name: string; season: string }[]> = {
	nfl: [{ id: '4391', name: 'NFL', season: '2025-2026' }],
	nba: [{ id: '4387', name: 'NBA', season: '2025-2026' }],
	mlb: [{ id: '4424', name: 'MLB', season: '2025' }],
	nhl: [{ id: '4380', name: 'NHL', season: '2025-2026' }],
	soccer: [
		{ id: '4328', name: 'English Premier League', season: '2025-2026' },
		{ id: '4335', name: 'Spanish La Liga', season: '2025-2026' },
		{ id: '4331', name: 'German Bundesliga', season: '2025-2026' },
		{ id: '4332', name: 'Italian Serie A', season: '2025-2026' },
	],
	// Tennis, Golf, MMA, Boxing, Cricket, Rugby, Racing, Esports — 
	// TheSportsDB has these but league IDs need discovery via premium or manual lookup
	// For now these will fall back to empty
};

export interface SportsDBEvent {
	idEvent: string;
	strEvent: string;
	strHomeTeam: string;
	strAwayTeam: string;
	intHomeScore: string | null;
	intAwayScore: string | null;
	strTimestamp: string;
	dateEvent: string;
	strTime: string;
	strVenue: string;
	strLeague: string;
	strStatus: string;
	strHomeTeamBadge: string;
	strAwayTeamBadge: string;
	strThumb: string;
}

export interface SportsDBStanding {
	intRank: string;
	strTeam: string;
	strBadge: string;
	intPlayed: string;
	intWin: string;
	intLoss: string;
	intDraw: string;
	intGoalsFor: string;
	intGoalsAgainst: string;
	intGoalDifference: string;
	intPoints: string;
	strForm: string;
}

async function fetchJSON(url: string): Promise<any> {
	try {
		const res = await fetch(url, {
			headers: { 'User-Agent': 'tournaments.com/1.0' }
		});
		if (!res.ok) return null;
		return await res.json();
	} catch {
		return null;
	}
}

/**
 * Get upcoming fixtures for a sport
 */
export async function getUpcomingFixtures(sport: string): Promise<SportsDBEvent[]> {
	const leagues = SPORT_LEAGUES[sport];
	if (!leagues?.length) return [];

	const allEvents: SportsDBEvent[] = [];
	// Only fetch first league to avoid rate limits on free tier
	const league = leagues[0];
	const data = await fetchJSON(`${API_BASE}/eventsnextleague.php?id=${league.id}`);
	if (data?.events) {
		allEvents.push(...data.events.slice(0, 10));
	}

	return allEvents;
}

/**
 * Get recent results (past events with scores)
 */
export async function getRecentResults(sport: string): Promise<SportsDBEvent[]> {
	const leagues = SPORT_LEAGUES[sport];
	if (!leagues?.length) return [];

	const league = leagues[0];
	const data = await fetchJSON(`${API_BASE}/eventspastleague.php?id=${league.id}`);
	if (data?.events) {
		return data.events.slice(0, 10);
	}
	return [];
}

/**
 * Get league standings/table
 */
export async function getStandings(sport: string): Promise<SportsDBStanding[]> {
	const leagues = SPORT_LEAGUES[sport];
	if (!leagues?.length) return [];

	const league = leagues[0];
	const data = await fetchJSON(`${API_BASE}/lookuptable.php?l=${league.id}&s=${league.season}`);
	if (data?.table) {
		return data.table;
	}
	return [];
}

/**
 * Get league name for a sport
 */
export function getLeagueName(sport: string): string {
	const leagues = SPORT_LEAGUES[sport];
	return leagues?.[0]?.name || sport.toUpperCase();
}
