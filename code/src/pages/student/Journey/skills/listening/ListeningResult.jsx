import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, X, Play, RotateCcw, Plus } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function ListeningResult() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-12">
      <div className="text-sm text-text-secondary mb-2">
        <Link to="/student/unit/3" className="hover:text-primary transition-colors">Bài học</Link> &gt; Unit 3 &gt; <Link to="/student/listening-select" className="hover:text-primary transition-colors">Luyện nghe</Link> &gt; Kết quả
      </div>

      <h1 className="text-3xl font-extrabold text-text-primary mb-1">Kết quả luyện nghe: A Conversation at the Coffee Shop</h1>
      <p className="text-sm text-text-secondary mb-6">Hoàn thành bài luyện nghe - 100%</p>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column - Stats */}
        <div className="w-full lg:w-[320px] flex flex-col gap-6 shrink-0">

          {/* Score Card */}
          <Card className="border-none shadow-soft text-center py-6">
            <CardContent className="flex flex-col items-center p-6">
              <div className="w-28 h-28 rounded-full border-8 border-success flex flex-col items-center justify-center mb-4 shadow-active-glow">
                <div className="text-3xl font-extrabold text-text-primary">8/10</div>
                <div className="text-xs font-bold text-text-secondary">80 điểm</div>
              </div>
              <h3 className="text-lg font-bold text-success mb-6">Kết quả tốt!</h3>

              <div className="grid grid-cols-2 gap-3 w-full">
                <div className="bg-success/10 rounded-xl p-3 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-1 text-success font-bold text-lg">
                    <Check className="w-5 h-5" /> 8
                  </div>
                  <span className="text-xs font-medium text-text-secondary">Đúng</span>
                </div>
                <div className="bg-error/10 rounded-xl p-3 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-1 text-error font-bold text-lg">
                    <X className="w-5 h-5" /> 2
                  </div>
                  <span className="text-xs font-medium text-text-secondary">Sai</span>
                </div>
                <div className="bg-primary/5 rounded-xl p-3 flex flex-col items-center justify-center">
                  <div className="text-primary font-bold text-lg">11:35</div>
                  <span className="text-xs font-medium text-text-secondary">Thời gian</span>
                </div>
                <div className="bg-[#E9D5FF] rounded-xl p-3 flex flex-col items-center justify-center">
                  <div className="text-[#9333EA] font-bold text-lg">+120</div>
                  <span className="text-xs font-medium text-[#9333EA]">EXP</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skill Analysis */}
          <Card className="border-none shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Phân tích kỹ năng</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-primary">Nghe hiểu chung</span>
                  <span className="text-primary">90%</span>
                </div>
                <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[90%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-[#9333EA]">Từ vựng</span>
                  <span className="text-[#9333EA]">80%</span>
                </div>
                <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-[#9333EA] w-[80%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-warning">Nghe chi tiết</span>
                  <span className="text-warning">75%</span>
                </div>
                <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-warning w-[75%]"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vocabulary to review */}
          <Card className="border-none shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Từ vựng nên ôn tập</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between bg-[#F3E8FF] px-4 py-2 rounded-lg text-[#9333EA] font-bold text-sm">
                receipt <Button variant="ghost" size="icon" className="w-6 h-6 hover:bg-[#E9D5FF]"><Plus className="w-4 h-4" /></Button>
              </div>
              <div className="flex items-center justify-between bg-[#F3E8FF] px-4 py-2 rounded-lg text-[#9333EA] font-bold text-sm">
                recommend <Button variant="ghost" size="icon" className="w-6 h-6 hover:bg-[#E9D5FF]"><Plus className="w-4 h-4" /></Button>
              </div>
              <div className="flex items-center justify-between bg-[#F3E8FF] px-4 py-2 rounded-lg text-[#9333EA] font-bold text-sm">
                counter <Button variant="ghost" size="icon" className="w-6 h-6 hover:bg-[#E9D5FF]"><Plus className="w-4 h-4" /></Button>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Column - Details */}
        <div className="flex-grow flex flex-col gap-6">

          <Card className="border-none shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Chi tiết bài làm</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">

              {/* Question 1 - Correct */}
              <div className="flex flex-col gap-4 border-b border-border pb-6">
                <h4 className="font-bold text-text-primary">1. What did the man order?</h4>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-text-secondary w-24">Lựa chọn của bạn:</span>
                  <div className="px-4 py-2 bg-success/10 border border-success/30 text-success rounded-full flex items-center gap-2 text-sm font-bold">
                    A large cappuccino <Check className="w-4 h-4" />
                  </div>
                </div>
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex gap-3 text-sm">
                  <span className="font-bold text-primary shrink-0">[AI]</span>
                  <p className="text-text-primary leading-relaxed">Trong đoạn hội thoại, người đàn ông nói: "I'll have a large cappuccino, please."</p>
                </div>
              </div>

              {/* Question 2 - Incorrect */}
              <div className="flex flex-col gap-4 border border-error/20 p-6 rounded-2xl bg-error/[0.02]">
                <h4 className="font-bold text-text-primary">2. Where did the woman suggest they sit?</h4>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-text-secondary w-24">Lựa chọn của bạn:</span>
                  <div className="px-4 py-2 bg-error/10 border border-error/30 text-error rounded-full flex items-center gap-2 text-sm font-bold">
                    By window seat <X className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-text-secondary w-24">Đáp án đúng:</span>
                  <div className="px-4 py-2 bg-success/10 border border-success/30 text-success rounded-full flex items-center gap-2 text-sm font-bold">
                    By the window seat <Check className="w-4 h-4" />
                  </div>
                </div>
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mt-2">
                  <div className="flex gap-3 text-sm">
                    <span className="font-bold text-primary shrink-0">[AI]</span>
                    <p className="text-text-primary leading-relaxed">Cô gái đề xuất: "Let's grab that window seat over there, it has a nice view."</p>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0 gap-2"><Play className="w-4 h-4" /> Nghe lại</Button>
                </div>
              </div>

            </CardContent>
          </Card>

          <Card className="border-none shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Transcript</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 text-sm leading-relaxed text-text-primary">
                <p>
                  <span className="font-bold text-primary">Man:</span> Hi, I'll have a <span className="bg-[#F3E8FF] text-[#9333EA] px-1 font-bold rounded">large cappuccino</span>, please. Oh, and can I get a <span className="bg-[#F3E8FF] text-[#9333EA] px-1 font-bold rounded">receipt</span>?
                </p>
                <p>
                  <span className="font-bold text-primary">Barista:</span> Sure thing. That'll be $4.50. Would you like anything to eat? I <span className="bg-[#F3E8FF] text-[#9333EA] px-1 font-bold rounded">recommend</span> the blueberry muffins today.
                </p>
                <p>
                  <span className="font-bold text-primary">Man:</span> No, thanks. Just the coffee.
                </p>
                <p>
                  <span className="font-bold text-primary">Woman (friend):</span> Hey! I already got a table. Let's grab that <span className="bg-[#F3E8FF] text-[#9333EA] px-1 font-bold rounded">window seat</span> over there, it has a nice view.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="outline"
              className="px-8 rounded-full h-12"
              onClick={() => navigate('/student/listening/quiz')}
            >
              <RotateCcw className="w-4 h-4 mr-2" /> Luyện tập lại
            </Button>
            <Button
              className="px-8 rounded-full h-12 shadow-active-glow"
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
