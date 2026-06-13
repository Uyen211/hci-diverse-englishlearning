import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAudio } from '../../../../../hooks/useAudio';

export default function StepCompareDifferentiate({ grammarData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showEmptyError, setShowEmptyError] = useState(false);
  const [isCheckMode, setIsCheckMode] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { playSuccessEarcon, playErrorEarcon } = useAudio();

  const compareData = grammarData.compareDifferentiate || {};
  const options = compareData.options || [];
  const correctIndex = compareData.correct ? options.indexOf(compareData.correct) : -1;

  const handleCheck = () => {
    if (selectedOption !== null) {
      if (!isCheckMode) {
        setShowEmptyError(false);
        const correct = selectedOption === correctIndex;
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
  }, [selectedOption]);

  return (
    <div className="flex flex-col flex-1 w-full max-w-5xl mx-auto gap-4">
      <div className="wf-unit-header mb-6">
        <div className="wf-breadcrumb flex flex-wrap items-center gap-1">
          <Link to="/" className="hover:underline text-text-secondary">Trang chủ</Link>
          <span className="opacity-50">&gt;</span>
          <Link to="/student/journey" className="hover:underline text-text-secondary">Hành trình</Link>
          <span className="opacity-50">&gt;</span>
          <Link to={`/student/journey/unit/${typeof unitId !== 'undefined' ? unitId : 3}`} className="hover:underline text-text-secondary">Unit {typeof unitId !== 'undefined' ? unitId : 3}</Link>
          <span className="opacity-50">&gt;</span>
          <Link to="/student/grammar/select" className="hover:underline text-text-secondary">Học ngữ pháp</Link>
          <span className="opacity-50">&gt;</span>
          <span className="text-primary font-bold">{typeof mode !== 'undefined' ? (mode === 'fast' ? 'Fast Mode' : mode === 'deep' ? 'Deep Mode' : (mode || 'Mode')) : 'Mode'}</span>
        </div>
        <div className="wf-page-title text-2xl font-bold mt-1">Phân biệt sắc thái: {grammarData.title}</div>
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

      <div className="flex flex-row gap-6 flex-1 w-full max-w-5xl mx-auto">
        <div className="flex flex-col gap-4 flex-1">
          <div className="wf-card-highlight p-6 bg-purple-50   rounded-xl shadow-glow">
            <div className="wf-label text-sm font-bold text-primary mb-4 uppercase tracking-wider">Cặp câu đối chiếu:</div>
            <div className="text-sm leading-relaxed flex flex-col gap-4">
              <div className="pb-3  ">
                <strong className="text-primary">A.</strong> {compareData.sentenceA || grammarData.title}
                <div className="wf-subtitle text-sm text-primary/70 mt-1">=&gt; Câu A</div>
              </div>
              <div className="pb-2">
                <strong className="text-primary">B.</strong> {compareData.sentenceB || ''}
                <div className="wf-subtitle text-sm text-primary/70 mt-1">=&gt; Câu B</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1 max-w-[800px]">
          <div className="wf-card p-6 bg-white   rounded-xl shadow-glow h-full flex flex-col">
            <div className="wf-label text-sm font-bold mb-4 text-primary">MCQ: {compareData.question || 'Chọn câu đúng:'}</div>
            <div className="flex flex-col gap-3 flex-1">
              {options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                return (
                <div
                  key={idx}
                  onClick={() => { if(!isCheckMode) { setSelectedOption(idx); setShowEmptyError(false); } }}
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
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div style={{ fontSize: '15px', color: 'var(--text-primary)' }}>{opt}</div>
                </div>
              )})}
            </div>
            {showEmptyError && (
              <div className="mt-4 text-center text-sm font-bold text-error" style={{ animation: 'shake 0.4s' }}>
                Vui lòng chọn một đáp án trước khi trả lời!
              </div>
            )}
            {!isCheckMode ? (
              <div className="flex flex-row justify-center mt-6">
                <button
                  onClick={handleCheck}
                  className={`wf-btn btn-default-submit px-10 py-3 rounded-xl font-bold transition-all ${selectedOption !== null ? 'bg-primary text-white shadow-glow hover:bg-primary' : 'bg-gray-300 text-primary/70'}`}
                  tabIndex={0}
                >
                  Kiểm tra
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center mt-6 w-full">
                <div className={`mb-4 text-center text-sm font-medium p-4 px-6 rounded-lg w-full ${isCorrect ? 'bg-green-100 text-success' : 'bg-red-100 text-error'}`}>
                  <div className="font-bold text-base mb-1">{isCorrect ? 'Chính xác!' : 'Chưa chính xác!'}</div>
                  {!isCorrect && (
                    <div className="mt-2 text-left">
                      <strong>Đáp án đúng:</strong> {compareData.correct}
                    </div>
                  )}
                  {compareData.explanation && (
                    <div className="mt-2 text-left">
                      <strong>Giải thích:</strong> {compareData.explanation}
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
      </div>

      <div className="wf-hint-bar flex justify-between text-xs text-primary/70 mt-4 pt-4  ">
        <div className="flex-row gap-16">
          <div className="wf-hint-text"><span className="wf-hint-key">A-C</span> Chọn đáp án</div>
          <div className="wf-hint-text"><span className="wf-hint-key">Enter</span> Kiểm tra / Tiếp tục</div>
        </div>
        <div className="wf-hint-text">Phân biệt sắc thái giữa các cấu trúc!</div>
      </div>
    </div>
  );
}
