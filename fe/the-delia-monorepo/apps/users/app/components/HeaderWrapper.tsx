/* eslint-disable @typescript-eslint/no-explicit-any */
/* app/components/HeaderWrapper.tsx */
"use client";

import { NextIntlClientProvider } from "next-intl";
import Header from "./Header";

interface HeaderWrapperProps {
  locale: string;
  messages: Record<string, any>; // Cải thiện type cho messages
}

export default function HeaderWrapper({ locale, messages }: HeaderWrapperProps) {
  // Đảm bảo locale không phải là undefined, mặc định là "vi"
  const safeLocale = locale || "vi";

  // Kiểm tra messages trong môi trường development
  if (process.env.NODE_ENV === "development" && (!messages || !messages.Header)) {
    console.error(
      "HeaderWrapper: messages is empty or missing 'Header' namespace. This will cause MISSING_MESSAGE errors.",
      messages
    );
  }

  // Nếu messages rỗng hoặc thiếu namespace Header, hiển thị fallback
  if (!messages || !messages.Header) {
    return (
      <header>
        <div>Failed to load translations. Please check messages configuration in locales/{safeLocale}.json.</div>
      </header>
    );
  }

  return (
    <NextIntlClientProvider messages={messages} locale={safeLocale}>
      <Header />
    </NextIntlClientProvider>
  );
}