-- First ensure the users table exists with correct structure
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY,
  username TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert admin user first to ensure it exists
INSERT INTO public.users (id, username)
VALUES (
  '07593f24-8bc1-40e7-a98c-c7ee2d9d73c1',
  'Admin'
) ON CONFLICT (id) DO UPDATE
SET username = EXCLUDED.username;

-- Temporarily disable foreign key constraints
ALTER TABLE articles 
DROP CONSTRAINT IF EXISTS articles_author_id_fkey;

ALTER TABLE hardware_reviews
DROP CONSTRAINT IF EXISTS hardware_reviews_author_id_fkey;

ALTER TABLE game_reviews
DROP CONSTRAINT IF EXISTS game_reviews_author_id_fkey;

-- Update all content to use the admin user ID
UPDATE articles
SET author_id = '07593f24-8bc1-40e7-a98c-c7ee2d9d73c1'
WHERE author_id IS NULL OR author_id = '00000000-0000-0000-0000-000000000000';

UPDATE hardware_reviews
SET author_id = '07593f24-8bc1-40e7-a98c-c7ee2d9d73c1'
WHERE author_id IS NULL OR author_id = '00000000-0000-0000-0000-000000000000';

UPDATE game_reviews
SET author_id = '07593f24-8bc1-40e7-a98c-c7ee2d9d73c1'
WHERE author_id IS NULL OR author_id = '00000000-0000-0000-0000-000000000000';

-- Re-add foreign key constraints
ALTER TABLE articles
ADD CONSTRAINT articles_author_id_fkey 
FOREIGN KEY (author_id) REFERENCES public.users(id);

ALTER TABLE hardware_reviews
ADD CONSTRAINT hardware_reviews_author_id_fkey
FOREIGN KEY (author_id) REFERENCES public.users(id);

ALTER TABLE game_reviews
ADD CONSTRAINT game_reviews_author_id_fkey
FOREIGN KEY (author_id) REFERENCES public.users(id);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Enable read access for all users"
ON public.users FOR SELECT
TO public
USING (true);