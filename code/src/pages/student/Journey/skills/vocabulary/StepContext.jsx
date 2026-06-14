import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { useAudio } from '../../../../../hooks/useAudio';

export default function StepContext({ wordData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const { playSuccessEarcon, playErrorEarcon } = useAudio();
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showEmptyError, setShowEmptyError] = useState(false);
  const [isWrongOpt, setIsWrongOpt] = useState(false);
  
  const [options, setOptions] = useState([]);
  
  // Video state
  const videos = wordData.videos || [];
  const hasVideos = videos.length > 0;
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoStatus, setVideoStatus] = useState('Đang phát'); // 'Đang phát', 'Đã phát xong'
  const videoRef = useRef(null);

  useEffect(() => {
    // Generate options using wordData.meaningOptions
    if (wordData.meaningOptions && wordData.meaningOptions.length >= 3) {
      // Create a random arrangement for A, B, C from the first 3 meaning options or mix
      // For simplicity, let's just take the correct meaning and 2 wrong meanings
      const wrongMeanings = wordData.meaningOptions.filter(m => m !== wordData.meaning).slice(0, 2);
      const allThree = [wordData.meaning, ...wrongMeanings];
      // Shuffle
      allThree.sort(() => Math.random() - 0.5);
      setOptions([
        { id: 'A', text: allThree[0] }, 
        { id: 'B', text: allThree[1] }, 
        { id: 'C', text: allThree[2] }
      ]);
    } else {
      const dummies = ['Do dự, lúng túng', 'Từ bỏ, bỏ rơi', wordData.meaning || 'Hoàn thành, đạt được'];
      setOptions([{ id: 'A', text: dummies[2] }, { id: 'B', text: dummies[0] }, { id: 'C', text: dummies[1] }]);
    }
  }, [wordData]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      } else {
        if (e.key.toUpperCase() === 'A') { setSelectedOpt(options[0]?.text); setShowEmptyError(false); setIsWrongOpt(false); }
        if (e.key.toUpperCase() === 'B') { setSelectedOpt(options[1]?.text); setShowEmptyError(false); setIsWrongOpt(false); }
        if (e.key.toUpperCase() === 'C') { setSelectedOpt(options[2]?.text); setShowEmptyError(false); setIsWrongOpt(false); }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOpt, options]);

  const handleSubmit = () => {
    if (!selectedOpt) {
      setShowEmptyError(true);
      playErrorEarcon();
      return;
    }
    setShowEmptyError(false);
    if (selectedOpt === wordData.meaning) {
      setIsWrongOpt(false);
      playSuccessEarcon();
      onNext();
    } else {
      setIsWrongOpt(true);
      playErrorEarcon();
    }
  };

  const handleVideoEnd = () => {
    setVideoStatus('Đã phát xong');
  };

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setVideoStatus('Đang phát');
    }
  };

  const nextVideo = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
      setVideoStatus('Đang phát');
    }
  };

  const prevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(prev => prev - 1);
      setVideoStatus('Đang phát');
    }
  };

  const allViewed = videoStatus === 'Đã phát xong' && currentVideoIndex === videos.length - 1;

  const currentVideo = hasVideos ? videos[currentVideoIndex] : null;

  const renderHighlightedText = (text, highlightWord, highlightColor = 'var(--primary)') => {
    if (!text || !highlightWord) return text;
    // Split case-insensitively by the target word
    const parts = text.split(new RegExp(`(${highlightWord})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) => 
          part.toLowerCase() === highlightWord.toLowerCase() ? (
            <span key={index} style={{ color: highlightColor, fontWeight: 'bold' }}>{part}</span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <div className="wf-main-content">
      <div className="wf-unit-header">
        <div className="wf-breadcrumb flex flex-wrap items-center gap-1">
          <Link to="/" className="hover:underline text-text-secondary">Trang chủ</Link>
          <span className="opacity-50">&gt;</span>
          <Link to="/student/journey" className="hover:underline text-text-secondary">Hành trình</Link>
          <span className="opacity-50">&gt;</span>
          <Link to={`/student/unit/${typeof unitId !== 'undefined' ? unitId : 3}`} className="hover:underline text-text-secondary">Unit {typeof unitId !== 'undefined' ? unitId : 3}</Link>
          <span className="opacity-50">&gt;</span>
          <Link to="/student/vocabulary-select" className="hover:underline text-text-secondary">Học từ vựng</Link>
          <span className="opacity-50">&gt;</span>
          <span className="text-primary font-bold">{typeof mode !== 'undefined' ? (mode === 'fast' ? 'Fast Mode' : mode === 'deep' ? 'Deep Mode' : (mode || 'Mode')) : 'Mode'}</span>
        </div>
        <div className="wf-page-title">Đoán nghĩa từ ngữ cảnh</div>
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

      <div style={{ display: 'flex', gap: '24px', width: '100%', maxWidth: '1200px', margin: '0 auto', paddingTop: '10px' }}>
        
        {/* Left Column: Video */}
        <div style={{ flex: '55%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ 
            width: '100%', 
            aspectRatio: '16/9', 
            background: '#000', 
            borderRadius: '16px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            {hasVideos ? (
              <video 
                ref={videoRef}
                src={currentVideo.url} 
                autoPlay 
                onEnded={handleVideoEnd}
                style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', top: 0, left: 0 }}
              />
            ) : (
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(255,255,255,0.5)' }}>Video đang cập nhật...</div>
            )}
            
            <div className="flex-row justify-between w-full" style={{ padding: '16px', position: 'relative', zIndex: 10 }}>
              <div style={{ background: 'rgba(0,0,0,0.5)', color: 'white', padding: '4px 12px', borderRadius: '999px', fontSize: '12px' }}>Vid {currentVideoIndex + 1} / {videos.length || 1}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', background: 'rgba(0,0,0,0.5)', padding: '4px 12px', borderRadius: '999px' }}>{videoStatus}</div>
            </div>
            
            <div style={{ width: '100%', textAlign: 'center', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '40px 20px 20px 20px', color: 'white', fontSize: '16px', position: 'relative', zIndex: 10 }}>
              "{renderHighlightedText(hasVideos ? currentVideo.caption : (wordData.contexts?.[0]?.en || `She wanted to ${wordData.word} something meaningful.`), wordData.word, '#FFD700')}"
            </div>
          </div>

          <div className="flex-col gap-12" style={{ width: '100%' }}>
            {/* Top Row: Progress Bars */}
            <div className="flex-row items-center justify-center" style={{ gap: '8px', width: '100%' }}>
              {videos.map((_, idx) => (
                <div key={idx} style={{ 
                  flex: 1,
                  maxWidth: '40px',
                  height: '4px', 
                  background: idx <= currentVideoIndex ? 'var(--primary)' : 'rgba(155, 93, 224, 0.2)', 
                  borderRadius: '999px',
                  transition: 'background 0.3s'
                }}></div>
              ))}
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginLeft: '8px', whiteSpace: 'nowrap' }}>
                {currentVideoIndex + 1} / {videos.length || 1} clip
              </div>
            </div>

            {/* Bottom Row: Controls */}
            <div className="flex-row items-center justify-between" style={{ width: '100%' }}>
              <div style={{ border: `1px solid ${allViewed ? 'var(--success)' : 'var(--primary)'}`, color: allViewed ? 'var(--success)' : 'var(--primary)', padding: '6px 16px', borderRadius: '999px', fontSize: '13px', transition: 'all 0.3s', whiteSpace: 'nowrap', flexShrink: 0 }}>
                {allViewed ? 'Đã xem hết clip' : 'Đang xem...'}
              </div>

              <div className="flex-row gap-8" style={{ flexShrink: 0 }}>
                <div className={`wf-btn outline ${currentVideoIndex === 0 ? 'disabled' : ''}`} onClick={prevVideo} style={{ padding: '8px 12px', fontSize: '13px', whiteSpace: 'nowrap' }}>&lt; Lùi</div>
                <div className="wf-btn" onClick={playVideo} style={{ padding: '8px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/><path d="m16 5 5 5-5 5"/></svg>
                  Phát lại
                </div>
                <div className={`wf-btn outline ${currentVideoIndex === videos.length - 1 ? 'disabled' : ''}`} onClick={nextVideo} style={{ padding: '8px 12px', fontSize: '13px', whiteSpace: 'nowrap' }}>Kế tiếp &gt;</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Question */}
        <div style={{ flex: '45%' }}>
          <div style={{ 
            width: '100%', 
            background: 'white', 
            borderRadius: '16px', 
            padding: '24px', 
            border: '2px solid var(--primary)',
            boxShadow: '0 4px 12px rgba(155, 93, 224, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: 'var(--primary)', color: 'white', padding: '4px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>ĐOÁN NGHĨA</div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Vui lòng chọn đáp án</div>
            </div>

            <div style={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', padding: '20px', textAlign: 'center', fontSize: '15px' }}>
              "{renderHighlightedText(hasVideos ? currentVideo.caption : `She wanted to ${wordData.word} something meaningful.`, wordData.word)}"
            </div>

            <div style={{ fontSize: '15px', color: 'var(--text-primary)' }}>
              Từ <strong>"{wordData.word}"</strong> có nghĩa là gì?
            </div>

            <div className="flex-col gap-12">
              {options.map((opt) => {
                const isSelected = selectedOpt === opt.text;
                return (
                  <div 
                    key={opt.id}
                    role="button"
                    tabIndex="0"
                    className={`interactive ${isSelected ? 'selected' : ''}`}
                    onClick={() => { setSelectedOpt(opt.text); setShowEmptyError(false); setIsWrongOpt(false); }}
                    style={{
                      border: `1px solid ${(isSelected && isWrongOpt) ? 'var(--error)' : isSelected ? 'var(--primary)' : 'rgba(0,0,0,0.08)'}`,
                      borderRadius: '999px',
                      padding: '12px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      background: (isSelected && isWrongOpt) ? '#FFF5F5' : isSelected ? '#FAF8FF' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      animation: (isSelected && isWrongOpt) ? 'shake 0.4s' : 'none'
                    }}
                  >
                    <div style={{ 
                      width: '28px', height: '28px', borderRadius: '50%', 
                      background: (isSelected && isWrongOpt) ? '#FFE6E6' : isSelected ? '#F0E6FF' : 'white',
                      color: (isSelected && isWrongOpt) ? 'var(--error)' : isSelected ? 'var(--primary)' : 'var(--text-secondary)',
                      border: `1px solid ${(isSelected && isWrongOpt) ? 'var(--error)' : isSelected ? 'var(--primary)' : 'rgba(0,0,0,0.2)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '14px', fontWeight: 'bold'
                    }}>
                      {opt.id}
                    </div>
                    <div style={{ fontSize: '15px', color: 'var(--text-primary)' }}>{opt.text}</div>
                  </div>
                );
              })}
            </div>

            {showEmptyError && (
              <div style={{ color: 'var(--error)', fontSize: '13px', marginTop: '8px', textAlign: 'center', animation: 'shake 0.4s' }}>
                Vui lòng chọn một đáp án trước khi trả lời!
              </div>
            )}

            {isWrongOpt && (
              <div style={{ color: 'var(--error)', fontSize: '13px', marginTop: '8px', textAlign: 'center', fontWeight: 'bold' }}>
                Đáp án chưa chính xác, hãy chọn lại nhé!
              </div>
            )}

            <div className="flex-row justify-center" style={{ marginTop: '8px' }}>
              <div role="button" tabIndex="0" className={`wf-btn ${!selectedOpt ? 'disabled' : ''}`} onClick={handleSubmit} style={{ padding: '12px 48px' }}>
                Trả lời
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="wf-hint-bar">
        <div className="flex-row gap-16">
          <div className="wf-hint-text"><span className="wf-hint-key">A-C</span> Chọn đáp án</div>
          <div className="wf-hint-text"><span className="wf-hint-key">Enter</span> Trả lời</div>
        </div>
        <div className="wf-hint-text" style={{ marginLeft: 'auto' }}>Vui lòng chọn đáp án trước khi trả lời.</div>
      </div>
    </div>
  );
}
