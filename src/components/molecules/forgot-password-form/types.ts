import z from 'zod';

import { forgotPasswordSchema } from './schemas';

export type ForgotPasswordValueProps = z.infer<typeof forgotPasswordSchema>;
