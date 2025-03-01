-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tags Table
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Article Categories/Topics
CREATE TABLE article_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  meta_title VARCHAR(255),
  meta_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Articles Table
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url VARCHAR(255),
  author_id UUID REFERENCES auth.users(id),
  category_id UUID REFERENCES article_categories(id),
  status VARCHAR(50) DEFAULT 'draft', -- draft, published, archived
  is_featured BOOLEAN DEFAULT false,
  is_breaking BOOLEAN DEFAULT false,
  is_trending BOOLEAN DEFAULT false,
  read_time INTEGER, -- in minutes
  meta_title VARCHAR(255),
  meta_description TEXT,
  meta_keywords TEXT[],
  canonical_url VARCHAR(255),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Article Tags Junction Table
CREATE TABLE article_tags (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

-- Hardware Reviews Table
CREATE TABLE hardware_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  subtitle TEXT,
  content TEXT NOT NULL,
  category VARCHAR(50) NOT NULL, -- mouse, keyboard, monitor, etc.
  image_url VARCHAR(255),
  author_id UUID REFERENCES auth.users(id),
  price DECIMAL(10,2),
  purchase_url VARCHAR(255),
  is_featured BOOLEAN DEFAULT false,
  ratings JSONB NOT NULL DEFAULT '{
    "build_quality": 0,
    "performance": 0,
    "features": 0,
    "value": 0
  }',
  pros TEXT[] DEFAULT '{}',
  cons TEXT[] DEFAULT '{}',
  meta_title VARCHAR(255),
  meta_description TEXT,
  meta_keywords TEXT[],
  canonical_url VARCHAR(255),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Hardware Review Tags Junction Table
CREATE TABLE hardware_review_tags (
  review_id UUID REFERENCES hardware_reviews(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (review_id, tag_id)
);

-- Game Reviews Table
CREATE TABLE game_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  content TEXT NOT NULL,
  image_url VARCHAR(255),
  author_id UUID REFERENCES auth.users(id),
  category VARCHAR(50) NOT NULL, -- fps, moba, battle-royale, etc.
  price DECIMAL(10,2),
  is_featured BOOLEAN DEFAULT false,
  ratings JSONB NOT NULL DEFAULT '{
    "gameplay": 0,
    "graphics": 0,
    "sound": 0,
    "value": 0,
    "overall": 0
  }',
  pros TEXT[] DEFAULT '{}',
  cons TEXT[] DEFAULT '{}',
  verdict TEXT,
  meta_title VARCHAR(255),
  meta_description TEXT,
  meta_keywords TEXT[],
  canonical_url VARCHAR(255),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Game Review Tags Junction Table
CREATE TABLE game_review_tags (
  review_id UUID REFERENCES game_reviews(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (review_id, tag_id)
);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hardware_reviews_updated_at
  BEFORE UPDATE ON hardware_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_game_reviews_updated_at
  BEFORE UPDATE ON game_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tags_updated_at
  BEFORE UPDATE ON tags
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_article_categories_updated_at
  BEFORE UPDATE ON article_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for performance
CREATE INDEX articles_slug_idx ON articles(slug);
CREATE INDEX hardware_reviews_slug_idx ON hardware_reviews(slug);
CREATE INDEX game_reviews_slug_idx ON game_reviews(slug);
CREATE INDEX tags_slug_idx ON tags(slug);
CREATE INDEX article_categories_slug_idx ON article_categories(slug);