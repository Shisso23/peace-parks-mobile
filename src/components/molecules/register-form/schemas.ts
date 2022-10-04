import z from 'zod';

import { commonValidations } from '../../../schemas';

export const registerSchema = z
  .object({
    email: commonValidations.username,
    password: commonValidations.password,
    confirmPassword: commonValidations.password,
    termsAndConditions: z.boolean(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export const registerApiSchema = z.object({
  email: commonValidations.username,
  password: commonValidations.password,
  confirm_password: commonValidations.password,
  terms_and_conditions: z.boolean(),
});
