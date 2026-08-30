'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MonitoringPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMonitoringEvents();
  }, []);

  const fetchMonitoringEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/monitoring');
      const json = await res.json();
      if (json.events) {
        setEvents(json.events);
      } else {
        setError(json.error || 'Failed to load monitoring events');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const outcomeBadges = {
    TOO_EARLY: { bg: '#1E1E1E', color: '#999999', label: 'Too Early' },
    RECOVERED: { bg: 'rgba(46, 204, 113, 0.15)', color: '#2ECC71', label: '✓ Recovered' },
    STABILIZED: { bg: 'rgba(241, 196, 15, 0.15)', color: '#F1C40F', label: '~ Stabilized' },
    STILL_DECLINING: { bg: 'rgba(192, 57, 43, 0.15)', color: '#FF6B6B', label: 'Still Declining' },
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A0A0A', color: '#F5F5F5', fontFamily: 'Inter, sans-serif', paddingBottom: '60px' }}>
      
      {/* Navigation Bar */}
      <div style={{ borderBottom: '1px solid #1E1E1E', backgroundColor: '#141414', padding: '16px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ fontSize: '18px', fontWeight: '700', color: '#C9A84C', textDecoration: 'none' }}>
              DecayCheck <span style={{ fontSize: '12px', color: '#999999', fontWeight: '400' }}>by Rankur</span>
            </Link>

            <nav style={{ display: 'flex', gap: '16px', fontSize: '14px', fontWeight: '500' }}>
              <Link href="/dashboard" style={{ color: '#999999', textDecoration: 'none' }}>
                Priority Action List
              </Link>
              <Link href="/dashboard/monitoring" style={{ color: '#C9A84C', borderBottom: '2px solid #C9A84C', paddingBottom: '4px', textDecoration: 'none' }}>
                Refresh Monitoring
              </Link>
              <Link href="/settings/billing" style={{ color: '#999999', textDecoration: 'none' }}>
                Settings & Billing
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '40px auto 0', padding: '0 20px' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#C9A84C', letterSpacing: '1.5px', marginBottom: '6px' }}>
            Refresh Verification Lifecycle
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', margin: 0 }}>
            Post-Refresh Monitoring & Measurement
          </h1>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#999999' }}>
            Loading monitored refresh events...
          </div>
        )}

        {error && (
          <div style={{ backgroundColor: 'rgba(192, 57, 43, 0.15)', border: '1px solid #C0392B', borderRadius: '8px', padding: '16px', color: '#FF6B6B', marginBottom: '24px' }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && !error && (
          <div>
            {events.length === 0 ? (
              <div style={{ backgroundColor: '#141414', border: '1px solid #1E1E1E', borderRadius: '12px', padding: '48px 32px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>📝</div>
                <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
                  No Pages Currently Under Monitoring
                </h2>
                <p style={{ color: '#999999', fontSize: '14px', maxWidth: '480px', margin: '0 auto 24px' }}>
                  When you update a declining page, click "Mark as Refreshed" from its detail page to freeze your baseline and begin 90-day monitoring.
                </p>
                <Link
                  href="/dashboard"
                  style={{
                    backgroundColor: '#C9A84C',
                    color: '#0A0A0A',
                    fontWeight: '600',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                  }}
                >
                  View Priority Action List →
                </Link>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '16px' }}>
                {events.map((ev) => (
                  <div
                    key={ev.id}
                    style={{
                      backgroundColor: '#141414',
                      border: '1px solid #1E1E1E',
                      borderRadius: '12px',
                      padding: '24px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div>
                        <Link
                          href={`/dashboard/pages/${encodeURIComponent(ev.page_url)}`}
                          style={{ fontSize: '16px', fontWeight: '600', color: '#F5F5F5', textDecoration: 'none' }}
                        >
                          {ev.page_url}
                        </Link>
                        <div style={{ fontSize: '13px', color: '#999999', marginTop: '4px' }}>
                          Refreshed on: {new Date(ev.refreshed_at).toLocaleDateString()} {ev.note ? `• "${ev.note}"` : ''}
                        </div>
                      </div>

                      <span
                        style={{
                          backgroundColor: ev.status === 'MONITORING' ? 'rgba(46, 204, 113, 0.15)' : '#1E1E1E',
                          color: ev.status === 'MONITORING' ? '#2ECC71' : '#999',
                          fontSize: '12px',
                          fontWeight: '700',
                          padding: '4px 10px',
                          borderRadius: '4px',
                        }}
                      >
                        {ev.status}
                      </span>
                    </div>

                    {/* Checkpoint Outcome Pills */}
                    <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
                      {[28, 56, 90].map((day) => {
                        const outcomeObj = ev.refresh_outcomes?.find((o) => o.checkpoint_day === day);
                        const verdict = outcomeObj?.outcome || 'TOO_EARLY';
                        const info = outcomeBadges[verdict];

                        return (
                          <div
                            key={day}
                            style={{
                              backgroundColor: info.bg,
                              color: info.color,
                              border: `1px solid ${info.color}33`,
                              borderRadius: '6px',
                              padding: '8px 14px',
                              fontSize: '12px',
                              fontWeight: '600',
                            }}
                          >
                            Day {day} Checkpoint: {info.label}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
