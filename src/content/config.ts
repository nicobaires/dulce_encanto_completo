import { defineCollection, z } from 'astro:content';

const category = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    name: z.string(),
    slug: z.string(),
    icon: z.string(),
    description: z.string(),
    image: image(),
  }),
});

const product = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    name: z.string(),
    category: z.string(),
    description: z.string(),
    image: image(),
    gallery: z.array(image()).optional(),
    price: z.string().optional(),
    disponible: z.boolean().default(true),
    destacado: z.boolean().default(false),
  }),
});

export const collections = { category, product };
