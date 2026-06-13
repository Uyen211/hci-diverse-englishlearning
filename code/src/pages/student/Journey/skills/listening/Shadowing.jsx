import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, Volume2, Mic, Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useToastStore } from '@/store/toastStore'

export default function Shadowing() {
  const navigate = useNavigate()
  const { addToast } = useToastStore()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  const handleMicClick = () => {
    if (isRecording) {
      addToast("Hoàn thành chấm điểm phát âm câu mẫu!", "success")
    }
    setIsRecording(!isRecording)
  }

  const vocabularies = [
    { word: 'pronunciation', meaning: 'phát âm' },
    { word: 'rhythm', meaning: 'nhịp điệu' },
    { word: 'intonation', meaning: 'ngữ điệu' },
    { word: 'repeat', meaning: 'lặp lại' },
  ]

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
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
        <span className="text-primary font-bold">Nghe và nhắc lại</span>
      </div>

      <h1 className="text-3xl font-extrabold text-text-primary mb-2">Shadowing: Repeat After the Speaker</h1>
      
      <div className="flex items-center gap-4 mb-6">
         <span className="text-sm font-bold text-text-secondary w-24">Câu 4/12 đã hoàn thành</span>
         <div className="flex-grow h-2 bg-border rounded-full">
            <div className="h-full bg-primary rounded-full w-[33%]"></div>
         </div>
         <span className="text-sm font-bold text-text-primary">33%</span>
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

      <div className="flex flex-col gap-6 mt-6">
        
        {/* Sentence 1 - Completed */}
        <Card className="border-none shadow-soft bg-surface">
          <CardContent className="p-6 flex justify-between items-start">
             <div>
               <h4 className="font-bold text-text-primary mb-2">Câu 1: Greeting</h4>
               <p className="text-text-secondary italic">"Hi there! Welcome to The Daily Grind. How can I help you today?"</p>
             </div>
             <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full whitespace-nowrap">Đã hoàn thành</span>
          </CardContent>
        </Card>

        {/* Sentence 2 - Active */}
        <Card className="border-2 border-primary shadow-active-glow">
          <CardContent className="p-8 flex flex-col items-center">
             <h4 className="font-bold text-primary self-start mb-6">Câu 2: Ordering</h4>
             
             <div className="w-full flex items-center gap-4 bg-surface p-4 rounded-xl mb-8">
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

             <h2 className="text-2xl font-extrabold text-text-primary mb-6 text-center">"Could I have a cappuccino with extra foam?"</h2>
             
             <div className="flex flex-col items-center mb-8">
               <span className="text-xs font-bold text-primary mb-3">{isRecording ? "Đang ghi âm..." : "Nhấn để thu âm"}</span>
               <button 
                 className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-active-glow
                  ${isRecording ? 'bg-error text-white animate-pulse' : 'bg-primary text-white hover:scale-105'}`}
                 onClick={handleMicClick}
               >
                 <Mic className="w-8 h-8" />
               </button>
             </div>

             {/* Feedback Section */}
             <div className="w-full bg-surface p-6 rounded-2xl border border-border mt-4">
               <div className="flex justify-between items-center mb-4">
                 <h5 className="font-bold text-text-primary">Đánh giá phát âm</h5>
                 <span className="px-3 py-1 bg-primary text-white font-bold text-sm rounded-full">82/100</span>
               </div>
               
               <p className="text-lg font-bold mb-4">
                 <span className="text-error mr-1">"Could</span>
                 <span className="text-text-primary">I have a cappuccino with extra foam?"</span>
               </p>

               <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex gap-3 items-start mb-6">
                 <div className="font-bold text-primary mt-0.5">!</div>
                 <p className="text-sm text-text-primary leading-relaxed">Gợi ý AI: Âm /k/ trong từ 'could' chưa được phát âm rõ ràng. Hãy thử bật hơi mạnh hơn ở cuống họng.</p>
               </div>

               <div className="flex justify-center gap-4">
                 <Button variant="outline" className="rounded-full px-6">Nghe lại bản ghi</Button>
                 <Button variant="outline" className="rounded-full px-6">Thử lại</Button>
                 <Button className="rounded-full px-8 shadow-active-glow">Câu tiếp theo</Button>
               </div>
             </div>

          </CardContent>
        </Card>

        {/* Sentence 3 - Locked */}
        <Card className="border border-dashed border-border bg-transparent shadow-none opacity-60">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-text-primary flex items-center gap-2 mb-1">
                <Lock className="w-4 h-4" /> Câu 3: Small request
              </h4>
              <p className="text-xs text-text-secondary">Đã sẵn sàng để nghe</p>
            </div>
            <Button disabled variant="default">Bắt đầu phần này</Button>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
