import Image from "next/image";

import { getTranslations } from "next-intl/server";
import { Header } from "@/app/components/shared/Header";
import { ArticleList } from "@/app/components/feature/top/ArticleList";
import { FeaturedList } from "@/app/components/feature/top/FeaturedList"
import { FeaturedPosts } from "@/app/components/feature/top/FeaturedPost";
import { Ranking } from "@/app/components/feature/top/RankingSection";
import { Footer } from "@/app/components/shared/Footer";

export default async function Home() {
  const t = await getTranslations("home");
  return (
    <main className="">
      <div className="hidden fixed top-0 left-0 w-screen h-screen md:block -z-10">
        <Image
          src="/bg.png"
          alt="background image"
          width={1000}
          height={1000}
          className="w-full h-full"
        />
      </div>
      <Header />
      {/* FV */}
      <section className="h-screen w-full">
        <Image
          src="/fv-illust.png"
          alt="FV"
          width={500}
          height={500}
          className="w-full h-full object-cover" />
      </section>
      {/* FeaturedPosts */}

      <FeaturedPosts />
      {/* ArticleList*/}
      <section className="md:pt-15 md:pb-12">
        <div className="md:max-w-[1200px] mx-auto">
          <h2 className="text-[52px] px-4 font-bold">
            <span className="text-[72px]">{t("articleFirst")}</span>{t("articleSubTitle")}
          </h2>
          <ArticleList />
        </div>
      </section>
      {/* FeaturedList*/}
      <section className="rounded-[26px] bg-main/60 backdrop-blur-md py-10 md:py-12">
        <div className="md:max-w-[1200px] mx-auto">
          <h2 className="text-[28px] px-4 font-bold md:text-[40px]">
            <span className="text-[38px] md:text-[52px]">{t("featuredFirst")}</span>{t("featuredSubTitle")}
          </h2>
          <FeaturedList />
        </div>
      </section>
      {/* Ranking */}
      <section className="py-10 md:pt-30 md:pb-20">
        <div className="md:max-w-[1200px] mx-auto relative">
          <h2 className="text-[52px] px-4 font-bold">
            <span className="text-[72px]">{t("rankingFirst")}</span>{t("rankingSubTitle")}
          </h2>
          <div className="absolute top-3 right-13 md:left-[320px] md:top-0 md:right-0 md:w-fit">
            <Image
              src="/home-ranking.png"
              alt="ranking"
              width={500}
              height={500}
              className="w-20 h-20 object-cover md:w-30 md:h-30"
            />
          </div>
          <Ranking />
        </div>
      </section>
      {/** About */}
      <section className="bg-main/60 mr-4 pl-4 rounded-r-[20px] py-30 mt-10 mb-4">
        <div className="md:max-w-[1200px] flex items-center mx-auto">
          <div className="flex-1">
            <p className="text-xl">
              {t("aboutText")}
            </p>
          </div>
          <div className="flex-1 hidden md:block">
            <Image src="/about.png" alt="about" width={500} height={500} />
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </main>
  );
}
