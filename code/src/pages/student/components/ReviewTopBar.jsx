import React from 'react';

export default function ReviewTopBar({ current, total, correct, incorrect }) {
    const progressPct = ((current - 1) / total) * 100;

    return (
        <>
            <div className="flex flex-col mb-6 relative">
                <h2 className="font-heading text-2xl font-extrabold text-text-primary tracking-tight">Điền từ còn thiếu</h2>
            </div>

            <div className="wf-topbar">
                <div className="wf-step-counter">
                    <div className="wf-step-counter-item">Mục: <strong>{current}</strong> / {total}</div>
                    <div className="wf-step-counter-divider"></div>
                    <div className="wf-step-counter-item">Đúng: <strong>{correct}</strong></div>
                    <div className="wf-step-counter-divider"></div>
                    <div className="wf-step-counter-item">Sai: <strong>{incorrect}</strong></div>
                </div>
                <div className="wf-progress-mini">
                    <div className="wf-progress-mini-bar">
                        <div className="wf-progress-mini-fill" style={{ width: `${progressPct}%` }}></div>
                    </div>
                    <div className="wf-progress-mini-label">{current} / {total}</div>
                </div>
            </div>
        </>
    );
}
