import React from "react";
import styles from "./StudentHome.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faEnvelopeOpenText, faComments, faBook, faBell } from "@fortawesome/free-solid-svg-icons";  // Thêm faBell ở đây
import NavBar from "../component/Navbar";
import Menu from "../component/Menu";

const StudentHome = () => {
  return (
    <div className={styles.studentHome}>
      {/* Header */}
      <NavBar />
      <Menu />
      
      {/* Main Content */}
      <main className={styles.container}>
        {/* <div className={styles.header}>
          <img alt="Logo" src="https://placehold.co/50x50" />
          <div className={styles.searchContainer}>
            <input placeholder="Tìm kiếm" type="text" />
          </div>
          <div className={styles.navIcons}>
            <span>Trang chủ</span>
            <FontAwesomeIcon icon={faBell} />
            <span>Thông báo</span>
          </div>
          <div className={styles.userInfo}>
            <img alt="User Avatar" src="https://placehold.co/40x40" />
            <span>NGUYỄN THỊ THU THẢO</span>
          </div>
        </div> */}
        
        <div className={styles.content}>
          {/* <h2>Thông tin sinh viên</h2> */}
          <div className={styles.studentInfo}>
            <div className={styles.infoHeader}>
              <div className={styles.avatarContainer}>
                <img
                  src="https://storage.googleapis.com/a1aa/image/it2tZ94f60tK6dXnxrMDOXFE_9YsWcNWZN5d7qKi658.jpg"
                  alt="Student avatar"
                  className={styles.studentAvatar}
                />
                <a href="#" className={styles.detailLink}>Xem chi tiết</a>
              </div>
              <div className={styles.infoText}>
                <h2>Thông tin sinh viên</h2>
                <div className={styles.infoContainer}>
                  <div>
                    <p><strong>MSSV:</strong> 27201203058</p>
                    <p><strong>Họ tên:</strong> Nguyễn Thị Thu Thảo</p>
                    <p><strong>Giới tính:</strong> Nữ</p>
                    <p><strong>Ngày sinh:</strong> 12/02/2003</p>
                    <p><strong>E-mail:</strong> nttt120203@gmail.com</p>
                  </div>
                  <div>
                    <p><strong>Số điện thoại:</strong> 0703964705</p>
                    <p><strong>Lớp học:</strong> K27CMU-TTT</p>
                    <p><strong>Ngành:</strong> Hệ Thống Thông Tin Quản Lý</p>
                    <p><strong>Bậc đào tạo:</strong> Đại học</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <FontAwesomeIcon icon={faChartLine} className={styles.icon} />
              <h3>Kết quả học tập</h3>
              <p>Xem thống kê học tập & cảnh báo học tập</p>
              <button>Xem chi tiết</button>
            </div>
            <div className={styles.featureCard}>
              <FontAwesomeIcon icon={faEnvelopeOpenText} className={styles.icon} />
              <h3>Thông báo & Gợi ý</h3>
              <p>Nhận thông báo & gợi ý cải thiện</p>
              <button>Xem thông báo</button>
            </div>
            <div className={styles.featureCard}>
              <FontAwesomeIcon icon={faComments} className={styles.icon} />
              <h3>Phản hồi & Hành động</h3>
              <p>Trả lời thông báo & thực hiện hành động</p>
              <button>Thực hiện ngay</button>
            </div>
            <div className={styles.featureCard}>
              <FontAwesomeIcon icon={faBook} className={styles.icon} />
              <h3>Cải thiện học tập</h3>
              <p>Đề xuất tài liệu & hỗ trợ học tập</p>
              <button>Khám phá ngay</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentHome;
