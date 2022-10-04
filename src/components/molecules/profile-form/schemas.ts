import z from 'zod';

import { commonValidations } from '../../../schemas';

export const profileSchema = z.object({
  email: commonValidations.username,
});
