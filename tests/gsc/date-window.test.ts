import { describe, it, expect } from 'vitest';
import { getReliableGscDate, getRolling90DayWindows, formatDateISO } from '../../lib/gsc/date-window';

describe('Date Window Manager - Edge Cases & Calculations', () => {
  it('correctly subtracts 3-day GSC data lag buffer', () => {
    const refDate = new Date('2026-08-30T12:00:00Z');
    const reliableDate = getReliableGscDate(refDate);
    expect(formatDateISO(reliableDate)).toBe('2026-08-27');
  });

  it('computes rolling 90-day windows cleanly spanning month boundaries (90 days inclusive)', () => {
    const refDate = new Date('2026-08-30T12:00:00Z'); // reliable date: 2026-08-27
    const windows = getRolling90DayWindows(refDate);

    expect(windows.reliableEndDate).toBe('2026-08-27');
    expect(windows.currentWindow.endDate).toBe('2026-08-27');
    expect(windows.currentWindow.startDate).toBe('2026-05-30'); // 90 days inclusive (May 30..31=2 + June=30 + July=31 + Aug=27 = 90 days)

    expect(windows.previousWindow.endDate).toBe('2026-05-29');
    expect(windows.previousWindow.startDate).toBe('2026-03-01'); // 90 days inclusive
  });

  it('handles leap-year February 29 cleanly (2024 leap year test)', () => {
    const refDate = new Date('2024-03-05T12:00:00Z'); // reliable date: 2024-03-02
    const windows = getRolling90DayWindows(refDate);

    expect(windows.reliableEndDate).toBe('2024-03-02');
    expect(windows.currentWindow.startDate).toBe('2023-12-04');
    expect(windows.previousWindow.endDate).toBe('2023-12-03');
  });

  it('handles year boundaries (January 1 test)', () => {
    const refDate = new Date('2026-01-02T12:00:00Z'); // reliable date: 2025-12-30
    const windows = getRolling90DayWindows(refDate);

    expect(windows.reliableEndDate).toBe('2025-12-30');
    expect(windows.currentWindow.startDate).toBe('2025-10-02'); // 90 days inclusive (Oct 2..31=30 + Nov=30 + Dec=30 = 90 days)
    expect(windows.previousWindow.endDate).toBe('2025-10-01');
  });
});
