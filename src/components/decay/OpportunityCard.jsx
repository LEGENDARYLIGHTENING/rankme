'use client';

import Link from 'next/link';

export default function OpportunityCard({ opportunity }) {
  const {
    page_url,
    priority_label,
    priority_score,
    absolute_click_loss,
    percent_click_loss,
    current_avg_position,
    diagnosis_category,
    evidence,
    refresh_status,
  } = opportunity;

  // Diagnosis badge color mapping
  const diagnosisColors = {
    RANKING_DRIVEN: { bg: 'rgba(192, 57, 43, 0.15)', text: '#FF6B6B', label: 'Ranking Drop' },
    CTR_DRIVEN: { bg: 'rgba(230, 126, 34, 0.15)', text: '#F39C12', label: 'CTR Decline' },
    BOTH: { bg: 'rgba(155, 89, 182, 0.15)', text: '#9B59B6', label: 'Ranking & CTR' },
    MIXED_UNCLEAR: { bg: 'rgba(127, 140, 141, 0.15)', text: '#95A5A6', label: 'Mixed Signals' },
  };

  const diagInfo = diagnosisColors[diagnosis_category] || diagnosisColors.MIXED_UNCLEAR;

  return (
    <div
      style={{
        backgroundColor: '#141414',
        border: '1px solid #1E1E1E',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '16px',
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      }}
    >
      {/* 1. PRIORITY & DIAGNOSIS BADGES (HEADER) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              backgroundColor: priority_label === 'High' ? '#C0392B' : priority_label === 'Medium' ? '#D35400' : '#7F8C8D',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              padding: '4px 10px',
              borderRadius: '4px',
            }}
          >
            {priority_label} Priority
          </span>

          <span
            style={{
              backgroundColor: diagInfo.bg,
              color: diagInfo.text,
              fontSize: '12px',
              fontWeight: '600',
              padding: '4px 10px',
              borderRadius: '4px',
              border: `1px solid ${diagInfo.text}33`,
            }}
          >
            {diagInfo.label}
          </span>

          {refresh_status === 'MONITORING' && (
            <span
              style={{
                backgroundColor: 'rgba(46, 204, 113, 0.15)',
                color: '#2ECC71',
                fontSize: '12px',
                fontWeight: '600',
                padding: '4px 10px',
                borderRadius: '4px',
                border: '1px solid #2ECC7133',
              }}
            >
              🔄 Monitoring Baseline
            </span>
          )}
        </div>

        {/* 4. SCORE (SUBORDINATE, MOVED TO RIGHT CORNER) */}
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '11px', color: '#777777', display: 'block', textTransform: 'uppercase' }}>
            Actionability Score
          </span>
          <span style={{ fontSize: '18px', fontWeight: '700', color: '#C9A84C' }}>
            {priority_score}
          </span>
        </div>
      </div>

      {/* 2. OPPORTUNITY (PAGE URL & LOST VALUE) */}
      <div style={{ marginBottom: '16px' }}>
        <Link
          href={`/dashboard/pages/${encodeURIComponent(page_url)}`}
          style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#F5F5F5',
            textDecoration: 'none',
            wordBreak: 'break-all',
          }}
        >
          {page_url}
        </Link>

        <div style={{ display: 'flex', gap: '24px', marginTop: '12px', flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontSize: '12px', color: '#999999', display: 'block' }}>Absolute Click Loss</span>
            <span style={{ fontSize: '20px', fontWeight: '700', color: '#FF6B6B' }}>
              -{absolute_click_loss.toLocaleString()} clicks
            </span>
          </div>

          <div>
            <span style={{ fontSize: '12px', color: '#999999', display: 'block' }}>Percent Decline</span>
            <span style={{ fontSize: '16px', fontWeight: '600', color: '#999999' }}>
              -{percent_click_loss}%
            </span>
          </div>

          <div>
            <span style={{ fontSize: '12px', color: '#999999', display: 'block' }}>Current Avg Position</span>
            <span style={{ fontSize: '16px', fontWeight: '600', color: '#F5F5F5' }}>
              Position {current_avg_position}
            </span>
          </div>
        </div>
      </div>

      {/* 3. EVIDENCE (EXPLAINABILITY BREAKDOWN) */}
      <div
        style={{
          backgroundColor: '#0A0A0A',
          borderRadius: '8px',
          padding: '14px',
          border: '1px solid #1E1E1E',
          fontSize: '13px',
          color: '#CCCCCC',
        }}
      >
        <div style={{ fontWeight: '600', color: '#C9A84C', marginBottom: '6px' }}>
          Why this page surfaced:
        </div>
        <ul style={{ margin: 0, paddingLeft: '16px', lineHeight: '1.6' }}>
          {evidence?.position_change && (
            <li>
              Ranking dropped from position <strong>{evidence.position_change.from}</strong> to <strong>{evidence.position_change.to}</strong>.
            </li>
          )}
          {evidence?.top_query && (
            <li>
              Top declining query: <code style={{ color: '#C9A84C' }}>"{evidence.top_query.query}"</code> lost <strong>{evidence.top_query.click_loss} clicks</strong>.
            </li>
          )}
          {evidence?.recoverability_note && (
            <li style={{ color: '#999999', marginTop: '4px' }}>
              {evidence.recoverability_note}
            </li>
          )}
        </ul>
      </div>

      {/* FOOTER ACTION LINK */}
      <div style={{ marginTop: '16px', textAlign: 'right' }}>
        <Link
          href={`/dashboard/pages/${encodeURIComponent(page_url)}`}
          style={{
            fontSize: '13px',
            fontWeight: '600',
            color: '#C9A84C',
            textDecoration: 'none',
          }}
        >
          Inspect Evidence & Refresh →
        </Link>
      </div>
    </div>
  );
}
