/* eslint-disable @typescript-eslint/no-unused-vars */
/* app/profile/layout.tsx */
import { getTranslations, getMessages } from "next-intl/server";
import HeaderWrapper from "../components/HeaderWrapper";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import styles from "./ProfileLayout.module.css";
import { AuthProvider } from "../context/AuthContext";

export default async function ProfileLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const t = await getTranslations("Profile");
  const messages = await getMessages();

  return (
    <AuthProvider>
      <div className={styles.container}>
        <HeaderWrapper locale={locale} messages={messages} />
        <div className={styles.main}>
          <Sidebar />
          <div className={styles.content}>{children}</div>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}