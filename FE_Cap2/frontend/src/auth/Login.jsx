import React, { useState } from "react";
import styles from "./Login.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  // const [showPassword, setShowPassword] = useState(false);

  //   const togglePasswordVisibility = () => {
  //       setShowPassword(!showPassword);
  //   };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập của bạn.");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      // Handle successful login (e.g., save token, redirect)
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
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              type="text"
              id="username"
              name="username"
              className={styles.input}
              value={formData.username}
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