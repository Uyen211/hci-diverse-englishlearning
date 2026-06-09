import { initialLevels } from "../mockdata/levels";

const STORAGE_KEY = "diveverse_levels";

function getRawLevels() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialLevels));
    return initialLevels;
  }
  try {
    const parsed = JSON.parse(stored);
    let modified = false;
    const sanitized = parsed.map(lvl => {
      let isLvlMod = false;
      if (lvl.lessonCount === undefined || lvl.lessonCount === null) { lvl.lessonCount = 12; isLvlMod = true; }
      if (lvl.activeUsers === undefined || lvl.activeUsers === null) { lvl.activeUsers = "1,200"; isLvlMod = true; }
      if (lvl.descriptionShort === undefined) { lvl.descriptionShort = ""; isLvlMod = true; }
      if (lvl.descriptionDetail === undefined) { lvl.descriptionDetail = ""; isLvlMod = true; }
      if (lvl.avgProgress === undefined) { lvl.avgProgress = 0; isLvlMod = true; }
      if (isLvlMod) modified = true;
      return lvl;
    });
    if (modified) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
    }
    return sanitized;
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialLevels));
    return initialLevels;
  }
}

function saveRawLevels(levels) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(levels));
}

const delay = (ms = 350) => new Promise(resolve => setTimeout(resolve, ms));

function inferCefr(ieltsTarget) {
  const targetStr = ieltsTarget || "";
  const nums = targetStr.match(/\d+(\.\d+)?/g);
  if (nums) {
    const maxScore = Math.max(...nums.map(Number));
    if (maxScore >= 7.0) {
      return { cefr: "C1 - C2 Thành thạo", cefrShort: "C1" };
    } else if (maxScore >= 5.0) {
      return { cefr: "B1 - B2 Độc lập", cefrShort: "B1" };
    }
  }
  return { cefr: "A1 - Người mới bắt đầu", cefrShort: "A1" };
}

export const levelService = {
  async getLevels() {
    await delay();
    return getRawLevels();
  },

  async addLevel(levelData) {
    await delay();
    const levels = getRawLevels();
    
    const nameClean = levelData.name.trim();
    if (levels.some(l => l.name.toLowerCase() === nameClean.toLowerCase())) {
      throw new Error(`Cấp độ "${nameClean}" đã tồn tại.`);
    }

    const { cefr, cefrShort } = inferCefr(levelData.ieltsTarget);

    const newLevel = {
      id: `lvl-${Math.random().toString(36).substr(2, 9)}`,
      cefr: cefr,
      cefrShort: cefrShort,
      name: nameClean,
      descriptionShort: levelData.descriptionShort.trim(),
      descriptionDetail: levelData.descriptionDetail.trim(),
      lessonCount: levelData.lessonCount || 12,
      activeUsers: levelData.activeUsers || "1,200",
      ieltsTarget: levelData.ieltsTarget.trim(),
      toeicTarget: levelData.toeicTarget.trim(),
      avgProgress: 0,
      status: "active"
    };

    levels.push(newLevel);
    saveRawLevels(levels);
    return newLevel;
  },

  async updateLevel(id, updatedData) {
    await delay();
    const levels = getRawLevels();
    const index = levels.findIndex(l => l.id === id);
    if (index === -1) {
      throw new Error("Cấp độ không tồn tại hoặc đã bị xóa.");
    }

    const nameClean = updatedData.name.trim();
    if (levels[index].name.toLowerCase() !== nameClean.toLowerCase() && 
        levels.some(l => l.name.toLowerCase() === nameClean.toLowerCase())) {
      throw new Error(`Cấp độ "${nameClean}" đã tồn tại.`);
    }

    const { cefr, cefrShort } = inferCefr(updatedData.ieltsTarget);

    levels[index] = {
      ...levels[index],
      cefr: cefr,
      cefrShort: cefrShort,
      name: nameClean,
      descriptionShort: updatedData.descriptionShort.trim(),
      descriptionDetail: updatedData.descriptionDetail.trim(),
      ieltsTarget: updatedData.ieltsTarget.trim(),
      toeicTarget: updatedData.toeicTarget.trim(),
      lessonCount: updatedData.lessonCount || levels[index].lessonCount,
      activeUsers: updatedData.activeUsers || levels[index].activeUsers
    };

    saveRawLevels(levels);
    return levels[index];
  },

  async deleteLevel(id) {
    await delay();
    const levels = getRawLevels();
    const filtered = levels.filter(l => l.id !== id);
    saveRawLevels(filtered);
    return true;
  }
};
