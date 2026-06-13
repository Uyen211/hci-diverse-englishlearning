import { useState } from 'react'

export default function TakerMcq({ questions, answers, onChangeAnswer }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 2

  if (!questions || questions.length === 0) return null

  const totalPages = Math.ceil(questions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentQuestions = questions.slice(startIndex, currentPage * itemsPerPage)

  const getLetter = (idx) => String.fromCharCode(65 + idx) // A, B, C, D...

  const renderPageButtons = () => {
    const buttons = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i)
      }
    } else {
      if (currentPage <= 2) {
        buttons.push(1, 2, 3, '...', totalPages)
      } else if (currentPage === 3) {
        buttons.push(1, 2, 3, 4, '...', totalPages)
      } else if (currentPage > 3 && currentPage < totalPages - 2) {
        buttons.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      } else if (currentPage === totalPages - 2) {
        buttons.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        buttons.push(1, '...', totalPages - 2, totalPages - 1, totalPages)
      }
    }
    return buttons.map((item, idx) => {
      if (item === '...') {
        return <span key={`dots-${idx}`} className="text-text-secondary text-xs font-bold px-1.5">...</span>
      }
      return (
        <button
          key={`page-${item}`}
          onClick={() => setCurrentPage(item)}
          className={`page-btn ${
            currentPage === item
              ? 'active'
              : ''
          }`}
        >
          {item}
        </button>
      )
    })
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Subheader Info Bar matching Figma */}
      <div className="page-header-row flex justify-between items-center mb-1 flex-wrap gap-2">
        <span className="font-bold text-sm text-text-primary">
          Phần thi: Trắc nghiệm (Vocabulary & Grammar)
        </span>
        <span className="text-xs text-text-secondary font-semibold">
          Đang hiển thị trang {currentPage} trong số {totalPages} trang ({itemsPerPage} câu/trang)
        </span>
      </div>

      {/* MCQ Content Box */}
      <div className="config-card flex flex-col bg-surface p-7 rounded-xl border border-border shadow-glow" style={{ gap: '28px' }}>
        {currentQuestions.map((q, idx) => {
          const absoluteIndex = startIndex + idx
          const selectedOption = answers[q.id]

          return (
            <div key={q.id} className="flex flex-col gap-6">
              {idx > 0 && (
                <div style={{ borderTop: '1px dashed rgba(78,86,192,0.1)', width: '100%', marginBottom: '12px' }} />
              )}
              <div className="flex gap-4 items-start">
                {/* Index number badge */}
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-extrabold shrink-0 mt-0.5 text-sm">
                  {absoluteIndex + 1}
                </div>
                <div className="flex flex-col gap-4 flex-grow">
                  {/* Question title */}
                  <h4 className="font-heading font-extrabold text-text-primary text-base leading-relaxed">
                    {q.content}
                  </h4>

                  {/* Options list */}
                  <div className="flex flex-col gap-2.5">
                    {q.options.map((option, optIdx) => {
                      const letter = getLetter(optIdx)
                      const isActive = selectedOption === option

                      return (
                        <div
                          key={optIdx}
                          onClick={() => onChangeAnswer(q.id, option)}
                          className={`taker-option-label flex items-center gap-3 p-3.5 border rounded-lg cursor-pointer transition-all duration-200 select-none ${
                            isActive
                              ? 'active'
                              : ''
                          }`}
                        >
                          <div className="taker-option-radio" />
                          <span className="font-bold text-xs uppercase tracking-wide opacity-75">{letter}.</span>
                          <span className="font-semibold text-xs">{option}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Bottom pagination row */}
        <div className="page-header-row flex justify-between items-center" style={{ borderTop: '1px solid rgba(78,86,192,0.08)', paddingTop: '16px', marginTop: '8px' }}>
          <div />
          <div className="pagination-container flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`}
            >
              &lt;
            </button>
            {renderPageButtons()}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
