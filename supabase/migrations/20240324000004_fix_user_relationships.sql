-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY,
  username TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create system user if it doesn't exist
INSERT INTO public.users (id, username)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'System'
) ON CONFLICT (id) DO NOTHING;

-- Create temporary table for existing authors
CREATE TEMP TABLE temp_authors AS
SELECT DISTINCT author_id
FROM (
  SELECT author_id FROM articles WHERE author_id IS NOT NULL
  UNION
  SELECT author_id FROM hardware_reviews WHERE author_id IS NOT NULL
  UNION 
  SELECT author_id FROM game_reviews WHERE author_id IS NOT NULL
) AS combined_authors;

-- Migrate existing authors safely
INSERT INTO public.users (id, username)
SELECT 
  ta.author_id,
  COALESCE(au.raw_user_meta_data->>'username', 'Anonymous Author')
FROM temp_authors ta
LEFT JOIN auth.users au ON ta.author_id = au.id
ON CONFLICT (id) DO NOTHING;

-- Update content to use system user for null authors
UPDATE articles 
SET author_id = '00000000-0000-0000-0000-000000000000'
WHERE author_id IS NULL;

UPDATE hardware_reviews
SET author_id = '00000000-0000-0000-0000-000000000000'
WHERE author_id IS NULL;

UPDATE game_reviews
SET author_id = '00000000-0000-0000-0000-000000000000'
WHERE author_id IS NULL;

-- Add foreign key constraints
ALTER TABLE articles
DROP CONSTRAINT IF EXISTS articles_author_id_fkey,
ADD CONSTRAINT articles_author_id_fkey 
FOREIGN KEY (author_id) REFERENCES public.users(id);

ALTER TABLE hardware_reviews
DROP CONSTRAINT IF EXISTS hardware_reviews_author_id_fkey,
ADD CONSTRAINT hardware_reviews_author_id_fkey
FOREIGN KEY (author_id) REFERENCES public.users(id);

ALTER TABLE game_reviews
DROP CONSTRAINT IF EXISTS game_reviews_author_id_fkey,
ADD CONSTRAINT game_reviews_author_id_fkey
FOREIGN KEY (author_id) REFERENCES public.users(id);

-- Add not null constraints
ALTER TABLE articles
ALTER COLUMN author_id SET NOT NULL;

ALTER TABLE hardware_reviews
ALTER COLUMN author_id SET NOT NULL;

ALTER TABLE game_reviews
ALTER COLUMN author_id SET NOT NULL;

-- Create trigger for new auth users
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, username, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'Anonymous User'),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    username = EXCLUDED.username,
    avatar_url = EXCLUDED.avatar_url,
    updated_at = NOW();
  RETURN NEW;
END;
$$ language plpgsql security definer;

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Enable read access for all users"
ON public.users FOR SELECT
TO public
USING (true);

-- Drop temporary table
DROP TABLE temp_authors;