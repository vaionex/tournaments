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

// Editorial team - realistic sports journalism team (2 per sport)
export const authors: Author[] = [
	// Tennis
	{
		id: 'marcus-chen',
		name: 'Marcus Chen',
		role: 'Senior Tennis Editor',
		bio: 'Marcus has covered international tennis for over 12 years, reporting from all four Grand Slams. Previously at ESPN and The Athletic, he brings deep expertise in player analysis and tournament dynamics.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MC&backgroundColor=1e40af',
		initials: 'MC',
		sports: ['tennis'],
		social: { twitter: '@marcuschen_sports' }
	},
	{
		id: 'nina-petrova',
		name: 'Nina Petrova',
		role: 'Tennis Correspondent',
		bio: 'Nina is a former WTA tour journalist who has interviewed over 200 professional players. She covers the women\'s and men\'s tours with equal depth, specializing in emerging talent.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=NP&backgroundColor=6d28d9',
		initials: 'NP',
		sports: ['tennis'],
	},
	// Golf
	{
		id: 'tom-bradley',
		name: 'Tom Bradley',
		role: 'Golf Editor',
		bio: 'Tom has walked the fairways of every major championship for the past decade. A scratch golfer himself, he brings technical insight and storytelling to his coverage of the PGA Tour and beyond.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TB&backgroundColor=15803d',
		initials: 'TB',
		sports: ['golf'],
		social: { twitter: '@tombradley_golf' }
	},
	{
		id: 'lisa-nakamura',
		name: 'Lisa Nakamura',
		role: 'Golf Correspondent',
		bio: 'Lisa covers the LPGA, PGA Tour, and international golf circuits. Her analytical approach to course strategy and player performance has made her a respected voice in golf journalism.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=LN&backgroundColor=0d9488',
		initials: 'LN',
		sports: ['golf'],
	},
	// Soccer
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
		id: 'carlos-mendez',
		name: 'Carlos Mendez',
		role: 'Soccer Correspondent',
		bio: 'Carlos brings a South American perspective to global football coverage. Based in Madrid, he covers La Liga, Champions League, and international competitions with a passion for the beautiful game.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=CM&backgroundColor=b91c1c',
		initials: 'CM',
		sports: ['soccer'],
	},
	// NFL
	{
		id: 'sarah-williams',
		name: 'Sarah Williams',
		role: 'NFL Editor',
		bio: 'Sarah is an award-winning football journalist who has covered every Super Bowl since 2014. She specializes in draft analysis, team strategy, and the business side of the NFL.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=SW&backgroundColor=9333ea',
		initials: 'SW',
		sports: ['nfl'],
		social: { twitter: '@swilliams_nfl' }
	},
	{
		id: 'mike-rawlings',
		name: 'Mike Rawlings',
		role: 'NFL Correspondent',
		bio: 'Mike is a former college quarterback turned sports writer. His playing experience gives him unique insight into game film analysis, coaching decisions, and player development.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MR&backgroundColor=4338ca',
		initials: 'MR',
		sports: ['nfl'],
	},
	// NBA
	{
		id: 'devon-jackson',
		name: 'Devon Jackson',
		role: 'NBA Editor',
		bio: 'Devon has covered professional basketball for 15 years, from courtside at the Finals to pre-draft workouts. His deep league sources make him a go-to voice for NBA trades and free agency.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=DJ&backgroundColor=ea580c',
		initials: 'DJ',
		sports: ['nba'],
		social: { twitter: '@devonjackson_nba' }
	},
	{
		id: 'maya-thompson',
		name: 'Maya Thompson',
		role: 'NBA Correspondent',
		bio: 'Maya covers the NBA and WNBA with an emphasis on player culture, analytics, and the global growth of basketball. She hosts the weekly Courtside Report podcast.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MT&backgroundColor=be185d',
		initials: 'MT',
		sports: ['nba'],
	},
	// MMA
	{
		id: 'elena-rodriguez',
		name: 'Elena Rodriguez',
		role: 'MMA Editor',
		bio: 'Elena has been covering MMA since 2015. From cage-side at UFC events to regional promotions, she provides in-depth analysis of fighters, matchups, and the evolving combat sports landscape.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ER&backgroundColor=ea580c',
		initials: 'ER',
		sports: ['mma'],
		social: { twitter: '@erodriguez_mma' }
	},
	{
		id: 'ryan-kowalski',
		name: 'Ryan Kowalski',
		role: 'MMA Correspondent',
		bio: 'Ryan is a Brazilian jiu-jitsu brown belt and lifelong martial arts fan. He covers the technical side of MMA — breaking down grappling exchanges, striking technique, and fight strategy.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=RK&backgroundColor=78350f',
		initials: 'RK',
		sports: ['mma'],
	},
	// Boxing
	{
		id: 'frank-davis',
		name: 'Frank Davis',
		role: 'Boxing Editor',
		bio: 'Frank has been ringside for over 100 world title fights. A third-generation boxing writer, he covers the sport with the reverence and critical eye it deserves.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=FD&backgroundColor=991b1b',
		initials: 'FD',
		sports: ['boxing'],
		social: { twitter: '@frankdavis_box' }
	},
	{
		id: 'amanda-cross',
		name: 'Amanda Cross',
		role: 'Boxing Correspondent',
		bio: 'Amanda covers boxing across all weight classes and promotions. She\'s known for her pre-fight breakdowns and post-fight analysis that goes beyond the scorecards.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AC&backgroundColor=701a75',
		initials: 'AC',
		sports: ['boxing'],
	},
	// MLB
	{
		id: 'david-thompson',
		name: 'David Thompson',
		role: 'Baseball Editor',
		bio: 'David brings a statistical approach to covering MLB. A former college baseball player, he combines on-field understanding with data-driven analysis of the game.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=DT&backgroundColor=059669',
		initials: 'DT',
		sports: ['mlb'],
		social: { twitter: '@dthompson_mlb' }
	},
	{
		id: 'jenny-walker',
		name: 'Jenny Walker',
		role: 'Baseball Correspondent',
		bio: 'Jenny covers the MLB with a focus on farm systems, prospect development, and the minor league pipeline. Her annual Top 100 Prospects list is widely referenced across the industry.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=JW&backgroundColor=0369a1',
		initials: 'JW',
		sports: ['mlb'],
	},
	// NHL
	{
		id: 'eric-lindqvist',
		name: 'Eric Lindqvist',
		role: 'Hockey Editor',
		bio: 'Eric grew up playing hockey in Minnesota and has covered the NHL for over a decade. He specializes in advanced analytics, trade deadline coverage, and Stanley Cup playoff analysis.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=EL&backgroundColor=1e3a5f',
		initials: 'EL',
		sports: ['nhl'],
		social: { twitter: '@elindqvist_nhl' }
	},
	{
		id: 'kate-morrison',
		name: 'Kate Morrison',
		role: 'Hockey Correspondent',
		bio: 'Kate covers the NHL and international hockey, including World Championships and the Olympic tournament. She brings attention to stories beyond the top markets.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=KM&backgroundColor=1e40af',
		initials: 'KM',
		sports: ['nhl'],
	},
	// Cricket
	{
		id: 'priya-sharma',
		name: 'Priya Sharma',
		role: 'Cricket Editor',
		bio: 'Priya covers cricket from a global perspective, with particular expertise in IPL, international test cricket, and World Cup tournaments. Based between London and Mumbai.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=PS&backgroundColor=0891b2',
		initials: 'PS',
		sports: ['cricket'],
		social: { twitter: '@priyasharma_cricket' }
	},
	{
		id: 'arun-desai',
		name: 'Arun Desai',
		role: 'Cricket Correspondent',
		bio: 'Arun is a cricket statistician and writer who brings numbers to life. He covers all formats — Tests, ODIs, and T20s — with a particular focus on the tactical evolution of the game.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AD&backgroundColor=0e7490',
		initials: 'AD',
		sports: ['cricket'],
	},
	// Rugby
	{
		id: 'owen-hughes',
		name: 'Owen Hughes',
		role: 'Rugby Editor',
		bio: 'Owen has covered rugby union and league across Europe, the Southern Hemisphere, and the World Cup. Based in Cardiff, he brings a deep understanding of forward play and set-piece strategy.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=OH&backgroundColor=166534',
		initials: 'OH',
		sports: ['rugby'],
		social: { twitter: '@owenhughes_rugby' }
	},
	{
		id: 'brooke-taylor',
		name: 'Brooke Taylor',
		role: 'Rugby Correspondent',
		bio: 'Brooke covers international rugby from a Southern Hemisphere perspective. From Super Rugby to the Rugby Championship, she tracks the global development of the sport.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=BT&backgroundColor=065f46',
		initials: 'BT',
		sports: ['rugby'],
	},
	// Esports
	{
		id: 'alex-park',
		name: 'Alex Park',
		role: 'Esports Editor',
		bio: 'Alex has covered competitive gaming since the early days of MLG. From League of Legends Worlds to CS2 Majors, he brings insight into how esports has evolved into a global phenomenon.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AP&backgroundColor=7c3aed',
		initials: 'AP',
		sports: ['esports'],
		social: { twitter: '@alexpark_esports' }
	},
	{
		id: 'zoe-chen',
		name: 'Zoe Chen',
		role: 'Esports Correspondent',
		bio: 'Zoe covers the business and culture of esports — team acquisitions, player contracts, and the streaming ecosystem. She also reports on emerging titles breaking into competitive play.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ZC&backgroundColor=6b21a8',
		initials: 'ZC',
		sports: ['esports'],
	},
	// Racing
	{
		id: 'luca-ferrari',
		name: 'Luca Ferrari',
		role: 'Motorsport Editor',
		bio: 'Luca covers Formula 1, MotoGP, and endurance racing from the pit lane. Based in Maranello, he has exclusive access to teams and drivers across the European racing circuit.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=LF&backgroundColor=dc2626',
		initials: 'LF',
		sports: ['racing'],
		social: { twitter: '@lucaferrari_f1' }
	},
	{
		id: 'samantha-reed',
		name: 'Samantha Reed',
		role: 'Motorsport Correspondent',
		bio: 'Samantha covers IndyCar, NASCAR, and the growing world of electric racing. Her technical breakdowns of car setups and race strategy have earned her a loyal readership.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=SR&backgroundColor=9f1239',
		initials: 'SR',
		sports: ['racing'],
	},
	// Olympics
	{
		id: 'rachel-foster',
		name: 'Rachel Foster',
		role: 'Olympics Editor',
		bio: 'Rachel is a dedicated Olympics reporter who has covered every Summer and Winter Games since 2016. She specializes in athletics, swimming, and multi-sport event coverage.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=RF&backgroundColor=be185d',
		initials: 'RF',
		sports: ['olympics'],
		social: { twitter: '@rachelfoster_oly' }
	},
	{
		id: 'daniel-okafor',
		name: 'Daniel Okafor',
		role: 'Olympics Correspondent',
		bio: 'Daniel covers the Olympic movement, World Athletics, and international multi-sport events. He brings particular insight into African and emerging nations\' growing presence on the world stage.',
		avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=DO&backgroundColor=92400e',
		initials: 'DO',
		sports: ['olympics'],
	},
];

// Map sport to its 2 dedicated authors
const sportAuthorMap: Record<string, string[]> = {
	tennis: ['marcus-chen', 'nina-petrova'],
	golf: ['tom-bradley', 'lisa-nakamura'],
	soccer: ['james-oconnor', 'carlos-mendez'],
	nfl: ['sarah-williams', 'mike-rawlings'],
	nba: ['devon-jackson', 'maya-thompson'],
	mma: ['elena-rodriguez', 'ryan-kowalski'],
	boxing: ['frank-davis', 'amanda-cross'],
	mlb: ['david-thompson', 'jenny-walker'],
	nhl: ['eric-lindqvist', 'kate-morrison'],
	cricket: ['priya-sharma', 'arun-desai'],
	rugby: ['owen-hughes', 'brooke-taylor'],
	esports: ['alex-park', 'zoe-chen'],
	racing: ['luca-ferrari', 'samantha-reed'],
	olympics: ['rachel-foster', 'daniel-okafor'],
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
