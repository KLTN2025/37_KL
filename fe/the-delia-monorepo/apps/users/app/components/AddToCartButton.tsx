/* app/components/AddToCartButton.tsx */
"use client";

import { useCallback, useRef } from "react";
import { useCart } from "../context/CartContext";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { BsCart } from "react-icons/bs";
import { Product } from "../mua-sam/data/products";
import styles from "./AddToCartButton.module.css";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  quantity?: number;
}

export default function AddToCartButton({
  product,
  className,
  quantity = 1,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const t = useTranslations("Product");
  const isAdding = useRef(false);
  const lastClickTime = useRef<number>(0);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      if (now - lastClickTime.current < 500) {
        console.log("Click bị bỏ qua vì quá gần nhau");
        return;
      }
      lastClickTime.current = now;

      if (isAdding.current) {
        console.log("handleAddToCart bị bỏ qua vì đang xử lý");
        return;
      }

      isAdding.current = true;
      console.log(`handleAddToCart được gọi cho sản phẩm ${product.id}`);

      if (!product.id || !product.name || !product.price || !product.image) {
        console.error("Sản phẩm không hợp lệ:", product);
        toast.error(t("errorInvalidProduct"), {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        isAdding.current = false;
        return;
      }

      const productId = parseInt(product.id, 10);
      if (isNaN(productId)) {
        console.error("ID sản phẩm không hợp lệ:", product.id);
        toast.error(t("errorInvalidProduct"), {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        isAdding.current = false;
        return;
      }

      addToCart({
        ...product,
        id: productId,
        quantity,
      });

      toast.success(t("addedToCart"), {
        toastId: `add-to-cart-${product.id}`,
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      setTimeout(() => {
        isAdding.current = false;
        console.log("handleAddToCart đã hoàn tất xử lý");
      }, 500);
    },
    [addToCart, product, quantity, t]
  );

  return (
    <button
      onClick={handleAddToCart}
      className={className || styles.addToCartButton}
      aria-label={t("addToCartAria", { name: product.name })}
    >
      <BsCart />
    </button>
  );
}
