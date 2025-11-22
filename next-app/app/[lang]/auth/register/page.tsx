import RegisterForm from "@/app/components/feature/auth/register-form";

export default function RegisterPage() {
  return (
    <main className="bg-[#F5F0E9] w-full h-screen flex items-center justify-center">
      <div className="w-[80%] max-w-[1200px] mx-auto flex justify-between">
        <div className="w-1/2">{/* 画像？？？ */}</div>
        <div className="bg-[#fafafa] rounded-[60px] py-[30px] px-21 w-1/2">
          <h1 className="text-[32px] text-center">Sign Up</h1>
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
