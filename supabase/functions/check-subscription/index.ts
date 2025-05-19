
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.35.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    // Get the user from the request
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Not authenticated" }),
        { 
          status: 401, 
          headers: { 
            "Content-Type": "application/json", 
            ...corsHeaders 
          } 
        }
      );
    }

    // For now, we'll return mock subscription data based on the user's email
    // In a real implementation, this would check against a Stripe subscription
    
    // This is a simple mock implementation where we check if the email contains certain keywords
    // to determine the subscription tier. In a real implementation, you would query your database
    // or Stripe to get the actual subscription status.
    const email = user.email?.toLowerCase() || '';
    let subscriptionTier = null;
    
    if (email.includes('power') || email.includes('admin')) {
      subscriptionTier = 'Power';  // White label enabled
    } else if (email.includes('ultimate')) {
      subscriptionTier = 'Ultimate';
    } else if (email.includes('pro')) {
      subscriptionTier = 'Pro';
    } else if (email.includes('basic')) {
      subscriptionTier = 'Basic';
    }
    
    const subscriptionData = {
      subscribed: subscriptionTier !== null,
      subscription_tier: subscriptionTier,
      active_until: subscriptionTier ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : null, // 30 days from now
      features: {
        whiteLabel: subscriptionTier === 'Power',
        chatbot: ['Ultimate', 'Power'].includes(subscriptionTier || ''),
        prioritySupport: ['Ultimate', 'Power'].includes(subscriptionTier || '')
      }
    };

    return new Response(
      JSON.stringify(subscriptionData),
      { 
        status: 200, 
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        } 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        } 
      }
    );
  }
});
