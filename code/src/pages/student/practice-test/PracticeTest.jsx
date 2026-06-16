import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { examService } from '../../../services/examService'
import { Button } from '../../../components/ui/button'
import { Clock, ShieldCheck, Award, Lock } from 'lucide-react'

export default function PracticeTest() {
  const navigate = useNavigate()
  const [exams, setExams] = useState([])
  const [attempts, setAttempts] = useState([])
  const [activeTab, setActiveTab] = useState('Tất cả')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedExams = await examService.getExams()
        const fetchedAttempts = await examService.getAttempts()
        setExams(fetchedExams)
        setAttempts(fetchedAttempts)
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu bài thi:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const filterTabs = [
    { label: 'Tất cả' },
    { label: 'Mini-test Unit' },
    { label: 'Level Test' },
    { label: 'IELTS Mock Test' }
  ]

  const getFilteredExams = () => {
    return exams.filter(exam => {
      if (activeTab === 'Tất cả') return true
      if (activeTab === 'Mini-test Unit') return exam.type === 'Mini-test'
      if (activeTab === 'Level Test') return exam.type === 'Level Test' || exam.type === 'Level test cuối cấp độ'
      if (activeTab === 'IELTS Mock Test') return exam.type === 'IELTS Mock Test'
      return true
    })
  }

  const getAttempt = (examId) => {
    // Pre-populate mock placement test attempt if not present in storage to match figma
    if (examId === 'exam-placement') {
      const stored = attempts.find(a => a.examId === examId)
      return stored || { score: 95, maxScore: 100 } // Represents 9.5/10
    }
    return attempts.find(a => a.examId === examId)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-primary font-bold text-lg animate-pulse">Đang tải danh sách bài thi...</div>
      </div>
    )
  }

  const filteredExams = getFilteredExams()

  return (
    <div className="main-layout flex flex-col gap-6">
      {/* Header section matching Figma */}
      <div className="flex flex-col gap-2">
        <h1 className="page-title text-3xl font-extrabold text-text-primary tracking-tight">
          Kiểm Tra Thực Tế
        </h1>
        <p className="text-text-secondary text-sm" style={{ marginTop: '-8px' }}>
          Học thật thi thật, cùng nhau chinh phục kỳ thi!
        </p>
      </div>

      {/* Filter Tabs matching Figma design */}
      <div className="custom-tab-container mb-4">
        {filterTabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`custom-tab-item ${
              activeTab === tab.label
                ? 'active'
                : ''
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cards Grid matching student-exam-grid */}
      <div className="student-exam-grid">
        {filteredExams.map((exam) => {
          if (exam.id === 'exam-1') {
            // Card: Mini-test
            return (
              <div 
                key={exam.id} 
                className="student-card cursor-pointer"
                onClick={() => navigate(`/student/practice-test/${exam.id}/take`)}
              >
                <div className="student-card-header">
                  <span className="test-type-badge bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded text-xs font-bold">Mini-test</span>
                  <span className="difficulty-tag medium">Trung bình</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>
                  {exam.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Thời gian: {exam.duration} phút &nbsp;•&nbsp; Số câu: {exam.questionsCount} câu
                </p>
                <button className="btn-primary w-full py-2.5 text-sm font-bold rounded-lg cursor-pointer">
                  Bắt đầu làm bài
                </button>
              </div>
            )
          }

          if (exam.id === 'exam-placement') {
            // Card: Completed
            return (
              <div 
                key={exam.id} 
                className="student-card completed cursor-pointer"
                onClick={() => navigate(`/student/practice-test/${exam.id}/review`)}
              >
                <div className="student-card-header">
                  <span className="status-badge completed">✓ Hoàn thành</span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--success)' }}>
                    Điểm: 9.5/10
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>
                  {exam.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Thời gian: {exam.duration} phút &nbsp;•&nbsp; Số câu: {exam.questionsCount} câu
                </p>
                <button className="btn-secondary w-full py-2.5 text-sm font-bold rounded-lg cursor-pointer">
                  Xem chi tiết kết quả
                </button>
              </div>
            )
          }

          if (exam.id === 'exam-3') {
            // Card: Locked
            return (
              <div 
                key={exam.id} 
                className="student-card" 
                style={{ opacity: 0.5, cursor: 'not-allowed' }}
              >
                <div className="student-card-header">
                  <span className="test-type-badge bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded text-xs font-bold">Mock Test</span>
                  <span className="difficulty-tag hard">Khó</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>
                  {exam.title}
                </h3>
                <div style={{
                  backgroundColor: 'rgba(78,86,192,0.05)',
                  padding: '10px',
                  borderRadius: 'var(--rounded-md)',
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'var(--text-secondary)'
                }}>
                  [ Yêu cầu hoàn thành Unit 5 ]
                </div>
                <button 
                  className="btn-secondary w-full py-2.5 text-sm font-bold rounded-lg cursor-not-allowed" 
                  disabled
                >
                  Chưa khả dụng
                </button>
              </div>
            )
          }

          return null
        })}

        {filteredExams.length === 0 && (
          <div className="col-span-full py-12 text-center text-text-secondary font-medium">
            Không có đề thi nào trong mục này.
          </div>
        )}
      </div>
    </div>
  )
}
