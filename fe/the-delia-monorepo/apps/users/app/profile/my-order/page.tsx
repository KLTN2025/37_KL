/* app/profile/my-order/page.tsx */
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "../../context/AuthContext";
import styles from "./MyOrder.module.css";
import Image from "next/image";

export default function MyOrderPage() {
  const t = useTranslations("Profile");
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("processing");

  const tabs = [
    { key: "processing", label: t("ordersProcessing") },
    { key: "delivered", label: t("ordersDelivered") },
    { key: "changeReturn", label: t("changeReturn") },
  ];

  const orders = [];

  if (!user) {
    return (
      <div className={styles.mainContent}>
        <h1 className={styles.pageTitle}>{t("orders")}</h1>
        <div className={styles.notLoggedIn}>{t("notLoggedIn")}</div>
      </div>
    );
  }

  return (
    <div className={styles.mainContent}>
      <h1 className={styles.pageTitle}>{t("orders")}</h1>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`${styles.tab} ${activeTab === tab.key ? styles.active : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {orders.length === 0 ? (
        <div className={styles.emptyState}>
          <Image
            src="/empty-orders.png"
            alt="Empty Orders"
            width={120}
            height={120}
            className={styles.emptyIcon}
          />
          <p className={styles.emptyText}>{t("emptyOrders")}</p>
        </div>
      ) : (
        <div>{/* Future implementation for orders */}</div>
      )}
    </div>
  );
}