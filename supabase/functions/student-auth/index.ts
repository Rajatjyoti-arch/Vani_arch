import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AuthRequest {
  action: "login" | "register" | "check";
  enrollment_no: string;
  email: string;
  password?: string;
}

// Simple hash function for passwords (using Web Crypto API)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Generate a unique ghost name
function generateGhostName(): string {
  const adjectives = ["Silent", "Shadow", "Phantom", "Mystic", "Crypto", "Stealth", "Hidden", "Veiled", "Masked", "Ghost"];
  const nouns = ["Witness", "Voice", "Observer", "Guardian", "Sentinel", "Watcher", "Speaker", "Advocate", "Reporter", "Agent"];
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${randomNum}`;
}

// Generate a random avatar emoji
function generateAvatar(): string {
  const avatars = ["👻", "🎭", "🦊", "🐺", "🦉", "🐲", "🦅", "🐈‍⬛", "🕵️", "🥷"];
  return avatars[Math.floor(Math.random() * avatars.length)];
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, enrollment_no, email, password }: AuthRequest = await req.json();

    // Validate inputs
    if (!enrollment_no || !email) {
      return new Response(
        JSON.stringify({ error: "Enrollment number and email are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if user exists
    const { data: existingProfile, error: lookupError } = await supabase
      .from("student_profiles")
      .select("*")
      .eq("email", email.toLowerCase())
      .eq("enrollment_no", enrollment_no.toUpperCase())
      .maybeSingle();

    if (lookupError) {
      console.error("Profile lookup error:", lookupError);
      return new Response(
        JSON.stringify({ error: "Failed to check user" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // ACTION: CHECK - Just check if user exists and has password
    if (action === "check") {
      if (!existingProfile) {
        return new Response(
          JSON.stringify({ exists: false, hasPassword: false }),
          { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      return new Response(
        JSON.stringify({ 
          exists: true, 
          hasPassword: !!existingProfile.password_hash 
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // For login and register, password is required
    if (!password) {
      return new Response(
        JSON.stringify({ error: "Password is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return new Response(
        JSON.stringify({ error: "Password must be at least 6 characters" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const passwordHash = await hashPassword(password);

    // ACTION: REGISTER - Create new user or set password for existing user without password
    if (action === "register") {
      if (existingProfile && existingProfile.password_hash) {
        return new Response(
          JSON.stringify({ error: "Account already exists. Please login instead." }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      if (existingProfile) {
        // Update existing profile with password
        const { data: updatedProfile, error: updateError } = await supabase
          .from("student_profiles")
          .update({ 
            password_hash: passwordHash,
            is_verified: true 
          })
          .eq("id", existingProfile.id)
          .select()
          .single();

        if (updateError) {
          console.error("Profile update error:", updateError);
          return new Response(
            JSON.stringify({ error: "Failed to create password" }),
            { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        }

        return new Response(
          JSON.stringify({ 
            success: true, 
            profile: {
              id: updatedProfile.id,
              enrollment_no: updatedProfile.enrollment_no,
              email: updatedProfile.email,
              ghost_name: updatedProfile.ghost_name,
              avatar: updatedProfile.avatar,
              reputation: updatedProfile.reputation,
              reports_submitted: updatedProfile.reports_submitted,
              created_at: updatedProfile.created_at,
            }
          }),
          { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      // Create new profile
      const { data: newProfile, error: createError } = await supabase
        .from("student_profiles")
        .insert({
          enrollment_no: enrollment_no.toUpperCase(),
          email: email.toLowerCase(),
          ghost_name: generateGhostName(),
          avatar: generateAvatar(),
          password_hash: passwordHash,
          is_verified: true,
        })
        .select()
        .single();

      if (createError) {
        console.error("Profile creation error:", createError);
        return new Response(
          JSON.stringify({ error: "Failed to create account" }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          profile: {
            id: newProfile.id,
            enrollment_no: newProfile.enrollment_no,
            email: newProfile.email,
            ghost_name: newProfile.ghost_name,
            avatar: newProfile.avatar,
            reputation: newProfile.reputation,
            reports_submitted: newProfile.reports_submitted,
            created_at: newProfile.created_at,
          }
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // ACTION: LOGIN - Verify password
    if (action === "login") {
      if (!existingProfile) {
        return new Response(
          JSON.stringify({ error: "Account not found. Please register first." }),
          { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      if (!existingProfile.password_hash) {
        return new Response(
          JSON.stringify({ error: "Please create a password first", needsPassword: true }),
          { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      if (existingProfile.password_hash !== passwordHash) {
        return new Response(
          JSON.stringify({ error: "Invalid password" }),
          { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          profile: {
            id: existingProfile.id,
            enrollment_no: existingProfile.enrollment_no,
            email: existingProfile.email,
            ghost_name: existingProfile.ghost_name,
            avatar: existingProfile.avatar,
            reputation: existingProfile.reputation,
            reports_submitted: existingProfile.reports_submitted,
            created_at: existingProfile.created_at,
          }
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid action" }),
      { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: unknown) {
    console.error("Error in student-auth:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
