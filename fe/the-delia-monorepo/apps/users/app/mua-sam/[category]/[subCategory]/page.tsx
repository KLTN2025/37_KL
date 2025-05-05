import { getMessages } from "next-intl/server";
import CategoryPageClient from "../CategoryPageClient";
import { Category } from "../../data/products";

export default async function SubCategoryPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ category: Category; subCategory: string; locale: string }>;
  searchParams: Promise<{ query?: string }>;
}) {
  const params = await paramsPromise;
  const searchParams = await searchParamsPromise;
  const messages = await getMessages();

  return (
    <CategoryPageClient
      params={params}
      searchParams={searchParams}
      messages={messages}
    />
  );
}