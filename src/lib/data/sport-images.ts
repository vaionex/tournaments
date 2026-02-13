// Sport-specific fallback images from Unsplash
// Used when an article has no image_url

const sportFallbackImages: Record<string, string[]> = {
	soccer: [
		'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&h=800&fit=crop',
	],
	nfl: [
		'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=1200&h=800&fit=crop',
	],
	nba: [
		'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1504450758481-7338bbe75005?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=1200&h=800&fit=crop',
	],
	wnba: [
		'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1504450758481-7338bbe75005?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=1200&h=800&fit=crop',
	],
	tennis: [
		'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1530915534664-4ac6423816b7?w=1200&h=800&fit=crop',
	],
	mlb: [
		'https://images.unsplash.com/photo-1508344928928-7165b67de128?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1578432156326-d34bff634643?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1529768167801-9173d94c2a42?w=1200&h=800&fit=crop',
	],
	cricket: [
		'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1594470117722-de4b9a02ebed?w=1200&h=800&fit=crop',
	],
	rugby: [
		'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1544681280-d773274e907a?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=1200&h=800&fit=crop',
	],
	golf: [
		'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1632932693687-95adbd30f733?w=1200&h=800&fit=crop',
	],
	nhl: [
		'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1580748142347-92240b5bb89e?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1570870458631-2a27d99e95a5?w=1200&h=800&fit=crop',
	],
	ncaf: [
		'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1200&h=800&fit=crop',
	],
	esports: [
		'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=1200&h=800&fit=crop',
	],
	mma: [
		'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1517438322307-e67111335449?w=1200&h=800&fit=crop',
	],
	boxing: [
		'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1517438322307-e67111335449?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1544117519-31731f4fcdde?w=1200&h=800&fit=crop',
	],
	olympics: [
		'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1461896836934-bd45ba8a0bca?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=1200&h=800&fit=crop',
	],
	racing: [
		'https://images.unsplash.com/photo-1541873676-a18131494184?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=800&fit=crop',
	],
	chess: [
		'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1560174038-da43ac74f01b?w=1200&h=800&fit=crop',
		'https://images.unsplash.com/photo-1586165368502-1bad9cc98298?w=1200&h=800&fit=crop',
	],
};

// General sports fallback (not esports-specific)
const generalFallback = 'https://images.unsplash.com/photo-1461896836934-bd45ba8a0bca?w=1200&h=800&fit=crop';

/**
 * Get a deterministic fallback image for an article based on sport and article ID.
 * Uses the article ID to pick consistently from the pool (so the same article always gets the same image).
 */
export function getSportFallbackImage(sport?: string | null, articleId?: string | null): string {
	const pool = sport ? sportFallbackImages[sport] : null;
	if (!pool || pool.length === 0) return generalFallback;

	// Use article ID for deterministic selection, or random if no ID
	if (articleId) {
		const hash = articleId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
		return pool[hash % pool.length];
	}
	return pool[0];
}

export default sportFallbackImages;
