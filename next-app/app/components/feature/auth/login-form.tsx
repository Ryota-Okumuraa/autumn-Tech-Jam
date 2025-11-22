import { LockIcon, MailIcon } from "lucide-react";
import InputLabel from "../../shared/input-label";

export default function LoginForm() {
  return (
    <form className="flex flex-col items-start space-y-4 w-full">
      {/*  メールアドレス */}
      <InputLabel
        id="email"
        label="email"
        icon={<MailIcon />}
        placeholder="Email"
      />
      {/*  パスワード */}
      <InputLabel
        id="password"
        label="password"
        icon={<LockIcon />}
        placeholder="Password"
      />
    </form>
  )
}