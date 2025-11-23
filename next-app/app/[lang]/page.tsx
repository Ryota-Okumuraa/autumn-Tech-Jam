import { Header } from "@/app/components/feature/Header";
import { FeaturedPosts } from "@/app/components/feature/FeaturedPosts";
import { Article } from "@/app/components/feature/Article";
import { Featured } from "@/app/components/feature/Featured"
import { Ranking } from "@/app/components/feature/RankingSection";
import { About } from "@/app/components/feature/About";
import { Footer } from "@/app/components/feature/Footer";
import { FixedBg } from "@/app/components/feature/FixedBg";
import { FV } from "@/app/components/feature/FV";
import { CategoryHead } from "@/app/components/feature/CategoryHead";
import { CategoryPostList } from "@/app/components/feature/CategoryPostList";

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
