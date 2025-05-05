"use client";

import React, { ChangeEvent, useState } from "react";
import styles from "./AccountModal.module.css";
import { FaUser } from "react-icons/fa";

interface User {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  user = { name: "", email: "", phone: "", address: "" },
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [phone, setPhone] = useState(user.phone || "");
  const [address, setAddress] = useState(user.address || "");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!isOpen) return null;

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Avatar mới:", file);
      // TODO: Gọi API đổi avatar ở đây
    }
  };

  const handleSaveInfo = () => {
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và xác nhận không khớp.");
      return;
    }

    console.log("Lưu thông tin mới:", {
      phone,
      address,
      oldPassword,
      newPassword,
    });

    // TODO: Gọi API lưu thông tin người dùng tại đây
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h2>THÔNG TIN TÀI KHOẢN</h2>
        </div>

        <div className={styles.body}>
          <div className={styles.leftSide}>
            <div className={styles.avatarContainer}>
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className={styles.avatar} />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  <FaUser className={styles.userIcon} />
                </div>
              )}
              <label
                htmlFor="uploadAvatar"
                className={styles.uploadAvatarLabel}
              >
                Đổi ảnh
              </label>
              <input
                type="file"
                id="uploadAvatar"
                className={styles.uploadAvatarInput}
                onChange={handleAvatarChange}
              />
            </div>
          </div>

          <div className={styles.rightSide}>
            <div className={styles.inputGroup}>
              <label>Tên người dùng</label>
              <input type="text" value={user.name} disabled />
            </div>
            <div className={styles.inputGroup}>
              <label>Gmail</label>
              <input type="email" value={user.email} disabled />
            </div>

            <div className={styles.inputGroup}>
              <label>Số điện thoại</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!showForm}
                placeholder="Chưa có số điện thoại"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Địa chỉ</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={!showForm}
                placeholder="Chưa có địa chỉ"
              />
            </div>

            {showForm && (
              <>
                <div className={styles.inputGroup}>
                  <label>Mật khẩu cũ</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Nhập mật khẩu cũ"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Mật khẩu mới</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Xác nhận mật khẩu mới</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Xác nhận mật khẩu mới"
                  />
                </div>
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label htmlFor="showPassword">Hiện mật khẩu</label>
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelButton} onClick={onClose}>
            Hủy
          </button>

          {showForm ? (
            <>
              <button
                className={styles.backButton}
                onClick={() => setShowForm(false)}
              >
                Quay Lại
              </button>
              <button className={styles.saveButton} onClick={handleSaveInfo}>
                Lưu
              </button>
            </>
          ) : (
            <button
              className={styles.changePasswordButton}
              onClick={() => setShowForm(true)}
            >
              Cập Nhật Thông Tin
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountModal;
