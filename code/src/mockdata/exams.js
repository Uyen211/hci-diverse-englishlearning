export const initialExams = [
  {
    id: "exam-1",
    title: "Unit 4: Daily Routines",
    type: "Mini-test",
    levelId: "lvl-a1",
    unitId: "unit-4",
    questionsCount: 20,
    duration: 15,
    attempts: "1,250",
    difficulty: "Trung bình",
    questions: [
      // MCQ Page 1
      {
        id: "q-1",
        skill: "Trắc nghiệm",
        content: "By the time she arrived, we _______ the meeting.",
        options: ["have finished", "had finished", "will finish"],
        correctOption: "had finished",
        explanation: "Dùng thì Quá khứ hoàn thành (had finished) cho hành động xảy ra và kết thúc trước một hành động quá khứ khác (\"arrived\")."
      },
      {
        id: "q-2",
        skill: "Trắc nghiệm",
        content: "He recommended that she _______ the job offer.",
        options: ["accept", "accepts", "accepted"],
        correctOption: "accept",
        explanation: "Sau cấu trúc giả định (recommended that...) động từ luôn ở dạng nguyên thể không chia (subjunctive mood)."
      },
      // MCQ Page 2
      {
        id: "q-3",
        skill: "Trắc nghiệm",
        content: "She usually _______ up early in the morning every day.",
        options: ["wake", "wakes", "waking", "woke"],
        correctOption: "wakes",
        explanation: "Thì hiện tại đơn diễn tả thói quen lặp đi lặp lại với chủ ngữ số ít \"She\"."
      },
      {
        id: "q-4",
        skill: "Trắc nghiệm",
        content: "What is the synonym of 'daily habit'?",
        options: ["Routine", "Adventure", "Vacation", "Emergency"],
        correctOption: "Routine",
        explanation: "Routine nghĩa là chuỗi hoạt động được thực hiện thường xuyên (thói quen hàng ngày)."
      },
      // MCQs for pages 3-10 to make it exactly 20 questions (2 questions per page)
      ...Array.from({ length: 16 }, (_, i) => ({
        id: `q-mcq-placeholder-${i}`,
        skill: "Trắc nghiệm",
        content: `Question placeholder ${i + 5} for Daily Routines: Choose the correct option to complete this simple sentence.`,
        options: ["Option A", "Option B", "Option C"],
        correctOption: "Option A",
        explanation: "Đây là câu hỏi mẫu bổ sung để điền đủ 20 câu hỏi trắc nghiệm."
      })),
      // Listening Section
      {
        id: "q-1-listen",
        skill: "Listening",
        passageTitle: "Customer Survey",
        passageContent: "Woman: The stitching on the dresses in the clothing section is terrible.",
        audioUrl: "/mock-audio.mp3",
        subQuestions: [
          {
            id: "q-1-listen-sub1",
            content: "What is the primary reason the woman visits the store?",
            options: ["A. To buy groceries", "B. To return a product", "C. To ask for directions"],
            correctOption: "B. To return a product"
          },
          {
            id: "q-1-listen-sub2",
            content: "Who did she buy the product for?",
            options: ["A. Her husband", "B. Her daughter", "C. Her friend"],
            correctOption: "B. Her daughter"
          },
          {
            id: "q-1-listen-sub3",
            content: "Which department does the woman criticise?",
            options: ["A. Fresh produce", "B. Clothing section", "C. Bakery corner"],
            correctOption: "B. Clothing section"
          }
        ]
      },
      // Speaking Section (4C-1)
      {
        id: "q-1-speak",
        skill: "Speaking",
        situation: "Environment PM Meeting",
        description: "Bạn và quản lý dự án đang bàn thảo phân công nhiệm vụ nghiên cứu môi trường.",
        aiRole: "John (Project Manager)",
        userRole: "Environment Researcher",
        suggestedResponse: "I have noticed a moderate rise in PM2.5 levels near industrial zones.",
        dialogue: [
          {
            sender: "John (AI)",
            text: "Hello! I am John, your AI Examiner. Are you ready to collaborate on our new environment study?"
          },
          {
            sender: "Bạn (Học viên)",
            text: "Yes, John. I have compile the data reports.",
            error: "compile chưa chia phân từ 2"
          },
          {
            sender: "John (AI)",
            text: "Great! Did you find any significant increase in air pollution in the city?"
          },
          {
            sender: "Bạn (Học viên)",
            text: "Yes, it rises by fifteen percent in the city center.",
            error: "dùng sai thì hiện tại đơn"
          }
        ]
      },
      // Reading Section
      {
        id: "q-1-read",
        skill: "Reading",
        passageTitle: "The Evolution of Working Remotely: A New Era of Productivity",
        passageContent: "A. For centuries, the concept of work was inextricably linked to a physical location. Whether it was the field, the factory, or the office cubicle...\nB. The technological foundation for this shift was laid in the late 1990s with the proliferation of broadband internet...\nC. Over the course of the next decade, collaborative tools...\nD. Decentralized working models have significantly reshaped urban landscape designs, prompting migration to suburban areas...",
        subQuestions: [
          {
            id: "q-1-read-sub1",
            content: "1. The impact of remote work on traditional urban development patterns.",
            options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"],
            correctOption: "Paragraph D",
            explanation: "Decentralized working models have significantly reshaped urban landscape designs, prompting migration to suburban areas..."
          },
          {
            id: "q-1-read-sub2",
            content: "2. The technological infrastructure required for remote work proliferation.",
            options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"],
            correctOption: "Paragraph B",
            explanation: "The technological foundation for this shift was laid in the late 1990s with the proliferation of broadband internet..."
          }
        ]
      },
      // Writing Section
      {
        id: "q-1-write",
        skill: "Writing",
        prompt: "The chart below shows the household energy consumption patterns in a typical European country in 2026. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
        minWords: 150,
        userEssayTemplate: "\"The bar chart details the proportion of energy used for various household purposes in a typical European country during the year 2026. Overall, it is clear that heating is by far the most significant consumer of household energy, whereas cooling accounts for the smallest share of power consumption.\n\nHeating demands the largest portion of residential energy, standing at 60% of the total usage. Water heating is the second largest energy consumer, utilizing exactly 15% of household power. Appliances also consume a considerable amount of energy, representing 12% of the total household electricity.\n\nIn contrast, lighting and cooling require much less energy. Lighting stands at 8%, while cooling represents the least energy-demanding service, accounting for only 5% of overall household consumption. In conclusion, household energy is predominantly spent on heating and hot water, while other daily activities such as lighting and cooling represent a relatively minor fraction of the total power usage.\"",
        chartData: {
          title: "Household Energy Consumption 2026",
          series: [
            { label: "Heating", value: 60 },
            { label: "Water H.", value: 15 },
            { label: "Appliances", value: 12 },
            { label: "Lighting", value: 8 },
            { label: "Cooling", value: 5 }
          ]
        }
      }
    ]
  },
  {
    id: "exam-placement",
    title: "Placement Test",
    type: "Level Test",
    duration: 45,
    questionsCount: 50,
    attempts: "15,200",
    difficulty: "Dễ",
    questions: [
      // Questions mapping exactly for Review Page Display (Screen 5A-5E)
      {
        id: "q-place-1",
        skill: "Trắc nghiệm",
        content: "By the time she arrived, we _______ the meeting.",
        options: ["have finished", "had finished", "will finish"],
        correctOption: "had finished",
        explanation: "Dùng thì Quá khứ hoàn thành (had finished) cho hành động xảy ra và kết thúc trước một hành động quá khứ khác (\"arrived\")."
      },
      {
        id: "q-place-2",
        skill: "Trắc nghiệm",
        content: "He recommended that she _______ the job offer.",
        options: ["accept", "accepts", "accepted"],
        correctOption: "accept",
        explanation: "Sau cấu trúc giả định (recommended that...) động từ luôn ở dạng nguyên thể không chia."
      },
      {
        id: "q-place-listen",
        skill: "Listening",
        passageTitle: "Customer Survey",
        passageContent: "Woman: The stitching on the dresses in the clothing section is terrible.",
        subQuestions: [
          {
            id: "q-place-listen-sub1",
            content: "Which department does the woman criticise?",
            options: ["Fresh produce", "Clothing section", "Bakery corner"],
            correctOption: "Clothing section"
          }
        ]
      },
      {
        id: "q-place-speak",
        skill: "Speaking",
        situation: "Environment PM Meeting",
        description: "Bạn và quản lý dự án đang bàn thảo phân công nhiệm vụ nghiên cứu môi trường.",
        aiRole: "John (Project Manager)",
        userRole: "Environment Researcher",
        dialogue: [
          {
            sender: "John (AI)",
            text: "Hello! I am John, your AI Examiner. Are you ready to collaborate on our new environment study?"
          },
          {
            sender: "Bạn (Học viên)",
            text: "Yes, John. I have compile the data reports.",
            error: "compile chưa chia phân từ 2"
          },
          {
            sender: "John (AI)",
            text: "Great! Did you find any significant increase in air pollution in the city?"
          },
          {
            sender: "Bạn (Học viên)",
            text: "Yes, it rises by fifteen percent in the city center.",
            error: "dùng sai thì hiện tại đơn"
          }
        ]
      },
      {
        id: "q-place-read",
        skill: "Reading",
        passageTitle: "The Evolution of Working Remotely",
        passageContent: "A. For centuries, the concept of work was linked to a location. Whether it was the field, the factory...\nB. The technological foundation for this shift was laid in the late 1990s with the proliferation of broadband internet...\nC. Over the course of the next decade, collaborative tools...\nD. Decentralized working models have significantly reshaped urban landscape designs, prompting migration to suburban areas...",
        subQuestions: [
          {
            id: "q-place-read-sub1",
            content: "The impact of remote work on traditional urban development patterns.",
            options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"],
            correctOption: "Paragraph D",
            explanation: "Decentralized working models have significantly reshaped urban landscape designs, prompting migration to suburban areas..."
          }
        ]
      },
      {
        id: "q-place-write",
        skill: "Writing",
        prompt: "Write an essay about online learning benefits and drawbacks.",
        minWords: 150,
        sampleEssay: "In the contemporary era, online education has emerged as a popular alternative to traditional learning methods. On the one hand, it offers unprecedented flexibility and convenience, allowing students to learn at their own pace. On the other hand, it may lack the face-to-face interaction that is essential for social development...",
        userEssayTemplate: "In my opinion, online learning is have more benefits than normal school. However, students may lacks face-to-face interaction and self-discipline..."
      }
    ]
  },
  {
    id: "exam-3",
    title: "IELTS Mock Test #01",
    type: "Mock Test",
    duration: 120,
    questionsCount: 50,
    attempts: "12,450",
    difficulty: "Khó",
    locked: true,
    prerequisite: "Yêu cầu hoàn thành Unit 5",
    questions: [
      {
        id: "q-3-mcq",
        skill: "Trắc nghiệm",
        content: "Identify the correct option...",
        options: ["Option A", "Option B"],
        correctOption: "Option A"
      }
    ]
  }
];
