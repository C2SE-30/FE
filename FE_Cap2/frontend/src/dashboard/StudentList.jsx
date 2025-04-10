import React from "react";
import styles from "./StudentList.module.css";
import NavBar from "../component/Navbar";
import Menu from "../component/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const StudentList = () => {
  return (
    <div className={styles.body}>
      <NavBar />
      <Menu />
      <main className={styles.main}>
        <div className={styles.card}>
        <h1 className={styles.title}>Danh sách sinh viên</h1>
        <div className={styles.searchContainer}>
        <input type="text" placeholder="Tìm kiếm" className={styles.searchInput} />
        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
      </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>MSSV</th>
                <th>Họ Tên</th>
                <th>Lớp</th>
                <th>Ngành</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  mssv: "27201203058",
                  name: "Nguyễn Thị Thu Thảo",
                  lop: "K27CMU-TTT",
                  nganh: "HTTTQL",
                  trangthai: "Bình thường",
                  color: "normal",
                },
                {
                  mssv: "27201203058",
                  name: "Phan Thành Long",
                  lop: "K27CMU-TTT",
                  nganh: "HTTTQL",
                  trangthai: "Có nguy cơ",
                  color: "yellow",
                },
                {
                  mssv: "27201203058",
                  name: "Nguyễn Văn Tài",
                  lop: "K27CMU-TTT",
                  nganh: "HTTTQL",
                  trangthai: "Cảnh báo đỏ",
                  color: "red",
                },
                {
                  mssv: "27201203058",
name: "Lê Văn Tín",
                  lop: "K27CMU-TTT",
                  nganh: "HTTTQL",
                  trangthai: "Nguy cơ bỏ học",
                  color: "orange",
                }
              ].map((student, index) => (
                <tr key={index}>
                  <td>{student.mssv}</td>
                  <td>{student.name}</td>
                  <td>{student.lop}</td>
                  <td>{student.nganh}</td>
                  <td className={styles[student.color]}>{student.trangthai}</td>
                  <td><a href="#">Xem chi tiết</a></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.pagination}>
            <button>← Previous</button>
            <button>Next →</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentList;