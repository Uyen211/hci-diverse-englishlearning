import React from 'react';

export default function ReviewFeedback({ item, isCorrect, userAnswer, onNext }) {
    return (
        <div className="wf-card" style={{ padding: '20px', borderColor: isCorrect ? '#22C55E' : '#EF4444', display: 'flex', flexDirection: 'column' }}>
            <div className="wf-label" style={{ marginBottom: '12px' }}>
                {isCorrect ? 
                    <span style={{ color: '#22C55E', fontWeight: 'bold' }}>Chính xác!</span> : 
                    <span style={{ color: '#EF4444', fontWeight: 'bold' }}>Chưa chính xác!</span>
                }
            </div>

            <div className="flex-col gap-6">
                <div style={{ background: '#F9F9F9', padding: '12px', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
                    <div className="wf-subtitle" style={{ fontWeight: 'bold', marginBottom: '4px' }}>Giải thích ngữ pháp:</div>
                    <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
                        {item.grammarNote || 'Không có giải thích thêm.'}
                    </div>
                </div>

                {!isCorrect && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '12px', borderRadius: '8px', borderLeft: '4px solid #EF4444' }}>
                        <div className="wf-subtitle" style={{ fontWeight: 'bold', marginBottom: '4px', color: '#EF4444' }}>Đáp án của bạn:</div>
                        <div style={{ fontSize: '14px', color: '#EF4444', textDecoration: 'line-through' }}>{userAnswer || '(Không có)'}</div>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '4px', color: '#22C55E' }}>Đáp án đúng: {item.word}</div>
                    </div>
                )}
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <div role="button" tabIndex="0" className="wf-btn" style={{ padding: '10px 32px' }} onClick={onNext}>
                    Câu tiếp theo
                </div>
            </div>
        </div>
    );
}
