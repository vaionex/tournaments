import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function load() {
	const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

	// Get athlete counts per sport
	const { data: players } = await supabase
		.from('players')
		.select('sport, display_name, slug, country, total_winnings')
		.eq('is_published', true)
		.order('total_winnings', { ascending: false })
		.limit(2000);

	// Group by sport
	const sportGroups: Record<string, any[]> = {};
	const sportCounts: Record<string, number> = {};
	for (const p of (players || [])) {
		if (!p.sport) continue;
		sportCounts[p.sport] = (sportCounts[p.sport] || 0) + 1;
		if (!sportGroups[p.sport]) sportGroups[p.sport] = [];
		if (sportGroups[p.sport].length < 5) sportGroups[p.sport].push(p);
	}

	return { sportCounts, sportGroups };
}
