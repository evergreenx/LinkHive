import * as z from 'zod';

export const LinkValidation = z.object({
  link: z
    .string()
    .url()
    .min(2, {
      message: 'Username must be at least 2 characters.'
    })
    .max(500)
});
