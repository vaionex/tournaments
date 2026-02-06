export async function GET() {
	const body = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /dashboard
Disallow: /login
Disallow: /profile

Sitemap: https://www.tournaments.com/sitemap.xml`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain',
			'Cache-Control': 'max-age=86400'
		}
	});
}
