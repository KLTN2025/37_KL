"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

const fakeUsers = [
  {
    email: "admin@gmail.com",
    password: "a121212",
    name: "Admin Nguyễn",
    role: "admin",
  },
  {
    email: "nhanvien@gmail.com",
    password: "1234567890",
    name: "Nhân viên Trần",
    role: "employee",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"admin" | "employee" | "">("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password || !userType) {
      setError("Vui lòng nhập đầy đủ thông tin và chọn vai trò.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      const matchedUser = fakeUsers.find(
        (u) =>
          u.email === email && u.password === password && u.role === userType
      );

      if (matchedUser) {
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem("token", "fake-jwt-token");
        localStorage.setItem("userName", matchedUser.name);
        localStorage.setItem("userRole", matchedUser.role);

        // Điều hướng tới dashboard dùng chung
        router.push("/dashboard");
      } else {
        setError("Email, mật khẩu hoặc vai trò không chính xác.");
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Đăng Nhập</h2>

        {error && <div className={styles.error}>{error}</div>}

        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Mật khẩu"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <div className={styles.options}>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="show-password"
              className={styles.checkboxInput}
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              disabled={loading}
            />
            <label htmlFor="show-password" className={styles.checkboxLabel}>
              Hiển thị mật khẩu
            </label>
          </div>
        </div>

        <div className={styles.roleOptions}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="userType"
              value="admin"
              checked={userType === "admin"}
              onChange={() => setUserType("admin")}
              className={styles.radioInput}
              disabled={loading}
            />
            Admin
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="userType"
              value="employee"
              checked={userType === "employee"}
              onChange={() => setUserType("employee")}
              className={styles.radioInput}
              disabled={loading}
            />
            Nhân viên
          </label>
        </div>

        <button
          className={styles.button}
          onClick={handleLogin}
          disabled={loading}
        >
          <div className={styles.buttonContent}>
            {loading && <div className={styles.spinner} />}
            {loading ? "ĐANG ĐĂNG NHẬP..." : "ĐĂNG NHẬP"}
          </div>
        </button>

        <p className={styles.forgot}>
          <a href="/forgot-password">Quên mật khẩu?</a>
        </p>
      </div>
    </div>
  );
}
