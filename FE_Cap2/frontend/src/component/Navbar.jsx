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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Lấy user từ localStorage (sau khi login lưu vào)
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
        setUserInfo(data.student); // gán student vào userInfo
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    // 🛠 Tạm thời notifications giả lập (vì BE chưa có API /notifications)
    const fetchNotifications = async () => {
      setNotifications([
        { id: 1, message: "Thông báo 1: Chào mừng bạn đến hệ thống!" },
        { id: 2, message: "Thông báo 2: Cập nhật hồ sơ cá nhân." }
      ]);
    };

    fetchUserInfo();
    fetchNotifications();
  }, [navigate]);

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
                    <li key={notification.id}>{notification.message}</li>
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
