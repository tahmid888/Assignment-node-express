import { z } from 'zod';
// define an zod schema for the user model
const addressValidationSchema = z.object({
  street: z
    .string()
    .length(20, { message: 'street length can be maximum of 20 characters' }),
  city: z
    .string()
    .length(20, { message: 'city length can be maximum of 20 characters' }),
  country: z
    .string()
    .length(20, { message: 'country length can be maximum of 20 characters' }),
});
const userValidationSchema = z.object({
  userId: z.number(),
  username: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'User name must start with a capital letter',
    }),
  password: z
    .string()
    .max(25, { message: 'password cannot exceed 20 characters' }),
  fullName: z.object({
    firstName: z.string().min(1).max(20),
    lastName: z.string().min(1).max(20),
  }),
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1).max(25)),
  address: addressValidationSchema,
});
export default userValidationSchema;
