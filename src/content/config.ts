import { defineCollection, z } from 'astro:content'

const tools = defineCollection({
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.string(),
    summary: z.string()
  })
})

export const collections = {
  tools,
}
