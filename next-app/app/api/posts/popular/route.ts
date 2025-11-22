import prisma from "@/lib/db";

export async function GET(request: Request) {
    try { //カテゴリー別で最新順の閲覧数の高い記事をlimit数分返すAPI
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category"); //カテゴリ
        const limit = Number(searchParams.get("limit") || 4); //取得する記事数

        if (!category) {
            return Response.json(
                { success: false, message: "category がありません" },
                { status: 400 }
            );
        }

        const categoryPopular = await prisma.post.findMany({
            where: {
                category: {
                    name: category,
                }
            },
            select: {
                id: true,
                thumbnail: true,
                title: true,
                createdAt: true,
                category: {
                    select: {
                        name: true, // ← categoryId は返さず category の名前だけ返す
                    },
                },
            },
            orderBy: {
                views: {
                    _count: "desc",
                },
            },
            take: limit,
        });
        return Response.json({
            success: true,
            posts: categoryPopular,
        });
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "エラーが発生しました";
        return Response.json({ success: false, message }, { status: 500 });
    }
}