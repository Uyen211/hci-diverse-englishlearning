import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Headphones, Flag, HelpCircle, Mic, Check } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function ListeningSelect() {
  const navigate = useNavigate()
  const [selectedMode, setSelectedMode] = useState('quiz')

  const modes = [
    {
      id: 'interactive',
      title: 'Luyện nghe tương tác',
      desc: 'Nghe từng đoạn hội thoại, mở khóa nội dung theo tiến trình và trả lời câu hỏi ngay trong ngữ cảnh.',
      icon: <Flag className="w-6 h-6 text-primary" />,
      path: '/student/listening/interactive'
    },
    {
      id: 'quiz',
      title: 'Trắc nghiệm nghe hiểu',
      desc: 'Kiểm tra mức độ nghe hiểu bằng câu hỏi lựa chọn, điền từ và phản hồi đáp án sau khi nộp.',
      icon: <HelpCircle className="w-6 h-6 text-primary" />,
      path: '/student/listening/quiz'
    },
    {
      id: 'shadowing',
      title: 'Nghe và nhắc lại theo mẫu',
      desc: 'Nghe mẫu, nhắc lại từng câu và nhận nhận xét AI về phát âm, trọng âm và độ trôi chảy.',
      icon: <Mic className="w-6 h-6 text-primary" />,
      path: '/student/listening/shadowing'
    }
  ]

  const handleConfirm = () => {
    const mode = modes.find(m => m.id === selectedMode)
    if (mode) {
      navigate(mode.path)
    }
  }

  return (
    <div className="flex flex-col h-full bg-surface items-center pt-12 pb-20">
      <div className="w-full max-w-4xl px-4">
        <div className="text-sm text-text-secondary mb-12 text-center md:text-left">
          <Link to="/student/unit/3" className="hover:text-primary transition-colors">Bài học</Link> &gt; Unit 3 &gt; Luyện nghe &gt; Chọn kiểu luyện
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 border-4 border-white shadow-soft">
            <Headphones className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-2xl font-bold text-text-primary mb-8">Chọn cách luyện phù hợp với mục tiêu: hiểu nội dung, kiểm tra chi tiết hoặc luyện phản xạ phát âm.</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
            {modes.map((mode) => {
              const isSelected = selectedMode === mode.id
              return (
                <Card
                  key={mode.id}
                  className={`cursor-pointer transition-all border-2 relative ${isSelected ? 'border-primary shadow-active-glow bg-primary/[0.02]' : 'border-border hover:border-primary/50'}`}
                  onClick={() => setSelectedMode(mode.id)}
                >
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                  <CardContent className="p-6 py-8 flex flex-col items-center text-center justify-center h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      {mode.icon}
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${isSelected ? 'text-primary' : 'text-text-primary'}`}>
                      {mode.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {mode.desc}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Button
            className="px-12 py-6 rounded-xl text-lg font-bold shadow-active-glow"
            onClick={handleConfirm}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  )
}
