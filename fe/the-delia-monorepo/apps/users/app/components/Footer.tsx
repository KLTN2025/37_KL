// src/components/Footer.tsx
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Phần thông tin liên hệ */}
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>The Delia Couture</h3>
          <p>Địa chỉ: 47 Nguyễn Thị Minh Khai, Hội An, Việt Nam</p>
          <p>Email: contact@thedeliacouture.com</p>
          <p>Điện thoại: +84 123 456 789</p>
        </div>

        {/* Phần liên kết chính sách */}
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Liên kết</h3>
          <div className={styles.links}>
            <Link href="/privacy">Chính sách bảo mật</Link>
            <Link href="/terms">Điều khoản dịch vụ</Link>
            <Link href="/contact">Liên hệ với chúng tôi</Link>
          </div>
        </div>

        {/* Phần mạng xã hội */}
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Theo dõi chúng tôi</h3>
          <div className={styles.socialLinks}>
            <a
              href="https://facebook.com/yalycouture"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF className={styles.socialIcon} />
            </a>
            <a
              href="https://instagram.com/yalycouture"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className={styles.socialIcon} />
            </a>
            <a
              href="https://twitter.com/yalycouture"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter className={styles.socialIcon} />
            </a>
          </div>
        </div>
      </div>

      {/* Phần bản quyền */}
      <div className={styles.footerBottom}>
        <p>&copy; 2025 The delia couture. All rights reserved.</p>
      </div>
    </footer>
  );
}