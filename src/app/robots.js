export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Googlebot-News',
        allow: ['/news/', '/'],
      },
    ],
    sitemap: 'https://tournaments.com/sitemap.xml',
  };
}