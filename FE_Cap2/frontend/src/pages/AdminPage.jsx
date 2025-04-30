import React, { useState, useEffect } from "react";
import styles from "./AdminPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faUsers, faRobot, faComments, faGear, faBell, faBars, faFile, faUpload, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminPage() {
  const [isSidebarHidden, setSidebarHidden] = useState(false);
  const [isSubmenuVisible, setSubmenuVisible] = useState(false);
  const [totalCourses, setTotalCourses] = useState(0);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarHidden(!isSidebarHidden);
  };

  const toggleSubmenu = (e) => {
    e.preventDefault();
    setSubmenuVisible((prev) => !prev);
  };

  useEffect(() => {
    fetchTotalCourses();
  }, []);

  const fetchTotalCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/course/total');
      setTotalCourses(response.data.total);
    } catch (error) {
      console.error('Error fetching total courses:', error);
    }
  };

  const handleManageUser = () => {
    navigate('/manageuser');
  };
  const handleAdminPage = () => {
    navigate('/admin');
  };
  const handleManageInstructor = () => {
    navigate('/manageinstructor');
  };
  const handleAdminManageCourse = () => {
    navigate('/adminmanagecourse');
  };

  return (
    <div className={styles.dashboard}>
      <div className={`${styles.sidebar} ${isSidebarHidden ? styles.hidden : ""}`}>
        <h1 style={{ fontSize: "40px", fontWeight: "bold" }}>PAI</h1>
        <a href="#" onClick={handleAdminPage}>
          <FontAwesomeIcon icon={faTachometerAlt} style={{marginRight:"10px"}} /> Dashboard
        </a>
        <a href="#" onClick={toggleSubmenu}>
          <FontAwesomeIcon icon={faUsers} style={{marginRight:"10px"}} /> Manage account
        </a>
        <div className={`${styles.submenu} ${isSubmenuVisible ? styles.visible : ""}`}>
          <a href="#" onClick={handleManageUser}>Student account</a>
          <a href="#" onClick={handleManageInstructor}>Teacher account</a>
        </div>
        <a href="#">
          <FontAwesomeIcon icon={faRobot} style={{marginRight:"10px"}} /> AI Model
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faGear} style={{marginRight:"10px"}} /> System Config
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faFile} style={{marginRight:"10px"}} /> Logs
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faUpload} style={{marginRight:"10px"}} /> Bulk Import
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faDownload} style={{marginRight:"10px"}} /> Bulk Export
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faBell} style={{marginRight:"10px"}} /> Notifications
        </a>
      </div>
      <div className={`${styles.mainContent} ${isSidebarHidden ? styles.fullWidth : ""}`}>
        <div className={styles.header}>
          <h2>
            <FontAwesomeIcon icon={faBars} onClick={toggleSidebar} /> Dashboard
          </h2>
          <div className={styles.userInfo}>
            <img
              src={require("../image/PAI.LOGO.png")}
              alt="Logo"
              height="300"
              width="300"
              style={{ cursor: "pointer"}}
              onClick={handleAdminPage}
            />
            <span>
              PAI<br />Admin
            </span>
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div>
              <h3>0</h3>
              <p>Student</p>
            </div>
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div className={styles.card}>
            <div>
              <h3>{totalCourses}</h3>
              <p>Teacher</p>              
            </div>
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div className={styles.card}>
            <div>
              <h3>0</h3>
              <p>???</p>
            </div>
            <FontAwesomeIcon icon={faComments} />
          </div>
        </div>
        <div className={styles.tableContainer}>
          <h3>Managers</h3>
          <a className={styles.viewAll} href="#">
            View All
          </a>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Phạm Hạ Vỹ</td>
                <td>hvo190403@gmail.com</td>
                <td>0392930729</td>
              </tr>
              <tr>
                <td>Huỳnh Văn Tâm</td>
                <td>hvantam0612@gmail.com</td>
                <td>0898429487</td>
              </tr>
              <tr>
                <td>Võ Văn Lân</td>
                <td>duytri02@gmail.com</td>
                <td>0326683799</td>
              </tr>
              <tr>
                <td>Nguyễn Thị Thu Thảo</td>
                <td>trungacelessi@gmail.com</td>
                <td>0967542309</td>
              </tr>
              <tr>
                <td>Trần Nguyễn Trung Nguyên</td>
                <td>trungacelessi@gmail.com</td>
                <td>0967542309</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
