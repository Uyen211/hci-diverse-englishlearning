import React, { useState, useEffect, useRef } from 'react';

export default function StepDictation({ grammarData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const dictations = grammarData.dictations || [];
  const [currentDict, setCurrentDict] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState([]);
  const [attempt, setAttempt] = useState(0);

  const targetWord = dictations[currentDict]?.text || '';
  const requiredCount = mode === 'deep' ? Math.min(dictations.length, 5) : Math.min(dictations.length, 3);

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [attempt, currentDict]);

  const handleCheck = () => {
    if (!inputValue.trim() || !targetWord) return;

    const isCorrect = inputValue.trim().toLowerCase() === targetWord.toLowerCase();
    const newHistory = [...history, isCorrect ? 'D' : 'S'];
    setHistory(newHistory);
    setAttempt(prev => prev + 1);
    setInputValue('');

    if (isCorrect) {
      const correctInThisRound = newHistory.filter(h => h === 'D').length;
      if (correctInThisRound >= requiredCount) {
        setTimeout(() => onNext(), 1000);
      } else if (currentDict < dictations.length - 1) {
        setCurrentDict(prev => prev + 1);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleCheck();
  };

  const correctCount = history.filter(h => h === 'D').length;
  const feedProgress = Math.min((correctCount / requiredCount) * 100, 100);

  return (
    <div className="flex flex-col flex-1 w-full max-w-5xl mx-auto gap-4">
      <div className="wf-unit-header mb-6">
        <div className="wf-breadcrumb">Unit {unitId} &gt; Học ngữ pháp &gt; <span className={mode === 'deep' ? 'wf-breadcrumb-mode-deep text-primary' : 'text-blue-500 font-bold'}>{mode === 'deep' ? 'Deep Mode' : 'Fast Mode'}</span></div>
        <div className="wf-page-title text-2xl font-bold mt-1">Chính tả: Gõ lại cụm ngữ pháp</div>
      </div>

      <div className="wf-topbar flex items-center justify-between  pb-4 mb-6 ">
        <div className="wf-step-counter flex items-center gap-3 text-sm text-primary/70">
          <div className="wf-step-counter-item">Bước: <strong className="text-primary">{stepIndex}</strong> / {totalSteps}</div>
          <div className="wf-step-counter-divider hidden"></div>
          <div className="wf-step-counter-item">Cấu trúc: <strong className="text-primary">{wordIndex + 1}</strong> / {totalWords}</div>
        </div>
        <div className="wf-progress-mini flex items-center gap-3">
          <div className="wf-progress-mini-bar w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="wf-progress-mini-fill h-full bg-purple-500 transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div className="wf-progress-mini-label text-sm font-bold text-primary">{progressPercent}%</div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-4xl mx-auto">
        <div className="bg-white   shadow-glow rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div className="bg-purple-100 text-primary text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">CHO MÈO ĂN</div>
            <div className="text-xs text-primary/70">Gõ đúng cấu trúc, thìa sẽ đến miệng mèo!</div>
          </div>

          <div className="flex items-center justify-between min-h-[120px] bg-surface rounded-xl p-4 mb-8">
            <div className="flex flex-col items-center gap-2 w-24">
              <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center border-4 ">
                <span className="text-3xl">🐱</span>
              </div>
              <div className="text-xs font-bold text-primary">Mèo con</div>
            </div>

            <div className="flex-1 px-8 relative">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden w-full relative">
                <div className="h-full bg-purple-500 transition-all duration-500" style={{ width: `${feedProgress}%` }}></div>
              </div>

              <div
                className="absolute top-1/2 -translate-y-1/2 transition-all duration-500 text-2xl drop-shadow-glow"
                style={{ left: `calc(2rem + (100% - 4rem) * ${feedProgress / 100})`, transform: 'translate(-50%, -50%)' }}
              >
                🥄
              </div>

              <div className="flex justify-between mt-3 text-xs text-primary/70 font-bold">
                <span>0/{requiredCount}</span>
                <span>{requiredCount}/{requiredCount}</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 w-24">
              <div className="w-20 h-20 rounded-xl bg-orange-100 flex items-center justify-center border-4 border-orange-200">
                <span className="text-3xl">🍲</span>
              </div>
              <div className="text-xs font-bold text-orange-800">Thức ăn</div>
            </div>
          </div>

          <div className="flex justify-center gap-3 mb-8">
            {Array.from({ length: requiredCount }).map((_, i) => {
              const isDone = i < correctCount;
              return (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${isDone ? 'bg-success text-white text-white shadow-glow' : 'bg-gray-200 text-primary/70'}`}
                >
                  {isDone ? '✓' : i + 1}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-6 p-6  ">
            <div className="flex flex-col items-center gap-2  pr-6 ">
              <button className="w-14 h-14 rounded-full bg-purple-100 text-primary flex items-center justify-center hover:bg-purple-200 transition-colors shadow-glow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
              </button>
              <div className="text-xs text-primary/70 font-bold uppercase">Phát âm</div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-primary">Gõ grammar chunk:</label>
                <span className="text-xs text-primary/70 bg-canvas px-2 py-1 rounded">Lần {attempt + 1}</span>
              </div>
              <div className="text-sm text-primary/70 italic mb-3">Nghe và gõ lại cụm ngữ pháp: <strong className="text-primary ml-1">{targetWord}</strong></div>
              <div className="flex gap-4">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Gõ "${targetWord}"...`}
                  className="flex-1 px-4 py-3 bg-surface   rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ransparent transition-all"
                  disabled={correctCount >= requiredCount}
                />
                <button
                  onClick={handleCheck}
                  disabled={!inputValue.trim() || correctCount >= requiredCount}
                  className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-glow hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <u>K</u>iểm tra
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-6 pt-6  ">
            <div className="text-xs text-primary/70 font-bold uppercase mr-2">Lịch sử:</div>
            {history.map((h, i) => (
              <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-glow ${h === 'D' ? 'bg-success text-white' : 'bg-error text-white'}`}>
                {h === 'D' ? '✓' : '✗'}
              </div>
            ))}
            {history.length === 0 && <div className="text-xs text-gray-400 italic">Chưa có lịch sử</div>}
          </div>
        </div>

        <div className="flex justify-end">
          {correctCount >= requiredCount && (
            <button
              onClick={onNext}
              className="px-10 py-3 bg-success text-white text-white font-bold rounded-xl shadow-glow hover:bg-green-700 transition-all flex items-center gap-2"
            >
              Tiếp tục <span className="text-xs opacity-80 font-normal">[Enter]</span>
            </button>
          )}
        </div>
      </div>

      <div className="wf-hint-bar flex justify-between text-xs text-primary/70 mt-4 pt-4  ">
        <div className="wf-hint-text">
          <span className="wf-hint-key bg-canvas px-2 py-1 rounded border">P</span> Nghe phát âm
          <span className="ml-4"><span className="wf-hint-key bg-canvas px-2 py-1 rounded border">Enter</span> Kiểm tra</span>
        </div>
        <div className="wf-hint-text">
          Còn <strong className="text-primary">{requiredCount - correctCount}</strong> lần để đạt {requiredCount}/{requiredCount} đúng!
        </div>
      </div>
    </div>
  );
}
