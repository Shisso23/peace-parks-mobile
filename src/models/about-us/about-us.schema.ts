import { z } from "zod";

export const aboutUsSchema = z.object({
    id: z.string(),
    description: z.string(),
})