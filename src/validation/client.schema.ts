import {z} from 'zod';

// YYYY-MM-DD simple validator
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const clientSchema = z.object({
  name: z
    .string({required_error: 'El nombre es obligatorio'})
    .min(2,'El nombre es obligatorio'),
  email: z
    .string({required_error: 'El correo es obligatorio'})
    .email('Correo electrónico inválido'),
  birthDate: z
    .string()
    .optional()
    .transform((val) => (val === '' ? undefined : val))
    .refine((val) => !val || dateRegex.test(val),'Fecha inválida. Usa formato YYYY-MM-DD'),
  gender: z
    .enum(['MALE','FEMALE','OTHER'])
    .optional(),
  notes: z
    .string()
    .max(1000,'Máximo 1000 caracteres')
    .optional(),
});
