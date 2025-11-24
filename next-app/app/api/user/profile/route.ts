import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/db";
import { email } from "zod";

export async function GET() {
  const supabase = await createClient();

  // Supabaseのログインユーザーを取得
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return Response.json({ success: false, message: "ログインしてください" }, { status: 401 });
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: user.id, //user.idがsupabaseから取ってきたuserのid
    },
    select: {
      name: true,
      message: true
    },
  });

  // レスポンス
  return Response.json({
    success: true,
    id: user.id,
    name: profile?.name ?? null, // プロフィールが無い時は null
    message: profile?.message ?? null,
    email: user.email,
  });
}
