interface fetchPostsParams {
  category: string;
  offset?: number;
  pageType?: boolean;
}

export interface Post {
  id: string;
  thumbnail: string;
  title: string;
  createdAt: string;
  category: {
    name: string;
  };
}

export interface PostsResponse {
  success: boolean;
  posts: Post[];
  totalCount: number;
}

export async function getPosts({ category, offset = 0, pageType = false }: fetchPostsParams) {
  try {
    const params = new URLSearchParams({
      category,
      offset: offset.toString(),
      pageType: pageType.toString(),
    });
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${baseUrl}/posts?${params.toString()}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data: PostsResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      success: false,
      posts: [],
      totalCount: 0,
    };
  }
}
