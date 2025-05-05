/* app/context/CartContext.tsx */
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "react-toastify"; // Import react-toastify

// Định nghĩa kiểu cho sản phẩm trong giỏ hàng
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
  material: string;
  category?: string; 
  subCategory?: string; 
  description?: string; 
  colors?: string[]; 
  sizes?: string[]; 
  images?: string[]; 
  fabricImage?: string; 
  favorites?: number; 
}

// Định nghĩa kiểu cho context
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

// Tạo context với giá trị mặc định là undefined
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider để bọc ứng dụng và cung cấp CartContext
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load giỏ hàng từ localStorage khi ứng dụng khởi động
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        } else {
          console.warn("Dữ liệu giỏ hàng trong localStorage không hợp lệ, khởi tạo giỏ hàng rỗng.");
          setCartItems([]);
        }
      }
    } catch (error) {
      console.error("Lỗi khi đọc giỏ hàng từ localStorage:", error);
      setCartItems([]);
    }
  }, []);

  // Lưu giỏ hàng vào localStorage mỗi khi cartItems thay đổi
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Lỗi khi lưu giỏ hàng vào localStorage:", error);
    }
  }, [cartItems]);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Cập nhật số lượng sản phẩm
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook để sử dụng CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};