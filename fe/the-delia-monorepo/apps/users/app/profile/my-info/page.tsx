/* app/profile/my-info/page.tsx */
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "../../context/AuthContext";
import styles from "./MyInfo.module.css";

export default function MyInfoPage() {
  const t = useTranslations("Profile");
  const { user } = useAuth();

  // Trạng thái để lưu thông tin chỉnh sửa
  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    phone: user?.phone || "",
  });

  // Trạng thái để hiển thị modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Trạng thái cho thông tin địa chỉ trong modal
  const [addressData, setAddressData] = useState({
    fullName: "",
    email: user?.email || "",
    country: "", // Đổi từ district thành country
    phone: "",
    city: "", // Đổi từ ward thành city
    districtText: "", // Giữ nguyên districtText
    street: "",
    postalCode: "",
  });

  // Xử lý thay đổi input trong form chính
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý thay đổi input trong modal
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý lưu thông tin (giả lập, có thể tích hợp API sau)
  const handleSave = () => {
    console.log("Saved info:", formData);
  };

  // Xử lý hủy chỉnh sửa
  const handleCancel = () => {
    setFormData({
      email: user?.email || "",
      firstName: user?.name?.split(" ")[0] || "",
      lastName: user?.name?.split(" ")[1] || "",
      phone: user?.phone || "",
    });
  };

  // Xử lý lưu địa chỉ từ modal (giả lập, có thể tích hợp API sau)
  const handleSaveAddress = () => {
    console.log("Saved address:", addressData);
    setIsModalOpen(false);
  };

  // Xử lý hủy modal
  const handleCancelAddress = () => {
    setAddressData({
      fullName: "",
      email: user?.email || "",
      country: "",
      phone: "",
      city: "",
      districtText: "",
      street: "",
      postalCode: "",
    });
    setIsModalOpen(false);
  };

  if (!user) {
    return (
      <div className={styles.mainContent}>
        <h1 className={styles.pageTitle}>{t("myInfo")}</h1>
        <div className={styles.notLoggedIn}>{t("notLoggedIn")}</div>
      </div>
    );
  }

  return (
    <div className={styles.mainContent}>
      <h1 className={styles.pageTitle}>{t("myInfo")}</h1>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label>{t("email")} <span className={styles.required}>*</span></label>
            <div className={styles.inputWrapper}>
              <span className={styles.userIcon}>M</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                disabled
              />
            </div>
          </div>
          <div className={styles.nameRow}>
            <div className={styles.inputGroup}>
              <label>{t("firstName")} <span className={styles.required}>*</span></label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={styles.input}
                />
                <span className={styles.checkmark}>✔</span>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>{t("lastName")} <span className={styles.required}>*</span></label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={styles.input}
                />
                <span className={styles.checkmark}>✔</span>
              </div>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>{t("phone")} <span className={styles.required}>*</span></label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t("phonePlaceholder")}
                className={styles.input}
              />
              <span className={styles.checkmark}>✔</span>
            </div>
          </div>
          <div className={styles.buttonGroup}>
            <button type="button" onClick={handleCancel} className={styles.cancelButton}>
              {t("cancel")}
            </button>
            <button type="button" onClick={handleSave} className={styles.saveButton}>
              {t("save")}
            </button>
          </div>
        </form>
      </div>
      <div className={styles.addressSection}>
        <div className={styles.addressHeader}>
          <h2>{t("addressList")}</h2>
          <button
            className={styles.addAddressButton}
            onClick={() => setIsModalOpen(true)}
          >
            + {t("addAddress")}
          </button>
        </div>
      </div>

      {/* Modal để thêm địa chỉ */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button
              className={styles.closeButton}
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <h2 className={styles.modalTitle}>{t("addAddress")}</h2>
            <form className={styles.modalForm}>
              <div className={styles.inputGroup}>
                <label>{t("fullName")} <span className={styles.required}>*</span></label>
                <input
                  type="text"
                  name="fullName"
                  value={addressData.fullName}
                  onChange={handleAddressChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>{t("email")} <span className={styles.required}>*</span></label>
                <input
                  type="email"
                  name="email"
                  value={addressData.email}
                  onChange={handleAddressChange}
                  className={styles.input}
                  placeholder={t("emailPlaceholder")}
                />
              </div>
              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <label>{t("country")} <span className={styles.required}>*</span></label>
                  <select
                    name="country"
                    value={addressData.country}
                    onChange={handleAddressChange}
                    className={styles.input}
                  >
                    <option value="">{t("selectCountry")}</option>
                    <option value="vn">Việt Nam</option>
                    <option value="us">United States</option>
                    <option value="jp">Japan</option>
                    {/* Thêm các lựa chọn khác nếu cần */}
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label>{t("phone")} <span className={styles.required}>*</span></label>
                  <input
                    type="text"
                    name="phone"
                    value={addressData.phone}
                    onChange={handleAddressChange}
                    placeholder={t("phonePlaceholder")}
                    className={styles.input}
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label>{t("city")} <span className={styles.required}>*</span></label>
                <select
                  name="city"
                  value={addressData.city}
                  onChange={handleAddressChange}
                  className={styles.input}
                >
                  <option value="">{t("selectCity")}</option>
                  <option value="hcm">Hồ Chí Minh</option>
                  <option value="hanoi">Hà Nội</option>
                  <option value="danang">Đà Nẵng</option>
                  {/* Thêm các lựa chọn khác nếu cần */}
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>{t("district")} <span className={styles.required}>*</span></label>
                <input
                  type="text"
                  name="districtText"
                  value={addressData.districtText || ""}
                  onChange={handleAddressChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>{t("street")} <span className={styles.required}>*</span></label>
                <input
                  type="text"
                  name="street"
                  value={addressData.street}
                  onChange={handleAddressChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>{t("postalCode")} <span className={styles.required}>*</span></label>
                <input
                  type="text"
                  name="postalCode"
                  value={addressData.postalCode}
                  onChange={handleAddressChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.buttonGroup}>
                <button type="button" onClick={handleCancelAddress} className={styles.cancelButton}>
                  {t("cancel")}
                </button>
                <button type="button" onClick={handleSaveAddress} className={styles.saveButton}>
                  {t("save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}