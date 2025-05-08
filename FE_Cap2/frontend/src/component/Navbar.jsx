import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBell, faSearch, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Fetch user information
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Get user from localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
          navigate("/studenthome");
          return;
        }

        const response = await fetch(`http://localhost:5000/student/${storedUser.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Không thể lấy thông tin người dùng");
        }

        const data = await response.json();
        setUserInfo(data.student);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    // Fetch notifications
    const fetchNotifications = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser?.id) return;

        const response = await fetch(`http://localhost:5000/notifications?user_id=${storedUser.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Không thể lấy thông báo");
        }

        const data = await response.json();
        setNotifications(data.notifications || []);
      } catch (error) {
        console.error("Lỗi khi lấy thông báo:", error);
        setNotifications([]);
      }
    };

    fetchUserInfo();
    fetchNotifications();
  }, [navigate]);

  // Mark notification as read
  const markNotificationAsRead = async (notificationId) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser?.id) return;

      const response = await fetch(`http://localhost:5000/notifications/${notificationId}/read?user_id=${storedUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Không thể đánh dấu thông báo là đã đọc");
      }

      // Update notification status to read
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Lỗi khi đánh dấu thông báo là đã đọc:", error);
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser?.id) return;

      const response = await fetch(`http://localhost:5000/notifications/${notificationId}?user_id=${storedUser.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Không thể xóa thông báo");
      }

      // Remove notification from the list
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== notificationId)
      );
    } catch (error) {
      console.error("Lỗi khi xóa thông báo:", error);
    }
  };

  return (
    <header className={styles.header}>
      <img
        src={require('../image/PAI.LOGO.png')}
        alt="Logo"
        className={styles.logo}
        onClick={() => {
          const storedUser = JSON.parse(localStorage.getItem("user"));
          if (storedUser?.role === "Student") {
            navigate("/studenthome");
          } else if (storedUser?.role === "Advisor") {
            navigate("/teacherhome");
          } else {
            navigate("/");
          }
        }}
      />
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Tìm kiếm" className={styles.searchInput} />
        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
      </div>
      <div className={styles.icons}>
        <FontAwesomeIcon
          icon={faHome}
          onClick={() => {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser?.role === "Student") {
              navigate("/studenthome");
            } else if (storedUser?.role === "Advisor") {
              navigate("/teacherhome");
            } else {
              navigate("/");
            }
          }}
        />
        <span>Trang chủ</span>
        <div className={styles.notificationContainer}>
          <div className={styles.icons}>
            <FontAwesomeIcon icon={faBell} onClick={toggleNotifications} className={styles.notificationIcon} />
            <span>Thông báo</span>
          </div>
          {showNotifications && (
            <div className={styles.notificationDropdown}>
              <ul>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <li key={notification.id}>
                      <div>
                        <span>{notification.message}</span>
                        {!notification.is_read && (
                          <button onClick={() => markNotificationAsRead(notification.id)}>
                            Đánh dấu đã đọc
                          </button>
                        )}
                        <button onClick={() => deleteNotification(notification.id)}>Xóa</button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li>Không có thông báo</li>
                )}
              </ul>
              <button onClick={() => navigate('/notifications')}>Xem tất cả</button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.userInfo}>
        <img
          src={require('../image/sinhvien.png')} // Placeholder for user avatar
          alt="User Avatar"
          className={styles.userAvatar}
          onClick={() => navigate('/profile')}
        />
        <span>{userInfo.name || "Tên người dùng"}</span>
        <div className={styles.dropdownIcon}>
          <FontAwesomeIcon icon={faSortDown} />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
