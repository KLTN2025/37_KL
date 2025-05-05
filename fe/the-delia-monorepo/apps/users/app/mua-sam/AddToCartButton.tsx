/* components/AddToCartButton.tsx */
"use client";

import React, { useCallback, useRef } from "react";
import styles from "./ProductDetail.module.css";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import Link from "next/link";

// Định nghĩa kiểu Product đồng bộ với app/mua-sam/page.tsx
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description?: string;
  material?: string;
  colors?: string[];
  sizes?: string[];
  images?: string[];
  fabricImage?: string;
  favorites?: number;
}

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  quantity?: number; // Thêm quantity vào props
}

export default function AddToCartButton({ product, className, quantity = 1 }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const isAdding = useRef(false); // Biến kiểm soát để ngăn chặn gọi nhiều lần
  const lastClickTime = useRef<number>(0); // Theo dõi thời gian click cuối cùng

  const handleAddToCart = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      // Kiểm tra thời gian giữa các lần click (debounce)
      const now = Date.now();
      if (now - lastClickTime.current < 500) {
        console.log("Click bị bỏ qua vì quá gần nhau");
        return;
      }
      lastClickTime.current = now;

      // Ngăn chặn nếu đang xử lý
      if (isAdding.current) {
        console.log("handleAddToCart bị bỏ qua vì đang xử lý");
        return;
      }

      isAdding.current = true;
      console.log(`handleAddToCart được gọi cho sản phẩm ${product.id}`);

      addToCart({ ...product, quantity }); // Sử dụng quantity từ props

      toast.success(
        <div>
          Đã thêm vào giỏ hàng
          <div style={{ marginTop: "10px" }}>
            <Link href="/cart" style={{ color: "#0070f3", textDecoration: "none" }}>
              Xem ngay
            </Link>
          </div>
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          toastId: "addToCart",
        }
      );

      // Reset trạng thái sau khi xử lý
      setTimeout(() => {
        isAdding.current = false;
        console.log("handleAddToCart đã hoàn tất xử lý");
      }, 500); // Thời gian chờ 500ms để ngăn chặn click liên tiếp
    },
    [addToCart, product, quantity]
  );

  return (
    <button
      onClick={handleAddToCart}
      className={className || styles.cartIconWrapper}
    >
      {className ? (
        "Thêm vào giỏ hàng" // Hiển thị text nếu dùng style addToCartButton
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#333"
          viewBox="0 0 16 16"
        >
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
      )}
    </button>
  );
}