import { initialExams } from "../mockdata/exams";

const STORAGE_KEY = "diveverse_exams";

function getRawExams() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialExams));
    return initialExams;
  }
  try {
    return JSON.parse(stored);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialExams));
    return initialExams;
  }
}

function saveRawExams(exams) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(exams));
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
