import React, { useState } from "react";
import styles from "./TeacherAdvise.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope, faExchangeAlt, faSortDown } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../component/Navbar";
import Menu from "../component/Menu";

const TeacherAdvise = () => {
    const [requests, setRequests] = useState([
        { id: 1, name: "Nguyễn Văn An", studentId: "SV001", type: "Tư vấn học tập", showForm: false },
        { id: 2, name: "Trần Thị Bình", studentId: "SV045", type: "Tư vấn nghề nghiệp", showForm: false },
        { id: 3, name: "Huỳnh Văn Tâm", studentId: "SV045", type: "Tư vấn đi làm", showForm: false },
    ]);

    const [confirmedAppointments, setConfirmedAppointments] = useState([]);

    const toggleForm = (id) => {
        setRequests(requests.map(request =>
            request.id === id ? { ...request, showForm: !request.showForm } : request
        ));
    };

    const confirmAppointment = (id, name, studentId, type, date, time, location) => {
        if (date && time && location) {
            setConfirmedAppointments([...confirmedAppointments, { id, name, studentId, type, date, time, location }]);
            setRequests(requests.filter(request => request.id !== id));
        } else {
            alert("Vui lòng nhập đầy đủ thông tin.");
        }
    };

    return (
        <div className={styles.teacherAdvise}>
            <NavBar />
            <Menu />
            <div className={styles.container}>
                {/* <h1 className={styles.title}>Hệ Thống Quản Lý Tư Vấn</h1> */}
                <div className={styles.requestSection}>
                    <div className={styles.header}>
                        <FontAwesomeIcon icon={faBell} className={styles.icon} />
                        <h2>Yêu Cầu Tư Vấn Mới</h2>
                        <span className={styles.badge}>{requests.length}</span>
                    </div>
                    {requests.map(request => (
                        <div key={request.id} className={styles.requestCard}>
                            <div className={styles.requestHeader} onClick={() => toggleForm(request.id)}>
                                <div>
                                    <p className={styles.studentName}>{request.name} <span>({request.studentId})</span></p>
                                    <span className={styles.tag}>{request.type}</span>
                                </div>
                                <FontAwesomeIcon icon={faSortDown} className={styles.toggleIcon} />
                            </div>
                            {request.showForm && (
                                <div className={styles.formContainer}>
                                    <input type="date" id={`date${request.id}`} className={styles.input} />
                                    <input type="time" id={`time${request.id}`} className={styles.input} />
                                    <input type="text" id={`location${request.id}`} placeholder="Địa điểm" className={styles.input} />
                                    <button className={styles.confirmButton} onClick={() => confirmAppointment(request.id, request.name, request.studentId, request.type, document.getElementById(`date${request.id}`).value, document.getElementById(`time${request.id}`).value, document.getElementById(`location${request.id}`).value)}>Xác nhận</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className={styles.confirmedSection}>
                    <h2 className={styles.subTitle}>Lịch Hẹn Đã Xác Nhận</h2>
                    {confirmedAppointments.map(appointment => (
                        <div key={appointment.id} className={styles.confirmedCard}>
                            <div>
                                <p className={styles.studentName}>{appointment.name} <span>({appointment.studentId})</span></p>
                                <p className={styles.type}>{appointment.type}</p>
                            </div>
                            <div>
                                <p className={styles.time}>{appointment.date}, {appointment.time}</p>
                                <p className={styles.location}>Địa điểm: {appointment.location}</p>
                            </div>
                            <div className={styles.actions}>
                                <button className={styles.messageButton}><FontAwesomeIcon icon={faEnvelope} /> Gửi tin nhắn</button>
                                <button className={styles.rescheduleButton}><FontAwesomeIcon icon={faExchangeAlt} /> Đổi lịch</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeacherAdvise;
