import {SubscriptionStatus} from "@/types";

export const getRole = (role: string): string => {
	switch (role) {
		case 'ADMIN':
			return 'Administrator';
		case 'THERAPIST':
			return 'Terapeuta';
		case 'CLIENT':
			return 'Paciente';
		default:
			return 'Unknown Role';
	}
}

// Simplicate function to shorten UUID strings
export const simplifyUUID = (id: number): string => {
	if (!isValidUUID(id.toString())) {
		throw new Error('Invalid UUID format');
	}
	return id.toString().slice(0,6) + '...' + id.toString().slice(-4);
}

export const isValidUUID = (id: string): boolean => {
	const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
	return uuidRegex.test(id);
}

// function to format Subscription Status
export const formatSubscriptionStatus = (status: SubscriptionStatus): string => {
	switch (status) {
		case 'ACTIVE':
			return 'Activa';
		case 'INACTIVE':
			return 'Inactiva';
		case 'CANCELLED':
			return 'Cancelada';
		case 'PAST_DUE':
			return 'Vencida';
		default:
			return 'Desconocido';
	}
}

export const getBorderClass = (status?: SubscriptionStatus) => {
	switch (status) {
		case SubscriptionStatus.ACTIVE:
			return 'border-green-500';
		case SubscriptionStatus.INACTIVE:
			return 'border-gray-400';
		case SubscriptionStatus.CANCELLED:
			return 'border-red-500';
		case SubscriptionStatus.PAST_DUE:
			return 'border-yellow-500';
		default:
			return 'border-border-base';
	}
};