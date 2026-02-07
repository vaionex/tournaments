import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function load({ params }) {
	const slug1 = params['slug1'];
	const slug2 = params['slug2'];
	const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

	const [{ data: player1 }, { data: player2 }] = await Promise.all([
		supabase
			.from('players')
			.select('*')
			.eq('slug', slug1)
			.eq('is_published', true)
			.single(),
		supabase
			.from('players')
			.select('*')
			.eq('slug', slug2)
			.eq('is_published', true)
			.single()
	]);

	// Get other athletes in the same sport for "more comparisons" section
	const sport = player1?.sport || player2?.sport;
	let otherAthletes: any[] = [];
	if (sport) {
		const { data } = await supabase
			.from('players')
			.select('display_name, slug, sport, country, current_rank, total_winnings, total_wins')
			.eq('sport', sport)
			.eq('is_published', true)
			.order('current_rank', { ascending: true, nullsFirst: false })
			.limit(12);
		otherAthletes = (data || []).filter(a => a.slug !== slug1 && a.slug !== slug2);
	}

	return {
		player1: player1 || null,
		player2: player2 || null,
		otherAthletes,
		sport
	};
}
