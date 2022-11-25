import z from 'zod';

import { commonValidations } from '../../../schemas';

export const contactUsSchema = z.object({
  name: z.string(),
  email: commonValidations.username,
  description: z.string(),
});
