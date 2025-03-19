import React from "react";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBell, faSearch, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    return (
        <header className={styles.header}>
                <img
                  src="https://storage.googleapis.com/a1aa/image/95aVyRXrKdQts8tbfEJCaghbiOrvZ_1iG0muJQol6lw.jpg"
                  alt="Logo"
                  className={styles.logo}
                />
                <div className={styles.searchContainer}>
                  <input type="text" placeholder="Tìm kiếm" className={styles.searchInput} />
                  <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
                </div>
                <div className={styles.icons}>
                <FontAwesomeIcon icon={faHome} /> <span>Trang chủ</span>
                <FontAwesomeIcon icon={faBell} /> <span>Thông báo</span>
                </div>
                <div className={styles.userInfo}>
                  <img
                    src="https://storage.googleapis.com/a1aa/image/euAJxwENRC8wSZHJHIIhq3xbT0HzWx1USnwEW7G2OsI.jpg"
                    alt="User Avatar"
                    className={styles.userAvatar}
                  />
                  <span>NGUYỄN THỊ THU THẢO</span>
                  <div className={styles.dropdownIcon}>
                  <FontAwesomeIcon icon={faSortDown} />
                  </div>
                </div>
              </header>
    )
};
export default NavBar;