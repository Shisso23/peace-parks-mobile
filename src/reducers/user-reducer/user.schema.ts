import z, { any, ZodAny } from 'zod';

import { commonValidations } from '../../schemas';

export const userSchema = z.object({
  id: z.any(),
  firstName: z.string(),
  email: commonValidations.username,
  regionCode: z.string(),
  phoneNumber: commonValidations.mobile,
  childFriendly: z.boolean(),
  subscribedToMail: z.boolean(),
});
