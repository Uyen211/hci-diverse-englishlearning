export function SentenceScrambleConfig({ register, errors }) {
  return (
    <>
      <div className="premium-card-title border-b border-border pb-3">
        <span className="font-heading text-base font-bold text-text-primary">Thiết lập Ghép câu (Từ bị xáo trộn)</span>
      </div>

      <div className="form-group flex flex-col gap-1.5">
        <label className="text-sm font-bold text-text-primary">Câu mẫu đích chuẩn *</label>
        <textarea 
          className="w-full p-2.5 border border-input rounded-lg text-[15px]" 
          rows={2} 
          {...register('correctSentence')} 
          placeholder="We need to collaborate with other teams to finish the project." 
        />
        {errors.correctSentence && <span className="text-xs text-error">{errors.correctSentence.message}</span>}
      </div>

      <div className="form-group flex flex-col gap-1.5">
        <label className="text-sm font-bold text-text-primary">Thiết lập các từ/cụm từ xáo trộn để ghép (Ngăn cách bằng dấu '/') *</label>
        <input 
          type="text" 
          className="w-full p-2.5 border border-input rounded-lg text-[15px] font-mono" 
          {...register('scrambledWords')} 
          placeholder="We / need / to collaborate / with / other teams / to finish / the project." 
        />
        {errors.scrambledWords && <span className="text-xs text-error">{errors.scrambledWords.message}</span>}
      </div>

      <div className="form-group flex flex-col gap-1.5">
        <label className="text-sm font-bold text-text-primary">Bản dịch / Gợi ý tiếng Việt</label>
        <input 
          type="text" 
          className="w-full p-2.5 border border-input rounded-lg text-[15px]" 
          {...register('translationPrompt')} 
          placeholder="Chúng ta cần hợp tác với các nhóm khác để hoàn thành dự án." 
        />
      </div>
    </>
  );
}

export function AiEssayConfig({ register, errors, scoringCriteria, handleCriteriaToggle }) {
  return (
    <>
      <div className="premium-card-title border-b border-border pb-3">
        <span className="font-heading text-base font-bold text-text-primary">Thiết lập Viết luận chấm điểm bằng AI</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group flex flex-col gap-1.5">
          <label className="text-sm font-bold text-text-primary">Dạng bài viết luận *</label>
          <select 
            className="w-full p-2.5 border border-input rounded-lg text-[15px] bg-surface outline-none focus:border-primary" 
            {...register('essayCategory')}
          >
            <option value="IELTS Academic Writing Task 2">IELTS Academic Writing Task 2</option>
            <option value="IELTS General Writing Task 2">IELTS General Writing Task 2</option>
            <option value="TOEIC Writing Section Essay">TOEIC Writing Section Essay</option>
            <option value="VSTEP Task 2 Essay">VSTEP Task 2 Essay</option>
          </select>
        </div>
        <div className="form-group flex flex-col gap-1.5 max-w-[150px]">
          <label className="text-sm font-bold text-text-primary">Từ tối thiểu *</label>
          <input 
            type="number" 
            className="w-full p-2.5 border border-input rounded-lg text-[15px]" 
            {...register('minWords')} 
          />
          {errors.minWords && <span className="text-xs text-error">{errors.minWords.message}</span>}
        </div>
      </div>

      <div className="form-group flex flex-col gap-1.5">
        <label className="text-sm font-bold text-text-primary">Đề bài viết luận *</label>
        <textarea 
          className="w-full p-2.5 border border-input rounded-lg text-[15px]" 
          rows={3} 
          {...register('essayPrompt')} 
          placeholder="Some people believe that scientific research is more successful when researchers collaborate..." 
        />
        {errors.essayPrompt && <span className="text-xs text-error">{errors.essayPrompt.message}</span>}
      </div>

      <div className="form-group flex flex-col gap-2">
        <label className="text-sm font-bold text-text-primary">Chọn tiêu chí chấm điểm của AI *</label>
        <div className="custom-checkbox-grid grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Task Response',
            'Coherence & Cohesion',
            'Lexical Resource',
            'Grammatical Range & Accuracy'
          ].map((criterion) => {
            const isActive = scoringCriteria.includes(criterion);
            return (
              <button
                type="button"
                key={criterion}
                onClick={() => handleCriteriaToggle(criterion)}
                className={`flex items-center gap-3 p-1 rounded cursor-pointer text-left ${isActive ? 'font-bold text-text-primary' : 'text-text-secondary'}`}
              >
                <span className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-primary border-primary text-surface' : 'bg-surface border-text-secondary/35'}`}>
                  {isActive && (
                    <svg className="w-3.5 h-3.5 text-surface" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className="text-sm">{criterion}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="form-group flex flex-col gap-1.5">
        <label className="text-sm font-bold text-text-primary">Bài viết luận mẫu (Band 8.0+) để AI đối sánh và hiển thị *</label>
        <textarea 
          className="w-full p-2.5 border border-input rounded-lg text-[15px]" 
          rows={4} 
          {...register('modelEssay')} 
          placeholder="Collaborative efforts in scientific research have become..." 
        />
        {errors.modelEssay && <span className="text-xs text-error">{errors.modelEssay.message}</span>}
      </div>
    </>
  );
}
