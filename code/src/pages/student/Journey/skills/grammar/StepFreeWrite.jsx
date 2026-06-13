import React, { useState, useEffect } from 'react';
import { useAudio } from '../../../../../hooks/useAudio';

export default function StepFreeWrite({ grammarData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const [text, setText] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showEmptyError, setShowEmptyError] = useState(false);
  const [showA2Modal, setShowA2Modal] = useState(false);
  const { playSuccessEarcon, playErrorEarcon } = useAudio();

  const prompt = grammarData.freeWritePrompt || '';
  const title = grammarData.title || '';

  const handleEvaluate = () => {
    if (wordCount < 50) {
      setShowEmptyError(true);
      playErrorEarcon();
      return;
    }
    setShowEmptyError(false);
    setIsEvaluating(true);
    setFeedback(null);

    setTimeout(() => {
      setIsEvaluating(false);
      const hasKeyword = title.split(' ').some(word =>
        word.length > 3 && text.toLowerCase().includes(word.toLowerCase())
      );
      if (hasKeyword) {
        playSuccessEarcon();
        setFeedback({
          status: 'success',
          score: 85,
          general: 'Bạn đã sử dụng đúng cấu trúc. Bài viết khá tốt, tuy nhiên vẫn còn một vài lỗi nhỏ cần khắc phục.',
          errors: [
            {
              original: "I usually waking up early.",
              fixed: "I usually wake up early.",
              explanation: "Trạng từ chỉ tần suất 'usually' đi với động từ thì hiện tại đơn, không dùng V-ing."
            }
          ]
        });
      } else {
        playErrorEarcon();
        setFeedback({
          status: 'error',
          score: 60,
          general: `Bạn chưa sử dụng đúng cấu trúc "${title}" trong đoạn văn.`,
          errors: [
            {
              original: text || "(Không có nội dung)",
              fixed: `(AI gợi ý: Hãy chèn '${title}' vào câu)`,
              explanation: `Bạn cần bám sát yêu cầu đề bài để cải thiện kỹ năng ngữ pháp hiệu quả hơn.`
            }
          ]
        });
      }
    }, 1500);
  };

  const handleNextQ = () => {
    onNext();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        if (showA2Modal) {
          setShowA2Modal(false);
          setFeedback(null);
          setText('');
          return;
        }
        if (!feedback) {
          handleEvaluate();
        } else if (feedback.status === 'error') {
          setShowA2Modal(true);
        } else {
          handleNextQ();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [text, feedback]);

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  return (
    <div className="flex flex-col flex-1 w-full max-w-6xl mx-auto gap-4 relative">
      <div className="wf-unit-header mb-6">
        <div className="wf-breadcrumb">Bài học &gt; Unit {unitId} &gt; Học ngữ pháp &gt; <span className="wf-breadcrumb-mode-deep">Deep Mode</span></div>
        <div className="wf-page-title text-2xl font-bold mt-1">Viết tự do: Viết đoạn văn với cấu trúc</div>
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

      <div className="flex flex-row flex-1 w-full gap-8">
        
        {/* LEFT COLUMN: User Postbox Card */}
        <div className="flex flex-col flex-1 bg-amber-50/40 rounded-2xl shadow-sm border border-amber-100 p-6 relative">
          <div className="absolute top-4 right-4 opacity-50 rotate-[15deg]">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </div>

          <div className="bg-white p-5 rounded-xl border border-amber-200 mb-6 shadow-sm relative z-10">
            <div className="text-amber-700 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Nhiệm vụ từ Hộp thư AI
            </div>
            <div className="text-amber-900 leading-relaxed font-medium">
              {prompt}
            </div>
          </div>

          <textarea
            className="flex-1 w-full bg-transparent resize-none outline-none text-lg text-primary leading-relaxed placeholder-amber-900/30"
            placeholder="Bắt đầu viết thư tại đây..."
            value={text}
            onChange={(e) => { setText(e.target.value); setShowEmptyError(false); }}
            disabled={isEvaluating}
          />

          <div className="mt-4 flex justify-between items-end">
            <div className="flex flex-col">
              <div className="text-sm font-bold text-amber-800/60 font-mono">
                Số từ: <span className={wordCount < 50 ? 'text-red-500' : 'text-green-600'}>{wordCount}</span> / 50
              </div>
              {showEmptyError && (
                <div className="text-sm font-bold text-error mt-1" style={{ animation: 'shake 0.4s' }}>
                  Vui lòng viết ít nhất 50 từ!
                </div>
              )}
            </div>

            {(!feedback || feedback.status === 'error') && (
              <button
                onClick={handleEvaluate}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-glow ${wordCount >= 50 ? 'bg-purple-600 text-white hover:-translate-y-1' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                disabled={isEvaluating || wordCount < 50}
                tabIndex={0}
              >
                {isEvaluating ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Đang phân tích...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    Gửi thư cho AI phân tích
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: AI Mailbox Feedback Card */}
        <div className="w-[450px] shrink-0 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
          {!feedback && !isEvaluating ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <div className="text-sm font-medium">Hoàn thành bức thư để nhận<br/>báo cáo phân tích từ AI</div>
            </div>
          ) : isEvaluating ? (
             <div className="flex-1 flex flex-col items-center justify-center text-center text-primary/60">
              <svg className="animate-spin h-10 w-10 text-purple-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <div className="font-bold text-lg text-primary">AI Đang đọc thư...</div>
            </div>
          ) : (
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-5 mb-6 bg-purple-50 p-4 rounded-2xl border border-purple-100">
                <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-black shadow-lg shrink-0">
                  {feedback.score}
                </div>
                <div className="text-sm text-primary leading-relaxed font-medium">
                  {feedback.general}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Chi tiết lỗi ngữ pháp</div>
                <div className="flex flex-col gap-4">
                  {feedback.errors && feedback.errors.map((err, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                      <div className="bg-red-50 text-error px-3 py-2 rounded-lg text-[13px] border border-red-100 mb-2 leading-relaxed">
                        <span className="font-bold text-[10px] uppercase bg-red-100 text-red-600 px-2 py-1 rounded mr-2 inline-block">Bản gõ</span>
                        "{err.original}"
                      </div>
                      <div className="bg-green-50 text-success px-3 py-2 rounded-lg text-[13px] border border-green-100 mb-3 leading-relaxed">
                        <span className="font-bold text-[10px] uppercase bg-green-100 text-green-700 px-2 py-1 rounded mr-2 inline-block">AI Sửa</span>
                        {err.fixed}
                      </div>
                      <div className="text-[13px] text-primary/70 italic leading-relaxed border-t border-dashed border-gray-200 pt-3">
                        <strong className="text-primary not-italic">Giải thích:</strong> {err.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                {feedback.status === 'error' ? (
                  <button
                    onClick={() => setShowA2Modal(true)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm py-4 rounded-xl shadow-glow transition-all active:scale-[0.98]"
                    tabIndex={0}
                  >
                    Khắc phục lỗi cấu trúc
                  </button>
                ) : (
                  <button
                    onClick={handleNextQ}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-sm py-4 rounded-xl shadow-glow transition-all active:scale-[0.98]"
                    tabIndex={0}
                  >
                    Hoàn thành nhiệm vụ viết & Tiếp tục
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="wf-hint-bar flex justify-between text-xs text-primary/70 mt-4 pt-4">
        <div className="wf-hint-text">
          <span className="wf-hint-key bg-canvas px-2 py-1 rounded border">Tab</span> Viết
          <span className="ml-4"><span className="wf-hint-key bg-canvas px-2 py-1 rounded border">Enter</span> Gửi/Tiếp tục</span>
          <span className="ml-4"><span className="wf-hint-key bg-canvas px-2 py-1 rounded border">Shift+Enter</span> Xuống dòng</span>
        </div>
      </div>

      {showA2Modal && (
        <div className="absolute inset-0 bg-black/25 z-[100] flex items-center justify-center backdrop-blur-sm p-4 rounded-2xl">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative border-2 border-orange-200" style={{ animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
            <h2 className="text-2xl font-bold text-primary mb-2">Ôn tập lại cấu trúc</h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Bạn chưa sử dụng cấu trúc <strong className="text-primary">{title}</strong> đúng cách. Hãy xem lại quy tắc dưới đây trước khi viết lại nhé!
            </p>
            
            <div className="bg-purple-50 rounded-xl p-6 mb-8 border border-purple-100 flex flex-col items-center justify-center text-center gap-2">
               <div className="text-xs text-primary/60 font-bold uppercase tracking-widest">Công thức cần dùng:</div>
               <div className="font-mono text-purple-700 font-bold text-lg">{grammarData.formula || title}</div>
            </div>

            <button
              onClick={() => {
                setShowA2Modal(false);
                setFeedback(null);
                setText('');
              }}
              className="w-full bg-primary hover:bg-purple-700 text-white font-bold py-4 rounded-xl shadow-glow transition-all active:scale-[0.98]"
            >
              Đã hiểu & Viết lại thư
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
