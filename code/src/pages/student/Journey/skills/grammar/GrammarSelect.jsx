import React, { useState, useEffect } from 'react';
import {  useNavigate, useLocation , Link } from 'react-router-dom';

export default function GrammarSelect() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState('fast');
  const location = useLocation();
  const unitId = location.state?.unitId || 3;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        setSelectedMode(prev => prev === 'fast' ? 'deep' : 'fast');
      }
      if (e.key === 'Enter') {
        navigate(`/student/grammar/session?mode=${selectedMode}`, { state: { unitId } });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMode, navigate, unitId]);

  return (
    <div className="wf-main-content">
      <div className="wf-unit-header">
        <div className="wf-breadcrumb flex flex-wrap items-center gap-1">
          <Link to="/" className="hover:underline text-text-secondary">Trang chủ</Link>
          <span className="opacity-50">&gt;</span>
          <Link to="/student/journey" className="hover:underline text-text-secondary">Hành trình</Link>
          <span className="opacity-50">&gt;</span>
          <Link to={`/student/journey/unit/${typeof unitId !== 'undefined' ? unitId : 3}`} className="hover:underline text-text-secondary">Unit {typeof unitId !== 'undefined' ? unitId : 3}</Link>
          <span className="opacity-50">&gt;</span>
          <span className="text-primary font-bold">Học ngữ pháp</span>
        </div>
        <div className="wf-page-title">Học Điểm Ngữ Pháp</div>
      </div>

      <div className="wf-card-highlight text-center" style={{ padding: '24px', flex: 1 }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Bạn muốn học như thế nào?</div>
        <div className="wf-subtitle" style={{ marginBottom: '8px' }}>Chọn chế độ phù hợp với mục tiêu của bạn</div>
        <div className="wf-word-count">Cấu trúc cần học: <strong>3</strong> điểm ngữ pháp</div>

        <div className="wf-mode-grid" style={{ marginBottom: '20px' }}>
          <div 
            className={`wf-mode-card ${selectedMode === 'fast' ? 'selected' : ''}`}
            onClick={() => setSelectedMode('fast')}
          >
            <div className={`wf-mode-card-check ${selectedMode === 'fast' ? 'selected' : ''}`}></div>
            <div className="wf-mode-card-title">Fast Mode</div>
            <div className="wf-mode-card-desc">Học nhanh, bỏ qua các bước luyện tập sản sinh. Phù hợp với ôn tập và xem lại.</div>
            <div className="wf-mode-card-tag">Lược bỏ viết câu</div>
          </div>
          <div 
            className={`wf-mode-card ${selectedMode === 'deep' ? 'selected' : ''}`}
            onClick={() => setSelectedMode('deep')}
          >
            <div className={`wf-mode-card-check ${selectedMode === 'deep' ? 'selected' : ''}`}></div>
            <div className="wf-mode-card-title">Deep Mode</div>
            <div className="wf-mode-card-desc">Học sâu, đầy đủ nghe-nói-đọc-viết. Dành cho người muốn vận dụng vào giao tiếp.</div>
            <div className="wf-mode-card-tag">Bắt buộc xây dựng câu</div>
          </div>
        </div>

        <div 
          role="button" 
          tabIndex="0" 
          accessKey="b" 
          className="wf-btn" 
          style={{ padding: '10px 48px', fontSize: '14px' }}
          onClick={() => navigate(`/student/grammar/session?mode=${selectedMode}`, { state: { unitId } })}
        >
          Bắt đầu học
        </div>
      </div>

      <div className="wf-hint-bar">
        <div className="wf-hint-text"><span className="wf-hint-key">Enter</span> để bắt đầu</div>
        <div className="wf-hint-text">Mũi tên <strong>trái/phải</strong> để chuyển đổi chế độ</div>
      </div>
    </div>
  );
}
