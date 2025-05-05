/* components/CartNotification.tsx */
"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import styles from "./CartNotification.module.css";

export default function CartNotification() {
  const tProduct = useTranslations("Product");

  return (
    <div className={styles.notification}>
      <span>{tProduct("addedToCart")}</span>
      <Link href="/cart" className={styles.viewNowButton}>
        {tProduct("viewNow")}
      </Link>
    </div>
  );
}