import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { success } from "zod";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const category = searchParams.get("category"); //カテゴリを取ってくる。
        const offset = Number(searchParams.get("offset") || 0) //ページネーションで、データベースからデータを取ってくる際、どこから取ってくるかを決める箇所。（これがないと毎回同じ内容を取ってくる。）
        const pageType = searchParams.get("pageType") === "true"; // indexページかどうか
        const take = pageType ? 20 : 8; //pageTypeがtrueであれば、takeは20、falseやその他だと、takeが8になる。

        if (!category) {
            return NextResponse.json(
                {
                    success: false,
                    message: "カテゴリが存在しない",
                },
                { status: 400 } // Bad Request
            );
        }

        // 合計件数（ページネーション必要な場合にのみ使う、）
        const totalCount = (take == 20)
            ? await prisma.post.count({
                where: { category: { name: category } }
            })
            : null

        // データ取得
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
                        name: true,
                    },
                },
            },
            take,
            skip: offset * 20, //offsetに1,2,3,4のように値が入ってきて、*20をすることによって、データを取ってくる際に、同じデータを取ってくるのを避ける。
            //1がoffsetに入ってきた場合、最初は20件分取得。2が入ってきた場合、40からとる。
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({
            success: true,
            posts,
            totalCount
        } , { status : 200});

    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "エラーが発生しました";
        return Response.json({ success: false, message }, { status: 500 });
    }
}