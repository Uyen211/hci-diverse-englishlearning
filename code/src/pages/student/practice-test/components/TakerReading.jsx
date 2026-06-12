import { useState } from 'react'

export default function TakerReading({ question, answers, onChangeAnswer }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 2
  const [activePassage, setActivePassage] = useState('Passage 1')

  if (!question) return null

  // Process text paragraphs
  const paragraphs = question.passageContent?.split('\n') || []
  const subQuestions = question.subQuestions || []
  const totalPages = Math.ceil(subQuestions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentSubQuestions = subQuestions.slice(startIndex, currentPage * itemsPerPage)

  return (
    <div className="flex flex-col gap-4">
      {/* Passage sub navigation matching Figma */}
      <div className="custom-subtab-container mb-4">
        <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginRight: '8px' }}>
          Bài đọc:
        </span>
        {['Passage 1', 'Passage 2', 'Passage 3'].map((pas) => {
          const isActive = activePassage === pas
          return (
            <button
              key={pas}
              onClick={() => setActivePassage(pas)}
              className={`custom-subtab-item ${isActive ? 'active' : ''}`}
            >
              {pas}
            </button>
          )
        })}
      </div>

      <div className="split-layout-grid">
        {/* Left: Passage */}
        <div className="split-panel">
          <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '16px', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase' }}>
            {activePassage.toUpperCase()}
          </h3>
          <h2 style={{ fontFamily: 'var(--font-primary)', fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '-8px' }}>
            {question.passageTitle || 'The Evolution of Working Remotely: A New Era of Productivity'}
          </h2>
          <div className="passage-text-block" style={{ maxHeight: '420px', overflowY: 'auto' }}>
            {paragraphs.map((p, idx) => (
              <p key={idx} style={{ marginBottom: '12px' }}>{p}</p>
            ))}
          </div>
        </div>

        {/* Right: Questions */}
        <div className="split-panel">
          <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '16px', fontWeight: '700', color: 'var(--text-secondary)' }}>
            Questions 1-{subQuestions.length}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '-8px', marginBottom: '12px' }}>
            Which paragraph contains the following information?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {currentSubQuestions.map((subQ, idx) => {
              const absoluteIndex = startIndex + idx
              const selectedVal = answers[subQ.id]

              return (
                <div 
                  key={subQ.id}
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '8px',
                    borderTop: idx > 0 ? '1px dashed rgba(78,86,192,0.08)' : 'none',
                    paddingTop: idx > 0 ? '16px' : '0'
                  }}
                >
                  <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)' }}>
                    {absoluteIndex + 1}. {subQ.content}
                  </div>
                  {/* Horizontal radio row layout matching Figma */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {subQ.options.map((option, optIdx) => {
                      const letter = String.fromCharCode(65 + optIdx)
                      const isActive = selectedVal === option

                      return (
                        <div
                          key={optIdx}
                          onClick={() => onChangeAnswer(subQ.id, option)}
                          className={`taker-option-label ${isActive ? 'active' : ''}`}
                          style={{ padding: '8px 16px', borderRadius: 'var(--rounded-md)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}
                        >
                          <div className="taker-option-radio" />
                          <span>{letter}. {option}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {/* Pagination for Questions */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyCenter: 'center', justifyContent: 'center', gap: '8px', marginTop: '24px', borderTop: '1px solid rgba(78,86,192,0.08)', paddingTop: '16px' }}>
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`}
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
