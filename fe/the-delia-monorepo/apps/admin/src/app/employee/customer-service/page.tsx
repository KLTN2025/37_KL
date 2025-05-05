"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./customerService.module.css";
import Sidebar from "@shared/components/Sidebar";
import Header from "@shared/components/Header";

type Customer = {
  id: number;
  name: string;
  status: "waiting" | "done";
  lastMessageTime: string;
  hasNewMessage?: boolean;
};

type Message = {
  sender: "customer" | "support";
  content: string;
  time: string;
};

export default function CustomerServicePage() {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: "Nguyễn Văn A",
      status: "waiting",
      lastMessageTime: "2025-04-27 09:00",
    },
    {
      id: 2,
      name: "Trần Thị B",
      status: "done",
      lastMessageTime: "2025-04-26 14:30",
    },
    {
      id: 3,
      name: "Phạm Văn C",
      status: "waiting",
      lastMessageTime: "2025-04-27 10:15",
    },
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [chatHistories, setChatHistories] = useState<Record<number, Message[]>>(
    {}
  );
  const [noteHistories, setNoteHistories] = useState<Record<number, string>>(
    {}
  );
  const [inputMessage, setInputMessage] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "waiting" | "done">(
    "all"
  );

  const chatBoxRef = useRef<HTMLDivElement>(null);
  const staffName = "Admin";

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [selectedCustomer, chatHistories]);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const waitingCustomers = customers.filter((c) => c.status === "waiting");
      if (waitingCustomers.length === 0) return;

      const randomCustomer =
        waitingCustomers[Math.floor(Math.random() * waitingCustomers.length)];
      const now = new Date();
      const newMsg: Message = {
        sender: "customer",
        content: "Khách gửi tin nhắn mới!",
        time: now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setChatHistories((prev) => {
        const prevMessages = prev[randomCustomer.id] || [];
        return { ...prev, [randomCustomer.id]: [...prevMessages, newMsg] };
      });

      setCustomers((prev) =>
        prev.map((cus) =>
          cus.id === randomCustomer.id
            ? {
                ...cus,
                lastMessageTime: now
                  .toISOString()
                  .slice(0, 16)
                  .replace("T", " "),
                hasNewMessage:
                  selectedCustomer?.id !== randomCustomer.id ? true : false,
              }
            : cus
        )
      );

      if (
        document.visibilityState !== "visible" &&
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        new Notification("Tin nhắn mới từ " + randomCustomer.name, {
          body: "Khách hàng vừa gửi một tin nhắn.",
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [customers, selectedCustomer]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !selectedCustomer) return;

    const now = new Date();
    const newMessage: Message = {
      sender: "support",
      content: inputMessage.trim(),
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatHistories((prev) => {
      const prevMessages = prev[selectedCustomer.id] || [];
      return { ...prev, [selectedCustomer.id]: [...prevMessages, newMessage] };
    });

    setCustomers((prev) =>
      prev.map((cus) =>
        cus.id === selectedCustomer.id
          ? {
              ...cus,
              lastMessageTime: now.toISOString().slice(0, 16).replace("T", " "),
            }
          : cus
      )
    );

    setInputMessage("");
  };

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCustomers((prev) =>
      prev.map((cus) =>
        cus.id === customer.id ? { ...cus, hasNewMessage: false } : cus
      )
    );
  };

  const handleConfirmDone = () => {
    if (!selectedCustomer) return;
    setCustomers((prev) =>
      prev.map((cus) =>
        cus.id === selectedCustomer.id ? { ...cus, status: "done" } : cus
      )
    );
    setSelectedCustomer((prev) => (prev ? { ...prev, status: "done" } : prev));
  };

  const filteredCustomers = customers.filter((customer) => {
    if (filterStatus === "all") return true;
    return customer.status === filterStatus;
  });

  return (
    <div className={styles.container}>
      <Header />
      <Sidebar />

      <div className={styles.mainContent}>
        {/* Left Panel */}
        <div className={styles.leftPanel}>
          <h2>Khách cần hỗ trợ</h2>

          {/* Bộ lọc */}
          <div className={styles.filterButtons}>
            <button
              className={filterStatus === "all" ? styles.activeFilter : ""}
              onClick={() => setFilterStatus("all")}
            >
              Tất cả
            </button>
            <button
              className={filterStatus === "waiting" ? styles.activeFilter : ""}
              onClick={() => setFilterStatus("waiting")}
            >
              Đang chờ
            </button>
            <button
              className={filterStatus === "done" ? styles.activeFilter : ""}
              onClick={() => setFilterStatus("done")}
            >
              Đã xử lý
            </button>
          </div>

          {/* Danh sách khách */}
          <div className={styles.customerList}>
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className={`${styles.customerItem} ${selectedCustomer?.id === customer.id ? styles.selected : ""}`}
                onClick={() => handleSelectCustomer(customer)}
              >
                <div className={styles.avatar}>{customer.name.charAt(0)}</div>
                <div className={styles.customerInfo}>
                  <div className={styles.customerName}>
                    {customer.name}
                    {customer.hasNewMessage && (
                      <span className={styles.newBadge}>Mới</span>
                    )}
                  </div>
                  <div className={styles.customerStatus}>
                    {customer.status === "waiting"
                      ? "⏳ Chờ phản hồi"
                      : "✅ Đã xử lý"}
                  </div>
                  <div className={styles.customerTime}>
                    {customer.lastMessageTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className={styles.rightPanel}>
          {selectedCustomer ? (
            <>
              <div className={styles.chatHeader}>
                Đang hỗ trợ: <b>{selectedCustomer.name}</b>
              </div>

              <div className={styles.chatBox} ref={chatBoxRef}>
                {(chatHistories[selectedCustomer.id] || []).map(
                  (msg, index) => (
                    <div
                      key={index}
                      className={
                        msg.sender === "customer"
                          ? styles.customerMessage
                          : styles.supportMessage
                      }
                    >
                      <div className={styles.messageSender}>
                        {msg.sender === "customer"
                          ? selectedCustomer.name
                          : staffName}
                      </div>

                      <div className={styles.messageContent}>{msg.content}</div>
                      <div className={styles.messageTime}>{msg.time}</div>
                    </div>
                  )
                )}
              </div>

              <div className={styles.chatInputArea}>
                <input
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className={styles.chatInput}
                />
                <button
                  onClick={handleSendMessage}
                  className={styles.sendButton}
                >
                  Gửi
                </button>
              </div>

              {/* Nút xác nhận xử lý */}
              {selectedCustomer.status === "waiting" && (
                <div className={styles.confirmButtonArea}>
                  <button
                    onClick={handleConfirmDone}
                    className={styles.confirmButton}
                  >
                    ✅ Xác nhận đã xử lý
                  </button>
                </div>
              )}

              <div className={styles.notesSection}>
                <h3>Ghi chú nội bộ</h3>
                <textarea
                  placeholder="Nhập ghi chú..."
                  value={noteHistories[selectedCustomer.id] || ""}
                  onChange={(e) =>
                    setNoteHistories((prev) => ({
                      ...prev,
                      [selectedCustomer.id]: e.target.value,
                    }))
                  }
                  className={styles.noteInput}
                />
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              Chọn một khách để bắt đầu hỗ trợ 💬
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
