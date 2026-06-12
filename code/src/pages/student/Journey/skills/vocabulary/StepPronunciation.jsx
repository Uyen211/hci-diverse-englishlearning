import React, { useState, useEffect } from 'react';
import { useAudio } from '../../../../../hooks/useAudio';

export default function StepPronunciation({ wordData, mode, onNext, wordIndex, totalWords, stepIndex, totalSteps, progressPercent, unitId }) {
  const { playTextToSpeech, playSuccessEarcon, playErrorEarcon } = useAudio();
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordingScore, setRecordingScore] = useState(null);
  const [history, setHistory] = useState([]);
  const [isSuccessText, setIsSuccessText] = useState(false);

  const targetText = wordData.contexts && wordData.contexts.length > 0 ? wordData.contexts[0].en : wordData.word;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'KeyP') {
        e.preventDefault();
        playTextToSpeech(targetText);
      } else if (e.code === 'KeyG') {
        e.preventDefault();
        handleRecord();
      } else if (e.code === 'KeyT' && history.length > 0) {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [recordingScore, isRecording, targetText, history]);

  const handleNext = () => {
    setIsSuccessText(true);
    setTimeout(() => {
      onNext();
    }, 1000);
  };

  const handleRecord = () => {
    if (isRecording) return;
    if (history.length >= 3) return; // Max 3 tries

    setIsRecording(true);
    
    // Simulate recording for 2 seconds
    setTimeout(() => {
      setIsRecording(false);
      // random between 50 and 100 for mock
      const score = Math.floor(Math.random() * 51) + 50; 
      setRecordingScore(score);
      setHistory(prev => [...prev, score]);
      
      if (score >= 70) {
        playSuccessEarcon();
      } else {
        playErrorEarcon();
      }
    }, 2000);
  };

  const highestScore = history.length > 0 ? Math.max(...history) : 0;
  const isPassed = highestScore >= 70;
  const canRetry = history.length < 3 && !isPassed;

  return (
    <div className="wf-main-content">
      <div className="wf-unit-header">
        <div className="wf-breadcrumb">Bài học &gt; Unit {unitId} &gt; Học từ vựng &gt; <span className={`wf-breadcrumb-mode-${mode}`}>{mode === 'deep' ? 'Deep Mode' : 'Fast Mode'}</span></div>
        <div className="wf-page-title">Luyện phát âm ASR</div>
      </div>

      <div className="wf-topbar">
        <div className="wf-step-counter">
          <div className="wf-step-counter-item">Bước: <strong>{stepIndex + 1}</strong> / {totalSteps}</div>
          <div className="wf-step-counter-divider"></div>
          <div className="wf-step-counter-item">Từ: <strong>{wordIndex + 1}</strong> / {totalWords}</div>
        </div>
        <div className="wf-progress-mini">
          <div className="wf-progress-mini-bar">
            <div className="wf-progress-mini-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div className="wf-progress-mini-label">{progressPercent}%</div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '850px', margin: '0 auto', width: '100%' }}>
        
        <div className="wf-card-highlight" style={{ textAlign: 'center', padding: '16px 20px', width: '100%', marginBottom: '12px' }}>
          <div className="flex-col items-center gap-12 justify-center" style={{ marginBottom: '8px' }}>
            <div className="wf-word-display" style={{ fontSize: '18px', padding: '12px 24px', display: 'inline-block', lineHeight: 1.5 }}>
              {targetText}
            </div>
            {wordData.contexts && wordData.contexts.length > 0 && (
              <div className="wf-subtitle" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                Từ mục tiêu: <strong>{wordData.word}</strong> ({wordData.ipa || `/${wordData.word}/`})
              </div>
            )}
            {(!wordData.contexts || wordData.contexts.length === 0) && (
              <div className="wf-text-block-solid">{wordData.ipa || `/${wordData.word}/`}</div>
            )}
          </div>
          <div className="flex-row gap-10 justify-center items-center" style={{ marginTop: '16px' }}>
            <div className="wf-placeholder-box interactive" style={{ width: '40px', height: '40px', borderRadius: '50%', fontSize: '10px' }} onClick={() => playTextToSpeech(targetText)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)', marginLeft: '2px' }}>
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <div className="wf-subtitle" style={{ fontSize: '12px' }}>Nghe phát âm mẫu</div>
          </div>
        </div>

        <div className="wf-card" style={{ width: '100%', padding: '16px', marginBottom: '12px' }}>
          <div className="flex-row items-center gap-6" style={{ marginBottom: '8px' }}>
            <div className="wf-badge" style={{ fontSize: '9px', background: 'rgba(78, 86, 192, 0.15)', color: 'var(--primary)', fontWeight: 'bold', borderRadius: '4px', padding: '2px 6px' }}>GHI ÂM (BẮT BUỘC)</div>
            <div className="wf-subtitle" style={{ fontSize: '11px' }}>Đọc to từ vựng bằng microphone</div>
          </div>

          <div className="flex-row gap-10 justify-center items-center" style={{ marginBottom: '8px' }}>
            {canRetry ? (
              <div role="button" tabIndex="0" accessKey="g" className={`wf-btn ${isRecording ? 'recording' : ''}`} style={{ padding: '10px 24px', minWidth: '180px', background: isRecording ? '#d32f2f' : 'var(--primary)' }} onClick={handleRecord}>
                {isRecording ? 'Đang lắng nghe...' : <span><u>G</u>hi âm</span>}
              </div>
            ) : (
              <div className="wf-btn" style={{ padding: '10px 24px', minWidth: '180px', background: '#ccc', cursor: 'not-allowed' }}>
                {isPassed ? 'Đã đạt điểm yêu cầu' : 'Hết lượt ghi âm'}
              </div>
            )}
          </div>

          <div className="wf-subtitle" style={{ fontSize: '10px', textAlign: 'center' }}>Trạng thái: {isRecording ? 'Đang lắng nghe...' : (canRetry ? 'Sẵn sàng' : 'Hoàn thành')}</div>
          <div className="wf-subtitle" style={{ fontSize: '10px', textAlign: 'center', marginTop: '4px' }}>Số lần thử: {history.length}/3 (Yêu cầu &gt;= 70 điểm)</div>
        </div>

        {recordingScore !== null && (
          <div className="wf-card" style={{ width: '100%', padding: '16px', marginBottom: '12px' }}>
            <div className="flex-row items-center gap-6" style={{ marginBottom: '10px' }}>
              <div className="wf-badge" style={{ fontSize: '9px' }}>KẾT QUẢ ASR MỚI NHẤT</div>
            </div>
            <div className="flex-row items-center gap-12" style={{ marginBottom: '6px' }}>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: recordingScore >= 70 ? 'var(--success)' : '#D32F2F' }}>{recordingScore}</div>
              <div>
                <div className="wf-text-block-solid" style={{ background: recordingScore >= 70 ? 'var(--success)' : '#D32F2F', fontSize: '11px', color: '#FFF' }}>{recordingScore >= 70 ? 'ĐẠT' : 'CHƯA ĐẠT'}</div>
                <div className="wf-subtitle" style={{ fontSize: '10px' }}>/ 100 điểm</div>
              </div>
              <div style={{ flex: 1, height: '8px', background: 'rgba(155, 93, 224, 0.15)', border: '1px solid #CCC' }}>
                <div style={{ width: `${recordingScore}%`, height: '100%', background: recordingScore >= 70 ? 'var(--success)' : '#D32F2F' }}></div>
              </div>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div style={{ width: '100%', marginBottom: '12px' }}>
            <div className="wf-subtitle" style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '4px' }}>Lịch sử ghi âm:</div>
            <div className="flex-col gap-4">
              {history.map((score, idx) => (
                <div key={idx} className="flex-row items-center gap-8" style={{ padding: '6px 10px', border: '1px solid #DDD', background: '#F9F9F9' }}>
                  <span className="wf-text-block-solid" style={{ fontSize: '9px', background: idx === history.length - 1 ? '#333' : '#666', color: '#FFF' }}>LẦN {idx + 1}</span>
                  <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{score}</span>
                  <span className="wf-text-block-solid" style={{ fontSize: '9px', background: score >= 70 ? 'var(--success)' : '#D32F2F', color: '#FFF' }}>{score >= 70 ? 'ĐẠT' : 'CHƯA ĐẠT'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex-col gap-8 items-center" style={{ marginTop: '16px' }}>
          {isSuccessText && (
            <div style={{ color: 'var(--success)', fontSize: '14px', fontWeight: 'bold' }}>
              Đang chuyển tiếp...
            </div>
          )}
          {(!canRetry) && (
            <button 
              className={`wf-btn ${isSuccessText ? 'disabled' : ''}`} 
              style={{ padding: '10px 36px', background: '#333' }} 
              onClick={handleNext}
              disabled={isSuccessText}
            >
              Tiếp tục
            </button>
          )}
        </div>
      </div>

      <div className="wf-hint-bar">
        <div className="wf-hint-text"><span className="wf-hint-key">G</span> Ghi âm <span style={{ marginLeft: '8px' }}><span className="wf-hint-key">P</span> Nghe mẫu</span></div>
        <div className="wf-hint-text">Ghi âm đúng (&gt;=70 điểm) hoặc hết 3 lần thử sẽ được qua.</div>
      </div>
    </div>
  );
}

