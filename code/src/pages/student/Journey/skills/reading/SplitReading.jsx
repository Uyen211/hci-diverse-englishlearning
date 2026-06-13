import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '@/components/Modal'
import { useToastStore } from '@/store/toastStore'

export default function SplitReading() {
  const navigate = useNavigate()
  const { addToast } = useToastStore()
  const [q1, setQ1] = useState('')
  const [q2, setQ2] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = () => {
    setIsModalOpen(true)
  }

  const handleConfirmSubmit = () => {
    setIsModalOpen(false)
    addToast("Nộp bài đọc hiểu thành công!", "success")
    navigate('/student/reading/result')
  }

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
        <span className="hover:underline cursor-pointer" onClick={() => navigate('/student/reading-select')}>Luyện đọc</span>
        <span className="opacity-50">&gt;</span>
        <span className="text-primary font-bold">Đọc hiểu chia cột</span>
      </div>

      <h1 className="text-3xl font-extrabold text-text-primary mb-6">The History of Computers</h1>

      <div className="flex flex-col md:flex-row gap-8 items-stretch flex-grow">
        
        {/* Left: Reading Passage */}
        <div className="flex-1">
          <Card className="border-none shadow-soft h-full bg-[#F8F9FA]">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-text-primary mb-6">Reading Passage</h3>
              <div className="flex flex-col gap-4 text-text-primary leading-relaxed text-sm lg:text-base">
                <p>
                  The history of computers dates back to the invention of the abacus, but modern computing started in the 20th century. Early computers were massive machines that filled entire rooms and used vacuum tubes for processing data.
                </p>
                <p>
                  In the 1950s, the invention of the transistor revolutionized computing by making machines smaller, faster, and more reliable. This led to the development of integrated circuits in the 1960s.
                </p>
                <p>
                  By the 1980s, personal computers became accessible to the general public. Brands like Apple and IBM introduced models that could fit on a desk, transforming both business and personal life.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Questions */}
        <div className="flex-1 flex flex-col">
          <Card className="border-none shadow-soft flex-grow">
            <CardContent className="p-8 flex flex-col h-full">
              <h3 className="text-xl font-bold text-text-primary mb-6">Questions</h3>
              
              <div className="flex flex-col gap-8 flex-grow">
                {/* Question 1 */}
                <div className="flex flex-col gap-4">
                  <h4 className="font-bold text-text-primary text-sm lg:text-base">1. What technology did early computers use?</h4>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="q1" value="Transistors" onChange={(e) => setQ1(e.target.value)} className="w-4 h-4 accent-primary" />
                      <span className="text-sm group-hover:text-primary transition-colors">Transistors</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="q1" value="Vacuum tubes" onChange={(e) => setQ1(e.target.value)} className="w-4 h-4 accent-primary" />
                      <span className="text-sm group-hover:text-primary transition-colors">Vacuum tubes</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="q1" value="Integrated circuits" onChange={(e) => setQ1(e.target.value)} className="w-4 h-4 accent-primary" />
                      <span className="text-sm group-hover:text-primary transition-colors">Integrated circuits</span>
                    </label>
                  </div>
                </div>

                {/* Question 2 */}
                <div className="flex flex-col gap-4">
                  <h4 className="font-bold text-text-primary text-sm lg:text-base">2. When did personal computers become accessible?</h4>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="q2" value="1950s" onChange={(e) => setQ2(e.target.value)} className="w-4 h-4 accent-primary" />
                      <span className="text-sm group-hover:text-primary transition-colors">1950s</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="q2" value="1960s" onChange={(e) => setQ2(e.target.value)} className="w-4 h-4 accent-primary" />
                      <span className="text-sm group-hover:text-primary transition-colors">1960s</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="q2" value="1980s" onChange={(e) => setQ2(e.target.value)} className="w-4 h-4 accent-primary" />
                      <span className="text-sm group-hover:text-primary transition-colors">1980s</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button 
                  className="px-8 rounded-full shadow-active-glow"
                  onClick={handleSubmit}
                  disabled={!q1 || !q2}
                >
                  Nộp bài
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>

      </div>

      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="confirm"
        title="Xác nhận nộp bài"
        cancelText="Quay lại"
        confirmText="Nộp bài ngay"
        onConfirm={handleConfirmSubmit}
      >
        Bạn đã trả lời tất cả câu hỏi. Bạn có muốn nộp bài để xem kết quả không?
      </Modal>

    </div>
  )
}
