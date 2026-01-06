-- =============================================
-- COMPLETE ARTICLE CONTENT AND COMMENTS SETUP
-- =============================================
-- This migration:
-- 1. Creates the article_comments table
-- 2. Adds full content to all articles
-- 3. Adds realistic comments to each article

-- =============================================
-- STEP 1: CREATE COMMENTS TABLE
-- =============================================

CREATE TABLE IF NOT EXISTS article_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID NOT NULL REFERENCES news_articles(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    author_name TEXT NOT NULL,
    author_email TEXT,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    likes INTEGER DEFAULT 0 NOT NULL,
    dislikes INTEGER DEFAULT 0 NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE NOT NULL,
    is_pinned BOOLEAN DEFAULT FALSE NOT NULL,
    parent_id UUID REFERENCES article_comments(id) ON DELETE CASCADE,
    is_deleted BOOLEAN DEFAULT FALSE NOT NULL,
    deleted_at TIMESTAMPTZ,
    metadata JSONB
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_article_comments_article_id ON article_comments(article_id);
CREATE INDEX IF NOT EXISTS idx_article_comments_parent_id ON article_comments(parent_id) WHERE parent_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_article_comments_created_at ON article_comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_article_comments_user_id ON article_comments(user_id) WHERE user_id IS NOT NULL;

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_article_comment_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS article_comments_updated_at ON article_comments;
CREATE TRIGGER article_comments_updated_at
    BEFORE UPDATE ON article_comments
    FOR EACH ROW EXECUTE FUNCTION update_article_comment_updated_at();

-- RLS
ALTER TABLE article_comments ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Comments are viewable by everyone" ON article_comments;
CREATE POLICY "Comments are viewable by everyone"
    ON article_comments FOR SELECT
    USING (is_deleted = FALSE);

DROP POLICY IF EXISTS "Users can insert comments" ON article_comments;
CREATE POLICY "Users can insert comments"
    ON article_comments FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update own comments" ON article_comments;
CREATE POLICY "Users can update own comments"
    ON article_comments FOR UPDATE
    USING (user_id = auth.uid() OR user_id IS NULL);

-- =============================================
-- STEP 2: ADD FULL CONTENT TO ARTICLES
-- =============================================

-- Update articles with comprehensive content based on their titles/categories
DO $$
DECLARE
    article_rec RECORD;
    full_content TEXT;
BEGIN
    FOR article_rec IN 
        SELECT id, title, slug, category, excerpt FROM news_articles WHERE is_published = true
    LOOP
        -- Generate comprehensive content based on article category and title
        full_content := article_rec.excerpt || E'\n\n';
        
        -- Add detailed content based on category
        IF article_rec.category = 'Top Stories' THEN
            full_content := full_content || 
                'This breaking news story has significant implications for the competitive sports world. ' ||
                'Industry experts are weighing in on the potential impact, with many calling it a game-changer. ' ||
                'The announcement comes after months of speculation and represents a major shift in how tournaments are organized and structured. ' ||
                'Fans and players alike are expressing excitement about the developments, with social media buzzing with reactions. ' ||
                'We will continue to provide updates as more information becomes available. Stay tuned for exclusive interviews and in-depth analysis.';
                
        ELSIF article_rec.category = 'Scores & Results' THEN
            full_content := full_content || 
                'The complete results are now in, with detailed statistics and breakdowns available. ' ||
                'The competition was fierce throughout, with several standout performances that will be remembered for years to come. ' ||
                'Prize money distribution has been finalized, and winners have been officially confirmed. ' ||
                'Match highlights and key moments are available for replay, showcasing the incredible skill and determination on display. ' ||
                'Post-match interviews with winners and key players provide insight into their preparation and mindset during the competition.';
                
        ELSIF article_rec.category = 'Analysis' THEN
            full_content := full_content || 
                'This in-depth analysis breaks down the key factors and strategic elements at play. ' ||
                'Our team of experts has studied the data, reviewed footage, and consulted with industry professionals to provide comprehensive insights. ' ||
                'The tactical breakdown reveals several interesting patterns and trends that may influence future competitions. ' ||
                'Statistical analysis supports the conclusions drawn, with data points that highlight the significance of various factors. ' ||
                'This analysis is part of our ongoing commitment to providing deep, meaningful coverage of competitive sports.';
                
        ELSIF article_rec.category = 'Transfers & Rumors' THEN
            full_content := full_content || 
                'The transfer market is heating up with several high-profile moves in the works. ' ||
                'Sources close to the situation have provided insights into the negotiations and potential outcomes. ' ||
                'While nothing is confirmed yet, the rumors are generating significant buzz among fans and analysts. ' ||
                'The impact of these potential moves could reshape the competitive landscape significantly. ' ||
                'We will continue to monitor developments and provide updates as the situation evolves.';
                
        ELSIF article_rec.category = 'Team News' THEN
            full_content := full_content || 
                'This team announcement represents a significant development for the organization. ' ||
                'The decision was made after careful consideration and consultation with key stakeholders. ' ||
                'Team management has expressed confidence in the direction and is looking forward to the future. ' ||
                'Fans have been reacting positively to the news, with many expressing excitement about what''s to come. ' ||
                'The team will be providing more details in the coming days, including press conferences and media availability.';
                
        ELSIF article_rec.category = 'Features' THEN
            full_content := full_content || 
                'This feature story provides an intimate look at the subject, exploring their journey and impact on the sport. ' ||
                'Through exclusive interviews and behind-the-scenes access, we''ve uncovered stories that haven''t been told before. ' ||
                'The human element of competitive sports is on full display, showing the dedication, sacrifice, and passion required to reach the top. ' ||
                'This story is part of our commitment to telling the complete narrative of competitive sports, beyond just the scores and results. ' ||
                'We hope this feature provides inspiration and insight into what it takes to excel at the highest levels.';
        ELSE
            full_content := full_content || 
                'This article provides comprehensive coverage of the topic, with detailed information and expert analysis. ' ||
                'Our team has worked to bring you the most complete and accurate information available. ' ||
                'We encourage readers to engage with the content and share their thoughts in the comments section below.';
        END IF;
        
        -- Update the article with full content
        UPDATE news_articles 
        SET content = full_content 
        WHERE id = article_rec.id AND (content IS NULL OR content = '');
    END LOOP;
END $$;

-- =============================================
-- STEP 3: ADD REALISTIC COMMENTS TO ARTICLES
-- =============================================

DO $$
DECLARE
    article_rec RECORD;
    comment_id UUID;
    comment_authors TEXT[] := ARRAY[
        'SportsFan2024', 'TennisPro', 'TournamentWatcher', 'CompetitivePlayer', 
        'NewToTennis', 'SportsAnalyst', 'LocalFan', 'EsportsGamer', 
        'GolfEnthusiast', 'FootballFan', 'BasketballLover', 'ChessMaster',
        'ProGamer', 'TournamentOrganizer', 'Coach_Mike', 'CasualViewer'
    ];
    verified_authors TEXT[] := ARRAY[
        'TournamentsOfficial', 'Coach_Mike', 'ProPlayer', 'CommunityMod', 
        'TennisPro', 'EsportsGamer', 'ChessMaster'
    ];
    comment_templates TEXT[];
    reply_templates TEXT[];
    num_comments INT;
    num_replies INT;
    i INT;
    j INT;
    author_name TEXT;
    comment_text TEXT;
    reply_text TEXT;
    days_ago INT;
BEGIN
    -- Comment templates based on category
    comment_templates := ARRAY[
        'This is fantastic news! Can''t wait to see how this impacts the competitive scene.',
        'Great coverage! Would love to see more details about the schedule.',
        'As a player, I really appreciate the transparency in reporting. Keep it up!',
        'Just started following this sport and articles like this are so helpful!',
        'The level of competition keeps getting better. Exciting times ahead!',
        'This is exactly what the sport needs. More investment means more opportunities.',
        'So proud to have this event! The facilities look amazing.',
        'Would love to see more coverage of the behind-the-scenes preparation.',
        'The statistics in this article are really eye-opening. Great analysis!',
        'This kind of coverage helps grow our community. Thank you!'
    ];
    
    reply_templates := ARRAY[
        'Hi! Thanks for the question. I''ll make sure to get that information added.',
        'Absolutely! Check out the official website for more details.',
        'Great point! This is exactly the kind of engagement we love to see.',
        'I completely agree. The future looks very bright for the sport.',
        'Thanks for the support! We''re working hard to provide the best coverage.',
        'That''s a great observation. The data really supports that conclusion.'
    ];
    
    -- Loop through all published articles
    FOR article_rec IN 
        SELECT id, title, category FROM news_articles WHERE is_published = true
    LOOP
        -- Add 4-8 comments per article
        num_comments := 4 + floor(random() * 5)::int;
        
        FOR i IN 1..num_comments LOOP
            -- Select random author
            author_name := comment_authors[1 + floor(random() * array_length(comment_authors, 1))::int];
            
            -- Select appropriate comment text
            comment_text := comment_templates[1 + floor(random() * array_length(comment_templates, 1))::int];
            
            -- Add category-specific context
            IF article_rec.category = 'Top Stories' THEN
                comment_text := comment_text || ' This is a major development that will shape the future of competitive sports.';
            ELSIF article_rec.category = 'Scores & Results' THEN
                comment_text := comment_text || ' The results speak for themselves - incredible performances all around.';
            ELSIF article_rec.category = 'Analysis' THEN
                comment_text := comment_text || ' The analysis is spot-on. Really appreciate the deep dive into the tactics.';
            ELSIF article_rec.category = 'Transfers & Rumors' THEN
                comment_text := comment_text || ' The transfer market is always exciting. Can''t wait to see how this plays out.';
            ELSIF article_rec.category = 'Team News' THEN
                comment_text := comment_text || ' This is great news for the team. Looking forward to seeing the impact.';
            ELSIF article_rec.category = 'Features' THEN
                comment_text := comment_text || ' What an inspiring story! These features really bring the human side of sports to life.';
            END IF;
            
            -- Random date within last 30 days
            days_ago := floor(random() * 30)::int;
            
            -- Insert comment
            INSERT INTO article_comments (
                article_id, 
                author_name, 
                content, 
                created_at, 
                likes, 
                dislikes, 
                is_verified, 
                is_pinned
            )
            VALUES (
                article_rec.id,
                author_name,
                comment_text,
                NOW() - (days_ago || ' days')::interval,
                floor(random() * 50)::int,
                floor(random() * 3)::int,
                CASE WHEN author_name = ANY(verified_authors) THEN true ELSE false END,
                CASE WHEN i = 1 THEN true ELSE false END
            ) RETURNING id INTO comment_id;
            
            -- Add 1-3 replies to some comments (60% chance)
            IF random() < 0.6 THEN
                num_replies := 1 + floor(random() * 3)::int;
                
                FOR j IN 1..num_replies LOOP
                    -- Select reply author (mix of verified and regular)
                    IF j = 1 AND random() < 0.4 THEN
                        author_name := verified_authors[1 + floor(random() * array_length(verified_authors, 1))::int];
                    ELSE
                        author_name := comment_authors[1 + floor(random() * array_length(comment_authors, 1))::int];
                    END IF;
                    
                    reply_text := reply_templates[1 + floor(random() * array_length(reply_templates, 1))::int];
                    
                    -- Insert reply
                    INSERT INTO article_comments (
                        article_id,
                        parent_id,
                        author_name,
                        content,
                        created_at,
                        likes,
                        dislikes,
                        is_verified
                    )
                    VALUES (
                        article_rec.id,
                        comment_id,
                        author_name,
                        reply_text,
                        NOW() - ((days_ago - floor(random() * days_ago)::int) || ' days')::interval,
                        floor(random() * 20)::int,
                        floor(random() * 2)::int,
                        CASE WHEN author_name = ANY(verified_authors) THEN true ELSE false END
                    );
                END LOOP;
            END IF;
        END LOOP;
    END LOOP;
END $$;

-- Verify the setup
SELECT 
    (SELECT COUNT(*) FROM news_articles WHERE content IS NOT NULL AND content != '') as articles_with_content,
    (SELECT COUNT(*) FROM article_comments) as total_comments,
    (SELECT COUNT(*) FROM article_comments WHERE parent_id IS NULL) as top_level_comments,
    (SELECT COUNT(*) FROM article_comments WHERE parent_id IS NOT NULL) as replies;




