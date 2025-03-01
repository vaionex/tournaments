-- Add more sample hardware reviews
INSERT INTO hardware_reviews (
  title,
  slug,
  subtitle,
  content,
  category,
  image_url,
  author_id,
  price,
  purchase_url,
  is_featured,
  ratings,
  pros,
  cons,
  published_at
) VALUES
(
  'ASUS ROG Swift PG279QM Review',
  'asus-rog-swift-pg279qm',
  'The Ultimate 1440p Gaming Monitor',
  E'The ASUS ROG Swift PG279QM represents the pinnacle of 1440p gaming monitors, offering an impressive combination of performance and features...\n\n## Performance\nThe 240Hz refresh rate paired with G-Sync Ultimate delivers incredibly smooth gameplay...\n\n## Image Quality\nThe Nano IPS panel produces vibrant colors covering 95% of the DCI-P3 color space...',
  'monitor',
  '/images/hardware/pg279qm.webp',
  '00000000-0000-0000-0000-000000000000',
  799.99,
  'https://amazon.com/pg279qm',
  true,
  '{"build_quality": 9.2, "performance": 9.5, "features": 9.3, "value": 8.5}',
  ARRAY['240Hz refresh rate', 'Excellent color accuracy', 'G-Sync Ultimate', 'Great build quality'],
  ARRAY['Premium price', 'HDR performance could be better'],
  NOW() - INTERVAL '2 days'
),
(
  'SteelSeries Arctis Nova Pro Review',
  'steelseries-arctis-nova-pro',
  'Premium Gaming Audio Excellence',
  E'The SteelSeries Arctis Nova Pro represents a significant evolution in gaming headset design...\n\n## Audio Quality\nThe new Nova Pro Acoustic System delivers incredible clarity and precision...\n\n## Features\nThe included GameDAC Gen 2 provides extensive audio customization...',
  'headset',
  '/images/hardware/arctis-nova-pro.webp',
  '00000000-0000-0000-0000-000000000000',
  349.99,
  'https://amazon.com/arctis-nova-pro',
  true,
  '{"build_quality": 9.4, "performance": 9.6, "features": 9.5, "value": 8.8}',
  ARRAY['Exceptional sound quality', 'Hot-swappable batteries', 'Premium build quality', 'Active noise cancellation'],
  ARRAY['Expensive', 'Software can be complex'],
  NOW() - INTERVAL '5 days'
),
(
  'Razer Viper V3 HyperSpeed Review',
  'razer-viper-v3-hyperspeed',
  'Lightweight Wireless Gaming Mouse',
  E'The Razer Viper V3 HyperSpeed brings impressive performance in a lightweight package...\n\n## Design\nWeighing just 82g, the Viper V3 HyperSpeed maintains excellent build quality...\n\n## Performance\nThe Focus Pro 30K optical sensor provides flawless tracking...',
  'mouse',
  '/images/hardware/viper-v3.webp',
  '00000000-0000-0000-0000-000000000000',
  69.99,
  'https://amazon.com/viper-v3',
  false,
  '{"build_quality": 8.8, "performance": 9.2, "features": 8.5, "value": 9.0}',
  ARRAY['Lightweight design', 'Great battery life', 'Excellent value'],
  ARRAY['No USB-C', 'Basic software features'],
  NOW() - INTERVAL '1 day'
),
(
  'Keychron Q1 Pro Review',
  'keychron-q1-pro',
  'Premium Wireless Mechanical Keyboard',
  E'The Keychron Q1 Pro takes everything great about the original Q1 and adds wireless connectivity...\n\n## Build Quality\nThe full aluminum case provides exceptional build quality and a premium typing experience...\n\n## Features\nQMK/VIA compatibility offers extensive customization options...',
  'keyboard',
  '/images/hardware/keychron-q1-pro.webp',
  '00000000-0000-0000-0000-000000000000',
  199.99,
  'https://keychron.com/q1-pro',
  false,
  '{"build_quality": 9.5, "performance": 9.0, "features": 9.2, "value": 8.7}',
  ARRAY['Premium build quality', 'Wireless connectivity', 'Hot-swappable', 'Extensive customization'],
  ARRAY['Battery life could be better', 'High price point'],
  NOW() - INTERVAL '3 days'
);

-- Add more hardware review tags
INSERT INTO hardware_review_tags (review_id, tag_id)
SELECT r.id, t.id 
FROM hardware_reviews r, tags t 
WHERE r.slug = 'asus-rog-swift-pg279qm' AND t.slug IN ('hardware', 'reviews');

INSERT INTO hardware_review_tags (review_id, tag_id)
SELECT r.id, t.id 
FROM hardware_reviews r, tags t 
WHERE r.slug = 'steelseries-arctis-nova-pro' AND t.slug IN ('hardware', 'reviews');