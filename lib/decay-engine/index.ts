import { PageDecayInput, EngineConfig, PageDecayOutput } from './types';
import { evaluateQualification } from './qualification';
import { calculatePriorityScore } from './scoring';
import { classifyDiagnosis } from './diagnosis';
import { assembleExplanation } from './explanation';

/**
 * PURE DOMAIN FUNCTION: Executes qualification, priority scoring, diagnosis classification,
 * and evidence payload assembly for a single page.
 * ZERO HTTP/DB/React dependencies. Fully fixture-testable.
 */
export function runDecayEngine(
  input: PageDecayInput,
  config: EngineConfig
): PageDecayOutput {
  // 1. Qualification Evaluation
  const qualResult = evaluateQualification(input, config);

  if (qualResult.status !== 'QUALIFIED') {
    const explanation = assembleExplanation(
      input,
      qualResult.absoluteClickLoss,
      qualResult.percentClickLoss
    );

    return {
      pageUrl: input.pageUrl,
      qualificationStatus: qualResult.status,
      qualificationReason: qualResult.reason,
      absoluteClickLoss: qualResult.absoluteClickLoss,
      percentClickLoss: qualResult.percentClickLoss,
      currentAvgPosition: input.currentWindow.avgPosition,
      diagnosisDetail: explanation,
    };
  }

  // 2. Priority Scoring
  const scoringResult = calculatePriorityScore(
    input,
    qualResult.absoluteClickLoss,
    config
  );

  // 3. Diagnosis Classification
  const diagnosisResult = classifyDiagnosis(input, config);

  // 4. Explanation Assembly
  const explanation = assembleExplanation(
    input,
    qualResult.absoluteClickLoss,
    qualResult.percentClickLoss,
    scoringResult,
    diagnosisResult
  );

  return {
    pageUrl: input.pageUrl,
    qualificationStatus: 'QUALIFIED',
    absoluteClickLoss: qualResult.absoluteClickLoss,
    percentClickLoss: qualResult.percentClickLoss,
    currentAvgPosition: input.currentWindow.avgPosition,
    recoverabilityBand: scoringResult.recoverabilityBand,
    recoverabilityMultiplier: scoringResult.recoverabilityMultiplier,
    queryConcentrationFactor: scoringResult.queryConcentrationFactor,
    priorityScore: scoringResult.priorityScore,
    priorityLabel: scoringResult.priorityLabel,
    diagnosisCategory: diagnosisResult.category,
    diagnosisDetail: explanation,
  };
}
