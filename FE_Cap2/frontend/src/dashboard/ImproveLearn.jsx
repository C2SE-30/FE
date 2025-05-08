import React, { useState } from 'react';
import styles from './ImproveLearn.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../component/Navbar';
import Menu from '../component/Menu';

const ImproveLearn = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [advisorFilter, setAdvisorFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  const allConsultationRequests = [/* dữ liệu như trước */];

  const filteredRequests = allConsultationRequests
    .filter(request => {
      if (
        searchTerm &&
        !request.content.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !request.advisor.toLowerCase().includes(searchTerm.toLowerCase())
      ) return false;

      if (advisorFilter && request.advisor !== advisorFilter) return false;
      if (statusFilter && request.status !== statusFilter) return false;

      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdDate.split('/').reverse().join('-'));
      const dateB = new Date(b.createdDate.split('/').reverse().join('-'));
      const appA = new Date(a.appointmentDate.split('/').reverse().join('-'));
      const appB = new Date(b.appointmentDate.split('/').reverse().join('-'));

      if (sortOrder === 'newest') return dateB - dateA;
      if (sortOrder === 'oldest') return dateA - dateB;
      if (sortOrder === 'upcoming') return appA - appB;
      return 0;
    });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed': return styles.badgeSuccess;
      case 'pending': return styles.badgePending;
      case 'confirmed': return styles.badgeConfirmed;
      case 'canceled': return styles.badgeCanceled;
      default: return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Hoàn thành';
      case 'pending': return 'Chờ xác nhận';
      case 'confirmed': return 'Đã xác nhận';
      case 'canceled': return 'Đã hủy';
      default: return '';
    }
  };

  const handleStatusFilterClick = (status) => {
    setStatusFilter(prev => (prev === status ? '' : status));
  };

  const uniqueAdvisors = [...new Set(allConsultationRequests.map(r => r.advisor))];

  const stats = [
    { id: 1, title: 'Tổng số buổi tư vấn', count: allConsultationRequests.length, icon: 'calendar-check', color: 'blue' },
    { id: 2, title: 'Hoàn thành', count: allConsultationRequests.filter(r => r.status === 'completed').length, icon: 'check-circle', color: 'green' },
    { id: 3, title: 'Chờ xác nhận', count: allConsultationRequests.filter(r => r.status === 'pending').length, icon: 'clock', color: 'orange' },
    { id: 4, title: 'Đã xác nhận', count: allConsultationRequests.filter(r => r.status === 'confirmed').length, icon: 'thumbs-up', color: 'blue' },
    { id: 5, title: 'Đã hủy', count: allConsultationRequests.filter(r => r.status === 'canceled').length, icon: 'times-circle', color: 'red' }
  ];

  return (
    <div className={styles.background}>
    <NavBar />
    <Menu />
    <div className={styles.mainContainer}>
    <div className={styles.container}>
      

      <div className={styles.summaryStats}>
        {stats.map(stat => (
          <div className={styles.statCard} key={stat.id}>
            <div className={`${styles.statIcon} ${styles[stat.color]}`}>
              <i className={`fas fa-${stat.icon}`}></i>
            </div>
            <div>
              <p>{stat.title}</p>
              <h3>{stat.count}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Bộ lọc và bảng danh sách buổi tư vấn */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Danh sách buổi tư vấn</h3>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.searchFilter}>
            <div className={styles.searchBox}>
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Tìm kiếm theo nội dung hoặc cố vấn..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className={styles.filterGroup}>
              <select value={advisorFilter} onChange={(e) => setAdvisorFilter(e.target.value)}>
                <option value="">Tất cả cố vấn</option>
                {uniqueAdvisors.map(advisor => (
                  <option key={advisor} value={advisor}>{advisor}</option>
                ))}
              </select>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
                <option value="upcoming">Sắp tới</option>
              </select>
            </div>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Ngày tạo</th>
                <th>Cố vấn</th>
                <th>Nội dung</th>
                <th>Ngày hẹn</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((r) => (
                <tr key={r.id}>
                  <td>{r.createdDate}</td>
                  <td>{r.advisor}</td>
                  <td>{r.content}</td>
                  <td>{r.appointmentDate}</td>
                  <td>
                    <span className={`${styles.badge} ${getStatusBadgeClass(r.status)}`}>
                      {getStatusText(r.status)}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: '#888' }}>
                    Không tìm thấy kết quả phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ImproveLearn;
