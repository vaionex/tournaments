-- Drop the users view if it exists
DROP VIEW IF EXISTS public.users;

-- Create a proper users table that mirrors auth.users
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Update articles table to reference public.users
ALTER TABLE articles 
DROP CONSTRAINT IF EXISTS articles_author_id_fkey,
ADD CONSTRAINT articles_author_id_fkey 
FOREIGN KEY (author_id) REFERENCES public.users(id);

-- Update hardware_reviews table to reference public.users
ALTER TABLE hardware_reviews
DROP CONSTRAINT IF EXISTS hardware_reviews_author_id_fkey,
ADD CONSTRAINT hardware_reviews_author_id_fkey
FOREIGN KEY (author_id) REFERENCES public.users(id);

-- Update game_reviews table to reference public.users
ALTER TABLE game_reviews
DROP CONSTRAINT IF EXISTS game_reviews_author_id_fkey,
ADD CONSTRAINT game_reviews_author_id_fkey
FOREIGN KEY (author_id) REFERENCES public.users(id);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users"
ON public.users FOR SELECT
TO public
USING (true);

-- Create trigger to sync auth.users to public.users
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, username, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ language plpgsql security definer;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();