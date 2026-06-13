import React, { useState, useEffect } from 'react';

export default function StepCompareDifferentiate({ grammarData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const compareData = grammarData.compareDifferentiate || {};
  const options = compareData.options || [];
  const correctIndex = compareData.correct ? options.indexOf(compareData.correct) : -1;

  const handleCheck = () => {
    if (selectedOption !== null) {
      onNext({ correct: selectedOption === correctIndex });
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
        <div className="wf-breadcrumb">Unit {unitId} &gt; Học ngữ pháp &gt; <span className="wf-breadcrumb-mode-deep text-primary">Deep Mode</span></div>
        <div className="wf-page-title text-2xl font-bold mt-1">Phân biệt sắc thái: {grammarData.title}</div>
      </div>

      <div className="wf-topbar flex items-center justify-between  pb-4 mb-6 ">
        <div className="wf-step-counter flex items-center gap-3 text-sm text-primary/70">
          <div className="wf-step-counter-item">Bước: <strong className="text-primary">{stepIndex}</strong> / {totalSteps}</div>
          <div className="wf-step-counter-divider hidden"></div>
          <div className="wf-step-counter-item">Cấu trúc: <strong className="text-primary">{wordIndex + 1}</strong> / {totalWords}</div>
          <div className="wf-step-counter-divider hidden"></div>
          <div className="wf-step-counter-item">Câu: <strong className="text-primary">2</strong> / 3</div>
        </div>
        <div className="wf-progress-mini flex items-center gap-3">
          <div className="wf-progress-mini-bar w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="wf-progress-mini-fill h-full bg-purple-500 transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div className="wf-progress-mini-label text-sm font-bold text-primary">{progressPercent}%</div>
        </div>
      </div>

      <div className="flex flex-row gap-6 flex-1 w-full max-w-5xl mx-auto">
        <div className="flex flex-col gap-4 flex-1">
          <div className="wf-card-highlight p-6 bg-purple-50   rounded-xl shadow-glow">
            <div className="wf-label text-xs font-bold text-primary mb-4 uppercase tracking-wider">Cặp câu đối chiếu:</div>
            <div className="text-sm leading-relaxed flex flex-col gap-4">
              <div className="pb-3  ">
                <strong className="text-primary">A.</strong> {compareData.sentenceA || grammarData.title}
                <div className="wf-subtitle text-xs text-primary/70 mt-1">=&gt; Câu A</div>
              </div>
              <div className="pb-2">
                <strong className="text-primary">B.</strong> {compareData.sentenceB || ''}
                <div className="wf-subtitle text-xs text-primary/70 mt-1">=&gt; Câu B</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1 max-w-[800px]">
          <div className="wf-card p-6 bg-white   rounded-xl shadow-glow h-full flex flex-col">
            <div className="wf-label text-sm font-bold mb-4 text-primary">MCQ: {compareData.question || 'Chọn câu đúng:'}</div>
            <div className="flex flex-col gap-3 flex-1">
              {options.map((opt, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedOption(idx)}
                  className={`p-4  rounded-xl cursor-pointer transition-all flex flex-row items-center gap-4 ${selectedOption === idx ? ' bg-purple-50 ring-2 ring-purple-200' : ' hover:'}`}
                >
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shrink-0 ${selectedOption === idx ? 'bg-primary text-white' : 'bg-canvas text-primary/70'}`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div className="text-sm font-medium text-primary">{opt}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-row justify-center mt-6">
              <button
                onClick={handleCheck}
                disabled={selectedOption === null}
                className={`px-10 py-3 rounded-xl font-bold transition-all ${selectedOption !== null ? 'bg-primary text-white shadow-glow hover:bg-primary' : 'bg-gray-300 text-primary/70 cursor-not-allowed'}`}
              >
                <u>T</u>rả lời
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="wf-hint-bar flex justify-between text-xs text-primary/70 mt-4 pt-4  ">
        <div className="wf-hint-text">
          <span className="wf-hint-key bg-canvas px-2 py-1 rounded border">A-C</span> Chọn đáp án
          <span className="ml-4"><span className="wf-hint-key bg-canvas px-2 py-1 rounded border">Enter</span> Trả lời</span>
        </div>
        <div className="wf-hint-text">Phân biệt sắc thái giữa các cấu trúc!</div>
      </div>
    </div>
  );
}
