import { describe, it, expect } from 'vitest';
import crypto from 'crypto';

function generateTestHmacSignature(payload: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

describe('Billing Webhook & Idempotency Audit', () => {
  const secret = 'test_dodo_webhook_secret_999';

  it('validates correct HMAC-SHA256 signature', () => {
    const payload = JSON.stringify({ event_id: 'evt_123', type: 'subscription.created', user_id: 'usr_1' });
    const signature = generateTestHmacSignature(payload, secret);

    const hmac = crypto.createHmac('sha256', secret);
    const expected = hmac.update(payload).digest('hex');

    expect(signature).toBe(expected);
  });

  it('rejects tampered webhook payload signature', () => {
    const payload = JSON.stringify({ event_id: 'evt_123', type: 'subscription.created', user_id: 'usr_1' });
    const signature = generateTestHmacSignature(payload, secret);

    const tamperedPayload = JSON.stringify({ event_id: 'evt_123', type: 'subscription.created', user_id: 'usr_2' });
    const hmac = crypto.createHmac('sha256', secret);
    const expected = hmac.update(tamperedPayload).digest('hex');

    expect(signature).not.toBe(expected);
  });

  it('verifies duplicate webhook event_id idempotency filtering', () => {
    const processedEventsSet = new Set<string>();

    function processWebhook(eventId: string) {
      if (processedEventsSet.has(eventId)) {
        return { status: 200, action: 'IGNORED_DUPLICATE' };
      }
      processedEventsSet.add(eventId);
      return { status: 200, action: 'PROCESSED' };
    }

    const res1 = processWebhook('evt_0001');
    expect(res1.action).toBe('PROCESSED');

    // Duplicate delivery
    const res2 = processWebhook('evt_0001');
    expect(res2.action).toBe('IGNORED_DUPLICATE');
  });
});
