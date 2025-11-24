"use client";
import { useRouter } from "@/i18n/routing";
import { createClient } from "@/utils/supabase/client";

import { useState } from "react";

export default function Logout() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    setIsSubmitting(true);
    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <button onClick={handleLogout} disabled={isSubmitting}>
      Logout
    </button>
  );
}
