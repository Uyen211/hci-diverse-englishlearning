import React, { useState, useEffect } from 'react';
import { useAudio } from '../../../../../hooks/useAudio';

export default function StepSentenceBuilder({ grammarData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const sb = grammarData.sentenceBuilder || {};
  const pieces = sb.parts || [];
  const targetVi = sb.targetVi || '';

  const [draggedPiece, setDraggedPiece] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [droppedPieces, setDroppedPieces] = useState([]);
  const [availablePieces, setAvailablePieces] = useState([...pieces].sort(() => Math.random() - 0.5));

  const [selectedDropdown, setSelectedDropdown] = useState('');
  const [isCheckMode, setIsCheckMode] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showEmptyError, setShowEmptyError] = useState(false);

  const { playSuccessEarcon, playErrorEarcon } = useAudio();

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
    setDraggedIndex(null);
  };

  const handleDragStartDropped = (e, index) => {
    e.stopPropagation();
    e.dataTransfer.setData('text/plain', droppedPieces[index]);
    setDraggedIndex(index);
    setDraggedPiece(null);
    setIsCheckMode(false);
    setShowEmptyError(false);
  };

  const handleDropOnPiece = (e, targetIndex) => {
    e.preventDefault();
    e.stopPropagation();
    const piece = e.dataTransfer.getData('text/plain');
    if (!piece) return;

    if (draggedIndex !== null) {
      const newDropped = [...droppedPieces];
      newDropped.splice(draggedIndex, 1);
      newDropped.splice(targetIndex, 0, piece);
      setDroppedPieces(newDropped);
      setDraggedIndex(null);
    } else {
      if (!droppedPieces.includes(piece)) {
        const newDropped = [...droppedPieces];
        newDropped.splice(targetIndex, 0, piece);
        setDroppedPieces(newDropped);
        setAvailablePieces(availablePieces.filter(p => p !== piece));
      }
      setDraggedPiece(null);
    }
    setIsCheckMode(false);
    setShowEmptyError(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const piece = e.dataTransfer.getData('text/plain');
    if (piece) {
      if (draggedIndex !== null) {
        const newDropped = [...droppedPieces];
        newDropped.splice(draggedIndex, 1);
        newDropped.push(piece);
        setDroppedPieces(newDropped);
        setDraggedIndex(null);
      } else if (!droppedPieces.includes(piece)) {
        setDroppedPieces([...droppedPieces, piece]);
        setAvailablePieces(availablePieces.filter(p => p !== piece));
      }
      setDraggedPiece(null);
      setIsCheckMode(false);
      setShowEmptyError(false);
    }
  };

  const handleRemoveDrop = (piece) => {
    setDroppedPieces(droppedPieces.filter(p => p !== piece));
    setAvailablePieces([...availablePieces, piece]);
    setIsCheckMode(false);
    setShowEmptyError(false);
  };

  const handleCheck = () => {
    if (mode === 'deep' && droppedPieces.length === 0) {
      setShowEmptyError(true);
      playErrorEarcon();
      return;
    }
    if (mode === 'fast' && !selectedDropdown) {
      setShowEmptyError(true);
      playErrorEarcon();
      return;
    }

    setShowEmptyError(false);
    setIsCheckMode(true);
    let correct = false;
    
    if (mode === 'deep') {
      const sentence = droppedPieces.join(" ");
      const target = pieces.join(" ");
      if (sentence.toLowerCase() === target.toLowerCase()) {
        correct = true;
      }
    } else {
      if (selectedDropdown === pieces[0]) {
        correct = true;
      }
    }
    
    setIsCorrect(correct);
    if (correct) playSuccessEarcon();
    else playErrorEarcon();
  };

  return (
    <div className="flex flex-col flex-1 w-full max-w-5xl mx-auto gap-4">
      <div className="wf-unit-header mb-6">
        <div className="wf-breadcrumb">Bài học &gt; Unit {unitId} &gt; Học ngữ pháp &gt; <span className={mode === 'deep' ? 'wf-breadcrumb-mode-deep text-primary' : 'text-blue-500 font-bold'}>{mode === 'deep' ? 'Deep Mode' : 'Fast Mode'}</span></div>
        <div className="wf-page-title text-2xl font-bold mt-1">Xây dựng câu: {mode === 'deep' ? 'Ghép nối toa tàu' : 'Chọn từ còn thiếu'}</div>
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
            <div className="mb-4 text-center">
              <div className="inline-block bg-purple-100 text-primary text-sm font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-2">Dịch câu sau:</div>
              <div className="text-lg font-medium text-primary italic">"{targetVi}"</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-secondary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">Đoàn tàu của bạn</div>
                <div className="text-xs text-gray-500">Gợi ý: Nhấp chuột hoặc kéo thả các toa tàu từ Ga Tàu để ghép thành câu hoàn chỉnh.</div>
              </div>
              <div 
                className="border-2 border-dashed border-gray-300 bg-gray-50 p-4 min-h-[80px] flex flex-wrap items-center justify-center gap-2 rounded-xl transition-colors"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                {droppedPieces.length > 0 ? (
                  droppedPieces.map((piece, i) => (
                    <div
                      key={i}
                      draggable
                      onDragStart={(e) => handleDragStartDropped(e, i)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDropOnPiece(e, i)}
                      onClick={() => handleRemoveDrop(piece)}
                      className="inline-flex items-center gap-2 px-4 py-2 border-2 border-primary bg-purple-50 text-primary font-bold text-sm rounded-xl shadow-sm cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><rect x="2" y="5" width="20" height="12" rx="2"/><circle cx="7" cy="19" r="2"/><circle cx="17" cy="19" r="2"/><path d="M9 19h6"/></svg>
                      {piece}
                    </div>
                  ))
                ) : (
                  <div className="w-full text-center text-gray-400 text-sm">Hãy chọn các toa từ bên dưới để ghép câu</div>
                )}
              </div>
              <div className="mt-3 h-1 w-full rounded-full" style={{ background: 'repeating-linear-gradient(to right, #ccc 0px, #ccc 8px, transparent 8px, transparent 16px)' }}></div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-8 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">Ga tàu</div>
                <div className="text-xs text-gray-500">Các cụm toa tàu có sẵn (Nhấp chuột hoặc kéo thả)</div>
              </div>
              <div className="flex flex-wrap gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl min-h-[80px]">
                {availablePieces.map((piece, i) => (
                  <div
                    key={i}
                    draggable
                    onDragStart={(e) => handleDragStart(e, piece)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 font-bold text-sm rounded-xl border-2 border-gray-300 cursor-grab active:cursor-grabbing hover:bg-purple-50 hover:border-primary hover:text-primary transition-all shadow-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-secondary"><rect x="2" y="5" width="20" height="12" rx="2"/><circle cx="7" cy="19" r="2"/><circle cx="17" cy="19" r="2"/><path d="M9 19h6"/></svg>
                    {piece}
                  </div>
                ))}
                {availablePieces.length === 0 && (
                  <div className="text-gray-400 text-sm italic flex items-center justify-center w-full">Đã sử dụng hết mảnh ghép</div>
                )}
              </div>
            </div>

            {isCheckMode && (
              <div className="flex flex-col items-center mt-2 mb-6 w-full max-w-xl mx-auto">
                <div className={`w-full p-4 rounded-xl flex flex-col items-center shadow-sm border ${isCorrect ? 'bg-green-50 border-success' : 'bg-red-50 border-error'}`}>
                  <div className={`text-lg font-bold flex items-center gap-2 ${isCorrect ? 'text-success' : 'text-error'}`}>
                    {isCorrect ? (
                      <><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Tuyệt vời! Bạn đã xếp đúng câu.</>
                    ) : (
                      <><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Chưa đúng, hãy thử lại! (Nhấp vào mảnh ghép phía trên để xóa)</>
                    )}
                  </div>
                </div>
              </div>
            )}
            {showEmptyError && (
              <div className="mb-6 text-center text-sm font-bold p-4 rounded-xl text-error" style={{ animation: 'shake 0.4s' }}>
                Vui lòng kéo thả ít nhất một mảnh ghép trước khi kiểm tra!
              </div>
            )}

            <div className="flex flex-row justify-center">
              {(!isCheckMode || !isCorrect) ? (
                <button
                  onClick={handleCheck}
                  className={`wf-btn btn-default-submit px-12 py-4 rounded-xl font-bold transition-all text-lg shadow-glow ${droppedPieces.length > 0 ? 'bg-primary text-white hover:bg-primary' : 'bg-gray-300 text-primary/70'}`}
                  tabIndex={0}
                >
                  Kiểm tra
                </button>
              ) : (
                <button
                  onClick={handleNextQ}
                  className="wf-btn btn-default-submit px-12 py-4 bg-success text-white text-white font-bold rounded-xl shadow-glow hover:bg-green-700 transition-all flex items-center gap-2"
                  tabIndex={0}
                >
                  Tiếp tục
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full max-w-2xl mx-auto mt-10">
            <div className="bg-white   rounded-xl p-10 w-full mb-6 shadow-glow">
              <div className="mb-4 text-center">
                <div className="inline-block bg-purple-100 text-primary text-sm font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-2">Dịch câu sau:</div>
                <div className="text-base font-medium text-primary italic mb-4">"{targetVi}"</div>
              </div>
              <div className="text-center mb-8">
                <div className="inline-block bg-purple-100 text-primary text-sm font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">Điền từ vào chỗ trống</div>
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
                <div className="mt-6 flex flex-col items-center w-full">
                  <div className={`w-full p-4 rounded-xl flex flex-col items-center shadow-sm border ${isCorrect ? 'bg-green-50 border-success' : 'bg-red-50 border-error'}`}>
                    <div className={`text-lg font-bold flex items-center gap-2 ${isCorrect ? 'text-success' : 'text-error'}`}>
                      {isCorrect ? (
                        <><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Chính xác!</>
                      ) : (
                        <><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Chưa chính xác!</>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {showEmptyError && (
                <div className="mt-6 text-center text-sm font-bold p-3 rounded-lg text-error" style={{ animation: 'shake 0.4s' }}>
                  Vui lòng chọn một đáp án trước khi trả lời!
                </div>
              )}
            </div>

            <div className="flex flex-row justify-center mt-6">
              {(!isCheckMode || !isCorrect) ? (
                <button
                  onClick={handleCheck}
                  className={`wf-btn btn-default-submit px-12 py-3 rounded-xl font-bold transition-all shadow-glow ${selectedDropdown ? 'bg-primary text-white hover:bg-primary' : 'bg-gray-300 text-primary/70'}`}
                  tabIndex={0}
                >
                  Trả lời
                </button>
              ) : (
                <button
                  onClick={handleNextQ}
                  className="wf-btn btn-default-submit px-12 py-3 bg-success text-white text-white font-bold rounded-xl shadow-glow hover:bg-green-700 transition-all flex items-center gap-2"
                  tabIndex={0}
                >
                  Tiếp tục
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
