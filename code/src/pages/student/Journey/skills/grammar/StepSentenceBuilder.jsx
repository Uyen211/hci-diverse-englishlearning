import React, { useState, useEffect } from 'react';

export default function StepSentenceBuilder({ grammarData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const sb = grammarData.sentenceBuilder || {};
  const pieces = sb.parts || [];
  const targetVi = sb.targetVi || '';

  const [draggedPiece, setDraggedPiece] = useState(null);
  const [droppedPieces, setDroppedPieces] = useState([]);
  const [availablePieces, setAvailablePieces] = useState(pieces.sort(() => Math.random() - 0.5));

  const [selectedDropdown, setSelectedDropdown] = useState('');
  const [isCheckMode, setIsCheckMode] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const dropdownOptions = pieces.length > 0 ? pieces : ["Whenever", "If", "Every time", "Unless"];

  const handleNextQ = () => {
    onNext();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        if (!isCheckMode) {
          handleCheck();
        } else if (isCorrect) {
          handleNextQ();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCheckMode, isCorrect, droppedPieces, selectedDropdown]);

  const handleDragStart = (e, piece) => {
    e.dataTransfer.setData('text/plain', piece);
    setDraggedPiece(piece);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedPiece) {
      if (!droppedPieces.includes(draggedPiece)) {
        setDroppedPieces([...droppedPieces, draggedPiece]);
        setAvailablePieces(availablePieces.filter(p => p !== draggedPiece));
      }
      setDraggedPiece(null);
    }
  };

  const handleRemoveDrop = (piece) => {
    setDroppedPieces(droppedPieces.filter(p => p !== piece));
    setAvailablePieces([...availablePieces, piece]);
  };

  const handleCheck = () => {
    setIsCheckMode(true);
    if (mode === 'deep') {
      const sentence = droppedPieces.join(" ");
      const target = pieces.join(" ");
      if (sentence.toLowerCase() === target.toLowerCase()) {
        setIsCorrect(true);
      }
    } else {
      if (selectedDropdown === pieces[0]) {
        setIsCorrect(true);
      }
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full max-w-5xl mx-auto gap-4">
      <div className="wf-unit-header mb-6">
        <div className="wf-breadcrumb">Unit {unitId} &gt; Học ngữ pháp &gt; <span className={mode === 'deep' ? 'wf-breadcrumb-mode-deep text-primary' : 'text-blue-500 font-bold'}>{mode === 'deep' ? 'Deep Mode' : 'Fast Mode'}</span></div>
        <div className="wf-page-title text-2xl font-bold mt-1">Xây dựng câu: {mode === 'deep' ? 'Ghép nối toa tàu' : 'Chọn từ còn thiếu'}</div>
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

      <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto">
        {mode === 'deep' ? (
          <div className="flex flex-col w-full h-full">
            <div className="mb-4 text-center">
              <div className="inline-block bg-purple-100 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-2">Dịch câu sau:</div>
              <div className="text-lg font-medium text-primary italic">"{targetVi}"</div>
            </div>

            <div className="bg-canvas text-primary p-6 rounded-xl   border-dashed mb-8 flex flex-col items-center justify-center min-h-[160px]"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {droppedPieces.length > 0 ? (
                <div className="flex flex-wrap gap-3 justify-center">
                  {droppedPieces.map((piece, i) => (
                    <div
                      key={i}
                      onClick={() => handleRemoveDrop(piece)}
                      className="px-5 py-3 bg-primary text-white font-bold rounded-lg shadow-glow cursor-pointer hover:bg-primary hover:scale-105 transition-transform"
                    >
                      {piece}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  Kéo thả các mảnh ghép vào đây
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-4 mb-10">
              <div className="text-xs text-primary/70 font-bold uppercase tracking-widest">Các mảnh ghép (Ga tàu)</div>
              <div className="flex flex-wrap gap-4 justify-center p-6 bg-white   rounded-xl shadow-inner min-h-[100px] w-full">
                {availablePieces.map((piece, i) => (
                  <div
                    key={i}
                    draggable
                    onDragStart={(e) => handleDragStart(e, piece)}
                    className="px-5 py-3 bg-white   text-primary font-bold rounded-lg cursor-grab active:cursor-grabbing hover:bg-purple-50 hover:shadow-glow transition-all"
                  >
                    {piece}
                  </div>
                ))}
                {availablePieces.length === 0 && (
                  <div className="text-gray-400 text-sm italic flex items-center justify-center w-full h-full">Đã sử dụng hết mảnh ghép</div>
                )}
              </div>
            </div>

            {isCheckMode && (
              <div className={`mb-6 text-center text-sm font-bold p-4 rounded-xl ${isCorrect ? 'bg-green-100 text-success ' : 'bg-red-100 text-error '}`}>
                {isCorrect ? 'Tuyệt vời! Bạn đã xếp đúng câu.' : 'Chưa đúng, hãy thử lại! (Nhấp vào mảnh ghép phía trên để xóa)'}
              </div>
            )}

            <div className="flex flex-row justify-center">
              {(!isCheckMode || !isCorrect) ? (
                <button
                  onClick={handleCheck}
                  disabled={droppedPieces.length === 0}
                  className={`px-12 py-4 rounded-xl font-bold transition-all text-lg shadow-glow ${droppedPieces.length > 0 ? 'bg-primary text-white hover:bg-primary' : 'bg-gray-300 text-primary/70 cursor-not-allowed'}`}
                >
                  <u>K</u>iểm tra
                </button>
              ) : (
                <button
                  onClick={handleNextQ}
                  className="px-12 py-4 bg-success text-white text-white font-bold rounded-xl shadow-glow hover:bg-green-700 transition-all flex items-center gap-2"
                >
                  Tiếp tục <span className="text-xs opacity-80 font-normal">[Enter]</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full max-w-2xl mx-auto mt-10">
            <div className="bg-white   rounded-xl p-10 w-full mb-6 shadow-glow">
              <div className="mb-4 text-center">
                <div className="inline-block bg-purple-100 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-2">Dịch câu sau:</div>
                <div className="text-base font-medium text-primary italic mb-4">"{targetVi}"</div>
              </div>
              <div className="text-center mb-8">
                <div className="inline-block bg-purple-100 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">Điền từ vào chỗ trống</div>
                <div className="text-xl text-primary leading-relaxed font-serif">
                  <select
                    value={selectedDropdown}
                    onChange={(e) => {
                      setSelectedDropdown(e.target.value);
                      setIsCheckMode(false);
                    }}
                    className="mr-2 px-3 py-1 bg-purple-50   text-primary rounded-lg outline-none focus:ring-4 focus:ring-purple-200 appearance-none font-sans font-bold cursor-pointer"
                  >
                    <option value="" disabled>--- Chọn ---</option>
                    {dropdownOptions.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {pieces.slice(1).join(' ')}
                </div>
              </div>

              {isCheckMode && (
                <div className={`mt-6 text-center text-sm font-bold p-3 rounded-lg ${isCorrect ? 'bg-green-100 text-success' : 'bg-red-100 text-error'}`}>
                  {isCorrect ? 'Chính xác!' : 'Chưa chính xác!'}
                </div>
              )}
            </div>

            <div className="flex flex-row justify-center mt-6">
              {(!isCheckMode || !isCorrect) ? (
                <button
                  onClick={handleCheck}
                  disabled={!selectedDropdown}
                  className={`px-12 py-3 rounded-xl font-bold transition-all shadow-glow ${selectedDropdown ? 'bg-primary text-white hover:bg-primary' : 'bg-gray-300 text-primary/70 cursor-not-allowed'}`}
                >
                  <u>T</u>rả lời
                </button>
              ) : (
                <button
                  onClick={handleNextQ}
                  className="px-12 py-3 bg-success text-white text-white font-bold rounded-xl shadow-glow hover:bg-green-700 transition-all flex items-center gap-2"
                >
                  Tiếp tục <span className="text-xs opacity-80 font-normal">[Enter]</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="wf-hint-bar flex justify-between text-xs text-primary/70 mt-4 pt-4  ">
        <div className="wf-hint-text">
          <span className="wf-hint-key bg-canvas px-2 py-1 rounded border">Enter</span> Kiểm tra / Tiếp tục
        </div>
        <div className="wf-hint-text">
          {mode === 'deep' ? 'Kéo thả các mảnh ghép vào vùng trống để tạo câu hoàn chỉnh' : 'Chọn đáp án đúng từ danh sách'}
        </div>
      </div>
    </div>
  );
}
