import {
  PageDecayInput,
  EngineConfig,
  RecoverabilityBand,
  PriorityLabel,
} from './types';

export interface ScoringResult {
  priorityScore: number;
  priorityLabel: PriorityLabel;
  recoverabilityBand: RecoverabilityBand;
  recoverabilityMultiplier: number;
  queryConcentrationFactor: number;
  recoverabilityNote: string;
}

/**
 * Maps average position to recoverability band and multiplier.
 */
export function getRecoverabilityBand(
  avgPosition: number,
  config: EngineConfig
): { band: RecoverabilityBand; multiplier: number; note: string } {
  const bands = config.recoverability_bands;
  const match = bands.find(
    (b) => avgPosition >= b.min_position && avgPosition <= b.max_position
  );

  const multiplier = match ? match.multiplier : 0.15;
  let band: RecoverabilityBand = '31+';
  let note = 'Current position is beyond typical striking distance; recovery effort may be higher.';

  if (avgPosition <= 10) {
    band = '1-10';
    note = 'Page remains on Page 1; high-priority striking distance.';
  } else if (avgPosition <= 15) {
    band = '11-15';
    note = 'Page is on Page 2 striking distance; strong candidate for fast ranking recovery.';
  } else if (avgPosition <= 20) {
    band = '16-20';
    note = 'Page is at lower Page 2 boundary; moderate recoverability.';
  } else if (avgPosition <= 30) {
    band = '21-30';
    note = 'Page is on Page 3; low-to-moderate recoverability.';
  }

  return { band, multiplier, note };
}

/**
 * Computes secondary Query Concentration Factor bounded strictly between min and max (0.9 to 1.1).
 */
export function calculateQueryConcentrationFactor(
  input: PageDecayInput,
  absoluteClickLoss: number,
  config: EngineConfig
): number {
  const { min, max } = config.query_concentration_adjustment_range;
  const queries = input.queries;

  if (!queries || queries.length === 0 || absoluteClickLoss <= 0) {
    return 1.0;
  }

  // Find top query click loss
  const sortedQueries = [...queries].sort((a, b) => b.clickLoss - a.clickLoss);
  const top1Loss = sortedQueries[0]?.clickLoss || 0;
  const top1Share = top1Loss / absoluteClickLoss;

  // High concentration (>50% loss from top query) -> boost toward max (1.1)
  // Low concentration (<10% loss from top query) -> scale toward min (0.9)
  if (top1Share >= 0.5) {
    const factor = 1.0 + (top1Share - 0.5) * 0.2; // 0.5 -> 1.0, 1.0 -> 1.1
    return Number(Math.min(max, Math.max(min, factor)).toFixed(2));
  } else {
    const factor = 0.9 + (top1Share / 0.5) * 0.1; // 0.0 -> 0.9, 0.5 -> 1.0
    return Number(Math.min(max, Math.max(min, factor)).toFixed(2));
  }
}

/**
 * Calculates priority score and assigns actionability label.
 */
export function calculatePriorityScore(
  input: PageDecayInput,
  absoluteClickLoss: number,
  config: EngineConfig
): ScoringResult {
  const { band, multiplier, note } = getRecoverabilityBand(
    input.currentWindow.avgPosition,
    config
  );

  const concentrationFactor = calculateQueryConcentrationFactor(
    input,
    absoluteClickLoss,
    config
  );

  // Core formula: Absolute Click Loss × Recoverability Multiplier × Concentration Factor
  const rawScore = absoluteClickLoss * multiplier * concentrationFactor;
  const priorityScore = Number(rawScore.toFixed(1));

  let priorityLabel: PriorityLabel = 'Low';
  if (priorityScore >= 200) {
    priorityLabel = 'High';
  } else if (priorityScore >= 50) {
    priorityLabel = 'Medium';
  }

  return {
    priorityScore,
    priorityLabel,
    recoverabilityBand: band,
    recoverabilityMultiplier: multiplier,
    queryConcentrationFactor: concentrationFactor,
    recoverabilityNote: note,
  };
}
