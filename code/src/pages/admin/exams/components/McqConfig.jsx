

export default function McqConfig({ question, onChange, errors }) {
  const handleOptionChange = (idx, val) => {
    const newOptions = [...(question.options || [])];
    const oldVal = newOptions[idx];
    newOptions[idx] = val;
    let newCorrectOption = question.correctOption;
    if (question.correctOption === oldVal && oldVal !== '') {
      newCorrectOption = val;
    }
    onChange({ ...question, options: newOptions, correctOption: newCorrectOption });
  };

  const handleAddOption = () => {
    const newOptions = [...(question.options || []), ''];
    onChange({ ...question, options: newOptions });
  };

  const handleRemoveOption = (idx) => {
    const oldVal = (question.options || [])[idx];
    const newOptions = (question.options || []).filter((_, i) => i !== idx);
    let newCorrectOption = question.correctOption;
    if (question.correctOption === oldVal) {
      newCorrectOption = '';
    }
    onChange({ ...question, options: newOptions, correctOption: newCorrectOption });
  };

  const handleSelectCorrect = (optionText) => {
    onChange({ ...question, correctOption: optionText });
  };

  const options = question.options || [];

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="input-group">
        <label>Nội dung câu hỏi trắc nghiệm *</label>
        <textarea
          className="input-field"
          rows={3}
          value={question.content || ''}
          onChange={(e) => onChange({ ...question, content: e.target.value })}
          placeholder="Nhập nội dung câu hỏi..."
          style={{ resize: 'vertical' }}
        />
        {errors?.content && <span className="error-message">✕ {errors.content}</span>}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
        <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
          Các phương án chọn lựa và đáp án đúng *
        </label>
        
        {options.map((opt, idx) => {
          const letter = String.fromCharCode(65 + idx); // A, B, C...
          const isCorrect = question.correctOption === opt && opt !== '';
          return (
            <div className="mcq-option-edit-row" key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
              <button
                type="button"
                onClick={() => handleSelectCorrect(opt)}
                className={`mcq-option-letter ${isCorrect ? 'filled' : 'outline'}`}
                style={{
                  width: '36px',
                  height: '36px',
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
                title="Chọn làm đáp án đúng"
              >
                {letter}
              </button>
              <input
                type="text"
                className="input-field"
                value={opt}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                placeholder={`Nhập phương án ${letter}...`}
                style={{ flexGrow: 1 }}
              />
              {isCorrect && (
                <span className="bg-success/15 text-success text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap">
                  Đáp án đúng
                </span>
              )}
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => handleRemoveOption(idx)}
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
          onClick={handleAddOption}
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
          + Thêm đáp án
        </button>

        {errors?.options && <span className="error-message">✕ {errors.options}</span>}
        {errors?.correctOption && <span className="error-message">✕ {errors.correctOption}</span>}
      </div>

      <div className="input-group">
        <label>Giải thích chi tiết *</label>
        <textarea
          className="input-field"
          rows={3}
          value={question.explanation || ''}
          onChange={(e) => onChange({ ...question, explanation: e.target.value })}
          placeholder="Nhập giải thích đáp án..."
          style={{ resize: 'vertical' }}
        />
        {errors?.explanation && <span className="error-message">✕ {errors.explanation}</span>}
      </div>
    </div>
  );
}
