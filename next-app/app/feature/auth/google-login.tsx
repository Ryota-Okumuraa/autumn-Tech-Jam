"use client";
import { createClient } from "@/utils/supabase/client"

// googleログインボタン
export default function GoogleLogin() {
  const handleGoogleLogin = async () => {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options : {
        redirectTo : `${window.location.origin}/api/auth/callback?next=/`
      }
    })
    if (error) {
      console.error(error);
    }
  }
  return (
    <button onClick={handleGoogleLogin}>
      googleログイン
    </button>
  )
}