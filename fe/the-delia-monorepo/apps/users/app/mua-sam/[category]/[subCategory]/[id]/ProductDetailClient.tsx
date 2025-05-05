/* app/mua-sam/[category]/[subCategory]/[id]/ProductDetailClient.tsx */
"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo, useCallback } from "react";
import styles from "./ProductDetail.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { toast } from "react-toastify";
import { useCart } from "../../../../context/CartContext";
import { flatProducts, Product } from "../../../data/products";

interface ProductDetailClientProps {
  product: Product;
  breadcrumb: { label: string; href: string | null }[];
}

interface FavoriteState {
  [key: string]: { isFavorited: boolean; favorites: number };
}

export default function ProductDetailClient({
  product,
  breadcrumb,
}: ProductDetailClientProps) {
  const tProduct = useTranslations("Product");
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState<number>(2);
  const [selectedSize, setSelectedSize] = useState<string | null>("XL");
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [favorites, setFavorites] = useState(product.favorites || 0);
  const { addToCart } = useCart();

  // State to track if a toast has been shown for each related product add-to-cart action
  const [toastsShown, setToastsShown] = useState<{ [key: string]: boolean }>({});

  // Memoize relatedProducts to prevent unnecessary re-computation
  const relatedProducts = useMemo(() => {
    return flatProducts
      .filter(
        (p) =>
          p.category === product.category &&
          p.subCategory === product.subCategory &&
          p.id !== product.id
      )
      .slice(0, 4);
  }, [product.category, product.subCategory, product.id]);

  // State for related products' favorite status
  const [relatedFavorites, setRelatedFavorites] = useState<FavoriteState>({});

  // Initialize relatedFavorites after mount
  useEffect(() => {
    const initialRelatedFavorites: FavoriteState = {};
    relatedProducts.forEach((relatedProduct) => {
      const savedFavorite = localStorage.getItem(`favorite_${relatedProduct.id}`);
      initialRelatedFavorites[relatedProduct.id] = {
        isFavorited: savedFavorite ? JSON.parse(savedFavorite) : false,
        favorites: relatedProduct.favorites || 0,
      };
    });
    setRelatedFavorites(initialRelatedFavorites);
  }, [relatedProducts]);

  // Khôi phục trạng thái yêu thích từ localStorage cho main product
  useEffect(() => {
    const savedFavorites = localStorage.getItem(`favorite_${product.id}`);
    if (savedFavorites) {
      setIsFavorited(JSON.parse(savedFavorites));
    }
  }, [product.id]);

  // Xử lý yêu thích cho main product
  const handleFavorite = useCallback(() => {
    const newIsFavorited = !isFavorited;
    const newFavorites = isFavorited ? favorites - 1 : favorites + 1;

    setFavorites(newFavorites);
    setIsFavorited(newIsFavorited);

    localStorage.setItem(`favorite_${product.id}`, JSON.stringify(newIsFavorited));

    toast.success(
      newIsFavorited ? tProduct("addedToFavorites") : tProduct("removedFromFavorites"),
      {
        toastId: `main-favorite-${product.id}`,
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      }
    );
  }, [isFavorited, favorites, product.id, tProduct]);

  // Xử lý yêu thích cho related products
  const handleRelatedFavorite = useCallback((relatedProductId: string) => {
    setRelatedFavorites((prev) => {
      const current = prev[relatedProductId] || { isFavorited: false, favorites: 0 };
      const newIsFavorited = !current.isFavorited;
      const newFavorites = newIsFavorited ? current.favorites + 1 : current.favorites - 1;

      localStorage.setItem(`favorite_${relatedProductId}`, JSON.stringify(newIsFavorited));

      toast.success(
        newIsFavorited ? tProduct("addedToFavorites") : tProduct("removedFromFavorites"),
        {
          toastId: `related-favorite-${relatedProductId}-${newIsFavorited}`,
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        }
      );

      return {
        ...prev,
        [relatedProductId]: {
          isFavorited: newIsFavorited,
          favorites: newFavorites,
        },
      };
    });
  }, [tProduct]);

  const handleImageSelect = useCallback((image: string) => {
    setSelectedImage(image);
  }, []);

  const handleIncrease = useCallback(() => {
    setQuantity(quantity + 1);
  }, [quantity]);

  const handleDecrease = useCallback(() => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }, [quantity]);

  const handleSizeSelect = useCallback((size: string) => {
    setSelectedSize(size);
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!selectedSize) {
      toast.error(tProduct("selectSize"), {
        toastId: "select-size-error",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }

    const cartItem = {
      id: parseInt(product.id),
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      size: selectedSize || "Chưa chọn",
      material: product.material || "Chưa cập nhật"
    };

    addToCart(cartItem);

    if (!toastsShown[`main-add-to-cart-${product.id}`]) {
      setToastsShown((prev) => ({
        ...prev,
        [`main-add-to-cart-${product.id}`]: true,
      }));
      toast.success(tProduct("addedToCart"), {
        toastId: `main-add-to-cart-${product.id}`,
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  }, [selectedSize, product, quantity, addToCart, tProduct, toastsShown]);

  const handleAddRelatedToCart = useCallback((relatedProduct: Product) => {
    const cartItem = {
      id: parseInt(relatedProduct.id),
      name: relatedProduct.name,
      price: relatedProduct.price,
      quantity: 1,
      image: relatedProduct.image,
      size: relatedProduct.sizes && relatedProduct.sizes.length > 0 ? relatedProduct.sizes[0] : "Free size",
      material: relatedProduct.material || "Chưa cập nhật"
    };

    addToCart(cartItem);

    if (!toastsShown[`related-add-to-cart-${relatedProduct.id}`]) {
      setToastsShown((prev) => ({
        ...prev,
        [`related-add-to-cart-${relatedProduct.id}`]: true,
      }));
      toast.success(tProduct("addedToCart"), {
        toastId: `related-add-to-cart-${relatedProduct.id}`,
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  }, [addToCart, tProduct, toastsShown]);

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }, []);

  return (
    <>
      <main className={styles.main}>
        <nav className={styles.breadcrumb}>
          {breadcrumb.map((item, index) => (
            <span key={index}>
              {item.href ? (
                <Link href={item.href} className={styles.breadcrumbLink}>
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}
              {index < breadcrumb.length - 1 && " > "}
            </span>
          ))}
        </nav>

        <div className={styles.productDetail}>
          <div className={styles.imageGallery}>
            <div className={styles.thumbnailList}>
              {(product.images || [product.image]).map((img: string, index: number) => (
                <div
                  key={index}
                  className={`${styles.thumbnail} ${
                    selectedImage === img ? styles.selectedThumbnail : ""
                  }`}
                  onClick={() => handleImageSelect(img)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    width={80}
                    height={120}
                    className={styles.thumbnailImage}
                  />
                </div>
              ))}
            </div>
            <div className={styles.mainImage}>
              <Image
                src={selectedImage}
                alt={product.name}
                width={500}
                height={650}
                className={styles.productImage}
              />
            </div>
          </div>

          <div className={styles.productInfo}>
            <div className={styles.productHeader}>
              <h1 className={styles.productName}>{product.name}</h1>
              <button onClick={handleFavorite} className={styles.favoriteButton}>
                <i
                  className={`bi ${isFavorited ? "bi-heart-fill" : "bi-heart"}`}
                  style={{ color: isFavorited ? "#ff6f61" : "#ccc" }}
                ></i>{" "}
                <span>{favorites}</span>
              </button>
            </div>
            <p className={styles.price}>
              {product.price ? formatPrice(product.price) : tProduct("contactForPrice")}
            </p>

            <div className={styles.colors}>
              <label>{tProduct("material")}:</label>
              <div className={styles.colorWrapper}>
                {(product.colors || []).map((color: string, index: number) => (
                  <span
                    key={index}
                    className={styles.colorOption}
                    style={{
                      backgroundColor:
                        color.toLowerCase() === "đen"
                          ? "#000000"
                          : color.toLowerCase() === "xám đậm"
                          ? "#4a4a4a"
                          : color.toLowerCase() === "xám nhạt"
                          ? "#d3d3d3"
                          : color.toLowerCase() === "trắng"
                          ? "#ffffff"
                          : color.toLowerCase() === "xanh navy"
                          ? "#1a2526"
                          : color.toLowerCase() === "đỏ rượu"
                          ? "#5f0000"
                          : color.toLowerCase() === "trắng ngọc trai"
                          ? "#f0f0f0"
                          : color.toLowerCase() === "đen ánh kim"
                          ? "#1c2526"
                          : color.toLowerCase() === "xanh lá"
                          ? "#2e8b57"
                          : color.toLowerCase() === "hồng"
                          ? "#ff69b4"
                          : color.toLowerCase() === "đỏ"
                          ? "#ff0000"
                          : color.toLowerCase() === "vàng ánh kim"
                          ? "#b8860b"
                          : color.toLowerCase() === "bạc"
                          ? "#c0c0c0"
                          : color.toLowerCase() === "be"
                          ? "#f5f5f5dc"
                          : color.toLowerCase() === "xanh dương"
                          ? "#4682b4"
                          : color.toLowerCase() === "hồng phấn"
                          ? "#ffb6c1"
                          : color.toLowerCase() === "vàng"
                          ? "#ffd700"
                          : color.toLowerCase() === "tím"
                          ? "#800080"
                          : color.toLowerCase(),
                    }}
                  />
                ))}
              </div>
            </div>

            <div className={styles.sizes}>
              <label>{tProduct("size")}:</label>
              <div className={styles.sizeWrapper}>
                {(product.sizes || []).map((size: string, index: number) => (
                  <button
                    key={index}
                    className={`${styles.sizeOption} ${
                      selectedSize === size ? styles.selectedSize : ""
                    }`}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </button>
                ))}
                <Link href="/SizeGuide" className={styles.sizeGuide}>
                  <i className="bi bi-rulers"></i> {tProduct("sizeGuide")}
                </Link>
              </div>
            </div>

            <Link href="/SizeGuide" className={styles.madeToMeasure}>
              {tProduct("madeToMeasure")}
            </Link>

            <div className={styles.quantity}>
              <label>{tProduct("quantity")}:</label>
              <div className={styles.quantityControl}>
                <button onClick={handleDecrease}>
                  <i className="bi bi-dash"></i>
                </button>
                <span>{quantity}</span>
                <button onClick={handleIncrease}>
                  <i className="bi bi-plus"></i>
                </button>
              </div>
            </div>

            <button className={styles.addToCart} onClick={handleAddToCart}>
              <i className="bi bi-cart"></i> {tProduct("addToCart")}
            </button>
          </div>
        </div>

        {product.description && (
          <div className={styles.description}>
            <h3>{tProduct("description")}</h3>
            <p>{product.description}</p>
          </div>
        )}

        {relatedProducts.length > 0 && (
          <div className={styles.relatedProducts}>
            <h3>{tProduct("relatedProducts")}</h3>
            <div className={styles.relatedProductsList}>
              {relatedProducts.map((relatedProduct: Product) => {
                const favoriteState = relatedFavorites[relatedProduct.id] || {
                  isFavorited: false,
                  favorites: relatedProduct.favorites || 0,
                };
                return (
                  <div key={relatedProduct.id} className={styles.relatedProduct}>
                    <Link
                      href={`/mua-sam/${relatedProduct.category}/${relatedProduct.subCategory}/${relatedProduct.id}`}
                    >
                      <div className={styles.relatedProductImageWrapper}>
                        <Image
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          width={220}
                          height={330}
                          className={styles.relatedProductImage}
                        />
                      </div>
                      <h4 className={styles.relatedProductName}>{relatedProduct.name}</h4>
                      <p className={styles.relatedProductPrice}>
                        {formatPrice(relatedProduct.price)}
                      </p>
                    </Link>
                    <div className={styles.relatedProductActions}>
                      <button
                        className={styles.relatedProductCart}
                        onClick={() => handleAddRelatedToCart(relatedProduct)}
                      >
                        <i className="bi bi-cart"></i>
                      </button>
                      <button
                        className={styles.relatedProductFavorite}
                        onClick={() => handleRelatedFavorite(relatedProduct.id)}
                      >
                        <i
                          className={`bi ${
                            favoriteState.isFavorited ? "bi-heart-fill" : "bi-heart"
                          }`}
                          style={{ color: favoriteState.isFavorited ? "#ff6f61" : "#ccc" }}
                        ></i>{" "}
                        <span>{favoriteState.favorites}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </>
  );
}