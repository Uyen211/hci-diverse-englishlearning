
export default function SpeakingConfig({ question, onChange, errors }) {
  const handleTurnChange = (idx, field, val) => {
    const turns = [...(question.dialogueTurns || [])];
    turns[idx] = { ...turns[idx], [field]: val };
    onChange({ ...question, dialogueTurns: turns });
  };

  const handleAddTurn = () => {
    const turns = [...(question.dialogueTurns || [])];
    const lastTurnRole = turns[turns.length - 1]?.role;
    const nextRole = lastTurnRole === 'ai' ? 'user' : 'ai';
    turns.push({
      role: nextRole,
      text: ''
    });
    onChange({ ...question, dialogueTurns: turns });
  };

  const handleRemoveTurn = (idx) => {
    const turns = (question.dialogueTurns || []).filter((_, i) => i !== idx);
    onChange({ ...question, dialogueTurns: turns });
  };

  const dialogueTurns = question.dialogueTurns || [];

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="input-group">
        <label>Tình huống giả định *</label>
        <textarea
          className="input-field"
          rows={2}
          value={question.situation || ''}
          onChange={(e) => onChange({ ...question, situation: e.target.value })}
          placeholder="Nhập tình huống hội thoại..."
          style={{ resize: 'vertical' }}
        />
        {errors?.situation && <span className="error-message">✕ {errors.situation}</span>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="input-group">
          <label>Vai của AI *</label>
          <input
            type="text"
            className="input-field"
            value={question.aiRole || ''}
            onChange={(e) => onChange({ ...question, aiRole: e.target.value })}
            placeholder="Ví dụ: John (Project Manager)..."
          />
          {errors?.aiRole && <span className="error-message">✕ {errors.aiRole}</span>}
        </div>
        <div className="input-group">
          <label>Vai của người học *</label>
          <input
            type="text"
            className="input-field"
            value={question.userRole || ''}
            onChange={(e) => onChange({ ...question, userRole: e.target.value })}
            placeholder="Ví dụ: Technical Assistant..."
          />
          {errors?.userRole && <span className="error-message">✕ {errors.userRole}</span>}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
          Kịch bản hội thoại mẫu *
        </label>
        
        {dialogueTurns.map((turn, idx) => (
          <div className="dialogue-turn-row" key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
            <button
              type="button"
              onClick={() => handleTurnChange(idx, 'role', turn.role === 'ai' ? 'user' : 'ai')}
              className={`turn-role-tag ${turn.role === 'ai' ? 'ai' : 'user'}`}
              style={{
                width: '90px',
                height: '38px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '12px',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: turn.role === 'ai' ? 'rgba(78, 86, 192, 0.1)' : 'rgba(155, 93, 224, 0.1)',
                color: turn.role === 'ai' ? 'var(--primary)' : 'var(--secondary)',
                cursor: 'pointer'
              }}
              title="Click để đổi vai"
            >
              {turn.role === 'ai' ? 'AI' : 'Người học'}
            </button>
            <input
              type="text"
              className="input-field"
              value={turn.text || ''}
              onChange={(e) => handleTurnChange(idx, 'text', e.target.value)}
              placeholder="Nhập lời hội thoại mẫu..."
              style={{ flexGrow: 1 }}
            />
            {dialogueTurns.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveTurn(idx)}
                style={{
                  width: '38px',
                  height: '38px',
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
                title="Xóa lượt thoại"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddTurn}
          className="btn-secondary"
          style={{ borderStyle: 'dashed', width: '100%', marginTop: '4px', justifyContent: 'center' }}
        >
          + Thêm lượt thoại
        </button>

        {errors?.dialogueTurns && <span className="error-message">✕ {errors.dialogueTurns}</span>}
      </div>

      <div className="input-group">
        <label>Giải thích & Hướng dẫn AI đánh giá *</label>
        <textarea
          className="input-field"
          rows={3}
          value={question.gradingGuide || ''}
          onChange={(e) => onChange({ ...question, gradingGuide: e.target.value })}
          placeholder="Nhập hướng dẫn chấm điểm hội thoại..."
          style={{ resize: 'vertical' }}
        />
        {errors?.gradingGuide && <span className="error-message">✕ {errors.gradingGuide}</span>}
      </div>
    </div>
  );
}
