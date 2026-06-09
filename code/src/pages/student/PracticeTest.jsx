import { Card } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Award, Clock, ArrowRight, ShieldCheck } from 'lucide-react'

export default function PracticeTest() {
  const tests = [
    { name: 'IELTS Academic - Mock Test Vol.1', type: 'IELTS Full Test', duration: '120 phút', questions: '80 câu', status: 'Chưa làm' },
    { name: 'TOEIC Listening & Reading - Test 01', type: 'TOEIC Full Test', duration: '120 phút', questions: '200 câu', status: 'Đã hoàn thành', score: '750/990' },
    { name: 'Mini-test Vocabulary & Grammar (Unit 1)', type: 'Mini-test', duration: '15 phút', questions: '20 câu', status: 'Chưa làm' },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading text-2xl font-extrabold text-text-primary tracking-tight">
          Kiểm tra thực tế
        </h2>
        <p className="text-sm text-text-secondary">
          Kiểm tra và đánh giá năng lực theo cấu trúc chuẩn quốc tế IELTS, TOEIC hỗ trợ bởi AI chấm điểm.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {tests.map((test, idx) => {
          const isDone = test.status === 'Đã hoàn thành'
          return (
            <Card key={idx} variant="default" className="bg-surface hover:shadow-active-glow transition-all duration-300">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    isDone ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'
                  }`}>
                    {isDone ? <ShieldCheck className="w-6 h-6" /> : <Award className="w-6 h-6" />}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                      {test.type}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-text-primary">
                      {test.name}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-text-secondary mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {test.duration}
                      </span>
                      <span>• {test.questions}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-stretch md:self-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-border/50">
                  {test.score ? (
                    <div className="text-right">
                      <p className="text-xs text-text-secondary font-semibold">Điểm số</p>
                      <p className="font-heading text-lg font-extrabold text-success">{test.score}</p>
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-text-secondary px-2.5 py-1 bg-muted rounded-full">
                      {test.status}
                    </span>
                  )}
                  <Button variant={isDone ? 'outline' : 'default'} className="flex items-center gap-2">
                    {isDone ? 'Xem kết quả' : 'Làm bài thi'}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
