// app/components/SocialIcons.tsx
"use client";

import styles from "./SocialIcons.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function SocialIcons() {
  return (
    <div className={styles.floatingIcons}>
      <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className={styles.floatingIcon}>
        <i className="bi bi-whatsapp"></i>
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.floatingIcon}>
        <i className="bi bi-instagram"></i>
      </a>
      <a href="https://example.com" target="_blank" rel="noopener noreferrer" className={styles.floatingIcon}>
        <i className="bi bi-question-circle"></i>
      </a>
    </div>
  );
}