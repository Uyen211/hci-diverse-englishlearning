export function InteractiveStoriesConfig({
  register,
  watch,
  errors,
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
        <span className="font-heading text-base font-bold text-text-primary">Cấu hình Bài nghe (Interactive Stories)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group flex flex-col gap-1.5">
          <label className="text-sm font-bold text-text-primary">Tệp âm thanh bài nghe (.mp3) *</label>
          <div className="border-2 border-dashed border-input rounded-lg p-5 text-center bg-gray-50 cursor-pointer flex flex-col items-center gap-1">
            <svg className="w-6 h-6 text-text-secondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm12-3c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM9 10l12-3" />
            </svg>
            <span className="text-xs font-semibold text-text-primary">{watch('audio') || 'full_listening_conversation.mp3'}</span>
            <span className="text-[10px] text-text-secondary">Nhấp chọn hoặc kéo thả tệp âm thanh thay thế</span>
          </div>
          {errors.audio && <span className="text-xs text-error">{errors.audio.message}</span>}
        </div>
        <div className="form-group flex flex-col gap-1.5">
          <label className="text-sm font-bold text-text-primary">Lời thoại / Script bài nghe</label>
          <textarea 
            className="w-full p-2.5 border border-input rounded-lg text-[15px]" 
            rows={4} 
            {...register('script')} 
            placeholder="Once upon a time, two researchers decided to collaborate..." 
          />
        </div>
      </div>

      <div className="text-sm font-bold text-text-primary mt-2">Danh sách câu hỏi tương tác *</div>
      
      {/* Sub-pagination for interactive questions */}
      <div className="sub-pagination-bar bg-gray-50 border border-border rounded-lg p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-text-secondary">Câu hỏi tương tác:</span>
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
            <label className="text-sm font-bold text-text-primary">Câu hỏi trắc nghiệm (MCQ) *</label>
            <input
              type="text"
              className="w-full p-2.5 border border-input rounded-lg text-[15px] bg-surface"
              value={questions[activeQuestionIndex].question}
              onChange={(e) => updateQuestion(activeQuestionIndex, 'question', e.target.value)}
              placeholder="What did the two researchers decide to do?"
            />
          </div>

          <div className="form-group flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-text-primary">Các phương án trả lời *</label>
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
