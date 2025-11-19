import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server'
import prisma from '@/lib/db'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get('next') ?? '/'
  if (!next.startsWith('/')) {
    // if "next" is not a relative URL, use the default
    next = '/'
  }
  // エラー時のリダイレクトURL
  const errorUrl = `${origin}/auth/auth-error`

  if (code) {
    const supabase = await createClient()
    const { data : { user } , error } = await supabase.auth.exchangeCodeForSession(code)

    if (user && user.id && !error) {
      // ユーザーから取得したデータを使ってprofileテーブルにデータを追加
      try {
        const isExistUser = await prisma.profile.findFirst({
          where : {
            userId : user.id
          }
        });
        // ユーザーが存在しない場合はprofileテーブルにデータを追加
        if (!isExistUser) {
          await prisma.profile.create({
            data : {
              userId : user.id,
              name : user.user_metadata.name,
                languageId : 1 // デフォルト値英語？？？
              }
            })
          }
      } catch (error) {
        console.log(error);
        return NextResponse.redirect(errorUrl)
      }
      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(errorUrl)
}