import { PostCard } from "@/app/components/shared/PostCard";
import { getRankingPosts } from "@/app/api-client/posts/ranking";
import { formatDate } from "@/lib/date";

export interface FeaturedPost {
  id: string;
  thumbnail: string;
  title: string;
  date: string;
  author: string;
}

export const FeaturedList = async () => {
  let featuredPosts: FeaturedPost[] = [];

  try {
    const res = await getRankingPosts(7);
    featuredPosts = res.map((post) => ({
      id: post.id,
      title: post.title,
      thumbnail: post.thumbnail,
      date: post.createdAt.toString(),
      author: post.category.name,
    }));
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    featuredPosts = [];
  }

  return (
    <div className="overflow-x-scroll flex gap-5 mt-4 px-4 pb-4 md:mt-12 md:grid md:grid-cols-4 md:gap-10">
      {featuredPosts.map((post) => (
        <PostCard
          key={post.id.toString()}
          id={post.id}
          title={post.title}
          thumbnail={post.thumbnail}
          date={formatDate(post.date)}
          author={post.author}
          layout="column"
        />
      ))}
    </div>
  );
};
