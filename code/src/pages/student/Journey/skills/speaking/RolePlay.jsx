import { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Play, Mic } from 'lucide-react'
import { Link, useNavigate, useBlocker } from 'react-router-dom'

export default function RolePlay() {
  const navigate = useNavigate()
  const [isRecording, setIsRecording] = useState(false)
  const timerRef = useRef(null)
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

  const handlePointerDown = () => {
    setIsRecording(true)
    // Simulate recording release after 2 seconds for demo purposes
    timerRef.current = setTimeout(() => {
      setIsRecording(false)
      isSubmittedRef.current = true
      navigate('/student/speaking/result')
    }, 2000)
  }

  const handlePointerUp = () => {
    setIsRecording(false)
    if (timerRef.current) {
       clearTimeout(timerRef.current)
    }
    isSubmittedRef.current = true
    navigate('/student/speaking/result')
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div 
        className="flex flex-col gap-6 max-w-4xl mx-auto pb-12"
        style={blocker.state === 'blocked' ? { opacity: 0.35, filter: 'blur(1.5px)', pointerEvents: 'none' } : {}}
      >
        {/* Breadcrumb & Navigation */}
        <div className="breadcrumbs flex items-center gap-2 text-xs font-semibold text-text-secondary">
          <span className="hover:underline cursor-pointer" onClick={() => navigate('/')}>Trang chủ</span>
          <span className="opacity-50">&gt;</span>
          <span className="hover:underline cursor-pointer" onClick={() => navigate('/student/journey')}>Hành trình</span>
          <span className="opacity-50">&gt;</span>
          <span className="hover:underline cursor-pointer" onClick={() => navigate('/student/unit/3')}>Unit 3</span>
          <span className="opacity-50">&gt;</span>
          <span className="hover:underline cursor-pointer" onClick={() => navigate('/student/speaking-select')}>Luyện nói</span>
          <span className="opacity-50">&gt;</span>
          <span className="text-primary font-bold">Hội thoại AI</span>
        </div>

        <h1 className="text-3xl font-extrabold text-text-primary mb-6">Luyện Nói - Hội thoại đặt phòng khách sạn</h1>

        <Card className="border-none shadow-soft overflow-hidden">
          <CardContent className="p-8 flex flex-col gap-6 relative">
            
            {/* AI Bubble 1 */}
            <div className="flex flex-col items-start w-full">
              <div className="bg-[#F8F9FA] rounded-2xl rounded-tl-sm p-6 max-w-[80%] border border-border">
                <h4 className="font-bold text-text-primary mb-2">AI Receptionist</h4>
                <p className="text-text-primary mb-4">Welcome to Grand Hotel. How can I assist you today?</p>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-border rounded-full text-xs font-bold text-text-secondary hover:text-primary hover:border-primary transition-colors shadow-sm">
                  <Play className="w-3 h-3 fill-current" /> Nghe mẫu
                </button>
              </div>
            </div>

            {/* User Bubble 1 */}
            <div className="flex flex-col items-end w-full">
              <div className="bg-white border-2 border-primary/20 rounded-2xl rounded-tr-sm p-6 max-w-[80%] shadow-sm">
                <div className="flex justify-end w-full mb-2">
                  <h4 className="font-bold text-text-primary">Tôi</h4>
                </div>
                <p className="text-text-primary mb-4 text-right">I would like to book a room for two nights.</p>
                <div className="flex justify-end w-full">
                  <span className="text-[11px] font-bold text-text-secondary">
                    [ Đánh giá phát âm: <span className="text-success">Tốt</span> ]
                  </span>
                </div>
              </div>
            </div>

            {/* AI Bubble 2 */}
            <div className="flex flex-col items-start w-full">
              <div className="bg-[#F8F9FA] rounded-2xl rounded-tl-sm p-6 max-w-[80%] border border-border">
                <h4 className="font-bold text-text-primary mb-2">AI Receptionist</h4>
                <p className="text-text-primary mb-4">Certainly. Could you please tell me the dates of your stay?</p>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-border rounded-full text-xs font-bold text-text-secondary hover:text-primary hover:border-primary transition-colors shadow-sm">
                  <Play className="w-3 h-3 fill-current" /> Nghe mẫu
                </button>
              </div>
            </div>

            <div className="w-full h-[1px] bg-primary/20 my-8"></div>

            {/* Recording Control */}
            <div className="flex flex-col items-center justify-center pt-4">
              <button
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                className={`w-24 h-24 rounded-full flex flex-col items-center justify-center gap-1 transition-all shadow-active-glow select-none touch-none
                  ${isRecording ? 'bg-error scale-110 shadow-error/30 animate-pulse' : 'bg-primary hover:scale-105'}`}
              >
                <Mic className="w-8 h-8 text-white" />
                <span className="text-white text-xs font-bold tracking-wide">Nhấn Nói</span>
              </button>
              <p className="text-sm text-text-secondary mt-6 font-medium">
                {isRecording ? 'Đang thu âm... thả ra để gửi' : 'Nhấn giữ để thu âm phản hồi của bạn'}
              </p>
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
