import React, { useState, useEffect } from "react";
import styles from "./StudentHome.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faEnvelopeOpenText, faComments, faBook } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../component/Navbar";
import Menu from "../component/Menu";
import { useNavigate } from "react-router-dom";

const StudentHome = () => {
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState(null); // Lưu thông tin sinh viên
  const [error, setError] = useState(""); // Lưu lỗi nếu có

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user")); // Lấy thông tin user từ localStorage
        if (!storedUser || storedUser.role !== "Student") {
          navigate("/"); // Điều hướng về trang login nếu không phải sinh viên
          return;
        }

        const response = await fetch(`http://localhost:5000/student/${storedUser.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Không thể lấy thông tin sinh viên.");
        }

        const data = await response.json();
        setStudentInfo(data.student); // Lưu thông tin sinh viên vào state
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStudentInfo();
  }, [navigate]);

  if (error) {
    return <div className={styles.error}>Lỗi: {error}</div>;
  }

  if (!studentInfo) {
    return <div className={styles.loading}>Đang tải thông tin...</div>;
  }

  return (
    <div className={styles.studentHome}>
      {/* Header */}
      <NavBar />
      <Menu />
      {/* Main Content */}
      <main className={styles.container}>
        <div className={styles.studentInfo}>
          <div className={styles.infoHeader}>
            <div className={styles.avatarContainer}>
              <img
                src={studentInfo.avatar || require("../image/sinhvien.png")}
                alt="Student avatar"
                className={styles.studentAvatar}
              />
              <a href="#" className={styles.detailLink}>
                Xem chi tiết
              </a>
            </div>
            <div className={styles.infoText}>
              <h2>Thông tin sinh viên</h2>
              <div className={styles.infoContainer}>
                <div>
                  <p>
                    <strong>MSSV:</strong> {studentInfo.student_code}
                  </p>
                  <p>
                    <strong>Họ tên:</strong> {studentInfo.name}
                  </p>
                  <p>
                    <strong>Giới tính:</strong> {studentInfo.gender}
                  </p>
                  <p>
                    <strong>Ngày sinh:</strong> {studentInfo.birth_date}
                  </p>
                  <p>
                    <strong>E-mail:</strong> {studentInfo.email}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Số điện thoại:</strong> {studentInfo.phone}
                  </p>
                  <p>
                    <strong>Lớp học:</strong> {studentInfo.class}
                  </p>
                  <p>
                    <strong>Ngành:</strong> {studentInfo.major}
                  </p>
                  <p>
                    <strong>Bậc đào tạo:</strong> {studentInfo.level}
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
            <h3>Thông báo & Gợi ý</h3>
            <p>Nhận thông báo & gợi ý cải thiện</p>
            <button href="#" onClick={() => navigate("/notifications")}>
              Xem thông báo
            </button>
          </div>
          <div className={styles.featureCard}>
            <FontAwesomeIcon icon={faComments} className={styles.icon} />
            <h3>Phản hồi & Hành động</h3>
            <p>Trả lời thông báo & thực hiện hành động</p>
            <button href="#" onClick={() => navigate("/chat")}>
              Thực hiện ngay
            </button>
          </div>
          <div className={styles.featureCard}>
            <FontAwesomeIcon icon={faBook} className={styles.icon} />
            <h3>Cải thiện học tập</h3>
            <p>Đề xuất tài liệu & hỗ trợ học tập</p>
            <button href="#" onClick={() => navigate("/improve")}>
              Khám phá ngay
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentHome;