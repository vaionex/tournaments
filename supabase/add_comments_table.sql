-- Create comments table for news articles
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

-- Indexes for performance
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

DROP POLICY IF EXISTS "Users can delete own comments" ON article_comments;
CREATE POLICY "Users can delete own comments"
    ON article_comments FOR UPDATE
    USING (user_id = auth.uid() OR user_id IS NULL);


