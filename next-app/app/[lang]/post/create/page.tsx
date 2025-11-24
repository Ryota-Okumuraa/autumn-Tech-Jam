import CreateForm from "@/app/components/feature/post-create/create-form";
import { Header } from "@/app/components/shared/Header";
export default function CreatePostPage() {
  return (
    <main className="bg-base w-full min-h-screen flex space-y-8">
      <Header />
      <div className="w-full">
        <CreateForm />
      </div>
    </main>
  );
}
