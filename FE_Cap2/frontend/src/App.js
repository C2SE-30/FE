import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentProfile from "./dashboard/StudentProfile";
import StudentHome from "./pages/StudentHome";
import Login from "./auth/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentHome />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
