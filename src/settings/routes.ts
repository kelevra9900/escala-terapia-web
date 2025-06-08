export const Routes = {
	dashboard: '/dashboard',
	home: '/home',
	login: '/login',
	logout: '/logout',
	profile: '/profile',
	profileUpdate: '/profile-update',
	settings: '/settings',
	users: {
		...routesFactory('/users'),
	},
	adminSubscriptions: '/admin/subscriptions',
	adminForms: '/admin/forms',
	therapistForms: '/therapist/forms',
	adminSettings: '/admin/settings',
	adminReports: {
		...routesFactory('/admin/reports'),
	},
	adminUsers: {
		...routesFactory('/admin/users'),
		action: (id: string,action: string) => `/admin/users/${id}/${action}`,
	},
	adminTherapists: {
		...routesFactory('/admin/therapists'),
	},
	therapistClients: {
		...routesFactory('/therapist/clients'),
	},
	therapistAppointments: {
		...routesFactory('/therapist/appointments'),
	},
	therapistMessages: '/therapist/messages',
	therapistProfile: '/therapist/profile',
};

function routesFactory(endpoint: string) {
	return {
		list: `${endpoint}`,
		create: `${endpoint}/create`,
		edit: (id: string) => {
			return `${endpoint}/${id}/edit`;
		},
		translate: (slug: string,language: string) => {
			return `${language}${endpoint}/${slug}/translate`;
		},
		details: (slug: string) => `${endpoint}/${slug}`,
		editByIdWithoutLang: (id: string) => {
			return `${endpoint}/${id}/edit`;
		},
	};
}
