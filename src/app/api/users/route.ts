import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import {
  createUserSchema,
  formatValidationError,
} from '@/lib/validations/user';
import { handleApiError } from '@/lib/handle-api-error';
import { requireAuth } from '@/lib/require-auth';

export async function GET(request: Request) {
  try {
    await requireAuth(request);
    await connectToDatabase();
    const users = await User.find();
    const response = users.map((user) => ({
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }));
    return NextResponse.json(response);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAuth(request);
    const body: unknown = await request.json();

    const validationResult = createUserSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(formatValidationError(validationResult.error), {
        status: 400,
      });
    }

    await connectToDatabase();
    const user = await User.create(validationResult.data);

    return NextResponse.json(
      {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      { status: 201 },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
