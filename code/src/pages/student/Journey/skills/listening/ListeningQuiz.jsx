import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '@/components/Modal'
import { useToastStore } from '@/store/toastStore'

export default function ListeningQuiz() {
  const navigate = useNavigate()
  const { addToast } = useToastStore()
  const [isPlaying, setIsPlaying] = useState(false)
  const [showError, setShowError] = useState(false)
  const [fillWord, setFillWord] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleNext = () => {
    if (!fillWord) {
      setShowError(true)
    } else {
      setShowError(false)
      setIsModalOpen(true)
    }
  }

  const handleConfirmSubmit = () => {
    setIsModalOpen(false)
    addToast("Nộp bài trắc nghiệm nghe thành công. Đang tính điểm...", "success")
    navigate('/student/listening/result')
  }

  return (
    <div className="flex flex-col gap-6">
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
        <span className="text-primary font-bold">Trắc nghiệm nghe hiểu</span>
      </div>

      <h1 className="text-3xl font-extrabold text-text-primary mb-2">Listening Quiz: Daily Communication</h1>

      {/* Audio Player */}
      <Card className="rounded-2xl bg-surface border-none shadow-soft mb-4">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="text-sm font-bold text-text-primary">02:35</div>
          <div className="flex-grow h-2 bg-border rounded-full relative cursor-pointer w-full md:w-auto">
             <div className="absolute top-0 left-0 h-full bg-primary rounded-full w-[50%]"></div>
             <div className="absolute top-1/2 left-[50%] -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full shadow-md"></div>
          </div>
          <div className="text-sm font-bold text-text-primary">05:00</div>
          
          <div className="flex items-center gap-6 ml-0 md:ml-6 mt-4 md:mt-0">
             <button className="flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-primary transition-colors">
               <RotateCcw className="w-4 h-4" /> Tua lại
             </button>
             <button 
               className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-active-glow hover:bg-primary/90 transition-colors"
               onClick={() => setIsPlaying(!isPlaying)}
             >
               {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-1 fill-current" />}
             </button>
             <div className="text-sm font-bold text-text-primary">1.0x</div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: Bảng câu hỏi */}
        <div className="w-full lg:w-[320px] shrink-0">
          <Card className="border-none shadow-soft sticky top-6">
            <CardContent className="p-6">
               <h3 className="text-lg font-bold text-text-primary mb-2">Bảng câu hỏi</h3>
               <div className="flex justify-between items-center mb-3 text-sm">
                 <span className="text-text-secondary">Tiến độ</span>
                 <span className="font-bold text-text-primary">Đã làm 6/10 câu</span>
               </div>
               <div className="w-full h-1.5 bg-border rounded-full mb-6">
                 <div className="h-full bg-primary rounded-full w-[60%]"></div>
               </div>

               <div className="grid grid-cols-5 gap-3">
                 {[...Array(15)].map((_, i) => {
                   const num = i + 1
                   let statusClass = "bg-surface text-text-secondary border-2 border-border" // default (unanswered)
                   if (num <= 5) statusClass = "bg-primary text-white border-2 border-primary" // answered
                   if (num === 6) statusClass = "bg-surface text-primary border-2 border-primary shadow-active-glow" // current
                   
                   return (
                     <button key={num} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all hover:-translate-y-0.5 ${statusClass}`}>
                       {num}
                     </button>
                   )
                 })}
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Question Content */}
        <div className="flex-grow flex flex-col gap-8 w-full border-l-0 lg:border-l-2 lg:border-border lg:pl-8">
           
           {/* Question 3 */}
           <div className="flex flex-col gap-4">
             <div className="flex items-center gap-3">
               <span className="text-lg font-bold text-text-primary">Câu 3</span>
               <span className="px-3 py-1 bg-surface text-xs font-bold text-text-secondary rounded-full">Trắc nghiệm</span>
             </div>
             
             <h2 className="text-2xl font-extrabold text-text-primary mb-2">What is the main topic of the conversation?</h2>
             
             <div className="flex flex-col gap-3">
               <label className="flex items-center gap-4 p-4 border-2 border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors bg-white">
                 <input type="radio" name="q3" className="w-5 h-5 accent-primary" />
                 <span className="text-text-primary font-medium">Booking a hotel room</span>
               </label>
               
               <label className="flex items-center gap-4 p-4 border-2 border-primary rounded-xl cursor-pointer bg-primary/[0.02] shadow-sm">
                 <input type="radio" name="q3" defaultChecked className="w-5 h-5 accent-primary" />
                 <span className="text-primary font-bold">Making a restaurant reservation</span>
               </label>

               <label className="flex items-center gap-4 p-4 border-2 border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors bg-white">
                 <input type="radio" name="q3" className="w-5 h-5 accent-primary" />
                 <span className="text-text-primary font-medium">Complaining about a meal</span>
               </label>

               <label className="flex items-center gap-4 p-4 border-2 border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors bg-white">
                 <input type="radio" name="q3" className="w-5 h-5 accent-primary" />
                 <span className="text-text-primary font-medium">Ordering takeout food</span>
               </label>
             </div>
           </div>

           <div className="w-full h-[1px] bg-border my-2"></div>

           {/* Question 4 - Error State variant */}
           <div className={`flex flex-col gap-4 p-6 rounded-2xl border-2 transition-all ${showError ? 'border-error border-dashed bg-error/5' : 'border-transparent'}`}>
             <div className="flex items-center gap-3">
               <span className="text-lg font-bold text-text-primary">Câu 4</span>
               <span className="px-3 py-1 bg-surface text-xs font-bold text-text-secondary rounded-full">Điền từ</span>
               {showError && <span className="px-3 py-1 bg-error/10 text-error text-xs font-bold rounded-full">Có lỗi cần sửa</span>}
             </div>
             
             <div className="text-2xl font-extrabold text-text-primary leading-loose flex flex-wrap items-center gap-x-3 gap-y-2 mt-2">
               <span>The customer wants to book a</span>
               <Input 
                 value={fillWord}
                 onChange={(e) => setFillWord(e.target.value)}
                 className={`w-32 h-10 px-4 text-center text-lg font-bold border-2 ${showError ? 'border-error bg-error/10 focus-visible:ring-error text-error' : 'border-border bg-surface focus-visible:ring-primary text-primary'}`} 
                 placeholder="..."
               />
               <span>near the window.</span>
             </div>

             {showError && (
               <p className="text-error font-bold text-sm mt-2 flex items-center gap-2">
                 <span className="w-4 h-4 rounded-full bg-error text-white flex items-center justify-center text-[10px]">!</span>
                 Vui lòng điền đáp án cho chỗ trống này trước khi nộp bài!
               </p>
             )}
           </div>

           <div className="flex justify-end mt-4">
             <Button 
               size="lg" 
               className="px-8 rounded-full shadow-active-glow"
               onClick={handleNext}
             >
               Nộp bài
             </Button>
           </div>

        </div>
      </div>

      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="confirm"
        title="Xác nhận nộp bài"
        cancelText="Quay lại làm tiếp"
        confirmText="Xác nhận"
        onConfirm={handleConfirmSubmit}
      >
        <span className="text-primary font-medium">Bạn có chắc chắn muốn nộp bài ngay lúc này?</span>
      </Modal>

    </div>
  )
}
