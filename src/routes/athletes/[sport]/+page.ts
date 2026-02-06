import { supabase } from '$lib/supabase';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const { sport } = params;

	const { data: players } = await supabase
		.from('players')
		.select('id, display_name, player_name, slug, sport, country, current_rank, primary_game, total_winnings, total_wins, total_tournaments, bio, team_name, position, win_rate')
		.eq('sport', sport)
		.eq('is_published', true)
		.order('current_rank', { ascending: true, nullsFirst: false })
		.limit(200);

	return {
		players: players || [],
		sport
	};
};
