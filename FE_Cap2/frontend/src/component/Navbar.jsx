import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBell, faSearch, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header className={styles.header}>
      <img
        src={require('../image/PAI.LOGO.png')}
        alt="Logo"
        className={styles.logo}
        onClick={() => navigate('/')}
      />
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Tìm kiếm" className={styles.searchInput} />
        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
      </div>
      <div className={styles.icons}>
        <FontAwesomeIcon icon={faHome} /> <span>Trang chủ</span>
        <div className={styles.notificationContainer}>
          <FontAwesomeIcon icon={faBell} onClick={toggleNotifications} className={styles.notificationIcon} />
          <span>Thông báo</span>
          {showNotifications && (
            <div className={styles.notificationDropdown}>
              <ul>
                <li>Thông báo 1</li>
                <li>Thông báo 2</li>
                <li>Thông báo 3</li>
              </ul>
              <button onClick={() => navigate('/notifications')}>Xem tất cả</button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.userInfo}>
        <img
          src="https://storage.googleapis.com/a1aa/image/euAJxwENRC8wSZHJHIIhq3xbT0HzWx1USnwEW7G2OsI.jpg"
          alt="User Avatar"
          className={styles.userAvatar}
          onClick={() => navigate('/profile')}
        />
        <span>NGUYỄN THỊ THU THẢO</span>
        <div className={styles.dropdownIcon}>
          <FontAwesomeIcon icon={faSortDown} />
        </div>
      </div>
    </header>
  );
};

export default NavBar;