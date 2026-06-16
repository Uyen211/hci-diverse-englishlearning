import { useState } from 'react'

export default function ReviewListening({ questions = [], answers = {} }) {
  const [activeIdx, setActiveIdx] = useState(0)

  // Find all sub-questions across all listening questions
  const allSubQuestions = []
  
  questions.forEach(q => {
    q.subQuestions?.forEach(subQ => {
      allSubQuestions.push({
        parentQuestion: q,
        subQ
      })
    })
  })

  if (questions.length === 0) return null

  // Ensure activeIdx is in bounds
  const currentActiveIdx = Math.min(activeIdx, allSubQuestions.length - 1)
  const { parentQuestion, subQ } = allSubQuestions[currentActiveIdx]
  
  // Find the sub-question index within its parent (1-based)
  const subIdx = (parentQuestion.subQuestions?.indexOf(subQ) ?? 0) + 1
  const isCorrect = answers[subQ.id] === subQ.correctOption

  const handlePrev = () => {
    if (currentActiveIdx > 0) {
      setActiveIdx(currentActiveIdx - 1)
    }
  }

  const handleNext = () => {
    if (currentActiveIdx < allSubQuestions.length - 1) {
      setActiveIdx(currentActiveIdx + 1)
    }
  }

  const renderPaginationItems = () => {
    const total = allSubQuestions.length
    const current = currentActiveIdx
    const pages = []

    for (let i = 0; i < total; i++) {
      const item = allSubQuestions[i]
      const questionCorrect = answers[item.subQ.id] === item.subQ.correctOption
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
          className={`page-btn font-bold transition-all border border-border text-text-secondary bg-surface hover:bg-muted ${currentActiveIdx === allSubQuestions.length - 1 ? 'disabled cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          disabled={currentActiveIdx === allSubQuestions.length - 1}
          style={{ width: '32px', height: '32px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px' }}
        >
          &gt;
        </button>
      </div>

      {/* Review Item Card */}
      <div 
        className="review-item-card bg-surface p-6 rounded-xl border border-border shadow-glow flex flex-col gap-4" 
        style={{ borderLeft: `5px solid ${isCorrect ? 'var(--success)' : 'var(--error)'}`, padding: '24px', borderRadius: 'var(--rounded-lg)', boxShadow: 'var(--elevation-glow)' }}
      >
        <div className="review-item-status-row flex items-center gap-2 font-bold text-sm" style={{ marginBottom: '16px' }}>
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
            {subIdx}
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

        <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '20px' }}>
          {subQ.content}
        </h4>

        {/* Answer Cards Side-by-Side matching Figma */}
        {isCorrect ? (
          <div style={{ marginBottom: '20px', display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            <div style={{ border: '1px solid var(--success)', backgroundColor: 'rgba(34, 197, 94, 0.03)', borderRadius: 'var(--rounded-lg)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ color: 'var(--success)', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                LỰA CHỌN CỦA BẠN (ĐÚNG)
              </div>
              <div style={{ fontWeight: '700', color: 'var(--success)', marginTop: '4px', fontSize: '15px' }}>
                {answers[subQ.id]}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ border: '2px dashed var(--error)', backgroundColor: 'rgba(239, 68, 68, 0.03)', borderRadius: 'var(--rounded-lg)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ color: 'var(--error)', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                LỰA CHỌN CỦA BẠN (SAI)
              </div>
              <div style={{ fontWeight: '700', color: 'var(--error)', marginTop: '4px', fontSize: '15px' }}>
                {answers[subQ.id] || '[Chưa trả lời]'}
              </div>
            </div>

            <div style={{ border: '1px solid var(--text-primary)', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--rounded-lg)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ color: 'var(--text-secondary)', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                ĐÁP ÁN ĐÚNG
              </div>
              <div style={{ fontWeight: '700', color: 'var(--success)', marginTop: '4px', fontSize: '15px' }}>
                {subQ.correctOption}
              </div>
            </div>
          </div>
        )}

        {/* Quote Script Box */}
        <div className="review-explanation-box bg-primary/[0.02] border-l-4 border-primary p-4 rounded text-xs leading-relaxed text-text-secondary" style={{ marginTop: '0', borderLeft: '4px solid var(--primary)', backgroundColor: 'rgba(78,86,192,0.02)', padding: '16px', borderRadius: 'var(--rounded-md)' }}>
          <strong style={{ color: 'var(--text-primary)', fontSize: '13.5px', display: 'block', marginBottom: '6px' }}>
            Giải thích từ Admin:
          </strong>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <strong>Trích dẫn Script bài nghe:</strong>
            <br />
            "{parentQuestion.passageContent || 'No script available.'}"
          </span>
        </div>
      </div>
    </div>
  )
}
