import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { examService } from '../../../services/examService'
import { Button } from '../../../components/ui/button'
import ReviewMcq from './components/ReviewMcq'
import ReviewListening from './components/ReviewListening'
import ReviewSpeaking from './components/ReviewSpeaking'
import ReviewReading from './components/ReviewReading'
import ReviewWriting from './components/ReviewWriting'
import { ArrowLeft, RefreshCw, BarChart2 } from 'lucide-react'

export default function ExamReview() {
  const { examId } = useParams()
  const navigate = useNavigate()
  const [exam, setExam] = useState(null)
  const [attempt, setAttempt] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('')

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedExam = await examService.getExamById(examId)
        if (!fetchedExam) {
          navigate('/student/practice-test')
          return
        }
        
        let fetchedAttempt = await examService.getAttemptByExamId(examId)
        
        // If there's no attempt in local storage but it's the placement test,
        // create a mock attempt so that the page doesn't crash and displays placement data
        if (!fetchedAttempt && examId === 'exam-placement') {
          fetchedAttempt = {
            examId: 'exam-placement',
            answers: {
              'q-place-1': 'have finished',
              'q-place-2': 'accepts',
              'q-place-listen-sub1': 'Fresh produce',
              'q-place-read-sub1': 'Paragraph B',
              'q-place-write': 'In my opinion, online learning is have more benefits than normal school. However, students may lacks face-to-face interaction and self-discipline...'
            },
            score: 85,
            maxScore: 100,
            skillsBreakdown: {
              'Trắc nghiệm': 85,
              'Listening': 90,
              'Speaking': 75,
              'Reading': 80,
              'Writing': 70
            }
          }
        }

        if (!fetchedAttempt) {
          // If no attempt exists for a mock exam, redirect them back to list
          navigate('/student/practice-test')
          return
        }

        setExam(fetchedExam)
        setAttempt(fetchedAttempt)

        const skills = fetchedExam.questions.map(q => q.skill)
        if (skills.length > 0) {
          setActiveTab(skills[0])
        }

      } catch (err) {
        console.error('Lỗi khi tải dữ liệu kết quả:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [examId, navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-primary font-bold text-lg animate-pulse">Đang tải kết quả bài thi...</div>
      </div>
    )
  }

  const scorePercentage = Math.round((attempt.score / (attempt.maxScore || 100)) * 100)
  const skillsBreakdown = attempt.skillsBreakdown || {}
  const answers = attempt.answers || {}

  // Determine feedback text based on score
  const getFeedback = () => {
    if (scorePercentage >= 80) {
      return {
        title: 'Kết quả tuyệt vời!',
        desc: 'Bạn đã hoàn thành xuất sắc bài kiểm tra này.'
      }
    } else if (scorePercentage >= 50) {
      return {
        title: 'Làm tốt lắm!',
        desc: 'Bạn có nền tảng vững vàng, tiếp tục phát huy nhé.'
      }
    } else {
      return {
        title: 'Cần cố gắng thêm!',
        desc: 'Hãy xem kỹ các lỗi sai và luyện tập thêm nhé.'
      }
    }
  }

  const feedback = getFeedback()
  const uniqueSkills = exam ? [...new Set(exam.questions.map(q => q.skill))] : []

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb & Navigation */}
      <div className="breadcrumbs flex items-center gap-2 text-xs font-semibold text-text-secondary">
        <span className="hover:underline cursor-pointer" onClick={() => navigate('/')}>Trang chủ</span>
        <span className="opacity-50">&gt;</span>
        <span className="hover:underline cursor-pointer" onClick={() => navigate('/student/practice-test')}>Bài kiểm tra</span>
        <span className="opacity-50">&gt;</span>
        <span className="text-primary font-bold">{exam.title} - Kết quả</span>
      </div>

      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => navigate('/student/practice-test')}
            className="flex items-center gap-1 text-text-secondary border-border/80 hover:bg-muted p-2 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="page-title text-2xl font-extrabold text-text-primary">
            Kết Quả Đánh Giá: {exam.title}
          </h1>
        </div>

        <Button
          onClick={() => navigate(`/student/practice-test/${exam.id}/take`)}
          className="bg-primary hover:bg-primary-hover text-white py-2 px-5 rounded-lg text-xs font-bold shadow-active-glow flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Làm lại bài thi
        </Button>
      </div>

      {/* Score Dashboard Grid matching Figma */}
      <div className="flex flex-col lg:flex-row gap-6 w-full mt-2">
        {/* Left score card */}
        <div className="config-card w-full lg:w-[30%] bg-surface border border-border shadow-glow rounded-xl p-6 flex flex-col items-center justify-center text-center gap-4">
          <div 
            className="score-circular-gauge"
            style={{
              background: `conic-gradient(var(--primary) 0% ${scorePercentage}%, rgba(78, 86, 192, 0.08) ${scorePercentage}% 100%)`
            }}
          >
            <div className="score-circular-inner">
              <span className="score-number">
                {attempt.score}
              </span>
              <span className="score-max">
                / {attempt.maxScore || 100} Điểm
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>
              {feedback.title}
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              {feedback.desc}
            </p>
          </div>
        </div>

        {/* Right capability progress bars */}
        <div className="config-card w-full lg:w-[70%] bg-surface border border-border shadow-glow rounded-xl p-6 flex flex-col gap-4">
          <h4 className="font-heading font-extrabold text-sm text-text-primary flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-primary" />
            Phân tích năng lực các kỹ năng
          </h4>

          <div className="review-bar-container">
            {[
              { key: 'Trắc nghiệm', display: 'Trắc nghiệm (MCQ)', color: 'var(--primary)' },
              { key: 'Listening', display: 'Listening (Nghe)', color: 'var(--primary)' },
              { key: 'Speaking', display: 'Speaking (Nói)', color: 'var(--accent)' },
              { key: 'Reading', display: 'Reading (Đọc)', color: 'var(--secondary)' },
              { key: 'Writing', display: 'Writing (Viết)', color: 'var(--accent)' }
            ].map(({ key, display, color }) => {
              const val = skillsBreakdown[key] || 0;
              return (
                <div key={key} className="review-bar-row">
                  <div className="review-bar-meta">
                    <span className="text-text-primary">{display}</span>
                    <span>{val}%</span>
                  </div>
                  <div className="review-bar-outer">
                    <div 
                      className="review-bar-inner" 
                      style={{ backgroundColor: color, width: `${val}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Answer Correction details section */}
      <div className="mt-8 flex flex-col gap-6">
        <h2 className="font-heading font-extrabold text-xl text-text-primary">
          Chi tiết đáp án & giải thích
        </h2>

        {/* Evaluation tab filters */}
        <div className="custom-tab-container mb-4">
          {uniqueSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => setActiveTab(skill)}
              className={`custom-tab-item ${
                activeTab === skill
                  ? 'active'
                  : ''
              }`}
            >
              {skill === 'Trắc nghiệm' ? 'Trắc nghiệm (MCQ)' : skill}
            </button>
          ))}
        </div>

        {/* Detailed Correction list */}
        <div className="mt-1">
          {activeTab === 'Trắc nghiệm' && (
            <ReviewMcq
              questions={exam.questions.filter((q) => q.skill === 'Trắc nghiệm')}
              answers={answers}
            />
          )}
          {activeTab === 'Listening' && (
            <ReviewListening
              questions={exam.questions.filter((q) => q.skill === 'Listening')}
              answers={answers}
            />
          )}
          {activeTab === 'Speaking' && (() => {
            const q = exam.questions.find((item) => item.skill === 'Speaking')
            return q ? <ReviewSpeaking question={q} /> : null
          })()}
          {activeTab === 'Reading' && (
            <ReviewReading
              questions={exam.questions.filter((q) => q.skill === 'Reading')}
              answers={answers}
            />
          )}
          {activeTab === 'Writing' && (() => {
            const q = exam.questions.find((item) => item.skill === 'Writing')
            return q ? <ReviewWriting question={q} answer={answers[q.id]} /> : null
          })()}
        </div>
      </div>
    </div>
  )
}
