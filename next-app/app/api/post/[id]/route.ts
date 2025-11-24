import PrismaClient from '@prisma/client';
import { getAuthenticateUser } from '@/utils/supabase/server'
import { createClient } from "@/utils/supabase/server";

const supabase = await createClient();
const { data : { user } , error } = await supabase.auth.getUser();
const userId = user.id;

export async function DELETE(request: Request){

  const success = await getAuthenticateUser(request)


  try {
    const deletePost = await prisma.post.delete({
      where: {
        id: id
      }
      profile : {
      where : {
        userId : userId
    }
  }
    });
    return NextResponse.json({
      success: true,
      message: ["delete success"]
    });
    }
    catch (error: any) {
      return NextResponse.json({
        success: false,
        message: ["delete fail"]
        },{status: 404});
  }
}
