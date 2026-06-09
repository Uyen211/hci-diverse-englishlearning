import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import StatsCard from '../components/StatsCard'
import { useAuthStore } from '../store/authStore'
import { Trophy, BookOpen, Flame, Settings, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const isStudent = user?.role === 'student'

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-heading text-2xl font-extrabold text-text-primary tracking-tight flex items-center gap-2">
            Chào mừng quay trở lại,{' '}
            <span className="bg-gradient-galactic bg-clip-text text-transparent">
              {user?.username || 'Người dùng'}
            </span>
            !
          </h2>
          <p className="text-sm text-text-secondary">
            {isStudent
              ? 'Hôm nay là một ngày tuyệt vời để khám phá kiến thức tiếng Anh mới.'
              : 'Hệ thống quản trị và kiểm soát chất lượng đào tạo DiveVerse.'}
          </p>
        </div>
      </div>

      {isStudent ? (
        /* ==========================================
           STUDENT DASHBOARD VIEW
           ========================================== */
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              label="Học liên tục (Streak)"
              value="15 ngày"
              changeText="★ Đang giữ phong độ!"
              changeType="success"
            />
            <StatsCard
              label="Điểm tích lũy (Points)"
              value="2,450 XP"
              changeText="+ 250 XP hôm nay"
              changeType="success"
            />
            <StatsCard
              label="Từ vựng cần ôn tập"
              value="5 từ"
              changeText="▲ Cần luyện lại ngay"
              changeType="warning"
            />
          </div>

          {/* Hero Card / Continue Learning */}
          <Card variant="hero" className="w-full relative overflow-hidden flex flex-col gap-4">
            {/* Visual sparkles */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-25 hidden md:block">
              <Trophy className="w-32 h-32 text-accent" />
            </div>

            <div className="max-w-[60%] flex flex-col gap-3">
              <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full self-start flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 fill-primary" />
                Đang học dở dang
              </span>
              <h3 className="font-heading text-xl font-extrabold text-text-primary">
                Tiếp tục bài học: Hello & Goodbye
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Bạn đã hoàn thành 70% bài học này. Hãy hoàn thiện 30% còn lại để nhận thêm 50 XP và giữ vững chuỗi Streak của bạn!
              </p>
              <Button
                variant="default"
                className="self-start mt-2 flex items-center gap-2 shadow-active-glow hover:shadow-hover-glow"
                onClick={() => navigate('/student/journey')}
              >
                Tiếp tục học ngay
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </>
      ) : (
        /* ==========================================
           ADMIN DASHBOARD VIEW
           ========================================== */
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              label="Tổng người dùng hoạt động"
              value="12,482"
              changeText="▲ Tăng 12% tháng này"
              changeType="success"
            />
            <StatsCard
              label="Tiến độ trung bình"
              value="68.4%"
              changeText="● Ổn định"
              changeType="stable"
            />
            <StatsCard
              label="Điểm Ielts trung bình"
              value="5.5"
              changeText="▲ +0.2 band so với quý trước"
              changeType="success"
            />
          </div>

          {/* Shortcuts / Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-surface hover:shadow-active-glow transition-all duration-300">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-1">
                  <BookOpen className="w-5 h-5" />
                </div>
                <CardTitle>Quản trị Lộ trình</CardTitle>
                <CardDescription>Thiết lập cấp độ học, xây dựng unit và soạn thảo cấu hình bài học.</CardDescription>
              </CardHeader>
              <CardContent className="mt-2">
                <div className="flex gap-3">
                  <Button variant="default" onClick={() => navigate('/admin/levels')}>
                    Quản lý Cấp độ
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/admin/curriculum')}>
                    Chương trình học
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-surface hover:shadow-active-glow transition-all duration-300">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-1">
                  <Settings className="w-5 h-5" />
                </div>
                <CardTitle>Cấu hình Đề thi</CardTitle>
                <CardDescription>Biên soạn các đề thi đánh giá năng lực IELTS, TOEIC hoặc Mini-test.</CardDescription>
              </CardHeader>
              <CardContent className="mt-2">
                <Button variant="default" onClick={() => navigate('/admin/exams')}>
                  Quản lý Đề thi
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
