'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';

export default function DiagnosticReportPage({ params }) {
  const resolvedParams = use(params);
  const sessionId = resolvedParams.session_id;

  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReport();
  }, [sessionId]);

  const fetchReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/diagnostic/${sessionId}`);
      const json = await res.json();
      if (json.payload) {
        setSessionData(json);
      } else {
        setError(json.error || 'Failed to load report session');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const payload = sessionData?.payload;
  const opps = payload?.top_opportunities || [];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A0A0A', color: '#F5F5F5', fontFamily: 'Inter, sans-serif', paddingBottom: '80px' }}>
      
      {/* Header */}
      <div style={{ borderBottom: '1px solid #1E1E1E', backgroundColor: '#141414', padding: '16px 32px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '18px', fontWeight: '700', color: '#C9A84C', textDecoration: 'none' }}>
            DecayCheck <span style={{ fontSize: '12px', color: '#999999', fontWeight: '400' }}>by Rankur</span>
          </Link>
          <Link
            href="/onboarding"
            style={{
              backgroundColor: '#C9A84C',
              color: '#0A0A0A',
              fontWeight: '600',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '13px',
              textDecoration: 'none',
            }}
          >
            Connect Full Account →
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '40px auto 0', padding: '0 20px' }}>
        
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#999999' }}>
            Analyzing Search Console performance metrics...
          </div>
        )}

        {error && (
          <div style={{ backgroundColor: 'rgba(192, 57, 43, 0.15)', border: '1px solid #C0392B', borderRadius: '8px', padding: '24px', color: '#FF6B6B', textAlign: 'center' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Report Unavailable</h3>
            <p style={{ margin: 0, fontSize: '14px' }}>{error}</p>
          </div>
        )}

        {!loading && payload && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ color: '#C9A84C', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px' }}>
                Free Diagnostic Audit
              </div>
              <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '12px' }}>
                Decay Summary for {payload.site_url}
              </h1>
              <p style={{ color: '#999999', fontSize: '15px' }}>
                Identified <strong style={{ color: '#FF6B6B' }}>{payload.total_qualifying_found} high-impact refresh opportunities</strong> losing traffic in the current 90-day window.
              </p>
            </div>

            {/* Top 5 Teaser List */}
            <div style={{ display: 'grid', gap: '16px', marginBottom: '40px' }}>
              {opps.map((opp, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#141414',
                    border: '1px solid #1E1E1E',
                    borderRadius: '12px',
                    padding: '24px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span
                      style={{
                        backgroundColor: opp.priorityLabel === 'High' ? '#C0392B' : '#D35400',
                        color: '#FFF',
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '3px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      {opp.priorityLabel} Priority ({opp.priorityScore} Score)
                    </span>
                    <span style={{ fontSize: '12px', color: '#C9A84C', fontWeight: '600' }}>
                      {opp.diagnosisCategory}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#F5F5F5', marginBottom: '12px', wordBreak: 'break-all' }}>
                    {opp.pageUrl}
                  </h3>

                  <div style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
                    <div>
                      <span style={{ color: '#999999', fontSize: '12px', display: 'block' }}>Traffic Loss</span>
                      <strong style={{ color: '#FF6B6B', fontSize: '18px' }}>-{opp.absoluteClickLoss} clicks</strong>
                    </div>

                    <div>
                      <span style={{ color: '#999999', fontSize: '12px', display: 'block' }}>Position</span>
                      <strong style={{ color: '#F5F5F5', fontSize: '16px' }}>Position {opp.currentAvgPosition}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Conversion CTA Box */}
            <div style={{ backgroundColor: 'rgba(201, 168, 76, 0.08)', border: '1px solid #C9A84C', borderRadius: '12px', padding: '36px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px', color: '#C9A84C' }}>
                Unlock Full Decay Tracking & 90-Day Monitoring
              </h2>
              <p style={{ color: '#CCCCCC', fontSize: '15px', maxWidth: '580px', margin: '0 auto 24px', lineHeight: '1.6' }}>
                Connect your account to monitor all declining pages, inspect query evidence breakdowns, mark content as refreshed, and verify post-refresh traffic recovery over 28, 56, and 90 days.
              </p>
              <Link
                href="/onboarding"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#C9A84C',
                  color: '#0A0A0A',
                  fontWeight: '700',
                  padding: '14px 32px',
                  borderRadius: '6px',
                  fontSize: '15px',
                  textDecoration: 'none',
                }}
              >
                Start Continuous Monitoring →
              </Link>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
