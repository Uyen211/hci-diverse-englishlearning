/**
 * Tiện ích phát âm thanh phản hồi (Earcons) dùng Web Audio API.
 * Giúp tạo các âm thanh bíp cơ bản mà không cần file audio nặng.
 */

const audioCtx = typeof window !== 'undefined' ? new (window.AudioContext || window.webkitAudioContext)() : null;

function playTone(freq, type, duration, vol) {
  if (!audioCtx) return;
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  oscillator.type = type;
  oscillator.frequency.value = freq;
  
  gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration);
}

// m thanh thành công (Ting! - Cao và vui tươi)
export const playSuccessEarcon = () => {
  if (audioCtx?.state === 'suspended') audioCtx.resume();
  playTone(600, 'sine', 0.1, 0.5);
  setTimeout(() => playTone(800, 'sine', 0.2, 0.5), 100);
};

// m thanh lỗi (Buzzer - Trầm và rè)
export const playErrorEarcon = () => {
  if (audioCtx?.state === 'suspended') audioCtx.resume();
  playTone(200, 'sawtooth', 0.15, 0.5);
  setTimeout(() => playTone(150, 'sawtooth', 0.2, 0.5), 150);
};

// m thanh hết giờ (Bíp dài, khẩn cấp)
export const playTimeoutEarcon = () => {
  if (audioCtx?.state === 'suspended') audioCtx.resume();
  playTone(400, 'square', 0.5, 0.4);
  setTimeout(() => playTone(400, 'square', 0.5, 0.4), 600);
};
