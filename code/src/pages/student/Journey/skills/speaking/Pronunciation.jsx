import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mic, RotateCcw, ArrowRight } from 'lucide-react'
import { Link, useNavigate, useBlocker } from 'react-router-dom'
import { useToastStore } from '@/store/toastStore'

export default function Pronunciation() {
  const navigate = useNavigate()
  const { addToast } = useToastStore()
  const [isRecording, setIsRecording] = useState(false)
  const [timer, setTimer] = useState(0)
  const [showError, setShowError] = useState(false)
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

  // Timer effect for recording
  useEffect(() => {
    let interval = null
    if (isRecording) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000)
    } else {
      clearInterval(interval)
      setTimer(0)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const handleRecordClick = () => {
    if (isRecording) {
      setIsRecording(false)
      addToast("Nhận phản hồi phát âm thành công!", "success")
    } else {
      setIsRecording(true)
      setShowError(false)
    }
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  // Temporary function to toggle error state for demo purposes
  const triggerError = () => {
    setIsRecording(false)
    setShowError(true)
    addToast("Lỗi: Không nhận dạng được giọng nói.", "error")
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div 
        className="flex flex-col gap-6 max-w-4xl mx-auto pb-12"
        style={blocker.state === 'blocked' ? { opacity: 0.35, filter: 'blur(1.5px)', pointerEvents: 'none' } : {}}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="breadcrumbs flex items-center gap-2 text-xs font-semibold text-text-secondary">
            <span className="hover:underline cursor-pointer" onClick={() => navigate('/')}>Trang chủ</span>
            <span className="opacity-50">&gt;</span>
            <span className="hover:underline cursor-pointer" onClick={() => navigate('/student/journey')}>Hành trình</span>
            <span className="opacity-50">&gt;</span>
            <span className="hover:underline cursor-pointer" onClick={() => navigate('/student/unit/3')}>Unit 3</span>
            <span className="opacity-50">&gt;</span>
            <span className="hover:underline cursor-pointer" onClick={() => navigate('/student/speaking-select')}>Luyện nói</span>
            <span className="opacity-50">&gt;</span>
            <span className="text-primary font-bold">Phát âm</span>
          </div>
          {/* Hidden button to toggle error state for demo presentation */}
          <button onClick={triggerError} className="text-xs text-text-secondary opacity-50 hover:opacity-100">Test Error</button>
        </div>

        <h1 className="text-3xl font-extrabold text-text-primary mb-6">Luyện phát âm: Ordering at a Coffee Shop</h1>

        {showError && (
          <div className="bg-error/5 border border-error text-error p-6 rounded-2xl mb-2 shadow-sm font-bold text-sm flex flex-col gap-3">
            <p>[ Lỗi E-1 ] Không nhận dạng được giọng nói. Vui lòng kiểm tra âm lượng micro và nói rõ ràng hơn.</p>
            <p>[ Lỗi E-2 ] Thiết bị không có micro hoạt động hoặc quyền truy cập bị chặn. Vui lòng cấp quyền micro!</p>
          </div>
        )}

        <Card className="border-none shadow-soft">
          <CardContent className="p-12 flex flex-col items-center text-center">
            
            <div className="px-4 py-1.5 bg-primary/5 text-primary text-xs font-bold rounded-full mb-8 uppercase tracking-wider">
              Câu mẫu
            </div>

            <h2 className="text-4xl font-extrabold text-text-primary mb-4 leading-tight">
              Could I have a cappuccino, please?
            </h2>
            
            <p className="text-lg text-text-secondary mb-12 font-medium">
              /kʊd aɪ hæv ə ˌkæp.əˈtʃiː.noʊ, pliːz/
            </p>

            <h3 className="text-xl font-bold text-text-primary mb-2">Đọc to câu trên</h3>
            <p className="text-sm text-text-secondary mb-8">Hãy nói rõ ràng, giữ khoảng cách ổn định với micro.</p>

            <div className="flex flex-col items-center justify-center mb-16 h-32">
              <button
                onClick={handleRecordClick}
                className={`w-20 h-20 rounded-full flex flex-col items-center justify-center gap-1 transition-all shadow-active-glow
                  ${isRecording ? 'bg-primary scale-110 shadow-primary/40 animate-pulse' : 'bg-primary hover:scale-105'}`}
              >
                <Mic className="w-8 h-8 text-white" />
              </button>
              <div className="mt-4 flex flex-col items-center h-10">
                {isRecording ? (
                  <>
                    <span className="text-primary font-bold text-sm mb-1">Đang ghi âm...</span>
                    <span className="text-text-primary font-bold text-sm">{formatTime(timer)}</span>
                  </>
                ) : (
                  <span className="text-transparent font-bold text-sm mb-1 select-none">Placeholder</span>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 mt-auto">
              <Button variant="outline" className="rounded-full px-6 h-12 w-full sm:w-auto font-semibold shadow-sm">
                <RotateCcw className="w-4 h-4 mr-2" /> Nghe lại mẫu
              </Button>
              <Button variant="outline" className="rounded-full px-6 h-12 w-full sm:w-auto font-semibold shadow-sm" onClick={() => setIsRecording(false)}>
                <Mic className="w-4 h-4 mr-2" /> Ghi âm lại
              </Button>
              <Button className="rounded-full px-8 h-12 w-full sm:w-auto font-bold shadow-active-glow" onClick={() => { isSubmittedRef.current = true; navigate('/student/speaking/result'); }}>
                Tiếp tục <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* Exit Confirmation Modal */}
      {blocker.state === 'blocked' && (
        <div className="modal-overlay" style={{ zIndex: 1000, position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(28, 27, 46, 0.45)', backdropFilter: 'blur(8px)' }}>
          <div className="modal-box" style={{ width: '460px', textAlign: 'center', alignItems: 'center', padding: '36px', borderRadius: 'var(--rounded-xxl)', backgroundColor: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: '24px', boxShadow: '0 20px 48px rgba(28, 27, 46, 0.2)' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.08)', color: 'var(--error)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <span style={{ fontFamily: 'var(--font-primary)', fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>Rời khỏi trang luyện nói?</span>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>Tiến trình luyện nói hiện tại của bạn sẽ bị hủy và không được lưu lại. Bạn có chắc chắn muốn rời đi?</p>
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
