import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/app/components/shared/Header';
import { Footer } from '@/app/components/shared/Footer';
import { Icon } from '@/app/components/shared/icon';

// 有効なカテゴリーの定義
const VALID_CATEGORIES = ['food', 'shopping', 'culture', 'guide', 'cafe', 'stories'] as const;
type Category = typeof VALID_CATEGORIES[number];

interface Post {
    id: number;
    thumbnail: string;
    title: string;
    date: string;
    author: string;
    category: string;
}

// カテゴリー名のマッピング
const categoryLabels: Record<Category, string> = {
    food: 'Food',
    shopping: 'Shopping',
    culture: 'Culture',
    guide: 'Guide',
    cafe: 'Cafe',
    stories: 'Stories',
};

// カテゴリー別の投稿を取得（将来的にAPIから取得）
async function getPostsByCategory(category: string): Promise<Post[]> {
    // TODO: APIから取得
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?category=${category}`);
    // return res.json();

    // 仮データ
    return [
        {
            id: 1,
            thumbnail: "/dummy.png",
            title: "がっつり・こってり・名古屋めし！",
            date: "2025.11.28",
            author: "味噌ガール0号",
            category: category,
        },
        // ... 他の投稿
    ];
}

interface CategoryPageProps {
    params: {
        category: string;
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params;

    // カテゴリーのバリデーション
    if (!VALID_CATEGORIES.includes(category as Category)) {
        notFound();
    }

    // 投稿を取得
    const posts = await getPostsByCategory(category);
    const categoryLabel = categoryLabels[category as Category];

    return (
        <main>
            <Header />
            <section className="md:pt-15 md:pb-12">
                <div className="md:max-w-[1200px] mx-auto">
                    {/* カテゴリー名の表示 */}
                    <h1 className="text-[52px] px-4 font-bold">
                        <span className="text-[72px]">{categoryLabel[0]}</span>
                        {categoryLabel.slice(1)}
                    </h1>
                    {/* 投稿一覧 */}
                    {posts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-lg">このカテゴリーには投稿がありません</p>
                        </div>
                    ) : (
                        <div className="overflow-x-scroll flex gap-5 mt-10 px-4 relative pb-4 md:grid md:grid-cols-4 md:grid-rows-2">
                            {posts.map((post) => (
                                <Link
                                    href={`/posts/${post.id}`}
                                    className="max-w-[200px]"
                                    key={post.id}
                                >
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
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* 戻るボタン */}
                    <div className="flex items-center justify-center mt-10 mb-15 md:justify-end">
                        <Link
                            href="/"
                            className="relative border-2 border-black rounded-full w-[184px] h-12 flex items-center justify-center bg-base hover:bg-main transition-all duration-300 ease-in-out"
                        >
                            <span>Back</span>
                            <Icon.ArrowLeft className="absolute right-8 top-1/2 -translate-y-1/2" />
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}

export async function generateStaticParams() {
    return VALID_CATEGORIES.map((category) => ({
        category: category,
    }));
}
