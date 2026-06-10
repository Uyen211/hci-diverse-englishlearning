
export default function WritingConfig({ question, onChange, errors }) {
  const handleUploadImage = () => {
    // Mock image upload trigger
    onChange({ ...question, image: 'essay_chart_mock.jpg' });
  };

  const handleRemoveImage = () => {
    onChange({ ...question, image: null });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="input-group">
        <label>Đề bài viết luận *</label>
        <textarea
          className="input-field"
          rows={3}
          value={question.essayPrompt || ''}
          onChange={(e) => onChange({ ...question, essayPrompt: e.target.value })}
          placeholder="Nhập đề bài viết luận..."
        />
        {errors?.essayPrompt && <span className="error-message">✕ {errors.essayPrompt}</span>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="input-group">
          <label>Định dạng bài viết *</label>
          <select
            className="input-field"
            value={question.essayType || 'IELTS Writing Task 2'}
            onChange={(e) => onChange({ ...question, essayType: e.target.value })}
          >
            <option value="IELTS Writing Task 2">IELTS Writing Task 2</option>
            <option value="IELTS Writing Task 1">IELTS Writing Task 1</option>
            <option value="TOEIC Writing Email">TOEIC Writing Email</option>
          </select>
        </div>
        <div className="input-group">
          <label>Số từ tối thiểu *</label>
          <input
            type="number"
            className="input-field"
            value={question.minWords || 250}
            onChange={(e) => onChange({ ...question, minWords: parseInt(e.target.value, 10) || 0 })}
            placeholder="250"
          />
          {errors?.minWords && <span className="error-message">✕ {errors.minWords}</span>}
        </div>
      </div>

      <div className="input-group">
        <label>Hình ảnh minh họa đề bài (nếu có - vd: biểu đồ Task 1)</label>
        <div
          className="upload-box"
          style={{
            padding: '16px',
            minHeight: '90px',
            width: '100%',
            border: '2px dashed rgba(78, 86, 192, 0.2)',
            backgroundColor: 'rgba(78, 86, 192, 0.02)',
            borderRadius: 'var(--rounded-lg)',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'default'
          }}
        >
          {question.image ? (
            <>
              <span style={{ fontWeight: '600', color: 'var(--primary)' }}>[ {question.image} ]</span>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="btn-secondary"
                style={{ color: 'var(--error)', borderColor: 'rgba(239,68,68,0.2)', padding: '6px 12px', fontSize: '12px' }}
              >
                Gỡ bỏ
              </button>
            </>
          ) : (
            <>
              <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>[ Chưa chọn hình ảnh ]</span>
              <button
                type="button"
                onClick={handleUploadImage}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '12px' }}
              >
                Tải ảnh lên
              </button>
            </>
          )}
        </div>
      </div>

      <div className="input-group">
        <label>Các từ khóa & cấu trúc gợi ý chấm điểm *</label>
        <input
          type="text"
          className="input-field"
          value={question.keywords || ''}
          onChange={(e) => onChange({ ...question, keywords: e.target.value })}
          placeholder="Ví dụ: online education, traditional schooling, benefits, disadvantages..."
        />
        {errors?.keywords && <span className="error-message">✕ {errors.keywords}</span>}
      </div>

      <div className="input-group">
        <label>Bài viết mẫu tham khảo (Band 8.0+) *</label>
        <textarea
          className="input-field"
          rows={4}
          value={question.referenceEssay || ''}
          onChange={(e) => onChange({ ...question, referenceEssay: e.target.value })}
          placeholder="Nhập bài viết mẫu..."
        />
        {errors?.referenceEssay && <span className="error-message">✕ {errors.referenceEssay}</span>}
      </div>
    </div>
  );
}
