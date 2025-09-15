import {ALLOWED_ROLES,ONLY_ADMIN_ROLE} from "@/utils/constants";
import {Routes} from "./routes";

export const siteSettings = {
	name: 'Escala Terapia',
	description: '',
	logo: {
		url: '/logo.png',
		alt: 'Escala Terapia',
		href: '/',
		width: 138,
		height: 34,
	},
	defaultLanguage: 'es',
	author: {
		name: 'Roger Torres',
		websiteUrl: 'https://github.com/kelevra9900',
		address: '',
	},
	headerLinks: [],
	authorizedLinks: [
		{
			href: Routes.profileUpdate,
			labelTransKey: 'authorized-nav-item-profile',
			icon: 'UserIcon',
			permission: ALLOWED_ROLES,
		},
		{
			href: Routes.settings,
			labelTransKey: 'authorized-nav-item-settings',
			icon: 'SettingsIcon',
			permission: ONLY_ADMIN_ROLE,
		},
		{
			href: Routes.logout,
			labelTransKey: 'authorized-nav-item-logout',
			icon: 'LogOutIcon',
			permission: ALLOWED_ROLES,
		},
	],
	currencyCode: 'MXN',
	sidebarLinks: {
		admin: {
			root: {
				href: Routes.adminUsers.list,
				label: 'Escala Terapia',
				icon: 'DashboardIcon',
				childMenu: [
					{
						href: Routes.adminUsers.list,
						label: 'Usuarios',
						icon: 'UsersIcon',
					},
					{
						href: Routes.adminSubscriptions.list,
						label: 'Suscripciones',
						icon: 'MyShopIcon',
					},
					{
						href: Routes.adminForms.list,
						label: 'Formularios',
						icon: 'AttributeIcon',
					},
					{
						href: Routes.adminSettings,
						label: 'Configuración',
						icon: 'SettingsIcon',
					},
					{
						href: Routes.adminTherapists.list,
						label: 'Terapeutas',
						icon: 'AuthorIcon',
					},
					{
						href: Routes.adminReports.list,
						label: 'Reportes',
						icon: 'TransactionsIcon',
					},
				],
			},
			therapist: {
				root: {
					href: Routes.therapistClients.list,
					label: 'Panel',
					icon: 'DashboardIcon',
					childMenu: [
						{
							href: Routes.therapistClients.list,
							label: 'Inicio',
							icon: 'DashboardIcon',
						},
						{
							href: Routes.therapistClients.list,
							label: 'Mis Pacientes',
							icon: 'AuthorIcon',
						},
						{
							href: Routes.therapistForms.list,
							label: 'Formularios',
							icon: 'TaxesIcon',
						},
						{
							href: Routes.therapistAnalytics.overview,
							label: 'Analítica',
							icon: 'ReviewIcon',
						},
						{
							href: Routes.therapistSettings.forms,
							label: 'Configuración',
							icon: 'SettingsIcon',
						},
						{
							href: Routes.therapistProfile,
							label: 'Mi perfil',
							icon: 'UsersIcon',
						},
					],
				},
			},
		}

	},
	product: {
		placeholder: '/product-placeholder.svg',
	},
	avatar: {
		placeholder: '/avatar-placeholder.svg',
	},
};
