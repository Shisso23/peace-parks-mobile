import z from 'zod';

import { contactUsSchema } from './schemas';

export type ContactUsValueProps = z.infer<typeof contactUsSchema>;