export interface Author {
	id: string;
	name: string;
	role: string;
	bio: string;
	avatar: string; // URL to avatar image
	initials: string;
	sports: string[]; // specialty areas
	social?: {
		twitter?: string;
	};
}

// Editorial team - realistic sports journalism team
export const authors: Author[] = [
	{
		id: 'marcus-chen',
		name: 'Marcus Chen',
		role: 'Senior Sports Editor',
		bio: 'Marcus has covered international sports for over 12 years, with a focus on tennis and golf. Previously at ESPN and The Athletic, he brings deep expertise in tournament coverage and player analysis.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MC&backgroundColor=1e40af',
		initials: 'MC',
		sports: ['tennis', 'golf', 'olympics'],
		social: { twitter: '@marcuschen_sports' }
	},
	{
		id: 'sarah-williams',
		name: 'Sarah Williams',
		role: 'NFL & NBA Correspondent',
		bio: 'Sarah is an award-winning sports journalist specializing in American football and basketball. She has been on the sidelines of major championships and brings insider perspective to every piece.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=SW&backgroundColor=9333ea',
		initials: 'SW',
		sports: ['nfl', 'nba'],
		social: { twitter: '@swilliams_nba' }
	},
	{
		id: 'james-oconnor',
		name: "James O'Connor",
		role: 'Soccer Analyst',
		bio: "James covers European and international football with a focus on tactics, transfers, and tournament dynamics. He's reported from three World Cups and writes weekly EPL analysis.",
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=JO&backgroundColor=dc2626',
		initials: 'JO',
		sports: ['soccer'],
		social: { twitter: '@joconnor_futbol' }
	},
	{
		id: 'elena-rodriguez',
		name: 'Elena Rodriguez',
		role: 'Combat Sports Editor',
		bio: 'Elena has been covering MMA and boxing since 2015. From ringside at UFC events to world title fights, she provides in-depth analysis of the combat sports landscape.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ER&backgroundColor=ea580c',
		initials: 'ER',
		sports: ['mma', 'boxing'],
		social: { twitter: '@erodriguez_mma' }
	},
	{
		id: 'david-thompson',
		name: 'David Thompson',
		role: 'Baseball & Hockey Writer',
		bio: 'David brings a statistical approach to covering MLB and NHL. A former college baseball player, he combines on-field understanding with data-driven analysis.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=DT&backgroundColor=059669',
		initials: 'DT',
		sports: ['mlb', 'nhl'],
		social: { twitter: '@dthompson_mlb' }
	},
	{
		id: 'priya-sharma',
		name: 'Priya Sharma',
		role: 'Cricket & Rugby Correspondent',
		bio: 'Priya covers cricket and rugby from a global perspective, with particular expertise in IPL, international test cricket, and Six Nations rugby. Based between London and Mumbai.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=PS&backgroundColor=0891b2',
		initials: 'PS',
		sports: ['cricket', 'rugby'],
		social: { twitter: '@priyasharma_cricket' }
	},
	{
		id: 'alex-park',
		name: 'Alex Park',
		role: 'Esports & Motorsport Editor',
		bio: 'Alex covers the intersection of technology and competition — from Formula 1 circuits to esports arenas. He brings unique insight into how modern competition is evolving.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AP&backgroundColor=7c3aed',
		initials: 'AP',
		sports: ['esports', 'racing'],
		social: { twitter: '@alexpark_esports' }
	},
	{
		id: 'rachel-foster',
		name: 'Rachel Foster',
		role: 'Olympics & Track Correspondent',
		bio: 'Rachel is a dedicated Olympics reporter who has covered every Summer and Winter Games since 2016. She specializes in athletics, swimming, and multi-sport event coverage.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=RF&backgroundColor=be185d',
		initials: 'RF',
		sports: ['olympics', 'tennis'],
		social: { twitter: '@rachelfoster_oly' }
	}
];

// Map sport to primary author(s)
const sportAuthorMap: Record<string, string[]> = {
	tennis: ['marcus-chen', 'rachel-foster'],
	golf: ['marcus-chen'],
	soccer: ['james-oconnor'],
	nfl: ['sarah-williams'],
	nba: ['sarah-williams'],
	mma: ['elena-rodriguez'],
	boxing: ['elena-rodriguez'],
	mlb: ['david-thompson'],
	nhl: ['david-thompson'],
	cricket: ['priya-sharma'],
	rugby: ['priya-sharma'],
	esports: ['alex-park'],
	racing: ['alex-park'],
	olympics: ['rachel-foster', 'marcus-chen'],
};

/**
 * Get an author for an article based on sport and article ID.
 * Deterministic — same article always gets the same author.
 */
export function getAuthorForArticle(articleId: string, sport?: string): Author {
	// If sport matches a specialist, prefer them
	if (sport) {
		const sportKey = sport.toLowerCase();
		const specialistIds = sportAuthorMap[sportKey];
		if (specialistIds && specialistIds.length > 0) {
			// Use article ID hash to pick among specialists
			const hash = simpleHash(articleId);
			const idx = hash % specialistIds.length;
			const author = authors.find(a => a.id === specialistIds[idx]);
			if (author) return author;
		}
	}

	// Fallback: hash article ID to pick any author
	const hash = simpleHash(articleId);
	return authors[hash % authors.length];
}

function simpleHash(str: string): number {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = ((hash << 5) - hash) + char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return Math.abs(hash);
}

export function getAuthorById(id: string): Author | undefined {
	return authors.find(a => a.id === id);
}
