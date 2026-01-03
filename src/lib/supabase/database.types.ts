/**
 * Supabase Database Types
 * 
 * These types mirror the structure of your Supabase database tables.
 * When using Supabase CLI, you can generate these automatically:
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/supabase/database.types.ts
 * 
 * Each table has three type variants:
 * - Row: The full row as returned from the database (includes id, created_at, etc.)
 * - Insert: Fields required/optional when inserting a new row
 * - Update: Fields that can be updated (all optional)
 */

export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			// ============================================
			// TOURNAMENTS TABLE
			// ============================================
			tournaments: {
				Row: {
					id: string;
					created_at: string;
					updated_at: string;
					name: string;
					slug: string;
					game: string;
					game_id: string | null;
					date: string;
					end_date: string | null;
					prize_pool: number;
					prize_pool_currency: string;
					entry_fee: number | null;
					entry_fee_currency: string;
					platform: string;
					platform_id: string | null;
					location: string;
					is_online: boolean;
					status: 'draft' | 'upcoming' | 'live' | 'completed' | 'cancelled';
					description: string | null;
					rules: string[] | null;
					prize_breakdown: Json | null;
					registered_players: number;
					max_players: number | null;
					image_url: string | null;
					banner_url: string | null;
					organizer_id: string;
					is_featured: boolean;
					is_verified: boolean;
					external_url: string | null;
					tags: string[] | null;
				};
				Insert: {
					id?: string;
					created_at?: string;
					updated_at?: string;
					name: string;
					slug?: string;
					game: string;
					game_id?: string | null;
					date: string;
					end_date?: string | null;
					prize_pool: number;
					prize_pool_currency?: string;
					entry_fee?: number | null;
					entry_fee_currency?: string;
					platform: string;
					platform_id?: string | null;
					location: string;
					is_online?: boolean;
					status?: 'draft' | 'upcoming' | 'live' | 'completed' | 'cancelled';
					description?: string | null;
					rules?: string[] | null;
					prize_breakdown?: Json | null;
					registered_players?: number;
					max_players?: number | null;
					image_url?: string | null;
					banner_url?: string | null;
					organizer_id: string;
					is_featured?: boolean;
					is_verified?: boolean;
					external_url?: string | null;
					tags?: string[] | null;
				};
				Update: {
					id?: string;
					created_at?: string;
					updated_at?: string;
					name?: string;
					slug?: string;
					game?: string;
					game_id?: string | null;
					date?: string;
					end_date?: string | null;
					prize_pool?: number;
					prize_pool_currency?: string;
					entry_fee?: number | null;
					entry_fee_currency?: string;
					platform?: string;
					platform_id?: string | null;
					location?: string;
					is_online?: boolean;
					status?: 'draft' | 'upcoming' | 'live' | 'completed' | 'cancelled';
					description?: string | null;
					rules?: string[] | null;
					prize_breakdown?: Json | null;
					registered_players?: number;
					max_players?: number | null;
					image_url?: string | null;
					banner_url?: string | null;
					organizer_id?: string;
					is_featured?: boolean;
					is_verified?: boolean;
					external_url?: string | null;
					tags?: string[] | null;
				};
				Relationships: [
					{
						foreignKeyName: 'tournaments_organizer_id_fkey';
						columns: ['organizer_id'];
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'tournaments_game_id_fkey';
						columns: ['game_id'];
						referencedRelation: 'games';
						referencedColumns: ['id'];
					}
				];
			};

			// ============================================
			// TOURNAMENT RESULTS TABLE
			// ============================================
			tournament_results: {
				Row: {
					id: string;
					created_at: string;
					tournament_id: string;
					player_id: string | null;
					team_name: string | null;
					rank: number;
					prize_amount: number;
					prize_currency: string;
					is_verified: boolean;
					verified_at: string | null;
					verified_by: string | null;
					claim_status: 'unclaimed' | 'pending' | 'approved' | 'rejected';
					claimed_by: string | null;
					claimed_at: string | null;
				};
				Insert: {
					id?: string;
					created_at?: string;
					tournament_id: string;
					player_id?: string | null;
					team_name?: string | null;
					rank: number;
					prize_amount: number;
					prize_currency?: string;
					is_verified?: boolean;
					verified_at?: string | null;
					verified_by?: string | null;
					claim_status?: 'unclaimed' | 'pending' | 'approved' | 'rejected';
					claimed_by?: string | null;
					claimed_at?: string | null;
				};
				Update: {
					id?: string;
					created_at?: string;
					tournament_id?: string;
					player_id?: string | null;
					team_name?: string | null;
					rank?: number;
					prize_amount?: number;
					prize_currency?: string;
					is_verified?: boolean;
					verified_at?: string | null;
					verified_by?: string | null;
					claim_status?: 'unclaimed' | 'pending' | 'approved' | 'rejected';
					claimed_by?: string | null;
					claimed_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'tournament_results_tournament_id_fkey';
						columns: ['tournament_id'];
						referencedRelation: 'tournaments';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'tournament_results_player_id_fkey';
						columns: ['player_id'];
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					}
				];
			};

			// ============================================
			// TOURNAMENT PARTICIPANTS TABLE
			// ============================================
			tournament_participants: {
				Row: {
					id: string;
					created_at: string;
					tournament_id: string;
					player_id: string;
					team_name: string | null;
					registration_status: 'pending' | 'confirmed' | 'checked_in' | 'disqualified' | 'withdrawn';
					seed: number | null;
					checked_in_at: string | null;
				};
				Insert: {
					id?: string;
					created_at?: string;
					tournament_id: string;
					player_id: string;
					team_name?: string | null;
					registration_status?: 'pending' | 'confirmed' | 'checked_in' | 'disqualified' | 'withdrawn';
					seed?: number | null;
					checked_in_at?: string | null;
				};
				Update: {
					id?: string;
					created_at?: string;
					tournament_id?: string;
					player_id?: string;
					team_name?: string | null;
					registration_status?: 'pending' | 'confirmed' | 'checked_in' | 'disqualified' | 'withdrawn';
					seed?: number | null;
					checked_in_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'tournament_participants_tournament_id_fkey';
						columns: ['tournament_id'];
						referencedRelation: 'tournaments';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'tournament_participants_player_id_fkey';
						columns: ['player_id'];
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					}
				];
			};

			// ============================================
			// PROFILES TABLE (extends Supabase auth.users)
			// ============================================
			profiles: {
				Row: {
					id: string; // References auth.users.id
					created_at: string;
					updated_at: string;
					username: string;
					display_name: string;
					bio: string | null;
					avatar_url: string | null;
					banner_url: string | null;
					country: string | null;
					timezone: string | null;
					is_verified: boolean;
					is_pro: boolean;
					total_winnings: number;
					total_tournaments: number;
					total_wins: number;
					win_rate: number;
					current_rank: number | null;
					primary_game: string | null;
					social_links: Json | null;
					settings: Json | null;
				};
				Insert: {
					id: string;
					created_at?: string;
					updated_at?: string;
					username: string;
					display_name: string;
					bio?: string | null;
					avatar_url?: string | null;
					banner_url?: string | null;
					country?: string | null;
					timezone?: string | null;
					is_verified?: boolean;
					is_pro?: boolean;
					total_winnings?: number;
					total_tournaments?: number;
					total_wins?: number;
					win_rate?: number;
					current_rank?: number | null;
					primary_game?: string | null;
					social_links?: Json | null;
					settings?: Json | null;
				};
				Update: {
					id?: string;
					created_at?: string;
					updated_at?: string;
					username?: string;
					display_name?: string;
					bio?: string | null;
					avatar_url?: string | null;
					banner_url?: string | null;
					country?: string | null;
					timezone?: string | null;
					is_verified?: boolean;
					is_pro?: boolean;
					total_winnings?: number;
					total_tournaments?: number;
					total_wins?: number;
					win_rate?: number;
					current_rank?: number | null;
					primary_game?: string | null;
					social_links?: Json | null;
					settings?: Json | null;
				};
				Relationships: [];
			};

			// ============================================
			// LINKED ACCOUNTS TABLE
			// ============================================
			linked_accounts: {
				Row: {
					id: string;
					created_at: string;
					user_id: string;
					platform: string;
					platform_user_id: string;
					platform_username: string;
					is_verified: boolean;
					verified_at: string | null;
					access_token: string | null;
					refresh_token: string | null;
					token_expires_at: string | null;
					metadata: Json | null;
				};
				Insert: {
					id?: string;
					created_at?: string;
					user_id: string;
					platform: string;
					platform_user_id: string;
					platform_username: string;
					is_verified?: boolean;
					verified_at?: string | null;
					access_token?: string | null;
					refresh_token?: string | null;
					token_expires_at?: string | null;
					metadata?: Json | null;
				};
				Update: {
					id?: string;
					created_at?: string;
					user_id?: string;
					platform?: string;
					platform_user_id?: string;
					platform_username?: string;
					is_verified?: boolean;
					verified_at?: string | null;
					access_token?: string | null;
					refresh_token?: string | null;
					token_expires_at?: string | null;
					metadata?: Json | null;
				};
				Relationships: [
					{
						foreignKeyName: 'linked_accounts_user_id_fkey';
						columns: ['user_id'];
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					}
				];
			};

			// ============================================
			// GAMES TABLE
			// ============================================
			games: {
				Row: {
					id: string;
					created_at: string;
					name: string;
					slug: string;
					category: 'esports' | 'sports' | 'traditional' | 'other';
					publisher: string | null;
					image_url: string | null;
					banner_url: string | null;
					is_active: boolean;
					player_count: number;
					tournament_count: number;
				};
				Insert: {
					id?: string;
					created_at?: string;
					name: string;
					slug?: string;
					category: 'esports' | 'sports' | 'traditional' | 'other';
					publisher?: string | null;
					image_url?: string | null;
					banner_url?: string | null;
					is_active?: boolean;
					player_count?: number;
					tournament_count?: number;
				};
				Update: {
					id?: string;
					created_at?: string;
					name?: string;
					slug?: string;
					category?: 'esports' | 'sports' | 'traditional' | 'other';
					publisher?: string | null;
					image_url?: string | null;
					banner_url?: string | null;
					is_active?: boolean;
					player_count?: number;
					tournament_count?: number;
				};
				Relationships: [];
			};

			// ============================================
			// NEWS ARTICLES TABLE
			// ============================================
			news_articles: {
				Row: {
					id: string;
					created_at: string;
					updated_at: string;
					title: string;
					slug: string;
					excerpt: string;
					content: string;
					category: string;
					image_url: string | null;
					author_id: string;
					is_published: boolean;
					published_at: string | null;
					read_time: number;
					view_count: number;
					tags: string[] | null;
					is_featured: boolean;
				};
				Insert: {
					id?: string;
					created_at?: string;
					updated_at?: string;
					title: string;
					slug?: string;
					excerpt: string;
					content: string;
					category: string;
					image_url?: string | null;
					author_id: string;
					is_published?: boolean;
					published_at?: string | null;
					read_time?: number;
					view_count?: number;
					tags?: string[] | null;
					is_featured?: boolean;
				};
				Update: {
					id?: string;
					created_at?: string;
					updated_at?: string;
					title?: string;
					slug?: string;
					excerpt?: string;
					content?: string;
					category?: string;
					image_url?: string | null;
					author_id?: string;
					is_published?: boolean;
					published_at?: string | null;
					read_time?: number;
					view_count?: number;
					tags?: string[] | null;
					is_featured?: boolean;
				};
				Relationships: [
					{
						foreignKeyName: 'news_articles_author_id_fkey';
						columns: ['author_id'];
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					}
				];
			};

			// ============================================
			// CLAIMS TABLE
			// ============================================
			claims: {
				Row: {
					id: string;
					created_at: string;
					updated_at: string;
					user_id: string;
					tournament_result_id: string;
					status: 'pending' | 'approved' | 'rejected';
					evidence: Json | null;
					admin_notes: string | null;
					reviewed_by: string | null;
					reviewed_at: string | null;
				};
				Insert: {
					id?: string;
					created_at?: string;
					updated_at?: string;
					user_id: string;
					tournament_result_id: string;
					status?: 'pending' | 'approved' | 'rejected';
					evidence?: Json | null;
					admin_notes?: string | null;
					reviewed_by?: string | null;
					reviewed_at?: string | null;
				};
				Update: {
					id?: string;
					created_at?: string;
					updated_at?: string;
					user_id?: string;
					tournament_result_id?: string;
					status?: 'pending' | 'approved' | 'rejected';
					evidence?: Json | null;
					admin_notes?: string | null;
					reviewed_by?: string | null;
					reviewed_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'claims_user_id_fkey';
						columns: ['user_id'];
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'claims_tournament_result_id_fkey';
						columns: ['tournament_result_id'];
						referencedRelation: 'tournament_results';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			// Add views here if needed
			player_rankings: {
				Row: {
					id: string;
					username: string;
					display_name: string;
					avatar_url: string | null;
					total_winnings: number;
					total_wins: number;
					win_rate: number;
					rank: number;
					primary_game: string | null;
					is_verified: boolean;
				};
			};
		};
		Functions: {
			// Add RPC functions here
			get_leaderboard: {
				Args: {
					game_slug?: string;
					limit_count?: number;
				};
				Returns: {
					id: string;
					username: string;
					display_name: string;
					avatar_url: string | null;
					total_winnings: number;
					rank: number;
				}[];
			};
			search_tournaments: {
				Args: {
					search_term: string;
					game_filter?: string;
					status_filter?: string;
				};
				Returns: {
					id: string;
					name: string;
					game: string;
					date: string;
					prize_pool: number;
					status: string;
				}[];
			};
		};
		Enums: {
			tournament_status: 'draft' | 'upcoming' | 'live' | 'completed' | 'cancelled';
			claim_status: 'pending' | 'approved' | 'rejected';
			game_category: 'esports' | 'sports' | 'traditional' | 'other';
		};
	};
}

// ============================================
// TYPE HELPERS
// ============================================

// Extract table row types
export type Tables<T extends keyof Database['public']['Tables']> = 
	Database['public']['Tables'][T]['Row'];

export type TablesInsert<T extends keyof Database['public']['Tables']> = 
	Database['public']['Tables'][T]['Insert'];

export type TablesUpdate<T extends keyof Database['public']['Tables']> = 
	Database['public']['Tables'][T]['Update'];

// Specific table types for convenience
export type Tournament = Tables<'tournaments'>;
export type TournamentInsert = TablesInsert<'tournaments'>;
export type TournamentUpdate = TablesUpdate<'tournaments'>;

export type TournamentResult = Tables<'tournament_results'>;
export type TournamentParticipant = Tables<'tournament_participants'>;

export type Profile = Tables<'profiles'>;
export type ProfileInsert = TablesInsert<'profiles'>;
export type ProfileUpdate = TablesUpdate<'profiles'>;

export type LinkedAccount = Tables<'linked_accounts'>;
export type Game = Tables<'games'>;
export type NewsArticle = Tables<'news_articles'>;
export type Claim = Tables<'claims'>;

