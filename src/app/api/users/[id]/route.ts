import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import {
  updateUserSchema,
  formatValidationError,
} from '@/lib/validations/user';
import { ApiError } from '@/lib/api-error';
import { handleApiError } from '@/lib/handle-api-error';

type RouteContext = {
  params: Promise<{ id: string }>;
};

function serializeUser(user: {
  _id: { toString: () => string };
  firstName: string;
  lastName: string;
  email: string;
}) {
  return {
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
}

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const user = await User.findById(id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    return NextResponse.json(serializeUser(user));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body: unknown = await request.json();

    const validationResult = updateUserSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(formatValidationError(validationResult.error), {
        status: 400,
      });
    }

    const user = await User.findById(id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    user.set(validationResult.data);
    await user.save();

    return NextResponse.json(serializeUser(user));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    return handleApiError(error);
  }
}
