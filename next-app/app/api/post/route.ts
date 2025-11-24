// app/api/posts/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/db";// ← あなたの prisma クライアント
import { createClient } from "@/utils/supabase/server";

// 許可されたカテゴリ一覧
const ALLOWED_CATEGORIES = [
    "food",
    "cafe",
    "shopping",
    "culture",
    "guide",
    "stories",
] as const;

export async function POST(request: Request) {
    try {
        // ① Supabase からログイン中のユーザー取得
        const supabase = await createClient();
        // ユーザー情報取得
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser();

        if (!user)
            return NextResponse.json(
                {
                    success: false,
                    messages: ["ログインされていません"],
                    postId: null,
                },
                { status: 401 }
            );

        // ② request.body を取得
        const body = await request.json();
        const { thumbnail, title, content, category } = body; //リクエストに送られてきた内容が入ってくる。

        // ③ category が許可リストにない場合はエラー
        if (!ALLOWED_CATEGORIES.includes(category)) {
            return NextResponse.json(
                { error: "Invalid category" },
                { status: 400 }
            );
        }

        // ④ supabase.user.id から Profile を特定
        const profile = await prisma.profile.findUnique({
            where: { userId: user.id },
        });

        if (!profile) {
            return NextResponse.json(
                {
                    success: false,
                    messages: ["プロフィールが見つかりません"],
                    postId: null,
                },
                { status: 404 }
            );
        }

        // ⑤ Post を作成
        const newPost = await prisma.post.create({
            data: {
                thumbnail,
                title,
                content,
                profileId: profile.id,
                category: {
                    connect: { name: category },
                },
            },
            include: {
                category: true,
            },
        });

        return NextResponse.json({
            success: true,
            messages: ["投稿が正常に作成されました"],
            postId: newPost.id,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                messages: ["サーバーエラーが発生しました"],
                postId: null,
            },
            { status: 500 }
        );
    }
}