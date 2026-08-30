export type QualificationStatus =
  | 'QUALIFIED'
  | 'INSUFFICIENT_HISTORY'
  | 'BELOW_FLOOR'
  | 'NOT_DECLINING';

export type RecoverabilityBand =
  | '1-10'
  | '11-15'
  | '16-20'
  | '21-30'
  | '31+';

export type PriorityLabel = 'High' | 'Medium' | 'Low';

export type DiagnosisCategory =
  | 'RANKING_DRIVEN'
  | 'CTR_DRIVEN'
  | 'BOTH'
  | 'MIXED_UNCLEAR';

export interface RecoverabilityBandConfig {
  min_position: number;
  max_position: number;
  multiplier: number;
}

export interface EngineConfig {
  minimum_history_months: number;
  traffic_floor_clicks_per_month: number;
  historical_peak_qualifying_clicks: number;
  recoverability_bands: RecoverabilityBandConfig[];
  query_concentration_adjustment_range: {
    min: number;
    max: number;
  };
  diagnosis_thresholds: {
    position_worsened_delta: number;
    ctr_drop_pct: number;
    impression_flat_band_pct: number;
  };
  recovery_threshold_pct: number;
  stabilization_threshold_pct: number;
  monitoring_checkpoints_days: number[];
}

export interface WindowMetrics {
  clicks: number;
  impressions: number;
  ctr: number;
  avgPosition: number;
  daysCount: number;
}

export interface QueryImpact {
  query: string;
  previousClicks: number;
  currentClicks: number;
  clickLoss: number;
  previousPosition: number;
  currentPosition: number;
}

export interface PageDecayInput {
  pageUrl: string;
  totalHistoryMonths: number;
  currentWindow: WindowMetrics;
  previousWindow: WindowMetrics;
  historicalPeakClicks?: number; // Clicks during peak 90-day window in last 12 months
  queries?: QueryImpact[];
}

export interface DiagnosisEvidenceDetail {
  absolute_click_loss: number;
  percent_click_loss: number;
  position_change: { from: number; to: number };
  ctr_change: { from: number; to: number };
  impressions_change: { from: number; to: number };
  top_query?: { query: string; click_loss: number };
  recoverability_band: string;
  recoverability_note: string;
  query_concentration_factor?: number;
}

export interface PageDecayOutput {
  pageUrl: string;
  qualificationStatus: QualificationStatus;
  qualificationReason?: string;
  absoluteClickLoss: number;
  percentClickLoss: number;
  currentAvgPosition: number;
  recoverabilityBand?: RecoverabilityBand;
  recoverabilityMultiplier?: number;
  queryConcentrationFactor?: number;
  priorityScore?: number;
  priorityLabel?: PriorityLabel;
  diagnosisCategory?: DiagnosisCategory;
  diagnosisDetail: DiagnosisEvidenceDetail;
}
