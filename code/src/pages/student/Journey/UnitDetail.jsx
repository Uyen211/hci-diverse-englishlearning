import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { CheckCircle2, Play, Lock, Info, Headphones, Key, Zap } from 'lucide-react'
import { Link, useParams, useNavigate } from 'react-router-dom'

export default function UnitDetail() {
  const { unitId } = useParams()
  const navigate = useNavigate()

  const lessons = [
    { id: 1, type: 'Từ vựng', title: 'Nhóm từ vựng', status: 'active', desc: 'Học từ vựng theo cụm và ngữ cảnh', duration: '15 phút', level: 'Cấp độ A1-A2' },
    { id: 2, type: 'Ngữ pháp', title: 'Điểm ngữ pháp', status: 'active', desc: 'Thực hành cấu trúc câu', duration: '15 phút', level: 'Cấp độ A1-A2' },
    { id: 3, type: 'Luyện đọc', title: 'Everyday News', status: 'completed', desc: 'Hoàn thành: 2 giờ trước', duration: '20 phút' },
    { id: 4, type: 'Luyện nghe', title: 'A Conversation at the Coffee Shop', status: 'active', desc: 'Interactive Stories', duration: '12 phút', level: 'Cấp độ B1' },
    { id: 5, type: 'Luyện nói', title: 'Ordering Coffee', status: 'active', desc: 'Luyện phát âm', duration: '15 phút', level: 'Cấp độ B1' },
    { id: 6, type: 'Luyện viết', title: 'Writing Task', status: 'active', desc: 'Luyện viết đoạn văn', duration: '20 phút', level: 'Cấp độ B1' },
    { id: 7, type: 'Mini Test', title: 'Mini Test Unit', status: 'locked', desc: 'Hoàn thành tất cả bài học để mở khóa' },
  ]

  const handleLessonClick = (lesson) => {
    if (lesson.status === 'locked') return;
    
    if (lesson.id === 1) {
      navigate('/student/vocabulary-select', { state: { unitId: unitId || 2 } })
    } else if (lesson.id === 2) {
      navigate('/student/grammar-select', { state: { unitId: unitId || 2 } })
    } else if (lesson.id === 3) {
      navigate('/student/reading-select')
    } else if (lesson.id === 4) {
      navigate('/student/listening-select')
    } else if (lesson.id === 5) {
      navigate('/student/speaking-select')
    } else if (lesson.id === 6) {
      navigate('/student/writing/task')
    }
  }

  return (
    <div className="main-layout flex flex-col gap-6 text-left">
      {/* A. Vùng Header */}
      <div className="flex flex-col gap-4 mb-2">
        <div className="breadcrumbs flex items-center gap-2 text-xs font-semibold text-text-secondary">
          <Link to="/" className="hover:underline text-text-secondary">Trang chủ</Link>
          <span className="opacity-50">&gt;</span>
          <Link to="/student/journey" className="hover:underline text-text-secondary">Hành trình</Link>
          <span className="opacity-50">&gt;</span>
          <span className="text-primary font-bold">Unit {unitId || 2}</span>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-primary-light text-left pb-1">
            Unit {unitId || 2}: Daily Communication
          </h1>
          <p className="text-sm font-medium text-text-secondary text-left">
            Master essential phrases for everyday interactions
          </p>
        </div>
      </div>

      {/* Grid Layout: 70% Trái - 30% Phải */}
      <div className="grid grid-cols-1 lg:grid-cols-[70%_minmax(0,1fr)] gap-8 items-start">
        
        {/* Cột Trái: Danh sách Bài học (Actionable Cards) */}
        <div className="flex flex-col gap-4 w-full">
          {lessons.map((lesson) => {
            const isCompleted = lesson.status === 'completed'
            const isLocked = lesson.status === 'locked'
            const isActive = lesson.status === 'active'

            const getCardColorClass = (active, completed) => {
              if (completed) return 'bg-success/10 border-success/30'
              if (active) return 'bg-primary/5 border-primary/30'
              return 'bg-surface/30 border-dashed border-border'
            }

            return (
              <div
                key={lesson.id}
                tabIndex={isLocked ? -1 : 0}
                role="button"
                aria-disabled={isLocked}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && !isLocked) {
                    e.preventDefault();
                    handleLessonClick(lesson);
                  }
                }}
                onClick={() => handleLessonClick(lesson)}
                className={`
                  relative w-full rounded-xl transition-all duration-300 text-left outline-none
                  ${isLocked ? 'cursor-not-allowed opacity-60 grayscale' : 'cursor-pointer'}
                  ${isActive ? 'hover:-translate-y-1 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:-translate-y-1' : ''}
                `}
              >
                <Card 
                  className={`border overflow-hidden ${getCardColorClass(isActive, isCompleted)}`}
                >
                  <CardContent className="p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Icon Prefix */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm
                        ${isCompleted ? 'bg-success/15 text-success' : ''}
                        ${isActive ? 'bg-gradient-to-br from-primary to-primary-dark text-white shadow-active-glow' : ''}
                        ${isLocked ? 'bg-muted text-text-secondary/50 border border-border/50' : ''}
                      `}>
                        {isCompleted && <CheckCircle2 className="w-6 h-6" />}
                        {isActive && <Play className="w-5 h-5 ml-1 fill-white" />}
                        {isLocked && <Lock className="w-5 h-5" />}
                      </div>

                      {/* Thông tin Bài học */}
                      <div className="flex flex-col text-left">
                        {isLocked && (
                          <span className="text-xs font-semibold text-text-secondary/80 mb-0.5 uppercase tracking-wide">
                            {lesson.desc}
                          </span>
                        )}
                        <h4 className={`text-lg font-bold
                          ${isCompleted ? 'text-text-primary/70' : 'text-text-primary'}
                        `}>
                          {lesson.type}{lesson.title !== lesson.type ? `: ${lesson.title}` : ''}
                        </h4>
                        
                        {/* Meta Data / Tags */}
                        {!isLocked && (
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            {isCompleted ? (
                              <span className="text-xs font-medium text-success">
                                {lesson.desc}
                              </span>
                            ) : (
                              <>
                                {lesson.duration && (
                                  <span className="bg-primary/10 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-primary border border-primary/20">
                                    {lesson.duration}
                                  </span>
                                )}
                                {lesson.level && (
                                  <span className="bg-warning/15 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-warning-dark border border-warning/20">
                                    {lesson.level}
                                  </span>
                                )}
                                {lesson.desc && (
                                  <span className="bg-surface-hover px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-text-secondary border border-border/50">
                                    {lesson.desc}
                                  </span>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    {!isLocked && (
                      <Button 
                        variant={isCompleted ? "outline" : "default"}
                        size="sm"
                        className={`shrink-0 mt-3 sm:mt-0 font-semibold pointer-events-none ${isActive ? 'shadow-active-glow' : ''}`}
                        tabIndex={-1}
                      >
                        {isCompleted ? 'Học lại' : 'Học ngay'}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Cột Phải: Bảng Mục tiêu & Hướng dẫn (Contextual Sidebar) */}
        <div className="flex flex-col gap-6 sticky top-6">
          
          {/* Khối Mục tiêu bài học */}
          <Card className="bg-surface-hover/30 border-border/50 shadow-sm text-left">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Mục tiêu bài học</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-4 text-sm text-text-secondary">
                <li className="flex gap-3 items-start">
                  <Headphones className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-text-primary block mb-0.5">Nghe hiểu:</span>
                    Nắm bắt thông tin chính trong các đoạn hội thoại giao tiếp hàng ngày tại không gian công cộng.
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <Key className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-text-primary block mb-0.5">Từ khóa:</span>
                    Ghi nhớ 15 từ vựng/cụm từ thiết yếu dùng trong môi trường quán cà phê, nhà hàng.
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <Zap className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-text-primary block mb-0.5">Phản xạ:</span>
                    Cải thiện tốc độ phản xạ trả lời câu hỏi trực tiếp qua các bài tập Role-play.
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Khối Chỉ dẫn Điều kiện mở khóa */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-3 items-start text-left">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-primary-dark">
              Điều kiện mở khóa Mini Test: Hoàn thành tối thiểu 80% mỗi bài học nhỏ trong Unit này.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
