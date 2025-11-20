import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const daysParams = searchParams.get("days"); //3日間か、7日間かどちらかのランキングが入る。
    const languageParams = searchParams.get("languageCode"); //userがどの言語でみているのか送られてくる。ゲストであれば、リクエストは必要だが、登録している人は、現在ログインしているuserから取ってこれる。<-のほうが良い理由は、リクエストで来ると、分岐が多くなるが、userの情報から取ってくると、分岐はいらない
    //絞り込んでる箇所で、postテーブルのprofile->languageがクエリと同じもので絞り込む。
    const allowedLanguages = ["en", "ja", "zh-CN", "zh-TW", "ko"];

    // languageCode が許可された値でなければ null にする
    const languageCode = allowedLanguages.includes(languageParams || "")
        ? languageParams
        : "en";

    const days = Number(daysParams);

    // const supabase = createRouteHandlerClient({ cookies });
    // const {
    //     data: { user },
    // } = await supabase.auth.getUser();

    // if (!user) return Response.json({ error: "Not logged in" }, { status: 401 });

    // const profile = await prisma.profile.findUnique({
    //     where: { userId: user.id },
    // });

    if (days === 7) {
        // 今日から7日前
        const sevenDaysAgo = new Date(); //現在日の取得
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const sevenPosts = await prisma.post.findMany({
            where: {
                views: {
                    some: {
                        createdAt: {
                            gte: sevenDaysAgo,
                        },
                    },
                },
                languageId: language.id,
            },
            include: {
                _count: {
                    select: {
                        views: {
                            where: {
                                createdAt: {
                                    gte: sevenDaysAgo,
                                },
                            },
                        },
                    },
                },
            },
            orderBy: {
                views: {
                    _count: "desc",
                },
            },
        });
        return Response.json(sevenPosts);
    }
    else if (days === 3) {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

        const threePosts = await prisma.post.findMany({
            where: { //3日以内の view が 1件でもついている投稿だけ取得して！
                views: {
                    some: {
                        createdAt: {
                            gte: threeDaysAgo,
                        },
                    },
                },
            },
            include: { //その投稿に対して、3日以内の views の数をカウントして追加して！
                _count: {
                    select: {
                        views: {
                            where: {
                                createdAt: {
                                    gte: threeDaysAgo,
                                },
                            },
                        },
                    },
                },
            },
            orderBy: { //閲覧数（views の件数）が多い順に並び替えてください
                views: {
                    _count: "desc",
                },
            },
        })
    }
}