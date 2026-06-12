import React, { useState, useEffect } from 'react';
import { useAudio } from '../../../../../hooks/useAudio';

export default function StepPreTest({ wordData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const { playSuccessEarcon, playErrorEarcon, playTextToSpeech } = useAudio();
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(mode === 'fast' ? 30 : null);
  const [inputError, setInputError] = useState(false);
  const [showEmptyError, setShowEmptyError] = useState(false);

  // Generate 4 options for fast mode
  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (mode === 'fast') {
      if (wordData.meaningOptions && wordData.meaningOptions.length >= 4) {
        // Randomize the first 4 options
        const shuffled = [...wordData.meaningOptions].sort(() => Math.random() - 0.5);
        setOptions([
          { id: 'A', text: shuffled[0] }, 
          { id: 'B', text: shuffled[1] }, 
          { id: 'C', text: shuffled[2] }, 
          { id: 'D', text: shuffled[3] }
        ]);
      } else {
        const dummies = ['Do dự, lúng túng', 'Từ bỏ, bỏ mặc', 'Trì hoãn, hoãn lại', wordData.meaning];
        setOptions([{ id: 'A', text: dummies[3] }, { id: 'B', text: dummies[0] }, { id: 'C', text: dummies[1] }, { id: 'D', text: dummies[2] }]);
      }
    }
  }, [mode, wordData]);

  useEffect(() => {
    if (mode === 'fast' && timeLeft !== null) {
      if (timeLeft <= 0) {
        onNext({ id: wordData.id, correct: false });
        return;
      }
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, mode, onNext, wordData.id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      } else if (mode === 'fast') {
        if (e.key.toUpperCase() === 'A') { setSelectedOpt(options[0]?.text); setShowEmptyError(false); }
        if (e.key.toUpperCase() === 'B') { setSelectedOpt(options[1]?.text); setShowEmptyError(false); }
        if (e.key.toUpperCase() === 'C') { setSelectedOpt(options[2]?.text); setShowEmptyError(false); }
        if (e.key.toUpperCase() === 'D') { setSelectedOpt(options[3]?.text); setShowEmptyError(false); }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, textInput, selectedOpt, wordData, options]);

  const handleSubmit = () => {
    let isCorrect = false;
    if (mode === 'fast') {
      if (!selectedOpt) {
        setShowEmptyError(true);
        playErrorEarcon();
        return;
      }
      setShowEmptyError(false);
      if (selectedOpt === wordData.meaning) {
        playSuccessEarcon();
        isCorrect = true;
      } else {
        playErrorEarcon();
      }
    } else {
      // Deep mode
      if (!textInput.trim()) {
        setInputError(true);
        setShowEmptyError(true);
        playErrorEarcon();
        return;
      }
      setInputError(false);
      setShowEmptyError(false);
      // For demo, accept any non-empty as correct if it matches roughly or just accept "hoàn thành"
      if (textInput.toLowerCase().includes('hoàn') || textInput.toLowerCase() === wordData.meaning.toLowerCase()) {
        playSuccessEarcon();
        isCorrect = true;
      } else {
        playErrorEarcon();
      }
    }
    onNext({ id: wordData.id, correct: isCorrect });
  };

  const renderFastMode = () => (
    <div style={{ flex: 1, maxWidth: '800px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '10px' }}>
      
      {/* Timer Bar */}
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ background: '#E6E6FA', color: 'var(--primary)', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>THỜI GIAN</div>
        <div style={{ flex: 1, height: '4px', background: '#F0E6FF', borderRadius: '999px', overflow: 'hidden' }}>
          <div style={{ width: `${(timeLeft / 30) * 100}%`, height: '100%', background: 'var(--primary)', transition: 'width 1s linear' }}></div>
        </div>
        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft} / 0:30</div>
      </div>

      {/* Combined Card for Fast Mode */}
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
        {/* Header inside the card */}
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '16px', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          <div style={{ background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>NGHE & CHỌN</div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Nhấn nghe từ vựng và chọn nghĩa chính xác nhất</div>
        </div>

        {/* Content split into Left (Audio) and Right (Options) */}
        <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
          
          {/* Left: Audio Player */}
          <div className="flex-col items-center" style={{ gap: '12px', flex: '0 0 160px' }}>
            <div 
              role="button"
              tabIndex="0"
              className="interactive"
              onClick={() => playTextToSpeech(wordData.word)}
              style={{ 
                width: '80px', height: '80px', borderRadius: '50%', border: '2px dashed var(--primary)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)',
                background: '#FAF8FF', cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(155, 93, 224, 0.2)'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 'bold' }}>Nhấn để nghe</div>
          </div>

          {/* Right: Options */}
          <div className="flex-col gap-12" style={{ flex: 1 }}>
            {options.map((opt) => {
              const isSelected = selectedOpt === opt.text;
              return (
                <div 
                  key={opt.id}
                  role="button"
                  tabIndex="0"
                  className={`interactive ${isSelected ? 'selected' : ''}`}
                  onClick={() => { setSelectedOpt(opt.text); setShowEmptyError(false); }}
                  style={{
                    border: `1px solid ${isSelected ? 'var(--primary)' : 'rgba(0,0,0,0.08)'}`,
                    borderRadius: '999px',
                    padding: '12px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    background: isSelected ? '#FAF8FF' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ 
                    width: '28px', height: '28px', borderRadius: '50%', 
                    background: isSelected ? 'var(--primary)' : '#F3F4F6',
                    color: isSelected ? 'white' : 'var(--text-secondary)',
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
        </div>

        {showEmptyError && (
          <div style={{ color: 'var(--error)', fontSize: '13px', textAlign: 'center', animation: 'shake 0.4s' }}>
            Vui lòng chọn một đáp án trước khi trả lời!
          </div>
        )}

        <div className="flex-col items-center" style={{ marginTop: '8px', gap: '8px' }}>
          <div role="button" tabIndex="0" className={`wf-btn ${!selectedOpt ? 'disabled' : ''}`} onClick={handleSubmit} style={{ padding: '10px 32px' }}>
            Nộp câu trả lời
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Hết thời gian sẽ tự động nộp.</div>
        </div>
      </div>
    </div>
  );

  const renderDeepMode = () => (
    <div style={{ flex: 1, maxWidth: '800px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '10px' }}>
      
      {/* Audio Signal Card */}
      <div style={{ 
        width: '100%', 
        background: 'white', 
        borderRadius: '16px', 
        padding: '24px', 
        border: '1px solid rgba(155, 93, 224, 0.1)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#B493E8', letterSpacing: '1px', textTransform: 'uppercase' }}>Nghe và dịch nghĩa từ vựng sau</div>
        
        <div className="flex-row items-center" style={{ gap: '16px' }}>
          <div 
            className="interactive"
            onClick={() => playTextToSpeech(wordData.word)}
            style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px dashed var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', cursor: 'pointer' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '2px' }}><polygon points="5 3 19 12 5 21 5 3" /></svg>
          </div>
          <div className="flex-col">
            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{wordData.word}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: '#FFD6E8', color: '#D10068', padding: '2px 10px', borderRadius: '999px', fontSize: '12px' }}>{wordData.ipa}</span>
              {/* Fake visualizer bars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '16px' }}>
                <div style={{ width: '3px', height: '8px', background: '#D6A8FF', borderRadius: '2px' }}></div>
                <div style={{ width: '3px', height: '14px', background: '#D6A8FF', borderRadius: '2px' }}></div>
                <div style={{ width: '3px', height: '10px', background: '#D6A8FF', borderRadius: '2px' }}></div>
                <div style={{ width: '3px', height: '16px', background: '#D6A8FF', borderRadius: '2px' }}></div>
                <div style={{ width: '3px', height: '6px', background: '#D6A8FF', borderRadius: '2px' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input Card */}
      <div style={{ 
        width: '100%', 
        background: 'white', 
        borderRadius: '16px', 
        padding: '24px', 
        border: `1px solid ${inputError ? 'var(--error)' : 'rgba(155, 93, 224, 0.1)'}`,
        boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#B493E8', letterSpacing: '1px', textTransform: 'uppercase' }}>Gõ nghĩa tiếng Việt vào đây</div>
        
        <div style={{ width: '100%' }}>
          <input 
            type="text" 
            autoFocus
            value={textInput}
            onChange={(e) => {
              setTextInput(e.target.value);
              setInputError(false);
              setShowEmptyError(false);
            }}
            placeholder="Gõ nghĩa tiếng Việt: hoàn thành, đạt được..."
            style={{ 
              width: '100%', 
              padding: '16px 20px', 
              fontSize: '15px', 
              border: `1px ${inputError ? 'dashed var(--error)' : 'solid rgba(0,0,0,0.1)'}`, 
              borderRadius: '8px', 
              outline: 'none',
              background: inputError ? '#FFF5F5' : 'white'
            }}
          />
          {inputError && (
            <div style={{ color: 'var(--error)', fontSize: '12px', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px', animation: 'shake 0.4s' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Vui lòng nhập nghĩa tiếng Việt hoặc câu ví dụ.
            </div>
          )}
        </div>
      </div>

      <div className="flex-row justify-center items-center" style={{ marginTop: '16px', gap: '16px' }}>
        <div role="button" tabIndex="0" className="wf-btn outline interactive" onClick={() => playTextToSpeech(wordData.word)} style={{ padding: '10px 32px' }}>
          Nghe lại
        </div>
        <div role="button" tabIndex="0" className="wf-btn interactive" onClick={handleSubmit} style={{ padding: '10px 32px' }}>
          Nộp câu trả lời
        </div>
      </div>

    </div>
  );

  return (
    <div className="wf-main-content">
      <div className="wf-unit-header">
        <div className="wf-breadcrumb">Bài học &gt; Unit {unitId} &gt; Học từ vựng &gt; <span className={`wf-breadcrumb-mode-${mode}`}>{mode === 'deep' ? 'Deep Mode' : 'Fast Mode'}</span></div>
        <div className="wf-page-title">{mode === 'deep' ? 'Pre-test: Nghe và gõ nghĩa' : 'Pre-test: Nghe - chọn nghĩa'}</div>
      </div>

      <div className="wf-topbar">
        <div className="wf-step-counter">
          <div className="wf-step-counter-item">Bước: <strong>1</strong> / 6</div>
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

      {mode === 'fast' ? renderFastMode() : renderDeepMode()}

      <div className="wf-hint-bar">
        <div className="flex-row gap-16">
          <div className="wf-hint-text"><span className="wf-hint-key">P</span> Nghe lại</div>
          {mode === 'fast' && <div className="wf-hint-text"><span className="wf-hint-key">A-D</span> Chọn đáp án</div>}
          <div className="wf-hint-text"><span className="wf-hint-key">Enter</span> {mode === 'fast' ? 'Nộp' : 'Nộp kết quả'} {mode === 'fast' && `| Còn ${timeLeft} giây`}</div>
        </div>
        {mode === 'deep' && <div className="wf-hint-text" style={{ marginLeft: 'auto' }}>Nghe từ vựng và giải mã nghĩa tiếng Việt</div>}
      </div>
    </div>
  );
}
