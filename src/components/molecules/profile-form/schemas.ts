import z from 'zod';

import { commonValidations } from '../../../schemas';

export const profileSchema = z.object({
  id: z.any(),
  firstName: z.string(),
  email: commonValidations.username,
  regionCode: commonValidations.region,
  phoneNumber: commonValidations.mobile,
  childFriendly: z.boolean(),
  subscribedToMail: z.boolean()
});
