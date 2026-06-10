import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { examService } from '../../../services/examService';
import { levelService } from '../../../services/levelService';
import { unitService } from '../../../services/unitService';

import McqConfig from './components/McqConfig';
import ListeningConfig from './components/ListeningConfig';
import SpeakingConfig from './components/SpeakingConfig';
import ReadingConfig from './components/ReadingConfig';
import WritingConfig from './components/WritingConfig';
import UnitSelectorModal from './components/UnitSelectorModal';

// Validation schema for general fields using Zod
const examFormSchema = z.object({
  title: z.string().min(1, { message: 'Trường này không được để trống.' }),
  description: z.string().optional(),
  duration: z.coerce.number().min(1, { message: 'Vui lòng nhập thời gian làm bài.' }),
  type: z.enum(['Mini-test', 'Level test', 'Mock test']),
  levelId: z.string().nullable().optional(),
  unitId: z.string().nullable().optional()
});

export default function ExamConfig() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const isCreateMode = !examId || examId === 'new';

  const [levels, setLevels] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  // local states for questions
  const [questions, setQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [activeSkill, setActiveSkill] = useState('Trắc nghiệm');

  // Modals and notifications
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(examFormSchema),
    defaultValues: {
      title: '',
      description: '',
      duration: 15,
      type: 'Mini-test',
      levelId: '',
      unitId: ''
    }
  });

  const watchType = watch('type');
  const watchUnitId = watch('unitId');
  const watchTitle = watch('title');

  // Load levels, units, and initial exam data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [levelsData, unitsData] = await Promise.all([
          levelService.getLevels(),
          unitService.getUnits()
        ]);
        setLevels(levelsData);
        setUnits(unitsData);

        if (!isCreateMode) {
          const exam = await examService.getExamById(examId);
          if (exam) {
            setValue('title', exam.title);
            setValue('description', exam.description || '');
            setValue('duration', exam.duration);
            setValue('type', exam.type);
            setValue('levelId', exam.levelId || '');
            setValue('unitId', exam.unitId || '');
            setQuestions(exam.questions || []);
            setActiveQuestionIndex(0);
            if (exam.questions && exam.questions.length > 0) {
              setActiveSkill(exam.questions[0].skill);
            }
          }
        } else {
          // Initialize with one default MCQ question
          setQuestions([
            {
              id: 'q-initial',
              skill: 'Trắc nghiệm',
              content: '',
              options: ['', '', '', ''],
              correctOption: '',
              explanation: ''
            }
          ]);
          setActiveQuestionIndex(0);
          setActiveSkill('Trắc nghiệm');
        }
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu bài thi:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [examId, isCreateMode, setValue]);

  // Form custom validations for questions and subquestions
  const validateForm = (data) => {
    const errs = {};
    if (!data.title) errs.title = "Trường này không được để trống.";
    if (!data.duration || data.duration <= 0) errs.duration = "Vui lòng nhập thời gian làm bài.";
    if (data.type === 'Mini-test' && !data.unitId) errs.unitId = "Vui lòng chọn Unit liên kết.";
    if (data.type === 'Level test' && !data.levelId) errs.levelId = "Vui lòng chọn Cấp độ liên kết.";

    // Validate questions array
    const qErrs = [];
    let firstErrIdx = -1;
    questions.forEach((q, idx) => {
      const qErr = {};
      if (q.skill === 'Trắc nghiệm') {
        if (!q.content) qErr.content = "Nội dung câu hỏi không được để trống.";
        const validOptions = (q.options || []).filter(o => o.trim() !== '');
        if (validOptions.length < 2) qErr.options = "Vui lòng nhập ít nhất 2 đáp án.";
        if (!q.correctOption) qErr.correctOption = "Vui lòng chọn đáp án đúng.";
        if (!q.explanation) qErr.explanation = "Vui lòng nhập giải thích chi tiết.";
      } else if (q.skill === 'Nghe') {
        if (!q.audioFile) qErr.audioFile = "Chưa tải lên file âm thanh.";
        const subQErrs = [];
        (q.subQuestions || []).forEach((sub, sIdx) => {
          const subErr = {};
          if (!sub.content) subErr.content = "Nội dung câu hỏi nhỏ không được để trống.";
          const validOpts = (sub.options || []).filter(o => o.trim() !== '');
          if (validOpts.length < 2) subErr.options = "Vui lòng nhập ít nhất 2 đáp án.";
          if (!sub.correctOption) subErr.correctOption = "Vui lòng chọn đáp án đúng.";
          if (!sub.explanation) subErr.explanation = "Vui lòng nhập giải thích chi tiết.";
          if (Object.keys(subErr).length > 0) {
            subQErrs[sIdx] = subErr;
          }
        });
        if (subQErrs.length > 0) qErr.subQuestions = subQErrs;
      } else if (q.skill === 'Nói') {
        if (!q.situation) qErr.situation = "Tình huống giả định không được để trống.";
        if (!q.aiRole) qErr.aiRole = "Vai AI không được để trống.";
        if (!q.userRole) qErr.userRole = "Vai người học không được để trống.";
        const validTurns = (q.dialogueTurns || []).filter(t => t.text.trim() !== '');
        if (validTurns.length === 0) qErr.dialogueTurns = "Vui lòng thêm kịch bản hội thoại mẫu.";
        if (!q.gradingGuide) qErr.gradingGuide = "Vui lòng nhập hướng dẫn AI chấm điểm.";
      } else if (q.skill === 'Đọc') {
        if (!q.passageTitle) qErr.passageTitle = "Tiêu đề đoạn văn không được để trống.";
        if (!q.passageContent) qErr.passageContent = "Nội dung đoạn văn không được để trống.";
        const subQErrs = [];
        (q.subQuestions || []).forEach((sub, sIdx) => {
          const subErr = {};
          if (!sub.content) subErr.content = "Nội dung câu hỏi nhỏ không được để trống.";
          const validOpts = (sub.options || []).filter(o => o.trim() !== '');
          if (validOpts.length < 2) subErr.options = "Vui lòng nhập ít nhất 2 đáp án.";
          if (!sub.correctOption) subErr.correctOption = "Vui lòng chọn đáp án đúng.";
          if (!sub.explanation) subErr.explanation = "Vui lòng nhập giải thích chi tiết.";
          if (Object.keys(subErr).length > 0) {
            subQErrs[sIdx] = subErr;
          }
        });
        if (subQErrs.length > 0) qErr.subQuestions = subQErrs;
      } else if (q.skill === 'Viết') {
        if (!q.essayPrompt) qErr.essayPrompt = "Đề bài viết luận không được để trống.";
        if (!q.minWords || q.minWords <= 0) qErr.minWords = "Số từ tối thiểu phải lớn hơn 0.";
        if (!q.keywords) qErr.keywords = "Vui lòng nhập từ khóa chấm điểm.";
        if (!q.referenceEssay) qErr.referenceEssay = "Vui lòng nhập bài viết mẫu.";
      }

      if (Object.keys(qErr).length > 0) {
        qErrs[idx] = qErr;
        if (firstErrIdx === -1) {
          firstErrIdx = idx;
        }
      }
    });

    if (qErrs.length > 0) errs.questions = qErrs;
    setValidationErrors(errs);
    return { isValid: Object.keys(errs).length === 0, firstErrIdx };
  };

  // Submit Handler
  const onSubmit = async (data) => {
    const { isValid, firstErrIdx } = validateForm(data);
    if (!isValid) {
      if (firstErrIdx !== -1) {
        setActiveQuestionIndex(firstErrIdx);
        if (questions[firstErrIdx]) {
          setActiveSkill(questions[firstErrIdx].skill);
        }
      }
      return;
    }

    try {
      setSaveLoading(true);
      const payload = {
        ...data,
        questions
      };

      if (isCreateMode) {
        await examService.addExam(payload);
      } else {
        await examService.updateExam(examId, payload);
      }

      setSaveSuccess(true);
      setTimeout(() => {
        navigate('/admin/exams');
      }, 1000);
    } catch (err) {
      console.error('Lỗi khi lưu đề thi:', err);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleAddQuestion = () => {
    const newQ = {
      id: `q-${Math.random().toString(36).substr(2, 9)}`,
      skill: activeSkill,
    };

    if (activeSkill === 'Trắc nghiệm') {
      newQ.content = '';
      newQ.options = ['', '', '', ''];
      newQ.correctOption = '';
      newQ.explanation = '';
    } else if (activeSkill === 'Nghe') {
      newQ.audioFile = '';
      newQ.script = '';
      newQ.subQuestions = [
        {
          id: `sub-q-${Math.random().toString(36).substr(2, 9)}`,
          content: '',
          options: ['', '', '', ''],
          correctOption: '',
          explanation: ''
        }
      ];
    } else if (activeSkill === 'Nói') {
      newQ.situation = '';
      newQ.aiRole = '';
      newQ.userRole = '';
      newQ.dialogueTurns = [{ role: 'ai', text: '' }];
      newQ.gradingGuide = '';
    } else if (activeSkill === 'Đọc') {
      newQ.passageTitle = '';
      newQ.passageContent = '';
      newQ.subQuestions = [
        {
          id: `sub-q-${Math.random().toString(36).substr(2, 9)}`,
          content: '',
          options: ['', '', '', ''],
          correctOption: '',
          explanation: ''
        }
      ];
    } else if (activeSkill === 'Viết') {
      newQ.essayPrompt = '';
      newQ.essayType = 'IELTS Writing Task 2';
      newQ.minWords = 250;
      newQ.image = null;
      newQ.keywords = '';
      newQ.referenceEssay = '';
    }

    const newQuestions = [...questions, newQ];
    setQuestions(newQuestions);
    setActiveQuestionIndex(newQuestions.length - 1);
  };

  const handleDeleteQuestion = () => {
    if (questions.length <= 1) {
      alert('Đề thi phải có ít nhất 1 câu hỏi/bài tập!');
      return;
    }
    const newQuestions = questions.filter((_, idx) => idx !== activeQuestionIndex);
    setQuestions(newQuestions);

    const remainingSameSkillIdx = newQuestions.findIndex(q => q.skill === activeSkill);
    if (remainingSameSkillIdx !== -1) {
      setActiveQuestionIndex(remainingSameSkillIdx);
    } else {
      if (newQuestions.length > 0) {
        const firstQ = newQuestions[0];
        setActiveQuestionIndex(0);
        setActiveSkill(firstQ.skill);
      } else {
        setActiveQuestionIndex(-1);
      }
    }
  };

  const updateActiveQuestion = (updatedQuestion) => {
    const list = [...questions];
    list[activeQuestionIndex] = updatedQuestion;
    setQuestions(list);
  };

  // Switch skill/tab of current active question or select first question of that skill
  const handleSkillTabChange = (selectedSkill) => {
    setActiveSkill(selectedSkill);
    const targetIdx = questions.findIndex(q => q.skill === selectedSkill);

    if (targetIdx !== -1) {
      setActiveQuestionIndex(targetIdx);
    } else {
      setActiveQuestionIndex(-1);
    }
  };

  // Helper selectors
  const activeQuestion = questions[activeQuestionIndex] || null;
  const activeUnit = units.find(u => u.id === watchUnitId);

  const getVisiblePageIndices = () => {
    const total = questions.length;
    const current = activeQuestionIndex;
    
    let start = Math.max(0, current - 1);
    let end = Math.min(total - 1, current + 1);
    
    if (end - start + 1 < 3) {
      if (start === 0) {
        end = Math.min(total - 1, start + 2);
      } else if (end === total - 1) {
        start = Math.max(0, end - 2);
      }
    }
    
    const visiblePages = [];
    for (let i = start; i <= end; i++) {
      visiblePages.push({ type: 'page', index: i });
    }
    return visiblePages;
  };


  return (
    <main className="content-body">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <Link to="/">Trang chủ</Link>
        <span className="separator">&gt;</span>
        <Link to="/admin/exams">Quản lý đề thi</Link>
        <span className="separator">&gt;</span>
        <span className="current">{isCreateMode ? 'Tạo đề thi' : 'Biên soạn đề thi'}</span>
      </div>

      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <h1 className="page-title">
            {isCreateMode ? 'Tạo đề thi mới' : `Biên soạn đề thi: ${watchTitle || ''}`}
          </h1>
          <p className="page-description">
            Thiết lập câu hỏi kiểm tra kỹ năng tiếng Anh cho người học trên vũ trụ DiveVerse.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddQuestion}
          className="btn-primary"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Thêm câu hỏi mới
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '4px solid rgba(78,86,192,0.1)', borderTopColor: 'var(--primary)', animation: 'spin 1s linear infinite' }} />
          <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>Đang tải kịch bản biên soạn...</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full">
          <div className="config-grid">
            
            {/* LEFT COLUMN: GENERAL SETTINGS & INDEX */}
            <div className="w-30">
              <div className="config-card">
                <div className="config-card-title">Thiết lập chung</div>

                {/* Exam Title */}
                <div className={`input-group ${errors.title || validationErrors.title ? 'error' : ''}`}>
                  <label>Tên bài kiểm tra *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Nhập tên bài kiểm tra..."
                    {...register('title')}
                  />
                  {(errors.title || validationErrors.title) && (
                    <span className="error-message">✕ {errors.title?.message || validationErrors.title}</span>
                  )}
                </div>

                {/* Description */}
                <div className="input-group">
                  <label>Mô tả</label>
                  <textarea
                    className="input-field"
                    rows={3}
                    placeholder="Nhập mô tả ngắn..."
                    style={{ resize: 'none' }}
                    {...register('description')}
                  />
                </div>

                {/* Duration */}
                <div className={`input-group ${errors.duration || validationErrors.duration ? 'error' : ''}`}>
                  <label>Thời gian (phút) *</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="Nhập thời gian..."
                    {...register('duration')}
                  />
                  {(errors.duration || validationErrors.duration) && (
                    <span className="error-message">✕ {errors.duration?.message || validationErrors.duration}</span>
                  )}
                </div>

                {/* Exam Type */}
                <div className="input-group">
                  <label>Loại bài kiểm tra</label>
                  <select className="input-field" {...register('type')}>
                    <option value="Mini-test">Mini-test cuối Unit</option>
                    <option value="Level test">Level test cuối cấp độ</option>
                    <option value="Mock test">Mock test tự do</option>
                  </select>
                </div>

                {/* Unit selector dynamically loaded */}
                {watchType === 'Mini-test' && (
                  <div className={`input-group ${validationErrors.unitId ? 'error' : ''}`}>
                    <label>Unit liên kết *</label>
                    <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                      <input
                        type="text"
                        className="input-field"
                        readOnly
                        value={activeUnit ? `${activeUnit.sequence}: ${activeUnit.title}` : 'Chưa chọn'}
                        style={{ flexGrow: 1 }}
                      />
                      <button
                        type="button"
                        onClick={() => setIsUnitModalOpen(true)}
                        className="btn-secondary"
                        style={{ padding: '10px 14px' }}
                      >
                        Chọn
                      </button>
                    </div>
                    {validationErrors.unitId && (
                      <span className="error-message">✕ {validationErrors.unitId}</span>
                    )}
                  </div>
                )}

                {/* Level selector dynamically loaded */}
                {watchType === 'Level test' && (
                  <div className={`input-group ${validationErrors.levelId ? 'error' : ''}`}>
                    <label>Cấp độ liên kết *</label>
                    <select className="input-field" {...register('levelId')}>
                      <option value="">-- Chọn Cấp độ --</option>
                      {levels.map(l => (
                        <option key={l.id} value={l.id}>{l.name} ({l.cefrShort})</option>
                      ))}
                    </select>
                    {validationErrors.levelId && (
                      <span className="error-message">✕ {validationErrors.levelId}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Questions Index */}
              <div className="config-card">
                <div className="config-card-title" style={{ border: 'none', padding: 0, marginBottom: '12px' }}>
                  Mục lục câu hỏi ({questions.length})
                </div>
                <div className="index-list-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {['Trắc nghiệm', 'Nghe', 'Nói', 'Đọc', 'Viết'].map((skill) => {
                    const skillQuestions = questions.filter(q => q.skill === skill);
                    if (skillQuestions.length === 0) return null;
                    return (
                      <div key={skill} className="index-skill-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {skill} ({skillQuestions.length})
                        </div>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {questions.map((q, idx) => {
                            if (q.skill !== skill) return null;
                            const hasErr = validationErrors?.questions?.[idx] && Object.keys(validationErrors.questions[idx]).length > 0;
                            return (
                              <button
                                key={q.id}
                                type="button"
                                onClick={() => {
                                  setActiveQuestionIndex(idx);
                                  setActiveSkill(q.skill);
                                }}
                                className={`page-btn ${activeQuestionIndex === idx ? 'active' : ''}`}
                                style={hasErr ? { border: '1.5px dashed var(--error)', color: 'var(--error)' } : {}}
                              >
                                {idx + 1}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: DETAILS EDITOR */}
            <div className="w-70">
              <div className="creator-skill-tabs">
                {['Trắc nghiệm', 'Nghe', 'Nói', 'Đọc', 'Viết'].map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillTabChange(skill)}
                    className={`creator-skill-tab ${activeSkill === skill ? 'active' : ''}`}
                  >
                    {skill}
                  </button>
                ))}
              </div>

              {activeQuestion ? (
                <div
                  className="config-card"
                  style={{
                    border: validationErrors?.questions?.[activeQuestionIndex]
                      ? '2px solid var(--error)'
                      : '2px solid var(--primary)',
                    boxShadow: validationErrors?.questions?.[activeQuestionIndex]
                      ? '0 0 20px rgba(239, 68, 68, 0.15)'
                      : 'var(--elevation-active-glow)'
                  }}
                >
                  <div className="page-header-row" style={{ borderBottom: '1px solid rgba(78, 86, 192, 0.08)', paddingBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: validationErrors?.questions?.[activeQuestionIndex] ? 'var(--error)' : 'var(--primary)',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '800'
                        }}
                      >
                        {activeQuestionIndex + 1}
                      </div>
                      <span style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '15px' }}>
                        Biên soạn {activeQuestion.skill.toLowerCase()}
                      </span>
                    </div>
                  </div>

                  {/* Render correct sub-editor panel */}
                  {activeQuestion.skill === 'Trắc nghiệm' && (
                    <McqConfig
                      question={activeQuestion}
                      onChange={updateActiveQuestion}
                      errors={validationErrors?.questions?.[activeQuestionIndex]}
                    />
                  )}

                  {activeQuestion.skill === 'Nghe' && (
                    <ListeningConfig
                      question={activeQuestion}
                      onChange={updateActiveQuestion}
                      errors={validationErrors?.questions?.[activeQuestionIndex]}
                    />
                  )}

                  {activeQuestion.skill === 'Nói' && (
                    <SpeakingConfig
                      question={activeQuestion}
                      onChange={updateActiveQuestion}
                      errors={validationErrors?.questions?.[activeQuestionIndex]}
                    />
                  )}

                  {activeQuestion.skill === 'Đọc' && (
                    <ReadingConfig
                      question={activeQuestion}
                      onChange={updateActiveQuestion}
                      errors={validationErrors?.questions?.[activeQuestionIndex]}
                    />
                  )}

                  {activeQuestion.skill === 'Viết' && (
                    <WritingConfig
                      question={activeQuestion}
                      onChange={updateActiveQuestion}
                      errors={validationErrors?.questions?.[activeQuestionIndex]}
                    />
                  )}

                  {/* Question Cards bottom stats & actions */}
                  <div className="page-header-row" style={{ borderTop: '1px solid rgba(78, 86, 192, 0.08)', paddingTop: '16px', marginTop: '16px' }}>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={handleDeleteQuestion}
                        className="inline-flex items-center gap-2 px-3 py-2 bg-error/5 border border-error/15 text-error font-semibold text-xs rounded-lg hover:bg-error/10 hover:border-error cursor-pointer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        Xóa câu hỏi này
                      </button>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                        Đang hiển thị câu {activeQuestionIndex + 1} trong số {questions.length} câu hỏi
                      </span>
                      <div className="pagination-container">
                        <button
                          type="button"
                          disabled={activeQuestionIndex === 0}
                          onClick={() => {
                            const prevIdx = activeQuestionIndex - 1;
                            setActiveQuestionIndex(prevIdx);
                            setActiveSkill(questions[prevIdx].skill);
                          }}
                          className="page-btn"
                          style={{ minWidth: '32px' }}
                        >
                          &lt;
                        </button>
                        {getVisiblePageIndices().map((item, idx) => {
                          if (item.type === 'ellipsis') {
                            return <span key={`ell-${idx}`} style={{ padding: '0 4px', color: 'var(--text-secondary)' }}>...</span>;
                          }
                          return (
                            <button
                              key={item.index}
                              type="button"
                              onClick={() => {
                                setActiveQuestionIndex(item.index);
                                setActiveSkill(questions[item.index].skill);
                              }}
                              className={`page-btn ${activeQuestionIndex === item.index ? 'active' : ''}`}
                              style={{ minWidth: '32px' }}
                            >
                              {item.index + 1}
                            </button>
                          );
                        })}
                        <button
                          type="button"
                          disabled={activeQuestionIndex === questions.length - 1}
                          onClick={() => {
                            const nextIdx = activeQuestionIndex + 1;
                            setActiveQuestionIndex(nextIdx);
                            setActiveSkill(questions[nextIdx].skill);
                          }}
                          className="page-btn"
                          style={{ minWidth: '32px' }}
                        >
                          &gt;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="config-card" style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--text-secondary)', border: '2px dashed rgba(78, 86, 192, 0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <div>
                    <h3 style={{ fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>Chưa có câu hỏi {activeSkill.toLowerCase()} nào</h3>
                    <p style={{ fontSize: '13px' }}>Vui lòng bấm vào nút "+ Thêm câu hỏi mới" ở góc trên bên phải để tạo câu hỏi đầu tiên cho kỹ năng này.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form bottom action rows */}
          <div className="flex-row justify-end gap-16" style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', borderTop: '1px solid rgba(78, 86, 192, 0.08)', paddingTop: '20px' }}>
            <Link
              to="/admin/exams"
              className="btn-secondary"
              style={{ width: '150px', display: 'flex', justifyContent: 'center' }}
            >
              Hủy bỏ
            </Link>
            <button
              type="submit"
              disabled={saveLoading}
              className="btn-primary"
              style={{ width: '200px', display: 'flex', justifyContent: 'center', gap: '8px' }}
            >
              {saveLoading ? 'Đang lưu...' : 'Lưu bài kiểm tra'}
              {saveSuccess && (
                <svg className="w-4 h-4 text-surface animate-bounce" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Unit Selector Modal popup */}
      <UnitSelectorModal
        isOpen={isUnitModalOpen}
        onClose={() => setIsUnitModalOpen(false)}
        onSelect={(unit) => {
          setValue('unitId', unit.id);
          setIsUnitModalOpen(false);
        }}
        units={units}
        levels={levels}
      />
    </main>
  );
}
