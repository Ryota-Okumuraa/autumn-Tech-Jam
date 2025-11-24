import { RankingPostResponse } from "@/lib/types/post";

export async function getRankingPosts(days: number) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/posts/ranking?days=${days}`, {
      cache: "no-store",
    });
    const data: RankingPostResponse[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching ranking posts:", error);
    return [];
  }
}
