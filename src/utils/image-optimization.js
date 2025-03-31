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
  console.log('Original URL:', url);
  if (!url) return fallbackImage;
  
  // Transform Supabase URL to use /render/image/ instead of /object/public/
  url = url.replace('/object/', '/render/image/');
  console.log('Transformed URL:', url);
  
  // If URL already has query parameters, update them instead of adding new ones
  if (url.includes('?')) {
    const [baseUrl, queryString] = url.split('?');
    const params = new URLSearchParams(queryString);
    params.set('width', width.toString());
    params.set('height', height.toString());
    params.set('quality', quality.toString());
    return `${baseUrl}?${params.toString()}`;
  }
  
  // URL has no query parameters, add them
  return `${url}?width=${width}&height=${height}&quality=${quality}`;
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
  console.log("getSmarterFunction");
  return getOptimizedImageUrl(url, width, height, quality, fallbackImage);
} 