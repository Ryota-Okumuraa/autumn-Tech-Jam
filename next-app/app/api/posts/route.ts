import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { success } from "zod";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const category = searchParams.get("category"); //カテゴリを取ってくる。
        const page = Number(searchParams.get("page") || 1);
        let perPageRaw = Number(searchParams.get("perPage") || 20);
        const perPage = perPageRaw === 8 || perPageRaw === 20 ? perPageRaw : 20;

        if (!category) {
            return NextResponse.json(
                {
                    success: false,
                    message: "カテゴリが存在しない",
                },
                { status: 400 } // Bad Request
            );
        }

        if (perPage === 8) {
            const posts = await prisma.post.findMany({
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
                take: 8,
                orderBy: { createdAt: "desc" },
            })
            return NextResponse.json(
                {
                    success: true,
                    posts,
                    pagination: null,
                }
            )
        };

        // ▼ perPage = 20 など「ページネーションあり」の場合
        // 合計件数を取得
        const totalCount = await prisma.post.count({
            where: {
                category: { name: category },
            },
        });

        // 投稿データを取得（ページング）
        const posts = await prisma.post.findMany({
            where: {
                category: { name: category },
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
            take: perPage,
            skip: (page - 1) * perPage,
            orderBy: { createdAt: "desc" },
        });

        // ページネーション情報
        const totalPages = Math.ceil(totalCount / perPage);

        return NextResponse.json({
            success: true,
            posts,
            pagination: {
                totalCount,
                currentPage: page,
                perPage,
                totalPages,
            },
        });

    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "エラーが発生しました";
        return Response.json({ success: false, message }, { status: 500 });
    }
}