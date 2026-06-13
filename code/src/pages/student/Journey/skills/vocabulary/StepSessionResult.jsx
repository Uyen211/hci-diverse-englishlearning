import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function StepSessionResult({ words, unitId, mode, wordStats, type = 'vocab' }) {
  const navigate = useNavigate();

  const xp = 125;
  const streak = 3;
  
  const processedWords = words.map((w) => {
    const isWeak = wordStats?.[w.id]?.isWeak || false;
    return { ...w, isWeak };
  });

  const masteredCount = processedWords.filter(w => !w.isWeak).length;
  const reviewCount = processedWords.filter(w => w.isWeak).length;

  const typeText = type === 'grammar' ? 'cấu trúc' : 'từ';
  const headerText = type === 'grammar' ? 'Học ngữ pháp' : 'Học từ vựng';

  return (
    <div className="wf-main-content">
      <div className="wf-unit-header">
        <div className="wf-breadcrumb">Bài học &gt; Unit {unitId} &gt; {headerText} &gt; <span className={`wf-breadcrumb-mode-${mode}`}>{mode === 'deep' ? 'Deep Mode' : 'Fast Mode'}</span></div>
        <div className="wf-page-title">Kết quả phiên học</div>
      </div>

      <div className="wf-topbar">
        <div className="wf-step-counter">
          <div className="wf-step-counter-item">Bước: <strong>8</strong> / 8</div>
          <div className="wf-step-counter-divider"></div>
          <div className="wf-step-counter-item">Mục: <strong>5</strong> / 5</div>
        </div>
        <div className="wf-progress-mini">
          <div className="wf-progress-mini-bar">
            <div className="wf-progress-mini-fill" style={{ width: '100%' }}></div>
          </div>
          <div className="wf-progress-mini-label">100%</div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '850px', margin: '0 auto', width: '100%' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🏆</div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '8px' }}>Hoàn thành phiên học</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Bạn đã hoàn thành các {typeText} của Unit {unitId}: Daily Life. Đây là tóm tắt</p>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'flex', gap: '20px', width: '100%', marginBottom: '32px' }}>
          <div style={{ flex: 1, background: 'white', borderRadius: '16px', padding: '24px', textAlign: 'center', border: '1px solid rgba(155, 93, 224, 0.1)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '4px' }}>{xp}</div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Điểm XP</div>
          </div>
          <div style={{ flex: 1, background: 'white', borderRadius: '16px', padding: '24px', textAlign: 'center', border: '1px solid rgba(155, 93, 224, 0.1)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '4px' }}>{streak}</div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Chuỗi học</div>
          </div>
          <div style={{ flex: 1, background: 'white', borderRadius: '16px', padding: '24px', textAlign: 'center', border: '1px solid rgba(155, 93, 224, 0.1)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '4px' }}>{masteredCount}</div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Thành thạo</div>
          </div>
          <div style={{ flex: 1, background: 'white', borderRadius: '16px', padding: '24px', textAlign: 'center', border: '1px solid rgba(155, 93, 224, 0.1)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '4px' }}>{reviewCount}</div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Cần ôn tập</div>
          </div>
        </div>

        <div style={{ width: '100%', marginBottom: '16px', fontWeight: 'bold', color: 'var(--text-primary)' }}>Chi tiết từng {typeText}</div>

        <div className="flex-col gap-12" style={{ width: '100%', marginBottom: '32px' }}>
          {processedWords.map((w, idx) => (
            <div key={idx} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              background: 'white', 
              borderRadius: '12px', 
              padding: '16px 24px', 
              border: '1px solid rgba(0,0,0,0.05)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Left Color Bar */}
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px', background: w.isWeak ? 'var(--error)' : 'var(--success)' }}></div>
              
              <div className="flex-row items-center gap-12">
                <div style={{ 
                  width: '24px', height: '24px', borderRadius: '50%', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: w.isWeak ? 'rgba(235, 87, 87, 0.1)' : 'rgba(39, 174, 96, 0.1)',
                  color: w.isWeak ? 'var(--error)' : 'var(--success)',
                  fontSize: '12px'
                }}>
                  {w.isWeak ? '!' : '✓'}
                </div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                  {w.word} {type === 'vocab' && <span style={{ fontWeight: 'normal', color: 'var(--text-secondary)', marginLeft: '8px' }}>{w.ipa}</span>}
                </div>
              </div>

              <div style={{ 
                padding: '6px 16px', 
                borderRadius: '20px', 
                fontSize: '13px',
                background: w.isWeak ? 'rgba(0,0,0,0.03)' : 'rgba(155, 93, 224, 0.1)',
                color: w.isWeak ? 'var(--text-secondary)' : '#6b4c9a',
                border: w.isWeak ? '1px dashed #CCC' : '1px dashed rgba(155, 93, 224, 0.5)'
              }}>
                {w.isWeak ? 'Cần ôn tập' : 'Thành thạo'}
              </div>
            </div>
          ))}
        </div>

        <div style={{ 
          width: '100%', 
          background: '#FAF8FF', 
          border: '1px solid rgba(155, 93, 224, 0.1)', 
          borderRadius: '16px', 
          padding: '24px',
          marginBottom: '40px'
        }}>
          <div style={{ fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px' }}>Lịch ôn tập SRS</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{reviewCount} {typeText} yếu sẽ được ôn tập sớm hơn</div>
        </div>

        <div className="flex-row justify-center gap-16">
          <button 
            className="wf-btn wf-btn-outline" 
            style={{ minWidth: '200px' }}
            onClick={() => navigate('/student/dashboard')}
          >
            Học tiếp Unit khác
          </button>
          <button 
            className="wf-btn wf-btn-primary" 
            style={{ minWidth: '200px' }}
            onClick={() => navigate('/student/dashboard')}
          >
            Quay lại danh sách
          </button>
        </div>

      </div>
    </div>
  );
}
