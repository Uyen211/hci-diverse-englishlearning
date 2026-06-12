import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '@/components/Modal'

export default function NewsReading() {
  const navigate = useNavigate()
  const [q1, setQ1] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const handleSubmit = () => {
    setIsModalOpen(true)
  }

  const handleConfirmSubmit = () => {
    setIsModalOpen(false)
    navigate('/student/reading/result')
  }

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-12 h-full">
      <div className="text-sm text-text-secondary mb-2">
        <Link to="/student/unit/3" className="hover:text-primary transition-colors">Bài học</Link> &gt; Unit 3 &gt; <Link to="/student/reading-select" className="hover:text-primary transition-colors">Luyện đọc</Link> &gt; Đọc báo chí thực tế
      </div>

      <h1 className="text-3xl font-extrabold text-text-primary mb-6">Bản tin BBC News</h1>

      <div className="flex flex-col md:flex-row gap-8 items-stretch flex-grow">
        
        {/* Left: Reading Passage */}
        <div className="flex-1">
          <Card className="border-none shadow-soft h-full bg-[#F8F9FA]">
            <CardContent className="p-8 relative">
              <h3 className="text-xl font-bold text-text-primary mb-6">Global Economy 2024</h3>
              <div className="flex flex-col gap-4 text-text-primary leading-relaxed text-sm lg:text-base">
                <p>
                  The global economy is facing unprecedented challenges this year. Experts suggest that the{' '}
                  <span 
                    className="bg-warning/30 font-bold px-1 rounded cursor-help relative inline-block border-b-2 border-warning/50"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    inflation
                  </span>{' '}
                  rates will drop slightly...
                </p>
              </div>

              {/* Simulated Tooltip */}
              <div className={`mt-8 bg-white border border-border rounded-xl p-6 shadow-soft transition-opacity duration-300 ${showTooltip ? 'opacity-100' : 'opacity-100 md:opacity-0'}`}>
                 <h4 className="font-bold text-sm text-text-primary mb-2">Tra từ nhanh:</h4>
                 <p className="text-sm text-text-primary">
                   <span className="font-bold">Inflation:</span> Lạm phát (sự tăng giá chung của hàng hóa).
                 </p>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Right: Questions */}
        <div className="flex-1 flex flex-col">
          <Card className="border-none shadow-soft flex-grow">
            <CardContent className="p-8 flex flex-col h-full">
              <h3 className="text-xl font-bold text-text-primary mb-6">Câu hỏi phân tích sâu</h3>
              
              <div className="flex flex-col gap-8 flex-grow">
                {/* Question 1 */}
                <div className="flex flex-col gap-4">
                  <h4 className="font-bold text-text-primary text-sm lg:text-base">1. Thái độ của tác giả trong bài viết này là gì?</h4>
                  <div className="flex flex-col gap-3 mt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="q1" value="A" onChange={(e) => setQ1(e.target.value)} className="w-4 h-4 accent-primary" />
                      <span className="text-sm group-hover:text-primary transition-colors">A. Lạc quan</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="q1" value="B" onChange={(e) => setQ1(e.target.value)} className="w-4 h-4 accent-primary" />
                      <span className="text-sm group-hover:text-primary transition-colors">B. Bi quan</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="q1" value="C" onChange={(e) => setQ1(e.target.value)} className="w-4 h-4 accent-primary" />
                      <span className="text-sm group-hover:text-primary transition-colors">C. Khách quan</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button 
                  className="px-8 rounded-full shadow-active-glow"
                  onClick={handleSubmit}
                  disabled={!q1}
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
