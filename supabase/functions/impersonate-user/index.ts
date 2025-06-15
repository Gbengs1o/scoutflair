// supabase/functions/handle-signup/index.ts

// Imports type definitions for Deno and Supabase runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

console.log("handle-signup function initialized");

// The main server function that handles incoming requests
Deno.serve(async (req) => {
  // 1. Handle CORS preflight requests
  // This is a security requirement for browsers.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 2. Extract the user's data from the request body
    const { email, password, fullName, intendedRole, profileData } = await req.json();

    // Basic validation
    if (!email || !password || !fullName || !intendedRole) {
      throw new Error("Missing required fields: email, password, fullName, or intendedRole.");
    }

    // 3. Create a Supabase client with admin privileges to perform secure operations
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // 4. Check if the user's email is on the admin whitelist
    const { data: adminData, error: adminError } = await supabaseAdmin
      .from('admin_whitelist')
      .select('email')
      .eq('email', email)
      .single();

    // Note: We ignore the 'PGRST116' error which means "row not found"
    if (adminError && adminError.code !== 'PGRST116') {
      throw adminError;
    }

    // 5. Determine the user's final role. If they are on the whitelist, they become an ADMIN.
    const finalRole = adminData ? 'ADMIN' : intendedRole.toUpperCase();

    // 6. Create the new user in Supabase Authentication
    const { data: { user }, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true, // Auto-confirm the user so they can log in right away
    });

    if (authError || !user) {
      throw authError || new Error("User creation failed in Supabase Auth.");
    }

    // 7. Create the user's profile in the 'profiles' table with all their data
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: user.id,
        full_name: fullName,
        role: finalRole,
        ...profileData // Merge extra data like position, dob, etc.
      });

    if (profileError) {
      // If profile creation fails, we should ideally delete the auth user
      // to prevent an orphaned account. This is an advanced step.
      // For now, we'll just throw the error.
      throw profileError;
    }

    // 8. If everything is successful, return a success message
    return new Response(JSON.stringify({ message: 'User created successfully' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200, // OK
    });
  } catch (error) {
    // If any error occurs in the 'try' block, catch it and return a detailed error response
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400, // Bad Request
    });
  }
});