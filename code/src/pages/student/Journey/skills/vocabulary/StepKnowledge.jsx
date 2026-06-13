import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useAudio } from '../../../../../hooks/useAudio';

export default function StepKnowledge({ wordData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const { playTextToSpeech } = useAudio();

  const getImgSrc = (word) => {
    try {
      return new URL(`../../../../../assets/vocab/definition_imgs/${word.replace(/ /g, '_')}.jpg`, import.meta.url).href;
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onNext();
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        playTextToSpeech(wordData.word);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, playTextToSpeech, wordData.word]);

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
          <Link to="/student/vocabulary/select" className="hover:underline text-text-secondary">Học từ vựng</Link>
          <span className="opacity-50">&gt;</span>
          <span className="text-primary font-bold">{typeof mode !== 'undefined' ? (mode === 'fast' ? 'Fast Mode' : mode === 'deep' ? 'Deep Mode' : (mode || 'Mode')) : 'Mode'}</span>
        </div>
        <div className="wf-page-title">Kiến thức đầy đủ</div>
      </div>

      <div className="wf-topbar">
        <div className="wf-step-counter">
          <div className="wf-step-counter-item">Bước: <strong>{stepIndex}</strong> / {totalSteps}</div>
          <div className="wf-step-counter-divider"></div>
          <div className="wf-step-counter-item">Từ: <strong>{wordIndex + 1}</strong> / {totalWords}</div>
        </div>
        <div className="wf-progress-mini">
          <div className="wf-progress-mini-bar">
            <div className="wf-progress-mini-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div className="wf-progress-mini-label">{progressPercent}%</div>
        </div>
      </div>

      <div style={{ flex: 1, maxWidth: '1000px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '10px' }}>
        
        {/* Word Header Card */}
        <div style={{
          width: '100%',
          background: 'white',
          borderRadius: '16px',
          padding: '24px 32px',
          border: '1px solid rgba(155, 93, 224, 0.1)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div className="flex-col gap-8">
            <div className="flex-row items-center gap-12">
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--primary)' }}>{wordData.word}</div>
              <div style={{ fontSize: '15px', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.04)', padding: '2px 8px', borderRadius: '4px' }}>{wordData.type}</div>
            </div>
            <div style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>/{wordData.ipa}/</div>
          </div>
          
          <div 
            className="interactive"
            onClick={() => playTextToSpeech(wordData.word)}
            style={{
              width: '48px', height: '48px', 
              borderRadius: '50%', 
              background: '#F0ECFC',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--primary)',
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(155, 93, 224, 0.2)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>
              <path d="M16 9a5 5 0 0 1 0 6"/>
              <path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>
            </svg>
          </div>
        </div>

        {/* Meaning & Usage Card */}
        <div style={{
          width: '100%',
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid rgba(155, 93, 224, 0.1)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
        }}>
          <div className="flex-row items-center" style={{ gap: '8px', marginBottom: '16px', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '12px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Ý nghĩa & Cách dùng</div>
          </div>
          
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>
            {wordData.meaning}
          </div>
          <div style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
            {wordData.enMeaning}
          </div>
          
          {wordData.collocationRoot && (
            <div style={{ background: '#F5F5F5', borderRadius: '8px', padding: '12px', fontSize: '14px', color: '#555', borderLeft: '4px solid var(--primary)' }}>
              <strong style={{ color: 'var(--primary)' }}>Bản chất Collocation: </strong>
              {wordData.collocationRoot}
            </div>
          )}
        </div>

        {/* Row 1 */}
        <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
          
          {/* Examples Card */}
          <div style={{ 
            flex: '60%', 
            background: 'white', 
            borderRadius: '16px', 
            padding: '24px', 
            border: '1px solid rgba(155, 93, 224, 0.1)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
          }}>
            <div className="flex-row items-center" style={{ gap: '8px', marginBottom: '16px', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '12px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Ví dụ (Examples)</div>
            </div>
            
            <div className="flex-col gap-16">
              {wordData.contexts && wordData.contexts.map((ex, idx) => (
                <div key={idx} className="flex-col gap-4">
                  <div style={{ fontSize: '15px', color: 'var(--primary)', fontWeight: 'bold' }}>{ex.en}</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>"{ex.vi}"</div>
                </div>
              ))}
              {(!wordData.contexts || wordData.contexts.length === 0) && (
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Đang cập nhật ví dụ...</div>
              )}
            </div>
          </div>

          {/* Collocations Card */}
          <div style={{ 
            flex: '40%', 
            background: 'white', 
            borderRadius: '16px', 
            padding: '24px', 
            border: '1px solid rgba(155, 93, 224, 0.1)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
          }}>
            <div className="flex-row items-center" style={{ gap: '8px', marginBottom: '16px', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '12px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Collocations</div>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {wordData.collocations && wordData.collocations.map((col, idx) => (
                <div key={idx} style={{ 
                  background: '#F0E6FF', 
                  color: 'var(--primary)', 
                  padding: '6px 16px', 
                  borderRadius: '999px', 
                  fontSize: '13px',
                  border: '1px solid rgba(155, 93, 224, 0.2)'
                }}>
                  {col}
                </div>
              ))}
              {(!wordData.collocations || wordData.collocations.length === 0) && (
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Đang cập nhật collocations...</div>
              )}
            </div>
          </div>
        </div>

        {/* Row 2: Common Errors */}
        <div style={{ 
          width: '100%', 
          background: 'white', 
          borderRadius: '16px', 
          padding: '24px', 
          border: '1px solid rgba(155, 93, 224, 0.1)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
        }}>
          <div className="flex-row items-center" style={{ gap: '8px', marginBottom: '16px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--error)' }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--error)' }}>Lỗi thường gặp (Common Errors)</div>
          </div>
          
          <div style={{ 
            background: '#FFF5F5', 
            borderRadius: '12px', 
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div className="flex-row items-center" style={{ gap: '12px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--error)' }}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              <div style={{ fontSize: '14px', color: 'var(--text-primary)', textDecoration: 'line-through' }}>
                {wordData.commonError?.wrong || `${wordData.word} to someone`}
              </div>
            </div>
            <div className="flex-row items-center" style={{ gap: '12px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--success)' }}><polyline points="20 6 9 17 4 12"/></svg>
              <div style={{ fontSize: '14px', color: 'var(--success)', fontWeight: 'bold' }}>
                {wordData.commonError?.correct || `${wordData.word} with someone`}
              </div>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {wordData.commonError?.explanation || `Sử dụng giới từ đúng khi nói về đối tượng hành động, không dùng 'to'.`}
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
          
          {/* Related Words Card */}
          <div style={{ 
            flex: '50%', 
            background: 'white', 
            borderRadius: '16px', 
            padding: '24px', 
            border: '1px solid rgba(155, 93, 224, 0.1)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
          }}>
            <div className="flex-row items-center" style={{ gap: '8px', marginBottom: '16px', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '12px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Từ loại khác</div>
            </div>
            
            <div className="flex-col gap-16">
              {wordData.relatedWords && wordData.relatedWords.map((rw, idx) => (
                <div key={idx} className="flex-row justify-between items-center">
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--primary)' }}>{rw.word}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>({rw.type})</div>
                </div>
              ))}
              {(!wordData.relatedWords || wordData.relatedWords.length === 0) && (
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Đang cập nhật...</div>
              )}
            </div>
          </div>

          {/* Visualizing Card */}
          <div style={{ flex: '40%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ 
              width: '100%', 
              background: '#EAE5F5', 
              borderRadius: '16px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              aspectRatio: '1',
              color: 'var(--primary)',
              fontWeight: 'bold',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img 
                src={getImgSrc(wordData.word)} 
                alt={wordData.word}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div style={{ padding: '40px', textAlign: 'center', display: 'none' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎨</div>
                <div>Visualizing</div>
                <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '8px' }}>Đang tải hoặc thiếu ảnh minh họa</div>
              </div>
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="flex-row justify-center" style={{ marginTop: '10px' }}>
          <div role="button" tabIndex="0" className="wf-btn interactive" onClick={onNext} style={{ padding: '12px 48px' }}>
            Đã hiểu, tiếp tục
          </div>
        </div>

      </div>

      <div className="wf-hint-bar">
        <div className="flex-row gap-16">
          <div className="wf-hint-text"><span className="wf-hint-key">P</span> Nghe phát âm</div>
          <div className="wf-hint-text"><span className="wf-hint-key">Enter</span> Tiếp tục</div>
        </div>
        <div className="wf-hint-text" style={{ marginLeft: 'auto' }}>Xem kỹ các ví dụ để hiểu cách dùng</div>
      </div>
    </div>
  );
}
