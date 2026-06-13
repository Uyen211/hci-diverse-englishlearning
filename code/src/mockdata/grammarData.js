// grammarData.js
export let mockGrammarData = [
  {
    id: 1,
    title: "Present Simple with Adverbs of Frequency",
    meaning:
      "[Thời gian: Hiện tại / Lặp lại] + [Chức năng: Diễn tả một thói quen cố định thường xuyên]",
    meaningOptions: [
      "[Thời gian: Hiện tại / Lặp lại] + [Chức năng: Diễn tả một thói quen cố định thường xuyên]",
      "[Thời gian: Hoàn toàn trong quá khứ] + [Chức năng: Diễn tả thói quen cũ nay không còn duy trì]",
      "[Thời gian: Tương lai gần] + [Chức năng: Diễn tả một dự định, kế hoạch đã lên lịch trước]",
    ],
    contexts: [
      {
        url: "/src/assets/grammar/Present_Simple_with_Adverbs_of_Frequency/I-usually-get-eggs-and-coffee,-and-then--.mp4",
        caption: "I usually get eggs and coffee, and then--",
      },
      {
        url: "/src/assets/grammar/Present_Simple_with_Adverbs_of_Frequency/I-usually-see-at-breakfast..mp4",
        caption: "I usually see her at breakfast.",
      },
      {
        url: "/src/assets/grammar/Present_Simple_with_Adverbs_of_Frequency/Oh!-She-never-stays-up-this-late..mp4",
        caption: "She never stays up this late.",
      },
      {
        url: "/src/assets/grammar/Present_Simple_with_Adverbs_of_Frequency/Well,-this-always-wakes-my-grandpa-up..mp4",
        caption: "This always wakes my grandpa up.",
      },
    ],
    pretestQuestion: "He usually _______ (wake) up early in the morning.",
    pretestAnswer: "wakes",
    // CẬP NHẬT: Kết hợp chia động từ + ngữ cảnh, loại bỏ ghi chú đúng sai trong ngoặc
    pretestOptions: [
      "wakes — Diễn tả một hành động lặp đi lặp lại như một thói quen thường xuyên ở hiện tại với chủ ngữ số ít",
      "wake — Diễn tả một hành động lặp đi lặp lại như một thói quen thường xuyên ở hiện tại với chủ ngữ số nhiều",
      "waking — Diễn tả một hành động đang trực tiếp diễn ra ngay tại thời điểm nói",
      "woken — Diễn tả một hành động đã hoàn thành và kết thúc hoàn toàn trong quá khứ"
    ],
    formula: "S + Adverb of Frequency + V(s/es)",
    rules: [
      {
        chunk: "I/We/You/They",
        verbForm: "always/usually... + V-inf",
        example: "I usually drink tea.",
      },
      {
        chunk: "He/She/It",
        verbForm: "always/usually... + V-s/es",
        example: "She always gets up early.",
      },
    ],
    patternAnalysis: {
      sentence: "She always gets up early.",
      chunks: [
        { id: "subject", label: "Chủ ngữ (Subject)", text: "She", correct: true },
        { id: "adverb", label: "Trạng từ (Adverb)", text: "always", correct: true },
        { id: "verb", label: "Động từ (Verb)", text: "gets up", correct: true },
      ],
    },
    compareDifferentiate: {
      sentenceA: "I usually drink tea. (Thói quen)",
      sentenceB: "I am drinking tea. (Ngay lúc này)",
      question:
        "Câu nào diễn tả thói quen lặp đi lặp lại chứ không phải hành động đang xảy ra?",
      options: ["Câu A", "Câu B"],
      correct: "Câu A",
      explanation:
        "Hiện tại đơn đi kèm trạng từ tần suất (usually) chỉ thói quen lặp lại, trong khi Hiện tại tiếp diễn (am drinking) chỉ hành động đang diễn ra tại thời điểm nói.",
    },
    recognitionQuizzes: [
      {
        question: "We often ________ dinner together at 7 PM.",
        options: [
          "have (Đúng vì chủ ngữ số nhiều 'We' đi với V nguyên mẫu theo thói quen)",
          "has (Sai vì 'has' chỉ dùng cho ngôi số ít)",
          "having (Sai vì thiếu trợ động từ chia tiếp diễn)",
          "had (Sai vì thói quen hiện tại không dùng quá khứ)",
        ],
        correct: "have",
      },
      {
        question: "My mother usually ________ to the traditional market on weekends.",
        options: [
          "goes (Đúng vì chủ ngữ 'My mother' là số ít, diễn tả thói quen lặp lại)",
          "go (Sai do chưa chia động từ theo ngôi số ít)",
          "going (Sai cấu trúc thì hiện tại đơn)",
          "went (Sai vì hành động lặp lại không dùng thì quá khứ đơn)",
        ],
        correct: "goes",
      },
      {
        question:
          "He is terrified of rats, so he ________ visits the dark basement.",
        options: [
          "never (Đúng ngữ cảnh: Không bao giờ vào vì sợ)",
          "always (Sai ngữ cảnh logic: Luôn luôn vào)",
          "usually (Sai ngữ cảnh logic: Thường xuyên vào)",
          "often (Sai ngữ cảnh logic: Thường thường vào)",
        ],
        correct: "never",
      },
    ],
    dictations: [
      { id: 1, text: "usually wakes up", ipa: "", audioUrl: "" },
      { id: 2, text: "always has breakfast", ipa: "", audioUrl: "" },
      { id: 3, text: "often stays up late", ipa: "", audioUrl: "" },
      { id: 4, text: "never skips lunch", ipa: "", audioUrl: "" },
      { id: 5, text: "sometimes goes jogging", ipa: "", audioUrl: "" },
    ],
    pronunciation: {
      word: "He usually takes a shower in the evening.",
      ipa: "",
      translation: "Anh ấy thường tắm vào buổi tối.",
    },
    sentenceBuilder: {
      targetVi: "Anh ấy không thường xuyên thức khuya.",
      parts: ["He", "doesn't", "often", "stay up late."], // force reload
    },
    freeWritePrompt:
      "Viết một đoạn văn (50-80 từ) kể về các hoạt động buổi sáng của bạn sử dụng ít nhất 2 trạng từ chỉ tần suất.",
  },
  {
    id: 2,
    title: "Present Perfect with JUST",
    meaning:
      "[Thời gian: Quá khứ cực kỳ gần] + [Chức năng: Hành động vừa mới kết thúc tức thì]",
    meaningOptions: [
      "[Thời gian: Quá khứ cực kỳ gần] + [Chức năng: Hành động vừa mới kết thúc tức thì]",
      "[Thời gian: Quá khứ xa/Xác định] + [Chức năng: Hành động đã chấm dứt hoàn toàn trong quá khứ]",
      "[Thời gian: Tương lai gần] + [Chức năng: Hành động chuẩn bị xảy ra trong vài phút tới]",
    ],
    contexts: [
      {
        url: "/src/assets/grammar/Present_Perfect_with_JUST/ESU-has-just-arrived..mp4",
        caption: "The bus has just arrived.",
      },
      {
        url: "/src/assets/grammar/Present_Perfect_with_JUST/I-have-just-finished-arrangements.mp4",
        caption: "I have just finished my arrangements.",
      },
      {
        url: "/src/assets/grammar/Present_Perfect_with_JUST/Parsons'-bus-has-just-arrived-at-Syntagma-Square..mp4",
        caption: "He has just arrived at the station.",
      },
    ],
    pretestQuestion:
      "Look! The dog _______ just _______ (spill) the milk on the kitchen floor.",
    pretestAnswer: "has / spilled",
    // CẬP NHẬT: Kết hợp chia động từ + ngữ cảnh, loại bỏ ghi chú đúng sai trong ngoặc
    pretestOptions: [
      "has / spilled — Diễn tả một hành động vừa mới xảy ra tức thì và kết quả của nó vẫn còn ảnh hưởng trực tiếp đến hiện tại với chủ ngữ số ít",
      "have / spilled — Diễn tả một hành động vừa mới xảy ra tức thì và kết quả của nó vẫn còn ảnh hưởng trực tiếp đến hiện tại với chủ ngữ số nhiều",
      "has / spill — Diễn tả một hành động lặp đi lặp lại nhiều lần theo thói quen cố định",
      "is / spilling — Diễn tả một hành động đang trong quá trình xảy ra ngay lúc này và chưa kết thúc"
    ],
    formula: "S + have/has + just + V3/V-ed",
    rules: [
      {
        chunk: "I/We/You/They",
        verbForm: "have just + V3",
        example: "I have just washed the dishes.",
      },
      {
        chunk: "He/She/It",
        verbForm: "has just + V3",
        example: "She has just left.",
      },
    ],
    patternAnalysis: {
      sentence: "I have just washed the dishes.",
      chunks: [
        { id: "subject", label: "Chủ ngữ (Subject)", text: "I", correct: true },
        { id: "auxiliary", label: "Trợ động từ (Auxiliary)", text: "have", correct: true },
        { id: "adverb", label: "Trạng từ (Adverb)", text: "just", correct: true },
        { id: "verb", label: "Động từ chính (Verb-3)", text: "washed", correct: true },
      ],
    },
    compareDifferentiate: {
      sentenceA:
        "I have just cooked lunch. (Bếp còn nóng, đồ ăn sẵn sàng)",
      sentenceB:
        "I cooked lunch at 11:00 AM. (Chỉ kể lại việc trong quá khứ)",
      question:
        'Câu nào nhấn mạnh tính thời điểm "vừa mới tức thì" và có kết quả tác động trực tiếp đến hiện tại?',
      options: ["Câu A", "Câu B"],
      correct: "Câu A",
      explanation:
        'Thì Hiện tại hoàn thành kết hợp với "just" dùng để nhấn mạnh một hành động vừa mới xảy ra tích tắc trước thời điểm nói.',
    },
    recognitionQuizzes: [
      {
        question:
          "Be careful! They ________ just ________ the kitchen floor, it is still wet.",
        options: [
          "have / cleaned (Đúng ngữ pháp: Chủ ngữ số nhiều 'They' + 'have' + V3 chỉ hành động vừa dứt để lại hậu quả nền ướt)",
          "has / cleaned (Sai vì dùng trợ động từ số ít cho ngôi số nhiều)",
          "have / clean (Sai vì động từ chính chưa chia về dạng quá khứ phân từ V3)",
          "has / clean (Sai toàn diện cấu trúc trợ động từ)",
        ],
        correct: "have / cleaned",
      },
      {
        question:
          "My sister is tired because she ________ just ________ all the laundry.",
        options: [
          "has / done (Đúng vì 'My sister' số ít + trợ động từ 'has' + V3 của do để chỉ hành động vừa xong gây mệt mỏi)",
          "have / done (Sai vì dùng sai trợ động từ cho ngôi số ít)",
          "has / do (Sai dạng phân từ ba của động từ)",
          "have / did (Sai vì vừa dùng sai trợ động từ vừa dùng dạng V2)",
        ],
        correct: "has / done",
      },
      {
        question:
          "The office is empty. He ________ just ________ out for lunch.",
        options: [
          "has / gone (Đúng ngữ cảnh vừa mới rời đi, vị trí văn phòng đang trống không)",
          "have / gone (Sai trợ động từ chia cho chủ ngữ số ít)",
          "has / went (Sai vì cấu trúc hoàn thành yêu cầu phân từ ba V3 'gone' chứ không dùng V2 'went')",
          "has / go (Sai vì động từ chính ở dạng nguyên mẫu)",
        ],
        correct: "has / gone",
      },
    ],
    dictations: [
      { id: 1, text: "has just arrived", ipa: "", audioUrl: "" },
      { id: 2, text: "have just finished", ipa: "", audioUrl: "" },
      { id: 3, text: "has just left", ipa: "", audioUrl: "" },
      { id: 4, text: "have just woken up", ipa: "", audioUrl: "" },
      { id: 5, text: "has just brushed", ipa: "", audioUrl: "" },
    ],
    pronunciation: {
      word: "We have just missed the morning bus!",
      ipa: "",
      translation: "Chúng tôi vừa mới lỡ chuyến xe buýt buổi sáng!",
    },
    sentenceBuilder: {
      targetVi: "Bạn vừa mới rửa mặt xong phải không?",
      parts: ["Have", "you", "just", "washed your face?"],
    },
    freeWritePrompt:
      'Viết một đoạn văn ngắn (50-80 từ) mô tả căn phòng bừa bộn của bạn sau khi một chú mèo vừa mới quậy phá, dùng cấu trúc với "just".',
  },
  {
    id: 3,
    title: "Be Going To + V-inf",
    meaning:
      "[Thời gian: Tương lai gần] + [Chức năng: Diễn tả một kế hoạch, dự định đã chuẩn bị từ trước]",
    meaningOptions: [
      "[Thời gian: Tương lai gần] + [Chức năng: Diễn tả một kế hoạch, dự định đã chuẩn bị từ trước]",
      "[Thời gian: Tương lai xa] + [Chức năng: Quyết định bộc phát ngay tại thời điểm nói]",
      "[Thời gian: Quá khứ] + [Chức năng: Diễn tả một sự tiếc nuối về việc chưa làm]",
    ],
    contexts: [
      {
        url: "/src/assets/grammar/Be_Going _to _+ _V-inf/I am going to go paint.mp4",
        caption: "I am going to paint walls.",
      },
      {
        url: "/src/assets/grammar/Be_Going _to _+ _V-inf/I-am-going-to-tell.-I-am.-I-am-going-to-tell!.mp4",
        caption: "I am going to tell the truth!",
      },
      {
        url: "/src/assets/grammar/Be_Going _to _+ _V-inf/she is going to prison..mp4",
        caption: "She is going to study abroad.",
      },
      {
        url: "/src/assets/grammar/Be_Going _to _+ _V-inf/We are going to win. - Yes, we are..mp4",
        caption: "We are going to win this game.",
      },
    ],
    pretestQuestion: "We _______ (be) going to _______ (clean) the house tonight.",
    pretestAnswer: "are / clean",
    // CẬP NHẬT: Kết hợp chia động từ + ngữ cảnh, loại bỏ ghi chú đúng sai trong ngoặc
    pretestOptions: [
      "are / clean — Diễn tả một dự định, kế hoạch cụ thể đã được sắp xếp hoặc chuẩn bị sẵn từ trước với chủ ngữ số nhiều",
      "is / clean — Diễn tả một dự định, kế hoạch cụ thể đã được sắp xếp hoặc chuẩn bị sẵn từ trước với chủ ngữ số ít",
      "are / cleaning — Diễn tả một thói quen cố định thường xuyên lặp đi lặp lại ở hiện tại",
      "will / clean — Diễn tả một quyết định bộc phát ngẫu nhiên ngay tại thời điểm nói chứ không có kế hoạch trước"
    ],
    formula: "S + am/is/are + going to + V-inf",
    rules: [
      {
        chunk: "I",
        verbForm: "am going to + V-inf",
        example: "I am going to buy a new bed tonight.",
      },
      {
        chunk: "He/She/It",
        verbForm: "is going to + V-inf",
        example: "He is going to do his homework.",
      },
      {
        chunk: "You/We/They",
        verbForm: "are going to + V-inf",
        example: "They are going to visit us.",
      },
    ],
    patternAnalysis: {
      sentence: "He is going to do homework.",
      chunks: [
        { id: "subject", label: "Chủ ngữ (Subject)", text: "He", correct: true },
        { id: "tobe", label: "Động từ To Be", text: "is", correct: true },
        { id: "goingto", label: "Cấu trúc định sẵn", text: "going to", correct: true },
        { id: "verb", label: "Động từ nguyên mẫu (V-inf)", text: "do", correct: true },
      ],
    },
    compareDifferentiate: {
      sentenceA:
        "I am going to buy a new bed tonight. (Đã đặt tiền trước)",
      sentenceB:
        "I will buy a bed. (Nghĩ ra tức thời khi thấy cái giường cũ hỏng)",
      question:
        "Câu nào thể hiện hành động chắc chắn sẽ làm theo một kế hoạch dự định đã có sẵn từ trước?",
      options: ["Câu A", "Câu B"],
      correct: "Câu A",
      explanation:
        '"be going to" diễn tả một dự định cụ thể, có kế hoạch hoặc có dấu hiệu từ trước. "will" dùng cho quyết định mang tính bộc phát ngay tại thời điểm nói.',
    },
    recognitionQuizzes: [
      {
        question:
          "Look at those dark clouds in the sky! It ________ going to ________ soon.",
        options: [
          "is / rain (Đúng ngữ cảnh: Có dấu hiệu mây đen rõ ràng hiển thị kế hoạch của tự nhiên + cấu trúc số ít)",
          "are / rain (Sai vì 'are' không tương thích với chủ ngữ số ít 'It')",
          "is / raining (Sai dạng thức vì cấu trúc đòi hỏi động từ nguyên mẫu sau to)",
          "are / raining (Sai toàn diện cấu trúc chia)"
        ],
        correct: "is / rain",
      },
      {
        question:
          "You look ready with your luggage. You ________ going to ________ your family, right?",
        options: [
          "are / visit (Đúng ngữ cảnh: Hành động có chuẩn bị hành lý trước thể hiện một kế hoạch tương lai có sẵn)",
          "is / visit (Sai chia động từ To Be theo chủ ngữ 'You')",
          "are / visiting (Sai vì động từ chính bị thêm đuôi biến thể -ing)",
          "is / visiting (Sai toàn diện cả trợ động từ lẫn động từ chính)"
        ],
        correct: "are / visit",
      },
      {
        question:
          "We have bought the ingredients. We ________ going to ________ dinner at home.",
        options: [
          "are / have (Đúng ngữ cảnh: Đã mua sẵn nguyên liệu hành động nấu ăn tối là kế hoạch định trước chắc chắn xảy ra)",
          "is / have (Sai động từ To Be cho ngôi số nhiều)",
          "are / having (Sai dạng thức động từ nguyên mẫu)",
          "is / having (Sai toàn diện cấu trúc)"
        ],
        correct: "are / have",
      },
    ],
    dictations: [
      { id: 1, text: "am going to cook", ipa: "", audioUrl: "" },
      { id: 2, text: "is going to sleep", ipa: "", audioUrl: "" },
      { id: 3, text: "are going to study", ipa: "", audioUrl: "" },
      { id: 4, text: "is going to iron", ipa: "", audioUrl: "" },
      { id: 5, text: "am going to wash", ipa: "", audioUrl: "" },
    ],
    pronunciation: {
      word: "She is going to do the grocery shopping this afternoon.",
      ipa: "",
      translation: "Cô ấy định đi siêu thị mua đồ vào chiều nay.",
    },
    sentenceBuilder: {
      targetVi: "Họ sẽ không ở khách sạn.",
      parts: ["They", "are not", "going to", "stay at a hotel."],
    },
    freeWritePrompt:
      "Viết một đoạn văn ngắn (50-80 từ) kể về toàn bộ dự định, kế hoạch bạn sẽ làm vào ngày cuối tuần tới.",
  },
  {
    id: 4,
    title: "Used to + V-inf",
    meaning:
      "[Thời gian: Hoàn toàn trong quá khứ] + [Chức năng: Diễn tả thói quen cũ nay không còn duy trì]",
    meaningOptions: [
      "[Thời gian: Hoàn toàn trong quá khứ] + [Chức năng: Diễn tả thói quen cũ nay không còn duy trì]",
      "[Thời gian: Hiện tại kéo dài] + [Chức năng: Diễn tả thói quen mới bắt đầu gần đây]",
      "[Thời gian: Tương lai] + [Chức năng: Diễn tả một hành động lặp lại nhiều lần ở tương lai]",
    ],
    contexts: [
      {
        url: "/src/assets/grammar/Used_to_+_V-inf/He used to play it to you.mp4",
        caption: "He used to play piano for you.",
      },
      {
        url: "/src/assets/grammar/Used_to_+_V-inf/I didn't used to mind it.mp4",
        caption: "I didn't use to mind it.",
      },
      {
        url: "/src/assets/grammar/Used_to_+_V-inf/My sister. She used to date him..mp4",
        caption: "She used to date him.",
      },
      {
        url: "/src/assets/grammar/Used_to_+_V-inf/They didn't used to be..mp4",
        caption: "They didn't use to be so popular.",
      },
    ],
    pretestQuestion:
      "I didn't _______ (use) to _______ (smoke) when I was young.",
    pretestAnswer: "use / smoke",
    // CẬP NHẬT: Kết hợp chia động từ + ngữ cảnh, loại bỏ ghi chú đúng sai trong ngoặc
    pretestOptions: [
      "use / smoke — Diễn tả một thói quen cũ hoặc trạng thái cố định trong quá khứ nay đã chấm dứt hoàn toàn ở dạng phủ định",
      "used / smoke — Diễn tả một thói quen cũ hoặc trạng thái cố định trong quá khứ nay đã chấm dứt hoàn toàn ở dạng khẳng định",
      "use / smoking — Diễn tả sự thích nghi dần với một hành động mới ở hiện tại",
      "used / smoked — Diễn tả một sự kiện đơn lẻ chỉ diễn ra duy nhất một lần xác định trong quá khứ"
    ],
    formula: "S + used to + V-inf",
    rules: [
      {
        chunk: "Khẳng định",
        verbForm: "used to + V-inf",
        example: "I used to skip breakfast.",
      },
      {
        chunk: "Phủ định",
        verbForm: "didn't use to + V-inf",
        example: "I didn't use to exercise.",
      },
    ],
    patternAnalysis: {
      sentence: "I used to skip breakfast.",
      chunks: [
        { id: "subject", label: "Chủ ngữ (Subject)", text: "I", correct: true },
        { id: "usedto", label: "Thói quen trong quá khứ", text: "used to", correct: true },
        { id: "verb", label: "Động từ nguyên mẫu (V-inf)", text: "skip", correct: true },
      ],
    },
    compareDifferentiate: {
      sentenceA:
        "I used to wake up at 10:00 AM. (Bây giờ không thức muộn thế nữa)",
      sentenceB:
        "I woke up at 10:00 AM yesterday. (Chỉ là một việc riêng lẻ ngày hôm qua)",
      question:
        "Câu nào khẳng định chắc chắn thói quen này đã chấm dứt hoàn toàn và hiện tại không còn nữa?",
      options: ["Câu A", "Câu B"],
      correct: "Câu A",
      explanation:
        '"Used to" chuyên dùng để nhấn mạnh sự đối lập giữa quá khứ và hiện tại (quá khứ làm, hiện tại đã bỏ). Quá khứ đơn (woke) chỉ đơn thuần tường thuật sự việc xảy ra trong quá khứ.',
    },
    recognitionQuizzes: [
      {
        question:
          "She didn't ________ to ________ vegetables when she was a kid.",
        options: [
          "use / like (Đúng vì câu phủ định chứa didn't ép trợ động từ dùng 'use' không 'd' + V nguyên mẫu)",
          "used / like (Sai bẫy cấu trúc câu phủ định thói quen quá khứ)",
          "use / liked (Sai vì động từ chính bị chia thừa đuôi quá khứ -ed)",
          "used / liked (Sai toàn diện cấu trúc ngữ pháp)"
        ],
        correct: "use / like",
      },
      {
        question:
          "We ________ ________ a big dog when we lived in the countryside.",
        options: [
          "used / to have (Đúng ngữ cảnh: Thói quen/Sự thật kéo dài trong suốt thời gian ở quê, nay không nuôi nữa)",
          "use / to have (Sai vì thiếu 'd' ở câu khẳng định)",
          "used / to had (Sai vì sau to không sử dụng động từ dạng quá khứ V2)",
          "use / to had (Sai toàn diện cấu trúc câu)"
        ],
        correct: "used / to have",
      },
      {
        question:
          "I ________ ________ play soccer every afternoon, but now I am too busy.",
        options: [
          "used / to (Đúng ngữ cảnh: Đối lập thói quen xưa đá bóng với hiện tại bận rộn không làm nữa)",
          "use / to (Sai vì thiếu đuôi 'd' trong câu khẳng định thói quen cũ)",
          "using / to (Sai vì chia động từ dạng tiếp diễn)",
          "used / two (Sai lỗi từ đồng âm khác nghĩa gây nhiễu chính tả)"
        ],
        correct: "used / to",
      },
    ],
    dictations: [
      { id: 1, text: "used to play", ipa: "", audioUrl: "" },
      { id: 2, text: "didn't use to drink", ipa: "", audioUrl: "" },
      { id: 3, text: "used to live", ipa: "", audioUrl: "" },
      { id: 4, text: "used to ride", ipa: "", audioUrl: "" },
      { id: 5, text: "didn't use to exercise", ipa: "", audioUrl: "" },
    ],
    pronunciation: {
      word: "My father used to read newspapers every single morning.",
      ipa: "",
      translation: "Cha tôi từng thường đọc báo mỗi buổi sáng.",
    },
    sentenceBuilder: {
      targetVi: "Tôi đã từng không uống cà phê.",
      parts: ["I", "didn't", "use to", "drink coffee."],
    },
    freeWritePrompt:
      "Viết một đoạn văn ngắn (50-80 từ) so sánh các thói quen sinh hoạt hàng ngày của bạn thời thơ ấu và hiện tại.",
  },
];