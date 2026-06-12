import { useState } from 'react'

export default function TakerWriting({ question, answers, onChangeAnswer }) {
  const defaultText = question.userEssayTemplate || ''
  const [essayText, setEssayText] = useState(answers[question.id] || defaultText)
  const [activeTask, setActiveTask] = useState('Writing Task 1')

  const countWords = (text) => {
    if (!text.trim()) return 0
    return text.trim().split(/\s+/).length
  }

  const wordCount = countWords(essayText)
  const minWords = question.minWords || 150
  const isGoalMet = wordCount >= minWords

  const handleTextChange = (e) => {
    const text = e.target.value
    setEssayText(text)
    if (onChangeAnswer) {
      onChangeAnswer(question.id, text)
    }
  }

  if (!question) return null

  return (
    <div className="flex flex-col gap-4">
      {/* Writing task sub navigation matching Figma */}
      <div className="custom-subtab-container mb-4">
        <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginRight: '8px' }}>
          Phần viết luận:
        </span>
        {['Writing Task 1', 'Writing Task 2'].map((tsk) => {
          const isActive = activeTask === tsk
          return (
            <button
              key={tsk}
              onClick={() => setActiveTask(tsk)}
              className={`custom-subtab-item ${isActive ? 'active' : ''}`}
            >
              {tsk}
            </button>
          )
        })}
      </div>

      <div className="split-layout-grid">
        {/* Left Column: Writing task details */}
        <div className="split-panel" style={{ gap: '12px' }}>
          <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '16px', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase' }}>
            {activeTask}
          </h3>
          <p style={{ fontSize: '14px', fontWeight: '700', lineHeight: '1.6', color: 'var(--text-primary)', margin: 0 }}>
            {question.prompt}
          </p>
          <div style={{ backgroundColor: 'rgba(78,86,192,0.04)', border: '1px solid rgba(78,86,192,0.1)', borderRadius: 'var(--rounded-lg)', padding: '12px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '600' }}>
            <span>Yêu cầu tối thiểu: {minWords} từ</span>
          </div>

          {/* SVG Bar Chart representing Energy Usage Chart matching Figma 100% */}
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(78,86,192,0.1)', borderRadius: 'var(--rounded-lg)', padding: '16px', marginTop: '8px' }}>
            <h4 style={{ fontFamily: 'var(--font-primary)', fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px', textAlign: 'center' }}>
              Household Energy Consumption 2026
            </h4>
            <svg width="100%" height="150" viewBox="0 0 400 150" style={{ overflow: 'visible' }}>
              {/* Gridlines */}
              <line x1="50" y1="20" x2="380" y2="20" stroke="rgba(78,86,192,0.06)" strokeDasharray="3,3" />
              <line x1="50" y1="50" x2="380" y2="50" stroke="rgba(78,86,192,0.06)" strokeDasharray="3,3" />
              <line x1="50" y1="80" x2="380" y2="80" stroke="rgba(78,86,192,0.06)" strokeDasharray="3,3" />
              <line x1="50" y1="110" x2="380" y2="110" stroke="rgba(78,86,192,0.12)" strokeWidth="1.5" />
              
              {/* Y-Axis Labels */}
              <text x="40" y="24" fontFamily="var(--font-primary)" fontSize="9" fontWeight="600" fill="var(--text-secondary)" textAnchor="end">60%</text>
              <text x="40" y="54" fontFamily="var(--font-primary)" fontSize="9" fontWeight="600" fill="var(--text-secondary)" textAnchor="end">40%</text>
              <text x="40" y="84" fontFamily="var(--font-primary)" fontSize="9" fontWeight="600" fill="var(--text-secondary)" textAnchor="end">20%</text>
              <text x="40" y="114" fontFamily="var(--font-primary)" fontSize="9" fontWeight="600" fill="var(--text-secondary)" textAnchor="end">0%</text>
              
              {/* Bars */}
              {/* Heating (60%) -> height 90 (110 - 90 = 20) */}
              <rect x="70" y="20" width="25" height="90" fill="url(#primaryGradTaker)" rx="2" />
              {/* Water Heating (15%) -> height 22.5 (110 - 22.5 = 87.5) */}
              <rect x="135" y="87.5" width="25" height="22.5" fill="var(--secondary)" rx="2" />
              {/* Appliances (12%) -> height 18 (110 - 18 = 92) */}
              <rect x="200" y="92" width="25" height="18" fill="var(--accent)" rx="2" />
              {/* Lighting (8%) -> height 12 (110 - 12 = 98) */}
              <rect x="265" y="98" width="25" height="12" fill="var(--success)" rx="2" />
              {/* Cooling (5%) -> height 7.5 (110 - 7.5 = 102.5) */}
              <rect x="330" y="102.5" width="25" height="7.5" fill="var(--warning)" rx="2" />
              
              {/* X-Axis Labels */}
              <text x="82.5" y="124" fontFamily="var(--font-primary)" fontSize="8" fontWeight="700" fill="var(--text-primary)" textAnchor="middle">Heating</text>
              <text x="147.5" y="124" fontFamily="var(--font-primary)" fontSize="8" fontWeight="700" fill="var(--text-primary)" text-anchor="middle">Water H.</text>
              <text x="212.5" y="124" fontFamily="var(--font-primary)" fontSize="8" fontWeight="700" fill="var(--text-primary)" text-anchor="middle">Appliances</text>
              <text x="277.5" y="124" fontFamily="var(--font-primary)" fontSize="8" fontWeight="700" fill="var(--text-primary)" text-anchor="middle">Lighting</text>
              <text x="342.5" y="124" fontFamily="var(--font-primary)" fontSize="8" fontWeight="700" fill="var(--text-primary)" text-anchor="middle">Cooling</text>

              <defs>
                <linearGradient id="primaryGradTaker" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--secondary)" />
                  <stop offset="100%" stopColor="var(--primary)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Right Column: Essay editor */}
        <div className="split-panel" style={{ gap: '12px' }}>
          <label style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)' }}>
            Nhập bài viết luận của bạn *
          </label>
          <textarea
            value={essayText}
            onChange={handleTextChange}
            className="writing-textarea"
            rows="11"
            placeholder="Bắt đầu viết bài viết của bạn ở đây..."
          />
          <div style={{ display: 'flex', justifyCcontent: 'space-between', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', borderTop: '1px solid rgba(78,86,192,0.08)', paddingTop: '10px' }}>
            <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>
              Số từ đã viết: {wordCount} từ
            </span>
            {isGoalMet ? (
              <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                ✔ Đạt yêu cầu tối thiểu (150 từ)
              </span>
            ) : (
              <span style={{ color: 'var(--warning)' }}>
                Chưa đủ từ tối thiểu (Cần thêm {Math.max(0, minWords - wordCount)} từ)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
