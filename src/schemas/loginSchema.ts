import {z} from "zod";

export const loginSchema = z.object({
	email: z.string().min(1,"El correo es obligatorio").email("Correo no válido"),
	// Must be a valid password, with at least 6 characters
	password: z.string().min(1,"La contraseña es obligatoria").min(6,"La contraseña debe tener al menos 6 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;