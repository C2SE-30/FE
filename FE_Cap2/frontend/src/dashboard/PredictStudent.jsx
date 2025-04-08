import React from "react";
import styles from "./PredictStudent.module.css";
import NavBar from "../component/Navbar";
import Menu from "../component/Menu";

const PredictStudent = () => {
  return (
    <div className={styles.predictStudent}>
        <NavBar />
        <Menu  />
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Nhập Dữ Liệu Học Tập</h2>
        <div className={styles.uploadBox}>
          <button className={styles.closeButton}>
            <i className="fas fa-times"></i>
          </button>
          <img
            src="https://storage.googleapis.com/a1aa/image/-6fcDwaG0o7rc7ssgdUsq7L219cnvDBFb9VS_n1dO5I.jpg"
            alt="Upload Icon"
            className={styles.uploadIcon}
          />
          <p className={styles.uploadTitle}>Tải lên file Excel điểm sinh viên</p>
          <p className={styles.uploadSubtitle}>Hỗ trợ định dạng .xlsx, .xls</p>
          <input type="file" className={styles.fileInput} />
          <button className={styles.uploadButton}>Phân tích</button>
        </div>
      </div>

      <div className={styles.card}>
        <h2>Kết Quả Phân Tích</h2>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <h3>Sinh viên cảnh báo nghiêm trọng</h3>
            <h2 className={styles.red}>15</h2>
            <p>7% tổng số sinh viên</p>
          </div>
          <div className={styles.statItem}>
            <h3>Sinh viên cần quan tâm</h3>
            <h2 className={styles.orange}>42</h2>
            <p>19% tổng số sinh viên</p>
          </div>
          <div className={styles.statItem}>
            <h3>Sinh viên học tập tốt</h3>
            <h2 className={styles.green}>165</h2>
            <p>74% tổng số sinh viên</p>
          </div>
          <div className={styles.statItem}>
            <h3>Tổng số sinh viên</h3>
            <h2>222</h2>
            <p>2 lớp học phần</p>
          </div>
        </div>

        <div className={styles.filters}>
          {/* <div>
            <label>Lớp:</label>
            <select>
              <option>K27 CMU-TPM7</option>
            </select>
          </div> */}
          <div>
            <label>Trạng thái:</label>
            <select>
              <option>Tất cả</option>
            </select>
          </div>
          <div>
            <label>Sắp xếp:</label>
            <select>
              <option>Mức độ rủi ro</option>
            </select>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Mã SV</th>
                <th>Họ và tên</th>
                <th>Lớp</th>
                <th>Điểm danh</th>
                <th>Điểm SES</th>
                <th>GPA</th>
                <th>Tổng kết</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>22IT123</td>
                <td>Nguyễn Văn A</td>
                <td>IT K62A</td>
                <td>8.5</td>
                <td>7.5</td>
                <td>7.0</td>
                <td>7.2</td>
                <td className={styles.greenStatus}>Tốt</td>
              </tr>
              <tr>
                <td>22IT124</td>
                <td>Trần Thị B</td>
                <td>IT K62A</td>
                <td>7.0</td>
                <td>5.0</td>
                <td>5.8</td>
                <td>5.8</td>
                <td className={styles.orangeStatus}>Cần quan tâm</td>
              </tr>
              <tr>
                <td>22IT125</td>
                <td>Lê Văn C</td>
                <td>IT K62A</td>
                <td>4.0</td>
                <td>3.5</td>
                <td>2.5</td>
                <td>2.8</td>
                <td className={styles.redStatus}>Cảnh báo</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.actions}>
          <button className={styles.exportButton}>Xuất báo cáo Excel</button>
          <button className={styles.notifyButton}>Gửi cảnh báo cho sinh viên</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PredictStudent;