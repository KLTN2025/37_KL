/* eslint-disable @typescript-eslint/no-unused-vars */
/* app/auth/login/LoginClient.tsx */
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import styles from "./Login.module.css";

interface LoginClientProps {
  locale: string;
}

export default function LoginClient({ locale }: LoginClientProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const t = useTranslations("Auth");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError(t("fillAllFieldsError"));
      return;
    }

    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);
    if (result?.error) {
      setError(t("invalidCredentialsError"));
    } else {
      toast.success(t("loginSuccess"));
      router.push(redirectUrl);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setLoading(true);
    signIn(provider, { callbackUrl: redirectUrl });
  };

  return (
    <div className={styles.authBox}>
      <button
        className={styles.closeButton}
        onClick={() => router.back()}
        aria-label={t("closeModalAria")}
      >
        ✕
      </button>
      <div className={styles.tabs}>
        <Link href="/auth/register" className={styles.tab}>
          {t("register")}
        </Link>
        <Link href="/auth/login" className={`${styles.tab} ${styles.activeTab}`}>
          {t("login")}
        </Link>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">{t("emailLabel")}</label>
          <input
            id="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            disabled={loading}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">{t("passwordLabel")}</label>
          <input
            id="password"
            type="password"
            placeholder={t("passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            disabled={loading}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <Link href="/forgot-password" className={styles.forgotPassword}>
          {t("forgotPassword")}
        </Link>
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? t("loading") : t("loginButton")}
        </button>
      </form>
      <div className={styles.socialLogin}>
        <p>{t("orLoginWith")}</p>
        <div className={styles.socialButtons}>
          <button
            onClick={() => handleSocialLogin("google")}
            className={styles.socialButton}
            disabled={loading}
            aria-label={t("loginWithGoogleAria")}
          >
            <FaGoogle /> GOOGLE
          </button>
          <button
            onClick={() => handleSocialLogin("facebook")}
            className={styles.socialButton}
            disabled={loading}
            aria-label={t("loginWithFacebookAria")}
          >
            <FaFacebookF /> FACEBOOK
          </button>
        </div>
      </div>
      <Link href="/gio-hang" className={styles.viewCartLink}>
        {t("viewCart")}
      </Link>
    </div>
  );
}