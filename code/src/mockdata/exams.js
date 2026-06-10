export const initialExams = [
  {
    id: "exam-1",
    title: "Kiểm tra 1 - Từ vựng & Ngữ pháp",
    type: "Mini-test",
    levelId: "lvl-a1",
    unitId: "unit-1",
    questionsCount: 3,
    duration: 15,
    attempts: "1,250",
    questions: [
      {
        id: "q-1",
        skill: "Trắc nghiệm",
        content: "The architect _______ the building in 1920.",
        options: ["has designed", "designed", "designs", "designing"],
        correctOption: "designed",
        explanation: "Dùng thì quá khứ đơn (designed) vì có mốc thời gian xác định trong quá khứ (\"in 1920\")."
      },
      {
        id: "q-2",
        skill: "Trắc nghiệm",
        content: "She usually ________ to school by bus, but today her father is driving her.",
        options: ["goes", "going", "went", "has gone"],
        correctOption: "goes",
        explanation: "Dùng thì Hiện tại đơn để chỉ hành động lặp đi lặp lại thường nhật."
      },
      {
        id: "q-3",
        skill: "Trắc nghiệm",
        content: "If it rains tomorrow, we ________ the football match.",
        options: ["would cancel", "cancelled", "will cancel", "cancels"],
        correctOption: "will cancel",
        explanation: "Câu điều kiện loại 1 diễn tả một khả năng có thật ở hiện tại/tương lai."
      }
    ]
  },
  {
    id: "exam-2",
    title: "Kiểm tra 2 - Kỹ năng Đọc hiểu",
    type: "Mini-test",
    levelId: "lvl-a1",
    unitId: "unit-1",
    questionsCount: 1,
    duration: 15,
    attempts: "1,250",
    questions: [
      {
        id: "q-4",
        skill: "Đọc",
        passageTitle: "The Evolution of Working Remotely: A New Era of Productivity",
        passageContent: "A. For centuries, the concept of work was linked to a location. B. Technology laid the foundation in the late 1990s with broadband and collaboration tools, allowing information workers to break free from physical desks.",
        subQuestions: [
          {
            id: "sub-q-read-1",
            content: "Which paragraph discusses traditional urban development patterns?",
            options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"],
            correctOption: "Paragraph B",
            explanation: "Paragraph B details the technological shift in the late 1990s."
          }
        ]
      }
    ]
  }
];
