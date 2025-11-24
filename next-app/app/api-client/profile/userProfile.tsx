import { UserProfileResponse } from "@/lib/types/profile";

export async function getUserProfile() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${baseUrl}/user/profile`);
        const data: UserProfileResponse = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
}