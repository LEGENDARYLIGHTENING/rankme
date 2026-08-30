import { describe, it, expect } from 'vitest';
import { runDecayEngine } from '../../lib/decay-engine/index';
import { EngineConfig, PageDecayInput } from '../../lib/decay-engine/types';

const mockConfig: EngineConfig = {
  minimum_history_months: 6,
  traffic_floor_clicks_per_month: 35,
  historical_peak_qualifying_clicks: 200,
  recoverability_bands: [
    { min_position: 1, max_position: 10, multiplier: 1.0 },
    { min_position: 11, max_position: 15, multiplier: 0.8 },
    { min_position: 16, max_position: 20, multiplier: 0.55 },
    { min_position: 21, max_position: 30, multiplier: 0.3 },
    { min_position: 31, max_position: 999, multiplier: 0.15 },
  ],
  query_concentration_adjustment_range: { min: 0.9, max: 1.1 },
  diagnosis_thresholds: {
    position_worsened_delta: 1.0,
    ctr_drop_pct: 15,
    impression_flat_band_pct: 10,
  },
  recovery_threshold_pct: 90,
  stabilization_threshold_pct: 50,
  monitoring_checkpoints_days: [28, 56, 90],
};

describe('Decay Engine - Qualification', () => {
  it('disqualifies page with insufficient history (< 6 months)', () => {
    const input: PageDecayInput = {
      pageUrl: 'https://example.com/new-page',
      totalHistoryMonths: 4,
      currentWindow: { clicks: 50, impressions: 1000, ctr: 0.05, avgPosition: 8, daysCount: 90 },
      previousWindow: { clicks: 200, impressions: 2000, ctr: 0.10, avgPosition: 5, daysCount: 90 },
    };

    const output = runDecayEngine(input, mockConfig);
    expect(output.qualificationStatus).toBe('INSUFFICIENT_HISTORY');
    expect(output.priorityScore).toBeUndefined();
  });

  it('disqualifies page below traffic floor (< 105 clicks in 90 days and peak < 200)', () => {
    const input: PageDecayInput = {
      pageUrl: 'https://example.com/tiny-page',
      totalHistoryMonths: 12,
      currentWindow: { clicks: 10, impressions: 500, ctr: 0.02, avgPosition: 25, daysCount: 90 },
      previousWindow: { clicks: 30, impressions: 800, ctr: 0.037, avgPosition: 20, daysCount: 90 },
      historicalPeakClicks: 50,
    };

    const output = runDecayEngine(input, mockConfig);
    expect(output.qualificationStatus).toBe('BELOW_FLOOR');
  });

  it('disqualifies page that is not declining', () => {
    const input: PageDecayInput = {
      pageUrl: 'https://example.com/growing-page',
      totalHistoryMonths: 12,
      currentWindow: { clicks: 500, impressions: 10000, ctr: 0.05, avgPosition: 4, daysCount: 90 },
      previousWindow: { clicks: 400, impressions: 9000, ctr: 0.044, avgPosition: 5, daysCount: 90 },
    };

    const output = runDecayEngine(input, mockConfig);
    expect(output.qualificationStatus).toBe('NOT_DECLINING');
  });

  it('qualifies page meeting all criteria', () => {
    const input: PageDecayInput = {
      pageUrl: 'https://example.com/decaying-page',
      totalHistoryMonths: 12,
      currentWindow: { clicks: 500, impressions: 12000, ctr: 0.041, avgPosition: 12, daysCount: 90 },
      previousWindow: { clicks: 1342, impressions: 20000, ctr: 0.067, avgPosition: 7, daysCount: 90 },
    };

    const output = runDecayEngine(input, mockConfig);
    expect(output.qualificationStatus).toBe('QUALIFIED');
    expect(output.priorityScore).toBeGreaterThan(0);
  });
});

describe('Decay Engine - Scoring & Recoverability', () => {
  it('assigns 0.8 multiplier for Page 2 striking distance (position 11-15)', () => {
    const input: PageDecayInput = {
      pageUrl: 'https://example.com/page-a',
      totalHistoryMonths: 12,
      currentWindow: { clicks: 500, impressions: 10000, ctr: 0.05, avgPosition: 11.4, daysCount: 90 },
      previousWindow: { clicks: 1342, impressions: 20000, ctr: 0.067, avgPosition: 7.2, daysCount: 90 },
    };

    const output = runDecayEngine(input, mockConfig);
    expect(output.recoverabilityBand).toBe('11-15');
    expect(output.recoverabilityMultiplier).toBe(0.8);
    expect(output.absoluteClickLoss).toBe(842);
    // Score = 842 * 0.8 * 1.0 = 673.6
    expect(output.priorityScore).toBe(673.6);
    expect(output.priorityLabel).toBe('High');
  });

  it('bounds query concentration factor strictly between 0.9 and 1.1', () => {
    const concentratedInput: PageDecayInput = {
      pageUrl: 'https://example.com/page-b',
      totalHistoryMonths: 12,
      currentWindow: { clicks: 100, impressions: 5000, ctr: 0.02, avgPosition: 8, daysCount: 90 },
      previousWindow: { clicks: 600, impressions: 15000, ctr: 0.04, avgPosition: 5, daysCount: 90 },
      queries: [{ query: 'main keyword', previousClicks: 400, currentClicks: 0, clickLoss: 400, previousPosition: 3, currentPosition: 9 }],
    };

    const output = runDecayEngine(concentratedInput, mockConfig);
    expect(output.queryConcentrationFactor).toBeGreaterThanOrEqual(0.9);
    expect(output.queryConcentrationFactor).toBeLessThanOrEqual(1.1);
  });
});

describe('Decay Engine - Diagnosis Classification', () => {
  it('classifies RANKING_DRIVEN when position drops significantly', () => {
    const input: PageDecayInput = {
      pageUrl: 'https://example.com/ranking-drop',
      totalHistoryMonths: 12,
      currentWindow: { clicks: 320, impressions: 8000, ctr: 0.040, avgPosition: 14.5, daysCount: 90 },
      previousWindow: { clicks: 800, impressions: 18000, ctr: 0.044, avgPosition: 8.0, daysCount: 90 },
    };

    const output = runDecayEngine(input, mockConfig);
    expect(output.diagnosisCategory).toBe('RANKING_DRIVEN');
    expect(output.diagnosisDetail.position_change.from).toBe(8.0);
    expect(output.diagnosisDetail.position_change.to).toBe(14.5);
  });

  it('classifies CTR_DRIVEN when CTR drops significantly while position remains steady', () => {
    const input: PageDecayInput = {
      pageUrl: 'https://example.com/ctr-drop',
      totalHistoryMonths: 12,
      currentWindow: { clicks: 200, impressions: 20000, ctr: 0.01, avgPosition: 4.2, daysCount: 90 },
      previousWindow: { clicks: 800, impressions: 20000, ctr: 0.04, avgPosition: 4.0, daysCount: 90 },
    };

    const output = runDecayEngine(input, mockConfig);
    expect(output.diagnosisCategory).toBe('CTR_DRIVEN');
  });
});
