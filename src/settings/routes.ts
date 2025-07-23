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
	adminSubscriptions: {
		...routesFactory('/admin/subscriptions'),
	},
	adminForms: {
		...routesFactory('/admin/forms'),
	},
	adminSettings: '/admin/settings',
	adminReports: {
		...routesFactory('/admin/reports'),
	},
	adminUsers: {
		...routesFactory('/admin'),
		action: (id: string,action: string) => `/admin/users/${id}/${action}`,
	},
	adminTherapists: {
		...routesFactory('/admin/therapists'),
	},
	therapistClients: {
		list: '/therapist/clients',
		create: '/therapist/clients/create',
		edit: (id: string) => `/therapist/clients/${id}/edit`,
		details: (id: string) => `/therapist/clients/${id}`,
	},
	therapistAppointments: {
		list: '/therapist/appointments',
		create: '/therapist/appointments/create',
		edit: (id: string) => `/therapist/appointments/${id}/edit`,
	},
	therapistReports: {
		list: '/therapist/reports',
		details: (id: string) => `/therapist/reports/${id}`,
	},

	therapistForms: {
		list: '/therapist/forms',
		assign: '/therapist/forms/assign',
		responses: (invitationId: string) => `/therapist/forms/responses/${invitationId}`,
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
