import GoogleLogin from "@/app/components/feature/auth/google-login";
import LoginForm from "@/app/components/feature/auth/login-form";
import { getTranslations } from "next-intl/server";
import Image from "next/image";


export default async function LoginPage() {
  const t = await getTranslations("login");
  return (
    <main className="bg-[#F5F0E9] w-full h-screen flex items-center justify-center py-10 px-4 sm:px-6">
      <div className="w-full max-w-[1200px] mx-auto flex md:flex-row md:justify-between md:max-h-[800px]">
        <div className="w-1/2 relative hidden md:block">
          <Image src={"/login-icon.svg"} alt={t("signIn")} fill className="object-contain" />
        </div>
        <div className="bg-white rounded-[60px] py-10 px-6 sm:px-12 md:px-21 w-full max-w-[450px] md:max-w-none md:w-1/2 lg:w-[45%]">
          <h1 className="text-center text-[32px]">{t("signIn")}</h1>
          <LoginForm />
          <div className="h-px w-[400px] text-center bg-gray my-4 w-full flex justify-center"></div>
          <div className="w-full flex justify-center">
          <GoogleLogin />
          </div>
        </div>
      </div>
    </main>
  );
}
