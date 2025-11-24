"use server";
import { RankingPostResponse } from "@/lib/types/post";
import { cookies } from "next/headers";

export async function getRankingPosts(days: number) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const cookieStore = await cookies();

    // Cookieヘッダーを構築
    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    const res = await fetch(`${baseUrl}/posts/ranking?days=${days}`, {
      cache: "no-store",
      headers: {
        Cookie: cookieHeader, // Cookieヘッダーを設定
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch ranking posts: ${res.status}`);
    }

    const data: RankingPostResponse[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching ranking posts:", error);
    return [];
  }
}
