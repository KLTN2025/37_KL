import React, { useState } from "react";
import "./PermissionModal.css";

interface PermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountName: string;
}

const functionList = [
  "Thêm Tài Khoản",
  "Phân Quyền Tài Khoản",
  "Khóa/Mở Tài Khoản Khách",
  "Xóa Tài Khoản Nhân Viên",
  "Thêm Hàng Hóa Nhập",
  "Cập Nhật Trạng Thái Hàng",
  "Xóa Hàng Trong Kho",
  "Thêm Danh Mục Mới",
  "Thêm Sản Phẩm Mới",
  "Sửa Sản Phẩm",
  "Xóa Danh Mục/Sản Phẩm",
  "Tạo Hóa Đơn",
  "Thanh Toán",
  "In Hóa Đơn",
  "Cập Nhật Trạng Thái Hóa Đơn",
  "Liên Hệ Mail Xác Nhận Thanh Toán",
  "Thêm Mới Đơn Hàng",
  "Cập Nhật Trạng Thái Đơn Hàng",
  "Thêm/Xóa Mã Giảm Giá",
  "Xem Mã Giảm Giá",
];

const PermissionModal: React.FC<PermissionModalProps> = ({
  isOpen,
  onClose,
  accountName,
}) => {
  const [selectedRoles, setSelectedRoles] = useState<
    (null | "Admin" | "Nhân viên")[]
  >(Array(functionList.length).fill(null));

  const [grantedPermissions, setGrantedPermissions] = useState<{
    admin: number[];
    staff: number[];
  }>({
    admin: [],
    staff: [],
  });

  const handleSelectRole = (index: number, role: "Admin" | "Nhân viên") => {
    const updated = [...selectedRoles];
    updated[index] = role;
    setSelectedRoles(updated);
  };

const handleBulkGrant = () => {
  const newAdmin = [...grantedPermissions.admin];
  const newStaff = [...grantedPermissions.staff];

  selectedRoles.forEach((role, index) => {
    if (role === "Admin" && !newAdmin.includes(index)) {
      newAdmin.push(index);
    } else if (role === "Nhân viên" && !newStaff.includes(index)) {
      newStaff.push(index);
    }
  });

  setGrantedPermissions({ admin: newAdmin, staff: newStaff });
  setSelectedRoles(Array(functionList.length).fill(null)); // Reset sau khi cấp
};

  const handleRemovePermission = (
    index: number,
    role: "Admin" | "Nhân viên"
  ) => {
    setGrantedPermissions((prev) => {
      if (role === "Admin") {
        return { ...prev, admin: prev.admin.filter((i) => i !== index) };
      } else {
        return { ...prev, staff: prev.staff.filter((i) => i !== index) };
      }
    });
  };

const handleSavePermissions = async () => {
  // Tạo payload riêng cho quyền của Admin và Nhân viên
  const adminPermissions = grantedPermissions.admin.map((i) => ({
    id: i,
    name: functionList[i],
  }));

  const staffPermissions = grantedPermissions.staff.map((i) => ({
    id: i,
    name: functionList[i],
  }));

  const payload = {
    accountName,
    permissions: {
      admin: adminPermissions, // Quyền của Admin
      staff: staffPermissions, // Quyền của Nhân viên
    },
  };

  console.log("🚀 Quyền sẽ lưu vào DB:", payload);

  // Gọi API để lưu quyền (comment nếu không dùng thực tế)
  try {
    await fetch("/api/permissions", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    // Đóng modal sau khi lưu thành công
    onClose();

    // Reset dữ liệu quyền sau khi lưu thành công
    setGrantedPermissions({ admin: [], staff: [] });
    setSelectedRoles(Array(functionList.length).fill(null)); // Reset quyền đã chọn
  } catch (error) {
    console.error("Lỗi khi lưu quyền:", error);
    // Có thể thông báo lỗi cho người dùng nếu cần
  }
};


  if (!isOpen) return null;

  return (
    <div className="permission-modal-overlay">
      <div className="permission-modal">
        <div className="permission-header">
          <h2>Phân Quyền {accountName}</h2>
          <button className="grant-all-btn" onClick={handleBulkGrant}>
            Cấp quyền
          </button>
        </div>

        <table className="permission-table">
          <thead>
            <tr>
              <th>Danh sách chức năng</th>
              <th className="assign-header">Phân Quyền Cho</th>
              <th className="role-column">Admin</th>
              <th className="role-column">Nhân viên</th>
            </tr>
          </thead>
          <tbody>
            {functionList.map((funcName, i) => (
              <tr key={i}>
                <td>
                  {i + 1}. {funcName}
                </td>
                <td>
                  <label>
                    <input
                      type="radio"
                      name={`role-${i}`}
                      value="Admin"
                      checked={selectedRoles[i] === "Admin"}
                      onChange={() => handleSelectRole(i, "Admin")}
                    />{" "}
                    Admin
                  </label>
                  <label style={{ marginLeft: "8px" }}>
                    <input
                      type="radio"
                      name={`role-${i}`}
                      value="Nhân viên"
                      checked={selectedRoles[i] === "Nhân viên"}
                      onChange={() => handleSelectRole(i, "Nhân viên")}
                    />{" "}
                    Nhân viên
                  </label>
                </td>
                <td>
                  {grantedPermissions.admin.includes(i) && (
                    <span className="granted-badge admin">
                      ✔ Quyền này dành cho <b>account Admin</b>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemovePermission(i, "Admin")}
                      >
                        Xoá
                      </button>
                    </span>
                  )}
                </td>
                <td>
                  {grantedPermissions.staff.includes(i) && (
                    <span className="granted-badge staff">
                      ✔ Quyền này dành cho <b>account Nhân viên</b>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemovePermission(i, "Nhân viên")}
                      >
                        Xoá
                      </button>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Huỷ
          </button>
          <button className="save-btn" onClick={handleSavePermissions}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionModal;
