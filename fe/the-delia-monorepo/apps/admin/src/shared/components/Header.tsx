"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import AccountModal from "@shared/components/AccountModal";
import "./Header.css";

// Cần đủ 3 thuộc tính: name, role, email
interface User {
  name: string;
  role: string;
  email: string;
}

export default function Header() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName") || "Không rõ";
    const role = localStorage.getItem("userRole") || "Không rõ";
    const email = localStorage.getItem("userEmail") || "khongro@example.com"; // giả định nếu không có email
    setUserName(name);
    setUserRole(role === "admin" ? "Quản trị viên" : "Nhân viên");
    setUserEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  const handleUserClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const user: User = {
    name: userName,
    role: userRole,
    email: userEmail,
  };

  return (
    <header className="header">
      <div className="header-actions">
        <button className="user-info-button" onClick={handleUserClick}>
          <div className="user-icon">
            <FaUserAlt style={{ color: "white" }} />
          </div>
          <div className="user-text">
            <div className="user-name">{userName}</div>
            <div className="user-role">{userRole}</div>
          </div>
        </button>

        <button className="logout-button" onClick={handleLogout}>
          Đăng Xuất
        </button>
      </div>

      {/* ✅ Truyền đầy đủ name, role, email */}
      <AccountModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={user}
      />
    </header>
  );
}
