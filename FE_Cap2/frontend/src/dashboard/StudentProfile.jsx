import React from "react";
import styles from "./StudentProfile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBell, faSearch, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import NavBar from "../component/Navbar";

const StudentProfile = () => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <NavBar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Thông tin học vấn */}
        <section className={styles.section}>
          <h2>Thông tin học vấn</h2>
          <div className={styles.profileContent}>
            <img
              src="https://storage.googleapis.com/a1aa/image/2wByF7ATrMwbhH3lgkZ8Xtsq1AjfQ4Ifv_9v-G9t-rU.jpg"
              alt="Student Avatar"
              className={styles.avatar}
            />
            <div className={styles.info}>
              <p>MSSV: 27201023058</p>
              <p>Họ tên: Nguyễn Thị Thu Thảo</p>
              <p>Giới tính: Nữ</p>
              <p>Ngày sinh: 12/02/2003</p>
              <p>E-mail: nttt120203@gmail.com</p>
              <p>Số điện thoại: 0703964705</p>
              <p>CCCD: 8888888888</p>
              <p>Trạng thái: Đang học</p>
              <p>Lớp học: K27 CMU</p>
              <p>Bậc đào tạo: Đại học</p>
              <p>Khoa: Đào tạo quốc tế</p>
              <p>Ngành: Hệ Thống Thông Tin Quản Lý</p>
            </div>
          </div>
        </section>

        {/* Địa chỉ hiện thời */}
        <section className={styles.section}>
          <h2>Địa chỉ hiện thời</h2>
          <div className={styles.info}>
            <p>Địa chỉ: 123 Ngô Quyền</p>
            <p>Phường: An Hải Bắc</p>
            <p>Quận: Sơn Trà</p>
            <p>Thành phố: Đà Nẵng</p>
            <p>Quốc gia: Việt Nam</p>
          </div>
        </section>

        {/* Người liên hệ khẩn cấp */}
        <section className={styles.section}>
          <h2>Người liên hệ khẩn cấp</h2>
          <div className={styles.info}>
            <p>Người liên hệ: Nguyễn Thị A</p>
            <p>Là: Mẹ</p>
            <p>Địa chỉ: 123 Ngô Quyền</p>
            <p>Phường: An Hải Bắc</p>
            <p>Quận: Sơn Trà</p>
            <p>Thành phố: Đà Nẵng</p>
            <p>Quốc gia: Việt Nam</p>
            <p>Điện thoại: 0888999888</p>
            <p>Email: hvantam11@gmail.com</p>
          </div>
        </section>
      </div>
      <div className={styles.updateButton}>
        <button>Cập nhật</button>
      </div>
    </div>
  );
};

export default StudentProfile;
