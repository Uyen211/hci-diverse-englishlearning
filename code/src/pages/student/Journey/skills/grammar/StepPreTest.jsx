import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAudio } from '../../../../../hooks/useAudio';

export default function StepPreTest({ grammarData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(45);
  const [showEmptyError, setShowEmptyError] = useState(false);
  const [isCheckMode, setIsCheckMode] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { playSuccessEarcon, playErrorEarcon } = useAudio();

  // Lấy mảng bài tập trắc nghiệm chia động từ + ngữ cảnh mới
  const options = grammarData.pretestOptions || [];
  const correctAnswer = grammarData.pretestAnswer || "";

  useEffect(() => {
    setSelectedOption(null);
    setShowEmptyError(false);
    setIsCheckMode(false);
  }, [grammarData]);

  useEffect(() => {
    if (mode === 'fast') {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [mode, selectedOption, options, correctAnswer]);

  // Tự động nộp bài khi hết giờ ở Fast Mode
  const handleAutoSubmit = () => {
    if (selectedOption !== null) {
      const selectedText = options[selectedOption];
      // Tách chuỗi theo ký tự '—' và lấy cụm động từ phía trước, loại bỏ khoảng trắng thừa
      const verbPart = selectedText.split('—')[0].trim();
      const isCorrect = verbPart === correctAnswer.trim();
      onNext({ correct: isCorrect });
    } else {
      onNext({ correct: false });
    }
  };

  // CẬP NHẬT LOGIC KIỂM TRA: Bóc tách phần chia động từ trước dấu '—' để so khớp
  const handleCheck = () => {
    if (selectedOption !== null) {
      if (!isCheckMode) {
        setShowEmptyError(false);
        const selectedText = options[selectedOption];
        // Tách chuỗi theo ký tự '—' và lấy cụm động từ phía trước, loại bỏ khoảng trắng thừa[cite: 3]
        const verbPart = selectedText.split('—')[0].trim();
        const correct = verbPart === correctAnswer.trim();
        setIsCorrect(correct);
        setIsCheckMode(true);
        if (correct) playSuccessEarcon();
        else playErrorEarcon();
      } else {
        onNext({ correct: isCorrect });
      }
    } else {
      setShowEmptyError(true);
      playErrorEarcon();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') handleCheck();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOption, options, correctAnswer]);

  return (
    <div className="flex flex-col flex-1 w-full max-w-5xl mx-auto gap-4">
      <div className="wf-unit-header mb-6">
        <div className="wf-breadcrumb flex flex-wrap items-center gap-1">
          <Link to="/" className="hover:underline text-text-secondary">Trang chủ</Link>
          <span className="opacity-50">&gt;</span>
          <Link to="/student/journey" className="hover:underline text-text-secondary">Hành trình</Link>
          <span className="opacity-50">&gt;</span>
          <Link to={`/student/unit/${typeof unitId !== 'undefined' ? unitId : 3}`} className="hover:underline text-text-secondary">Unit {typeof unitId !== 'undefined' ? unitId : 3}</Link>
          <span className="opacity-50">&gt;</span>
          <Link to="/student/grammar-select" className="hover:underline text-text-secondary">Học ngữ pháp</Link>
          <span className="opacity-50">&gt;</span>
          <span className="text-primary font-bold">{typeof mode !== 'undefined' ? (mode === 'fast' ? 'Fast Mode' : mode === 'deep' ? 'Deep Mode' : (mode || 'Mode')) : 'Mode'}</span>
        </div>
        <div className="wf-page-title text-2xl font-bold mt-1">Trạm giải mã: Thử tài chia động từ & Ngữ cảnh</div>
      </div>

      <div className="wf-topbar">
        <div className="wf-step-counter">
          <div className="wf-step-counter-item">Bước: <strong>{stepIndex}</strong> / {totalSteps}</div>
          <div className="wf-step-counter-divider"></div>
          <div className="wf-step-counter-item">Cấu trúc: <strong>{wordIndex + 1}</strong> / {totalWords}</div>
        </div>
        <div className="wf-progress-mini">
          <div className="wf-progress-mini-bar">
            <div className="wf-progress-mini-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div className="wf-progress-mini-label">{progressPercent}%</div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-4 max-w-4xl mx-auto w-full">
        {mode === 'fast' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px', width: '100%' }}>
            <div style={{ flex: 1, height: '8px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${(timeLeft / 45) * 100}%`, height: '100%', background: 'var(--primary)', transition: 'width 1s linear' }}></div>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft} / 0:45</div>
          </div>
        )}

        <div className="wf-decode-console w-full">
          <div className="wf-decode-zone mb-6">
            <div className="wf-decode-zone-label text-sm font-bold mb-2">Phân tích câu mẫu đầu vào</div>
            <div className="wf-decode-screen p-6 bg-surface rounded-xl shadow-inner border border-dashed border-purple-200">
              <div className="text-xl leading-relaxed text-primary text-center font-semibold tracking-wide">
                "{grammarData.pretestQuestion || "He usually _______ (wake) up early in the morning."}"
              </div>
              <div className="wf-subtitle text-sm mt-4 text-center text-primary/70">Dựa vào dấu hiệu thời gian và ngữ cảnh, chọn phương án chia động từ chính xác nhất</div>
            </div>
          </div>

          <div className="wf-decode-zone w-full">
            <div className="wf-decode-zone-label text-sm font-bold mb-3">Chọn đáp án đúng điền vào ô trống</div>
            <div className="flex flex-col gap-3 w-full">
              {options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <div 
                    key={idx}
                    role="button"
                    tabIndex="0"
                    className={`interactive ${isSelected ? 'selected' : ''}`}
                    onClick={() => { if(!isCheckMode) { setSelectedOption(idx); setShowEmptyError(false); } }}
                    style={{
                      border: `1px solid ${isSelected ? (isCheckMode ? (isCorrect ? 'var(--success)' : 'var(--error)') : 'var(--primary)') : 'rgba(0,0,0,0.08)'}`,
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
                      background: isSelected ? (isCheckMode ? (isCorrect ? 'var(--success)' : 'var(--error)') : 'var(--primary)') : '#F3F4F6',
                      color: isSelected ? 'white' : 'var(--text-secondary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '14px', fontWeight: 'bold', flexShrink: 0
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <div style={{ fontSize: '15px', color: 'var(--text-primary)' }}>{opt.split('—')[0].trim()}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="wf-subtitle text-sm text-primary/70 mt-2">Phân tích tính tương hợp giữa chủ ngữ và ngữ cảnh để đưa ra lựa chọn.</div>

        {showEmptyError && (
          <div style={{ color: 'var(--error)', fontSize: '13px', textAlign: 'center', animation: 'shake 0.4s', marginTop: '16px' }}>
            Vui lòng chọn một đáp án trước khi nộp bài!
          </div>
        )}

        <div className="flex flex-row gap-6 justify-center mt-6">
           {!isCheckMode ? (
          <div className="flex flex-row justify-center mt-4">
            <button
              onClick={handleCheck}
              className={`wf-btn btn-default-submit px-12 py-3 rounded-xl shadow-glow transition-all ${selectedOption !== null ? 'bg-primary text-white hover:bg-primary' : 'bg-gray-300 text-primary/70'}`}
              tabIndex={0}
            >
              Kiểm tra
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center mt-4 w-full">
            <div className={`mb-4 text-center text-sm font-medium p-4 px-6 rounded-lg w-full ${isCorrect ? 'bg-green-100 text-success' : 'bg-red-100 text-error'}`}>
              <div className="font-bold text-base mb-1">{isCorrect ? 'Chính xác!' : 'Chưa chính xác!'}</div>
              {!isCorrect && (
                <div className="mt-2 text-left">
                  <strong>Đáp án đúng:</strong> {options.find(o => o.split('—')[0].trim() === correctAnswer.trim())}
                </div>
              )}
              {isCorrect && options[selectedOption] && (
                <div className="mt-2 text-left">
                  <strong>Giải thích:</strong> {options[selectedOption].split('—')[1]?.trim()}
                </div>
              )}
            </div>
            <button
              onClick={handleCheck}
              className="wf-btn btn-default-submit px-12 py-3 bg-success text-white font-bold rounded-xl shadow-glow hover:bg-green-700 transition-all"
              tabIndex={0}
            >
              Tiếp tục
            </button>
          </div>
        )}
        </div>
      </div>

      <div className="wf-hint-bar flex justify-between text-xs text-primary/70 mt-8 pt-4 border-t">
        <div className="wf-hint-text">
          <span className="wf-hint-key bg-canvas px-2 py-1 rounded border">A-D</span> Chọn đáp án
          <span className="ml-4"><span className="wf-hint-key bg-canvas px-2 py-1 rounded border">Enter</span> Nộp kết quả</span>
        </div>
        <div className="wf-hint-text">Hãy rà soát kỹ chủ ngữ số ít hay số nhiều trước khi nhấn Enter.</div>
      </div>
    </div>
  );
}