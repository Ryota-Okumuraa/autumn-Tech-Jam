import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

interface BlogPost {
  thumbnail: string;
  title: string;
  content: string;
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      select: {
        thumbnail: true,
        title: true,
        content: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json({
      data: posts,
      message: "記事の読み込みに成功しました。"
    }
      , { status: 200 });
  } catch (error) {
    console.error("Error fetching blog posts:", error);

    return NextResponse.json(
      { error: "記事取得に失敗しました" },
      { status: 500 }
    );
  }
}
