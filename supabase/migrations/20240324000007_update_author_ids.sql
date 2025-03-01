-- Update hardware reviews to use the actual author ID
UPDATE hardware_reviews
SET author_id = '07593f24-8bc1-40e7-a98c-c7ee2d9d73c1'
WHERE author_id = '00000000-0000-0000-0000-000000000000';

-- Update articles to use the actual author ID
UPDATE articles
SET author_id = '07593f24-8bc1-40e7-a98c-c7ee2d9d73c1'
WHERE author_id = '00000000-0000-0000-0000-000000000000';

-- Update game reviews to use the actual author ID
UPDATE game_reviews
SET author_id = '07593f24-8bc1-40e7-a98c-c7ee2d9d73c1'
WHERE author_id = '00000000-0000-0000-0000-000000000000';

-- Ensure the user exists in public.users
INSERT INTO public.users (id, username)
VALUES (
  '07593f24-8bc1-40e7-a98c-c7ee2d9d73c1',
  'Admin'
) ON CONFLICT (id) DO UPDATE
SET username = EXCLUDED.username;