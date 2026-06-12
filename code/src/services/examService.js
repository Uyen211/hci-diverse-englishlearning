import { initialExams } from "../mockdata/exams";

const STORAGE_KEY = "diveverse_exams";
const ATTEMPTS_KEY = "diveverse_exam_attempts";

function getRawExams() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialExams));
    return initialExams;
  }
  try {
    const exams = JSON.parse(stored);
    // Refresh storage if length or structure does not match our new 3-exam setup
    const hasCorrectSetup = exams.length === 3 && exams.some(e => e.id === "exam-placement") && exams.find(e => e.id === "exam-1")?.questions?.length > 2;
    if (!hasCorrectSetup) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialExams));
      return initialExams;
    }
    return exams;
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialExams));
    return initialExams;
  }
}

function saveRawExams(exams) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(exams));
}

function getRawAttempts() {
  const stored = localStorage.getItem(ATTEMPTS_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

function saveRawAttempts(attempts) {
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
}

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const examService = {
  async getExams() {
    await delay();
    return getRawExams();
  },

  async getExamById(id) {
    await delay();
    const exams = getRawExams();
    return exams.find(e => e.id === id) || null;
  },

  async getAttempts() {
    await delay();
    return getRawAttempts();
  },

  async getAttemptByExamId(examId) {
    await delay();
    const attempts = getRawAttempts();
    return attempts.find(a => a.examId === examId) || null;
  },

  async saveAttempt(examId, answers, scoreDetails) {
    await delay();
    const attempts = getRawAttempts();
    
    // Remove existing attempt if any to support retaking exams
    const filtered = attempts.filter(a => a.examId !== examId);
    
    const newAttempt = {
      examId,
      answers,
      score: scoreDetails.score,
      maxScore: scoreDetails.maxScore || 100,
      skillsBreakdown: scoreDetails.skillsBreakdown || {},
      submittedAt: new Date().toISOString()
    };
    
    filtered.push(newAttempt);
    saveRawAttempts(filtered);
    return newAttempt;
  },

  async addExam(examData) {
    await delay();
    const exams = getRawExams();
    const newExam = {
      id: `exam-${Math.random().toString(36).substr(2, 9)}`,
      title: examData.title.trim(),
      type: examData.type || "Mini-test",
      levelId: examData.levelId || null,
      unitId: examData.unitId || null,
      questionsCount: examData.questions?.length || 0,
      duration: parseInt(examData.duration, 10) || 15,
      attempts: "0",
      questions: examData.questions || []
    };
    exams.push(newExam);
    saveRawExams(exams);
    return newExam;
  },

  async updateExam(id, updatedData) {
    await delay();
    const exams = getRawExams();
    const index = exams.findIndex(e => e.id === id);
    if (index === -1) {
      throw new Error("Bài kiểm tra không tồn tại.");
    }
    exams[index] = {
      ...exams[index],
      title: updatedData.title.trim(),
      type: updatedData.type || "Mini-test",
      levelId: updatedData.levelId || null,
      unitId: updatedData.unitId || null,
      questionsCount: updatedData.questions?.length || 0,
      duration: parseInt(updatedData.duration, 10) || 15,
      questions: updatedData.questions || []
    };
    saveRawExams(exams);
    return exams[index];
  },

  async deleteExam(id) {
    await delay();
    const exams = getRawExams();
    const filtered = exams.filter(e => e.id !== id);
    saveRawExams(filtered);
    return true;
  }
};
