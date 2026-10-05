import { describe, it, expect } from 'vitest';
import { readCachedDays, saveCachedDays } from './daysCache';
import type { Day } from '@/types/day';

function createStorage() {
  const items = new Map<string, string>();

  return {
    getItem: (key: string) => items.get(key) ?? null,
    setItem: (key: string, value: string) => {
      items.set(key, value);
    },
  };
}

const days: Day[] = [
  {
    id: '1',
    date: '2026-12-01T00:00:00.000Z',
    heading: 'Start with accessibility',
    text: 'Tip text',
  },
];

describe('daysCache', () => {
  it('returns null when nothing is saved', () => {
    expect(readCachedDays(createStorage())).toBeNull();
  });

  it('returns the saved days later the same day', () => {
    const storage = createStorage();

    saveCachedDays(storage, days, new Date(2026, 11, 1, 8));

    expect(readCachedDays(storage, new Date(2026, 11, 1, 20))).toEqual(days);
  });

  it('returns null on a later day so fresh data is fetched', () => {
    const storage = createStorage();

    saveCachedDays(storage, days, new Date(2026, 11, 1, 8));

    expect(readCachedDays(storage, new Date(2026, 11, 2, 8))).toBeNull();
  });

  it('returns null when the saved value is not valid JSON', () => {
    const storage = createStorage();

    storage.setItem('advent-calendar-days', 'not json');

    expect(readCachedDays(storage)).toBeNull();
  });

  it('does not throw when storage is unavailable', () => {
    const brokenStorage = {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
    };

    expect(readCachedDays(brokenStorage)).toBeNull();
    expect(() => saveCachedDays(brokenStorage, days)).not.toThrow();
  });
});
