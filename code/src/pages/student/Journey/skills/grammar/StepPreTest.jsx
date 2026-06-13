import React, { useState, useEffect } from 'react';

export default function StepPreTest({ grammarData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(45);

  const options = grammarData.meaningOptions || [];
  const correctAnswerIndex = options.indexOf(grammarData.meaning);

  useEffect(() => {
    if (mode === 'fast') {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onNext({ correct: selectedOption === correctAnswerIndex });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [mode, onNext, selectedOption, correctAnswerIndex]);

  const handleCheck = () => {
    if (selectedOption !== null) {
      onNext({ correct: selectedOption === correctAnswerIndex });
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
        <div className="wf-breadcrumb">Unit {unitId} &gt; Học ngữ pháp &gt; <span className={mode === 'deep' ? 'wf-breadcrumb-mode-deep text-primary' : 'text-blue-500 font-bold'}>{mode === 'deep' ? 'Deep Mode' : 'Fast Mode'}</span></div>
        <div className="wf-page-title text-2xl font-bold mt-1">Trạm giải mã: Nhận diện cấu trúc</div>
      </div>

      <div className="wf-topbar flex items-center justify-between  pb-4 mb-6 ">
        <div className="wf-step-counter flex items-center gap-3 text-sm text-primary/70">
          <div className="wf-step-counter-item">Bước: <strong className="text-primary">{stepIndex}</strong> / {totalSteps}</div>
          <div className="wf-step-counter-divider hidden"></div>
          <div className="wf-step-counter-item">Cấu trúc: <strong className="text-primary">{wordIndex + 1}</strong> / {totalWords}</div>
          <div className="wf-step-counter-divider hidden"></div>
          <div className="wf-step-counter-item">Câu: <strong className="text-primary">1</strong> / 1</div>
        </div>
        <div className="wf-progress-mini flex items-center gap-3">
          <div className="wf-progress-mini-bar w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="wf-progress-mini-fill h-full bg-purple-500 transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div className="wf-progress-mini-label text-sm font-bold text-primary">{progressPercent}%</div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-4 max-w-4xl mx-auto w-full">
        {mode === 'fast' && (
          <div className="text-red-500 font-bold text-lg mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            Còn lại: {timeLeft}s
          </div>
        )}

        <div className="wf-decode-console w-full">
          <div className="wf-decode-zone mb-6">
            <div className="wf-decode-zone-label text-sm font-bold mb-2">Phân tích câu mẫu</div>
            <div className="wf-decode-screen p-6 bg-surface   rounded-xl shadow-inner">
              <div className="text-lg leading-relaxed italic text-primary text-center font-medium">
                "{grammarData.pretestQuestion || "_____ she _____ a difficult day, she _____ herself a cup of tea."}"
              </div>
              <div className="wf-subtitle text-xs mt-4 text-center text-primary/70">Hãy chọn ý nghĩa đúng của cấu trúc ngữ pháp trong câu trên</div>
            </div>
          </div>

          <div className="wf-decode-zone w-full">
            <div className="wf-decode-zone-label text-sm font-bold mb-3">Chọn ý nghĩa đúng</div>
            <div className="flex flex-col gap-3 w-full">
              {options.map((opt, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedOption(idx)}
                  className={`wf-option p-4  rounded-xl cursor-pointer transition-all flex items-center gap-4 ${selectedOption === idx ? ' bg-purple-50 shadow-glow ring-2 ring-purple-200' : ' hover: hover:bg-surface'}`}
                >
                  <div className={`wf-option-label w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shrink-0 ${selectedOption === idx ? 'bg-primary text-white' : 'bg-canvas text-primary/70'}`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div className="text-sm font-medium text-primary">{opt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="wf-subtitle text-xs text-primary/70 mt-2">Phân tích câu và chọn ý nghĩa phù hợp của cấu trúc.</div>

        <div className="flex flex-row gap-6 justify-center mt-6">
          <button className="wf-btn-outline px-8 py-3 rounded-xl  border-purple-600 text-primary font-bold hover:bg-purple-50 transition-colors">
            <u>X</u>em gợi ý
          </button>
          <button
            onClick={handleCheck}
            disabled={selectedOption === null}
            className={`wf-btn px-8 py-3 rounded-xl font-bold transition-colors ${selectedOption !== null ? 'bg-primary text-white hover:bg-primary shadow-glow' : 'bg-gray-300 text-primary/70 cursor-not-allowed'}`}
          >
            <u>N</u>ộp câu trả lời
          </button>
        </div>
      </div>

      <div className="wf-hint-bar flex justify-between text-xs text-primary/70 mt-8 pt-4  ">
        <div className="wf-hint-text">
          <span className="wf-hint-key bg-canvas px-2 py-1 rounded border">A-D</span> Chọn đáp án
          <span className="ml-4"><span className="wf-hint-key bg-canvas px-2 py-1 rounded border">Enter</span> Nộp kết quả</span>
        </div>
        <div className="wf-hint-text">Phân tích câu để tìm cấu trúc phù hợp</div>
      </div>
    </div>
  );
}
