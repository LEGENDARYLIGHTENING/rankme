import { PageDecayInput, EngineConfig, DiagnosisCategory } from './types';

export interface DiagnosisResult {
  category: DiagnosisCategory;
  positionDelta: number;
  ctrDropPct: number;
  impressionsDeltaPct: number;
}

export function classifyDiagnosis(
  input: PageDecayInput,
  config: EngineConfig
): DiagnosisResult {
  const { position_worsened_delta, ctr_drop_pct } = config.diagnosis_thresholds;

  const prevPos = input.previousWindow.avgPosition;
  const currPos = input.currentWindow.avgPosition;
  const positionDelta = Number((currPos - prevPos).toFixed(2)); // Positive = position worsened (e.g. 7.2 -> 11.4 = +4.2)

  const prevCtr = input.previousWindow.ctr;
  const currCtr = input.currentWindow.ctr;
  const ctrDropPct = prevCtr > 0
    ? Number((((prevCtr - currCtr) / prevCtr) * 100).toFixed(2))
    : 0;

  const prevImp = input.previousWindow.impressions;
  const currImp = input.currentWindow.impressions;
  const impressionsDeltaPct = prevImp > 0
    ? Number((((currImp - prevImp) / prevImp) * 100).toFixed(2))
    : 0;

  const isRankingDriven = positionDelta >= position_worsened_delta;
  const isCtrDriven = ctrDropPct >= ctr_drop_pct;

  let category: DiagnosisCategory = 'MIXED_UNCLEAR';

  if (isRankingDriven && isCtrDriven) {
    category = 'BOTH';
  } else if (isRankingDriven) {
    category = 'RANKING_DRIVEN';
  } else if (isCtrDriven) {
    category = 'CTR_DRIVEN';
  } else {
    category = 'MIXED_UNCLEAR';
  }

  return {
    category,
    positionDelta,
    ctrDropPct,
    impressionsDeltaPct,
  };
}
