import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useBlocker } from 'react-router-dom';
import { useToastStore } from '../../store/toastStore';
import '../../figma-uc5a.css';
import '../../figma-uc08.css';
import '../../figma-deleted.css';
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
    const { addToast } = useToastStore();
    const [status, setStatus] = useState('dashboard'); // 'dashboard', 'running', 'summary'
    const [currentIdx, setCurrentIdx] = useState(0);

    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            status === 'running' && currentLocation.pathname !== nextLocation.pathname
    );

    useEffect(() => {
        if (status !== 'running') return;
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [status]);
    
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
            addToast("Ôn tập thành công! Bạn đã hoàn thành phiên ôn tập.", "success");
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
            <div className="student-srs-theme srs-review-wrapper w-full flex flex-col">
                <ReviewDashboard stats={stats} onStart={handleStart} />
            </div>
        );
    }

    if (status === 'summary') {
        return (
            <div className="student-srs-theme srs-review-wrapper w-full flex flex-col">
                <ReviewSummary stats={{...stats, totalReviewed: currentIdx + (mode === 'assess' ? 1 : 0)}} onGoHome={() => navigate('/')} />
            </div>
        );
    }

    const isCorrect = userAnswer.toLowerCase().trim() === currentItem.word.toLowerCase();
    const sentenceHtml = currentItem.sentence.replace('______', mode === 'feedback' || mode === 'assess' ? `<strong>${currentItem.word}</strong>` : '______');

    return (
        <div className="student-srs-theme srs-review-wrapper w-full flex flex-col" style={{ position: 'relative' }}>
            <div 
                className="wf-main-content w-full flex flex-col relative animate-fade-in"
                style={blocker.state === 'blocked' ? { opacity: 0.35, filter: 'blur(1.5px)', pointerEvents: 'none' } : {}}
            >
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

                <div className="flex justify-between items-center bg-primary/5 border border-primary/20 rounded-xl p-4 mt-6 text-sm text-primary">
                    {mode === 'text' && (
                        <>
                            <div className="flex flex-wrap items-center gap-4"><kbd className="bg-white px-1.5 py-0.5 border rounded shadow-sm text-xs font-semibold mr-1 text-text-primary">Alt+G</kbd> Gợi ý <span style={{ marginLeft: '8px' }}><kbd className="bg-white px-1.5 py-0.5 border rounded shadow-sm text-xs font-semibold mr-1 text-text-primary">Enter</kbd> Nộp</span></div>
                            <div className="text-xs text-text-secondary opacity-80 hidden md:block">Gõ chính xác từ cần điền (còn <strong>{timeLeft}</strong> giây)</div>
                        </>
                    )}
                    {mode === 'mcq' && (
                        <>
                            <div className="wf-hint-text"><kbd className="bg-white px-1.5 py-0.5 border rounded shadow-sm text-xs font-semibold mr-1 text-text-primary">1-4</kbd> Chọn đáp án <span style={{ marginLeft: '8px' }}><kbd className="bg-white px-1.5 py-0.5 border rounded shadow-sm text-xs font-semibold mr-1 text-text-primary">Enter</kbd> Nộp</span></div>
                            <div className="wf-hint-text">Bạn bắt buộc phải chọn 1 đáp án để tiếp tục</div>
                        </>
                    )}
                    {mode === 'feedback' && (
                        <>
                            <div className="wf-hint-text"><kbd className="bg-white px-1.5 py-0.5 border rounded shadow-sm text-xs font-semibold mr-1 text-text-primary">Enter</kbd> Câu tiếp theo</div>
                            <div className="wf-hint-text">Đọc kỹ giải thích trước khi tiếp tục</div>
                        </>
                    )}
                    {mode === 'assess' && (
                        <>
                            <div className="wf-hint-text"><kbd className="bg-white px-1.5 py-0.5 border rounded shadow-sm text-xs font-semibold mr-1 text-text-primary">1-3</kbd> Chọn mức độ</div>
                            <div className="wf-hint-text">Đánh giá trung thực giúp AI hiệu chỉnh lịch ôn tập hiệu quả nhất</div>
                        </>
                    )}
                </div>

                {/* Popups */}
                {popupType === 'hint' && <ReviewHintPopup item={currentItem} onClose={() => setPopupType(null)} />}
                {popupType === 'dictionary' && <ReviewDictionaryPopup item={currentItem} onClose={() => setPopupType(null)} />}
                {popupType === 'empty' && <ReviewEmptyErrorPopup onClose={() => setPopupType(null)} />}
            </div>

            {/* Exit Confirmation Modal */}
            {blocker.state === 'blocked' && (
                <div className="modal-overlay" style={{ zIndex: 1000, position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(28, 27, 46, 0.45)', backdropFilter: 'blur(8px)' }}>
                    <div className="modal-box" style={{ width: '460px', textAlign: 'center', alignItems: 'center', padding: '36px', borderRadius: 'var(--rounded-xxl)', backgroundColor: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: '24px', boxShadow: '0 20px 48px rgba(28, 27, 46, 0.2)' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.08)', color: 'var(--error)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        </div>
                        <span style={{ fontFamily: 'var(--font-primary)', fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>Rời khỏi trang ôn tập?</span>
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>Tiến trình ôn tập hiện tại của bạn sẽ bị hủy và không được lưu lại. Bạn có chắc chắn muốn rời đi?</p>
                        <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
                            <button 
                                onClick={() => blocker.reset()} 
                                className="btn-secondary" 
                                style={{ flex: 1, padding: '12px', borderRadius: 'var(--rounded-lg)', fontWeight: '700', cursor: 'pointer', border: '1px solid rgba(78, 86, 192, 0.12)', backgroundColor: 'var(--surface)', color: 'var(--text-secondary)' }}
                            >
                                Làm tiếp
                            </button>
                            <button 
                                onClick={() => blocker.proceed()} 
                                className="btn-danger" 
                                style={{ flex: 1, padding: '12px', borderRadius: 'var(--rounded-lg)', fontWeight: '700', cursor: 'pointer', backgroundColor: 'var(--error)', color: '#fff', border: 'none' }}
                            >
                                Rời đi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
