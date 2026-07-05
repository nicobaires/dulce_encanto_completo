import { defineCollection, z } from 'astro:content';

const category = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    name: z.string(),
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
    price: z.string().optional(),
    destacado: z.boolean().default(false),
  }),
});

export const collections = { category, product };
