/**
 * APIから取得するPost型（生データ）
 */
export interface PostFromAPI {
  id: string;
  thumbnail: string;
  title: string;
  createdAt: string | Date;
  category: {
    name: string;
  };
}

/**
 * ランキングAPIから取得するPost型
 */
export interface RankingPostResponse {
  id: string;
  title: string;
  thumbnail: string;
  category: {
    name: string;
  };
  createdAt: string | Date;
}

/**
 * 投稿一覧APIのレスポンス型
 */
export interface PostsResponse {
  success: boolean;
  posts: PostFromAPI[];
  totalCount: number | null;
}

/**
 * 投稿取得APIのパラメータ型
 */
export interface FetchPostsParams {
  category: string;
  offset?: number;
  pageType?: boolean;
}

/**
 * UIで使用するPost型（フォーマット済み）
 */
export interface Post {
  id: string;
  thumbnail: string;
  title: string;
  date: string; // フォーマット済みの日付 (yyyy.mm.dd)
  author: string;
}

/**
 * PostCardコンポーネントのProps型
 */
export type PostCardProps = Post & {
  layout: "row" | "column";
};

/**
 * FeaturedPost型（Postのエイリアス）
 */
export type FeaturedPost = Post;
