export async function getPopularPosts(category: string, limit: number) {
    try {
        const params = new URLSearchParams({
            category,
            limit: limit.toString() || "4",
        });
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${baseUrl}/posts/popular?${params.toString()}`;
        const res = await fetch(url, {
            cache: "no-store"
        });
        if (!res.ok) {
            throw new Error("Failed to fetch popular posts");
        }
        const data = await res.json();
        return {
            success: data.success || false,
            posts: data.posts || [],
        }
    } catch (error) {
        console.error("Error fetching popular posts:", error);
    }
}