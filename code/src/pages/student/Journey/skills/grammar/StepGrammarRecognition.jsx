import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAudio } from '../../../../../hooks/useAudio';

export default function StepGrammarRecognition({ grammarData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const quizzes = grammarData.recognitionQuizzes || [];
  const totalQ = quizzes.length;
  const [currentQ, setCurrentQ] = useState(0);
  const [draggedItem, setDraggedItem] = useState(null);
  const [matchedItems, setMatchedItems] = useState({}); // { quizIndex: opt }
  const [selectedMCQ, setSelectedMCQ] = useState(null);
  const [results, setResults] = useState([]);
  const [showEmptyError, setShowEmptyError] = useState(false);
  const [isCheckMode, setIsCheckMode] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [incorrectIndexes, setIncorrectIndexes] = useState([]);

  const { playSuccessEarcon, playErrorEarcon } = useAudio();

  const handleNextQ = () => {
    if (mode === 'deep') {
      if (Object.keys(matchedItems).length < totalQ) {
        setShowEmptyError(true);
        playErrorEarcon();
        return;
      }
    } else if (mode === 'fast' && selectedMCQ === null) {
      setShowEmptyError(true);
      playErrorEarcon();
      return;
    }

    if (!isCheckMode) {
      setShowEmptyError(false);

      if (mode === 'deep') {
        let allCorrect = true;
        let incorrect = [];
        quizzes.forEach((q, i) => {
          if (matchedItems[i]?.label !== q.correct) {
            allCorrect = false;
            incorrect.push(i);
          }
        });
        
        setIsCorrect(allCorrect);
        setIncorrectIndexes(incorrect);
        setIsCheckMode(true);
        
        if (allCorrect) playSuccessEarcon();
        else playErrorEarcon();
      } else {
        const selectedText = quizzes[currentQ]?.options?.[selectedMCQ] || '';
        const correct = selectedText.split(' (')[0].trim() === quizzes[currentQ]?.correct;

        setIsCorrect(correct);
        setIsCheckMode(true);

        if (correct) playSuccessEarcon();
        else playErrorEarcon();

        setResults(prev => [...prev, correct]);
      }
    } else {
      if (mode === 'deep') {
        if (isCorrect) {
          onNext({ isPass: true });
        }
      } else {
        setIsCheckMode(false);
        if (currentQ < totalQ - 1) {
          setCurrentQ(prev => prev + 1);
          setSelectedMCQ(null);
        } else {
          const score = results.filter(Boolean).length;
          const pct = (score / totalQ) * 100;
          onNext({ isPass: pct >= 70 });
        }
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        if (mode === 'deep' && Object.keys(matchedItems).length === totalQ) handleNextQ();
        else if (mode === 'fast' && selectedMCQ !== null) handleNextQ();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, matchedItems, selectedMCQ, currentQ, totalQ]);

  const handleDragStart = (e, opt) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(opt));
    setDraggedItem(opt);
    setShowEmptyError(false);
    setIsCheckMode(false);
  };

  const handleDrop = (e, quizIndex) => {
    e.preventDefault();
    if (draggedItem) {
      if (isCheckMode && !incorrectIndexes.includes(quizIndex) && matchedItems[quizIndex]) return; // Don't allow changing correct items
      setMatchedItems(prev => ({
        ...prev,
        [quizIndex]: draggedItem
      }));
      setDraggedItem(null);
      setIsCheckMode(false);
    }
  };

  if (totalQ === 0) {
    return <div className="text-center p-10 text-primary/70">Không có dữ liệu nhận diện cho cấu trúc này.</div>;
  }

  const currentQuiz = quizzes[currentQ];
  const deepOptions = [...new Set(quizzes.map(q => q.correct))].map(ans => ({
    label: ans,
    sub: ''
  }));

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
        <div className="wf-page-title text-2xl font-bold mt-1">
          {mode === 'deep' ? 'Nhận diện cấu trúc: Kéo thả cấu trúc' : 'Nhận diện: Chọn cấu trúc đúng'}
        </div>
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

      <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto">
        {mode === 'deep' ? (
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-row gap-8 flex-1 items-start">
              <div className="flex flex-col gap-4 w-[280px]">
                <div className="text-sm font-bold text-center text-primary/70 mb-2 uppercase tracking-widest">CỤM CẤU TRÚC</div>
                {deepOptions.map((opt, i) => {
                  const isUsed = Object.values(matchedItems).some(item => item.label === opt.label);
                  return (
                    <div
                      key={i}
                      draggable={!isUsed}
                      onDragStart={(e) => handleDragStart(e, opt)}
                      className={`flex items-center justify-center p-4 bg-white rounded-xl shadow-glow transition-colors ${isUsed ? 'opacity-40 cursor-default' : 'cursor-grab active:cursor-grabbing hover:bg-purple-50'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 mr-3"><path d="M19.439 10a2.9 2.9 0 0 1 2.561 2.89 2.9 2.9 0 0 1-2.54 2.89M5 10a2.9 2.9 0 0 0-2.561 2.89A2.9 2.9 0 0 0 4.98 15.78M10 19.439a2.9 2.9 0 0 1 2.89 2.561 2.9 2.9 0 0 1 2.89-2.54M14 5a2.9 2.9 0 0 0-2.89-2.561A2.9 2.9 0 0 0 8.22 4.98M15 15H9V9h6z"/></svg>
                      <strong className="text-primary text-lg">{opt.label}</strong>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col gap-4 flex-1">
                <div className="text-sm font-bold text-center text-primary/70 mb-2 uppercase tracking-widest">NGỮ CẢNH</div>

                {quizzes.map((quiz, qIdx) => {
                  const dropped = matchedItems[qIdx];
                  const parts = quiz.question.split(/_{2,}/);
                  const isWrong = isCheckMode && incorrectIndexes.includes(qIdx);
                  const isRight = isCheckMode && !incorrectIndexes.includes(qIdx) && dropped;

                  return (
                    <div
                      key={qIdx}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(e, qIdx)}
                      className={`border-dashed rounded-xl p-6 text-left min-h-[90px] flex items-center transition-colors border-2 ${dropped ? (isRight ? 'bg-green-50 border-success' : (isWrong ? 'bg-red-50 border-error' : 'bg-purple-50 border-primary')) : 'border-gray-300 bg-surface'}`}
                    >
                      <div className="text-lg text-primary font-medium w-full flex flex-wrap items-center gap-y-2">
                        {parts.map((part, pIdx) => (
                          <React.Fragment key={pIdx}>
                            <span>{part}</span>
                            {pIdx < parts.length - 1 && (
                              <span 
                                draggable={!!dropped && !isRight}
                                onDragStart={(e) => {
                                  if (dropped && !isRight) {
                                    handleDragStart(e, dropped);
                                    // Remove from current slot when dragging starts
                                    setMatchedItems(prev => {
                                      const next = {...prev};
                                      delete next[qIdx];
                                      return next;
                                    });
                                  }
                                }}
                                onClick={() => {
                                  if (dropped && !isRight) {
                                    setMatchedItems(prev => {
                                      const next = {...prev};
                                      delete next[qIdx];
                                      return next;
                                    });
                                    setIsCheckMode(false);
                                  }
                                }}
                                className={`inline-flex min-w-[120px] mx-2 h-[40px] items-center justify-center rounded-lg border-2 border-dashed ${dropped ? (isRight ? 'border-success bg-success text-white' : (isWrong ? 'border-error bg-error text-white cursor-grab active:cursor-grabbing hover:opacity-80' : 'border-primary bg-primary text-white cursor-grab active:cursor-grabbing hover:opacity-80')) : 'border-gray-400 bg-gray-100'} px-4 font-bold text-sm shadow-sm transition-all`}
                                style={{ animation: isWrong ? 'shake 0.4s' : 'none' }}
                              >
                                {dropped ? dropped.label : <span className="text-gray-400 font-normal">Kéo thả vào đây</span>}
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col items-center mt-10">
              {showEmptyError && (
                <div className="mb-4 text-center text-sm font-bold text-error" style={{ animation: 'shake 0.4s' }}>
                  Vui lòng điền đủ tất cả các khoảng trống trước khi kiểm tra!
                </div>
              )}
              {isCheckMode && !isCorrect && (
                <div className="mb-4 text-center text-sm font-bold text-error" style={{ animation: 'shake 0.4s' }}>
                  Có cụm cấu trúc chưa chính xác. Vui lòng kéo thả lại cụm khác đè lên ô bị sai để sửa nhé!
                </div>
              )}
              {!isCheckMode || !isCorrect ? (
                <button
                  onClick={handleNextQ}
                  className={`wf-btn btn-default-submit px-12 py-4 rounded-xl font-bold transition-all text-lg shadow-glow ${Object.keys(matchedItems).length === totalQ ? 'bg-primary text-white hover:bg-primary' : 'bg-gray-300 text-primary/70'}`}
                  tabIndex={0}
                >
                  Kiểm tra
                </button>
              ) : (
                <div className="flex flex-col items-center">
                  <div className={`mb-4 text-center text-sm font-bold p-3 px-8 rounded-lg bg-green-100 text-success`}>
                    Chính xác! Bạn đã điền đúng toàn bộ.
                  </div>
                  <button
                    onClick={handleNextQ}
                    className="wf-btn btn-default-submit px-12 py-4 bg-success text-white font-bold rounded-xl shadow-glow text-lg hover:bg-green-700 transition-all"
                    tabIndex={0}
                  >
                    Tiếp tục
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
            <div className="bg-purple-50   rounded-xl p-6 w-full mb-6 shadow-glow">
              <div className="text-sm font-bold text-primary mb-3 uppercase tracking-wider">Cấu trúc nào phù hợp với câu sau?</div>
              <div className="text-xl leading-relaxed text-primary text-center font-semibold tracking-wide p-6 bg-surface rounded-xl shadow-inner border border-dashed border-purple-200">
                "{currentQuiz.question}"
              </div>
            </div>

            <div className="bg-white   shadow-glow rounded-xl w-full p-6">
              <div className="flex flex-col gap-4">
                {(currentQuiz.options || []).map((opt, i) => {
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
              
              {showEmptyError && (
                <div className="mt-6 text-center text-sm font-bold text-error" style={{ animation: 'shake 0.4s' }}>
                  Vui lòng chọn một đáp án trước khi trả lời!
                </div>
              )}

              {!isCheckMode ? (
                <div className="flex flex-row justify-center mt-8">
                  <button
                    onClick={handleNextQ}
                    className={`wf-btn btn-default-submit px-12 py-3 rounded-xl font-bold transition-all shadow-glow ${selectedMCQ !== null ? 'bg-primary text-white hover:bg-primary' : 'bg-gray-300 text-primary/70'}`}
                    tabIndex={0}
                  >
                    Kiểm tra
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center mt-8">
                  <div className={`mb-4 text-center text-sm font-medium p-4 px-6 rounded-lg w-full ${isCorrect ? 'bg-green-100 text-success' : 'bg-red-100 text-error'}`}>
                    <div className="font-bold text-base mb-1">{isCorrect ? 'Chính xác!' : 'Chưa chính xác!'}</div>
                    {!isCorrect && (
                      <div className="mt-2 text-left">
                        <strong>Đáp án đúng:</strong> {quizzes[currentQ]?.options?.find(o => o.split(' (')[0].trim() === quizzes[currentQ]?.correct)}
                      </div>
                    )}
                    {isCorrect && quizzes[currentQ]?.options?.[selectedMCQ] && (
                      <div className="mt-2 text-left">
                        <strong>Giải thích:</strong> {quizzes[currentQ]?.options?.[selectedMCQ]}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleNextQ}
                    className="wf-btn btn-default-submit px-12 py-3 bg-success text-white font-bold rounded-xl shadow-glow hover:bg-green-700 transition-all"
                    tabIndex={0}
                  >
                    Tiếp tục
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="wf-hint-bar flex justify-between text-xs text-primary/70 mt-4 pt-4  ">
        <div className="wf-hint-text">
          {mode === 'deep' ? (
            <>
              <span className="wf-hint-key bg-canvas px-2 py-1 rounded border">Kéo thả</span> bằng chuột
              <span className="ml-4"><span className="wf-hint-key bg-canvas px-2 py-1 rounded border">Enter</span> Nộp kết quả</span>
            </>
          ) : (
            <>
              <span className="wf-hint-key bg-canvas px-2 py-1 rounded border">A-D</span> Chọn đáp án
              <span className="ml-4"><span className="wf-hint-key bg-canvas px-2 py-1 rounded border">Enter</span> Trả lời</span>
            </>
          )}
        </div>
        <div className="wf-hint-text">
          {mode === 'deep' ? 'Kéo cụm cấu trúc vào ngữ cảnh tương ứng' : 'Chọn cụm cấu trúc phù hợp với ngữ cảnh của câu'}
        </div>
      </div>
    </div>
  );
}
