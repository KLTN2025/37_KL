/* app/components/FavoriteButton.tsx */
"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import styles from "./FavoriteButton.module.css";

export interface FavoriteButtonProps {
  productId: string;
  initialLikes: number;
}

export default function FavoriteButton({ productId, initialLikes }: FavoriteButtonProps) {
  const t = useTranslations("Product");
  const [isFavorite, setIsFavorite] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  // Restore favorite state from localStorage
  useEffect(() => {
    const savedFavorite = localStorage.getItem(`favorite_${productId}`);
    if (savedFavorite) {
      setIsFavorite(JSON.parse(savedFavorite));
    }
  }, [productId]);

  const toggleFavorite = useCallback(() => {
    const newIsFavorite = !isFavorite;
    setIsFavorite(newIsFavorite);
    setLikes((prev) => (newIsFavorite ? prev + 1 : prev - 1));

    localStorage.setItem(`favorite_${productId}`, JSON.stringify(newIsFavorite));

    toast.success(
      newIsFavorite ? t("addedToFavorites") : t("removedFromFavorites"),
      {
        toastId: `favorite-${productId}`,
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      }
    );
  }, [isFavorite, productId, t]);

  return (
    <button
      onClick={toggleFavorite}
      className={styles.favoriteButton}
      aria-label={isFavorite ? t("removeFavoriteAria") : t("addFavoriteAria")}
    >
      <span className={styles.icon}>{isFavorite ? "★" : "☆"}</span>
      <span className={styles.likes}>{likes}</span>
    </button>
  );
}