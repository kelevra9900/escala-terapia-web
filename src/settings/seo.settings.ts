// config/seo.config.ts
import {DefaultSeoProps} from 'next-seo';

const defaultSeo: DefaultSeoProps = {
	title: 'Escala Terapia – Tu herramienta clínica integral',
	description:
		'Escala Terapia es una plataforma digital para terapeutas que centraliza usuarios, formularios clínicos, suscripciones y más en un solo lugar.',
	canonical: 'https://escala-terapia.com',
	openGraph: {
		type: 'website',
		locale: 'es_MX',
		url: 'https://escala-terapia.com',
		site_name: 'Escala Terapia',
		title: 'Escala Terapia – Tu herramienta clínica integral',
		description:
			'Escala Terapia es una plataforma digital para terapeutas que centraliza usuarios, formularios clínicos, suscripciones y más en un solo lugar.',
		images: [
			{
				url: 'https://escala-terapia.com/images/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Escala Terapia – Imagen destacada',
				type: 'image/png',
			},
		],
	},
	twitter: {
		handle: '@escala_terapia',
		site: '@escala_terapia',
		cardType: 'summary_large_image',
	},
};

export default defaultSeo;
