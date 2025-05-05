/* components/SearchBar.tsx */
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css"; // Sửa để sử dụng Header.module.css
import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  const t = useTranslations("Header");
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Search triggered, Query:", query);
    if (query.trim()) {
      console.log("Redirecting to:", `/mua-sam?query=${encodeURIComponent(query)}`);
      router.push(`/mua-sam?query=${encodeURIComponent(query)}`);
    } else {
      alert(t("enterSearchQuery"));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed, Query:", query);
      handleSearch();
    }
  };

  const handleButtonClick = () => {
    console.log("Button clicked, Query:", query);
    handleSearch();
  };

  return (
    <div className={styles.searchForm}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t("searchPlaceholder")}
        className={styles.searchInput}
      />
      <button
        onClick={handleButtonClick}
        className={styles.searchButton}
      >
        <FiSearch />
      </button>
    </div>
  );
}