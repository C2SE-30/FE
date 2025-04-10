import { useState } from 'react';
import styles from './TeacherAdvise.module.css';

export default function TeacherAdvise() {
    const [visibleForms, setVisibleForms] = useState({
        form1: false,
        form2: false,
        form3: false
    });
    
    const [confirmedAppointments, setConfirmedAppointments] = useState([
        {
            id: 'default1',
            studentName: 'Phạm Hoàng Dũng',
            studentId: 'SV078',
            consultationType: 'Tư vấn học tập',
            date: '03/04/2025',
            time: '14:00',
            location: 'Phòng B305'
        },
        {
            id: 'default2',
            studentName: 'Vũ Thị Hương',
            studentId: 'SV091',
            consultationType: 'Tư vấn nghề nghiệp',
            date: '04/04/2025',
            time: '10:30',
            location: 'Online (Google Meet)'
        }
    ]);
    
    const [pendingRequests, setPendingRequests] = useState([
        {
            id: 1,
            studentName: 'Nguyễn Văn An',
            studentId: 'SV001',
            consultationType: 'Tư vấn học tập'
        },
        {
            id: 2,
            studentName: 'Trần Thị Bình',
            studentId: 'SV045',
            consultationType: 'Tư vấn nghề nghiệp'
        },
        {
            id: 3,
            studentName: 'Lê Minh Chính',
            studentId: 'SV112',
            consultationType: 'Tư vấn đồ án/luận văn'
        }
    ]);
    
    const toggleForm = (id) => {
        setVisibleForms(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };
    
    const confirmAppointment = (id, studentName, studentId, consultationType) => {
        // Lấy giá trị từ form
        const dateElement = document.getElementById(`date${id}`);
        const timeElement = document.getElementById(`time${id}`);
        const locationElement = document.getElementById(`location${id}`);
        
        if (!dateElement || !timeElement || !locationElement) return;
        
        const date = dateElement.value;
        const time = timeElement.value;
        const location = locationElement.value;
        
        if (date && time && location) {
            // Thêm vào danh sách đã xác nhận
            setConfirmedAppointments(prev => [
                ...prev,
                {
                    id: `confirmed-${id}`,
                    studentName,
                    studentId,
                    consultationType,
                    date,
                    time,
                    location
                }
            ]);
            
            // Xóa khỏi danh sách chờ
            setPendingRequests(prev => 
                prev.filter(request => request.id !== id)
            );
        } else {
            alert('Vui lòng nhập đầy đủ thông tin.');
        }
    };
    
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Hệ Thống Quản Lý Tư Vấn</h1>
            
            {/* Yêu Cầu Tư Vấn Mới */}
            <div className={styles.panel}>
                <div className={styles.panelHeader}>
                    <i className="fas fa-bell"></i>
                    <h2>Yêu Cầu Tư Vấn Mới</h2>
                    <span className={styles.badge}>{pendingRequests.length}</span>
                </div>
                <div className={styles.requestsContainer}>
                    {pendingRequests.map(request => (
                        <div key={request.id} id={`request${request.id}`} className={styles.requestItem}>
                            <div className={styles.requestHeader}>
                                <div>
                                    <p className={styles.studentName}>
                                        {request.studentName} <span className={styles.studentId}>({request.studentId})</span>
                                    </p>
                                    <span className={styles.consultationTag}>{request.consultationType}</span>
                                </div>
                                <i 
                                    className="fas fa-chevron-down" 
                                    onClick={() => toggleForm(`form${request.id}`)}
                                ></i>
                            </div>
                            <div id={`form${request.id}`} className={visibleForms[`form${request.id}`] ? styles.formVisible : styles.formHidden}>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    confirmAppointment(
                                        request.id, 
                                        request.studentName, 
                                        request.studentId, 
                                        request.consultationType
                                    );
                                }}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor={`date${request.id}`}>Ngày:</label>
                                        <input 
                                            id={`date${request.id}`}
                                            type="date"
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor={`time${request.id}`}>Giờ:</label>
                                        <input 
                                            id={`time${request.id}`}
                                            type="time"
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor={`location${request.id}`}>Địa điểm:</label>
                                        <input 
                                            id={`location${request.id}`}
                                            type="text"
                                        />
                                    </div>
                                    <button className={styles.confirmButton} type="submit">Xác nhận</button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Lịch Hẹn Đã Xác Nhận */}
            <div className={styles.panel}>
                <div className={styles.panelHeader}>
                    <i className="fas fa-calendar-check"></i>
                    <h2>Lịch Hẹn Đã Xác Nhận</h2>
                </div>
                <div id="confirmedAppointments" className={styles.appointmentsContainer}>
                    {confirmedAppointments.map(appointment => (
                        <div key={appointment.id} className={styles.appointmentItem}>
                            <div className={styles.appointmentHeader}>
                                <div>
                                    <p className={styles.studentName}>
                                        {appointment.studentName} <span className={styles.studentId}>({appointment.studentId})</span>
                                    </p>
                                    <p className={styles.consultationType}>{appointment.consultationType}</p>
                                </div>
                                <div className={styles.appointmentTime}>
                                    <p className={styles.appointmentDate}>{appointment.date}, {appointment.time}</p>
                                    <p className={styles.appointmentLocation}>Địa điểm: {appointment.location}</p>
                                </div>
                            </div>
                            <div className={styles.appointmentActions}>
                                <button className={styles.messageButton}>
                                    <i className="fas fa-envelope"></i> Gửi tin nhắn
                                </button>
                                <button className={styles.rescheduleButton}>
                                    <i className="fas fa-exchange-alt"></i> Đổi lịch
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}