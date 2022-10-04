import z from 'zod';

import { loginSchema } from './schemas';

export type LoginValueProps = z.infer<typeof loginSchema>;
