import React, { useState, useEffect } from 'react';
import { useAudio } from '../../../../../hooks/useAudio';

export default function StepMiniReview({ grammarData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId, words }) {
  const allItems = words || [];
  const reviewItems = allItems.slice(-3);
  const allQuizzes = reviewItems.flatMap(item => (item.recognitionQuizzes || []).slice(0, mode === 'deep' ? 2 : 1));
  const totalQ = allQuizzes.length;

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedMCQ, setSelectedMCQ] = useState(null);
  const [history, setHistory] = useState([]);
  const [showEmptyError, setShowEmptyError] = useState(false);
  const [isCheckMode, setIsCheckMode] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const { playSuccessEarcon, playErrorEarcon } = useAudio();

  const handleNextQ = () => {
    if (selectedMCQ === null) {
      setShowEmptyError(true);
      playErrorEarcon();
      return;
    }

    if (!isCheckMode) {
      setShowEmptyError(false);
      const quiz = allQuizzes[currentQ];
      const correct = quiz.options[selectedMCQ].split(' (')[0].trim() === quiz.correct;
      setIsCorrect(correct);
      setIsCheckMode(true);
      
      if (correct) playSuccessEarcon();
      else playErrorEarcon();
      
      const newHistory = [...history, correct ? 'D' : 'S'];
      setHistory(newHistory);
    } else {
      setIsCheckMode(false);
      setSelectedMCQ(null);
      if (currentQ < totalQ - 1) {
        setCurrentQ(prev => prev + 1);
      } else {
        onNext();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        if (selectedMCQ !== null) handleNextQ();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMCQ, currentQ]);

  if (totalQ === 0) {
    return <div className="text-center p-10 text-primary/70">Không có câu hỏi ôn tập.</div>;
  }

  const currentQuiz = allQuizzes[currentQ];

  return (
    <div className="flex flex-col flex-1 w-full max-w-5xl mx-auto gap-4">
      <div className="wf-unit-header mb-6">
        <div className="wf-breadcrumb">Bài học &gt; Unit {unitId} &gt; Học ngữ pháp &gt; <span className={mode === 'deep' ? 'wf-breadcrumb-mode-deep text-primary' : 'text-blue-500 font-bold'}>{mode === 'deep' ? 'Deep Mode' : 'Fast Mode'}</span></div>
        <div className="wf-page-title text-2xl font-bold mt-1">Mini Review Grammar</div>
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

      <div className="flex flex-col flex-1 w-full max-w-2xl mx-auto">
        <div className="bg-white   shadow-glow rounded-xl w-full p-8 relative">
          <div className="absolute top-4 right-4 bg-canvas text-primary/70 text-[10px] font-bold px-2 py-1 rounded">
            {mode === 'deep' ? `DEEP: ${totalQ} CÂU` : `FAST: ${totalQ} CÂU`}
          </div>

          <div className="text-sm font-bold text-primary mb-4 mt-2">Chọn cấu trúc đúng cho câu:</div>
          <div className="p-4 bg-surface  border-purple-100 rounded-xl text-lg font-serif italic text-primary text-center mb-6 shadow-inner">
            "{currentQuiz?.question || ''}"
          </div>

          <div className="flex flex-col gap-3 mb-8">
            {(currentQuiz?.options || []).map((opt, i) => {
              const isSelected = selectedMCQ === i;
              return (
              <div
                key={i}
                onClick={() => { if(!isCheckMode) { setSelectedMCQ(i); setShowEmptyError(false); } }}
                className={`interactive ${isSelected ? 'selected' : ''}`}
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
                  {String.fromCharCode(65 + i)}
                </div>
                <div style={{ fontSize: '15px', color: 'var(--text-primary)' }}>{opt.split(' (')[0].trim()}</div>
              </div>
            )})}
          </div>

          <div className="flex items-center justify-between mt-4 pt-6  ">
            <div className="flex items-center gap-2">
              {Array.from({ length: totalQ }).map((_, i) => {
                const status = history[i];
                let bgClass = 'bg-gray-200 text-primary/70';
                if (status === 'D') bgClass = 'bg-success text-white text-white';
                if (status === 'S') bgClass = 'bg-error text-white text-white';
                if (i === currentQ) bgClass = 'bg-primary text-white ring-2 ring-purple-200';

                return (
                  <div key={i} className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${bgClass}`}>
                    {status === 'D' ? '✓' : status === 'S' ? '✗' : i + 1}
                  </div>
                );
              })}
              <div className="text-xs text-primary/70 ml-2">Câu {currentQ + 1}/{totalQ}</div>
            </div>

            {!isCheckMode ? (
              <button
                onClick={handleNextQ}
                className={`wf-btn btn-default-submit px-8 py-3 rounded-xl font-bold transition-all shadow-glow ${selectedMCQ !== null ? 'bg-primary text-white hover:bg-primary' : 'bg-gray-300 text-primary/70'}`}
                tabIndex={0}
              >
                Kiểm tra
              </button>
            ) : (
              <button
                onClick={handleNextQ}
                className="wf-btn btn-default-submit px-8 py-3 bg-success text-white font-bold rounded-xl shadow-glow hover:bg-green-700 transition-all"
                tabIndex={0}
              >
                Tiếp tục
              </button>
            )}
          </div>

          {isCheckMode && (
            <div className={`mt-6 text-center text-sm font-medium p-4 px-6 rounded-lg w-full ${isCorrect ? 'bg-green-100 text-success' : 'bg-red-100 text-error'}`}>
              <div className="font-bold text-base mb-1">{isCorrect ? 'Chính xác!' : 'Chưa chính xác!'}</div>
              {!isCorrect && (
                <div className="mt-2 text-left">
                  <strong>Đáp án đúng:</strong> {currentQuiz?.options?.find(o => o.split(' (')[0].trim() === currentQuiz?.correct)}
                </div>
              )}
              {isCorrect && currentQuiz?.options?.[selectedMCQ] && (
                <div className="mt-2 text-left">
                  <strong>Giải thích:</strong> {currentQuiz?.options?.[selectedMCQ]}
                </div>
              )}
            </div>
          )}
          
          {showEmptyError && (
            <div className="mt-4 text-center text-sm font-bold text-error" style={{ animation: 'shake 0.4s' }}>
              Vui lòng chọn một đáp án trước khi trả lời!
            </div>
          )}
        </div>
      </div>

      <div className="wf-hint-bar flex justify-between text-xs text-primary/70 mt-4 pt-4  ">
        <div className="flex-row gap-16">
          <div className="wf-hint-text"><span className="wf-hint-key">A-C</span> Chọn cấu trúc</div>
          <div className="wf-hint-text"><span className="wf-hint-key">Enter</span> Trả lời</div>
        </div>
        <div className="wf-hint-text">Ôn tập định kỳ giúp ghi nhớ cấu trúc lâu hơn!</div>
      </div>
    </div>
  );
}
