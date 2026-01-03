/**
 * Auth Store
 * Manages authentication state across the application
 */

import { writable, derived } from 'svelte/store';
import { supabase } from '$lib/supabase';
import type { Profile } from '$lib/supabase';

// ============================================
// TYPES
// ============================================

export interface AuthUser {
	id: string;
	email: string;
	user_metadata: Record<string, unknown>;
}

export interface AuthState {
	user: AuthUser | null;
	profile: Profile | null;
	loading: boolean;
	initialized: boolean;
}

// ============================================
// STORE
// ============================================

const initialState: AuthState = {
	user: null,
	profile: null,
	loading: true,
	initialized: false
};

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>(initialState);

	return {
		subscribe,

		/**
		 * Initialize auth state - call this in root layout
		 */
		async initialize() {
			update(state => ({ ...state, loading: true }));

			try {
				// Get current session
				const { data: { session } } = await supabase.auth.getSession();

				if (session?.user) {
					const user: AuthUser = {
						id: session.user.id,
						email: session.user.email || '',
						user_metadata: session.user.user_metadata
					};

					// Fetch profile
					const { data: profile } = await supabase
						.from('profiles')
						.select('*')
						.eq('id', user.id)
						.single();

					set({
						user,
						profile: profile as Profile | null,
						loading: false,
						initialized: true
					});
				} else {
					set({
						user: null,
						profile: null,
						loading: false,
						initialized: true
					});
				}

				// Listen for auth changes
				supabase.auth.onAuthStateChange(async (event, session) => {
					if (event === 'SIGNED_IN' && session?.user) {
						const user: AuthUser = {
							id: session.user.id,
							email: session.user.email || '',
							user_metadata: session.user.user_metadata
						};

						const { data: profile } = await supabase
							.from('profiles')
							.select('*')
							.eq('id', user.id)
							.single();

						update(state => ({
							...state,
							user,
							profile: profile as Profile | null
						}));
					} else if (event === 'SIGNED_OUT') {
						update(state => ({
							...state,
							user: null,
							profile: null
						}));
					}
				});
			} catch (error) {
				console.error('Auth initialization error:', error);
				set({
					user: null,
					profile: null,
					loading: false,
					initialized: true
				});
			}
		},

		/**
		 * Sign in with email and password
		 */
		async signIn(email: string, password: string) {
			update(state => ({ ...state, loading: true }));

			try {
				const { data, error } = await supabase.auth.signInWithPassword({
					email,
					password
				});

				if (error) throw error;

				if (data.user) {
					const user: AuthUser = {
						id: data.user.id,
						email: data.user.email || '',
						user_metadata: data.user.user_metadata
					};

					const { data: profile } = await supabase
						.from('profiles')
						.select('*')
						.eq('id', user.id)
						.single();

					update(state => ({
						...state,
						user,
						profile: profile as Profile | null,
						loading: false
					}));

					return { success: true };
				}

				return { success: false, error: 'Unknown error' };
			} catch (error) {
				update(state => ({ ...state, loading: false }));
				return { success: false, error: (error as Error).message };
			}
		},

		/**
		 * Sign up with email and password
		 */
		async signUp(email: string, password: string, displayName: string) {
			update(state => ({ ...state, loading: true }));

			try {
				const { data, error } = await supabase.auth.signUp({
					email,
					password,
					options: {
						data: { display_name: displayName }
					}
				});

				if (error) throw error;

				if (data.user) {
					// Create profile
					const username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
					
					await supabase.from('profiles').insert({
						id: data.user.id,
						username,
						display_name: displayName
					});

					update(state => ({ ...state, loading: false }));
					return { success: true, message: 'Check your email to confirm your account' };
				}

				return { success: false, error: 'Unknown error' };
			} catch (error) {
				update(state => ({ ...state, loading: false }));
				return { success: false, error: (error as Error).message };
			}
		},

		/**
		 * Sign out
		 */
		async signOut() {
			update(state => ({ ...state, loading: true }));

			try {
				await supabase.auth.signOut();
				set({
					user: null,
					profile: null,
					loading: false,
					initialized: true
				});
				return { success: true };
			} catch (error) {
				update(state => ({ ...state, loading: false }));
				return { success: false, error: (error as Error).message };
			}
		},

		/**
		 * Update profile
		 */
		async updateProfile(updates: Partial<Profile>) {
			const state = await new Promise<AuthState>(resolve => {
				subscribe(s => resolve(s))();
			});

			if (!state.user) {
				return { success: false, error: 'Not authenticated' };
			}

			try {
				const { error } = await supabase
					.from('profiles')
					.update(updates)
					.eq('id', state.user.id);

				if (error) throw error;

				update(s => ({
					...s,
					profile: s.profile ? { ...s.profile, ...updates } : null
				}));

				return { success: true };
			} catch (error) {
				return { success: false, error: (error as Error).message };
			}
		},

		/**
		 * Request password reset
		 */
		async resetPassword(email: string) {
			try {
				const { error } = await supabase.auth.resetPasswordForEmail(email);
				if (error) throw error;
				return { success: true };
			} catch (error) {
				return { success: false, error: (error as Error).message };
			}
		}
	};
}

export const auth = createAuthStore();

// ============================================
// DERIVED STORES
// ============================================

/** Whether user is authenticated */
export const isAuthenticated = derived(auth, $auth => !!$auth.user);

/** Whether auth is still loading */
export const isLoading = derived(auth, $auth => $auth.loading);

/** Current user */
export const currentUser = derived(auth, $auth => $auth.user);

/** Current user's profile */
export const currentProfile = derived(auth, $auth => $auth.profile);

/** Whether current user is verified */
export const isVerified = derived(auth, $auth => $auth.profile?.is_verified ?? false);

/** Whether current user is pro */
export const isPro = derived(auth, $auth => $auth.profile?.is_pro ?? false);

