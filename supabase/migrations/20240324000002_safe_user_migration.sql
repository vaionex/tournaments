-- Create temporary table to store existing user data
CREATE TEMP TABLE temp_users AS
SELECT DISTINCT author_id 
FROM (
  SELECT author_id FROM articles WHERE author_id IS NOT NULL
  UNION 
  SELECT author_id FROM hardware_reviews WHERE author_id IS NOT NULL
  UNION
  SELECT author_id FROM game_reviews WHERE author_id IS NOT NULL
) AS combined_authors;

-- Insert existing authors into public.users if they don't exist
INSERT INTO public.users (id, username, created_at)
SELECT 
  t.author_id,
  COALESCE(u.raw_user_meta_data->>'username', 'Anonymous Author'),
  NOW()
FROM temp_users t
LEFT JOIN auth.users u ON t.author_id = u.id
ON CONFLICT (id) DO NOTHING;

-- Create a default system user for content without authors
INSERT INTO public.users (id, username, created_at)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'System',
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Update existing content to use system user where author is null
UPDATE articles 
SET author_id = '00000000-0000-0000-0000-000000000000'
WHERE author_id IS NULL;

UPDATE hardware_reviews
SET author_id = '00000000-0000-0000-0000-000000000000'
WHERE author_id IS NULL;

UPDATE game_reviews
SET author_id = '00000000-0000-0000-0000-000000000000'
WHERE author_id IS NULL;

-- Add not null constraints after data is fixed
ALTER TABLE articles
ALTER COLUMN author_id SET NOT NULL;

ALTER TABLE hardware_reviews
ALTER COLUMN author_id SET NOT NULL;

ALTER TABLE game_reviews
ALTER COLUMN author_id SET NOT NULL;