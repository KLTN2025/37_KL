"use client";
import { useState, Fragment } from "react";
import Swal from "sweetalert2";
import Sidebar from "@shared/components/Sidebar";
import Header from "@shared/components/Header";
import styles from "./page.module.css";

type Purchase = {
  orderId: string;
  productName: string;
  purchaseDate: string;
  totalAmount: string;
};

type Customer = {
  id: number;
  name: string;
  phone: string;
  email: string;
  group: string;
  purchases: Purchase[];
  isLocked: boolean;
};

export default function CustomerPage() {
  const [expandedCustomerId, setExpandedCustomerId] = useState<number | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: "Phạm Văn C",
      phone: "0903456789",
      email: "phamc@gmail.com",
      group: "Khách vàng",
      isLocked: false,
      purchases: [
        {
          orderId: "DH001",
          productName: "Áo sơ mi nam",
          purchaseDate: "2024-12-20",
          totalAmount: "500,000₫",
        },
      ],
    },
    {
      id: 2,
      name: "Hồ H",
      phone: "0903456789",
      email: "hh@gmail.com",
      group: "Khách mới",
      isLocked: false,
      purchases: [],
    },
  ]);

  const handleLock = (id: number) => {
    Swal.fire({
      title: "Tạm khóa tài khoản?",
      text: "Tài khoản này đã không sử dụng lâu ngày",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        setCustomers((prev) =>
          prev.map((c) => (c.id === id ? { ...c, isLocked: true } : c))
        );

        Swal.fire({
          icon: "success",
          title: "Đã tạm khóa!",
          text: "Tài khoản đã được tạm khóa thành công.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  const filteredCustomers = customers.filter((c) => {
    const query = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(query) || c.id.toString().includes(query)
    );
  });


  return (
    <div className={styles.container}>
      <Header />
      <Sidebar />
      <div className={styles.content}>
        <h1 className={styles.title}>Danh Sách Khách Hàng</h1>

        <input
          type="text"
          placeholder="🔍 Tìm theo tên khách hàng..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Họ tên</th>
              <th>SĐT</th>
              <th>Email</th>
              <th>Nhóm</th>
              <th>Lịch sử</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <Fragment key={customer.id}>
                <tr>
                  <td>
                    {customer.id}{" "}
                    {customer.isLocked && (
                      <span className={styles.lockIcon}>❌</span>
                    )}
                  </td>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.email}</td>
                  <td>{customer.group}</td>
                  <td>
                    {!customer.isLocked && (
                      <button
                        className={styles.historyBtn}
                        onClick={() =>
                          setExpandedCustomerId(
                            expandedCustomerId === customer.id
                              ? null
                              : customer.id
                          )
                        }
                      >
                        🕘
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className={`${styles.lockBtn} ${
                        customer.isLocked ? styles.locked : ""
                      }`}
                      disabled={customer.isLocked}
                      onClick={() => handleLock(customer.id)}
                    >
                      {customer.isLocked ? "Đã tạm khóa" : "Tạm khóa"}
                    </button>
                  </td>
                </tr>

                {expandedCustomerId === customer.id && (
                  <tr>
                    <td colSpan={7}>
                      <div className={styles.purchaseHistoryBox}>
                        <h4>Lịch sử mua hàng của {customer.name}</h4>
                        {customer.purchases.length > 0 ? (
                          <table className={styles.subTable}>
                            <thead>
                              <tr>
                                <th>Mã Đơn</th>
                                <th>Sản phẩm</th>
                                <th>Ngày mua</th>
                                <th>Tổng thanh toán</th>
                              </tr>
                            </thead>
                            <tbody>
                              {customer.purchases.map((p) => (
                                <tr key={p.orderId}>
                                  <td>{p.orderId}</td>
                                  <td>{p.productName}</td>
                                  <td>{p.purchaseDate}</td>
                                  <td>{p.totalAmount}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <p>Chưa có đơn hàng nào</p>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
