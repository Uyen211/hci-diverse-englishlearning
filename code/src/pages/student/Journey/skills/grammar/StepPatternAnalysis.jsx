import React, { useState, useEffect } from 'react';

export default function StepPatternAnalysis({ grammarData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const analysisData = grammarData.patternAnalysis;
  const originalChunks = analysisData?.chunks || [];

  const [chunks, setChunks] = useState([]);
  const [draggedChunks, setDraggedChunks] = useState({});
  const [isCheckMode, setIsCheckMode] = useState(false);
  const [retries, setRetries] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (mode === 'fast') {
      const correctState = {};
      originalChunks.forEach(c => correctState[c.id] = c.text);
      setDraggedChunks(correctState);
      setIsCorrect(true);
      setIsCheckMode(true);
      setChunks([]);
    } else {
      const sorted = [...originalChunks].sort(() => Math.random() - 0.5);
      setChunks(sorted);
      setDraggedChunks({});
      setIsCheckMode(false);
      setIsCorrect(false);
      setRetries(0);
    }
  }, [grammarData, mode]);

  const handleDragStart = (e, text, sourceId) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ text, sourceId }));
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      if (data.sourceId === 'pool') {
        setDraggedChunks(prev => ({ ...prev, [targetId]: data.text }));
      }
    } catch(err) {
      // ignore
    }
  };

  const handleCheck = () => {
    setIsCheckMode(true);
    let allCorrect = true;
    originalChunks.forEach(c => {
      if (draggedChunks[c.id] !== c.text) allCorrect = false;
    });

    if (allCorrect) {
      setIsCorrect(true);
    } else {
      setRetries(prev => prev + 1);
      if (retries >= 2 && mode === 'deep') {
        const correctState = {};
        originalChunks.forEach(c => correctState[c.id] = c.text);
        setDraggedChunks(correctState);
        setIsCorrect(true);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (!isCorrect && mode !== 'fast') {
          handleCheck();
        } else {
          onNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, isCorrect, mode, draggedChunks, originalChunks, retries]);

  return (
    <div className="flex flex-col flex-1 w-full max-w-5xl mx-auto gap-3">
      <div className="wf-unit-header mb-4">
        <div className="wf-breadcrumb">Unit {unitId} &gt; Học ngữ pháp &gt; <span className={mode === 'deep' ? 'wf-breadcrumb-mode-deep text-primary' : 'text-blue-500 font-bold'}>{mode === 'deep' ? 'Deep Mode' : 'Fast Mode'}</span></div>
        <div className="wf-page-title text-xl font-bold mt-1">Khám phá cấu trúc: Ví dụ và highlight</div>
      </div>

      <div className="wf-topbar flex items-center justify-between  pb-4 mb-4 ">
        <div className="wf-step-counter flex items-center gap-3 text-sm text-primary/70">
          <div className="wf-step-counter-item">Bước: <strong className="text-primary">{stepIndex}</strong> / {totalSteps}</div>
          <div className="wf-step-counter-divider hidden"></div>
          <div className="wf-step-counter-item">Cấu trúc: <strong className="text-primary">{wordIndex + 1}</strong> / {totalWords}</div>
          <div className="wf-step-counter-divider hidden"></div>
          <div className="wf-step-counter-item">Ví dụ: <strong className="text-primary">1</strong> / 1</div>
        </div>
        <div className="wf-progress-mini flex items-center gap-3">
          <div className="wf-progress-mini-bar w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="wf-progress-mini-fill h-full bg-purple-500 transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div className="wf-progress-mini-label text-sm font-bold text-primary">{progressPercent}%</div>
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-3 max-w-4xl mx-auto w-full">
        <div className="wf-card p-4 bg-white   shadow-glow rounded-xl">
          <div className="wf-label text-sm font-bold mb-2">Câu ví dụ về cấu trúc:</div>
          <div className="text-sm leading-loose p-3 bg-surface  border-purple-100 rounded-xl shadow-inner">
            <div className="text-base font-medium text-primary text-center py-2">
              "{analysisData?.sentence || grammarData.pretestQuestion}"
            </div>
          </div>
        </div>

        <div className="wf-puzzle-frame p-4 text-center bg-white   shadow-glow rounded-xl">
          <div className="wf-label mb-2 text-sm font-bold">
            {mode === 'deep' ? 'Kéo các cụm highlight vào khung cấu trúc bên dưới:' : 'Khung cấu trúc đã được tự động điền:'}
          </div>

          {mode === 'deep' && (
            <>
              <div className="wf-subtitle text-xs mb-3 text-primary/70">Gợi ý: Nhấn giữ chuột vào mảnh ghép rồi kéo thả vào ô trống phù hợp.</div>
              <div className="flex flex-row gap-2 justify-center flex-wrap mb-4">
                {chunks.map((c, i) => {
                  if (Object.values(draggedChunks).includes(c.text)) return null;
                  return (
                    <div
                      key={`pool-${i}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, c.text, 'pool')}
                      className="wf-grammar-chunk cursor-grab active:cursor-grabbing bg-white   text-primary px-3 py-1.5 rounded-lg shadow-glow font-bold text-sm hover:bg-purple-50 transition-colors"
                    >
                      {c.text}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <div className="border-[3px] border-gray-800 bg-canvas p-4 min-h-[80px] flex flex-wrap items-center justify-center gap-2 rounded-xl">
            {originalChunks.map((c, i) => {
              const droppedText = draggedChunks[c.id];
              const isWrong = isCheckMode && !isCorrect && droppedText && droppedText !== c.text;

              if (droppedText) {
                return (
                  <span
                    key={i}
                    className={`wf-grammar-chunk placed px-3 py-1.5 rounded-lg font-bold text-sm shadow-glow  ${isWrong ? 'bg-red-100 text-error border-error/30' : 'bg-primary text-white border-purple-700'}`}
                  >
                    {droppedText}
                  </span>
                );
              }

              return (
                <span
                  key={i}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, c.id)}
                  className="wf-grammar-slot min-w-[80px] px-3 py-1.5 rounded-lg  border-dashed border-gray-400 bg-gray-200 text-primary/70 text-sm font-medium flex items-center justify-center"
                >
                  Kéo cụm vào đây
                </span>
              );
            })}
          </div>

          <div className="wf-subtitle text-[10px] mt-3 text-primary/70">
            Công thức: <strong className="text-primary">{grammarData.formula || grammarData.title}</strong>
          </div>
        </div>

        <div className="flex flex-row justify-center mt-2">
          {(!isCorrect && mode !== 'fast') ? (
            <div
              role="button"
              tabIndex="0"
              onClick={handleCheck}
              className="wf-btn px-10 py-3 bg-primary text-white font-bold rounded-xl shadow-glow hover:bg-primary cursor-pointer"
            >
              <u>K</u>iểm tra kết quả
            </div>
          ) : (
            <div
              role="button"
              tabIndex="0"
              onClick={() => onNext()}
              className="wf-btn px-10 py-3 bg-success text-white text-white font-bold rounded-xl shadow-glow hover:bg-green-700 cursor-pointer flex items-center gap-2"
            >
              Tiếp tục <span className="text-xs opacity-80 font-normal">[Enter]</span>
            </div>
          )}
        </div>

        {mode === 'deep' && !isCorrect && (
          <div className="flex flex-row justify-center mt-1">
            <div className="wf-subtitle text-[10px] text-primary/70">Còn thiếu cụm. Có thể thử lại <strong className="text-red-500">{3 - retries} lần</strong>.</div>
          </div>
        )}
      </div>

      <div className="wf-hint-bar flex justify-between text-xs text-primary/70 mt-4 pt-4  ">
        <div className="wf-hint-text">
          <span className="wf-hint-key bg-canvas px-2 py-1 rounded border">Tab</span> Chuyển cụm
          <span className="ml-4"><span className="wf-hint-key bg-canvas px-2 py-1 rounded border">Enter</span> Thả cụm / Tiếp tục</span>
        </div>
        <div className="wf-hint-text">Kéo cụm từ vào khung. Ghép đúng hết các cụm để hoàn thành.</div>
      </div>
    </div>
  );
}
