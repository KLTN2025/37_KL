"use client";

import Sidebar from "@shared/components/Sidebar";
import Header from "@shared/components/Header";
import styles from "./dashboard.module.css";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useState, useMemo, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Dữ liệu mẫu (sau này thay bằng API)
const rawData = [
  { date: "20/03/2025", visits: 150, storeVisits: 90 },
  { date: "21/03/2025", visits: 80, storeVisits: 40 },
  { date: "22/03/2025", visits: 270, storeVisits: 180 },
  { date: "23/03/2025", visits: 90, storeVisits: 70 },
  { date: "24/03/2025", visits: 130, storeVisits: 110 },
  { date: "25/03/2025", visits: 100, storeVisits: 85 },
  { date: "26/03/2025", visits: 70, storeVisits: 60 },
  { date: "27/03/2025", visits: 65, storeVisits: 50 },
  { date: "28/03/2025", visits: 90, storeVisits: 60 },
  { date: "29/03/2025", visits: 110, storeVisits: 75 },
  { date: "30/03/2025", visits: 95, storeVisits: 55 },
  { date: "31/03/2025", visits: 105, storeVisits: 65 },
  { date: "01/04/2025", visits: 88, storeVisits: 45 },
];

export default function DashboardPage() {
  const [startDate, setStartDate] = useState<DateObject>(
    new DateObject({ year: 2025, month: 3, day: 1 })
  );

  const [, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const selectedDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) =>
      new DateObject(startDate).add(i, "days")
    );
  }, [startDate]);

  const handleDateChange = (date: DateObject | null) => {
    if (date) {
      setStartDate(date);
    }
  };

  const filteredData = useMemo(() => {
    const rawDataMap = new Map<
      string,
      { visits: number; storeVisits: number }
    >();
    rawData.forEach((item) => {
      rawDataMap.set(item.date, {
        visits: item.visits,
        storeVisits: item.storeVisits,
      });
    });

    return selectedDates.map((d) => {
      const formatted = d.format("DD/MM/YYYY");
      const data = rawDataMap.get(formatted);
      return {
        date: formatted,
        visits: data?.visits ?? 0,
        storeVisits: data?.storeVisits ?? 0,
      };
    });
  }, [selectedDates]);

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.chartContainer}>
          <div className="statistics-header">
            <h2>Thống kê lượt truy cập của khách trong 7 ngày</h2>
          </div>

          <div className={styles.filterContainer}>
            <label>
              Chọn ngày bắt đầu:
              <DatePicker
                value={startDate}
                onChange={handleDateChange}
                format="DD/MM/YYYY"
                highlightToday
              />
            </label>
          </div>

          <div className={styles.chartHeader}>
            Biểu đồ thống kê lượt truy cập từ{" "}
            <strong>{selectedDates[0].format("DD/MM/YYYY")}</strong> đến{" "}
            <strong>{selectedDates[6].format("DD/MM/YYYY")}</strong>
          </div>

          <div className={styles.chartBox}>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={filteredData}>
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  label={{ value: "Ngày", position: "insideBottom", dy: -60 }}
                />
                <YAxis
                  label={{
                    value: "Lượt truy cập",
                    angle: -90,
                    position: "insideLeft",
                    dx: 80,
                    dy: -80,
                  }}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="visits"
                  name="Lượt truy cập"
                  stroke="#2f5597"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="storeVisits"
                  name="Lượt ghé cửa hàng"
                  stroke="#e36c09"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

         
        </div>
      </div>
    </div>
  );
}
