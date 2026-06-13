import { useState } from 'react'
import { Check } from 'lucide-react'

export default function ReviewMcq({ questions = [], answers = {} }) {
  const [activeIdx, setActiveIdx] = useState(0)

  // Find incorrect questions
  const wrongQuestions = questions.filter(
    (q) => answers[q.id] !== q.correctOption
  )

  if (questions.length === 0) return null

  if (wrongQuestions.length === 0) {
    return (
      <div className="review-item-card bg-surface p-6 rounded-xl border border-border shadow-glow text-center py-12">
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(34, 197, 94, 0.08)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
          <Check className="w-6 h-6" />
        </div>
        <h4 className="font-heading font-extrabold text-text-primary text-base">
          Tuyệt vời! Bạn không sai câu nào.
        </h4>
      </div>
    )
  }

  // Ensure activeIdx is in bounds
  const currentActiveIdx = Math.min(activeIdx, wrongQuestions.length - 1)
  const activeQuestion = wrongQuestions[currentActiveIdx]
  
  // Find the absolute question index in the original list for display (1-based)
  const originalIndex = questions.indexOf(activeQuestion) + 1

  const handlePrev = () => {
    if (currentActiveIdx > 0) {
      setActiveIdx(currentActiveIdx - 1)
    }
  }

  const handleNext = () => {
    if (currentActiveIdx < wrongQuestions.length - 1) {
      setActiveIdx(currentActiveIdx + 1)
    }
  }

  const renderPaginationItems = () => {
    const total = wrongQuestions.length
    const current = currentActiveIdx
    const pages = []
    const range = 1
    
    if (total <= 7) {
      for (let i = 0; i < total; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`page-btn ${current === i ? 'active' : 'cursor-pointer'}`}
          >
            {i + 1}
          </button>
        )
      }
    } else {
      pages.push(
        <button
          key={0}
          onClick={() => setActiveIdx(0)}
          className={`page-btn ${current === 0 ? 'active' : 'cursor-pointer'}`}
        >
          1
        </button>
      )

      if (current > range + 1) {
        pages.push(
          <span key="left-ellipsis" className="px-2 font-semibold text-text-secondary opacity-60">
            ...
          </span>
        )
      }

      const start = Math.max(1, current - range)
      const end = Math.min(total - 2, current + range)
      for (let i = start; i <= end; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`page-btn ${current === i ? 'active' : 'cursor-pointer'}`}
          >
            {i + 1}
          </button>
        )
      }

      if (current < total - range - 2) {
        pages.push(
          <span key="right-ellipsis" className="px-2 font-semibold text-text-secondary opacity-60">
            ...
          </span>
        )
      }

      pages.push(
        <button
          key={total - 1}
          onClick={() => setActiveIdx(total - 1)}
          className={`page-btn ${current === total - 1 ? 'active' : 'cursor-pointer'}`}
        >
          {total}
        </button>
      )
    }
    return pages
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Sub-navigation for wrong questions */}
      <div className="taker-sub-nav flex gap-2 mb-4 items-center flex-wrap">
        <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginRight: '8px' }}>
          Câu sai:
        </span>
        <button 
          onClick={handlePrev} 
          className={`page-btn ${currentActiveIdx === 0 ? 'disabled cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          disabled={currentActiveIdx === 0}
        >
          &lt;
        </button>
        {renderPaginationItems()}
        <button 
          onClick={handleNext} 
          className={`page-btn ${currentActiveIdx === wrongQuestions.length - 1 ? 'disabled cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          disabled={currentActiveIdx === wrongQuestions.length - 1}
        >
          &gt;
        </button>
      </div>

      {/* Question review card */}
      <div className="review-item-card bg-surface p-6 rounded-xl border border-border shadow-glow flex flex-col gap-4" style={{ borderLeft: '5px solid var(--primary)' }}>
        <div className="review-item-status-row flex items-center gap-2 font-bold text-sm">
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--error)', color: '#fff', display: 'flex', alignItems: 'center', justifycontent: 'center', justifyContent: 'center', alignItems: 'center', fontWeight: '700' }}>
            {originalIndex}
          </div>
          <span style={{ color: 'var(--error)', fontWeight: '700' }}>
            ✕ Trả lời sai
          </span>
        </div>

        <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
          {activeQuestion.content}
        </h4>

        {/* Answer displays matching figma styling */}
        <div className="review-text-wrong" style={{ color: 'var(--error)', fontWeight: '600', fontSize: '14px' }}>
          ✕ Lựa chọn của bạn: {answers[activeQuestion.id] || '[Chưa trả lời]'}
        </div>
        <div className="review-text-correct" style={{ color: 'var(--success)', fontWeight: '600', fontSize: '14px' }}>
          ✓ Đáp án đúng: {activeQuestion.correctOption}
        </div>

        {activeQuestion.explanation && (
          <div className="review-explanation-box bg-primary/[0.02] border-l-4 border-primary p-4 rounded text-xs leading-relaxed text-text-secondary" style={{ marginTop: '12px' }}>
            <strong>Giải thích chi tiết:</strong>
            <br />
            {activeQuestion.explanation}
          </div>
        )}
      </div>
    </div>
  )
}
