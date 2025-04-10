import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentProfile from "./dashboard/StudentProfile";
import StudentHome from "./pages/StudentHome";
import Login from "./auth/Login";
import TeacherAdvise from "./dashboard/TeacherAdvise";
import TeacherHome from "./pages/TeacherHome";
import PredictStudent from "./dashboard/PredictStudent";
import StudentList from "./dashboard/StudentList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/studenthome" element={<StudentHome />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/" element={<Login />} />
        <Route path="/advise" element={<TeacherAdvise />} />
        <Route path="/teacherhome" element={<TeacherHome />} />
        <Route path="/predictstudent" element={<PredictStudent />} />
        <Route path="studentlist" element={<StudentList />} />
      </Routes>
    </Router>
  );
}

export default App;
