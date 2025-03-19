import React from "react";
import styles from "./StudentHome.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHome, faBell, faChartLine, faCheckCircle, faBook } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const StudentHome = () => {
    const navigate = useNavigate();
      const handleProfile=()=>{
        navigate('/profile');
      }
  return (
    <div>
      <div className={styles.header}>
        <img alt="Logo" src="https://placehold.co/50x50" />
        <div className={styles.searchContainer}>
          <input placeholder="Tìm kiếm" type="text" />
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
        </div>
        <div className={styles.navIcons}>
          <FontAwesomeIcon icon={faHome} />
          <span>Trang chủ</span>
          <FontAwesomeIcon icon={faBell} />
          <span>Thông báo</span>
        </div>
        <div className={styles.userInfo}>
          <img alt="User Avatar" src="https://placehold.co/40x40" onClick={handleProfile} />
          <span>NGUYỄN THỊ THU THẢO</span>
        </div>
      </div>
      <div className={styles.content}>
        <h2>Thông tin sinh viên</h2>
        <div className={styles.studentInfo}>
          <img alt="Student Avatar" src="https://placehold.co/100x100" />
          <div className={styles.details}>
            <div><span>MSSV:</span><span className={styles.value}>27201203058</span></div>
            <div><span>Số điện thoại:</span><span className={styles.value}>0703964705</span></div>
            <div><span>Họ tên:</span><span className={styles.value}>Nguyễn Thị Thu Thảo</span></div>
            <div><span>Lớp học:</span><span className={styles.value}>K27CMU-TTT</span></div>
            <div><span>Giới tính:</span><span className={styles.value}>Nữ</span></div>
            <div><span>Ngành:</span><span className={styles.value}>Hệ Thống Thông Tin Quản Lý</span></div>
            <div><span>Ngày sinh:</span><span className={styles.value}>12/02/2003</span></div>
            <div><span>Bậc đào tạo:</span><span className={styles.value}>Đại học</span></div>
            <div><span>E-mail:</span><span className={styles.value}>nttt120203@gmail.com</span></div>
            <div><a href="#">Xem chi tiết</a></div>
          </div>
        </div>
        <div className={styles.cards}>
          <Card icon={faChartLine} title="Kết quả học tập" desc="Xem thống kê học tập & cảnh báo học tập" color="red" />
          <Card icon={faBell} title="Thông báo & Gợi ý" desc="Nhận thông báo & gợi ý cải thiện" color="orange" />
          <Card icon={faCheckCircle} title="Phản hồi & Hành động" desc="Trả lời thông báo & thực hiện hành động" color="blue" />
          <Card icon={faBook} title="Cải thiện học tập" desc="Đề xuất tài liệu & hỗ trợ học tập" color="green" />
        </div>
      </div>
    </div>
  );
};

const Card = ({ icon, title, desc, color }) => {
  return (
    <div className={styles.card}>
      <FontAwesomeIcon icon={icon} className={styles[color]} />
      <h3>{title}</h3>
      <p>{desc}</p>
      <a href="#" className={styles[color]}>Xem chi tiết</a>
    </div>
  );
};

export default StudentHome;
