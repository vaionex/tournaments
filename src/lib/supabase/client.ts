/**
 * Supabase Client Configuration
 * 
 * This module provides a mock Supabase client that mirrors the real Supabase API.
 * When ready to connect to a real database:
 * 1. Install @supabase/supabase-js: npm install @supabase/supabase-js
 * 2. Uncomment the real client creation below
 * 3. Remove the mock client
 */

import type { Database } from './database.types';

// Environment variables - set these in .env file
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:54321';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-anon-key';

// ============================================
// MOCK SUPABASE CLIENT
// Remove this section when connecting to real Supabase
// ============================================

type QueryResult<T> = {
	data: T | null;
	error: Error | null;
	count?: number;
};

type QueryBuilder<T> = {
	select: (columns?: string, options?: { count?: 'exact' | 'planned' | 'estimated' }) => QueryBuilder<T>;
	insert: (data: Partial<T> | Partial<T>[]) => QueryBuilder<T>;
	update: (data: Partial<T>) => QueryBuilder<T>;
	delete: () => QueryBuilder<T>;
	eq: (column: string, value: unknown) => QueryBuilder<T>;
	neq: (column: string, value: unknown) => QueryBuilder<T>;
	gt: (column: string, value: unknown) => QueryBuilder<T>;
	gte: (column: string, value: unknown) => QueryBuilder<T>;
	lt: (column: string, value: unknown) => QueryBuilder<T>;
	lte: (column: string, value: unknown) => QueryBuilder<T>;
	like: (column: string, pattern: string) => QueryBuilder<T>;
	ilike: (column: string, pattern: string) => QueryBuilder<T>;
	is: (column: string, value: unknown) => QueryBuilder<T>;
	in: (column: string, values: unknown[]) => QueryBuilder<T>;
	contains: (column: string, value: unknown) => QueryBuilder<T>;
	containedBy: (column: string, value: unknown) => QueryBuilder<T>;
	order: (column: string, options?: { ascending?: boolean }) => QueryBuilder<T>;
	limit: (count: number) => QueryBuilder<T>;
	range: (from: number, to: number) => QueryBuilder<T>;
	single: () => Promise<QueryResult<T>>;
	maybeSingle: () => Promise<QueryResult<T | null>>;
	then: <TResult>(
		onfulfilled?: (value: QueryResult<T[]>) => TResult | PromiseLike<TResult>
	) => Promise<TResult>;
};

type AuthSession = {
	access_token: string;
	refresh_token: string;
	user: AuthUser;
};

type AuthUser = {
	id: string;
	email: string;
	user_metadata: Record<string, unknown>;
};

type AuthResponse = {
	data: { user: AuthUser | null; session: AuthSession | null };
	error: Error | null;
};

// Mock data stores (in-memory)
const mockStores: Record<string, unknown[]> = {};

function createMockQueryBuilder<T>(tableName: string): QueryBuilder<T> {
	let filters: Array<(item: T) => boolean> = [];
	let sortColumn: string | null = null;
	let sortAscending = true;
	let limitCount: number | null = null;
	let rangeFrom = 0;
	let rangeTo: number | null = null;
	let selectCount: 'exact' | 'planned' | 'estimated' | null = null;

	const builder: QueryBuilder<T> = {
		select: (_columns?: string, options?: { count?: 'exact' | 'planned' | 'estimated' }) => {
			if (options?.count) selectCount = options.count;
			return builder;
		},
		insert: (data: Partial<T> | Partial<T>[]) => {
			const items = Array.isArray(data) ? data : [data];
			if (!mockStores[tableName]) mockStores[tableName] = [];
			items.forEach(item => {
				mockStores[tableName].push({ 
					id: crypto.randomUUID(), 
					created_at: new Date().toISOString(),
					...item 
				});
			});
			return builder;
		},
		update: (_data: Partial<T>) => builder,
		delete: () => builder,
		eq: (column: string, value: unknown) => {
			filters.push((item: T) => (item as Record<string, unknown>)[column] === value);
			return builder;
		},
		neq: (column: string, value: unknown) => {
			filters.push((item: T) => (item as Record<string, unknown>)[column] !== value);
			return builder;
		},
		gt: (column: string, value: unknown) => {
			filters.push((item: T) => (item as Record<string, unknown>)[column] as number > (value as number));
			return builder;
		},
		gte: (column: string, value: unknown) => {
			filters.push((item: T) => (item as Record<string, unknown>)[column] as number >= (value as number));
			return builder;
		},
		lt: (column: string, value: unknown) => {
			filters.push((item: T) => (item as Record<string, unknown>)[column] as number < (value as number));
			return builder;
		},
		lte: (column: string, value: unknown) => {
			filters.push((item: T) => (item as Record<string, unknown>)[column] as number <= (value as number));
			return builder;
		},
		like: (column: string, pattern: string) => {
			const regex = new RegExp(pattern.replace(/%/g, '.*'));
			filters.push((item: T) => regex.test(String((item as Record<string, unknown>)[column])));
			return builder;
		},
		ilike: (column: string, pattern: string) => {
			const regex = new RegExp(pattern.replace(/%/g, '.*'), 'i');
			filters.push((item: T) => regex.test(String((item as Record<string, unknown>)[column])));
			return builder;
		},
		is: (column: string, value: unknown) => {
			filters.push((item: T) => (item as Record<string, unknown>)[column] === value);
			return builder;
		},
		in: (column: string, values: unknown[]) => {
			filters.push((item: T) => values.includes((item as Record<string, unknown>)[column]));
			return builder;
		},
		contains: (_column: string, _value: unknown) => builder,
		containedBy: (_column: string, _value: unknown) => builder,
		order: (column: string, options?: { ascending?: boolean }) => {
			sortColumn = column;
			sortAscending = options?.ascending ?? true;
			return builder;
		},
		limit: (count: number) => {
			limitCount = count;
			return builder;
		},
		range: (from: number, to: number) => {
			rangeFrom = from;
			rangeTo = to;
			return builder;
		},
		single: async () => {
			const result = await builder.then(r => r);
			return {
				data: result.data?.[0] ?? null,
				error: result.error
			};
		},
		maybeSingle: async () => {
			const result = await builder.then(r => r);
			return {
				data: result.data?.[0] ?? null,
				error: result.error
			};
		},
		then: async <TResult>(
			onfulfilled?: (value: QueryResult<T[]>) => TResult | PromiseLike<TResult>
		): Promise<TResult> => {
			// Simulate network delay
			await new Promise(resolve => setTimeout(resolve, 100));
			
			let data = (mockStores[tableName] || []) as T[];
			
			// Apply filters
			for (const filter of filters) {
				data = data.filter(filter);
			}
			
			// Apply sorting
			if (sortColumn) {
				data.sort((a, b) => {
					const aVal = (a as Record<string, unknown>)[sortColumn!];
					const bVal = (b as Record<string, unknown>)[sortColumn!];
					const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
					return sortAscending ? comparison : -comparison;
				});
			}
			
			const totalCount = data.length;
			
			// Apply range/limit
			if (rangeTo !== null) {
				data = data.slice(rangeFrom, rangeTo + 1);
			} else if (limitCount !== null) {
				data = data.slice(0, limitCount);
			}
			
			const result: QueryResult<T[]> = {
				data,
				error: null,
				...(selectCount ? { count: totalCount } : {})
			};
			
			return onfulfilled ? onfulfilled(result) : result as unknown as TResult;
		}
	};

	return builder;
}

// Mock Auth
const mockAuth = {
	currentUser: null as AuthUser | null,
	currentSession: null as AuthSession | null,

	getUser: async (): Promise<{ data: { user: AuthUser | null }; error: Error | null }> => {
		return { data: { user: mockAuth.currentUser }, error: null };
	},

	getSession: async (): Promise<{ data: { session: AuthSession | null }; error: Error | null }> => {
		return { data: { session: mockAuth.currentSession }, error: null };
	},

	signInWithPassword: async (_credentials: { email: string; password: string }): Promise<AuthResponse> => {
		// Mock successful login
		const user: AuthUser = {
			id: crypto.randomUUID(),
			email: _credentials.email,
			user_metadata: { display_name: _credentials.email.split('@')[0] }
		};
		const session: AuthSession = {
			access_token: 'mock-access-token',
			refresh_token: 'mock-refresh-token',
			user
		};
		mockAuth.currentUser = user;
		mockAuth.currentSession = session;
		return { data: { user, session }, error: null };
	},

	signUp: async (_credentials: { email: string; password: string; options?: { data?: Record<string, unknown> } }): Promise<AuthResponse> => {
		const user: AuthUser = {
			id: crypto.randomUUID(),
			email: _credentials.email,
			user_metadata: _credentials.options?.data || {}
		};
		return { data: { user, session: null }, error: null };
	},

	signOut: async (): Promise<{ error: Error | null }> => {
		mockAuth.currentUser = null;
		mockAuth.currentSession = null;
		return { error: null };
	},

	onAuthStateChange: (callback: (event: string, session: AuthSession | null) => void) => {
		// Call immediately with current state
		callback('INITIAL_SESSION', mockAuth.currentSession);
		return {
			data: { subscription: { unsubscribe: () => {} } }
		};
	},

	resetPasswordForEmail: async (_email: string): Promise<{ error: Error | null }> => {
		return { error: null };
	},

	updateUser: async (_updates: { email?: string; password?: string; data?: Record<string, unknown> }): Promise<{ data: { user: AuthUser | null }; error: Error | null }> => {
		if (mockAuth.currentUser && _updates.data) {
			mockAuth.currentUser.user_metadata = { ...mockAuth.currentUser.user_metadata, ..._updates.data };
		}
		return { data: { user: mockAuth.currentUser }, error: null };
	}
};

// Mock Storage
const mockStorage = {
	from: (bucket: string) => ({
		upload: async (path: string, _file: File) => {
			return { data: { path: `${bucket}/${path}` }, error: null };
		},
		download: async (_path: string) => {
			return { data: new Blob(), error: null };
		},
		getPublicUrl: (path: string) => {
			return { data: { publicUrl: `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}` } };
		},
		remove: async (_paths: string[]) => {
			return { data: null, error: null };
		},
		list: async (_path?: string) => {
			return { data: [], error: null };
		}
	})
};

// Create mock Supabase client
export const supabase = {
	from: <T extends keyof Database['public']['Tables']>(table: T) => 
		createMockQueryBuilder<Database['public']['Tables'][T]['Row']>(table),
	auth: mockAuth,
	storage: mockStorage,
	
	// RPC calls (stored procedures)
	rpc: async <T>(_fn: string, _params?: Record<string, unknown>): Promise<{ data: T | null; error: Error | null }> => {
		await new Promise(resolve => setTimeout(resolve, 100));
		return { data: null, error: null };
	}
};

// ============================================
// REAL SUPABASE CLIENT
// Uncomment this section and remove mock above when ready
// ============================================

// import { createClient } from '@supabase/supabase-js';
// import type { Database } from './database.types';
// 
// export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
// 	auth: {
// 		persistSession: true,
// 		autoRefreshToken: true,
// 		detectSessionInUrl: true
// 	}
// });

export type { Database };
export { SUPABASE_URL };

