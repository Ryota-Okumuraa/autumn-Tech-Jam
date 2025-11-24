export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await fetch(`posts/detail`)
  return (
    <div>
      <h1>Edit Post</h1>
    </div>
  );
}