import { initialLessons } from "../mockdata/lessons";

const STORAGE_KEY = "diveverse_lessons";

function getRawLessons() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialLessons));
    return initialLessons;
  }
  try {
    return JSON.parse(stored);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialLessons));
    return initialLessons;
  }
}

function saveRawLessons(lessons) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lessons));
}

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to dynamically count lessons and update level's lessonCount
function syncLevelLessonCount(unitId) {
  try {
    // 1. Get levelId from units database
    const storedUnits = localStorage.getItem("diveverse_units");
    if (!storedUnits) return;
    const units = JSON.parse(storedUnits);
    const targetUnit = units.find(u => u.id === unitId);
    if (!targetUnit) return;
    const levelId = targetUnit.levelId;

    // 2. Find all units belonging to this levelId
    const levelUnitIds = units.filter(u => u.levelId === levelId).map(u => u.id);

    // 3. Count total lessons that belong to those unit IDs
    const lessons = getRawLessons();
    const totalLessons = lessons.filter(l => levelUnitIds.includes(l.unitId)).length;

    // 4. Update the level's lessonCount
    const storedLevels = localStorage.getItem("diveverse_levels");
    if (storedLevels) {
      const levels = JSON.parse(storedLevels);
      const lvlIndex = levels.findIndex(l => l.id === levelId);
      if (lvlIndex !== -1) {
        levels[lvlIndex].lessonCount = totalLessons;
        localStorage.setItem("diveverse_levels", JSON.stringify(levels));
      }
    }
  } catch (e) {
    console.error("Lỗi đồng bộ lessonCount cho Level:", e);
  }
}

export const lessonService = {
  async getLessons() {
    await delay();
    return getRawLessons();
  },

  async getLessonsByUnitId(unitId) {
    await delay();
    const lessons = getRawLessons();
    return lessons
      .filter(l => l.unitId === unitId)
      .sort((a, b) => a.sequence.localeCompare(b.sequence, undefined, { numeric: true, sensitivity: 'base' }));
  },

  async addLesson(lessonData, exerciseType = "", configData = {}) {
    await delay();
    const lessons = getRawLessons();

    const unitId = lessonData.unitId;
    const unitLessons = lessons.filter(l => l.unitId === unitId);
    const nextSeqNum = unitLessons.length + 1;
    const sequenceStr = nextSeqNum < 10 ? `0${nextSeqNum}` : `${nextSeqNum}`;

    const newLesson = {
      id: `lesson-${Math.random().toString(36).substr(2, 9)}`,
      unitId: unitId,
      sequence: sequenceStr,
      title: lessonData.title.trim(),
      subtitle: (lessonData.subtitle || "").trim(),
      genre: lessonData.genre,
      status: exerciseType ? "completed" : "pending",
      exerciseType: exerciseType,
      config: configData
    };

    lessons.push(newLesson);
    saveRawLessons(lessons);

    // Sync lessonCount
    syncLevelLessonCount(unitId);

    return newLesson;
  },

  async updateLesson(id, updatedData) {
    await delay();
    const lessons = getRawLessons();
    const index = lessons.findIndex(l => l.id === id);
    if (index === -1) {
      throw new Error("Bài học không tồn tại hoặc đã bị xóa.");
    }

    lessons[index] = {
      ...lessons[index],
      title: updatedData.title.trim(),
      subtitle: (updatedData.subtitle || "").trim(),
      genre: updatedData.genre,
      exerciseType: updatedData.exerciseType || "",
      config: updatedData.config || {},
      status: updatedData.exerciseType ? "completed" : "pending"
    };

    saveRawLessons(lessons);
    return lessons[index];
  },

  async updateLessonConfig(id, exerciseType, configData) {
    await delay();
    const lessons = getRawLessons();
    const index = lessons.findIndex(l => l.id === id);
    if (index === -1) {
      throw new Error("Bài học không tồn tại hoặc đã bị xóa.");
    }

    lessons[index] = {
      ...lessons[index],
      exerciseType: exerciseType,
      config: configData,
      status: "completed"
    };

    saveRawLessons(lessons);
    return lessons[index];
  },

  async deleteLesson(id) {
    await delay();
    const lessons = getRawLessons();
    const lessonToDelete = lessons.find(l => l.id === id);
    if (!lessonToDelete) return true;

    const unitId = lessonToDelete.unitId;
    let filtered = lessons.filter(l => l.id !== id);

    // Re-sequence the remaining lessons of this unit
    const unitLessons = filtered.filter(l => l.unitId === unitId);
    unitLessons.forEach((l, i) => {
      const currentNum = i + 1;
      l.sequence = currentNum < 10 ? `0${currentNum}` : `${currentNum}`;
    });

    saveRawLessons(filtered);

    // Sync lessonCount
    syncLevelLessonCount(unitId);

    return true;
  }
};
