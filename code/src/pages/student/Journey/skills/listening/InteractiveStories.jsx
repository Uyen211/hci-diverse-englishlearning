import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, Volume2, Lock } from 'lucide-react'
import { useNavigate, useBlocker } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

export default function InteractiveStories() {
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState(false)
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

  const vocabularies = [
    { word: 'order', meaning: 'gọi món' },
    { word: 'receipt', meaning: 'hóa đơn' },
    { word: 'table', meaning: 'bàn' },
    { word: 'recommend', meaning: 'gợi ý' },
  ]

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div 
        className="flex flex-col gap-6 max-w-4xl mx-auto"
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
          <span className="hover:underline cursor-pointer" onClick={() => navigate('/student/listening-select')}>Luyện nghe</span>
          <span className="opacity-50">&gt;</span>
          <span className="text-primary font-bold">Luyện nghe tương tác</span>
        </div>

        <h1 className="text-2xl font-bold text-text-primary mb-2">Interactive Stories: A Conversation at the Coffee Shop</h1>

        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm font-bold text-text-secondary">Đoạn 2/5 đã mở khóa</span>
          <div className="flex-grow h-2 bg-border rounded-full">
            <div className="h-full bg-primary rounded-full w-[40%]"></div>
          </div>
          <span className="text-sm font-bold text-text-primary">40%</span>
        </div>

        <div>
          <h3 className="font-bold text-text-primary mb-4">Từ vựng trước khi nghe</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {vocabularies.map((v, i) => (
              <Card key={i} className="border-none shadow-soft hover:-translate-y-1 transition-all cursor-pointer">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-primary mb-1">{v.word}</div>
                    <div className="text-xs text-text-secondary">{v.meaning}</div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-text-secondary hover:text-primary">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 relative mt-6 before:absolute before:left-6 before:top-0 before:bottom-0 before:w-0.5 before:bg-border before:-z-10">

          {/* Paragraph 1 - Completed */}
          <div className="pl-16 relative">
            <Card className="border-none shadow-soft">
              <CardContent className="p-6">
                <h4 className="font-bold text-text-primary mb-2">Đoạn 1: Lời chào</h4>
                <p className="text-text-secondary italic">"Hi there! Welcome to The Daily Grind. How can I help you today?" "Hi! I'm just looking at the menu for a second."</p>
              </CardContent>
            </Card>
          </div>

          {/* Paragraph 2 - Active */}
          <div className="pl-16 relative">
            <Card className="border-2 border-primary shadow-active-glow">
              <CardContent className="p-6">
                <h4 className="font-bold text-primary mb-4">Đoạn 2: Gọi món</h4>

                <div className="flex items-center gap-4 bg-surface p-4 rounded-xl mb-6">
                  <button
                    className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
                  </button>
                  <div className="flex-grow h-1.5 bg-border rounded-full relative">
                    <div className="absolute top-0 left-0 h-full bg-primary rounded-full w-[35%]"></div>
                  </div>
                  <span className="text-xs font-bold text-text-secondary">0:15/0:42</span>
                </div>

                <div className="mb-4">
                  <h5 className="font-bold text-text-primary mb-4">What does the customer want to order?</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 p-4 border-2 border-border rounded-xl cursor-pointer bg-white">
                      <input type="radio" name="order" className="w-4 h-4" />
                      <span className="text-sm">An iced latte with oat milk</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border-2 border-primary rounded-xl cursor-pointer bg-primary/5">
                      <input type="radio" name="order" defaultChecked className="w-4 h-4 accent-primary" />
                      <span className="text-sm font-bold text-primary">A cappuccino with extra foam</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border-2 border-border rounded-xl cursor-pointer bg-white">
                      <input type="radio" name="order" className="w-4 h-4" />
                      <span className="text-sm">A black coffee, no sugar</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border-2 border-border rounded-xl cursor-pointer bg-white">
                      <input type="radio" name="order" className="w-4 h-4" />
                      <span className="text-sm">A green tea and a pastry</span>
                    </label>
                  </div>
                </div>

                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-center gap-2 text-sm font-bold">
                  Please take your <span className="bg-primary text-white px-3 py-1 rounded-md mx-1">receipt</span> at the counter.
                </div>

              </CardContent>
            </Card>
          </div>

          {/* Paragraph 3 - Locked */}
          <div className="pl-16 relative opacity-40">
            <Card className="border border-dashed border-border  shadow-none">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-text-primary flex items-center gap-2 mb-1">
                    <Lock className="w-4 h-4" /> Đoạn 3: Chọn chỗ ngồi
                  </h4>
                  <p className="text-xs text-text-secondary">Đã sẵn sàng để nghe</p>
                </div>
                <Button disabled variant="default">Bắt đầu phần này</Button>
              </CardContent>
            </Card>
          </div>

          {/* Paragraph 4 - Locked */}
          <div className="pl-16 relative opacity-40">
            <Card className="border-none shadow-none bg-surface/50">
              <CardContent className="p-6">
                <h4 className="font-bold text-text-primary mb-1">Đoạn 4</h4>
                <p className="text-xs text-text-secondary">Hoàn thành đoạn trước để mở khóa</p>
              </CardContent>
            </Card>
          </div>

        </div>

        <div className="flex justify-start gap-4 mt-8 pl-16">
          <Button variant="outline" className="px-8 rounded-full">Nghe lại</Button>
          <Button className="px-8 rounded-full shadow-active-glow" onClick={() => { isSubmittedRef.current = true; navigate('/student/listening-select'); }}>Tiếp tục</Button>
        </div>

      </div>

      {/* Exit Confirmation Modal */}
      {blocker.state === 'blocked' && (
        <div className="modal-overlay" style={{ zIndex: 1000, position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(28, 27, 46, 0.45)', backdropFilter: 'blur(8px)' }}>
          <div className="modal-box" style={{ width: '460px', textAlign: 'center', alignItems: 'center', padding: '36px', borderRadius: 'var(--rounded-xxl)', backgroundColor: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: '24px', boxShadow: '0 20px 48px rgba(28, 27, 46, 0.2)' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.08)', color: 'var(--error)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <span style={{ fontFamily: 'var(--font-primary)', fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>Rời khỏi trang luyện nghe?</span>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>Tiến trình luyện nghe hiện tại của bạn sẽ bị hủy và không được lưu lại. Bạn có chắc chắn muốn rời đi?</p>
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
