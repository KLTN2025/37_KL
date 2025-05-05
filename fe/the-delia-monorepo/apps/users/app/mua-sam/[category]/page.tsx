/* app/mua-sam/[category]/page.tsx */
import { getMessages } from "next-intl/server";
import CategoryPageClient from "./CategoryPageClient";
import { Category } from "../data/products"; // Import Category
import "bootstrap-icons/font/bootstrap-icons.css";

export default async function CategoryPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ category: Category; locale: string }>; // Sửa thành Category
  searchParams: Promise<{ query?: string }>;
}) {
  const params = await paramsPromise;
  const searchParams = await searchParamsPromise;
  const messages = await getMessages();

  // Log messages để debug
  if (process.env.NODE_ENV === "development") {
    console.log("Messages in CategoryPage:", messages);
  }

  return (
    <CategoryPageClient
      params={params}
      searchParams={searchParams}
      messages={messages}
    />
  );
}