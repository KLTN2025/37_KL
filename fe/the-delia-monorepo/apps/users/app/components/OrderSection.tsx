/* eslint-disable @next/next/no-img-element */
// app/components/OrderSection.tsx
"use client";

import { useState } from "react";
import styles from "../may-do/page.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function OrderSection() {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.order}>
      <div className={styles.orderHeader}>
        <p>Order #24DH00016: Order received</p>
        <p>04/30/2024</p>
      </div>
      <div className={styles.orderDetails}>
        <img
          src="/images/suit.jpg"
          alt="Slim Fit Olive 100% Linen 2 Piece Suit"
          className={styles.orderImage}
        />
        <div className={styles.orderInfo}>
          <h3>Slim Fit Olive 100% Linen 2 Piece Suit</h3>
          <p>Fabrics: Olive Green | Size: Made-To-Measure | Quantity: 1</p>
          <div className={styles.orderActions}>
            <button className={styles.favoriteButton} onClick={handleFavoriteClick}>
              <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i> Favorite
            </button>
            <span className={styles.express}>Express</span>
          </div>
        </div>
      </div>
      <button className={styles.measurementButton}>
        Provide measurement information
      </button>
    </div>
  );
}