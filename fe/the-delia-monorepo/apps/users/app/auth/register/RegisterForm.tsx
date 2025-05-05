// app/auth/register/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./RegisterForm.module.css";

export default function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !surname || !email || !password || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp.");
      return;
    }
    setError("");
    // Xử lý logic đăng ký (gọi API hoặc next-auth)
    console.log("Đăng ký với:", { name, surname, email, password });
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.authBox}>
          <div className={styles.tabs}>
            <Link href="/auth/register" className={`${styles.tab} ${styles.activeTab}`}>
              ĐĂNG KÝ
            </Link>
            <Link href="/auth/login" className={styles.tab}>
              ĐĂNG NHẬP
            </Link>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">* Tên</label>
              <input
                id="name"
                type="text"
                placeholder="Tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="surname">* Họ</label>
              <input
                id="surname"
                type="text"
                placeholder="Họ"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">* Địa chỉ Email</label>
              <input
                id="email"
                type="email"
                placeholder="Địa chỉ Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">* Mật khẩu</label>
              <input
                id="password"
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">* Xác nhận mật khẩu</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.submitButton}>
              THAM GIA The delia couture
            </button>
          </form>
          <div className={styles.socialLogin}>
            <p>HOẶC ĐĂNG KÝ VỚI</p>
            <div className={styles.socialButtons}>
              <button className={styles.socialButton}>
                <FaGoogle /> GOOGLE
              </button>
              <button className={styles.socialButton}>
                <FaFacebookF /> FACEBOOK
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}