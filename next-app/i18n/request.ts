import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // ミドルウェアにてcookieから取得した言語にルーティングされる => /en-US/profile のように
  // そのen-USのパラメータ部分をrequestedに取得する。
  const requested = await requestLocale;
  // サポートされている言語かチェックし、未対応の場合はデフォルト言語を使用
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
