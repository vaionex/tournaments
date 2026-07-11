const endpoint = 'https://analytics.server.vaionex.com/api/event';

export function trackConversion(name: string, props: Record<string, string> = {}) {
	if (typeof window === 'undefined') return;

	fetch(endpoint, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			name,
			url: window.location.href,
			domain: 'tournaments.com',
			props
		}),
		keepalive: true
	}).catch(() => {});
}
