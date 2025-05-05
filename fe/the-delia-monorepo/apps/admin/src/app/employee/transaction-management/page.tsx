"use client";

import { useState } from "react";
import styles from "./transaction.module.css";
import Sidebar from "@shared/components/Sidebar";
import Header from "@shared/components/Header";
import QRCode from "qrcode";

type Product = {
  name: string;
  quantity: number;
  price: number;
};

type Transaction = {
  id: number;
  customerName: string;
  products: Product[];
  orderCode: string;
  status: "ĐÃ THANH TOÁN" | "CHƯA THANH TOÁN";
  paymentMethod?: string; // <<-- thêm field mới để lưu hình thức thanh toán
  cashierName?: string;
};

export default function TransactionManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 101010,
      orderCode: "HD10001",
      customerName: "Nguyễn Văn A",
      products: [
        { name: "Vest nam cao cấp", quantity: 2, price: 2500000 },
        { name: "Quần Tây", quantity: 1, price: 700000 },
      ],
      status: "CHƯA THANH TOÁN",
    },
    {
      id: 201010,
      orderCode: "HD10002",
      customerName: "Trần Thị B",
      products: [{ name: "Áo dài cưới", quantity: 1, price: 3200000 }],
      status: "ĐÃ THANH TOÁN",
      paymentMethod: "Tiền mặt", // <<-- ví dụ giao dịch đã thanh toán rồi
    },
  ]);

  const [notification, setNotification] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    customer: "",
    products: [{ name: "", quantity: 1, price: 0 }],
    orderCode: "",
  });
  const [paymentInvoice, setPaymentInvoice] = useState<Transaction | null>(
    null
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("Tiền mặt");

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleStatusChange = (id: number, newStatus: Transaction["status"]) => {
    setTransactions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  const filteredTransactions = transactions.filter((item) =>
    [item.id.toString(), item.orderCode, item.customerName].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleCreateInvoice = () => {
    const newId = Math.max(...transactions.map((t) => t.id), 0) + 1;
    const newOrderCode = `HD${newId.toString().padStart(5, "0")}`;
    setInvoiceData({
      customer: "",
      products: [{ name: "", quantity: 1, price: 0 }],
      orderCode: newOrderCode,
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => setIsModalOpen(false);

  const handleSave = () => {
    const { customer, products, orderCode } = invoiceData;
    if (
      !customer ||
      products.some((p) => !p.name || p.quantity <= 0 || p.price <= 0)
    ) {
      showNotification("Vui lòng nhập đầy đủ thông tin hóa đơn!");
      return;
    }

    const newTransaction: Transaction = {
      id: Math.max(...transactions.map((t) => t.id), 0) + 1,
      orderCode,
      customerName: customer,
      products,
      status: "CHƯA THANH TOÁN",
    };

    setTransactions((prev) => [...prev, newTransaction]);
    setIsModalOpen(false);
    showNotification("Hóa đơn đã được lưu thành công!");
  };

  const handleConfirmPayment = (id: number) => {
    setTransactions((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "ĐÃ THANH TOÁN",
              paymentMethod: selectedPaymentMethod,
            }
          : item
      )
    );
    setPaymentInvoice(null);
    showNotification("Thanh toán thành công!");
  };

const handlePrintInvoice = async (transaction: Transaction) => {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const qrData = `https://your-store-link.com/review?order=${transaction.orderCode}`;
  const qrCodeDataUrl = await QRCode.toDataURL(qrData);

  const html = `
    <html>
      <head>
        <title>Hóa Đơn - THE DELIA</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          .store-info { text-align: center; margin-bottom: 20px; }
          .invoice-title { font-size: 24px; font-weight: bold; margin: 10px 0; text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
          .total { text-align: right; margin-top: 20px; font-size: 18px; }
          .qr { margin-top: 30px; text-align: center; }
          .cashier-info { margin-top: 20px; text-align: left; }
          @media print { .print-button { display: none; } }
        </style>
      </head>
      <body>
        <div class="store-info">
          <div><strong>THE DELIA</strong></div>
          <div>Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</div>
          <div>Hotline: 0123 456 789</div>
        </div>

        <div class="invoice-title">HÓA ĐƠN THANH TOÁN</div>

        <div><strong>Mã đơn hàng:</strong> ${transaction.orderCode}</div>
        <div><strong>Khách hàng:</strong> ${transaction.customerName}</div>
        <div><strong>Ngày:</strong> ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}</div>
        <div><strong>Hình thức thanh toán:</strong> ${transaction.paymentMethod || "Chưa xác định"}</div>

        <!-- Nhân viên thu ngân -->
        <div class="cashier-info">
          <strong>Nhân viên thu ngân:</strong> ${transaction.cashierName || "Chưa có tên nhân viên"}
        </div>

        <table>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            ${transaction.products
              .map(
                (p) => `
              <tr>
                <td>${p.name}</td>
                <td>${p.quantity}</td>
                <td>${p.price.toLocaleString()}₫</td>
                <td>${(p.quantity * p.price).toLocaleString()}₫</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>

        <div class="total">
          <strong>Tổng cộng: </strong>
          ${transaction.products.reduce((sum, p) => sum + p.price * p.quantity, 0).toLocaleString()}₫
        </div>

        <div class="qr">
          <img src="${qrCodeDataUrl}" width="120" height="120" alt="QR Code" />
          <p>Quét mã để đánh giá cửa hàng</p>
        </div>

        <div class="print-button" onclick="window.print(); this.style.display='none'">🖨️ In hóa đơn</div>
      </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
};

  return (
    <div className={styles.container}>
      <Header />
      <Sidebar />

      <div className={styles.content}>
        <h1 className={styles.title}>Quản Lý Giao Dịch</h1>

        <button
          className={styles.createInvoiceBtn}
          onClick={handleCreateInvoice}
        >
          +Tạo Hóa Đơn Mới
        </button>

        {notification && (
          <div className={styles.notification}>{notification}</div>
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
              <th>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.orderCode}</td>
                <td>{item.customerName}</td>
                <td>
                  {item.products.map((p, idx) => (
                    <div key={idx}>{p.name}</div>
                  ))}
                </td>
                <td>{item.products.reduce((sum, p) => sum + p.quantity, 0)}</td>
                <td>
                  {item.products
                    .reduce((sum, p) => sum + p.price * p.quantity, 0)
                    .toLocaleString()}
                  ₫
                </td>
                <td>
                  <select
                    value={item.status}
                    onChange={(e) =>
                      handleStatusChange(
                        item.id,
                        e.target.value as Transaction["status"]
                      )
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
                  {item.status === "CHƯA THANH TOÁN" && (
                    <button
                      className={styles.paymentBtn}
                      onClick={() => setPaymentInvoice(item)}
                    >
                      Thanh toán
                    </button>
                  )}
                  <button
                    className={styles.printBtn}
                    onClick={() => handlePrintInvoice(item)}
                  >
                    In hóa đơn
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal tạo hóa đơn */}
        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Tạo Hóa Đơn</h2>

              <div className={styles.formGroup}>
                <label>Mã Đơn Hàng</label>
                <input type="text" value={invoiceData.orderCode} disabled />
              </div>

              <div className={styles.formGroup}>
                <label>Khách Hàng</label>
                <input
                  type="text"
                  value={invoiceData.customer}
                  onChange={(e) =>
                    setInvoiceData({ ...invoiceData, customer: e.target.value })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label>Sản Phẩm</label>
                <input
                  type="text"
                  value={invoiceData.products[0].name}
                  onChange={(e) =>
                    setInvoiceData({
                      ...invoiceData,
                      products: [
                        { ...invoiceData.products[0], name: e.target.value },
                      ],
                    })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label>Số Lượng</label>
                <input
                  type="number"
                  value={invoiceData.products[0].quantity}
                  onChange={(e) =>
                    setInvoiceData({
                      ...invoiceData,
                      products: [
                        {
                          ...invoiceData.products[0],
                          quantity: +e.target.value,
                        },
                      ],
                    })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label>Đơn Giá</label>
                <input
                  type="number"
                  value={invoiceData.products[0].price}
                  onChange={(e) =>
                    setInvoiceData({
                      ...invoiceData,
                      products: [
                        { ...invoiceData.products[0], price: +e.target.value },
                      ],
                    })
                  }
                />
                <span>VNĐ</span>
              </div>

              <div className={styles.modalActions}>
                <button className={styles.cancelBtn} onClick={handleCancel}>
                  Hủy
                </button>
                <button className={styles.saveBtn} onClick={handleSave}>
                  Lưu
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Thanh toán */}
        {paymentInvoice && (
          <div className={styles.modal}>
            <div className={styles.invoiceContainer}>
              <h2>🧾 HÓA ĐƠN THANH TOÁN</h2>
              <p>
                Ngày: {new Date().toLocaleDateString()} -{" "}
                {new Date().toLocaleTimeString()}
              </p>

              <div>
                <strong>Mã đơn hàng:</strong> {paymentInvoice.orderCode}
              </div>
              <div>
                <strong>Khách hàng:</strong> {paymentInvoice.customerName}
              </div>

              <div className={styles.formGroup}>
                <label>Hình thức thanh toán</label>
                <select
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className={styles.statusDropdown}
                >
                  <option>Tiền mặt</option>
                  <option>Chuyển khoản</option>
                  <option>QR Pay</option>
                  <option>Thẻ ATM</option>
                  <option>Visa/Mastercard</option>
                </select>
              </div>

              <table className={styles.invoiceTable}>
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentInvoice.products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.quantity}</td>
                      <td>{product.price.toLocaleString()}₫</td>
                      <td>
                        {(product.price * product.quantity).toLocaleString()}₫
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className={styles.modalActions}>
                <button
                  className={styles.cancelBtn}
                  onClick={() => setPaymentInvoice(null)}
                >
                  Hủy
                </button>
                <button
                  className={styles.saveBtn}
                  onClick={() => handleConfirmPayment(paymentInvoice.id)}
                >
                  Xác nhận thanh toán
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
