import Head from 'next/head';

type SeoProps = {
	title: string;
	description: string;
	url: string;
	image?: string;
	keywords?: string[];
	noIndex?: boolean;
};

const Seo = ({title,description,url,image,keywords,noIndex}: SeoProps) => (
	<Head>
		<title>{title}</title>
		<meta name="description" content={description} />
		{keywords && <meta name="keywords" content={keywords.join(', ')} />}
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta charSet="utf-8" />
		<link rel="canonical" href={url} />

		{/* Robots */}
		<meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />

		{/* Open Graph */}
		<meta property="og:type" content="website" />
		<meta property="og:url" content={url} />
		<meta property="og:title" content={title} />
		<meta property="og:description" content={description} />
		{image && <meta property="og:image" content={image} />}

		{/* Twitter */}
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:url" content={url} />
		<meta name="twitter:title" content={title} />
		<meta name="twitter:description" content={description} />
		{image && <meta name="twitter:image" content={image} />}
	</Head>
);

export default Seo;
