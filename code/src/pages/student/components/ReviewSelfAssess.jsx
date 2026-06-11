import React from 'react';

export default function ReviewSelfAssess({ item, sentence, userAnswer, onAssess }) {
    return (
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '850px', margin: '0 auto', width: '100%' }}>
            <div className="wf-card" style={{ textAlign: 'center', padding: '20px', width: '100%', marginBottom: '20px' }}>
                <div className="wf-subtitle" style={{ marginBottom: '8px' }}>Câu trả lời của bạn:</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', padding: '8px', background: 'var(--surface)', border: '1.5px solid rgba(155, 93, 224, 0.15)', boxShadow: 'var(--glow-lvl2)', borderRadius: '12px' }}>
                    {userAnswer}
                </div>
                <div className="wf-srs-sentence" style={{ marginTop: '12px', fontSize: '15px' }} dangerouslySetInnerHTML={{ __html: sentence }} />
            </div>

            <div className="wf-label" style={{ marginBottom: '12px' }}>Bạn cảm thấy thế nào về câu trả lời này?</div>
            <div className="wf-srs-assess" style={{ width: '100%' }}>
                <div className="wf-srs-assess-btn good" onClick={() => onAssess('good')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '2px' }}><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                    <span className="label">Nhớ rõ</span>
                    <span className="desc">Đúng ngay, không cần nghĩ</span>
                </div>
                <div className="wf-srs-assess-btn ok" onClick={() => onAssess('ok')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '2px' }}><circle cx="12" cy="12" r="10"/><line x1="8" y1="15" x2="16" y2="15"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                    <span className="label">Hơi phân vân</span>
                    <span className="desc">Đoán đúng, không chắc chắn</span>
                </div>
                <div className="wf-srs-assess-btn bad" onClick={() => onAssess('bad')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--error)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '2px' }}><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                    <span className="label">Quên mất</span>
                    <span className="desc">Không nhớ, trả lời sai</span>
                </div>
            </div>
        </div>
    );
}
