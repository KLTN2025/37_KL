import { useRouter, usePathname } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import "./Sidebar.css";
import {
  FaChartBar,
  FaBullhorn,
  FaWarehouse,
  FaList,
  FaMoneyBill,
  FaBox,
  FaUserCog,
  FaTachometerAlt,
  FaUserFriends,
  FaTags,
  FaHeadset,
} from "react-icons/fa";

type UserRole = "admin" | "employee"; // ✅ Cập nhật lại đúng role

interface MenuItem {
  icon: JSX.Element;
  text: string | ((role: UserRole) => string);
  getPath: (role: UserRole) => string | null;
}

const fullMenuItems: MenuItem[] = [
  {
    icon: <FaTachometerAlt />,
    text: "Dashboard",
    getPath: () => "/dashboard",
  },
  {
    icon: <FaUserCog />,
    text: "Quản lý tài khoản",
    getPath: (role) => (role === "admin" ? "/admin/account-management" : null),
  },
  {
    icon: <FaUserFriends />,
    text: "Quản lý khách hàng",
    getPath: (role) =>
      role === "employee" ? "/employee/customer-management" : null,
  },
  {
    icon: <FaWarehouse />,
    text: "Quản lý kho",
    getPath: (role) => (role === "admin" ? "/admin/inventory" : null),
  },
  {
    icon: <FaList />,
    text: "Quản lý danh mục",
    getPath: (role) => (role === "admin" ? "/admin/category" : null),
  },
  {
    icon: <FaTags />,
    text: "Quản lý sản phẩm",
    getPath: (role) =>
      role === "employee" ? "/employee/product-management" : null,
  },
  {
    icon: <FaMoneyBill />,
    text: (role) =>
      role === "admin" ? "Quản lý thanh toán" : "Quản lý giao dịch",
    getPath: (role) =>
      role === "admin" ? "/admin/payment" : "/employee/transaction-management",
  },
  {
    icon: <FaBox />,
    text: "Quản lý đơn hàng",
    getPath: () => "/order",
  },
  {
    icon: <FaBullhorn />,
    text: "Marketing/Khuyến Mãi",
    getPath: (role) =>
      role === "admin" ? "/admin/marketing" : "/employee/promotion",
  },
  {
    icon: <FaHeadset />,
    text: "Chăm sóc khách hàng",
    getPath: (role) =>
      role === "employee" ? "/employee/customer-service" : null,
  },
  {
    icon: <FaChartBar />,
    text: "Thống kê",
    getPath: (role) => (role === "admin" ? "/admin/statistic" : null),
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState<UserRole | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole === "admin" || storedRole === "employee") {
      setRole(storedRole);
    }
    setHasMounted(true); // chỉ đánh dấu là đã mount sau khi setRole
  }, []);

  if (!hasMounted || !role) {
    return null; // hoặc loading spinner cũng được
  }
  const handleNavigation = (path: string | null) => {
    if (!path) {
      alert("Bạn không có quyền vào trang này, vui lòng quay lại trang trước.");
      return;
    }
    router.push(path);
  };

  return (
    <div className="sidebar">
      <div className="logo">
        THE DELIA
        <br />
        COUTURE
      </div>
      <div className="menu">
        {fullMenuItems.map((item, idx) => {
          const path = item.getPath(role);
          const isActive = path && pathname.startsWith(path);
          const menuText =
            typeof item.text === "function" ? item.text(role) : item.text;

          return (
            <button
              key={idx}
              className={`menu-item ${isActive ? "active" : ""}`}
              onClick={() => handleNavigation(path)}
              disabled={!path}
            >
              {item.icon}
              <span>{menuText}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
