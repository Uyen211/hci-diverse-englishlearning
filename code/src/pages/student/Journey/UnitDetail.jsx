import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Check, Play, Lock } from 'lucide-react'
import { Link, useParams, useNavigate } from 'react-router-dom'

export default function UnitDetail() {
  const { unitId } = useParams()
  const navigate = useNavigate()

  const lessons = [
    { id: 1, type: 'Từ vựng & Ngữ pháp', title: 'Từ vựng & Ngữ pháp', status: 'completed', desc: 'Hoàn thành: Hôm qua', duration: '15 phút' },
    { id: 2, type: 'Luyện đọc', title: 'Everyday News', status: 'completed', desc: 'Hoàn thành: 2 giờ trước', duration: '20 phút' },
    { id: 3, type: 'Luyện nghe', title: 'A Conversation at the Coffee Shop', status: 'active', desc: 'Interactive Stories / Shadowing', duration: '12 phút', level: 'Cấp độ B1' },
    { id: 4, type: 'Luyện nói', title: 'Ordering Coffee', status: 'active', desc: 'Luyện phát âm / Role-play', duration: '15 phút', level: 'Cấp độ B1' },
    { id: 5, type: 'Mini Test', title: 'Mini Test Unit', status: 'locked', desc: 'Hoàn thành tất cả bài học để mở khóa' },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="text-sm text-text-secondary mb-2">
        <Link to="/student/journey" className="hover:text-primary transition-colors">Lộ trình học</Link> &gt; Basic &gt; Unit {unitId || 3}
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Left: Timeline */}
        <div className="flex-[2] flex flex-col gap-6 w-full">
          <Card className="border-none shadow-soft">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-3xl font-extrabold text-text-primary">Unit {unitId || 3}: Daily Communication</h2>
                <div className="w-32 h-2 bg-primary/10 rounded-full overflow-hidden hidden md:block">
                  <div className="w-[60%] h-full bg-primary rounded-full"></div>
                </div>
              </div>
              <p className="text-text-secondary text-base">Master essential phrases for everyday interactions.</p>
            </CardContent>
          </Card>

          <div className="relative pl-8 ml-4 border-l-2 border-border flex flex-col gap-6">
            {lessons.map((lesson, idx) => {
              const isCompleted = lesson.status === 'completed'
              const isActive = lesson.status === 'active'
              const isLocked = lesson.status === 'locked'

              return (
                <div key={lesson.id} className="relative">
                  {/* Icon Node */}
                  <div className={`absolute -left-[48px] top-4 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-surface z-10
                    ${isCompleted ? 'border-success text-success' : isActive ? 'border-primary bg-primary text-white shadow-active-glow' : 'border-border text-text-secondary/50'}`}>
                    {isCompleted ? <Check className="w-4 h-4 font-bold" /> : isActive ? <Play className="w-4 h-4 ml-0.5" /> : <Lock className="w-4 h-4" />}
                  </div>

                  <Card variant={isActive ? 'hero' : 'default'} className={`transition-all ${isLocked ? 'opacity-50 border-dashed' : 'hover:-translate-y-1'}`}>
                    <CardContent className="p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                      <div className="flex items-center gap-4">
                        {isActive && (
                          <div className="hidden sm:flex w-12 h-12 rounded-full bg-primary/10 text-primary items-center justify-center shrink-0">
                            <Play className="w-6 h-6 ml-1" />
                          </div>
                        )}
                        <div>
                          <h4 className={`text-lg font-bold mb-1 ${isActive ? 'text-primary' : 'text-text-primary'}`}>
                            {lesson.type}{lesson.title !== lesson.type ? `: ${lesson.title}` : ''} {lesson.id === 5 ? (unitId || 3) : ''}
                          </h4>
                          {isActive ? (
                            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-text-secondary mt-2">
                              <span className="bg-surface px-2.5 py-1 rounded-full">{lesson.duration}</span>
                              {lesson.level && <span className="bg-surface px-2.5 py-1 rounded-full">{lesson.level}</span>}
                              <span className="bg-surface px-2.5 py-1 rounded-full">{lesson.desc}</span>
                            </div>
                          ) : (
                            <p className="text-sm text-text-secondary">{lesson.desc}</p>
                          )}
                        </div>
                      </div>

                      {isActive && (
                        <Button 
                          className="shrink-0 mt-4 sm:mt-0 rounded-full px-6 shadow-active-glow"
                          onClick={() => {
                            if (lesson.id === 3) {
                              navigate('/student/listening-select')
                            } else if (lesson.id === 4) {
                              navigate('/student/speaking-select')
                            }
                          }}
                        >
                          Bắt đầu học <Play className="w-4 h-4 ml-2 fill-current" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: Mục tiêu bài học */}
        <div className="flex-1 w-full md:sticky md:top-6">
          <Card className="border-none shadow-soft">
            <CardHeader>
              <CardTitle className="text-xl">Mục tiêu bài học</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">

              <div className="flex gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
                <div>
                  <h5 className="font-bold text-text-primary mb-1">Nghe hiểu</h5>
                  <p className="text-sm text-text-secondary leading-relaxed">Nắm bắt thông tin chính trong các đoạn hội thoại giao tiếp thường ngày tại quán cafe.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
                <div>
                  <h5 className="font-bold text-text-primary mb-1">Từ khóa</h5>
                  <p className="text-sm text-text-secondary leading-relaxed">Ghi nhớ 15 từ vựng và cụm từ liên quan đến đồ uống, đặt món và thanh toán.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
                <div>
                  <h5 className="font-bold text-text-primary mb-1">Phản xạ</h5>
                  <p className="text-sm text-text-secondary leading-relaxed">Cải thiện tốc độ phản hồi thông qua bài tập Shadowing tương tác.</p>
                </div>
              </div>

              <div className="mt-2 bg-primary/5 border border-primary/10 p-4 rounded-xl flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full border-2 border-primary text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">i</div>
                <p className="text-xs text-text-primary font-medium">Điều kiện mở khóa Mini Test: Hoàn thành tối thiểu 80% mỗi bài học nhỏ.</p>
              </div>

            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
