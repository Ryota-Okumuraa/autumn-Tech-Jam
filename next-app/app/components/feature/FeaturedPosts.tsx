"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Icon } from "@/app/components/shared/icon";
// import fetchpost

export interface FeaturedPost {
    id: number;
    thumbnail: string;
    title: string;
    date: string;
    author: string;
}

const SCROLL_AMOUNT = 324;

const featuredPosts = [
    {
        id: 1,
        thumbnail: "/dummy.png",
        title: "がっつり・こってり・名古屋めし！ がっつり・こってり・名古屋めし！がっつり・こってり・名古屋めし！",
        date: "2025.11.28",
        author: "味噌ガール0号"
    },
    {
        id: 2,
        thumbnail: "/dummy.png",
        title: "名古屋の隠れた名店を発見！",
        date: "2025.11.27",
        author: "グルメ探検家"
    },
    {
        id: 3,
        thumbnail: "/dummy.png",
        title: "名古屋コーチンの絶品親子丼",
        date: "2025.11.26",
        author: "ご当地グルメ研究家"
    },
];

// 仮コンポーネント
const PostCard = ({ post }: { post: typeof featuredPosts[0] }) => (
    <div className="max-w-[280px] h-fit">
        <Image
            src={post.thumbnail}
            alt={post.title}
            width={500}
            height={500}
            className="max-w-[280px] object-cover rounded-[20px] border-2 border-black"
        />
        <h4 className="mt-4 font-bold line-clamp-2">{post.title}</h4>
        <div className="flex gap-6 items-center mt-3">
            <span className="text-xs">{post.date}</span>
            <span className="text-xs">{post.author}</span>
        </div>
    </div>
)


export const FeaturedPosts = () => {
    const [posts, setPosts] = useState<FeaturedPost[]>([])
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                setIsLoading(true);
                // apifetch
                // const data = await fetchFeaturedPosts();
                //setPosts(data);

                //仮
                const mockData: FeaturedPost[] = featuredPosts;
                setPosts(mockData);
            } catch (error) {
                console.error("Error fetching featured posts:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadPosts();
    }, []); // 言語が変更されたら再取得になる

    if (posts.length === 0 && !isLoading) {
        return (
            <div className="relative md:max-w-[1200px] mx-auto">
                <section className="bg-main py-8 relative md:hidden">
                    <h2 className="absolute top-0 left-4 translate-y-[-50%] border-2 border-black bg-white rounded-full px-8 py-2 text-black font-bold w-fit">
                        Featured Posts
                    </h2>
                    <div className="flex justify-center items-center py-20">
                        <p>投稿がありません</p>
                    </div>
                </section>
                <div className="hidden md:block absolute bottom-13 right-0 w-[440px] bg-black rounded-[30px] p-[2px] mr-3">
                    <div className="bg-main pt-10 pb-3 rounded-[30px] relative">
                        <h2 className="bg-white px-8 py-2 text-black font-bold border-2 border-black w-fit absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full whitespace-nowrap">
                            Featured Posts
                        </h2>
                        <div className="flex justify-center items-center py-20">
                            <p>投稿がありません</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const scrollLeft = () => {
        scrollContainerRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" })
    }

    const scrollRight = () => {
        scrollContainerRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" })
    }

    return (
        <div className="relative md:max-w-[1200px] mx-auto">
            <section className="bg-main py-8 relative md:hidden">
                <h2 className="absolute top-0 left-4 translate-y-[-50%] border-2 border-black bg-white rounded-full px-8 py-2 text-black font-bold w-fit">
                    Featured Posts
                </h2>
                <div className="flex px-4 gap-5 overflow-x-scroll pb-4">
                    {featuredPosts.map((post) => (
                        <div className="max-w-[200px]" key={post.id}>
                            <Image
                                src={post.thumbnail}
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
                        </div>
                    ))}
                </div>
            </section >
            <div className="hidden md:block  absolute bottom-13 right-0 w-[440px] bg-black rounded-[30px] p-[2px] mr-3">
                <div className="bg-main pt-10 pb-3 rounded-[30px] relative">
                    <h2 className=" bg-white px-8 py-2 text-black font-bold border-2 border-black w-fit absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full  whitespace-nowrap">
                        Featured Posts
                    </h2>
                    <div className="relative overflow-hidden">
                        <button
                            onClick={scrollLeft}
                            className="absolute left-3 top-1/2 -translate-y-1/2 z-5 bg-white border-2 border-black rounded-full w-12 h-12 flex items-center justify-center hover:bg-main transition-colors"
                        >
                            <Icon.ArrowLeft className="w-6 h-6" strokeWidth={2} />
                        </button>
                        {/* 右矢印ボタン */}
                        <button
                            onClick={scrollRight}
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-5 bg-white border-2 border-black rounded-full w-12 h-12 flex items-center justify-center hover:bg-main transition-colors"
                        >
                            <Icon.ArrowRight className="w-6 h-6" strokeWidth={2} />
                        </button>
                        {/* スクロール可能なコンテナ */}
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-12 px-20 overflow-x-hidden"
                        >
                            {featuredPosts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}