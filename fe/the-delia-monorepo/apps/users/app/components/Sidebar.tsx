/* app/components/Sidebar.tsx */
"use client";

import Link from "next/link";
import { useTranslations } from "next-intl"; // Xóa useLocale vì không cần nữa
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const t = useTranslations("Profile");
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Kiểm tra session từ next-auth thay vì localStorage
    if (session?.user?.name) {
      setUserName(session.user.name);
    } else {
      setUserName("");
    }

    // Giữ logic localStorage hiện có (như yêu cầu không xóa)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserName(user?.name || "User");
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        setUserName("User");
      }
    } else {
      setUserName("");
    }
  }, [session]);

  const handleLogout = async () => {
    // Xóa localStorage (giữ nguyên logic hiện có)
    localStorage.removeItem("user");
    // Sử dụng signOut từ next-auth để đăng xuất
    await signOut({ redirect: false }); // Đăng xuất mà không tự động chuyển hướng
    router.push("/"); // Chuyển hướng về trang chính /
  };

  const isActive = (path: string) => pathname === path; // Giữ nguyên hàm isActive, không cần locale

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.greeting}>
        {t("greeting")} <br />
        {userName || t("notLoggedIn")}
      </h2>
      <nav className={styles.nav}>
        <Link
          href="/profile/my-order" // Xóa locale, giữ nguyên đường dẫn gốc
          className={`${styles.navItem} ${isActive("/profile/my-order") ? styles.active : ""}`}
        >
          <i className="bi bi-box-seam"></i> {t("myOrders")}
        </Link>
        <Link
          href="/profile/my-info" // Xóa locale
          className={`${styles.navItem} ${isActive("/profile/my-info") ? styles.active : ""}`}
        >
          <i className="bi bi-person"></i> {t("myInfo")}
        </Link>
        <Link
          href="/profile/favorites" // Xóa locale
          className={`${styles.navItem} ${isActive("/profile/favorites") ? styles.active : ""}`}
        >
          <i className="bi bi-heart"></i> {t("favorites")}
        </Link> 
        <Link
          href="/profile/lien-he" // Xóa locale
          className={`${styles.navItem} ${isActive("/profile/lien-he") ? styles.active : ""}`}
        >
          <i className="bi bi-envelope"></i> {t("contact")}
        </Link>
        <button onClick={handleLogout} className={styles.navItem}>
          <i className="bi bi-box-arrow-right"></i> {t("logout")}
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;