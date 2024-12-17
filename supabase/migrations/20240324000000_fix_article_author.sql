-- Add proper foreign key for author_id in articles table
ALTER TABLE articles 
DROP CONSTRAINT IF EXISTS articles_author_id_fkey,
ADD CONSTRAINT articles_author_id_fkey 
FOREIGN KEY (author_id) REFERENCES auth.users(id);

-- Create users view for easier querying
CREATE OR REPLACE VIEW public.users AS
SELECT 
  id,
  email,
  raw_user_meta_data->>'username' as username
FROM auth.users;

-- Update articles query permissions
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
ON articles FOR SELECT
TO public
USING (true);