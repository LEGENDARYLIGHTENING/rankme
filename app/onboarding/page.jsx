'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [properties, setProperties] = useState([]);
  const [selectedSite, setSelectedSite] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Read code query param if redirected from Google OAuth
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      if (code) {
        setAuthCode(code);
        setStep(2);
        handleExchangeCode(code);
      }
    }
  }, []);

  const handleStartOAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/poc/gsc?action=auth_url');
      const data = await res.json();
      if (data.authUrl) {
        window.location.href = data.authUrl;
      } else {
        setError('Failed to generate Google Auth URL');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExchangeCode = async (codeToUse) => {
    setLoading(true);
    setError(null);
    try {
      // Mock user ID for local onboarding setup (or real user ID from auth context)
      const userId = '00000000-0000-0000-0000-000000000001';
      const res = await fetch('/api/oauth/google/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeToUse || authCode, userId }),
      });
      const data = await res.json();
      if (data.success && data.properties) {
        setProperties(data.properties);
        setStep(3);
      } else {
        setError(data.error || 'Failed to exchange authorization code');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectProperty = async () => {
    if (!selectedSite) return;
    setLoading(true);
    setError(null);
    try {
      const userId = '00000000-0000-0000-0000-000000000001';
      const selectedProp = properties.find((p) => p.siteUrl === selectedSite);
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          gscSiteUrl: selectedSite,
          propertyType: selectedProp?.propertyType,
          displayName: selectedProp?.displayName,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.error || 'Failed to connect property');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A0A0A', color: '#F5F5F5', padding: '40px 20px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ color: '#C9A84C', fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
            DecayCheck by Rankur
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '12px' }}>
            Connect Google Search Console
          </h1>
          <p style={{ color: '#999999', fontSize: '15px', maxWidth: '540px', margin: '0 auto' }}>
            DecayCheck requires read-only access to your Google Search Console to detect declining content and quantify recovery opportunities.
          </p>
        </div>

        {/* Wizard Steps Indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
          {['1. Authorize GSC', '2. Verify Account', '3. Select Property'].map((title, idx) => (
            <div
              key={idx}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                backgroundColor: step === idx + 1 ? '#C9A84C' : '#141414',
                color: step === idx + 1 ? '#0A0A0A' : '#999999',
                border: '1px solid #1E1E1E',
              }}
            >
              {title}
            </div>
          ))}
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{ backgroundColor: 'rgba(192, 57, 43, 0.15)', border: '1px solid #C0392B', borderRadius: '8px', padding: '16px', color: '#FF6B6B', marginBottom: '24px', fontSize: '14px' }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Step 1: Connect GSC */}
        {step === 1 && (
          <div style={{ backgroundColor: '#141414', border: '1px solid #1E1E1E', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
            <div style={{ marginBottom: '24px' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                <path d="M2 12h20"/>
              </svg>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
              Read-Only GSC Authorization
            </h2>
            <p style={{ color: '#999999', fontSize: '14px', marginBottom: '24px', lineHeight: '1.6' }}>
              We only request <code style={{ color: '#C9A84C' }}>webmasters.readonly</code> permissions. DecayCheck will never alter your website or search configuration.
            </p>
            <button
              onClick={handleStartOAuth}
              disabled={loading}
              style={{
                backgroundColor: '#C9A84C',
                color: '#0A0A0A',
                fontWeight: '600',
                padding: '12px 28px',
                borderRadius: '6px',
                fontSize: '15px',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              {loading ? 'Redirecting to Google...' : 'Connect Google Search Console →'}
            </button>
          </div>
        )}

        {/* Step 2: Verification / Code Exchange */}
        {step === 2 && (
          <div style={{ backgroundColor: '#141414', border: '1px solid #1E1E1E', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
              Exchanging Google Credentials
            </h2>
            <p style={{ color: '#999999', fontSize: '14px', marginBottom: '24px' }}>
              Verifying read-only token security and querying available Search Console properties...
            </p>
            {loading && <div style={{ color: '#C9A84C', fontSize: '14px' }}>Loading accessible properties...</div>}
          </div>
        )}

        {/* Step 3: Select Property */}
        {step === 3 && !success && (
          <div style={{ backgroundColor: '#141414', border: '1px solid #1E1E1E', borderRadius: '12px', padding: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
              Select Property to Monitor
            </h2>
            <p style={{ color: '#999999', fontSize: '14px', marginBottom: '24px' }}>
              Choose the primary Google Search Console property for decay analysis.
            </p>

            {properties.length === 0 ? (
              <p style={{ color: '#FF6B6B' }}>No GSC properties found for this Google account.</p>
            ) : (
              <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                {properties.map((prop) => (
                  <label
                    key={prop.siteUrl}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '14px 18px',
                      borderRadius: '8px',
                      border: selectedSite === prop.siteUrl ? '2px solid #C9A84C' : '1px solid #1E1E1E',
                      backgroundColor: selectedSite === prop.siteUrl ? 'rgba(201, 168, 76, 0.08)' : '#0A0A0A',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name="gscProperty"
                      value={prop.siteUrl}
                      checked={selectedSite === prop.siteUrl}
                      onChange={(e) => setSelectedSite(e.target.value)}
                      style={{ marginRight: '12px', accentColor: '#C9A84C' }}
                    />
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '15px' }}>{prop.displayName}</div>
                      <div style={{ fontSize: '12px', color: '#999999' }}>
                        Type: {prop.propertyType} | Permission: {prop.permissionLevel}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}

            <button
              onClick={handleConnectProperty}
              disabled={loading || !selectedSite}
              style={{
                backgroundColor: selectedSite ? '#C9A84C' : '#333333',
                color: selectedSite ? '#0A0A0A' : '#777777',
                fontWeight: '600',
                padding: '12px 28px',
                borderRadius: '6px',
                fontSize: '15px',
                cursor: selectedSite ? 'pointer' : 'not-allowed',
                border: 'none',
                width: '100%',
              }}
            >
              {loading ? 'Starting Initial Historical Sync...' : 'Start Decay Analysis →'}
            </button>
          </div>
        )}

        {/* Success / Redirect State */}
        {success && (
          <div style={{ backgroundColor: '#141414', border: '1px solid #C9A84C', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
            <div style={{ color: '#C9A84C', fontSize: '36px', marginBottom: '12px' }}>✓</div>
            <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>
              Property Connected Successfully!
            </h2>
            <p style={{ color: '#999999', fontSize: '14px', marginBottom: '24px' }}>
              Initial historical sync has been queued. DecayCheck is analyzing past rolling 90-day performance periods.
            </p>
            <Link
              href="/dashboard"
              style={{
                display: 'inline-block',
                backgroundColor: '#C9A84C',
                color: '#0A0A0A',
                fontWeight: '600',
                padding: '12px 28px',
                borderRadius: '6px',
                textDecoration: 'none',
              }}
            >
              Open Dashboard →
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
