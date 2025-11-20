import prisma from "@/lib/db";
import { checkLang } from "@/lib/language";

export async function GET(request: Request) {
    try {
const { searchParams } = new URL(request.url);
    const daysParams = searchParams.get("days"); //3日間か、7日間かどちらかのランキングが入る。
    const languageParams = searchParams.get("languageCode") || "en"; //userがどの言語でみているのか送られてくる。ゲストであれば、リクエストは必要だが、登録している人は、現在ログインしているuserから取ってこれる。<-のほうが良い理由は、リクエストで来ると、分岐が多くなるが、userの情報から取ってくると、分岐はいらない
    //絞り込んでる箇所で、postテーブルのprofile->languageがクエリと同じもので絞り込む。
    // const allowedLanguages = ["en", "ja", "zh-CN", "zh-TW", "ko"];
    const language = checkLang(languageParams);
    const days = Number(daysParams);

    // 今日から7日前
    const DaysAgo = new Date(); //現在日の取得
    DaysAgo.setDate(DaysAgo.getDate() - days);

    const rankingPosts = await prisma.post.findMany({
        where: {
            views: {
                some: {
                    createdAt: {
                        gte: DaysAgo,
                    },
                },
            },
            language: {
                name: language,  // ← ココが正解！
            },
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
        take: 10,
    });
    return Response.json(rankingPosts);
    } catch (e: unknown){
        const message = e instanceof Error ? e.message : "エラーが発生しました";
        return Response.json({ success: false, message }, { status: 500 });
    }
}