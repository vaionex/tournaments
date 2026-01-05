-- =============================================
-- Seed Data for Tournaments App
-- Run this after the initial schema migration
-- =============================================

-- Insert sample games
INSERT INTO games (name, slug, category, publisher, is_active) VALUES
    ('Fortnite', 'fortnite', 'esports', 'Epic Games', true),
    ('League of Legends', 'league-of-legends', 'esports', 'Riot Games', true),
    ('Valorant', 'valorant', 'esports', 'Riot Games', true),
    ('Call of Duty: Warzone', 'warzone', 'esports', 'Activision', true),
    ('Counter-Strike 2', 'cs2', 'esports', 'Valve', true),
    ('Rocket League', 'rocket-league', 'esports', 'Psyonix', true),
    ('Apex Legends', 'apex-legends', 'esports', 'EA', true),
    ('Super Smash Bros. Ultimate', 'smash-ultimate', 'esports', 'Nintendo', true),
    ('Street Fighter 6', 'street-fighter-6', 'esports', 'Capcom', true),
    ('FIFA 24', 'fifa-24', 'sports', 'EA Sports', true),
    ('NBA 2K24', 'nba-2k24', 'sports', '2K Games', true),
    ('Madden NFL 24', 'madden-24', 'sports', 'EA Sports', true),
    ('Chess', 'chess', 'traditional', NULL, true),
    ('Poker', 'poker', 'traditional', NULL, true),
    ('Overwatch 2', 'overwatch-2', 'esports', 'Blizzard', true),
    ('Dota 2', 'dota-2', 'esports', 'Valve', true)
ON CONFLICT (slug) DO NOTHING;

-- Note: Sample tournaments and profiles will be created dynamically
-- as users sign up and organizers create events.

-- Sample tournaments (requires an organizer - uncomment after creating a user)
/*
INSERT INTO tournaments (
    name, slug, game, date, prize_pool, platform, location, status, 
    description, organizer_id, is_featured, max_players
) VALUES
    (
        'Fortnite Champions Cup',
        'fortnite-champions-cup-2024',
        'Fortnite',
        '2024-03-15 18:00:00+00',
        50000,
        'Epic Games',
        'Online - NA',
        'upcoming',
        'The ultimate Fortnite championship with the best players competing for glory.',
        'YOUR_ORGANIZER_UUID_HERE',
        true,
        100
    ),
    (
        'Valorant Masters Open',
        'valorant-masters-open-2024',
        'Valorant',
        '2024-03-20 20:00:00+00',
        25000,
        'FACEIT',
        'Online - EU',
        'upcoming',
        'Open qualifier for the Valorant Masters series.',
        'YOUR_ORGANIZER_UUID_HERE',
        true,
        64
    ),
    (
        'CS2 Weekly Cup #12',
        'cs2-weekly-cup-12',
        'Counter-Strike 2',
        '2024-02-28 19:00:00+00',
        5000,
        'ESEA',
        'Online - Global',
        'completed',
        'Weekly competitive CS2 tournament.',
        'YOUR_ORGANIZER_UUID_HERE',
        false,
        32
    );
*/





