import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Compass, Star, ChevronRight } from 'lucide-react'

export default function Journey() {
  const roadmapSteps = [
    { id: 1, title: 'Kết nối đầu tiên (Greetings)', units: 'Unit 1-3', status: 'completed', score: '95/100' },
    { id: 2, title: 'Nhịp sống hàng ngày (Daily Routines)', units: 'Unit 4-6', status: 'active', score: '70/100' },
    { id: 3, title: 'Thế giới quanh ta (The World Around Us)', units: 'Unit 7-9', status: 'locked', score: null },
    { id: 4, title: 'Vũ trụ tri thức (Deep Cosmos Knowledge)', units: 'Unit 10-12', status: 'locked', score: null },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading text-2xl font-extrabold text-text-primary tracking-tight">
          Hành trình của tôi
        </h2>
        <p className="text-sm text-text-secondary">
          Bản đồ lộ trình học tập cá nhân hóa được thiết kế bởi trí tuệ nhân tạo AI.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Pathway Map */}
        <div className="flex-1 flex flex-col gap-4 w-full">
          {roadmapSteps.map((step, idx) => {
            const isActive = step.status === 'active'
            const isCompleted = step.status === 'completed'
            return (
              <Card
                key={step.id}
                variant={isActive ? 'hero' : 'default'}
                className={`relative overflow-visible ${
                  isCompleted ? 'border-success/20 bg-success/[0.01]' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        isCompleted
                          ? 'bg-success text-white'
                          : isActive
                          ? 'bg-primary text-white shadow-active-glow'
                          : 'bg-muted text-text-secondary/50'
                      }`}
                    >
                      {step.id}
                    </div>
                    <div>
                      <h4 className="font-heading text-base font-bold text-text-primary">
                        {step.title}
                      </h4>
                      <p className="text-xs text-text-secondary">
                        Lớp cơ bản • {step.units}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {step.score && (
                      <span className="text-[12px] font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10">
                        {step.score}
                      </span>
                    )}
                    <Button
                      variant={isActive ? 'default' : 'outline'}
                      size="sm"
                      disabled={step.status === 'locked'}
                    >
                      {isCompleted ? 'Học lại' : isActive ? 'Tiếp tục' : 'Bị khóa'}
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </div>

                {/* Connecting Line (except last item) */}
                {idx < roadmapSteps.length - 1 && (
                  <div className="absolute left-[38px] top-[48px] w-0.5 h-8 border-l border-dashed border-border" />
                )}
              </Card>
            )
          })}
        </div>

        {/* Sidebar Info Card */}
        <Card className="w-full md:w-[320px] bg-surface flex flex-col gap-6">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-1">
              <Compass className="w-5 h-5" />
            </div>
            <CardTitle>Tiến độ hành trình</CardTitle>
            <CardDescription>Bạn đang học ở Cấp độ Cơ bản (A1-A2)</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs text-text-secondary">
                <span>Mục tiêu IELTS: 3.5-4.5</span>
                <span className="font-bold text-primary">50% Hoàn thành</span>
              </div>
              <div className="w-full bg-primary/8 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-nebula h-full rounded-full w-1/2" />
              </div>
            </div>

            <div className="border-t border-primary/5 pt-4 flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm text-text-primary">
                <span className="flex items-center gap-2 font-medium">
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  Unit đã học
                </span>
                <span className="font-bold">6 / 12 Unit</span>
              </div>
              <div className="flex justify-between items-center text-sm text-text-primary">
                <span className="flex items-center gap-2 font-medium">
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  Tổng bài học
                </span>
                <span className="font-bold">24 / 48 bài</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
