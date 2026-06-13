import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Compass, Star, ChevronRight, Lock, Trophy, Flag } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'

export default function Journey() {
  const navigate = useNavigate()
  const roadmapSteps = [
    { id: 1, title: 'Kết nối đầu tiên (Greetings)', units: 'Unit 1-3', status: 'completed', score: '95/100' },
    { id: 2, title: 'Nhịp sống hàng ngày (Daily Routines)', units: 'Unit 4-6', status: 'active', score: '70/100' },
    { id: 3, title: 'Thế giới quanh ta (The World Around Us)', units: 'Unit 7-9', status: 'locked', score: null },
    { id: 4, title: 'Vũ trụ tri thức (Deep Cosmos Knowledge)', units: 'Unit 10-12', status: 'locked', score: null },
  ]

  return (
    <div className="main-layout flex flex-col gap-6">
      {/* Header section */}
      <div className="flex flex-col gap-4">
        {/* Breadcrumb */}
        <div className="breadcrumbs flex items-center gap-2 text-xs font-semibold text-text-secondary">
          <Link to="/" className="hover:underline text-text-secondary cursor-pointer">Trang chủ</Link>
          <span className="opacity-50">&gt;</span>
          <span className="text-primary font-bold">Hành trình</span>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="page-title text-3xl font-extrabold text-text-primary tracking-tight">
            Hành trình của tôi
          </h1>
          <p className="text-sm text-text-secondary">
            Bản đồ lộ trình học tập cá nhân hóa được thiết kế bởi trí tuệ nhân tạo AI.
          </p>
        </div>
      </div>

      {/* Grid Layout: 65% Left, 35% Right */}
      <div className="grid grid-cols-1 lg:grid-cols-[65%_minmax(0,1fr)] gap-8 items-start">
        {/* Left Column: Pathway Map */}
        <div className="flex flex-col gap-4 w-full">
          {roadmapSteps.map((step, idx) => {
            const isActive = step.status === 'active'
            const isCompleted = step.status === 'completed'
            const isLocked = step.status === 'locked'

            return (
              <div 
                key={step.id} 
                className={`relative overflow-visible group ${isLocked ? 'cursor-not-allowed opacity-60 grayscale' : 'cursor-pointer'}`}
                onClick={() => !isLocked && navigate(`/student/unit/${step.id}`)}
              >
                <Card
                  variant={isActive ? 'hero' : 'default'}
                  className={`relative overflow-visible transition-all duration-300 ${
                    !isLocked ? 'hover:-translate-y-1 hover:shadow-xl hover:border-primary/50' : ''
                  } ${
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
                        {isLocked ? <Lock className="w-4 h-4" /> : step.id}
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
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[12px] font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10">
                            {step.score}
                          </span>
                        </div>
                      )}
                      <Button
                        variant={isActive ? 'default' : 'outline'}
                        size="sm"
                        disabled={isLocked}
                        className={!isLocked ? "pointer-events-none" : ""} 
                      >
                        {isCompleted ? 'Học lại' : isActive ? 'Tiếp tục' : 'Bị khóa'}
                        <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Connecting Line (except last item) */}
                {idx < roadmapSteps.length - 1 && (
                  <div className="absolute left-[38px] top-[48px] w-0.5 h-8 border-l border-dashed border-border" />
                )}
              </div>
            )
          })}
        </div>

        {/* Right Column: Sidebar Info Card */}
        <Card className="w-full bg-surface shadow-xl border-border/50 flex flex-col overflow-hidden sticky top-6">
          <CardHeader className="bg-primary/[0.02] border-b border-border/50 pb-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-xl">Tiến độ hành trình</CardTitle>
                <div className="text-xs font-semibold text-text-secondary mt-0.5 flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-warning" /> Bạn đang học ở Cấp độ Cơ bản (A1-A2)
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex flex-col gap-6 pt-6">
            {/* Progress Bar Section */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-end">
                <span className="text-sm font-semibold text-text-secondary flex items-center gap-1.5">
                  <Flag className="w-4 h-4 text-primary" /> Mục tiêu IELTS: 3.5-4.5
                </span>
                <span className="font-extrabold text-primary text-lg">50%</span>
              </div>
              <div className="w-full bg-primary/10 h-4 rounded-full overflow-hidden shadow-inner relative">
                <div className="bg-gradient-nebula h-full rounded-full w-1/2 absolute left-0 top-0 transition-all duration-1000" />
              </div>
              <div className="text-xs text-text-secondary text-right font-medium">Hoàn thành</div>
            </div>

            {/* Stats Cards Section */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-surface border border-border/60 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
                <Star className="w-6 h-6 text-warning fill-warning mb-2" />
                <span className="text-3xl font-extrabold text-text-primary">6</span>
                <span className="text-xs font-semibold text-text-secondary mt-1 uppercase tracking-wider">Unit đã học</span>
                <span className="text-[10px] text-text-secondary/60 mt-0.5">Trên tổng 12 Unit</span>
              </div>
              <div className="bg-surface border border-border/60 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
                <Compass className="w-6 h-6 text-primary mb-2" />
                <span className="text-3xl font-extrabold text-text-primary">24</span>
                <span className="text-xs font-semibold text-text-secondary mt-1 uppercase tracking-wider">Bài đã học</span>
                <span className="text-[10px] text-text-secondary/60 mt-0.5">Trên tổng 48 Bài</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
