import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAudio } from '../../../../../hooks/useAudio';

export default function StepPatternAnalysis({ grammarData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const analysisData = grammarData.patternAnalysis;
  const originalChunks = analysisData?.chunks || [];

  const [chunks, setChunks] = useState([]);
  const [draggedChunks, setDraggedChunks] = useState({});
  const [isCheckMode, setIsCheckMode] = useState(false);
  const [retries, setRetries] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showEmptyError, setShowEmptyError] = useState(false);

  const { playSuccessEarcon, playErrorEarcon } = useAudio();

  useEffect(() => {
    if (mode === 'fast') {
      const correctState = {};
      originalChunks.forEach(c => correctState[c.id] = c.text);
      setDraggedChunks(correctState);
      setIsCorrect(true);
      setIsCheckMode(true);
      setChunks([]);
    } else {
      // Trộn ngẫu nhiên các mảnh ghép tiếng Anh ở kho từ
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
    } catch (err) {
      // ignore
    }
  };

  // Người học bấm vào cụm từ đã đặt trong slot để trả về kho từ nếu muốn chọn lại
  const handleRemoveChunk = (slotId) => {
    if (isCorrect) return;
    setDraggedChunks(prev => {
      const updated = { ...prev };
      delete updated[slotId];
      return updated;
    });
    setIsCheckMode(false);
  };

  const handleCheck = () => {
    if (Object.keys(draggedChunks).length < originalChunks.length) {
      setShowEmptyError(true);
      playErrorEarcon();
      return;
    }
    setShowEmptyError(false);
    setIsCheckMode(true);
    let allCorrect = true;
    originalChunks.forEach(c => {
      if (draggedChunks[c.id] !== c.text) allCorrect = false;
    });

    if (allCorrect) {
      setIsCorrect(true);
      playSuccessEarcon();
    } else {
      playErrorEarcon();
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
    <div className="wf-main-content">
      {/* Tiêu đề trang */}
      <div className="wf-unit-header">
        <div className="wf-breadcrumb flex flex-wrap items-center gap-1">
          <Link to="/" className="hover:underline text-text-secondary">Trang chủ</Link>
          <span className="opacity-50">&gt;</span>
          <Link to="/student/journey" className="hover:underline text-text-secondary">Hành trình</Link>
          <span className="opacity-50">&gt;</span>
          <Link to={`/student/unit/${typeof unitId !== 'undefined' ? unitId : 3}`} className="hover:underline text-text-secondary">Unit {typeof unitId !== 'undefined' ? unitId : 3}</Link>
          <span className="opacity-50">&gt;</span>
          <Link to="/student/grammar-select" className="hover:underline text-text-secondary">Học ngữ pháp</Link>
          <span className="opacity-50">&gt;</span>
          <span className="text-primary font-bold">{typeof mode !== 'undefined' ? (mode === 'fast' ? 'Fast Mode' : mode === 'deep' ? 'Deep Mode' : (mode || 'Mode')) : 'Mode'}</span>
        </div>
        <div className="wf-page-title">Khám phá cấu trúc: Ví dụ và Phân tích thành phần câu</div>
      </div>

      {/* Thanh Tiến trình Mini */}
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

      <div className="flex flex-col flex-1 gap-4 max-w-4xl mx-auto w-full">
        {/* KHU VỰC 1: Câu ví dụ mẫu hoàn chỉnh (Giúp học viên nhìn vào để phân tích) */}
        <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Câu ví dụ mẫu nghiên cứu:</div>
          <div className="text-2xl font-bold text-purple-900 text-center py-3 bg-purple-50/50 rounded-lg border border-purple-100">
            "{analysisData?.sentence || "She always gets up early."}"
          </div>
        </div>

        {/* KHU VỰC 2: Bàn làm việc kéo thả Puzzle */}
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col gap-6">
          <div className="text-sm font-semibold text-gray-700">
            {mode === 'deep' ? 'Nhiệm vụ: Kéo các từ tiếng Anh ở kho từ thả vào đúng vai trò ngữ pháp bên dưới:' : 'Kết quả phân tích thành phần câu:'}
          </div>

          {mode === 'deep' && (
            /* Kho chứa từ (Pool) */
            <div className="flex flex-row gap-3 justify-center flex-wrap p-4 bg-gray-50 rounded-xl border border-dashed border-purple-200 min-h-[60px] items-center">
              {chunks.map((c, i) => {
                if (Object.values(draggedChunks).includes(c.text)) return null;
                return (
                  <div
                    key={`pool-${i}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, c.text, 'pool')}
                    className="cursor-grab active:cursor-grabbing bg-purple-600 text-white px-4 py-2 rounded-lg shadow font-bold text-sm hover:bg-purple-700 transition-all transform hover:-translate-y-0.5 select-none"
                  >
                    {c.text}
                  </div>
                );
              })}
              {Object.keys(draggedChunks).length === originalChunks.length && !isCheckMode && (
                <div className="text-sm text-green-600 font-medium animate-pulse">🎉 Đã xếp đủ các cụm! Hãy nhấn nút Kiểm tra kết quả.</div>
              )}
            </div>
          )}

          {/* Vùng thả mảnh ghép (Drop Zone) dạng các cột chức năng dọc */}
          <div className="bg-gray-50 p-6 min-h-[120px] flex flex-row flex-wrap items-stretch justify-center gap-6 rounded-xl border border-gray-100">
            {originalChunks.map((c, i) => {
              const droppedText = draggedChunks[c.id];
              const isWrong = isCheckMode && !isCorrect && droppedText && droppedText !== c.text;

              return (
                <div key={i} className="flex flex-col flex-1 min-w-[160px] max-w-[220px] bg-white border border-gray-200 rounded-xl p-4 shadow-sm transition-all">
                  {/* Nhãn vai trò ngữ pháp hiển thị cố định ở trên cùng của ô trống */}
                  <div className="text-sm font-bold uppercase text-purple-600 tracking-wider text-center border-b border-gray-100 pb-2 mb-3 bg-purple-50/50 py-1 rounded">
                    {c.label}
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                    {droppedText ? (
                      <div
                        onClick={() => handleRemoveChunk(c.id)}
                        title={!isCorrect ? "Nhấn vào đây để gỡ từ ra" : ""}
                        className={`w-full px-4 py-3 rounded-lg font-bold text-base text-center border transition-all ${!isCorrect ? 'cursor-pointer hover:bg-red-50 hover:text-red-600 hover:border-red-200' : ''
                          } ${isWrong
                            ? 'bg-red-100 text-red-700 border-red-300 animate-bounce'
                            : isCheckMode && isCorrect
                              ? 'bg-green-600 text-white border-green-700'
                              : 'bg-purple-100 text-purple-800 border-purple-200'
                          }`}
                      >
                        {droppedText}
                      </div>
                    ) : (
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, c.id)}
                        className="w-full px-4 py-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400 text-sm font-medium flex items-center justify-center min-h-[48px] text-center"
                      >
                        Kéo từ vào đây
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hiển thị Công thức tổng quát chân trang */}
          <div className="text-center bg-gray-50/50 py-2.5 rounded-lg border border-gray-100">
            <span className="text-sm font-medium text-gray-500">
              Công thức áp dụng: <strong className="text-purple-700 font-mono text-sm">{grammarData.formula || grammarData.title}</strong>
            </span>
          </div>
        </div>

        {/* Khu vực nút bấm điều hướng */}
        {showEmptyError && (
          <div className="mt-2 text-center text-sm font-bold text-error" style={{ animation: 'shake 0.4s' }}>
            Vui lòng điền đầy đủ các vị trí trước khi kiểm tra!
          </div>
        )}
        <div className="flex flex-row justify-center mt-2">
          {(!isCorrect && mode !== 'fast') ? (
            <button
              onClick={handleCheck}
              className={`wf-btn btn-default-submit px-10 py-3 font-bold rounded-xl shadow transition-all ${Object.keys(draggedChunks).length > 0
                  ? 'bg-purple-600 text-white hover:bg-purple-700 cursor-pointer'
                  : 'bg-gray-300 text-gray-500'
                }`}
              tabIndex={0}
            >
              Kiểm tra kết quả
            </button>
          ) : (
            <button
              onClick={() => onNext()}
              className="wf-btn btn-default-submit px-10 py-3 bg-success text-white font-bold rounded-xl shadow hover:bg-green-700 cursor-pointer flex items-center gap-2 transition-all"
              tabIndex={0}
            >
              Tiếp tục bài học
            </button>
          )}
        </div>

        {/* Lượt thử sai */}
        {mode === 'deep' && !isCorrect && isCheckMode && (
          <div className="text-center mt-1 text-sm text-red-500 font-semibold">
            Sắp xếp thành phần chưa đúng. Bạn còn <strong>{3 - retries} lần</strong> làm lại!
          </div>
        )}
      </div>

      {/* Thanh Gợi Ý Phím Tắt */}
      <div className="flex justify-between items-center bg-primary/5 border border-primary/20 rounded-xl p-4 mt-6 text-sm text-primary">
        <div className="flex-row gap-16">
          <div className="flex flex-wrap items-center gap-4"><kbd className="bg-white px-1.5 py-0.5 border rounded shadow-sm text-xs font-semibold mr-1 text-text-primary">Kéo thả</kbd> Đưa từ vào ô</div>
          <div className="text-xs text-text-secondary opacity-80 hidden md:block"><kbd className="bg-white px-1.5 py-0.5 border rounded shadow-sm text-xs font-semibold mr-1 text-text-primary">Click</kbd> Gỡ từ ra</div>
          <div className="wf-hint-text"><kbd className="bg-white px-1.5 py-0.5 border rounded shadow-sm text-xs font-semibold mr-1 text-text-primary">Enter</kbd> Kiểm tra / Tiếp tục</div>
        </div>
      </div>
    </div>
  );
}