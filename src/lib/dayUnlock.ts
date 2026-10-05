import { isBefore, startOfDay } from 'date-fns';

export function isDayUnlocked(
  day: string,
  currentDate: Date = new Date(2026, 11, 20),
  calendarYear = 2026,
): boolean {
  const today = startOfDay(currentDate);

  const calendarStart = new Date(calendarYear, 11, 1);
  const dayDate = new Date(calendarYear, 11, Number(day));

  if (isBefore(today, calendarStart)) {
    return false;
  }

  return !isBefore(today, dayDate);
}
