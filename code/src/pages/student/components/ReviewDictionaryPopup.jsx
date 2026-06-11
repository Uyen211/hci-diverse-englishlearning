import React from 'react';

export default function ReviewDictionaryPopup({ item, onClose }) {
    return (
        <div className="wf-error-overlay" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(4px)' }}>
            <div className="wf-error-dialog" style={{ background: '#FFF', border: '1.5px solid rgba(155, 93, 224, 0.2)', padding: '32px', width: '600px', maxWidth: '90%', borderRadius: '28px', boxShadow: '0 12px 36px rgba(28, 27, 46, 0.15)', position: 'relative', textAlign: 'left' }}>
                <div 
                    style={{ position: 'absolute', top: '24px', right: '24px', cursor: 'pointer', color: 'var(--text-secondary)', fontWeight: 'bold', fontSize: '18px', padding: '8px', lineHeight: 1 }}
                    onClick={onClose}
                >
                    ✕
                </div>
                
                <div className="flex-row items-center gap-12" style={{ marginBottom: '24px', borderBottom: '1px solid rgba(155, 93, 224, 0.15)', paddingBottom: '20px' }}>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>{item.word}</div>
                    <div className="wf-text-block-solid" style={{ fontSize: '13px', background: 'var(--light-accent)', color: 'var(--text-primary)', padding: '6px 12px', borderRadius: '12px' }}>{item.pronunciation}</div>
                    <div className="wf-placeholder-box interactive" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F4F5FF', border: '1px solid rgba(155, 93, 224, 0.3)', cursor: 'pointer' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="var(--primary)" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                    </div>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>Định nghĩa ({item.type || 'verb'}):</div>
                    <div style={{ fontSize: '16px', color: 'var(--text-primary)', lineHeight: 1.5 }}>{item.meaning}</div>
                </div>
                
                {item.exampleSentence && (
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>Ví dụ:</div>
                        <div style={{ background: '#FAF8FF', padding: '16px', borderLeft: '4px solid var(--primary)', borderRadius: '0 12px 12px 0' }}>
                            <div style={{ fontSize: '15px', color: 'var(--text-primary)', fontStyle: 'italic', marginBottom: '6px' }}>
                                {item.exampleSentence}
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                ({item.exampleMeaning})
                            </div>
                        </div>
                    </div>
                )}
                
                {item.collocations && (
                    <div style={{ marginBottom: '32px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px', color: 'var(--text-secondary)' }}>Thường đi kèm với (Collocations):</div>
                        <div className="flex-row gap-6" style={{ flexWrap: 'wrap' }}>
                            {item.collocations.map((colloc, idx) => (
                                <span key={idx} style={{ background: '#F4F5FF', color: 'var(--primary)', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 500 }}>
                                    {colloc}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex-row justify-center">
                    <div role="button" tabIndex="0" className="wf-btn" style={{ padding: '12px 36px' }} onClick={onClose}>
                        Đóng tra cứu
                    </div>
                </div>
            </div>
        </div>
    );
}
