"use client";
import { ChevronRight, LockIcon, MailIcon } from "lucide-react";
import InputLabel from "../../shared/input-label";
import { useTranslations } from "next-intl";
import SubmitButton from "../../shared/submit-button";
import { Link } from "@/i18n/routing";
import { useState } from "react";

export default function LoginForm() {
  const [isFetching, setIsFetching] = useState(false);
  const t = useTranslations("login");
  return (
    <form className="flex flex-col items-start space-y-4 w-full max-w-[400px]">
      {/*  メールアドレス */}
      <InputLabel
        id="email"
        label={t("email")}
        icon={<MailIcon />}
        placeholder={t("emailPlaceholder")}
      />
      {/*  パスワード */}
      <InputLabel
        id="password"
        label={t("password")}
        icon={<LockIcon />}
        type="password"
        placeholder={t("passwordPlaceholder")}
      />
      {/* 新規登録の人 */}
      <div className="w-full flex justify-end">
        <Link href="/auth/register" className="flex items-center">
          <p className="text-black ">{t("signIn")}</p>
          <ChevronRight className="text-black w-6 h-6" />
        </Link>
      </div>
      <SubmitButton text={t("signIn")} isFetching={isFetching} />
    </form>
  );
}
