import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { useAudio } from '../../../../../hooks/useAudio';

export default function StepContext({ grammarData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const contexts = grammarData.contexts || [];
  const [currentClip, setCurrentClip] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showEmptyError, setShowEmptyError] = useState(false);
  const [isCheckMode, setIsCheckMode] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { playSuccessEarcon, playErrorEarcon } = useAudio();

  // Trạng thái video đồng bộ từ vocab
  const [videoStatus, setVideoStatus] = useState('Đang phát'); // 'Đang phát', 'Đã phát xong'
  const videoRef = useRef(null);

  const meaningOptions = grammarData.meaningOptions || [];
  const correctIndex = meaningOptions.indexOf(grammarData.meaning);

  const handleCheck = () => {
    if (selectedOption !== null) {
      if (!isCheckMode) {
        setShowEmptyError(false);
        const correct = selectedOption === correctIndex;
        setIsCorrect(correct);
        setIsCheckMode(true);
        if (correct) playSuccessEarcon();
        else playErrorEarcon();
      } else {
        onNext({ correct: isCorrect });
      }
    } else {
      setShowEmptyError(true);
      playErrorEarcon();
    }
  };

  // Tự động phát lại video khi đổi clip ngữ cảnh
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play()
        .then(() => setVideoStatus('Đang phát'))
        .catch(err => console.log("Auto-play bị chặn bởi trình duyệt:", err));
    }
  }, [currentClip]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') handleCheck();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOption]);

  // Điều khiển trạng thái video từ vocab
  const handleVideoEnd = () => {
    setVideoStatus('Đã phát xong');
  };

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setVideoStatus('Đang phát');
    }
  };

  const allViewed = videoStatus === 'Đã phát xong' && currentClip === contexts.length - 1;

  // TƯ DUY MỚI: Tự động nhận diện cụm ngữ pháp mục tiêu để in đậm màu vàng
  const renderSubtitle = (sentence) => {
    if (!sentence) return null;

    // Các cụm từ khóa ngữ pháp chính cho 4 cấu trúc
    const patterns = [
      // 1. Adverbs of frequency: (chủ ngữ) + trạng từ + động từ
      /(\b(?:I|you|we|they|he|she|it|\w+)\s+(?:always|usually|often|never|sometimes|seldom|rarely)\s+\w+)/i,
      // 2. Present perfect with just: have/has just + V3
      /(\b(?:have|has|'ve|'s)\s+just\s+\w+)/i,
      // 3. Be going to: am/is/are (not) going to + V
      /(\b(?:am|is|are|'m|'s|'re)\s+(?:not\s+)?going\s+to\s+\w+)/i,
      // 4. Used to: used to / didn't use to + V
      /(\b(?:used\s+to|didn't\s+use\s+to)\s+\w+)/i
    ];

    let targetPhrase = null;
    let matchIndex = -1;

    for (const regex of patterns) {
      const match = sentence.match(regex);
      if (match) {
        targetPhrase = match[0];
        matchIndex = sentence.indexOf(targetPhrase);
        break;
      }
    }

    if (targetPhrase) {
      const before = sentence.slice(0, matchIndex);
      const after = sentence.slice(matchIndex + targetPhrase.length);

      return (
        <>
          {before}
          <span className="text-yellow-300 font-bold cursor-help bg-black/30 px-1 rounded mx-1" title="Cấu trúc ngữ pháp">
            {targetPhrase}
          </span>
          {after}
        </>
      );
    }

    return <>{sentence}</>;
  };

  return (
    <div className="flex flex-col flex-1 w-full max-w-5xl mx-auto gap-4">
      <div className="wf-unit-header mb-6">
        <div className="wf-breadcrumb flex flex-wrap items-center gap-1">
          <Link to="/" className="hover:underline text-text-secondary">Trang chủ</Link>
          <span className="opacity-50">&gt;</span>
          <Link to="/student/journey" className="hover:underline text-text-secondary">Hành trình</Link>
          <span className="opacity-50">&gt;</span>
          <Link to={`/student/journey/unit/${typeof unitId !== 'undefined' ? unitId : 3}`} className="hover:underline text-text-secondary">Unit {typeof unitId !== 'undefined' ? unitId : 3}</Link>
          <span className="opacity-50">&gt;</span>
          <Link to="/student/grammar/select" className="hover:underline text-text-secondary">Học ngữ pháp</Link>
          <span className="opacity-50">&gt;</span>
          <span className="text-primary font-bold">{typeof mode !== 'undefined' ? (mode === 'fast' ? 'Fast Mode' : mode === 'deep' ? 'Deep Mode' : (mode || 'Mode')) : 'Mode'}</span>
        </div>
        <div className="wf-page-title text-2xl font-bold mt-1">Làm quen ngữ cảnh: Xem clip và nhận diện cấu trúc</div>
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

      <div className="flex flex-row gap-6 flex-1">
        <div className="flex flex-col gap-3 flex-[1.4]">
          <div className="relative flex flex-col  border-gray-800 bg-gray-900 aspect-video overflow-hidden rounded-xl shadow-glow">
            {contexts[currentClip]?.url ? (
              <video
                ref={videoRef}
                src={contexts[currentClip].url}
                className="w-full h-full object-cover"
                autoPlay
                onEnded={handleVideoEnd}
              />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center bg-gray-800">
                <div className="text-sm font-bold text-primary/70 mb-2">[ KHU VỰC PHÁT VIDEO ]</div>
                <div className="w-12 h-12  border-gray-500 rounded flex items-center justify-center text-primary/70">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                </div>
              </div>
            )}

            <div className="absolute top-3 left-3 bg-black/75 text-white  border-gray-600 text-xs px-2 py-1 rounded flex gap-4">
              <span>Clip {currentClip + 1} / {contexts.length}</span>
              <span className="text-gray-400">|</span>
              <span className="text-purple-300">{videoStatus}</span>
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
                onClick={() => { setCurrentClip(idx); setVideoStatus('Đang phát'); }}
              ></div>
            ))}
            <div className="text-xs text-primary/70 ml-2">{contexts.length} clip ngữ cảnh khác nhau</div>
          </div>

          <div className="flex flex-row items-center justify-between mt-2">
            <div className={`text-xs px-2 py-1 rounded font-medium border ${allViewed ? 'border-green-500 bg-green-50 text-green-600' : 'bg-gray-200 text-primary'}`}>
              {allViewed ? 'Đã xem hết clip' : 'Đang xem...'}
            </div>

            <div className="flex-row gap-8" style={{ flexShrink: 0 }}>
              <div className={`wf-btn outline ${currentClip === 0 ? 'disabled' : ''}`} onClick={() => setCurrentClip(Math.max(0, currentClip - 1))} style={{ padding: '8px 12px', fontSize: '13px', whiteSpace: 'nowrap' }}>&lt; Lùi</div>
              <div className="wf-btn" onClick={playVideo} style={{ padding: '8px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/><path d="m16 5 5 5-5 5"/></svg>
                Phát lại
              </div>
              <div className={`wf-btn outline ${currentClip === contexts.length - 1 ? 'disabled' : ''}`} onClick={() => setCurrentClip(Math.min(contexts.length - 1, currentClip + 1))} style={{ padding: '8px 12px', fontSize: '13px', whiteSpace: 'nowrap' }}>Kế tiếp &gt;</div>
            </div>
          </div>

          <div className="p-4 bg-white   rounded-xl shadow-glow mt-2">
            <div className="text-xs font-bold text-primary mb-2">Các câu trong clip:</div>
            <div className="text-sm leading-relaxed p-3 bg-surface  border-purple-100 rounded-lg text-primary">
              {contexts.map((c, i) => (
                <div key={i} className={`mb-1 ${i === currentClip ? 'text-purple-600 font-bold' : ''}`}>{i + 1}. "{c.caption}"</div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <div className="p-5 bg-white   rounded-xl shadow-glow h-full flex flex-col">
            <div className="flex flex-row items-center gap-2 mb-3">
              <div className="bg-purple-100 text-primary text-sm font-bold px-2 py-0.5 rounded">CHỌN CẶP MÔ TẢ</div>
              <div className="text-sm text-primary/70">Thời gian + Chức năng</div>
            </div>

            <div className="text-sm text-primary/70 mb-4 font-medium">Cặp mô tả nào phù hợp với cấu trúc trong clip?</div>

            <div className="flex flex-col gap-3 flex-1">
              {meaningOptions.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                return (
                <div
                  key={idx}
                  onClick={() => { if(!isCheckMode) { setSelectedOption(idx); setShowEmptyError(false); } }}
                  className={`interactive ${isSelected ? 'selected' : ''}`}
                  style={{
                    border: `1px solid ${isSelected ? (isCheckMode ? (isCorrect ? 'var(--success)' : 'var(--error)') : 'var(--primary)') : 'rgba(0,0,0,0.08)'}`,
                    borderRadius: '999px',
                    padding: '12px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    background: isSelected ? '#FAF8FF' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ 
                    width: '28px', height: '28px', borderRadius: '50%', 
                    background: isSelected ? (isCheckMode ? (isCorrect ? 'var(--success)' : 'var(--error)') : 'var(--primary)') : '#F3F4F6',
                    color: isSelected ? 'white' : 'var(--text-secondary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', fontWeight: 'bold', flexShrink: 0
                  }}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div style={{ fontSize: '15px', color: 'var(--text-primary)' }}>{opt}</div>
                </div>
              )})}
            </div>

            {showEmptyError && (
              <div className="mt-4 text-center text-sm font-bold text-error" style={{ animation: 'shake 0.4s' }}>
                Vui lòng chọn một đáp án trước khi xác nhận!
              </div>
            )}

            {!isCheckMode ? (
              <div className="flex flex-row justify-center mt-6">
                <button
                  onClick={handleCheck}
                  className={`wf-btn btn-default-submit px-8 py-3 rounded-xl font-bold transition-all w-full max-w-xs ${selectedOption !== null ? 'bg-primary text-white shadow-glow hover:bg-primary' : 'bg-gray-300 text-primary/70'}`}
                  tabIndex={0}
                >
                  Kiểm tra
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center mt-6 w-full">
                <div className={`mb-4 text-center text-sm font-medium p-4 px-6 rounded-lg w-full ${isCorrect ? 'bg-green-100 text-success' : 'bg-red-100 text-error'}`}>
                  <div className="font-bold text-base mb-1">{isCorrect ? 'Chính xác!' : 'Chưa chính xác!'}</div>
                  {!isCorrect && (
                    <div className="mt-2 text-left">
                      <strong>Đáp án đúng:</strong> {meaningOptions[correctIndex]}
                    </div>
                  )}
                </div>
                <button
                  onClick={handleCheck}
                  className="wf-btn btn-default-submit px-12 py-3 bg-success text-white font-bold rounded-xl shadow-glow hover:bg-green-700 transition-all w-full max-w-xs"
                  tabIndex={0}
                >
                  Tiếp tục
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="wf-hint-bar flex justify-between text-xs text-primary/70 mt-4 pt-4  ">
        <div className="flex-row gap-16">
          <div className="wf-hint-text"><span className="wf-hint-key">A-C</span> Chọn cặp mô tả</div>
          <div className="wf-hint-text"><span className="wf-hint-key">Enter</span> Kiểm tra / Tiếp tục</div>
        </div>
        <div className="wf-hint-text">
          <span className="wf-hint-key bg-canvas px-2 py-1 rounded border">Space</span> Phát/tạm dừng video
        </div>
      </div>
    </div>
  );
}