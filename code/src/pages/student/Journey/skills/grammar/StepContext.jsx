import React, { useState, useEffect } from 'react';

export default function StepContext({ grammarData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const contexts = grammarData.contexts || [];
  const [currentClip, setCurrentClip] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const meaningOptions = grammarData.meaningOptions || [];
  const correctIndex = meaningOptions.indexOf(grammarData.meaning);

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

  const renderSubtitle = (sentence) => {
    if (!sentence) return null;

    const words = sentence.split(' ');
    const firstWord = words[0];
    const rest = words.slice(1).join(' ');

    if (mode === 'deep') {
      return (
        <>
          <span className="bg-white/20 px-2 text-transparent select-none rounded">______</span> {rest}
        </>
      );
    } else {
      return (
        <>
          <span className="bg-yellow-400/30 px-2 text-yellow-300 font-bold rounded cursor-help" title="Đây là điểm ngữ pháp chính trong câu">
            {firstWord}
          </span> {rest}
        </>
      );
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full max-w-5xl mx-auto gap-4">
      <div className="wf-unit-header mb-6">
        <div className="wf-breadcrumb">Unit {unitId} &gt; Học ngữ pháp &gt; <span className={mode === 'deep' ? 'wf-breadcrumb-mode-deep text-primary' : 'text-blue-500 font-bold'}>{mode === 'deep' ? 'Deep Mode' : 'Fast Mode'}</span></div>
        <div className="wf-page-title text-2xl font-bold mt-1">Làm quen ngữ cảnh: Xem clip và nhận diện cấu trúc</div>
      </div>

      <div className="wf-topbar flex items-center justify-between  pb-4 mb-6 ">
        <div className="wf-step-counter flex items-center gap-3 text-sm text-primary/70">
          <div className="wf-step-counter-item">Bước: <strong className="text-primary">{stepIndex}</strong> / {totalSteps}</div>
          <div className="wf-step-counter-divider hidden"></div>
          <div className="wf-step-counter-item">Cấu trúc: <strong className="text-primary">{wordIndex + 1}</strong> / {totalWords}</div>
          <div className="wf-step-counter-divider hidden"></div>
          <div className="wf-step-counter-item">Clip: <strong className="text-primary">{currentClip + 1}</strong> / {contexts.length}</div>
        </div>
        <div className="wf-progress-mini flex items-center gap-3">
          <div className="wf-progress-mini-bar w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="wf-progress-mini-fill h-full bg-purple-500 transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div className="wf-progress-mini-label text-sm font-bold text-primary">{progressPercent}%</div>
        </div>
      </div>

      <div className="flex flex-row gap-6 flex-1">
        <div className="flex flex-col gap-3 flex-[1.4]">
          <div className="relative flex flex-col  border-gray-800 bg-gray-900 aspect-video overflow-hidden rounded-xl shadow-glow">
            {contexts[currentClip]?.url ? (
              <video
                src={contexts[currentClip].url}
                className="w-full h-full object-cover"
                controls
              />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center bg-gray-800">
                <div className="text-sm font-bold text-primary/70 mb-2">[ KHU VỰC PHÁT VIDEO ]</div>
                <div className="w-12 h-12  border-gray-500 rounded flex items-center justify-center text-primary/70">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
              </div>
            )}

            <div className="absolute top-3 left-3 bg-black/75 text-white  border-gray-600 text-xs px-2 py-1 rounded">
              Clip {currentClip + 1} / {contexts.length}
            </div>

            <div className="absolute bottom-0 left-0 right-0">
              <div className="p-4 bg-black/80 text-center">
                <div className="text-lg leading-relaxed text-white">
                  "{renderSubtitle(contexts[currentClip]?.caption || "Whenever she feels stressed, she listens to music.")}"
                </div>
              </div>
              <div className="h-1 bg-gray-800">
                <div className="w-[45%] h-full bg-gray-400"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-2 items-center justify-center mt-2">
            {contexts.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full cursor-pointer ${idx === currentClip ? 'bg-purple-500 w-4' : 'bg-gray-300'}`}
                onClick={() => setCurrentClip(idx)}
              ></div>
            ))}
            <div className="text-xs text-primary/70 ml-2">{contexts.length} clip ngữ cảnh khác nhau</div>
          </div>

          <div className="flex flex-row items-center justify-between mt-2">
            <div className="bg-gray-200 text-primary text-xs px-2 py-1 rounded font-medium">Cuộc sống hàng ngày</div>
            <div className="flex flex-row gap-2">
              <button
                onClick={() => setCurrentClip(Math.max(0, currentClip - 1))}
                className="px-3 py-1.5  border-purple-600 text-primary rounded-lg text-xs font-bold hover:bg-purple-50 flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Lùi
              </button>
              <button
                onClick={() => setCurrentClip(Math.min(contexts.length - 1, currentClip + 1))}
                className="px-3 py-1.5  border-purple-600 text-primary rounded-lg text-xs font-bold hover:bg-purple-50 flex items-center gap-1"
              >
                Kế tiếp <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>

          <div className="p-4 bg-white   rounded-xl shadow-glow mt-2">
            <div className="text-xs font-bold text-primary mb-2">Các câu trong clip:</div>
            <div className="text-sm leading-relaxed p-3 bg-surface  border-purple-100 rounded-lg text-primary">
              {contexts.map((c, i) => (
                <div key={i} className="mb-1">{i + 1}. "{c.caption}"</div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <div className="p-5 bg-white   rounded-xl shadow-glow h-full flex flex-col">
            <div className="flex flex-row items-center gap-2 mb-3">
              <div className="bg-purple-100 text-primary text-[10px] font-bold px-2 py-0.5 rounded">CHỌN CẶP MÔ TẢ</div>
              <div className="text-xs text-primary/70">Thời gian + Chức năng</div>
            </div>

            <div className="text-sm text-primary/70 mb-4 font-medium">Cặp mô tả nào phù hợp với cấu trúc trong clip?</div>

            <div className="flex flex-col gap-3 flex-1">
              {meaningOptions.map((opt, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedOption(idx)}
                  className={`p-4  rounded-xl cursor-pointer transition-all flex flex-row items-center gap-3 ${selectedOption === idx ? ' bg-purple-50 ring-2 ring-purple-200' : ' hover:'}`}
                >
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shrink-0 ${selectedOption === idx ? 'bg-primary text-white' : 'bg-canvas text-primary/70'}`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div className="flex flex-col">
                    <div className="font-bold text-sm text-primary">{opt}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-row justify-center mt-6">
              <button
                onClick={handleCheck}
                disabled={selectedOption === null}
                className={`px-8 py-3 rounded-xl font-bold transition-all w-full max-w-xs ${selectedOption !== null ? 'bg-primary text-white shadow-glow hover:bg-primary' : 'bg-gray-300 text-primary/70 cursor-not-allowed'}`}
              >
                <u>X</u>ác nhận
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="wf-hint-bar flex justify-between text-xs text-primary/70 mt-4 pt-4  ">
        <div className="wf-hint-text">
          <span className="wf-hint-key bg-canvas px-2 py-1 rounded border">A-C</span> Chọn cặp mô tả
          <span className="ml-4"><span className="wf-hint-key bg-canvas px-2 py-1 rounded border">Enter</span> Xác nhận</span>
        </div>
        <div className="wf-hint-text">
          <span className="wf-hint-key bg-canvas px-2 py-1 rounded border">Space</span> Phát/tạm dừng video
        </div>
      </div>
    </div>
  );
}
