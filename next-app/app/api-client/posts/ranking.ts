export interface RankingPostResponse {
  id: string;
  title: string;
  thumbnail: string;
  category: {
    name: string;
  };
  createdAt: Date | string;
}

export async function getRankingPosts(days: number) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/posts/ranking?days=${days}`);
    const data: RankingPostResponse[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching ranking posts:", error);
    return [];
  }
}
