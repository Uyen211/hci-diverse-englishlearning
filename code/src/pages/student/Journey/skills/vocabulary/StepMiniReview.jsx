import React, { useState, useEffect, useMemo } from 'react';
import { useAudio } from '../../../../../hooks/useAudio';

export default function StepMiniReview({ wordData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, words, unitId }) {
  const { playSuccessEarcon, playErrorEarcon } = useAudio();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showError, setShowError] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  // Generate Questions
  const questions = useMemo(() => {
    // Get the words to review (last 3-4 words)
    const recentWords = wordIndex !== undefined ? words.slice(Math.max(0, wordIndex - 2), wordIndex + 1) : words;

    let qList = [];
    recentWords.forEach(w => {
      // Q1: Meaning recognition
      qList.push({
        type: 'meaning',
        word: w.word,
        question: `Nghĩa của từ "${w.word}" là gì?`,
        correct: w.meaning,
        options: [w.meaning, "Một nghĩa sai 1", "Một nghĩa sai 2", "Một nghĩa sai 3"].sort(() => Math.random() - 0.5)
      });
      
      // Q2: Context recognition (only in Deep mode or if we want more questions)
      if (mode === 'deep' && w.contexts && w.contexts.length > 0) {
        const sentence = w.contexts[0].en.replace(new RegExp(w.word, 'gi'), '_____');
        qList.push({
          type: 'context',
          word: w.word,
          question: `Điền từ thích hợp vào chỗ trống: "${sentence}"`,
          correct: w.word,
          options: [w.word, "wrong_word_1", "wrong_word_2", "wrong_word_3"].sort(() => Math.random() - 0.5)
        });
      }
    });
    // Shuffle all questions
    const shuffled = qList.sort(() => Math.random() - 0.5);
    // Limit questions based on mode
    const limit = mode === 'deep' ? 5 : 3;
    return shuffled.slice(0, limit);
  }, [wordIndex, mode, words]);

  const currentQ = questions[currentQuestionIndex];
  const isFinished = currentQuestionIndex >= questions.length;

  const handleSubmit = () => {
    if (!selectedOpt) {
      setShowError(true);
      return;
    }
    setShowError(false);
    setIsAnswered(true);

    if (selectedOpt === currentQ.correct) {
      playSuccessEarcon();
      setTimeout(() => {
        setIsAnswered(false);
        setSelectedOpt(null);
        setCurrentQuestionIndex(prev => prev + 1);
      }, 1000);
    } else {
      playErrorEarcon();
      // If wrong, force try again after a delay
      setTimeout(() => {
        setIsAnswered(false);
        setSelectedOpt(null);
      }, 1000);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isFinished) {
        if (e.key === 'Enter') {
          e.preventDefault();
          onNext();
        }
        return;
      }

      if (e.key === 'Enter' && !isAnswered) {
        e.preventDefault();
        handleSubmit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFinished, isAnswered, selectedOpt, currentQ]);

  if (isFinished) {
    return (
      <div className="wf-main-content">
        <div className="wf-unit-header">
          <div className="wf-page-title">Hoàn thành Ôn tập</div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
          <h2 style={{ color: 'var(--primary)', marginBottom: '8px' }}>Tuyệt vời!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Bạn đã vượt qua bài Mini Review.</p>
          <button className="wf-btn" onClick={() => onNext()}>Tiếp tục</button>
        </div>
      </div>
    );
  }

  return (
    <div className="wf-main-content">
      <div className="wf-unit-header">
        <div className="wf-breadcrumb">Bài học &gt; Unit {unitId} &gt; Học từ vựng &gt; <span className={`wf-breadcrumb-mode-${mode}`}>{mode === 'deep' ? 'Deep Mode' : 'Fast Mode'}</span></div>
        <div className="wf-page-title">Trạm nghỉ: Mini Review</div>
      </div>

      <div className="wf-topbar">
        <div className="wf-step-counter">
          <div className="wf-step-counter-item">Câu: <strong>{currentQuestionIndex + 1}</strong> / {questions.length}</div>
        </div>
        <div className="wf-progress-mini">
          <div className="wf-progress-mini-bar">
            <div className="wf-progress-mini-fill" style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}></div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '850px', margin: '0 auto', width: '100%' }}>
        <div style={{ 
          width: '100%', 
          background: 'white', 
          borderRadius: '16px', 
          padding: '32px', 
          border: '1px solid rgba(155, 93, 224, 0.1)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
        }}>
          <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '24px', textAlign: 'center' }}>
            {currentQ.question}
          </h3>

          <div className="flex-col gap-12">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOpt === opt;
              const isCorrectOpt = opt === currentQ.correct;
              
              let bg = isSelected ? '#FAF8FF' : 'white';
              let border = isSelected ? '2px solid var(--primary)' : '2px solid rgba(0,0,0,0.05)';
              
              if (isAnswered && isSelected) {
                if (isCorrectOpt) {
                  bg = '#F0FDF4'; border = '2px solid var(--success)';
                } else {
                  bg = '#FEF2F2'; border = '2px solid var(--error)';
                }
              } else if (isAnswered && isCorrectOpt && !isSelected) {
                // Show correct answer if they got it wrong
                bg = '#F0FDF4'; border = '2px solid var(--success)';
              }

              return (
                <div 
                  key={idx}
                  className={`interactive`}
                  onClick={() => { if(!isAnswered) setSelectedOpt(opt); setShowError(false); }}
                  style={{
                    padding: '16px 24px',
                    borderRadius: '12px',
                    border: border,
                    background: bg,
                    cursor: isAnswered ? 'default' : 'pointer',
                    fontWeight: isSelected ? 'bold' : 'normal',
                    transition: 'all 0.2s'
                  }}
                >
                  {opt}
                </div>
              );
            })}
          </div>

          {showError && <div style={{ color: 'var(--error)', marginTop: '16px', textAlign: 'center', animation: 'shake 0.4s' }}>Vui lòng chọn một đáp án!</div>}

          <div className="flex-row justify-center" style={{ marginTop: '32px' }}>
            <button className={`wf-btn ${!selectedOpt || isAnswered ? 'disabled' : ''}`} onClick={handleSubmit} disabled={isAnswered}>
              Kiểm tra
            </button>
          </div>
        </div>
      </div>
      
      <div className="wf-hint-bar">
        <div className="wf-hint-text"><span className="wf-hint-key">Nhấp chuột</span> Chọn đáp án <span style={{ marginLeft: '8px' }}><span className="wf-hint-key">Enter</span> Kiểm tra</span></div>
        <div className="wf-hint-text">Vượt qua bài ôn tập để chốt kiến thức</div>
      </div>
    </div>
  );
}
