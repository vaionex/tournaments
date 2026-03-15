/**
 * User Service
 * Handles user preferences and profile data
 */

import { supabase } from '$lib/supabase';

export interface UserPreferences {
	favoriteSports?: string[];
	favoriteTeams?: string[];
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser() {
	const { data: { user }, error } = await supabase.auth.getUser();
	if (error || !user) {
		return null;
	}
	return user;
}

/**
 * Get user profile with preferences
 */
export async function getUserProfile(userId?: string) {
	const resolvedUser = userId ? { id: userId } : await getCurrentUser();
	if (!resolvedUser) {
		return null;
	}

	const { data, error } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', resolvedUser.id)
		.maybeSingle();

	if (error) {
		console.error('Error fetching user profile:', error);
		return null;
	}

	// Auto-create profile for new OAuth users
	if (!data) {
		const authUser = await getCurrentUser();
		const email = authUser?.email || '';
		const displayName = authUser?.user_metadata?.full_name || authUser?.user_metadata?.name || email.split('@')[0];
		const avatarUrl = authUser?.user_metadata?.avatar_url || null;
		const username = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '') + Math.floor(Math.random() * 1000);

		const { data: newProfile, error: createError } = await supabase
			.from('profiles')
			.insert({
				id: resolvedUser.id,
				username,
				display_name: displayName,
				avatar_url: avatarUrl,
				is_pro: false
			})
			.select()
			.single();

		if (createError) {
			console.error('Error creating profile:', createError);
			return null;
		}
		return newProfile;
	}

	return data;
}

/**
 * Get user preferences from settings
 */
export async function getUserPreferences(): Promise<UserPreferences> {
	const user = await getCurrentUser();
	if (!user) {
		return {};
	}

	const profile = await getUserProfile(user.id);
	if (!profile || !profile.settings) {
		return {};
	}

	const settings = profile.settings as Record<string, unknown>;
	return {
		favoriteSports: (settings.favoriteSports as string[]) || [],
		favoriteTeams: (settings.favoriteTeams as string[]) || []
	};
}

/**
 * Save user preferences
 */
export async function saveUserPreferences(preferences: UserPreferences): Promise<boolean> {
	const user = await getCurrentUser();
	if (!user) {
		console.error('User not authenticated');
		return false;
	}

	// Get current profile to merge settings
	const profile = await getUserProfile(user.id);
	const currentSettings = (profile?.settings as Record<string, unknown>) || {};

	// Merge new preferences with existing settings
	const updatedSettings = {
		...currentSettings,
		favoriteSports: preferences.favoriteSports || [],
		favoriteTeams: preferences.favoriteTeams || []
	};

	const { error } = await supabase
		.from('profiles')
		.update({ 
			settings: updatedSettings,
			updated_at: new Date().toISOString()
		})
		.eq('id', user.id);

	if (error) {
		console.error('Error saving user preferences:', error);
		return false;
	}

	return true;
}

/**
 * Check if user has Tournaments+ (is_pro)
 */
export async function isTournamentsPlus(): Promise<boolean> {
	const user = await getCurrentUser();
	if (!user) {
		return false;
	}

	const profile = await getUserProfile(user.id);
	return profile?.is_pro || false;
}

/**
 * Update user email
 */
export async function updateUserEmail(newEmail: string): Promise<{ success: boolean; error?: string }> {
	const user = await getCurrentUser();
	if (!user) {
		return { success: false, error: 'User not authenticated' };
	}

	const { error } = await supabase.auth.updateUser({ email: newEmail });
	if (error) {
		return { success: false, error: error.message };
	}

	return { success: true };
}

/**
 * Update user password
 */
export async function updateUserPassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
	const user = await getCurrentUser();
	if (!user) {
		return { success: false, error: 'User not authenticated' };
	}

	const { error } = await supabase.auth.updateUser({ password: newPassword });
	if (error) {
		return { success: false, error: error.message };
	}

	return { success: true };
}

/**
 * Update user profile (display_name, username, etc.)
 */
export async function updateUserProfile(updates: {
	display_name?: string;
	username?: string;
	bio?: string | null;
}): Promise<{ success: boolean; error?: string }> {
	const user = await getCurrentUser();
	if (!user) {
		return { success: false, error: 'User not authenticated' };
	}

	const { error } = await supabase
		.from('profiles')
		.update({
			...updates,
			updated_at: new Date().toISOString()
		})
		.eq('id', user.id);

	if (error) {
		return { success: false, error: error.message };
	}

	return { success: true };
}

