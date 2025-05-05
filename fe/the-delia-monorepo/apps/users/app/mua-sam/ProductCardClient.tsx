/* app/mua-sam/ProductCardClient.tsx */
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import HeaderWrapper from "../components/HeaderWrapper";
import ProductCard from "../components/ProductCard";
import styles from "./ProductDetail.module.css";
import { Product, products, Category } from "./data/products";
import { Messages } from "next-intl";
import FloatingIcons from "../components/FloatingIcons";

function removeAccents(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export default async function ShopPageClient({
  searchParams,
  params: { locale },
  messages,
}: {
  searchParams: { query?: string };
  params: { locale: string };
  messages: Messages;
}) {
  const t = await getTranslations({ namespace: "MuaSam", locale }).catch(() => () => "");
  const tHome = await getTranslations({ namespace: "Home", locale }).catch(() => () => "");

  const query = searchParams.query || "";
  const normalizedQuery = removeAccents(query);

  const allProducts: Product[] = Object.values(products).flat();
  const filteredProducts = normalizedQuery
    ? allProducts.filter((product) => removeAccents(product.name).includes(normalizedQuery))
    : [];

  const categories: { name: string; slug: Category }[] = [
    { name: t("categories.men"), slug: "nam" },
    { name: t("categories.women"), slug: "nu" },
    { name: t("categories.newArrivals"), slug: "hang-moi" },
  ];

  return (
    <div className={styles.container}>
      <HeaderWrapper messages={messages} locale={locale} />

      {normalizedQuery ? (
        <>
          <p className={styles.searchInfo}>
            {t("searchResults")} &quot;{query}&quot;
          </p>
          {filteredProducts.length > 0 ? (
            <div className={styles.productList}>
              {filteredProducts.map((product) => (
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
              ))}
            </div>
          ) : (
            <p className={styles.noProducts}>{t("noProducts")}</p>
          )}
        </>
      ) : (
        <>
          {categories.map((category) => {
            const categoryItems = products[category.slug] || [];
            return (
              categoryItems.length > 0 && (
                <div key={category.slug} className={styles.categorySection}>
                  <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>{category.name}</h2>
                    <Link
                      href={`/mua-sam/${category.slug}`}
                      className={styles.viewMoreLink}
                    >
                      {tHome("viewMore")} ❯
                    </Link>
                  </div>
                  <div className={styles.productList}>
                    {categoryItems.slice(0, 4).map((product: Product) => (
                      <Link
                        key={product.id}
                        href={`/mua-sam/${product.category}/${product.subCategory}/${product.id}`}
                        style={{ display: "block", position: "relative", zIndex: 1 }}
                      >
                        <ProductCard
                          product={product}
                          category={category.slug}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )
            );
          })}
        </>
      )}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLogo}>
            <Image src="/logo-couture.png" alt="Couture Logo" width={120} height={40} />
            <p className={styles.tagline}>{tHome("footerTagline")}</p>
          </div>
          <div className={styles.footerColumn}>
            <h3>{tHome("footerCustomerService")}</h3>
            <ul>
              <li><Link href="/lien-he">{tHome("footerContact")}</Link></li>
              <li><Link href="/faqs">{tHome("footerFAQs")}</Link></li>
              <li><Link href="/dia-chi">{tHome("footerLocations")}</Link></li>
              <li><Link href="/chinh-sach">{tHome("footerPolicies")}</Link></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h3>{tHome("footerAbout")}</h3>
            <ul>
              <li><Link href="/he-delia-couture">{tHome("footerHistory")}</Link></li>
              <li><Link href="/khach-hang">{tHome("footerClients")}</Link></li>
              <li><Link href="/chuyen-mon">{tHome("footerExpertise")}</Link></li>
              <li><Link href="/bao-chi">{tHome("footerPress")}</Link></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h3>{tHome("footerHighlights")}</h3>
            <ul>
              <li><Link href="/ky-niem">{tHome("footerMilestones")}</Link></li>
              <li><Link href="/earth-essence">{tHome("footerEarthEssence")}</Link></li>
              <li><Link href="/simplicity">{tHome("footerSimplicity")}</Link></li>
              <li><Link href="/fashion-show">{tHome("footerFashionShow")}</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerSocial}>
          <h3>{tHome("footerCommunity")}</h3>
        </div>
        <div className={styles.footerBottom}>
          <p>{tHome("footerCopyright", { year: new Date().getFullYear() })}</p>
        </div>
      </footer>
      <FloatingIcons />
    </div>
  );
}