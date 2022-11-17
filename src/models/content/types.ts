import { z } from "zod";

import { contentSchema } from "./content.schema";

export type Content = z.infer<typeof contentSchema>;