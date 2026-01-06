/**
 * Word Filter Utility
 * Filters out hostile/offensive words and replaces them with **
 */

// List of hostile/offensive words to filter
const hostileWords = [
	// Common profanity
	'fuck', 'fucking', 'fucked', 'fucker',
	'shit', 'shitting', 'shitted',
	'ass', 'asses', 'asshole',
	'bastard', 'bitch', 'bitches',
	'damn', 'damned', 'dammit',
	'hell', 'crap', 'piss', 'pissing',
	
	// Slurs and offensive terms
	'nigger', 'nigga', 'nazi', 'kkk',
	'retard', 'retarded', 'gay', 'fag', 'faggot',
	'whore', 'slut', 'cunt',
	
	// Other offensive terms
	'idiot', 'moron', 'stupid', 'dumbass',
	'hate', 'kill', 'die', 'death',
	
	// Add more as needed - this is a basic list
];

/**
 * Filter hostile words from text
 * Replaces matching words (case-insensitive) with **
 */
export function filterHostileWords(text: string): string {
	if (!text || typeof text !== 'string') {
		return text;
	}
	
	let filteredText = text;
	
	// Create a regex pattern that matches whole words only
	hostileWords.forEach(word => {
		// Match word boundaries to avoid partial matches
		const regex = new RegExp(`\\b${word}\\b`, 'gi');
		filteredText = filteredText.replace(regex, '**');
	});
	
	return filteredText;
}

/**
 * Check if text contains hostile words (without filtering)
 */
export function containsHostileWords(text: string): boolean {
	if (!text || typeof text !== 'string') {
		return false;
	}
	
	return hostileWords.some(word => {
		const regex = new RegExp(`\\b${word}\\b`, 'gi');
		return regex.test(text);
	});
}

