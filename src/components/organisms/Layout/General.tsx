import type {Metadata} from 'next';

import {Footer,Header,MenuMobile} from '@/components/organisms'


export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_FRONTEND_URL ?? 'https://escalaterapia.com'),
	title: {
		default: 'Escala Terapia',
		template: '%s – Escala Terapia',
	},
	description: 'Formularios clínicos y herramientas digitales para terapeutas y psicólogos.',
	applicationName: 'Escala Terapia',
	openGraph: {
		type: 'website',
		siteName: 'Escala Terapia',
		locale: 'es_MX',
		images: ['/images/og-default.jpg'],
	},
	twitter: {
		card: 'summary_large_image',
	},
	robots: {index: true,follow: true},
	alternates: {
		canonical: '/',
		languages: {'es-MX': '/'},
	},
};


const GeneralLayout: React.FC<{children?: React.ReactNode}> = ({
	children,
}) => {
	return (
		<div className="bg-white text-base text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">
			<Header />
			{children}
			<MenuMobile />
			<Footer />
		</div>
	);
}

export default GeneralLayout;