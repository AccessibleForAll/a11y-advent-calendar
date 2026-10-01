import { connection } from 'next/server';
import ManageUsers from './ManageUsers';
import { connectToDatabase } from '@/lib/mongodb';
import UserModel from '@/models/User';
import type { User } from '@/types/user';

async function getUsers(): Promise<User[]> {
  // Opt out of prerendering so the list is read from the database on every request.
  await connection();
  await connectToDatabase();
  const users = await UserModel.find();
  return users.map((user) => ({
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    mustChangePassword: user.mustChangePassword,
  }));
}

export default function ManageUsersPage() {
  // Don't await: the promise is streamed to the client and read with `use`.
  const usersPromise = getUsers();

  return <ManageUsers usersPromise={usersPromise} />;
}
