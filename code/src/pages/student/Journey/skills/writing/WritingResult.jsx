import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Pencil, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function WritingResult() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-12 h-full">
      {/* Breadcrumb & Navigation */}
      <div className="breadcrumbs flex items-center gap-2 text-xs font-semibold text-text-secondary">
        <span className="hover:underline cursor-pointer" onClick={() => navigate('/')}>Trang chủ</span>
        <span className="opacity-50">&gt;</span>
        <span className="hover:underline cursor-pointer" onClick={() => navigate('/student/journey')}>Hành trình</span>
        <span className="opacity-50">&gt;</span>
        <span className="hover:underline cursor-pointer" onClick={() => navigate('/student/unit/3')}>Unit 3</span>
        <span className="opacity-50">&gt;</span>
        <span className="hover:underline cursor-pointer" onClick={() => navigate('/student/writing/task')}>Luyện viết</span>
        <span className="opacity-50">&gt;</span>
        <span className="text-primary font-bold">Kết quả</span>
      </div>

      <h1 className="text-3xl font-extrabold text-text-primary mb-6">Kết quả luyện viết: Writing Task</h1>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column - Stats */}
        <div className="w-full lg:w-[320px] flex flex-col gap-6 shrink-0">
          
          {/* Score Card */}
          <Card className="border-none shadow-soft text-center py-6">
             <CardContent className="flex flex-col items-center p-6">
                <div className="w-28 h-28 rounded-full border-8 border-warning flex flex-col items-center justify-center mb-4 shadow-active-glow">
                   <div className="text-3xl font-extrabold text-text-primary">6.5</div>
                   <div className="text-xs font-bold text-text-secondary">/ 10 điểm</div>
                </div>
                <h3 className="text-lg font-bold text-warning mb-6">Cần cải thiện ngữ pháp</h3>
                
                <div className="grid grid-cols-2 gap-3 w-full">
                   <div className="bg-primary/5 rounded-xl p-3 flex flex-col items-center justify-center border border-primary/10">
                     <div className="text-primary font-bold text-lg">75</div>
                     <span className="text-xs font-medium text-text-secondary">Số từ</span>
                   </div>
                   <div className="bg-error/5 rounded-xl p-3 flex flex-col items-center justify-center border border-error/10 text-error">
                     <div className="font-bold text-lg">3</div>
                     <span className="text-xs font-medium">Lỗi phát hiện</span>
                   </div>
                </div>
             </CardContent>
          </Card>

          {/* IELTS Rubric */}
          <Card className="border-none shadow-soft">
            <CardHeader className="pb-2">
               <CardTitle className="text-base">Tiêu chí chấm (IELTS Rubric)</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
               <div>
                 <div className="flex justify-between text-xs font-bold mb-1">
                   <span className="text-primary">Task Achievement</span>
                   <span className="text-primary">7.0</span>
                 </div>
                 <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                   <div className="h-full bg-success w-[70%]"></div>
                 </div>
               </div>
               <div>
                 <div className="flex justify-between text-xs font-bold mb-1">
                   <span className="text-primary">Grammar</span>
                   <span className="text-primary">5.5</span>
                 </div>
                 <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                   <div className="h-full bg-warning w-[55%]"></div>
                 </div>
               </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Column - Details */}
        <div className="flex-grow flex flex-col gap-6 w-full">
           
           <Card className="border-none shadow-soft h-full">
             <CardContent className="p-8 flex flex-col gap-8">
                
                {/* User's Text */}
                <div className="flex flex-col gap-4">
                  <h4 className="font-bold text-text-primary text-lg">Bài viết của bạn (Đã được AI nhận xét)</h4>
                  
                  <div className="bg-[#F8F9FA] rounded-xl p-6 border border-border">
                    <p className="text-text-primary leading-loose text-sm md:text-base">
                      My hobby is reading books. I usually{' '}
                      <span className="text-error font-bold border-b-2 border-error pb-0.5 cursor-help">reads</span>{' '}
                      comic books in my free time. Because it{' '}
                      <span className="text-error font-bold border-b-2 border-error pb-0.5 cursor-help">very interesting</span>{' '}
                      and helps me relax after school. I want to read more{' '}
                      <span className="text-success font-bold border-b-2 border-success pb-0.5 cursor-help">fascinating</span>{' '}
                      stories in the future.
                    </p>
                  </div>
                </div>

                {/* AI Feedback */}
                <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                  <h4 className="font-bold text-primary mb-4 text-sm flex items-center gap-2">
                    <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">AI Feedback</span> Chi tiết lỗi:
                  </h4>
                  <ul className="text-sm text-text-primary space-y-3 list-disc list-inside">
                    <li>
                      <span className="font-bold text-primary">reads → read:</span> Chủ ngữ là "I" nên động từ không thêm "s".
                    </li>
                    <li className="leading-relaxed">
                      <span className="font-bold text-primary">it very interesting → it is very interesting:</span> Thiếu động từ to-be "is" trong câu tính từ. Ngoài ra, việc dùng "Because" ở đầu câu độc lập là không chuẩn trong văn viết trang trọng, nên ghép vào câu trước.
                    </li>
                  </ul>
                </div>

                {/* Sample Essay */}
                <div className="flex flex-col gap-4">
                  <h4 className="font-bold text-success text-lg">Bài viết mẫu tham khảo (Band 8.0)</h4>
                  
                  <div className="bg-success/5 rounded-xl p-6 border border-success/20">
                    <p className="text-success italic leading-relaxed text-sm md:text-base">
                      "My hobby is reading books. I usually read comic books in my free time because they are highly entertaining and help me unwind after long hours at school. I look forward to exploring more fascinating stories in the future."
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <Button 
                    variant="outline" 
                    className="px-8 rounded-full h-12 font-bold shadow-sm"
                    onClick={() => navigate('/student/writing/task')}
                  >
                    <Pencil className="w-4 h-4 mr-2" /> Viết lại bài
                  </Button>
                  <Button 
                    className="px-8 rounded-full h-12 font-bold shadow-active-glow"
                    onClick={() => navigate('/student/unit/3')}
                  >
                    Hoàn thành bài học
                  </Button>
                </div>

             </CardContent>
           </Card>

        </div>
      </div>
    </div>
  )
}
