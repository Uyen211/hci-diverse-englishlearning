import React, { useState, useEffect, useRef } from 'react';
import { useAudio } from '../../../../../hooks/useAudio';

export default function StepSentence({ wordData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const { playSuccessEarcon, playErrorEarcon } = useAudio();
  const [inputValue, setInputValue] = useState('');
  const [showEmptyError, setShowEmptyError] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [tryCount, setTryCount] = useState(0);
  const inputRef = useRef(null);

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

    const text = inputValue.toLowerCase();
    const target = wordData.word.toLowerCase();
    
    if (!text.includes(target)) {
      playErrorEarcon();
      setIsError(true);
      
      const newTryCount = tryCount + 1;
      setTryCount(newTryCount);
      
      if (newTryCount >= 3) {
        setIsSubmitted(true);
        setTimeout(() => {
          onNext('error');
        }, 1500);
      } else {
        setTimeout(() => {
          setIsError(false);
          setIsSubmitted(false);
        }, 1000);
      }
    } else {
      playSuccessEarcon();
      setIsSuccess(true);
      setIsSubmitted(true);
      setTimeout(() => {
        onNext();
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
    <div className="wf-main-content">
      <div className="wf-unit-header">
        <div className="wf-breadcrumb">Bài học &gt; Unit {unitId} &gt; Học từ vựng &gt; <span className="wf-breadcrumb-mode-deep">Deep Mode</span></div>
        <div className="wf-page-title">Ứng dụng: Tạo câu</div>
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
        <div className="wf-card" style={{ width: '100%', padding: '24px', marginBottom: '16px' }}>
          <div className="flex-row items-center gap-6" style={{ marginBottom: '16px' }}>
            <div className="wf-badge" style={{ fontSize: '10px' }}>TẠO CÂU</div>
            <div className="wf-subtitle" style={{ fontSize: '12px' }}>Sử dụng từ vựng vừa học để đặt một câu hoàn chỉnh</div>
          </div>

          <div style={{ padding: '16px', background: 'rgba(155, 93, 224, 0.05)', border: '1px solid var(--secondary)', borderRadius: '8px', marginBottom: '20px' }}>
            Từ vựng yêu cầu: <strong style={{ fontSize: '16px', color: 'var(--primary)' }}>{wordData.word}</strong>
            <br />
            <span style={{ fontSize: '12px', color: '#666' }}>Nghĩa: {wordData.meaning}</span>
          </div>

          <textarea 
            ref={inputRef}
            className="wf-input" 
            placeholder="Ví dụ: I always make the bed in the morning..."
            rows="4"
            style={{ 
              width: '100%', padding: '12px', fontSize: '15px', 
              border: isSuccess ? '2px solid var(--success)' : (isError || showEmptyError) ? '2px solid var(--error)' : '1px solid var(--secondary)', 
              background: isSuccess ? '#F0FDF4' : (isError || showEmptyError) ? '#FEF2F2' : 'white' 
            }}
            value={inputValue}
            onChange={(e) => { setInputValue(e.target.value); setShowEmptyError(false); setIsError(false); }}
            onKeyDown={handleKeyDown}
            disabled={isSubmitted}
          ></textarea>

          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            Số lần thử: <strong>{tryCount}/3</strong>
          </div>

          {showEmptyError && (
            <div style={{ color: 'var(--error)', fontSize: '13px', marginTop: '8px', animation: 'shake 0.4s' }}>
              Vui lòng viết một câu tiếng Anh trước khi nộp!
            </div>
          )}

          {isError && (
            <div style={{ color: 'var(--error)', fontSize: '14px', marginTop: '8px', fontWeight: 'bold', animation: 'shake 0.4s' }}>
              {tryCount >= 3 ? "Câu của bạn chưa chứa từ mục tiêu hoặc sai chính tả. Đang chuyển sang sửa lỗi..." : "Sai chính tả hoặc chưa chứa từ mục tiêu. Bạn hãy thử lại nhé!"}
            </div>
          )}

          {isSuccess && (
            <div style={{ color: 'var(--success)', fontSize: '14px', marginTop: '8px', fontWeight: 'bold' }}>
              Tuyệt vời! Câu của bạn rất tốt.
            </div>
          )}

          <div className="flex-row justify-end" style={{ marginTop: '16px' }}>
            <button 
              className={`wf-btn ${isSubmitted ? 'disabled' : ''}`} 
              style={{ padding: '10px 32px' }} 
              onClick={handleSubmit}
              disabled={isSubmitted}
            >
              Nộp câu
            </button>
          </div>
        </div>
      </div>

      <div className="wf-hint-bar">
        <div className="wf-hint-text"><span className="wf-hint-key">Enter</span> Nộp kết quả</div>
        <div className="wf-hint-text">Cố gắng đặt câu đúng ngữ pháp và ngữ cảnh.</div>
      </div>
    </div>
  );
}

