 
/* app/layout.tsx */
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { NextIntlClientProvider, createTranslator } from "next-intl";
import ClientProviders from "./ClientProviders";
import { FavoritesProvider } from "./context/FavoritesContext";

async function loadMessages(locale: string) {
  try {
    return await import(`../locales/${locale}.json`).then((mod) => mod.default);
  } catch (error) {
    console.error(`Failed to load messages for locale "${locale}", falling back to "vi"`, error);
    return await import(`../locales/vi.json`).then((mod) => mod.default);
  }
}

export async function generateMetadata({ params }: { params?: { locale: string } }) {
  const locale = params?.locale || "vi";
  const messages = await loadMessages(locale);
  const t = createTranslator({ locale, messages, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: { locale: string };
}) {
  const locale = params?.locale || "vi";
  const messages = await loadMessages(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ClientProviders>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <FavoritesProvider>
              {children}
              <ToastContainer
                position="top-right" 
                autoClose={3000} 
                hideProgressBar={false} 
                newestOnTop={false} 
                closeOnClick 
                rtl={locale === "VN"} 
                pauseOnFocusLoss 
                draggable 
                pauseOnHover 
                theme="light" 
              />
            </FavoritesProvider>
          </NextIntlClientProvider>
        </ClientProviders>
      </body>
    </html>
  );
}