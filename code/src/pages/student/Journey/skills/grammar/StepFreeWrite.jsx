import React, { useState, useEffect } from 'react';

export default function StepFreeWrite({ grammarData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const [text, setText] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const prompt = grammarData.freeWritePrompt || '';
  const title = grammarData.title || '';

  const handleEvaluate = () => {
    setIsEvaluating(true);
    setFeedback(null);

    setTimeout(() => {
      setIsEvaluating(false);
      const hasKeyword = title.split(' ').some(word =>
        word.length > 3 && text.toLowerCase().includes(word.toLowerCase())
      );
      if (hasKeyword || text.length > 20) {
        setFeedback({
          status: 'success',
          message: `Bạn đã sử dụng đúng cấu trúc. Bài viết có nội dung phù hợp.`,
          suggestion: 'Hãy thử viết thêm với nhiều tình huống khác nhau!'
        });
      } else {
        setFeedback({
          status: 'error',
          message: `Bạn chưa sử dụng cấu trúc "${title}" trong đoạn văn.`,
          suggestion: `Hãy thử áp dụng cấu trúc "${title}" vào câu văn của bạn.`
        });
      }
    }, 1500);
  };

  const handleNextQ = () => {
    onNext();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'Enter') {
        if (!feedback || feedback.status === 'error') {
          handleEvaluate();
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
        <div className="wf-breadcrumb">Unit {unitId} &gt; Học ngữ pháp &gt; <span className="text-primary font-bold wf-breadcrumb-mode-deep">Deep Mode</span></div>
        <div className="wf-page-title text-2xl font-bold mt-1">Viết tự do: Viết đoạn văn với cấu trúc</div>
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

      <div className="flex flex-row flex-1 w-full gap-8">
        <div className="flex flex-col flex-1 relative">
          <div className="bg-white   rounded-xl shadow-glow flex flex-col h-full relative overflow-hidden">
            {feedback?.status === 'success' && (
              <div className="absolute top-4 right-4 flex flex-col items-center opacity-80 rotate-12">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>
                <span className="text-[10px] text-green-500 font-bold mt-1 tracking-widest -2 border-success/30 pt-1">AI OK</span>
              </div>
            )}

            <div className="p-6 flex flex-col flex-1">
              <div className="text-sm text-primary mb-2">
                Viết đoạn ngắn sử dụng cấu trúc "<strong className="text-primary text-base">{title}</strong>":
              </div>
              <div className="text-sm text-primary/70 italic mb-6">
                "{prompt}"
              </div>

              <textarea
                className="flex-1 w-full bg-surface   rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all text-primary leading-relaxed resize-none font-serif text-lg"
                placeholder={`Viết đoạn văn sử dụng cấu trúc "${title}"...`}
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={isEvaluating}
              />

              <div className="text-right text-xs text-gray-400 mt-2 font-mono">
                Từ: {wordCount}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            {(!feedback || feedback.status === 'error') ? (
              <button
                onClick={handleEvaluate}
                disabled={isEvaluating || wordCount < 3}
                className="px-10 py-3 bg-primary text-white font-bold rounded-xl shadow-glow hover:bg-primary transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEvaluating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Đang AI chấm...
                  </>
                ) : (
                  <><u>G</u>ửi thư</>
                )}
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

        <div className="w-[340px] shrink-0 bg-surface  border-purple-100 rounded-xl p-6 shadow-glow flex flex-col h-full">
          <div className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
              <path d="M22 12A10 10 0 0 0 12 2v10z"/>
              <circle cx="12" cy="12" r="2"/>
            </svg>
            AI Assistant
          </div>

          <div className="bg-white  border-gray-800 shadow-glow p-5 rounded-xl mb-6 text-center">
            <div className="text-xs font-bold text-primary/70 uppercase tracking-widest mb-3">Cấu trúc mục tiêu</div>
            <div className="bg-gray-800 text-white font-mono text-lg py-2 px-4 rounded-lg inline-block">{title}</div>
          </div>

          {feedback && (
            <div className={`p-5 rounded-xl -4 shadow-glow bg-white ${feedback.status === 'success' ? 'border-success/30  border-green-100' : 'border-error/30  ed-100'}`}>
              <div className={`text-sm font-bold flex items-center gap-2 mb-3 ${feedback.status === 'success' ? 'text-success' : 'text-error'}`}>
                {feedback.status === 'success' ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                )}
                Nhận xét hiện tại
              </div>
              <div className="text-sm text-primary leading-relaxed">
                {feedback.message}
                <div className={`mt-3 pt-3  border-dashed ${feedback.status === 'success' ? 'border-success/30' : 'border-error/30'}`}>
                  <strong className={feedback.status === 'success' ? 'text-success' : 'text-error'}>Gợi ý:</strong> {feedback.suggestion}
                </div>
              </div>
            </div>
          )}

          {!feedback && !isEvaluating && (
            <div className="flex-1 flex items-center justify-center text-sm text-gray-400 italic text-center px-4">
              AI sẽ phân tích câu của bạn và đưa ra phản hồi ngay khi bạn nộp bài.
            </div>
          )}
        </div>
      </div>

      <div className="wf-hint-bar flex justify-between text-xs text-primary/70 mt-4 pt-4  ">
        <div className="wf-hint-text">
          <span className="wf-hint-key bg-canvas px-2 py-1 rounded border">Tab</span> Viết
          <span className="ml-4"><span className="wf-hint-key bg-canvas px-2 py-1 rounded border">Ctrl+Enter</span> Gửi/Tiếp tục</span>
        </div>
      </div>
    </div>
  );
}
