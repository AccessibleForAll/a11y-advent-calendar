import { format } from 'date-fns';
import type { Day } from '@/types/day';

const STORAGE_KEY = 'advent-calendar-days';

type CachedDays = {
  savedOn: string;
  days: Day[];
};

const toDateKey = (date: Date) => format(date, 'yyyy-MM-dd');

// returns the saved days if they were saved the same day, otherwise null so the caller fetches fresh data
export function readCachedDays(
  storage: Pick<Storage, 'getItem'>,
  currentDate: Date = new Date(),
): Day[] | null {
  try {
    const raw = storage.getItem(STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const cached = JSON.parse(raw) as CachedDays;

    if (cached.savedOn !== toDateKey(currentDate)) {
      return null;
    }

    return Array.isArray(cached.days) ? cached.days : null;
  } catch {
    return null;
  }
}

export function saveCachedDays(
  storage: Pick<Storage, 'setItem'>,
  days: Day[],
  currentDate: Date = new Date(),
): void {
  try {
    const cached: CachedDays = { savedOn: toDateKey(currentDate), days };
    storage.setItem(STORAGE_KEY, JSON.stringify(cached));
  } catch {
    //Storage can have issues but the page still works.
  }
}
