import { describe, expect, it } from 'vitest';
import { ApiError } from './api-error';
import { handleApiError } from './handle-api-error';

describe('handleApiError', () => {
  it('returns the correct status and message for ApiError', async () => {
    const response = handleApiError(new ApiError(404, 'User not found'));

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
      message: 'User not found',
    });
  });

  it('returns 401 for Unauthorized', async () => {
    const response = handleApiError(new ApiError(401, 'Unauthorized'));

    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({
      message: 'Unauthorized',
    });
  });

  it('returns 403 for Forbidden', async () => {
    const response = handleApiError(new ApiError(403, 'Forbidden'));

    expect(response.status).toBe(403);
    expect(await response.json()).toEqual({
      message: 'Forbidden',
    });
  });

  it('returns 500 for unexpected errors', async () => {
    const response = handleApiError(
      new Error('MongoDB connection failed: secret information'),
    );

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      message: 'Internal server error',
    });
  });
});
