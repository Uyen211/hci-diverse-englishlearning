export default function ReviewSpeaking({ question }) {
  if (!question) return null

  return (
    <div className="split-layout-grid grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
      {/* Left panel: Dialogue transcript with annotations */}
      <div className="split-panel bg-surface p-6 rounded-xl border border-border shadow-glow flex flex-col gap-4">
        <h3 className="font-heading font-extrabold text-text-primary text-base uppercase tracking-wider block">
          Bản ghi cuộc đối thoại (Transcript lỗi)
        </h3>
        <span className="text-text-secondary text-xs italic block mt-[-8px]">
          Tình huống: {question.situation}
        </span>

        {/* Dialogues list */}
        <div className="dialogue-bubble-list flex flex-col gap-4 mt-2">
          {/* Loop dialogues and inject correction highlights */}
          {question.dialogue?.map((bubble, idx) => {
            const isAI = bubble.sender.includes('AI')
            
            if (isAI) {
              return (
                <div key={idx} className="dialogue-bubble ai bg-primary/[0.04] text-text-primary p-4 rounded-xl max-w-[90%] self-start border-bl-none flex flex-col gap-1">
                  <span className="font-extrabold text-xs text-primary">{bubble.sender}:</span>
                  <span className="text-sm font-semibold leading-relaxed">{bubble.text}</span>
                </div>
              )
            } else {
              // Highlight the grammatical mistake manually for premium display
              let textNode = <span>{bubble.text}</span>
              if (bubble.text.includes('have compile')) {
                textNode = (
                  <span>
                    Yes, John. I <span className="corrected-text-marker border-b-2 border-dashed border-error text-error font-semibold cursor-help" title={`Lỗi: ${bubble.error}`}>have compile</span> the data reports.
                  </span>
                )
              } else if (bubble.text.includes('rises by')) {
                textNode = (
                  <span>
                    Yes, it <span className="corrected-text-marker border-b-2 border-dashed border-error text-error font-semibold cursor-help" title={`Lỗi: ${bubble.error}`}>rises by</span> fifteen percent in the city center.
                  </span>
                )
              }

              return (
                <div key={idx} className="dialogue-bubble user bg-primary text-white p-4 rounded-xl max-w-[85%] self-end border-br-none flex flex-col gap-1.5 shadow-glow">
                  <span className="font-extrabold text-xs text-accent-foreground/85">Bạn (Học viên):</span>
                  <span className="text-sm font-medium leading-relaxed">{textNode}</span>
                  {bubble.error && (
                    <span className="text-error font-bold text-xs bg-white/90 px-2 py-1 rounded w-fit self-end mt-1">
                      👉 Lỗi: {bubble.error}
                    </span>
                  )}
                </div>
              )
            }
          })}
        </div>
      </div>

      {/* Right panel: AI examiner feedback */}
      <div className="split-panel bg-surface p-6 rounded-xl border border-border shadow-glow flex flex-col gap-5">
        <h3 className="font-heading font-extrabold text-text-primary text-base uppercase tracking-wider block">
          Nhận xét chung từ AI Examiner
        </h3>

        <div className="review-item-card bg-surface border-l-4 border-secondary p-5 rounded-xl shadow-glow flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-border pb-3">
            <span className="font-bold text-sm text-text-secondary">Điểm quy đổi:</span>
            <span className="font-heading font-extrabold text-2xl text-secondary">
              6.5 / 9.0
            </span>
          </div>

          <div className="text-xs font-semibold text-text-secondary flex flex-col gap-3">
            <div className="flex gap-2.5 items-start">
              <span className="text-success text-sm shrink-0">✔</span>
              <span className="leading-relaxed">Phản xạ nhanh, nói chuyện liên tục tốt.</span>
            </div>
            <div className="flex gap-2.5 items-start">
              <span className="text-error text-sm shrink-0">✕</span>
              <span className="leading-relaxed">Phát âm tương đối rõ nhưng gặp lỗi nhỏ về ngữ pháp thời thì và chia phân từ hai ở một số lượt thoại.</span>
            </div>
            <div className="flex gap-2.5 items-start">
              <span className="text-primary text-sm shrink-0">ℹ</span>
              <span className="leading-relaxed">Cần chú ý cách chia động từ sau các trợ động từ như "have".</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
