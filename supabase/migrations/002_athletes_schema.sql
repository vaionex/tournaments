-- =============================================
-- ATHLETES TABLE - SEO-optimized athlete profiles
-- =============================================

CREATE TABLE athletes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Identity
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    sport TEXT NOT NULL,
    
    -- Profile
    nationality TEXT,
    birth_date DATE,
    height TEXT,
    weight TEXT,
    position TEXT,
    team TEXT,
    
    -- Career
    career_start INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    achievements JSONB DEFAULT '[]'::jsonb,
    stats JSONB DEFAULT '{}'::jsonb,
    
    -- Bio content
    biography TEXT,
    bio_word_count INTEGER,
    
    -- SEO
    meta_title TEXT,
    meta_description TEXT,
    
    -- Status
    is_published BOOLEAN DEFAULT FALSE
);

-- Indexes
CREATE INDEX idx_athletes_sport ON athletes(sport);
CREATE INDEX idx_athletes_slug ON athletes(slug);
CREATE INDEX idx_athletes_published ON athletes(is_published) WHERE is_published = TRUE;
CREATE INDEX idx_athletes_sport_published ON athletes(sport, is_published) WHERE is_published = TRUE;

-- Auto-update updated_at
CREATE TRIGGER athletes_updated_at
    BEFORE UPDATE ON athletes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
