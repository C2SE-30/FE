import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Đăng nhập không thành công.");
      }

      console.log("Login successful:", data);

      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      // Điều hướng dựa trên vai trò (role)
      switch (data.user.role) {
        case "Student":
          navigate("/studenthome");
          break;
        case "Advisor":
          navigate("/teacherhome");
          break;
        case "Admin":
          navigate("/admin");
          break;
        default:
          throw new Error("Vai trò không hợp lệ.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2 className={styles.title}>Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.formGroup}>
            <button type="submit" className={styles.button}>Đăng nhập</button>
          </div>
          <div className={styles.forgotPassword}>
            <a href="#">Quên mật khẩu?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;