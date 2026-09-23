// GET user by id --> GET /api/users/123
// PATCH --> PATCH /api/users/123
// DELETE --> DELETE /api/users/123
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import type { UpdateUserInput } from '@/types/user';

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
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(serializeUser(user));
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = (await request.json()) as UpdateUserInput;

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (body.firstName !== undefined) {
      user.firstName = body.firstName;
    }

    if (body.lastName !== undefined) {
      user.lastName = body.lastName;
    }

    if (body.email !== undefined) {
      user.email = body.email;
    }

    await user.save();

    return NextResponse.json(serializeUser(user));
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 },
    );
  }
}
