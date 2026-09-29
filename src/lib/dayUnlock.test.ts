import { describe, it, expect } from 'vitest';
import { isDayUnlocked } from './dayUnlock';

describe('isDayUnlocked', () => {
  it('locks Day 1 on November 30', () => {
    const today = new Date(2026, 10, 30);

    expect(isDayUnlocked('1', today)).toBe(false);
  });

  it('unlocks Day 1 on December 1 and keeps Day 2 locked', () => {
    const today = new Date(2026, 11, 1);

    expect(isDayUnlocked('1', today)).toBe(true);
    expect(isDayUnlocked('2', today)).toBe(false);
  });

  it('unlocks Day 1 and 2 on December 2 and keeps Day 3 locked', () => {
    const today = new Date(2026, 11, 2);

    expect(isDayUnlocked('1', today)).toBe(true);
    expect(isDayUnlocked('2', today)).toBe(true);
    expect(isDayUnlocked('3', today)).toBe(false);
  });

  it('unlocks Day 24 on December 24', () => {
    const today = new Date(2026, 11, 24);

    expect(isDayUnlocked('24', today)).toBe(true);
  });

  it('unlocks all days on December 25', () => {
    const today = new Date(2026, 11, 25);

    for (let day = 1; day <= 24; day++) {
      expect(isDayUnlocked(day.toString(), today)).toBe(true);
    }
  });

  it('locks all Days on January 13', () => {
    const today = new Date(2027, 0, 13);

    for (let day = 1; day <= 24; day++) {
      expect(isDayUnlocked(day.toString(), today)).toBe(false);
    }
  });
});
