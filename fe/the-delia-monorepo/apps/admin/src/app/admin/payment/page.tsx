"use client";
import { useState } from "react";
import styles from "./payment.module.css";
import Sidebar from "@shared/components/Sidebar";
import Header from "@shared/components/Header";

type Payment = {
  id: number;
  orderCode: string;
  customerName: string;
  product: string;
  quantity: number;
  price: number;
  status: string;
};

export default function PaymentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 101010,
      orderCode: "HD10001",
      customerName: "Nguyễn Văn A",
      product: "Vest nam cao cấp",
      quantity: 2,
      price: 2500000,
      status: "CHƯA THANH TOÁN",
    },
    {
      id: 201010,
      orderCode: "HD10002",
      customerName: "Trần Thị B",
      product: "Áo dài cưới",
      quantity: 1,
      price: 3200000,
      status: "ĐÃ THANH TOÁN",
    },
  ]);

  const [notification, setNotification] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setPayments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  const handleDeleteRequest = (id: number) => {
    const payment = payments.find((item) => item.id === id);
    if (!payment) return;

    if (payment.status === "ĐÃ THANH TOÁN") {
      showNotification("❌ Không thể xóa đơn hàng đã thanh toán.");
    } else {
      setConfirmDeleteId(id);
    }
  };

  const handleConfirmDelete = () => {
    if (confirmDeleteId !== null) {
      setPayments((prev) => prev.filter((item) => item.id !== confirmDeleteId));
      showNotification("✅ Đã xóa đơn hàng thành công.");
      setConfirmDeleteId(null);
    }
  };

const filteredPayments = payments.filter(
  (item) =>
    item.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.orderCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) 

);


  return (
    <div className={styles.container}>
      <Header />
      <Sidebar />
      <div className={styles.content}>
        <h1 className={styles.title}>Quản Lý Thanh Toán</h1>

        {notification && (
          <div className={styles.notification}>{notification}</div>
        )}

        {confirmDeleteId !== null && (
          <div className={styles.confirmModal}>
            <div className={styles.confirmBox}>
              <p>Bạn có chắc muốn xóa?</p>
              <div className={styles.confirmActions}>
                <button onClick={handleConfirmDelete}>Xác nhận</button>
                <button onClick={() => setConfirmDeleteId(null)}>Hủy</button>
              </div>
            </div>
          </div>
        )}

        <div className={styles.actionBar}>
          <input
            type="text"
            placeholder="Tìm theo ID, mã đơn hàng hoặc khách hàng"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>MÃ ĐƠN HÀNG</th>
              <th>KHÁCH HÀNG</th>
              <th>SẢN PHẨM</th>
              <th>SỐ LƯỢNG</th>
              <th>TỔNG TIỀN</th>
              <th>TRẠNG THÁI</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.orderCode}</td>
                <td>{item.customerName}</td>
                <td>{item.product}</td>
                <td>{item.quantity}</td>
                <td>{(item.quantity * item.price).toLocaleString()}₫</td>
                <td>
                  <select
                    value={item.status}
                    onChange={(e) =>
                      handleStatusChange(item.id, e.target.value)
                    }
                    className={styles.statusDropdown}
                  >
                    <option value="ĐÃ THANH TOÁN">ĐÃ THANH TOÁN</option>
                    <option value="CHƯA THANH TOÁN">CHƯA THANH TOÁN</option>
                  </select>
                </td>
                <td>
                  <button
                    className={styles.contactBtn}
                    onClick={() =>
                      alert(`Liên hệ khách hàng: ${item.customerName}`)
                    }
                  >
                    Liên hệ
                  </button>
                </td>
                <td>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteRequest(item.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
