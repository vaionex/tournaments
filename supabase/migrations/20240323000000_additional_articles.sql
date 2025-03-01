-- Add more sample articles
INSERT INTO articles (
  title, slug, excerpt, content, image_url, status,
  is_featured, is_breaking, is_trending, read_time,
  meta_title, meta_description, meta_keywords,
  published_at
) VALUES
(
  'League of Legends Season 14: Major Changes Coming to Ranked System',
  'lol-season-14-ranked-changes',
  'Riot Games announces comprehensive updates to League''s ranked system, promising better matchmaking and rewards',
  'Full article content detailing the ranked system changes...',
  '/images/landing/games/league.webp',
  'published',
  true, false, true, 7,
  'LoL Season 14 Ranked Changes | Complete Guide',
  'Comprehensive breakdown of League of Legends Season 14 ranked system changes',
  ARRAY['League of Legends', 'Season 14', 'Ranked', 'MOBA'],
  NOW() - INTERVAL '2 days'
),
(
  'Apex Legends Mobile Makes Stunning Return with Unreal Engine 5',
  'apex-legends-mobile-returns',
  'Respawn Entertainment partners with Tencent for a complete rebuild of Apex Legends Mobile using Unreal Engine 5',
  'Detailed coverage of the new mobile version...',
  '/images/landing/games/apex.webp',
  'published',
  false, true, true, 5,
  'Apex Legends Mobile Returns | UE5 Upgrade',
  'Everything you need to know about the new Apex Legends Mobile',
  ARRAY['Apex Legends', 'Mobile Gaming', 'Unreal Engine 5'],
  NOW() - INTERVAL '1 day'
),
(
  'Dota 2''s The International Prize Pool Reaches Record $40 Million',
  'dota-2-ti-prize-pool-record',
  'The International 2024 becomes the highest-paying esports tournament in history',
  'Analysis of the prize pool and its implications...',
  '/images/landing/games/dota 2.webp',
  'published',
  true, false, true, 6,
  'Dota 2 TI Prize Pool Record | Esports History',
  'Analysis of The International 2024''s record-breaking prize pool',
  ARRAY['Dota 2', 'The International', 'Esports', 'Prize Pool'],
  NOW() - INTERVAL '12 hours'
),
(
  'EA Sports FC 24: Pro Clubs Getting Cross-Platform Support',
  'ea-fc-24-pro-clubs-crossplay',
  'EA finally brings cross-platform play to Pro Clubs mode in latest update',
  'Details about the cross-platform implementation...',
  '/images/landing/games/ea fc 24.webp',
  'published',
  false, false, true, 4,
  'EA FC 24 Pro Clubs Cross-Platform Update',
  'Complete guide to EA FC 24''s new cross-platform Pro Clubs feature',
  ARRAY['EA FC 24', 'Pro Clubs', 'Cross-Platform'],
  NOW() - INTERVAL '6 hours'
),
(
  'Fortnite Chapter 5 Season 3 Leak Reveals Massive Map Changes',
  'fortnite-chapter-5-season-3-leaks',
  'Upcoming season reportedly features the biggest map evolution since Chapter 2',
  'Analysis of leaked information and potential changes...',
  '/images/landing/games/fortnite.webp',
  'published',
  true, true, true, 8,
  'Fortnite Chapter 5 Season 3 Leaks | Map Changes',
  'Everything we know about Fortnite''s upcoming season',
  ARRAY['Fortnite', 'Chapter 5', 'Season 3', 'Leaks'],
  NOW() - INTERVAL '3 hours'
),
(
  'CS2 Pro Scene: Rising Stars to Watch in 2024',
  'cs2-rising-stars-2024',
  'Meet the upcoming talents who are making waves in the professional Counter-Strike scene',
  'Profiles of emerging CS2 talents and their achievements...',
  '/images/landing/games/cs2.webp',
  'published',
  false, false, true, 10,
  'CS2 Rising Stars 2024 | New Pro Players',
  'Comprehensive look at Counter-Strike 2''s emerging professional talent',
  ARRAY['CS2', 'Esports', 'Pro Players'],
  NOW() - INTERVAL '1 hour'
);

-- Add relationships to tags
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id 
FROM articles a, tags t 
WHERE a.slug = 'lol-season-14-ranked-changes' AND t.slug IN ('esports', 'moba');

INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id 
FROM articles a, tags t 
WHERE a.slug = 'apex-legends-mobile-returns' AND t.slug IN ('fps', 'competitive');

INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id 
FROM articles a, tags t 
WHERE a.slug = 'dota-2-ti-prize-pool-record' AND t.slug IN ('esports', 'moba');