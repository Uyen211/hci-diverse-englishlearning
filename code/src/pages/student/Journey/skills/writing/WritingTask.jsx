import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link, useNavigate, useBlocker } from 'react-router-dom'
import { useToastStore } from '@/store/toastStore'

export default function WritingTask() {
  const navigate = useNavigate()
  const { addToast } = useToastStore()
  const [text, setText] = useState('')
  const [errorType, setErrorType] = useState(null) // null | 'empty' | 'short'
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isSubmittedRef = useRef(false)

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      !isSubmittedRef.current && currentLocation.pathname !== nextLocation.pathname
  )

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isSubmittedRef.current) return
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  // Calculate word count
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const MAX_WORDS = 100
  const MIN_WORDS = 50

  const handleTextChange = (e) => {
    setText(e.target.value)
    if (errorType) setErrorType(null) // Clear error when typing
  }

  const handleSubmit = () => {
    if (wordCount === 0) {
      setErrorType('empty')
    } else if (wordCount < MIN_WORDS) {
      setErrorType('short')
    } else {
      setIsModalOpen(true)
    }
  }

  const handleConfirmSubmit = () => {
    isSubmittedRef.current = true
    setIsModalOpen(false)
    addToast("Nộp bài viết thành công. AI đang chấm điểm...", "success")
    navigate('/student/writing/result')
  }

  const isError = errorType !== null

  // For testing purposes: expose a hidden feature to toggle errors manually
  const toggleTestError = () => {
    if (errorType === null) setErrorType('empty')
    else if (errorType === 'empty') {
      setText('I like reading books.')
      setErrorType('short')
    }
    else {
      setText('')
      setErrorType(null)
    }
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div
        className="flex flex-col gap-6 max-w-4xl mx-auto pb-12 h-full"
        style={(isModalOpen || blocker.state === 'blocked') ? { opacity: 0.35, filter: 'blur(1.5px)', pointerEvents: 'none' } : {}}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="breadcrumbs flex items-center gap-2 text-xs font-semibold text-text-secondary">
            <span className="hover:underline cursor-pointer" onClick={() => navigate('/')}>Trang chủ</span>
            <span className="opacity-50">&gt;</span>
            <span className="hover:underline cursor-pointer" onClick={() => navigate('/student/journey')}>Hành trình</span>
            <span className="opacity-50">&gt;</span>
            <span className="hover:underline cursor-pointer" onClick={() => navigate('/student/unit/3')}>Unit 3</span>
            <span className="opacity-50">&gt;</span>
            <span className="hover:underline cursor-pointer" onClick={() => navigate('/student/writing-select')}>Luyện viết</span>
            <span className="opacity-50">&gt;</span>
            <span className="text-primary font-bold">Luyện viết</span>
          </div>
          {/* Hidden button to toggle error state for demo presentation */}
          <button onClick={toggleTestError} className="text-xs text-text-secondary opacity-50 hover:opacity-100">Test Errors</button>
        </div>

        <h1 className="text-3xl font-extrabold text-text-primary mb-6">Luyện Viết - Writing Task</h1>

        <div className="p-1 rounded-3xl transition-all bg-transparent">
          <Card className="border-none shadow-soft h-full bg-white">
            <CardContent className="p-8">

              {/* Prompt Box */}
              <div className="rounded-xl p-6 mb-8 bg-surface">
                <h4 className="font-bold text-text-primary mb-3">Đề bài:</h4>
                <p className="text-text-primary leading-relaxed">
                  Viết một đoạn văn (khoảng 50-100 từ) mô tả về sở thích cá nhân của bạn trong thời gian rảnh rỗi.
                  Hãy giải thích tại sao bạn lại yêu thích nó.
                </p>
              </div>

              {/* Text Area */}
              <div className="flex flex-col gap-2">
                <label className={`text-sm font-bold ${isError ? 'text-error' : 'text-text-primary'}`}>
                  Khung soạn thảo bài viết {isError && '*'}
                </label>
                <textarea
                  className={`w-full min-h-[200px] p-4 rounded-xl border-2 transition-all resize-y text-base text-text-primary
                    ${isError ? 'border-error/30 bg-error/5 focus:border-error focus:ring-1 focus:ring-error'
                      : 'border-border bg-surface focus:border-primary focus:ring-1 focus:ring-primary'}`}
                  placeholder="Nhập bài viết của bạn tại đây..."
                  value={text}
                  onChange={handleTextChange}
                ></textarea>

                {/* Error Messages */}
                {errorType === 'empty' && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] bg-error text-white w-3 h-3 flex items-center justify-center rounded font-bold">!</span>
                    <span className="text-xs font-bold text-error">Nội dung bài viết không được để trống. Vui lòng nhập bài viết của bạn!</span>
                  </div>
                )}
                {errorType === 'short' && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] bg-error text-white w-3 h-3 flex items-center justify-center rounded font-bold">!</span>
                    <span className="text-xs font-bold text-error">Bài viết quá ngắn. Yêu cầu tối thiểu 50 từ (hiện tại: {wordCount} từ).</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mt-6">
                <span className={`text-sm font-medium ${isError ? 'text-error' : 'text-text-secondary'}`}>
                  Số từ: {wordCount} / {MAX_WORDS} (Tối thiểu {MIN_WORDS} từ)
                </span>
                <Button
                  className="px-8 rounded-full shadow-sm font-bold shadow-active-glow"
                  onClick={handleSubmit}
                >
                  Nộp bài
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {isModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 1000, position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(28, 27, 46, 0.45)', backdropFilter: 'blur(8px)' }}>
          <div className="modal-box" style={{ width: '460px', textAlign: 'center', alignItems: 'center', padding: '36px', borderRadius: 'var(--rounded-xxl)', backgroundColor: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: '24px', boxShadow: '0 20px 48px rgba(28, 27, 46, 0.2)' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(78, 86, 192, 0.08)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <span style={{ fontFamily: 'var(--font-primary)', fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>Xác nhận nộp bài</span>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>Bài viết của bạn hiện tại có {wordCount} từ. Bạn có chắc chắn muốn nộp để AI chấm điểm không?</p>
            <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn-secondary"
                style={{ flex: 1, padding: '12px', borderRadius: 'var(--rounded-lg)', fontWeight: '700', cursor: 'pointer', border: '1px solid rgba(78, 86, 192, 0.12)', backgroundColor: 'var(--surface)', color: 'var(--text-secondary)' }}
              >
                Quay lại
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="btn-primary"
                style={{ flex: 1, padding: '12px', borderRadius: 'var(--rounded-lg)', fontWeight: '700', cursor: 'pointer', backgroundColor: 'var(--primary)', color: '#fff', border: 'none' }}
              >
                Nộp bài ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Confirmation Modal */}
      {blocker.state === 'blocked' && (
        <div className="modal-overlay" style={{ zIndex: 1000, position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(28, 27, 46, 0.45)', backdropFilter: 'blur(8px)' }}>
          <div className="modal-box" style={{ width: '460px', textAlign: 'center', alignItems: 'center', padding: '36px', borderRadius: 'var(--rounded-xxl)', backgroundColor: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: '24px', boxShadow: '0 20px 48px rgba(28, 27, 46, 0.2)' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.08)', color: 'var(--error)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <span style={{ fontFamily: 'var(--font-primary)', fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>Rời khỏi trang luyện viết?</span>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>Tiến trình luyện viết hiện tại của bạn sẽ bị hủy và không được lưu lại. Bạn có chắc chắn muốn rời đi?</p>
            <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
              <button
                onClick={() => blocker.reset()}
                className="btn-secondary"
                style={{ flex: 1, padding: '12px', borderRadius: 'var(--rounded-lg)', fontWeight: '700', cursor: 'pointer', border: '1px solid rgba(78, 86, 192, 0.12)', backgroundColor: 'var(--surface)', color: 'var(--text-secondary)' }}
              >
                Làm tiếp
              </button>
              <button
                onClick={() => blocker.proceed()}
                className="btn-danger"
                style={{ flex: 1, padding: '12px', borderRadius: 'var(--rounded-lg)', fontWeight: '700', cursor: 'pointer', backgroundColor: 'var(--error)', color: '#fff', border: 'none' }}
              >
                Rời đi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
