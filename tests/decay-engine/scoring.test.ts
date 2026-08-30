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

describe('Priority Scoring & Recoverability Band Boundaries', () => {
  it('assigns 1.0 multiplier for Page 1 positions (avgPosition <= 10.0)', () => {
    const input: PageDecayInput = {
      pageUrl: 'https://example.com/pos-10',
      totalHistoryMonths: 12,
      currentWindow: { clicks: 400, impressions: 8000, ctr: 0.05, avgPosition: 10.0, daysCount: 90 },
      previousWindow: { clicks: 900, impressions: 15000, ctr: 0.06, avgPosition: 5.0, daysCount: 90 },
    };
    const output = runDecayEngine(input, mockConfig);
    expect(output.recoverabilityBand).toBe('1-10');
    expect(output.recoverabilityMultiplier).toBe(1.0);
    // Score = 500 loss * 1.0 * 1.0 = 500
    expect(output.priorityScore).toBe(500);
    expect(output.priorityLabel).toBe('High');
  });

  it('assigns 0.8 multiplier for boundary position 10.1 to 15.0', () => {
    const input: PageDecayInput = {
      pageUrl: 'https://example.com/pos-15',
      totalHistoryMonths: 12,
      currentWindow: { clicks: 300, impressions: 8000, ctr: 0.0375, avgPosition: 15.0, daysCount: 90 },
      previousWindow: { clicks: 800, impressions: 16000, ctr: 0.05, avgPosition: 9.0, daysCount: 90 },
    };
    const output = runDecayEngine(input, mockConfig);
    expect(output.recoverabilityBand).toBe('11-15');
    expect(output.recoverabilityMultiplier).toBe(0.8);
    // Score = 500 * 0.8 = 400
    expect(output.priorityScore).toBe(400);
  });

  it('assigns 0.55 multiplier for position 15.1 to 20.0', () => {
    const input: PageDecayInput = {
      pageUrl: 'https://example.com/pos-20',
      totalHistoryMonths: 12,
      currentWindow: { clicks: 200, impressions: 5000, ctr: 0.04, avgPosition: 20.0, daysCount: 90 },
      previousWindow: { clicks: 600, impressions: 12000, ctr: 0.05, avgPosition: 12.0, daysCount: 90 },
    };
    const output = runDecayEngine(input, mockConfig);
    expect(output.recoverabilityBand).toBe('16-20');
    expect(output.recoverabilityMultiplier).toBe(0.55);
    // Score = 400 * 0.55 = 220
    expect(output.priorityScore).toBe(220);
  });

  it('assigns 0.3 multiplier for position 20.1 to 30.0', () => {
    const input: PageDecayInput = {
      pageUrl: 'https://example.com/pos-30',
      totalHistoryMonths: 12,
      currentWindow: { clicks: 150, impressions: 4000, ctr: 0.0375, avgPosition: 28.5, daysCount: 90 },
      previousWindow: { clicks: 550, impressions: 11000, ctr: 0.05, avgPosition: 18.0, daysCount: 90 },
    };
    const output = runDecayEngine(input, mockConfig);
    expect(output.recoverabilityBand).toBe('21-30');
    expect(output.recoverabilityMultiplier).toBe(0.3);
    // Score = 400 * 0.3 = 120
    expect(output.priorityScore).toBe(120);
    expect(output.priorityLabel).toBe('Medium');
  });

  it('assigns 0.15 multiplier for position > 30.0 (poor recoverability)', () => {
    const input: PageDecayInput = {
      pageUrl: 'https://example.com/pos-35',
      totalHistoryMonths: 12,
      currentWindow: { clicks: 100, impressions: 3000, ctr: 0.033, avgPosition: 35.0, daysCount: 90 },
      previousWindow: { clicks: 500, impressions: 10000, ctr: 0.05, avgPosition: 22.0, daysCount: 90 },
    };
    const output = runDecayEngine(input, mockConfig);
    expect(output.recoverabilityBand).toBe('31+');
    expect(output.recoverabilityMultiplier).toBe(0.15);
    // Score = 400 * 0.15 = 60
    expect(output.priorityScore).toBe(60);
  });

  it('proves large click loss with poor recoverability produces lower score than moderate loss with strong recoverability', () => {
    // Page A: Lost 1000 clicks but dropped to position 45 (0.15x) -> 1000 * 0.15 = 150
    const pageA: PageDecayInput = {
      pageUrl: 'https://example.com/page-a',
      totalHistoryMonths: 12,
      currentWindow: { clicks: 500, impressions: 20000, ctr: 0.025, avgPosition: 45.0, daysCount: 90 },
      previousWindow: { clicks: 1500, impressions: 40000, ctr: 0.0375, avgPosition: 25.0, daysCount: 90 },
    };

    // Page B: Lost 400 clicks but remains at position 8 (1.0x) -> 400 * 1.0 = 400
    const pageB: PageDecayInput = {
      pageUrl: 'https://example.com/page-b',
      totalHistoryMonths: 12,
      currentWindow: { clicks: 600, impressions: 12000, ctr: 0.05, avgPosition: 8.0, daysCount: 90 },
      previousWindow: { clicks: 1000, impressions: 20000, ctr: 0.05, avgPosition: 6.0, daysCount: 90 },
    };

    const outA = runDecayEngine(pageA, mockConfig);
    const outB = runDecayEngine(pageB, mockConfig);

    expect(outA.priorityScore).toBe(150);
    expect(outB.priorityScore).toBe(400);
    expect(outB.priorityScore!).toBeGreaterThan(outA.priorityScore!);
  });

  it('bounds query concentration factor strictly to max 1.1 for 100% concentrated loss', () => {
    const input: PageDecayInput = {
      pageUrl: 'https://example.com/single-query-loss',
      totalHistoryMonths: 12,
      currentWindow: { clicks: 100, impressions: 4000, ctr: 0.025, avgPosition: 8, daysCount: 90 },
      previousWindow: { clicks: 500, impressions: 10000, ctr: 0.05, avgPosition: 6, daysCount: 90 },
      queries: [
        { query: 'brand term', previousClicks: 400, currentClicks: 0, clickLoss: 400, previousPosition: 1, currentPosition: 10 },
      ],
    };
    const output = runDecayEngine(input, mockConfig);
    expect(output.queryConcentrationFactor).toBe(1.1);
  });
});
