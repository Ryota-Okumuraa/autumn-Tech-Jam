"use client";

import { cn } from "@/lib/utiles";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "../sheared/icon";

const tags = ["food", "shopping", "travel", "dummy", "life", "stories"]

interface post {
    id: number;
    thumbnail: string;
    title: string;
    date: string;
    author: string;
}

const dummyPosts: post[] = [
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
export const Article = () => {
    const [posts, setPosts] = useState<post[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("food");
    const [isLoading, setIsLoading] = useState<boolean>(false);


    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                // apifetch
                // const data = await fetchPosts();

                //仮
                const mockData: post[] = dummyPosts;
                setPosts(mockData);

            } catch (error) {
                console.error("Error fetching posts:", error);
                setPosts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [selectedCategory]);

    return (
        <section className="md:pt-15 md:pb-12">
            <div className="md:max-w-[1200px] mx-auto">
                <h2 className="text-[52px] px-4 font-bold">
                    <span className="text-[72px]">A</span>rticle
                </h2>
                <div className="flex gap-4 mx-3 px-[10px] py-2 overflow-x-scroll mt-4 bg-base rounded-full md:justify-between md:mt-12">
                    {tags.map((tag, index) => (
                        <button
                            key={index}
                            className={cn(
                                "rounded-full py-3 px-[62px] text-center text-black md:hover:bg-main transition-all duration-300 ease-in-out",
                                selectedCategory === tag ? "bg-main border-2 border-black" : ""
                            )}
                            onClick={() => setSelectedCategory(tag)}
                        >
                            <span className="font-bold">{tag}</span>
                        </button>
                    ))}
                </div>
                {isLoading ? (
                    <div className="">
                        <p>Loading...</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="">
                        <p>生地がありません</p>
                    </div>
                ) : (
                    <div className="overflow-x-scroll flex gap-5 mt-10 px-4 relative pb-4 md:grid md:grid-cols-4 md:grid-rows-2">
                        {dummyPosts.map((post) => (
                            <Link href={`/posts/${post.id}`} className="max-w-[200px]" key={post.id}>
                                <Image
                                    src={post.thumbnail}
                                    // altはSEO対策で変更
                                    alt={post.title}
                                    width={500}
                                    height={500}
                                    className="max-w-[200px] object-cover rounded-[20px] border-2 border-black"
                                />
                                <h4 className="mt-4 font-bold line-clamp-2">
                                    {post.title}
                                </h4>
                                <div className="flex gap-6 items-center mt-3">
                                    <span className="text-xs">{post.date}</span>
                                    <span className="text-xs">{post.author}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                <div className="flex items-center justify-center mt-10 mb-15 md:justify-end">
                    <Link
                        href="/"
                        className="relative border-2 border-black rounded-full w-[184px] h-12 flex items-center justify-center bg-base hover:bg-main transition-all duration-300 ease-in-out"
                    >
                        <span>More</span>
                        <Icon.ArrowDown strokeWidth={1} className="absolute right-8 top-1/2 -translate-y-1/2" />
                    </Link>
                </div>
            </div>
        </section >
    )
}