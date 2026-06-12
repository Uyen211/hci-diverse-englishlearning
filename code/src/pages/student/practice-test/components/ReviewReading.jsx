import { useState } from 'react'
import { Check } from 'lucide-react'

export default function ReviewReading({ questions = [], answers = {} }) {
  const [activeIdx, setActiveIdx] = useState(0)

  // Find all incorrect sub-questions across all reading questions
  const wrongSubQuestions = []
  
  questions.forEach(q => {
    q.subQuestions?.forEach(subQ => {
      if (answers[subQ.id] !== subQ.correctOption) {
        wrongSubQuestions.push({
          parentQuestion: q,
          subQ
        })
      }
    })
  })

  if (questions.length === 0) return null

  if (wrongSubQuestions.length === 0) {
    return (
      <div className="review-item-card bg-surface p-6 rounded-xl border border-border shadow-glow text-center py-12">
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(34, 197, 94, 0.08)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
          <Check className="w-6 h-6" />
        </div>
        <h4 className="font-heading font-extrabold text-text-primary text-base">
          Tuyệt vời! Bạn không sai câu nào trong phần đọc.
        </h4>
      </div>
    )
  }

  // Ensure activeIdx is in bounds
  const currentActiveIdx = Math.min(activeIdx, wrongSubQuestions.length - 1)
  const { parentQuestion, subQ } = wrongSubQuestions[currentActiveIdx]
  
  // Find the sub-question index within its parent (1-based)
  const subIdx = (parentQuestion.subQuestions?.indexOf(subQ) ?? 0) + 1

  const handlePrev = () => {
    if (currentActiveIdx > 0) {
      setActiveIdx(currentActiveIdx - 1)
    }
  }

  const handleNext = () => {
    if (currentActiveIdx < wrongSubQuestions.length - 1) {
      setActiveIdx(currentActiveIdx + 1)
    }
  }

  const paragraphs = parentQuestion.passageContent ? parentQuestion.passageContent.split('\n') : []

  const renderPaginationItems = () => {
    const total = wrongSubQuestions.length
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
          className={`page-btn ${currentActiveIdx === wrongSubQuestions.length - 1 ? 'disabled cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          disabled={currentActiveIdx === wrongSubQuestions.length - 1}
        >
          &gt;
        </button>
      </div>

      {/* Split layout grid */}
      <div className="split-layout-grid grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left: Passage highlights */}
        <div className="split-panel bg-surface p-6 rounded-xl border border-border shadow-glow flex flex-col gap-4">
          <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '16px', fontWeight: '700', color: 'var(--primary)' }}>
            {parentQuestion.passageTitle || 'READING PASSAGE'}
          </h3>
          <div className="passage-text-block text-sm leading-relaxed text-text-primary overflow-y-auto max-h-[420px] pr-3 text-justify flex flex-col gap-4">
            {paragraphs.map((p, idx) => {
              if (!p.trim()) return null
              
              // Parse paragraph and highlights
              const match = p.trim().match(/^([A-D])\.\s/)
              if (match) {
                const letter = match[1]
                const optionName = `Paragraph ${letter}`
                const userChoice = answers[subQ.id]
                const isUserChoice = userChoice === optionName
                const isCorrect = subQ.correctOption === optionName

                if (isUserChoice) {
                  return (
                    <p 
                      key={idx} 
                      style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)', borderLeft: '4px solid var(--error)', padding: '8px 12px', fontWeight: '500', marginBottom: '12px' }}
                    >
                      <span style={{ color: 'var(--error)', fontWeight: '800', fontSize: '12px', display: 'block', marginBottom: '4px' }}>
                        [Lựa chọn của bạn - Sai]
                      </span>
                      {p}
                    </p>
                  )
                }

                if (isCorrect) {
                  return (
                    <p 
                      key={idx} 
                      style={{ backgroundColor: 'rgba(34, 197, 94, 0.08)', borderLeft: '4px solid var(--success)', padding: '8px 12px', fontWeight: '500' }}
                    >
                      <span style={{ color: 'var(--success)', fontWeight: '800', fontSize: '12px', display: 'block', marginBottom: '4px' }}>
                        [Đáp án đúng]
                      </span>
                      {p}
                    </p>
                  )
                }
              }

              return <p key={idx}>{p}</p>
            })}
          </div>
        </div>

        {/* Right: Question details */}
        <div className="split-panel bg-surface p-6 rounded-xl border border-border shadow-glow flex flex-col gap-5">
          <div className="review-item-status-row flex items-center gap-2 font-bold text-sm">
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--error)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
              {subIdx}
            </div>
            <span style={{ color: 'var(--error)', fontWeight: '700' }}>
              ✕ Trả lời sai
            </span>
          </div>

          <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '12px' }}>
            {subQ.content}
          </h4>

          {/* Grid answers comparison */}
          <div style={{ marginBottom: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ border: '2px dashed var(--error)', backgroundColor: 'rgba(239, 68, 68, 0.03)', borderRadius: 'var(--rounded-lg)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ color: 'var(--error)', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                LỰA CHỌN CỦA BẠN (SAI)
              </div>
              <div style={{ fontWeight: '700', color: 'var(--error)', marginTop: '4px', fontSize: '14px' }}>
                {answers[subQ.id] || '[Chưa trả lời]'}
              </div>
            </div>

            <div style={{ border: '1px solid var(--text-primary)', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--rounded-lg)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ color: 'var(--text-secondary)', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                ĐÁP ÁN ĐÚNG
              </div>
              <div style={{ fontWeight: '700', color: 'var(--success)', marginTop: '4px', fontSize: '14px' }}>
                {subQ.correctOption}
              </div>
            </div>
          </div>

          {/* Explanation box */}
          <div className="review-explanation-box bg-primary/[0.02] border-l-4 border-primary p-4 rounded text-xs leading-relaxed text-text-secondary" style={{ marginTop: '0', borderLeft: '4px solid var(--primary)', backgroundColor: 'rgba(78,86,192,0.02)', padding: '16px', borderRadius: 'var(--rounded-md)' }}>
            <strong style={{ color: 'var(--text-primary)', fontSize: '13.5px', display: 'block', marginBottom: '6px' }}>
              Giải thích từ Admin:
            </strong>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <strong>Trích dẫn trong bài đọc:</strong>
              <br />
              "{subQ.explanation || 'No explanation available.'}"
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
