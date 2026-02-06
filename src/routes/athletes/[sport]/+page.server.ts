import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function load({ params }) {
	const { sport } = params;
	const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

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
}
