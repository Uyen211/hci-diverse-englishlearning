export default function ReviewWriting({ question, answer }) {
  if (!question) return null

  // Format student essay with highlights
  const getAnnotatedEssay = () => {
    const defaultVal = answer || question.userEssayTemplate || ''
    
    // Replace mistakes with highlighted spans for figma compliance
    if (defaultVal.includes('is have') || defaultVal.includes('lacks')) {
      return (
        <span>
          In my opinion, online learning{' '}
          <span className="corrected-text-marker border-b-2 border-dashed border-error text-error bg-error/5 px-1 font-semibold cursor-help" title="Lỗi: thừa 'is' trước động từ thường 'have'">
            is have
          </span>{' '}
          more benefits than normal school. However, students may{' '}
          <span className="corrected-text-marker border-b-2 border-dashed border-error text-error bg-error/5 px-1 font-semibold cursor-help" title="Lỗi: chủ ngữ số nhiều 'students' đi với động từ thêm 's'">
            lacks
          </span>{' '}
          face-to-face interaction and self-discipline...
        </span>
      )
    }

    return <span>{defaultVal}</span>
  }

  return (
    <div className="split-layout-grid grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Left Column: User Essay with annotations & Admin Feedback */}
      <div className="split-panel bg-surface p-6 rounded-xl border border-border shadow-glow flex flex-col gap-4">
        <h3 className="font-heading font-extrabold text-text-primary text-base uppercase tracking-wider block">
          Bài viết đã nộp
        </h3>
        
        {/* Essay text block */}
        <div className="passage-text-block text-sm leading-relaxed text-text-primary bg-background/50 border border-border/80 rounded-xl p-4 min-h-[180px] pr-3 text-justify">
          {getAnnotatedEssay()}
        </div>

        {/* Admin Feedback block */}
        <div className="review-explanation-box bg-primary/[0.02] border-l-4 border-primary p-4 rounded text-xs leading-relaxed text-text-secondary mt-2">
          <strong className="text-text-primary text-sm font-heading block mb-1">Đánh giá từ giám khảo:</strong>
          <span>
            Bài viết có ý tưởng tốt nhưng gặp lỗi cơ bản về chia động từ và cấu trúc. Hãy ôn tập kỹ thì hiện tại đơn và các liên từ chuyển ý.
          </span>
        </div>
      </div>

      {/* Right Column: AI Evaluation and Sample Essay */}
      <div className="split-panel bg-surface p-6 rounded-xl border border-border shadow-glow flex flex-col gap-5">
        <div className="flex justify-between items-center border-b border-border pb-3">
          <span className="font-heading font-extrabold text-sm text-text-primary uppercase tracking-wider">
            Bảng điểm thành phần:
          </span>
          <span className="font-heading font-extrabold text-lg text-primary">
            Band: 6.0
          </span>
        </div>

        {/* Score Breakdown details matching Figma */}
        <div className="flex flex-col gap-3 font-semibold text-xs text-text-secondary bg-primary/[0.01] border border-border/60 p-4 rounded-xl">
          <div className="flex justify-between border-b border-border/40 pb-2">
            <span>Task Response:</span>
            <strong className="text-text-primary">6.5</strong>
          </div>
          <div className="flex justify-between border-b border-border/40 pb-2">
            <span>Coherence & Cohesion:</span>
            <strong className="text-text-primary">6.0</strong>
          </div>
          <div className="flex justify-between border-b border-border/40 pb-2">
            <span>Lexical Resource:</span>
            <strong className="text-text-primary">6.0</strong>
          </div>
          <div className="flex justify-between">
            <span>Grammar Accuracy:</span>
            <strong className="text-error">5.5</strong>
          </div>
        </div>

        {/* Sample Essay Section */}
        <div className="border-t border-border/60 pt-4 flex flex-col gap-2">
          <h4 className="font-heading font-bold text-xs text-primary uppercase tracking-wider">
            Bài viết mẫu tham khảo (Band 8.0+)
          </h4>
          <div className="passage-text-block text-xs leading-relaxed text-text-secondary overflow-y-auto max-h-[140px] pr-2 text-justify bg-background/30 border border-border/40 p-3 rounded">
            {question.sampleEssay || 'In the contemporary era, online education has emerged as a popular alternative to traditional learning methods. On the one hand, it offers unprecedented flexibility and convenience, allowing students to learn at their own pace. On the other hand, it may lack the face-to-face interaction that is essential for social development...'}
          </div>
        </div>
      </div>
    </div>
  )
}
