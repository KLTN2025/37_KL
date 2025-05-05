/* app/mua-sam/[category]/[subcategory]/[id]/page.tsx */
import { getMessages, getTranslations } from "next-intl/server";
import HeaderWrapper from "../../../../components/HeaderWrapper";
import Footer from "../../../../components/Footer";
import SocialIcons from "../../../../components/SocialIcons";
import ProductDetailClient from "./ProductDetailClient";
import { products } from "../../../data/products"; // Sửa import để lấy products từ app/mua-sam/data/products.ts
import styles from "./ProductDetail.module.css";

type Category = "nam" | "nu" | "hang-moi";

const subCategories: Record<Category, { name: string; slug: string }[]> = {
  nam: [
    { name: "Vest Nam", slug: "vest-nam" },
    { name: "Gi-Lê", slug: "gi-le" },
    { name: "Sơ Mi", slug: "so-mi" },
    { name: "Polo", slug: "polo" },
    { name: "Quần Tây", slug: "quan-tay" },
    { name: "Jeans Nam", slug: "jeans-nam" },
  ],
  nu: [
    { name: "Váy", slug: "vay" },
    { name: "Đầm Dạo Phố", slug: "dam-dao-pho" },
    { name: "Áo Dài", slug: "ao-dai" },
    { name: "Jeans Nữ", slug: "jeans-nu" },
  ],
  "hang-moi": [
    { name: "Áo Phông", slug: "ao-phong" },
    { name: "Quần Short Nam", slug: "quan-short-nam" },
    { name: "Quần Short Nữ", slug: "quan-short-nu" },
    { name: "Áo Len", slug: "ao-len" },
    { name: "Áo Tank", slug: "ao-tank" },
  ],
};

export default async function ProductDetailPage({
  params: { category, subCategory, id, locale },
}: {
  params: { category: Category; subCategory: string; id: string; locale: string };
}) {
  const messages = await getMessages();
  const tProduct = await getTranslations("Product");
  const tHome = await getTranslations("Home");

  // Tìm sản phẩm
  const categoryData = products[category]; // Sửa để sử dụng products
  if (!categoryData) {
    return <div>{tProduct("productNotFound")}</div>;
  }

  // Kiểm tra subCategory hợp lệ
  const currentCategorySubCategories = subCategories[category] || [];
  const isValidSubCategory = currentCategorySubCategories.some(
    (subCat) => subCat.slug === subCategory
  );
  if (!isValidSubCategory) {
    return <div>{tProduct("subCategoryNotFound")}</div>;
  }

  // Tìm sản phẩm dựa trên category, subCategory và id
  const product = categoryData.find(
    (p: { id: string; subCategory: string }) => p.id === id && p.subCategory === subCategory
  );
  if (!product) {
    return <div>{tProduct("productNotFound")}</div>;
  }

  // Tìm tên mục con
  const subCategoryName = currentCategorySubCategories.find(
    (subCat) => subCat.slug === subCategory
  )?.name;

  // Breadcrumb
  const categoryTitles: Record<Category, string> = {
    nam: tHome("mensFashionTitle"),
    nu: tHome("womensFashionTitle"),
    "hang-moi": tHome("newArrivalsTitle"),
  };

  const breadcrumb = [
    { label: tHome("home"), href: "/" },
    { label: tHome("shop"), href: "/mua-sam" },
    { label: categoryTitles[category], href: `/mua-sam/${category}` },
    { label: subCategoryName || subCategory, href: `/mua-sam/${category}/${subCategory}` },
    { label: product.name, href: null },
  ];

  return (
    <div className={styles.container}>
      <HeaderWrapper messages={messages} locale={locale} />
      <ProductDetailClient product={product} breadcrumb={breadcrumb} />
      <SocialIcons />
      <Footer />
    </div>
  );
}