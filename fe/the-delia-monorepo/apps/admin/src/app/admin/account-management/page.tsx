"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Sidebar from "@shared/components/Sidebar";
import Header from "@shared/components/Header";
import PermissionModal from "@shared/components/PermissionModal"; // đường dẫn chỉnh tùy theo cấu trúc thư mục

interface Account {
  address: string;
  id: number;
  name: string;
  phone: string;
  email: string;
  role: string;
  status: string;
}

type AccountType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
};

export default function AccountManagement() {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AccountType | null>(
    null
  );

  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = (msg: string) => {
    setToastMsg(msg);
    setShowToast(false); // Reset animation
    setTimeout(() => setShowToast(true), 10); // Delay 10ms để trigger re-render & animation lại
  }

 const [accounts, setAccounts] = useState<Account[]>([
   {
     id: 1,
     name: "Nguyễn Văn A",
     phone: "0901234567",
     email: "a.nguyen@example.com",
     role: "Admin",
     status: "Hoạt động",
     address: "123 Đường ABC, Quận 1",
   },
   {
     id: 2,
     name: "Trần Thị B",
     phone: "0902345678",
     email: "b.tran@example.com",
     role: "Nhân viên",
     status: "Khóa",
     address: "456 Đường DEF, Quận 2",
   },
   {
     id: 3,
     name: "Lê Thị C",
     phone: "0903456789",
     email: "c.le@example.com",
     role: "Khách hàng",
     status: "Hoạt động",
     address: "789 Đường XYZ, Quận 3",
   },
 ])


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleOpenPermission = (account: AccountType) => {
    setSelectedAccount(account);
    setIsPermissionModalOpen(true);
  };

 const [formData, setFormData] = useState({
   name: "",
   phone: "",
   email: "",
   role: "",
   status: "Hoạt động",
   address: "",
 });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const newAccount: Account = {
      id: Date.now(),
      ...formData,
    };
    setAccounts([...accounts, newAccount]);
    setFormData({
      name: "",
      phone: "",
      email: "",
      role: "",
      status: "Hoạt động",
      address: "",
    });
    setIsAdding(false);
  };

  const handleEditAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAccount) return;
    const updated = accounts.map((acc) =>
      acc.id === editingAccount.id ? { ...acc, ...formData, id: acc.id } : acc
    );
    setAccounts(updated);
    setEditingAccount(null);
    setFormData({
      name: "",
      phone: "",
      email: "",
      role: "",
      status: "Hoạt động",
      address: "",
    });
    setIsEditing(false);
  };

  const handleOpenEdit = (account: Account) => {
    if (account.role === "Khách hàng") {
      showToastMessage("🚫 Bạn không thể cập nhật thông tin khách hàng!");
      return;
    }
    setEditingAccount(account);
    setFormData({
      name: account.name,
      phone: account.phone,
      email: account.email,
      role: account.role,
      status: account.status,
      address: account.address, 
    });
    setIsEditing(true);
  }

  const handleToggleStatus = (id: number) => {
    const target = accounts.find((acc) => acc.id === id);
    if (!target) return;

    const newStatus = target.status === "Hoạt động" ? "Khóa" : "Hoạt động";

    setAccounts((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, status: newStatus } : acc))
    );

    alert(`${newStatus === "Khóa" ? "Đã khóa" : "Đã mở khóa"} ${target.name}`);
  };

  const filteredAccounts = accounts.filter((acc) =>
    acc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className={styles.container}>
      <Header />
      <Sidebar />
      <div className={styles.content}>
        <h1 className={styles.title}>Quản Lý Tài Khoản(Admin)</h1>

        <div className={styles.actionBar}>
          <div className={styles.leftActions}>
            <button onClick={() => setIsAdding(true)} className={styles.addBtn}>
              + THÊM
            </button>
          </div>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Tìm kiếm ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên Đăng Nhập</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredAccounts.map((acc, idx) => (
              <tr key={acc.id}>
                <td>{idx + 1}</td>
                <td>{acc.name}</td>
                <td>{acc.email}</td>
                <td>{acc.phone}</td>
                <td>{acc.address}</td>
                <td>
                  <span
                    className={
                      acc.role === "Admin"
                        ? styles.roleAdmin
                        : acc.role === "Nhân viên"
                          ? styles.roleStaff
                          : styles.roleCustomer
                    }
                  >
                    {acc.role}
                  </span>
                </td>

                <td>
                  {acc.status === "Hoạt động" ? (
                    <span className={styles.activeStatus}>🟢 Hoạt động</span>
                  ) : (
                    <span className={styles.inactiveStatus}>🔒 Khóa</span>
                  )}
                </td>
                <td>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleOpenEdit(acc)}
                  >
                    Cập nhật
                  </button>
                  <button
                    className={styles.lockBtn}
                    onClick={() => handleToggleStatus(acc.id)}
                  >
                    {acc.status === "Hoạt động" ? "Khóa" : "Mở khóa"}
                  </button>
                  {acc.role !== "Khách hàng" && (
                    <button
                      className={styles.permissionBtn}
                      onClick={() => {
                        setSelectedAccount(acc);
                        setIsPermissionModalOpen(true);
                      }}
                    >
                      Phân quyền
                    </button>
                  )}

                  <PermissionModal
                    isOpen={isPermissionModalOpen}
                    onClose={() => setIsPermissionModalOpen(false)}
                    accountName={
                      selectedAccount ? selectedAccount.name : "Người dùng"
                    } // Nếu có tài khoản được chọn, sẽ hiển thị tên tài khoản, nếu không thì mặc định là "Người dùng"
                  />

                  <button
                    className={styles.deleteBtn}
                    onClick={() => {
                      if (acc.role === "Khách hàng") {
                        showToastMessage(
                          "⚠️ Bạn chỉ xóa tài khoản này sau 1 năm không hoạt động!"
                        );
                      } else {
                        setAccounts(accounts.filter((a) => a.id !== acc.id));
                      }
                    }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(isAdding || isEditing) && (
          <div className={styles.formOverlay}>
            <div className={styles.formPopup}>
              <h2>{isAdding ? "Thêm tài khoản" : "Cập nhật tài khoản"}</h2>
              <form
                className={styles.form}
                onSubmit={isAdding ? handleAddAccount : handleEditAccount}
              >
                {/* ID chỉ hiện khi cập nhật */}
                {isEditing && editingAccount && (
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      value={editingAccount.id}
                      readOnly
                      className={styles.inputReadOnly}
                    />
                  </div>
                )}

                <div className={styles.formGroup}>
                  <input
                    name="name"
                    type="text"
                    placeholder="Nhập tên đăng nhập"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>

                  <input
                    name="email"
                    type="email"
                    placeholder="Nhập email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  
                  <input
                    name="phone"
                    type="text"
                    placeholder="Nhập số điện thoại"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">-- Chọn vai trò --</option>
                    <option value="Admin">Admin</option>
                    <option value="Nhân viên">Nhân viên</option>
                  </select>
                </div>

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
                      setEditingAccount(null);
                      setFormData({
                        name: "",
                        phone: "",
                        email: "",
                        role: "",
                        status: "Hoạt động",
                        address: "Địa chỉ",
                      });
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

      {showToast && <div className={styles.toast}>{toastMsg}</div>}
    </div>
  );
}
