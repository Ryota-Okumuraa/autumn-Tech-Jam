"use client";

import { RankingPostCard } from "../../shared/RankingPostCard";
import { getRankingPosts } from "@/app/api-client/posts/ranking";
import { useState, useEffect } from "react";
import { formatDate } from "@/lib/date";

interface post {
  id: string;
  thumbnail: string;
  title: string;
  date: string;
  author: string;
}

export const Ranking = () => {
  const [rankingPosts, setRankingPosts] = useState<post[]>([]);
  useEffect(() => {
    const fetchRankingPosts = async () => {
      const data = await getRankingPosts(7);
      setRankingPosts(
        data.map((post) => ({
          id: post.id,
          thumbnail: post.thumbnail,
          title: post.title,
          date: post.createdAt.toString(),
          author: post.category.name,
        }))
      );
    };
    fetchRankingPosts();
  }, []);
  return (
    <div className="overflow-x-scroll flex gap-5 pt-10 px-4 relative h-fit md:gap-6">
      {rankingPosts.map((ranking, index) => (
        <RankingPostCard
          key={ranking.id}
          id={Number(ranking.id)}
          thumbnail={ranking.thumbnail}
          title={ranking.title}
          date={formatDate(ranking.date)}
          author={ranking.author}
          index={index}
        />
      ))}
    </div>
  );
};
