import { PageDecayInput, EngineConfig, QualificationStatus } from './types';

export interface QualificationResult {
  status: QualificationStatus;
  reason?: string;
  absoluteClickLoss: number;
  percentClickLoss: number;
}

export function evaluateQualification(
  input: PageDecayInput,
  config: EngineConfig
): QualificationResult {
  const previousClicks = input.previousWindow.clicks;
  const currentClicks = input.currentWindow.clicks;

  const absoluteClickLoss = Math.max(0, previousClicks - currentClicks);
  const percentClickLoss = previousClicks > 0
    ? Number((((previousClicks - currentClicks) / previousClicks) * 100).toFixed(2))
    : 0;

  // Gate 1: Minimum history required
  if (input.totalHistoryMonths < config.minimum_history_months) {
    return {
      status: 'INSUFFICIENT_HISTORY',
      reason: `Page has only ${input.totalHistoryMonths} months of GSC history (minimum required is ${config.minimum_history_months} months).`,
      absoluteClickLoss,
      percentClickLoss,
    };
  }

  // Gate 2: Traffic floor check (scaled to 90 days, e.g. 35 clicks/mo * 3 = 105 clicks)
  const floor90Days = config.traffic_floor_clicks_per_month * 3;
  const peakClicks = input.historicalPeakClicks || previousClicks;

  if (previousClicks < floor90Days && peakClicks < config.historical_peak_qualifying_clicks) {
    return {
      status: 'BELOW_FLOOR',
      reason: `Previous 90-day clicks (${previousClicks}) and historical peak clicks (${peakClicks}) are below qualifying traffic floor.`,
      absoluteClickLoss,
      percentClickLoss,
    };
  }

  // Gate 3: Must be declining in absolute click volume
  if (currentClicks >= previousClicks) {
    return {
      status: 'NOT_DECLINING',
      reason: `Page traffic has not declined (current: ${currentClicks}, previous: ${previousClicks}).`,
      absoluteClickLoss: 0,
      percentClickLoss: 0,
    };
  }

  // All gates passed
  return {
    status: 'QUALIFIED',
    absoluteClickLoss,
    percentClickLoss,
  };
}
