import { supabase } from '$lib/supabase';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const { sport, slug } = params;

	const { data: player, error: err } = await supabase
		.from('players')
		.select('*')
		.eq('slug', slug)
		.eq('is_published', true)
		.single();

	if (err || !player) {
		throw error(404, 'Athlete not found');
	}

	// Get related athletes from same sport
	const { data: related } = await supabase
		.from('players')
		.select('id, display_name, slug, sport, country, current_rank, primary_game, total_winnings')
		.eq('sport', sport)
		.eq('is_published', true)
		.neq('id', player.id)
		.order('current_rank', { ascending: true, nullsFirst: false })
		.limit(6);

	return {
		player,
		related: related || [],
		sport
	};
};
