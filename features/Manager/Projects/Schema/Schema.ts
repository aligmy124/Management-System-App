import * as z from "zod";

export const ProjectSchema=z.object({
    title:z.string().min(3,"title must be at least 3 letters"),
    description:z.string().min(50,"description must be at least 50 letters")
})

export type ProjectFormData=z.infer<typeof ProjectSchema>