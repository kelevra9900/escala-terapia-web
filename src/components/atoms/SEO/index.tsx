import Head from 'next/head';

type SeoProps = {
	title?: string;
	description?: string;
	url?: string;
	image?: string;
	keywords?: string[];
	noIndex?: boolean;
	siteName?: string;
	locale?: string;
	faviconUrl?: string;
};

const BASE_URL = (process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://escalaterapia.com').replace(/\/$/, '');
const DEFAULTS = {
  title: 'Escala Terapia',
  description: 'Formularios clínicos y herramientas digitales para terapeutas y psicólogos.',
  url: BASE_URL,
  image: `${BASE_URL}/logo.png`,
  siteName: 'Escala Terapia',
  locale: 'es_MX',
};

const Seo = ({
	title = DEFAULTS.title,
	description = DEFAULTS.description,
	url = DEFAULTS.url,
	image = DEFAULTS.image,
	keywords,
	noIndex = false,
	siteName = DEFAULTS.siteName,
	locale = DEFAULTS.locale,
	faviconUrl = '/favicon.ico',
}: SeoProps) => (
	<Head>
		<title>{title}</title>
		<meta name="description" content={description} />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta charSet="utf-8" />
		<meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
	<link rel="canonical" href={url} />
		{faviconUrl && <link rel="icon" href={faviconUrl} />}
		{keywords?.length && <meta name="keywords" content={keywords.join(', ')} />}

		{/* Open Graph */}
		<meta property="og:type" content="website" />
		<meta property="og:title" content={title} />
		<meta property="og:description" content={description} />
		<meta property="og:url" content={url} />
		<meta property="og:image" content={image} />
		<meta property="og:site_name" content={siteName} />
		<meta property="og:locale" content={locale} />

		{/* Twitter */}
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={title} />
		<meta name="twitter:description" content={description} />
		<meta name="twitter:image" content={image} />
		<meta name="twitter:url" content={url} />
	</Head>
);

export default Seo;
