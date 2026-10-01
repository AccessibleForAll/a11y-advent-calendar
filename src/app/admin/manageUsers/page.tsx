import ManageUsers from './ManageUsers';
import { connectToDatabase } from '@/lib/mongodb';
import UserModel from '@/models/User';
import type { User } from '@/types/user';

async function getUsers(): Promise<User[]> {
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
  const usersPromise = getUsers();

  return <ManageUsers usersPromise={usersPromise} />;
}
