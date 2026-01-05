/**
 * Search Service
 * Handles searching for players and teams
 */

import type { Player } from '$lib/types';
import { supabase } from '$lib/supabase';
import { transformPlayer } from './players.service';

export interface SearchResult {
	type: 'player' | 'team';
	id: string;
	name: string;
	slug: string;
	image?: string;
	subtitle?: string;
	metadata?: Record<string, unknown>;
}

export interface SearchResponse {
	players: Player[];
	teams: Array<{
		name: string;
		playerCount: number;
		game?: string;
	}>;
	total: number;
}

/**
 * Search for players and teams
 */
export async function searchPlayersAndTeams(query: string, limit: number = 20): Promise<SearchResponse> {
	if (!query || query.trim().length === 0) {
		return { players: [], teams: [], total: 0 };
	}

	const searchTerm = query.trim().toLowerCase();

	try {
		// Search for players - use multiple filters with OR logic
		const { data: playersData, error: playersError } = await supabase
			.from('players')
			.select('*')
			.eq('is_active', true)
			.or(`player_name.ilike.%${searchTerm}%,display_name.ilike.%${searchTerm}%,slug.ilike.%${searchTerm}%`)
			.limit(limit);

		if (playersError) {
			console.error('Error searching players:', playersError);
		}

		// Search for teams (distinct team_name values from players)
		const { data: teamsData, error: teamsError } = await supabase
			.from('players')
			.select('team_name, primary_game')
			.eq('is_active', true)
			.not('team_name', 'is', null)
			.ilike('team_name', `%${searchTerm}%`);

		if (teamsError) {
			console.error('Error searching teams:', teamsError);
		}

		// Transform players using the same transform function as players.service
		const players = (playersData || []).map(transformPlayer);

		// Aggregate teams (count players per team)
		const teamMap = new Map<string, { name: string; playerCount: number; game?: string }>();
		
		(teamsData || []).forEach((row: any) => {
			const teamName = row.team_name;
			if (!teamName) return;

			if (!teamMap.has(teamName)) {
				teamMap.set(teamName, {
					name: teamName,
					playerCount: 0,
					game: row.primary_game
				});
			}
			
			const team = teamMap.get(teamName)!;
			team.playerCount += 1;
			// Use the first game found, or keep existing if multiple games
			if (!team.game && row.primary_game) {
				team.game = row.primary_game;
			}
		});

		const teams = Array.from(teamMap.values())
			.filter(team => team.name.toLowerCase().includes(searchTerm))
			.sort((a, b) => b.playerCount - a.playerCount)
			.slice(0, limit);

		return {
			players,
			teams,
			total: players.length + teams.length
		};
	} catch (error) {
		console.error('Error in search:', error);
		return { players: [], teams: [], total: 0 };
	}
}

/**
 * Get unique teams (for autocomplete or suggestions)
 */
export async function getUniqueTeams(limit: number = 50): Promise<string[]> {
	const { data, error } = await supabase
		.from('players')
		.select('team_name')
		.eq('is_active', true)
		.not('team_name', 'is', null);

	if (error) {
		console.error('Error fetching teams:', error);
		return [];
	}

	const uniqueTeams = [...new Set((data || []).map((row: any) => row.team_name).filter(Boolean))];
	return uniqueTeams.slice(0, limit);
}

