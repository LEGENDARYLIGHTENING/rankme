'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';

export default function PageDetailPage({ params }) {
  const resolvedParams = use(params);
  const rawPageUrl = decodeURIComponent(resolvedParams.page_url);

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshNote, setRefreshNote] = useState('');
  const [refreshSuccess, setRefreshSuccess] = useState(false);

  useEffect(() => {
    fetchPageDetail();
  }, [rawPageUrl]);

  const fetchPageDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/pages/detail?pageUrl=${encodeURIComponent(rawPageUrl)}`);
      const json = await res.json();
      if (json.snapshot) {
        setDetail(json);
      } else {
        setError(json.error || 'Failed to fetch page detail');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRefreshed = async () => {
    setRefreshing(true);
    setError(null);
    try {
      const res = await fetch(`/api/pages/${encodeURIComponent(rawPageUrl)}/mark-refreshed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: refreshNote }),
      });
      const data = await res.json();
      if (data.success) {
        setRefreshSuccess(true);
        fetchPageDetail();
      } else {
        setError(data.error || 'Failed to mark page as refreshed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setRefreshing(false);
    }
  };

  const snapshot = detail?.snapshot;
  const evidence = snapshot?.diagnosis_detail;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A0A0A', color: '#F5F5F5', fontFamily: 'Inter, sans-serif', paddingBottom: '60px' }}>
      
      {/* Top Header */}
      <div style={{ borderBottom: '1px solid #1E1E1E', backgroundColor: '#141414', padding: '16px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/dashboard" style={{ color: '#C9A84C', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
              ← Back to Priority List
            </Link>
            <span style={{ color: '#333' }}>|</span>
            <span style={{ fontSize: '14px', color: '#999999' }}>Content Investigation</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '40px auto 0', padding: '0 20px' }}>
        
        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#999999' }}>
            Loading page decay investigation details...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{ backgroundColor: 'rgba(192, 57, 43, 0.15)', border: '1px solid #C0392B', borderRadius: '8px', padding: '16px', color: '#FF6B6B', marginBottom: '24px' }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && snapshot && (
          <>
            {/* Title & URL */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span
                  style={{
                    backgroundColor: snapshot.priority_label === 'High' ? '#C0392B' : '#D35400',
                    color: '#FFF',
                    fontSize: '11px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}
                >
                  {snapshot.priority_label} Priority ({snapshot.priority_score} Score)
                </span>
                <span
                  style={{
                    backgroundColor: '#1E1E1E',
                    color: '#C9A84C',
                    fontSize: '12px',
                    fontWeight: '600',
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}
                >
                  {snapshot.diagnosis_category}
                </span>
              </div>

              <h1 style={{ fontSize: '22px', fontWeight: '700', wordBreak: 'break-all', margin: '0 0 12px 0' }}>
                {rawPageUrl}
              </h1>

              <div style={{ fontSize: '13px', color: '#999999' }}>
                Comparison Windows: Rolling 90 days ending <strong>{snapshot.current_window_end}</strong> vs immediately preceding 90 days ending <strong>{snapshot.previous_window_end}</strong>.
              </div>
            </div>

            {/* Metrics Overview Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              
              <div style={{ backgroundColor: '#141414', border: '1px solid #1E1E1E', borderRadius: '8px', padding: '20px' }}>
                <div style={{ fontSize: '12px', color: '#999999', marginBottom: '4px' }}>Absolute Click Loss</div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#FF6B6B' }}>
                  -{snapshot.absolute_click_loss.toLocaleString()}
                </div>
                <div style={{ fontSize: '12px', color: '#999999', marginTop: '4px' }}>
                  -{snapshot.percent_click_loss}% decline
                </div>
              </div>

              <div style={{ backgroundColor: '#141414', border: '1px solid #1E1E1E', borderRadius: '8px', padding: '20px' }}>
                <div style={{ fontSize: '12px', color: '#999999', marginBottom: '4px' }}>Position Shift</div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#F5F5F5' }}>
                  {evidence?.position_change?.from} → {evidence?.position_change?.to}
                </div>
                <div style={{ fontSize: '12px', color: '#C9A84C', marginTop: '4px' }}>
                  {snapshot.recoverability_band} Band ({snapshot.recoverability_multiplier}x multiplier)
                </div>
              </div>

              <div style={{ backgroundColor: '#141414', border: '1px solid #1E1E1E', borderRadius: '8px', padding: '20px' }}>
                <div style={{ fontSize: '12px', color: '#999999', marginBottom: '4px' }}>CTR Change</div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#F5F5F5' }}>
                  {(evidence?.ctr_change?.from * 100).toFixed(1)}% → {(evidence?.ctr_change?.to * 100).toFixed(1)}%
                </div>
              </div>

              <div style={{ backgroundColor: '#141414', border: '1px solid #1E1E1E', borderRadius: '8px', padding: '20px' }}>
                <div style={{ fontSize: '12px', color: '#999999', marginBottom: '4px' }}>Query Concentration</div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#C9A84C' }}>
                  {snapshot.query_concentration_factor || 1.0}x
                </div>
                <div style={{ fontSize: '12px', color: '#999999', marginTop: '4px' }}>
                  Secondary adjustment
                </div>
              </div>

            </div>

            {/* Action Panel: Mark as Refreshed */}
            <div style={{ backgroundColor: 'rgba(201, 168, 76, 0.08)', border: '1px solid #C9A84C', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#C9A84C' }}>
                Take Action: Mark Page as Refreshed
              </h3>
              <p style={{ fontSize: '14px', color: '#CCCCCC', marginBottom: '16px', lineHeight: '1.5' }}>
                When you finish updating, rewriting, or optimizing this page, mark it as refreshed. DecayCheck will freeze your pre-refresh baseline and monitor post-refresh performance at 28-, 56-, and 90-day checkpoints.
              </p>

              {refreshSuccess ? (
                <div style={{ backgroundColor: '#141414', border: '1px solid #2ECC71', borderRadius: '6px', padding: '16px', color: '#2ECC71', fontWeight: '600' }}>
                  ✓ Refresh event recorded! Baseline frozen. DecayCheck is now monitoring performance.
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    placeholder="Optional note (e.g. Added 5 new sections, updated title tag & stats)..."
                    value={refreshNote}
                    onChange={(e) => setRefreshNote(e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: '#0A0A0A',
                      border: '1px solid #333',
                      borderRadius: '6px',
                      padding: '10px 14px',
                      color: '#FFF',
                      fontSize: '14px',
                      marginBottom: '12px',
                    }}
                  />
                  <button
                    onClick={handleMarkRefreshed}
                    disabled={refreshing}
                    style={{
                      backgroundColor: '#C9A84C',
                      color: '#0A0A0A',
                      fontWeight: '700',
                      padding: '12px 24px',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '14px',
                    }}
                  >
                    {refreshing ? 'Freezing Baseline...' : 'Mark as Refreshed & Freeze Baseline →'}
                  </button>
                </div>
              )}
            </div>

            {/* Top Declining Queries Table */}
            <div style={{ backgroundColor: '#141414', border: '1px solid #1E1E1E', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
                Top Declining Queries
              </h3>

              {detail.top_declining_queries.length === 0 ? (
                <p style={{ color: '#999999', fontSize: '14px' }}>
                  No concentrated query loss detected. Traffic loss is distributed across low-volume queries.
                </p>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #333', color: '#999999' }}>
                      <th style={{ padding: '10px' }}>Search Query</th>
                      <th style={{ padding: '10px' }}>Click Loss</th>
                      <th style={{ padding: '10px' }}>Prev Clicks</th>
                      <th style={{ padding: '10px' }}>Curr Clicks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail.top_declining_queries.map((q, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #1E1E1E' }}>
                        <td style={{ padding: '12px 10px', color: '#C9A84C', fontWeight: '600' }}>{q.query}</td>
                        <td style={{ padding: '12px 10px', color: '#FF6B6B', fontWeight: '700' }}>-{q.click_loss}</td>
                        <td style={{ padding: '12px 10px', color: '#999' }}>{q.previous_clicks}</td>
                        <td style={{ padding: '12px 10px', color: '#F5F5F5' }}>{q.current_clicks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
