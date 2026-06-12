export const mockVocabularyData = [
  {
    id: 'c1',
    word: 'make the bed',
    ipa: '/meɪk ðə bɛd/',
    type: 'Verb phrase',
    verb: 'make',
    nounChunk: 'the bed',
    meaning: 'dọn dẹp giường ngủ',
    enMeaning: 'to tidy the covers of a bed after it has been slept in',
    collocationRoot: 'Người bản xứ dùng động từ Make đi với danh từ Bed để chỉ việc sắp xếp, tạo ra sự gọn gàng (khác với Do thường chỉ hành động chung chung).',
    contexts: [
      {
        en: 'I always make the bed right after waking up.',
        vi: 'Tôi luôn luôn dọn dẹp giường ngủ ngay sau khi thức dậy.',
      },
      {
        en: 'He never makes the bed in the morning.',
        vi: 'Anh ấy không bao giờ dọn giường vào buổi sáng.',
      }
    ],
    collocations: ['make the bed', 'make a decision', 'make a mess'],
    commonError: {
      wrong: 'do the bed',
      correct: 'make the bed',
      explanation: 'Sai động từ đi kèm. Phải dùng Make thay vì Do.'
    },
    options: ['make', 'have', 'take', 'do'],
    meaningOptions: ['dọn dẹp giường ngủ', 'tắm nhanh', 'bắt xe buýt', 'ăn sáng nhẹ'],
    correctOption: 'make',
    videos: [
      { url: '/src/assets/vocab/make_the_bed/first-you-get-the-pajamas-then-you-make-the-bed.mp4', caption: 'first you get the pajamas then you make the bed.' },
      { url: '/src/assets/vocab/make_the_bed/make-the-bed-look-nice.mp4', caption: 'make the bed look nice.' },
      { url: '/src/assets/vocab/make_the_bed/make-the-bed.mp4', caption: 'make the bed.' },
      { url: '/src/assets/vocab/make_the_bed/she-wants-to-make-the-bed.mp4', caption: 'she wants to make the bed.' }
    ],
    relatedWords: [
      { word: 'Make', ipa: '/meɪk/', type: 'Verb', meaning: 'Làm, tạo ra' },
      { word: 'Maker', ipa: '/ˈmeɪkər/', type: 'Noun', meaning: 'Người làm ra' }
    ]
  },
  {
    id: 'c2',
    word: 'take a shower',
    ipa: '/teɪk ə ˈʃaʊər/',
    type: 'Verb phrase',
    verb: 'take',
    nounChunk: 'a shower',
    meaning: 'tắm (vòi hoa sen)',
    enMeaning: 'to wash your body under a shower',
    collocationRoot: 'Dùng Take để chỉ hành động tiếp nhận một trải nghiệm (ở đây là việc tắm).',
    contexts: [
      {
        en: 'I usually take a shower to refresh my mind in the morning.',
        vi: 'Tôi thường tắm để làm sảng khoái tinh thần vào buổi sáng.',
      },
      {
        en: 'She took a shower before going to work.',
        vi: 'Cô ấy đã tắm trước khi đi làm.',
      }
    ],
    collocations: ['take a shower', 'take a nap', 'take a photo'],
    commonError: {
      wrong: 'make a shower',
      correct: 'take a shower / have a shower',
      explanation: 'Không dùng Make. Trong tiếng Anh Mỹ thường dùng Take, Anh Anh dùng Have.'
    },
    options: ['make', 'have', 'take', 'do'],
    meaningOptions: ['tắm', 'gọi điện thoại', 'dọn dẹp giường ngủ', 'bắt xe buýt'],
    correctOption: 'take',
    videos: [
      { url: '/src/assets/vocab/take_a_shower/i-need-you-to-take-a-shower.mp4', caption: 'i need you to take a shower.' },
      { url: "/src/assets/vocab/take_a_shower/take-a-shower-ma'am.mp4", caption: "take a shower ma'am." },
      { url: '/src/assets/vocab/take_a_shower/yes-you-can-take-a-shower-here.mp4', caption: 'yes you can take a shower here.' }
    ],
    relatedWords: [
      { word: 'Shower', ipa: '/ˈʃaʊər/', type: 'Noun/Verb', meaning: 'Vòi sen, tắm' },
      { word: 'Showery', ipa: '/ˈʃaʊəri/', type: 'Adj', meaning: 'Có mưa rào' }
    ]
  },
  {
    id: 'c3',
    word: 'take the bus',
    ipa: '/teɪk ðə bʌs/',
    type: 'Verb phrase',
    verb: 'take',
    nounChunk: 'the bus',
    meaning: 'bắt xe buýt',
    enMeaning: 'to use a bus as a means of transportation',
    collocationRoot: 'Dùng Take với các phương tiện giao thông công cộng để chỉ việc bắt/lên xe.',
    contexts: [
      {
        en: 'I take the bus to university every morning.',
        vi: 'Tôi bắt xe buýt đến trường đại học mỗi sáng.',
      },
      {
        en: 'It is cheaper to take the bus than to drive a car.',
        vi: 'Bắt xe buýt thì rẻ hơn là tự lái ô tô.',
      }
    ],
    collocations: ['take the bus', 'take a train', 'take a taxi'],
    commonError: {
      wrong: 'go the bus',
      correct: 'take the bus / go by bus',
      explanation: 'Không dùng Go the bus. Nếu dùng Go phải có giới từ By (go by bus).'
    },
    options: ['make', 'have', 'take', 'do'],
    meaningOptions: ['bắt xe buýt', 'đi bộ', 'dọn dẹp giường ngủ', 'tắm nhanh'],
    correctOption: 'take',
    videos: [
      { url: "/src/assets/vocab/take_the_bus/i'll-take-the-bus.mp4", caption: "i'll take the bus." },
      { url: "/src/assets/vocab/take_the_bus/i'm-just-gonna-take-the-bus.mp4", caption: "i'm just gonna take the bus." },
      { url: '/src/assets/vocab/take_the_bus/old-lady-tourists-take-the-bus-around-here.mp4', caption: 'old lady tourists take the bus around here.' },
      { url: '/src/assets/vocab/take_the_bus/take-the-bus.mp4', caption: 'take the bus.' },
      { url: '/src/assets/vocab/take_the_bus/thanks-but-i-take-the-bus-all-the-time.mp4', caption: 'thanks but i take the bus all the time.' }
    ],
    relatedWords: [
      { word: 'Bus', ipa: '/bʌs/', type: 'Noun', meaning: 'Xe buýt' }
    ]
  },
  {
    id: 'c4',
    word: 'make a decision',
    ipa: '/meɪk ə dɪˈsɪʒ.ən/',
    type: 'Verb phrase',
    verb: 'make',
    nounChunk: 'a decision',
    meaning: 'đưa ra quyết định, lựa chọn',
    enMeaning: 'to decide something after considering all the possibilities',
    collocationRoot: 'Người bản xứ dùng động từ Make đi với danh từ Decision, tuyệt đối không dùng Do a decision hay Take a decision.',
    contexts: [
      {
        en: 'I need to make a quick decision about what to wear today.',
        vi: 'Tôi cần đưa ra quyết định nhanh về việc mặc gì hôm nay.',
      },
      {
        en: 'She made a difficult decision to change her major last year.',
        vi: 'Cô ấy đã đưa ra một quyết định khó khăn để chuyển chuyên ngành vào năm ngoái.',
      }
    ],
    collocations: ['make a decision', 'make a choice', 'make an effort'],
    commonError: {
      wrong: 'do a decision / take a decision',
      correct: 'make a decision',
      explanation: 'Sai động từ đi kèm (Wrong Collocation). Phải luôn luôn dùng Make.'
    },
    options: ['make', 'have', 'take', 'do'],
    meaningOptions: ['đưa ra quyết định', 'tắm nhanh', 'bắt xe buýt', 'dọn dẹp giường ngủ'],
    correctOption: 'make',
    videos: [],
    relatedWords: [
      { word: 'Decide', ipa: '/dɪˈsaɪd/', type: 'Verb', meaning: 'Quyết định' },
      { word: 'Decisive', ipa: '/dɪˈsaɪ.sɪv/', type: 'Adj', meaning: 'Quyết đoán' },
      { word: 'Decisively', ipa: '/dɪˈsaɪ.sɪv.li/', type: 'Adv', meaning: 'Một cách quyết đoán' }
    ]
  }
];
