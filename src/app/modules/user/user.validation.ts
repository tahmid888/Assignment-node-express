import { z } from 'zod';
// define an zod schema for the user  address
const addressValidationSchema = z.object({
  street: z
    .string()
    .max(20, { message: 'street length can be maximum of 20 characters' }),
  city: z
    .string()
    .max(20, { message: 'city length can be maximum of 20 characters' }),
  country: z
    .string()
    .max(15, { message: 'country length can be maximum of 15 characters' }),
});
// define an zod schema for the user model
const userValidationSchema = z.object({
  userId: z.number(),
  username: z
    .string()
    .min(1)
    .max(20, { message: 'User name less 20 characters' }),
  // .refine((value) => /^[A-Z]/.test(value), {
  //   message: 'User name must start with a capital letter',
  // }),
  password: z
    .string()
    .max(20, { message: 'password cannot exceed 20 characters' }),
  fullName: z.object({
    firstName: z.string().min(1).max(20, {
      message: 'first name is required and can be maximum of 20 characters',
    }),
    lastName: z.string().min(1).max(20, {
      message: 'last name is required and can be maximum of 20 characters',
    }),
  }),
  age: z.number(),
  email: z.string().email().max(25, {
    message: 'email is required and can be maximum of 25 characters',
  }),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1).max(255)),
  address: addressValidationSchema,
});
export default userValidationSchema;
