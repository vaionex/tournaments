/**
 * Cache Service
 * Provides in-memory caching for frequently accessed data
 */

interface CacheEntry<T> {
	data: T;
	timestamp: number;
	ttl: number; // Time to live in milliseconds
}

class CacheService {
	private cache = new Map<string, CacheEntry<any>>();
	
	// Default TTL: 5 minutes
	private readonly DEFAULT_TTL = 5 * 60 * 1000;
	
	/**
	 * Get data from cache if it exists and hasn't expired
	 */
	get<T>(key: string): T | null {
		const entry = this.cache.get(key);
		
		if (!entry) {
			return null;
		}
		
		const now = Date.now();
		if (now - entry.timestamp > entry.ttl) {
			// Entry expired, remove it
			this.cache.delete(key);
			return null;
		}
		
		return entry.data as T;
	}
	
	/**
	 * Store data in cache
	 */
	set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
		this.cache.set(key, {
			data,
			timestamp: Date.now(),
			ttl
		});
	}
	
	/**
	 * Check if key exists in cache and is valid
	 */
	has(key: string): boolean {
		const entry = this.cache.get(key);
		if (!entry) return false;
		
		const now = Date.now();
		if (now - entry.timestamp > entry.ttl) {
			this.cache.delete(key);
			return false;
		}
		
		return true;
	}
	
	/**
	 * Remove specific key from cache
	 */
	delete(key: string): void {
		this.cache.delete(key);
	}
	
	/**
	 * Clear all cache
	 */
	clear(): void {
		this.cache.clear();
	}
	
	/**
	 * Clear expired entries
	 */
	cleanup(): void {
		const now = Date.now();
		for (const [key, entry] of this.cache.entries()) {
			if (now - entry.timestamp > entry.ttl) {
				this.cache.delete(key);
			}
		}
	}
}

// Export singleton instance
export const cache = new CacheService();

// Cleanup expired entries every 10 minutes
if (typeof window !== 'undefined') {
	setInterval(() => {
		cache.cleanup();
	}, 10 * 60 * 1000);
}

