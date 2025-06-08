import {SubscriptionStatus,UserRole} from '@/types';
import {z} from 'zod';

export const userSchema = z.object({
	name: z.string().min(2,'El nombre es obligatorio'),
	role: z.enum([UserRole.ADMIN,UserRole.THERAPIST,UserRole.CLIENT],{
		errorMap: () => ({message: 'Selecciona un rol válido'}),
	}),
	email: z.string().email('Correo inválido'),
	subscriptionStatus: z.enum(
		[
			SubscriptionStatus.ACTIVE,
			SubscriptionStatus.INACTIVE,
			SubscriptionStatus.CANCELLED,
			SubscriptionStatus.PAST_DUE,
		],
		{
			errorMap: () => ({
				message: 'Selecciona un estado de suscripción válido',
			}),
		}
	),
	password: z.string().optional(),
	confirmPassword: z.string().optional(),
});

export type UserFormData = z.infer<typeof userSchema>;

export const userCreateSchema = userSchema
	.omit({password: true,confirmPassword: true})
	.extend({
		password: z.string().min(6,'La contraseña debe tener al menos 6 caracteres'),
		confirmPassword: z.string().min(6,'La confirmación de contraseña debe tener al menos 6 caracteres'),
	})
	.refine((data) => data.password === data.confirmPassword,{
		message: 'Las contraseñas no coinciden',
		path: ['confirmPassword'],
	});

export type UserCreateFormData = z.infer<typeof userCreateSchema>;
