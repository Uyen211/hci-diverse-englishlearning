import React, { useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { mockGrammarData } from '../../../../../mockdata/lesson/grammarData';
import './grammar-figma.css';

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
  const items = mockGrammarData;

  const [currentStep, setCurrentStep] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [currentPretestResult, setCurrentPretestResult] = useState(null); 
  const [itemStats, setItemStats] = useState({});

  const totalStepsPerItem = currentMode === 'FAST' ? 10 : 11; 
  const progressPercent = Math.round(((currentIndex * totalStepsPerItem + Math.min(currentStep, totalStepsPerItem)) / (items.length * totalStepsPerItem)) * 100);

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

  if (isFinished) {
    // Reusing StepSessionResult, need to map items to words for compatibility
    return <StepSessionResult words={items} unitId={unitId} mode={currentMode.toLowerCase()} wordStats={itemStats} type="grammar" />;
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
      case 2: return <StepPreTestResult {...stepProps} pretestResult={currentPretestResult} />;
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--canvas)' }}>
      {renderStep()}
    </div>
  );
}
