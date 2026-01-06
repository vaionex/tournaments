-- Add more upcoming tournaments across various sports and esports
-- Run this SQL in your Supabase SQL editor

-- First, get the organizer ID
DO $$
DECLARE
    organizer_uuid UUID;
    tennis_id UUID;
    golf_id UUID;
    football_id UUID;
    basketball_id UUID;
    baseball_id UUID;
    soccer_id UUID;
    volleyball_id UUID;
    chess_id UUID;
    boxing_id UUID;
    mma_id UUID;
    f1_id UUID;
    cs2_id UUID;
    valorant_id UUID;
    lol_id UUID;
    dota2_id UUID;
    fortnite_id UUID;
    apex_id UUID;
    rl_id UUID;
    ow2_id UUID;
BEGIN
    -- Get organizer ID
    SELECT id INTO organizer_uuid FROM profiles WHERE username = 'tournament_admin' LIMIT 1;
    
    -- Get game IDs
    SELECT id INTO tennis_id FROM games WHERE slug = 'tennis' LIMIT 1;
    SELECT id INTO golf_id FROM games WHERE slug = 'golf' LIMIT 1;
    SELECT id INTO football_id FROM games WHERE slug = 'football' LIMIT 1;
    SELECT id INTO basketball_id FROM games WHERE slug = 'basketball' LIMIT 1;
    SELECT id INTO baseball_id FROM games WHERE slug = 'baseball' LIMIT 1;
    SELECT id INTO soccer_id FROM games WHERE slug = 'soccer' LIMIT 1;
    SELECT id INTO volleyball_id FROM games WHERE slug = 'volleyball' LIMIT 1;
    SELECT id INTO chess_id FROM games WHERE slug = 'chess' LIMIT 1;
    SELECT id INTO boxing_id FROM games WHERE slug = 'boxing' LIMIT 1;
    SELECT id INTO mma_id FROM games WHERE slug = 'mma' LIMIT 1;
    SELECT id INTO f1_id FROM games WHERE slug = 'formula-1' LIMIT 1;
    SELECT id INTO cs2_id FROM games WHERE slug = 'counter-strike-2' LIMIT 1;
    SELECT id INTO valorant_id FROM games WHERE slug = 'valorant' LIMIT 1;
    SELECT id INTO lol_id FROM games WHERE slug = 'league-of-legends' LIMIT 1;
    SELECT id INTO dota2_id FROM games WHERE slug = 'dota-2' LIMIT 1;
    SELECT id INTO fortnite_id FROM games WHERE slug = 'fortnite' LIMIT 1;
    SELECT id INTO apex_id FROM games WHERE slug = 'apex-legends' LIMIT 1;
    SELECT id INTO rl_id FROM games WHERE slug = 'rocket-league' LIMIT 1;
    SELECT id INTO ow2_id FROM games WHERE slug = 'overwatch-2' LIMIT 1;

    -- TRADITIONAL SPORTS TOURNAMENTS
    INSERT INTO tournaments (name, slug, game, game_id, date, end_date, prize_pool, prize_pool_currency, entry_fee, platform, location, is_online, status, description, organizer_id, is_featured, is_verified, max_players, tags) VALUES
    -- Tennis
    ('French Open 2025', 'french-open-2025', 'Tennis', tennis_id, '2025-05-26 10:00:00+00', '2025-06-08 18:00:00+00', 55000000, 'EUR', 0, 'FFT', 'Paris, France', false, 'upcoming', 'Roland Garros - the premier clay court Grand Slam tournament.', organizer_uuid, true, true, 128, ARRAY['Grand Slam', 'Clay Court', 'Premium']),
    ('WTA Finals 2025', 'wta-finals-2025', 'Tennis', tennis_id, '2025-11-03 11:00:00+00', '2025-11-10 20:00:00+00', 9000000, 'USD', 0, 'WTA', 'Shenzhen, China', false, 'upcoming', 'The WTA Finals featuring the top 8 women''s singles players and doubles teams.', organizer_uuid, true, true, 16, ARRAY['WTA', 'Finals', 'Premium']),
    ('ATP Finals 2025', 'atp-finals-2025', 'Tennis', tennis_id, '2025-11-09 12:00:00+00', '2025-11-16 21:00:00+00', 15000000, 'USD', 0, 'ATP', 'Turin, Italy', false, 'upcoming', 'The ATP Finals - the season-ending championship for the top 8 men''s singles players.', organizer_uuid, true, true, 8, ARRAY['ATP', 'Finals', 'Premium']),
    
    -- Golf
    ('US Open 2025', 'us-open-golf-2025', 'Golf', golf_id, '2025-06-12 07:00:00+00', '2025-06-15 19:00:00+00', 20000000, 'USD', 0, 'USGA', 'Oakmont, Pennsylvania, USA', false, 'upcoming', 'The US Open - one of golf''s four major championships, known for its challenging course setups.', organizer_uuid, true, true, 156, ARRAY['Major', 'US Open', 'Premium']),
    ('The Open Championship 2025', 'the-open-championship-2025', 'Golf', golf_id, '2025-07-17 06:00:00+00', '2025-07-20 18:00:00+00', 16000000, 'GBP', 0, 'R&A', 'Royal Portrush, Northern Ireland', false, 'upcoming', 'The Open Championship - the oldest major championship in golf, played on links courses.', organizer_uuid, true, true, 156, ARRAY['Major', 'The Open', 'Premium']),
    ('Ryder Cup 2025', 'ryder-cup-2025', 'Golf', golf_id, '2025-09-26 08:00:00+00', '2025-09-28 18:00:00+00', 0, 'USD', 0, 'PGA of America', 'Bethpage Black, New York, USA', false, 'upcoming', 'The Ryder Cup - the biennial team competition between Europe and the United States.', organizer_uuid, true, true, 24, ARRAY['Ryder Cup', 'Team Event', 'Premium']),
    
    -- Football/Soccer
    ('Copa América 2025', 'copa-america-2025', 'Soccer', soccer_id, '2025-06-14 16:00:00+00', '2025-07-13 22:00:00+00', 0, 'USD', 0, 'CONMEBOL', 'Various, USA', false, 'upcoming', 'Copa América - the premier international football tournament in South America.', organizer_uuid, true, true, 16, ARRAY['Copa América', 'International', 'Premium']),
    ('UEFA Euro 2025', 'uefa-euro-2025', 'Soccer', soccer_id, '2025-06-14 18:00:00+00', '2025-07-14 21:00:00+00', 0, 'EUR', 0, 'UEFA', 'Various, Germany', false, 'upcoming', 'UEFA European Championship - the premier international football tournament in Europe.', organizer_uuid, true, true, 24, ARRAY['Euro', 'International', 'Premium']),
    ('FA Cup Final 2025', 'fa-cup-final-2025', 'Soccer', soccer_id, '2025-05-17 15:00:00+00', '2025-05-17 17:30:00+00', 0, 'GBP', 0, 'FA', 'London, UK', false, 'upcoming', 'The FA Cup Final - the oldest football competition in the world.', organizer_uuid, true, true, 2, ARRAY['FA Cup', 'Final', 'Premium']),
    
    -- Basketball
    ('NCAA March Madness 2025', 'ncaa-march-madness-2025', 'Basketball', basketball_id, '2025-03-18 12:00:00+00', '2025-04-07 22:00:00+00', 0, 'USD', 0, 'NCAA', 'Various, USA', false, 'upcoming', 'NCAA Men''s Basketball Tournament - the premier college basketball championship.', organizer_uuid, true, true, 68, ARRAY['NCAA', 'March Madness', 'College']),
    ('FIBA World Cup 2027', 'fiba-world-cup-2027', 'Basketball', basketball_id, '2027-08-25 10:00:00+00', '2027-09-10 22:00:00+00', 0, 'USD', 0, 'FIBA', 'Qatar', false, 'upcoming', 'FIBA Basketball World Cup - the premier international basketball tournament.', organizer_uuid, true, true, 32, ARRAY['FIBA', 'World Cup', 'International']),
    
    -- Baseball
    ('MLB All-Star Game 2025', 'mlb-all-star-game-2025', 'Baseball', baseball_id, '2025-07-15 20:00:00+00', '2025-07-15 23:00:00+00', 0, 'USD', 0, 'MLB', 'Philadelphia, Pennsylvania, USA', false, 'upcoming', 'MLB All-Star Game - featuring the best players from the American and National Leagues.', organizer_uuid, true, true, 60, ARRAY['MLB', 'All-Star', 'Premium']),
    
    -- Combat Sports
    ('Boxing: Heavyweight Championship 2025', 'boxing-heavyweight-championship-2025', 'Boxing', boxing_id, '2025-09-20 22:00:00+00', '2025-09-21 01:00:00+00', 50000000, 'USD', 0, 'Top Rank', 'Las Vegas, Nevada, USA', false, 'upcoming', 'The biggest heavyweight boxing match of the year featuring the top contenders.', organizer_uuid, true, true, 2, ARRAY['Boxing', 'Heavyweight', 'Premium']),
    ('UFC 301', 'ufc-301', 'MMA', mma_id, '2025-05-04 22:00:00+00', '2025-05-05 02:00:00+00', 3000000, 'USD', 0, 'UFC', 'Rio de Janeiro, Brazil', false, 'upcoming', 'UFC 301 returns to Brazil with a stacked card featuring local fighters.', organizer_uuid, false, true, 12, ARRAY['UFC', 'MMA', 'Brazil']),
    
    -- Motorsports
    ('Formula 1 British Grand Prix 2025', 'formula-1-british-grand-prix-2025', 'Formula 1', f1_id, '2025-07-06 14:00:00+00', '2025-07-06 16:00:00+00', 0, 'GBP', 0, 'FIA', 'Silverstone, UK', false, 'upcoming', 'The British Grand Prix at Silverstone - one of the most historic races on the F1 calendar.', organizer_uuid, true, true, 20, ARRAY['Formula 1', 'British GP', 'Premium']),
    ('Formula 1 Italian Grand Prix 2025', 'formula-1-italian-grand-prix-2025', 'Formula 1', f1_id, '2025-08-31 14:00:00+00', '2025-08-31 16:00:00+00', 0, 'EUR', 0, 'FIA', 'Monza, Italy', false, 'upcoming', 'The Italian Grand Prix at Monza - the Temple of Speed.', organizer_uuid, true, true, 20, ARRAY['Formula 1', 'Italian GP', 'Premium']),
    
    -- ESPORTS TOURNAMENTS
    ('ESL Pro League Season 20', 'esl-pro-league-season-20', 'Counter-Strike 2', cs2_id, '2025-03-18 10:00:00+00', '2025-03-30 20:00:00+00', 850000, 'USD', 0, 'ESL', 'Online', true, 'upcoming', 'ESL Pro League Season 20 - the premier CS2 league competition.', organizer_uuid, true, true, 24, ARRAY['ESL', 'Pro League', 'CS2']),
    ('BLAST Premier Spring Final 2025', 'blast-premier-spring-final-2025', 'Counter-Strike 2', cs2_id, '2025-06-25 12:00:00+00', '2025-06-29 20:00:00+00', 1000000, 'USD', 0, 'BLAST', 'London, UK', false, 'upcoming', 'BLAST Premier Spring Final - featuring the best CS2 teams from around the world.', organizer_uuid, true, true, 8, ARRAY['BLAST', 'CS2', 'Premium']),
    ('Valorant Masters Tokyo 2025', 'valorant-masters-tokyo-2025', 'Valorant', valorant_id, '2025-06-11 11:00:00+00', '2025-06-23 20:00:00+00', 1000000, 'USD', 0, 'Riot Games', 'Tokyo, Japan', false, 'upcoming', 'Valorant Masters Tokyo - the second international tournament of the 2025 VCT season.', organizer_uuid, true, true, 12, ARRAY['Masters', 'Valorant', 'Tokyo']),
    ('MSI 2025', 'msi-2025', 'League of Legends', lol_id, '2025-05-01 10:00:00+00', '2025-05-18 20:00:00+00', 250000, 'USD', 0, 'Riot Games', 'Chengdu, China', false, 'upcoming', 'Mid-Season Invitational 2025 - featuring the best League of Legends teams from each region.', organizer_uuid, true, true, 12, ARRAY['MSI', 'League of Legends', 'International']),
    ('Dota 2 Major Championship 2025', 'dota-2-major-championship-2025', 'Dota 2', dota2_id, '2025-04-20 10:00:00+00', '2025-04-27 20:00:00+00', 1000000, 'USD', 0, 'Valve', 'Berlin, Germany', false, 'upcoming', 'Dota 2 Major Championship - one of the premier Dota 2 tournaments of the year.', organizer_uuid, true, true, 18, ARRAY['Major', 'Dota 2', 'Premium']),
    ('Fortnite Champion Series 2025', 'fortnite-champion-series-2025', 'Fortnite', fortnite_id, '2025-09-15 14:00:00+00', '2025-09-28 22:00:00+00', 5000000, 'USD', 0, 'Epic Games', 'Online', true, 'upcoming', 'Fortnite Champion Series - the premier competitive Fortnite tournament.', organizer_uuid, true, true, 100, ARRAY['FNCS', 'Fortnite', 'Championship']),
    ('ALGS Split 2 Playoffs 2025', 'algs-split-2-playoffs-2025', 'Apex Legends', apex_id, '2025-07-10 16:00:00+00', '2025-07-13 23:00:00+00', 1000000, 'USD', 0, 'EA', 'Los Angeles, USA', false, 'upcoming', 'Apex Legends Global Series Split 2 Playoffs - featuring the top teams from each region.', organizer_uuid, true, true, 40, ARRAY['ALGS', 'Apex Legends', 'Playoffs']),
    ('RLCS World Championship 2025', 'rlcs-world-championship-2025', 'Rocket League', rl_id, '2025-09-12 12:00:00+00', '2025-09-15 20:00:00+00', 2000000, 'USD', 0, 'Psyonix', 'Rotterdam, Netherlands', false, 'upcoming', 'Rocket League Championship Series World Championship - the ultimate Rocket League tournament.', organizer_uuid, true, true, 24, ARRAY['RLCS', 'World Championship', 'Premium']),
    ('Overwatch League Grand Finals 2025', 'overwatch-league-grand-finals-2025', 'Overwatch 2', ow2_id, '2025-10-25 18:00:00+00', '2025-10-26 22:00:00+00', 1000000, 'USD', 0, 'Blizzard', 'Los Angeles, USA', false, 'upcoming', 'Overwatch League Grand Finals - the championship match of the OWL season.', organizer_uuid, true, true, 2, ARRAY['OWL', 'Grand Finals', 'Premium']),
    
    -- Other Sports
    ('Volleyball World Championships 2025', 'volleyball-world-championships-2025', 'Volleyball', volleyball_id, '2025-09-12 10:00:00+00', '2025-09-28 20:00:00+00', 2000000, 'USD', 0, 'FIVB', 'Various, Poland', false, 'upcoming', 'FIVB Volleyball World Championships - the premier international volleyball tournament.', organizer_uuid, true, true, 24, ARRAY['World Championships', 'Volleyball', 'FIVB']),
    ('World Chess Championship Candidates 2026', 'world-chess-championship-candidates-2026', 'Chess', chess_id, '2026-04-05 10:00:00+00', '2026-04-28 18:00:00+00', 500000, 'EUR', 0, 'FIDE', 'Toronto, Canada', false, 'upcoming', 'The Candidates Tournament - determining who will challenge for the World Chess Championship.', organizer_uuid, true, true, 8, ARRAY['Candidates', 'Chess', 'World Championship'])
    ON CONFLICT (slug) DO NOTHING;
END $$;




