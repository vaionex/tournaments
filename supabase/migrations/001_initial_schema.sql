-- =============================================
-- Tournaments Database Schema
-- Run this in Supabase SQL Editor to create all tables
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- ENUMS
-- =============================================

CREATE TYPE tournament_status AS ENUM ('draft', 'upcoming', 'live', 'completed', 'cancelled');
CREATE TYPE claim_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE game_category AS ENUM ('esports', 'sports', 'traditional', 'other');
CREATE TYPE registration_status AS ENUM ('pending', 'confirmed', 'checked_in', 'disqualified', 'withdrawn');

-- =============================================
-- PROFILES TABLE (extends Supabase auth.users)
-- =============================================

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    username TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    banner_url TEXT,
    country TEXT,
    timezone TEXT,
    is_verified BOOLEAN DEFAULT FALSE NOT NULL,
    is_pro BOOLEAN DEFAULT FALSE NOT NULL,
    total_winnings NUMERIC DEFAULT 0 NOT NULL,
    total_tournaments INTEGER DEFAULT 0 NOT NULL,
    total_wins INTEGER DEFAULT 0 NOT NULL,
    win_rate NUMERIC DEFAULT 0 NOT NULL,
    current_rank INTEGER,
    primary_game TEXT,
    social_links JSONB,
    settings JSONB
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, username, display_name)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'display_name', SPLIT_PART(NEW.email, '@', 1))
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =============================================
-- GAMES TABLE
-- =============================================

CREATE TABLE games (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category game_category NOT NULL,
    publisher TEXT,
    image_url TEXT,
    banner_url TEXT,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    player_count INTEGER DEFAULT 0 NOT NULL,
    tournament_count INTEGER DEFAULT 0 NOT NULL
);

-- Auto-generate slug from name
CREATE OR REPLACE FUNCTION generate_slug()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug := LOWER(REGEXP_REPLACE(NEW.name, '[^a-zA-Z0-9]+', '-', 'g'));
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER games_generate_slug
    BEFORE INSERT OR UPDATE ON games
    FOR EACH ROW EXECUTE FUNCTION generate_slug();

-- =============================================
-- TOURNAMENTS TABLE
-- =============================================

CREATE TABLE tournaments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    game TEXT NOT NULL,
    game_id UUID REFERENCES games(id) ON DELETE SET NULL,
    date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    prize_pool NUMERIC NOT NULL,
    prize_pool_currency TEXT DEFAULT 'USD' NOT NULL,
    entry_fee NUMERIC,
    entry_fee_currency TEXT DEFAULT 'USD' NOT NULL,
    platform TEXT NOT NULL,
    platform_id TEXT,
    location TEXT NOT NULL,
    is_online BOOLEAN DEFAULT TRUE NOT NULL,
    status tournament_status DEFAULT 'draft' NOT NULL,
    description TEXT,
    rules TEXT[],
    prize_breakdown JSONB,
    registered_players INTEGER DEFAULT 0 NOT NULL,
    max_players INTEGER,
    image_url TEXT,
    banner_url TEXT,
    organizer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE NOT NULL,
    external_url TEXT,
    tags TEXT[]
);

-- Auto-generate tournament slug
CREATE TRIGGER tournaments_generate_slug
    BEFORE INSERT OR UPDATE ON tournaments
    FOR EACH ROW EXECUTE FUNCTION generate_slug();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tournaments_updated_at
    BEFORE UPDATE ON tournaments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- TOURNAMENT PARTICIPANTS TABLE
-- =============================================

CREATE TABLE tournament_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE NOT NULL,
    player_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    team_name TEXT,
    registration_status registration_status DEFAULT 'pending' NOT NULL,
    seed INTEGER,
    checked_in_at TIMESTAMPTZ,
    UNIQUE(tournament_id, player_id)
);

-- Update registered_players count
CREATE OR REPLACE FUNCTION update_registered_players()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE tournaments SET registered_players = registered_players + 1 WHERE id = NEW.tournament_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE tournaments SET registered_players = registered_players - 1 WHERE id = OLD.tournament_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tournament_player_count
    AFTER INSERT OR DELETE ON tournament_participants
    FOR EACH ROW EXECUTE FUNCTION update_registered_players();

-- =============================================
-- TOURNAMENT RESULTS TABLE
-- =============================================

CREATE TABLE tournament_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE NOT NULL,
    player_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    team_name TEXT,
    rank INTEGER NOT NULL,
    prize_amount NUMERIC NOT NULL,
    prize_currency TEXT DEFAULT 'USD' NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE NOT NULL,
    verified_at TIMESTAMPTZ,
    verified_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    claim_status claim_status DEFAULT 'unclaimed' NOT NULL,
    claimed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    claimed_at TIMESTAMPTZ
);

-- Update player stats when result is verified
CREATE OR REPLACE FUNCTION update_player_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_verified = TRUE AND (OLD IS NULL OR OLD.is_verified = FALSE) THEN
        UPDATE profiles SET
            total_winnings = total_winnings + NEW.prize_amount,
            total_tournaments = total_tournaments + 1,
            total_wins = total_wins + CASE WHEN NEW.rank = 1 THEN 1 ELSE 0 END
        WHERE id = NEW.player_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_player_stats_on_result
    AFTER INSERT OR UPDATE ON tournament_results
    FOR EACH ROW EXECUTE FUNCTION update_player_stats();

-- =============================================
-- LINKED ACCOUNTS TABLE
-- =============================================

CREATE TABLE linked_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    platform TEXT NOT NULL,
    platform_user_id TEXT NOT NULL,
    platform_username TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE NOT NULL,
    verified_at TIMESTAMPTZ,
    access_token TEXT,
    refresh_token TEXT,
    token_expires_at TIMESTAMPTZ,
    metadata JSONB,
    UNIQUE(user_id, platform)
);

-- =============================================
-- NEWS ARTICLES TABLE
-- =============================================

CREATE TABLE news_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    is_published BOOLEAN DEFAULT FALSE NOT NULL,
    published_at TIMESTAMPTZ,
    read_time INTEGER DEFAULT 5 NOT NULL,
    view_count INTEGER DEFAULT 0 NOT NULL,
    tags TEXT[],
    is_featured BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TRIGGER news_articles_updated_at
    BEFORE UPDATE ON news_articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- CLAIMS TABLE
-- =============================================

CREATE TABLE claims (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    tournament_result_id UUID REFERENCES tournament_results(id) ON DELETE CASCADE NOT NULL,
    status claim_status DEFAULT 'pending' NOT NULL,
    evidence JSONB,
    admin_notes TEXT,
    reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    UNIQUE(user_id, tournament_result_id)
);

CREATE TRIGGER claims_updated_at
    BEFORE UPDATE ON claims
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- VIEWS
-- =============================================

CREATE OR REPLACE VIEW player_rankings AS
SELECT
    p.id,
    p.username,
    p.display_name,
    p.avatar_url,
    p.total_winnings,
    p.total_wins,
    p.win_rate,
    ROW_NUMBER() OVER (ORDER BY p.total_winnings DESC) AS rank,
    p.primary_game,
    p.is_verified
FROM profiles p
WHERE p.total_tournaments > 0
ORDER BY p.total_winnings DESC;

-- =============================================
-- RPC FUNCTIONS
-- =============================================

-- Get leaderboard
CREATE OR REPLACE FUNCTION get_leaderboard(
    game_slug TEXT DEFAULT NULL,
    limit_count INTEGER DEFAULT 100
)
RETURNS TABLE (
    id UUID,
    username TEXT,
    display_name TEXT,
    avatar_url TEXT,
    total_winnings NUMERIC,
    rank BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.id,
        p.username,
        p.display_name,
        p.avatar_url,
        p.total_winnings,
        ROW_NUMBER() OVER (ORDER BY p.total_winnings DESC) AS rank
    FROM profiles p
    WHERE (game_slug IS NULL OR p.primary_game = game_slug)
      AND p.total_tournaments > 0
    ORDER BY p.total_winnings DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Search tournaments
CREATE OR REPLACE FUNCTION search_tournaments(
    search_term TEXT,
    game_filter TEXT DEFAULT NULL,
    status_filter TEXT DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    name TEXT,
    game TEXT,
    date TIMESTAMPTZ,
    prize_pool NUMERIC,
    status tournament_status
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        t.id,
        t.name,
        t.game,
        t.date,
        t.prize_pool,
        t.status
    FROM tournaments t
    WHERE (t.name ILIKE '%' || search_term || '%' OR t.game ILIKE '%' || search_term || '%')
      AND (game_filter IS NULL OR t.game = game_filter)
      AND (status_filter IS NULL OR t.status::TEXT = status_filter)
    ORDER BY t.date DESC
    LIMIT 50;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX idx_tournaments_status ON tournaments(status);
CREATE INDEX idx_tournaments_game ON tournaments(game);
CREATE INDEX idx_tournaments_date ON tournaments(date);
CREATE INDEX idx_tournaments_organizer ON tournaments(organizer_id);
CREATE INDEX idx_tournaments_featured ON tournaments(is_featured) WHERE is_featured = TRUE;

CREATE INDEX idx_tournament_participants_tournament ON tournament_participants(tournament_id);
CREATE INDEX idx_tournament_participants_player ON tournament_participants(player_id);

CREATE INDEX idx_tournament_results_tournament ON tournament_results(tournament_id);
CREATE INDEX idx_tournament_results_player ON tournament_results(player_id);

CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_winnings ON profiles(total_winnings DESC);

CREATE INDEX idx_news_published ON news_articles(is_published, published_at DESC);
CREATE INDEX idx_news_category ON news_articles(category);

CREATE INDEX idx_games_slug ON games(slug);
CREATE INDEX idx_games_active ON games(is_active) WHERE is_active = TRUE;

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournament_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournament_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE linked_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, self update
CREATE POLICY "Profiles are viewable by everyone"
    ON profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Games: Public read
CREATE POLICY "Games are viewable by everyone"
    ON games FOR SELECT
    USING (true);

-- Tournaments: Public read, organizer write
CREATE POLICY "Tournaments are viewable by everyone"
    ON tournaments FOR SELECT
    USING (true);

CREATE POLICY "Organizers can insert tournaments"
    ON tournaments FOR INSERT
    WITH CHECK (auth.uid() = organizer_id);

CREATE POLICY "Organizers can update own tournaments"
    ON tournaments FOR UPDATE
    USING (auth.uid() = organizer_id);

CREATE POLICY "Organizers can delete own tournaments"
    ON tournaments FOR DELETE
    USING (auth.uid() = organizer_id);

-- Tournament Participants: Public read, self insert/update
CREATE POLICY "Participants are viewable by everyone"
    ON tournament_participants FOR SELECT
    USING (true);

CREATE POLICY "Users can register themselves"
    ON tournament_participants FOR INSERT
    WITH CHECK (auth.uid() = player_id);

CREATE POLICY "Users can update own registration"
    ON tournament_participants FOR UPDATE
    USING (auth.uid() = player_id);

CREATE POLICY "Users can withdraw themselves"
    ON tournament_participants FOR DELETE
    USING (auth.uid() = player_id);

-- Tournament Results: Public read
CREATE POLICY "Results are viewable by everyone"
    ON tournament_results FOR SELECT
    USING (true);

-- Linked Accounts: Self only
CREATE POLICY "Users can view own linked accounts"
    ON linked_accounts FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own linked accounts"
    ON linked_accounts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own linked accounts"
    ON linked_accounts FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own linked accounts"
    ON linked_accounts FOR DELETE
    USING (auth.uid() = user_id);

-- News Articles: Public read published, author write
CREATE POLICY "Published articles are viewable by everyone"
    ON news_articles FOR SELECT
    USING (is_published = true OR auth.uid() = author_id);

CREATE POLICY "Authors can insert articles"
    ON news_articles FOR INSERT
    WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update own articles"
    ON news_articles FOR UPDATE
    USING (auth.uid() = author_id);

-- Claims: Self read/write
CREATE POLICY "Users can view own claims"
    ON claims FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own claims"
    ON claims FOR INSERT
    WITH CHECK (auth.uid() = user_id);







