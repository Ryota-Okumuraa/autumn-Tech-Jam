import prisma from "@/lib/db";
import { createRegisterSchema } from "@/schema/register";
import { checkLang } from "@/utils/language";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const cookie = await cookies();
  const languCode = checkLang(cookie.get("locale")?.value ?? null);
  // 送られた言語のスキーマ作成
  const schema = createRegisterSchema(languCode);
  type schemaType = z.infer<typeof schema>;
  try {
    const validatedData = schema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        {
          success: false,
          message: validatedData.error,
        },
        {
          status: 400,
        }
      );
    }
    // ユーザー登録
    const { name, email, password }: schemaType = validatedData.data;
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });
    if (!user || !user.id || error) {
      return NextResponse.json(
        {
          success: false,
          message: "ユーザー登録に失敗しました。",
        },
        {
          status: 400,
        }
      );
    }
    // プロフィールの作成
    await prisma.profile.create({
      data: {
        name,
        userId: user.id,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "ユーザー登録に成功しました。",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "ユーザー登録に失敗しました。",
      },
      {
        status: 400,
      }
    );
  }
}
