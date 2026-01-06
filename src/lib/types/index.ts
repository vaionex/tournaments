// ============================================
// TOURNAMENT TYPES
// ============================================

export type TournamentStatus = 'upcoming' | 'live' | 'completed' | 'cancelled';

export interface Tournament {
	id: string;
	name: string;
	game: string;
	date: string;
	prizePool: string;
	entryFee: string;
	platform: string;
	location: string;
	status: TournamentStatus;
	description?: string;
	rules?: string[];
	prizeBreakdown?: PrizeBreakdown[];
	registeredPlayers?: number;
	maxPlayers?: number;
	participants?: number;
	joinable?: boolean;
	recentGrowth?: string;
	image?: string;
}

export interface PrizeBreakdown {
	place: number;
	prize: string;
}

export interface TournamentResult {
	rank: number;
	player: string;
	prize: string;
	verified: boolean;
}

export interface TournamentParticipant {
	id: string;
	name: string;
	rank: string;
}

// ============================================
// PLAYER TYPES
// ============================================

export interface Player {
	id: string;
	username: string;
	slug?: string; // URL-friendly identifier
	displayName: string;
	rank: number;
	wins: number;
	game: string;
	totalWinnings: number;
	winRate: number;
	verified?: boolean;
	avatar?: string | null;
	image?: string;
	followers?: number;
	recentWins?: number;
	country?: string;
	countryCode?: string;
	team?: string;
	position?: string;
}

export interface PlayerStats {
	totalTournaments: number;
	totalWins: number;
	totalEarnings: number;
	winRate: number;
	currentStreak: number;
}

// ============================================
// NEWS TYPES
// ============================================

export interface NewsArticle {
	id: string;
	title: string;
	excerpt: string;
	content?: string;
	date: Date | string; // Can be Date object or ISO string
	category: NewsCategory;
	image: string;
	author: string;
	readTime?: number;
	tags?: string[];
	sport?: string;
}

export type NewsCategory = 
	| 'All'
	| 'Top Stories'
	| 'Scores & Results'
	| 'Analysis'
	| 'Transfers & Rumors'
	| 'Team News'
	| 'Features';

// ============================================
// ACCOUNT TYPES
// ============================================

export interface LinkedAccount {
	id: string;
	platform: string;
	username: string;
	verified: boolean;
}

export interface PendingClaim {
	id: string;
	tournamentName: string;
	rank: number;
	date: string;
	status: 'pending' | 'approved' | 'rejected';
}

// ============================================
// FILTER & PAGINATION TYPES
// ============================================

export interface PaginationState {
	currentPage: number;
	itemsPerPage: number;
	totalItems: number;
}

export interface TournamentFilters {
	search?: string;
	game?: string;
	location?: string;
	status?: TournamentStatus;
	dateFrom?: string;
	dateTo?: string;
}

export interface PlayerFilters {
	search?: string;
	game?: string;
	country?: string;
	letter?: string;
	sortBy?: 'rank' | 'wins' | 'winnings' | 'winrate' | 'name';
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
	data: T;
	success: boolean;
	message?: string;
}

export interface PaginatedResponse<T> {
	data: T[];
	pagination: {
		currentPage: number;
		totalPages: number;
		totalItems: number;
		itemsPerPage: number;
	};
}

// ============================================
// COMPONENT PROP TYPES
// ============================================

export interface LoadingProps {
	loading: boolean;
	skeletonCount?: number;
}

export interface EmptyStateProps {
	title: string;
	description?: string;
	icon?: string;
	actionLabel?: string;
	actionHref?: string;
}

