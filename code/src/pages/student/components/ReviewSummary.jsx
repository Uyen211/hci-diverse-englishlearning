import React from 'react';

export default function ReviewSummary({ stats, onGoHome }) {
    return (
        <div className="wf-main-content" style={{ padding: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="flex flex-col mb-6 relative">
                <h2 className="font-heading text-2xl font-extrabold text-text-primary tracking-tight">Hoàn thành phiên ôn tập!</h2>
            </div>

            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                <div className="bg-surface border border-border shadow-xl rounded-2xl w-full text-center p-8">
                    <div className="wf-title" style={{ fontSize: '24px', marginBottom: '6px' }}>Bạn đã ôn tập <strong style={{ fontSize: '28px' }}>{stats.totalReviewed}</strong> mục</div>
                    <div className="wf-subtitle" style={{ fontSize: '14px', marginBottom: '20px' }}>Tuyệt vời! Hãy giữ vững phong độ nhé.</div>

                    <div className="wf-srs-overview" style={{ marginBottom: '24px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className="wf-srs-overview-item" style={{ borderColor: 'rgba(34, 197, 94, 0.2)' }}>
                            <div className="num" style={{ color: '#22C55E' }}>{stats.correct}</div>
                            <div className="lbl" style={{ color: '#22C55E' }}>Nhớ tốt</div>
                        </div>
                        <div className="wf-srs-overview-item" style={{ borderColor: 'rgba(245, 158, 11, 0.2)' }}>
                            <div className="num" style={{ color: '#F59E0B' }}>{stats.ok}</div>
                            <div className="lbl" style={{ color: '#F59E0B' }}>Phân vân</div>
                        </div>
                        <div className="wf-srs-overview-item" style={{ borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                            <div className="num" style={{ color: '#EF4444' }}>{stats.bad}</div>
                            <div className="lbl" style={{ color: '#EF4444' }}>Quên mất</div>
                        </div>
                    </div>

                    <div className="wf-subtitle" style={{ fontSize: '14px', marginBottom: '24px', background: '#F9F9F9', padding: '12px', borderLeft: '3px solid var(--primary)' }}>
                        Dự kiến lịch ôn tập tiếp theo: <strong>Ngày mai (Khoảng 8 mục)</strong>
                    </div>

                    <div role="button" tabIndex="0" className="wf-btn" style={{ padding: '14px 48px', fontSize: '16px', display: 'inline-block' }} onClick={onGoHome}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> 
                        Về trang chủ
                    </div>
                </div>
            </div>
        </div>
    );
}
