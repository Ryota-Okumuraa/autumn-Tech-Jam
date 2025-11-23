import Image from "next/image";
import { Header } from "@/app/components/featured/Header";
import { FeaturedPosts } from "@/app/components/featured/FeaturedPosts";
import { Article } from "@/app/components/featured/Article";
import { Featured } from "@/app/components/featured/Featured"
import { Ranking } from "@/app/components/featured/RankingSection";
import { About } from "@/app/components/featured/About";
import { Footer } from "@/app/components/featured/Footer";
import { FixedBg } from "@/app/components/featured/FixedBg";
import { FV } from "@/app/components/featured/FV";
import { CategoryHead } from "@/app/components/featured/CategoryHead";
import { CategoryPostList } from "@/app/components/featured/CategoryPostList";

export default function Home() {
  return (
    <main className="">
      <FixedBg />
      <Header />
      <FV />
      <FeaturedPosts />
      <Article />
      <Featured />
      <Ranking />
      <About />
      <Footer />
      <CategoryHead />
      <CategoryPostList
        category="food"
      />
    </main>
  );
}
