import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mic, RotateCcw, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function Pronunciation() {
  const navigate = useNavigate()
  const [isRecording, setIsRecording] = useState(false)
  const [timer, setTimer] = useState(0)
  const [showError, setShowError] = useState(false)

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
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-12">
      <div className="text-sm text-text-secondary mb-2 flex justify-between items-center">
        <div>
          <Link to="/student/unit/3" className="hover:text-primary transition-colors">Bài học</Link> &gt; Unit 3 &gt; <Link to="/student/speaking-select" className="hover:text-primary transition-colors">Luyện nói</Link> &gt; Luyện phát âm
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
            <Button className="rounded-full px-8 h-12 w-full sm:w-auto font-bold shadow-active-glow" onClick={() => navigate('/student/speaking/result')}>
              Tiếp tục <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
