import React, { useRef, useState } from "react";
import styles from "./Menu.module.css";

const Menu = () => {
  const menuRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Quản lý hiển thị bảng

  const handleMouseDown = (e) => {
    const menu = menuRef.current;
    menu.dataset.offsetX = e.clientX - menu.getBoundingClientRect().left;
    menu.dataset.offsetY = e.clientY - menu.getBoundingClientRect().top;
    setIsDragging(true);
    menu.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return; // Chỉ di chuyển khi đang kéo
    const menu = menuRef.current;
    const offsetX = parseInt(menu.dataset.offsetX, 10);
    const offsetY = parseInt(menu.dataset.offsetY, 10);
    menu.style.left = `${e.clientX - offsetX}px`;
    menu.style.top = `${e.clientY - offsetY}px`;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const menu = menuRef.current;
    menu.style.cursor = "grab";
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible); // Bật/tắt hiển thị bảng
  };

  return (
    <div
      ref={menuRef}
      className={styles.container}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Đảm bảo dừng kéo khi chuột rời khỏi menu
    >
      <div className={styles.menuIcon} onClick={toggleSidebar}>☰</div>
      {isSidebarVisible && (
        <div className={styles.sidebar}>
          <ul>
            <li>Thông tin cá nhân</li>
            <li>Kết quả học tập</li>
            <li>Thông báo & gợi ý</li>
            <li>Cải thiện học tập</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;