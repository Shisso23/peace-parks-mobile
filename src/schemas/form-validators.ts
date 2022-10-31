import z from 'zod';

export const commonValidations = {
  username: z.string().email('Must be a valid email'),
  password: z
    .string()
    .min(8, 'Password must contain at least 8 characters')
    .regex(/^(?=.*[a-z])/, 'Must have 1 lowercase letter')
    .regex(/^(?=.*[A-Z])/, 'Must have 1 uppercase letter')
    .regex(/^(?=.*\d)/, 'Must have 1 digit')
    .regex(/^(?=.*[^a-zA-Z\d])/, 'Must have 1 symbol'),
  mobile: z.union([z.string().min(12).startsWith('+27'), z.string().min(10).startsWith('0')]),
  region: z.string().startsWith('+'),
};
