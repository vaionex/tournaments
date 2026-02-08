/**
 * Utility functions for formatting and common operations
 */

/**
 * Format currency values
 */
export function formatCurrency(value: number | string | null | undefined): string {
	const num = typeof value === 'string' ? parseFloat(value) : value || 0;
	
	if (num === 0) return '$0';
	
	// Format large numbers with K, M, B abbreviations
	if (num >= 1_000_000_000) {
		return `$${(num / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B`;
	}
	if (num >= 1_000_000) {
		return `$${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
	}
	if (num >= 1_000) {
		return `$${(num / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
	}
	
	return `$${num.toLocaleString()}`;
}

/**
 * Format numeric values
 */
export function formatNumber(value: number | string | null | undefined): string {
	const num = typeof value === 'string' ? parseFloat(value) : value || 0;
	
	if (num === 0) return '0';
	
	// Format large numbers with K, M, B abbreviations
	if (num >= 1_000_000_000) {
		return `${(num / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B`;
	}
	if (num >= 1_000_000) {
		return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
	}
	if (num >= 1_000) {
		return `${(num / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
	}
	
	return num.toLocaleString();
}

/**
 * Format date strings
 */
export function formatDate(date: string | Date): string {
	const d = new Date(date);
	return d.toLocaleDateString('en-US', { 
		year: 'numeric', 
		month: 'long', 
		day: 'numeric' 
	});
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: string | Date): string {
	const now = new Date();
	const then = new Date(date);
	const diffMs = now.getTime() - then.getTime();
	
	const diffSeconds = Math.floor(diffMs / 1000);
	const diffMinutes = Math.floor(diffSeconds / 60);
	const diffHours = Math.floor(diffMinutes / 60);
	const diffDays = Math.floor(diffHours / 24);
	
	if (diffSeconds < 60) {
		return 'Just now';
	} else if (diffMinutes < 60) {
		return `${diffMinutes}m ago`;
	} else if (diffHours < 24) {
		return `${diffHours}h ago`;
	} else if (diffDays < 7) {
		return `${diffDays}d ago`;
	} else {
		return formatDate(date);
	}
}

/**
 * Create URL slug from string
 */
export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, length: number = 100): string {
	if (text.length <= length) return text;
	return text.slice(0, length).replace(/\s+\S*$/, '') + '...';
}

/**
 * Capitalize first letter of each word
 */
export function titleCase(text: string): string {
	return text.replace(/\w\S*/g, (txt) => {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}