import React from 'react';

export default function ReviewHintPopup({ item, onClose }) {
    // Generate a hint version of the word (e.g. "n _ v _ r")
    const wordHint = item.word.split('').map((char, index) => index % 2 === 0 ? char : '_').join(' ');

    return (
        <div className="wf-error-overlay" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
            <div className="wf-error-dialog" style={{ maxWidth: '380px', width: '90%', textAlign: 'left', background: '#FFF', border: '1.5px solid rgba(155, 93, 224, 0.2)', padding: '24px', borderRadius: '24px', boxShadow: '0 12px 36px rgba(28, 27, 46, 0.15)' }}>
                <div className="wf-error-dialog-title" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>Gợi ý</div>
                
                <div className="wf-card-solid" style={{ marginBottom: '16px', background: '#FAF8FF', border: '1px solid rgba(155, 93, 224, 0.12)', padding: '16px', borderRadius: '16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-primary)' }}>Từ cần điền: {wordHint}</div>
                    <div className="wf-subtitle" style={{ marginTop: '4px', color: 'var(--text-secondary)' }}>({item.word.length} chữ cái) - "{item.meaning}"</div>
                </div>
                
                <div className="wf-card" style={{ marginBottom: '16px', padding: '12px 16px', background: '#F9F9F9', border: '1px solid #EAEAEA', borderRadius: '16px' }}>
                    <div className="wf-subtitle" style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>Khung câu:</div>
                    <div className="wf-subtitle" style={{ fontStyle: 'italic', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        "{item.sentence.replace('______', '______')}"
                    </div>
                </div>
                
                <div className="wf-subtitle" style={{ marginBottom: '20px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Đồng hồ vẫn đang chạy, không reset thời gian.
                </div>
                
                <div className="flex-row justify-center gap-8">
                    <div role="button" tabIndex="0" className="wf-btn" style={{ padding: '10px 32px' }} onClick={onClose}>
                        Đã rõ, tiếp tục
                    </div>
                </div>
            </div>
        </div>
    );
}
