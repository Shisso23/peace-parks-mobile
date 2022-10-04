import z from 'zod';

import { commonValidations } from '../../../schemas';

export const loginSchema = z.object({
  email: commonValidations.username,
  password: commonValidations.password,
});
