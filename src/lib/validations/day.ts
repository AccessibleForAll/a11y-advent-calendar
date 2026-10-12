const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function parseCalendarDate(value: unknown): Date | null {
  if (typeof value !== 'string' || !DATE_ONLY_PATTERN.test(value)) {
    return null;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  if (
    Number.isNaN(date.getTime()) ||
    date.toISOString().slice(0, 10) !== value
  ) {
    return null;
  }

  return date;
}
