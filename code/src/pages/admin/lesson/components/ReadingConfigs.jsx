export function ReadingComprehensionConfig({
  register,
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
        <span className="font-heading text-base font-bold text-text-primary">Thiết lập Đọc hiểu thông thường</span>
      </div>

      <div className={`input-group ${errors.passageTitle ? 'error' : ''}`}>
        <label>Tiêu đề bài đọc *</label>
        <input 
          type="text" 
          className="input-field" 
          {...register('passageTitle')} 
          placeholder="Ví dụ: Scientific Collaboration in Modern Era" 
        />
        {errors.passageTitle && <span className="error-message">✕ {errors.passageTitle.message}</span>}
      </div>

      <div className={`input-group ${errors.passage ? 'error' : ''}`}>
        <label>Đoạn văn bản đọc hiểu *</label>
        <textarea 
          className="input-field" 
          rows={5} 
          {...register('passage')} 
          placeholder="Nhập đoạn văn bản đọc hiểu tại đây..." 
        />
        {errors.passage && <span className="error-message">✕ {errors.passage.message}</span>}
      </div>

      <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginTop: '20px' }}>Danh sách câu hỏi đọc hiểu *</div>

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
              <label>Câu hỏi (Trắc nghiệm chọn đáp án đúng) *</label>
              <input
                type="text"
                className="input-field"
                value={questions[activeQuestionIndex].question}
                onChange={(e) => updateQuestion(activeQuestionIndex, 'question', e.target.value)}
                placeholder="Why is scientific collaboration important according to the text?"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                Các phương án trả lời *
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
              <label>Giải thích đáp án cho câu hỏi này *</label>
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
