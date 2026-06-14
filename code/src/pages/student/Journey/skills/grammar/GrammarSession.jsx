import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation, useBlocker } from 'react-router-dom';
import '../../../../../figma-uc5a.css';
import '../../../../../figma-uc08.css';
import '../../../../../figma-deleted.css';
import { grammarService } from '../../../../../services/grammarService';


import StepPreTest from './StepPreTest';
import StepPreTestResult from '../vocabulary/StepPreTestResult';
import StepGrammarRecognition from './StepGrammarRecognition';
import StepSessionResult from '../vocabulary/StepSessionResult';

import StepContext from './StepContext';
import StepDictation from './StepDictation';
import StepPronunciation from './StepPronunciation';
import StepMiniReview from './StepMiniReview';
import StepPatternAnalysis from './StepPatternAnalysis';
import StepCompareDifferentiate from './StepCompareDifferentiate';
import StepGrammarKnowledge from './StepGrammarKnowledge';
import StepSentenceBuilder from './StepSentenceBuilder';
import StepFreeWrite from './StepFreeWrite';

export default function GrammarSession() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const unitId = location.state?.unitId || 3;
  
  const [currentMode] = useState(searchParams.get('mode')?.toUpperCase() === 'DEEP' ? 'DEEP' : 'FAST');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentStep, setCurrentStep] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [currentPretestResult, setCurrentPretestResult] = useState(null); 
  const [itemStats, setItemStats] = useState({});

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

  useEffect(() => {
    grammarService.getGrammarLessons().then(data => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const totalStepsPerItem = currentMode === 'FAST' ? 10 : 11; 
  const progressPercent = items.length ? Math.round(((currentIndex * totalStepsPerItem + Math.min(currentStep, totalStepsPerItem)) / (items.length * totalStepsPerItem)) * 100) : 0;

  const goToNextItem = () => {
    if ((currentIndex + 1) % 3 === 0 && currentStep !== 99) {
      setCurrentStep(99);
    } else if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentStep(1); 
    } else {
      setIsFinished(true);
    }
  };

  const handleNext = (result = null) => {
    if (currentStep === 1) {
      setCurrentPretestResult(result?.correct ? 'correct' : 'wrong');
      setCurrentStep(2);
      return;
    }
    
    if (currentStep === 2) {
      if (result === 'skip') goToNextItem();
      else setCurrentStep(3); 
      return;
    }

    if (currentStep === 99) {
      goToNextItem();
      return;
    }

    if (currentMode === 'FAST') {
      switch (currentStep) {
        case 3: setCurrentStep(4); break; // Context -> Pattern Analysis
        case 4: setCurrentStep(6); break; // Pattern Analysis -> Knowledge (Skip 5)
        case 6: setCurrentStep(7); break; // Knowledge -> Recognition
        case 7: // Recognition
          if (result?.isPass === false) {
            setItemStats(prev => ({ ...prev, [items[currentIndex].id]: { isWeak: true } }));
          }
          setCurrentStep(8); 
          break; // Recognition -> Dictation
        case 8: setCurrentStep(9); break; // Dictation -> Pronunciation
        case 9: goToNextItem(); break; // Pronunciation -> Next (Skip Sentence Builder & Free Write)
        default: goToNextItem();
      }
    } else { // DEEP MODE
      switch (currentStep) {
        case 3: setCurrentStep(4); break; // Context -> Pattern Analysis
        case 4: setCurrentStep(5); break; // Pattern Analysis -> Compare
        case 5: setCurrentStep(6); break; // Compare -> Knowledge
        case 6: setCurrentStep(7); break; // Knowledge -> Recognition
        case 7: // Recognition (A-1 flow)
          if (result?.action === 'restart') {
            setCurrentStep(1); // Force restart
          } else {
            setCurrentStep(8); // Proceed
          }
          break;
        case 8: setCurrentStep(9); break; // Dictation -> Pronunciation
        case 9: setCurrentStep(10); break; // Pronunciation -> Sentence Builder
        case 10: setCurrentStep(11); break; // Sentence Builder -> Free Write
        case 11: goToNextItem(); break; // Free Write -> Next
        default: goToNextItem();
      }
    }
  };

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--canvas)' }}>Đang tải dữ liệu...</div>;

  if (isFinished) {
    // Reusing StepSessionResult, need to map items to words for compatibility
    return (
      <div className="student-srs-theme">
        <StepSessionResult words={items} unitId={unitId} mode={currentMode.toLowerCase()} wordStats={itemStats} skillType="grammar" />
      </div>
    );
  }

  const currentItemData = items[currentIndex];
  // Map grammar data to word format temporarily for reused components
  const mappedData = {
    ...currentItemData,
    word: currentItemData.title,
    meaning: currentItemData.meaning,
    contexts: currentItemData.contexts
  };

  let displayStepIndex = currentStep - 2; 
  if (currentStep <= 2) displayStepIndex = currentStep; 

  const stepProps = {
    wordData: mappedData,
    grammarData: currentItemData, // Pass actual grammar data to specific components
    mode: currentMode.toLowerCase(),
    onNext: handleNext,
    wordIndex: currentIndex,
    totalWords: items.length,
    stepIndex: displayStepIndex, 
    totalSteps: currentMode === 'FAST' ? 6 : 9, 
    progressPercent: progressPercent > 100 ? 100 : progressPercent,
    unitId,
    words: items // For minireview
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <StepPreTest {...stepProps} />;
      case 2: return <StepPreTestResult {...stepProps} pretestResult={currentPretestResult} skillType="grammar" />;
      case 3: return <StepContext {...stepProps} stepIndex={1} />;
      case 4: return <StepPatternAnalysis {...stepProps} stepIndex={2} />;
      case 5: return <StepCompareDifferentiate {...stepProps} stepIndex={3} />;
      case 6: return <StepGrammarKnowledge {...stepProps} stepIndex={currentMode === 'FAST' ? 3 : 4} />;
      case 7: return <StepGrammarRecognition {...stepProps} stepIndex={currentMode === 'FAST' ? 4 : 5} />;
      case 8: return <StepDictation {...stepProps} stepIndex={currentMode === 'FAST' ? 5 : 6} />;
      case 9: return <StepPronunciation {...stepProps} stepIndex={currentMode === 'FAST' ? 6 : 7} />;
      case 10: return <StepSentenceBuilder {...stepProps} stepIndex={8} />;
      case 11: return <StepFreeWrite {...stepProps} stepIndex={9} />;
      case 99: return <StepMiniReview {...stepProps} stepIndex={currentMode === 'FAST' ? 7 : 10} />;
      default: return <div>Invalid Step</div>;
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
