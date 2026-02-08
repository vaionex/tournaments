import { redirect } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import type { PageServerLoad } from './$types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const load: PageServerLoad = async ({ params }) => {
	const username = decodeURIComponent(params.username);
	const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

	// Try to find matching athlete by display_name or slug
	const { data: player } = await supabase
		.from('players')
		.select('slug, sport')
		.or(`slug.eq.${username},player_name.ilike.%${username}%,display_name.ilike.%${username.replace(/-/g, ' ')}%`)
		.limit(1)
		.maybeSingle();

	if (player) {
		throw redirect(301, `/athletes/${player.sport}/${player.slug}`);
	}

	// Fallback to athletes listing
	throw redirect(301, '/athletes');
};
