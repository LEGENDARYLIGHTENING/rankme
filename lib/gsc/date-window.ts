/**
 * Date Window Manager for DecayCheck.
 * Handles GSC 2-3 day data lag and rolling 90-day comparisons.
 * Centralized, pure logic independently testable.
 */

export interface DateWindowPeriod {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
}

export interface DecayComparisonWindows {
  reliableEndDate: string;
  currentWindow: DateWindowPeriod;  // Rolling 90 days ending at reliableEndDate
  previousWindow: DateWindowPeriod; // Rolling 90 days immediately preceding currentWindow
  historicalPeakWindow: DateWindowPeriod; // Past 365 days for context
}

/**
 * Returns YYYY-MM-DD string formatted for UTC dates.
 */
export function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Subtracts N days from a Date object and returns a new Date object.
 */
export function subtractDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() - days);
  return result;
}

/**
 * Computes the last reliable date available from GSC (subtracts 3-day data lag buffer).
 */
export function getReliableGscDate(referenceDate?: Date): Date {
  const ref = referenceDate ? new Date(referenceDate) : new Date();
  return subtractDays(ref, 3);
}

/**
 * Computes the exact rolling 90-day comparison periods for decay detection:
 * - Current Window: [reliableEndDate - 89 days, reliableEndDate] (90 days inclusive)
 * - Previous Window: [reliableEndDate - 179 days, reliableEndDate - 90 days] (90 days inclusive)
 * - Historical Peak Window: [reliableEndDate - 364 days, reliableEndDate] (365 days inclusive)
 */
export function getRolling90DayWindows(referenceDate?: Date): DecayComparisonWindows {
  const reliableEnd = getReliableGscDate(referenceDate);
  const reliableEndStr = formatDateISO(reliableEnd);

  const currentStart = subtractDays(reliableEnd, 89);
  const previousEnd = subtractDays(reliableEnd, 90);
  const previousStart = subtractDays(reliableEnd, 179);
  const historicalPeakStart = subtractDays(reliableEnd, 364);

  return {
    reliableEndDate: reliableEndStr,
    currentWindow: {
      startDate: formatDateISO(currentStart),
      endDate: reliableEndStr,
    },
    previousWindow: {
      startDate: formatDateISO(previousStart),
      endDate: formatDateISO(previousEnd),
    },
    historicalPeakWindow: {
      startDate: formatDateISO(historicalPeakStart),
      endDate: reliableEndStr,
    },
  };
}
