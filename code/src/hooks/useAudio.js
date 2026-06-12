import { useCallback } from 'react';

export function useAudio() {
  const playTextToSpeech = useCallback((text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Text-to-speech not supported in this browser.');
    }
  }, []);

  const playSuccessEarcon = useCallback(() => {
    try {
      const audio = new Audio('/assets/audio/success.mp3');
      audio.play().catch(e => console.log('Audio play blocked or file not found', e));
    } catch (e) {
      // ignore
    }
  }, []);

  const playErrorEarcon = useCallback(() => {
    try {
      const audio = new Audio('/assets/audio/error.mp3');
      audio.play().catch(e => console.log('Audio play blocked or file not found', e));
    } catch (e) {
      // ignore
    }
  }, []);

  return { playTextToSpeech, playSuccessEarcon, playErrorEarcon };
}
