import prisma from "@/lib/db";
import { checkLang } from "@/utils/language";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const daysParams = searchParams.get("days"); //3日間か、7日間かどちらかのランキングが入る。
    const cookie = await cookies();
    const languCode = checkLang(cookie.get("locale")?.value ?? null);
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
          name: languCode, // ← ココが正解！
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
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "エラーが発生しました";
    return Response.json({ success: false, message }, { status: 500 });
  }
}
