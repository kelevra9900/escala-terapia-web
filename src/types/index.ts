import type {NextPage} from 'next';

export type Question = {
	id: string;
	text: string;
	type: 'MULTIPLE_CHOICE';
	options: {label: string; value: string | number}[];
};
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type NextPageWithLayout<P = {}> = NextPage<P> & {
	authorization?: boolean;
	getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export type QuestionType = 'SHORT_ANSWER' | 'PARAGRAPH' | 'MULTIPLE_CHOICE' | 'CHECKBOXES' | 'DROPDOWN';


export interface FormQuestion {
	id: string;
	text: string;
	type: QuestionType;
	options: string[];
	order: number;
}


export interface FormTemplateQuestion {
	id: string;
	text: string;
	type: QuestionType;
	options: string[];
	order: number;
}

export interface CreateFormTemplateInput {
	title: string;
	description: string;
	isActive: boolean;
}

export interface FormTemplate {
	id: string;
	title: string;
	description: string;
	isActive: boolean;
	createdBy: string;
	createdAt: string;
	questions: FormTemplateQuestion[];
}
export type SubmitFormResponseInput = {
	token: string;
	answers: Record<string,string>;
};

export interface Form {
	id: string;
	isCompleted: boolean;
	token: string;
	formTemplate: FormTemplate | null;
}


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
	subscriptionStatus?: SubscriptionStatus;
	role: UserRole;
	iat: number;
	exp: number;
}

export type GenericError = {
	message: string | string[];
	error: string;
	statusCode: number;
}

export type LoginResponse = LoginResponseSuccess | GenericError;

export enum UserRole {
	ADMIN = 'ADMIN',
	THERAPIST = 'THERAPIST',
	CLIENT = 'CLIENT',
}

export enum SubscriptionStatus {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
	CANCELLED = 'CANCELLED',
	PAST_DUE = 'PAST_DUE',
}

export type Client = {
	id: string;
	therapistId: string;
	name: string;
	email: string;
	birthdate?: string | null;
	gender?: string;
	createdAt: string
	notes?: string | null;
}

export type CreateClientInput = Omit<Client,'id' | 'createdAt'> & {
	name: string;
	email: string;
	birthDate?: string | null;
	gender?: 'MALE' | 'FEMALE' | 'OTHER';
	notes?: string | null;
};

export type Reponse = {
	id: string;
	filledAt: string;
	clientName: string;
	clientEmail: string;
	formTemplateTitle: string;
	score?: number | null;
	level?: AnxietyLevel | null;
}

export type FormResponses = {
	id: string;
	filledAt: string;
	level: 'MINIMAL' | 'MILD' | 'MODERATE' | 'SEVERE';
	client: {
		id: string;
		name: string;
		email?: string | null;
		avatarUrl?: string | null;
		gender?: string
	};
	formTemplate: {
		id: string;
		title: string;
	};
};


export type UserListItem = {
	id: string;
	avatar?: string;
	name: string;
	email: string;
	role: UserRole;
	isActive: boolean;
	subscriptionStatus: SubscriptionStatus;
	createdAt: string;
};

export type CreateUserInput = Omit<UserListItem,'id' | 'createdAt' | 'createdAt' | 'isActive'> & {
	password: string;
	confirmPassword: string;
};

export type RegisterInput = {
	name: string;
	email: string;
	password: string;
};

export type PaginatedResponse<T> = {
	data: T[];
	meta: Meta;
};

export type Meta = {
	totalCount: number;
	totalPages: number;
	currentPage: number;
	pageSize: number;
};

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


// Forms
export type AnxietyLevel = 'MINIMAL' | 'MILD' | 'MODERATE' | 'SEVERE';

export type FormResponseAnswer = {
	questionId: string;
	questionText: string;
	type: QuestionType;
	answer: string;
};

export type FormInvitation = {
	id: string;
	token: string;
	therapistId: string;
	clientId: string;
	formTemplateId: string;
	isCompleted: boolean;
	createdAt: string;
	expiresAt?: string | null;
	client: {
		id: string;
		name: string;
		email?: string | null;
	};
	formTemplate: {
		id: string;
		title: string;
	};
};


export type FormTemplateSummary = {
	id: string;
	title: string;
	description: string;
};

export type ClientSummary = {
	id: string;
	name: string;
	email: string;
};

export type FormInvitationWithResponses = {
	id: string;
	filledAt: string; // o `Date`, si luego lo transformas
	client: ClientSummary;
	formTemplate: FormTemplateSummary;
	responses: FormResponseAnswer[];
	score?: number | null;
	level?: AnxietyLevel | null;
};

export type ResponsesAvaibales = {
	id: string;
	filledAt: string; // o `Date`, si luego lo transformas
	clientName: string,
	clientEmail: string,
	formTemplate: FormTemplateSummary;
	responses: FormResponseAnswer[];
	score?: number | null;
	level?: AnxietyLevel | null;
}

export type AvailableForm = {
	id: string
	title: string
	description: string
	createdAt: string
	updatedAt: string
}