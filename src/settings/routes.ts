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
	therapistDashboard: {
		home: '/therapist',
		forms: '/therapist/forms'
	},
	therapistClients: {
		list: '/therapist/patients',
		create: '/therapist/patients/create',
		edit: (id: string) => `/therapist/patients/${id}/edit`,
		details: (id: string) => `/therapist/patients/${id}`,
		forms: (id: string) => `/therapist/patients/${id}/forms`,
		responses: (id: string) => `/therapist/patients/${id}/responses`,
		notes: (id: string) => `/therapist/patients/${id}/notes`,
		files: (id: string) => `/therapist/patients/${id}/files`,
	},
	forms: {
		responses: (id: string) => `/therapist/forms/responses/${id}`,
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
		bulkAssign: '/therapist/forms/bulk-assign',
	},

	therapistTemplates: {
		...routesFactory('/therapist/forms/templates'),
	},
	therapistInvitations: {
		...routesFactory('/therapist/forms/invitations'),
	},
	therapistMessages: '/therapist/messages',
	therapistProfile: '/therapist/profile',

	therapistAnalytics: {
		overview: '/therapist/analytics/overview',
		forms: '/therapist/analytics/forms',
		patients: '/therapist/analytics/patients',
	},

	therapistSettings: {
		forms: '/therapist/settings/forms',
		notifications: '/therapist/settings/notifications',
		export: '/therapist/settings/export',
	},
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
