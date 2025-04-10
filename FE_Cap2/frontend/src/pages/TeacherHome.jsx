import React from "react";
import styles from "./TeacherHome.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faEnvelopeOpenText, faComments, faBook} from "@fortawesome/free-solid-svg-icons";
import NavBar from "../component/Navbar";
import Menu from "../component/Menu";
import { useNavigate } from "react-router-dom";

const TeacherHome = () => {
  const navigate = useNavigate();
  const handlePredict = () => {
    // Navigate to the prediction page
    navigate("/predictstudent");
  };
  return (
    <div className={styles.teacherHome}>
      {/* Header */}
      <NavBar />
      <Menu />
      {/* Main Content */}
      <main className={styles.container}>
        <div className={styles.teacherInfo}>
          <div className={styles.infoHeader}>
            <div className={styles.avatarContainer}>
              <img
                src={require('../image/covan.png')}
                alt="Student avatar"
                className={styles.teacherAvatar}
              />
              <a href="#" className={styles.detailLink}>
                Xem chi tiết
              </a>
            </div>
            <div className={styles.infoText}>
              <h2>Thông tin giảng viên</h2>
              <div className={styles.infoContainer}>
                <div>
                  <p>
                    <strong>MSGV:</strong> 27201203058
                  </p>
                  <p>
                    <strong>Họ tên:</strong> Nguyễn Thị Thu Thảo
                  </p>
                  <p>
                    <strong>Giới tính:</strong> Nữ
                  </p>
                  <p>
                    <strong>Ngày sinh:</strong> 12/02/2003
                  </p>
                  <p>
                    <strong>E-mail:</strong> nttt120203@gmail.com
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Số điện thoại:</strong> 0703964705
                  </p>
                  <p>
                    <strong>Học vị:</strong> Thạc sĩ
                  </p>
                  <p>
                    <strong>Vị trí làm việc:</strong> Thạc sĩ - Khoa
                  </p>
                  <p>
                    <strong>Ngành đào tạo:</strong> Khoa học dữ liệu
                  </p>
                  <p>
                    <strong>Bộ môn giảng dạy:</strong> Cấu trúc dữ liệu
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <FontAwesomeIcon icon={faEnvelopeOpenText} className={styles.icon} />
            <h3>Danh sách sinh viên</h3>
            <p>Xem danh sách sinh viên và trạng thái học tập</p>
            <button href="#">Xem chi tiết</button>
          </div>
          <div className={styles.featureCard}>
            <FontAwesomeIcon icon={faComments} className={styles.icon} />
            <h3>Phân tích nguy cơ bỏ học</h3>
            <p>Phân tích nguy cơ bỏ học & nhận dự đoán chi tiết</p>
            <button href="#" onClick={handlePredict}>Thực hiện ngay</button>
          </div>
          <div className={styles.featureCard}>
            <FontAwesomeIcon icon={faBook} className={styles.icon} />
            <h3>Hỗ trợ & lập kế hoạch</h3>
            <p>Hỗ trợ học tập & kế hoạch cải thiện</p>
            <button href="#">Khám phá ngay</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherHome;
