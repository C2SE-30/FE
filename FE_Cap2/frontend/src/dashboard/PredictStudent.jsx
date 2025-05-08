import React, { useState } from "react";
import styles from "./PredictStudent.module.css";
import NavBar from "../component/Navbar";
import Menu from "../component/Menu";

const PredictStudent = () => {
  const [file, setFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  const handleAnalyze = async () => {
    if (!file) {
      setError("Vui lòng chọn file trước khi phân tích.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const userId = "6"; // ID của cố vấn học tập

      const response = await fetch(`http://localhost:5000/predict-student?user_id=${userId}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Lỗi không xác định");
      }

      const data = await response.json();
      setAnalysisResult(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Đã xảy ra lỗi khi phân tích dữ liệu.");
    }
  };

  const handleExport = async () => {
    if (!file) {
      setError("Vui lòng chọn file trước khi xuất báo cáo.");
      return;
    }

    try {
      setIsExporting(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:5000/export-report", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Xuất báo cáo thất bại.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "dropout_report.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setError("");
    } catch (err) {
      console.error(err);
      setError("Đã xảy ra lỗi khi xuất báo cáo.");
    } finally {
      setIsExporting(false);
    }
  };

  const renderTableRows = () => {
    if (!analysisResult || !analysisResult.data) return null;
    return analysisResult.data.map((student, index) => {
      const status =
        student.DropoutRisk === 1
          ? styles.redStatus
          : parseFloat(student.Grades) < 60
          ? styles.orangeStatus
          : styles.greenStatus;

      const statusText =
        student.DropoutRisk === 1 ? "Cảnh báo" :
        parseFloat(student.Grades) < 60 ? "Cần quan tâm" : "Tốt";

      return (
        <tr key={index}>
          <td>{student["Student ID"] || "N/A"}</td>
          <td>{student["Full Name"] || "N/A"}</td>
          <td>{student["Class"] || "N/A"}</td>
          <td>{student["Attendant"]}</td>
          <td>{student["SOCIECON"]}</td>
          <td>{student["Study HOU"]}</td>
          <td>{student["Sleep HOU"]}</td>
          <td>{student["Grades"]}</td>
          <td className={status}>{statusText}</td>
        </tr>
      );
    });
  };

  return (
    <div className={styles.predictStudent}>
      <NavBar />
      <Menu />
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
            <p className={styles.uploadSubtitle}>Hỗ trợ định dạng .csv</p>
            <input
              type="file"
              className={styles.fileInput}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button className={styles.uploadButton} onClick={handleAnalyze}>
              Phân tích
            </button>
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>

        {analysisResult && (
          <div className={styles.card}>
            <h2>Kết Quả Phân Tích</h2>
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <h3>Sinh viên cảnh báo nghiêm trọng</h3>
                <h2 className={styles.red}>{analysisResult.high_risk_students.length}</h2>
              </div>
              <div className={styles.statItem}>
                <h3>Tổng số sinh viên</h3>
                <h2>{analysisResult.data.length}</h2>
              </div>
              <div className={styles.statItem}>
                <h3>Điểm TB</h3>
                <h2>{analysisResult.grades_mean.toFixed(1)}</h2>
              </div>
              <div className={styles.statItem}>
                <h3>Điểm danh TB</h3>
                <h2>{analysisResult.attendant_mean.toFixed(1)}</h2>
              </div>
              <div className={styles.statItem}>
                <h3>Giờ ngủ TB</h3>
                <h2>{analysisResult.sleep_hours_mean.toFixed(1)}</h2>
              </div>
            </div>

            <div className={styles.filters}>
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
                    <th>Giờ học</th>
                    <th>Giờ ngủ</th>
                    <th>Tổng kết</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
              </table>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.exportButton}
                onClick={handleExport}
                disabled={isExporting}
              >
                {isExporting ? "Đang xuất..." : "Xuất báo cáo Excel"}
              </button>
              <button className={styles.notifyButton}>Gửi cảnh báo cho sinh viên</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictStudent;
