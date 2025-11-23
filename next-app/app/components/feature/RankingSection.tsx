import Image from "next/image";
import { RankingPostCard } from "./RankingPostCard";

const dummyRanking = [
    {
        id: 1,
        thumbnail: "/dummy.png",
        title: "がっつり・こってり・名古屋めし！",
        date: "2025.11.28",
        author: "味噌ガール0号"
    },
    {
        id: 2,
        thumbnail: "/dummy.png",
        title: "名古屋の隠れたカフェ巡り",
        date: "2025.11.27",
        author: "カフェハンター"
    },
    {
        id: 3,
        thumbnail: "/dummy.png",
        title: "ショッピングモール完全ガイド",
        date: "2025.11.26",
        author: "ショッピングマスター"
    },
    {
        id: 4,
        thumbnail: "/dummy.png",
        title: "名古屋の歴史を巡る旅",
        date: "2025.11.25",
        author: "歴史好き"
    },
    {
        id: 5,
        thumbnail: "/dummy.png",
        title: "名古屋グルメベスト10",
        date: "2025.11.24",
        author: "グルメレポーター"
    },
    {
        id: 6,
        thumbnail: "/dummy.png",
        title: "夜の名古屋を楽しむ",
        date: "2025.11.23",
        author: "ナイトウォーカー"
    },
    {
        id: 7,
        thumbnail: "/dummy.png",
        title: "名古屋の観光スポット",
        date: "2025.11.22",
        author: "観光ガイド"
    },
    {
        id: 8,
        thumbnail: "/dummy.png",
        title: "名古屋の日常を切り取る",
        date: "2025.11.21",
        author: "フォトグラファー"
    }
];

export const Ranking = () => {
    return (
        <section className="py-10 md:pt-30 md:pb-20">
            <div className="md:max-w-[1200px] mx-auto">
                <h2 className="text-[52px] px-4 font-bold">
                    <span className="text-[72px]">R</span>anking
                </h2>
                <div className="overflow-x-scroll flex gap-5 pt-10 px-4 relative h-fit md:gap-6">
                    {dummyRanking.map((ranking, index) => (
                        <RankingPostCard
                            key={ranking.id}
                            id={ranking.id}
                            thumbnail={ranking.thumbnail}
                            title={ranking.title}
                            date={ranking.date}
                            author={ranking.author}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}