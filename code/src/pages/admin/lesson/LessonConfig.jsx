import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { lessonService } from '../../../services/lessonService';
import { unitService } from '../../../services/unitService';
import { levelService } from '../../../services/levelService';
import { useToastStore } from '../../../store/toastStore';

// Import split components
import { FlashcardConfig, DragDropConfig, ConcordanceConfig } from './components/VocabularyConfigs';
import { FocusModeConfig, PatternConfig, RewriteConfig } from './components/GrammarConfigs';
import { InteractiveStoriesConfig } from './components/ListeningConfigs';
import { PronunciationConfig, RoleplayConfig } from './components/SpeakingConfigs';
import { ReadingComprehensionConfig } from './components/ReadingConfigs';
import { SentenceScrambleConfig, AiEssayConfig } from './components/WritingConfigs';

const configFormSchema = z.object({
  title: z.string().min(1, { message: 'Tên bài học không được để trống!' }),
  subtitle: z.string().min(1, { message: 'Mô tả ngắn không được để trống!' }),
  genre: z.string().min(1, { message: 'Thể loại không được để trống!' }),
  exerciseType: z.string().min(1, { message: 'Vui lòng chọn hình thức bài tập!' }),
  
  // Flashcards SRS / Pronunciation / Context Target Word
  key: z.string().optional(),
  ipa: z.string().optional(),
  definition: z.string().optional(),
  audio: z.string().optional(),
  image: z.string().optional(),
  explanation: z.string().optional(),

  // Focus Mode / Sentence Rewrite
  targetStructure: z.string().optional(),
  fullSentence: z.string().optional(),
  hiddenWords: z.array(z.string()).optional(),
  originalSentence: z.string().optional(),
  rewriteStarter: z.string().optional(),
  acceptedAnswers: z.string().optional(),

  // Scramble / Essay
  correctSentence: z.string().optional(),
  scrambledWords: z.string().optional(),
  translationPrompt: z.string().optional(),
  essayCategory: z.string().optional(),
  minWords: z.coerce.number().optional(),
  essayPrompt: z.string().optional(),
  scoringCriteria: z.array(z.string()).optional(),
  modelEssay: z.string().optional(),

  // Listening & Reading passages
  passage: z.string().optional(),
  passageTitle: z.string().optional(),
  script: z.string().optional(),

  // Speaking Roleplay
  context: z.string().optional(),
  aiRole: z.string().optional(),
  userRole: z.string().optional(),
});

export default function LessonConfig() {
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  const [unit, setUnit] = useState(null);
  const [level, setLevel] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Cards State (Multi-card configuration list)
  const [cards, setCards] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Dynamic state arrays for subcomponents representing the active card's states
  const [turns, setTurns] = useState([]); // Roleplay turns
  const [pairs, setPairs] = useState([]); // Drag & drop word pairs
  const [contexts, setContexts] = useState([]); // Context sentence examples
  const [questions, setQuestions] = useState([]); // MCQ questions
  const [patterns, setPatterns] = useState([]); // Pattern examples
  const [pronunciations, setPronunciations] = useState([]); // Pronunciations table
  const [scoringCriteria, setScoringCriteria] = useState([]); // Essay criteria

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(configFormSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      genre: 'Từ vựng',
      exerciseType: 'Flashcards SRS',
      key: '',
      ipa: '',
      definition: '',
      audio: '',
      image: '',
      explanation: '',
      targetStructure: '',
      fullSentence: '',
      hiddenWords: [],
      originalSentence: '',
      rewriteStarter: '',
      acceptedAnswers: '',
      correctSentence: '',
      scrambledWords: '',
      translationPrompt: '',
      essayCategory: 'IELTS Academic Writing Task 2',
      minWords: 250,
      essayPrompt: '',
      scoringCriteria: [],
      modelEssay: '',
      passage: '',
      passageTitle: '',
      script: '',
      context: '',
      aiRole: '',
      userRole: '',
    },
  });

  const selectedGenre = watch('genre') || 'Từ vựng';
  const exerciseType = watch('exerciseType');
  const fullSentenceText = watch('fullSentence') || '';

  // Get available exercise types based on genre
  const getExerciseTypesForGenre = (genre) => {
    switch (genre) {
      case 'Từ vựng':
        return ['Flashcards SRS', 'Kéo thả', 'Đoán nghĩa qua ngữ cảnh'];
      case 'Ngữ pháp':
        return ['Focus Mode', 'Nhận diện khuôn mẫu', 'Viết lại câu'];
      case 'Nghe':
        return ['Interactive Stories'];
      case 'Nói':
        return ['Phát âm từ đơn/câu ngắn', 'Hội thoại nhập vai với AI'];
      case 'Đọc':
        return ['Đọc hiểu thông thường'];
      case 'Viết':
        return ['Ghép câu', 'Viết luận chấm AI'];
      default:
        return [];
    }
  };

  const getDefaultValuesForType = (type) => {
    switch (type) {
      case 'Flashcards SRS':
        return {
          key: '', ipa: '', definition: '', explanation: '',
          audio: 'pronunciation_collaborate.mp3',
          image: 'collaborate_workspace.png'
        };
      case 'Kéo thả':
        return {
          pairs: [
            { id: 'pair-1', word: '', definition: '' }
          ],
          explanation: ''
        };
      case 'Đoán nghĩa qua ngữ cảnh':
        return {
          key: '',
          contexts: [
            { id: 'c-1', sentence: '', audio: 'context_audio_1.mp3', translation: '' },
            { id: 'c-2', sentence: '', audio: 'context_audio_2.mp3', translation: '' }
          ],
          explanation: ''
        };
      case 'Focus Mode':
        return {
          targetStructure: '',
          fullSentence: '',
          hiddenWords: [],
          explanation: ''
        };
      case 'Nhận diện khuôn mẫu':
        return {
          targetStructure: '',
          patterns: [
            { id: 'p-1', text: '' }
          ],
          questions: [
            {
              id: 'q-1',
              question: '',
              options: ['', ''],
              correctOption: '',
              explanation: ''
            }
          ],
          explanation: ''
        };
      case 'Viết lại câu':
        return {
          originalSentence: '',
          rewriteStarter: '',
          acceptedAnswers: '',
          explanation: ''
        };
      case 'Interactive Stories':
        return {
          audio: 'full_listening_conversation.mp3',
          script: '',
          questions: [
            {
              id: 'q-1',
              question: '',
              options: ['', ''],
              correctOption: '',
              explanation: ''
            }
          ],
          explanation: ''
        };
      case 'Phát âm từ đơn/câu ngắn':
        return {
          pronunciations: [
            { id: 'p-1', text: '', audio: '' }
          ],
          explanation: ''
        };
      case 'Hội thoại nhập vai với AI':
        return {
          context: '',
          aiRole: '',
          userRole: '',
          turns: [
            { id: 'turn-1', role: 'ai', text: '' }
          ],
          explanation: ''
        };
      case 'Đọc hiểu thông thường':
        return {
          passageTitle: '',
          passage: '',
          questions: [
            {
              id: 'q-1',
              question: '',
              options: ['', ''],
              correctOption: '',
              explanation: ''
            }
          ],
          explanation: ''
        };
      case 'Ghép câu':
        return {
          correctSentence: '',
          scrambledWords: '',
          translationPrompt: '',
          explanation: ''
        };
      case 'Viết luận chấm AI':
        return {
          essayCategory: 'IELTS Academic Writing Task 2',
          minWords: 250,
          essayPrompt: '',
          scoringCriteria: ['Task Response', 'Coherence & Cohesion', 'Lexical Resource', 'Grammatical Range & Accuracy'],
          modelEssay: '',
          explanation: ''
        };
      default:
        return { explanation: '' };
    }
  };

  const watchedGenre = watch('genre');

  useEffect(() => {
    if (watchedGenre) {
      const types = getExerciseTypesForGenre(watchedGenre);
      const currentType = watch('exerciseType');
      if (!types.includes(currentType)) {
        setValue('exerciseType', types[0] || '');
      }
    }
  }, [watchedGenre, setValue, watch]);

  // Card switching state synchronization helpers
  const saveCurrentCardState = () => {
    const currentValues = watch();
    const cardData = {
      key: currentValues.key,
      ipa: currentValues.ipa,
      definition: currentValues.definition,
      audio: currentValues.audio,
      image: currentValues.image,

      targetStructure: currentValues.targetStructure,
      fullSentence: currentValues.fullSentence,
      hiddenWords: currentValues.hiddenWords,

      originalSentence: currentValues.originalSentence,
      rewriteStarter: currentValues.rewriteStarter,
      acceptedAnswers: currentValues.acceptedAnswers,

      correctSentence: currentValues.correctSentence,
      scrambledWords: currentValues.scrambledWords,
      translationPrompt: currentValues.translationPrompt,

      essayCategory: currentValues.essayCategory,
      minWords: currentValues.minWords,
      essayPrompt: currentValues.essayPrompt,
      modelEssay: currentValues.modelEssay,

      passage: currentValues.passage,
      passageTitle: currentValues.passageTitle,
      script: currentValues.script,

      context: currentValues.context,
      aiRole: currentValues.aiRole,
      userRole: currentValues.userRole,

      explanation: currentValues.explanation,

      turns: [...turns],
      pairs: [...pairs],
      contexts: [...contexts],
      questions: [...questions],
      patterns: [...patterns],
      pronunciations: [...pronunciations],
      scoringCriteria: [...scoringCriteria],
    };

    setCards(prevCards => {
      const updated = [...prevCards];
      if (updated[activeCardIndex]) {
        updated[activeCardIndex] = {
          ...updated[activeCardIndex],
          ...cardData
        };
      }
      return updated;
    });
  };

  const loadCardState = (targetIndex, targetCardsList = cards) => {
    const targetCard = targetCardsList[targetIndex];
    if (!targetCard) return;

    setValue('key', targetCard.key || '');
    setValue('ipa', targetCard.ipa || '');
    setValue('definition', targetCard.definition || '');
    setValue('audio', targetCard.audio || '');
    setValue('image', targetCard.image || '');

    setValue('targetStructure', targetCard.targetStructure || '');
    setValue('fullSentence', targetCard.fullSentence || '');
    setValue('hiddenWords', targetCard.hiddenWords || []);

    setValue('originalSentence', targetCard.originalSentence || '');
    setValue('rewriteStarter', targetCard.rewriteStarter || '');
    setValue('acceptedAnswers', targetCard.acceptedAnswers || '');

    setValue('correctSentence', targetCard.correctSentence || '');
    setValue('scrambledWords', targetCard.scrambledWords || '');
    setValue('translationPrompt', targetCard.translationPrompt || '');

    setValue('essayCategory', targetCard.essayCategory || 'IELTS Academic Writing Task 2');
    setValue('minWords', targetCard.minWords || 250);
    setValue('essayPrompt', targetCard.essayPrompt || '');
    setValue('modelEssay', targetCard.modelEssay || '');

    setValue('passage', targetCard.passage || '');
    setValue('passageTitle', targetCard.passageTitle || '');
    setValue('script', targetCard.script || '');

    setValue('context', targetCard.context || '');
    setValue('aiRole', targetCard.aiRole || '');
    setValue('userRole', targetCard.userRole || '');

    setValue('explanation', targetCard.explanation || '');

    setTurns(targetCard.turns || []);
    setPairs(targetCard.pairs || []);
    setContexts(targetCard.contexts || []);
    setQuestions(targetCard.questions || []);
    setPatterns(targetCard.patterns || []);
    setPronunciations(targetCard.pronunciations || []);
    setScoringCriteria(targetCard.scoringCriteria || []);

    setActiveQuestionIndex(0);
  };

  const handleAddCard = () => {
    saveCurrentCardState();
    const newCard = {
      id: `card-${Math.random().toString(36).substr(2, 9)}`,
      ...getDefaultValuesForType(exerciseType)
    };
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    const newIndex = updatedCards.length - 1;
    setActiveCardIndex(newIndex);
    loadCardState(newIndex, updatedCards);
  };

  const handleDeleteCard = () => {
    if (cards.length <= 1) {
      alert("Không thể xóa thẻ duy nhất. Mỗi bài học phải có ít nhất 1 thẻ!");
      return;
    }
    const updatedCards = cards.filter((_, idx) => idx !== activeCardIndex);
    setCards(updatedCards);
    const newIndex = Math.max(0, activeCardIndex - 1);
    setActiveCardIndex(newIndex);
    loadCardState(newIndex, updatedCards);
  };

  const handleSwitchCard = (targetIndex) => {
    if (targetIndex < 0 || targetIndex >= cards.length) return;
    saveCurrentCardState();
    setActiveCardIndex(targetIndex);
    loadCardState(targetIndex);
  };

  // Main lesson config loading effect
  useEffect(() => {
    const loadLessonDetails = async () => {
      try {
        const allUnits = await unitService.getUnits();
        const currentUnit = allUnits.find(u => u.id === unitId);
        setUnit(currentUnit);

        if (currentUnit) {
          const allLevels = await levelService.getLevels();
          const currentLevel = allLevels.find(l => l.id === currentUnit.levelId);
          setLevel(currentLevel);
        }

        const isCreateMode = !lessonId || lessonId === 'new';

        if (!isCreateMode) {
          const lessons = await lessonService.getLessonsByUnitId(unitId);
          const currentLesson = lessons.find(l => l.id === lessonId);
          setLesson(currentLesson);

          if (currentLesson) {
            setValue('title', currentLesson.title);
            setValue('subtitle', currentLesson.subtitle || '');
            setValue('genre', currentLesson.genre || 'Từ vựng');
            
            const types = getExerciseTypesForGenre(currentLesson.genre || 'Từ vựng');
            const defaultType = currentLesson.exerciseType || types[0] || '';
            setValue('exerciseType', defaultType);

            // Restore saved configurations
            const conf = currentLesson.config || {};
            
            let initialCards = [];
            if (Array.isArray(conf.cards)) {
              initialCards = conf.cards.map((c, i) => ({
                id: c.id || `card-${i}`,
                ...c
              }));
            } else {
              // Convert single config to a single card
              initialCards = [
                {
                  id: 'card-0',
                  ...conf
                }
              ];
            }

            setCards(initialCards);
            setActiveCardIndex(0);
            
            // Load the first card's states
            const firstCard = initialCards[0];
            setValue('key', firstCard.key || '');
            setValue('ipa', firstCard.ipa || '');
            setValue('definition', firstCard.definition || '');
            setValue('audio', firstCard.audio || '');
            setValue('image', firstCard.image || '');

            setValue('targetStructure', firstCard.targetStructure || '');
            setValue('fullSentence', firstCard.fullSentence || '');
            setValue('hiddenWords', firstCard.hiddenWords || []);

            setValue('originalSentence', firstCard.originalSentence || '');
            setValue('rewriteStarter', firstCard.rewriteStarter || '');
            setValue('acceptedAnswers', firstCard.acceptedAnswers || '');

            setValue('correctSentence', firstCard.correctSentence || '');
            setValue('scrambledWords', firstCard.scrambledWords || '');
            setValue('translationPrompt', firstCard.translationPrompt || '');

            setValue('essayCategory', firstCard.essayCategory || 'IELTS Academic Writing Task 2');
            setValue('minWords', firstCard.minWords || 250);
            setValue('essayPrompt', firstCard.essayPrompt || '');
            setValue('modelEssay', firstCard.modelEssay || '');

            setValue('passage', firstCard.passage || '');
            setValue('passageTitle', firstCard.passageTitle || '');
            setValue('script', firstCard.script || '');

            setValue('context', firstCard.context || '');
            setValue('aiRole', firstCard.aiRole || '');
            setValue('userRole', firstCard.userRole || '');

            setValue('explanation', firstCard.explanation || '');

            setTurns(firstCard.turns || []);
            setPairs(firstCard.pairs || []);
            setContexts(firstCard.contexts || []);
            setQuestions(firstCard.questions || []);
            setPatterns(firstCard.patterns || []);
            setPronunciations(firstCard.pronunciations || []);
            setScoringCriteria(firstCard.scoringCriteria || []);
          }
        } else {
          // Create Mode
          setLesson(null);
          setValue('title', '');
          setValue('subtitle', '');
          setValue('genre', 'Từ vựng');
          setValue('exerciseType', 'Flashcards SRS');

          const initialCard = {
            id: 'card-0',
            ...getDefaultValuesForType('Flashcards SRS')
          };
          setCards([initialCard]);
          setActiveCardIndex(0);

          setTurns(initialCard.turns || []);
          setPairs(initialCard.pairs || []);
          setContexts(initialCard.contexts || []);
          setQuestions(initialCard.questions || []);
          setPatterns(initialCard.patterns || []);
          setPronunciations(initialCard.pronunciations || []);
          setScoringCriteria(initialCard.scoringCriteria || []);
        }
      } catch (err) {
        console.error('Lỗi tải cấu hình bài học:', err);
      } finally {
        setLoading(false);
      }
    };

    loadLessonDetails();
  }, [unitId, lessonId, setValue]);

  // Handle exercise type change
  const handleTypeChange = (type) => {
    setValue('exerciseType', type);
    const newCard = {
      id: `card-${Math.random().toString(36).substr(2, 9)}`,
      ...getDefaultValuesForType(type)
    };
    const newCards = [newCard];
    setCards(newCards);
    setActiveCardIndex(0);
    loadCardState(0, newCards);
  };

  // Submit Handler
  const isCreateMode = !lessonId || lessonId === 'new';

  const onSave = async (data) => {
    const currentValues = watch();
    const activeCardData = {
      key: currentValues.key,
      ipa: currentValues.ipa,
      definition: currentValues.definition,
      audio: currentValues.audio,
      image: currentValues.image,

      targetStructure: currentValues.targetStructure,
      fullSentence: currentValues.fullSentence,
      hiddenWords: currentValues.hiddenWords,

      originalSentence: currentValues.originalSentence,
      rewriteStarter: currentValues.rewriteStarter,
      acceptedAnswers: currentValues.acceptedAnswers,

      correctSentence: currentValues.correctSentence,
      scrambledWords: currentValues.scrambledWords,
      translationPrompt: currentValues.translationPrompt,

      essayCategory: currentValues.essayCategory,
      minWords: currentValues.minWords,
      essayPrompt: currentValues.essayPrompt,
      modelEssay: currentValues.modelEssay,

      passage: currentValues.passage,
      passageTitle: currentValues.passageTitle,
      script: currentValues.script,

      context: currentValues.context,
      aiRole: currentValues.aiRole,
      userRole: currentValues.userRole,

      explanation: currentValues.explanation,

      turns: [...turns],
      pairs: [...pairs],
      contexts: [...contexts],
      questions: [...questions],
      patterns: [...patterns],
      pronunciations: [...pronunciations],
      scoringCriteria: [...scoringCriteria],
    };

    const finalCards = cards.map((c, idx) => 
      idx === activeCardIndex ? { ...c, ...activeCardData } : c
    );

    try {
      setSaveLoading(true);
      setSaveSuccess(false);

      const type = data.exerciseType;
      const config = {
        cards: finalCards
      };

      if (isCreateMode) {
        await lessonService.addLesson({
          title: data.title,
          subtitle: data.subtitle,
          genre: data.genre,
          unitId: unitId
        }, type, config);
      } else {
        await lessonService.updateLesson(lessonId, {
          title: data.title,
          subtitle: data.subtitle,
          genre: data.genre,
          exerciseType: type,
          config: config
        });
      }

      setSaveSuccess(true);
      addToast(`Lưu cấu hình bài học "${data.title}" thành công`, "success");
      setTimeout(() => {
        navigate(`/admin/curriculum/${unitId}/lessons`);
      }, 1000);
    } catch (err) {
      console.error('Lỗi khi lưu cấu hình bài học:', err);
      addToast(`Lỗi: ${err.message || "Không thể lưu cấu hình bài học"}`, "error");
    } finally {
      setSaveLoading(false);
    }
  };

  // Sub-component state triggers
  const addTurn = () => {
    const nextNum = turns.length + 1;
    setTurns([...turns, {
      id: `turn-${Math.random().toString(36).substr(2, 9)}`,
      role: nextNum % 2 === 0 ? 'user' : 'ai',
      text: ''
    }]);
  };
  const removeTurn = (id) => {
    setTurns(turns.filter(t => t.id !== id));
  };
  const updateTurn = (id, field, value) => {
    setTurns(turns.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const addPair = () => {
    setPairs([...pairs, {
      id: `pair-${Math.random().toString(36).substr(2, 9)}`,
      word: '',
      definition: ''
    }]);
  };
  const removePair = (id) => {
    setPairs(pairs.filter(p => p.id !== id));
  };
  const updatePair = (id, field, value) => {
    setPairs(pairs.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addContext = () => {
    setContexts([...contexts, {
      id: `c-${Math.random().toString(36).substr(2, 9)}`,
      sentence: '',
      audio: `context_audio_${contexts.length + 1}.mp3`,
      translation: ''
    }]);
  };
  const removeContext = (id) => {
    setContexts(contexts.filter(c => c.id !== id));
  };
  const updateContext = (id, field, value) => {
    setContexts(contexts.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const addQuestion = () => {
    setQuestions([...questions, {
      id: `q-${Math.random().toString(36).substr(2, 9)}`,
      question: '',
      options: ['', ''],
      correctOption: '',
      explanation: ''
    }]);
    setActiveQuestionIndex(questions.length);
  };
  const removeQuestion = (index) => {
    if (questions.length <= 1) return;
    const filtered = questions.filter((_, idx) => idx !== index);
    setQuestions(filtered);
    setActiveQuestionIndex(Math.max(0, index - 1));
  };
  const updateQuestion = (index, field, value) => {
    setQuestions(questions.map((q, idx) => {
      if (idx !== index) return q;
      return { ...q, [field]: value };
    }));
  };
  const updateOption = (qIdx, optIdx, value) => {
    setQuestions(questions.map((q, idx) => {
      if (idx !== qIdx) return q;
      const updatedOpts = q.options.map((o, oIdx) => oIdx === optIdx ? value : o);
      return { ...q, options: updatedOpts };
    }));
  };
  const addOption = (qIdx) => {
    setQuestions(questions.map((q, idx) => {
      if (idx !== qIdx) return q;
      return { ...q, options: [...q.options, ''] };
    }));
  };
  const removeOption = (qIdx, optIdx) => {
    setQuestions(questions.map((q, idx) => {
      if (idx !== qIdx) return q;
      if (q.options.length <= 2) return q;
      return { ...q, options: q.options.filter((_, oIdx) => oIdx !== optIdx) };
    }));
  };

  const addPattern = () => {
    setPatterns([...patterns, {
      id: `p-${Math.random().toString(36).substr(2, 9)}`,
      text: ''
    }]);
  };
  const removePattern = (id) => {
    setPatterns(patterns.filter(p => p.id !== id));
  };
  const updatePattern = (id, text) => {
    setPatterns(patterns.map(p => p.id === id ? { ...p, text } : p));
  };

  const addPronunciation = () => {
    setPronunciations([...pronunciations, {
      id: `p-${Math.random().toString(36).substr(2, 9)}`,
      text: '',
      audio: ''
    }]);
  };
  const removePronunciation = (id) => {
    setPronunciations(pronunciations.filter(p => p.id !== id));
  };
  const updatePronunciation = (id, field, value) => {
    setPronunciations(pronunciations.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleWordToggle = (word) => {
    const currentList = watch('hiddenWords') || [];
    let newList;
    if (currentList.includes(word)) {
      newList = currentList.filter(w => w !== word);
    } else {
      newList = [...currentList, word];
    }
    setValue('hiddenWords', newList);
  };

  const handleCriteriaToggle = (criterion) => {
    if (scoringCriteria.includes(criterion)) {
      setScoringCriteria(scoringCriteria.filter(c => c !== criterion));
    } else {
      setScoringCriteria([...scoringCriteria, criterion]);
    }
  };

  const getVisibleCardIndices = () => {
    const total = cards.length;
    const current = activeCardIndex;
    
    let start = Math.max(0, current - 1);
    let end = Math.min(total - 1, current + 1);
    
    if (end - start + 1 < 3) {
      if (start === 0) {
        end = Math.min(total - 1, start + 2);
      } else if (end === total - 1) {
        start = Math.max(0, end - 2);
      }
    }
    
    const visible = [];
    for (let i = start; i <= end; i++) {
      visible.push(i);
    }
    return visible;
  };

  return (
    <main className="content-body">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <Link to="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Trang chủ</Link>
        <span className="separator">&gt;</span>
        <Link to="/admin/curriculum">Chương trình học</Link>
        {level && (
          <>
            <span className="separator">&gt;</span>
            <Link to={`/admin/curriculum/${level.id}`}>
              Quản lý Unit cấp độ {level.name.toLowerCase()}
            </Link>
          </>
        )}
        {unit && (
          <>
            <span className="separator">&gt;</span>
            <Link to={`/admin/curriculum/${unitId}/lessons`}>Bài học {unit.sequence}</Link>
          </>
        )}
        <span className="separator">&gt;</span>
        <span className="current">Cấu hình bài học</span>
      </div>

      {/* Page Header Row */}
      <div className="page-header-row flex justify-between items-center w-full">
        <div>
          <h1 className="page-title">
            {lessonId && lessonId !== 'new' ? `Cấu hình bài học: ${lesson?.title || ''}` : 'Tạo bài học mới'}
          </h1>
          <p className="page-description text-sm text-text-secondary">
            Thiết lập câu hỏi và kịch bản luyện tập cho kỹ năng {selectedGenre}.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddCard}
          className="btn-primary"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Thêm thẻ mới
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '4px solid rgba(78,86,192,0.1)', borderTopColor: 'var(--primary)', animation: 'spin 1s linear infinite' }} />
          <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>Đang tải kịch bản cấu hình...</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-8 w-full">
          <div className="config-grid">
            
            {/* LEFT COLUMN: GENERAL INFO */}
            <div className="w-30">
              <div className="config-card">
                <div className="config-card-title">Thông tin chung</div>

                {/* Lesson Name input */}
                <div className={`input-group ${errors.title ? 'error' : ''}`}>
                  <label>Tên bài học *</label>
                  <input
                    type="text"
                    className="input-field"
                    {...register('title')}
                  />
                  {errors.title && <span className="error-message">✕ {errors.title.message}</span>}
                </div>

                {/* Lesson Subtitle input */}
                <div className={`input-group ${errors.subtitle ? 'error' : ''}`}>
                  <label>Mô tả ngắn bài học *</label>
                  <input
                    type="text"
                    className="input-field"
                    {...register('subtitle')}
                    placeholder="Mô tả ngắn..."
                  />
                  {errors.subtitle && <span className="error-message">✕ {errors.subtitle.message}</span>}
                </div>

                {/* Genre Selector */}
                <div className={`input-group ${errors.genre ? 'error' : ''}`}>
                  <label>Thể loại bài học *</label>
                  <select
                    className="input-field"
                    {...register('genre')}
                  >
                    <option value="Từ vựng">Từ vựng (Vocabulary)</option>
                    <option value="Ngữ pháp">Ngữ pháp (Grammar)</option>
                    <option value="Nghe">Nghe (Listening)</option>
                    <option value="Nói">Nói (Speaking)</option>
                    <option value="Đọc">Đọc (Reading)</option>
                    <option value="Viết">Viết (Writing)</option>
                  </select>
                  {errors.genre && <span className="error-message">✕ {errors.genre.message}</span>}
                </div>

                {/* Total Cards count (Read-only) */}
                <div className="input-group">
                  <label>Tổng số thẻ câu hỏi</label>
                  <input
                    type="text"
                    className="input-field font-bold text-primary"
                    readOnly
                    value={`${cards.length} thẻ`}
                    style={{ backgroundColor: 'rgba(78, 86, 192, 0.03)' }}
                  />
                </div>

                {/* Exercise Type selector */}
                <div className="input-group">
                  <label>Chọn hình thức bài tập *</label>
                  <div className="custom-radio-list flex flex-col gap-2.5 mt-1">
                    {getExerciseTypesForGenre(selectedGenre).map((type) => (
                      <label key={type} className={`custom-radio-item flex items-center gap-3 cursor-pointer p-1 rounded hover:bg-gray-50 ${exerciseType === type ? 'active text-text-primary' : 'text-text-secondary'}`}>
                        <input
                          type="radio"
                          value={type}
                          checked={exerciseType === type}
                          onChange={() => handleTypeChange(type)}
                          className="hidden"
                        />
                        <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${exerciseType === type ? 'border-primary' : 'border-text-secondary/35'}`}>
                          {exerciseType === type && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </span>
                        <span className="text-sm" style={{ fontWeight: '500', textTransform: 'none' }}>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: DETAILED CONFIGURATION */}
            <div className="w-70">
              <div className="config-card flex flex-col gap-6" style={{ border: '2px solid var(--primary)', boxShadow: 'var(--elevation-active-glow)' }}>
                {/* Active Card Index Header similar to ExamConfig */}
                <div className="page-header-row" style={{ borderBottom: '1px solid rgba(78, 86, 192, 0.08)', paddingBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '800'
                      }}
                    >
                      {activeCardIndex + 1}
                    </div>
                    <span style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '15px' }}>
                      Cấu hình Thẻ #{activeCardIndex + 1} - Kỹ năng {selectedGenre} ({exerciseType})
                    </span>
                  </div>
                </div>
                
                {/* Render split config sub-components */}
                {exerciseType === 'Flashcards SRS' && (
                  <FlashcardConfig register={register} watch={watch} errors={errors} />
                )}

                {exerciseType === 'Kéo thả' && (
                  <DragDropConfig
                    pairs={pairs}
                    addPair={addPair}
                    removePair={removePair}
                    updatePair={updatePair}
                    register={register}
                    errors={errors}
                  />
                )}

                {exerciseType === 'Đoán nghĩa qua ngữ cảnh' && (
                  <ConcordanceConfig
                    contexts={contexts}
                    addContext={addContext}
                    removeContext={removeContext}
                    updateContext={updateContext}
                    register={register}
                    errors={errors}
                    watch={watch}
                  />
                )}

                {exerciseType === 'Focus Mode' && (
                  <FocusModeConfig
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    handleWordToggle={handleWordToggle}
                    fullSentenceText={fullSentenceText}
                  />
                )}

                {exerciseType === 'Nhận diện khuôn mẫu' && (
                  <PatternConfig
                    register={register}
                    errors={errors}
                    patterns={patterns}
                    addPattern={addPattern}
                    removePattern={removePattern}
                    updatePattern={updatePattern}
                    questions={questions}
                    activeQuestionIndex={activeQuestionIndex}
                    setActiveQuestionIndex={setActiveQuestionIndex}
                    addQuestion={addQuestion}
                    removeQuestion={removeQuestion}
                    updateQuestion={updateQuestion}
                    addOption={addOption}
                    removeOption={removeOption}
                    updateOption={updateOption}
                  />
                )}

                {exerciseType === 'Viết lại câu' && (
                  <RewriteConfig register={register} errors={errors} />
                )}

                {exerciseType === 'Interactive Stories' && (
                  <InteractiveStoriesConfig
                    register={register}
                    watch={watch}
                    errors={errors}
                    questions={questions}
                    activeQuestionIndex={activeQuestionIndex}
                    setActiveQuestionIndex={setActiveQuestionIndex}
                    addQuestion={addQuestion}
                    removeQuestion={removeQuestion}
                    updateQuestion={updateQuestion}
                    addOption={addOption}
                    removeOption={removeOption}
                    updateOption={updateOption}
                  />
                )}

                {exerciseType === 'Phát âm từ đơn/câu ngắn' && (
                  <PronunciationConfig
                    pronunciations={pronunciations}
                    addPronunciation={addPronunciation}
                    removePronunciation={removePronunciation}
                    updatePronunciation={updatePronunciation}
                    register={register}
                    errors={errors}
                  />
                )}

                {exerciseType === 'Hội thoại nhập vai với AI' && (
                  <RoleplayConfig
                    register={register}
                    errors={errors}
                    turns={turns}
                    addTurn={addTurn}
                    removeTurn={removeTurn}
                    updateTurn={updateTurn}
                  />
                )}

                {exerciseType === 'Đọc hiểu thông thường' && (
                  <ReadingComprehensionConfig
                    register={register}
                    errors={errors}
                    questions={questions}
                    activeQuestionIndex={activeQuestionIndex}
                    setActiveQuestionIndex={setActiveQuestionIndex}
                    addQuestion={addQuestion}
                    removeQuestion={removeQuestion}
                    updateQuestion={updateQuestion}
                    addOption={addOption}
                    removeOption={removeOption}
                    updateOption={updateOption}
                  />
                )}

                {exerciseType === 'Ghép câu' && (
                  <SentenceScrambleConfig register={register} errors={errors} />
                )}

                {exerciseType === 'Viết luận chấm AI' && (
                  <AiEssayConfig
                    register={register}
                    watch={watch}
                    errors={errors}
                    scoringCriteria={scoringCriteria}
                    handleCriteriaToggle={handleCriteriaToggle}
                  />
                )}

                {/* Common fields (Explanation) */}
                <div className="form-group flex flex-col gap-1.5 border-t border-border/80 pt-4">
                  <label className="text-sm font-bold text-text-primary">Giải thích chi tiết của Giáo viên *</label>
                  <textarea
                    className="w-full p-2.5 border border-input rounded-lg text-[15px] bg-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    rows={3}
                    {...register('explanation')}
                    placeholder="Nhập giải thích sư phạm tại đây để hiển thị khi học sinh xem đáp án..."
                  />
                </div>

                {/* Card Footer Pagination */}
                <div className="card-footer-pagination flex justify-between items-center border-t border-border pt-5 mt-4 w-full">
                  <button
                    type="button"
                    onClick={handleDeleteCard}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-error/5 border border-error/15 text-error font-semibold text-xs rounded-lg hover:bg-error/10 hover:border-error cursor-pointer"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Xóa thẻ này
                  </button>
                  <div className="pag-right flex items-center gap-3">
                    <span className="pag-info-text text-xs font-semibold text-text-secondary">
                      Đang hiển thị {activeCardIndex + 1} trong số {cards.length} thẻ
                    </span>
                    <div className="pag-controls flex gap-1.5">
                      <button
                        type="button"
                        disabled={activeCardIndex === 0}
                        onClick={() => handleSwitchCard(activeCardIndex - 1)}
                        className="w-8 h-8 rounded text-xs font-bold flex items-center justify-center border border-border text-text-primary hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        &lt;
                      </button>
                      {getVisibleCardIndices().map((idx) => (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => handleSwitchCard(idx)}
                          className={`w-8 h-8 rounded text-xs font-bold flex items-center justify-center border ${
                            activeCardIndex === idx
                              ? 'bg-primary border-primary text-surface font-bold'
                              : 'bg-surface border-border text-text-primary hover:bg-gray-50'
                          } cursor-pointer`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                      <button
                        type="button"
                        disabled={activeCardIndex === cards.length - 1}
                        onClick={() => handleSwitchCard(activeCardIndex + 1)}
                        className="w-8 h-8 rounded text-xs font-bold flex items-center justify-center border border-border text-text-primary hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        &gt;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Main page Actions row */}
          <div className="bottom-actions flex justify-end gap-4 border-t border-border pt-5 w-full">
            <Link to={`/admin/curriculum/${unitId}/lessons`} className="px-5 py-2.5 border border-border text-text-secondary font-semibold text-sm rounded-lg hover:bg-gray-50">
              Hủy bỏ
            </Link>
            <button
              type="submit"
              disabled={saveLoading}
              className="px-6 py-2.5 bg-primary text-surface font-bold text-sm rounded-lg hover:shadow-lg disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              {saveLoading ? 'Đang lưu...' : 'Lưu bài học'}
              {saveSuccess && (
                <svg className="w-4 h-4 text-surface animate-bounce" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          </div>
        </form>
      )}
    </main>
  );
}
