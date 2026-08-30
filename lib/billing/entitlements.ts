import { getServiceRoleClient } from '@/lib/db/supabase';

/**
 * Recomputes user entitlement flags based on their current active subscription status.
 */
export async function recomputeEntitlements(userId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = getServiceRoleClient();

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single();

  const isActive = sub?.status === 'active';
  const isPro = sub?.plan === 'pro' && isActive;

  const entitlementFlags = {
    user_id: userId,
    has_ongoing_sync: isPro,
    has_query_analysis: isPro,
    has_refresh_tracking: isPro,
    has_monitoring: isPro,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from('entitlements')
    .upsert(entitlementFlags, { onConflict: 'user_id' });

  if (error) {
    return { success: false, error: error.message };
  }

  // Also cache subscription_status on user profile
  await supabase
    .from('users')
    .update({ subscription_status: sub?.status || 'free' })
    .eq('id', userId);

  return { success: true };
}
