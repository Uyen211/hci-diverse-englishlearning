import React, { useState, useEffect } from 'react';

export default function StepGrammarRecognition({ grammarData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const quizzes = grammarData.recognitionQuizzes || [];
  const totalQ = quizzes.length;
  const [currentQ, setCurrentQ] = useState(0);
  const [draggedItem, setDraggedItem] = useState(null);
  const [droppedItem, setDroppedItem] = useState(null);
  const [selectedMCQ, setSelectedMCQ] = useState(null);
  const [results, setResults] = useState([]);

  const handleNextQ = () => {
    const isCorrect = mode === 'deep'
      ? droppedItem?.label === quizzes[currentQ]?.correct
      : quizzes[currentQ]?.options?.[selectedMCQ] === quizzes[currentQ]?.correct;

    setResults(prev => [...prev, isCorrect]);

    if (currentQ < totalQ - 1) {
      setCurrentQ(prev => prev + 1);
      setDroppedItem(null);
      setSelectedMCQ(null);
    } else {
      const score = [...results, isCorrect].filter(Boolean).length;
      const pct = (score / totalQ) * 100;
      if (mode === 'deep' && pct < 70) {
        onNext({ action: 'restart' });
      } else {
        onNext({ isPass: pct >= 70 });
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        if (mode === 'deep' && droppedItem) handleNextQ();
        else if (mode === 'fast' && selectedMCQ !== null) handleNextQ();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, droppedItem, selectedMCQ, currentQ]);

  const handleDragStart = (e, opt) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(opt));
    setDraggedItem(opt);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedItem) {
      setDroppedItem(draggedItem);
      setDraggedItem(null);
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
        <div className="wf-breadcrumb">Unit {unitId} &gt; Học ngữ pháp &gt; <span className={mode === 'deep' ? 'wf-breadcrumb-mode-deep text-primary' : 'text-blue-500 font-bold'}>{mode === 'deep' ? 'Deep Mode' : 'Fast Mode'}</span></div>
        <div className="wf-page-title text-2xl font-bold mt-1">
          {mode === 'deep' ? 'Nhận diện cấu trúc: Kéo thả cấu trúc' : 'Nhận diện: Chọn cấu trúc đúng'}
        </div>
      </div>

      <div className="wf-topbar flex items-center justify-between  pb-4 mb-6 ">
        <div className="wf-step-counter flex items-center gap-3 text-sm text-primary/70">
          <div className="wf-step-counter-item">Bước: <strong className="text-primary">{stepIndex}</strong> / {totalSteps}</div>
          <div className="wf-step-counter-divider hidden"></div>
          <div className="wf-step-counter-item">Cấu trúc: <strong className="text-primary">{wordIndex + 1}</strong> / {totalWords}</div>
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

      <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto">
        {mode === 'deep' ? (
          <div className="flex flex-col w-full h-full">
            <div className="bg-gray-200 text-primary/70 text-xs font-bold py-2 mb-6 w-full text-center rounded-lg uppercase tracking-wider">
              Mục 1 - Kéo cụm cấu trúc vào câu tương ứng
            </div>

            <div className="flex flex-row gap-8 flex-1">
              <div className="flex flex-col gap-4 flex-1">
                <div className="text-xs font-bold text-center text-primary/70 mb-2 uppercase tracking-widest">CỤM CẤU TRÚC</div>
                {deepOptions.map((opt, i) => (
                  <div
                    key={i}
                    draggable
                    onDragStart={(e) => handleDragStart(e, opt)}
                    className="flex items-center justify-center p-4 bg-white   rounded-xl shadow-glow cursor-grab active:cursor-grabbing hover:bg-purple-50 hover: transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 mr-3"><path d="M19.439 10a2.9 2.9 0 0 1 2.561 2.89 2.9 2.9 0 0 1-2.54 2.89M5 10a2.9 2.9 0 0 0-2.561 2.89A2.9 2.9 0 0 0 4.98 15.78M10 19.439a2.9 2.9 0 0 1 2.89 2.561 2.9 2.9 0 0 1 2.89-2.54M14 5a2.9 2.9 0 0 0-2.89-2.561A2.9 2.9 0 0 0 8.22 4.98M15 15H9V9h6z"/></svg>
                    <strong className="text-primary text-lg">{opt.label}</strong>
                  </div>
                ))}
              </div>

              <div className="flex flex-col justify-center items-center gap-6 px-4">
                {deepOptions.map((_, i) => (
                  <div key={i} className="text-gray-300 text-3xl font-light">→</div>
                ))}
              </div>

              <div className="flex flex-col gap-4 flex-1">
                <div className="text-xs font-bold text-center text-primary/70 mb-2 uppercase tracking-widest">NGỮ CẢNH</div>

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className={` border-dashed rounded-xl p-4 text-center min-h-[70px] flex items-center justify-center transition-colors ${droppedItem ? ' bg-purple-50' : 'border-gray-400 bg-surface'}`}
                >
                  <div className="text-base text-primary font-medium">
                    {droppedItem ? (
                      <span><span className="bg-primary text-white px-3 py-1 rounded-lg font-bold">{droppedItem.label}</span> {currentQuiz.question.replace(/_{2,}/g, '').trim()}</span>
                    ) : (
                      <span>{currentQuiz.question}</span>
                    )}
                  </div>
                </div>

                {Array.from({ length: Math.max(0, deepOptions.length - 1) }).map((_, i) => (
                  <div key={i} className=" border-dashed  bg-surface rounded-xl p-4 text-center min-h-[70px] flex items-center justify-center text-gray-400 text-sm">
                    Kéo cụm vào đây
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-row justify-center mt-10">
              <button
                onClick={handleNextQ}
                disabled={!droppedItem}
                className={`px-12 py-4 rounded-xl font-bold transition-all text-lg shadow-glow ${droppedItem ? 'bg-primary text-white hover:bg-primary' : 'bg-gray-300 text-primary/70 cursor-not-allowed'}`}
              >
                <u>N</u>ộp kết quả
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
            <div className="bg-purple-50   rounded-xl p-6 w-full mb-6 shadow-glow">
              <div className="text-xs font-bold text-primary mb-3 uppercase tracking-wider">Cấu trúc nào phù hợp với câu sau?</div>
              <div className="text-lg leading-relaxed p-4 bg-white  border-purple-100 shadow-inner rounded-xl font-serif italic text-primary text-center">
                "{currentQuiz.question}"
              </div>
            </div>

            <div className="bg-white   shadow-glow rounded-xl w-full p-6">
              <div className="flex flex-col gap-4">
                {(currentQuiz.options || []).map((opt, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedMCQ(i)}
                    className={`p-4  rounded-xl cursor-pointer transition-all flex flex-row items-center gap-4 ${selectedMCQ === i ? ' bg-purple-50 ring-2 ring-purple-200' : ' hover:'}`}
                  >
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shrink-0 ${selectedMCQ === i ? 'bg-primary text-white' : 'bg-canvas text-primary/70'}`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <div className="flex flex-col">
                      <div className="font-bold text-primary">{opt}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-row justify-center mt-8">
                <button
                  onClick={handleNextQ}
                  disabled={selectedMCQ === null}
                  className={`px-12 py-3 rounded-xl font-bold transition-all shadow-glow ${selectedMCQ !== null ? 'bg-primary text-white hover:bg-primary' : 'bg-gray-300 text-primary/70 cursor-not-allowed'}`}
                >
                  <u>T</u>rả lời
                </button>
              </div>
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
