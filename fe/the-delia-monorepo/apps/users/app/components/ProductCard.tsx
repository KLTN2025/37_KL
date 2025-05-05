/* components/ProductCard.tsx */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";
import { FaRegHeart } from "react-icons/fa";
import AddToCartButton from "./AddToCartButton";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import styles from "./ProductCard.module.css";
import { Product, Category } from "../mua-sam/data/products";

const ProductCard = ({
  product,
  category,
}: {
  product: Product;
  category: Category;
}) => {
  const [favorites, setFavorites] = useState(product.favorites || 0);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const t = useTranslations("Product");
  const isProcessing = useRef(false);

  // Kiểm tra dữ liệu hợp lệ
  if (!product.subCategory || !product.id) {
    return <div>{t("errorInvalidProduct")}</div>;
  }

  // Khôi phục trạng thái yêu thích từ localStorage khi component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const favoritesList = JSON.parse(storedFavorites);
      const isProductFavorited = favoritesList.some(
        (item: Product) => item.id === product.id
      );
      setIsFavorited(isProductFavorited);
    }
  }, [product.id]);

  const handleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation(); // Ngăn chặn sự kiện lan tỏa
      if (isProcessing.current) {
        console.log("handleFavorite bị bỏ qua vì đang xử lý");
        return;
      }
      isProcessing.current = true;
      console.log(`handleFavorite được gọi cho sản phẩm ${product.id}`);
      const newIsFavorited = !isFavorited;
      const newFavorites = isFavorited ? favorites - 1 : favorites + 1;
      setFavorites(newFavorites);
      setIsFavorited(newIsFavorited);
      // Cập nhật danh sách yêu thích trong localStorage
      const storedFavorites = localStorage.getItem("favorites");
      let favoritesList: Product[] = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];
      if (newIsFavorited) {
        // Thêm sản phẩm vào danh sách yêu thích
        const productToAdd: Product = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: category,
          subCategory: product.subCategory,
          favorites: newFavorites,
          quantity: 0,
        };
        favoritesList.push(productToAdd);
      } else {
        // Xóa sản phẩm khỏi danh sách yêu thích
        favoritesList = favoritesList.filter(
          (item: Product) => item.id !== product.id
        );
      }
      localStorage.setItem("favorites", JSON.stringify(favoritesList));
      toast.success(
        newIsFavorited ? t("addedToFavorites") : t("removedFromFavorites"),
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        }
      );
      setTimeout(() => {
        isProcessing.current = false;
        console.log("handleFavorite đã hoàn tất xử lý");
      }, 300);
    },
    [
      isFavorited,
      favorites,
      product.id,
      product.image,
      product.name,
      product.price,
      product.subCategory,
      category,
      t,
    ]
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={styles.productImage}
          />
        ) : (
          <div className={styles.placeholderImage}>{t("noImage")}</div>
        )}
      </div>
      <h3 className={styles.productName}>{product.name.toUpperCase()}</h3>
      <p className={styles.productPrice}>{formatPrice(product.price)}</p>
      <div className={styles.actions}>
        <AddToCartButton product={product} className={styles.addToCart} />
        <button
          className={styles.favoriteButton}
          onClick={handleFavorite}
          aria-label={
            isFavorited
              ? t("removeFavoriteAria", { name: product.name }) ||
                t("removeFavoriteAria")
              : t("addFavoriteAria")
          }
        >
          <FaRegHeart
            className={styles.favoriteIcon}
            style={{ color: isFavorited ? "#ff6f61" : "#ccc" }}
          />
          <span className={styles.favoriteCount}>{favorites}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
