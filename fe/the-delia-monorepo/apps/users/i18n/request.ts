import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = locale ?? "vi";
  return {
    locale: safeLocale,
    messages: (await import(`../locales/${safeLocale}.json`)).default,
  };
});