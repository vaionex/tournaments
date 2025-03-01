-- Add is_top_pick column to hardware_reviews
ALTER TABLE hardware_reviews
ADD COLUMN is_top_pick BOOLEAN DEFAULT false;

-- Update existing reviews to be top picks
UPDATE hardware_reviews
SET is_top_pick = true
WHERE slug IN (
  'logitech-g-pro-x-superlight',
  'wooting-60he',
  'asus-rog-swift-pg279qm',
  'steelseries-arctis-nova-pro'
);