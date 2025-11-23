import Image from "next/image";
// import fetchfeaturedposts

export interface FeaturedPost {
    id: number;
    thumbnail: string;
    title: string;
    date: string;
    author: string;
}

export const Featured = async () => {
    let featuredPosts: FeaturedPost[] = [];

    try {
        // TODO: API取得関数を呼び出す（後で実装）
        // featuredPosts = await fetchFeaturedPosts();

        // 仮データ
        featuredPosts = [
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
        ];
    } catch (error) {
        console.error("Error fetching featured posts:", error);
        featuredPosts = [];
    }

    return (
        <section className="rounded-[26px] bg-main/60 backdrop-blur-md py-10 md:py-12">
            <div className="md:max-w-[1200px] mx-auto">
                <h2 className="text-[28px] px-4 font-bold md:text-[40px]">
                    <span className="text-[38px] md:text-[52px]">E</span>vents in Nagoya !!
                </h2>
                <div className="overflow-x-scroll flex gap-5 mt-4 px-4 pb-4 md:mt-12 md:grid md:grid-cols-4 md:gap-10">
                    {featuredPosts.map((featuredPost) => (
                        <div className="max-w-[200px]" key={featuredPost.id}>
                            <Image
                                src={featuredPost.thumbnail}
                                // altはSEO対策で変更
                                alt={featuredPost.title}
                                width={500}
                                height={500}
                                className="max-w-[200px] object-cover rounded-[20px] border-2 border-black"
                            />
                            <h4 className="mt-4 font-bold line-clamp-2">
                                {featuredPost.title}
                            </h4>
                            <div className="flex gap-6 items-center mt-3">
                                <span className="text-xs">{featuredPost.date}</span>
                                <span className="text-xs">{featuredPost.author}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}