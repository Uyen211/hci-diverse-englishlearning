export function PronunciationConfig({ pronunciations, addPronunciation, removePronunciation, updatePronunciation }) {
  return (
    <>
      <div className="premium-card-title flex justify-between items-center border-b border-border pb-3">
        <span className="font-heading text-base font-bold text-text-primary">Thiết lập Phát âm từ đơn / Câu ngắn</span>
        <button 
          type="button" 
          onClick={addPronunciation} 
          className="px-3 py-1 bg-surface text-primary border border-primary/20 text-xs font-bold rounded-lg hover:bg-gray-50"
        >
          + Thêm từ/câu luyện đọc
        </button>
      </div>

      <table className="w-full border-collapse border border-border rounded-lg overflow-hidden text-left text-xs">
        <thead>
          <tr className="bg-gray-50 border-b border-border text-text-secondary">
            <th className="p-3 text-center w-12 font-bold text-[11px] uppercase tracking-wider">STT</th>
            <th className="p-3 font-bold text-[11px] uppercase tracking-wider">Từ vựng / Câu mẫu phát âm *</th>
            <th className="p-3 w-[320px] font-bold text-[11px] uppercase tracking-wider">Tải file âm thanh chuẩn phát âm mẫu (.mp3) *</th>
            <th className="p-3 text-center w-16 font-bold text-[11px] uppercase tracking-wider">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {pronunciations.map((p, idx) => (
            <tr key={p.id} className="border-b border-border">
              <td className="p-3 text-center font-bold text-primary">{idx + 1}</td>
              <td className="p-2">
                <input
                  type="text"
                  className="w-full p-2 border border-input rounded text-[15px] bg-surface"
                  value={p.text}
                  onChange={(e) => updatePronunciation(p.id, 'text', e.target.value)}
                  placeholder="Nhập từ hoặc câu mẫu phát âm..."
                />
              </td>
              <td className="p-2">
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="w-full p-2 border border-input rounded text-xs bg-surface"
                    value={p.audio || ''}
                    onChange={(e) => updatePronunciation(p.id, 'audio', e.target.value)}
                    placeholder="Ví dụ: native_collaborate.mp3"
                  />
                </div>
              </td>
              <td className="p-2 text-center">
                <button
                  type="button"
                  onClick={() => removePronunciation(p.id)}
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

export function RoleplayConfig({ register, errors, turns, addTurn, removeTurn, updateTurn }) {
  return (
    <>
      <div className="premium-card-title flex justify-between items-center border-b border-border pb-3">
        <span className="font-heading text-base font-bold text-text-primary">Thiết lập Hội thoại nhập vai với AI</span>
      </div>

      <div className="form-group flex flex-col gap-1.5">
        <label className="text-sm font-bold text-text-primary">Thiết lập bối cảnh tình huống giả lập *</label>
        <textarea 
          className="w-full p-2.5 border border-input rounded-lg text-[15px]" 
          rows={2} 
          {...register('context')} 
          placeholder="Tình huống: Bạn và một đồng nghiệp nước ngoài đang thảo luận..." 
        />
        {errors.context && <span className="text-xs text-error">{errors.context.message}</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group flex flex-col gap-1.5">
          <label className="text-sm font-bold text-text-primary">Vai của AI *</label>
          <input 
            type="text" 
            className="w-full p-2.5 border border-input rounded-lg text-[15px]" 
            {...register('aiRole')} 
            placeholder="Ví dụ: John (Project Manager)" 
          />
          {errors.aiRole && <span className="text-xs text-error">{errors.aiRole.message}</span>}
        </div>
        <div className="form-group flex flex-col gap-1.5">
          <label className="text-sm font-bold text-text-primary">Vai của Người học *</label>
          <input 
            type="text" 
            className="w-full p-2.5 border border-input rounded-lg text-[15px]" 
            {...register('userRole')} 
            placeholder="Ví dụ: Technical Assistant" 
          />
          {errors.userRole && <span className="text-xs text-error">{errors.userRole.message}</span>}
        </div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <label className="text-sm font-bold text-text-primary">Kịch bản gợi ý hội thoại mẫu *</label>
        <button 
          type="button" 
          onClick={addTurn} 
          className="px-3 py-1 bg-surface text-primary border border-primary/20 text-xs font-bold rounded-lg hover:bg-gray-50"
        >
          + Thêm lượt thoại gợi ý
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {turns.map((t, idx) => (
          <div key={t.id} className="roleplay-turn-row flex gap-4 items-center">
            <button
              type="button"
              onClick={() => updateTurn(t.id, 'role', t.role === 'ai' ? 'user' : 'ai')}
              className={`w-36 p-2 rounded-lg border text-xs font-bold text-center flex-shrink-0 cursor-pointer transition-colors ${
                t.role === 'ai'
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'bg-secondary/10 border-secondary text-secondary'
              }`}
            >
              Lượt {idx + 1} ({t.role === 'ai' ? 'AI' : 'User'})
            </button>
            <input
              type="text"
              className="flex-grow p-2 border border-input rounded-lg text-[15px] bg-surface"
              value={t.text}
              onChange={(e) => updateTurn(t.id, 'text', e.target.value)}
              placeholder="Lời thoại thoại..."
            />
            <button
              type="button"
              onClick={() => removeTurn(t.id)}
              className="w-8 h-8 rounded bg-error/5 border border-error/15 text-error flex items-center justify-center hover:bg-error/10 flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
