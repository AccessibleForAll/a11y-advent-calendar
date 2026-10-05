import { z, ZodError } from 'zod';

const userFieldsSchema = {
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  email: z.string().trim().email('Invalid email address'),
};

export const createUserSchema = z.object(userFieldsSchema).strict();

export const updateUserSchema = z
  .object(userFieldsSchema)
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export function formatValidationError(error: ZodError) {
  return {
    message: 'Validation failed',
    errors: error.issues.map((issue) => ({
      field: issue.path.join('.') || 'body',
      message: issue.message,
    })),
  };
}
