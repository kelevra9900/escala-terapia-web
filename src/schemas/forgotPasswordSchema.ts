import {z} from "zod";

export const forgotPasswordSchema = z.object({
	email: z.string().email("Correo no válido"),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;