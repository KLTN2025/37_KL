"use client";

import { useState, useEffect } from "react";
import styles from "./promotion.module.css";
import Sidebar from "@shared/components/Sidebar";
import Header from "@shared/components/Header";

type Discount = {
  id: number;
  code: string;
  condition: string;
  quantity: number;
  expiry: string;
};

type DiscountUsage = {
  date: string;
  code: string;
  status: string;
};

type FilterStatus = "all" | "active" | "expired";

export default function PromotionPage() {
  const [discounts, setDiscounts] = useState<Discount[]>([
    {
      id: 1,
      code: "SALE20",
      condition: "Giảm 20% cho đơn từ 500000",
      quantity: 100,
      expiry: "2025-06-30",
    },
    {
      id: 2,
      code: "FREESHIP50",
      condition: "Miễn phí ship cho đơn từ 300000",
      quantity: 50,
      expiry: "2025-04-10",
    },
  ]);

  const [usageHistory, setUsageHistory] = useState<DiscountUsage[]>([
    {
      date: "2025-04-15",
      code: "SALE20",
      status: "Hết Mã",
    },
    {
      date: "2025-04-17",
      code: "FREESHIP50",
      status: "Hết Mã",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  const isExpired = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  };

  useEffect(() => {
    const today = new Date();
    const validDiscounts: Discount[] = [];
    const expired: DiscountUsage[] = [];

    discounts.forEach((item) => {
      const expiryDate = new Date(item.expiry);
      if (expiryDate < today) {
        expired.push({
          date: today.toISOString().split("T")[0],
          code: item.code,
          status: "Hết hạn",
        });
      } else {
        validDiscounts.push(item);
      }
    });

    if (expired.length > 0) {
      setDiscounts(validDiscounts);
      setUsageHistory((prev) => [...prev, ...expired]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredDiscounts = discounts.filter((item) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "active") return !isExpired(item.expiry);
    if (filterStatus === "expired") return isExpired(item.expiry);
    return true;
  });

  return (
    <div className={styles.container}>
      <Header />
      <Sidebar />
      <div className={styles.content}>
        <h1 className={styles.title}>Khuyến Mãi - Giảm Giá</h1>

        <div className={styles.filterBar}>
          <label>Lọc trạng thái: </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
            className={styles.select}
          >
            <option value="all">Tất cả</option>
            <option value="active">Còn hiệu lực</option>
            <option value="expired">Hết hạn</option>
          </select>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Mã khuyến mãi</th>
              <th>Điều kiện sử dụng</th>
              <th>Số lượng</th>
              <th>Hạn sử dụng</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {filteredDiscounts.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.code}</td>
                <td>{item.condition}</td>
                <td>{item.quantity}</td>
                <td>{item.expiry}</td>
                <td
                  className={
                    isExpired(item.expiry) ? styles.expired : styles.active
                  }
                >
                  {isExpired(item.expiry) ? "Hết hạn" : "Còn hiệu lực"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className={styles.title}>Lịch Sử Tạo Khuyến Mãi</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Ngày</th>
              <th>Mã khuyến mãi</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {usageHistory.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.code}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
