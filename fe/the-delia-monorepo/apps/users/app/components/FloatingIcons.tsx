/* app/components/FloatingIcons.tsx */
"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import styles from "../page.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function FloatingIcons() {
  const t = useTranslations("FloatingIcons");

  return (
    <div className={styles.floatingIcons}>
      <Link
        href="https://whatsapp.com"
        className={styles.floatingIcon}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("whatsappAria")}
      >
        <i className="bi bi-whatsapp"></i>
      </Link>
      <Link
        href="https://instagram.com"
        className={styles.floatingIcon}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("instagramAria")}
      >
        <i className="bi bi-instagram"></i>
      </Link>
      <Link
        href="/help"
        className={styles.floatingIcon}
        aria-label={t("helpAria")}
      >
        <i className="bi bi-question-circle"></i>
      </Link>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={styles.floatingIcon}
        aria-label={t("scrollToTopAria")}
      >
        <i className="bi bi-arrow-up"></i>
      </button>
    </div>
  );
}