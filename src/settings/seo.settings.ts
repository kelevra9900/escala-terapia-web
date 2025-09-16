// config/seo.config.ts
import {DefaultSeoProps} from 'next-seo';

const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL?.replace(/\/$/, '') || 'https://escalaterapia.com';
const siteName = 'Escala Terapia';
const description = 'Escala Terapia es una plataforma digital para terapeutas que centraliza usuarios, formularios clínicos, suscripciones y más en un solo lugar.';

const defaultSeo: DefaultSeoProps = {
  title: 'Escala Terapia – Tu herramienta clínica integral',
  description,
  canonical: baseUrl,
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: baseUrl,
    site_name: siteName,
    title: 'Escala Terapia – Tu herramienta clínica integral',
    description,
    images: [
      {
        url: `${baseUrl}/logo.png`,
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
  additionalMetaTags: [
    { name: 'application-name', content: siteName },
    { name: 'theme-color', content: '#ffffff' },
  ],
  languageAlternates: [
    { hrefLang: 'es-MX', href: baseUrl },
    { hrefLang: 'es', href: baseUrl },
    { hrefLang: 'x-default', href: baseUrl },
  ],
};

export default defaultSeo;
