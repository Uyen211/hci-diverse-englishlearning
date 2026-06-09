export const speakingLessons = [
  {
    id: "lesson-2",
    unitId: "unit-1",
    sequence: "02",
    title: "Self-Introduction",
    subtitle: "Cấu trúc giới thiệu bản thân sơ cấp",
    genre: "Nói",
    status: "completed",
    exerciseType: "Hội thoại nhập vai với AI",
    config: {
      // AI Roleplay config
      context: "Tình huống: Bạn và một đồng nghiệp nước ngoài đang thảo luận cách phân chia công việc trong dự án mới.",
      aiRole: "John (Project Manager)",
      userRole: "Technical Assistant",
      turns: [
        { id: "turn-1", role: "ai", text: "Hello! Are you ready to collaborate on our new environment study?" },
        { id: "turn-2", role: "user", text: "Yes, John. I have compiled the data reports." }
      ],
      explanation: "Kịch bản giả định giao tiếp tự do với AI theo vai đóng."
    }
  }
];
