"use client";

import React, { useState } from "react";
import Sidebar from "@shared/components/Sidebar";
import Header from "@shared/components/Header";
import dynamic from "next/dynamic";

import styles from "./statistic.module.css";

const PieChartBox = dynamic(() => import("@shared/components/PieChartBox"), {
  ssr: false,
});
const BarChartBox = dynamic(() => import("@shared/components/BarChartBox"), {
  ssr: false,
});

const bestSellingData = [
  { name: "Sản phẩm A", value: 300, color: "#2a52f5" },
  { name: "Sản phẩm B", value: 250, color: "#22c55e" },
  { name: "Sản phẩm C", value: 280, color: "#f59e0b" },
  { name: "Sản phẩm D", value: 320, color: "#f97316" },
];

const revenueData = [
  { name: "Tuần 1", value: 7000 },
  { name: "Tuần 2", value: 9000 },
  { name: "Tuần 3", value: 8000 },
  { name: "Tuần 4", value: 5000 },
];

const productStats = [
  {
    id: "01",
    name: "Áo vest",
    quantity: 300,
    sold: 60,
    imported: 200,
    date: "12/3/2025",
  },
  {
    id: "02",
    name: "Áo sơ mi",
    quantity: 250,
    sold: 30,
    imported: 100,
    date: "13/3/2025",
  },
];

export default function StatisticPage() {
  const [selectedMonth, setSelectedMonth] = useState("Tháng 3");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  const years = ["2023", "2024", "2025"];

  return (
    <div className={styles.statisticLayout}>
      <Sidebar />
      <div className={styles.mainArea}>
        <Header />
        <h1 className={styles.pageTitle}>Thống kê</h1>

        <div className={styles.statCards}>
          <div className={`${styles.card} ${styles.orange}`}>
            <div className={styles.cardTitle}>Tổng số khách hàng</div>
            <div className={styles.cardValue}>178 Khách hàng</div>
          </div>
          <div className={`${styles.card} ${styles.blue}`}>
            <div className={styles.cardTitle}>Tổng số sản phẩm</div>
            <div className={styles.cardValue}>610 Sản phẩm</div>
          </div>
          <div className={`${styles.card} ${styles.red}`}>
            <div className={styles.cardTitle}>Tổng số đơn hàng</div>
            <div className={styles.cardValue}>60 Đơn hàng</div>
          </div>
          <div className={`${styles.card} ${styles.green}`}>
            <div className={styles.cardTitle}>Tổng số ghé thăm</div>
            <div className={styles.cardValue}>1258 lượt truy cập</div>
          </div>
        </div>

        <div className={styles.charts}>
          <div className={styles.chartBox}>
            <h2>Sản phẩm bán chạy nhất</h2>
            <PieChartBox data={bestSellingData} />
          </div>
          <div className={styles.chartBox}>
            <h2 className={styles.mainChartTitle}>
              Thống kê doanh thu {selectedMonth} - {selectedYear}
            </h2>

            <div className={styles.chartHeader}>
              <div className={styles.dateGroup}>
                <label>
                  Từ ngày:
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </label>
                <label>
                  Đến ngày:
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </label>
              </div>

              <div className={styles.selectGroup}>
                <label>
                  Năm:
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    {years.map((year) => (
                      <option key={year}>{year}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Tháng:
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    {months.map((month) => (
                      <option key={month}>{month}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <BarChartBox data={revenueData} />
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <h2>Thống kê tất cả sản phẩm</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Bán ra</th>
                <th>Nhập vào</th>
                <th>Ngày bán</th>
              </tr>
            </thead>
            <tbody>
              {productStats.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.sold}</td>
                  <td>{product.imported}</td>
                  <td>{product.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
