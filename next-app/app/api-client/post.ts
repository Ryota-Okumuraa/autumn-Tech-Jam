import { PostResponse } from "@/lib/types/post";

export async function getPost(id: string) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${baseUrl}/post/${id}`);
        const data: PostResponse = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching post:", error);
    }
}