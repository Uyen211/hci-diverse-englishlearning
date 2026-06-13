import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { examService } from '../../../services/examService';
import { levelService } from '../../../services/levelService';
import { unitService } from '../../../services/unitService';

export default function Exams() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [levels, setLevels] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search states
  const [activeTab, setActiveTab] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  // Delete Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingExam, setDeletingExam] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState('');

  // Load resources
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [examsData, levelsData, unitsData] = await Promise.all([
          examService.getExams(),
          levelService.getLevels(),
          unitService.getUnits()
        ]);
        setExams(examsData);
        setLevels(levelsData);
        setUnits(unitsData);
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu đề thi:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter and search logic
  const filteredExams = exams.filter((e) => {
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'Tất cả' || e.type === activeTab;
    return matchesSearch && matchesTab;
  });

  // Pagination calculations
  const totalExams = filteredExams.length;
  const totalPages = Math.max(1, Math.ceil(totalExams / pageSize));
  const startIndex = totalExams > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endIndex = Math.min(currentPage * pageSize, totalExams);
  const paginatedExams = filteredExams.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Statistics
  const totalExamsCount = exams.length;
  const activeExamsCount = exams.filter((e) => e.questionsCount > 0).length;
  const totalAttempts = exams.reduce((acc, curr) => {
    const cleaned = parseInt(curr.attempts.replace(/,/g, ''), 10) || 0;
    return acc + cleaned;
  }, 0);

  // Link format helper
  const getLinkedDisplayName = (exam) => {
    if (exam.type === 'Mini-test' && exam.unitId) {
      const unit = units.find((u) => u.id === exam.unitId);
      if (unit) {
        const level = levels.find((l) => l.id === unit.levelId);
        return `${level?.name || 'Basic'} - ${unit.sequence}`;
      }
    } else if (exam.type === 'Level test' && exam.levelId) {
      const level = levels.find((l) => l.id === exam.levelId);
      if (level) {
        return level.cefrShort ? `${level.name} (${level.cefrShort})` : level.name;
      }
    }
    return 'Tự do / Hệ thống';
  };

  // Open delete modal
  const handleOpenDelete = (e, exam) => {
    e.preventDefault();
    setDeletingExam(exam);
    setActionError('');
    setIsDeleteModalOpen(true);
  };

  // Confirm delete
  const onDeleteConfirm = async (e) => {
    e.preventDefault();
    if (!deletingExam) return;
    try {
      setActionLoading(true);
      setActionError('');
      await examService.deleteExam(deletingExam.id);
      setExams((prev) => prev.filter((ex) => ex.id !== deletingExam.id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      setActionError(err.message || 'Không thể xóa đề thi này.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <main className="content-body">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <Link to="/">Trang chủ</Link>
        <span className="separator">&gt;</span>
        <span className="current">Quản lý đề thi</span>
      </div>

      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Quản Lý Đề Thi</h1>
          <p className="page-description">
            Thiết lập danh mục các bài kiểm tra Mini-test, bài kiểm tra Level test cuối cấp độ học.
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/exams/new')}
          className="btn-primary"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Tạo đề mới
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid-three">
        <div className="stat-card animate-scale-up">
          <span className="stat-label">Tổng số đề thi</span>
          <span className="stat-value">{loading ? '...' : `${totalExamsCount} Đề`}</span>
          <span className="stat-badge success">▲ Tăng 12% tháng này</span>
        </div>
        <div className="stat-card animate-scale-up" style={{ animationDelay: '100ms' }}>
          <span className="stat-label">Đề thi đã hoàn thiện câu hỏi</span>
          <span className="stat-value">{loading ? '...' : `${activeExamsCount} Đề`}</span>
          <span className="stat-badge stable">● Ổn định</span>
        </div>
        <div className="stat-card animate-scale-up" style={{ animationDelay: '200ms' }}>
          <span className="stat-label">Tổng lượt làm bài</span>
          <span className="stat-value">{loading ? '...' : `${totalAttempts.toLocaleString()} Lượt`}</span>
          <span className="stat-badge success">★ Kỷ lục mới!</span>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          {/* Tabs */}
          <div className="filter-tabs">
            {['Tất cả', 'Mini-test', 'Level test', 'Mock test'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                className={`filter-tab ${activeTab === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <input
            type="text"
            placeholder="Tìm kiếm nhanh đề thi..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid rgba(78, 86, 192, 0.15)',
              borderRadius: 'var(--rounded-md)',
              padding: '8px 16px',
              fontSize: '14px',
              outline: 'none',
              width: '240px'
            }}
          />
        </div>

        {/* Data Table */}
        <div className="table-container">
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '4px solid rgba(78,86,192,0.1)', borderTopColor: 'var(--primary)', animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>Đang tải danh sách đề thi...</span>
            </div>
          ) : paginatedExams.length === 0 ? (
            <div style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '600' }}>
              Chưa có đề thi nào hoặc không tìm thấy kết quả phù hợp.
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Tên bài kiểm tra</th>
                  <th>Loại bài kiểm tra</th>
                  <th>Cấp độ / Unit liên kết</th>
                  <th style={{ width: '120px' }}>Số câu hỏi</th>
                  <th style={{ width: '120px' }}>Thời gian</th>
                  <th style={{ width: '140px' }}>Lượt làm bài</th>
                  <th style={{ width: '160px' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {paginatedExams.map((exam) => (
                  <tr key={exam.id}>
                    <td style={{ fontWeight: '700', color: 'var(--primary)' }}>
                      {exam.title}
                    </td>
                    <td>
                      <span className="test-type-badge">{exam.type}</span>
                    </td>
                    <td>
                      <span className="category-badge">{getLinkedDisplayName(exam)}</span>
                    </td>
                    <td style={{ fontWeight: '600' }}>{exam.questionsCount} câu</td>
                    <td style={{ fontWeight: '600' }}>{exam.duration} phút</td>
                    <td style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>
                      {exam.attempts} lượt
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <Link
                          to={`/admin/exams/${exam.id}/config`}
                          className="btn-action-icon edit-btn"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            textDecoration: 'none',
                            fontSize: '12px',
                            fontWeight: '600',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: '1px solid rgba(78, 86, 192, 0.15)',
                            color: 'var(--primary)'
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                            <path d="m15 5 4 4" />
                          </svg>
                          Sửa
                        </Link>
                        <a
                          href="#"
                          onClick={(e) => handleOpenDelete(e, exam)}
                          className="btn-action-icon delete-btn"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            textDecoration: 'none',
                            fontSize: '12px',
                            fontWeight: '600',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: '1px solid rgba(239, 68, 68, 0.15)',
                            color: 'var(--error)'
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                            <path d="M3 6h18" />
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                          Xóa
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Table Footer Pagination */}
        {totalExams > 0 && (
          <div className="table-footer">
            <span className="progress-text" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>
              Đang hiển thị {startIndex}-{endIndex} trong số {totalExams} bài kiểm tra
            </span>
            <div className="pagination-container">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </a>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pNum = idx + 1;
                return (
                  <a
                    href="#"
                    key={pNum}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(pNum);
                    }}
                    className={`page-btn ${currentPage === pNum ? 'active' : ''}`}
                  >
                    {pNum}
                  </a>
                );
              })}

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
                className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* ==========================================================================
         DELETE EXAM CONFIRMATION MODAL OVERLAY
         ========================================================================== */}
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box delete-box">
            <div className="modal-icon-circle" style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)', color: 'var(--error)', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </div>
            <div className="delete-title" style={{ fontSize: '18px', fontWeight: '800', textAlign: 'center', color: 'var(--text-primary)', marginBottom: '8px' }}>
              Bạn có chắc chắn muốn xóa<br />Đề thi: {deletingExam?.title}?
            </div>
            <p className="delete-description" style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 'relaxed', marginBottom: '20px' }}>
              Hành động này là vĩnh viễn và không thể hoàn tác. Mọi thông tin liên kết và dữ liệu câu hỏi liên quan sẽ bị gỡ bỏ khỏi hệ thống.
            </p>

            {actionError && (
              <div style={{ color: 'var(--error)', fontSize: '12px', fontWeight: 'bold', marginTop: '10px', textAlign: 'center' }}>
                ⚠️ {actionError}
              </div>
            )}

            <div className="delete-actions flex w-full gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={actionLoading}
                className="btn-secondary"
                style={{ flex: 1, padding: '10px 0', fontWeight: '600' }}
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={onDeleteConfirm}
                disabled={actionLoading}
                className="btn-danger"
                style={{ flex: 1, padding: '10px 0', fontWeight: '700' }}
              >
                {actionLoading ? 'Đang xóa...' : 'Xác nhận xóa'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
