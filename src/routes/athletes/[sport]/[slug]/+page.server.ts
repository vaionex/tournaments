import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function load({ params }) {
	const { sport, slug } = params;
	const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

	const { data: player } = await supabase
		.from('players')
		.select('*')
		.eq('slug', slug)
		.eq('is_published', true)
		.single();

	const { data: related } = await supabase
		.from('players')
		.select('id, display_name, slug, sport, country, current_rank, primary_game, total_winnings')
		.eq('sport', sport)
		.eq('is_published', true)
		.neq('id', player?.id || '')
		.order('current_rank', { ascending: true, nullsFirst: false })
		.limit(6);

	return {
		player: player || null,
		related: related || [],
		sport
	};
}
