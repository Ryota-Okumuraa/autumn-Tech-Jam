import { LockIcon, MailIcon, UserIcon } from "lucide-react";
import InputLabel from "../../shared/input-label";

export default function RegisterForm() {
    return (
      <form className="flex flex-col items-start space-y-4 w-full">
        {/* ユーザー名 */}
        <InputLabel
          id="name"
          label="User name"
          icon={<UserIcon />}
          placeholder="User name"
        />
        {/* メールアドレス */}
        <InputLabel
          id="email"
          label="email"
          icon={<MailIcon />}
          placeholder="Email"
        />
        {/* パスワード */}
        <InputLabel
          id="password"
          label="password"
          icon={<LockIcon />}
          placeholder="Password"
        />
      </form>
    )
}