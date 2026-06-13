export const mockGrammarData = [
  {
    id: 1,
    title: 'Present Simple with Adverbs of Frequency',
    meaning: '[Thời gian: Hiện tại / Lặp lại] + [Chức năng: Diễn tả một thói quen cố định thường xuyên]',
    meaningOptions: [
      '[Thời gian: Hiện tại / Lặp lại] + [Chức năng: Diễn tả một thói quen cố định thường xuyên]',
      '[Thời gian: Quá khứ cực kỳ gần] + [Chức năng: Hành động vừa kết thúc]',
      '[Thời gian: Tương lai gần] + [Chức năng: Diễn tả một dự định, kế hoạch]'
    ],
    contexts: [
      { url: '/src/assets/grammar/Present_Simple_with_Adverbs_of_Frequency/I-usually-get-eggs-and-coffee,-and-then--.mp4', caption: 'I usually get eggs and coffee, and then--' },
      { url: '/src/assets/grammar/Present_Simple_with_Adverbs_of_Frequency/I-usually-see-at-breakfast..mp4', caption: 'I usually see at breakfast.' },
      { url: '/src/assets/grammar/Present_Simple_with_Adverbs_of_Frequency/Oh!-She-never-stays-up-this-late..mp4', caption: 'Oh! She never stays up this late.' },
      { url: '/src/assets/grammar/Present_Simple_with_Adverbs_of_Frequency/Well,-this-always-wakes-my-grandpa-up..mp4', caption: 'Well, this always wakes my grandpa up.' }
    ],
    pretestQuestion: 'He usually _______ (wake) up early in the morning.',
    pretestAnswer: 'wakes',
    formula: 'S + Adverb of Frequency + V(s/es)',
    rules: [
      { chunk: 'I/We/You/They', verbForm: 'always/usually... + V-inf', example: 'I usually drink tea.' },
      { chunk: 'He/She/It', verbForm: 'always/usually... + V-s/es', example: 'She always gets up early.' }
    ],
    patternAnalysis: {
      sentence: 'She always gets up early.',
      chunks: [
        { id: 'subject', label: 'Chủ ngữ (Subject)', text: 'She', correct: true },
        { id: 'adverb', label: 'Trạng từ (Adverb)', text: 'always', correct: true },
        { id: 'verb', label: 'Động từ (Verb)', text: 'gets', correct: true }
      ]
    },
    compareDifferentiate: {
      sentenceA: 'I usually drink tea. (Thói quen)',
      sentenceB: 'I am drinking tea. (Ngay lúc này)',
      question: 'Câu nào diễn tả thói quen lặp đi lặp lại chứ không phải hành động đang xảy ra?',
      options: ['Câu A', 'Câu B'],
      correct: 'Câu A',
      explanation: 'Hiện tại đơn (usually drink) chỉ thói quen, Hiện tại tiếp diễn (am drinking) chỉ hành động đang diễn ra lúc này.'
    },
    recognitionQuizzes: [
      {
        question: 'We often ________ dinner together.',
        options: ['have', 'has', 'having', 'had'],
        correct: 'have'
      },
      {
        question: 'My mother usually ________ to the market.',
        options: ['goes', 'go', 'going', 'went'],
        correct: 'goes'
      },
      {
        question: 'He ________ sleeps late.',
        options: ['never', 'always', 'usually', 'often'],
        correct: 'never'
      }
    ],
    dictations: [
      { id: 1, text: 'usually wakes up', ipa: '', audioUrl: '' },
      { id: 2, text: 'always has breakfast', ipa: '', audioUrl: '' },
      { id: 3, text: 'often stays up late', ipa: '', audioUrl: '' },
      { id: 4, text: 'never skips lunch', ipa: '', audioUrl: '' },
      { id: 5, text: 'sometimes goes jogging', ipa: '', audioUrl: '' }
    ],
    pronunciation: {
      word: 'He usually takes a shower in the evening.',
      ipa: '',
      translation: 'Anh ấy thường tắm vào buổi tối.'
    },
    sentenceBuilder: {
      targetVi: 'Anh ấy không thường xuyên thức khuya.',
      parts: ['He', "doesn't", 'often', 'stay up late.']
    },
    freeWritePrompt: 'Viết một đoạn văn (50-80 từ) kể về các hoạt động buổi sáng của bạn sử dụng ít nhất 2 trạng từ chỉ tần suất.',
  },
  {
    id: 2,
    title: 'Present Perfect with JUST',
    meaning: '[Thời gian: Quá khứ cực kỳ gần] + [Chức năng: Hành động vừa kết thúc và để lại kết quả trực tiếp ở hiện tại]',
    meaningOptions: [
      '[Thời gian: Quá khứ cực kỳ gần] + [Chức năng: Hành động vừa kết thúc và để lại kết quả trực tiếp ở hiện tại]',
      '[Thời gian: Hiện tại / Lặp lại] + [Chức năng: Diễn tả một thói quen cố định thường xuyên]',
      '[Thời gian: Hoàn toàn trong quá khứ] + [Chức năng: Diễn tả thói quen cũ nay không còn duy trì ở hiện tại nữa]'
    ],
    contexts: [
      { url: '/src/assets/grammar/Present_Perfect_with_JUST/ESU-has-just-arrived..mp4', caption: 'ESU has just arrived.' },
      { url: '/src/assets/grammar/Present_Perfect_with_JUST/I-have-just-finished-arrangements.mp4', caption: 'I have just finished arrangements' },
      { url: "/src/assets/grammar/Present_Perfect_with_JUST/Parsons'-bus-has-just-arrived-at-Syntagma Square..mp4", caption: "Parsons' bus has just arrived at Syntagma Square." }
    ],
    pretestQuestion: 'Look! The dog _______ just _______ (spill) the milk on the floor.',
    pretestAnswer: 'has spilled',
    formula: 'S + have/has + just + V3/V-ed',
    rules: [
      { chunk: 'I/We/You/They', verbForm: 'have just + V3', example: 'I have just washed the dishes.' },
      { chunk: 'He/She/It', verbForm: 'has just + V3', example: 'She has just left.' }
    ],
    patternAnalysis: {
      sentence: 'I have just washed the dishes.',
      chunks: [
        { id: 'subject', label: 'Chủ ngữ (Subject)', text: 'I', correct: true },
        { id: 'auxiliary', label: 'Trợ động từ (Auxiliary)', text: 'have', correct: true },
        { id: 'adverb', label: 'Trạng từ (Adverb)', text: 'just', correct: true },
        { id: 'verb', label: 'Động từ (Verb)', text: 'washed', correct: true }
      ]
    },
    compareDifferentiate: {
      sentenceA: 'I have just cooked lunch.',
      sentenceB: 'I cooked lunch at 11:00 AM.',
      question: 'Câu nào nhấn mạnh tính thời điểm "vừa mới tức thì" và ảnh hưởng hiện tại?',
      options: ['Câu A', 'Câu B'],
      correct: 'Câu A',
      explanation: 'Từ "just" đi kèm với thì Hiện tại hoàn thành để nhấn mạnh sự việc vừa xảy ra.'
    },
    recognitionQuizzes: [
      {
        question: 'They ________ just ________ the kitchen.',
        options: ['have / cleaned', 'has / cleaned', 'have / clean', 'has / clean'],
        correct: 'have / cleaned'
      },
      {
        question: 'My sister ________ just ________ the laundry.',
        options: ['has / done', 'have / done', 'has / do', 'have / do'],
        correct: 'has / done'
      },
      {
        question: 'He ________ just ________ out.',
        options: ['has / gone', 'have / gone', 'has / went', 'have / went'],
        correct: 'has / gone'
      }
    ],
    dictations: [
      { id: 1, text: 'has just arrived', ipa: '', audioUrl: '' },
      { id: 2, text: 'have just finished', ipa: '', audioUrl: '' },
      { id: 3, text: 'has just left', ipa: '', audioUrl: '' },
      { id: 4, text: 'have just woken up', ipa: '', audioUrl: '' },
      { id: 5, text: 'has just brushed', ipa: '', audioUrl: '' }
    ],
    pronunciation: {
      word: 'We have just missed the morning bus!',
      ipa: '',
      translation: 'Chúng tôi vừa mới lỡ chuyến xe buýt buổi sáng!'
    },
    sentenceBuilder: {
      targetVi: 'Bạn vừa mới rửa mặt xong phải không?',
      parts: ['Have', 'you', 'just', 'washed your face?']
    },
    freeWritePrompt: 'Viết một đoạn văn ngắn (50-80 từ) mô tả căn phòng bừa bộn của bạn sau khi một chú mèo vừa mới quậy phá, dùng cấu trúc với "just".',
  },
  {
    id: 3,
    title: 'Be Going To + V-inf',
    meaning: '[Thời gian: Tương lai gần] + [Chức năng: Diễn tả một dự định, kế hoạch đã có chuẩn bị trước]',
    meaningOptions: [
      '[Thời gian: Tương lai gần] + [Chức năng: Diễn tả một dự định, kế hoạch đã có chuẩn bị trước]',
      '[Thời gian: Tương lai] + [Chức năng: Quyết định bộc phát tại thời điểm nói]',
      '[Thời gian: Hiện tại / Lặp lại] + [Chức năng: Diễn tả thói quen]'
    ],
    contexts: [
      { url: '/src/assets/grammar/Be_Going _to _+ _V-inf/I am going to go paint.mp4', caption: 'I am going to go paint.' },
      { url: '/src/assets/grammar/Be_Going _to _+ _V-inf/I-am-going-to-tell.-I-am.-I-am-going-to-tell!.mp4', caption: 'I am going to tell. I am. I am going to tell!' },
      { url: '/src/assets/grammar/Be_Going _to _+ _V-inf/she is going to prison..mp4', caption: 'She is going to prison.' },
      { url: '/src/assets/grammar/Be_Going _to _+ _V-inf/We are going to win. - Yes, we are..mp4', caption: 'We are going to win. - Yes, we are.' }
    ],
    pretestQuestion: 'We _______ going to _______ (clean) the house tonight.',
    pretestAnswer: 'are clean',
    formula: 'S + am/is/are + going to + V-inf',
    rules: [
      { chunk: 'I', verbForm: 'am going to', example: 'I am going to buy a new bed tonight.' },
      { chunk: 'He/She/It', verbForm: 'is going to', example: 'He is going to do homework.' },
      { chunk: 'You/We/They', verbForm: 'are going to', example: 'They are going to visit us.' }
    ],
    patternAnalysis: {
      sentence: 'He is going to do homework.',
      chunks: [
        { id: 'subject', label: 'Chủ ngữ (Subject)', text: 'He', correct: true },
        { id: 'tobe', label: 'To Be', text: 'is', correct: true },
        { id: 'goingto', label: 'Going to', text: 'going to', correct: true },
        { id: 'verb', label: 'Động từ (Verb)', text: 'do', correct: true }
      ]
    },
    compareDifferentiate: {
      sentenceA: 'I am going to buy a new bed tonight.',
      sentenceB: 'I will buy a bed.',
      question: 'Câu nào thể hiện hành động chắc chắn sẽ làm theo một dự định có sẵn?',
      options: ['Câu A', 'Câu B'],
      correct: 'Câu A',
      explanation: '"be going to" dùng cho kế hoạch đã được lên trước, "will" dùng cho dự định bộc phát.'
    },
    recognitionQuizzes: [
      {
        question: 'Look at those dark clouds! It ________ going to ________.',
        options: ['is / rain', 'are / rain', 'is / raining', 'are / raining'],
        correct: 'is / rain'
      },
      {
        question: 'You ________ going to ________ breakfast again, right?',
        options: ['are / skip', 'is / skip', 'are / skipping', 'is / skipping'],
        correct: 'are / skip'
      },
      {
        question: 'We ________ going to ________ dinner soon.',
        options: ['are / have', 'is / have', 'are / having', 'is / having'],
        correct: 'are / have'
      }
    ],
    dictations: [
      { id: 1, text: 'am going to cook', ipa: '', audioUrl: '' },
      { id: 2, text: 'is going to sleep', ipa: '', audioUrl: '' },
      { id: 3, text: 'are going to study', ipa: '', audioUrl: '' },
      { id: 4, text: 'is going to iron', ipa: '', audioUrl: '' },
      { id: 5, text: 'am going to wash', ipa: '', audioUrl: '' }
    ],
    pronunciation: {
      word: 'She is going to do the grocery shopping this afternoon.',
      ipa: '',
      translation: 'Cô ấy định đi siêu thị mua đồ vào chiều nay.'
    },
    sentenceBuilder: {
      targetVi: 'Họ sẽ không ở khách sạn.',
      parts: ['They', 'are not', 'going to', 'stay at a hotel.']
    },
    freeWritePrompt: 'Viết một đoạn văn ngắn (50-80 từ) kể về toàn bộ dự định, kế hoạch bạn sẽ làm vào ngày cuối tuần tới.',
  },
  {
    id: 4,
    title: 'Used to + V-inf',
    meaning: '[Thời gian: Hoàn toàn trong quá khứ] + [Chức năng: Diễn tả thói quen cũ nay không còn duy trì ở hiện tại nữa]',
    meaningOptions: [
      '[Thời gian: Hoàn toàn trong quá khứ] + [Chức năng: Diễn tả thói quen cũ nay không còn duy trì ở hiện tại nữa]',
      '[Thời gian: Hiện tại] + [Chức năng: Thói quen đang tiếp diễn]',
      '[Thời gian: Quá khứ] + [Chức năng: Hành động xảy ra 1 lần trong quá khứ]'
    ],
    contexts: [
      { url: '/src/assets/grammar/Used_to_+_V-inf/He used to play it to you.mp4', caption: 'He used to play it to you.' },
      { url: "/src/assets/grammar/Used_to_+_V-inf/I didn't used to mind it.mp4", caption: "I didn't used to mind it." },
      { url: '/src/assets/grammar/Used_to_+_V-inf/My sister. She used to date him..mp4', caption: 'My sister. She used to date him.' },
      { url: "/src/assets/grammar/Used_to_+_V-inf/They didn't used to be..mp4", caption: "They didn't used to be." }
    ],
    pretestQuestion: 'I didn\'t _______ to _______ (smoke) when I was young.',
    pretestAnswer: 'use smoke',
    formula: 'S + used to + V-inf',
    rules: [
      { chunk: 'Khẳng định', verbForm: 'used to + V-inf', example: 'I used to skip breakfast.' },
      { chunk: 'Phủ định', verbForm: 'didn\'t use to + V-inf', example: 'I didn\'t use to exercise.' }
    ],
    patternAnalysis: {
      sentence: 'I used to skip breakfast.',
      chunks: [
        { id: 'subject', label: 'Chủ ngữ (Subject)', text: 'I', correct: true },
        { id: 'usedto', label: 'Used To', text: 'used to', correct: true },
        { id: 'verb', label: 'Động từ (Verb)', text: 'skip', correct: true }
      ]
    },
    compareDifferentiate: {
      sentenceA: 'I used to wake up at 10:00 AM.',
      sentenceB: 'I woke up at 10:00 AM yesterday.',
      question: 'Câu nào khẳng định thói quen này đã chấm dứt ở hiện tại?',
      options: ['Câu A', 'Câu B'],
      correct: 'Câu A',
      explanation: 'Used to diễn tả một thói quen cũ đã chấm dứt hoàn toàn. Quá khứ đơn chỉ diễn tả một sự việc đã xảy ra.'
    },
    recognitionQuizzes: [
      {
        question: 'She didn\'t ________ to ________ vegetables.',
        options: ['use / like', 'used / like', 'use / liked', 'used / liked'],
        correct: 'use / like'
      },
      {
        question: 'We ________ ________ a big dog when we lived in the countryside.',
        options: ['used / to have', 'use / to have', 'used / to had', 'use / to had'],
        correct: 'used / to have'
      },
      {
        question: 'I ________ ________ play soccer.',
        options: ['used / to', 'use / to', 'using / to', 'used / two'],
        correct: 'used / to'
      }
    ],
    dictations: [
      { id: 1, text: 'used to play', ipa: '', audioUrl: '' },
      { id: 2, text: 'didn\'t use to drink', ipa: '', audioUrl: '' },
      { id: 3, text: 'used to live', ipa: '', audioUrl: '' },
      { id: 4, text: 'used to ride', ipa: '', audioUrl: '' },
      { id: 5, text: 'didn\'t use to exercise', ipa: '', audioUrl: '' }
    ],
    pronunciation: {
      word: 'My father used to read newspapers every single morning.',
      ipa: '',
      translation: 'Cha tôi từng thường đọc báo mỗi buổi sáng.'
    },
    sentenceBuilder: {
      targetVi: 'Tôi đã từng không uống cà phê.',
      parts: ['I', "didn't", 'use to', 'drink coffee.']
    },
    freeWritePrompt: 'Viết một đoạn văn ngắn (50-80 từ) so sánh các thói quen sinh hoạt hàng ngày của bạn thời thơ ấu và hiện tại.',
  }
];
