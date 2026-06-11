import React from 'react';

export default function ReviewEmptyErrorPopup({ onClose }) {
    return (
        <div className="wf-error-overlay" style={{ position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }}>
            <div className="wf-error-dialog" style={{ background: 'var(--surface)', border: '1.5px solid rgba(155, 93, 224, 0.2)', padding: '32px', maxWidth: '400px', width: '90%', textAlign: 'center', borderRadius: '28px', boxShadow: '0 12px 36px rgba(28, 27, 46, 0.15)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                    </div>
                </div>
                <div className="wf-error-dialog-title" style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>Thiếu đáp án</div>
                <div className="wf-error-dialog-text" style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.5' }}>
                    Bạn chưa cung cấp đáp án cho câu hỏi này. Vui lòng hoàn thành phần được đánh dấu viền đỏ trước khi nộp bài.
                </div>
                <div className="flex-row justify-center">
                    <div role="button" tabIndex="0" className="wf-btn" style={{ padding: '12px 36px', width: '100%', fontSize: '15px' }} onClick={onClose}>
                        Quay lại làm bài
                    </div>
                </div>
            </div>
        </div>
    );
}
