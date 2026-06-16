import { useState } from 'react'

export default function ReviewMcq({ questions = [], answers = {} }) {
  const [activeIdx, setActiveIdx] = useState(0)

  if (questions.length === 0) return null

  // Ensure activeIdx is in bounds
  const currentActiveIdx = Math.min(activeIdx, questions.length - 1)
  const activeQuestion = questions[currentActiveIdx]
  
  const originalIndex = currentActiveIdx + 1
  const isCorrect = answers[activeQuestion.id] === activeQuestion.correctOption

  const handlePrev = () => {
    if (currentActiveIdx > 0) {
      setActiveIdx(currentActiveIdx - 1)
    }
  }

  const handleNext = () => {
    if (currentActiveIdx < questions.length - 1) {
      setActiveIdx(currentActiveIdx + 1)
    }
  }

  const renderPaginationItems = () => {
    const total = questions.length
    const current = currentActiveIdx
    const pages = []

    for (let i = 0; i < total; i++) {
      const q = questions[i]
      const questionCorrect = answers[q.id] === q.correctOption
      const isActive = i === current

      let btnStyle = {
        width: '32px',
        height: '32px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        fontWeight: '700',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        border: '1px solid rgba(78, 86, 192, 0.15)'
      }

      if (isActive) {
        btnStyle = {
          ...btnStyle,
          backgroundColor: 'var(--primary)',
          borderColor: 'var(--primary)',
          color: '#ffffff',
          outline: '2px solid var(--primary)',
          outlineOffset: '2px',
          transform: 'scale(1.05)',
          zIndex: 10
        }
      } else if (questionCorrect) {
        btnStyle = {
          ...btnStyle,
          backgroundColor: 'rgba(34, 197, 94, 0.08)',
          borderColor: 'rgba(34, 197, 94, 0.3)',
          color: 'var(--success)',
          zIndex: 1
        }
      } else {
        btnStyle = {
          ...btnStyle,
          backgroundColor: 'rgba(239, 68, 68, 0.08)',
          borderColor: 'rgba(239, 68, 68, 0.3)',
          color: 'var(--error)',
          zIndex: 1
        }
      }

      pages.push(
        <button
          key={i}
          onClick={() => setActiveIdx(i)}
          className="page-btn font-bold cursor-pointer transition-all"
          style={btnStyle}
        >
          {i + 1}
        </button>
      )
    }
    return pages
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Sub-navigation for all questions */}
      <div className="taker-sub-nav flex gap-2 mb-4 items-center flex-wrap">
        <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginRight: '8px' }}>
          Câu hỏi:
        </span>
        <button 
          onClick={handlePrev} 
          className={`page-btn font-bold transition-all border border-border text-text-secondary bg-surface hover:bg-muted ${currentActiveIdx === 0 ? 'disabled cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          disabled={currentActiveIdx === 0}
          style={{ width: '32px', height: '32px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px' }}
        >
          &lt;
        </button>
        {renderPaginationItems()}
        <button 
          onClick={handleNext} 
          className={`page-btn font-bold transition-all border border-border text-text-secondary bg-surface hover:bg-muted ${currentActiveIdx === questions.length - 1 ? 'disabled cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          disabled={currentActiveIdx === questions.length - 1}
          style={{ width: '32px', height: '32px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px' }}
        >
          &gt;
        </button>
      </div>

      {/* Question review card */}
      <div 
        className="review-item-card bg-surface p-6 rounded-xl border border-border shadow-glow flex flex-col gap-4" 
        style={{ borderLeft: `5px solid ${isCorrect ? 'var(--success)' : 'var(--error)'}` }}
      >
        <div className="review-item-status-row flex items-center gap-2 font-bold text-sm">
          <div style={{ 
            width: '28px', 
            height: '28px', 
            borderRadius: '50%', 
            backgroundColor: isCorrect ? 'var(--success)' : 'var(--error)', 
            color: '#fff', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontWeight: '700' 
          }}>
            {originalIndex}
          </div>
          {isCorrect ? (
            <span style={{ color: 'var(--success)', fontWeight: '700' }}>
              ✓ Trả lời đúng
            </span>
          ) : (
            <span style={{ color: 'var(--error)', fontWeight: '700' }}>
              ✕ Trả lời sai
            </span>
          )}
        </div>

        <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
          {activeQuestion.content}
        </h4>

        {/* Answer displays matching figma styling */}
        {isCorrect ? (
          <div className="review-text-correct" style={{ color: 'var(--success)', fontWeight: '600', fontSize: '14px' }}>
            ✓ Lựa chọn của bạn (Đáp án đúng): {activeQuestion.correctOption}
          </div>
        ) : (
          <>
            <div className="review-text-wrong" style={{ color: 'var(--error)', fontWeight: '600', fontSize: '14px' }}>
              ✕ Lựa chọn của bạn: {answers[activeQuestion.id] || '[Chưa trả lời]'}
            </div>
            <div className="review-text-correct" style={{ color: 'var(--success)', fontWeight: '600', fontSize: '14px' }}>
              ✓ Đáp án đúng: {activeQuestion.correctOption}
            </div>
          </>
        )}

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
