"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // dùng router để chuyển trang
import styles from "./forgot-password.module.css";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: Giao diện nhập Email & SDT, 2: Giao diện mã xác nhận + mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  // Form input
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [notification, setNotification] = useState("");

  const router = useRouter(); // ✅ Khởi tạo router
  // Regex đơn giản để kiểm tra định dạng email và số điện thoại
  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone: string) => /^\d{9,11}$/.test(phone);

  const handleSendCode = () => {
    if (!email || !phone) {
      setNotification("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (!isValidPhone(phone)) {
      setNotification("Sai Số điện thoại! Vui lòng nhập lại!");
      return;
    }
    if (!isValidEmail(email)) {
      setNotification("Sai Email! Vui lòng nhập lại!");
      return;
    }

    // Giả sử gửi mã thành công
    setNotification("");
    setStep(2);
  };

  const handleResetPassword = () => {
    if (!code || !password || !confirmPassword) {
      setNotification("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (code !== "123456") {
      setNotification("Nhập sai Mã xác nhận");
      return;
    }
    if (password !== confirmPassword) {
      setNotification("Xác nhận mật khẩu không khớp");
      return;
    }

    setNotification("Lấy lại tài khoản thành công");

     // ✅ Tự động chuyển về giao diện đăng nhập sau 2 giây
     setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.resetBox}>
        <h2 className={styles.title}>Quên Mật Khẩu</h2>

        {notification && (
          <div className={styles.notification}>{notification}</div>
        )}

        {step === 1 ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.input}
            />
            <button className={styles.button} onClick={handleSendCode}>
              Gửi Mã Xác Nhận
              
            </button>
            <p className={styles.loginLink}>
              <a href="/login">Quay Lại Đăng Nhập</a>
            </p>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Mã xác nhận"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={styles.input}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu mới"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Xác nhận mật khẩu mới"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
            />
            <div className={styles.options}>
              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  id="show-password"
                  onChange={toggleShowPassword}
                />
                <label htmlFor="show-password">Hiện mật khẩu</label>
              </div>
            </div>
            <button className={styles.button} onClick={handleResetPassword}>
              Lấy lại tài khoản
            </button>
            <p className={styles.loginLink}>
              <a href="/login">Quay Lại Đăng Nhập</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
