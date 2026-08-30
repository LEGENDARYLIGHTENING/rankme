import { describe, it, expect } from 'vitest';
import { runDecayEngine } from '../../lib/decay-engine/index';
import { EngineConfig, PageDecayInput } from '../../lib/decay-engine/types';

const mockConfig: EngineConfig = {
  minimum_history_months: 6,
  traffic_floor_clicks_per_month: 35, // 35 * 3 = 105 clicks/90d floor
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

describe('Qualification Engine - Comprehensive Edge Cases', () => {
  it('disqualifies page with 5.9 months of history (< 6 months)', () => {
    const input: PageDecayInput = {
      pageUrl: 'https://example.com/p1',
      totalHistoryMonths: 5.9,
      currentWindow: { clicks: 50, impressions: 1000, ctr: 0.05, avgPosition: 8, daysCount: 90 },
      previousWindow: { clicks: 200, impressions: 2000, ctr: 0.1, avgPosition: 5, daysCount: 90 },
    };
    const output = runDecayEngine(input, mockConfig);
    expect(output.qualificationStatus).toBe('INSUFFICIENT_HISTORY');
  });

  it('qualifies page with exactly 6.0 months of history', () => {
    const input: PageDecayInput = {
      pageUrl: 'https://example.com/p2',
      totalHistoryMonths: 6.0,
      currentWindow: { clicks: 150, impressions: 3000, ctr: 0.05, avgPosition: 8, daysCount: 90 },
      previousWindow: { clicks: 300, impressions: 5000, ctr: 0.06, avgPosition: 5, daysCount: 90 },
    };
    const output = runDecayEngine(input, mockConfig);
    expect(output.qualificationStatus).toBe('QUALIFIED');
  });

  it('disqualifies page with 104 previous clicks and peak 199 (below floor)', () => {
    const input: PageDecayInput = {
      pageUrl: 'https://example.com/p3',
      totalHistoryMonths: 12,
      currentWindow: { clicks: 40, impressions: 1000, ctr: 0.04, avgPosition: 12, daysCount: 90 },
      previousWindow: { clicks: 104, impressions: 2000, ctr: 0.052, avgPosition: 10, daysCount: 90 },
      historicalPeakClicks: 199,
    };
    const output = runDecayEngine(input, mockConfig);
    expect(output.qualificationStatus).toBe('BELOW_FLOOR');
  });

  it('qualifies page with exactly 105 previous clicks (at floor boundary)', () => {
    const input: PageDecayInput = {
      pageUrl: 'https://example.com/p4',
      totalHistoryMonths: 12,
      currentWindow: { clicks: 50, impressions: 1000, ctr: 0.05, avgPosition: 10, daysCount: 90 },
      previousWindow: { clicks: 105, impressions: 2000, ctr: 0.0525, avgPosition: 8, daysCount: 90 },
      historicalPeakClicks: 105,
    };
    const output = runDecayEngine(input, mockConfig);
    expect(output.qualificationStatus).toBe('QUALIFIED');
  });

  it('qualifies page with 80 previous clicks if historical peak is 200+ (peak override)', () => {
    const input: PageDecayInput = {
      pageUrl: 'https://example.com/p5',
      totalHistoryMonths: 12,
      currentWindow: { clicks: 30, impressions: 800, ctr: 0.0375, avgPosition: 14, daysCount: 90 },
      previousWindow: { clicks: 80, impressions: 1600, ctr: 0.05, avgPosition: 10, daysCount: 90 },
      historicalPeakClicks: 220,
    };
    const output = runDecayEngine(input, mockConfig);
    expect(output.qualificationStatus).toBe('QUALIFIED');
  });

  it('disqualifies page when current clicks equal previous clicks (zero decline)', () => {
    const input: PageDecayInput = {
      pageUrl: 'https://example.com/p6',
      totalHistoryMonths: 12,
      currentWindow: { clicks: 500, impressions: 10000, ctr: 0.05, avgPosition: 5, daysCount: 90 },
      previousWindow: { clicks: 500, impressions: 10000, ctr: 0.05, avgPosition: 5, daysCount: 90 },
    };
    const output = runDecayEngine(input, mockConfig);
    expect(output.qualificationStatus).toBe('NOT_DECLINING');
    expect(output.absoluteClickLoss).toBe(0);
  });

  it('disqualifies page when current clicks exceed previous clicks (traffic growth)', () => {
    const input: PageDecayInput = {
      pageUrl: 'https://example.com/p7',
      totalHistoryMonths: 12,
      currentWindow: { clicks: 650, impressions: 12000, ctr: 0.054, avgPosition: 4, daysCount: 90 },
      previousWindow: { clicks: 500, impressions: 10000, ctr: 0.05, avgPosition: 5, daysCount: 90 },
    };
    const output = runDecayEngine(input, mockConfig);
    expect(output.qualificationStatus).toBe('NOT_DECLINING');
  });
});
