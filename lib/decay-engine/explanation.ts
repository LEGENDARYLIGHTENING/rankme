import {
  PageDecayInput,
  DiagnosisEvidenceDetail,
} from './types';
import { ScoringResult } from './scoring';
import { DiagnosisResult } from './diagnosis';

export function assembleExplanation(
  input: PageDecayInput,
  absoluteClickLoss: number,
  percentClickLoss: number,
  scoringResult?: ScoringResult,
  diagnosisResult?: DiagnosisResult
): DiagnosisEvidenceDetail {
  let topQuery: { query: string; click_loss: number } | undefined = undefined;

  if (input.queries && input.queries.length > 0) {
    const sorted = [...input.queries].sort((a, b) => b.clickLoss - a.clickLoss);
    if (sorted[0] && sorted[0].clickLoss > 0) {
      topQuery = {
        query: sorted[0].query,
        click_loss: sorted[0].clickLoss,
      };
    }
  }

  return {
    absolute_click_loss: absoluteClickLoss,
    percent_click_loss: percentClickLoss,
    position_change: {
      from: input.previousWindow.avgPosition,
      to: input.currentWindow.avgPosition,
    },
    ctr_change: {
      from: input.previousWindow.ctr,
      to: input.currentWindow.ctr,
    },
    impressions_change: {
      from: input.previousWindow.impressions,
      to: input.currentWindow.impressions,
    },
    top_query: topQuery,
    recoverability_band: scoringResult?.recoverabilityBand || 'N/A',
    recoverability_note: scoringResult?.recoverabilityNote || 'Qualification not met.',
    query_concentration_factor: scoringResult?.queryConcentrationFactor,
  };
}
