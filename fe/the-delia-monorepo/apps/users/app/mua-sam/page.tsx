/* app/mua-sam/page.tsx */
import { getMessages } from "next-intl/server";
import ProductCardClient from "./ProductCardClient";
import "bootstrap-icons/font/bootstrap-icons.css";

export default async function MuaSamPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ query?: string }>;
}) {
  const params = await paramsPromise.catch(() => ({ locale: "vi" }));
  const searchParams = await searchParamsPromise.catch(() => ({}));
  const messages = await getMessages().catch(() => ({}));

  return (
    <ProductCardClient
      params={params}
      searchParams={searchParams}
      messages={messages}
    />
  );
}