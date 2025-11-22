import LoginForm from "@/app/components/feature/auth/login-form";

export default function LoginPage() {
  return (
    <main className="bg-[#F5F0E9] w-full h-screen flex items-center justify-center">
      <div className="w-[80%] max-w-[1200px] mx-auto flex justify-between">
        <div className="w-1/2">{/* 画像？？？ */}</div>
        <div className="bg-white rounded-[60px] py-[30px] px-21 w-1/2">
          <h1 className="text-center text-[32px]">Sign In</h1>
          <LoginForm />
        </div>
      </div>
    </main>
  )
}