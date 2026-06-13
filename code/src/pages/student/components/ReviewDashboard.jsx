import React from 'react';
import { Link } from 'react-router-dom';

export default function ReviewDashboard({ stats, onStart }) {
    return (
        <div className="wf-main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="breadcrumbs flex items-center gap-2 text-xs font-semibold text-text-secondary mb-4">
                <Link to="/" className="hover:underline text-text-secondary">Trang chủ</Link>
                <span className="opacity-50">&gt;</span>
                <span className="text-primary font-bold">Ôn tập</span>
            </div>

            <div className="flex flex-col gap-2 mb-6">
                <h1 className="page-title text-3xl font-extrabold text-text-primary tracking-tight">
                    Bắt đầu ôn tập ngay
                </h1>
                <p className="text-text-secondary text-sm" style={{ marginTop: '-8px' }}>
                    Ôn lại những kiến thức đã học để ghi nhớ lâu hơn!
                </p>
            </div>

            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                <div className="bg-surface border border-border shadow-xl rounded-2xl w-full text-center p-8">
                    <div className="wf-title" style={{ fontSize: '24px', marginBottom: '6px' }}>Hôm nay bạn có <strong style={{ fontSize: '28px' }}>{stats.total}</strong> mục cần ôn</div>
                    <div className="wf-subtitle" style={{ fontSize: '14px', marginBottom: '4px' }}>Thời gian dự kiến: <strong>~{stats.estimatedTime} phút</strong></div>
                    <div className="wf-subtitle" style={{ fontSize: '12px', marginBottom: '20px' }}>Mục khó nhất: <strong>"{stats.hardestWord}"</strong> (đã sai 2 lần trước)</div>

                    <div className="wf-srs-overview" style={{ marginBottom: '24px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className="wf-srs-overview-item"><div className="num">{stats.vocab}</div><div className="lbl">Từ vựng</div></div>
                        <div className="wf-srs-overview-item"><div className="num">{stats.grammar}</div><div className="lbl">Ngữ pháp</div></div>
                        <div className="wf-srs-overview-item" style={{ borderColor: 'rgba(239, 68, 68, 0.2)' }}><div className="num" style={{ color: '#EF4444' }}>{stats.weak}</div><div className="lbl" style={{ color: '#EF4444', fontWeight: 'bold' }}>Yếu</div></div>
                    </div>

                    <div role="button" tabIndex="0" onClick={onStart} className="wf-btn" style={{ padding: '14px 48px', fontSize: '16px', display: 'inline-block' }}>Bắt đầu ôn tập</div>
                </div>
            </div>

            <div className="wf-hint-bar">
                <div className="wf-hint-text"><span className="wf-hint-key">Enter</span> Bắt đầu ôn tập</div>
                <div className="wf-hint-text">Bạn có thể kết thúc sớm bất cứ lúc nào trong phiên ôn</div>
            </div>
        </div>
    );
}
