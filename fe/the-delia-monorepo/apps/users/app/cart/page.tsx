/* eslint-disable @typescript-eslint/no-unused-vars */
/* app/cart/page.tsx */
import { getMessages, getTranslations } from "next-intl/server";
import HeaderWrapper from "../components/HeaderWrapper";
import Footer from "../components/Footer";
import SocialIcons from "../components/SocialIcons";
import styles from "../mua-sam/ProductDetail.module.css";
import CartWrapper from "./CartWrapper";

export default async function CartPage({ params }: { params: { locale?: string } }) {
  const locale = params.locale || "vi";
  const messages = await getMessages({ locale });
  const tHome = await getTranslations({ namespace: "Home", locale });

  if (process.env.NODE_ENV === "development") {
    console.log("Messages in CartPage:", messages);
  }

  return (
    <div className={styles.container}>
      <HeaderWrapper messages={messages} locale={locale} />
      <main className={styles.main}>
        <CartWrapper messages={messages} locale={locale} />
      </main>
      <SocialIcons />
      <Footer />
    </div>
  );
}