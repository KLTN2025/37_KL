"use client";
import { useState } from "react";
import styles from "./order.module.css";
import Sidebar from "@shared/components/Sidebar";
import Header from "@shared/components/Header";


type Order = {
  id: number;
  orderCode: string;
  customerName: string;
  product: string;
  quantity: number;
  unit: string;
  price: number;
  status: string;
};

export default function OrderPage() {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const generateOrderCode = (): string => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    return `HD${randomNumber}`;
  };

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1001,
      orderCode: generateOrderCode(),
      customerName: "Nguyễn Văn A",
      product: "Vest đen",
      quantity: 2,
      price: 500000,
      status: "Đang xử lý",
      unit: "bộ",
    },
    {
      id: 1002,
      orderCode: generateOrderCode(),
      customerName: "Trần Thị B",
      product: "Áo dài",
      quantity: 1,
      price: 700000,
      status: "Đã giao",
      unit: "bộ",
    },
    {
      id: 1003,
      orderCode: generateOrderCode(),
      customerName: "Phan Tứ",
      product: "Áo thun",
      quantity: 3,
      price: 150000,
      status: "Đang xử lý",
      unit: "bộ",
    },
  ]);

  const [formData, setFormData] = useState({
    customerName: "",
    product: "",
    quantity: 1,
    price: 0,
    unit: "bộ",
    status: "Đang xử lý",
    orderCode: "", // chỉ dùng cho edit
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "price" ? Number(value) : value,
    }));
  };

const handleAddOrder = (e: React.FormEvent) => {
  e.preventDefault();
  const newOrder: Order = {
    id: Date.now(),
    ...formData,
    orderCode: generateOrderCode(), // override sau
  };

  setOrders([...orders, newOrder]);
  setIsAdding(false);
  resetForm();
};


  const handleEditOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;

    const updated = orders.map((o) =>
      o.id === editingOrder.id
        ? {
            ...o,
            ...formData,
            id: o.id,
            orderCode: editingOrder.orderCode, // giữ nguyên mã đơn
          }
        : o
    );
    setOrders(updated);
    setIsEditing(false);
    setEditingOrder(null);
    resetForm();
  };

  const handleOpenEdit = (order: Order) => {
    setEditingOrder(order);
    setFormData({
      customerName: order.customerName,
      product: order.product,
      quantity: order.quantity,
      price: order.price,
      unit: order.unit,
      status: order.status,
      orderCode: order.orderCode,
    });
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({
      customerName: "",
      product: "",
      quantity: 1,
      price: 0,
      unit: "bộ",
      status: "Đang xử lý",
      orderCode: "",
    });
  };

  const filteredOrders = orders.filter((order) =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <Header />
      <Sidebar />
      <div className={styles.content}>
        <h1 className={styles.title}>Quản Lý Đơn Hàng</h1>

        <div className={styles.actionBar}>
          <div className={styles.leftActions}>
            <button onClick={() => setIsAdding(true)} className={styles.addBtn}>
              + Thêm đơn hàng
            </button>
          </div>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Tìm kiếm khách hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>MÃ ĐƠN</th>
              <th>KHÁCH HÀNG</th>
              <th>SẢN PHẨM</th>
              <th>SỐ LƯỢNG</th>
              <th>GIÁ</th>
              <th>TRẠNG THÁI</th>
              <th colSpan={2}></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderCode}</td>
                <td>{order.customerName}</td>
                <td>{order.product}</td>
                <td>{order.quantity} {order.unit}</td>
                <td>{order.price.toLocaleString()}₫</td>
                <td>{order.status}</td>
                <td>
                  <div className={styles.actionButtons}>
                    <button
                      className={styles.editBtn}
                      onClick={() => handleOpenEdit(order)}
                    >
                      Cập nhật
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() =>
                        setOrders(orders.filter((o) => o.id !== order.id))
                      }
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(isAdding || isEditing) && (
          <div className={styles.formOverlay}>
            <div className={styles.formPopup}>
              <h2>{isAdding ? "Thêm đơn hàng" : "Cập nhật đơn hàng"}</h2>
              <form
                className={styles.form}
                onSubmit={isAdding ? handleAddOrder : handleEditOrder}
              >
                {isEditing && editingOrder && (
                  <input
                    type="text"
                    value={editingOrder.orderCode}
                    readOnly
                    className={styles.inputReadOnly}
                  />
                )}

                <input
                  name="customerName"
                  type="text"
                  placeholder="Tên khách hàng"
                  value={formData.customerName}
                  onChange={handleFormChange}
                  required
                />
                <input
                  name="product"
                  type="text"
                  placeholder="Sản phẩm"
                  value={formData.product}
                  onChange={handleFormChange}
                  required
                />
                <input
                  name="quantity"
                  type="number"
                  min="1"
                  placeholder="Số lượng"
                  value={formData.quantity}
                  onChange={handleFormChange}
                  required
                />
                <input
                  name="unit"
                  type="text"
                  placeholder="Đơn vị (bộ, cái, chiếc...)"
                  value={formData.unit}
                  onChange={handleFormChange}
                  required
                />
                <input
                  name="price"
                  type="text"
                  placeholder="Giá (VNĐ)"
                  value={Number(formData.price).toLocaleString("vi-VN")}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\D/g, "");
                    const numericValue = parseInt(rawValue) || 0;
                    setFormData({ ...formData, price: numericValue });
                  }}
                  required
                />
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                >
                  <option value="Đang xử lý">Đang xử lý</option>
                  <option value="Đã tiếp nhận">Đã tiếp nhận</option>
                  <option value="Đã giao">Đã giao</option>
                  <option value="Đã hủy">Đã hủy</option>
                </select>
                <div className={styles.formActions}>
                  <button type="submit" className={styles.submitBtn}>
                    {isAdding ? "Thêm" : "Cập nhật"}
                  </button>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => {
                      setIsAdding(false);
                      setIsEditing(false);
                      setEditingOrder(null);
                      resetForm();
                    }}
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
