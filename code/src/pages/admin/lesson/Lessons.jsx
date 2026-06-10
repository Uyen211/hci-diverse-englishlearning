import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { lessonService } from '../../../services/lessonService';
import { unitService } from '../../../services/unitService';
import { levelService } from '../../../services/levelService';

export default function Lessons() {
  const { unitId } = useParams();
  const navigate = useNavigate();

  const [unit, setUnit] = useState(null);
  const [level, setLevel] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingLesson, setDeletingLesson] = useState(null);

  // Loading and Error states
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState('');

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      // Fetch current Unit and Level details
      const allUnits = await unitService.getUnits();
      const currentUnit = allUnits.find((u) => u.id === unitId);
      setUnit(currentUnit);

      if (currentUnit) {
        const allLevels = await levelService.getLevels();
        const currentLevel = allLevels.find((l) => l.id === currentUnit.levelId);
        setLevel(currentLevel);
      }

      // Fetch lessons for the unit
      const lessonsData = await lessonService.getLessonsByUnitId(unitId);
      setLessons(lessonsData);
    } catch (err) {
      console.error('Lỗi khi tải dữ liệu bài học:', err);
    } finally {
      setLoading(false);
    }
  }, [unitId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, [loadData]);

  // Handle open delete confirmation modal
  const handleOpenDelete = (e, lesson) => {
    e.preventDefault();
    setDeletingLesson(lesson);
    setActionError('');
    setIsDeleteModalOpen(true);
  };

  // Delete Lesson
  const onDeleteConfirm = async (e) => {
    e.preventDefault();
    if (!deletingLesson) return;
    try {
      setActionLoading(true);
      setActionError('');
      await lessonService.deleteLesson(deletingLesson.id);
      
      // Reload lessons list to refresh sequences
      const lessonsData = await lessonService.getLessonsByUnitId(unitId);
      setLessons(lessonsData);
      
      setIsDeleteModalOpen(false);
    } catch (err) {
      setActionError(err.message || 'Không thể xóa bài học này.');
    } finally {
      setActionLoading(false);
    }
  };

  // Filter lessons based on search
  const filteredLessons = lessons.filter((l) => {
    const term = searchTerm.toLowerCase();
    return (
      l.sequence.includes(term) ||
      l.title.toLowerCase().includes(term) ||
      l.subtitle.toLowerCase().includes(term) ||
      l.genre.toLowerCase().includes(term)
    );
  });

  // Pagination
  const totalLessons = filteredLessons.length;
  const totalPages = Math.max(1, Math.ceil(totalLessons / pageSize));
  const startIndex = totalLessons > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endIndex = Math.min(currentPage * pageSize, totalLessons);
  const paginatedLessons = filteredLessons.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Helper classes for badges
  const getGenreBadgeClass = (genre) => {
    switch (genre) {
      case 'Từ vựng': return 'bg-[#4E56C0]/10 text-[#4E56C0] border-[#4E56C0]/20';
      case 'Ngữ pháp': return 'bg-[#9B5DE0]/10 text-[#9B5DE0] border-[#9B5DE0]/20';
      case 'Nghe': return 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20';
      case 'Nói': return 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20';
      case 'Đọc': return 'bg-[#D78FEE]/10 text-[#D78FEE] border-[#D78FEE]/20';
      case 'Viết': return 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <main className="content-body">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <Link to="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Trang chủ</Link>
        <span className="separator">&gt;</span>
        <Link to="/admin/curriculum">Chương trình học</Link>
        {level && (
          <>
            <span className="separator">&gt;</span>
            <Link to={`/admin/curriculum/${level.id}`}>
              Quản lý Unit cấp độ {level.name.toLowerCase()}
            </Link>
          </>
        )}
        {unit && (
          <>
            <span className="separator">&gt;</span>
            <span className="current">Bài học {unit.sequence}</span>
          </>
        )}
      </div>

      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <h1 className="page-title">
            Quản Lý Bài Học - {unit ? `${unit.sequence}: ${unit.title}` : 'Đang tải...'}
          </h1>
          <p className="page-description">
            Thiết lập các thẻ bài học nhỏ cho Unit này. Nhấp chọn cấu hình để soạn thảo nội dung câu hỏi chi tiết.
          </p>
        </div>
        <Link to={`/admin/curriculum/${unitId}/lessons/new`} className="btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Thêm bài học mới
        </Link>
      </div>

      {/* Statistics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', width: '100%' }}>
        <div className="stat-card animate-scale-up">
          <span className="stat-label">Tổng số bài học</span>
          <span className="stat-value">
            {loading ? '...' : `${lessons.length} Bài học`}
          </span>
          <span className="stat-badge success">▲ Thiết lập hoàn tất</span>
        </div>
        <div className="stat-card animate-scale-up" style={{ animationDelay: '100ms' }}>
          <span className="stat-label">Tỷ lệ hoàn thành trung bình</span>
          <span className="stat-value">
            {loading ? '...' : `${lessons.length > 0 ? Math.round((lessons.filter(l => l.status === 'completed').length / lessons.length) * 100) : 0}%`}
          </span>
          <span className="stat-badge stable">● Dựa trên trạng thái học viên</span>
        </div>
      </div>

      {/* Section Title */}
      <div>
        <div className="section-header">
          <span className="section-title">
            Danh mục Bài học: {unit ? unit.sequence.toUpperCase() : 'UNIT'}
          </span>

          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              placeholder="Tìm kiếm bài học..."
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
                width: '240px',
              }}
            />
            <a href="#" className="btn-secondary" onClick={(e) => e.preventDefault()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              Bộ lọc
            </a>
          </div>
        </div>

        {/* Table Container */}
        <div className="table-container">
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '4px solid rgba(78,86,192,0.1)', borderTopColor: 'var(--primary)', animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>Đang tải bài học...</span>
            </div>
          ) : paginatedLessons.length === 0 ? (
            <div style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '600' }}>
              Chưa có bài học nào hoặc không tìm thấy bài học phù hợp.
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>Thứ tự</th>
                  <th>Tên bài học</th>
                  <th style={{ width: '180px' }}>Thể loại</th>
                  <th style={{ width: '180px' }}>Hình thức bài tập</th>
                  <th style={{ width: '200px' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLessons.map((l) => (
                  <tr key={l.id}>
                    <td className="lesson-sequence">{l.sequence}</td>
                    <td>
                      <div className="lesson-title-main">{l.title}</div>
                      <div className="lesson-subtitle">{l.subtitle}</div>
                    </td>
                    <td>
                      <span className={`genre-badge border ${getGenreBadgeClass(l.genre)}`}>
                        {l.genre}
                      </span>
                    </td>
                    <td>
                      {l.exerciseType ? (
                        <span className="status-badge completed">
                          <span className="w-2 h-2 rounded-full bg-success inline-block mr-2" />
                          {l.exerciseType}
                        </span>
                      ) : (
                        <span className="status-badge pending">
                          <span className="w-2 h-2 rounded-full inline-block mr-2" style={{ backgroundColor: 'var(--text-secondary)' }} />
                          Chưa cấu hình
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <Link
                          to={`/admin/curriculum/${unitId}/lessons/${l.id}/config`}
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
                          onClick={(e) => handleOpenDelete(e, l)}
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
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
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

        {/* Table Footer */}
        {totalLessons > 0 && (
          <div className="table-footer">
            <span className="lesson-subtitle" style={{ fontWeight: 600 }}>
              Đang hiển thị {startIndex}-{endIndex} trong số {totalLessons} bài học
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
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* ==========================================================================
         DELETE LESSON CONFIRMATION MODAL OVERLAY
         ========================================================================== */}
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box delete-box">
            <div className="modal-icon-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </div>
            <div className="delete-title">
              Bạn có chắc chắn muốn xóa<br />Bài học {deletingLesson?.title}?
            </div>
            <p className="delete-description">
              Hành động này là vĩnh viễn và không thể hoàn tác. Toàn bộ dữ liệu liên quan sẽ bị gỡ bỏ khỏi hệ thống DiveVerse.
            </p>

            {actionError && (
              <div style={{ color: 'var(--error)', fontSize: '12px', fontWeight: 'bold', marginTop: '10px' }}>
                ⚠️ {actionError}
              </div>
            )}

            <div className="delete-actions mt-4 flex w-full gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={actionLoading}
                className="flex-1 py-2.5 border border-border text-text-secondary text-sm font-semibold rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={onDeleteConfirm}
                disabled={actionLoading}
                className="flex-1 py-2.5 bg-error text-surface text-sm font-bold rounded-lg hover:shadow-lg disabled:opacity-50"
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
