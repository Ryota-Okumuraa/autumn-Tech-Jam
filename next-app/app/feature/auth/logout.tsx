"use client";
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Logout() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    setIsSubmitting(true);
    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <button onClick={handleLogout} disabled={isSubmitting}>
      Logout
    </button>
  )
}