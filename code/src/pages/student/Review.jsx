import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewDashboard from './components/ReviewDashboard';
import ReviewTopBar from './components/ReviewTopBar';
import ReviewTimer from './components/ReviewTimer';
import { ReviewSentenceCard } from './components/ReviewQuestionCard';
import ReviewQuestionCard from './components/ReviewQuestionCard';
import ReviewInputArea from './components/ReviewInputArea';
import ReviewFeedback from './components/ReviewFeedback';
import ReviewSelfAssess from './components/ReviewSelfAssess';
import ReviewSummary from './components/ReviewSummary';
import ReviewHintPopup from './components/ReviewHintPopup';
import ReviewDictionaryPopup from './components/ReviewDictionaryPopup';
import ReviewEmptyErrorPopup from './components/ReviewEmptyErrorPopup';
import '../../review.css';

import quizData from '../../data/quizData.json';

// Map quizData to the format expected by the UI components
const REVIEW_DATA = quizData.map(q => ({
    ...q,
    word: q.correctAnswer,
    sentence: q.question,
    grammarNote: q.hint,
    type: q.wordType || 'word',
    questionType: q.type
}));

export default function Review() {
    const navigate = useNavigate();
    const [status, setStatus] = useState('dashboard'); // 'dashboard', 'running', 'summary'
    const [currentIdx, setCurrentIdx] = useState(0);
    
    // Session Stats
    const [stats, setStats] = useState({
        correct: 0,
        ok: 0,
        bad: 0,
        total: REVIEW_DATA.length,
        vocab: REVIEW_DATA.filter(q => q.type !== 'grammar').length,
        grammar: REVIEW_DATA.filter(q => q.type === 'grammar').length,
        weak: 2, // Dummy value for demonstration
        estimatedTime: Math.max(1, Math.ceil(REVIEW_DATA.length * 0.5)),
        hardestWord: REVIEW_DATA.length > 0 ? REVIEW_DATA[1]?.word || REVIEW_DATA[0].word : "accomplish"
    });

    // Question State
    const [mode, setMode] = useState('text'); // 'text', 'mcq', 'feedback', 'assess'
    const [timeLeft, setTimeLeft] = useState(10);
    const [userAnswer, setUserAnswer] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    
    // Popup State
    const [popupType, setPopupType] = useState(null); // 'hint', 'dictionary', 'empty', null

    const currentItem = REVIEW_DATA[currentIdx];

    // Timer Logic
    useEffect(() => {
        if (status !== 'running' || mode !== 'text' || popupType) return; // Pause timer when popup is open

        if (timeLeft <= 0) {
            setMode('mcq');
            setErrorMsg('');
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [status, mode, timeLeft, popupType]);

    const handleStart = () => {
        setStatus('running');
        setMode('text');
        setTimeLeft(10);
        setUserAnswer('');
        setErrorMsg('');
        setPopupType(null);
    };

    const handleNextQuestion = () => {
        if (currentIdx + 1 < REVIEW_DATA.length) {
            const nextIdx = currentIdx + 1;
            setCurrentIdx(nextIdx);
            setMode('text');
            setTimeLeft(10);
            setUserAnswer('');
            setErrorMsg('');
            setPopupType(null);
        } else {
            setStatus('summary');
        }
    };

    const handleSubmit = () => {
        if (!userAnswer.trim()) {
            setErrorMsg('Vui lòng cung cấp đáp án trước khi nộp bài');
            setPopupType('empty');
            return;
        }
        setErrorMsg('');
        setMode('assess');
    };

    const handleAssess = (level) => {
        setStats(prev => ({
            ...prev,
            [level === 'good' ? 'correct' : level === 'ok' ? 'ok' : 'bad']: prev[level === 'good' ? 'correct' : level === 'ok' ? 'ok' : 'bad'] + 1
        }));
        setMode('feedback');
    };

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (popupType) {
                if (e.key === 'Escape' || e.key === 'Enter') {
                    e.preventDefault();
                    setPopupType(null);
                }
                return;
            }

            if (status === 'dashboard') {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleStart();
                }
                return;
            }

            if (status === 'summary') {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    navigate('/');
                }
                return;
            }

            if (mode === 'text') {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSubmit();
                } else if (e.key.toLowerCase() === 'g' && (e.ctrlKey || e.altKey || document.activeElement.tagName !== 'INPUT')) {
                    e.preventDefault();
                    setPopupType('hint');
                }
            } else if (mode === 'mcq') {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSubmit();
                } else if (['1', '2', '3', '4'].includes(e.key)) {
                    const idx = parseInt(e.key) - 1;
                    if (currentItem.options[idx]) {
                        setUserAnswer(currentItem.options[idx]);
                    }
                }
            } else if (mode === 'assess') {
                if (e.key === '1') handleAssess('good');
                else if (e.key === '2') handleAssess('ok');
                else if (e.key === '3') handleAssess('bad');
            } else if (mode === 'feedback') {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleNextQuestion();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [status, mode, popupType, userAnswer, currentItem, navigate, handleStart, handleSubmit, handleAssess, handleNextQuestion]);

    if (status === 'dashboard') {
        return (
            <div className="srs-review-wrapper" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)', overflow: 'hidden' }}>
                <ReviewDashboard stats={stats} onStart={handleStart} />
            </div>
        );
    }

    if (status === 'summary') {
        return (
            <div className="srs-review-wrapper" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)', overflow: 'hidden' }}>
                <ReviewSummary stats={{...stats, totalReviewed: currentIdx + (mode === 'assess' ? 1 : 0)}} onGoHome={() => navigate('/')} />
            </div>
        );
    }

    const isCorrect = userAnswer.toLowerCase().trim() === currentItem.word.toLowerCase();
    const sentenceHtml = currentItem.sentence.replace('______', mode === 'feedback' || mode === 'assess' ? `<strong>${currentItem.word}</strong>` : '______');

    return (
        <div className="srs-review-wrapper" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)', overflow: 'hidden' }}>
            <div className="wf-main-content" style={{ padding: 0, flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                <ReviewTopBar 
                    current={currentIdx + 1} 
                    total={stats.total} 
                    correct={stats.correct} 
                    incorrect={stats.bad} 
                />

                <div style={{ flex: '1', maxWidth: '900px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto', paddingBottom: '16px' }}>

                    {mode !== 'assess' && (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                            <ReviewSentenceCard sentence={sentenceHtml} />
                            <ReviewTimer timeLeft={timeLeft} totalTime={10} isTimeout={mode === 'mcq'} />
                        </div>
                    )}

                    {(mode === 'text' || mode === 'mcq') && (
                        <ReviewInputArea 
                            mode={mode}
                            value={userAnswer}
                            onChange={setUserAnswer}
                            onSubmit={handleSubmit}
                            onHint={() => setPopupType('hint')}
                            options={currentItem.options}
                            onOptionSelect={setUserAnswer}
                            errorMsg={errorMsg}
                        />
                    )}

                    {mode === 'feedback' && (
                        <ReviewFeedback 
                            item={currentItem}
                            isCorrect={isCorrect}
                            userAnswer={userAnswer}
                            onNext={handleNextQuestion}
                        />
                    )}

                    {mode === 'assess' && (
                        <ReviewSelfAssess 
                            item={currentItem}
                            sentence={sentenceHtml}
                            userAnswer={userAnswer}
                            onAssess={handleAssess}
                        />
                    )}
                </div>

                <div className="wf-hint-bar">
                    {mode === 'text' && (
                        <>
                            <div className="wf-hint-text"><span className="wf-hint-key">Alt+G</span> Gợi ý <span style={{ marginLeft: '8px' }}><span className="wf-hint-key">Enter</span> Nộp</span></div>
                            <div className="wf-hint-text">Gõ chính xác từ cần điền (còn <strong>{timeLeft}</strong> giây)</div>
                        </>
                    )}
                    {mode === 'mcq' && (
                        <>
                            <div className="wf-hint-text"><span className="wf-hint-key">1-4</span> Chọn đáp án <span style={{ marginLeft: '8px' }}><span className="wf-hint-key">Enter</span> Nộp</span></div>
                            <div className="wf-hint-text">Bạn bắt buộc phải chọn 1 đáp án để tiếp tục</div>
                        </>
                    )}
                    {mode === 'feedback' && (
                        <>
                            <div className="wf-hint-text"><span className="wf-hint-key">Enter</span> Câu tiếp theo</div>
                            <div className="wf-hint-text">Đọc kỹ giải thích trước khi tiếp tục</div>
                        </>
                    )}
                    {mode === 'assess' && (
                        <>
                            <div className="wf-hint-text"><span className="wf-hint-key">1-3</span> Chọn mức độ</div>
                            <div className="wf-hint-text">Đánh giá trung thực giúp AI hiệu chỉnh lịch ôn tập hiệu quả nhất</div>
                        </>
                    )}
                </div>

                {/* Popups */}
                {popupType === 'hint' && <ReviewHintPopup item={currentItem} onClose={() => setPopupType(null)} />}
                {popupType === 'dictionary' && <ReviewDictionaryPopup item={currentItem} onClose={() => setPopupType(null)} />}
                {popupType === 'empty' && <ReviewEmptyErrorPopup onClose={() => setPopupType(null)} />}
            </div>
        </div>
    );
}
