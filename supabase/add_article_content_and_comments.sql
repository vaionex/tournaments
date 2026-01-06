-- Add full content to articles and create comments
-- This script adds comprehensive content to existing articles and creates realistic comments

-- First, let's update articles with full content
-- Then add comments for each article

DO $$
DECLARE
    article_record RECORD;
    comment_id UUID;
    reply_id UUID;
    author_uuid UUID;
BEGIN
    -- Get a profile ID for verified comments
    SELECT id INTO author_uuid FROM profiles WHERE username = 'tournament_admin' LIMIT 1;

    -- Update articles with full content
    UPDATE news_articles SET content = 
        'The Tennis Open Championship 2025 has officially announced its record-breaking prize pool, setting a new standard for competitive tennis tournaments. With over $250,000 in total prizes across multiple divisions, this year''s event promises to be the most lucrative in the tournament''s history.

The championship, which begins this weekend, will feature top players from around the world competing in singles, doubles, and mixed doubles categories. Tournament director Sarah Martinez expressed excitement about the unprecedented prize structure.

"This year''s prize pool represents a 40% increase from last year," Martinez said in a press conference. "We''re committed to supporting competitive tennis at all levels, and this investment reflects that commitment."

The main singles division will award $100,000 to the winner, with $50,000 for the runner-up. Doubles teams will compete for a $60,000 prize pool, while the mixed doubles category offers $40,000 in total prizes.

Several top-ranked players have already confirmed their participation, including defending champion James Thompson and former world number one Maria Rodriguez. The tournament will be held at the prestigious Riverside Tennis Center, which recently underwent a $5 million renovation to accommodate the growing event.

Spectators can expect world-class facilities, including newly installed LED lighting for evening matches and expanded seating capacity for over 10,000 fans. The tournament will also feature live streaming of all matches on the official tournament website.

Registration for amateur divisions remains open until Friday, with organizers expecting over 500 participants across all categories. The tournament format includes round-robin group stages followed by knockout rounds, ensuring maximum competitive play for all participants.'
    WHERE slug = 'tennis-open-championship-2025-record-prize-pool-announced';

    -- Loop through articles and add comments
    FOR article_record IN 
        SELECT id, title, slug FROM news_articles WHERE is_published = true LIMIT 20
    LOOP
        -- Add 3-6 comments per article
        FOR i IN 1..(3 + floor(random() * 4)::int) LOOP
            INSERT INTO article_comments (article_id, author_name, content, created_at, likes, dislikes, is_verified, is_pinned)
            VALUES (
                article_record.id,
                CASE (i % 7)
                    WHEN 0 THEN 'SportsFan2024'
                    WHEN 1 THEN 'TennisPro'
                    WHEN 2 THEN 'TournamentWatcher'
                    WHEN 3 THEN 'CompetitivePlayer'
                    WHEN 4 THEN 'NewToTennis'
                    WHEN 5 THEN 'SportsAnalyst'
                    ELSE 'LocalFan'
                END,
                CASE (i % 7)
                    WHEN 0 THEN 'This is fantastic news! Can''t wait to see how this impacts the competitive scene. The prize pool increase is a huge step forward for the sport.'
                    WHEN 1 THEN 'I agree! This will definitely bring more talent to the sport. Already seeing more amateurs signing up for local tournaments.'
                    WHEN 2 THEN 'Great coverage! Would love to see more details about the schedule. When do the group stages start?'
                    WHEN 3 THEN 'As a player, I really appreciate the transparency in reporting. Keep it up! This kind of coverage helps grow our community.'
                    WHEN 4 THEN 'Just started playing last year and articles like this make me want to compete! Are there any beginner-friendly divisions?'
                    WHEN 5 THEN 'The 40% increase in prize money is significant. This puts the tournament among the top-tier events. Looking forward to seeing how this affects player attendance.'
                    ELSE 'So proud to have this event! The renovations look amazing. See you all there! 🎾'
                END,
                NOW() - (random() * interval '30 days'),
                floor(random() * 50)::int,
                floor(random() * 5)::int,
                CASE WHEN i % 3 = 0 THEN true ELSE false END,
                CASE WHEN i = 1 THEN true ELSE false END
            ) RETURNING id INTO comment_id;

            -- Add 1-3 replies to some comments
            IF i % 2 = 0 THEN
                FOR j IN 1..(1 + floor(random() * 3)::int) LOOP
                    INSERT INTO article_comments (article_id, parent_id, author_name, content, created_at, likes, dislikes, is_verified)
                    VALUES (
                        article_record.id,
                        comment_id,
                        CASE (j % 5)
                            WHEN 0 THEN 'TournamentsOfficial'
                            WHEN 1 THEN 'Coach_Mike'
                            WHEN 2 THEN 'CasualViewer'
                            WHEN 3 THEN 'ProPlayer'
                            ELSE 'CommunityMod'
                        END,
                        CASE (j % 5)
                            WHEN 0 THEN 'Hi! The group stages begin January 15th. Full schedule available on our website. Hope to see you there!'
                            WHEN 1 THEN 'Absolutely! Check out the Amateur Open division - it''s perfect for newer players. Good luck on your journey!'
                            WHEN 2 THEN 'Does anyone know if tickets are still available? Would love to watch the finals live!'
                            WHEN 3 THEN 'This is exactly what the sport needs. More investment means more opportunities for everyone.'
                            ELSE 'Great question! I''ll make sure to get that information added to the article.'
                        END,
                        NOW() - (random() * interval '25 days'),
                        floor(random() * 20)::int,
                        floor(random() * 2)::int,
                        CASE WHEN j % 2 = 0 THEN true ELSE false END
                    );
                END LOOP;
            END IF;
        END LOOP;
    END LOOP;
END $$;




