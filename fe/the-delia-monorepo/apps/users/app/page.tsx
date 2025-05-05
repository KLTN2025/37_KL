/* app/page.tsx */
import Image from "next/image";
import Link from "next/link";
import { getTranslations, getMessages } from "next-intl/server";
import styles from "./page.module.css";
import HeaderWrapper from "./components/HeaderWrapper";
import FloatingIcons from "./components/FloatingIcons";
import ProductCard from "./components/ProductCard";
import { products } from "./mua-sam/data/products"; 
import heroImage from "../public/hero-image.jpg";
import Footer from './components/Footer';
import { Product } from "./types/product";
import { useSearchParams } from "next/navigation";

function removeAccents(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export const metadata = {
  title: "the delia couture - Thời trang cao cấp",
  description: "Khám phá các bộ sưu tập thời trang độc đáo từ the delia couture.",
};

export default async function HomePage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: { query?: string };
}) {
  const messages = await getMessages();
  const t = await getTranslations("Home");
  
  const query = searchParams?.query || "";
  const normalizedQuery = removeAccents(query);

  const allProducts: Product[] = Object.values(products).flat();

  const filteredProducts = normalizedQuery
    ? allProducts.filter((product) =>
        removeAccents(product.name).includes(normalizedQuery)
      )
    : [];

  const newArrivals = products["hang-moi"] || [];
  const womenProducts = products["nu"] || [];
  const menProducts = products["nam"] || [];

  return (
    <div className={styles.container}>
      <HeaderWrapper messages={messages} locale={locale} />
      {normalizedQuery ? (
        <main className={styles.main}>
          <section className={styles.newArrivalsSection}>
            <div className={styles.sectionHeader}>
              <h2>
                {t("searchResults")}: <strong>{query}</strong>
              </h2>
            </div>
            {filteredProducts.length > 0 ? (
              <div className={styles.productsWrapper}>
                <div className={styles.productsGrid}>
                  {filteredProducts.map((product: Product) => {
                    console.log(`Product Link (Search): /mua-sam/${product.category}/${product.subCategory}/${product.id}`);
                    return (
                      <Link
                        key={product.id}
                        href={`/mua-sam/${product.category}/${product.subCategory}/${product.id}`}
                        style={{ display: "block", position: "relative", zIndex: 1 }}
                      >
                        <ProductCard
                          product={product}
                          category={product.category}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p>{t("noResults")}</p>
            )}
          </section>
        </main>
      ) : (
        <>
          <section className={styles.heroSection}>
            <div className={styles.heroWrapper}>
              <Image
                src={heroImage}
                alt={t("heroAlt")}
                fill
                priority
                className={styles.heroImage}
                placeholder="blur"
              />
              <div className={styles.heroText}>
                <h1>{t("heroTitle")}</h1>
              </div>
              <div className={styles.dots}>
                <span className={styles.dotActive}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
              <button className={styles.arrowLeft}>❮</button>
              <button className={styles.arrowRight}>❯</button>
            </div>
          </section>
          <main className={styles.main}>
            <section className={styles.newArrivalsSection}>
              <div className={styles.sectionHeader}>
                <h2>{t("newArrivalsTitle")}</h2>
                <Link href="/mua-sam/hang-moi" className={styles.viewMoreLink}>
                  {t("viewMore")} ❯
                </Link>
              </div>
              <div className={styles.productsWrapper}>
                <button className={styles.arrowLeft}>❮</button>
                <div className={styles.productsGrid}>
                  {newArrivals.map((product: Product) => {
                    console.log(`Product Link (New Arrivals): /mua-sam/${product.category}/${product.subCategory}/${product.id}`);
                    return (
                      <Link
                        key={product.id}
                        href={`/mua-sam/${product.category}/${product.subCategory}/${product.id}`}
                        style={{ display: "block", position: "relative", zIndex: 1 }}
                      >
                        <ProductCard
                          product={product}
                          category="hang-moi"
                        />
                      </Link>
                    );
                  })}
                </div>
                <button className={styles.arrowRight}>❯</button>
              </div>
            </section>
            <section className={styles.newArrivalsSection}>
              <div className={styles.sectionHeader}>
                <h2>{t("womenTitle")}</h2>
                <Link href="/mua-sam/nu" className={styles.viewMoreLink}>
                  {t("viewMore")} ❯
                </Link>
              </div>
              <div className={styles.productsWrapper}>
                <button className={styles.arrowLeft}>❮</button>
                <div className={styles.productsGrid}>
                  {womenProducts.map((product: Product) => {
                    console.log(`Product Link (Women): /mua-sam/${product.category}/${product.subCategory}/${product.id}`);
                    return (
                      <Link
                        key={product.id}
                        href={`/mua-sam/${product.category}/${product.subCategory}/${product.id}`}
                        style={{ display: "block", position: "relative", zIndex: 1 }}
                      >
                        <ProductCard
                          product={product}
                          category="nu"
                        />
                      </Link>
                    );
                  })}
                </div>
                <button className={styles.arrowRight}>❯</button>
              </div>
            </section>
            <section className={styles.newArrivalsSection}>
              <div className={styles.sectionHeader}>
                <h2>{t("menTitle")}</h2>
                <Link href="/mua-sam/nam" className={styles.viewMoreLink}>
                  {t("viewMore")} ❯
                </Link>
              </div>
              <div className={styles.productsWrapper}>
                <button className={styles.arrowLeft}>❮</button>
                <div className={styles.productsGrid}>
                  {menProducts.slice(0, 4).map((product: Product) => {
                    console.log(`Product Link (Men): /mua-sam/${product.category}/${product.subCategory}/${product.id}`);
                    return (
                      <Link
                        key={product.id}
                        href={`/mua-sam/${product.category}/${product.subCategory}/${product.id}`}
                        style={{ display: "block", position: "relative", zIndex: 1 }}
                      >
                        <ProductCard
                          product={product}
                          category="nam"
                        />
                      </Link>
                    );
                  })}
                </div>
                <button className={styles.arrowRight}>❯</button>
              </div>
            </section>
          </main>
        </>
      )}
      <Footer />
      <FloatingIcons />
    </div>
  );
}