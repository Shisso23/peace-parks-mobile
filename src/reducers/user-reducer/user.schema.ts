import z from 'zod';

import { commonValidations } from '../../schemas';

export const userSchema = z.object({
  email: commonValidations.username,
});
