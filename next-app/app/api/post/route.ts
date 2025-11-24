import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getAuthenticatedUser } from '@/utils/supabase/server';

const body = await request.json(){

    let body;
    try {
        body = await request.json();
    } catch (e) {
        return NextResponse.json({ success: false, messages: ["JSON形式が不正です"] }, { status: 400 });
    }

    const { thumbnail, title, content, category } = body;
    const authResult = await getAuthenticatedUser(request);
    const user = authResult?.user;

    if (!user) {
        return NextResponse.json({
            success: false,
            messages: ["認証してください"]
        }, { status: 401 });
    }
    const profileId = user.id;

    try {
        const post = await prisma.post.create({
            data: {
                title,
                content,
                thumbnail: thumbnail,
                category,
                profileId: profileId,
            },
        });
        return NextResponse.json({
            success: true,
            messages: ["投稿しました"],
            postId: post.id.toString(),
        }, { status: 201 });

    } catch (error) {
        console.error("投稿に失敗しました:", error);
        return NextResponse.json({
            success: false,
            messages: ["サーバーエラー"]
        }, { status: 500 });
    }
}
