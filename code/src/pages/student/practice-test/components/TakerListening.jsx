import { useState, useEffect } from 'react'

export default function TakerListening({ question, answers, onChangeAnswer }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(20) // Simulated progress starting at 20%
  const [currentTime, setCurrentTime] = useState(65) // 01:05
  const duration = 330 // 05:30
  
  // Pagination for sub-questions
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 2
  const [activeSection, setActiveSection] = useState('Section 1')

  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            return duration
          }
          const next = prev + 1
          setProgress((next / duration) * 100)
          return next
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (!question) return null

  const subQuestions = question.subQuestions || []
  const totalPages = Math.ceil(subQuestions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentSubQuestions = subQuestions.slice(startIndex, currentPage * itemsPerPage)

  return (
    <div className="flex flex-col gap-4">
      {/* Listening sub navigation matching Figma */}
      <div className="custom-subtab-container mb-4">
        <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginRight: '8px' }}>
          Phần nghe:
        </span>
        {['Section 1', 'Section 2', 'Section 3', 'Section 4'].map((sec) => {
          const isActive = activeSection === sec
          return (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`custom-subtab-item ${isActive ? 'active' : ''}`}
            >
              {sec}
            </button>
          )
        })}
      </div>

      <div className="split-layout-grid">
        {/* Left Column: Audio Player (NO notepad) */}
        <div className="split-panel">
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {activeSection.toUpperCase()}
          </span>
          <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
            {question.passageTitle || 'Customer Survey'}
          </h3>

          <div style={{ backgroundColor: 'rgba(78,86,192,0.03)', border: '1px solid rgba(78,86,192,0.1)', borderRadius: 'var(--rounded-lg)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
            <span style={{ fontWeight: '700', fontSize: '13px', color: 'var(--text-secondary)' }}>
              [ Trình phát âm thanh đề thi .mp3 ]
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="icon-btn" 
                style={{ background: 'var(--primary)', color: '#fff', border: 'none', width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
              >
                {isPlaying ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '2px' }}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                )}
              </button>
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ background: 'rgba(78,86,192,0.1)', height: '6px', borderRadius: '3px', position: 'relative' }}>
                  <div style={{ background: 'var(--primary)', width: `${progress}%`, height: '100%', borderRadius: '3px', transition: 'width 0.1s linear' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Questions */}
        <div className="split-panel">
          <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>
            Questions 1-{subQuestions.length}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '-4px' }}>
            Choose the correct answer A, B, or C.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '8px' }}>
            {currentSubQuestions.map((subQ, idx) => {
              const absoluteIndex = startIndex + idx
              const selectedVal = answers[subQ.id]

              return (
                <div 
                  key={subQ.id} 
                  style={{ 
                    display: 'flex', 
                    gap: '12px', 
                    alignItems: 'flex-start',
                    borderTop: idx > 0 ? '1px dashed rgba(78,86,192,0.08)' : 'none',
                    paddingTop: idx > 0 ? '16px' : '0'
                  }}
                >
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '12px', flexShrink: 0, marginTop: '2px' }}>
                    {absoluteIndex + 1}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexGrow: 1 }}>
                    <span style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)' }}>
                      {subQ.content}
                    </span>
                    {subQ.options.map((option, optIdx) => {
                      const isActive = selectedVal === option
                      return (
                        <div 
                          key={optIdx}
                          onClick={() => onChangeAnswer(subQ.id, option)}
                          className={`taker-option-label ${isActive ? 'active' : ''}`}
                          style={{ padding: '10px 14px', borderRadius: 'var(--rounded-md)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}
                        >
                          <div className="taker-option-radio" />
                          <span>{option}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {/* Pagination for Questions */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px', borderTop: '1px solid rgba(78,86,192,0.08)', paddingTop: '16px' }}>
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
          </div>
        </div>
      </div>
    </div>
  )
}
