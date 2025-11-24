"use client";

import { getUserProfile } from "@/app/api-client/profile/userProfile";
import { useState, useEffect } from "react";
import { UserProfileResponse } from "@/lib/types/profile";

export const UserProfile = () => {
  const [user, setUser] = useState<UserProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getUserProfile();
        // nullチェックを追加
        if (userData) {
          setUser({
            id: userData.id,
            name: userData.name,
            email: userData.email,
          });
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        // エラー時も明示的にnullを設定
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  if (isLoading) {
    return (
      <div className="pb-10">
        <p className="font-bold">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="pb-10">
      <p className="font-bold">{user.name}</p>
      <p className="text-[#B0B0B0] text-xs">{user.email}</p>
    </div>
  );
};
