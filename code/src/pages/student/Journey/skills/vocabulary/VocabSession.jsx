import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation, useBlocker } from 'react-router-dom';
import '../../../../../figma-uc5a.css';
import '../../../../../figma-uc08.css';
import '../../../../../figma-deleted.css';
import { mockVocabularyData } from '../../../../../mockdata/lesson/vocabularyData';

import StepPreTest from './StepPreTest';
import StepPreTestResult from './StepPreTestResult';
import StepContext from './StepContext';
import StepRecognition from './StepRecognition';
import StepKnowledge from './StepKnowledge';
import StepDictation from './StepDictation';
import StepPronunciation from './StepPronunciation';
import StepSentence from './StepSentence';
import StepFillBlank from './StepFillBlank';
import StepMiniReview from './StepMiniReview';
import StepSessionResult from './StepSessionResult';

export default function VocabSession() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const unitId = location.state?.unitId || 3;
  
  const [currentMode] = useState(searchParams.get('mode')?.toUpperCase() === 'DEEP' ? 'DEEP' : 'FAST');
  const words = mockVocabularyData;

  // -- STATE MACHINE VARIABLES --
  const [currentStep, setCurrentStep] = useState(1);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [currentWordPretestResult, setCurrentWordPretestResult] = useState(null); // 'correct' or 'wrong'
  const [wordStats, setWordStats] = useState({});

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      !isFinished && currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    if (isFinished) return;
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isFinished]);

  const totalStepsPerWord = currentMode === 'FAST' ? 7 : 8; // Pretest (1) + Result (2) + Learning (3..N)
  const progressPercent = Math.round(((currentWordIndex * totalStepsPerWord + Math.min(currentStep, totalStepsPerWord)) / (words.length * totalStepsPerWord)) * 100);

  const goToNextWord = () => {
    if ((currentWordIndex + 1) % 3 === 0 && currentStep !== 99) {
      // Trigger Mini Review (Let's map it to step 99 so it doesn't conflict)
      setCurrentStep(99);
    } else if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setCurrentStep(1); // Go to pretest of next word
    } else {
      setIsFinished(true);
    }
  };

  const handleNext = (result = null) => {
    if (currentStep === 1) {
      // From Pretest to Pretest Result
      setCurrentWordPretestResult(result.correct ? 'correct' : 'wrong');
      setCurrentStep(2);
      return;
    }
    
    if (currentStep === 2) {
      // From Pretest Result.
      if (result === 'skip') {
        goToNextWord();
      } else {
        setCurrentStep(3); // Context
      }
      return;
    }

    if (currentStep === 99) {
      goToNextWord();
      return;
    }

    if (currentMode === 'FAST') {
      switch (currentStep) {
        case 3: setCurrentStep(4); break; // Context -> Recognition
        case 4: setCurrentStep(5); break; // Recognition -> Knowledge
        case 5: setCurrentStep(6); break; // Knowledge -> Dictation
        case 6: setCurrentStep(7); break; // Dictation -> Pronunciation
        case 7: goToNextWord(); break;
        default: goToNextWord();
      }
    } else { // DEEP MODE
      switch (currentStep) {
        case 3: setCurrentStep(4); break;
        case 4: 
          if (result === 'weak') {
            setWordStats(prev => ({ ...prev, [words[currentWordIndex].id]: { isWeak: true } }));
          }
          setCurrentStep(5); 
          break;
        case 5: setCurrentStep(6); break;
        case 6: setCurrentStep(7); break;
        case 7: 
          if (result === 'weak') {
            setWordStats(prev => ({ ...prev, [words[currentWordIndex].id]: { isWeak: true } }));
          }
          if (result === 'skip_to_next') {
            goToNextWord();
          } else {
            setCurrentStep(8);
          }
          break;
        case 8: 
          if (result === 'error') {
            setWordStats(prev => ({ ...prev, [words[currentWordIndex].id]: { isWeak: true } }));
            setCurrentStep(9);
          } else {
            goToNextWord();
          }
          break;
        case 9: goToNextWord(); break;
        default: goToNextWord();
      }
    }
  };

  if (isFinished) {
    return (
      <div className="student-srs-theme">
        <StepSessionResult words={words} unitId={unitId} mode={currentMode.toLowerCase()} wordStats={wordStats} />
      </div>
    );
  }

  const currentWordData = words[currentWordIndex];

  // For steps 3+, we want stepIndex to reflect learning steps
  let displayStepIndex = currentStep - 2; 
  if (currentStep <= 2) displayStepIndex = currentStep; // Pretest is 1, Result is 2

  const stepProps = {
    wordData: currentWordData,
    mode: currentMode.toLowerCase(),
    onNext: handleNext,
    wordIndex: currentWordIndex,
    totalWords: words.length,
    stepIndex: displayStepIndex, 
    totalSteps: currentMode === 'FAST' ? 5 : 6, // UI visual display of learning steps
    progressPercent: progressPercent > 100 ? 100 : progressPercent,
    unitId,
    words
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        // Pretest
        return <StepPreTest {...stepProps} />;
      case 2:
        // Pretest Result
        return <StepPreTestResult {...stepProps} pretestResult={currentWordPretestResult} />;
      case 3: return <StepContext {...stepProps} stepIndex={1} />;
      case 4: return <StepRecognition {...stepProps} stepIndex={2} />;
      case 5: return <StepKnowledge {...stepProps} stepIndex={3} />;
      case 6: return <StepDictation {...stepProps} stepIndex={4} />;
      case 7: return <StepPronunciation {...stepProps} stepIndex={5} />;
      case 8: return <StepSentence {...stepProps} stepIndex={6} />;
      case 9: return <StepFillBlank {...stepProps} stepIndex={7} />;
      case 99:
        return <StepMiniReview words={words} wordIndex={currentWordIndex} mode={currentMode.toLowerCase()} onNext={handleNext} unitId={unitId} progressPercent={progressPercent} />;
      default:
        return <div>Invalid Step</div>;
    }
  };

  return (
    <div className="student-srs-theme w-full flex flex-col" style={{ position: 'relative' }}>
      <div 
        className="flex flex-col w-full"
        style={blocker.state === 'blocked' ? { opacity: 0.35, filter: 'blur(1.5px)', pointerEvents: 'none' } : {}}
      >
        {renderStep()}
      </div>

      {/* Exit Confirmation Modal */}
      {blocker.state === 'blocked' && (
        <div className="modal-overlay" style={{ zIndex: 1000, position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(28, 27, 46, 0.45)', backdropFilter: 'blur(8px)' }}>
          <div className="modal-box" style={{ width: '460px', textAlign: 'center', alignItems: 'center', padding: '36px', borderRadius: 'var(--rounded-xxl)', backgroundColor: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: '24px', boxShadow: '0 20px 48px rgba(28, 27, 46, 0.2)' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.08)', color: 'var(--error)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <span style={{ fontFamily: 'var(--font-primary)', fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>Rời khỏi trang học tập?</span>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>Tiến trình học hiện tại của bạn sẽ bị hủy và không được lưu lại. Bạn có chắc chắn muốn rời đi?</p>
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
