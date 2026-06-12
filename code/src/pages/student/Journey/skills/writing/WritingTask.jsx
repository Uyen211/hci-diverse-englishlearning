import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '@/components/Modal'

export default function WritingTask() {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const [errorType, setErrorType] = useState(null) // null | 'empty' | 'short'
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Calculate word count
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const MAX_WORDS = 100
  const MIN_WORDS = 50

  const handleTextChange = (e) => {
    setText(e.target.value)
    if (errorType) setErrorType(null) // Clear error when typing
  }

  const handleSubmit = () => {
    if (wordCount === 0) {
      setErrorType('empty')
    } else if (wordCount < MIN_WORDS) {
      setErrorType('short')
    } else {
      setIsModalOpen(true)
    }
  }

  const handleConfirmSubmit = () => {
    setIsModalOpen(false)
    navigate('/student/writing/result')
  }

  const isError = errorType !== null

  // For testing purposes: expose a hidden feature to toggle errors manually
  const toggleTestError = () => {
    if (errorType === null) setErrorType('empty')
    else if (errorType === 'empty') {
      setText('I like reading books.')
      setErrorType('short')
    }
    else {
      setText('')
      setErrorType(null)
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-12 h-full">
      <div className="text-sm text-text-secondary mb-2 flex justify-between items-center">
        <div>
          <Link to="/student/unit/3" className="hover:text-primary transition-colors">Bài học</Link> &gt; Unit 3 &gt; Luyện viết
        </div>
        {/* Hidden button to toggle error state for demo presentation */}
        <button onClick={toggleTestError} className="text-xs text-text-secondary opacity-50 hover:opacity-100">Test Errors</button>
      </div>

      <h1 className="text-3xl font-extrabold text-text-primary mb-6">Luyện Viết - Writing Task</h1>

      <div className={`p-1 rounded-3xl transition-all ${isError ? 'bg-error border border-error border-dashed' : 'bg-transparent'}`}>
        <Card className={`border-none shadow-soft h-full ${isError ? 'bg-[#FFF5F5] rounded-[22px]' : 'bg-white'}`}>
          <CardContent className="p-8">
            
            {/* Prompt Box */}
            <div className={`rounded-xl p-6 mb-8 ${isError ? 'bg-white border border-border' : 'bg-surface'}`}>
              <h4 className="font-bold text-text-primary mb-3">Đề bài:</h4>
              <p className="text-text-primary leading-relaxed">
                Viết một đoạn văn (khoảng 50-100 từ) mô tả về sở thích cá nhân của bạn trong thời gian rảnh rỗi. 
                Hãy giải thích tại sao bạn lại yêu thích nó.
              </p>
            </div>

            {/* Text Area */}
            <div className="flex flex-col gap-2">
              <label className={`text-sm font-bold ${isError ? 'text-error' : 'text-text-primary'}`}>
                Khung soạn thảo bài viết {isError && '*'}
              </label>
              <textarea 
                className={`w-full min-h-[200px] p-4 rounded-xl border-2 transition-all resize-y text-base
                  ${isError ? 'border-error/30 bg-error/5 focus:border-error focus:ring-1 focus:ring-error text-error' 
                           : 'border-border bg-surface focus:border-primary focus:ring-1 focus:ring-primary text-text-primary'}`}
                placeholder="Nhập bài viết của bạn tại đây..."
                value={text}
                onChange={handleTextChange}
              ></textarea>
              
              {/* Error Messages */}
              {errorType === 'empty' && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] bg-error text-white w-3 h-3 flex items-center justify-center rounded font-bold">!</span>
                  <span className="text-xs font-bold text-error">Nội dung bài viết không được để trống. Vui lòng nhập bài viết của bạn!</span>
                </div>
              )}
              {errorType === 'short' && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] bg-error text-white w-3 h-3 flex items-center justify-center rounded font-bold">!</span>
                  <span className="text-xs font-bold text-error">Bài viết quá ngắn. Yêu cầu tối thiểu 50 từ (hiện tại: {wordCount} từ).</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-6">
              <span className={`text-sm font-medium ${isError ? 'text-error' : 'text-text-secondary'}`}>
                Số từ: {wordCount} / {MAX_WORDS} (Tối thiểu {MIN_WORDS} từ)
              </span>
              <Button 
                className={`px-8 rounded-full shadow-sm font-bold ${isError ? 'bg-error hover:bg-error/90 text-white shadow-error/20' : 'shadow-active-glow'}`}
                onClick={handleSubmit}
              >
                Nộp bài
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>

      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="confirm"
        title="Xác nhận nộp bài"
        cancelText="Quay lại chỉnh sửa"
        confirmText="Nộp bài chấm điểm"
        onConfirm={handleConfirmSubmit}
      >
        Bài viết của bạn hiện tại có {wordCount} từ. Bạn có chắc chắn muốn nộp để AI chấm điểm không?
      </Modal>

    </div>
  )
}
