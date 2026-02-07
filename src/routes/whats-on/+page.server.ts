import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

function transformTournament(row: Record<string, unknown>) {
  return {
    id: row.id as string,
    name: row.name as string,
    sport: row.sport as string,
    start_date: row.start_date as string,
    end_date: row.end_date as string,
    location: row.location as string,
    description: row.description as string,
    image: row.image_url as string || null,
    is_featured: row.is_featured as boolean,
    prize_money: row.prize_money as string || null
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

  // Get current date and 7 days from now
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  
  // Format dates for Supabase query
  const todayString = today.toISOString().split('T')[0];
  const nextWeekString = nextWeek.toISOString().split('T')[0];

  // Get upcoming tournaments (next 7 days)
  const { data: tournaments } = await supabase
    .from('tournaments')
    .select('id, name, sport, start_date, end_date, location, description, image_url, is_featured, prize_money')
    .gte('start_date', todayString)
    .lte('start_date', nextWeekString)
    .eq('is_published', true)
    .order('start_date', { ascending: true })
    .limit(10);

  // Get recent hot articles (last 7 days)
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const weekAgoString = weekAgo.toISOString();

  const { data: articles } = await supabase
    .from('news_articles')
    .select('id, title, excerpt, content, slug, sport, image_url, published_at, category')
    .eq('is_published', true)
    .gte('published_at', weekAgoString)
    .order('published_at', { ascending: false })
    .limit(8);

  // Get featured tournament if any
  const featuredTournament = tournaments?.find(t => t.is_featured) || tournaments?.[0] || null;

  return {
    upcomingTournaments: (tournaments || []).map(transformTournament),
    recentArticles: (articles || []).map(transformArticle),
    featuredTournament: featuredTournament ? transformTournament(featuredTournament) : null,
    weekStart: today.toISOString(),
    weekEnd: nextWeek.toISOString()
  };
}