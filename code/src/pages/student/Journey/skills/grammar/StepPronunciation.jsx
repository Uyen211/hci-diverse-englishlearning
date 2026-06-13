import React, { useState, useEffect } from 'react';

export default function StepPronunciation({ grammarData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [score, setScore] = useState(null);

  const targetWord = grammarData.pronunciation?.word || '';
  const phonetic = grammarData.pronunciation?.ipa || '';

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingProgress(prev => {
          if (prev >= 100) {
            setIsRecording(false);
            setHasRecorded(true);
            setScore(85);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingProgress(0);
    setScore(null);
  };

  const handleNext = () => {
    if (hasRecorded || mode === 'fast') {
      onNext();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'r') handleStartRecording();
      if (e.key === 'Enter' && (hasRecorded || mode === 'fast')) handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasRecorded, mode]);

  return (
    <div className="flex flex-col flex-1 w-full max-w-5xl mx-auto gap-4">
      <div className="wf-unit-header mb-6">
        <div className="wf-breadcrumb">Unit {unitId} &gt; Học ngữ pháp &gt; <span className={mode === 'deep' ? 'wf-breadcrumb-mode-deep text-primary' : 'text-blue-500 font-bold'}>{mode === 'deep' ? 'Deep Mode' : 'Fast Mode'}</span></div>
        <div className="wf-page-title text-2xl font-bold mt-1">Luyện phát âm ASR: Grammar chunk</div>
      </div>

      <div className="wf-topbar flex items-center justify-between  pb-4 mb-6 ">
        <div className="wf-step-counter flex items-center gap-3 text-sm text-primary/70">
          <div className="wf-step-counter-item">Bước: <strong className="text-primary">{stepIndex}</strong> / {totalSteps}</div>
          <div className="wf-step-counter-divider hidden"></div>
          <div className="wf-step-counter-item">Cấu trúc: <strong className="text-primary">{wordIndex + 1}</strong> / {totalWords}</div>
          <div className="wf-step-counter-divider hidden"></div>
          <div className="wf-step-counter-item">Đọc: <strong className="text-primary">1</strong> / 1</div>
        </div>
        <div className="wf-progress-mini flex items-center gap-3">
          <div className="wf-progress-mini-bar w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="wf-progress-mini-fill h-full bg-purple-500 transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div className="wf-progress-mini-label text-sm font-bold text-primary">{progressPercent}%</div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
        <div className="bg-white  border-gray-800 shadow-glow text-center p-6 w-full mb-4 rounded-xl">
          <div className="flex justify-center items-center gap-6 mb-4">
            <div className="text-3xl font-bold font-mono px-6 py-2  border-gray-800 rounded-lg">{targetWord}</div>
            {phonetic && <div className="text-xl bg-purple-100 text-primary px-4 py-2 rounded-lg font-mono">{phonetic}</div>}
          </div>
          <div className="flex justify-center items-center gap-4">
            <button className="w-12 h-12 rounded-full bg-purple-100 text-primary flex items-center justify-center hover:bg-purple-200 transition-colors shadow-glow">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
            </button>
            <div className="text-sm font-bold text-primary uppercase">Nghe phát âm mẫu</div>
            <button className="px-3 py-1   text-primary rounded-lg text-xs hover:bg-purple-50 font-bold">
              Phát chậm
            </button>
          </div>
        </div>

        <div className="bg-white   shadow-glow w-full p-6 mb-4 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 text-error text-[10px] font-bold px-2 py-0.5 rounded ">GHI ÂM (BẮT BUỘC)</div>
            <div className="text-xs text-primary/70">Đọc to grammar chunk bằng microphone</div>
          </div>

          <div className="flex justify-center mb-6">
            <button
              onClick={handleStartRecording}
              disabled={isRecording}
              className={`px-10 py-3 rounded-full font-bold transition-all shadow-glow flex items-center gap-2 ${isRecording ? 'bg-error text-white text-white animate-pulse' : 'bg-red-50 text-error  border-error/30 hover:bg-red-100'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
              {isRecording ? 'Đang ghi âm...' : 'Ghi âm'}
            </button>
          </div>

          <div className="p-4 bg-surface  border-purple-100 rounded-xl mb-2 relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <div className="bg-gray-700 text-white text-[10px] px-2 py-0.5 rounded font-bold">ĐẾM NGƯỢC</div>
              <div className="font-mono font-bold text-primary">{Math.floor(recordingProgress * 0.05)}:0{Math.floor(recordingProgress * 0.05) % 10} / 0:05</div>
            </div>

            <div className="flex justify-center items-center h-16 gap-1.5 opacity-80">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 rounded-full bg-purple-500 transition-all duration-75`}
                  style={{
                    height: isRecording ? `${Math.max(10, Math.random() * 50)}px` : '10px',
                    opacity: isRecording ? 1 : 0.3
                  }}
                ></div>
              ))}
            </div>

            {isRecording && (
              <div className="absolute top-0 left-0 h-1 bg-error text-white transition-all duration-100" style={{ width: `${recordingProgress}%` }}></div>
            )}

            <div className="text-xs text-center text-primary/70 mt-4">
              {isRecording ? `Đang nghe... Đọc to cụm "${targetWord}"` : `Nhấn "Ghi âm" để bắt đầu.`}
            </div>
          </div>
          <div className="text-center text-xs text-gray-400 font-bold uppercase tracking-wider mt-2">
            Trạng thái: {isRecording ? 'Đang ghi âm' : 'Sẵn sàng'}
          </div>
        </div>

        {score !== null && (
          <div className="bg-white   shadow-glow w-full p-6 mb-4 rounded-xl animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 text-success text-[10px] font-bold px-2 py-0.5 rounded ">KẾT QUẢ ASR</div>
              <div className="text-xs text-primary/70">Đánh giá phát âm</div>
            </div>

            <div className="flex items-center gap-6 mb-4">
              <div className="text-5xl font-bold text-success">{score}</div>
              <div className="flex flex-col justify-center">
                <div className="bg-success text-white text-white text-xs font-bold px-3 py-1 rounded inline-block w-max mb-1">TỐT</div>
                <div className="text-xs text-primary/70">/ 100 điểm</div>
              </div>
              <div className="flex-1 h-3 bg-canvas rounded-full overflow-hidden  ">
                <div className="h-full bg-success text-white" style={{ width: `${score}%` }}></div>
              </div>
            </div>

            <div className="p-3 bg-surface   text-sm text-primary/70 italic rounded-lg">
              Ghi chú: Phát âm tốt.
            </div>
          </div>
        )}

        <div className="flex gap-6 mt-4">
          <button
            onClick={handleStartRecording}
            disabled={isRecording}
            className="px-8 py-3 bg-canvas text-primary font-bold rounded-xl shadow-glow hover:bg-gray-200 disabled:opacity-50"
          >
            <u>G</u>hi âm lại
          </button>
          <button
            onClick={handleNext}
            disabled={!hasRecorded}
            className="px-10 py-3 bg-primary text-white font-bold rounded-xl shadow-glow hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <u>T</u>iếp tục
          </button>
        </div>
        <div className="text-xs text-gray-400 mt-3">* Bắt buộc ghi âm ít nhất 1 lần trước khi tiếp tục</div>
      </div>

      <div className="wf-hint-bar flex justify-between text-xs text-primary/70 mt-4 pt-4  ">
        <div className="wf-hint-text">
          <span className="wf-hint-key bg-canvas px-2 py-1 rounded border">R</span> Ghi âm lại
          <span className="ml-4"><span className="wf-hint-key bg-canvas px-2 py-1 rounded border">Enter</span> Tiếp tục</span>
        </div>
        <div className="wf-hint-text">Có thể ghi âm nhiều lần. Điểm cao nhất sẽ được lưu.</div>
      </div>
    </div>
  );
}
