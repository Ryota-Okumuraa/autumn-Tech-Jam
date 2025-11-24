// import PrismaClient from "@/lib/db";
// import { NextResponse } from "next/server";
// import { getAuthenticateUser } from "@/utils/supabase/server";

// export async function GET(request: Request) {
//   const supabase = getAuthenticateUser();

//   const { data: profile } = await supabase.auth.getAuthenticateProfile();
//   const { data: user } = await supabase.auth.getAuthenticateUser();

//   if (!profile) {
//     return NextResponse.json({ error: "ユーザーが存在しません" }, { status: 401 });
//   }
//   const ResponseDate = {
//     id: profile.id,
//     name: profile.name,
//     email: user.email,
//   };
//   return Response.json(ResponseDate);
// }
