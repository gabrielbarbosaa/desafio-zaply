import {z} from 'zod';
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const productSchema = z.object({
  name: z.string().optional(),
  categories: z
    .string().optional(),
  brand: z.string().optional(),
  price: z.number().optional(),
  image: z.any().optional()
});

export type ProductSchema = z.infer<typeof productSchema>;