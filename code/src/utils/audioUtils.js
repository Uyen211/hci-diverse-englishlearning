/**
 * Phát âm thanh văn bản tiếng Anh sử dụng Web Speech API có sẵn của trình duyệt.
 * Hỗ trợ đọc từ vựng đơn lẻ, cụm từ (chunks) và cả câu dài.
 * 
 * @param {string} text Văn bản cần phát âm (VD: "accomplish", "make a decision")
 * @param {number} rate Tốc độ đọc (mặc định 1.0, có thể giảm xuống 0.8 để đọc chậm)
 */
export const playTextToSpeech = (text, rate = 1.0) => {
  if (!('speechSynthesis' in window)) {
    console.warn("Trình duyệt của bạn không hỗ trợ Web Speech API.");
    return;
  }

  // Hủy các giọng đọc đang phát trước đó (nếu có)
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Thiết lập ngôn ngữ là tiếng Anh Mỹ
  utterance.lang = 'en-US';
  utterance.rate = rate;
  utterance.pitch = 1.0;

  // Cố gắng tìm giọng đọc tiếng Anh tự nhiên nhất có sẵn trên máy
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find(voice => voice.lang.startsWith('en') && voice.name.includes('Google')) 
                    || voices.find(voice => voice.lang.startsWith('en'));
                    
  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  window.speechSynthesis.speak(utterance);
};
