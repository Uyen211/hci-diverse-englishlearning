import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, SplitSquareHorizontal, Newspaper, Check } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function ReadingSelect() {
  const navigate = useNavigate()
  const [selectedMode, setSelectedMode] = useState('split')

  const modes = [
    {
      id: 'split',
      title: 'Đọc hiểu chia cột',
      desc: 'Đọc bài ở một bên, trả lời câu hỏi ở bên còn lại để luyện tìm ý chính và đối chiếu thông tin.',
      icon: <SplitSquareHorizontal className="w-6 h-6 text-primary" />,
      path: '/student/reading/split'
    },
    {
      id: 'news',
      title: 'Đọc báo chí thực tế',
      desc: 'Tìm câu chứng minh trong đoạn văn, luyện kỹ năng scan, skimming và suy luận từ dữ kiện.',
      icon: <Newspaper className="w-6 h-6 text-primary" />,
      path: '/student/reading/news'
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
        <div className="breadcrumbs flex items-center gap-2 text-xs font-semibold text-text-secondary mb-12 justify-center md:justify-start">
          <span className="hover:underline cursor-pointer" onClick={() => navigate('/')}>Trang chủ</span>
          <span className="opacity-50">&gt;</span>
          <span className="hover:underline cursor-pointer" onClick={() => navigate('/student/journey')}>Hành trình</span>
          <span className="opacity-50">&gt;</span>
          <span className="hover:underline cursor-pointer" onClick={() => navigate('/student/unit/3')}>Unit 3</span>
          <span className="opacity-50">&gt;</span>
          <span className="text-primary font-bold">Luyện đọc</span>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 border-4 border-white shadow-soft">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-2xl font-bold text-text-primary mb-8">Chọn cách luyện phù hợp với mục tiêu: hiểu ý chính, đọc chi tiết hoặc mở rộng từ vựng qua ngữ cảnh.</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-12">
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
