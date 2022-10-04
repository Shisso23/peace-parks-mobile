import z from 'zod';

import { commonValidations } from '../../../schemas';

export const forgotPasswordSchema = z.object({
  email: commonValidations.username,
});
