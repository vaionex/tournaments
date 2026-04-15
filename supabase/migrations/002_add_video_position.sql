-- Add video_position column to news_articles
ALTER TABLE news_articles ADD COLUMN IF NOT EXISTS video_position TEXT DEFAULT 'below-image';

-- Position options:
-- 'below-image'    = after featured image (default)
-- 'after-paragraph-2' = embedded in body after 2nd paragraph
-- 'after-paragraph-3' = embedded in body after 3rd paragraph
-- 'after-excerpt'  = between pull quote and body text