-- Insert sample tags
INSERT INTO tags (name, slug) VALUES
('Esports', 'esports'),
('PC Gaming', 'pc-gaming'),
('Console', 'console'),
('FPS', 'fps'),
('MOBA', 'moba'),
('Hardware', 'hardware'),
('Reviews', 'reviews'),
('Competitive', 'competitive');

-- Insert article categories
INSERT INTO article_categories (name, slug, description, meta_title, meta_description) VALUES
('News', 'news', 'Latest gaming and esports news', 'Gaming News | Tournaments.com', 'Stay updated with the latest gaming and esports news'),
('Features', 'features', 'In-depth gaming features and analysis', 'Gaming Features | Tournaments.com', 'Detailed gaming features and analysis'),
('Guides', 'guides', 'Gaming guides and tutorials', 'Gaming Guides | Tournaments.com', 'Expert gaming guides and tutorials'),
('Reviews', 'reviews', 'Game and hardware reviews', 'Gaming Reviews | Tournaments.com', 'Professional game and hardware reviews');

-- Insert sample articles
INSERT INTO articles (
  title, slug, excerpt, content, image_url, status, 
  is_featured, is_breaking, is_trending, read_time,
  meta_title, meta_description, meta_keywords,
  published_at
) VALUES
(
  'CS2 Major Championship Finals: Team Liquid vs Navi',
  'cs2-major-championship-finals',
  'Watch history unfold as two legendary teams battle for the $1,000,000 prize pool',
  'Full article content here...',
  '/images/landing/games/cs2.webp',
  'published',
  true, true, true, 5,
  'CS2 Major Finals | Team Liquid vs Navi',
  'Complete coverage of the CS2 Major Championship Finals',
  ARRAY['CS2', 'esports', 'Team Liquid', 'Navi'],
  NOW()
),
(
  'Valorant''s New Agent Abilities Revealed',
  'valorant-new-agent-revealed',
  'Riot Games reveals the next Valorant agent with game-changing abilities',
  'Full article content here...',
  '/images/landing/games/valorant.webp',
  'published',
  false, false, true, 4,
  'New Valorant Agent Revealed',
  'Details about the newest Valorant agent and abilities',
  ARRAY['Valorant', 'gaming', 'agents'],
  NOW()
);

-- Insert sample hardware reviews
INSERT INTO hardware_reviews (
  title, slug, subtitle, content, category,
  image_url, price, purchase_url, is_featured,
  ratings, pros, cons,
  meta_title, meta_description,
  published_at
) VALUES
(
  'Logitech G Pro X Superlight Review',
  'logitech-g-pro-x-superlight',
  'The ultimate wireless gaming mouse for competitive players',
  'Full review content here...',
  'mouse',
  '/images/hardware/g-pro-x-superlight.webp',
  149.99,
  'https://amazon.com/g-pro-x-superlight',
  true,
  '{"build_quality": 9.5, "performance": 9.8, "features": 9.0, "value": 8.5}',
  ARRAY['Extremely lightweight', 'Flawless wireless performance', 'Great battery life'],
  ARRAY['Expensive', 'No RGB lighting', 'Limited buttons'],
  'Logitech G Pro X Superlight Review | Best Gaming Mouse 2024',
  'Comprehensive review of the Logitech G Pro X Superlight wireless gaming mouse',
  NOW()
),
(
  'Wooting 60HE Review',
  'wooting-60he',
  'Revolutionary analog keyboard changes the game',
  'Full review content here...',
  'keyboard',
  '/images/hardware/wooting-60he.webp',
  174.99,
  'https://wooting.io/wooting-60he',
  true,
  '{"build_quality": 9.0, "performance": 9.5, "features": 9.8, "value": 8.8}',
  ARRAY['Analog input', 'Compact design', 'Customizable actuation'],
  ARRAY['Learning curve', 'Premium price'],
  'Wooting 60HE Review | Revolutionary Gaming Keyboard',
  'In-depth review of the Wooting 60HE analog mechanical keyboard',
  NOW()
);

-- Insert sample game reviews
INSERT INTO game_reviews (
  title, slug, description, content,
  image_url, category, price, is_featured,
  ratings, pros, cons, verdict,
  meta_title, meta_description,
  published_at
) VALUES
(
  'Counter-Strike 2 Review',
  'counter-strike-2',
  'The next evolution of tactical shooters',
  'Full review content here...',
  '/images/landing/games/cs2.webp',
  'fps',
  0.00,
  true,
  '{"gameplay": 9.5, "graphics": 9.0, "sound": 9.0, "value": 10.0, "overall": 9.4}',
  ARRAY['Improved graphics', 'Better netcode', 'Free upgrade'],
  ARRAY['Some map optimizations needed', 'Initial bugs'],
  'CS2 sets a new standard for competitive FPS games',
  'Counter-Strike 2 Review | The Next Generation of Tactical FPS',
  'Complete review of Counter-Strike 2 including gameplay, graphics and competitive features',
  NOW()
),
(
  'Valorant Review',
  'valorant',
  'Tactical shooter with a unique twist',
  'Full review content here...',
  '/images/landing/games/valorant.webp',
  'fps',
  0.00,
  true,
  '{"gameplay": 9.0, "graphics": 8.5, "sound": 8.5, "value": 9.5, "overall": 9.0}',
  ARRAY['Unique abilities', 'Good performance', 'Regular updates'],
  ARRAY['Map pool could be larger', 'Steep learning curve'],
  'Valorant successfully combines tactical shooting with hero abilities',
  'Valorant Review | Tactical Hero Shooter',
  'In-depth review of Riot Games'' tactical shooter Valorant',
  NOW()
);

-- Create some relationships
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id 
FROM articles a, tags t 
WHERE a.slug = 'cs2-major-championship-finals' AND t.slug IN ('esports', 'fps');

INSERT INTO hardware_review_tags (review_id, tag_id)
SELECT r.id, t.id 
FROM hardware_reviews r, tags t 
WHERE r.slug = 'logitech-g-pro-x-superlight' AND t.slug IN ('hardware', 'reviews');

INSERT INTO game_review_tags (review_id, tag_id)
SELECT r.id, t.id 
FROM game_reviews r, tags t 
WHERE r.slug = 'counter-strike-2' AND t.slug IN ('fps', 'competitive');