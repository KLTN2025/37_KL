import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./app/lib/i18n.ts");

const nextConfig = {};

export default withNextIntl(nextConfig);