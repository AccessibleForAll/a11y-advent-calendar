import { isBefore, startOfDay } from 'date-fns';

export function isDayUnlocked(
  day: string,
  currentDate: Date = new Date(), // for test you can change the date to 2026, 11, 1
): boolean {
  const today = startOfDay(currentDate);

  const dayDate = new Date(today.getFullYear(), 11, Number(day));

  return !isBefore(today, dayDate);
}
