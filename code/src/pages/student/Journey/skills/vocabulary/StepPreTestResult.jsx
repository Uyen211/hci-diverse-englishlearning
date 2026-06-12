import React, { useEffect } from 'react';

export default function StepPreTestResult({ wordData, mode, onNext, unitId, pretestResult }) {
  const isCorrect = pretestResult === 'correct';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onNext('learn');
      } else if ((e.key === 's' || e.key === 'S') && isCorrect) {
        e.preventDefault();
        onNext('skip');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, isCorrect]);

  return (
    <div className="wf-main-content">
      <div className="wf-unit-header">
        <div className="wf-breadcrumb">Bài học &gt; Unit {unitId} &gt; Học từ vựng &gt; <span className={`wf-breadcrumb-mode-${mode}`}>{mode === 'deep' ? 'Deep Mode' : 'Fast Mode'}</span></div>
        <div className="wf-page-title">Pre-test: Kết quả</div>
      </div>

      <div style={{ flex: 1, maxWidth: '700px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', paddingTop: '40px' }}>
        
        {/* Status Pill */}
        <div style={{ 
          background: isCorrect ? 'var(--success)' : 'var(--error)', 
          color: 'white', 
          padding: '6px 24px', 
          borderRadius: '9999px', 
          fontWeight: 'bold', 
          fontSize: '14px',
          textTransform: 'uppercase'
        }}>
          KẾT QUẢ PRE-TEST: {isCorrect ? 'ĐẠT' : 'CHƯA ĐẠT'}
        </div>

        {/* Word Card */}
        <div style={{ 
          width: '100%', 
          border: '1px solid rgba(155, 93, 224, 0.5)', 
          borderRadius: '16px', 
          padding: '24px', 
          background: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          position: 'relative'
        }}>
          <div className="flex-row items-center" style={{ gap: '16px', marginBottom: '16px' }}>
            <div style={{ 
              fontSize: '28px', 
              fontWeight: 'bold', 
              color: 'var(--primary)',
              border: '1px solid rgba(155, 93, 224, 0.3)',
              borderRadius: '999px',
              padding: '4px 20px'
            }}>
              {wordData.word}
            </div>
            <div className="flex-col">
              <div style={{ 
                background: '#FFD6E8', 
                color: '#D10068', 
                padding: '2px 12px', 
                borderRadius: '999px', 
                fontSize: '13px', 
                fontWeight: '600',
                width: 'fit-content'
              }}>
                {wordData.ipa}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {wordData.type === 'n' ? 'danh từ (noun)' : wordData.type === 'v' ? 'động từ (verb)' : wordData.type === 'adj' ? 'tính từ (adjective)' : 'từ loại'}
              </div>
            </div>

            <div style={{ flex: 1 }}></div>
            
            <div 
              className="wf-placeholder-box interactive" 
              style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px dashed var(--primary)', background: 'transparent' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)', marginLeft: '2px' }}>
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </div>

          <div style={{ 
            border: '1px solid rgba(0,0,0,0.08)', 
            borderRadius: '8px', 
            padding: '16px',
            fontSize: '15px'
          }}>
            <strong>Định nghĩa:</strong> {wordData.meaning}
          </div>
        </div>

        {/* Mastery Bar */}
        <div style={{ 
          width: '100%', 
          background: 'white',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '16px',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div className="flex-row justify-between items-center">
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Mức độ nắm vững</span>
            <div style={{ 
              background: isCorrect ? '#D1FAE5' : '#FEE2E2', 
              color: isCorrect ? '#059669' : '#DC2626', 
              padding: '2px 12px', 
              borderRadius: '4px', 
              fontSize: '12px', 
              fontWeight: 'bold' 
            }}>
              {isCorrect ? 'CAO' : 'THẤP'}
            </div>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#F3F4F6', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ width: isCorrect ? '80%' : '20%', height: '100%', background: 'var(--primary)', transition: 'width 0.5s ease' }}></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex-col items-center" style={{ marginTop: '16px', gap: '12px' }}>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            {isCorrect ? 'Bạn đã biết từ này. Có thể bỏ qua để tiết kiệm thời gian.' : 'Bạn chưa thuộc từ này. Cần học kỹ hơn.'}
          </div>
          <div className="flex-row gap-16">
            {isCorrect ? (
              <>
                <div role="button" tabIndex="0" className="wf-btn" style={{ background: 'white', color: 'var(--primary)', border: '1px solid var(--primary)' }} onClick={() => onNext('skip')}>
                  Bỏ qua (Skip)
                </div>
                <div role="button" tabIndex="0" className="wf-btn" onClick={() => onNext('learn')}>
                  Vẫn học đầy đủ
                </div>
              </>
            ) : (
              <div role="button" tabIndex="0" className="wf-btn" onClick={() => onNext('learn')}>
                Bắt đầu học
              </div>
            )}
          </div>
        </div>

      </div>

      <div className="wf-hint-bar">
        <div className="flex-row gap-16">
          {isCorrect && <div className="wf-hint-text"><span className="wf-hint-key">S</span> Bỏ qua</div>}
          <div className="wf-hint-text"><span className="wf-hint-key">Enter</span> {isCorrect ? 'Học đầy đủ' : 'Bắt đầu học'}</div>
        </div>
        <div className="wf-hint-text" style={{ marginLeft: 'auto' }}>Từ tested-out sẽ được ôn tập sau</div>
      </div>
    </div>
  );
}
