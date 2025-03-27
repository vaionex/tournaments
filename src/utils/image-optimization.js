/**
 * Gets an optimized image URL with proper dimensions and quality
 * @param {string} url - The original image URL
 * @param {number} width - The desired width
 * @param {number} height - The desired height
 * @param {number} quality - The desired quality (1-100)
 * @param {string} fallbackImage - Optional fallback image path
 * @returns {string} - The optimized image URL
 */
export function getOptimizedImageUrl(url, width, height, quality = 80, fallbackImage = "/images/news-placeholder.webp") {
  if (!url) return fallbackImage;
  
  // Check if URL ends with a question mark
  if (url.endsWith('?')) {
    return `${url}width=${width}&height=${height}&quality=${quality}`;
  } else if (url.includes('?')) {
    // URL has other query parameters
    return `${url}&width=${width}&height=${height}&quality=${quality}`;
  } else {
    // URL has no query parameters
    return `${url}?width=${width}&height=${height}&quality=${quality}`;
  }
}

/**
 * Determines if a URL is from Supabase Storage
 * @param {string} url - The URL to check
 * @returns {boolean} - Whether the URL is from Supabase
 */
export function isSupabaseStorageUrl(url) {
  if (!url) return false;
  return url.includes('supabase.co/storage') || url.includes('.supabase.co/');
}

/**
 * Gets an optimized image URL only if it's from Supabase Storage
 * @param {string} url - The original image URL
 * @param {number} width - The desired width
 * @param {number} height - The desired height
 * @param {number} quality - The desired quality (1-100)
 * @param {string} fallbackImage - Optional fallback image path
 * @returns {string} - The optimized image URL or original URL if not from Supabase
 */
export function getSmartOptimizedImageUrl(url, width, height, quality = 80, fallbackImage = "/images/news-placeholder.webp") {
  if (!url) return fallbackImage;
  
  // Only optimize Supabase storage URLs
  if (isSupabaseStorageUrl(url)) {
    return getOptimizedImageUrl(url, width, height, quality, fallbackImage);
  }
  
  return url;
} 