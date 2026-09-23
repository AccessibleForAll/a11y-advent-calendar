import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import type { CreateUserInput } from '@/types/user';

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

    const body = (await request.json()) as CreateUserInput;

    const user = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
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
