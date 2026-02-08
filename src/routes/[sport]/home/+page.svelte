<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { format, formatDistanceToNow, addDays, subDays } from 'date-fns';
	
	// SSR data from +page.server.ts
	export let data;

	function timeAgo(date) {
		const d = new Date(date);
		const now = new Date();
		const diffMs = now.getTime() - d.getTime();
		const diffMins = Math.floor(diffMs / 60000);
		if (diffMins < 1) return 'Just now';
		if (diffMins < 60) return `${diffMins}m ago`;
		const diffHours = Math.floor(diffMins / 60);
		if (diffHours < 24) return `${diffHours}h ago`;
		const diffDays = Math.floor(diffHours / 24);
		if (diffDays < 7) return `${diffDays}d ago`;
		return formatDistanceToNow(d, { addSuffix: true });
	}
	import PageSEO from '$lib/components/seo/PageSEO.svelte';
	import SportIntro from '$lib/components/SportIntro.svelte';
	import { getNewsArticlesBySport, getFeaturedArticleBySport } from '$lib/services/news.service';
	import { cache } from '$lib/services/cache.service';
	
	let sport = null;
	let sportData = null;
	let loading = !(data?.ssrArticles?.length > 0);
	let activeTab = 'news';
	let newsArticles = data?.ssrArticles || [];
	let upcomingEvents = data?.ssrTournaments || [];
	let recentResults = [];
	let topPlayers = [];
	let standings = [];
	let featuredContent = data?.ssrFeatured || null;
	let featuredArticleId = data?.ssrFeatured?.id || null;
	let ssrAthletes = data?.ssrAthletes || [];
	let featuredArticle = null;
	
	// React to route/data changes (client-side navigation between sports)
	$: if (data) {
		newsArticles = data.ssrArticles || [];
		featuredContent = data.ssrFeatured || null;
		featuredArticleId = data.ssrFeatured?.id || null;
		ssrAthletes = data.ssrAthletes || [];
		upcomingEvents = data.ssrTournaments || [];
		loading = !(data.ssrArticles?.length > 0);
	}
	
	const tabs = [
		{ id: 'news', label: 'News' },
		{ id: 'scores', label: 'Scores' },
		{ id: 'standings', label: 'Standings' },
		{ id: 'schedule', label: 'Schedule' },
		{ id: 'players', label: 'Top Players' }
	];
	
	// Comprehensive sport configurations
	const sportsConfig = {
		'ncaaf': {
			name: 'College Football',
			shortName: 'NCAAF',
			icon: '🏈',
			color: 'from-orange-600 to-red-700',
			bgColor: 'bg-orange-600',
			description: 'NCAA Division I Football Bowl Subdivision - The premier level of college football in the United States.',
			leagues: [
				{ name: 'SEC', fullName: 'Southeastern Conference', teams: 16 },
				{ name: 'Big Ten', fullName: 'Big Ten Conference', teams: 18 },
				{ name: 'ACC', fullName: 'Atlantic Coast Conference', teams: 17 },
				{ name: 'Big 12', fullName: 'Big 12 Conference', teams: 16 },
				{ name: 'Pac-12', fullName: 'Pac-12 Conference', teams: 4 }
			],
			teams: ['Alabama', 'Georgia', 'Michigan', 'Ohio State', 'Texas', 'Oregon', 'Penn State', 'USC', 'Clemson', 'Notre Dame', 'Florida State', 'LSU'],
			topPlayers: [
				{ name: 'Arch Manning', team: 'Texas', position: 'QB', stats: '3,200 YDS, 28 TD', image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=100&h=100&fit=crop' },
				{ name: 'Travis Hunter', team: 'Colorado', position: 'WR/CB', stats: '1,100 YDS, 12 TD', image: 'https://images.unsplash.com/photo-1587502537104-aac10f5fb6f7?w=100&h=100&fit=crop' },
				{ name: 'Quinshon Judkins', team: 'Ohio State', position: 'RB', stats: '1,450 YDS, 15 TD', image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=100&h=100&fit=crop' },
				{ name: 'Tetairoa McMillan', team: 'Arizona', position: 'WR', stats: '1,300 YDS, 10 TD', image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=100&h=100&fit=crop' },
				{ name: 'Cam Ward', team: 'Miami', position: 'QB', stats: '3,800 YDS, 32 TD', image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=100&h=100&fit=crop' }
			]
		},
		'wnba': {
			name: 'WNBA',
			shortName: 'WNBA',
			icon: '🏀',
			color: 'from-orange-500 to-red-600',
			bgColor: 'bg-orange-500',
			description: "Women's National Basketball Association - The world's premier women's professional basketball league.",
			leagues: [
				{ name: 'Eastern Conference', fullName: 'WNBA Eastern Conference', teams: 6 },
				{ name: 'Western Conference', fullName: 'WNBA Western Conference', teams: 6 }
			],
			teams: ['Las Vegas Aces', 'New York Liberty', 'Connecticut Sun', 'Seattle Storm', 'Dallas Wings', 'Phoenix Mercury', 'Minnesota Lynx', 'Chicago Sky', 'Indiana Fever', 'Los Angeles Sparks', 'Washington Mystics', 'Atlanta Dream'],
			topPlayers: [
				{ name: "A'ja Wilson", team: 'Las Vegas Aces', position: 'F', stats: '22.8 PPG, 9.5 RPG', image: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=100&h=100&fit=crop' },
				{ name: 'Breanna Stewart', team: 'New York Liberty', position: 'F', stats: '20.1 PPG, 8.2 RPG', image: 'https://images.unsplash.com/photo-1474224017046-182ece80b263?w=100&h=100&fit=crop' },
				{ name: 'Caitlin Clark', team: 'Indiana Fever', position: 'G', stats: '19.2 PPG, 8.4 APG', image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=100&h=100&fit=crop' },
				{ name: 'Napheesa Collier', team: 'Minnesota Lynx', position: 'F', stats: '21.3 PPG, 9.8 RPG', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
				{ name: 'Sabrina Ionescu', team: 'New York Liberty', position: 'G', stats: '18.5 PPG, 6.1 APG', image: 'https://images.unsplash.com/photo-1546961342-ea5f71b193f3?w=100&h=100&fit=crop' }
			]
		},
		'tennis': {
			name: 'Tennis',
			shortName: 'Tennis',
			icon: '🎾',
			color: 'from-green-600 to-emerald-700',
			bgColor: 'bg-green-600',
			description: 'Professional tennis featuring ATP and WTA tours, Grand Slam tournaments, and Davis Cup competitions.',
			leagues: [
				{ name: 'ATP Tour', fullName: 'Association of Tennis Professionals', teams: 500 },
				{ name: 'WTA Tour', fullName: "Women's Tennis Association", teams: 350 },
				{ name: 'Grand Slams', fullName: 'Major Championships', teams: 4 },
				{ name: 'Davis Cup', fullName: 'Davis Cup by Rakuten', teams: 148 }
			],
			teams: ['Australian Open', 'French Open', 'Wimbledon', 'US Open', 'ATP Finals', 'WTA Finals', 'Indian Wells', 'Miami Open', 'Monte Carlo', 'Rome Masters'],
			topPlayers: [
				{ name: 'Jannik Sinner', team: 'Italy', position: '#1 ATP', stats: '8 Titles, 73-12 W-L', image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=100&h=100&fit=crop' },
				{ name: 'Carlos Alcaraz', team: 'Spain', position: '#2 ATP', stats: '6 Titles, 62-15 W-L', image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=100&h=100&fit=crop' },
				{ name: 'Novak Djokovic', team: 'Serbia', position: '#3 ATP', stats: '4 Titles, 48-10 W-L', image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=100&h=100&fit=crop' },
				{ name: 'Aryna Sabalenka', team: 'Belarus', position: '#1 WTA', stats: '7 Titles, 70-14 W-L', image: 'https://images.unsplash.com/photo-1617083934551-ac1f8a0d4d1e?w=100&h=100&fit=crop' },
				{ name: 'Iga Świątek', team: 'Poland', position: '#2 WTA', stats: '6 Titles, 65-12 W-L', image: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?w=100&h=100&fit=crop' }
			]
		},
		'golf': {
			name: 'Golf',
			shortName: 'Golf',
			icon: '⛳',
			color: 'from-green-700 to-green-900',
			bgColor: 'bg-green-700',
			description: 'Professional golf featuring PGA Tour, European Tour, LIV Golf, and Major Championships.',
			leagues: [
				{ name: 'PGA Tour', fullName: 'PGA Tour', teams: 200 },
				{ name: 'DP World Tour', fullName: 'DP World Tour (European Tour)', teams: 150 },
				{ name: 'LIV Golf', fullName: 'LIV Golf League', teams: 54 },
				{ name: 'LPGA Tour', fullName: "Ladies Professional Golf Association", teams: 160 }
			],
			teams: ['The Masters', 'US Open', 'The Open Championship', 'PGA Championship', 'Players Championship', 'FedEx Cup', 'Ryder Cup', 'Presidents Cup'],
			topPlayers: [
				{ name: 'Scottie Scheffler', team: 'USA', position: '#1 OWGR', stats: '9 Wins, 2 Majors', image: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=100&h=100&fit=crop' },
				{ name: 'Xander Schauffele', team: 'USA', position: '#2 OWGR', stats: '5 Wins, 2 Majors', image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=100&h=100&fit=crop' },
				{ name: 'Rory McIlroy', team: 'N. Ireland', position: '#3 OWGR', stats: '4 Wins, 4 Majors', image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=100&h=100&fit=crop' },
				{ name: 'Jon Rahm', team: 'Spain', position: '#4 OWGR', stats: '3 Wins, 2 Majors', image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=100&h=100&fit=crop' },
				{ name: 'Nelly Korda', team: 'USA', position: '#1 LPGA', stats: '7 Wins, 1 Major', image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=100&h=100&fit=crop' }
			]
		},
		'mma': {
			name: 'MMA / UFC',
			shortName: 'UFC',
			icon: '🥊',
			color: 'from-red-700 to-black',
			bgColor: 'bg-red-700',
			description: 'Ultimate Fighting Championship and Mixed Martial Arts - The pinnacle of combat sports competition.',
			leagues: [
				{ name: 'UFC', fullName: 'Ultimate Fighting Championship', teams: 700 },
				{ name: 'Bellator', fullName: 'Bellator MMA', teams: 150 },
				{ name: 'ONE Championship', fullName: 'ONE Championship', teams: 200 },
				{ name: 'PFL', fullName: 'Professional Fighters League', teams: 100 }
			],
			teams: ['Heavyweight', 'Light Heavyweight', 'Middleweight', 'Welterweight', 'Lightweight', 'Featherweight', 'Bantamweight', 'Flyweight'],
			topPlayers: [
				{ name: 'Islam Makhachev', team: 'Russia', position: 'Lightweight Champion', stats: '26-1, 14 KO', image: 'https://images.unsplash.com/photo-1549824942-c37c8c03abf0?w=100&h=100&fit=crop' },
				{ name: 'Jon Jones', team: 'USA', position: 'Heavyweight Champion', stats: '27-1, 10 KO', image: 'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?w=100&h=100&fit=crop' },
				{ name: 'Alex Pereira', team: 'Brazil', position: 'Light Heavyweight Champion', stats: '10-2, 9 KO', image: 'https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?w=100&h=100&fit=crop' },
				{ name: 'Leon Edwards', team: 'UK', position: 'Welterweight Champion', stats: '22-3, 7 KO', image: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=100&h=100&fit=crop' },
				{ name: 'Sean O\'Malley', team: 'USA', position: 'Bantamweight Champion', stats: '18-1, 12 KO', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=100&h=100&fit=crop' }
			]
		},
		'boxing': {
			name: 'Boxing',
			shortName: 'Boxing',
			icon: '🥊',
			color: 'from-yellow-600 to-red-700',
			bgColor: 'bg-yellow-600',
			description: 'Professional boxing featuring world championship fights across all weight divisions.',
			leagues: [
				{ name: 'WBC', fullName: 'World Boxing Council', teams: 17 },
				{ name: 'WBA', fullName: 'World Boxing Association', teams: 17 },
				{ name: 'IBF', fullName: 'International Boxing Federation', teams: 17 },
				{ name: 'WBO', fullName: 'World Boxing Organization', teams: 17 }
			],
			teams: ['Heavyweight', 'Cruiserweight', 'Light Heavyweight', 'Super Middleweight', 'Middleweight', 'Welterweight', 'Lightweight', 'Featherweight'],
			topPlayers: [
				{ name: 'Oleksandr Usyk', team: 'Ukraine', position: 'Undisputed Heavyweight', stats: '22-0, 14 KO', image: 'https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=100&h=100&fit=crop' },
				{ name: 'Terence Crawford', team: 'USA', position: 'Undisputed Welterweight', stats: '40-0, 31 KO', image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=100&h=100&fit=crop' },
				{ name: 'Naoya Inoue', team: 'Japan', position: 'Undisputed Super Bantamweight', stats: '27-0, 24 KO', image: 'https://images.unsplash.com/photo-1549824942-c37c8c03abf0?w=100&h=100&fit=crop' },
				{ name: 'Canelo Álvarez', team: 'Mexico', position: 'Super Middleweight', stats: '61-2-2, 39 KO', image: 'https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?w=100&h=100&fit=crop' },
				{ name: 'Shakur Stevenson', team: 'USA', position: 'Lightweight', stats: '21-0, 10 KO', image: 'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?w=100&h=100&fit=crop' }
			]
		},
		'racing': {
			name: 'Racing',
			shortName: 'Racing',
			icon: '🏎️',
			color: 'from-red-600 to-black',
			bgColor: 'bg-red-600',
			description: 'Motorsport racing including Formula 1, NASCAR, IndyCar, and MotoGP championships.',
			leagues: [
				{ name: 'Formula 1', fullName: 'FIA Formula One World Championship', teams: 10 },
				{ name: 'NASCAR', fullName: 'NASCAR Cup Series', teams: 40 },
				{ name: 'IndyCar', fullName: 'NTT IndyCar Series', teams: 27 },
				{ name: 'MotoGP', fullName: 'MotoGP World Championship', teams: 22 }
			],
			teams: ['Red Bull Racing', 'Ferrari', 'McLaren', 'Mercedes', 'Aston Martin', 'Williams', 'Alpine', 'Haas', 'Sauber', 'RB'],
			topPlayers: [
				{ name: 'Max Verstappen', team: 'Red Bull Racing', position: 'F1 Champion', stats: '63 Wins, 4x WDC', image: 'https://images.unsplash.com/photo-1615063029369-b5e488a3ab36?w=100&h=100&fit=crop' },
				{ name: 'Lando Norris', team: 'McLaren', position: 'F1 Driver', stats: '4 Wins, 2nd WDC', image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=100&h=100&fit=crop' },
				{ name: 'Charles Leclerc', team: 'Ferrari', position: 'F1 Driver', stats: '8 Wins, 3rd WDC', image: 'https://images.unsplash.com/photo-1594950195379-76d90a0a60d4?w=100&h=100&fit=crop' },
				{ name: 'Kyle Larson', team: 'Hendrick', position: 'NASCAR', stats: '2021 Champion', image: 'https://images.unsplash.com/photo-1541447553118-e9462fb9bd8c?w=100&h=100&fit=crop' },
				{ name: 'Francesco Bagnaia', team: 'Ducati', position: 'MotoGP Champion', stats: '2x World Champion', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop' }
			]
		},
		'olympics': {
			name: 'Olympics',
			shortName: 'Olympics',
			icon: '🏅',
			color: 'from-blue-600 to-yellow-500',
			bgColor: 'bg-blue-600',
			description: 'The Olympic Games - The worlds greatest sporting event featuring athletes from over 200 nations.',
			leagues: [
				{ name: 'Summer Olympics', fullName: 'Summer Olympic Games', teams: 206 },
				{ name: 'Winter Olympics', fullName: 'Winter Olympic Games', teams: 91 },
				{ name: 'Paralympics', fullName: 'Paralympic Games', teams: 184 },
				{ name: 'Youth Olympics', fullName: 'Youth Olympic Games', teams: 204 }
			],
			teams: ['USA', 'China', 'Great Britain', 'France', 'Germany', 'Japan', 'Australia', 'Italy', 'Canada', 'Netherlands'],
			topPlayers: [
				{ name: 'Simone Biles', team: 'USA', position: 'Gymnastics', stats: '11 Olympic Medals', image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=100&h=100&fit=crop' },
				{ name: 'Katie Ledecky', team: 'USA', position: 'Swimming', stats: '14 Olympic Medals', image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=100&h=100&fit=crop' },
				{ name: 'Usain Bolt', team: 'Jamaica', position: 'Athletics (Ret.)', stats: '8 Gold Medals', image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=100&h=100&fit=crop' },
				{ name: 'Michael Phelps', team: 'USA', position: 'Swimming (Ret.)', stats: '28 Olympic Medals', image: 'https://images.unsplash.com/photo-1504197832061-98356e3dcdcf?w=100&h=100&fit=crop' },
				{ name: 'Léon Marchand', team: 'France', position: 'Swimming', stats: '4 Gold Paris 2024', image: 'https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=100&h=100&fit=crop' }
			]
		},
		'esports': {
			name: 'Esports',
			shortName: 'Esports',
			icon: '🎮',
			color: 'from-purple-600 to-pink-600',
			bgColor: 'bg-purple-600',
			description: 'Competitive gaming featuring top tournaments in League of Legends, CS2, Dota 2, Valorant, and more.',
			leagues: [
				{ name: 'LoL Worlds', fullName: 'League of Legends World Championship', teams: 24 },
				{ name: 'The International', fullName: 'Dota 2 The International', teams: 20 },
				{ name: 'CS2 Major', fullName: 'Counter-Strike 2 Major', teams: 24 },
				{ name: 'VCT', fullName: 'Valorant Champions Tour', teams: 16 }
			],
			teams: ['T1', 'Gen.G', 'Fnatic', 'Cloud9', 'Team Liquid', 'G2 Esports', 'NAVI', 'Team Spirit', 'Sentinels', 'Paper Rex'],
			topPlayers: [
				{ name: 'Faker', team: 'T1', position: 'LoL Mid', stats: '4x World Champion', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop' },
				{ name: 's1mple', team: 'NAVI', position: 'CS2', stats: '1x Major Champion', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0b?w=100&h=100&fit=crop' },
				{ name: 'Yatoro', team: 'Team Spirit', position: 'Dota 2 Carry', stats: '2x TI Champion', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&h=100&fit=crop' },
				{ name: 'TenZ', team: 'Sentinels', position: 'Valorant', stats: '1x Champions', image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f069a?w=100&h=100&fit=crop' },
				{ name: 'Chovy', team: 'Gen.G', position: 'LoL Mid', stats: '1x World Champion', image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=100&h=100&fit=crop' }
			]
		},
		'cricket': {
			name: 'Cricket',
			shortName: 'Cricket',
			icon: '🏏',
			color: 'from-green-600 to-blue-700',
			bgColor: 'bg-green-600',
			description: 'International and domestic cricket featuring Test matches, ODIs, T20s, and premier leagues like IPL.',
			leagues: [
				{ name: 'IPL', fullName: 'Indian Premier League', teams: 10 },
				{ name: 'ICC Tests', fullName: 'ICC World Test Championship', teams: 12 },
				{ name: 'ICC ODI', fullName: 'ICC Cricket World Cup', teams: 12 },
				{ name: 'T20 World Cup', fullName: 'ICC T20 World Cup', teams: 20 }
			],
			teams: ['India', 'Australia', 'England', 'Pakistan', 'South Africa', 'New Zealand', 'West Indies', 'Sri Lanka', 'Bangladesh', 'Afghanistan'],
			topPlayers: [
				{ name: 'Virat Kohli', team: 'India', position: 'Batsman', stats: '80 Intl Centuries', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=100&h=100&fit=crop' },
				{ name: 'Joe Root', team: 'England', position: 'Batsman', stats: '35 Test Centuries', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=100&h=100&fit=crop' },
				{ name: 'Jasprit Bumrah', team: 'India', position: 'Bowler', stats: '#1 ICC Bowler', image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=100&h=100&fit=crop' },
				{ name: 'Pat Cummins', team: 'Australia', position: 'Captain/Bowler', stats: '2x WC Winner', image: 'https://images.unsplash.com/photo-1594470117722-8dba85b0c3e1?w=100&h=100&fit=crop' },
				{ name: 'Babar Azam', team: 'Pakistan', position: 'Batsman', stats: '30 ODI Centuries', image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=100&h=100&fit=crop' }
			]
		},
		'rugby': {
			name: 'Rugby',
			shortName: 'Rugby',
			icon: '🏉',
			color: 'from-green-700 to-green-900',
			bgColor: 'bg-green-700',
			description: 'International rugby union and rugby league featuring Six Nations, Rugby World Cup, and club competitions.',
			leagues: [
				{ name: 'Six Nations', fullName: 'Six Nations Championship', teams: 6 },
				{ name: 'Rugby Championship', fullName: 'The Rugby Championship', teams: 4 },
				{ name: 'World Cup', fullName: 'Rugby World Cup', teams: 20 },
				{ name: 'Champions Cup', fullName: 'Investec Champions Cup', teams: 24 }
			],
			teams: ['New Zealand', 'South Africa', 'Ireland', 'France', 'England', 'Australia', 'Scotland', 'Wales', 'Argentina', 'Fiji'],
			topPlayers: [
				{ name: 'Antoine Dupont', team: 'France', position: 'Scrum-half', stats: 'World Player 2021', image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=100&h=100&fit=crop' },
				{ name: 'Eben Etzebeth', team: 'South Africa', position: 'Lock', stats: '2x World Champion', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=100&h=100&fit=crop' },
				{ name: 'Caelan Doris', team: 'Ireland', position: 'No. 8', stats: '#1 Ranked Team', image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop' },
				{ name: 'Ardie Savea', team: 'New Zealand', position: 'Flanker', stats: 'World Player 2023', image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&h=100&fit=crop' },
				{ name: 'Marcus Smith', team: 'England', position: 'Fly-half', stats: '30+ Intl Caps', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' }
			]
		}
	};
	
	// Sport-specific image mappings for better visuals
	const sportImages = {
		'nfl': ['1574629810360-7efbbe195018', '1574629810360-7efbbe195018', '1547036967-23d11aaca629', '1547036967-23d11aaca629'],
		'nba': ['1519861531473-9200262188bf', '1504450758481-7338eba7524a', '1519861531473-9200262188bf', '1504450758481-7338eba7524a'],
		'mlb': ['1566577739112-5180d4f9390a', '1566577739112-5180d4f9390a', '1566577739112-5180d4f9390a', '1566577739112-5180d4f9390a'],
		'nhl': ['1547036967-23d11aaca629', '1547036967-23d11aaca629', '1547036967-23d11aaca629', '1547036967-23d11aaca629'],
		'soccer': ['1574629810360-7efbbe195018', '1574629810360-7efbbe195018', '1574629810360-7efbbe195018', '1574629810360-7efbbe195018'],
		'ncaf': ['1574629810360-7efbbe195018', '1547036967-23d11aaca629', '1574629810360-7efbbe195018', '1547036967-23d11aaca629'],
		'wnba': ['1519861531473-9200262188bf', '1504450758481-7338eba7524a', '1519861531473-9200262188bf', '1504450758481-7338eba7524a'],
		'tennis': ['1595435934249-5df7ed86e1c0', '1622279457486-62dcc4a431d6', '1595435934249-5df7ed86e1c0', '1622279457486-62dcc4a431d6'],
		'golf': ['1535131749006-b7f58c99034b', '1535131749006-b7f58c99034b', '1535131749006-b7f58c99034b', '1535131749006-b7f58c99034b'],
		'mma': ['1547036967-23d11aaca629', '1547036967-23d11aaca629', '1547036967-23d11aaca629', '1547036967-23d11aaca629'],
		'boxing': ['1547036967-23d11aaca629', '1547036967-23d11aaca629', '1547036967-23d11aaca629', '1547036967-23d11aaca629'],
		'racing': ['1547036967-23d11aaca629', '1547036967-23d11aaca629', '1547036967-23d11aaca629', '1547036967-23d11aaca629'],
		'olympics': ['1547036967-23d11aaca629', '1547036967-23d11aaca629', '1547036967-23d11aaca629', '1547036967-23d11aaca629'],
		'esports': ['1542751371-adc38448a05e', '1511512578047-dfb367046420', '1542751371-adc38448a05e', '1511512578047-dfb367046420'],
		'cricket': ['1531415074968-036ba1b575da', '1540747913346-19e32dc3e97e', '1531415074968-036ba1b575da', '1540747913346-19e32dc3e97e'],
		'rugby': ['1544723795-3fb6469f5b39', '1571019614242-c5c5dee9f50b', '1544723795-3fb6469f5b39', '1571019614242-c5c5dee9f50b']
	};
	
	// Sport-specific featured content
	const sportFeaturedContent = {
		'nfl': {
			title: 'NFL 2025 Season: Super Bowl Contenders and Key Storylines',
			excerpt: 'Breaking down the top teams, MVP candidates, and must-watch matchups as the NFL season heats up.',
			image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=600&fit=crop&q=80'
		},
		'nba': {
			title: 'NBA Playoffs 2025: Championship Race Intensifies',
			excerpt: 'Top teams battle for supremacy as the regular season winds down and playoff positioning becomes critical.',
			image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=1200&h=600&fit=crop&q=80'
		},
		'mlb': {
			title: 'MLB Season 2025: World Series Favorites Emerge',
			excerpt: 'Powerhouse teams and rising stars dominate as the race for October baseball heats up.',
			image: 'https://images.unsplash.com/photo-1566577739112-5180d4f9390a?w=1200&h=600&fit=crop&q=80'
		},
		'nhl': {
			title: 'NHL 2025: Stanley Cup Contenders Battle for Supremacy',
			excerpt: 'Elite teams and star players compete for hockey\'s ultimate prize as the season reaches its climax.',
			image: 'https://images.unsplash.com/photo-1547036967-23d11aaca629?w=1200&h=600&fit=crop&q=80'
		},
		'soccer': {
			title: 'European Football 2025: Champions League and League Races',
			excerpt: 'Top clubs compete for domestic and European glory as the season enters its decisive phase.',
			image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=600&fit=crop&q=80'
		},
		'ncaf': {
			title: 'College Football 2025: Playoff Picture Takes Shape',
			excerpt: 'Top programs battle for playoff spots as conference championships and bowl season approach.',
			image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=600&fit=crop&q=80'
		},
		'wnba': {
			title: 'WNBA 2025: Championship Race Heats Up',
			excerpt: 'Elite teams and superstar players compete for the WNBA title as the season reaches its peak.',
			image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=1200&h=600&fit=crop&q=80'
		},
		'tennis': {
			title: 'Tennis 2025: Grand Slam Season in Full Swing',
			excerpt: 'Top players compete for major titles as the ATP and WTA tours showcase the world\'s best talent.',
			image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=1200&h=600&fit=crop&q=80'
		},
		'golf': {
			title: 'Golf 2025: Major Championships and Tour Highlights',
			excerpt: 'Top golfers compete for major titles and tour championships as the season reaches its peak.',
			image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&h=600&fit=crop&q=80'
		},
		'mma': {
			title: 'UFC 2025: Championship Fights and Rising Stars',
			excerpt: 'Top fighters compete for titles and rankings as the UFC showcases the best in mixed martial arts.',
			image: 'https://images.unsplash.com/photo-1547036967-23d11aaca629?w=1200&h=600&fit=crop&q=80'
		},
		'boxing': {
			title: 'Boxing 2025: Championship Bouts and Super Fights',
			excerpt: 'Top fighters compete for world titles and legacy-defining matchups in the ring.',
			image: 'https://images.unsplash.com/photo-1547036967-23d11aaca629?w=1200&h=600&fit=crop&q=80'
		},
		'racing': {
			title: 'Racing 2025: Formula 1 and Motorsport Highlights',
			excerpt: 'Top drivers compete for championships as Formula 1 and other racing series showcase speed and skill.',
			image: 'https://images.unsplash.com/photo-1547036967-23d11aaca629?w=1200&h=600&fit=crop&q=80'
		},
		'olympics': {
			title: 'Olympics 2025: World\'s Best Athletes Compete',
			excerpt: 'Elite athletes from around the world compete for Olympic glory and world records.',
			image: 'https://images.unsplash.com/photo-1547036967-23d11aaca629?w=1200&h=600&fit=crop&q=80'
		},
		'esports': {
			title: 'Esports 2025: Major Tournaments and Championship Series',
			excerpt: 'Top teams and players compete for millions in prize money across League of Legends, CS2, and more.',
			image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop&q=80'
		},
		'cricket': {
			title: 'Cricket 2025: International Series and Premier Leagues',
			excerpt: 'Top teams compete in Test matches, ODIs, T20s, and premier leagues around the world.',
			image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&h=600&fit=crop&q=80'
		},
		'rugby': {
			title: 'Rugby 2025: International Competitions and Club Championships',
			excerpt: 'Top teams compete in Six Nations, Rugby Championship, and club competitions worldwide.',
			image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=1200&h=600&fit=crop&q=80'
		}
	};
	
	function generateNews(sportConfig) {
		const newsTemplates = [
			{ title: `${sportConfig.name} Season Preview: Top Contenders Revealed`, category: 'Preview' },
			{ title: `Breaking: Major Trade Shakes Up ${sportConfig.name}`, category: 'Breaking News' },
			{ title: `${sportConfig.topPlayers[0]?.name || 'Star'} Signs Record Extension`, category: 'Contracts' },
			{ title: `Injury Update: Key Players Return for ${sportConfig.name}`, category: 'Injuries' },
			{ title: `Championship Predictions: Experts Weigh In`, category: 'Analysis' },
			{ title: `Rising Stars to Watch in ${sportConfig.name}`, category: 'Features' },
			{ title: `Historic Performance Sets New ${sportConfig.name} Record`, category: 'Records' },
			{ title: `${sportConfig.leagues[0]?.name || 'League'} Announces Schedule Changes`, category: 'Schedule' }
		];
		
		const sportCode = sport.toLowerCase();
		const images = sportImages[sportCode] || sportImages['nfl'];
		
		return newsTemplates.map((template, i) => ({
			id: `${sport}-news-${i}`,
			title: template.title,
			category: template.category,
			excerpt: `Latest news and updates from the world of ${sportConfig.name}. Stay informed with comprehensive coverage.`,
			author: 'Sports Desk',
			date: subDays(new Date(), i * 2).toISOString(),
			image: `https://images.unsplash.com/photo-${images[i % images.length]}?w=400&h=250&fit=crop&q=80`,
			readTime: Math.floor(Math.random() * 5) + 3
		}));
	}
	
	function generateUpcomingEvents(sportConfig) {
		return sportConfig.teams.slice(0, 8).map((team, i) => ({
			id: `event-${i}`,
			homeTeam: team,
			awayTeam: sportConfig.teams[(i + 4) % sportConfig.teams.length],
			date: addDays(new Date(), i + 1).toISOString(),
			time: `${12 + i}:00`,
			venue: `${team} Arena`,
			broadcast: ['ESPN', 'TNT', 'FOX', 'CBS'][i % 4],
			league: sportConfig.leagues[0]?.name || sportConfig.shortName
		}));
	}
	
	function generateRecentResults(sportConfig) {
		return sportConfig.teams.slice(0, 6).map((team, i) => ({
			id: `result-${i}`,
			homeTeam: team,
			awayTeam: sportConfig.teams[(i + 3) % sportConfig.teams.length],
			homeScore: Math.floor(Math.random() * 30) + 70,
			awayScore: Math.floor(Math.random() * 30) + 65,
			date: subDays(new Date(), i + 1).toISOString(),
			status: 'Final',
			league: sportConfig.leagues[0]?.name || sportConfig.shortName
		}));
	}
	
	function generateStandings(sportConfig) {
		return sportConfig.teams.slice(0, 10).map((team, i) => ({
			rank: i + 1,
			team: team,
			wins: 50 - i * 3 + Math.floor(Math.random() * 5),
			losses: 20 + i * 2 + Math.floor(Math.random() * 5),
			pct: (0.750 - i * 0.05).toFixed(3),
			streak: ['W3', 'W2', 'L1', 'W5', 'L2', 'W1', 'L3', 'W4', 'L1', 'W2'][i],
			last10: `${8 - Math.floor(i / 2)}-${2 + Math.floor(i / 2)}`
		}));
	}
	
	let hasCachedData = false;
	
	async function loadSportData(useCache = true) {
		const sportCode = $page.params.sport.toLowerCase();
		
		// Check cache first
		if (useCache) {
			const cacheKey = `sport-home-${sportCode}`;
			const cached = cache.get(cacheKey);
			
			if (cached) {
				// Use cached data immediately (no skeleton)
				sportData = cached.sportData;
				newsArticles = cached.articles;
				featuredArticle = cached.featuredArticle;
				sport = sportCode;
				sportData = cached.sportData;
				if (featuredArticle) {
					featuredArticleId = featuredArticle.id;
					featuredContent = {
						title: featuredArticle.title,
						image: featuredArticle.image,
						excerpt: featuredArticle.excerpt
					};
				}
				hasCachedData = true;
				loading = false;
				
				// Fetch fresh data in background
				loadSportData(false);
				return;
			}
		}
		
		if (!hasCachedData) {
			loading = true;
		}
		
		sportData = sportsConfig[sportCode];
		
		if (!sportData) {
			// Default fallback for unsupported sports
			sportData = {
				name: sportCode.toUpperCase(),
				shortName: sportCode.toUpperCase(),
				icon: '🏆',
				color: 'from-blue-600 to-blue-800',
				bgColor: 'bg-blue-600',
				description: `Welcome to ${sportCode.toUpperCase()} coverage.`,
				leagues: [{ name: 'League', fullName: 'Main League', teams: 20 }],
				teams: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team F', 'Team G', 'Team H'],
				topPlayers: []
			};
		}
		
		sport = sportCode;
		
		try {
			// Load real articles from database
			const [articlesResult, featuredArticleResult] = await Promise.all([
				getNewsArticlesBySport(sportCode, 8),
				getFeaturedArticleBySport(sportCode)
			]);
			
			newsArticles = articlesResult;
			featuredArticle = featuredArticleResult;
			
			// Cache the results
			const cacheKey = `sport-home-${sportCode}`;
			cache.set(cacheKey, {
				sportData,
				articles: articlesResult,
				featuredArticle: featuredArticleResult
			}, 5 * 60 * 1000); // 5 minutes TTL
			
			// Set featured content from database or fallback
			if (featuredArticle) {
				featuredArticleId = featuredArticle.id;
				featuredContent = {
					title: featuredArticle.title,
					image: featuredArticle.image,
					excerpt: featuredArticle.excerpt
				};
			} else {
				featuredArticleId = null;
				// Fallback to sport-specific content if no featured article
				const featured = sportFeaturedContent[sportCode] || {
					title: `${sportData.name} Season 2025: Everything You Need to Know`,
					excerpt: `Comprehensive preview of the upcoming ${sportData.name} season, featuring top storylines, predictions, and key matchups.`,
					image: 'https://images.unsplash.com/photo-1461896836934-47e5c98aebe1?w=1200&h=600&fit=crop&q=80'
				};
				
				featuredContent = {
					title: featured.title,
					image: featured.image,
					excerpt: featured.excerpt
				};
			}
			
			// Events and athletes come from SSR data (real DB)
			// Only mock data remaining: recentResults, standings (no DB tables for these yet)
			recentResults = generateRecentResults(sportData);
			standings = generateStandings(sportData);
		} catch (error) {
			console.error('Failed to load sport data:', error);
		} finally {
			loading = false;
			hasCachedData = false;
		}
	}
	
	// Reactive statement to reload when route parameter changes
	$: if ($page.params.sport) {
		loadSportData();
	}
	
	onMount(() => {
		// Initial load is handled by reactive statement, but we can call it here too for safety
		if ($page.params.sport) {
			loadSportData();
		}
	});
</script>

<PageSEO 
	title={sportData?.name ? `${sportData.name} News, Scores & Standings` : 'Sports'}
	description={sportData?.description || 'Sports news and coverage'}
/>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	{#if loading}
		<!-- Skeleton Loader -->
		<div class="animate-pulse">
			<!-- Hero Skeleton -->
			<div class="h-72 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800"></div>
			
			<!-- Content Skeleton -->
			<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
				<div class="flex gap-4 mb-8">
					{#each Array(5) as _}
						<div class="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
					{/each}
				</div>
				<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div class="lg:col-span-2 space-y-6">
						{#each Array(4) as _}
							<div class="h-48 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
						{/each}
					</div>
					<div class="space-y-6">
						<div class="h-64 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
						<div class="h-48 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
					</div>
				</div>
			</div>
		</div>
	{:else if sportData}
		<!-- Hero Section -->
		<div class="relative h-72 bg-gradient-to-r {sportData.color} overflow-hidden">
			<div class="absolute inset-0 bg-black/30"></div>
			<div class="absolute inset-0" style="background-image: url('https://images.unsplash.com/photo-1461896836934-47e5c98aebe1?w=1920&h=400&fit=crop'); background-size: cover; background-position: center; opacity: 0.3;"></div>
			
			<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-full flex items-center relative z-10">
				<div class="text-white">
					<div class="flex items-center gap-4 mb-4">
						<span class="text-6xl">{sportData.icon}</span>
						<div>
							<h1 class="text-4xl md:text-5xl font-black">{sportData.name}</h1>
							<p class="text-lg opacity-90 mt-1 max-w-2xl">{sportData.description}</p>
						</div>
					</div>
					
					<!-- Quick Stats -->
					<div class="flex flex-wrap gap-6 mt-6">
						{#each sportData.leagues.slice(0, 4) as league}
							<a href="/{sport}/league/{league.name.toLowerCase().replace(/\s+/g, '-')}" 
							   class="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm">
								<span class="font-semibold">{league.name}</span>
								<span class="text-sm opacity-75">{league.teams} teams</span>
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
		
		<!-- Sport Introduction Section -->
		<SportIntro sport={sport} />
		
		<!-- Navigation Tabs -->
		<div class="sticky top-[88px] z-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
			<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
				<div class="flex gap-1 overflow-x-auto horizontal-gallery py-2">
					{#each tabs as tab}
						<button
							on:click={() => activeTab = tab.id}
							class="px-4 py-2 font-semibold text-sm whitespace-nowrap rounded-lg transition-colors {
								activeTab === tab.id 
									? `${sportData.bgColor} text-white` 
									: 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
							}"
						>
							{tab.label}
						</button>
					{/each}
				</div>
			</div>
		</div>
		
		<!-- Main Content -->
		<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<!-- Main Column -->
				<div class="lg:col-span-2">
					{#if activeTab === 'news'}
						<!-- Featured Article -->
						{#if featuredContent}
							<a href={featuredArticleId ? `/news/${featuredArticleId}` : `/news/${sport}-featured`} class="block mb-8 group">
								<article class="relative h-80 rounded-2xl overflow-hidden">
									<img 
										src={featuredContent.image} 
										alt={featuredContent.title}
										class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									/>
									<div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
									<div class="absolute bottom-0 left-0 right-0 p-6 text-white">
										<span class="inline-block px-3 py-1 bg-red-600 text-xs font-bold rounded mb-3">FEATURED</span>
										<h2 class="text-2xl md:text-3xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
											{featuredContent.title}
										</h2>
										<p class="text-gray-200 line-clamp-2">{featuredContent.excerpt}</p>
									</div>
								</article>
							</a>
						{/if}
						
						<!-- News List -->
						<div class="space-y-4">
							{#each newsArticles as article (article.id)}
								<a 
									href="/news/{article.id}"
									class="group block border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0"
								>
									<article class="flex items-start gap-4">
										<div class="flex-1 min-w-0 w-[70%]">
											<div class="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
												<span class="px-2 py-0.5 text-[10px] font-bold uppercase bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400 rounded">
													{article.category}
												</span>
												<span>{timeAgo(article.date)}</span>
											</div>
											<h3 class="text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-1">
												{article.title}
											</h3>
											<p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
												{article.excerpt}
											</p>
										</div>
									</article>
								</a>
							{/each}
						</div>
					{:else if activeTab === 'scores'}
						<!-- Recent Results -->
						<div class="card p-6 mb-6">
							<h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
								<span class="text-2xl">{sportData.icon}</span>
								Recent Results
							</h2>
							<div class="space-y-4">
								{#each recentResults as result}
									<div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
										<div class="flex-1 text-center">
											<div class="font-bold text-lg text-gray-900 dark:text-white">{result.homeTeam}</div>
											<div class="text-sm text-gray-500">{result.league}</div>
										</div>
										<div class="px-6 text-center">
											<div class="text-2xl font-black text-gray-900 dark:text-white">
												{result.homeScore} - {result.awayScore}
											</div>
											<div class="text-xs text-green-600 font-semibold">{result.status}</div>
										</div>
										<div class="flex-1 text-center">
											<div class="font-bold text-lg text-gray-900 dark:text-white">{result.awayTeam}</div>
											<div class="text-sm text-gray-500">{format(new Date(result.date), 'MMM d')}</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					{:else if activeTab === 'standings'}
						<!-- Standings Table -->
						<div class="card overflow-hidden">
							<div class="p-6 border-b border-gray-200 dark:border-gray-700">
								<h2 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
									<span class="text-2xl">{sportData.icon}</span>
									{sportData.leagues[0]?.name || sportData.shortName} Standings
								</h2>
							</div>
							<div class="overflow-x-auto">
								<table class="w-full">
									<thead class="bg-gray-50 dark:bg-gray-800">
										<tr>
											<th class="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">#</th>
											<th class="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Team</th>
											<th class="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">W</th>
											<th class="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">L</th>
											<th class="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">PCT</th>
											<th class="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">Streak</th>
											<th class="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">L10</th>
										</tr>
									</thead>
									<tbody class="divide-y divide-gray-200 dark:divide-gray-700">
										{#each standings as team}
											<tr class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
												<td class="px-4 py-3 font-bold text-gray-900 dark:text-white">{team.rank}</td>
												<td class="px-4 py-3 font-semibold text-gray-900 dark:text-white">{team.team}</td>
												<td class="px-4 py-3 text-center text-gray-600 dark:text-gray-300">{team.wins}</td>
												<td class="px-4 py-3 text-center text-gray-600 dark:text-gray-300">{team.losses}</td>
												<td class="px-4 py-3 text-center font-semibold text-gray-900 dark:text-white">{team.pct}</td>
												<td class="px-4 py-3 text-center">
													<span class="px-2 py-1 text-xs font-bold rounded {team.streak.startsWith('W') ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}">
														{team.streak}
													</span>
												</td>
												<td class="px-4 py-3 text-center text-gray-600 dark:text-gray-300">{team.last10}</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						</div>
					{:else if activeTab === 'schedule'}
						<!-- Upcoming Schedule -->
						<div class="card p-6">
							<h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
								<span class="text-2xl">{sportData.icon}</span>
								Upcoming Schedule
							</h2>
							<div class="space-y-4">
								{#each upcomingEvents as event}
									<a href="/tournaments/{event.id}" class="block p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow">
										<div class="flex items-center justify-between mb-2">
											<span class="px-2 py-1 {event.status === 'upcoming' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'} text-xs font-bold rounded capitalize">
												{event.end_date && new Date(event.end_date) > new Date() && new Date(event.date) <= new Date() ? 'Live Now' : event.status || 'upcoming'}
											</span>
											{#if event.prize_pool}
												<span class="text-xs font-semibold text-gray-500">${(event.prize_pool / 1000).toFixed(0)}K Prize</span>
											{/if}
										</div>
										<div class="font-bold text-gray-900 dark:text-white">{event.name}</div>
										<div class="flex items-center justify-between mt-2">
											<div class="text-sm text-gray-500">
												{#if event.location}📍 {event.location}{/if}
											</div>
											<div class="text-right">
												<div class="font-semibold text-sm text-gray-900 dark:text-white">{format(new Date(event.date), 'MMM d')}</div>
												{#if event.end_date}
													<div class="text-xs text-gray-500">to {format(new Date(event.end_date), 'MMM d')}</div>
												{/if}
											</div>
										</div>
									</a>
								{/each}
								{#if upcomingEvents.length === 0}
									<div class="text-center py-6 text-gray-500">
										<p class="mb-2">No upcoming tournaments found.</p>
										<a href="/tournaments" class="text-red-600 hover:text-red-700 font-medium">Browse All Tournaments →</a>
									</div>
								{/if}
							</div>
						</div>
					{:else if activeTab === 'players'}
						<!-- Top Players Grid (real DB athletes) -->
						<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
							{#each ssrAthletes as athlete, i}
								<a href="/athletes/{athlete.sport}/{athlete.slug}" class="card p-6 hover:shadow-xl transition-all duration-300 block group">
									<div class="flex items-start gap-4">
										<div class="relative">
											<span class="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r {sportData.color} text-white text-xs font-bold rounded-full flex items-center justify-center">
												{i + 1}
											</span>
											<div class="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
												{(athlete.display_name || '?').charAt(0)}
											</div>
										</div>
										<div class="flex-1">
											<h3 class="font-bold text-lg text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">{athlete.display_name}</h3>
											<p class="text-sm text-gray-500">{athlete.country || ''}</p>
											{#if athlete.total_wins}
												<p class="text-xs text-gray-500 mt-2 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded inline-block">{athlete.total_wins} wins</p>
											{/if}
										</div>
									</div>
								</a>
							{/each}
							{#if ssrAthletes.length === 0}
								<div class="col-span-2 text-center py-8 text-gray-500">
									<p>No athletes found for this sport yet.</p>
									<a href="/athletes" class="text-red-600 hover:text-red-700 font-medium mt-2 inline-block">Browse All Athletes →</a>
								</div>
							{/if}
						</div>
					{/if}
				</div>
				
				<!-- Sidebar -->
				<div class="space-y-6">
					<!-- Top Players Widget -->
					{#if activeTab !== 'players' && ssrAthletes.length > 0}
						<div class="card p-6">
							<h3 class="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
								<span>{sportData.icon}</span>
								Top Athletes
							</h3>
							<div class="space-y-3">
								{#each ssrAthletes.slice(0, 5) as athlete, i}
									<a href="/athletes/{athlete.sport}/{athlete.slug}" class="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors group">
										<span class="w-6 h-6 {sportData.bgColor} text-white text-xs font-bold rounded-full flex items-center justify-center">
											{i + 1}
										</span>
										<div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
											{(athlete.display_name || '?').charAt(0)}
										</div>
										<div class="flex-1 min-w-0">
											<div class="font-semibold text-sm text-gray-900 dark:text-white truncate group-hover:text-red-600 transition-colors">{athlete.display_name}</div>
											<div class="text-xs text-gray-500 truncate">{athlete.country || ''}</div>
										</div>
									</a>
								{/each}
							</div>
						</div>
					{/if}
					
					<!-- Leagues Widget -->
					<div class="card p-6">
						<h3 class="font-bold text-lg text-gray-900 dark:text-white mb-4">Leagues & Competitions</h3>
						<div class="space-y-2">
							{#each sportData.leagues as league}
								<a 
									href="/{sport}/league/{league.name.toLowerCase().replace(/\s+/g, '-')}"
									class="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors group"
								>
									<div>
										<div class="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
											{league.name}
										</div>
										<div class="text-xs text-gray-500">{league.fullName}</div>
									</div>
									<svg class="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
									</svg>
								</a>
							{/each}
						</div>
					</div>
					
					<!-- Teams Widget -->
					<div class="card p-6">
						<h3 class="font-bold text-lg text-gray-900 dark:text-white mb-4">Popular Teams</h3>
						<div class="flex flex-wrap gap-2">
							{#each sportData.teams.slice(0, 8) as team}
								<a 
									href="/{sport}/team/{team.toLowerCase().replace(/\s+/g, '-')}"
									class="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-full transition-colors"
								>
									{team}
								</a>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Athletes Section (SEO internal linking) -->
	{#if ssrAthletes.length > 0}
	<div class="container mx-auto px-3 sm:px-6 lg:px-8 max-w-7xl mt-8 mb-12">
		<div class="flex items-center justify-between mb-4">
			<h2 class="text-xl font-bold text-gray-900 dark:text-white">Top {sportData?.name || sport?.toUpperCase()} Athletes</h2>
			<a href="/athletes/{sport}" class="text-sm text-red-500 hover:text-red-400 font-medium">View All →</a>
		</div>
		<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
			{#each ssrAthletes as athlete}
			<a href="/athletes/{athlete.sport}/{athlete.slug}" class="bg-gray-900/50 border border-gray-800 rounded-lg p-3 hover:border-gray-600 transition-colors text-center group">
				<div class="w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center text-sm font-bold text-white">
					{(athlete.display_name || '?').charAt(0)}
				</div>
				<div class="text-sm font-medium text-white group-hover:text-blue-400 truncate">{athlete.display_name}</div>
				<div class="text-xs text-gray-500">{athlete.country || ''}</div>
			</a>
			{/each}
		</div>
	</div>
	{/if}
</div>

<style>
	.horizontal-gallery {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	.horizontal-gallery::-webkit-scrollbar {
		display: none;
	}
	
	.card {
		@apply bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700;
	}
</style>






