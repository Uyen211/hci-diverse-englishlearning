import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link, useNavigate, useBlocker } from 'react-router-dom'
import { useToastStore } from '@/store/toastStore'

export default function SplitReading() {
  const navigate = useNavigate()
  const { addToast } = useToastStore()
  const [q1, setQ1] = useState('')
  const [q2, setQ2] = useState('')
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

  const handleSubmit = () => {
    setIsModalOpen(true)
  }

  const handleConfirmSubmit = () => {
    isSubmittedRef.current = true
    setIsModalOpen(false)
    addToast("Nộp bài đọc hiểu thành công!", "success")
    navigate('/student/reading/result')
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div 
        className="flex flex-col gap-6 max-w-6xl mx-auto pb-12 h-full"
        style={(isModalOpen || blocker.state === 'blocked') ? { opacity: 0.35, filter: 'blur(1.5px)', pointerEvents: 'none' } : {}}
      >
        {/* Breadcrumb & Navigation */}
        <div className="breadcrumbs flex items-center gap-2 text-xs font-semibold text-text-secondary">
          <span className="hover:underline cursor-pointer" onClick={() => navigate('/')}>Trang chủ</span>
          <span className="opacity-50">&gt;</span>
          <span className="hover:underline cursor-pointer" onClick={() => navigate('/student/journey')}>Hành trình</span>
          <span className="opacity-50">&gt;</span>
          <span className="hover:underline cursor-pointer" onClick={() => navigate('/student/unit/3')}>Unit 3</span>
          <span className="opacity-50">&gt;</span>
          <span className="hover:underline cursor-pointer" onClick={() => navigate('/student/reading-select')}>Luyện đọc</span>
          <span className="opacity-50">&gt;</span>
          <span className="text-primary font-bold">Đọc hiểu chia cột</span>
        </div>

        <h1 className="text-3xl font-extrabold text-text-primary mb-6">The History of Computers</h1>

        <div className="flex flex-col md:flex-row gap-8 items-stretch flex-grow">
          
          {/* Left: Reading Passage */}
          <div className="flex-1">
            <Card className="border-none shadow-soft h-full bg-[#F8F9FA]">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-text-primary mb-6">Reading Passage</h3>
                <div className="flex flex-col gap-4 text-text-primary leading-relaxed text-sm lg:text-base">
                  <p>
                    The history of computers dates back to the invention of the abacus, but modern computing started in the 20th century. Early computers were massive machines that filled entire rooms and used vacuum tubes for processing data.
                  </p>
                  <p>
                    In the 1950s, the invention of the transistor revolutionized computing by making machines smaller, faster, and more reliable. This led to the development of integrated circuits in the 1960s.
                  </p>
                  <p>
                    By the 1980s, personal computers became accessible to the general public. Brands like Apple and IBM introduced models that could fit on a desk, transforming both business and personal life.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Questions */}
          <div className="flex-1 flex flex-col">
            <Card className="border-none shadow-soft flex-grow">
              <CardContent className="p-8 flex flex-col h-full">
                <h3 className="text-xl font-bold text-text-primary mb-6">Questions</h3>
                
                <div className="flex flex-col gap-8 flex-grow">
                  {/* Question 1 */}
                  <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-text-primary text-sm lg:text-base">1. What technology did early computers use?</h4>
                    <div className="flex flex-col gap-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="radio" name="q1" value="Transistors" onChange={(e) => setQ1(e.target.value)} className="w-4 h-4 accent-primary" />
                        <span className="text-sm group-hover:text-primary transition-colors">Transistors</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="radio" name="q1" value="Vacuum tubes" onChange={(e) => setQ1(e.target.value)} className="w-4 h-4 accent-primary" />
                        <span className="text-sm group-hover:text-primary transition-colors">Vacuum tubes</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="radio" name="q1" value="Integrated circuits" onChange={(e) => setQ1(e.target.value)} className="w-4 h-4 accent-primary" />
                        <span className="text-sm group-hover:text-primary transition-colors">Integrated circuits</span>
                      </label>
                    </div>
                  </div>

                  {/* Question 2 */}
                  <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-text-primary text-sm lg:text-base">2. When did personal computers become accessible?</h4>
                    <div className="flex flex-col gap-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="radio" name="q2" value="1950s" onChange={(e) => setQ2(e.target.value)} className="w-4 h-4 accent-primary" />
                        <span className="text-sm group-hover:text-primary transition-colors">1950s</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="radio" name="q2" value="1960s" onChange={(e) => setQ2(e.target.value)} className="w-4 h-4 accent-primary" />
                        <span className="text-sm group-hover:text-primary transition-colors">1960s</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="radio" name="q2" value="1980s" onChange={(e) => setQ2(e.target.value)} className="w-4 h-4 accent-primary" />
                        <span className="text-sm group-hover:text-primary transition-colors">1980s</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <Button 
                    className="px-8 rounded-full shadow-active-glow"
                    onClick={handleSubmit}
                    disabled={!q1 || !q2}
                  >
                    Nộp bài
                  </Button>
                </div>

              </CardContent>
            </Card>
          </div>

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
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>Bạn đã trả lời tất cả câu hỏi. Bạn có muốn nộp bài để xem kết quả không?</p>
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
            <span style={{ fontFamily: 'var(--font-primary)', fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>Rời khỏi trang luyện đọc?</span>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>Tiến trình luyện đọc hiện tại của bạn sẽ bị hủy và không được lưu lại. Bạn có chắc chắn muốn rời đi?</p>
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
