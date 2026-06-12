import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, X, RotateCcw } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function ReadingResult() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-12 h-full">
      <div className="text-sm text-text-secondary mb-2">
        <Link to="/student/unit/3" className="hover:text-primary transition-colors">Bài học</Link> &gt; Unit 3 &gt; <Link to="/student/reading-select" className="hover:text-primary transition-colors">Luyện đọc</Link> &gt; Kết quả
      </div>

      <h1 className="text-3xl font-extrabold text-text-primary mb-1">Kết quả luyện đọc: The History of Computers</h1>
      <p className="text-sm text-text-secondary mb-6">Hoàn thành bài luyện đọc - 100%</p>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column - Stats */}
        <div className="w-full lg:w-[320px] flex flex-col gap-6 shrink-0">
          
          {/* Score Card */}
          <Card className="border-none shadow-soft text-center py-6">
             <CardContent className="flex flex-col items-center p-6">
                <div className="w-28 h-28 rounded-full border-8 border-success flex flex-col items-center justify-center mb-4 shadow-active-glow">
                   <div className="text-3xl font-extrabold text-text-primary">9/10</div>
                   <div className="text-xs font-bold text-text-secondary">90 điểm</div>
                </div>
                <h3 className="text-lg font-bold text-success mb-6">Xuất sắc!</h3>
                
                <div className="grid grid-cols-2 gap-3 w-full mb-3">
                   <div className="bg-success/5 rounded-xl p-3 flex flex-col items-center justify-center border border-success/10">
                     <div className="flex items-center gap-1 text-success font-bold text-lg">
                       <Check className="w-4 h-4" /> 9
                     </div>
                     <span className="text-xs font-medium text-text-secondary">Đúng</span>
                   </div>
                   <div className="bg-error/5 rounded-xl p-3 flex flex-col items-center justify-center border border-error/10">
                     <div className="flex items-center gap-1 text-error font-bold text-lg">
                       <X className="w-4 h-4" /> 1
                     </div>
                     <span className="text-xs font-medium text-text-secondary">Sai</span>
                   </div>
                </div>
                <div className="bg-primary/5 rounded-xl p-3 flex flex-col items-center justify-center w-full border border-primary/10">
                   <div className="text-primary font-bold text-lg">15:20</div>
                   <span className="text-xs font-medium text-text-secondary">Thời gian</span>
                </div>
             </CardContent>
          </Card>
        </div>

        {/* Right Column - Details */}
        <div className="flex-grow flex flex-col gap-6 w-full">
           
           <Card className="border-none shadow-soft h-full">
             <CardHeader>
               <CardTitle className="text-lg">Chi tiết bài làm</CardTitle>
             </CardHeader>
             <CardContent className="flex flex-col gap-6">
                
                {/* Question Details */}
                <div className="bg-[#F8F9FA] rounded-xl p-6 border border-border flex flex-col gap-4">
                  <h4 className="font-bold text-primary">1. What technology did early computers use?</h4>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-text-secondary w-28">Lựa chọn của bạn:</span>
                    <div className="px-4 py-2 bg-success/10 border border-success/30 text-success rounded-full flex items-center gap-2 text-sm font-bold">
                      Vacuum tubes <Check className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 mt-2">
                    <p className="text-sm text-text-primary leading-relaxed">
                      <span className="font-bold text-primary mr-2">[AI]</span> 
                      Trích dẫn từ bài: "Early computers were massive machines that filled entire rooms and used vacuum tubes for processing data."
                    </p>
                  </div>
                </div>

                <div className="bg-[#F8F9FA] rounded-xl p-6 border border-border flex flex-col gap-4">
                  <h4 className="font-bold text-primary">2. When did personal computers become accessible?</h4>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-text-secondary w-28">Lựa chọn của bạn:</span>
                    <div className="px-4 py-2 bg-success/10 border border-success/30 text-success rounded-full flex items-center gap-2 text-sm font-bold">
                      1980s <Check className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 mt-2">
                    <p className="text-sm text-text-primary leading-relaxed">
                      <span className="font-bold text-primary mr-2">[AI]</span> 
                      Trích dẫn từ bài: "By the 1980s, personal computers became accessible to the general public."
                    </p>
                  </div>
                </div>

             </CardContent>
           </Card>

           <div className="flex justify-between items-center mt-4">
             <Button 
               variant="outline" 
               className="px-8 rounded-full h-12 font-bold shadow-sm"
               onClick={() => navigate('/student/reading/split')}
             >
               <RotateCcw className="w-4 h-4 mr-2" /> Đọc lại bài
             </Button>
             <Button 
               className="px-8 rounded-full h-12 font-bold shadow-active-glow"
               onClick={() => navigate('/student/unit/3')}
             >
               Xem bài tiếp theo
             </Button>
           </div>

        </div>
      </div>
    </div>
  )
}
