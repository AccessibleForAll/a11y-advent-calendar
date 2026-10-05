import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import {
  createUserSchema,
  formatValidationError,
} from '@/lib/validations/user';

export async function GET() {
  try {
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
    return NextResponse.json(
      {
        message: (error as Error).message,
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body: unknown = await request.json();

    const validationResult = createUserSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(formatValidationError(validationResult.error), {
        status: 400,
      });
    }

    await connectToDatabase();
    const user = await User.create({
      firstName: validationResult.data.firstName,
      lastName: validationResult.data.lastName,
      email: validationResult.data.email,
    });

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
    return NextResponse.json(
      {
        message: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
