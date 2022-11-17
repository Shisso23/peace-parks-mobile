import { z } from "zod";

export const contentSchema = z.object({
    id: z.string(),
    heading: z.string(),
    subheading: z.string(),
    description: z.string(),
    location: z.string(),
    thumbnailId: z.any(),
})