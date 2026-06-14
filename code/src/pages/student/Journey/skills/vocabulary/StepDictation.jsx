import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { useAudio } from '../../../../../hooks/useAudio';
import catOpenMouth from '../../../../../assets/cat-open-mouth-removebg-preview.png';
import catSmile from '../../../../../assets/cat-smile-removebg-preview.png';
import spoonImg from '../../../../../assets/spoon-removebg.png';

export default function StepDictation({ wordData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const { playSuccessEarcon, playErrorEarcon, playTextToSpeech } = useAudio();
  const [inputValue, setInputValue] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [isError, setIsError] = useState(false);
  const [showEmptyError, setShowEmptyError] = useState(false);
  const [isSuccessText, setIsSuccessText] = useState('');
  
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const isFinished = correctCount >= 5;

  useEffect(() => {
    if (isFinished) {
      const timer = setTimeout(() => {
        onNext();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isFinished, onNext]);

  const handleSubmit = () => {
    if (isFinished) {
      return; // Handled by useEffect
    }
    
    if (!inputValue.trim()) {
      setShowEmptyError(true);
      playErrorEarcon();
      return;
    }
    setShowEmptyError(false);
    
    if (inputValue.trim().toLowerCase() === wordData.word.toLowerCase()) {
      setCorrectCount(prev => prev + 1);
      setHistory(prev => [...prev, true]);
      setInputValue(''); // Clear on success
      setIsError(false);
      setIsSuccessText('Chính xác!');
      playSuccessEarcon();
      setTimeout(() => setIsSuccessText(''), 1000);
    } else {
      setHistory(prev => [...prev, false]);
      setIsError(true);
      // DO NOT clear inputValue on error, just highlight red
      playErrorEarcon();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.code === 'Space' && e.ctrlKey) {
        e.preventDefault();
        playTextToSpeech(wordData.word);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [wordData]);

  // Calculate spoon position based on correctCount (0 to 5) -> 100% (right) to 0% (left)
  const spoonPosition = 100 - (correctCount / 5) * 100;
  const progressWidth = (correctCount / 5) * 100;

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
        <div className="wf-page-title">Chép chính tả</div>
      </div>

      <div className="wf-topbar">
        <div className="wf-step-counter">
          <div className="wf-step-counter-item">Bước: <strong>{stepIndex + 1}</strong> / {totalSteps}</div>
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

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '850px', margin: '0 auto', width: '100%' }}>
        <div className="wf-card-highlight" style={{ width: '100%', padding: '16px 32px', marginBottom: '16px' }}>
          <div className="flex-row justify-between items-center w-full relative" style={{ height: '96px', padding: '0 20px' }}>
            
            {/* START: CAT AVATAR */}
            <div style={{ zIndex: 10, width: '90px', height: '90px', flexShrink: 0 }}>
              <img 
                src={isFinished ? catSmile : catOpenMouth} 
                alt="Cat" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* BACKGROUND TRACK LINE */}
            <div style={{ position: 'absolute', left: '120px', right: '110px', top: '50%', height: '4px', background: '#F0F0F0', transform: 'translateY(-50%)', borderRadius: '2px', zIndex: 1 }}></div>

            {/* END: SPOON COMPONENT WITH TRANSLATE LOGIC */}
            <div style={{ position: 'absolute', right: '20px', width: 'calc(100% - 130px)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', zIndex: 5 }}>
              <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                transform: `translateX(-${correctCount * 20}%)`,
                transition: 'all 500ms ease-out'
              }}>
                <img 
                  src={spoonImg} 
                  alt="Spoon"
                  style={{ width: '70px', height: 'auto', objectFit: 'contain', opacity: isFinished ? 0 : 1, transition: 'opacity 0.3s ease 0.5s' }}
                />
              </div>
            </div>
          </div>

          <div className="flex-row justify-center gap-4" style={{ marginTop: '10px' }}>
            {[1, 2, 3, 4, 5].map(num => {
              if (num <= correctCount) {
                return <div key={num} className="wf-feed-dot done" style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: '10px' }}>✓</div>;
              } else if (num === correctCount + 1 && !isFinished) {
                return <div key={num} className="wf-feed-dot active" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>{num}</div>;
              } else {
                return <div key={num} className="wf-feed-dot" style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#EEE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>{num}</div>;
              }
            })}
          </div>
        </div>

        <div className="wf-card" style={{ padding: '20px', width: '100%' }}>
          <div className="flex-row gap-16 items-center">
            <div className="flex-col items-center gap-2">
              <div 
                className="flex items-center justify-center cursor-pointer transition-all hover:scale-105 shadow-md hover:shadow-lg bg-primary text-white" 
                style={{ width: '48px', height: '48px', borderRadius: '50%' }} 
                onClick={() => playTextToSpeech(wordData.word)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '3px' }}>
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <div className="wf-subtitle" style={{ fontSize: '10px' }}>Phát âm</div>
            </div>
            <div className="flex-col" style={{ flex: 1 }}>
              <div className="flex-row gap-2 items-center" style={{ marginBottom: '6px' }}>
                <label className="wf-label" style={{ fontSize: '12px' }}>Gõ từ vựng:</label>
                <span className="wf-text-block" style={{ fontSize: '10px', background: 'transparent', border: 'none', padding: 0 }}>Lần {Math.min(correctCount + 1, 5)} / 5</span>
              </div>
              <div className="flex-row gap-8">
                <input 
                  type="text" 
                  className="wf-input" 
                  placeholder={isFinished ? "Hoàn thành!" : "Gõ chính xác từ vựng..."}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    if (isError) setIsError(false);
                    if (showEmptyError) setShowEmptyError(false);
                  }}
                  onKeyDown={handleKeyDown}
                  ref={inputRef}
                  disabled={isFinished}
                  style={{ flex: 1, padding: '10px', border: (showEmptyError || isError) ? '2px solid red' : '1px solid #CCC', borderRadius: '8px', fontSize: '14px', background: (showEmptyError || isError) ? '#FFF5F5' : '#FFF', animation: (showEmptyError || isError) ? 'shake 0.4s' : 'none' }}
                />
                <div role="button" tabIndex="0" className="wf-btn" style={{ padding: '8px 24px' }} onClick={handleSubmit}>
                  {isFinished ? 'Tiếp tục' : 'Kiểm tra'}
                </div>
              </div>
              {isError && !showEmptyError && (
                <div style={{ color: 'var(--error)', fontSize: '13px', marginTop: '8px', fontWeight: 'bold', animation: 'shake 0.4s' }}>
                  Sai chính tả, vui lòng sửa lại.
                </div>
              )}
              {showEmptyError && (
                <div style={{ color: 'var(--error)', fontSize: '13px', marginTop: '8px', fontWeight: 'bold', animation: 'shake 0.4s' }}>
                  Vui lòng gõ từ vựng trước khi nộp!
                </div>
              )}
              {isFinished ? (
                <div style={{ color: 'var(--success)', fontSize: '14px', marginTop: '8px', fontWeight: 'bold' }}>
                  Chúc mừng! Đang chuyển tiếp...
                </div>
              ) : isSuccessText ? (
                <div style={{ color: 'var(--success)', fontSize: '14px', marginTop: '8px', fontWeight: 'bold' }}>
                  {isSuccessText}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="wf-hint-bar">
        <div className="wf-hint-text"><span className="wf-hint-key">Ctrl+Space</span> Nghe phát âm <span style={{ marginLeft: '8px' }}><span className="wf-hint-key">Enter</span> Kiểm tra</span></div>
        <div className="wf-hint-text">Còn <strong>{5 - correctCount}</strong> lần để đạt 5/5 đúng!</div>
      </div>
    </div>
  );
}

