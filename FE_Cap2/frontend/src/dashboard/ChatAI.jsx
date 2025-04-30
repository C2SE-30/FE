import React from "react";
import styles from "./ChatAI.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../component/Navbar";
import Menu from "../component/Menu";

const ChatAI = () => {
  return (
    <div className={styles.background}>
      <Navbar />
      <Menu />
    <div className={styles.mainContainer}>
    <div className={styles.container} role="main" aria-label="Trợ lý AI học tập">
      <div className={styles.header}>
        <div className={styles.left}>
          <FontAwesomeIcon icon={faMessage} className={styles.searchIcon} />
          <span>Trợ lý AI học tập</span>
        </div>
        <div className={styles.right}>Cảnh báo học vụ</div>
      </div>

      <section className={styles.studentInfo} aria-label="Thông tin sinh viên">
        <div className={styles.infoLeft}>
          <strong>Sinh viên: Nguyễn Văn A (MSSV: SV12345)</strong>
          <span>
            GPA: <span className={styles.gpaValue}>1.9/4.0</span>
          </span>
        </div>
        <div className={styles.infoRight}>
          Chuyên cần: <span className={styles.attendanceValue}>68%</span>
        </div>
      </section>

      <section className={styles.messageBox} aria-label="Tin nhắn trợ lý AI học tập">
        <p>
          <span className={`${styles.emoji}`} role="img" aria-hidden="true">👋</span>
          Xin chào Nguyễn Văn A! Mình là Trợ lý AI học tập.
        </p>
        <p>
          <span className={`${styles.emoji} ${styles.multicolor}`} role="img" aria-hidden="true">📊</span>
          Mình thấy bạn đang gặp một số vấn đề học tập cần lưu ý:
        </p>
        <ul>
          <li>GPA hiện tại: 1.9/4.0 (dưới ngưỡng an toàn 2.0)</li>
          <li>Tỷ lệ chuyên cần: 68% (chưa đạt yêu cầu 70%)</li>
          <li>Bạn đã bỏ lỡ 3 bài tập và 7 buổi học</li>
        </ul>
        <p>Bạn cần hỗ trợ gấp về môn Lập Trình Java và Toán Ứng Dụng để tránh bị cảnh báo học vụ tiếp theo.</p>
      </section>

      <nav className={styles.btnGroup} aria-label="Các câu hỏi gợi ý">
        <button type="button">Làm sao để cải thiện GPA của tôi?</button>
        <button type="button">Tôi cần làm gì với môn Lập Trình Java?</button>
        <button type="button">Làm thế nào để cải thiện điểm chuyên cần?</button>
        <button className={styles.fullWidth} type="button">Các deadline sắp tới của tôi là gì?</button>
        <button className={styles.fullWidth} type="button">Tôi muốn đặt lịch gặp cố vấn học tập</button>
      </nav>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="user-question"
          placeholder="Nhập câu hỏi của bạn..."
          aria-label="Nhập câu hỏi của bạn"
          autoComplete="off"
        />
        <button type="submit" aria-label="Gửi câu hỏi">
          <FontAwesomeIcon icon={faShareNodes} />
          Gửi
        </button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default ChatAI;
