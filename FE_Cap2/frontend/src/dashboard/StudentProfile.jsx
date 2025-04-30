import React, { useState, useEffect } from "react";
import styles from "./StudentProfile.module.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../component/Navbar";
import Menu from "../component/Menu";

const StudentProfile = () => {
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || storedUser.role !== "Student") {
          navigate("/");
          return;
        }

        const response = await fetch(`http://localhost:5000/student-profile/${storedUser.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Không thể lấy thông tin sinh viên.");
        }

        const data = await response.json();
        setStudentInfo(data.student);
        setFormData(data.student);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStudentProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
  
    setFormData((prevData) => {
      let updatedData = { ...prevData };
      let current = updatedData;
  
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
  
      current[keys[keys.length - 1]] = value;
      return updatedData;
    });
  };
  

  const handleSave = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.id;
  
      if (!userId) {
        throw new Error("Không tìm thấy ID người dùng.");
      }
  
      const response = await fetch(`http://localhost:5000/update-student-profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) throw new Error("Cập nhật không thành công");
  
      const result = await response.json();
      alert(result.message);
      setStudentInfo(formData);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };
  

  if (error) return <div className={styles.error}>Lỗi: {error}</div>;
  if (!studentInfo) return <div className={styles.loading}>Đang tải thông tin...</div>;

  return (
    <div className={styles.container}>
      <NavBar />
      <Menu />
      <div className={styles.mainContent}>
        <section className={styles.section}>
          <h2>Thông tin học vấn</h2>
          <div className={styles.profileContent}>
            <img
              src={studentInfo.avatar || require("../image/sinhvien.png")}
              alt="Student Avatar"
              className={styles.avatar}
            />
            <div className={styles.info}>
              <p>MSSV: {studentInfo.student_code}</p>
              <p>Họ tên: {isEditing ? (<input name="name" value={formData.name || ""} onChange={handleChange} />) : studentInfo.name}</p>
              <p>Giới tính: {isEditing ? (<input name="gender" value={formData.gender || ""} onChange={handleChange} />) : studentInfo.gender}</p>
              <p>Ngày sinh: {isEditing ? (<input name="birth_date" value={formData.birth_date || ""} onChange={handleChange} />) : studentInfo.birth_date}</p>
              <p>E-mail: {isEditing ? (<input name="email" value={formData.email || ""} onChange={handleChange} />) : studentInfo.email}</p>
              <p>Số điện thoại: {isEditing ? (<input name="phone" value={formData.phone || ""} onChange={handleChange} />) : studentInfo.phone}</p>
              <p>CCCD: {isEditing ? (<input name="id_number" value={formData.id_number || ""} onChange={handleChange} />) : studentInfo.id_number}</p>
              <p>Trạng thái: Hoạt động</p>
              <p>Lớp học: {isEditing ? (<input name="class" value={formData.class || ""} onChange={handleChange} />) : studentInfo.class}</p>
              <p>Bậc đào tạo: {isEditing ? (<input name="level" value={formData.level || ""} onChange={handleChange} />) : studentInfo.level}</p>
              <p>Khoa: {isEditing ? (<input name="department" value={formData.department || ""} onChange={handleChange} />) : studentInfo.department}</p>
              <p>Ngành: {isEditing ? (<input name="major" value={formData.major || ""} onChange={handleChange} />) : studentInfo.major}</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Địa chỉ hiện thời</h2>
          <div className={styles.info}>
            <p>Địa chỉ: {isEditing ? (<input name="current_address.street" value={formData.current_address?.street || ""} onChange={handleChange} />) : studentInfo.current_address?.street}</p>
            <p>Phường: {isEditing ? (<input name="current_address.ward" value={formData.current_address?.ward || ""} onChange={handleChange} />) : studentInfo.current_address?.ward}</p>
            <p>Quận: {isEditing ? (<input name="current_address.district" value={formData.current_address?.district || ""} onChange={handleChange} />) : studentInfo.current_address?.district}</p>
            <p>Thành phố: {isEditing ? (<input name="current_address.city" value={formData.current_address?.city || ""} onChange={handleChange} />) : studentInfo.current_address?.city}</p>
            <p>Quốc gia: {isEditing ? (<input name="current_address.country" value={formData.current_address?.country || ""} onChange={handleChange} />) : studentInfo.current_address?.country}</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Người liên hệ khẩn cấp</h2>
          <div className={styles.info}>
            <p>Người liên hệ: {isEditing ? (<input name="emergency_contact.name" value={formData.emergency_contact?.name || ""} onChange={handleChange} />) : studentInfo.emergency_contact?.name}</p>
            <p>Là: {isEditing ? (<input name="emergency_contact.relationship" value={formData.emergency_contact?.relationship || ""} onChange={handleChange} />) : studentInfo.emergency_contact?.relationship}</p>
            <p>Địa chỉ: {isEditing ? (<input name="emergency_contact.address.street" value={formData.emergency_contact?.address?.street || ""} onChange={handleChange} />) : studentInfo.emergency_contact?.address?.street}</p>
            <p>Phường: {isEditing ? (<input name="emergency_contact.address.ward" value={formData.emergency_contact?.address?.ward || ""} onChange={handleChange} />) : studentInfo.emergency_contact?.address?.ward}</p>
            <p>Quận: {isEditing ? (<input name="emergency_contact.address.district" value={formData.emergency_contact?.address?.district || ""} onChange={handleChange} />) : studentInfo.emergency_contact?.address?.district}</p>
            <p>Thành phố: {isEditing ? (<input name="emergency_contact.address.city" value={formData.emergency_contact?.address?.city || ""} onChange={handleChange} />) : studentInfo.emergency_contact?.address?.city}</p>
            <p>Quốc gia: {isEditing ? (<input name="emergency_contact.address.country" value={formData.emergency_contact?.address?.country || ""} onChange={handleChange} />) : studentInfo.emergency_contact?.address?.country}</p>
            <p>Điện thoại: {isEditing ? (<input name="emergency_contact.phone" value={formData.emergency_contact?.phone || ""} onChange={handleChange} />) : studentInfo.emergency_contact?.phone}</p>
            <p>Email: {isEditing ? (<input name="emergency_contact.email" value={formData.emergency_contact?.email || ""} onChange={handleChange} />) : studentInfo.emergency_contact?.email}</p>
          </div>
        </section>
      </div>
      <div className={styles.updateButton}>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)}>Cập nhật</button>
        ) : (
          <>
            <button onClick={handleSave}>Lưu</button>
            <button onClick={() => setIsEditing(false)}>Hủy</button>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;