// lib/posts.ts
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { getTranslations } from "next-intl/server";

export async function GET({ params }: {
    params: Promise<{ id: string }>;
}) {
    const t = await getTranslations("api-detail");
    const { id } = await params;
    try {
        const post = await prisma.post.findFirst({
            where: { id: id },
            select: {
                id: true,
                thumbnail: true,
                title: true,
                content: true,
                createdAt: true,
                category: {
                    select: {
                        name: true,
                    },
                },
                profile: {
                    select: {
                        name: true, // author名
                    },
                },
            },
        });
        const res = {
            id: post?.id,
            thumbnail: post?.thumbnail,
            title: post?.title,
            content: post?.content,
            createdAt: post?.createdAt,
            author: post?.profile.name,
            category: post?.category.name,
        }
        return NextResponse.json({
            success: true,
            message: t("success"),
            post: res
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: t("error")
            }
        )
    }
}