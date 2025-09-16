const siteUrl = (process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://escalaterapia.com').replace(/\/$/, '');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 5000,
  exclude: [
    '/admin',
    '/admin/*',
    '/dashboard',
    '/dashboard/*',
    '/account',
    '/account/*',
    '/therapist',
    '/therapist/*',
    '/checkout',
    '/checkout/*',
    '/subscription',
    '/subscription/*',
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/dashboard', '/account', '/therapist', '/checkout', '/subscription'] },
    ],
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
    ],
  },
};
