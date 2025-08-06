import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string().min(2, { message: 'Nombre muy corto' }),
  email: z.string().email({ message: 'Correo inválido' }),
  password: z.string().min(6, { message: 'Mínimo 6 caracteres' }),
})
