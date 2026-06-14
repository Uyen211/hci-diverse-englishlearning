import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { useAudio } from '../../../../../hooks/useAudio';
import catOpenMouth from '../../../../../assets/cat-open-mouth-removebg-preview.png';
import catSmile from '../../../../../assets/cat-smile-removebg-preview.png';
import spoonImg from '../../../../../assets/spoon-removebg.png';

export default function StepDictation({ grammarData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const { playSuccessEarcon, playErrorEarcon, playTextToSpeech } = useAudio();

  // Trích xuất danh sách cụm từ chính tả từ dữ liệu ngữ pháp mới
  const dictations = grammarData.dictations || [];
  const [currentDict, setCurrentDict] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [isError, setIsError] = useState(false);
  const [showEmptyError, setShowEmptyError] = useState(false);
  const [isSuccessText, setIsSuccessText] = useState('');
  const [errorCount, setErrorCount] = useState(0);

  const inputRef = useRef(null);
  const audioRef = useRef(null);
  const audioSrc = grammarData.contexts?.[0]?.url;

  // Định nghĩa số cụm từ cần gõ đúng dựa theo chế độ học (Deep: 5 cụm, Fast: 3 cụm)
  const requiredCount = mode === 'deep' ? Math.min(dictations.length, 5) : Math.min(dictations.length, 3);
  const targetWord = dictations[currentDict]?.text || '';
  const isFinished = correctCount >= requiredCount;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setErrorCount(0);
  }, [currentDict]);

  // Tự động chuyển tiếp khi hoàn thành nhiệm vụ "Cho mèo ăn"
  useEffect(() => {
    if (isFinished) {
      const timer = setTimeout(() => {
        onNext();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isFinished, onNext]);

  const handleSubmit = () => {
    if (isFinished) return;

    if (!inputValue.trim()) {
      setShowEmptyError(true);
      playErrorEarcon();
      return;
    }
    setShowEmptyError(false);

    // So khớp chính tả (không phân biệt hoa thường)
    if (inputValue.trim().toLowerCase() === targetWord.toLowerCase()) {
      const nextCorrectCount = correctCount + 1;
      setCorrectCount(nextCorrectCount);
      setInputValue(''); // Xóa text box khi gõ đúng
      setIsError(false);
      setErrorCount(0);
      setIsSuccessText('Chính xác!');
      playSuccessEarcon();
      setTimeout(() => setIsSuccessText(''), 1000);

      // Chuyển sang cụm ngữ pháp tiếp theo trong mảng nếu chưa đạt chỉ tiêu sàn
      if (nextCorrectCount < requiredCount && currentDict < dictations.length - 1) {
        setCurrentDict(prev => prev + 1);
      }
    } else {
      setIsError(true);
      setErrorCount(prev => prev + 1);
      // Giữ nguyên cụm từ gõ sai để học viên nhìn bẫy chính tả và tự sửa lại
      playErrorEarcon();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Lắng nghe phím tắt 'P' toàn cục để kích hoạt phát âm Audio TTS cụm từ
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.code === 'Space' && e.ctrlKey) {
        e.preventDefault();
        playAudioSource();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [targetWord]);

  // Tính toán vị trí tịnh tiến của Spoon hoạt họa dựa trên số lượt hoàn thành (0% về miệng mèo)
  const stepPercentage = 100 / requiredCount;
  const transformXValue = correctCount * stepPercentage;

  const playAudioSource = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else if (targetWord) {
      playTextToSpeech(targetWord);
    }
  };

  return (
    <div className="wf-main-content w-full flex flex-col">
      {audioSrc && <audio ref={audioRef} src={audioSrc} />}
      {/* Tiêu đề Khối Header */}
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
        <div className="wf-page-title">Chính tả: Gõ lại cụm ngữ pháp</div>
      </div>

      {/* Tiến trình Tổng thể Mini */}
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

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '850px', margin: '0 auto', width: '100%', overflowY: 'auto', paddingBottom: '20px' }}>
        {/* Hộp GAME CHO MÈO ĂN (Đồng bộ đồ họa hoạt họa từ Vocab) */}
        <div className="wf-card-highlight" style={{ width: '100%', padding: '16px 32px', marginBottom: '16px' }}>
          <div className="flex-row justify-between items-center w-full relative" style={{ height: '96px', padding: '0 20px' }}>

            {/* START: MÈO AVATAR */}
            <div style={{ zIndex: 10, width: '90px', height: '90px', flexShrink: 0 }}>
              <img
                src={isFinished ? catSmile : catOpenMouth}
                alt="Cat"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* ĐƯỜNG TRACK TỊNH TIẾN NỀN */}
            <div style={{ position: 'absolute', left: '120px', right: '110px', top: '50%', height: '4px', background: '#F0F0F0', transform: 'translateY(-50%)', borderRadius: '2px', zIndex: 1 }}></div>

            {/* END: THÌA THỨC ĂN DI CHUYỂN DỰA TRÊN ĐIỂM SỐ ĐÚNG */}
            <div style={{ position: 'absolute', right: '20px', width: 'calc(100% - 130px)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', zIndex: 5 }}>
              <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                transform: `translateX(-${transformXValue}%)`,
                transition: 'all 500ms ease-out'
              }}>
                <img
                  src={spoonImg}
                  alt="Spoon"
                  style={{ width: '70px', height: 'auto', objectFit: 'contain', opacity: isFinished ? 0 : 1, transition: 'opacity 0.3s ease 0.5s' }}
                />
              </div>
            </div>
          </div>

          {/* Hàng chỉ số Chấm tròn định vị số câu cần gõ đúng */}
          <div className="flex-row justify-center gap-4" style={{ marginTop: '10px' }}>
            {Array.from({ length: requiredCount }).map((_, i) => {
              const num = i + 1;
              if (num <= correctCount) {
                return <div key={num} className="wf-feed-dot done" style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: '10px' }}>✓</div>;
              } else if (num === correctCount + 1 && !isFinished) {
                return <div key={num} className="wf-feed-dot active" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>{num}</div>;
              } else {
                return <div key={num} className="wf-feed-dot" style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#EEE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>{num}</div>;
              }
            })}
          </div>
        </div>

        {/* Khối Bàn làm việc Tương tác nhập văn bản */}
        <div className="wf-card" style={{ padding: '20px', width: '100%' }}>
          <div className="flex-row gap-16 items-center">

            {/* Nút Nghe Phát Âm Cụm Từ (TTS) */}
            <div className="flex-col items-center gap-2">
              <div 
                className="flex items-center justify-center cursor-pointer transition-all hover:scale-105 shadow-md hover:shadow-lg bg-primary text-white" 
                style={{ width: '48px', height: '48px', borderRadius: '50%' }} 
                onClick={playAudioSource}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '3px' }}>
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <div className="wf-subtitle" style={{ fontSize: '10px' }}>Phát âm</div>
            </div>

            {/* Ô nhập thông tin Text Input */}
            <div className="flex-col" style={{ flex: 1 }}>
              <div className="flex-row gap-2 items-center" style={{ marginBottom: '6px' }}>
                <label className="wf-label" style={{ fontSize: '12px' }}>Gõ grammar chunk:</label>
                <span className="wf-text-block" style={{ fontSize: '10px', background: 'transparent', border: 'none', padding: 0 }}>Lần {Math.min(correctCount + 1, requiredCount)} / {requiredCount}</span>
              </div>
              
              <div className={`text-sm text-primary/70 italic mb-3 transition-opacity duration-500 ${errorCount >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                Đáp án: <strong className="text-primary ml-1">{targetWord}</strong>
              </div>

              <div className="flex gap-4">
                <input
                  type="text"
                  className="wf-input"
                  placeholder={isFinished ? "Hoàn thành nhiệm vụ!" : `Gõ chính xác cụm: "${targetWord}"...`}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    if (isError) setIsError(false);
                    if (showEmptyError) setShowEmptyError(false);
                  }}
                  onKeyDown={handleKeyDown}
                  ref={inputRef}
                  disabled={isFinished}
                  style={{
                    flex: 1,
                    padding: '10px',
                    border: (showEmptyError || isError) ? '2px solid red' : '1px solid #CCC',
                    borderRadius: '8px',
                    fontSize: '14px',
                    background: (showEmptyError || isError) ? '#FFF5F5' : '#FFF',
                    animation: (showEmptyError || isError) ? 'shake 0.4s' : 'none'
                  }}
                />
                <div role="button" tabIndex="0" className="wf-btn btn-default-submit" style={{ padding: '8px 24px' }} onClick={handleSubmit}>
                  {isFinished ? 'Tiếp tục' : 'Kiểm tra'}
                </div>
              </div>

              {/* Thông báo trạng thái và các bẫy lỗi sai */}
              {isError && !showEmptyError && (
                <div style={{ color: 'var(--error)', fontSize: '13px', marginTop: '8px', fontWeight: 'bold', animation: 'shake 0.4s' }}>
                  Sai chính tả cụm ngữ pháp, vui lòng rà soát chỉnh sửa lại.
                </div>
              )}
              {showEmptyError && (
                <div style={{ color: 'var(--error)', fontSize: '13px', marginTop: '8px', fontWeight: 'bold', animation: 'shake 0.4s' }}>
                  Vui lòng gõ cụm từ vựng trước khi kiểm tra!
                </div>
              )}
              {isFinished ? (
                <div style={{ color: 'var(--success)', fontSize: '14px', marginTop: '8px', fontWeight: 'bold' }}>
                  Chúc mừng! Đã cho mèo ăn đủ chỉ tiêu, hệ thống đang chuyển tiếp...
                </div>
              ) : isSuccessText ? (
                <div style={{ color: 'var(--success)', fontSize: '14px', marginTop: '8px', fontWeight: 'bold' }}>
                  {isSuccessText}
                </div>
              ) : null}
            </div>

          </div>
        </div>
      </div>

      {/* Thanh Hint Bar chân trang */}
      <div className="flex justify-between items-center bg-primary/5 border border-primary/20 rounded-xl p-4 mt-6 text-sm text-primary">
        <div className="flex flex-wrap items-center gap-4"><kbd className="bg-white px-1.5 py-0.5 border rounded shadow-sm text-xs font-semibold mr-1 text-text-primary">Ctrl+Space</kbd> Nghe phát âm cụm <span style={{ marginLeft: '8px' }}><kbd className="bg-white px-1.5 py-0.5 border rounded shadow-sm text-xs font-semibold mr-1 text-text-primary">Enter</kbd> Kiểm tra nộp bài</span></div>
        <div className="text-xs text-text-secondary opacity-80 hidden md:block">Còn <strong>{requiredCount - correctCount}</strong> lần gõ chuẩn xác để đạt {requiredCount}/{requiredCount} mục tiêu!</div>
      </div>
    </div>
  );
}