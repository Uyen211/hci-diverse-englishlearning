export function FocusModeConfig({ register, watch, errors, handleWordToggle, fullSentenceText }) {
  return (
    <>
      <div className="premium-card-title border-b border-border pb-3">
        <span className="font-heading text-base font-bold text-text-primary">Thiết lập Ngữ pháp: Focus Mode (Lược bỏ bớt thông tin gây nhiễu)</span>
      </div>

      <div className={`input-group ${errors.targetStructure ? 'error' : ''}`}>
        <label>Cấu trúc ngữ pháp mục tiêu *</label>
        <input 
          type="text" 
          className="input-field" 
          {...register('targetStructure')} 
          placeholder="Ví dụ: S + wish + S + V-past" 
        />
        {errors.targetStructure && <span className="error-message">✕ {errors.targetStructure.message}</span>}
      </div>

      <div className={`input-group ${errors.fullSentence ? 'error' : ''}`}>
        <label>Câu ví dụ đầy đủ *</label>
        <input 
          type="text" 
          className="input-field font-semibold text-primary" 
          {...register('fullSentence')} 
          placeholder="I wish I had more time to collaborate..." 
        />
        {errors.fullSentence && <span className="error-message">✕ {errors.fullSentence.message}</span>}
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
  const getVisibleSubIndices = () => {
    const total = questions.length;
    const current = activeQuestionIndex;
    
    let start = Math.max(0, current - 1);
    let end = Math.min(total - 1, current + 1);
    
    if (end - start + 1 < 3) {
      if (start === 0) {
        end = Math.min(total - 1, start + 2);
      } else if (end === total - 1) {
        start = Math.max(0, end - 2);
      }
    }
    
    const visible = [];
    for (let i = start; i <= end; i++) {
      visible.push(i);
    }
    return visible;
  };

  return (
    <>
      <div className="premium-card-title flex justify-between items-center border-b border-border pb-3">
        <span className="font-heading text-base font-bold text-text-primary">Thiết lập Nhận diện khuôn mẫu Ngữ pháp (Pattern Recognition)</span>
      </div>

      <div className={`input-group max-w-sm ${errors.targetStructure ? 'error' : ''}`}>
        <label>Cấu trúc ngữ pháp mục tiêu *</label>
        <input 
          type="text" 
          className="input-field" 
          {...register('targetStructure')} 
          placeholder="Ví dụ: S + suggest + V-ing" 
        />
        {errors.targetStructure && <span className="error-message">✕ {errors.targetStructure.message}</span>}
      </div>

      {/* 1. Similar Grammar Pattern Examples */}
      <div className="flex justify-between items-center mt-2">
        <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>1. Nhập các câu ví dụ có khuôn mẫu tương đồng *</label>
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
              className="input-field"
              value={p.text}
              onChange={(e) => updatePattern(p.id, e.target.value)}
              placeholder="Ví dụ: He suggested collaborating on the project."
            />
            <button
              type="button"
              onClick={() => removePattern(p.id)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                border: '1px solid rgba(239, 68, 68, 0.15)',
                backgroundColor: 'rgba(239, 68, 68, 0.05)',
                color: 'var(--error)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* 2. Rule deduction MCQ questions */}
      <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginTop: '20px' }}>2. Cấu hình câu hỏi trắc nghiệm đúc rút quy luật *</div>

      {/* Sub-questions Manager */}
      <div className="sub-questions-manager" style={{ border: '1px solid rgba(78, 86, 192, 0.12)', borderRadius: '12px', padding: '16px', backgroundColor: 'rgba(78, 86, 192, 0.01)' }}>
        <div className="sub-manager-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)' }}>Câu hỏi nhỏ ({questions.length}):</span>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <button
                type="button"
                disabled={activeQuestionIndex === 0}
                onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
                className="page-btn"
                style={{ padding: '6px 12px', minWidth: '32px', opacity: activeQuestionIndex === 0 ? 0.4 : 1, cursor: activeQuestionIndex === 0 ? 'not-allowed' : 'pointer' }}
              >
                &lt;
              </button>
              {getVisibleSubIndices().map((idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveQuestionIndex(idx)}
                  className={`page-btn ${activeQuestionIndex === idx ? 'active' : ''}`}
                  style={{ padding: '6px 12px', minWidth: '32px' }}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                type="button"
                disabled={activeQuestionIndex === questions.length - 1}
                onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                className="page-btn"
                style={{ padding: '6px 12px', minWidth: '32px', opacity: activeQuestionIndex === questions.length - 1 ? 0.4 : 1, cursor: activeQuestionIndex === questions.length - 1 ? 'not-allowed' : 'pointer' }}
              >
                &gt;
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={addQuestion}
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '12px' }}
          >
            + Thêm câu hỏi nhỏ
          </button>
        </div>

        {questions[activeQuestionIndex] ? (
          <div className="sub-editor-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary)' }}>Cấu hình Câu hỏi #{activeQuestionIndex + 1}</span>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(activeQuestionIndex)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    border: '1px solid rgba(239, 68, 68, 0.15)',
                    backgroundColor: 'rgba(239, 68, 68, 0.05)',
                    color: 'var(--error)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                  title="Xóa câu hỏi nhỏ"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              )}
            </div>

            <div className="input-group">
              <label>Câu hỏi đúc rút quy luật *</label>
              <input
                type="text"
                className="input-field"
                value={questions[activeQuestionIndex].question}
                onChange={(e) => updateQuestion(activeQuestionIndex, 'question', e.target.value)}
                placeholder="Cấu trúc ngữ pháp đúng sau suggest khi đề xuất hành động là gì?"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                Các phương án chọn lựa và đáp án đúng *
              </label>

              {questions[activeQuestionIndex].options.map((opt, optIdx) => {
                const letter = String.fromCharCode(65 + optIdx);
                const isCorrect = questions[activeQuestionIndex].correctOption === opt && opt !== '';
                
                return (
                  <div className="mcq-option-edit-row" key={optIdx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={() => updateQuestion(activeQuestionIndex, 'correctOption', opt)}
                      className={`mcq-option-letter ${isCorrect ? 'filled' : 'outline'}`}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '800',
                        border: isCorrect ? '1px solid var(--primary)' : '1px solid rgba(78, 86, 192, 0.2)',
                        backgroundColor: isCorrect ? 'var(--primary)' : 'var(--surface)',
                        color: isCorrect ? '#fff' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        flexShrink: 0
                      }}
                      title="Chọn đáp án đúng"
                    >
                      {letter}
                    </button>
                    <input
                      type="text"
                      className="input-field"
                      value={opt}
                      onChange={(e) => {
                        updateOption(activeQuestionIndex, optIdx, e.target.value);
                        if (isCorrect) {
                          updateQuestion(activeQuestionIndex, 'correctOption', e.target.value);
                        }
                      }}
                      placeholder={`Nhập phương án ${letter}...`}
                      style={{ flexGrow: 1 }}
                    />
                    {isCorrect && (
                      <span className="bg-success/15 text-success text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap">
                        Đáp án đúng
                      </span>
                    )}
                    {questions[activeQuestionIndex].options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(activeQuestionIndex, optIdx)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          border: '1px solid rgba(239, 68, 68, 0.15)',
                          backgroundColor: 'rgba(239, 68, 68, 0.05)',
                          color: 'var(--error)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          flexShrink: 0
                        }}
                        title="Xóa phương án này"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    )}
                  </div>
                );
              })}

              <button
                type="button"
                onClick={() => addOption(activeQuestionIndex)}
                className="btn-secondary"
                style={{
                  border: '1.5px dashed var(--primary)',
                  backgroundColor: 'rgba(78, 86, 192, 0.05)',
                  color: 'var(--primary)',
                  width: '100%',
                  marginTop: '12px',
                  padding: '8px',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                + Thêm phương án
              </button>
            </div>

            <div className="input-group">
              <label>Giải thích đáp án cho câu hỏi nhỏ này *</label>
              <textarea
                className="input-field"
                rows={2}
                value={questions[activeQuestionIndex].explanation || ''}
                onChange={(e) => updateQuestion(activeQuestionIndex, 'explanation', e.target.value)}
                placeholder="Giải thích vì sao đáp án này đúng..."
              />
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
            Chưa có câu hỏi nhỏ nào. Vui lòng bấm + Thêm ở trên.
          </div>
        )}
      </div>
    </>
  );
}

export function RewriteConfig({ register, errors }) {
  return (
    <>
      <div className="premium-card-title border-b border-border pb-3">
        <span className="font-heading text-base font-bold text-text-primary">Thiết lập Ngữ pháp: Viết lại câu (Sentence Transformation)</span>
      </div>

      <div className={`input-group ${errors.originalSentence ? 'error' : ''}`}>
        <label>Câu gốc (Original Sentence) *</label>
        <textarea 
          className="input-field" 
          rows={2} 
          {...register('originalSentence')} 
          placeholder="It is important for us to collaborate on this research." 
        />
        {errors.originalSentence && <span className="error-message">✕ {errors.originalSentence.message}</span>}
      </div>

      <div className={`input-group max-w-xs ${errors.rewriteStarter ? 'error' : ''}`}>
        <label>Phần mở đầu câu gợi ý viết lại *</label>
        <input 
          type="text" 
          className="input-field" 
          {...register('rewriteStarter')} 
          placeholder="Ví dụ: We need..." 
        />
        {errors.rewriteStarter && <span className="error-message">✕ {errors.rewriteStarter.message}</span>}
      </div>

      <div className={`input-group ${errors.acceptedAnswers ? 'error' : ''}`}>
        <label>Các phương án đáp án viết lại được chấp nhận (Mỗi dòng một đáp án) *</label>
        <textarea 
          className="input-field font-mono" 
          rows={3} 
          {...register('acceptedAnswers')} 
          placeholder="We need to collaborate on this research.&#10;We need to work together on this research." 
        />
        {errors.acceptedAnswers && <span className="error-message">✕ {errors.acceptedAnswers.message}</span>}
      </div>
    </>
  );
}
