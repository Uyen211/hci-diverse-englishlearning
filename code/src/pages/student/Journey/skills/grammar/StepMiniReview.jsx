import React, { useState, useEffect } from 'react';

export default function StepMiniReview({ grammarData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId, words }) {
  const allItems = words || [];
  const reviewItems = allItems.slice(-3);
  const allQuizzes = reviewItems.flatMap(item => (item.recognitionQuizzes || []).slice(0, mode === 'deep' ? 2 : 1));
  const totalQ = allQuizzes.length;

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedMCQ, setSelectedMCQ] = useState(null);
  const [history, setHistory] = useState([]);

  const handleNextQ = () => {
    if (selectedMCQ === null) return;

    const quiz = allQuizzes[currentQ];
    const isCorrect = quiz.options[selectedMCQ] === quiz.correct;
    const newHistory = [...history, isCorrect ? 'D' : 'S'];
    setHistory(newHistory);
    setSelectedMCQ(null);

    if (currentQ < totalQ - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      onNext();
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
        <div className="wf-breadcrumb">Unit {unitId} &gt; Học ngữ pháp &gt; <span className={mode === 'deep' ? 'wf-breadcrumb-mode-deep text-primary' : 'text-blue-500 font-bold'}>{mode === 'deep' ? 'Deep Mode' : 'Fast Mode'}</span></div>
        <div className="wf-page-title text-2xl font-bold mt-1">Mini Review Grammar</div>
      </div>

      <div className="wf-topbar flex items-center justify-between  pb-4 mb-6 ">
        <div className="wf-step-counter flex items-center gap-3 text-sm text-primary/70">
          <div className="wf-step-counter-item">Bước: <strong className="text-primary">{stepIndex}</strong> / {totalSteps}</div>
          <div className="wf-step-counter-divider hidden"></div>
          <div className="wf-step-counter-item">Câu: <strong className="text-primary">{currentQ + 1}</strong> / {totalQ}</div>
        </div>
        <div className="wf-progress-mini flex items-center gap-3">
          <div className="wf-progress-mini-bar w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="wf-progress-mini-fill h-full bg-purple-500 transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div className="wf-progress-mini-label text-sm font-bold text-primary">{progressPercent}%</div>
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
            {(currentQuiz?.options || []).map((opt, i) => (
              <div
                key={i}
                onClick={() => setSelectedMCQ(i)}
                className={`p-4  rounded-xl cursor-pointer transition-all flex items-center justify-between font-bold text-sm ${selectedMCQ === i ? ' bg-purple-50 text-primary ring-2 ring-purple-200' : ' text-primary hover: hover:bg-surface'}`}
              >
                <div>{opt}</div>
                <div className={`w-6 h-6 rounded flex items-center justify-center  ${selectedMCQ === i ? ' bg-purple-500 text-white' : ' text-transparent'}`}>
                  ✓
                </div>
              </div>
            ))}
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

            <button
              onClick={handleNextQ}
              disabled={selectedMCQ === null}
              className={`px-8 py-3 rounded-xl font-bold transition-all shadow-glow ${selectedMCQ !== null ? 'bg-primary text-white hover:bg-primary' : 'bg-gray-300 text-primary/70 cursor-not-allowed'}`}
            >
              <u>T</u>rả lời
            </button>
          </div>
        </div>
      </div>

      <div className="wf-hint-bar flex justify-between text-xs text-primary/70 mt-4 pt-4  ">
        <div className="wf-hint-text">
          <span className="wf-hint-key bg-canvas px-2 py-1 rounded border">A-C</span> Chọn cấu trúc
          <span className="ml-4"><span className="wf-hint-key bg-canvas px-2 py-1 rounded border">Enter</span> Trả lời</span>
        </div>
        <div className="wf-hint-text">Ôn tập định kỳ giúp ghi nhớ cấu trúc lâu hơn!</div>
      </div>
    </div>
  );
}
