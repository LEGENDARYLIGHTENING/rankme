'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BillingSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [disconnected, setDisconnected] = useState(false);

  const handleDisconnect = async () => {
    if (!confirm('Are you sure you want to disconnect Google Search Console? This will stop daily syncs and schedule historical metric deletion.')) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/properties/disconnect', { method: 'POST' });
      const data = await res.json();
      if (data.status === 'disconnected') {
        setDisconnected(true);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A0A0A', color: '#F5F5F5', fontFamily: 'Inter, sans-serif', paddingBottom: '60px' }}>
      
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
              <Link href="/dashboard/monitoring" style={{ color: '#999999', textDecoration: 'none' }}>
                Refresh Monitoring
              </Link>
              <Link href="/settings/billing" style={{ color: '#C9A84C', borderBottom: '2px solid #C9A84C', paddingBottom: '4px', textDecoration: 'none' }}>
                Settings & Billing
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '40px auto 0', padding: '0 20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px' }}>
          Subscription & Property Settings
        </h1>

        {/* Current Plan Box */}
        <div style={{ backgroundColor: '#141414', border: '1px solid #1E1E1E', borderRadius: '12px', padding: '28px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#999999', textTransform: 'uppercase' }}>Active Subscription</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#C9A84C', marginTop: '4px' }}>
                Pro Tier Plan
              </div>
            </div>
            <span style={{ backgroundColor: 'rgba(46, 204, 113, 0.15)', color: '#2ECC71', fontSize: '12px', fontWeight: '700', padding: '4px 10px', borderRadius: '4px' }}>
              ACTIVE
            </span>
          </div>

          <p style={{ color: '#999999', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
            Your subscription includes continuous daily GSC metric syncs, query concentration evidence analysis, 90-day decay recalculation, and automated post-refresh monitoring.
          </p>

          <button
            onClick={() => alert('Dodo Payments Billing Portal integration active.')}
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
            Manage Billing & Payment Method
          </button>
        </div>

        {/* Property Disconnect Box */}
        <div style={{ backgroundColor: '#141414', border: '1px solid rgba(192, 57, 43, 0.3)', borderRadius: '12px', padding: '28px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#FF6B6B', marginBottom: '8px' }}>
            Disconnect Google Search Console
          </h3>
          <p style={{ color: '#999999', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
            Disconnecting will revoke DecayCheck's access tokens and remove your active property connection.
          </p>

          {disconnected ? (
            <div style={{ color: '#FF6B6B', fontWeight: '600' }}>
              ✓ Google Search Console property disconnected.
            </div>
          ) : (
            <button
              onClick={handleDisconnect}
              disabled={loading}
              style={{
                backgroundColor: 'rgba(192, 57, 43, 0.15)',
                color: '#FF6B6B',
                border: '1px solid #C0392B',
                borderRadius: '6px',
                padding: '10px 20px',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              {loading ? 'Disconnecting...' : 'Disconnect Property & Revoke OAuth'}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
