import { z } from "zod";

import { aboutUsSchema } from "./about-us.schema";

export type AboutUs = z.infer<typeof aboutUsSchema>;