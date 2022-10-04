import z from 'zod';

import { profileSchema } from './schemas';

export type ProfileValueProps = z.infer<typeof profileSchema>;
