import { useState, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Play, Mic } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function RolePlay() {
  const navigate = useNavigate()
  const [isRecording, setIsRecording] = useState(false)
  const timerRef = useRef(null)

  const handlePointerDown = () => {
    setIsRecording(true)
    // Simulate recording release after 2 seconds for demo purposes
    timerRef.current = setTimeout(() => {
      setIsRecording(false)
      navigate('/student/speaking/result')
    }, 2000)
  }

  const handlePointerUp = () => {
    setIsRecording(false)
    if (timerRef.current) {
       clearTimeout(timerRef.current)
    }
    navigate('/student/speaking/result')
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-12">
      <div className="text-sm text-text-secondary mb-2">
        <Link to="/student/unit/3" className="hover:text-primary transition-colors">Bài học</Link> &gt; Unit 3 &gt; <Link to="/student/speaking-select" className="hover:text-primary transition-colors">Luyện nói</Link> &gt; Hội thoại AI - Role Play
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
  )
}
