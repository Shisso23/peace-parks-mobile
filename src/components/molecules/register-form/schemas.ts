import z, { string } from 'zod';

import { commonValidations } from '../../../schemas';

export const registerSchema = z
  .object({
    name: z.string(),
    surname: z.string(),
    email: commonValidations.username,
    password: commonValidations.password,
    regionCode: commonValidations.region,
    phoneNumber: commonValidations.mobile,
    confirmPassword: commonValidations.password,
    termsAndConditions: z.boolean(),
    mailSubscription: z.boolean(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export const registerApiSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: commonValidations.username,
  password: commonValidations.password,
  phoneNumber: commonValidations.mobile,
  regionCode: commonValidations.region,
  confirm_password: commonValidations.password,
  terms_and_conditions: z.boolean(),
  mailSubscription: z.boolean(),
});
