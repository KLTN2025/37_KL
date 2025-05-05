/* app/profile/favorites/page.tsx */
"use client";

import { useTranslations } from "next-intl";
import { useFavorites } from "../../context/FavoritesContext"; // Cập nhật đường dẫn
import styles from "./Favorites.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

export default function FavoritesPage() {
  const t = useTranslations("Profile");
  const { favorites, removeFromFavorites } = useFavorites();

  // Hàm định dạng giá
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Hàm xử lý thêm vào giỏ hàng (tạm thời log, bạn có thể tích hợp với context hoặc API)
  const handleAddToCart = (productId: string) => {
    console.log(`Thêm sản phẩm ${productId} vào giỏ hàng`);
  };

  return (
    <div className={styles.mainContent}>
      <h1 className={styles.pageTitle}>{t("favorites")}</h1>
      {favorites.length === 0 ? (
        <div className={styles.emptyMessage}>{t("emptyFavorites")}</div>
      ) : (
        <div className={styles.favoritesList}>
          {favorites.map((product) => (
            <div key={product.id} className={styles.favoriteItem}>
              <Link
                href={`/mua-sam/${product.category}/${product.subCategory}/${product.id}`}
                passHref
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={250}
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productPrice}>{formatPrice(product.price)}</p>
                </div>
              </Link>
              <div className={styles.buttonWrapper}>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className={styles.cartButton}
                >
                  <FaShoppingCart className={styles.cartIcon} />
                </button>
                <button
                  onClick={() => removeFromFavorites(product.id)}
                  className={styles.favoriteButton}
                >
                  <FaHeart className={styles.favoriteIcon} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}