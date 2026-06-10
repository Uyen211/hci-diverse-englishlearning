import { useState } from 'react';

export default function ReadingConfig({ question, onChange, errors }) {
  const [activeSubIdx, setActiveSubIdx] = useState(0);

  const updateSubQuestion = (subIndex, updatedFields) => {
    const subList = [...(question.subQuestions || [])];
    subList[subIndex] = { ...subList[subIndex], ...updatedFields };
    onChange({ ...question, subQuestions: subList });
  };

  const handleAddSubQuestion = () => {
    const newSub = {
      id: `sub-q-${Math.random().toString(36).substr(2, 9)}`,
      content: '',
      options: ['', '', '', ''],
      correctOption: '',
      explanation: ''
    };
    const subList = [...(question.subQuestions || []), newSub];
    onChange({ ...question, subQuestions: subList });
    setActiveSubIdx(subList.length - 1);
  };

  const handleRemoveSubQuestion = (subIndex) => {
    const subList = (question.subQuestions || []).filter((_, idx) => idx !== subIndex);
    onChange({ ...question, subQuestions: subList });
    setActiveSubIdx(Math.max(0, activeSubIdx - 1));
  };

  const handleSubOptionChange = (subIndex, optIndex, val) => {
    const sub = (question.subQuestions || [])[subIndex];
    if (!sub) return;
    const newOpts = [...(sub.options || [])];
    const oldVal = newOpts[optIndex];
    newOpts[optIndex] = val;
    let newCorrectOption = sub.correctOption;
    if (sub.correctOption === oldVal && oldVal !== '') {
      newCorrectOption = val;
    }
    updateSubQuestion(subIndex, { options: newOpts, correctOption: newCorrectOption });
  };

  const handleSubAddOption = (subIndex) => {
    const sub = (question.subQuestions || [])[subIndex];
    if (!sub) return;
    const newOpts = [...(sub.options || []), ''];
    updateSubQuestion(subIndex, { options: newOpts });
  };

  const handleSubRemoveOption = (subIndex, optIndex) => {
    const sub = (question.subQuestions || [])[subIndex];
    if (!sub) return;
    const oldVal = (sub.options || [])[optIndex];
    const newOpts = (sub.options || []).filter((_, i) => i !== optIndex);
    let newCorrectOption = sub.correctOption;
    if (sub.correctOption === oldVal) {
      newCorrectOption = '';
    }
    updateSubQuestion(subIndex, { options: newOpts, correctOption: newCorrectOption });
  };

  const handleSubSelectCorrect = (subIndex, optText) => {
    updateSubQuestion(subIndex, { correctOption: optText });
  };

  const subQuestions = question.subQuestions || [];
  const currentSub = subQuestions[activeSubIdx] || null;

  const getVisibleSubIndices = () => {
    const total = subQuestions.length;
    const current = activeSubIdx;
    
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
    <div className="flex flex-col gap-5 w-full">
      <div className="input-group">
        <label>Tiêu đề đoạn văn đọc hiểu *</label>
        <input
          type="text"
          className="input-field"
          value={question.passageTitle || ''}
          onChange={(e) => onChange({ ...question, passageTitle: e.target.value })}
          placeholder="Nhập tiêu đề bài đọc..."
        />
        {errors?.passageTitle && <span className="error-message">✕ {errors.passageTitle}</span>}
      </div>

      <div className="input-group">
        <label>Nội dung đoạn văn đọc hiểu *</label>
        <textarea
          className="input-field"
          rows={5}
          value={question.passageContent || ''}
          onChange={(e) => onChange({ ...question, passageContent: e.target.value })}
          placeholder="Nhập nội dung đoạn văn..."
          style={{ resize: 'vertical' }}
        />
        {errors?.passageContent && <span className="error-message">✕ {errors.passageContent}</span>}
      </div>

      {/* Sub-questions Manager */}
      <div className="sub-questions-manager" style={{ border: '1px solid rgba(78, 86, 192, 0.12)', borderRadius: '12px', padding: '16px', backgroundColor: 'rgba(78, 86, 192, 0.01)' }}>
        <div className="sub-manager-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)' }}>Câu hỏi nhỏ ({subQuestions.length}):</span>
            <button
              type="button"
              disabled={activeSubIdx === 0}
              onClick={() => setActiveSubIdx(activeSubIdx - 1)}
              className="page-btn"
              style={{ padding: '6px 12px', minWidth: '32px', opacity: activeSubIdx === 0 ? 0.4 : 1, cursor: activeSubIdx === 0 ? 'not-allowed' : 'pointer' }}
            >
              &lt;
            </button>
            {getVisibleSubIndices().map((idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSubIdx(idx)}
                className={`page-btn ${activeSubIdx === idx ? 'active' : ''}`}
                style={{ padding: '6px 12px', minWidth: '32px' }}
              >
                {idx + 1}
              </button>
            ))}
            <button
              type="button"
              disabled={activeSubIdx === subQuestions.length - 1}
              onClick={() => setActiveSubIdx(activeSubIdx + 1)}
              className="page-btn"
              style={{ padding: '6px 12px', minWidth: '32px', opacity: activeSubIdx === subQuestions.length - 1 ? 0.4 : 1, cursor: activeSubIdx === subQuestions.length - 1 ? 'not-allowed' : 'pointer' }}
            >
              &gt;
            </button>
          </div>
          <button
            type="button"
            onClick={handleAddSubQuestion}
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '12px' }}
          >
            + Thêm câu hỏi nhỏ
          </button>
        </div>

        {currentSub ? (
          <div className="sub-editor-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary)' }}>Cấu hình Câu hỏi #{activeSubIdx + 1}</span>
              {subQuestions.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSubQuestion(activeSubIdx)}
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
              <label>Nội dung câu hỏi nhỏ #{activeSubIdx + 1} *</label>
              <input
                type="text"
                className="input-field"
                value={currentSub.content || ''}
                onChange={(e) => updateSubQuestion(activeSubIdx, { content: e.target.value })}
                placeholder="Nhập nội dung câu hỏi nhỏ..."
              />
              {errors?.subQuestions?.[activeSubIdx]?.content && (
                <span className="error-message">✕ {errors.subQuestions[activeSubIdx].content}</span>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currentSub.options?.map((opt, oIdx) => {
                const letter = String.fromCharCode(65 + oIdx);
                const isCorrect = currentSub.correctOption === opt && opt !== '';
                return (
                  <div className="mcq-option-edit-row" key={oIdx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={() => handleSubSelectCorrect(activeSubIdx, opt)}
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
                      onChange={(e) => handleSubOptionChange(activeSubIdx, oIdx, e.target.value)}
                      placeholder={`Nhập phương án ${letter}...`}
                      style={{ flexGrow: 1 }}
                    />
                    {isCorrect && (
                      <span className="bg-success/15 text-success text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap">
                        Đáp án đúng
                      </span>
                    )}
                    {currentSub.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleSubRemoveOption(activeSubIdx, oIdx)}
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
                        title="Xóa phương án"
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
                onClick={() => handleSubAddOption(activeSubIdx)}
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

              {errors?.subQuestions?.[activeSubIdx]?.options && (
                <span className="error-message">✕ {errors.subQuestions[activeSubIdx].options}</span>
              )}
              {errors?.subQuestions?.[activeSubIdx]?.correctOption && (
                <span className="error-message">✕ {errors.subQuestions[activeSubIdx].correctOption}</span>
              )}
            </div>

            <div className="input-group">
              <label>Giải thích chi tiết câu hỏi nhỏ *</label>
              <textarea
                className="input-field"
                rows={2}
                value={currentSub.explanation || ''}
                onChange={(e) => updateSubQuestion(activeSubIdx, { explanation: e.target.value })}
                placeholder="Nhập giải thích..."
              />
              {errors?.subQuestions?.[activeSubIdx]?.explanation && (
                <span className="error-message">✕ {errors.subQuestions[activeSubIdx].explanation}</span>
              )}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
            Chưa có câu hỏi nhỏ nào. Vui lòng bấm + Thêm ở trên.
          </div>
        )}
      </div>
    </div>
  );
}
