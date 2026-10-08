import { headers } from 'next/headers';
import ManageUsers from './ManageUsers';
import type { User } from '@/types/user';

async function getUsers(): Promise<User[]> {
  const headersList = await headers();
  const host = headersList.get('host');
  // http or https falls back to http in local
  const protocol = headersList.get('x-forwarded-proto') ?? 'http';

  // Fetches the users from the API
  const res = await fetch(`${protocol}://${host}/api/users`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.message ?? 'Failed to load users.');
  }
  return res.json();
}

export default function ManageUsersPage() {
  // Starts the fetch, the list reads it.
  const usersPromise = getUsers();
  return <ManageUsers usersPromise={usersPromise} />;
}
