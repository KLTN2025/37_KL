"use client";
import { useState, useEffect } from "react";
import styles from "./marketing.module.css";
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

export default function MarketingPage() {
  const [discounts, setDiscounts] = useState<Discount[]>([
    {
      id: 1,
      code: "SALE 20%",
      condition: "Giảm 20% cho đơn từ 500.000₫",
      quantity: 100,
      expiry: "2025-06-30",
    },
    {
      id: 2,
      code: "FREESHIP50",
      condition: "Miễn phí ship cho đơn từ 300.000₫",
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDiscount, setNewDiscount] = useState<Discount>({
    id: 0,
    code: "",
    condition: "",
    quantity: 0,
    expiry: "",
  });

  const handleDelete = (id: number) => {
    setDiscounts((prev) => prev.filter((item) => item.id !== id));
  };

  // Hàm định dạng tiền tệ
  const formatCurrencyInCondition = (condition: string): string => {
    return condition.replace(/\d{4,}/g, (match) => {
      const num = parseInt(match);
      if (isNaN(num)) return match;
      return num.toLocaleString("vi-VN") + "₫";
    });
  };

  const handleAddDiscount = () => {
    if (!newDiscount.code || !newDiscount.condition || !newDiscount.expiry)
      return;

    const newId =
      discounts.length > 0
        ? Math.max(...discounts.map((item) => item.id)) + 1
        : 1;

    const formattedCondition = formatCurrencyInCondition(newDiscount.condition);

    setDiscounts((prev) => [
      ...prev,
      { ...newDiscount, id: newId, condition: formattedCondition },
    ]);
    setIsModalOpen(false);
    setNewDiscount({ id: 0, code: "", condition: "", quantity: 0, expiry: "" });
  };

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
  }, [discounts]);

  return (
    <div className={styles.container}>
      <Header />
      <Sidebar />
      <div className={styles.content}>
        <h1 className={styles.title}>Marketing - Mã Giảm Giá</h1>

        <div className={styles.actionBar}>
          <button
            className={styles.addBtn}
            onClick={() => setIsModalOpen(true)}
          >
            + Tạo Mã Mới
          </button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Mã giảm giá</th>
              <th>Điều kiện sử dụng</th>
              <th>Số lượng</th>
              <th>Hạn sử dụng</th>
              <th>Trạng thái</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((item) => (
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
                <td>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(item.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal thêm mã */}
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>Tạo Mã Giảm Giá Mới</h2>
              <div className={styles.formGroup}>
                <label>Mã giảm giá:</label>
                <input
                  type="text"
                  value={newDiscount.code}
                  onChange={(e) =>
                    setNewDiscount({ ...newDiscount, code: e.target.value })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label>Điều kiện sử dụng:</label>
                <input
                  type="text"
                  value={newDiscount.condition}
                  onChange={(e) =>
                    setNewDiscount({
                      ...newDiscount,
                      condition: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label>Số lượng:</label>
                <input
                  type="number"
                  value={newDiscount.quantity}
                  onChange={(e) =>
                    setNewDiscount({
                      ...newDiscount,
                      quantity: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label>Hạn sử dụng:</label>
                <input
                  type="date"
                  value={newDiscount.expiry}
                  onChange={(e) =>
                    setNewDiscount({ ...newDiscount, expiry: e.target.value })
                  }
                />
              </div>
              <div className={styles.modalActions}>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className={styles.cancelBtn}
                >
                  Hủy
                </button>
                <button onClick={handleAddDiscount} className={styles.saveBtn}>
                  Lưu
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lịch sử dùng mã */}
        <h2 className={styles.title}>Lịch Sử Tạo Mã</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Ngày</th>
              <th>Mã giảm giá</th>
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
