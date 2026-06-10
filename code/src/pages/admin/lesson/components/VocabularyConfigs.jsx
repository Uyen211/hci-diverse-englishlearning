export function FlashcardConfig({ register, watch, errors }) {
  return (
    <>
      <div className="premium-card-title flex justify-between items-center border-b border-border pb-3">
        <span className="font-heading text-base font-bold text-text-primary">Thiết lập Flashcards SRS Đa Giác Quan</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`input-group ${errors.key ? 'error' : ''}`}>
          <label>Từ vựng (Key) *</label>
          <input 
            type="text" 
            className="input-field" 
            {...register('key')} 
            placeholder="Ví dụ: collaborate" 
          />
          {errors.key && <span className="error-message">✕ {errors.key.message}</span>}
        </div>
        <div className="input-group">
          <label>Phiên âm IPA</label>
          <input 
            type="text" 
            className="input-field" 
            {...register('ipa')} 
            placeholder="Ví dụ: /kəˈlæb.ə.reɪt/" 
          />
        </div>
      </div>

      <div className={`input-group ${errors.definition ? 'error' : ''}`}>
        <label>Định nghĩa & Ví dụ *</label>
        <textarea 
          className="input-field" 
          rows={3} 
          {...register('definition')} 
          placeholder="Ví dụ: Động từ thể hiện sự hợp tác... Ví dụ: We need to collaborate." 
        />
        {errors.definition && <span className="error-message">✕ {errors.definition.message}</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="input-group">
          <label>Âm thanh phát âm (.mp3)</label>
          <div className="border-2 border-dashed border-input rounded-lg p-5 text-center bg-gray-50 cursor-pointer flex flex-col items-center gap-1">
            <svg className="w-6 h-6 text-text-secondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"/>
            </svg>
            <span className="text-xs font-semibold text-text-primary">{watch('audio') || 'pronunciation_collaborate.mp3'}</span>
            <span className="text-[10px] text-text-secondary">Nhấp chọn hoặc kéo thả tệp âm thanh thay thế</span>
          </div>
        </div>
        <div className="form-group flex flex-col gap-1.5">
          <label className="text-sm font-bold text-text-primary">Ảnh minh họa gợi nhớ</label>
          <div className="border border-border rounded-lg p-5 flex flex-col items-center justify-center gap-2 bg-gradient-nebula/5">
            <span className="text-xs font-semibold text-text-primary">{watch('image') || 'collaborate_workspace.png'}</span>
            <button type="button" className="px-3 py-1 bg-surface text-primary border border-primary/20 text-[11px] font-bold rounded-lg hover:bg-gray-50 shadow-sm">
              Thay đổi ảnh
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function DragDropConfig({ pairs, addPair, removePair, updatePair }) {
  return (
    <>
      <div className="premium-card-title flex justify-between items-center border-b border-border pb-3">
        <span className="font-heading text-base font-bold text-text-primary">Thiết lập Kéo thả / Ghép đôi Từ vựng</span>
        <button 
          type="button" 
          onClick={addPair} 
          className="px-3 py-1 bg-surface text-primary border border-primary/20 text-xs font-bold rounded-lg hover:bg-gray-50"
        >
          + Thêm cặp từ mới
        </button>
      </div>

      <table className="w-full border-collapse border border-border rounded-lg overflow-hidden text-left text-xs">
        <thead>
          <tr className="bg-gray-50 border-b border-border text-text-secondary">
            <th className="p-3 text-center w-12 font-bold text-[11px] uppercase tracking-wider">STT</th>
            <th className="p-3 w-48 font-bold text-[11px] uppercase tracking-wider">Từ vựng / Cụm từ *</th>
            <th className="p-3 font-bold text-[11px] uppercase tracking-wider">Định nghĩa *</th>
            <th className="p-3 text-center w-16 font-bold text-[11px] uppercase tracking-wider">Xóa</th>
          </tr>
        </thead>
        <tbody>
          {pairs.map((p, idx) => (
            <tr key={p.id} className="border-b border-border">
              <td className="p-3 text-center font-bold text-primary">{idx + 1}</td>
              <td className="p-2">
                <input
                  type="text"
                  className="w-full p-2 border border-input rounded text-[15px] bg-surface"
                  value={p.word}
                  onChange={(e) => updatePair(p.id, 'word', e.target.value)}
                  placeholder="Ví dụ: collaborate"
                />
              </td>
              <td className="p-2">
                <input
                  type="text"
                  className="w-full p-2 border border-input rounded text-[15px] bg-surface"
                  value={p.definition}
                  onChange={(e) => updatePair(p.id, 'definition', e.target.value)}
                  placeholder="Ví dụ: Hợp tác, cùng làm việc..."
                />
              </td>
              <td className="p-2 text-center">
                <button
                  type="button"
                  onClick={() => removePair(p.id)}
                  className="w-8 h-8 rounded bg-error/5 border border-error/15 text-error flex items-center justify-center hover:bg-error/10 mx-auto"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export function ConcordanceConfig({ contexts, addContext, removeContext, updateContext, register, errors }) {
  return (
    <>
      <div className="premium-card-title flex justify-between items-center border-b border-border pb-3">
        <span className="font-heading text-base font-bold text-text-primary">Thiết lập Đoán nghĩa qua ngữ cảnh (Smart Concordance)</span>
      </div>

      <div className={`input-group max-w-sm ${errors.key ? 'error' : ''}`}>
        <label>Từ vựng mục tiêu *</label>
        <input 
          type="text" 
          className="input-field" 
          {...register('key')} 
          placeholder="Ví dụ: collaborate" 
        />
        {errors.key && <span className="error-message">✕ {errors.key.message}</span>}
      </div>

      <div className="flex justify-between items-center mt-2">
        <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Danh sách câu ví dụ chứa từ mục tiêu * (Tối thiểu 2 câu)</label>
        <button 
          type="button" 
          onClick={addContext} 
          className="px-3 py-1 bg-surface text-primary border border-primary/20 text-xs font-bold rounded-lg hover:bg-gray-50"
        >
          + Thêm câu ngữ cảnh
        </button>
      </div>
      
      <div className="flex flex-col gap-4">
        {contexts.map((c, idx) => (
          <div key={c.id} className="sub-questions-manager" style={{ border: '1px solid rgba(78, 86, 192, 0.12)', borderRadius: '12px', padding: '16px', backgroundColor: 'rgba(78, 86, 192, 0.01)' }}>
            <div className="flex justify-between items-center border-b border-border/60 pb-1.5">
              <span className="text-xs font-bold text-primary">Câu ví dụ #{idx + 1}</span>
              <button
                type="button"
                onClick={() => removeContext(c.id)}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  border: '1px solid rgba(239, 68, 68, 0.15)',
                  backgroundColor: 'rgba(239, 68, 68, 0.05)',
                  color: 'var(--error)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            
            <div className="input-group mt-2">
              <label>Câu chứa từ khóa *</label>
              <textarea
                className="input-field"
                rows={2}
                value={c.sentence}
                onChange={(e) => updateContext(c.id, 'sentence', e.target.value)}
                placeholder="Scientists collaborate to find cures..."
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '8px' }}>
              <div className="input-group">
                <label>Tệp âm thanh câu ví dụ (.mp3)</label>
                <input
                  type="text"
                  className="input-field"
                  value={c.audio || ''}
                  onChange={(e) => updateContext(c.id, 'audio', e.target.value)}
                  placeholder="context_audio_x.mp3"
                />
              </div>
              <div className="input-group">
                <label>Dịch nghĩa câu (Gợi ý ẩn)</label>
                <input
                  type="text"
                  className="input-field"
                  value={c.translation}
                  onChange={(e) => updateContext(c.id, 'translation', e.target.value)}
                  placeholder="Các nhà khoa học hợp tác..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
