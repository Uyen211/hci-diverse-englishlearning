import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useNavigate, useParams } from 'react-router-dom'
import { levelService } from '../../services/levelService'
import { unitService } from '../../services/unitService'

// Validation schema for Unit modal form using Zod
const unitFormSchema = z.object({
  title: z.string().min(1, { message: 'Trường này không được để trống. Vui lòng nhập tên unit!' }),
  topic: z.string().min(1, { message: 'Trường này không được để trống. Vui lòng nhập chủ đề lớn!' }),
  examSkill: z.string().default('TOEIC'),
  vocabulary: z.string().min(1, { message: 'Trường này không được để trống. Vui lòng nhập chủ điểm từ vựng!' }),
  grammar: z.string().min(1, { message: 'Trường này không được để trống. Vui lòng nhập chủ điểm ngữ pháp!' }),
})

export default function Curriculum() {
  const navigate = useNavigate()
  const { levelId } = useParams()
  const selectedLevelId = levelId || null
  const [levels, setLevels] = useState([])
  const [units, setUnits] = useState([])
  const [levelCounts, setLevelCounts] = useState({})
  
  const [currentLevelPage, setCurrentLevelPage] = useState(1)
  
  // Loading states
  const [loadingOverview, setLoadingOverview] = useState(true)
  const [loadingUnits, setLoadingUnits] = useState(true)
  
  // Search & Pagination states
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 4
  
  // Modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingUnit, setEditingUnit] = useState(null)
  const [deletingUnit, setDeletingUnit] = useState(null)
  
  const [actionLoading, setActionLoading] = useState(false)
  const [actionError, setActionError] = useState('')

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(unitFormSchema),
    defaultValues: {
      title: '',
      topic: '',
      examSkill: 'TOEIC',
      vocabulary: '',
      grammar: '',
    },
  })

  // Load levels & counts for Overview
  const loadOverviewData = async () => {
    try {
      setLoadingOverview(true)
      const lvlData = await levelService.getLevels()
      const counts = await unitService.getUnitCountsForLevels()
      setLevels(lvlData)
      setLevelCounts(counts)
    } catch (error) {
      console.error('Lỗi khi tải tổng quan chương trình:', error)
    } finally {
      setLoadingOverview(false)
    }
  }

  // Load units for the selected level
  const loadUnitsForLevel = async (levelId) => {
    if (!levelId) return
    try {
      setLoadingUnits(true)
      const data = await unitService.getUnitsByLevel(levelId)
      setUnits(data)
      setCurrentPage(1) // Reset to page 1
    } catch (error) {
      console.error('Lỗi khi tải danh sách unit:', error)
    } finally {
      setLoadingUnits(false)
    }
  }

  // Load levels overview on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadOverviewData()
  }, [])

  // Load units whenever active level changes
  useEffect(() => {
    if (selectedLevelId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadUnitsForLevel(selectedLevelId)
    }
  }, [selectedLevelId])

  const activeLevel = levels.find((l) => l.id === selectedLevelId)

  // Open modals
  const handleOpenAdd = (e) => {
    e.preventDefault()
    setEditingUnit(null)
    setActionError('')
    reset({
      title: '',
      topic: '',
      examSkill: 'TOEIC',
      vocabulary: '',
      grammar: '',
    })
    setIsFormModalOpen(true)
  }

  const handleOpenEdit = (e, unit) => {
    e.preventDefault()
    setEditingUnit(unit)
    setActionError('')
    reset({
      title: unit.title,
      topic: unit.topic,
      examSkill: unit.examSkill || 'TOEIC',
      vocabulary: unit.vocabulary,
      grammar: unit.grammar,
    })
    setIsFormModalOpen(true)
  }

  const handleOpenDelete = (e, unit) => {
    e.preventDefault()
    setDeletingUnit(unit)
    setActionError('')
    setIsDeleteModalOpen(true)
  }

  // Submit Unit Add/Edit form
  const onFormSubmit = async (data) => {
    try {
      setActionLoading(true)
      setActionError('')
      
      const payload = {
        ...data,
        levelId: selectedLevelId,
      }

      if (editingUnit) {
        // Edit Mode
        const updated = await unitService.updateUnit(editingUnit.id, payload)
        setUnits(prev => prev.map(u => u.id === editingUnit.id ? updated : u))
      } else {
        // Add Mode
        const added = await unitService.addUnit(payload)
        setUnits(prev => [...prev, added])
      }
      
      // Refresh counts for overview
      const counts = await unitService.getUnitCountsForLevels()
      setLevelCounts(counts)

      setIsFormModalOpen(false)
    } catch (err) {
      setActionError(err.message || 'Có lỗi xảy ra khi cập nhật Unit.')
    } finally {
      setActionLoading(false)
    }
  }

  // Confirm delete Unit
  const onDeleteConfirm = (e) => {
    e.preventDefault()
    if (!deletingUnit) return
    const executeDelete = async () => {
      try {
        setActionLoading(true)
        setActionError('')
        await unitService.deleteUnit(deletingUnit.id)
        setUnits(prev => prev.filter(u => u.id !== deletingUnit.id))
        
        // Refresh counts
        const counts = await unitService.getUnitCountsForLevels()
        setLevelCounts(counts)
        
        setIsDeleteModalOpen(false)
      } catch (err) {
        setActionError(err.message || 'Không thể xóa Unit này.')
      } finally {
        setActionLoading(false)
      }
    }
    executeDelete()
  }

  // Filter units
  const filteredUnits = units.filter((u) => {
    const term = searchTerm.toLowerCase()
    return (
      u.sequence.toLowerCase().includes(term) ||
      u.title.toLowerCase().includes(term) ||
      u.topic.toLowerCase().includes(term) ||
      u.vocabulary.toLowerCase().includes(term) ||
      u.grammar.toLowerCase().includes(term)
    );
  })

  // Pagination calculations
  const totalUnits = filteredUnits.length
  const totalPages = Math.max(1, Math.ceil(totalUnits / pageSize))
  const startIndex = totalUnits > 0 ? (currentPage - 1) * pageSize + 1 : 0
  const endIndex = Math.min(currentPage * pageSize, totalUnits)
  const paginatedUnits = filteredUnits.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Calculations for overview stats
  const totalUnitsOverview = Object.values(levelCounts).reduce((acc, curr) => acc + (curr ? Number(curr) : 0), 0)
  const totalLessonsOverview = levels.reduce((acc, curr) => {
    const lCount = curr && curr.lessonCount !== undefined && curr.lessonCount !== null ? parseInt(curr.lessonCount, 10) : 0;
    return acc + (isNaN(lCount) ? 0 : lCount);
  }, 0)

  // Level cards pagination calculations
  const levelsPerPage = 3
  const totalLevelPages = Math.max(1, Math.ceil(levels.length / levelsPerPage))
  const paginatedLevels = levels.slice((currentLevelPage - 1) * levelsPerPage, currentLevelPage * levelsPerPage)

  // Level Card info helper
  const getLevelCardMetadata = (level) => {
    const id = level.id
    if (id === 'lvl-a1') {
      return {
        cardName: 'Cơ bản (Basic)',
        badgeClass: 'success',
        badgeText: 'Mới bắt đầu',
        description: 'Làm quen với các khái niệm nền tảng và thuật ngữ cốt lõi của vũ trụ DiveVerse.',
        defaultUnitsCount: 25,
      }
    }
    if (id === 'lvl-b1') {
      return {
        cardName: 'Trung cấp (Intermediate)',
        badgeClass: 'primary',
        badgeText: 'Thành thạo',
        description: 'Mở rộng kiến thức chuyên sâu và thực hành các kỹ năng thực tế hệ thống qua các thử thách.',
        defaultUnitsCount: 40,
      }
    }
    if (id === 'lvl-c1') {
      return {
        cardName: 'Nâng cao (Advanced)',
        badgeClass: 'secondary',
        badgeText: 'Chuyên gia',
        description: 'Làm chủ các khái niệm phức tạp nhất và chuẩn bị cho các kỳ thi cấp chứng chỉ quốc tế.',
        defaultUnitsCount: 35,
      }
    }
    return {
      cardName: level.name,
      badgeClass: 'primary',
      badgeText: level.cefrShort,
      description: level.descriptionShort || 'Mô tả tóm tắt của cấp độ học.',
      defaultUnitsCount: 15,
    }
  }

  const handleLevelSelect = (e, targetLevelId) => {
    e.preventDefault()
    navigate(`/admin/curriculum/${targetLevelId}`)
  }

  const handleBackToOverview = (e) => {
    e.preventDefault()
    navigate('/admin/curriculum')
  }

  return (
    <main className="content-body">
      {!selectedLevelId ? (
        /* ==========================================================================
           SCREEN 1: CURRICULUM OVERVIEW (LEVEL GRID)
           ========================================================================== */
        <>
          {/* Breadcrumbs */}
          <div className="breadcrumbs">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Trang chủ</a>
            <span className="separator">&gt;</span>
            <span className="current">Chương trình học</span>
          </div>

          <h1 className="page-title">Tổng Quan Chương Trình Học</h1>
          <p className="page-description" style={{ marginBottom: '8px' }}>
            Quản lý cấu trúc, lộ trình và phân phối kiến thức cho toàn bộ vũ trụ DiveVerse.
          </p>

          {/* Statistics Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Tổng số bài học</span>
              <span className="stat-value">{loadingOverview ? '...' : totalLessonsOverview}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Tổng số cấp độ</span>
              <span className="stat-value">{loadingOverview ? '...' : levels.length}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Tổng số unit</span>
              <span className="stat-value">{loadingOverview ? '...' : totalUnitsOverview}</span>
            </div>
          </div>

          {/* Section Title */}
          <div style={{ fontWeight: 700, fontSize: '16px', marginTop: '8px', color: 'var(--text-primary)' }}>
            Cấu trúc Lộ trình học tập
          </div>

          {/* 3 Vertical Level cards */}
          <div className="curriculum-cards-container">
            {loadingOverview ? (
              <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '4px solid rgba(78,86,192,0.1)', borderTopColor: 'var(--primary)', animation: 'spin 1s linear infinite' }} />
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>Đang tải lộ trình học...</span>
              </div>
            ) : (
              paginatedLevels.map((lvl) => {
                const meta = getLevelCardMetadata(lvl)
                const currentCount = levelCounts[lvl.id] || 0
                const displayUnits = currentCount > 0 ? currentCount : meta.defaultUnitsCount
                const displayLessons = displayUnits * 4

                return (
                  <div className="curriculum-card" key={lvl.id}>
                    <div className="curriculum-card-header">
                      <span className="curriculum-card-title">{meta.cardName}</span>
                      <span className={`pill-badge ${meta.badgeClass}`}>{meta.badgeText}</span>
                    </div>
                    <p className="curriculum-card-desc">{meta.description}</p>
                    <div className="curriculum-stats-grid">
                      <div className="curriculum-stat-item">
                        <span className="curriculum-stat-label">Units</span>
                        <span className="curriculum-stat-value">{displayUnits} Units</span>
                      </div>
                      <div className="curriculum-stat-item">
                        <span className="curriculum-stat-label">Lessons</span>
                        <span className="curriculum-stat-value">{displayLessons} Lessons</span>
                      </div>
                    </div>
                    <a
                      href="#"
                      onClick={(e) => handleLevelSelect(e, lvl.id)}
                      className="btn-primary"
                      style={{ justifyContent: 'center', marginTop: '8px' }}
                    >
                      Quản lý Unit
                    </a>
                  </div>
                )
              })
            )}
          </div>

          {/* Level Cards Pagination (Only show if levels > 3) */}
          {levels.length > 3 && (
            <div className="flex justify-center items-center mt-6 gap-2">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentLevelPage > 1) setCurrentLevelPage(currentLevelPage - 1)
                }}
                className={`page-btn ${currentLevelPage === 1 ? 'disabled' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </a>
              {Array.from({ length: totalLevelPages }).map((_, idx) => {
                const pNum = idx + 1
                return (
                  <a
                    href="#"
                    key={pNum}
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentLevelPage(pNum)
                    }}
                    className={`page-btn ${currentLevelPage === pNum ? 'active' : ''}`}
                  >
                    {pNum}
                  </a>
                )
              })}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentLevelPage < totalLevelPages) setCurrentLevelPage(currentLevelPage + 1)
                }}
                className={`page-btn ${currentLevelPage === totalLevelPages ? 'disabled' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
            </div>
          )}
        </>
      ) : (
        /* ==========================================================================
           SCREEN 2A: UNIT MANAGEMENT FOR SELECTED LEVEL
           ========================================================================== */
        <>
          {/* Breadcrumbs */}
          <div className="breadcrumbs">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Trang chủ</a>
            <span className="separator">&gt;</span>
            <a href="#" onClick={handleBackToOverview}>Chương trình học</a>
            <span className="separator">&gt;</span>
            <span className="current">Quản lý Unit cấp độ {activeLevel?.name.toLowerCase()}</span>
          </div>

          {/* Page Header Row */}
          <div className="page-header-row">
            <div>
              <h1 className="page-title">Quản Lý Unit Cấp Độ {activeLevel?.name}</h1>
              <p className="page-description">
                Điều phối hành trình học tập cho học viên cấp độ {activeLevel?.name}. Quản lý các unit theo trình tự, chủ đề cốt lõi và các cột mốc ngôn ngữ.
              </p>
            </div>
            <a href="#" onClick={handleOpenAdd} className="btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Thêm Unit Mới
            </a>
          </div>

          {/* Stats & Progress Area */}
          <div className="stats-grid grid-2">
            <div className="stat-card">
              <span className="stat-label">Tổng số Unit</span>
              <span className="stat-value">{loadingUnits ? '...' : `${units.length} Unit`}</span>
              <span className="stat-badge">+ {Math.max(0, units.length - 2)} được thêm trong tháng này</span>
            </div>
            <div className="stat-card">
              <div className="progress-card-content">
                <span className="stat-label">Thước đo tiến độ hoàn thành trung bình</span>
                <div className="progress-bar-placeholder">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${Math.min(100, Math.round((units.length / 15) * 100))}%` }}
                  ></div>
                </div>
                <div className="progress-labels">
                  <span>Trung bình phần trăm hiện tại ({Math.min(100, Math.round((units.length / 15) * 100))}%)</span>
                  <span className="bold">{units.length} / 15 Unit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Header & Table */}
          <div>
            <div className="section-header">
              <span className="section-title">Danh mục Unit: {activeLevel?.name} {activeLevel?.cefrShort}</span>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                {/* Simple Search input */}
                <input
                  type="text"
                  placeholder="Tìm nhanh..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid rgba(78, 86, 192, 0.15)',
                    borderRadius: 'var(--rounded-md)',
                    padding: '6px 12px',
                    fontSize: '13px',
                    outline: 'none',
                    width: '180px'
                  }}
                />
                
                <a href="#" className="btn-secondary" onClick={(e) => e.preventDefault()}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                  Bộ lọc
                </a>
              </div>
            </div>

            {/* Data Table */}
            <div className="table-container">
              {loadingUnits ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '4px solid rgba(78,86,192,0.1)', borderTopColor: 'var(--primary)', animation: 'spin 1s linear infinite' }} />
                  <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>Đang tải bài học...</span>
                </div>
              ) : paginatedUnits.length === 0 ? (
                <div style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '600' }}>
                  Không tìm thấy kết quả phù hợp cho "{searchTerm}"
                </div>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th style={{ width: '100px' }}>Trình tự</th>
                      <th style={{ width: '200px' }}>Tên Unit</th>
                      <th style={{ width: '180px' }}>Chủ đề</th>
                      <th>Từ vựng</th>
                      <th>Ngữ pháp</th>
                      <th style={{ width: '160px' }}>Trọng tâm kỹ năng</th>
                      <th style={{ width: '180px' }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUnits.map((u) => (
                      <tr key={u.id}>
                        <td className="unit-sequence">{u.sequence}</td>
                        <td className="unit-title">{u.title}</td>
                        <td>
                          <div className="text-badge-container">{u.topic}</div>
                        </td>
                        <td>{u.vocabulary}</td>
                        <td className="grammar-cell">{u.grammar}</td>
                        <td>{u.skills}</td>
                        <td>
                          <div className="action-vertical-stack">
                            <div className="action-horizontal-row">
                              <a
                                href="#"
                                onClick={(e) => handleOpenEdit(e, u)}
                                className="btn-action-icon edit-btn"
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                                  <path d="m15 5 4 4" />
                                </svg>
                                Sửa
                              </a>
                              <a
                                href="#"
                                onClick={(e) => handleOpenDelete(e, u)}
                                className="btn-action-icon delete-btn"
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
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(`/admin/curriculum/${u.id}/lessons`);
                              }}
                              className="btn-action-manage"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                              </svg>
                              Quản lý bài học
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
            <div className="table-footer">
              <span className="progress-text">
                Đang hiển thị {startIndex}-{endIndex} trong số {totalUnits} unit
              </span>
              <div className="pagination-container">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) setCurrentPage(currentPage - 1)
                  }}
                  className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </a>
                
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pNum = idx + 1
                  return (
                    <a
                      href="#"
                      key={pNum}
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(pNum)
                      }}
                      className={`page-btn ${currentPage === pNum ? 'active' : ''}`}
                    >
                      {pNum}
                    </a>
                  )
                })}

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                  }}
                  className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ==========================================
         ADD / EDIT UNIT MODAL OVERLAY
         ========================================== */}
      {isFormModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              {editingUnit ? 'Chỉnh Sửa Thông Tin Unit' : 'Thêm Unit'}
            </div>
            
            {actionError && (
              <div style={{ color: 'var(--error)', fontSize: '13px', fontWeight: 'bold', padding: '8px 12px', border: '1px solid rgba(239,68,68,0.15)', backgroundColor: 'rgba(239,68,68,0.05)', borderRadius: 'var(--rounded-md)' }}>
                ⚠️ {actionError}
              </div>
            )}

            {/* Unit Title */}
            <div className="input-group">
              <label className="input-label" style={errors.title ? { color: 'var(--error)' } : {}}>
                Tên Unit *
              </label>
              <input
                type="text"
                placeholder="Nhập tên unit..."
                disabled={actionLoading}
                className={`text-input ${errors.title ? 'error' : ''}`}
                {...register('title')}
              />
              {errors.title && (
                <div className="error-message">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  {errors.title.message}
                </div>
              )}
            </div>

            {/* Topic & Exam Skill */}
            <div className="grid-2-col">
              <div className="input-group">
                <label className="input-label" style={errors.topic ? { color: 'var(--error)' } : {}}>
                  Chủ đề Lớn *
                </label>
                <input
                  type="text"
                  placeholder="Nhập chủ đề lớn..."
                  disabled={actionLoading}
                  className={`text-input ${errors.topic ? 'error' : ''}`}
                  {...register('topic')}
                />
                {errors.topic && (
                  <div className="error-message">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    {errors.topic.message}
                  </div>
                )}
              </div>
              <div className="input-group">
                <label className="input-label">
                  Kỹ năng Thi
                </label>
                <select
                  disabled={actionLoading}
                  className="select-input"
                  {...register('examSkill')}
                >
                  <option value="TOEIC">TOEIC</option>
                  <option value="IELTS">IELTS</option>
                  <option value="VSTEP">VSTEP</option>
                </select>
              </div>
            </div>

            {/* Vocabulary & Grammar */}
            <div className="grid-2-col">
              <div className="input-group">
                <label className="input-label" style={errors.vocabulary ? { color: 'var(--error)' } : {}}>
                  Chủ điểm Từ vựng *
                </label>
                <input
                  type="text"
                  placeholder="Nhập chủ điểm từ vựng..."
                  disabled={actionLoading}
                  className={`text-input ${errors.vocabulary ? 'error' : ''}`}
                  {...register('vocabulary')}
                />
                {errors.vocabulary && (
                  <div className="error-message">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    {errors.vocabulary.message}
                  </div>
                )}
              </div>
              <div className="input-group">
                <label className="input-label" style={errors.grammar ? { color: 'var(--error)' } : {}}>
                  Chủ điểm Ngữ pháp *
                </label>
                <input
                  type="text"
                  placeholder="Nhập chủ điểm ngữ pháp..."
                  disabled={actionLoading}
                  className={`text-input ${errors.grammar ? 'error' : ''}`}
                  {...register('grammar')}
                />
                {errors.grammar && (
                  <div className="error-message">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    {errors.grammar.message}
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
                Hủy bỏ
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
         DELETE UNIT CONFIRMATION MODAL OVERLAY
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
              Bạn có chắc chắn muốn xóa<br />{deletingUnit?.sequence}?
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
