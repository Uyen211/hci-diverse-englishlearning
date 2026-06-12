import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function VocabSelect() {
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
        navigate(`/student/vocabulary/session?mode=${selectedMode}`, { state: { unitId } });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMode, navigate]);

  return (
    <div className="wf-main-content">
      <div className="wf-unit-header">
        <div className="wf-breadcrumb">Bài học &gt; Unit {unitId} &gt; <span>Học từ vựng</span></div>
        <div className="wf-page-title">Học Nhóm Từ Vựng</div>
      </div>

      <div className="wf-card-highlight text-center" style={{ padding: '24px', flex: 1 }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Bạn muốn học như thế nào?</div>
        <div className="wf-subtitle" style={{ marginBottom: '8px' }}>Chọn chế độ phù hợp với mục tiêu của bạn</div>
        <div className="wf-word-count">Từ vựng cần học: <strong>5</strong> từ</div>

        <div className="wf-mode-grid" style={{ marginBottom: '20px' }}>
          <div 
            className={`wf-mode-card ${selectedMode === 'fast' ? 'selected' : ''}`}
            onClick={() => setSelectedMode('fast')}
          >
            <div className={`wf-mode-card-check ${selectedMode === 'fast' ? 'selected' : ''}`}></div>
            <div className="wf-mode-card-title">Fast Mode</div>
            <div className="wf-mode-card-desc">Học nhanh, bỏ qua các bước không cần thiết. Phù hợp với ôn tập và xem lại.</div>
            <div className="wf-mode-card-tag">Có luyện phát âm</div>
          </div>
          <div 
            className={`wf-mode-card ${selectedMode === 'deep' ? 'selected' : ''}`}
            onClick={() => setSelectedMode('deep')}
          >
            <div className={`wf-mode-card-check ${selectedMode === 'deep' ? 'selected' : ''}`}></div>
            <div className="wf-mode-card-title">Deep Mode</div>
            <div className="wf-mode-card-desc">Học sâu, đầy đủ nghe-nói-đọc-viết. Dành cho người muốn thực sự ghi nhớ.</div>
            <div className="wf-mode-card-tag">Có luyện phát âm</div>
          </div>
        </div>

        <div 
          role="button" 
          tabIndex="0" 
          accessKey="b" 
          className="wf-btn" 
          style={{ padding: '10px 48px', fontSize: '14px' }}
          onClick={() => navigate(`/student/vocabulary/session?mode=${selectedMode}`, { state: { unitId } })}
        >
          <u>B</u>ắt đầu học
        </div>
      </div>

      <div className="wf-hint-bar">
        <div className="wf-hint-text"><span className="wf-hint-key">Enter</span> để bắt đầu</div>
        <div className="wf-hint-text">Mũi tên <strong>trái/phải</strong> để chuyển đổi chế độ</div>
      </div>
    </div>
  );
}
