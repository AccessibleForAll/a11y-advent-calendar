import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { ApiError } from './api-error';

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status },
    );
  }

  if (error instanceof SyntaxError) {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
  }

  if (error instanceof ZodError) {
    return NextResponse.json({ message: 'Validation failed' }, { status: 400 });
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 11000
  ) {
    return NextResponse.json(
      { message: 'Email address already exists' },
      { status: 409 },
    );
  }

  return NextResponse.json(
    { message: 'Internal server error' },
    { status: 500 },
  );
}
