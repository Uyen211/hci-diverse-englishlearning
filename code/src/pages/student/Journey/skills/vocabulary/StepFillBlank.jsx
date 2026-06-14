import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { useAudio } from '../../../../../hooks/useAudio';

export default function StepFillBlank({ wordData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const { playSuccessEarcon, playErrorEarcon } = useAudio();
  const [inputValue, setInputValue] = useState('');
  const [showEmptyError, setShowEmptyError] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const inputRef = useRef(null);

  // Generate a sentence with a blank
  const contextSentence = wordData.contexts && wordData.contexts.length > 0 
    ? wordData.contexts[0].en 
    : `I always ${wordData.word} in the morning.`;
  
  // Replace target word with a blank
  // We'll split the sentence into before and after the word to inject the input field naturally.
  const regex = new RegExp(`(${wordData.word})`, 'i');
  const parts = contextSentence.split(regex);
  const hasMatch = parts.length > 1;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {
    if (isSubmitted) return;
    if (!inputValue.trim()) {
      setShowEmptyError(true);
      playErrorEarcon();
      return;
    }
    setShowEmptyError(false);
    setIsSubmitted(true);

    if (inputValue.toLowerCase() === wordData.word.toLowerCase()) {
      setIsError(false);
      setIsSuccess(true);
      playSuccessEarcon();
      setTimeout(() => {
        onNext(); // Pass and move to next word
      }, 1500);
    } else {
      setIsError(true);
      playErrorEarcon();
      setTimeout(() => {
        setIsSubmitted(false);
      }, 1500);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="wf-main-content" style={{ position: 'relative' }}>
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
        <div className="wf-page-title">Sửa lỗi: Điền từ vào chỗ trống</div>
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

      {/* OVERLAY EFFECT */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="wf-card" style={{ width: '90%', maxWidth: '600px', padding: '30px', position: 'relative', zIndex: 11, animation: 'fadeIn 0.3s ease-out' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ color: '#D32F2F', fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              Câu bạn vừa tạo chưa đúng!
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Hãy làm bài tập điền từ sau để củng cố lại kiến thức nhé.</div>
          </div>

          <div style={{ background: '#FAF8FF', border: '1px dashed var(--secondary)', padding: '20px', borderRadius: '8px', fontSize: '16px', lineHeight: '2' }}>
            {hasMatch ? (
              <>
                <span>{parts[0]}</span>
                <input 
                  ref={inputRef}
                  type="text" 
                  value={inputValue}
                  onChange={(e) => { setInputValue(e.target.value); setIsError(false); setShowEmptyError(false); }}
                  onKeyDown={handleKeyDown}
                  disabled={isSubmitted && isSuccess}
                  style={{ 
                    border: 'none', 
                    borderBottom: isSuccess ? '2px solid var(--success)' : (isError || showEmptyError) ? '2px solid var(--error)' : '2px solid var(--primary)', 
                    background: isSuccess ? '#F0FDF4' : (isError || showEmptyError) ? '#FEF2F2' : 'transparent', 
                    width: '120px', 
                    textAlign: 'center', 
                    fontSize: '16px', 
                    color: isSuccess ? 'var(--success)' : isError ? 'red' : 'var(--primary)',
                    fontWeight: 'bold',
                    outline: 'none',
                    margin: '0 4px',
                    animation: (isError || showEmptyError) ? 'shake 0.4s' : 'none'
                  }}
                />
                <span>{parts[2]}</span>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div>{contextSentence}</div>
                <input 
                  ref={inputRef}
                  type="text" 
                  value={inputValue}
                  onChange={(e) => { setInputValue(e.target.value); setIsError(false); setShowEmptyError(false); }}
                  onKeyDown={handleKeyDown}
                  disabled={isSubmitted && isSuccess}
                  placeholder={wordData.word}
                  style={{ 
                    border: 'none', 
                    borderBottom: isSuccess ? '2px solid var(--success)' : (isError || showEmptyError) ? '2px solid var(--error)' : '2px solid var(--primary)', 
                    background: isSuccess ? '#F0FDF4' : (isError || showEmptyError) ? '#FEF2F2' : 'transparent', 
                    width: '120px', 
                    textAlign: 'center', 
                    fontSize: '16px', 
                    color: isSuccess ? 'var(--success)' : isError ? 'red' : 'var(--primary)',
                    fontWeight: 'bold',
                    outline: 'none',
                    marginTop: '10px',
                    animation: (isError || showEmptyError) ? 'shake 0.4s' : 'none'
                  }}
                />
              </div>
            )}
          </div>

          {showEmptyError && (
            <div style={{ color: 'var(--error)', fontSize: '13px', marginTop: '16px', animation: 'shake 0.4s' }}>
              Vui lòng điền từ vào chỗ trống trước khi kiểm tra!
            </div>
          )}

          {isError && (
            <div style={{ color: 'var(--error)', fontSize: '14px', marginTop: '16px', fontWeight: 'bold', animation: 'shake 0.4s' }}>
              Chưa chính xác, hãy thử lại!
            </div>
          )}

          {isSuccess && (
            <div style={{ color: 'var(--success)', fontSize: '14px', marginTop: '16px', fontWeight: 'bold' }}>
              Chính xác! Đang chuyển tiếp...
            </div>
          )}

          <div className="flex-row justify-center" style={{ marginTop: '24px' }}>
            <button 
              className={`wf-btn ${(isSubmitted && isSuccess) ? 'disabled' : ''}`} 
              style={{ padding: '10px 48px' }} 
              onClick={handleSubmit}
              disabled={isSubmitted && isSuccess}
            >
              Kiểm tra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

