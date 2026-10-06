import { auth } from '@/lib/auth';
import { ApiError } from '@/lib/api-error';

export async function requireAuth(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    throw new ApiError(401, 'Unauthorized');
  }

  return session;
}
