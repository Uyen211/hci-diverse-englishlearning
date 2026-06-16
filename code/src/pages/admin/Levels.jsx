import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useNavigate } from 'react-router-dom'
import { levelService } from '../../services/levelService'
import { useToastStore } from '../../store/toastStore'

// Validation schema matching figma mockup fields and error messages
const levelFormSchema = z.object({
  name: z.string().min(1, { message: 'Trường này không được để trống. Vui lòng nhập tên cấp độ!' }),
  descriptionShort: z.string().min(1, { message: 'Trường này không được để trống. Vui lòng nhập mô tả ngắn!' }),
  descriptionDetail: z.string().min(1, { message: 'Trường này không được để trống. Vui lòng nhập mô tả chi tiết!' }),
  ieltsTarget: z.string().refine(val => {
    if (!val.trim()) return false;
    const nums = val.match(/\d+(\.\d+)?/g);
    if (!nums) return false;
    return nums.every(n => {
      const parsed = parseFloat(n);
      return parsed >= 0 && parsed <= 9.0;
    });
  }, { message: 'Điểm số không hợp lệ. Vui lòng nhập trong khoảng 0 - 9.0!' }),
  toeicTarget: z.string().refine(val => {
    if (!val.trim()) return false;
    const nums = val.match(/\d+/g);
    if (!nums) return false;
    return nums.every(n => {
      const parsed = parseInt(n, 10);
      return parsed >= 10 && parsed <= 990;
    });
  }, { message: 'Điểm số không hợp lệ. Vui lòng nhập trong khoảng 10 - 990!' }),
})

export default function Levels() {
  const navigate = useNavigate()
  const { addToast } = useToastStore()
  const [levels, setLevels] = useState([])
  const [loading, setLoading] = useState(true)

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingLevel, setEditingLevel] = useState(null)
  const [deletingLevel, setDeletingLevel] = useState(null)
  
  const [actionLoading, setActionLoading] = useState(false)
  const [actionError, setActionError] = useState('')

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(levelFormSchema),
    defaultValues: {
      name: '',
      descriptionShort: '',
      descriptionDetail: '',
      ieltsTarget: '',
      toeicTarget: '',
    },
  })

  // Load levels on mount
  const loadLevels = async () => {
    try {
      setLoading(true)
      const data = await levelService.getLevels()
      setLevels(data)
    } catch (error) {
      console.error('Lỗi khi tải cấp độ:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadLevels()
  }, [])

  // Open modals
  const handleOpenAdd = (e) => {
    e.preventDefault()
    setEditingLevel(null)
    setActionError('')
    reset({
      name: '',
      descriptionShort: '',
      descriptionDetail: '',
      ieltsTarget: '',
      toeicTarget: '',
    })
    setIsFormModalOpen(true)
  }

  const handleOpenEdit = (e, level) => {
    e.preventDefault()
    setEditingLevel(level)
    setActionError('')
    reset({
      name: level.name,
      descriptionShort: level.descriptionShort || '',
      descriptionDetail: level.descriptionDetail || '',
      ieltsTarget: level.ieltsTarget,
      toeicTarget: level.toeicTarget,
    })
    setIsFormModalOpen(true)
  }

  const handleOpenDelete = (e, level) => {
    e.preventDefault()
    setDeletingLevel(level)
    setActionError('')
    setIsDeleteModalOpen(true)
  }

  // Submit CRUD Handlers
  const onFormSubmit = async (data) => {
    try {
      setActionLoading(true)
      setActionError('')
      if (editingLevel) {
        // Edit Mode
        const updated = await levelService.updateLevel(editingLevel.id, data)
        setLevels(prev => prev.map(l => l.id === editingLevel.id ? updated : l))
        addToast(`Cập nhật cấp độ ${data.name} thành công`, 'success')
      } else {
        // Add Mode
        const added = await levelService.addLevel({
          ...data,
          lessonCount: 12,
          activeUsers: '1,200',
        })
        setLevels(prev => [...prev, added])
        addToast(`Tạo cấp độ ${data.name} thành công`, 'success')
      }
      setIsFormModalOpen(false)
    } catch (err) {
      setActionError(err.message || 'Có lỗi xảy ra khi cập nhật cấp độ.')
      addToast(err.message || 'Có lỗi xảy ra khi cập nhật cấp độ.', 'error')
    } finally {
      setActionLoading(false)
    }
  }

  const onDeleteConfirm = (e) => {
    e.preventDefault()
    if (!deletingLevel) return
    const executeDelete = async () => {
      try {
        setActionLoading(true)
        setActionError('')
        await levelService.deleteLevel(deletingLevel.id)
        setLevels(prev => prev.filter(l => l.id !== deletingLevel.id))
        setIsDeleteModalOpen(false)
        addToast(`Xóa cấp độ ${deletingLevel.name} thành công`, 'success')
      } catch (err) {
        setActionError(err.message || 'Không thể xóa cấp độ này.')
        addToast(err.message || 'Không thể xóa cấp độ này.', 'error')
      } finally {
        setActionLoading(false)
      }
    }
    executeDelete()
  }



  return (
    <main className="content-body">
      {/* Page Header Row */}
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Quản lý Cấp độ</h1>
          <p className="page-description">
            Giám sát và tinh chỉnh lộ trình giáo dục. Điều chỉnh mật độ chương trình, theo dõi thông lượng học sinh và điều chỉnh theo các tiêu chuẩn chứng chỉ quốc tế.
          </p>
        </div>
        <a href="#" onClick={handleOpenAdd} className="btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Thêm Cấp độ Mới
        </a>
      </div>



      {/* Table section */}
      <div>
        <div className="section-header">
          <span className="section-title">Cấu trúc chương trình</span>
          <a href="#" className="btn-secondary" onClick={(e) => e.preventDefault()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Bộ lọc
          </a>
        </div>

        {/* Data Table Container */}
        <div className="table-container">
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '4px solid rgba(78,86,192,0.1)', borderTopColor: 'var(--primary)', animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>Đang đồng bộ dữ liệu...</span>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Tên Cấp Độ</th>
                  <th style={{ width: '180px' }}>Số Lượng Bài Học</th>
                  <th style={{ width: '200px' }}>Người Dùng Hoạt Động</th>
                  <th style={{ width: '150px' }}>Mục Tiêu Ielts</th>
                  <th style={{ width: '150px' }}>Mục Tiêu Toeic</th>
                  <th style={{ width: '200px' }}>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {levels.map((lvl) => {
                  const isCefrSuccess = lvl.cefr.includes('A1') || lvl.cefr.includes('A2')
                  const isCefrPrimary = lvl.cefr.includes('B1') || lvl.cefr.includes('B2')
                  const cefrClass = isCefrSuccess ? 'success' : isCefrPrimary ? 'primary' : 'secondary'
                  
                  return (
                    <tr key={lvl.id}>
                      <td>
                        <div className="level-name-col">
                          <div>
                            <div className="level-name">{lvl.name}</div>
                            <span className={`badge-cefr ${cefrClass}`}>{lvl.cefr}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="progress-wrapper">
                          <span className="progress-text">{lvl.lessonCount} Bài học</span>
                          <div className="progress-bar-placeholder">
                            <div className="progress-bar-fill" style={{ width: `${lvl.avgProgress}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td>{lvl.activeUsers}</td>
                      <td className="ielts-target">{lvl.ieltsTarget}</td>
                      <td className="toeic-target">{lvl.toeicTarget}</td>
                      <td>
                        <div className="action-cell">
                          <a
                            href="#"
                            onClick={(e) => handleOpenEdit(e, lvl)}
                            className="btn-action-edit"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                              <path d="m15 5 4 4" />
                            </svg>
                            Sửa
                          </a>
                          <a
                            href="#"
                            onClick={(e) => handleOpenDelete(e, lvl)}
                            className="btn-action-delete"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Table Footer & Pagination */}
        <div className="table-footer">
          <span className="progress-text">
            Đang hiển thị {levels.length} trên {levels.length} cấp độ học tập
          </span>
          <div className="pagination-container">
            <a href="#" className="page-btn disabled" onClick={(e) => e.preventDefault()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </a>
            <a href="#" className="page-btn active" onClick={(e) => e.preventDefault()}>1</a>
            <a href="#" className="page-btn disabled" onClick={(e) => e.preventDefault()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ==========================================
         ADD / EDIT LEVEL MODAL OVERLAY
         ========================================== */}
      {isFormModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              {editingLevel ? 'Chỉnh Sửa Thông Tin Cấp Độ' : 'Thêm Cấp Độ'}
            </div>
            
            {actionError && (
              <div style={{ color: 'var(--error)', fontSize: '13px', fontWeight: 'bold', padding: '8px 12px', border: '1px solid rgba(239,68,68,0.15)', backgroundColor: 'rgba(239,68,68,0.05)', borderRadius: 'var(--rounded-md)' }}>
                ⚠️ {actionError}
              </div>
            )}

            {/* Level Name */}
            <div className="input-group">
              <label className="input-label" style={errors.name ? { color: 'var(--error)' } : {}}>
                Tên Cấp Độ *
              </label>
              <input
                type="text"
                placeholder="Nhập tên cấp độ..."
                disabled={actionLoading}
                className={`text-input ${errors.name ? 'error' : ''}`}
                {...register('name')}
              />
              {errors.name && (
                <div className="error-message">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  {errors.name.message}
                </div>
              )}
            </div>

            {/* Short Description */}
            <div className="input-group">
              <label className="input-label" style={errors.descriptionShort ? { color: 'var(--error)' } : {}}>
                Mô Tả Ngắn *
              </label>
              <input
                type="text"
                placeholder="Nhập mô tả ngắn..."
                disabled={actionLoading}
                className={`text-input ${errors.descriptionShort ? 'error' : ''}`}
                {...register('descriptionShort')}
              />
              {errors.descriptionShort && (
                <div className="error-message">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  {errors.descriptionShort.message}
                </div>
              )}
            </div>

            {/* Detailed Description */}
            <div className="input-group">
              <label className="input-label" style={errors.descriptionDetail ? { color: 'var(--error)' } : {}}>
                Mô Tả Chi Tiết *
              </label>
              <textarea
                placeholder="Nhập mô tả chi tiết..."
                disabled={actionLoading}
                rows={4}
                style={{ resize: 'none', lineHeight: 1.5 }}
                className={`text-input ${errors.descriptionDetail ? 'error' : ''}`}
                {...register('descriptionDetail')}
              />
              {errors.descriptionDetail && (
                <div className="error-message">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  {errors.descriptionDetail.message}
                </div>
              )}
            </div>
            
            {/* IELTS & TOEIC targets */}
            <div className="grid-2-col">
              <div className="input-group">
                <label className="input-label" style={errors.ieltsTarget ? { color: 'var(--error)' } : {}}>
                  Mục Tiêu Ielts
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: 5.5"
                  disabled={actionLoading}
                  className={`text-input ${errors.ieltsTarget ? 'error' : ''}`}
                  {...register('ieltsTarget')}
                />
                {errors.ieltsTarget && (
                  <div className="error-message">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    {errors.ieltsTarget.message}
                  </div>
                )}
              </div>
              <div className="input-group">
                <label className="input-label" style={errors.toeicTarget ? { color: 'var(--error)' } : {}}>
                  Mục Tiêu Toeic
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: 650"
                  disabled={actionLoading}
                  className={`text-input ${errors.toeicTarget ? 'error' : ''}`}
                  {...register('toeicTarget')}
                />
                {errors.toeicTarget && (
                  <div className="error-message">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    {errors.toeicTarget.message}
                  </div>
                )}
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="modal-actions">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (!actionLoading) setIsFormModalOpen(false)
                }}
                className="btn-secondary"
              >
                Hủy Bỏ
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handleSubmit(onFormSubmit)()
                }}
                className="btn-primary"
              >
                {actionLoading ? 'Đang Lưu...' : 'Lưu Thay Đổi'}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
         DELETE LEVEL CONFIRMATION MODAL OVERLAY
         ========================================== */}
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box delete-box">
            <div className="modal-icon-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </div>
            
            <div className="delete-title">
              Bạn có chắc chắn muốn xóa<br />cấp độ {deletingLevel?.name}?
            </div>
            <p className="delete-description">
              Hành động này là vĩnh viễn và không thể hoàn tác. Toàn bộ dữ liệu liên quan sẽ bị gỡ bỏ khỏi hệ thống DiveVerse.
            </p>
            
            {actionError && (
              <div style={{ color: 'var(--error)', fontSize: '12px', fontWeight: 'bold', marginTop: '10px' }}>
                ⚠️ {actionError}
              </div>
            )}

            <div className="delete-actions">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (!actionLoading) setIsDeleteModalOpen(false)
                }}
                className="btn-secondary"
              >
                Hủy bỏ
              </a>
              <a
                href="#"
                onClick={onDeleteConfirm}
                className="btn-danger"
              >
                {actionLoading ? 'Đang xóa...' : 'Xác nhận xóa'}
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
