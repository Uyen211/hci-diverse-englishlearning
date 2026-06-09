export function FocusModeConfig({ register, watch, errors, handleWordToggle, fullSentenceText }) {
  return (
    <>
      <div className="premium-card-title border-b border-border pb-3">
        <span className="font-heading text-base font-bold text-text-primary">Thiết lập Ngữ pháp: Focus Mode (Lược bỏ bớt thông tin gây nhiễu)</span>
      </div>

      <div className="form-group flex flex-col gap-1.5">
        <label className="text-sm font-bold text-text-primary">Cấu trúc ngữ pháp mục tiêu *</label>
        <input 
          type="text" 
          className="w-full p-2.5 border border-input rounded-lg text-[15px]" 
          {...register('targetStructure')} 
          placeholder="Ví dụ: S + wish + S + V-past" 
        />
        {errors.targetStructure && <span className="text-xs text-error">{errors.targetStructure.message}</span>}
      </div>

      <div className="form-group flex flex-col gap-1.5">
        <label className="text-sm font-bold text-text-primary">Câu ví dụ đầy đủ *</label>
        <input 
          type="text" 
          className="w-full p-2.5 border border-input rounded-lg text-[15px] font-semibold text-primary" 
          {...register('fullSentence')} 
          placeholder="I wish I had more time to collaborate..." 
        />
        {errors.fullSentence && <span className="text-xs text-error">{errors.fullSentence.message}</span>}
      </div>

      {fullSentenceText.trim().length > 0 && (
        <div className="form-group flex flex-col gap-2">
          <label className="text-sm font-bold text-text-primary">Chọn các thành phần phụ cần ẩn (Tích chọn để ẩn đi khi vào chế độ Focus) *</label>
          <div className="focus-badges-container flex flex-wrap gap-2.5 p-4 bg-gray-50 border border-border/80 rounded-lg">
            {fullSentenceText.split(' ').map((word, wordIdx) => {
              // Strip punctuation
              const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"");
              const isSelected = (watch('hiddenWords') || []).includes(cleanWord);
              
              return (
                <button
                  type="button"
                  key={wordIdx}
                  onClick={() => handleWordToggle(cleanWord)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${isSelected ? 'bg-primary/10 border-primary text-primary font-bold' : 'bg-surface border-border text-text-secondary hover:bg-gray-50'}`}
                >
                  <span className={`w-3.5 h-3.5 border rounded flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-primary border-primary text-surface' : 'bg-surface border-text-secondary/35'}`}>
                    {isSelected && (
                      <svg className="w-2.5 h-2.5 text-surface" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span>{word}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export function PatternConfig({
  register,
  errors,
  patterns,
  addPattern,
  removePattern,
  updatePattern,
  questions,
  activeQuestionIndex,
  setActiveQuestionIndex,
  addQuestion,
  removeQuestion,
  updateQuestion,
  addOption,
  removeOption,
  updateOption
}) {
  return (
    <>
      <div className="premium-card-title flex justify-between items-center border-b border-border pb-3">
        <span className="font-heading text-base font-bold text-text-primary">Thiết lập Nhận diện khuôn mẫu Ngữ pháp (Pattern Recognition)</span>
      </div>

      <div className="form-group flex flex-col gap-1.5 max-w-sm">
        <label className="text-sm font-bold text-text-primary">Cấu trúc ngữ pháp mục tiêu *</label>
        <input 
          type="text" 
          className="w-full p-2.5 border border-input rounded-lg text-[15px]" 
          {...register('targetStructure')} 
          placeholder="Ví dụ: S + suggest + V-ing" 
        />
        {errors.targetStructure && <span className="text-xs text-error">{errors.targetStructure.message}</span>}
      </div>

      {/* 1. Similar Grammar Pattern Examples */}
      <div className="flex justify-between items-center mt-2">
        <label className="text-sm font-bold text-text-primary">1. Nhập các câu ví dụ có khuôn mẫu tương đồng *</label>
        <button 
          type="button" 
          onClick={addPattern} 
          className="px-3 py-1 bg-surface text-primary border border-primary/20 text-xs font-bold rounded-lg hover:bg-gray-50"
        >
          + Thêm câu ví dụ
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {patterns.map((p) => (
          <div key={p.id} className="flex gap-3 items-center">
            <input
              type="text"
              className="flex-grow p-2.5 border border-input rounded-lg text-[15px] bg-surface"
              value={p.text}
              onChange={(e) => updatePattern(p.id, e.target.value)}
              placeholder="Ví dụ: He suggested collaborating on the project."
            />
            <button
              type="button"
              onClick={() => removePattern(p.id)}
              className="w-9 h-9 rounded bg-error/5 border border-error/15 text-error flex items-center justify-center hover:bg-error/10 flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* 2. Rule deduction MCQ questions */}
      <div className="text-sm font-bold text-text-primary mt-4">2. Cấu hình câu hỏi trắc nghiệm đúc rút quy luật *</div>

      <div className="sub-pagination-bar bg-gray-50 border border-border rounded-lg p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-text-secondary">Câu hỏi nhỏ:</span>
          <div className="flex gap-1.5">
            {questions.map((_, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => setActiveQuestionIndex(idx)}
                className={`w-7 h-7 rounded text-xs font-bold flex items-center justify-center border ${activeQuestionIndex === idx ? 'bg-primary border-primary text-surface' : 'bg-surface border-border text-text-primary hover:bg-gray-50'}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={addQuestion}
            className="px-2.5 py-1 text-xs border border-primary/20 bg-primary/5 text-primary rounded-md font-bold hover:bg-primary/10"
          >
            + Thêm
          </button>
          {questions.length > 1 && (
            <button
              type="button"
              onClick={() => removeQuestion(activeQuestionIndex)}
              className="px-2.5 py-1 text-xs border border-error/20 bg-error/5 text-error rounded-md font-bold hover:bg-error/10"
            >
              Xóa câu này
            </button>
          )}
        </div>
      </div>

      {questions[activeQuestionIndex] && (
        <div className="sub-card-box p-4 bg-gray-50 rounded-lg border border-border flex flex-col gap-4">
          <div className="form-group flex flex-col gap-1">
            <label className="text-sm font-bold text-text-primary">Câu hỏi đúc rút quy luật *</label>
            <input
              type="text"
              className="w-full p-2.5 border border-input rounded-lg text-[15px] bg-surface"
              value={questions[activeQuestionIndex].question}
              onChange={(e) => updateQuestion(activeQuestionIndex, 'question', e.target.value)}
              placeholder="Cấu trúc ngữ pháp đúng sau suggest khi đề xuất hành động là gì?"
            />
          </div>

          <div className="form-group flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-text-primary">Các phương án chọn lựa và đáp án đúng *</label>
              <button
                type="button"
                onClick={() => addOption(activeQuestionIndex)}
                className="text-[11px] font-bold text-primary hover:underline"
              >
                + Thêm phương án
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {questions[activeQuestionIndex].options.map((opt, optIdx) => {
                const isCorrect = questions[activeQuestionIndex].correctOption === opt && opt !== '';
                
                return (
                  <div key={optIdx} className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateQuestion(activeQuestionIndex, 'correctOption', opt)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isCorrect ? 'border-success' : 'border-text-secondary/35'}`}
                    >
                      {isCorrect && <span className="w-2.5 h-2.5 rounded-full bg-success" />}
                    </button>
                    <input
                      type="text"
                      className="flex-grow p-2 border border-input rounded text-[15px] bg-surface"
                      value={opt}
                      onChange={(e) => {
                        updateOption(activeQuestionIndex, optIdx, e.target.value);
                        if (isCorrect) {
                          updateQuestion(activeQuestionIndex, 'correctOption', e.target.value);
                        }
                      }}
                      placeholder={`Phương án ${optIdx + 1}`}
                    />
                    {isCorrect && <span className="bg-success/15 text-success text-[10px] font-bold px-2 py-1 rounded">Đáp án đúng</span>}
                    {questions[activeQuestionIndex].options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(activeQuestionIndex, optIdx)}
                        className="w-7 h-7 text-error bg-error/5 border border-error/15 rounded flex items-center justify-center"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="form-group flex flex-col gap-1">
            <label className="text-sm font-bold text-text-primary">Giải thích đáp án cho câu hỏi nhỏ này *</label>
            <textarea
              className="w-full p-2 border border-input rounded text-[15px] bg-surface"
              rows={2}
              value={questions[activeQuestionIndex].explanation || ''}
              onChange={(e) => updateQuestion(activeQuestionIndex, 'explanation', e.target.value)}
              placeholder="Giải thích vì sao đáp án này đúng..."
            />
          </div>
        </div>
      )}
    </>
  );
}

export function RewriteConfig({ register, errors }) {
  return (
    <>
      <div className="premium-card-title border-b border-border pb-3">
        <span className="font-heading text-base font-bold text-text-primary">Thiết lập Ngữ pháp: Viết lại câu (Sentence Transformation)</span>
      </div>

      <div className="form-group flex flex-col gap-1.5">
        <label className="text-sm font-bold text-text-primary">Câu gốc (Original Sentence) *</label>
        <textarea 
          className="w-full p-2.5 border border-input rounded-lg text-[15px]" 
          rows={2} 
          {...register('originalSentence')} 
          placeholder="It is important for us to collaborate on this research." 
        />
        {errors.originalSentence && <span className="text-xs text-error">{errors.originalSentence.message}</span>}
      </div>

      <div className="form-group flex flex-col gap-1.5 max-w-xs">
        <label className="text-sm font-bold text-text-primary">Phần mở đầu câu gợi ý viết lại *</label>
        <input 
          type="text" 
          className="w-full p-2.5 border border-input rounded-lg text-[15px]" 
          {...register('rewriteStarter')} 
          placeholder="Ví dụ: We need..." 
        />
        {errors.rewriteStarter && <span className="text-xs text-error">{errors.rewriteStarter.message}</span>}
      </div>

      <div className="form-group flex flex-col gap-1.5">
        <label className="text-sm font-bold text-text-primary">Các phương án đáp án viết lại được chấp nhận (Mỗi dòng một đáp án) *</label>
        <textarea 
          className="w-full p-2.5 border border-input rounded-lg text-[15px] font-mono" 
          rows={3} 
          {...register('acceptedAnswers')} 
          placeholder="We need to collaborate on this research.&#10;We need to work together on this research." 
        />
        {errors.acceptedAnswers && <span className="text-xs text-error">{errors.acceptedAnswers.message}</span>}
      </div>
    </>
  );
}
