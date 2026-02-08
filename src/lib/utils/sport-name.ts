/** Known acronym sports — always uppercase */
const ACRONYMS: Record<string, string> = {
	nfl: 'NFL', nba: 'NBA', mlb: 'MLB', nhl: 'NHL',
	mma: 'MMA', ncaf: 'NCAF', wnba: 'WNBA', ufc: 'UFC',
	f1: 'F1', nascar: 'NASCAR', pga: 'PGA', atp: 'ATP', wta: 'WTA',
	ipl: 'IPL', bbl: 'BBL', lpl: 'LPL', lck: 'LCK', lec: 'LEC',
};

/** Pretty overrides for non-acronym sports */
const DISPLAY: Record<string, string> = {
	esports: 'Esports',
	soccer: 'Soccer',
	tennis: 'Tennis',
	golf: 'Golf',
	boxing: 'Boxing',
	cricket: 'Cricket',
	rugby: 'Rugby',
	racing: 'Racing',
	olympics: 'Olympics',
};

/**
 * Smart sport display name:
 * 1. Known acronym → all caps (NFL, NBA, …)
 * 2. Known display name → proper case (Esports, Soccer, …)
 * 3. Fallback: if ≤4 chars → uppercase (likely acronym), else Title Case
 */
export function formatSportName(sport: string): string {
	const key = sport.toLowerCase();
	if (ACRONYMS[key]) return ACRONYMS[key];
	if (DISPLAY[key]) return DISPLAY[key];
	if (key.length <= 4) return key.toUpperCase();
	return key.charAt(0).toUpperCase() + key.slice(1);
}
