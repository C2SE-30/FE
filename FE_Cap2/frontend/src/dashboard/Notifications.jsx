import React, { useState, useEffect } from "react";
import styles from "./Notifications.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../component/Navbar";
import Menu from "../component/Menu";

const Notifications = () => {
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const profileImage =
    "https://storage.googleapis.com/a1aa/image/jsGCRJJoKxJoqRnvaVxZv4qmJXCyqaQrlYzyr5hXxoQ.jpg";

  // Fetch notifications from API
  useEffect(() => {
    const fetchNotifications = async () => {
      const userId = JSON.parse(localStorage.getItem("user"))?.id; // Assuming you are storing user id in localStorage
      if (!userId) {
        return;
      }
      
      try {
        const response = await fetch(`http://localhost:5000/notifications?user_id=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setNotifications(data.notifications); // Save the notifications data to state
        } else {
          console.error("Error fetching notifications");
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông báo:", error);
      }
    };

    fetchNotifications();
  }, []);

  // Filter notifications based on the selected filter (all or unread)
  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((item) => item.is_read === false)
      : notifications;

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
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((item) => (
              <div key={item.id} className={styles.notificationItem}>
                <img src={profileImage} alt="User profile" />
                <div className={styles.content}>
                  <p>
                    <strong>{item.name}</strong> {item.message}
                  </p>
                  <p className={styles.time}>{item.created_at}</p>
                </div>
                {item.is_read === false && <div className={styles.dot}></div>}
              </div>
            ))
          ) : (
            <p>Không có thông báo</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
