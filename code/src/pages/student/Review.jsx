import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { RefreshCw, BookOpen, Layers } from 'lucide-react'

export default function Review() {
  const reviewItems = [
    { word: 'collaborate', type: 'Từ vựng', ipa: '/kəˈlæb.ə.reɪt/', state: 'Cần ôn gấp', level: 'Basic A2' },
    { word: 'Present Simple', type: 'Ngữ pháp', ipa: 'Thì hiện tại đơn', state: 'Sắp quên', level: 'Basic A1' },
    { word: 'innovative', type: 'Từ vựng', ipa: '/ˈɪn.ə.və.tɪv/', state: 'Đã thuộc', level: 'Basic A2' },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading text-2xl font-extrabold text-text-primary tracking-tight">
          Góc ôn tập thông minh (SRS)
        </h2>
        <p className="text-sm text-text-secondary">
          Ứng dụng thuật toán ôn tập ngắt quãng (Spaced Repetition System) giúp bạn ghi nhớ sâu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-surface">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-1">
              <BookOpen className="w-5 h-5" />
            </div>
            <CardTitle>Tổng từ vựng học</CardTitle>
            <CardDescription>Số từ đã lưu vào kho tri thức</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="font-heading text-3xl font-extrabold text-text-primary">150 từ</span>
          </CardContent>
        </Card>

        <Card className="bg-surface">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-1">
              <Layers className="w-5 h-5" />
            </div>
            <CardTitle>Chủ điểm ngữ pháp</CardTitle>
            <CardDescription>Cấu trúc cốt lõi đã học</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="font-heading text-3xl font-extrabold text-text-primary">12 cấu trúc</span>
          </CardContent>
        </Card>

        <Card className="bg-surface">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-error/10 text-error flex items-center justify-center mb-1">
              <RefreshCw className="w-5 h-5" />
            </div>
            <CardTitle>Cần ôn tập ngay</CardTitle>
            <CardDescription>Thuật toán phát hiện từ cần luyện lại</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="font-heading text-3xl font-extrabold text-error">5 mục</span>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-surface">
        <CardHeader>
          <CardTitle>Danh sách từ & cấu trúc cần ôn tập</CardTitle>
          <CardDescription>Dựa trên mức độ lãng quên ước lượng của não bộ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {reviewItems.map((item, idx) => {
              const isUrgent = item.state === 'Cần ôn gấp'
              const isGood = item.state === 'Đã thuộc'
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 border border-border rounded-lg bg-background/50 hover:bg-background transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <span className="font-bold text-text-primary text-base font-heading min-w-[120px]">
                      {item.word}
                    </span>
                    <span className="text-xs text-text-secondary min-w-[100px]">
                      {item.ipa}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/8 text-primary self-start md:self-auto">
                      {item.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        isUrgent
                          ? 'bg-error/10 text-error'
                          : isGood
                          ? 'bg-success/10 text-success'
                          : 'bg-warning/10 text-warning'
                      }`}
                    >
                      {item.state}
                    </span>
                    <Button variant="outline" size="sm">
                      Luyện tập
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
