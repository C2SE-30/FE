import React, { useState } from "react";
import styles from "./Notifications.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../component/Navbar";
import Menu from "../component/Menu";

const notificationsData = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    message: "Thông báo 1",
    time: "2 giờ trước",
    unread: true,
  },
  {
    id: 2,
    name: "Trần B",
    message: "Thông báo 2",
    time: "1 ngày trước",
    unread: false,
  },
  {
    id: 3,
    name: "Huỳnh C",
    message: "Thông báo 3",
    time: "3 ngày trước",
    unread: true,
  },
  {
    id: 4,
    name: "Võ D",
    message: "Thông báo 4",
    time: "1 tuần trước",
    unread: false,
  },
  {
    id: 5,
    name: "Nguyễn Văn E",
    message: "Thông báo 5",
    time: "1 tuần trước",
    unread: false,
  },
  {
    id: 6,
    name: "Nguyễn Văn E",
    message: "Thông báo 6",
    time: "1 tuần trước",
    unread: false,
  },
  {
    id: 7,
    name: "Nguyễn Văn E",
    message: "Thông báo 7",
    time: "1 tuần trước",
    unread: false,
  },
];

const Notifications = () => {
  const [filter, setFilter] = useState("all");
  const profileImage =
    "https://storage.googleapis.com/a1aa/image/jsGCRJJoKxJoqRnvaVxZv4qmJXCyqaQrlYzyr5hXxoQ.jpg";

  const filteredNotifications =
    filter === "unread"
      ? notificationsData.filter((item) => item.unread)
      : notificationsData;

  return (
    <div className={styles.header}>
    <Navbar />
    <Menu />
    <div className={styles.container}>
      <div className={styles.notifications}>
        <h2>
          <FontAwesomeIcon icon={faBell} className={styles.bellIcon} /> Thông báo
        </h2>
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${filter === "all" ? styles.active : ""}`}
            onClick={() => setFilter("all")}
          >
            Tất cả
          </button>
          <button
            className={`${styles.tabButton} ${filter === "unread" ? styles.active : ""}`}
            onClick={() => setFilter("unread")}
          >
            Chưa đọc
          </button>
        </div>
        {filteredNotifications.map((item) => (
          <div key={item.id} className={styles.notificationItem}>
            <img src={profileImage} alt="User profile" />
            <div className={styles.content}>
              <p>
                <strong>{item.name}</strong> {item.message}
              </p>
              <p className={styles.time}>{item.time}</p>
            </div>
            {item.unread && <div className={styles.dot}></div>}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Notifications;
