import PrismaClient from '@prisma/client';
import { getAuthenticateDelete } from '@/utils/supabase/server'


export async function DELETE(request: Request){

  const success = await getAuthenticateUser(request)


  try {
    const deletePost = await prisma.post.delete({
      where: {
        id: parseInt(request.params.id)
        name: parseInt(request.params.name)
      }
    });
    return NextResponse.json({
      success: true,
      message: ["削除しました。"]
    });
    }
    catch (error: any) {
    if (error.code == "P2025") {
      return NextResponse.json({
        success: false,
        message: ["削除できませんでした。"]
        },{status: 404});
      }
  }
}
