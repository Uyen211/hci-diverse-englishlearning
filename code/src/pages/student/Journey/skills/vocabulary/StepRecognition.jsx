import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAudio } from '../../../../../hooks/useAudio';

export default function StepRecognition({ wordData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId, words }) {
  const { playSuccessEarcon, playErrorEarcon } = useAudio();
  const [selectedOpt, setSelectedOpt] = useState(null);
  
  // For Deep mode drag & drop/matching
  const [draggedWord, setDraggedWord] = useState(null);
  const [matchedWords, setMatchedWords] = useState({}); // { meaning: word }
  const [isError, setIsError] = useState(false);
  const [showEmptyError, setShowEmptyError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Generate a list of words for options
  const [wordsList, setWordsList] = useState([]);
  const [deepModeItems, setDeepModeItems] = useState([]);

  useEffect(() => {
    if (mode === 'fast') {
      // Basic mock words list
      const options = [wordData.word, 'accomplish', 'hesitate', 'abandon'];
      // Shuffle options
      setWordsList(options.sort(() => Math.random() - 0.5));
    } else {
      // Deep mode logic: up to 4 words
      const recent = words ? words.slice(Math.max(0, wordIndex - 3), wordIndex + 1) : [wordData];
      const recentWordsOnly = recent.map(w => w.word).sort(() => Math.random() - 0.5);
      const recentMeanings = recent.map(w => ({ word: w.word, meaning: w.meaning })).sort(() => Math.random() - 0.5);
      
      setWordsList(recentWordsOnly);
      setDeepModeItems(recentMeanings);
      setMatchedWords({});
      setIsError(false);
      setShowEmptyError(false);
      setIsSuccess(false);
      setIsSubmitted(false);
    }
  }, [wordData, mode, wordIndex, words]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (mode === 'fast') {
        const optionLabels = ['A', 'B', 'C', 'D'];
        const key = e.key.toUpperCase();
        
        if (optionLabels.includes(key)) {
          const idx = optionLabels.indexOf(key);
          if (wordsList[idx]) {
            setSelectedOpt(wordsList[idx]);
            setShowEmptyError(false);
          }
        }
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, selectedOpt, wordsList, matchedWords, isSubmitted, deepModeItems]);

  const handleSubmit = () => {
    if (mode === 'fast') {
      if (!isSubmitted) {
        if (!selectedOpt) {
          setShowEmptyError(true);
          playErrorEarcon();
          return;
        }
        setShowEmptyError(false);
        setIsSubmitted(true);
        if (selectedOpt === wordData.word) {
          playSuccessEarcon();
        } else {
          playErrorEarcon();
        }
      } else {
        if (selectedOpt === wordData.word) {
          onNext();
        } else {
          onNext('weak');
        }
      }
    } else {
      const isAllFilled = deepModeItems.every(item => matchedWords[item.meaning]);
      if (!isAllFilled) {
        setShowEmptyError(true);
        playErrorEarcon();
        return;
      }
      setShowEmptyError(false);
      setIsSubmitted(true);
      
      const isAllCorrect = deepModeItems.every(item => matchedWords[item.meaning] === item.word);

      if (isAllCorrect) {
        setIsError(false);
        setIsSuccess(true);
        playSuccessEarcon();
        setTimeout(() => {
          onNext();
        }, 1500);
      } else {
        setIsError(true);
        playErrorEarcon();
        // Deep mode: don't move to next step, force retry
        setTimeout(() => {
          setMatchedWords({});
          setIsError(false);
          setIsSubmitted(false);
        }, 1000);
      }
    }
  };

  const renderDeepMode = () => {
    const usedWords = Object.values(matchedWords);

    return (
      <>
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
          <div className="wf-page-title">Nhận diện: Ghép nối từ và nghĩa</div>
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

        <div style={{ flex: 1, maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
          <div className="wf-text-block" style={{ background: '#FAF8FF', border: '1px dashed var(--secondary)', fontSize: '12px', marginBottom: '12px', width: '100%', textAlign: 'center', color: '#4A4A6A' }}>
            Gợi ý: Kéo mảnh ghép từ vựng thả vào ô nghĩa phù hợp. Bạn đang ôn lại {deepModeItems.length} từ đã học.
          </div>

          <div className="flex-row gap-16" style={{ flex: 1 }}>
            <div className="flex-col gap-8" style={{ flex: 1 }}>
              <div className="wf-label" style={{ fontSize: '10px', textAlign: 'center', marginBottom: '4px' }}>TỪ VỰNG</div>
              {wordsList.map(w => {
                const isUsed = usedWords.includes(w);
                return (
                  <div 
                    key={w}
                    draggable={!isUsed}
                    onDragStart={(e) => {
                      setDraggedWord(w);
                      e.dataTransfer.setData('text/plain', w);
                    }}
                    onDragEnd={() => setDraggedWord(null)}
                    className={`wf-puzzle-piece interactive ${draggedWord === w ? 'selected' : ''}`} 
                    style={{ justifyContent: 'center', padding: '10px', cursor: isUsed ? 'default' : 'grab', opacity: isUsed ? 0.3 : 1 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--secondary)', marginRight: '4px', display: 'inline-block', verticalAlign: 'middle' }}>
                      <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                    <strong style={{ fontSize: '14px' }}>{w}</strong>
                  </div>
                );
              })}
            </div>
            
            <div className="flex-col justify-center items-center" style={{ padding: '0 4px' }}>
              <div style={{ fontSize: '24px', color: '#999' }}>--&gt;</div>
            </div>
            
            <div className="flex-col gap-8" style={{ flex: 1 }}>
              <div className="wf-label" style={{ fontSize: '10px', textAlign: 'center', marginBottom: '4px' }}>NGHĨA</div>
              {deepModeItems.map((item, idx) => {
                const matchedW = matchedWords[item.meaning];
                return (
                  <div 
                    key={idx}
                    style={{ border: `2px dashed ${isSuccess ? 'var(--success)' : (showEmptyError || isError) ? 'var(--error)' : '#333'}`, background: isSuccess ? '#F0FDF4' : isError ? 'rgba(255,0,0,0.1)' : 'rgba(155, 93, 224, 0.15)', padding: '10px', textAlign: 'center', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: (showEmptyError || isError) ? 'shake 0.4s' : 'none', transition: 'all 0.3s' }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      if (isSubmitted && isSuccess) return;
                      const w = e.dataTransfer.getData('text/plain');
                      if (w) {
                        setMatchedWords(prev => ({
                          ...prev,
                          [item.meaning]: w
                        }));
                        setShowEmptyError(false);
                        setIsError(false);
                      }
                    }}
                  >
                    {matchedW ? (
                      <div className="flex-row items-center gap-4">
                        <span className="wf-text-block-solid" style={{ fontSize: '11px', background: '#333', color: '#FFF' }}>{item.meaning}</span>
                        <span className="wf-text-block" style={{ fontSize: '11px', borderColor: '#333', background: '#FFF' }}>{matchedW}</span>
                      </div>
                    ) : (
                      <span className="wf-text-block-solid" style={{ fontSize: '11px', background: '#333', color: '#FFF' }}>{item.meaning}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {showEmptyError && (
            <div style={{ color: 'var(--error)', fontSize: '13px', marginTop: '16px', textAlign: 'center', animation: 'shake 0.4s' }}>
              Vui lòng ghép đầy đủ các từ trước khi nộp kết quả!
            </div>
          )}
          
          {isError && !showEmptyError && (
            <div style={{ color: 'var(--error)', fontSize: '14px', marginTop: '16px', textAlign: 'center', fontWeight: 'bold', animation: 'shake 0.4s' }}>
              Có mảnh ghép chưa đúng, hãy ghép lại nhé!
            </div>
          )}

          {isSuccess && (
            <div style={{ color: 'var(--success)', fontSize: '14px', marginTop: '16px', textAlign: 'center', fontWeight: 'bold' }}>
              Chính xác! Đang chuyển tiếp...
            </div>
          )}

          <div className="flex-row justify-center" style={{ marginTop: '16px' }}>
            <button 
              className={`wf-btn ${(isSubmitted && isSuccess) ? 'disabled' : ''}`} 
              style={{ padding: '10px 40px' }} 
              onClick={handleSubmit}
              disabled={isSubmitted && isSuccess}
            >
              Nộp kết quả
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center bg-primary/5 border border-primary/20 rounded-xl p-4 mt-6 text-sm text-primary">
          <div className="flex flex-wrap items-center gap-4"><kbd className="bg-white px-1.5 py-0.5 border rounded shadow-sm text-xs font-semibold mr-1 text-text-primary">Drag</kbd> Kéo thả <span style={{ marginLeft: '8px' }}><kbd className="bg-white px-1.5 py-0.5 border rounded shadow-sm text-xs font-semibold mr-1 text-text-primary">Enter</kbd> Nộp</span></div>
          <div className="text-xs text-text-secondary opacity-80 hidden md:block">Bắt buộc ghép đúng mới được qua bài.</div>
        </div>
      </>
    );
  };

  const renderFastMode = () => (
    <>
      <div className="wf-unit-header">
        <div className="wf-breadcrumb">Bài học &gt; Unit {unitId} &gt; Học từ vựng &gt; <span className="wf-breadcrumb-mode-fast">Fast Mode</span></div>
        <div className="wf-page-title">Nhận diện: Chọn nghĩa đúng</div>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(155, 93, 224, 0.05)', color: 'var(--primary)', padding: '8px 16px', borderRadius: '999px', fontSize: '13px', fontWeight: 'bold', marginBottom: '24px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          Fast Mode: Không bắt buộc làm lại nếu chọn sai
        </div>

        <div style={{ 
          width: '100%', 
          background: 'white', 
          borderRadius: '16px', 
          padding: '32px', 
          border: '1px solid rgba(155, 93, 224, 0.1)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <div>
            <div style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Từ nào có nghĩa là:</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary)', padding: '16px', background: '#FAF8FF', borderRadius: '12px', border: '1px dashed rgba(155, 93, 224, 0.3)', textAlign: 'center' }}>
              "{wordData.meaning}"
            </div>
            {wordData.contexts && wordData.contexts.length > 0 && (
              <div style={{ marginTop: '16px', fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)', textAlign: 'center' }}>
                Ví dụ: "{wordData.contexts[0].en.replace(new RegExp(wordData.word, 'gi'), '__________')}"
              </div>
            )}
          </div>

          <div className="flex-col gap-12" style={{ marginTop: '16px' }}>
            {wordsList.map((opt, idx) => {
              const isSelected = selectedOpt === opt;
              const isCorrectOption = opt === wordData.word;
              
              let containerStyle = {
                border: `1px solid ${isSelected ? 'var(--primary)' : 'rgba(0,0,0,0.08)'}`,
                borderRadius: '16px',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                background: isSelected ? '#FAF8FF' : 'white',
                cursor: isSubmitted ? 'default' : 'pointer',
                transition: 'all 0.2s',
              };

              let labelStyle = {
                width: '32px', height: '32px', borderRadius: '50%', 
                background: isSelected ? 'var(--primary)' : '#F3F4F6',
                color: isSelected ? 'white' : 'var(--text-secondary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', fontWeight: 'bold'
              };

              if (isSubmitted) {
                if (isCorrectOption) {
                  containerStyle.background = '#F0FDF4'; 
                  containerStyle.border = '2px solid var(--success)';
                  labelStyle.background = 'var(--success)';
                  labelStyle.color = 'white';
                } else if (isSelected && !isCorrectOption) {
                  containerStyle.background = '#FEF2F2'; 
                  containerStyle.border = '2px solid var(--error)';
                  labelStyle.background = 'var(--error)';
                  labelStyle.color = 'white';
                }
              }

              return (
                <div 
                  key={idx}
                  className={`interactive ${isSelected && !isSubmitted ? 'selected' : ''}`}
                  onClick={() => { if (!isSubmitted) { setSelectedOpt(opt); setShowEmptyError(false); } }}
                  style={containerStyle}
                >
                  <div style={labelStyle}>{['A', 'B', 'C', 'D'][idx]}</div>
                  <div style={{ fontSize: '16px', color: 'var(--text-primary)', fontWeight: isSubmitted && isCorrectOption ? 'bold' : 'normal' }}>{opt}</div>
                  
                  {isSubmitted && isCorrectOption && (
                    <div style={{ marginLeft: 'auto', color: 'var(--success)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                  )}
                  {isSubmitted && isSelected && !isCorrectOption && (
                    <div style={{ marginLeft: 'auto', color: 'var(--error)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {showEmptyError && (
            <div className="mt-6 text-center text-sm font-bold text-error" style={{ animation: 'shake 0.4s' }}>
              Vui lòng chọn một đáp án trước khi trả lời!
            </div>
          )}

          {!isSubmitted ? (
            <div className="flex-row justify-center" style={{ marginTop: '32px' }}>
              <button 
                className={`wf-btn ${(!selectedOpt) ? 'disabled' : ''}`} 
                onClick={handleSubmit} 
                style={{ minWidth: '200px' }}
              >
                Kiểm tra
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center mt-8 w-full">
              <div className={`mb-4 text-center text-sm font-medium p-4 px-6 rounded-lg w-full ${selectedOpt === wordData.word ? 'bg-green-100 text-success' : 'bg-red-100 text-error'}`}>
                <div className="font-bold text-base mb-1">{selectedOpt === wordData.word ? 'Chính xác!' : 'Chưa chính xác!'}</div>
                {selectedOpt !== wordData.word && (
                  <div className="mt-2 text-left">
                    <strong>Đáp án đúng:</strong> {wordData.word}
                  </div>
                )}
              </div>
              <button
                onClick={handleSubmit}
                className="wf-btn btn-default-submit px-12 py-3 bg-success text-white font-bold rounded-xl shadow-glow hover:bg-green-700 transition-all"
                tabIndex={0}
              >
                Tiếp tục
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center bg-primary/5 border border-primary/20 rounded-xl p-4 mt-6 text-sm text-primary">
        <div className="flex flex-wrap items-center gap-4"><kbd className="bg-white px-1.5 py-0.5 border rounded shadow-sm text-xs font-semibold mr-1 text-text-primary">A-D</kbd> Chọn đáp án <span style={{ marginLeft: '8px' }}><kbd className="bg-white px-1.5 py-0.5 border rounded shadow-sm text-xs font-semibold mr-1 text-text-primary">Enter</kbd> Kiểm tra / Tiếp tục</span></div>
      </div>
    </>
  );

  if (mode === 'fast') {
    return renderFastMode();
  }
  return renderDeepMode();
}
