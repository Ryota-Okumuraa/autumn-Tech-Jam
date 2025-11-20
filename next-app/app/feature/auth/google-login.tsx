"use client";
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation";
import { useState } from "react";

// googleログインボタン
export default function GoogleLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
        const supabase = await createClient();
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options : {
            // nextのクエリがログイン後のリダイレクト先になる
            redirectTo : `${window.location.origin}/api/auth/callback?next=/profile`
          }
        })
        if (error) {
          console.error(error);
        }
    } catch (error) {
        console.error(error);
    } finally {
        setIsSubmitting(false);
    }
  }
  return (
    <button onClick={handleGoogleLogin}
    disabled={isSubmitting}
    >
      googleログイン
    </button>
  )
}