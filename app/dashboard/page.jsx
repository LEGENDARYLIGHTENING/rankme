'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import OpportunityCard from '@/src/components/decay/OpportunityCard';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/dashboard');
      if (res.status === 404) {
        // Redirect to onboarding if no property is connected
        window.location.href = '/onboarding';
        return;
      }
      const json = await res.json();
      if (json.opportunities) {
        setData(json);
      } else {
        setError(json.error || 'Failed to load dashboard data');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A0A0A', color: '#F5F5F5', fontFamily: 'Inter, sans-serif', paddingBottom: '60px' }}>
      
      {/* Top Navigation Bar */}
      <div style={{ borderBottom: '1px solid #1E1E1E', backgroundColor: '#141414', padding: '16px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ fontSize: '18px', fontWeight: '700', color: '#C9A84C', textDecoration: 'none' }}>
              DecayCheck <span style={{ fontSize: '12px', color: '#999999', fontWeight: '400' }}>by Rankur</span>
            </Link>

            <nav style={{ display: 'flex', gap: '16px', fontSize: '14px', fontWeight: '500' }}>
              <Link href="/dashboard" style={{ color: '#C9A84C', borderBottom: '2px solid #C9A84C', paddingBottom: '4px', textDecoration: 'none' }}>
                Priority Action List
              </Link>
              <Link href="/dashboard/monitoring" style={{ color: '#999999', textDecoration: 'none' }}>
                Refresh Monitoring
              </Link>
              <Link href="/settings/billing" style={{ color: '#999999', textDecoration: 'none' }}>
                Settings & Billing
              </Link>
            </nav>
          </div>

          {data?.property && (
            <div style={{ fontSize: '13px', color: '#999999' }}>
              Property: <strong style={{ color: '#F5F5F5' }}>{data.property.displayName}</strong>
            </div>
          )}
        </div>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: '1000px', margin: '40px auto 0', padding: '0 20px' }}>
        
        {/* Header & Freshness Indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#C9A84C', letterSpacing: '1.5px', marginBottom: '6px' }}>
              Decay Engine Analysis
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', margin: 0 }}>
              What Needs Your Attention Next
            </h1>
          </div>

          {data?.last_reliable_data_date && (
            <div style={{ backgroundColor: '#141414', border: '1px solid #1E1E1E', borderRadius: '6px', padding: '8px 14px', fontSize: '12px', color: '#999999' }}>
              Last reliable GSC date: <strong style={{ color: '#C9A84C' }}>{data.last_reliable_data_date}</strong>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#999999' }}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>⏳</div>
            Evaluating rolling 90-day decay metrics...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{ backgroundColor: 'rgba(192, 57, 43, 0.15)', border: '1px solid #C0392B', borderRadius: '8px', padding: '20px', color: '#FF6B6B', marginBottom: '24px' }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Opportunities List */}
        {!loading && !error && data && (
          <>
            {data.opportunities.length === 0 ? (
              /* Zero-Opportunities Empty State */
              <div style={{ backgroundColor: '#141414', border: '1px solid #1E1E1E', borderRadius: '12px', padding: '48px 32px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>🎉</div>
                <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>
                  You're all caught up!
                </h2>
                <p style={{ color: '#999999', fontSize: '15px', maxWidth: '500px', margin: '0 auto 24px', lineHeight: '1.6' }}>
                  No qualifying content decay detected in the current rolling 90-day period. Your high-traffic pages are maintaining stable search volume.
                </p>
                <button
                  onClick={fetchDashboard}
                  style={{
                    backgroundColor: '#1E1E1E',
                    color: '#F5F5F5',
                    border: '1px solid #333',
                    borderRadius: '6px',
                    padding: '10px 20px',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  Re-check Search Console Data
                </button>
              </div>
            ) : (
              /* Prioritized Opportunities Stack */
              <div>
                <div style={{ fontSize: '14px', color: '#999999', marginBottom: '16px' }}>
                  Showing <strong style={{ color: '#C9A84C' }}>{data.total_qualifying_count}</strong> high-impact refresh candidates, ordered by recovery opportunity:
                </div>

                {data.opportunities.map((opp) => (
                  <OpportunityCard key={opp.page_url} opportunity={opp} />
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
