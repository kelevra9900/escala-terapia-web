export type Question = {
	id: string;
	text: string;
	type: 'MULTIPLE_CHOICE';
	options: {label: string; value: string | number}[];
};

export type FormTemplate = {
	id: string;
	title: string;
	description: string;
	questions: Question[];
};

export type LoginInput = {
	email: string;
	password: string;
}

export type LoginResponseSuccess = {
	access_token: string;
	user: User
}
export type User = {
	sub: string;
	name: string;
	email: string;
	role: UserRole;
	iat: number;
	exp: number;
}

export type LoginResponseError = {
	message: string | string[];
	error: string;
	statusCode: number;
}

export type LoginResponse = LoginResponseSuccess | LoginResponseError;

enum UserRole {
	ADMIN = 'ADMIN',
	THERAPIST = 'THERAPIST',
	CLIENT = 'CLIENT',
}


export interface PricingItemInterface {
	isPopular: boolean
	name: string
	pricing: string
	desc: string
	per: string
	features: string[]
}

export const pricings: PricingItemInterface[] = [
	{
		isPopular: false,
		name: 'Starter',
		pricing: '$9',
		per: '/mes',
		features: [
			'Acceso a 2 formularios clínicos',
			'Hasta 10 respuestas por mes',
			'Visualización básica de resultados',
			'Soporte por correo electrónico',
		],
		desc: 'Ideal para terapeutas que inician y quieren evaluar a sus primeros pacientes.',
	},
	{
		isPopular: true,
		name: 'Profesional',
		pricing: '$19',
		per: '/mes',
		features: [
			'Acceso a todos los formularios clínicos',
			'Respuestas ilimitadas de pacientes',
			'Generación automática de reportes',
			'Soporte prioritario por email',
		],
		desc: 'Perfecto para terapeutas en práctica activa que evalúan a múltiples pacientes al mes.',
	},
	{
		isPopular: false,
		name: 'Avanzado',
		pricing: '$39',
		per: '/mes',
		features: [
			'Todo lo incluido en Profesional',
			'Exportación de datos en PDF y Excel',
			'Análisis estadístico de resultados',
			'Asignación de formularios automática',
			'Atención personalizada por WhatsApp',
		],
		desc: 'Diseñado para clínicas o terapeutas con alto volumen de pacientes y seguimiento detallado.',
	},
];
