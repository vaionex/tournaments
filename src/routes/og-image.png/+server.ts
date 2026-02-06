export async function GET() {
	return new Response(null, {
		status: 302,
		headers: {
			'Location': 'https://images.unsplash.com/photo-1461896836934-47e5c98aebe1?w=1200&h=630&fit=crop',
			'Cache-Control': 'public, max-age=86400'
		}
	});
}
