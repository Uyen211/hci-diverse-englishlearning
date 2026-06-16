import React, { useRef, useEffect } from 'react';

export default function ReviewInputArea({ mode, value, onChange, onSubmit, hintContent, options, onOptionSelect, errorMsg }) {
    const inputRef = useRef(null);
    const mcqRef = useRef(null);

    useEffect(() => {
        if (errorMsg) {
            if (mode === 'text' && inputRef.current) {
                inputRef.current.focus();
                inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (mode === 'mcq' && mcqRef.current) {
                mcqRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [errorMsg, mode]);

    return (
        <div className="wf-card" style={{ padding: '20px' }}>
            {mode === 'text' && (
                <>
                    <div className="wf-input-group">
                        <label className="wf-label">Nhập câu trả lời:</label>
                        <input
                            ref={inputRef}
                            type="text"
                            className={`wf-input ${errorMsg ? 'has-error' : ''}`}
                            placeholder="Gõ từ cần điền vào đây..."
                            style={{ fontSize: '16px', padding: '12px' }}
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            autoFocus
                        />
                    </div>
                    {errorMsg && (
                        <div className="wf-error-text" style={{ marginTop: '8px' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#EF4444' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                {errorMsg}
                            </span>
                        </div>
                    )}
                    <div className="flex-row gap-8 justify-center" style={{ marginTop: '12px' }}>
                        <div className="group relative cursor-help wf-btn-outline" style={{ padding: '10px 24px', position: 'relative' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }}><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>
                            Gợi ý

                            {/* Tooltip Content */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-3 bg-gray-900 text-white text-sm rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none text-left border border-gray-700">
                                <div className="font-bold text-yellow-400 mb-1 text-xs uppercase tracking-wider flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
                                    Gợi ý:
                                </div>
                                <div style={{ lineHeight: '1.5' }}>{hintContent || "Không có gợi ý cho câu hỏi này."}</div>
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-gray-700"></div>
                                <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[7px] border-t-gray-900"></div>
                            </div>
                        </div>
                        <div role="button" tabIndex="0" className="wf-btn" style={{ padding: '10px 36px' }} onClick={onSubmit}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px', display: 'inline-block', verticalAlign: 'middle' }}><polyline points="20 6 9 17 4 12" /></svg>
                            Nộp bài
                        </div>
                    </div>
                </>
            )}

            {mode === 'mcq' && (
                <>
                    <div className="wf-label" style={{ marginBottom: '12px' }}>Chọn đáp án đúng:</div>
                    <div ref={mcqRef} className={errorMsg ? 'has-error' : ''} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: errorMsg ? '16px' : '0', borderRadius: '24px' }}>
                        {options.map((opt, idx) => {
                            const labels = ['A', 'B', 'C', 'D'];
                            const isSelected = value === opt;
                            return (
                                <div key={idx} className={`wf-option ${isSelected ? 'selected' : ''}`} onClick={() => onOptionSelect(opt)}>
                                    <div className="wf-option-label">{labels[idx]}</div>
                                    <div>{opt}</div>
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ minHeight: '28px', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {errorMsg && (
                            <div className="wf-error-text" style={{ margin: 0 }}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#EF4444' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                    {errorMsg}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="flex-row justify-center" style={{ marginTop: '12px' }}>
                        <div role="button" tabIndex="0" className="wf-btn" style={{ padding: '10px 36px' }} onClick={onSubmit}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px', display: 'inline-block', verticalAlign: 'middle' }}><polyline points="20 6 9 17 4 12" /></svg>
                            Nộp bài
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
