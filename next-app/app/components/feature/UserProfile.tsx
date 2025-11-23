"use client";

import { useState, useEffect } from "react";

interface User {
    id: number;
    name: string;
    email: string;
}

export const UserProfile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     const loadUser = async () => {
    //         try {
    //             setIsLoading(true);
    //             const userData = await fetchUser();
    //             setUser(userData);
    //         } catch (err) {
    //             setError(err instanceof Error ? err.message : "エラーが発生しました");
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     loadUser();
    // }, []);

    if (isLoading) {
        return (
            <div className="pb-10">
                <p className="font-bold">Loading...</p>
            </div>
        )
    }

    if (!user) {
        return null;
    }

    return (
        <div className="pb-10">
            <p className="font-bold">{user.name}</p>
            <p className="text-[#B0B0B0] text-xs">{user.email}</p>
        </div>
    )
}
