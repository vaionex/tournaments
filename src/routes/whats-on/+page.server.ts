import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const tournamentFields = 'id, name, slug, game, date, end_date, location, description, image_url, is_featured, prize_pool, prize_pool_currency, status, tags';

function transformTournament(row: Record<string, unknown>) {
  const prizePool = row.prize_pool as number;
  const currency = (row.prize_pool_currency as string) || 'USD';
  let prizeMoney = null;
  if (prizePool) {
    prizeMoney = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(prizePool);
  }

  return {
    id: row.id as string,
    name: row.name as string,
    sport: (row.game as string || 'esports').toLowerCase(),
    start_date: row.date as string,
    end_date: row.end_date as string,
    location: row.location as string,
    description: row.description as string,
    image: row.image_url as string || null,
    is_featured: row.is_featured as boolean,
    prize_money: prizeMoney,
    status: row.status as string
  };
}

function transformArticle(row: Record<string, unknown>) {
  return {
    id: row.id as string,
    title: row.title as string,
    excerpt: row.excerpt as string,
    content: row.content as string | undefined,
    date: row.published_at ? new Date(row.published_at as string) : new Date(),
    category: row.category as string || 'Top Stories',
    image: row.image_url as string || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200',
    author: 'Staff',
    sport: row.sport as string | undefined,
    slug: row.slug as string | undefined
  };
}

export async function load() {
  const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  
  const todayString = today.toISOString();
  const nextWeekString = nextWeek.toISOString();

  // 1. Currently running tournaments (started before now, ends after now)
  const { data: currentlyRunning } = await supabase
    .from('tournaments')
    .select(tournamentFields)
    .lte('date', todayString)
    .gte('end_date', todayString)
    .order('date', { ascending: true })
    .limit(10);

  // 2. Starting within the next 7 days
  const { data: upcoming } = await supabase
    .from('tournaments')
    .select(tournamentFields)
    .gt('date', todayString)
    .lte('date', nextWeekString)
    .order('date', { ascending: true })
    .limit(10);

  // Merge and deduplicate
  const seen = new Set<string>();
  const tournaments = [...(currentlyRunning || []), ...(upcoming || [])].filter(t => {
    if (seen.has(t.id as string)) return false;
    seen.add(t.id as string);
    return true;
  });

  // Recent hot articles (last 7 days)
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const { data: articles } = await supabase
    .from('news_articles')
    .select('id, title, excerpt, content, slug, sport, image_url, published_at, category')
    .eq('is_published', true)
    .gte('published_at', weekAgo.toISOString())
    .order('published_at', { ascending: false })
    .limit(8);

  // Featured = explicitly featured, or the biggest prize pool, or first
  const featuredTournament = tournaments.find(t => (t as any).is_featured) 
    || tournaments.sort((a, b) => ((b as any).prize_pool || 0) - ((a as any).prize_pool || 0))[0] 
    || null;

  return {
    upcomingTournaments: tournaments.map(transformTournament),
    recentArticles: (articles || []).map(transformArticle),
    featuredTournament: featuredTournament ? transformTournament(featuredTournament) : null,
    weekStart: today.toISOString(),
    weekEnd: nextWeek.toISOString()
  };
}
