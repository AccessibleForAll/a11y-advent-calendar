import { describe, expect, it } from 'vitest';
import { createUserSchema, updateUserSchema } from './user';

describe('createUserSchema', () => {
  it('accepts valid user data', () => {
    const result = createUserSchema.safeParse({
      firstName: 'Morteza',
      lastName: 'Ahmadian',
      email: 'morteza@example.com',
    });

    expect(result.success).toBe(true);
  });

  it('rejects missing firstName', () => {
    const result = createUserSchema.safeParse({
      lastName: 'Ahmadian',
      email: 'morteza@example.com',
    });

    expect(result.success).toBe(false);
  });

  it('rejects missing lastName', () => {
    const result = createUserSchema.safeParse({
      firstName: 'Morteza',
      email: 'morteza@example.com',
    });

    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = createUserSchema.safeParse({
      firstName: 'Morteza',
      lastName: 'Ahmadian',
      email: 'invalid-email',
    });

    expect(result.success).toBe(false);
  });

  it('rejects unsupported fields', () => {
    const result = createUserSchema.safeParse({
      firstName: 'Morteza',
      lastName: 'Ahmadian',
      email: 'morteza@example.com',
      role: 'admin',
    });

    expect(result.success).toBe(false);
  });
});

describe('updateUserSchema', () => {
  it('accepts partial updates', () => {
    const result = updateUserSchema.safeParse({
      firstName: 'Ali',
    });

    expect(result.success).toBe(true);
  });

  it('rejects an empty object', () => {
    const result = updateUserSchema.safeParse({});

    expect(result.success).toBe(false);
  });

  it('rejects unsupported fields', () => {
    const result = updateUserSchema.safeParse({
      role: 'admin',
    });

    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = updateUserSchema.safeParse({
      email: 'invalid-email',
    });

    expect(result.success).toBe(false);
  });
});
