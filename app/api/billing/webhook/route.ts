import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getServiceRoleClient } from '@/lib/db/supabase';
import { recomputeEntitlements } from '@/lib/billing/entitlements';

/**
 * Verifies Dodo Payments webhook HMAC signature.
 */
function verifyDodoSignature(payload: string, signature: string | null): boolean {
  const secret = process.env.DODO_WEBHOOK_SECRET;
  if (!secret) {
    // If secret not configured in dev, skip signature check safely
    return true;
  }
  if (!signature) return false;

  const hmac = crypto.createHmac('sha256', secret);
  const expectedSig = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig));
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-dodo-signature');

    // 1. Signature Verification
    if (!verifyDodoSignature(rawBody, signature)) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const eventId = payload.event_id || payload.id;
    const eventType = payload.type || payload.event_type;
    const data = payload.data || payload;

    const supabase = getServiceRoleClient();

    // 2. Idempotency Check (processed_webhook_events)
    if (eventId) {
      const { data: existing } = await supabase
        .from('processed_webhook_events')
        .select('id')
        .eq('event_id', eventId)
        .maybeSingle();

      if (existing) {
        // Already processed, return 200 OK without re-processing
        return NextResponse.json({ success: true, message: 'Event already processed' });
      }

      // Record event ID
      await supabase.from('processed_webhook_events').insert({
        event_id: eventId,
        provider: 'dodo',
      });
    }

    // 3. Process Webhook Payload
    const userId = data.customer?.metadata?.user_id || data.metadata?.user_id;

    if (userId) {
      if (
        eventType === 'subscription.created' ||
        eventType === 'subscription.updated' ||
        eventType === 'subscription.renewed'
      ) {
        await supabase.from('subscriptions').upsert({
          user_id: userId,
          dodo_customer_id: data.customer_id,
          dodo_subscription_id: data.subscription_id,
          plan: 'pro',
          status: 'active',
          current_period_end: data.current_period_end ? new Date(data.current_period_end).toISOString() : null,
          updated_at: new Date().toISOString(),
        });
        await recomputeEntitlements(userId);
      } else if (eventType === 'subscription.canceled') {
        await supabase
          .from('subscriptions')
          .update({ status: 'canceled', updated_at: new Date().toISOString() })
          .eq('user_id', userId);
        await recomputeEntitlements(userId);
      } else if (eventType === 'payment.failed') {
        await supabase
          .from('subscriptions')
          .update({ status: 'past_due', updated_at: new Date().toISOString() })
          .eq('user_id', userId);
        await recomputeEntitlements(userId);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Webhook processing failed' }, { status: 500 });
  }
}
