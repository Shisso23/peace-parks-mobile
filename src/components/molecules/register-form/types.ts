import z from 'zod';

import { registerApiSchema, registerSchema } from './schemas';

export type RegisterValueProps = z.infer<typeof registerSchema>;

export type RegisterApiValues = z.infer<typeof registerApiSchema>;
