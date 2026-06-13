import React, { useState, useEffect, useRef } from 'react';
import { useAudio } from '../../../../../hooks/useAudio';

export default function StepContext({ wordData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const { playSuccessEarcon, playErrorEarcon } = useAudio();
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showEmptyError, setShowEmptyError] = useState(false);
  const [isWrongOpt, setIsWrongOpt] = useState(false);
  
  const [options, setOptions] = useState([]);
  
  const [videos, setVideos] = useState([]);
  const [hasVideos, setHasVideos] = useState(false);

  useEffect(() => {
    if (wordData.title) {
      setVideos(wordData.contexts || []);
      setHasVideos((wordData.contexts || []).length > 0);
    } else {
      setVideos(wordData.videos || []);
      setHasVideos((wordData.videos || []).length > 0);
    }
  }, [wordData]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoStatus, setVideoStatus] = useState('Đang phát'); // 'Đang phát', 'Đã phát xong'
  const videoRef = useRef(null);

  useEffect(() => {
    // Generate options using wordData.meaningOptions
    if (wordData.meaningOptions && wordData.meaningOptions.length >= 3) {
      // Create a random arrangement for A, B, C from the first 3 meaning options or mix
      // For simplicity, let's just take the correct meaning and 2 wrong meanings
      const wrongMeanings = wordData.meaningOptions.filter(m => m !== wordData.meaning).slice(0, 2);
      const allThree = [wordData.meaning, ...wrongMeanings];
      // Shuffle
      allThree.sort(() => Math.random() - 0.5);
      setOptions([
        { id: 'A', text: allThree[0] }, 
        { id: 'B', text: allThree[1] }, 
        { id: 'C', text: allThree[2] }
      ]);
    } else {
      const dummies = ['Do dự, lúng túng', 'Từ bỏ, bỏ rơi', wordData.meaning || 'Hoàn thành, đạt được'];
      setOptions([{ id: 'A', text: dummies[2] }, { id: 'B', text: dummies[0] }, { id: 'C', text: dummies[1] }]);
    }
  }, [wordData]);

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (isSuccess) {
          onNext();
        } else {
          handleSubmit();
        }
      } else {
        if (!isSuccess) {
          if (e.key.toUpperCase() === 'A') { setSelectedOpt(options[0]?.text); setShowEmptyError(false); setIsWrongOpt(false); }
          if (e.key.toUpperCase() === 'B') { setSelectedOpt(options[1]?.text); setShowEmptyError(false); setIsWrongOpt(false); }
          if (e.key.toUpperCase() === 'C') { setSelectedOpt(options[2]?.text); setShowEmptyError(false); setIsWrongOpt(false); }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOpt, options, isSuccess]);

  const handleSubmit = () => {
    if (isSuccess) {
      onNext();
      return;
    }

    if (!selectedOpt) {
      setShowEmptyError(true);
      playErrorEarcon();
      return;
    }
    setShowEmptyError(false);
    if (selectedOpt === wordData.meaning) {
      setIsWrongOpt(false);
      setIsSuccess(true);
      playSuccessEarcon();
    } else {
      setIsWrongOpt(true);
      playErrorEarcon();
    }
  };

  const handleVideoEnd = () => {
    setVideoStatus('Đã phát xong');
  };

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setVideoStatus('Đang phát');
    }
  };

  const nextVideo = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
      setVideoStatus('Đang phát');
    }
  };

  const prevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(prev => prev - 1);
      setVideoStatus('Đang phát');
    }
  };

  const allViewed = videoStatus === 'Đã phát xong' && currentVideoIndex === videos.length - 1;

  const currentVideo = hasVideos ? videos[currentVideoIndex] : null;

  const renderHighlightedText = (text, highlightWords, highlightColor = 'var(--primary)') => {
    if (!text || !highlightWords) return text;
    
    let wordsToHighlight = Array.isArray(highlightWords) ? highlightWords : [highlightWords];
    if (wordsToHighlight.length === 0) return text;

    // Create a regex that matches any of the words
    // Escape special characters and join with |
    const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = wordsToHighlight.map(escapeRegExp).join('|');
    const regex = new RegExp(`\\b(${pattern})\\b`, 'gi');

    const parts = text.split(regex);
    
    return (
      <span>
        {parts.map((part, index) => {
          const isMatch = wordsToHighlight.some(w => part.toLowerCase() === w.toLowerCase());
          return isMatch ? (
            <span key={index} style={{ color: highlightColor, fontWeight: 'bold' }}>{part}</span>
          ) : (
            <span key={index}>{part}</span>
          );
        })}
      </span>
    );
  };

  const getGrammarHighlights = (id) => {
    switch (id) {
      case 1: return ['always', 'usually', 'often', 'sometimes', 'never'];
      case 2: return ['just'];
      case 3: return ['going to'];
      case 4: return ['used to', "didn't use to"];
      default: return [];
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col relative h-full">
      <div className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-100 shrink-0">
        <div className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
          Unit {unitId} &gt; Học từ vựng &gt; <span className={mode === 'deep' ? 'text-purple-600' : 'text-blue-500'}>{mode === 'deep' ? 'Deep Mode' : 'Fast Mode'}</span>
        </div>
        <div className="text-2xl font-bold text-gray-800 tracking-tight">Đoán nghĩa từ ngữ cảnh</div>
      </div>

      <div className="flex items-center justify-between px-8 py-3 bg-gray-50 border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
          <div>Bước: <strong className="text-gray-900">{stepIndex}</strong> / {totalSteps}</div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div>Từ: <strong className="text-gray-900">{wordIndex + 1}</strong> / {totalWords}</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-32 h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div className="text-sm font-bold text-gray-700">{progressPercent}%</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex gap-6 w-full max-w-6xl mx-auto h-full min-h-[500px]">
          
          {/* Left Column: Video */}
          <div className="flex-[1.2] flex flex-col gap-4">
            <div className="w-full aspect-video bg-black rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-lg">
              {hasVideos ? (
                <video 
                  ref={videoRef}
                  src={currentVideo.url} 
                  autoPlay 
                  onEnded={handleVideoEnd}
                  className="w-full h-full object-contain absolute inset-0"
                />
              ) : (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50 font-medium">Video đang cập nhật...</div>
              )}
              
              <div className="flex justify-between w-full p-4 relative z-10">
                <div className="bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">Vid {currentVideoIndex + 1} / {videos.length || 1}</div>
                <div className="bg-black/50 text-white/70 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">{videoStatus}</div>
              </div>
              
              <div className="w-full text-center bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-12 pb-6 px-6 text-white text-lg font-medium relative z-10 drop-shadow-md">
                "{renderHighlightedText(hasVideos ? currentVideo.caption : (wordData.contexts?.[0]?.en || `She wanted to ${wordData.word} something meaningful.`), unitId === 2 ? getGrammarHighlights(wordData.id) : wordData.word, '#fbbf24')}"
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              {/* Top Row: Progress Bars */}
              <div className="flex items-center gap-2 w-full px-2">
                {videos.map((_, idx) => (
                  <div key={idx} className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${idx <= currentVideoIndex ? 'bg-purple-500' : 'bg-purple-100'}`}></div>
                ))}
                <div className="text-xs font-medium text-gray-500 ml-2 whitespace-nowrap">
                  {currentVideoIndex + 1} / {videos.length || 1} clip
                </div>
              </div>

              {/* Bottom Row: Controls */}
              <div className="flex items-center justify-between w-full mt-2">
                <div className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 border ${allViewed ? 'border-green-500 text-green-600 bg-green-50' : 'border-purple-500 text-purple-600 bg-purple-50'}`}>
                  {allViewed ? 'Đã xem hết clip' : 'Đang xem...'}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${currentVideoIndex === 0 ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-gray-700 bg-gray-100 hover:bg-gray-200 active:scale-95'}`} 
                    onClick={prevVideo}
                    disabled={currentVideoIndex === 0}
                  >
                    &lt; Lùi
                  </button>
                  <button 
                    className="px-5 py-2 rounded-xl text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 active:scale-95 transition-all flex items-center gap-2 shadow-sm" 
                    onClick={playVideo}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/><path d="m16 5 5 5-5 5"/></svg>
                    Phát lại
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${currentVideoIndex === videos.length - 1 ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-gray-700 bg-gray-100 hover:bg-gray-200 active:scale-95'}`} 
                    onClick={nextVideo}
                    disabled={currentVideoIndex === videos.length - 1}
                  >
                    Kế tiếp &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Question */}
          <div className="flex-1 flex flex-col min-w-[400px]">
            <div className="w-full bg-white rounded-3xl p-8 border-2 border-purple-500 shadow-[0_4px_20px_rgba(139,92,246,0.15)] flex flex-col gap-6 h-full">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider">ĐOÁN NGHĨA</div>
                <div className="text-sm font-medium text-gray-500">Vui lòng chọn đáp án</div>
              </div>

              <div className="border border-gray-100 bg-gray-50 rounded-2xl p-6 text-center text-lg font-medium text-gray-800 shadow-inner">
                "{renderHighlightedText(hasVideos ? currentVideo.caption : `She wanted to ${wordData.word} something meaningful.`, unitId === 2 ? getGrammarHighlights(wordData.id) : wordData.word)}"
              </div>

              <div className="text-lg font-semibold text-gray-800">
                {unitId === 2 ? 'Mô tả nào dưới đây đúng nhất về tình huống này?' : <>Từ <strong className="text-purple-700">"{wordData.word}"</strong> có nghĩa là gì?</>}
              </div>

              <div className="flex flex-col gap-4 flex-1 justify-center">
                {options.map((opt) => {
                  const isSelected = selectedOpt === opt.text;
                  let bgClass = 'bg-white hover:bg-gray-50';
                  let borderClass = 'border-gray-200';
                  let textClass = 'text-gray-600';
                  let iconBgClass = 'bg-gray-100 text-gray-500';

                  if (isSelected) {
                    if (isSuccess) {
                      bgClass = 'bg-green-50';
                      borderClass = 'border-green-500 ring-2 ring-green-500/20';
                      textClass = 'text-green-700 font-bold';
                      iconBgClass = 'bg-green-100 text-green-600';
                    } else if (isWrongOpt) {
                      bgClass = 'bg-red-50';
                      borderClass = 'border-red-500 ring-2 ring-red-500/20';
                      textClass = 'text-red-700 font-bold';
                      iconBgClass = 'bg-red-100 text-red-600';
                    } else {
                      bgClass = 'bg-purple-50';
                      borderClass = 'border-purple-500 ring-2 ring-purple-500/20';
                      textClass = 'text-purple-700 font-bold';
                      iconBgClass = 'bg-purple-100 text-purple-600';
                    }
                  }

                  return (
                    <div 
                      key={opt.id}
                      role="button"
                      tabIndex="0"
                      className={`group flex items-center gap-4 px-6 py-4 rounded-2xl border-2 cursor-pointer transition-all ${bgClass} ${borderClass} ${(isSelected && isWrongOpt) ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}
                      onClick={() => { 
                        if (!isSuccess) {
                          setSelectedOpt(opt.text); setShowEmptyError(false); setIsWrongOpt(false); 
                        }
                      }}
                    >
                      <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center font-bold text-lg transition-colors ${iconBgClass}`}>
                        {opt.id}
                      </div>
                      <div className={`text-lg ${textClass}`}>{opt.text}</div>
                    </div>
                  );
                })}
              </div>

              <div className="h-10 flex items-center justify-center">
                {showEmptyError && (
                  <div className="text-red-500 text-sm font-semibold animate-[shake_0.4s_ease-in-out] bg-red-50 px-4 py-2 rounded-lg">
                    Vui lòng chọn một đáp án trước khi trả lời!
                  </div>
                )}

                {isWrongOpt && !isSuccess && (
                  <div className="text-red-600 text-sm font-bold bg-red-50 px-4 py-2 rounded-lg">
                    Đáp án chưa chính xác, hãy chọn lại nhé!
                  </div>
                )}

                {isSuccess && (
                  <div className="text-green-600 text-sm font-bold bg-green-50 px-4 py-2 rounded-lg flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Tuyệt vời! Đáp án chính xác.
                  </div>
                )}
              </div>

              <div className="flex justify-center mt-2">
                <button 
                  className={`px-12 py-4 font-bold text-lg rounded-2xl shadow-lg transition-all w-full sm:w-auto ${!selectedOpt ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' : (isSuccess ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-xl hover:-translate-y-0.5' : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-xl hover:-translate-y-0.5')}`} 
                  onClick={handleSubmit}
                  disabled={!selectedOpt}
                >
                  {isSuccess ? 'Tiếp tục' : 'Trả lời'}
                </button>
              </div>
            </div>
          </div>

        </div>

        <div className="flex items-center justify-between w-full max-w-6xl mx-auto mt-6 bg-gray-50 px-6 py-4 rounded-2xl border border-gray-200">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
              <span className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-bold shadow-sm">A-C</span> 
              Chọn đáp án
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
              <span className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-bold shadow-sm">Enter</span> 
              Trả lời
            </div>
          </div>
          <div className="text-sm font-medium text-gray-500 italic">Vui lòng chọn đáp án trước khi trả lời.</div>
        </div>
      </div>
    </div>
  );
}
