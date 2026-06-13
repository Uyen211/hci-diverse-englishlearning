import { initialUnits } from "../mockdata/units";

const STORAGE_KEY = "diveverse_units";

function getRawUnits() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialUnits));
    return initialUnits;
  }
  try {
    const parsed = JSON.parse(stored);
    let modified = false;
    const sanitized = parsed.map(unit => {
      let isUnitMod = false;
      if (unit.examSkill === undefined || unit.examSkill === null) { unit.examSkill = "TOEIC"; isUnitMod = true; }
      if (unit.skills === undefined || unit.skills === null) { unit.skills = "Nghe, Nói"; isUnitMod = true; }
      if (isUnitMod) modified = true;
      return unit;
    });
    if (modified) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
    }
    return sanitized;
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialUnits));
    return initialUnits;
  }
}

function saveRawUnits(units) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(units));
}

export const unitService = {
  async getUnits() {
    return getRawUnits();
  },

  async getUnitsByLevel(levelId) {
    const units = getRawUnits();
    return units
      .filter(u => u.levelId === levelId)
      .sort((a, b) => a.sequence.localeCompare(b.sequence, undefined, { numeric: true, sensitivity: 'base' }));
  },

  async addUnit(unitData) {
    const units = getRawUnits();
    
    const levelId = unitData.levelId;
    const levelUnits = units.filter(u => u.levelId === levelId);
    const nextSeqNum = levelUnits.length + 1;
    const sequenceStr = `Unit ${nextSeqNum < 10 ? '0' + nextSeqNum : nextSeqNum}`;

    let derivedSkills = "Nghe, Nói";
    const skillType = unitData.examSkill || "TOEIC";
    if (skillType === "TOEIC") {
      derivedSkills = (nextSeqNum % 2 === 0) ? "Đọc, Viết" : "Nghe, Nói";
    } else if (skillType === "IELTS") {
      derivedSkills = "Nghe, Nói, Đọc, Viết";
    } else if (skillType === "VSTEP") {
      derivedSkills = "Nghe, Đọc, Viết";
    }

    const newUnit = {
      id: `unit-${Math.random().toString(36).substr(2, 9)}`,
      levelId: levelId,
      sequence: sequenceStr,
      title: unitData.title.trim(),
      topic: unitData.topic.trim(),
      examSkill: skillType,
      vocabulary: unitData.vocabulary.trim(),
      grammar: unitData.grammar.trim(),
      skills: derivedSkills
    };

    units.push(newUnit);
    saveRawUnits(units);
    
    // Update the unitCount in levels database
    updateLevelUnitCount(levelId, 1);
    
    return newUnit;
  },

  async updateUnit(id, updatedData) {
    const units = getRawUnits();
    const index = units.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error("Unit không tồn tại hoặc đã bị xóa.");
    }

    const targetLevelId = units[index].levelId;
    const levelUnits = units.filter(u => u.levelId === targetLevelId);
    const seqIndex = levelUnits.findIndex(u => u.id === id) + 1;
    const activeSeqNum = seqIndex > 0 ? seqIndex : 1;

    let derivedSkills = "Nghe, Nói";
    const skillType = updatedData.examSkill || "TOEIC";
    if (skillType === "TOEIC") {
      derivedSkills = (activeSeqNum % 2 === 0) ? "Đọc, Viết" : "Nghe, Nói";
    } else if (skillType === "IELTS") {
      derivedSkills = "Nghe, Nói, Đọc, Viết";
    } else if (skillType === "VSTEP") {
      derivedSkills = "Nghe, Đọc, Viết";
    }

    units[index] = {
      ...units[index],
      title: updatedData.title.trim(),
      topic: updatedData.topic.trim(),
      examSkill: skillType,
      vocabulary: updatedData.vocabulary.trim(),
      grammar: updatedData.grammar.trim(),
      skills: derivedSkills
    };

    saveRawUnits(units);
    return units[index];
  },

  async deleteUnit(id) {
    const units = getRawUnits();
    const unitToDelete = units.find(u => u.id === id);
    if (!unitToDelete) return true;

    let filtered = units.filter(u => u.id !== id);
    
    // Re-sequence the remaining units of this level
    const targetLevelId = unitToDelete.levelId;
    const levelUnits = filtered.filter(u => u.levelId === targetLevelId);
    levelUnits.forEach((u, i) => {
      const currentNum = i + 1;
      u.sequence = `Unit ${currentNum < 10 ? '0' + currentNum : currentNum}`;
      
      let derivedSkills = "Nghe, Nói";
      const skillType = u.examSkill || "TOEIC";
      if (skillType === "TOEIC") {
        derivedSkills = (currentNum % 2 === 0) ? "Đọc, Viết" : "Nghe, Nói";
      } else if (skillType === "IELTS") {
        derivedSkills = "Nghe, Nói, Đọc, Viết";
      } else if (skillType === "VSTEP") {
        derivedSkills = "Nghe, Đọc, Viết";
      }
      u.skills = derivedSkills;
    });

    saveRawUnits(filtered);
    
    // Decrement unit count in level
    updateLevelUnitCount(unitToDelete.levelId, -1);
    
    return true;
  },

  async getUnitCountsForLevels() {
    const units = getRawUnits();
    const counts = {};
    units.forEach(u => {
      counts[u.levelId] = (counts[u.levelId] || 0) + 1;
    });
    return counts;
  }
};

// Helper function to update level counts in localStorage level db
function updateLevelUnitCount(levelId, increment) {
  try {
    const storedLevels = localStorage.getItem("diveverse_levels");
    if (storedLevels) {
      const levels = JSON.parse(storedLevels);
      const lvlIndex = levels.findIndex(l => l.id === levelId);
      if (lvlIndex !== -1) {
        levels[lvlIndex].lessonCount = Math.max(0, (levels[lvlIndex].lessonCount || 0) + (increment * 8));
        localStorage.setItem("diveverse_levels", JSON.stringify(levels));
      }
    }
  } catch (e) {
    console.error("Lỗi đồng bộ unitCount:", e);
  }
}
