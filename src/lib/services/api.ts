/**
 * Base API utilities for data fetching
 * This module provides the foundation for connecting to external APIs or databases
 */

// Base URL for API calls - can be configured via environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Generic fetch wrapper with error handling
 */
export async function fetchApi<T>(
	endpoint: string,
	options: RequestInit = {}
): Promise<T> {
	const url = `${API_BASE_URL}${endpoint}`;
	
	const defaultHeaders: HeadersInit = {
		'Content-Type': 'application/json',
	};

	const config: RequestInit = {
		...options,
		headers: {
			...defaultHeaders,
			...options.headers,
		},
	};

	try {
		const response = await fetch(url, config);
		
		if (!response.ok) {
			throw new ApiError(
				`API Error: ${response.status} ${response.statusText}`,
				response.status
			);
		}

		return await response.json();
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError('Network error occurred', 0);
	}
}

/**
 * Custom API Error class
 */
export class ApiError extends Error {
	constructor(
		message: string,
		public statusCode: number
	) {
		super(message);
		this.name = 'ApiError';
	}
}

/**
 * Simulate API delay for mock data
 * Remove this in production when using real API
 */
export async function simulateDelay(ms: number = 500): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Query string builder utility
 */
export function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
	const searchParams = new URLSearchParams();
	
	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== '') {
			searchParams.append(key, String(value));
		}
	});

	const queryString = searchParams.toString();
	return queryString ? `?${queryString}` : '';
}

