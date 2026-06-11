import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, RotateCcw, Mic } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function SpeakingResult() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-12">
      <div className="text-sm text-text-secondary mb-2">
        <Link to="/student/unit/3" className="hover:text-primary transition-colors">Bài học</Link> &gt; Unit 3 &gt; <Link to="/student/speaking-select" className="hover:text-primary transition-colors">Luyện nói</Link> &gt; Kết quả
      </div>

      <h1 className="text-3xl font-extrabold text-text-primary mb-1">Kết quả luyện nói: Ordering Coffee</h1>
      <p className="text-sm text-text-secondary mb-6">Hoàn thành bài luyện nói - 100%</p>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column - Stats */}
        <div className="w-full lg:w-[320px] flex flex-col gap-6 shrink-0">
          
          {/* Score Card */}
          <Card className="border-none shadow-soft text-center py-6">
             <CardContent className="flex flex-col items-center p-6">
                <div className="w-28 h-28 rounded-full border-8 border-warning flex flex-col items-center justify-center mb-4 shadow-active-glow">
                   <div className="text-3xl font-extrabold text-text-primary">82</div>
                   <div className="text-xs font-bold text-text-secondary">/100 điểm</div>
                </div>
                <h3 className="text-lg font-bold text-warning mb-6">Phát âm khá!</h3>
                
                <div className="grid grid-cols-2 gap-3 w-full">
                   <div className="bg-primary/5 rounded-xl p-3 flex flex-col items-center justify-center">
                     <div className="text-primary font-bold text-lg">04:15</div>
                     <span className="text-xs font-medium text-text-secondary">Thời gian</span>
                   </div>
                   <div className="bg-[#F3E8FF] rounded-xl p-3 flex flex-col items-center justify-center">
                     <div className="text-[#9333EA] font-bold text-lg">+100</div>
                     <span className="text-xs font-medium text-[#9333EA]">EXP</span>
                   </div>
                </div>
             </CardContent>
          </Card>

          {/* Skill Analysis */}
          <Card className="border-none shadow-soft">
            <CardHeader className="pb-2">
               <CardTitle className="text-base">Phân tích phát âm</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
               <div>
                 <div className="flex justify-between text-xs font-bold mb-1">
                   <span className="text-primary">Trôi chảy (Fluency)</span>
                   <span className="text-primary">90%</span>
                 </div>
                 <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                   <div className="h-full bg-primary w-[90%]"></div>
                 </div>
               </div>
               <div>
                 <div className="flex justify-between text-xs font-bold mb-1">
                   <span className="text-[#9333EA]">Ngữ điệu (Intonation)</span>
                   <span className="text-[#9333EA]">85%</span>
                 </div>
                 <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                   <div className="h-full bg-[#9333EA] w-[85%]"></div>
                 </div>
               </div>
               <div>
                 <div className="flex justify-between text-xs font-bold mb-1">
                   <span className="text-warning">Chính xác (Accuracy)</span>
                   <span className="text-warning">70%</span>
                 </div>
                 <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                   <div className="h-full bg-warning w-[70%]"></div>
                 </div>
               </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Column - Details */}
        <div className="flex-grow flex flex-col gap-6">
           
           <Card className="border-none shadow-soft">
             <CardHeader>
               <CardTitle className="text-lg">Đánh giá chi tiết từng câu</CardTitle>
             </CardHeader>
             <CardContent className="flex flex-col gap-6">
                
                {/* Sentence Analysis */}
                <div className="flex flex-col gap-4">
                  <h4 className="font-bold text-primary">Câu 1:</h4>
                  
                  <div className="bg-[#F8F9FA] rounded-xl p-6 border border-border">
                    <p className="text-lg font-bold mb-4 leading-loose">
                      <span className="text-error border-b-2 border-error pb-0.5">Could</span> I have a <span className="text-error border-b-2 border-error pb-0.5">cappuccino</span>, please?
                    </p>
                    
                    <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                      <h5 className="font-bold text-primary mb-3 text-sm flex items-center gap-2">
                        <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded">AI Feedback</span> Lỗi phát âm cần chú ý:
                      </h5>
                      <ul className="text-sm text-text-primary space-y-2 list-disc list-inside">
                        <li><span className="font-bold text-primary">Could:</span> Âm /k/ chưa bật hơi rõ. Đọc giống /g/ của tiếng Việt.</li>
                        <li><span className="font-bold text-primary">cappuccino:</span> Nhấn sai trọng âm. Trọng âm rơi vào âm tiết thứ 3 /ˌkæp.əˈtʃiː.noʊ/.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-2">
                     <Button variant="outline" size="sm" className="rounded-full gap-2 font-bold shadow-sm">
                       <Play className="w-4 h-4 fill-current" /> Nghe giọng bạn
                     </Button>
                     <Button variant="outline" size="sm" className="rounded-full gap-2 font-bold shadow-sm">
                       <Play className="w-4 h-4 fill-current" /> Nghe lại mẫu
                     </Button>
                     <Button variant="outline" size="sm" className="rounded-full gap-2 font-bold text-error border-error/50 hover:bg-error/5 hover:text-error hover:border-error shadow-sm ml-auto">
                       <Mic className="w-4 h-4" /> Ghi âm lại câu này
                     </Button>
                  </div>
                </div>

             </CardContent>
           </Card>

           <div className="flex justify-between items-center mt-4">
             <Button 
               variant="outline" 
               className="px-8 rounded-full h-12 font-bold shadow-sm"
               onClick={() => navigate('/student/speaking-select')}
             >
               <RotateCcw className="w-4 h-4 mr-2" /> Luyện tập lại toàn bộ
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
