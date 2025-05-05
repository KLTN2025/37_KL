/* eslint-disable @next/next/no-img-element */
// app/may-do/page.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaWhatsapp, FaInstagram, FaQuestionCircle } from "react-icons/fa";
import styles from "./SizeGuide.module.css";
import pageStyles from "../page.module.css";

// Dữ liệu measurement steps (giữ nguyên)
export default function SizeGuide() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.centeredContainer}>
          <h1 className={styles.title}>Hướng dẫn chọn size</h1>

          <p className={styles.description}>
            Hướng dẫn chọn kích thước của{" "}
            <strong style={{ color: "#ED7D31" }}>THE DELIA COUTURE</strong> được
            thiết kế để phù hợp với các số đo vòng sau đây. Các thương hiệu khác
            có thể có các mẫu số đo khác nhau cho mỗi loại hình cơ thể.
          </p>
          <p className={styles.description}>
            Khi bạn đã tìm được kích cỡ của riêng mình, hãy chọn kích cỡ cho sản
            phẩm bạn muốn mua như sau:
          </p>

          <div className={styles.imageWrapper}>
            <img
              src="/images/size.jpg"
              alt="Size panel"
              className={`${styles.measurementImage} ${styles.image1}`}
            />
          </div>

          <p className={styles.description}>
            *Nếu bạn muốn một bộ đồ chuẩn với kích thước của riêng mình, hãy xem
            các <strong> BẢN HƯỚNG DẪN ĐO </strong> chuẩn bên dưới của chúng tôi{" "}
            <u>để có cho mình một sản phẩm phù hợp với bản thân nhất có thể</u>
          </p>

          <section className={styles.measurementSection}>
            <div className={styles.imageWrapper}>
              <img
                src="/images/size1.jpg"
                alt="Nam áo"
                className={`${styles.measurementImage} ${styles.image2}`}
              />
            </div>

            <div className={styles.imageWrapper}>
              <img
                src="/images/size2.jpg"
                alt="Nam quần"
                className={`${styles.measurementImage} ${styles.image3}`}
              />
            </div>

            <div className={styles.imageWrapper}>
              <img
                src="/images/size3.jpg"
                alt="Nữ áo"
                className={`${styles.measurementImage} ${styles.image4}`}
              />
            </div>

            <div className={styles.imageWrapper}>
              <img
                src="/images/size3.jpg"
                alt="Nữ áo"
                className={`${styles.measurementImage} ${styles.image4}`}
              />
            </div>
          </section>
        </div>
      </main>

      <div className={pageStyles.socialIcons}>
        <a
          href="https://whatsapp.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className={pageStyles.icon} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className={pageStyles.icon} />
        </a>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          <FaQuestionCircle className={pageStyles.icon} />
        </a>
      </div>

      <Footer />
    </div>
  );
}
