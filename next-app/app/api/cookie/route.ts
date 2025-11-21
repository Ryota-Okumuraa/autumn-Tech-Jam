import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// 言語選択時にcookieを設定する
export async function POST(req: NextRequest) {
  const { locale } = await req.json();
  const cookie = await cookies();
  cookie.set("locale", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 一か月
    httpOnly: false, // クライアントからのアクセスを許可
    secure: process.env.NODE_ENV === "production", // 本番環境ではSSLを使用
    sameSite: "lax", // セキュリティ対策
  });
  return NextResponse.json({ message: "cookieを設定しました", success: true }, { status: 200 });
}
