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
  mobile: z.string().min(4, 'Must contain at least 4 characters').regex(/\d+/, 'Phone No: Must be numeric characters'),
  region: z.string().regex(/\+\d+/, 'Region Code: Invalid Format'),
};
