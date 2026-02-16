import { formatHoursMinutes } from './time-format.util';

describe('formatHoursMinutes', () => {
  it('should format zero as 0h 0m', () => {
    expect(formatHoursMinutes(0)).toBe('0h 0m');
  });

  it('should format whole hours', () => {
    expect(formatHoursMinutes(1)).toBe('1h 0m');
  });

  it('should round up partial minutes', () => {
    expect(formatHoursMinutes(1.01)).toBe('1h 1m');
  });

  it('should format long decimal hours', () => {
    expect(formatHoursMinutes(9.6833333333)).toBe('9h 41m');
  });

  it('should return safe fallback for invalid values', () => {
    expect(formatHoursMinutes(NaN)).toBe('0h 0m');
  });
});
